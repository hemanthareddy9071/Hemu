/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.payment;

import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.commons.ServiceInvoker;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Files;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ravikiran.r
 */
public class PaymentGateway {

    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    /**
     * paymentCallBack
     * @return String contains error incase of transaction failed or Success when onboard process or ReqSuccess when registration process
     */
    
    public String paymentCallBack() {
        prInfo("****paymentCallBack****");
        String returnVal = "error";
        String ZipFileData = "";
        try {
            HttpServletRequest request = ServletActionContext.getRequest();
            String queryString = request.getQueryString();
            response = new CRSResponse();
            String payloadRequest = getPayload(request.getInputStream());
            prDebug("payloadRequest :" + payloadRequest);
            if (payloadRequest.length() > 0) {
                XMLSerializer xmlSerializer = new XMLSerializer();
                JSONObject paymentResponse = (JSONObject) xmlSerializer.read(payloadRequest);
                prDebug("paymentResponse :" + paymentResponse);
                if (paymentResponse.optString("Info2").contains(",") || fetchInfo2Details(paymentResponse.getString("sessionId")).optString("INFO2").contains(",")) {
                    JSONObject additionalParams = new JSONObject();
                    String str = paymentResponse.getString("Info2");
                    String[] strArr = str.split(",");
                    for (int i = 0; i < strArr.length; i++) {
                        String[] temp = strArr[i].split(":");
                        additionalParams.put(temp[0], temp[1]);
                    }
                    prInfo("additionalParams  :" + additionalParams);
                    if ("PD".equalsIgnoreCase(additionalParams.getString("FT")) && ("1".equalsIgnoreCase(additionalParams.getString("ISD")))) {
                        paymentResponse.put("PA_UPDATE_FLAG", "PDISD");
                        //updateAuditPaymentTxn(paymentResponse);
                    } else if ("1".equalsIgnoreCase(additionalParams.getString("ISD"))) {
                            paymentResponse.put("PA_UPDATE_FLAG", "ISD");                       
                    }
                    if(!additionalParams.getString("SCH").equals("WS0")){
                         paymentResponse.put("SCHEME_UPDATE_FLAG", true); 
                    }
                }
                
                if (updateAuditPaymentTxn(paymentResponse)) {  // Payment Audit data inserion
                    if ("SUCCESS".equalsIgnoreCase(paymentResponse.getString("TXN_STATUS"))) { // payment transaction status
                        if (!paymentResponse.getString("sessionId").startsWith("REG-")) {
                            JSONObject reqDataInfo = getPrePaymentData(paymentResponse.getString("sessionId"));
                            prInfo("Responce from getPrePaymentData::" + reqDataInfo.getString("JOB_DATA"));
                            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(reqDataInfo.getString("JOB_DATA"));
                            reqJson.put("WINGS_ISD", reqJson.optBoolean("WINGS_ISD")? 1: 0);
                            reqJson.put("WINGS_IR", reqJson.optBoolean("WINGS_IR")? 1: 0);
                            reqJson.put("WINGS_PYMT_STATUS", paymentResponse.getString("TXN_STATUS"));
                            int ZipFileLength = reqJson.getInt("ZipFileLength");                           
                            if (ZipFileLength > 0) {
                                prInfo("ZipFileLength::" + ZipFileLength);
                                String tariffIDDocPath = reqJson.getString("TARIFF_ID_DOC_PATH");
                                ZipFileData = tariffIDDocPath; //convertFileToString(new File (tariffIDDocPath));
                            } else {
                                 prInfo("ZipFileLength::" + ZipFileLength);
                            }
                             
                            String onBoardURL = CRSAppResources.ONBOARD_URL;
                            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/DKYCService/saveFMSDKYCJob";
                            AppLogger.debug("onBoardURL in JobUpload method :" + OnboardURL);
                            JSONObject obInsResponse = new CRSClient().serviceRequest(ZipFileData, reqJson.toString(), OnboardURL);
                            AppLogger.debug("Response of saveCAFData serviuce in paymentCallBack method :" + obInsResponse);
                            prInfo(" Starting of Response time sending to OB Job upload Service ");
                            String serviceUrl = onBoardURL + "/bsnl/OnboardIntegrationService/auditJobTransaction";
                            AppLogger.debug("onBoardURL in Job upload method  for audinting " + serviceUrl);
                            String inputFieldsEntity = "{\"CAF_AUDIT_ID\":'"
                                    + obInsResponse.getString("CAF_AUDIT_ID") + "',\"SERVER_RESP_TIME\":'"
                                    + obInsResponse.getString("SERVER_RESP_TIME") + "',\"CLIENT_RESP_TIME\":'"
                                    + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"S\",\"USER_ID\":'-1'}";
                            AppLogger.debug("Input data for auditJobTransaction service in Job upload method : " + inputFieldsEntity);
                            String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                            AppLogger.debug("Response from auditJobTransaction service in in Job upload method:" + SLAResponse);
                            if (obInsResponse.getString("STATUS").equalsIgnoreCase("0")) {
                                 AppLogger.debug("Job Uploaded Successfully in paymentCallBack");
                            } else {
                                AppLogger.debug("Unable to upload Job in paymentCallBack");
                            }
                        }
                    }else{
                        prInfo("Payment failed");
                    }
                }else{
                prInfo("Payment Audit Updation failed");
                }
            } else {
                String session_id = queryString.split("=")[1];
                JSONObject paymentTxnData = getPaymentTxnDtls(session_id);
//               String ReceiptData="{\"CUST_NAME\":\"zxczxzxc zxczx\",\"CAF_NO\":\"LD10035416\",\"WL_CAF_NO\":\"WL_10004488\",\"UID_CUST_ADDR\":\"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqq\",\"BANK_NAME\":\"\",\"AMOUNT\":\"\",\"PAYMENT_TIME\":\"21-DEC-2018 04:18:19 PM\",\"BNK_TXN_ID\":\"\",\"PORTAL_TXN_ID\":\"GWIN2112182934441\",\"TXN_STATUS\":\"FAILURE\",\"TARIFF_PLAN_AMOUNT\":\"1297\",\"WINGS_ISD\":\"0\",\"WINGS_IR\":\"0\",\"DATE_ALLOTMENT\":\"21-12-2018 04:18:44 PM\",\"CONN_APPLIED\":\"Wings\",\"SERVICE_NUMBER\":\"8283831362\"}";
//                JSONObject paymentTxnData = (JSONObject) JSONSerializer.toJSON(ReceiptData);
                prInfo("paymentTxnData :" + paymentTxnData);
                if (paymentTxnData.optString("TXN_STATUS").length() == 0) {
                    paymentTxnData = null;
                    prInfo("paymentTxnData id TXN_STATUS is empty:" + paymentTxnData);
                }else{
//                    if ("SUCCESS".equalsIgnoreCase(paymentTxnData.getString("TXN_STATUS"))) {
                        if (session_id.startsWith("REG-")) {
                            returnVal = "regSuccess";
                        } else {
                            returnVal = "success";
                        }
//                    } else {
//                        if (session_id.startsWith("REG-")) {
//                            returnVal = "regSuccess";
//                        }
//                    }
                }
                HttpSession session = request.getSession();
                prInfo("session :" + session);
                session.setAttribute("PAYMENT_TXN", paymentTxnData);
                request.setAttribute("PAYMENT_TXN", paymentTxnData);
            }
        } catch (Exception e) {
            prErr("Error in paymentCallBack :", e);
        } 
        /*finally {
            AppLogger.info("ZipFileData in finally block " + ZipFileData);
            if (!ZipFileData.isEmpty()) {
                File deletionPath = new File(ZipFileData);
                int index = deletionPath.getAbsolutePath().lastIndexOf(File.separator);
                deletionPath = (index > -1) ? new File(deletionPath.getAbsolutePath().substring(0, index)) : new File(deletionPath.getAbsolutePath());
                new CRSDKYCJobUpload().deleteDirOFFMS(deletionPath);
            }
        }*/

        return returnVal;
    }
    
