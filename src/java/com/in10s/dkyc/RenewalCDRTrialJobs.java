/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.dkyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import com.in10s.payment.PaymentGateway;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.codec.binary.Base64;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author praveen.k
 */
public class RenewalCDRTrialJobs {
       
    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    private File userFile;
    private String userFileContentType;
    private String userFileFileName;
    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }
    
    public String renewReqFrCDRJobs() {
        prInfo("[RenewalCDRTrialJobs][renewReqFrCDRJobs] START");
        String retVal = "fail";
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject custDataJson = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        JSONObject reqJson = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            response = new CRSResponse();
            String strReqData = "";
            String strQueryReqData = "";
            strReqData = request.getQueryString();
            strQueryReqData = strReqData;    

            if(strReqData == null){
                strReqData = request.getParameter("reqData");
            }
            prDebug("input strReqData  in [renewReqFrCDRJobs] :: " + strReqData);
            strReqData = strReqData.replaceAll("%20", " ");
            prDebug("input strReqData after decryption  in [renewReqFrCDRJobs] :: " + strReqData);
            strReqData = new CRSAuthenticate().Decrypt(strReqData);
            prDebug("After decrypt strReqData  in [renewReqFrCDRJobs] :: " + strReqData);
            if (strQueryReqData != null) {
                String[] queryParamKeyVal = strReqData.split("&");
                for (String keyVal : queryParamKeyVal) {
                    String[] queryParamData = keyVal.split("=");
                    if (queryParamData.length == 2) {
                        reqJson.put(queryParamData[0], queryParamData[1]);
                    } else {
                        prInfo("invalid query param::" + keyVal);
                    }
                }
                request.setAttribute("QUERY_PARAM", "C");
            }
            prDebug("input request  in [renewReqFrCDRJobs] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_RENEWAL_CSC_CUST_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for renewReqFrCDRJobs : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[renewReqFrCDRJobs][Con]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("CAF_NO"));
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                JSONObject bpJson = new JSONObject();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    bpJson.put(colName, colValue);
                }
                jobsArr.add(bpJson);

            }
            custDataJson.put("Data", jobsArr);
            prDebug("renewReqFrCDRJobs Json: " + custDataJson.toString());
            if (jobsArr.size() > 0) {
                prInfo("Customer Data loaded Successfully");
                retVal = "success";
                custDataJson.put("STATUS", "0");
                request.setAttribute("CUST_DATA", custDataJson);
                request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CDR_CUST_DATA_SUCCESS"));
            } else {
                prInfo("Unable to load CustomerData");
                retVal = "fail";
                custDataJson.put("STATUS", "1");
                request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CDR_CUST_DATA_FAIL"));
            }
        } catch (Exception ex) {
            prLog("Exception in  [RenewalCDRTrialJobs][renewReqFrCDRJobs]:  ", ex);
            custDataJson.put("STATUS", "-1");
            retVal = "fail";
            request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CDR_CUST_DATA_ERROR"));            
            if(reqJson.isEmpty()){
               request.setAttribute("MESSAGE",msgObj.getMessge("FETCH_CDR_CUST_DATA_URL_ERROR"));
            }
        } finally {
			CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);            
            CRSDBManager.closeCon(con);
        }
        prInfo("[RenewalCDRTrialJobs][renewReqFrCDRJobs] END");
        return retVal;
    }
    
    public String takePaymentForCDRRenewal() {
        prInfo("[RenewalCDRTrialJobs][takePaymentForCDRRenewal][START]");
        String retVal = "";
        JSONObject result = new JSONObject();
        JSONObject initiatePaymentReq = new JSONObject();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[RenewalCDRTrialJobs][takePaymentForCDRRenewal] strReqData : " + strReqData);
            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[RenewalCDRTrialJobs][takePaymentForCDRRenewal] reqJson :" + reqJson);
            initiatePaymentReq.put("STATE", reqJson.getString("CIRCLE_CODE"));
            initiatePaymentReq.put("AMOUNT", reqJson.getInt("PAY_REQ_AMOUNT"));
            initiatePaymentReq.put("WINGS_SCHEME_ID", reqJson.getString("WINGS_SCHEME_ID"));
            initiatePaymentReq.put("WINGS_SCHEME_NAME", reqJson.getString("WINGS_SCHEME_NAME"));
            initiatePaymentReq.put("SESSION_ID", sessionID);
            initiatePaymentReq.put("CAF_NO", reqJson.getString("CAF_NO"));
            initiatePaymentReq.put("CONTACT_NO", reqJson.getString("CUST_MOBILE_NO"));
            initiatePaymentReq.put("OB_CAF_NO", reqJson.getString("CAF_NO"));
            initiatePaymentReq.put("RETURN_URL", CRSAppResources.CDR_TRIAL_RETURN_URL);
            prInfo("Payment req [takePaymentForCDRRenewal]  : " + initiatePaymentReq);
            PaymentGateway objPaymentGateway = new PaymentGateway();
            JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(initiatePaymentReq);
            prInfo("initiatePaymentStatus [takePaymentForCDRRenewal]  : " + initiatePaymentStatus);
            if (0 == initiatePaymentStatus.getInt("STATUS")) {
                result.put("PYMT", "S");
                result.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                prInfo("tempJson [takePaymentForCDRRenewal] : " + result);
                StringBuilder info2Data = null;
                info2Data = new StringBuilder();
                info2Data = info2Data.append("WINGS_TARIFF_PLAN_ID:").append(reqJson.getString("WINGS_TARIFF_PLAN_ID")).append(",");
                info2Data = info2Data.append("WINGS_TARIFF_PLAN_VALUE:").append(reqJson.getString("WINGS_TARIFF_PLAN_VALUE")).append(",");
                info2Data = info2Data.append("TARIFF_ID_NAME:").append(reqJson.getString("TARIFF_ID_NAME")).append(",");
                info2Data = info2Data.append("TARIFF_ID_VALUE:").append(reqJson.getString("TARIFF_ID_VALUE")).append(",");
                info2Data = info2Data.append("SCHEME_ID:").append(reqJson.getString("WINGS_SCHEME_ID")).append(",");
                info2Data = info2Data.append("SCHEME_NAME:").append(reqJson.getString("WINGS_SCHEME_NAME")).append(",");
                info2Data = info2Data.append("SESSION_ID:").append(sessionID).append(",");
                info2Data = info2Data.append("FILE_PATH:").append(reqJson.getString("FILE_PATH")).append(",");
                info2Data = info2Data.append("WINGS_ISD:").append(reqJson.getBoolean("ISD_ENABLE") ? 1 : 0).append(",");
                info2Data = info2Data.append("WINGS_IR:").append(reqJson.getBoolean("IR_ENABLE") ? 1 : 0).append(",");
                info2Data = info2Data.append("CAF_NO:").append(reqJson.getString("CAF_NO"));
                prInfo("info2Data [takePaymentForCDRRenewal] :: " + info2Data);
                initiatePaymentReq.put("WINGS_ISD", reqJson.getBoolean("ISD_ENABLE"));
                initiatePaymentReq.put("WINGS_IR", reqJson.getBoolean("IR_ENABLE"));
                if (insertWingsCDRPrePaymentJob(initiatePaymentReq, info2Data.toString())) {
                    response.setSuccess(true);
                    response.setMessage("Success");
                    response.setResponseData(result);
                } else {
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("INITIATE_CDR_PYMT_FAIL"));
                    response.setResponseData(result);
                }
            } else {
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("INITIATE_CDR_PYMT_FAIL"));
                response.setResponseData(result);
            }
            initiatePaymentStatus.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
            initiatePaymentStatus.put("CAF_NO", reqJson.getString("CAF_NO"));
            initiatePaymentStatus.put("REQ_TYPE", "N");
            initiatePaymentStatus.put("TARIFF_PLAN_ID", reqJson.getString("PLAN_ID"));
            if (!auditCDRPaymentTxn(initiatePaymentStatus)) {
                result.put("PYMT", "F");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("INITIATE_CDR_PYMT_ERROR"));
                response.setResponseData(result);
            }
            if(!reqJson.getString("WINGS_SCHEME_ID").equals("WS0")){
            objPaymentGateway.auditSchemePaymentTxn(initiatePaymentStatus);
            }

        } catch (Exception e) {
            prInfo("Error in [RenewalCDRTrialJobs][takePaymentForCDRRenewal]  :: " + e);
        } finally {
            prInfo("[RenewalCDRTrialJobs][takePaymentForCDRRenewal][END]" + retVal);
        }
        return "success";
    }
    
    
    public boolean insertWingsCDRPrePaymentJob(JSONObject inputdata, String info2Data) throws Exception {
        prInfo("[RenewalCDRTrialJobs][insertWingsCDRPrePaymentJob][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [insertWingsCDRPrePaymentJob]  :: " + con);
            String insertWingsPrePaymentJobQry = new CRSPropertyReader().getQueryonId("INSERT_CDR_PARTIAL_JOB").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [insertWingsCDRPrePaymentJob] :  " + insertWingsPrePaymentJobQry);
            pstmt = con.prepareStatement(insertWingsPrePaymentJobQry);
            pstmt.setString(1, inputdata.getString("SESSION_ID"));
            pstmt.setString(2, inputdata.toString());
            pstmt.setString(3, inputdata.optString("Info1"));
            pstmt.setString(4, info2Data);
            pstmt.setString(5, inputdata.optBoolean("WINGS_ISD") ? "1" : "0");
            pstmt.setString(6, inputdata.optBoolean("WINGS_IR") ? "1" : "0");
            int insertWingsPrePaymentJobCount = pstmt.executeUpdate();
            prInfo("count [insertWingsCDRPrePaymentJob] :" + insertWingsPrePaymentJobCount);
            if (insertWingsPrePaymentJobCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("[Exception][insertWingsCDRPrePaymentJob]: ", e);
            status = false;
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[RenewalCDRTrialJobs][insertWingsCDRPrePaymentJob][END]" + status);
        return status;
    }
        
    public boolean auditCDRPaymentTxn(JSONObject auditData) {
        prInfo("Start : auditCDRPaymentTxn");
        prDebug("Audit Data :" + auditData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [auditCDRPaymentTxn]  ::  " + con);
            String[] columns = {"CAF_NO", "sessionId", "BNK_TXN_ID", "AMOUNT", "ServiceName", "PORTAL_TXN_ID", "VENDOR_TXN_ID", "TXN_STATUS", "ERROR_CODE", "ERROR_MSG", "TIME_STAMP", "Info1", "TARIFF_PLAN_ID"};
            String auditCDRPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_CDR_PAYMENT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [auditCDRPaymentTxn] :: " + auditCDRPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditCDRPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, auditData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("auditCDRPaymentTxn ins count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in auditCDRPaymentTxn :", e);

        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : auditCDRPaymentTxn");
        return status;
    }
    
    public String uploadCDRImage() {
        InputStream inStream = null;
        OutputStream outStream = null;
        FileInputStream fis = null;        
        prInfo("Starting of uploadCDRImage in Attachments class file " + getUserFile());
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("Request for uploadCDRImage is : " + reqJson);
            String SessionFilePath = reqJson.getString("imgFlodLoc");
            if (SessionFilePath.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy" + File.separator + "MMM" + File.separator + "dd");
                java.util.Date date = Calendar.getInstance().getTime();
                String strDate = sdf.format(date);
                SessionFilePath = new File(CRSAppResources.CDR_POI_PATH + File.separator + strDate + File.separator + reqJson.getString("CAF_NO")).getAbsolutePath();
                new File(SessionFilePath).mkdirs();
            }
            String extention = getUserFileFileName();
            extention = extention.substring(extention.lastIndexOf("."));
            String imageName = reqJson.getString("imageName");
            File outFile = new File(SessionFilePath + File.separator + imageName + extention);//DYNAMIC EXTENSION

            inStream = new FileInputStream(getUserFile());
            outStream = new FileOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int fileLength;
            while ((fileLength = inStream.read(buffer)) > 0) {
                outStream.write(buffer, 0, fileLength);
            }            
            prInfo("[uploadCDRImage:]Image uploaded successfully to file path " + outFile.getAbsolutePath());
            response.setSuccess(true);
            response.setMessage(SessionFilePath);
        } catch (Exception ex) {
            response.setSuccess(false);
            prLog("Exception in [uploadCDRImage:]  ::::  " , ex);
        } finally {
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException ex) {
                    prLog("Error while closing instream :",ex);
                }
            }
            if (outStream != null) {
                try {
                    outStream.close();
                } catch (IOException ex) {
                    prLog("Error while closing outstream :",ex);
                }
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException ex) {
                    prLog("Error while closing fis :",ex);
                }
            }
        }
        prInfo("End of uploadCDRImage in Attachments class");
        return "success";
    }
    
       public String disconnectCDRTrial() {
        String retVal = "error";
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[RenewalCDRTrialJobs][disconnectCDRTrial] strReqData : " + strReqData);
            String currentTimeStamp = new SimpleDateFormat("dd-MMM-yyyy hh.mm.ss.SSS aaa").format(new java.sql.Time(new java.util.Date().getTime()));
            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[RenewalCDRTrialJobs][disconnectCDRTrial] reqJson :" + reqJson);
            String CafNo = reqJson.getString("CAF_NO");
            JSONObject reqData=new JSONObject();
            reqData.put("CAFNO", CafNo);
            reqData.put("queryId", "DISCON_RENEWAL_CHECK");
            int count=new PaymentGateway().validateDisconnectionCAF(reqData);
            if(count == 0) {
            reqJson.put("sessionId", sessionID);
            reqJson.put("SESSION_ID", sessionID);
            reqJson.put("CAF_NO", reqJson.getString("CAF_NO"));
            reqJson.put("BNK_TXN_ID", "N/A");
            reqJson.put("AMOUNT", -1);
            reqJson.put("TARIFF_PLAN_AMOUNT", 0);
            reqJson.put("ServiceName", "WINGS");
            reqJson.put("SERVICE_NUMBER", reqJson.getString("SEL_MOB_NO"));
            reqJson.put("PORTAL_TXN_ID", "N/A");
            String txn_id = "IN10S_" + new SimpleDateFormat("ddMMyyyyhhmmsss").format(new Date()) + "_" + (reqJson.getString("CAF_NO").substring(3));
            reqJson.put("VENDOR_TXN_ID", txn_id);
            reqJson.put("TXN_STATUS", "SUCCESS");
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh.mm.ss aa");
            String formattedDate = dateFormat.format(new Date());
            reqJson.put("TIME_STAMP", formattedDate);
            reqJson.put("PAYMENT_TIME", formattedDate);
            reqJson.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
            reqJson.put("TARIFF_PLAN_ID", reqJson.getString("WINGS_TARIFF_PLAN_ID"));
            reqJson.put("CUST_NAME", reqJson.getString("UID_FIRST_NAME"));
            prInfo("reqJson [RenewalCDRTrialJobs][disconnectCDRTrial]  :" + reqJson);
            StringBuilder info2Data = null;
            info2Data = new StringBuilder();
            info2Data = info2Data.append("WINGS_TARIFF_PLAN_ID:").append(reqJson.getString("WINGS_TARIFF_PLAN_ID")).append(",");
            info2Data = info2Data.append("WINGS_TARIFF_PLAN_VALUE:").append(reqJson.getString("WINGS_TARIFF_PLAN_VALUE")).append(",");
            info2Data = info2Data.append("TARIFF_ID_NAME:").append(reqJson.getString("TARIFF_ID_NAME")).append(",");
            info2Data = info2Data.append("TARIFF_ID_VALUE:").append(reqJson.getString("TARIFF_ID_VALUE")).append(",");
            info2Data = info2Data.append("SESSION_ID:").append(sessionID).append(",");
            info2Data = info2Data.append("WINGS_ISD:").append(reqJson.getBoolean("ISD_ENABLE") ? 1 : 0).append(",");
            info2Data = info2Data.append("WINGS_IR:").append(reqJson.getBoolean("IR_ENABLE") ? 1 : 0).append(",");
            info2Data = info2Data.append("CAF_NO:").append(CafNo);
            prInfo("info2Data [disconnectCDRTrial] :: " + info2Data);
            reqJson.put("Info2", info2Data);
            prInfo("[RenewalCDRTrialJobs][disconnectCDRTrial] Trial partial jobs insert  :" + insertWingsCDRPrePaymentJob(reqJson, info2Data.toString()));
            prInfo("[RenewalCDRTrialJobs][disconnectCDRTrial] Audit status :" + auditCDRPaymentTxn(reqJson));
            reqJson.put("CAF_NO", CafNo);
            reqJson.put("RENEWAL_STATUS", 1);
            reqJson.put("PROCESSED_DATE", currentTimeStamp);
            prInfo("[RenewalCDRTrialJobs][disconnectCDRTrial] CDR DATA UPDATE status :" + new PaymentGateway().updateCDRData(reqJson));
            reqJson.put("AMOUNT", 0);
            reqJson.put("TXN_STATUS", "Disconnected");
            request.setAttribute("PAYMENT_TXN", reqJson);
            retVal = "success";
            }else if(count == 1){
            	request.setAttribute("MESSAGE", msgObj.getMessge("ALREADY_DISC_CAF"));
                retVal = "error";
            }else {
            	request.setAttribute("MESSAGE", msgObj.getMessge("EXCEP_DISC_CDR"));
                retVal = "error";
            }
        } catch (Exception e) {
            retVal = "error";
            request.setAttribute("MESSAGE", msgObj.getMessge("EXCEP_DISC_CDR"));
            prInfo("Error in [RenewalCDRTrialJobs][disconnectCDRTrial]  :: " + e);
        }

        return retVal;
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

    /**
     * @return the userFile
     */
    public File getUserFile() {
        return userFile;
    }

    /**
     * @param userFile the userFile to set
     */
    public void setUserFile(File userFile) {
        this.userFile = userFile;
    }

    /**
     * @return the userFileContentType
     */
    public String getUserFileContentType() {
        return userFileContentType;
    }

    /**
     * @param userFileContentType the userFileContentType to set
     */
    public void setUserFileContentType(String userFileContentType) {
        this.userFileContentType = userFileContentType;
    }

    /**
     * @return the userFileFileName
     */
    public String getUserFileFileName() {
        return userFileFileName;
    }

    /**
     * @param userFileFileName the userFileFileName to set
     */
    public void setUserFileFileName(String userFileFileName) {
        this.userFileFileName = userFileFileName;
    }

    /**
     * @return the userFileS
     */
   

}
