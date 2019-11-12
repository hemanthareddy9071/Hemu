/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmsjobupload;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSMDH5;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.commons.WfPropertyManager;
import com.in10s.config.CRSAppResources;
import com.in10s.core.CRSUtils;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.logger.AppLogger;
import com.in10s.payment.PaymentGateway;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramesh.a
 */
public class CRSFmsJobUpload {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String FileWriting(String content, String path) {
        prInfo("[CRSFmsJobUpload][FileWriting] START");
        FileOutputStream fop = null;
        File file;
        try {
            file = new File(path);
            fop = new FileOutputStream(file);
            // if file doesnt exists, then create it
            if (file.exists()) {
                file.delete();
            }
            // get the content in bytes
            byte[] contentInBytes = content.getBytes();
            fop.write(contentInBytes);
            fop.flush();
            fop.close();
        } catch (IOException e) {
            prLog("Exception in  [CRSFmsJobUpload][FileWriting] : ", e);
            return "fail";
        } finally {
            try {
                if (fop != null) {
                    fop.close();
                }
            } catch (IOException e) {
                prLog("Exception in  FileWriting method in finally block: ", e);
            }
            fop = null;
        }
        prInfo("[CRSFmsJobUpload][FileWriting] END");
        return "success";
    }

    public String doZip(String ZipFilePath, List imageList, List docList, String Folder) {
        prInfo("[CRSFmsJobUpload][doZip] START");
        String status = "fail";
        try {
            FileOutputStream fos = new FileOutputStream(ZipFilePath + "\\" + Folder + ".zip");
            ZipOutputStream zos = new ZipOutputStream(fos);

            for (int i = 0; i < imageList.size(); i++) {
                addToZipFile(imageList.get(i) + "", docList.get(i) + "", zos);

            }
            zos.close();
            fos.close();
//            if (status.equalsIgnoreCase("sucess")) {
//                byte[] zipByteData = IOUtils.toByteArray(new FileInputStream(new File(ZipFilePath + "\\" + mobile_number + ".zip")));
//                DoEncryptionAndDecryption andDecryption = new DoEncryptionAndDecryption();
//                andDecryption.doSaveEncryptFile(zipByteData, new File(ZipFilePath + "\\" + mobile_number + ".zip"));
//            }
            AppLogger.debug("ZipFilePath in doZip method" + ZipFilePath + "\\" + Folder + ".zip");
            return ZipFilePath + "\\" + Folder + ".zip";

        } catch (FileNotFoundException e) {
            status = "fail";
            prLog("Exception in  [CRSFmsJobUpload][doZip] :::", e);
        } catch (IOException e) {
            status = "fail";
            prLog("Exception in  I[CRSFmsJobUpload][doZip] :::", e);
        } catch (Exception e) {
            status = "fail";
            prLog("Exception in  doZip block :::", e);
        }
        prInfo("[CRSFmsJobUpload][doZip] END");
        return status;
    }

    public void addToZipFile(String fileName, String Name, ZipOutputStream zos) throws FileNotFoundException, IOException, Exception {
        prInfo("[CRSFmsJobUpload][addToZipFile] START");
        AppLogger.debug("In addToZipFile mehtod  Writing '" + fileName + "' to zip file");
        File file = new File(fileName);
        FileInputStream fis = new FileInputStream(file);
        ZipEntry zipEntry = new ZipEntry(Name);
        zos.putNextEntry(zipEntry);
        byte[] bytes = new byte[1024];
        int length;
        while ((length = fis.read(bytes)) >= 0) {
            zos.write(bytes, 0, length);
        }
        zos.closeEntry();
        fis.close();
        prInfo("[CRSFmsJobUpload][addToZipFile] END");
    }