    /**
     * Method paymentCallBackForDidEkyc for to make the payment transactions for the onboarded customers without payment at the time of onboard.
     * @return Success or error
     */
    
    public String paymentCallBackForDidEkyc() {
        prInfo("****paymentCallBackForDidEkyc****");
        String returnVal = "error";
        HttpServletRequest request = null;
        JSONObject additionalParams = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            String queryString = request.getQueryString();
            prInfo("queryString  :" + queryString);
            String payloadRequest = getPayload(request.getInputStream());
            prDebug("payloadRequest :" + payloadRequest);
            if (payloadRequest.length() > 0) {
                XMLSerializer xmlSerializer = new XMLSerializer();
                JSONObject paymentResponse = (JSONObject) xmlSerializer.read(payloadRequest);
                prDebug("paymentResponse [paymentCallBackForDidEkyc]:" + paymentResponse);
                if (paymentResponse.optString("Info2").contains(",")) {
                    String str = paymentResponse.getString("Info2");
                    String[] strArr = str.split(",");
                    for (int i = 0; i < strArr.length; i++) {
                        String[] temp = strArr[i].split(":");                        
                        additionalParams.put(temp[0], temp[1]);
                        paymentResponse.put(temp[0], temp[1]);
                        
                    }
                    prInfo("additionalParams  :" + additionalParams);
                    if ("PD".equalsIgnoreCase(additionalParams.getString("FT")) && ("1".equalsIgnoreCase(additionalParams.getString("ISD")) || "1".equalsIgnoreCase(additionalParams.getString("IR")))) {                        
                            prInfo("Paid and ISD_IR is selected");
                            paymentResponse.put("PA_UPDATE_FLAG", "PDISD");
                            updateAuditPaymentTxn(paymentResponse);   
                            paymentResponse.put("FDI_UPDATE_FLAG", "PDISD");
                            updateSessionId(paymentResponse);
                            
                    } else {
                        if ("1".equalsIgnoreCase(additionalParams.getString("ISD")) || "1".equalsIgnoreCase(additionalParams.getString("IR"))) {
                            prInfo("Not Paid and ISD_IR is selected");
                            paymentResponse.put("PA_UPDATE_FLAG", "ISD");
                            paymentResponse.put("FDI_UPDATE_FLAG", "PNDISD");   
                            updateSessionId(paymentResponse);
                        } else {     
                            prInfo("Payment not done and ISD_IR is not selected");
                            //paymentResponse.put("PA_UPDATE_FLAG", "PA");
                            //paymentResponse.put("FDI_UPDATE_FLAG", "P");
                        }
                        if (updateAuditPaymentTxn(paymentResponse)) {
                            if (paymentResponse.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                                prInfo("Not done Payment and ISD_IR is not selected");
                                paymentResponse.put("Info2", additionalParams.getString("CAF_NO"));
                                updateSessionId(paymentResponse);
                            }  else {
                               prInfo("Payment failed.... ");
                            }
                        }
                    }
                } else {
                    if (updateAuditPaymentTxn(paymentResponse)) {
                        if (paymentResponse.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                            prInfo(" Payment  success for onboarded customers without ISDIR");
                            updateSessionId(paymentResponse);
                        } else {
                           prInfo("Failed Payment...");
                        }
                    }
                }

            } else {
                String session_id = queryString.split("=")[1];
                JSONObject paymentTxnData = procedureCursorCall(session_id);
                prInfo("paymentTxnData :" + paymentTxnData);
                if (paymentTxnData.optString("TXN_STATUS").length() == 0) {
                    paymentTxnData = null;
                    prInfo("paymentTxnData id TXN_STATUS is empty:" + paymentTxnData);
                    request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_FAIL_EKYC"));
                } else {
                    prInfo("paymentTxnData [TXN_STATUS]:" + paymentTxnData.getString("TXN_STATUS"));
                    returnVal = "success";
                }
                request.setAttribute("PAYMENT_TXN", paymentTxnData);
            }
        } catch (Exception e) {
            prErr("Error in paymentCallBackForDidEkyc :", e);
            request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_CALLBACK_ERROR"));
        }
        return returnVal;
    }
    
    public String paymentCallBackForTrial() {
        prInfo("****paymentCallBackForTrial****");
        String returnVal = "error";
        HttpServletRequest request = null;
        try {
            request = ServletActionContext.getRequest();
            String queryString = request.getQueryString();
            prInfo("queryString  [paymentCallBackForTrial]: " + queryString);
            String payloadRequest = getPayload(request.getInputStream());
            //payloadRequest = "<XML> <CHECKSUM>NA</CHECKSUM> <sessionId>c25c3fa8-bbc4-45d3-8fa8-0346799ca4eb</sessionId> 	<TIME_STAMP>18-JUL-2018 06:21:36 PM</TIME_STAMP> 	<TXN_STATUS>SUCCESS</TXN_STATUS> 	<SUBSCRIBER_ID>WL100000021</SUBSCRIBER_ID> 	<ERROR_CODE>NA</ERROR_CODE> 	<BNK_TXN_ID>181991370777</BNK_TXN_ID> 	<AMOUNT>1.00</AMOUNT> 	<ServiceName>WINGSLLprepaid</ServiceName> 	<PORTAL_TXN_ID>GWIN1807182693567</PORTAL_TXN_ID> 	<ERROR_MSG>NA</ERROR_MSG> 	<DATE_TIME>18-07-18</DATE_TIME> 	<Info1>8522912978</Info1> 	<Info2>ISD:0,IR:1,SCHEME:WS2,FT:PND</Info2> 	<Info3/> 	<Info4/> 	<VENDOR_TXN_ID>INTFMT180720180021</VENDOR_TXN_ID> 	<BANK_NAME>HDF</BANK_NAME> </XML>";
            prDebug("payloadRequest [paymentCallBackForTrial]: " + payloadRequest);
            if (payloadRequest.length() > 0) {
                XMLSerializer xmlSerializer = new XMLSerializer();
                JSONObject paymentResponse = (JSONObject) xmlSerializer.read(payloadRequest);
                prDebug("paymentResponse [paymentCallBackForTrial]: " + paymentResponse);

                if (paymentResponse.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                    String info2Str = fetchInfo2DetailsTrial(paymentResponse.getString("sessionId")).optString("INFO2");
                    if (info2Str.contains(",")) {
                        JSONObject additionalParams = new JSONObject();
                        prInfo("STRING INFO2  in paymentCallBackForTrial ::" + info2Str);
                        String[] strArr = info2Str.split(",");
                        for (int i = 0; i < strArr.length; i++) {
                            String[] temp = strArr[i].split(":");
                            if (temp.length == 2) {
                                additionalParams.put(temp[0], temp[1]);
                            } else {
                                additionalParams.put(temp[0], "");
                            }
                        }
                        prInfo("additionalParams  [paymentCallBackForTrial]: " + additionalParams);

                        prInfo("[updateTrailPaymentAuditTxn] [paymentCallBackForTrial]:[STATUS] ::" + updateTrailPaymentAuditTxn(paymentResponse));

                        if (additionalParams.getInt("WINGS_ISD") == 1) {
                            prInfo("[updateTrailPaymentAuditISDIRTxn] [paymentCallBackForTrial]:[STATUS] ::" + updateTrailPaymentAuditISDIRTxn(paymentResponse));
                        }
                        if (!additionalParams.getString("SCHEME_ID").equals("WS0")) {
                            prInfo("[updateSchemePaymentTxn][paymentCallBackForTrial]:[STATUS] ::" + updateSchemePaymentTxn(paymentResponse));
                        }
                        if (updateFMSTrialData(additionalParams)) {
                            if (paymentResponse.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                                prInfo("Payment  success for onboarded customers without ISDIR");
                            } else {
                                prInfo("Failed Payment... [paymentCallBackForTrial] ");
                            }
                        } else {
                            prInfo("Failed [updateFMSTrialData] [paymentCallBackForTrial]");
                        }
                    }
                } else {
                    prInfo("Payment TXN_STATUS Failed [paymentCallBackForTrial]: " + paymentResponse);
                }

            } else {
                String session_id = queryString.split("=")[1];
                JSONObject paymentTxnData = procedureCursorCall(session_id);
                prInfo("paymentTxnData [paymentCallBackForTrial]: " + paymentTxnData);
                if (!paymentTxnData.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                    paymentTxnData = null;
                    prInfo("paymentTxnData id TXN_STATUS is empty [paymentCallBackForTrial]: " + paymentTxnData);
                    request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_FAIL_EKYC"));
                } else {
                    prInfo("paymentTxnData [TXN_STATUS][paymentCallBackForTrial]: " + paymentTxnData.getString("TXN_STATUS"));
                    returnVal = "success";
                }
                request.setAttribute("PAYMENT_TXN", paymentTxnData);
            }
        } catch (Exception e) {
            prErr("Error in [[paymentCallBackForTrial]] :", e);
            request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_CALLBACK_ERROR"));
        } finally {
            prInfo("Response [paymentCallBackForTrial]: " + returnVal);
        }
        return returnVal;
    }

    public JSONObject initiatePayment(JSONObject request) {
        prInfo("START :initiatePayment");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh.mm.ss aa");
        String formattedDate = dateFormat.format(new Date()).toString();
        request.put("DATE_TIME", formattedDate);
        String txn_id = "IN10S_" + new SimpleDateFormat("ddMMyyyyhhmmsss").format(new Date()).toString() + "_" + (request.getString("CAF_NO").substring(3));
        request.put("VENDOR_TXN_ID", txn_id);
        if (0 == request.optInt("AMOUNT", 0)) {
            request.put("AMOUNT", CRSAppResources.WINGS_PAY_AMOUNT);
        }
        String serviceURL = CRSAppResources.PAY_INIT_URL;
        serviceURL = serviceURL.toString().trim() + "/bsnl/PaymentService/initiatePayment";
        prInfo("serviceURL in initiatePayment :" + serviceURL);
        String inputFieldsEntity = request.toString();
        prInfo("request in initiatePayment :" + inputFieldsEntity);
        String strStatusObj = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
        JSONObject serviceResponse = (JSONObject) JSONSerializer.toJSON(strStatusObj);
        serviceResponse.put("sessionId", request.getString("SESSION_ID"));
        serviceResponse.put("VENDOR_TXN_ID", txn_id);
        serviceResponse.put("AMOUNT", request.getInt("AMOUNT"));
        prDebug("serviceResponse :" + serviceResponse);
        return serviceResponse;
    }

    public String getPayload(InputStream is) {
        prInfo("****getPayload***");
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();
        String line;
        try {
            prDebug("is:: " + is.available() + "::is ::" + is);
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            prErr("Error in getPayload",e);
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        prDebug("payload return val::: " + sb.toString());
        return sb.toString();
    }

    public boolean auditPaymentTxn(JSONObject auditData) {
        prInfo("Start : auditPaymentTxn");
        prDebug("Audit Data :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [auditPaymentTxn]  ::  " + con);
            String[] columns = {"CAF_NO", "sessionId", "BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "Info1" , "TARIFF_PLAN_ID"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [auditPaymentTxn] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("auditPaymentTxn ins count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in auditPaymentTxn :", e);

        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : auditPaymentTxn");
        return status;
    }
    
    public boolean auditPaymentTxnforISDIR(JSONObject auditData) {
        prInfo("Start : auditPaymentTxnforISDIR");
        prDebug("Audit Data IN auditPaymentTxnforISDIR :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [auditPaymentTxnforISDIR]  ::  " + con);
            String[] columns = {"CAF_NO", "sessionId", "BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "Info1" ,"REQ_TYPE"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_PAYMENT_AUDIT_ISDIR").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [auditPaymentTxnforISDIR] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("auditPaymentTxnforISDIR ins count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in auditPaymentTxnforISDIR :", e);

        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : auditPaymentTxnforISDIR");
        return status;
    }
    
    public boolean auditSchemePaymentTxn(JSONObject auditData) {
        prInfo("Start : auditSchemePaymentTxn");
        prDebug("Audit Data IN auditSchemePaymentTxn :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [auditSchemePaymentTxn]  ::  " + con);
            String[] columns = {"CAF_NO", "sessionId", "BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "Info1" ,"REQ_TYPE"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_SCHEME_PYMT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [auditSchemePaymentTxn] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("auditSchemePaymentTxn ins count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in auditSchemePaymentTxn :", e);

        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : auditSchemePaymentTxn");
        return status;
    }

    public boolean updateAuditPaymentTxn(JSONObject auditData) {
        prInfo("Start : updateauditPaymentTxn");
        prDebug("updateauditPaymentTxn Data :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        boolean bRetry = false;
        int nRetries = 3; //Total number of Retries
        int nRetryCnt = 0; // Hold the Retry count
        while (!bRetry) {
            try {
                String auditPaymentTxnQry = "";
                con = CRSDBManager.getConnection();
                prDebug("Con in [updateauditPaymentTxn]  ::  " + con);
                String[] columns = {"BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "BANK_NAME", "sessionId"};                 
                if(!"PDISD".equals(auditData.optString("PA_UPDATE_FLAG"))) {
                    auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_WINGS_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);              
                    prDebug("Query [updateauditPaymentTxn] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                    pstmt = con.prepareStatement(auditPaymentTxnQry);
                    for (int i = 0; i < columns.length; i++) {
                        pstmt.setString(i + 1, auditData.optString(columns[i]));
                    }
                    int insCount = pstmt.executeUpdate();
                    prDebug("updateauditPaymentTxn ins count :: " + insCount);
                    pstmt.close();
                    if (insCount == 1) {
                        status = true;
                    }
                    bRetry = true;
                }
                if("PDISD".equals(auditData.optString("PA_UPDATE_FLAG")) || "ISD".equals(auditData.optString("PA_UPDATE_FLAG"))){
                    auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_ISDIR_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                    prDebug("Query [updateauditPaymentTxn ISDIR ] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                    pstmt = con.prepareStatement(auditPaymentTxnQry);
                    for (int i = 0; i < columns.length; i++) {
                        pstmt.setString(i + 1, auditData.optString(columns[i]));
                    }
                    int insCount = pstmt.executeUpdate();
                    prDebug("updateauditPaymentTxn ins count :: " + insCount);
                    pstmt.close();
                    if (insCount == 1) {
                        status = true;
                    }
                    bRetry = true;
                }
                if(auditData.containsKey("SCHEME_UPDATE_FLAG")){
                    auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_SCHEME_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                    prDebug("Query [updateauditPaymentTxn ISDIR ] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                    pstmt = con.prepareStatement(auditPaymentTxnQry);
                    for (int i = 0; i < columns.length; i++) {
                        pstmt.setString(i + 1, auditData.optString(columns[i]));
                    }
                    int insCount = pstmt.executeUpdate();
                    prDebug("updateauditPaymentTxn ins count :: " + insCount);
                    pstmt.close();
                    if (insCount == 1) {
                        status = true;
                    }
                    bRetry = true;
                
                }
            } catch (Exception e) {
                nRetryCnt++;
                if (nRetryCnt == nRetries) {
                    bRetry = true;  // If exception occured after the number of retrys then
                    prErr("Error in updateauditPaymentTxn :", e);
                } else {
                    try {
                        Thread.sleep(1000); // waiting 1 second before retry if in case of falure
                    } catch (Exception tex) {
                        prErr("Error in updateauditPaymentTxn [Thread(sleep)]:", tex);
                    }
                }

            } finally {
                CRSDBManager.closePS(pstmt);
                CRSDBManager.closeCon(con);
            }
        }
        prInfo("Result from updateauditPaymentTxn :" + status);
        prInfo("End : updateauditPaymentTxn");
        return status;
    }

    public JSONObject getPaymentTxnDtls(String session_id) {
        prInfo("Start : getPaymentTxnDtls");
        prDebug("getPaymentTxnDtls Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject pymtDtls = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [getPaymentTxnDtls]  ::  " + con);
            String paymentTxnDtls = "";
            if (session_id.startsWith("REG-")) {
                paymentTxnDtls = new CRSPropertyReader().getQueryonId("GET_REG_PYMT_TXN_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }else {
                paymentTxnDtls = new CRSPropertyReader().getQueryonId("GET_PYMT_TXN_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }
            prDebug("Query [getPaymentTxnDtls] :: " + paymentTxnDtls);
            pstmt = con.prepareStatement(paymentTxnDtls);
            pstmt.setString(1, session_id);
            pstmt.setString(2, session_id);
            rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            if (rs.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = rs.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    pymtDtls.put(colName, colValue);
                }
            }
        } catch (Exception e) {
            prErr("Error in getPaymentTxnDtls :", e);
            pymtDtls = new JSONObject();
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : getPaymentTxnDtls");
        return pymtDtls;
    }

    public JSONObject getPrePaymentData(String session_id) {
        prInfo("Start : getPrePaymentData");
        prDebug("getPrePaymentData Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject PrePaymentData = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [getPrePaymentData]  ::  " + con);
            String getPrePaymentData = new CRSPropertyReader().getQueryonId("GET_PRE_PYMT_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [getPrePaymentData] :: " + getPrePaymentData);
            pstmt = con.prepareStatement(getPrePaymentData);
            pstmt.setString(1, session_id);
            rs = pstmt.executeQuery();
            if (rs.next()) {
                Clob clob = rs.getClob("JOB_DATA");
                if (clob != null) {
                    String ClobData = clob.getSubString(1, (int) clob.length());
                    ClobData = ClobData.trim();
                    PrePaymentData.put("JOB_DATA", ClobData);
                }
            } else {
                prDebug("SessionID not exist [getPrePaymentData] :: " + session_id);
            }
        } catch (Exception e) {
            prErr("Error in getPrePaymentData :", e);
            PrePaymentData = new JSONObject();
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : getPrePaymentData");
        return PrePaymentData;
    }

    public boolean updateSessionId(JSONObject auditData) {
        prInfo("Start : updateSessionId");
        prDebug("updateSessionId Data :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [updateauditPaymentTxn]  ::  " + con);
            String auditPaymentTxn_Qry = "";
            String[] columns = null;   
            if("PNDISD".equals(auditData.optString("FDI_UPDATE_FLAG"))){
                columns = new String[]{"SUBSCRIBER_ID","sessionId","ISD","IR","CAF_NO"};
                auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_WL_SID_ISD").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }else if("PDISD".equals(auditData.optString("FDI_UPDATE_FLAG"))){
                columns = new String[]{"ISD","IR","CAF_NO"};
                auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_ISD_IR").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }else{
                columns = new String[]{"SUBSCRIBER_ID","sessionId","Info2"};
                auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_WL_SESSIONID").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }
            
            prDebug("Query [updateSessionId] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("updateSessionId ins count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in updateSessionId :", e);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("Result from updateSessionId :" + status);
        prInfo("End : updateSessionId");
        return status;
    }
    
    public String paymentCallBackForMobile() {
        prInfo("****paymentCallBackForMobile****");
        String returnVal = "error";
        try {
            HttpServletRequest request = ServletActionContext.getRequest();
            String queryString = request.getQueryString();
            response = new CRSResponse();
            String payloadRequest = getPayload(request.getInputStream());
            prDebug((new StringBuilder()).append("payloadRequest :").append(payloadRequest).toString());
            if (payloadRequest.length() > 0) {
                XMLSerializer xmlSerializer = new XMLSerializer();
                JSONObject paymentResponse = (JSONObject) xmlSerializer.read(payloadRequest);
                prDebug((new StringBuilder()).append("paymentResponse :").append(paymentResponse).toString());
                if (updateAuditPaymentTxn(paymentResponse)) {
                    prDebug("Payment txn status updated");
                }
            } else {
                String session_id = queryString.split("=")[1];
                JSONObject paymentTxnData = getPaymentTxnDtls(session_id);
                prInfo((new StringBuilder()).append("paymentTxnData :").append(paymentTxnData).toString());
                if (paymentTxnData.getString("TXN_STATUS").length() == 0) {
                    paymentTxnData = null;
                    prInfo((new StringBuilder()).append("paymentTxnData id TXN_STATUS is empty:").append(paymentTxnData).toString());
                } else if ("SUCCESS".equalsIgnoreCase(paymentTxnData.getString("TXN_STATUS"))) {
                    returnVal = "success";
                } else {
                    returnVal = "error";
                }
                HttpSession session = request.getSession();
                prInfo((new StringBuilder()).append("session :").append(session).toString());
                session.setAttribute("PAYMENT_TXN", paymentTxnData);
                request.setAttribute("PAYMENT_TXN", paymentTxnData);
            }
        } catch (Exception e) {
            prErr("Error in paymentCallBackForMobile :", e);
        }
        return returnVal;
    }
    
    public JSONObject procedureCursorCall(String session_id) {
        prInfo("[procedureCursorCall][START]");
        Connection con = null;
        CallableStatement cstmt = null;
        ResultSet rs = null;
        JSONObject respJson = new JSONObject();
        prDebug("Req data ::" + session_id);
        CRSPropertyReader objCRSPropertyReader = new CRSPropertyReader();
        try {            
            String sql = "{call " + objCRSPropertyReader.getQueryonId("PROC_PAYMENT_AUDIT_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA) + "}";            
            prDebug("Query  procedureCursorCall :: " + sql);
            con = CRSDBManager.getConnection();
            prDebug("Con in   :  " + con);
            cstmt = con.prepareCall(sql);
            cstmt.setString(1, session_id);            
//            cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
            cstmt.registerOutParameter(2, oracle.jdbc.OracleTypes.CURSOR);
            cstmt.execute();
           // int status = cstmt.getInt(2);
          //  prInfo("Procedure Status : " + status);
          //  if (status == 0) {
                rs = (ResultSet)cstmt.getObject(2);
                ResultSetMetaData metaData = rs.getMetaData();
                JSONObject jobJson = new JSONObject();
                if (rs.next()) {
                    for (int i = 1; i <= metaData.getColumnCount(); i++) {
                        String colName = metaData.getColumnName(i);
                        String colValue = rs.getString(colName);
                        colValue = colValue != null ? colValue.trim() : "";                        
                        respJson.put(colName, colValue);
                    }
                    respJson.put("STATUS", "0");                   
                    respJson.put("MESSAGE", "SUCCESS");
                } else{
                    respJson.put("STATUS", "1");                    
                    respJson.put("MESSAGE", objCRSPropertyReader.getMessge(""));
                }
//            } else{
//                respJson.put("MESSAGE", objCRSPropertyReader.getMessge(""));
//                respJson.put("STATUS", "-1");
//            }    
            
        } catch (Exception e) {
            prErr("Error in [procedureCursorCall] ::" , e);            
            respJson.put("MESSAGE", objCRSPropertyReader.getMessge(""));
            respJson.put("STATUS", "-1");
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(cstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[procedureCursorCall][END]");
        return respJson;
    }
    
    private static String convertFileToString(File file) throws Exception {
        byte[] bytes = Files.readAllBytes(file.toPath());
        return new String(DatatypeConverter.printBase64Binary(bytes));
    }
    
    public JSONObject fetchInfo2Details(String session_id) {
        prInfo("Start : [paymentGateway][fetchInfo2Details]");
        prDebug("fetchInfo2Details Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject info2Data = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [fetchInfo2Details]  ::  " + con);
            String getPrePaymentData = new CRSPropertyReader().getQueryonId("GET_INFO2_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [fetchInfo2Details] :: " + getPrePaymentData);
            pstmt = con.prepareStatement(getPrePaymentData);
            pstmt.setString(1, session_id);
            rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            if (rs.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = rs.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    info2Data.put(colName, colValue);
                }
            } else {
                prDebug("SessionID not exist [fetchInfo2Details] :: " + session_id);
            }
        } catch (Exception e) {
            prErr("Error in fetchInfo2Details :", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : [PaymentGateway]fetchInfo2Details"+info2Data);

        return info2Data;
    }
    
    public JSONObject fetchInfo2DetailsTrial(String session_id) {
        prInfo("Start : [paymentGateway][fetchInfo2Details]");
        prDebug("fetchInfo2Details Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject info2Data = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [fetchInfo2Details]  ::  " + con);
            String getPrePaymentData = new CRSPropertyReader().getQueryonId("GET_INFO2_TRIAL_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [fetchInfo2Details] :: " + getPrePaymentData);
            pstmt = con.prepareStatement(getPrePaymentData);
            pstmt.setString(1, session_id);
            rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            if (rs.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = rs.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    info2Data.put(colName, colValue);
                }
            } else {
                prDebug("SessionID not exist [fetchInfo2Details] :: " + session_id);
            }
        } catch (Exception e) {
            prErr("Error in fetchInfo2Details :", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : [PaymentGateway]fetchInfo2Details"+info2Data);

        return info2Data;
    }

    public boolean updateFMSTrialData(JSONObject auditData) {
        prInfo("[updateFMSTrialData][START]");       
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {            
            prDebug("ReqData [updateFMSTrialData] :" + auditData);
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_FMS_TRIAL_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            String[] columns  = new String[]{"WINGS_TARIFF_PLAN_ID","WINGS_TARIFF_PLAN_VALUE","TARIFF_ID_NAME","TARIFF_ID_VALUE","WINGS_ISD","WINGS_IR","SESSION_ID","SCHEME_ID","SCHEME_NAME","CAF_NO"};
            prDebug("Query [updateFMSTrialData] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            con = CRSDBManager.getConnection();
            prDebug("Con in [updateauditPaymentTxn]  ::  " + con);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i].trim()));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("update count [updateFMSTrialData] :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in [updateFMSTrialData] : ", e);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[updateFMSTrialData][END] " + status);       
        return status;
    }
    
    public boolean updateTrailPaymentAuditTxn(JSONObject auditData) {
        prInfo("[updateTrailPaymentAuditTxn][START]");       
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        boolean bRetry = false;
        int nRetries = 3; //Total number of Retries
        int nRetryCnt = 0; // Hold the Retry count
        while (!bRetry) {
            try {
                prDebug("ReqData [updateTrailPaymentAuditTxn] : " + auditData);
                String[] columns = {"BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "BANK_NAME", "sessionId"};
                String auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_TRIAL_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                prDebug("Query [updateTrailPaymentAuditTxn] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                con = CRSDBManager.getConnection();
                prDebug("Con in [updateTrailPaymentAuditTxn]  ::  " + con);
                pstmt = con.prepareStatement(auditPaymentTxnQry);
                for (int i = 0; i < columns.length; i++) {
                    pstmt.setString(i + 1, auditData.optString(columns[i].trim()));
                }
                int insCount = pstmt.executeUpdate();
                prDebug("update count [updateauditPaymentTxn] :: " + insCount);
                pstmt.close();
                if (insCount == 1) {
                    status = true;
                }
                bRetry = true;
            } catch (Exception e) {
                nRetryCnt++;
                if (nRetryCnt == nRetries) {
                    bRetry = true;  // If exception occured after the number of retrys then
                    prErr("Error in [updateTrailPaymentAuditTxn] : ", e);
                } else {
                    try {
                        Thread.sleep(1000); // waiting 1 second before retry if in case of falure
                    } catch (Exception tex) {
                        prErr("Error in [updateTrailPaymentAuditTxn] [Thread(sleep)]: ", tex);
                    }
                }

            } finally {
                CRSDBManager.closePS(pstmt);
                CRSDBManager.closeCon(con);
            }
        }
        prInfo("[updateTrailPaymentAuditTxn][END] " + status);      
        return status;
    }
     
    public boolean updateTrailPaymentAuditISDIRTxn(JSONObject auditData) {
        prInfo("[updateTrailPaymentAuditISDIRTxn][START]");       
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        boolean bRetry = false;
        int nRetries = 3; //Total number of Retries
        int nRetryCnt = 0; // Hold the Retry count
        while (!bRetry) {
            try {
                prDebug("ReqData [updateTrailPaymentAuditISDIRTxn] : " + auditData);
                String[] columns = {"BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "BANK_NAME", "sessionId"};
                String auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_ISDIR_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                prDebug("Query [updateTrailPaymentAuditISDIRTxn] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                con = CRSDBManager.getConnection();
                prDebug("Con in [updateTrailPaymentAuditISDIRTxn]  ::  " + con);
                pstmt = con.prepareStatement(auditPaymentTxnQry);
                for (int i = 0; i < columns.length; i++) {
                    pstmt.setString(i + 1, auditData.optString(columns[i].trim()));
                }
                int insCount = pstmt.executeUpdate();
                prDebug("update count [updateTrailPaymentAuditISDIRTxn] :: " + insCount);
                pstmt.close();
                if (insCount == 1) {
                    status = true;
                }
                bRetry = true;
            } catch (Exception e) {
                nRetryCnt++;
                if (nRetryCnt == nRetries) {
                    bRetry = true;  // If exception occured after the number of retrys then
                    prErr("Error in [updateTrailPaymentAuditISDIRTxn] : ", e);
                } else {
                    try {
                        Thread.sleep(1000); // waiting 1 second before retry if in case of falure
                    } catch (Exception tex) {
                        prErr("Error in [updateTrailPaymentAuditISDIRTxn] [Thread(sleep)]: ", tex);
                    }
                }

            } finally {
                CRSDBManager.closePS(pstmt);
                CRSDBManager.closeCon(con);
            }
        }
        prInfo("[updateTrailPaymentAuditISDIRTxn][END] " + status);      
        return status;
    }
    
    public boolean updateSchemePaymentTxn(JSONObject auditData) {
        prInfo("[updateSchemePaymentTxn][START]");       
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        boolean bRetry = false;
        int nRetries = 3; //Total number of Retries
        int nRetryCnt = 0; // Hold the Retry count
        while (!bRetry) {
            try {
                prDebug("ReqData [updateSchemePaymentTxn] : " + auditData);
                String[] columns = {"BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "BANK_NAME", "sessionId"};
                String auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_SCHEME_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                    prDebug("Query [updateSchemePaymentTxn  ] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                    con = CRSDBManager.getConnection();
                    prDebug("Con in [updateSchemePaymentTxn]  ::  " + con);
                    pstmt = con.prepareStatement(auditPaymentTxnQry);
                    for (int i = 0; i < columns.length; i++) {
                        pstmt.setString(i + 1, auditData.optString(columns[i]));
                    }
                    int insCount = pstmt.executeUpdate();
                    prDebug("updateSchemePaymentTxn ins count :: " + insCount);
                    pstmt.close();
                    if (insCount == 1) {
                        status = true;
                    }
                    bRetry = true;
            } catch (Exception e) {
                nRetryCnt++;
                if (nRetryCnt == nRetries) {
                    bRetry = true;  // If exception occured after the number of retrys then
                    prErr("Error in [updateSchemePaymentTxn] : ", e);
                } else {
                    try {
                        Thread.sleep(1000); // waiting 1 second before retry if in case of falure
                    } catch (Exception tex) {
                        prErr("Error in [updateSchemePaymentTxn] [Thread(sleep)]: ", tex);
                    }
                }

            } finally {
                CRSDBManager.closePS(pstmt);
                CRSDBManager.closeCon(con);
            }
        }
        prInfo("[updateSchemePaymentTxn][END] " + status);      
        return status;
    }
     
     /*----------------------------------CDR PAYMNET CALL BACK------------------------------*/
     
    public String paymentCallBackForCDRTrial() {
        prInfo("****paymentCallBackForCDRTrial****");
        String returnVal = "error";
        HttpServletRequest request = null;
        try {
            request = ServletActionContext.getRequest();
            String queryString = request.getQueryString();
            prInfo("queryString  [paymentCallBackForCDRTrial]: " + queryString);
            String payloadRequest = getPayload(request.getInputStream());
//              payloadRequest = "<XML> <CHECKSUM>NA</CHECKSUM> <sessionId>7d80c5eb-f30f-4f6a-a37a-a4f2bb85334a</sessionId> 	<TIME_STAMP>18-JUL-2018 06:21:36 PM</TIME_STAMP> 	<TXN_STATUS>SUCCESS</TXN_STATUS> 	<SUBSCRIBER_ID>WL100000021</SUBSCRIBER_ID> 	<ERROR_CODE>NA</ERROR_CODE> 	<BNK_TXN_ID>181991370777</BNK_TXN_ID> 	<AMOUNT>1.00</AMOUNT> 	<ServiceName>WINGSLLprepaid</ServiceName> 	<PORTAL_TXN_ID>GWIN1807182693567</PORTAL_TXN_ID> 	<ERROR_MSG>NA</ERROR_MSG> 	<DATE_TIME>18-07-18</DATE_TIME> 	<Info1>8522912978</Info1> 	<Info2>ISD:0,IR:1,SCHEME:WS2,FT:PND</Info2> 	<Info3/> 	<Info4/> 	<VENDOR_TXN_ID>INTFMT180720180021</VENDOR_TXN_ID> 	<BANK_NAME>HDF</BANK_NAME> </XML>";
            prDebug("payloadRequest [paymentCallBackForCDRTrial]: " + payloadRequest);
            if (payloadRequest.length() > 0) {
                XMLSerializer xmlSerializer = new XMLSerializer();
                JSONObject paymentResponse = (JSONObject) xmlSerializer.read(payloadRequest);
                prDebug("paymentResponse [paymentCallBackForCDRTrial]: " + paymentResponse);
                if (paymentResponse.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                    String info2Str = fetchCDRDetails(paymentResponse.getString("sessionId")).optString("INFO2");
                    if (info2Str.contains(",")) {
                        JSONObject additionalParams = new JSONObject();
                        prInfo("STRING INFO2  in paymentCallBackForCDRTrial ::" + info2Str);
                        String[] strArr = info2Str.split(",");
                        for (int i = 0; i < strArr.length; i++) {
                            String[] temp = strArr[i].split(":");
                            if (temp.length == 2) {
                                additionalParams.put(temp[0], temp[1]);
                            } else {
                                additionalParams.put(temp[0], "");
                            }
                        }
                        prInfo("additionalParams  [paymentCallBackForCDRTrial]: " + additionalParams);
                        prInfo("STATUS [updateCDRTrailPaymentAuditTxn]: " + updateCDRTrailPaymentAuditTxn(paymentResponse));
                        prInfo("STATUS [updateCDRData]: " + updateCDRData(additionalParams));
                        if (!additionalParams.getString("SCHEME_ID").equals("WS0")) {
                            prInfo("[updateSchemePaymentTxn][updateCDRTrailPaymentAuditTxn]:[STATUS] ::" + updateSchemePaymentTxn(paymentResponse));
                        }
                    }
                } else {
                    prInfo("Payment TXN_STATUS Failed [paymentCallBackForCDRTrial]: " + paymentResponse);
                }

            } else {
                String session_id = queryString.split("=")[1];
                JSONObject paymentTxnData = getCDRPaymentTxnDtls(session_id);
                prInfo("paymentTxnData [paymentCallBackForCDRTrial]: " + paymentTxnData);
                if (!paymentTxnData.optString("TXN_STATUS").equalsIgnoreCase("SUCCESS")) {
                    paymentTxnData = null;
                    prInfo("paymentTxnData id TXN_STATUS is empty [paymentCallBackForCDRTrial]: " + paymentTxnData);
                    request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_FAIL_CDR"));
                } else {
                    prInfo("paymentTxnData [TXN_STATUS][paymentCallBackForCDRTrial]: " + paymentTxnData.getString("TXN_STATUS"));
                    returnVal = "success";
                }
                request.setAttribute("PAYMENT_TXN", paymentTxnData);
            }
        } catch (Exception e) {
            prErr("Error in [[paymentCallBackForCDRTrial]] :", e);
            request.setAttribute("MESSAGE", new CRSPropertyReader().getMessge("PYMT_CALLBACK_CDR__ERROR"));
        } finally {
            prInfo("Response [paymentCallBackForCDRTrial]: " + returnVal);
        }
        return returnVal;
    }

    public JSONObject fetchCDRDetails(String session_id) {
        prInfo("Start : [paymentGateway][fetchCDRDetails]");
        prDebug("fetchCDRDetails Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject info2Data = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [fetchCDRDetails]  ::  " + con);
            String getPrePaymentData = new CRSPropertyReader().getQueryonId("GET_CDR_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [fetchCDRDetails] :: " + getPrePaymentData);
            pstmt = con.prepareStatement(getPrePaymentData);
            pstmt.setString(1, session_id);
            rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            if (rs.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = rs.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    info2Data.put(colName, colValue);
                }
            } else {
                prDebug("SessionID not exist [fetchCDRDetails] :: " + session_id);
            }
        } catch (Exception e) {
            prErr("Error in fetchCDRDetails :", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : [PaymentGateway]fetchCDRDetails" + info2Data);

        return info2Data;
    }

    public JSONObject getCDRPaymentTxnDtls(String session_id) {
        prInfo("Start : getCDRPaymentTxnDtls");
        prDebug("getCDRPaymentTxnDtls Data :" + session_id);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject pymtDtls = new JSONObject();
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [getCDRPaymentTxnDtls]  ::  " + con);
            String paymentTxnDtls = new CRSPropertyReader().getQueryonId("WINGS_CDR_TXN_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [getCDRPaymentTxnDtls] :: " + paymentTxnDtls);
            pstmt = con.prepareStatement(paymentTxnDtls);
            pstmt.setString(1, session_id);
            rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            if (rs.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = rs.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    pymtDtls.put(colName, colValue);
                }
            }
        } catch (Exception e) {
            prErr("Error in getCDRPaymentTxnDtls :", e);
            pymtDtls = new JSONObject();
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : getCDRPaymentTxnDtls");
        return pymtDtls;
    }

    public boolean updateCDRTrailPaymentAuditTxn(JSONObject auditData) {
        prInfo("[updateTrailPaymentAuditTxn][START]");
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        boolean bRetry = false;
        int nRetries = 3; //Total number of Retries
        int nRetryCnt = 0; // Hold the Retry count
        while (!bRetry) {
            try {
                prDebug("ReqData [updateTrailPaymentAuditTxn] : " + auditData);
                String[] columns = {"BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "BANK_NAME", "sessionId"};
                String auditPaymentTxnQry = new CRSPropertyReader().getQueryonId("UPDATE_WINGS_CDR_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                prDebug("Query [updateTrailPaymentAuditTxn] :: " + auditPaymentTxnQry + " | Column Length :: " + columns.length);
                con = CRSDBManager.getConnection();
                prDebug("Con in [updateTrailPaymentAuditTxn]  ::  " + con);
                pstmt = con.prepareStatement(auditPaymentTxnQry);
                for (int i = 0; i < columns.length; i++) {
                    pstmt.setString(i + 1, auditData.optString(columns[i].trim()));
                }
                int insCount = pstmt.executeUpdate();
                prDebug("update count [updateauditPaymentTxn] :: " + insCount);
                pstmt.close();
                if (insCount == 1) {
                    status = true;
                }
                bRetry = true;
            } catch (Exception e) {
                nRetryCnt++;
                if (nRetryCnt == nRetries) {
                    bRetry = true;  // If exception occured after the number of retrys then
                    prErr("Error in [updateTrailPaymentAuditTxn] : ", e);
                } else {
                    try {
                        Thread.sleep(1000); // waiting 1 second before retry if in case of falure
                    } catch (Exception tex) {
                        prErr("Error in [updateTrailPaymentAuditTxn] [Thread(sleep)]: ", tex);
                    }
                }

            } finally {
                CRSDBManager.closePS(pstmt);
                CRSDBManager.closeCon(con);
            }
        }
        prInfo("[updateTrailPaymentAuditTxn][END] " + status);
        return status;
    }

    public boolean updateCDRData(JSONObject auditData) {
        prInfo("[updateCDRData][START]");
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            String currentTimeStamp = new SimpleDateFormat("dd-MMM-yyyy hh.mm.ss.SSS aaa").format(new java.sql.Time(new java.util.Date().getTime()));
            prDebug("ReqData [updateCDRData] :" + auditData);
            auditData.put("RENEWAL_STATUS", 1);
            auditData.put("PROCESSED_DATE", currentTimeStamp);
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_CDR_RENEWAL_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            String[] columns = new String[]{"WINGS_TARIFF_PLAN_ID", "WINGS_TARIFF_PLAN_VALUE", "TARIFF_ID_NAME", "TARIFF_ID_VALUE", "WINGS_ISD", "WINGS_IR", "SESSION_ID", "RENEWAL_STATUS", "PROCESSED_DATE", "FILE_PATH","SCHEME_ID","SCHEME_NAME", "CAF_NO"};
            prDebug("Query [updateFMSTrialData] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            con = CRSDBManager.getConnection();
            prDebug("Con in [updateCDRData]  ::  " + con);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i].trim()));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("update count [updateCDRData] :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prErr("Error in [updateCDRData] : ", e);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[updateCDRData][END] " + status);
        return status;
    }
    
    
    
     public int validateDisconnectionCAF(JSONObject reqData) {
        prInfo("[validateDisconnectionCAF][START]");       
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        int count = -1;
        try {            
            prDebug("ReqData [validateDisconnectionCAF] reqData:" + reqData);
            String validateDiscon_Qry = new CRSPropertyReader().getQueryonId(reqData.getString("queryId")).replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            String[] columns  = new String[]{"CAF_NO"};
            prDebug("Query [validateDisconnectionCAF] :: " + validateDiscon_Qry + " | Column Length :: " + columns.length);
            con = CRSDBManager.getConnection();
            prDebug("Con in [validateDisconnectionCAF]  ::  " + con);
            pstmt = con.prepareStatement(validateDiscon_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, reqData.optString(columns[i].trim()));
            }
            rs = pstmt.executeQuery();
            if (rs.next()) {
                count=rs.getInt("COUNT");
            }
        } catch (Exception e) {
            prErr("Error in [validateDisconnectionCAF] : ", e);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
            CRSDBManager.closeRS(rs);
        }
        prInfo("[validateDisconnectionCAF][END] count::" + count);       
        return count;
    }
      
    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }
}
     
      
 

