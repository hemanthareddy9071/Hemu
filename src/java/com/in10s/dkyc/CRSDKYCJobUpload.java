/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.dkyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSMDH5;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.commons.WfPropertyManager;
import com.in10s.config.CRSAppResources;
import com.in10s.core.CRSUtils;
import com.in10s.fmsekyc.FMS_ekyc;
import com.in10s.fmsjobupload.CRSFmsJobUpload;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.logger.AppLogger;
import com.in10s.payment.PaymentGateway;
import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import static org.apache.commons.io.FileUtils.forceDelete;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author praveen.k
 */
public class CRSDKYCJobUpload {
    
    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    
    
    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }
    
    public String uploadDKYCWingsJob() {
        String retVal = "FAIL";
        prInfo("[CRSFmsJobUpload][uploadDKYCWingsJob] START");
        JSONObject dataInformation = new JSONObject();
        String ZipFilePath = "";
        CRSAuthenticate encyptDecriptString = new CRSAuthenticate();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        File zip = null;
        String client_ipAddr="";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("uploadDKYCWingsJob reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("JobUpload method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/DKYCService/saveFMSDKYCJob";
            AppLogger.debug("onBoardURL in JobUpload method :" + OnboardURL);
            JSONObject Subscriber_JSON = reqJson; 
            if (Subscriber_JSON.containsKey("TARRIF_FLAG")) {
                String dovFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
                File UploadJob = new File(dovFilePath);
                if (!UploadJob.exists()) {
                    boolean folderStatus = UploadJob.mkdirs();
                }
                session.removeAttribute("DOCS_FILE_PATH");
                List DOCList = new ArrayList();
                List ImagePathList = new ArrayList();
                String FolderName = UploadJob.getName();
                File[] filesList = UploadJob.listFiles();
                for (int j = 0; j < filesList.length; j++) {
                    AppLogger.debug("ZIP File name in dkycFormData method is : " + filesList[j].getName());
                    AppLogger.debug("folder length in dkycFormData method is : " + filesList.length);
                    if (filesList[j].isFile() && !(filesList[j].getName().contains("json"))) {
                        ImagePathList.add(filesList[j].getAbsolutePath());
                        DOCList.add(filesList[j].getName());
                    }
                }

                if (ImagePathList.size() > 0 && (DOCList.size() == ImagePathList.size())) {
                    ZipFilePath = new FMS_ekyc().doZip(UploadJob.getAbsolutePath(), ImagePathList, DOCList, FolderName);
                    String HashKey = new CRSMDH5().getHashKey(new File(ZipFilePath), "MD5");
                    AppLogger.debug("Hashkey of zipFile in dkycFormData method is :" + HashKey);
                    Subscriber_JSON.put("HashKey", HashKey);

                } else {
                    Subscriber_JSON.put("HashKey", "");
                }
                zip = new File(ZipFilePath);
                AppLogger.debug("Zip file size  in dkycFormData method is::::::" + zip.length() / 1024 + "kb");
                Subscriber_JSON.put("ZipFileList", DOCList);
                Subscriber_JSON.put("ZipFileCreation", ZipFilePath);
                Subscriber_JSON.put("ZipFileLength", zip.length());
                Subscriber_JSON.put("FILE_NAME", zip.getName());
                Subscriber_JSON.put("TARIFF_ID_DOC_PATH", ZipFilePath);//ZipFilePath
            } else {
                Subscriber_JSON.put("ZipFileList", "");
                Subscriber_JSON.put("ZipFileCreation", "");
                Subscriber_JSON.put("ZipFileLength", 0);
                Subscriber_JSON.put("FILE_NAME", "");
                Subscriber_JSON.put("TARIFF_ID_DOC_PATH", "");
            }
            Subscriber_JSON.put("APP_VERSION", CRSAppResources.AppVersion);
            Subscriber_JSON.put("JOB_SOURCE", "S");
            Subscriber_JSON.put("FLOW_TYPE", "DKYC");
            Subscriber_JSON.put("USER_ID", loginResponse.getString("UserId"));
            Subscriber_JSON.put("CIRCLE_SHORT_CODE", loginResponse.getString("CIRCLE_SH_CODE"));
            Subscriber_JSON.put("HUB_CODE", loginResponse.getString("CircleZoneCode"));
            Subscriber_JSON.put("franch_address", loginResponse.getString("FrachiseeAddress"));
            Subscriber_JSON.put("FranchiseeName", loginResponse.getString("FranchiseeName"));//FranchiseeName
            Subscriber_JSON.put("pos_agent_name", loginResponse.getString("FranchiseeName"));//pos_agent_name
            Subscriber_JSON.put("JOB_TYPE", "FMS_DKYC");
            Subscriber_JSON.put("ZONE", loginResponse.getString("FMSZone"));//FMSZone
            Subscriber_JSON.put("JOB_USER", loginResponse.getString("UserFlag"));
            Subscriber_JSON.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            Subscriber_JSON.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            Subscriber_JSON.put("CLIENT_REQ_TIME", Calendar.getInstance().getTime().getTime());//CLIENT_REQ_TIME
            Subscriber_JSON.put("pos_name", "Self");
            Subscriber_JSON.put("pos_code", "Self");
            Subscriber_JSON.put("franchisee_code", "self");
            Subscriber_JSON.put("wl_caf_no", loginResponse.containsKey("LoadekycData") ? loginResponse.getJSONObject("LoadekycData").optString("CAF_NO", "") : "");
            Subscriber_JSON.put("wings_pin_avail", loginResponse.containsKey("LoadekycData") ? loginResponse.getJSONObject("LoadekycData").optString("WINGS_PRE_PIN").trim() !=""? true :false : false);
            Subscriber_JSON.put("isWingsFlag", "true");
            Subscriber_JSON.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
            ZipFilePath = Subscriber_JSON.optString("TARIFF_ID_DOC_PATH");
            dataInformation = Subscriber_JSON;
            InetAddress ip = null;
            InetAddress networkIP = null;
            CRSUtils utils = new CRSUtils();
            int amountISDIR = 0;
            if (new FMS_NewForm().validateCircleDetails(Subscriber_JSON)) {
                try {
                    
                    client_ipAddr=request.getHeader("X-FORWARDED-FOR");
                    if(client_ipAddr == null){
                    client_ipAddr=request.getRemoteAddr();
                    }
                    networkIP = InetAddress.getLocalHost();
                    ip = utils.getLocalHostLANAddress();
                    AppLogger.debug("N/W IP address is:: " + client_ipAddr);
//                    dataInformation.put("PC_IP", networkIP.getHostAddress());
                    dataInformation.put("PC_IP", client_ipAddr);
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
                        amountISDIR = amountISDIR + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"))) + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
                    } else if (Subscriber_JSON.getBoolean("WINGS_ISD")) {
                        amountISDIR = amountISDIR + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
                    }else if(Subscriber_JSON.getBoolean("WINGS_IR")) {
                        amountISDIR = amountISDIR + (Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR")));
                    }
                }
                UUID uniqueKey = UUID.randomUUID();
                String sessionID = uniqueKey.toString();
                prInfo("sessionID :" + sessionID);
                prInfo("isPaymentDone :" + reqJson.getBoolean("isPaymentDone"));
                String oldSessionID = "";
                if (reqJson.getBoolean("isPaymentDone")) {
                    oldSessionID = session.getAttribute("SESSIONID").toString();
                    JSONObject isdirInfoPartialJob = new PaymentGateway().fetchInfo2Details(oldSessionID);
                    if (!isdirInfoPartialJob.isEmpty()) {
                        if (isdirInfoPartialJob.optString("WINGS_ISD").equals("1") || isdirInfoPartialJob.optString("WINGS_IR").equals("1")) {
                            amountISDIR = 0;
                        }
                    }
                    if (amountISDIR == 0) {
                        dataInformation.put("SESSIONID", oldSessionID);
                        prDebug("SessionID of Already Registered User:" + oldSessionID);

                    } else {
                        dataInformation.put("SESSIONID", sessionID);
                        prInfo("SessionId new::" + sessionID);
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
                    int tariffAmount = new CRSFmsJobUpload().getTariffAmount(Subscriber_JSON.optString("WINGS_TARIFF_PLAN_ID"),"TARIFF");
                    int schemeAmount = new CRSFmsJobUpload().getTariffAmount(Subscriber_JSON.optString("WINGS_SCHEME_ID"),"SCHEME");

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
                            requestObj.put("AMOUNT", tariffAmount + amountISDIR + schemeAmount);
                        } else if (reqJson.getBoolean("isPaymentDone") && (Subscriber_JSON.getBoolean("WINGS_ISD") || Subscriber_JSON.getBoolean("WINGS_IR"))) {
                            prInfo("ISD AND IR AMOUNT :" + amountISDIR);
                            if (amountISDIR > 0) {
                                isPymyRequired = true;
                            } else {
                                isPymyRequired = false;
                            }
                           
                            requestObj.put("AMOUNT", amountISDIR);
                             if(schemeAmount > 0){
                                requestObj.put("AMOUNT", amountISDIR+schemeAmount);
                            }
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
                                info2Data = info2Data.append("SCH:").append(Subscriber_JSON.optString("WINGS_SCHEME_ID")).append(",");
                                info2Data = info2Data.append("FT:").append(reqJson.getBoolean("isPaymentDone") ? "PD" : "PND");
                                prInfo("info2Data :" + info2Data.toString());
                                dataInformation.put("Info2", info2Data);
                                dataInformation.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                                if (new CRSFmsJobUpload().insertWingsPrePaymentJob(dataInformation)) {

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
                                        retVal = "FMSDKYC";
                                    } else {
                                        response.setSuccess(false);
                                        response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                                        response.setResponseData(tempJson);
                                    }
                                    initiatePaymentStatus.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                                    initiatePaymentStatus.put("CAF_NO", caf_no);
                                    initiatePaymentStatus.put("REQ_TYPE", "N");
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
                                    if(!Subscriber_JSON.optString("WINGS_SCHEME_ID").equals("WS0")){
                                    if(!objPaymentGateway.auditSchemePaymentTxn(initiatePaymentStatus)){
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
                        AppLogger.debug("Response of saveCAFData serviuce in Job upload method for FMSDKYC:" + serviceRes);
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
                            prLog("Exception in auditJobTransaction Service in Job upload for FMSDKYC Type:  ", e);
                        } 
                        /*finally {
                            try {
                                AppLogger.info("ZipFilePath in finally block " + ZipFilePath);
                                if (!ZipFilePath.isEmpty()) {
                                    File deletionPath = new File(ZipFilePath);
                                    int index = deletionPath.getAbsolutePath().lastIndexOf(File.separator);
                                    deletionPath = (index > -1) ? new File(deletionPath.getAbsolutePath().substring(0, index)) : new File(deletionPath.getAbsolutePath());
                                    deleteDirOFFMS(deletionPath);
                                }
                            } catch (Exception e) {
                                prLog("Exception in deleteDirOFFMS FMSDKYC:  ", e);
                            }
                        }*/

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
                            retVal = "FMSDKYC";

                        } else {
                            response.setSuccess(false);
                            response.setMessage(serviceRes.getString("MESSAGE"));
                            response.setResponseData(serviceRes);
                            retVal = "FAIL";
                        }

                    }

                } catch (Exception e) {
                    prLog("Exception in [uploadDKYCWingsJob]", e);
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
            prLog("Exception in [CRSFmsJobUpload][uploadDKYCWingsJob] :: ", e);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("UPLOAD_WINGS_JOB_ERROR"));
            retVal = "FAIL";
        } finally {
            prInfo("[CRSFmsJobUpload][uploadDKYCWingsJob] finally block " + retVal);
            new FMS_NewForm().ClearSessionvals();
        }
        prInfo("[CRSFmsJobUpload][uploadDKYCWingsJob] END");
        return retVal;
    }
    
    public String uploadDKYCWingsTrailJob() {
        String retVal = "FAIL";
        prInfo("[CRSFmsJobUpload][uploadDKYCWingsTrailJob][START]");
        JSONObject dataInformation = new JSONObject();
        String ZipFilePath = "";
        CRSAuthenticate encyptDecriptString = new CRSAuthenticate();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        File zip = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("uploadDKYCWingsTrailJob reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("loginResponse [uploadDKYCWingsTrailJob] : " + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/DKYCService/saveFMSDKYCJob";
            AppLogger.debug("onBoardURL [uploadDKYCWingsTrailJob] : " + OnboardURL);

            //  strEviseDrmData = (String) session.getAttribute("FMS_KYC_Cust_Data");
            JSONObject Subscriber_JSON = reqJson; // (JSONObject) JSONSerializer.toJSON(strEviseDrmData);
            if (Subscriber_JSON.containsKey("TARRIF_FLAG")) {
                String dovFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
                File UploadJob = new File(dovFilePath);
                if (!UploadJob.exists()) {
                    boolean folderStatus = UploadJob.mkdirs();
                    AppLogger.debug("Folder created [uploadDKYCWingsTrailJob] : " + folderStatus);
                }
                session.removeAttribute("DOCS_FILE_PATH");
                List DOCList = new ArrayList();
                List ImagePathList = new ArrayList();
                String FolderName = UploadJob.getName();
                File[] filesList = UploadJob.listFiles();
                for (int j = 0; j < filesList.length; j++) {
                    AppLogger.debug("ZIP File name [uploadDKYCWingsTrailJob] : " + filesList[j].getName() + " length  : " + filesList.length);
                    if (filesList[j].isFile() && !(filesList[j].getName().contains("json"))) {
                        ImagePathList.add(filesList[j].getAbsolutePath());
                        DOCList.add(filesList[j].getName());
                    }
                }
                if (ImagePathList.size() > 0 && (DOCList.size() == ImagePathList.size())) {
                    ZipFilePath = new FMS_ekyc().doZip(UploadJob.getAbsolutePath(), ImagePathList, DOCList, FolderName);
                    String HashKey = new CRSMDH5().getHashKey(new File(ZipFilePath), "MD5");
                    AppLogger.debug("Hashkey of zipFile [uploadDKYCWingsTrailJob] : " + HashKey);
                    Subscriber_JSON.put("HashKey", HashKey);

                } else {
                    Subscriber_JSON.put("HashKey", "");
                }
                zip = new File(ZipFilePath);
                AppLogger.debug("Zip file size  in [uploadDKYCWingsTrailJob] :: " + zip.length() / 1024 + "kb");
                Subscriber_JSON.put("ZipFileList", DOCList);
                Subscriber_JSON.put("ZipFileCreation", ZipFilePath);
                Subscriber_JSON.put("ZipFileLength", zip.length());
                Subscriber_JSON.put("FILE_NAME", zip.getName());
                Subscriber_JSON.put("TARIFF_ID_DOC_PATH", ZipFilePath);//ZipFilePath

            } else {
                Subscriber_JSON.put("ZipFileList", "");
                Subscriber_JSON.put("ZipFileCreation", "");
                Subscriber_JSON.put("ZipFileLength", 0);
                Subscriber_JSON.put("FILE_NAME", "");
                Subscriber_JSON.put("TARIFF_ID_DOC_PATH", "");

            }
            Subscriber_JSON.put("APP_VERSION", CRSAppResources.AppVersion);
            Subscriber_JSON.put("JOB_SOURCE", "S");
            Subscriber_JSON.put("FLOW_TYPE", "DKYC");
            Subscriber_JSON.put("USER_ID", loginResponse.getString("UserId"));
            Subscriber_JSON.put("CIRCLE_SHORT_CODE", loginResponse.getString("CIRCLE_SH_CODE"));
            Subscriber_JSON.put("HUB_CODE", loginResponse.getString("CircleZoneCode"));
            Subscriber_JSON.put("franch_address", loginResponse.getString("FrachiseeAddress"));
            Subscriber_JSON.put("FranchiseeName", loginResponse.getString("FranchiseeName"));//FranchiseeName
            Subscriber_JSON.put("pos_agent_name", loginResponse.getString("FranchiseeName"));//pos_agent_name           
            Subscriber_JSON.put("JOB_TYPE", "FMS_DKYC");
            Subscriber_JSON.put("ZONE", loginResponse.getString("FMSZone"));//FMSZone
            Subscriber_JSON.put("JOB_USER", loginResponse.getString("UserFlag"));
            Subscriber_JSON.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            Subscriber_JSON.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            Subscriber_JSON.put("CLIENT_REQ_TIME", Calendar.getInstance().getTime().getTime());//CLIENT_REQ_TIME           
            Subscriber_JSON.put("pos_name", "Self");
            Subscriber_JSON.put("pos_code", "Self");
            Subscriber_JSON.put("franchisee_code", "self");
            Subscriber_JSON.put("wl_caf_no", loginResponse.containsKey("LoadekycData") ? loginResponse.getJSONObject("LoadekycData").optString("CAF_NO", "") : "");

            Subscriber_JSON.put("isWingsFlag", "true");
            Subscriber_JSON.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
            ZipFilePath = Subscriber_JSON.optString("TARIFF_ID_DOC_PATH");
            dataInformation = Subscriber_JSON;

            if (new FMS_NewForm().validateCircleDetails(Subscriber_JSON)) {
                setDefaultData(dataInformation);
                UUID uniqueKey = UUID.randomUUID();
                String sessionID = uniqueKey.toString();
                prInfo("Trail sessionID [uploadDKYCWingsTrailJob] : " + sessionID);
                try {
                    dataInformation.put("SESSIONID", sessionID);
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

                    String wlCafNum = (String) session.getAttribute("WL_CAF_NO");
                    JSONObject insertRespObj = new JSONObject();
                    String caf_no = "";
                    if (!"".equalsIgnoreCase(wlCafNum) && null != wlCafNum) {
                        caf_no = wlCafNum;
                        requestObj.put("CAF_NO", caf_no);
                        insertRespObj.put("STATUS", 0);
                    } else {
                        caf_no = new FMS_NewForm().getWLCAFNo();
                        requestObj.put("CAF_NO", caf_no);
                        insertRespObj = new FMS_NewForm().registerWingsJob(requestObj);
                    }
                    prInfo("Wings Trail caf_no [uploadDKYCWingsTrailJob] : " + caf_no);
                    PaymentGateway objPaymentGateway = new PaymentGateway();
                    requestObj.put("AMOUNT", -1);
                    requestObj.put("RETURN_URL", CRSAppResources.RETURN_URL);
                    dataInformation.put("IS_SELF_JOB", true);
                    dataInformation.put("wl_caf_no", caf_no);
                    dataInformation.put("WINGS_TARIFF_PLAN", 0);

                    if (insertRespObj.getString("STATUS").equalsIgnoreCase("0")) {
                        JSONObject tempJson = new JSONObject();
                        StringBuilder info2Data = null;
                        info2Data = new StringBuilder();
                        info2Data = info2Data.append("ISD:").append(Subscriber_JSON.getBoolean("WINGS_ISD") ? 1 : 0).append(",");
                        info2Data = info2Data.append("IR:").append(Subscriber_JSON.getBoolean("WINGS_IR") ? 1 : 0).append(",");
                        info2Data = info2Data.append("FT:").append(reqJson.getBoolean("isPaymentDone") ? "PD" : "PND");
                        prInfo("info2Data [uploadDKYCWingsTrailJob] : " + info2Data.toString());
                        dataInformation.put("Info2", info2Data);
                        dataInformation.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                        if (new CRSFmsJobUpload().insertWingsPrePaymentJob(dataInformation)) {
//                            JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(requestObj);
                            JSONObject initiatePaymentStatus = new JSONObject();
                            prInfo("initiatePaymentStatus [uploadDKYCWingsTrailJob] : " + initiatePaymentStatus);
                            initiatePaymentStatus.put("sessionId", requestObj.getString("SESSIONID"));
                            initiatePaymentStatus.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                            initiatePaymentStatus.put("CAF_NO", caf_no);
                            initiatePaymentStatus.put("TARIFF_PLAN_ID", Subscriber_JSON.getString("WINGS_TARIFF_PLAN_ID"));
                            initiatePaymentStatus.put("AMOUNT", -1);
                            initiatePaymentStatus.put("TXN_STATUS", "TRIAL");
//                            initiatePaymentStatus.put("TIME_STAMP", "TRAIL");
                            if (objPaymentGateway.auditPaymentTxn(initiatePaymentStatus)) {
                                if ((Subscriber_JSON.getBoolean("WINGS_ISD") || Subscriber_JSON.getBoolean("WINGS_IR"))) {
                                    objPaymentGateway.auditPaymentTxnforISDIR(initiatePaymentStatus);
                                }
                                dataInformation.put("WINGS_ISD", (Subscriber_JSON.getBoolean("WINGS_ISD") ? 1 : 0));
                                dataInformation.put("WINGS_IR", (Subscriber_JSON.getBoolean("WINGS_IR") ? 1 : 0));
                                dataInformation.put("WINGS_PYMT_STATUS", "TRIAL");
                                AppLogger.debug("Trail Job Upload data [uploadDKYCWingsTrailJob] : " + encyptDecriptString.Encrypt(dataInformation.toString()));

                                JSONObject serviceRes = new CRSClient().serviceRequest(ZipFilePath, dataInformation.toString(), OnboardURL);
                                AppLogger.debug("Response of saveFMSDKYCJob [uploadDKYCWingsTrailJob] : " + serviceRes);
                                if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                                    try {
                                        if(Subscriber_JSON.getString("WINGS_TARIFF_PLAN_ID").equalsIgnoreCase("WTP6B")){
                                          updateBSNlEmpData(Subscriber_JSON.optString("EMP_REFERAL"));
                                        }
                                        JSONObject paymentTxnData = new PaymentGateway().getPaymentTxnDtls(sessionID);
                                        prInfo("paymentTxnData in [uploadDKYCWingsTrailJob] :: " + paymentTxnData);
                                        if (paymentTxnData.optString("TXN_STATUS").length() == 0) {
                                            paymentTxnData = null;
                                            prInfo("paymentTxnData id TXN_STATUS is empty [uploadDKYCWingsTrailJob] :: " + paymentTxnData);
                                        }
                                        session.setAttribute("PAYMENT_TXN", paymentTxnData);
                                        request.setAttribute("PAYMENT_TXN", paymentTxnData);
                                        session.setAttribute("JOB_STATUS", "Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest, Kindly make a note of the application number for future correspondance (e.g. WL0000234)");
                                        response.setSuccess(true);
                                        response.setMessage(serviceRes.getString("MESSAGE"));
                                        response.setResponseData(serviceRes);
                                        retVal = "FMSDKYC";
                                    } catch (Exception e) {
                                        prLog("Exception [uploadDKYCWingsTrailJob] [getPaymentTxnDtls]:  ", e);
                                    }
                                } else {
                                    request.setAttribute("MESSAGE", "Unable to upload CAF. Try again later.");
                                    response.setSuccess(false);
                                    response.setMessage(serviceRes.getString("MESSAGE"));
                                    response.setResponseData(serviceRes);
                                    retVal = "FAIL";
                                }
                            } else {
                                request.setAttribute("MESSAGE", "Unable to upload CAF. Try again later.");
                                response.setSuccess(false);
                                response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                                response.setResponseData(tempJson);
                                retVal = "FAIL";
                            }
                        } else {
                            request.setAttribute("MESSAGE", "Unable to upload CAF. Try again later");
                            response.setSuccess(false);
                            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                            response.setResponseData(tempJson);
                            retVal = "FAIL";
                        }
                    } else {
                        response.setSuccess(false);
                        response.setMessage(insertRespObj.getString("MESSAGE"));
                    }
                } catch (Exception e) {
                    prLog("Exception in [uploadDKYCWingsTrailJob]", e);
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
            prLog("Exception in [CRSFmsJobUpload][uploadDKYCWingsTrailJob] :: ", e);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("UPLOAD_WINGS_JOB_ERROR"));
            retVal = "FAIL";
        } finally {
            prInfo("[CRSFmsJobUpload][uploadDKYCWingsTrailJob] finally block " + retVal);
            new FMS_NewForm().ClearSessionvals();
        }
        prInfo("[CRSFmsJobUpload][uploadDKYCWingsTrailJob][END]");
        return retVal;
    }
    
    
    
    public boolean updateBSNlEmpData(String Emp_Ref) {
        prInfo("[updateBSNlEmpData][START]");
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            prDebug("ReqData [updateBSNlEmpData] :" + Emp_Ref);
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("UPDATE_BSNL_EMP_REF_UTIL").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [updateBSNlEmpData] :: " + auditPaymentTxn_Qry+ " | Emp_Ref :: "+Emp_Ref);
            con = CRSDBManager.getConnection();
            prDebug("Con in [updateBSNlEmpData]  ::  " + con);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            pstmt.setString(1, Emp_Ref);
            int insCount = pstmt.executeUpdate();
            prDebug("update count [updateBSNlEmpData] :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in [updateBSNlEmpData] : ", e);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[updateBSNlEmpData][END] " + status);
        return status;
    }

    public void setDefaultData(JSONObject dataInformation) {
        InetAddress ip = null;
        InetAddress networkIP = null;
        CRSUtils utils = new CRSUtils();
        String client_ipAddr="";
//        try {
//            networkIP = InetAddress.getLocalHost();
//            ip = utils.getLocalHostLANAddress();           
//            dataInformation.put("PC_IP", networkIP.getHostAddress());
//        } catch (Exception e) {
//            dataInformation.put("PC_IP", "");
//            prLog("Exception in IP address getting in job upload ", e);
//
//        }
try {
                    
                    client_ipAddr=request.getHeader("X-FORWARDED-FOR");
                    if(client_ipAddr == null){
                    client_ipAddr=request.getRemoteAddr();
                    }
                    networkIP = InetAddress.getLocalHost();
                    ip = utils.getLocalHostLANAddress();
                    AppLogger.debug("N/W IP address is:: " + client_ipAddr);
//                    dataInformation.put("PC_IP", networkIP.getHostAddress());
                    dataInformation.put("PC_IP", client_ipAddr);
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
            dataInformation.put("PC_MAC", sb.toString());
        } catch (Exception e) {
            dataInformation.put("PC_MAC", "");
            prLog("Exception in MAC address getting in job upload :", e);
        }
        try {            
            dataInformation.put("PC_MAKE", networkIP.getHostName());
        } catch (Exception e) {
            dataInformation.put("PC_MAKE", "");
            prLog("Exception in PC Name getting in job upload", e);
        }
    }
    
     public boolean deleteDirOFFMS(File dir) {
        prInfo("[CRSWingsDkyc][deleteDirOFFMS][START]");      
      try{
        if (dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDirOFFMS(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        prInfo("[CRSWingsDkyc][deleteDirOFFMS][END]");
      }catch(Exception e){
       prLog("Exception in [CRSWingsDkyc][deleteDirOFFMS] :: ", e);
      }
        return dir.delete();

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