    public String uploadFMSWingsJob() {
        String retVal = "FAIL";
        String client_ipAddr="";
        prInfo("[CRSFmsJobUpload][uploadFMSWingsJob] START");
        JSONObject dataInformation = new JSONObject();
        String ZipFilePath = "";
        CRSAuthenticate encyptDecriptString = new CRSAuthenticate();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("JobUpload method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/Exchange/saveFMSCAFData";
            AppLogger.debug("onBoardURL in JobUpload method :" + OnboardURL);
            String strEviseDrmData = "";
            strEviseDrmData = (String) session.getAttribute("FMS_KYC_Cust_Data");
            JSONObject Subscriber_JSON = (JSONObject) JSONSerializer.toJSON(strEviseDrmData);
            Subscriber_JSON.put("APP_VERSION", CRSAppResources.AppVersion);
            Subscriber_JSON.put("JOB_SOURCE", "S");
            Subscriber_JSON.put("USER_ID", loginResponse.getString("UserId"));
            Subscriber_JSON.put("CIRCLE_SHORT_CODE", loginResponse.getString("CIRCLE_SH_CODE"));
            Subscriber_JSON.put("HUB_CODE", loginResponse.getString("CircleZoneCode"));
            Subscriber_JSON.put("franch_address", loginResponse.getString("FrachiseeAddress"));
            Subscriber_JSON.put("FranchiseeName", loginResponse.getString("FranchiseeName"));//FranchiseeName
            Subscriber_JSON.put("pos_agent_name", loginResponse.getString("FranchiseeName"));//pos_agent_name
            Subscriber_JSON.put("FMS_ATTACHMENTS_OPTNL", session.getAttribute("FMS_ATTACHMENTS_OPTNL"));
            Subscriber_JSON.put("FMS_ATTACH_SHOW_HIDE", session.getAttribute("FMS_ATTACH_SHOW_HIDE"));
            Subscriber_JSON.put("JOB_TYPE", "FMS_EKYC");
            Subscriber_JSON.put("ZONE", loginResponse.getString("FMSZone"));//FMSZone
            Subscriber_JSON.put("JOB_USER", loginResponse.getString("UserFlag"));
            Subscriber_JSON.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            Subscriber_JSON.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            Subscriber_JSON.put("CLIENT_REQ_TIME", Calendar.getInstance().getTime().getTime());//CLIENT_REQ_TIME
            JSONObject SubDetials = (JSONObject) JSONSerializer.toJSON(session.getAttribute("AadharResponse"));
            Subscriber_JSON.put("pos_name", "Self");
            Subscriber_JSON.put("pos_code", "Self");
            Subscriber_JSON.put("cust_uidai_urc", SubDetials.getString("KycRes_code"));
            Subscriber_JSON.put("cust_uidai_date", session.getAttribute("SubscriberAuthDate"));
            Subscriber_JSON.put("cust_uidai_time", "");
            Subscriber_JSON.put("cust_uidai_num", session.getAttribute("Subscriber_Aadhar"));
            Subscriber_JSON.put("dec_uidai_date", session.getAttribute("DecAuthDate"));
            Subscriber_JSON.put("dec_uidai_time", "");
            Subscriber_JSON.put("pos_uidai_date", session.getAttribute("AgentAuthDate"));
            Subscriber_JSON.put("pos_uidai_time", "");
            Subscriber_JSON.put("POS_TOKEN", session.getAttribute("POS_TOKEN"));
            Subscriber_JSON.put("CUST_TOKEN", session.getAttribute("CUST_TOKEN"));
            Subscriber_JSON.put("franchisee_code", "self");
            Subscriber_JSON.put("wl_caf_no", loginResponse.containsKey("LoadekycData") ? loginResponse.getJSONObject("LoadekycData").optString("CAF_NO", "") : "");
            Subscriber_JSON.put("AADHAR_SEQ_ID", session.getAttribute("AADHAR_OTP_SEQ_ID"));
            Subscriber_JSON.put("isWingsFlag", "true");
            Subscriber_JSON.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
            ZipFilePath = Subscriber_JSON.optString("TARIFF_ID_DOC_PATH");
            String instal_chkif_same = (String) session.getAttribute("instal_chkif_same");
            AppLogger.debug("instal_chkif_same key value :" + instal_chkif_same);
            dataInformation = Subscriber_JSON;
            InetAddress ip = null;
            InetAddress networkIP = null;
            CRSUtils utils = new CRSUtils();
            int amountISDIR = 0;
            if (new FMS_NewForm().validateCircleDetails(Subscriber_JSON)) {
                try {
                    client_ipAddr=request.getHeader("X-FORWARDED-FOR");
                    AppLogger.info("client_ipAddr---X-FORWARDED-FOR"+client_ipAddr);
                    if(client_ipAddr == null){
                    client_ipAddr=request.getRemoteAddr();
                    }
                    networkIP = InetAddress.getLocalHost();
                    ip = utils.getLocalHostLANAddress();
                    AppLogger.debug("N/W IP address is:: " + client_ipAddr);
                    dataInformation.put("PC_IP",client_ipAddr);
//                    dataInformation.put("PC_IP", networkIP.getHostAddress());
                } catch (Exception e) {
                    dataInformation.put("PC_IP", "");
                    prLog("Exception in IP address getting in job upload ", e);

                }
                try {
                    NetworkInterface network = NetworkInterface.getByInetAddress(ip);
                    byte[] mac = network.getHardwareAddress();
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < mac.length; i++) {
                        sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
                    }
                    AppLogger.debug("System MAC address in job upload is :" + sb.toString());
                    dataInformation.put("PC_MAC", sb.toString());
                } catch (Exception e) {
                    dataInformation.put("PC_MAC", "");
                    prLog("Exception in MAC address getting in job upload :", e);
                }
                try {
                    AppLogger.debug("System name in job upload is :" + networkIP.getHostName());
                    dataInformation.put("PC_MAKE", networkIP.getHostName());
                } catch (Exception e) {
                    dataInformation.put("PC_MAKE", "");
                    prLog("Exception in PC Name getting in job upload", e);
                }
                if (Subscriber_JSON.containsKey("WINGS_ISD") && Subscriber_JSON.containsKey("WINGS_IR")) {
                    if (Subscriber_JSON.getBoolean("WINGS_ISD") && Subscriber_JSON.getBoolean("WINGS_IR")) {
                        amountISDIR = amountISDIR + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR")))+(Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
                    } else if (Subscriber_JSON.getBoolean("WINGS_ISD")) {
                        amountISDIR = amountISDIR + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
                    }
                }
                UUID uniqueKey = UUID.randomUUID();
                String sessionID = uniqueKey.toString();
                prInfo("sessionID :" + sessionID);
                prInfo("isPaymentDone :" + reqJson.getBoolean("isPaymentDone"));
                String oldSessionID = "";
                if (reqJson.getBoolean("isPaymentDone") ) {
                    oldSessionID = session.getAttribute("SESSIONID").toString();
                     JSONObject isdirInfoPartialJob=  new PaymentGateway().fetchInfo2Details(oldSessionID);
                     if(!isdirInfoPartialJob.isEmpty()){
                     if(isdirInfoPartialJob.optString("WINGS_ISD").equals("1")|| isdirInfoPartialJob.optString("WINGS_IR").equals("1")){
                     amountISDIR=0;
                     }
                     }
                     if(amountISDIR==0){
                    dataInformation.put("SESSIONID", oldSessionID);
                    prDebug("SessionID of Already Registered User:" + oldSessionID);
                     
                     }else{
                      dataInformation.put("SESSIONID", sessionID);
                         prInfo("SessionId new::"+sessionID);
                     }
                    try {
                        session.removeAttribute("SESSIONID");
                    } catch (Exception e) {
                    }
                } else {
                    dataInformation.put("SESSIONID", sessionID);
                }
                String caf_no = "";
                try {
                    //pay here
                    JSONObject requestObj = new JSONObject();
                    requestObj.put("CONTACT_NO", Subscriber_JSON.getString("cust_mobile_no"));
                    requestObj.put("cust_mobile_no", Subscriber_JSON.getString("cust_mobile_no"));
                    requestObj.put("SESSION_ID", dataInformation.getString("SESSIONID"));
                    requestObj.put("SESSIONID", dataInformation.getString("SESSIONID"));
                    requestObj.put("STATE", loginResponse.getString("State"));
                    requestObj.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                    requestObj.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                    requestObj.put("isCircleEnable", Subscriber_JSON.get("isCircleEnable"));
                    requestObj.put("ZONE", Subscriber_JSON.get("ZONE"));
                    requestObj.put("cust_title_ecaf", Subscriber_JSON.get("cust_title_ecaf"));
                    requestObj.put("first_name", Subscriber_JSON.get("first_name"));
                    requestObj.put("cust_last_name", Subscriber_JSON.get("uid_last_name"));
                    requestObj.put("f_h_name", Subscriber_JSON.get("f_h_name"));
                    requestObj.put("gender_ecaf", Subscriber_JSON.get("gender_ecaf"));
                    requestObj.put("dob", "");
                    requestObj.put("cust_usage_code_ecaf", Subscriber_JSON.get("cust_usage_code_ecaf"));
                    requestObj.put("email", Subscriber_JSON.get("email"));
                    requestObj.put("REQ_DATA", Subscriber_JSON);
                    int tariffAmount = getTariffAmount(Subscriber_JSON.optString("WINGS_TARIFF_PLAN_ID"),"TARIFF");

                    boolean isPymyRequired = false;
                    if (tariffAmount > 0) {

                        String wlCafNum = (String) session.getAttribute("WL_CAF_NO");
                        JSONObject insertRespObj = new JSONObject();
                        if (!reqJson.getBoolean("isPaymentDone")) {
                            isPymyRequired = true;
                            if (!"".equalsIgnoreCase(wlCafNum)) {
                                caf_no = wlCafNum;
                                requestObj.put("CAF_NO", caf_no);
                                insertRespObj.put("STATUS", 0);
                            } else {
                                caf_no = new FMS_NewForm().getWLCAFNo();
                                requestObj.put("CAF_NO", caf_no);
                                insertRespObj = new FMS_NewForm().registerWingsJob(requestObj);
                            }
                            requestObj.put("AMOUNT", tariffAmount + amountISDIR);
                        } else if (reqJson.getBoolean("isPaymentDone") && (Subscriber_JSON.getBoolean("WINGS_ISD") || Subscriber_JSON.getBoolean("WINGS_IR"))) {
                            prInfo("ISD AND IR AMOUNT :" + amountISDIR);
                            if (amountISDIR > 0) {
                                isPymyRequired = true;
                            } else {
                                isPymyRequired = false;
                            }
                            requestObj.put("AMOUNT", amountISDIR);
                            if (!"".equalsIgnoreCase(wlCafNum)) {
                                requestObj.put("CAF_NO", wlCafNum);
                                caf_no = wlCafNum;
                                insertRespObj.put("STATUS", 0);
                            } else {
                                insertRespObj.put("STATUS", -1);
                            }
                        }
                        if (isPymyRequired) {
                            PaymentGateway objPaymentGateway = new PaymentGateway();
                            requestObj.put("RETURN_URL", CRSAppResources.RETURN_URL);
                            //dataInformation.put("CAF_NO", caf_no);
                            dataInformation.put("IS_SELF_JOB", true);
                            dataInformation.put("wl_caf_no", caf_no);
                            dataInformation.put("WINGS_TARIFF_PLAN", tariffAmount);

                            if (insertRespObj.getString("STATUS").equalsIgnoreCase("0")) {
                                JSONObject tempJson = new JSONObject();
                                StringBuilder info2Data = null;
                                    info2Data = new StringBuilder();
                                    info2Data = info2Data.append("ISD:").append(Subscriber_JSON.getBoolean("WINGS_ISD") ? 1 : 0).append(",");
                                    info2Data = info2Data.append("IR:").append(Subscriber_JSON.getBoolean("WINGS_IR") ? 1 : 0).append(",");
                                    info2Data = info2Data.append("FT:").append(reqJson.getBoolean("isPaymentDone") ? "PD" : "PND");
                                    prInfo("info2Data :" + info2Data.toString());
                                    dataInformation.put("Info2", info2Data);
                                    dataInformation.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                                if (insertWingsPrePaymentJob(dataInformation)) {
                                    
                                    requestObj.put("OB_CAF_NO", info2Data.toString());
                                    prInfo("Payment req :" + requestObj);
                                    JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(requestObj);
                                    prInfo("initiatePaymentStatus :" + initiatePaymentStatus);

                                    if (0 == initiatePaymentStatus.getInt("STATUS")) {
                                        tempJson.put("PYMT", "S");
                                        tempJson.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                                        prInfo("tempJson:" + tempJson);
                                        response.setSuccess(true);
                                        response.setMessage("Success");
                                        response.setResponseData(tempJson);
                                        retVal = "FMSEKYC";
                                    } else {
                                        response.setSuccess(false);
                                        response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                                        response.setResponseData(tempJson);
                                    }
                                    initiatePaymentStatus.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                                    initiatePaymentStatus.put("CAF_NO", caf_no);
                                    initiatePaymentStatus.put("TARIFF_PLAN_ID", Subscriber_JSON.getString("WINGS_TARIFF_PLAN_ID"));

                                    if (!reqJson.getBoolean("isPaymentDone")) {
                                        if (!objPaymentGateway.auditPaymentTxn(initiatePaymentStatus)) {
                                            tempJson.put("PYMT", "F");
                                            response.setSuccess(false);
                                            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                                            response.setResponseData(tempJson);
                                        }
                                    }
                                    if ((Subscriber_JSON.getBoolean("WINGS_ISD"))) {
                                        if (!objPaymentGateway.auditPaymentTxnforISDIR(initiatePaymentStatus)) {
                                            tempJson.put("PYMT", "F");
                                            response.setSuccess(false);
                                            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                                            response.setResponseData(tempJson);
                                        }
                                    }
                                } else {
                                    tempJson.put("PYMT", "F");
                                    response.setSuccess(false);
                                    response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                                    response.setResponseData(tempJson);
                                    retVal = "FAIL";
                                }
                            } else {
                                response.setSuccess(false);
                                response.setMessage(insertRespObj.getString("MESSAGE"));
                            }

                        }
                    } else {
                        response.setSuccess(false);
                        AppLogger.debug("Tariff Amount is Empty");
                        response.setMessage(msgObj.getMessge("TARIFF_AMOUNT_EMPTY"));
                        return retVal = "FAIL";
                    }
                    //pay end
                    if (reqJson.getBoolean("isPaymentDone") && (!isPymyRequired)) {
                        dataInformation.put("WINGS_ISD", (Subscriber_JSON.getBoolean("WINGS_ISD") ? 1 : 0));
                        dataInformation.put("WINGS_IR", (Subscriber_JSON.getBoolean("WINGS_IR") ? 1 : 0));
                        AppLogger.debug("Upload data is::::::::" + encyptDecriptString.Encrypt(dataInformation.toString()));

                        JSONObject serviceRes = new CRSClient().serviceRequest(ZipFilePath, dataInformation.toString(), OnboardURL);
                        AppLogger.debug("Response of saveCAFData serviuce in Job upload method for FMSEKYC:" + serviceRes);
                        try {
                            prInfo(" Starting of Response time sending to OB Job upload Service ");
                            String serviceUrl = onBoardURL + "/bsnl/OnboardIntegrationService/auditJobTransaction";
                            AppLogger.debug("onBoardURL in Job upload method for audinting " + serviceUrl);
                            String inputFieldsEntity = "{\"CAF_AUDIT_ID\":'"
                                    + serviceRes.getString("CAF_AUDIT_ID") + "',\"SERVER_RESP_TIME\":'"
                                    + serviceRes.getString("SERVER_RESP_TIME") + "',\"CLIENT_RESP_TIME\":'"
                                    + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"S\",\"USER_ID\":'"
                                    + loginResponse.getString("UserId") + "'}";

                            AppLogger.debug("Input data for auditJobTransaction service in Job upload method: " + inputFieldsEntity);
                            String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                            AppLogger.debug("Response from auditJobTransaction service in Job upload method:" + SLAResponse);
                        } catch (Exception e) {
                            prLog("Exception in auditJobTransaction Service in Job upload for FMSEKYC Type:  ", e);
                        }

                        if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                            session.setAttribute("JOB_STATUS", "Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest, Kindly make a note of the application number for future correspondance (e.g. WL0000234)");
                            try {
                                JSONObject paymentTxnData = new PaymentGateway().getPaymentTxnDtls(oldSessionID);
                                prInfo("paymentTxnData in paymentAlreadyDone case:::" + paymentTxnData);
                                if (paymentTxnData.optString("TXN_STATUS").length() == 0) {
                                    paymentTxnData = null;
                                    prInfo("paymentTxnData id TXN_STATUS is empty in paymentAlreadyDone case:" + paymentTxnData);
                                }
                                session.setAttribute("PAYMENT_TXN", paymentTxnData);
                                request.setAttribute("PAYMENT_TXN", paymentTxnData);
                            } catch (Exception e) {
                                prLog("Exception:  ", e);
                            }
                            response.setSuccess(true);
                            response.setMessage(serviceRes.getString("MESSAGE"));
                            response.setResponseData(serviceRes);
                            retVal = "FMSEKYC";

                        } else {
                            response.setSuccess(false);
                            response.setMessage(serviceRes.getString("MESSAGE"));
                            response.setResponseData(serviceRes);
                            retVal = "FAIL";
                        }

                    }

                } catch (Exception e) {
                    prLog("Exception in [uploadFMSWingsJob]", e);
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("UPLOAD_WINGS_JOB_ERROR"));
                    retVal = "FAIL";
                }
            } else {
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("CHECK_USER_CIRCLE_FAIL"));
                response.setResponseData(new JSONObject());
                retVal = "FAIL";

            }
        } catch (Exception e) {
            prLog("Exception in [CRSFmsJobUpload][uploadFMSWingsJob] :: ", e);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("UPLOAD_WINGS_JOB_ERROR"));
            retVal = "FAIL";
        } finally {
            prInfo("[CRSFmsJobUpload][uploadFMSWingsJob] finally block");
            new FMS_NewForm().ClearSessionvals();
        }
        prInfo("[CRSFmsJobUpload][uploadFMSWingsJob] END");
        return retVal;
    }
    
    private static String convertFileToString(File file) throws Exception {
        byte[] bytes = Files.readAllBytes(file.toPath());
        return new String(DatatypeConverter.printBase64Binary(bytes));
    }
     
    public int getTariffAmount(String tariffPlanId, String flow) {
        prInfo("[CRSFmsJobUpload][getTariffAmount][START] :: ID:: "+tariffPlanId+" ::FLOW:: " + flow);
        PreparedStatement pst = null;
        ResultSet rs = null;
        Connection con = null;
        Integer amount = 0;
        try {
            String tariffAmountQry = "";
            if (flow.equals("SCHEME")) {
                tariffAmountQry = new CRSPropertyReader().getQueryonId("GET_SCHEME_PLAN_AMOUNT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            } else {
                tariffAmountQry = new CRSPropertyReader().getQueryonId("GET_TARIFF_PLAN_AMOUNT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            }
            prDebug("getTariffAmount :: Qry  ::" + tariffAmountQry);
            con = CRSDBManager.getConnection();
            prDebug("connection ::" + con);
            pst = con.prepareStatement(tariffAmountQry);
            pst.setString(1, tariffPlanId);
            rs = pst.executeQuery();
            if (rs.next()) {
                amount = rs.getInt("AMOUNT");
            } else {
                prDebug("tariffPlanId not exist  ::" + tariffPlanId);
            }
        } catch (Exception e) {
            prLog("eroor occured getTariffAmount", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pst);
            CRSDBManager.closeCon(con);
        }
        prInfo("[CRSFmsJobUpload][getTariffAmount][END] ::" + amount);

        return amount;
    }
    
    public boolean insertWingsPrePaymentJob(JSONObject inputdata) {
        prInfo("[CRSFmsJobUpload][insertWingsPrePaymentJob][START] "+inputdata);
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [insertWingsPrePaymentJob]  :: " + con);
            String insertWingsPrePaymentJobQry = new CRSPropertyReader().getQueryonId("INSERT_PARTIAL_JOB").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query to fetch CAF No :  " + insertWingsPrePaymentJobQry);
            pstmt = con.prepareStatement(insertWingsPrePaymentJobQry);
            pstmt.setString(1, inputdata.getString("SESSIONID"));
            pstmt.setString(2, inputdata.toString());
            pstmt.setString(3, inputdata.getString("Info1"));
            pstmt.setString(4, inputdata.getString("Info2"));
            pstmt.setString(5, inputdata.optBoolean("WINGS_ISD")?"1":"0");
            pstmt.setString(6, inputdata.optBoolean("WINGS_IR")?"1":"0");
            int insertWingsPrePaymentJobCount = pstmt.executeUpdate();
            prInfo("insertWingsPrePaymentJobCount :" + insertWingsPrePaymentJobCount);
            if (insertWingsPrePaymentJobCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in [insertWingsPrePaymentJob]:", e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prDebug("Response from [insertWingsPrePaymentJob] :: " + status);
        prInfo("[CRSFmsJobUpload][insertWingsPrePaymentJob][END]");
        return status;
    }

    public String paymentRequest() {
        prInfo("****paymentRequest****");
        String returnVal = "fail";
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("ReqData in paymentRequest::"+reqJson);
            JSONObject reqData = new JSONObject();
            JSONObject insertRespObj = new JSONObject();

            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            String wlCafNo = reqJson.optString("WL_CAF_NO");
            if ("".equalsIgnoreCase(wlCafNo)) {
                JSONObject requestObj = new JSONObject();
                wlCafNo = new FMS_NewForm().getWLCAFNo();
                requestObj.put("cust_mobile_no", reqJson.getString("CUST_MOBILE_NO"));
                requestObj.put("SESSION_ID", sessionID);
                requestObj.put("SESSIONID", sessionID);
                requestObj.put("STATE", reqJson.getString("CIRCLE_CODE"));
                requestObj.put("ZONE_SH_CODE", reqJson.getString("ZONE"));
                requestObj.put("cust_title_ecaf", reqJson.get("CUST_TITLE"));
                requestObj.put("first_name", reqJson.get("UID_FIRST_NAME"));
                requestObj.put("cust_last_name", reqJson.get("UID_LAST_NAME"));
                requestObj.put("f_h_name", reqJson.get("ME_F_H_NAME"));
                requestObj.put("gender_ecaf", "");
                requestObj.put("dob", "");
                requestObj.put("cust_usage_code_ecaf", reqJson.get("CUST_USAGE_CODE"));
                requestObj.put("email", reqJson.get("EMAIL"));
                requestObj.put("REQ_DATA", reqJson);
                requestObj.put("CAF_NO", wlCafNo);
                insertRespObj = new FMS_NewForm().registerWingsJob(requestObj);
            } else {
                insertRespObj.put("STATUS", 0);
            }
            if (insertRespObj.getString("STATUS").equalsIgnoreCase("0")) {
                if (!getPaymentStatus(wlCafNo)) {
                    reqData.put("CONTACT_NO", reqJson.getString("CUST_MOBILE_NO"));
                    reqData.put("SESSION_ID", sessionID);
                    reqData.put("CAF_NO", wlCafNo);
                    reqData.put("OB_CAF_NO",reqJson.getString("CAF_NO"));
                    reqData.put("STATE", reqJson.getString("CIRCLE_CODE"));
                    reqData.put("RETURN_URL", (CRSAppResources.EKYC_RETURN_URL));
                    PaymentGateway objPaymentGateway = new PaymentGateway();
                    JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(reqData);
                    prInfo("initiate PaymentWingsServiceStatus :" + initiatePaymentStatus);
                    JSONObject tempJson = new JSONObject();
                    if (0 == initiatePaymentStatus.getInt("STATUS")) {
                        tempJson.put("PYMT", "S");
                        tempJson.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                        response.setSuccess(true);
                        response.setMessage("Success");
                        response.setResponseData(tempJson);
                    } else {
                        response.setSuccess(false);
                        response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                        response.setResponseData(tempJson);
                    }
                    initiatePaymentStatus.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
                    initiatePaymentStatus.put("CAF_NO", wlCafNo);
                    if(objPaymentGateway.auditPaymentTxn(initiatePaymentStatus)){
                        returnVal = "success";
                    }else{
                        tempJson.put("PYMT", "F");
                        response.setSuccess(false);
                        response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                        response.setResponseData(tempJson);
                    }
                } else {
                    prInfo("Payment already completed");
                    returnVal = "success";
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("INITIATE_PYMT_SUCCESS"));
                }
            } else {
                response.setSuccess(false);
                response.setMessage(insertRespObj.getString("MESSAGE"));
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
            prLog("Exception occered while initiating payment", e);
        }
        return returnVal;
    }
    
    public String paymentRequestForISDIR() {
        prInfo("****paymentRequestForISDIR****");
        String returnVal = "fail";
        CRSPropertyReader msgObj = new CRSPropertyReader();
        int amount = 0;
        StringBuilder info2Data = null;
        try {
            request = ServletActionContext.getRequest();
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("ReqData in paymentRequestISDIR::" + reqJson);
            JSONObject reqData = new JSONObject();
            JSONObject insertRespObj = new JSONObject();

            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            String wlCafNo = reqJson.optString("WL_CAF_NO");
            if ("".equalsIgnoreCase(wlCafNo)) {
                insertRespObj.put("STATUS", -1);
                insertRespObj.put("MESSAGE", "Waitlist caf no doesnot exist");
            } else {
                insertRespObj.put("STATUS", 0);
            }
            PaymentGateway pymtGateway = new PaymentGateway();
            if (insertRespObj.getString("STATUS").equalsIgnoreCase("0")) {
                boolean pymtStatus = getPaymentStatus(wlCafNo);
                reqData.put("CONTACT_NO", reqJson.getString("CUST_MOBILE_NO"));
                reqData.put("SESSION_ID", sessionID);
                reqData.put("CAF_NO", wlCafNo);
                info2Data = new StringBuilder();
                info2Data = info2Data.append("CAF_NO:").append(reqJson.getString("CAF_NO")).append(",");
                info2Data = info2Data.append("ISD:").append(reqJson.getBoolean("WINGS_ISD") ? 1 : 0).append(",");
                info2Data = info2Data.append("IR:").append(reqJson.getBoolean("WINGS_IR") ? 1 : 0).append(",");
                info2Data = info2Data.append("FT:").append((pymtStatus) ? "PD" : "PND");
                prInfo("info2Data :" + info2Data.toString());
                reqData.put("OB_CAF_NO", info2Data.toString());
                reqData.put("STATE", reqJson.getString("CIRCLE_CODE"));

                if (!pymtStatus) {
                    amount = reqJson.optInt("AMOUNT",Integer.parseInt(CRSAppResources.WINGS_PAY_AMOUNT));
                }
                reqData.put("RETURN_URL", (CRSAppResources.EKYC_RETURN_URL));

                if (reqJson.getBoolean("WINGS_ISD") && !reqJson.optString("WINGS_ISD_PAID","0").equals("1")) {                    
                    amount = amount + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
                } 
                if (reqJson.getBoolean("WINGS_IR") && !reqJson.optString("WINGS_IR_PAID","0").equals("1")) {
                    amount = amount + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR")));
                }
                
                reqData.put("AMOUNT", amount);
                prInfo("initiate PaymentWingsService for not Paid but activated cust in ISDIR" + reqData);
                if (amount > 0) {
                    JSONObject initiatePaymentStatus = pymtGateway.initiatePayment(reqData);
                    prInfo("initiate PaymentWingsServiceStatus :" + initiatePaymentStatus);
                    initiatePaymentStatus.put("REQ_TYPE", "N");
                    JSONObject tempJson = new JSONObject();
                    if (0 == initiatePaymentStatus.getInt("STATUS")) {
                        tempJson.put("PYMT", "S");
                        tempJson.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                        response.setSuccess(true);
                        response.setMessage("Success");
                        response.setResponseData(tempJson);
                    } else {
                        response.setSuccess(false);
                        response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                        response.setResponseData(tempJson);
                    }
                    initiatePaymentStatus.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
                    initiatePaymentStatus.put("CAF_NO", wlCafNo);
                    if (!pymtStatus) {
                        if (pymtGateway.auditPaymentTxn(initiatePaymentStatus)) {
                            if (reqJson.getBoolean("WINGS_ISD") || reqJson.getBoolean("WINGS_IR")) {
                                if (pymtGateway.auditPaymentTxnforISDIR(initiatePaymentStatus)) {
                                    returnVal = "success";
                                }
                            }
                        }
                    } else if (reqJson.getBoolean("WINGS_ISD") || reqJson.getBoolean("WINGS_IR")) {
                        initiatePaymentStatus.put("REQ_TYPE", "E");
                        if (pymtGateway.auditPaymentTxnforISDIR(initiatePaymentStatus)) {
                            returnVal = "success";
                        }
                    }
                } else {
                    JSONObject objUpdateISDIRData = new JSONObject();
                    objUpdateISDIRData.put("FDI_UPDATE_FLAG", "PDISD");
                    objUpdateISDIRData.put("ISD", reqJson.getBoolean("WINGS_ISD") ? 1 : 0);
                    objUpdateISDIRData.put("IR", reqJson.getBoolean("WINGS_IR") ? 1 : 0);
                    objUpdateISDIRData.put("CAF_NO", reqJson.getString("CAF_NO"));
                    objUpdateISDIRData.put("PYMT", "NR");
                    if (new PaymentGateway().updateSessionId(objUpdateISDIRData)) {
                        response.setSuccess(true);
                        response.setMessage("Success");
                        response.setResponseData(objUpdateISDIRData);
                    } else {
                        response.setSuccess(false);
                        response.setMessage("Updation Failed");
                    }

                }
            } else {
                response.setSuccess(false);
                response.setMessage(insertRespObj.getString("MESSAGE"));
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
            prLog("Exception occered while initiating payment", e);
        }
        return returnVal;
    }

    public boolean getPaymentStatus(String caf_no) {
        prInfo("Start : getPaymentStatus");
        prDebug("getPaymentStatus Data :" + caf_no);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        boolean bStatus = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [getPaymentStatus]  ::  " + con);
            String paymentTxnDtls = "";
            paymentTxnDtls = new CRSPropertyReader().getQueryonId("CHECK_PYMT_STATUS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [getPaymentStatus] :: " + paymentTxnDtls);
            pstmt = con.prepareStatement(paymentTxnDtls);
            pstmt.setString(1, caf_no);
            rs = pstmt.executeQuery();
            if (rs.next() && rs.getInt(1) > 0) {
                bStatus = true;
            }
        } catch (Exception e) {
            prLog("Error in getPaymentStatus :", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : getPaymentStatus : " + bStatus);
        return bStatus;
    }
      
    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prLog(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }

}
