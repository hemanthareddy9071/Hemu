/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmsekyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSMDH5;
import com.in10s.commons.CRSNotificationManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.core.CRSLoginValidator;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.interceptors.CRSRequestDecryptor;
import com.in10s.logger.AppLogger;
import com.in10s.logger.CRSThreadLocalManager;
import com.in10s.payment.PaymentGateway;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import java.util.Locale;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileDeleteStrategy;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author krishna.t
 */
public class FMS_ekyc {

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

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    
    private File userFile;
    private File userFileS;
    private File userFileL;
    private String userFileContentType;
    private String userFileSContentType;
    private String userFileLContentType;
    private String userFileFileName;
    private String userFileSFileName;
    private String userFileLFileName;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String loadekyc() {
        String retVal="success";
        try {
            AppLogger.info("Start of loadekyc method in FMS_ekyc");
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            session.setAttribute("KYCType", "FMSEKYC");
            
            String strReqData = request.getParameter("reqData");
            if(strReqData =="" || strReqData == null){
            retVal= "InvalidRequest";
            }
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.info("Request data ::::" + reqJson);
            if(reqJson.containsKey("bckBtnEnable")){
            request.setAttribute("IS_BACK_ACTION", "TRUE");
            }
            loginResponse.put("LoadekycData", reqJson);
            request.setAttribute("ResponseData", reqJson);
            session.setAttribute("ResponseData", reqJson);
            session.setAttribute("WL_CAF_NO", reqJson.get("CAF_NO"));
            session.setAttribute("Payment_Status", reqJson.optString("STATUS").equalsIgnoreCase("success")?"true":false);
           if(reqJson.containsKey("STATUS")?reqJson.getString("STATUS").equalsIgnoreCase("success"):false){
            session.setAttribute("SESSIONID", reqJson.optString("SESSIONID",""));
           }
            response = new CRSResponse();
            response.setSuccess(true);
            response.setResponseData(reqJson);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in loadekyc method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception in loadekyc method");
        }
        AppLogger.info("Ending of loadekyc method  in FMS_ekyc : ");
        return retVal;
    }
    
    public String loadekyc(JSONObject reqJson) {
        String retVal="success";
        try {
            
            AppLogger.info("Start of loadekyc method in FMS_ekyc");
            session = request.getSession(false);
            session.setAttribute("KYCType", "FMSEKYC");  
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");            
            AppLogger.info("Request data ::::" + reqJson);
            if(reqJson.containsKey("bckBtnEnable")){
                request.setAttribute("IS_BACK_ACTION", "TRUE");
            }
            loginResponse.put("LoadekycData", reqJson);
            request.setAttribute("ResponseData", reqJson);
            session.setAttribute("ResponseData", reqJson);
            session.setAttribute("WL_CAF_NO", reqJson.get("CAF_NO"));
            session.setAttribute("Payment_Status", reqJson.optString("STATUS").equalsIgnoreCase("success")?"true":false);
           if(reqJson.containsKey("STATUS")?reqJson.getString("STATUS").equalsIgnoreCase("success"):false){
            session.setAttribute("SESSIONID", reqJson.optString("SESSIONID",""));
            if(!reqJson.optString("SESSIONID").equals("")){
           session.setAttribute("prev_isdir_dtls", new PaymentGateway().fetchInfo2Details(reqJson.optString("SESSIONID")));
            }else{
            session.setAttribute("prev_isdir_dtls","");
            }
           }
            response = new CRSResponse();
            response.setSuccess(true);
            response.setResponseData(reqJson);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in loadekyc method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception in loadekyc method");
        }
        AppLogger.info("Ending of loadekyc method  in FMS_ekyc : ");
        return retVal;
    }
    
    public String backToLoadRegisteredUsers() {
        try {
            AppLogger.info("Start of backToLoadRegisteredUsers method in FMS_ekyc");
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
           
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.info ("Start of backToLoadRegisteredUsers method in FMS_ekyc::" + loginResponse );
               
            request.setAttribute("loginResponse", loginResponse);
            response = new CRSResponse();
            response.setSuccess(true);
            response.setResponseData(loginResponse);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in loadekyc method :" + sw.toString());            
            //response.setSuccess(false);
            response.setMessage("Exception in loadekyc method");
            return "success";
        }
        AppLogger.info("Ending of loadekyc method  in FMS_ekyc : ");
        return "success";
    }


    public static boolean deleteFile(File file) {
        boolean fileDelStatus = file.delete();
        try {
            if (!fileDelStatus) {
                FileDeleteStrategy.FORCE.delete(file);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception occured while deleting files in session:::" + sw.toString());

        }
        return true;
    }

    public String DeviceLock() {
        AppLogger.info(" Starting of device lock checking mehtod in FMS_ekyc");

        String retValue = "success";
        JSONObject loginResponse = null;
        try {
            response = new CRSResponse();
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.info("Request data from device locking::::" + reqJson);

            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/OnboardIntegrationService/getUDC";
            AppLogger.info("OnboardURL for getPlans service : " + serviceURL);
            JSONObject input = new JSONObject();

            loginResponse = (JSONObject) session.getAttribute("loginResponse");
            input.put("DEVICE_TYPE", reqJson.getString("deviceName"));
            input.put("SOURCE", "T");
            input.put("DEVICE_SNO", reqJson.getString("deviceSRNo"));
            input.put("USER_ID", loginResponse.getString("UserId"));
            input.put("USER_FLAG", loginResponse.getString("UserFlag"));
            input.put("DB_LINK", loginResponse.getString("DBLink"));
            input.put("BO_DBLink", loginResponse.getString("BODbLink"));
            input.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            input.put("ZONE_CODE", loginResponse.getString("ZoneID"));
            input.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            input.put("LOGIN_ID", loginResponse.getString("UserName"));
            AppLogger.debug("Request for service : " + input);
            String deviceLockResp = new CRSClient().OnBoardServiceCall(serviceURL, input.toString());
            AppLogger.debug("response for  service : " + deviceLockResp);
            JSONObject resp = (JSONObject) JSONSerializer.toJSON(deviceLockResp);
            if (resp.containsKey("STATUS") && resp.getString("STATUS") != null) {
                if (resp.getString("STATUS").equals("0")) {
                    session.setAttribute("validationKey", resp.getString("VALIDATION_KEY"));
                    session.setAttribute("UDC", resp.getString("UDC"));
                }
            }

            response.setSuccess(true);
            response.setResponseData(resp);

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in Device locking block::in FMS_ekyc::  " + sw.toString());
        }
        AppLogger.info(" Ending of device lock method in FMS_ekyc");
        return retValue;
    }

    public String FmsEkycauthenticate() {
        AppLogger.info(" starting of FmsEkycauthenticate method in FMS_ekyc");
        String currentHTML = "";
        try {
            request = ServletActionContext.getRequest();
            String inputData = request.getParameter("reqData");
            session = request.getSession(false);
            AppLogger.debug("Request Data in authenticat method in FMS_EKYC is:::" + inputData);
            try {
                session.setAttribute("errMsg", "");
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                AppLogger.error("Exception in  authenticate method errMsg measg empty::::  " + sw.toString());
            }
            JSONObject aadharReq = (JSONObject) JSONSerializer.toJSON(inputData);
            response = new CRSResponse();

            String strBrowserId = aadharReq.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);
            String deviceName = aadharReq.getString("deviceName");
            String AadharNo = aadharReq.getString("AadharNo");
            String flowtype = aadharReq.getString("flowtype");
            String responseText = aadharReq.getString("responseText");
            String AuthenticateType = aadharReq.getString("AuthenticateType");
            String nxtHTML = aadharReq.getString("nxtHTML");
            currentHTML = aadharReq.getString("currentHTML");
            String DeviceSerialNumber = aadharReq.getString("DeviceSerialNumber");
            String selectDevice = aadharReq.getString("selectDevice");
            String UDC = aadharReq.getString("UDC");
            session.setAttribute("DeviceSerialNumber", DeviceSerialNumber);
            session.setAttribute("selectDevice", selectDevice);
            session.setAttribute("AgentAadhar", AadharNo);
            String formName = aadharReq.getString("formName");
            if (formName.equalsIgnoreCase("FMS_eKYC_step2")) {
                session.setAttribute("AgentAadhar_No", aadharReq.getString("AgentAadhar_No"));
            }
            JSONObject resp = new FMSAadharResponse().UDC(deviceName, AadharNo, flowtype, responseText, CRSAppResources.PID_XML, AuthenticateType, nxtHTML, currentHTML, DeviceSerialNumber, UDC);
            AppLogger.debug("Response form CRSAadharResponse in authenticate method is::::" + resp);
            if (resp.containsKey("status")) {
                if (resp.containsKey("MESG")) {
                    if (resp.getString("MESG").equalsIgnoreCase("")) {
                        return resp.getString("rootingPage");
                    } else {
                        response.setMessage(resp.getString("MESG"));
                        session.setAttribute("errMsg", resp.getString("MESG"));
                        return currentHTML;
                    }
                } else {
                    AppLogger.info("MESG  key is not avilable in UDC method response ");
                    return currentHTML;
                }
            } else {
                AppLogger.info("status  key is not avilable in UDC method response ");
                return currentHTML;

            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  FmsEkycauthenticate method :  " + sw.toString());
        }
        AppLogger.info(" ending of FmsEkycauthenticate method in FMS_ekyc");
        return "success";
    }

    public String FMSeKYCPage3() {

        return "success";
    }

    public String FmsEkycFranchisedata() {
        AppLogger.info("Starting of FmsEkycFranchisedata method in FMS_ekyc");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("input request from FmsEkycFranchisedata ::::::" + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);
            String fms_ekyc_Stp1Data = reqJson.getString("fms_ekyc_Stp1Data");
            String fmsstep1status = reqJson.getString("FMS_Step1_status");
            String fmskyctype = reqJson.getString("FMS_KYCType");
            String usercode = reqJson.getString("UserCode");

            session.setAttribute("fms_ekyc_Stp1Data", fms_ekyc_Stp1Data);
            session.setAttribute("FMS_Step1_status", fmsstep1status);
            session.setAttribute("FMS_KYCType", fmskyctype);
            session.setAttribute("UserCode", usercode);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in FmsEkycFranchisedata method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception occured while sending");
        }
        AppLogger.info("Ending of FmsEkycFranchisedata method in FMS_ekyc");
        return "success";

    }

    public String fmsekycFullData() {
        AppLogger.info("Starting of fmsekycFullData method in FMS_ekyc");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            if (strReqData == "" || strReqData == null) {
                return "InvalidRequest";
            }
            String ZipFilePath = "";
            File zip = null;
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("input request from fmsekycFullData ::::::" + reqJson);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MMM/dd");
            java.util.Date date = Calendar.getInstance().getTime();
            String strDate = sdf.format(date);
            prDebug("Date :: " + strDate);

            String fmskycFullData = reqJson.getString("FMS_KYC_Cust_Data");
            JSONObject fmskycData = (JSONObject) JSONSerializer.toJSON(fmskycFullData);
            String fms_ekyc_Stp1Data = reqJson.getString("fms_ekyc_Stp1Data");
            if (fmskycData.containsKey("TARRIF_FLAG") && !("".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG")))) {

                File UploadJob = new File(CRSAppResources.TARIFF_ZIP_PATH + File.separator + "Jobs" + File.separator + strDate + File.separator + System.currentTimeMillis() + "_" + fmskycData.getString("cust_mobile_no"));
                boolean folderStatus = UploadJob.mkdirs();
                if ("GOVT".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
                    FileUtils.copyFile(this.userFile, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileFileName()).getAbsolutePath())));

                } else if ("STUDENT".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
                    FileUtils.copyFile(this.userFileS, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileSFileName()).getAbsolutePath())));

                } else if ("LANDLINE".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
                    FileUtils.copyFile(this.userFileL, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileLFileName()).getAbsolutePath())));

                }
                List DOCList = new ArrayList();
                List ImagePathList = new ArrayList();
                String FolderName = UploadJob.getName();

                File[] filesList = UploadJob.listFiles();
                for (int j = 0; j < filesList.length; j++) {
                    AppLogger.debug("ZIP File name in fmsekycFullData method is : " + filesList[j].getName());
                    AppLogger.debug("folder length in fmsekycFullData method is : " + filesList.length);
                    if (filesList[j].isFile() && !(filesList[j].getName().contains("json"))) {
                        ImagePathList.add(filesList[j].getAbsolutePath());
                        DOCList.add(filesList[j].getName());
                    }
                }

                if (ImagePathList.size() > 0 && (DOCList.size() == ImagePathList.size())) {
                    ZipFilePath = doZip(UploadJob.getAbsolutePath(), ImagePathList, DOCList, FolderName);
                    String HashKey = new CRSMDH5().getHashKey(new File(ZipFilePath), "MD5");
                    AppLogger.debug("Hashkey of zipFile in fmsekycFullData method is :" + HashKey);
                    fmskycData.put("HashKey", HashKey);

                } else {
                    fmskycData.put("HashKey", "");
                }
                zip = new File(ZipFilePath);
                AppLogger.debug("Zip file size  in fmsekycFullData method is::::::" + zip.length() / 1024 + "kb");
                fmskycData.put("ZipFileList", DOCList);
                fmskycData.put("ZipFileCreation", ZipFilePath);
                fmskycData.put("ZipFileLength", zip.length());
                fmskycData.put("FILE_NAME", zip.getName());
                fmskycData.put("TARIFF_ID_DOC_PATH", ZipFilePath);
            } else {
                fmskycData.put("ZipFileList", "");
                fmskycData.put("ZipFileCreation", "");
                fmskycData.put("ZipFileLength", 0);
                fmskycData.put("FILE_NAME", "");
                fmskycData.put("TARIFF_ID_DOC_PATH", "");

            }
            request.setAttribute("CUST_FORM_DATA",fmskycData);
            fmskycFullData = fmskycData.toString();
            session.setAttribute("FMS_KYC_Cust_Data", fmskycFullData);
            session.setAttribute("fmskycFullData", fmskycFullData);
            session.setAttribute("fms_ekyc_Stp1Data", fms_ekyc_Stp1Data);
            session.setAttribute("instal_chkif_same", fmskycData.getString("instal_chkif_same"));
            JSONObject documentTypes = new JSONObject();

            documentTypes.put("JOB_TYPE", "KYC");
            documentTypes.put("LOB_TYPE", "LANDLINE");
            documentTypes.put("instal_chkif_same", fmskycData.getString("instal_chkif_same"));

            if (fmskycData.getString("instal_chkif_same").equalsIgnoreCase("true")) {//images optional
                return "success";
            } else {
                return "attachementPage";
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in fmsekycFullData method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception occured while sending");
        }
         
        AppLogger.info("Ending of fmsekycFullData method in FMS_ekyc");
        return "success";
    }

    public String ImagesEKyc() {
        AppLogger.info("Starting of attachedmentValidation method in FMS_ekyc");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            System.out.println("strReqDataaaaaaaaaaa" + strReqData);
            strReqData = new CRSAuthenticate().Decrypt(strReqData);
            System.out.println("strReqDataaaaaaaaaaa" + strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);

            String SessionFilePathImages = (String) session.getAttribute("SessionFilePath");

            String attachmentsPOA = SessionFilePathImages + File.separator + "POA.jpeg";
            attachmentsPOA = attachmentsPOA.replace("\\", "/");
            attachmentsPOA = attachmentsPOA.replace("//", "/");

            AppLogger.debug("instal_chkif_same::" + session.getAttribute("instal_chkif_same"));

            String poi_same_chk = (String) session.getAttribute("instal_chkif_same");

            if (poi_same_chk.equalsIgnoreCase("true")) {//images optional

                File attachmentsPOA1 = new File(attachmentsPOA);
                if (attachmentsPOA1.exists()) {
                } else {
                    response.setSuccess(false);
                    response.setMessage("Please select attachements");
                    return "errorPage";
                }

            } else {

                File attachmentsPOA1 = new File(attachmentsPOA);
                if (attachmentsPOA1.exists()) {
                } else {
                    response.setSuccess(false);
                    response.setMessage("Please select attachements");
                    session.setAttribute("msgErr", "Please select attachements");
                    return "errorPage";
                }

            }

            session.setAttribute("msgErr", "");
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in attachedmentValidation method :::" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception occured while sending");
        }
        AppLogger.info("Ending of attachedmentValidation method in FMS_ekyc");
        return "success";
    }

    public String imaageValidation() {
        try {
            AppLogger.info("Starting of imaageValidation method in FMS_ekyc");
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("input request from imaageValidation ::::::" + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            String SessionFilePathImages = (String) session.getAttribute("SessionFilePath");

            String attachmentsPOA = SessionFilePathImages + File.separator + "POA.jpeg";
            attachmentsPOA = attachmentsPOA.replace("\\", "/");
            attachmentsPOA = attachmentsPOA.replace("//", "/");

            AppLogger.debug("instal_chkif_same::" + session.getAttribute("instal_chkif_same"));

            String poi_same_chk = (String) session.getAttribute("instal_chkif_same");

            if (poi_same_chk.equalsIgnoreCase("true")) {//images optional

                File attachmentsPOA1 = new File(attachmentsPOA);
                if (attachmentsPOA1.exists()) {
                } else {
                    response.setSuccess(false);
                    response.setMessage("Please select attachements");
                    return "errorPage";
                }

            } else {

                File attachmentsPOA1 = new File(attachmentsPOA);
                if (attachmentsPOA1.exists()) {
                } else {
                    response.setSuccess(false);
                    response.setMessage("Please select attachements");
                    session.setAttribute("msgErr", "Please select attachements");
                    return "errorPage";
                }

            }

            session.setAttribute("msgErr", "");
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in imaageValidation method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception occured while sending");
        }
        AppLogger.info("Ending of imaageValidation method in FMS_ekyc");
        return "success";

    }
    
    public static long generateRandom(int length) {
        Random random = new Random();
        char[] digits = new char[length];
        digits[0] = (char) (random.nextInt(9) + '1');
        for (int i = 1; i < length; i++) {
            digits[i] = (char) (random.nextInt(10) + '0');
        }
        return Long.parseLong(new String(digits));
    }  

    public String sendOTPRequest() {
        AppLogger.info("Starting of sendOTPRequest method in FMS_ekyc");
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("request for sendOTPRequest is : " + reqJson);
            if (reqJson.getString("inputType").equalsIgnoreCase("aadhar")) {
                reqJson.put("AADHAR_NO", reqJson.getString("UID"));
                reqJson.put("REQ_TYPE", "OTP");
                reqJson.put("REQ_TIME_SERVER", new SimpleDateFormat("dd-MM-yyyy hh:mm:ss a").format(Calendar.getInstance().getTime()));
                JSONObject aadharRespJson = sendAadhaarRequest(reqJson);
                AppLogger.info("response fron [sendOTPRequest]::" + aadharRespJson);
                if (aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("STATUS").equals("0")) {
                    response.setSuccess(true);
                    response.setMessage(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("MESSAGE"));
                    response.setResponseData(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data"));
                } else {
                    response.setSuccess(false);
                    response.setMessage(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("MESSAGE"));
                }
            } else {
                int otpNum = (int) generateRandom(6);
                JSONObject messageJSON = new JSONObject();
                messageJSON.put("msg", msgObj.getMessge("MOB_OTP_MSG").replace("@@OTP@@", String.valueOf(otpNum)));
                messageJSON.put("subject", "OTP");
                messageJSON.put("MOBILE_NO", reqJson.getString("mobile_no"));
                messageJSON.put("TYPE", "S");
                messageJSON.put("sub_date", "");
                messageJSON.put("BSNL_URL", 1);
                AppLogger.info("send notification req json1:: " + messageJSON);

                session.setAttribute("OTP", 000000);
//                session.setAttribute("OTP", otpNum);
//                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
//                String date = sdf.format(new java.util.Date());
//                String wingsOTPAckRandom = Integer.toString((int)(10000000.0 * Math.random()));
//                AppLogger.info("random number for otp ack :: " + wingsOTPAckRandom);
//                String ack = date + wingsOTPAckRandom;
//                AppLogger.info("Ack in wings otp :: " + ack);
//                JSONObject wingsOTPData = new JSONObject();
//                wingsOTPData.put("ZONE_CODE", reqJson.getString("zone"));
//                wingsOTPData.put("CIRCLE", reqJson.getString("state"));
//                wingsOTPData.put("MOBILE_NO", reqJson.getString("mobile_no"));
//                wingsOTPData.put("OTP", otpNum);
//               
//                JSONObject resultJson1 = new CRSNotificationManager().sendOTPFromBSNL(messageJSON);
//                AppLogger.info("Response from [sendNotification] first service :: " + resultJson1);
//                wingsOTPData.put("STATUS", resultJson1.getString("STATUS"));
//                wingsOTPData.put("ACKID", resultJson1.optString("ackId", ack));
//                wingsOTPData.put("COMMENTS", resultJson1.optJSONArray("errdesc"));
//                wingsOTPAudit(wingsOTPData);
//                messageJSON.put("BSNL_URL", 2);
//                wingsOTPAckRandom = Integer.toString((int)(10000000.0 * Math.random()));
//                ack = date + wingsOTPAckRandom;
//                AppLogger.info("send notification req json2 :: " + messageJSON);
//                JSONObject resultJson2 = new CRSNotificationManager().sendOTPFromBSNL(messageJSON);
//                AppLogger.info("response from [sendNotification] second service :: " + resultJson2);
//                wingsOTPData.put("STATUS", resultJson2.getString("STATUS"));
//                wingsOTPData.put("ACKID", resultJson2.optString("ackId", ack));
//                wingsOTPData.put("COMMENTS", resultJson2.optJSONArray("errdesc"));
//                wingsOTPAudit(wingsOTPData);


               if (true) {
//               if ("PARTIAL".equalsIgnoreCase(resultJson1.getString("STATUS")) || "PARTIAL".equalsIgnoreCase(resultJson2.getString("STATUS"))) {
                    response.setSuccess(true);
                    response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_SUCCESS"));                    
                     
                } else {
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_FAIL"));
                }
            }
        } catch (Exception e) {
            prLog("Exception in sendOTPRequest : :: ", e);           
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_ERROR"));
        }
        return "success";
    }

    public boolean wingsOTPAudit(JSONObject wingsOTPData) {
        prInfo("[FMS_ekyc][wingsOTPAudit][START]");
        prDebug("wingsOTPAudit Data :" + wingsOTPData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [wingsOTPAudit]  ::  " + con);
            String[] columns = {"ZONE_CODE", "CIRCLE", "MOBILE_NO", "OTP",  "STATUS", "ACKID", "COMMENTS"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_OTP_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [wingsOTPAudit] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, wingsOTPData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("wingsOTPAudit count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in [[FMS_ekyc][wingsOTPAudit] :", e);
        } finally { 
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][wingsOTPAudit][END]");
        return status;
    }
    
    public String verfyOTPAndSubmit() throws SQLException {
        AppLogger.info("Starting of verfyOTPAndSubmit method in FMS_ekyc");
        JSONObject responceJson = new JSONObject();
        ResultSet resultSet = null;
        PreparedStatement pstmt = null;
        Connection con = null;
        JSONArray jobsArr = new JSONArray();
         CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("request for verfyOTPAndSubmit is : " + reqJson);
            if (reqJson.getString("inputType").equalsIgnoreCase("aadhar")) {
                reqJson.put("AADHAR_NO", reqJson.getString("UID"));
                reqJson.put("REQ_TYPE", "OTPKYC");
                reqJson.put("REQ_TIME_SERVER", "2018-07-26 15:49:32.413");
                session.setAttribute("AADHAR_OTP_SEQ_ID", reqJson.getString("AADHAR_OTP_SEQ_ID"));
                JSONObject aadharRespJson = sendAadhaarRequest(reqJson);
                AppLogger.info("response fron [sendOTPAadhaarRequest]::" + aadharRespJson.toString());
                if (aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("STATUS").equals("0")) {
                    response.setSuccess(true);
                    response.setMessage(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("MESSAGE"));
                    response.setResponseData(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data"));
                    session.setAttribute("AadharResponse", aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data"));
                } else {
                    response.setSuccess(false);
                    response.setMessage(aadharRespJson.getJSONObject("aadhaarResponse").getJSONObject("data").getString("MESSAGE"));
                }
            } else {    
                if ((session.getAttribute("OTP")).equals(reqJson.getInt("OTP"))) {
                    loginValidationOTP(reqJson);
                    session.setAttribute("RegMobNum", reqJson.optString("RegMobNum"));
                    session.setAttribute("regEmail", reqJson.getString("regEmail"));
                    session.setAttribute("regPINCode", reqJson.getString("regPINCode"));
                    String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_WINGS_REGISTERED_USER").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                    prDebug("Query for LOAD_WINGS_REGISTERED_USER : " + fetchQry);
                    con = CRSDBManager.getConnection();
                    prInfo("[FMS_ekyc][verfyOTPAndSubmit][Connection]::" + con);
                    pstmt = con.prepareStatement(fetchQry);
                    pstmt.setString(1, reqJson.getString("mobile_no"));
                    pstmt.setString(2, reqJson.getString("state"));
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
                        bpJson.put("isCircleEnable", reqJson.getString("isCircleEnable"));
                        jobsArr.add(bpJson);

                    }
                    responceJson.put("Data", jobsArr);
                    responceJson.put("LABELS", "_LABL");
                    JSONObject resultJson=new FMSWingsCustomerSupport().customJsonFormat(responceJson);
                    response.setResponseData(resultJson);
                    response.setSuccess(true);
                    response.setMessage(msgObj.getMessge("WINGS_OTP_VRF_SUCCESS"));
                } else {
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("WINGS_OTP_VRF_FAIL"));
                }
            }

        } catch (Exception e) {
            prLog("Error in [[FMS_ekyc][verfyOTPAndSubmit] :", e);           
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("WINGS_OTP_VRF_ERROR"));

        }finally{
       CRSDBManager.closePS(pstmt);
       CRSDBManager.closeRS(resultSet);
       CRSDBManager.closeCon(con);
        }
        return "success";
    }

    public String FmsEkycCall() {
        AppLogger.debug("in FmsEkycCall method ...!");
        String retVal="success";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String reqStr=request.getParameter("reqData");

      
            if(reqStr == "" || reqStr == null){
                retVal= "InvalidRequest";
            }

//            String str = "{\"Remarks\":\"eKYC Transaction Success\",\"Request_Type\":\"Ekyc\",\"KycRes_code\":\"70f8c541d7a74f59afc000fef80cafe6\",\"KycRes_ret\":\"Y\",\"KycRes_ts\":\"2018-06-22T17:47:32.020+05:30\",\"KycRes_ttl\":\"2019-06-22T17:47:32\",\"KycRes_txn\":\"UKC:152966985054615\",\"UidData_tkn\":\"01000429Vc3OMUMrlhb7dQ32WKEiclvE22zK1tOOs0Siz3BLZAbcm64DFbJeM0WlXmq+TO8j\",\"UidData_uid\":\"xxxxxxxx5448\",\"Poi_dob\":\"06-05-1982\",\"Poi_gender\":\"M\",\"Poi_name\":\"Praveen Kumar Karumuri\",\"UidData\":\"\",\"Poa_co\":\"S/O: Soma Sekhar\",\"Poa_dist\":\"West Godavari\",\"Poa_house\":\"5-6-8\",\"Poa_loc\":\"narsapur\",\"Poa_pc\":\"534275\",\"Poa_state\":\"Andhra Pradesh\",\"Poa_street\":\"court street\",\"Poa_vtc\":\"Chinamamidipalle (Rural)\",\"Pht\":\"/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDnqD70pGaQ0GAZozRg0Y4oAAafGcNmmYp6DJpgSE+9AbHWmkH14pQDQMd+FHHpQKQggc0CFGKXv3pq07acZoGOwMelOX0pq0/FAhy8GlmP7oe5pFyM+1Ep+VRnrzSGIn0pJVxz2p8SkUTr0GaAIR06YpDxkUuCBTcE0AQ4oIwe1KDSnBpiGY+lIOtKaSgBQPanoOtR1Kn3e3WgBf1oGKQ9aXtQA8dDxSDjpSBscd6XdQAoAz6U7HtSDNG7BoAco5qTAIqMVIvNAABhqdOB8g9BTc8+9PuMBkH+yCaAHxKPLHuaZNgvntU8LAKOQPwqtOf3h9KAIiMnpxSqADmkpQc0DKa9ak6UwcGpOoHPWgQ1l4pmD0qbqKjbGaAG81Kn3ajqVeVFADe9OHNIT9KBQMdgYpAKaXwKQuKBE6jtS7ahSX3qYODQAqLxT+MDFC8pgc4p3BoAWNfmxjiiYfvcCnKMnNJJy/XmgCSP7h9euarNySTzU5bCgD8aiIzx60AR4zUtvFukAPQ0gWrkEW/5lOMUAzDzz0p4P50zjjApwwD3pDJFpjDmnAj1owDwDTAi6U8MMD6U1ximBvcUAPLc03zAB1qtdXUdvGZJGCqD1rm77X5ZGIgOxOme5oHa500k6ryWAHqarS6paR8NOn4HP8q4pp5JDlnJpu845NIrlO3XVbQLu89MD35/KrltexXCbopFcexrz5ZT35FTJdSRHdG7Kx7qcUXDlPSo5Plx0qQNXGaZ4ikQolyA0fTf3H+NdXFMsih0YMp5BFNEtWLyHByKYTmUmlQ5HHWm/wARxQSLncfpR7UY/ipyIX6flQMVV59xViNzH/DgEY4pgUblGT9f51NhgxKnIH8qQHPg+9ODYPrURJDf40u7pTAnDU0nAPNMBoJzzQFgc8etU7idIEaRzhQMk1abOyuV8QXZLrbqwwPmbB79qASuZt9qEl7OWc8DhQOgFVhGzH0FLEoPJ61ODmobNUhsdopPzGrSWcfpSRHp1q0uPesXJmqiEdlA33kFSjSYXPyFlp8YOauwYVxyefWo5mh8qMibSJ4lLoA4HOBVrStYezKwzfNCehPVP/rV0ZRBDkHmuc1KyBLzR8d+K1hU7mbidfDcAoGGCDyKscYBrltAvN9uIGB8xBnkdRXT5+RfoK3TMGrD1IzjtU8IIPGeKrR/M+KtIdooETrhVwQabvAPFKHyM+9Rse+aBmDtz2pO+KdnDDmlODQAg9KPpS4pOnagBGH7s/SvPLuUy3EjsclmJr0Kc4hfBI4NeczjEpA7E0io7kkR+WpUK55NQLnYFHHqaPIJ6PUM1RpQmM8Zq/HEjAYPNYAieM5DZq5BcSKMFqzlHsWpGt0PHarVv8xwWFY5nfy88k1WN5cI2UZqhQuNux1yhyvHIrPumzHJkEYFYyaldoQQzj6Gra3ZnQq45YYBp8jRPMR6XcGK+iOeCdp+hrvP4B9K84tDi8iQ8ZcDP416NnIFdMTCZYtR+8Bx0q1Io/h6elRWwAqV/rTIGqcHkU3vRnNKBmgDnyOhpwJxSkYOP50mOaQwJOPelPqKKMgd6YEFw5WJyeAASc9q4K5UG7YKQQWyMV1+uz+VYFRnMhC5B6D/ADx+NcnsxKCfSpbsXFdRGBxxUbbgmQfmz0xVgDJpfLyKzvqapEQwYySTndwCMEilRjuqTywBmmqMsKLhaxsm1MumF0X5weD6+1Y53DdngqOmOtdRaJu00MDwrCkksLa5XzCoD9yKxjKz1NGjm7bfKSMZAGTzj8K0LW2m80eZGwB6EjrV6HTY0cHHP1rTFsypuyT9apzXQmxy5tyuqBP+mnH0Jrv4QGAJNcpdWzfaJpYxyqAkge/+H8jXUaS/n2kTlifkGT6nHNbU5X0MqkdLmlFkU9jlcE0i4B9KUmtDIhYkHgVIGyMcUhWlQEA0AYRbcetNz1pmfTrQc9aBjw3rTWP50meOKQ0CMfXjm2j9N/8ASudLbn5OCK6PXIy9oOCcMCcdq5xh8wOMEVEtzaGw4GpVPHvVfv1qRWxzWbNEPk4WogyK4AzTXmBPXNReeAcKBQkDaN+DU1t4GXJ2nqOuTVlbveoliBAI5BrnY513YZRity3vYpIVT5FwMYAwKiULDUi5HdYPPPeppL3eOOKzGyvKnjsaUEnvU2KuOmnkW6j2ZJPGB3rqtEQR2KKp4ywz7bjXPQI6guFyCCCwPIrptKjENhCueMZB9eeK1pbmVT4TQB4o5pCcdKFORW5gKOtOzxioiu7Byaf+tAaHOdO9GeaZuH0o3igQ4nFL/Ko99G8dDQFgkjEkbKfSsa60+PY2FG7HatlmAXr1qpMcg0WGrnKYwaa5O3ip7xPKunGPlJyKg61mzZEAVc/MTzUqhR0X9KXA64pyyhOoz+FLcB0cbycRxMT6Bae8bw8SRvG3uMVJHfOjgou09asCYzL8/Oe1Jsqw6xmZ0Kk9PWrmAOSelVYsL0GKu2yGedUxxnLfSptdhsje0uxiMiu6fPtzz6/StpSueaoWPEh+lXTgnk810JJGDbZJkYyBSjn2qMEU5WJ6n9KZI8e9B9KTNITQByW/3pC59aYXFNLj1pFD/MI7mkMhPc5qItnvSbh60ASNKSvWq8kwAOWAqK5uBChOevasSeeSVssePSlcaJr2RJHG1gSPSqgbBxTU5c8054ywqHuaLYeCKdtLGq6uycNyKmWcDnip2HcvW8MOPn6+tW8RKPlrI+046HmpY2mm+VeB/eNJpjui5526Ty4xlu5rXsE8s9fmIqjZ2qxID/F3NR6sSDBg9M/0qYtX0CS01OwsX+ZvpV8NkdBXDaNrMttOsUrb4mODnqK7JZQQORiuhO5i1YsUZqMSD1FODD/Jpkjw3HqKdkY60wH3ApwyBnPFMDgTMfWk80561VMsRO1vNjPvTkLf8s3SX2PBqLlWJjKcUxpOOtNE+04e3O49PelWRwCxgCgd2OBRcLFG5kMkmM8Cqb5FTt94n1qJ1yKRSIos5JJqxzioox0HpUwqG9S0MK8daNg781LjNJs9qLhYSOHJrSt0CYxVOMYrQgHGaiTLii4hNUdYQtAkgP3Tj86uxHdxVXVG/wBG2Y5NRF+8OWxlQEkg+hrtYZSIUycfKK5G1i+dB15rs4EtgT9qeURrHlRHt5PHHI/qK6OYwY5bj/aqZbn1NPj0b7TGklpdxOGXdtkBRu3bnPXtnp1plxplza7Q/luW6KjZY/8AAev6U1JEkwuBxxUguAePWs0MR1qRWz6VVxWMFo1kIyAw9xVO6sEJ3KNp9R0qDZeWx+UsR6jkflTjPeEZKuw914qLFBEL2Jtq4cdATzipJrVjE0kzl3A7dBSx6ggXlG31Bc3Vw6cRlUP+z/WjULFKmkZp2CaeqetMZX24YEdDT8c1t6HpkV+ZUckOhBx1BBq1qHhe4sw0sI86EcnH3lHuKiUlcpMw4YfN4qSS2eMdOPap4U8pgQKszkOnTrWTk7mttDMiUs4GK1Iom2gY/Sq0EYDZrTiZeFH3jwB6mlJ9gSI0jaMFz0qlcK8jO5BG07QCOQf85rrrmyj0bS2upTvvydsKgZEbY6+hI5Ofbj35RxiIRLxjqD61UI9WRKV9ER2EOZhnk10EFwYriKQgMEdWCnocHOD7cVlWERVixHCirTt0wO/etTNnRadqGpGApPpnn2+44TymypPoeoqRZSrkQ6FIsh6ec7sv/jwxWxZ3VlFAy/a4c5PWVap3Wq2UaZ+0I2emw7v5VFxEQbUJQ4fT9Nj6YDpnP5E/yqePRRKN7fZ1Y9ljfH/oQ/lWTJr/AM+2CLnH3n45+gpi61qbsTEz4A5EcQYfyJouwscRHqM0R2zJux7YNTNqv92L8zRRWiQCJfWxBZovn+gqGXUw52mMgexoop2H1K4kiHLNgHpxzQbmIEYDUUUJAzS0nVY7G7Ewcdgwx1HpXcR63pmo6dcGOdIpzEy7XOOcHFFFRKK3GY1vop1WR1t3RJFQvkj5WOQMHHTr1rEu4zaXElvP8k0Rw6NwQf6/UZzmiis+VFRk72J7TTLia0a8xttxgqx/iye3tzXU+E4wtxOFZlJjxx35FFFFiW2yvJdw6na3V2GZ0WORlY8ZGOf/AEEflXIq5kOf7xzRRVw6kmtbqFjwBzimScD6HmiihDOpl8O+UgH2sc8/6vH9azZrSxtJgtzdbm4+UD+gyaKKFuI0LPWtLtFKRRSBc5JVAM/rWXe+I4DLsgSRm3d8KD/P+VFFPlQH/9k=\",\"AUTH_TYPE\":\"SA\",\"Poi_phone\":\"\",\"Poi_email\":\"\",\"Poa_lm\":\"\",\"Poa_subdist\":\"\",\"Poa_po\":\"\",\"AADHAR_SEQ_ID\":\"5302\",\"LOB_TYPE\":\"LL\",\"MESSAGE\":\"eKYC Transaction Success\",\"STATUS\":\"0\",\"RESP_AUA_SERVER\":\"2018-07-06 18:58:54.439\",\"AUDIT_ID\":\"8239\"}";

//            session.setAttribute("AadharResponse", str);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return retVal;
    }
    
    public String loadFMSCircles() {
        prInfo("[FMS_ekyc][loadFMSCircles] START");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject circlesJson = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            new  FMS_NewForm().ClearSessionvals();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [loadFMSCircles] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_FMS_CIRCLES").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for LOAD_FMS_CIRCLES : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[loadFMSCircles][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
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
            circlesJson.put("Data", jobsArr);
            prDebug("loadFMSCircles: " + circlesJson.toString());

            if (circlesJson.size() > 0) {
                prInfo("Circles loaded Successfully");
                circlesJson.put("STATUS", "0");
                response.setSuccess(true); 
                response.setMessage(msgObj.getMessge("FETCH_CIRCLES_SUCCESS"));
                response.setResponseData(circlesJson);
            } else {
                prInfo("Unable to load Circles");
                circlesJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_CIRCLES_FAIL"));
                response.setResponseData(circlesJson);
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_ekyc][loadFMSCircles]:  ", ex);
            circlesJson.put("STATUS", "-1");
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_CIRCLES_ERROR"));
            response.setResponseData(circlesJson);
        } finally {
          
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][loadFMSCircles] END");
        return "success";
    }
    
    public String fetchCustJobDetails() {
        prInfo("[FMS_ekyc][fetchCustJobDetails] START");
        String retVal = "fail";
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject custDataJson = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        JSONObject reqJson = new JSONObject();
        boolean proceedToFetch = true;
        try {
            request = ServletActionContext.getRequest();
            response = new CRSResponse();
            String strReqData = "";
            String strQueryReqData = "";
            strReqData = request.getQueryString();
            strQueryReqData = strReqData;

//            if (strReqData != null) {
//                strReqData = strReqData.split("=")[1];
//            } else {
//                strReqData = request.getParameter("reqData");
//            }
            if (strReqData == null) {
                strReqData = request.getParameter("reqData");
            }
            prDebug("input strReqData  in [fetchCustJobDetails] :: " + strReqData);
            strReqData = strReqData.replaceAll("%20", " ");
            prDebug("input strReqData after decryption  in [fetchCustJobDetails] :: " + strReqData);
            strReqData = new CRSAuthenticate().Decrypt(strReqData);
            prDebug("After decrypt strReqData  in [fetchCustJobDetails] :: " + strReqData);
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
                request.setAttribute("QUERY_PARAM", "T");
            } else {
                reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
                if (reqJson.containsKey("BCK_REQ")) {
                    request.setAttribute("QUERY_PARAM", "T");
                } else {
                    request.setAttribute("QUERY_PARAM", "F");
                }
                if (reqJson.containsKey("RETRY_FLOW")) {
                    String fetchCAFNO = new CRSPropertyReader().getQueryonId("FETCH_CAFNO_FOR_RETRY").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                    prDebug("Query for FETCH_CAFNO_FOR_RETRY : " + fetchCAFNO);
                    con = CRSDBManager.getConnection();
                    prInfo("[fetchCustJobDetails][Con]::" + con);
                    pstmt = con.prepareStatement(fetchCAFNO);
                    pstmt.setString(1, reqJson.getString("SESSION_ID"));
                    resultSet = pstmt.executeQuery();
                    if (resultSet.next()) {
                        prDebug("caf_no in retry flow resultset:: " + resultSet.getString("CAF_NO"));
                        reqJson.put("CAF_NO", resultSet.getString("CAF_NO"));
                    } else {
                        prDebug("RETRY_FLOW record not found in resultset");
                    }

                } else {
                    prDebug("RETRY_FLOW not exist");
                }
            }
            prDebug("input request  in [fetchCustJobDetails] :: " + reqJson);
            if (reqJson.containsKey("TYPE") && "TRIAL".equalsIgnoreCase(reqJson.getString("TYPE"))) {
                if (checkCAFPaymentStatus(reqJson)) {
                    proceedToFetch = false;
                }
            }
            if (proceedToFetch) {
                String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_FMS_CUST_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                prDebug("Query for fetchCustJobDetails : " + fetchQry);
                con = CRSDBManager.getConnection();
                prInfo("[fetchCustJobDetails][Con]::" + con);
                pstmt = con.prepareStatement(fetchQry);
                pstmt.setString(1, reqJson.getString("CAF_NO"));//"LE10008720"
                //  pstmt.setString(2, reqJson.getString("MOBILE_NO"));//"9494233193"
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

                //jobsArr.add(reqJson);
                custDataJson.put("Data", jobsArr);
                prDebug("fetchCustJobDetails: " + custDataJson.toString());

                if (jobsArr.size() > 0) {
                    prInfo("Customer Data loaded Successfully");
                    retVal = "success";
                    custDataJson.put("STATUS", "0");
                    response.setSuccess(true);
                    response.setMessage(msgObj.getMessge("FETCH_CUST_DATA_SUCCESS"));
                    response.setResponseData(custDataJson);
                    request.setAttribute("CUST_DATA", custDataJson);
                    request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CUST_DATA_SUCCESS"));

                } else {
                    prInfo("Unable to load CustomerData");
                    retVal = "fail";
                    custDataJson.put("STATUS", "1");
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("FETCH_CUST_DATA_FAIL"));
                    response.setResponseData(custDataJson);
                    request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CUST_DATA_FAIL"));
                }
                if (reqJson.containsKey("TYPE") && "ISDIR".equalsIgnoreCase(reqJson.getString("TYPE"))) {
                    retVal = "ISDIR";
                }
                if (reqJson.containsKey("TYPE") && "TRIAL".equalsIgnoreCase(reqJson.getString("TYPE"))) {
                    retVal = "TRIALPAY";
                }
            } else {
                prInfo("[fetchCustJobDetails][TRIAL CAF PAYMENT TRANSACTION IS SUCCESS]::");
                retVal = "fail";
                request.setAttribute("MESSAGE", msgObj.getMessge("TRIAL_CAF_PROC_FINISH"));
            }
        } catch (Exception ex) {
            prLog("Exception in  [FMS_ekyc][fetchCustJobDetails]:  ", ex);
            custDataJson.put("STATUS", "-1");
            retVal = "fail";
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_CUST_DATA_ERROR"));
            response.setResponseData(custDataJson);
            request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CUST_DATA_ERROR"));
            if (reqJson.isEmpty()) {
                request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_CUST_DATA_URL_ERROR"));
            }
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][fetchCustJobDetails] END");
        return retVal;
    }
    
    
    public boolean checkCAFPaymentStatus(JSONObject requestObj) {
        prInfo("[FMS_ekyc][checkCAFPaymentStatus] START");
        boolean payStatus = false;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            prDebug("input request  in [checkCAFPaymentStatus] :: " + requestObj);
            String fetchQry = new CRSPropertyReader().getQueryonId("GET_CAF_PAY_TXN_STATUS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for checkCAFPaymentStatus : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[checkCAFPaymentStatus][Con]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, requestObj.getString("CAF_NO"));//"LE10008720"
            resultSet = pstmt.executeQuery();
            if (resultSet.next() && resultSet.getInt(1) > 0) {
                payStatus = true;
                prInfo("[checkCAFPaymentStatus][txn_staus(success)]:1=success ;0=other than success:" + resultSet.getInt(1));
            } else {
                prInfo("[checkCAFPaymentStatus][txn_staus(not success)]:1=success ;0=other than success:" + resultSet.getInt(1));
            }

        } catch (Exception ex) {
            prLog("[FMS_ekyc][checkCAFPaymentStatus] EXCEPTION", ex);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][checkCAFPaymentStatus] END");
        return payStatus;
    }

    public String newUserRegistration()     {
        String retVal="InvalidRequest";
        AppLogger.debug("in newUserRegistration method ...!");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for newUserRegistration is : " + reqJson);
                session.setAttribute("Payment_Status",false);
                session.setAttribute("prev_isdir_dtls","");
                session.setAttribute("ResponseData","");
                session.setAttribute("WL_CAF_NO", "");
                if ((reqJson.containsKey("isCircleEnable") && "0".equals(reqJson.getString("isCircleEnable"))) || (!CRSAppResources.WINGS_NON_REGISTERED_USER_FLOW.equalsIgnoreCase("AADHAR"))) {
                  loginValidationOTP(reqJson);
                  session.setAttribute("isCircleEnable", reqJson.getString("isCircleEnable"));
                    retVal = "KYC";
                } else {
                  session.setAttribute("NO_REG_DONE",true);  
                    retVal = "EKYC";
                }
                session.setAttribute("RegMobNum", reqJson.getString("RegMobNum"));
                request.setAttribute("LOGIN_DATA", reqJson);
            }else{
            retVal = "InvalidRequest";
            }
        } catch (Exception e) {           
            prLog("Error in [FMS_ekyc][newUserRegistration]:  ", e);
        }

        return retVal;
    }
    
    public JSONObject sendAadhaarRequest(JSONObject reqJson) {
        AppLogger.info("[CRSEkycDAO][sendAadhaarRequest][START]");
        JSONObject respJson = new JSONObject();
        JSONObject auditJson = new JSONObject();
        AppLogger.info("Req data [sendAadhaarRequest]::" + reqJson);
        String url = null;
//        if(reqJson.containsKey("REROUTE")){
//            url = CRSAppResources.AADHAR_SERVICE_REROUTE_URL;
//        }else{
            url = CRSAppResources.AADHAR_SERVICE_URL;
//        }        
        AppLogger.info("Internal Aadhaar URL is ::" + url);       
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            //add reuqest header
            con.setRequestMethod("POST");
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            String strInput = reqJson.toString();
            strInput = URLEncoder.encode(strInput, "UTF-8");
            wr.writeBytes(strInput);
            wr.flush();
            wr.close();
            String strReqTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(Calendar.getInstance().getTime());
            reqJson.put("REQ_TIME_SUBMIT_AUA", strReqTime);
            int responseCode = con.getResponseCode();
            AppLogger.info("Response Code of  [processAadhaarRequest]: " + responseCode);
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            if (responseCode == 200) {
                respJson = (JSONObject) JSONSerializer.toJSON(response.toString());
                AppLogger.info("[processAadhaarRequest] result :" + respJson);
                int nResult = respJson.getJSONObject("aadhaarResponse").getInt("status");
                AppLogger.info("nResult ::" + nResult);
                
            }
        } catch (Exception e) {
            prLog("Error occured in [CRSEkycDAO][sendAadhaarRequest]  ", e);           
            respJson.put("MESSAGE", msgObj.getMessge("SEND_AADHAR_REQ_ERROR"));
            respJson.put("STATUS", -1);
        }        
        //CRSAuditMaster.auditRequest(reqJson.getString("AADHAR_NO"), "sendAadhaarRequest", status, comments, 1);
        AppLogger.info("[CRSEkycDAO][sendAadhaarRequest][END]");
        return respJson;
    }
    
    public int getDiffYears(Date first, Date last) {
        Calendar a = getCalendar(first);
        Calendar b = getCalendar(last);
        int diff = b.get(Calendar.YEAR) - a.get(Calendar.YEAR);
        if (a.get(Calendar.MONTH) > b.get(Calendar.MONTH)
                || (a.get(Calendar.MONTH) == b.get(Calendar.MONTH) && a.get(Calendar.DATE) > b.get(Calendar.DATE))) {
            diff--;
        }
        return diff;
    }

    public Calendar getCalendar(Date date) {
        Calendar cal = Calendar.getInstance(Locale.US);
        cal.setTime(date);
        return cal;
    }

    public JSONObject auditAadharRequest(JSONObject reqJson) {
        AppLogger.info("[CRSOnboardIntegrationDAO][auditAadharRequest][START]");
        AppLogger.info("ReqData for auditAadharRequest ::" + reqJson);
        JSONObject respJson = new JSONObject();
        ResultSet resultSet = null;
        Connection con = null;
        PreparedStatement pstmt = null;
        int insertResult = -1;
        int count = 0;
        try {
            con = CRSDBManager.getConnection();
            AppLogger.info("Connection in [auditAadharRequest] ::" + con);
            //get the sequenceId
            long seqId = -1;
            String aAdharSeqQry = new CRSPropertyReader().getQueryonId("AADHAR_AUDIT_SEQ_QRY").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            AppLogger.info("Aadhar seqId  qry :" + aAdharSeqQry);
            pstmt = con.prepareStatement(aAdharSeqQry);
            resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                seqId = resultSet.getLong(1);
            }
            respJson.put("AUDIT_ID", seqId);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            String auditAdharQry = new CRSPropertyReader().getQueryonId("INSERT_AADHAR_AUDIT_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            AppLogger.info("Query [auditAadharRequest] :  " + auditAdharQry);
            pstmt = con.prepareStatement(auditAdharQry);
            pstmt.setLong(++count, seqId);
            pstmt.setString(++count, reqJson.getString("AUTH_TYPE"));
            pstmt.setLong(++count, reqJson.getLong("USER_ID"));
            pstmt.setInt(++count, reqJson.getInt("USER_FLAG"));
            pstmt.setString(++count, reqJson.getString("SSA_CODE"));
            pstmt.setString(++count, reqJson.getString("USER_CODE"));
            if (reqJson.containsKey("CIRCLE_CODE") && reqJson.getString("CIRCLE_CODE").length() > 0) {
                pstmt.setInt(++count, reqJson.getInt("CIRCLE_CODE"));
            } else {
                pstmt.setNull(++count, Types.INTEGER);
            }
            pstmt.setString(++count, reqJson.getString("CIRCLE_SHORT_CODE"));
            long REQ_TIME_CLIENT = reqJson.getLong("REQ_TIME_CLIENT");
            AppLogger.info("strREQ_TIME_CLIENT ::" + REQ_TIME_CLIENT);
            pstmt.setTimestamp(++count, new Timestamp(REQ_TIME_CLIENT));
            String strREQ_TIME_SERVER = reqJson.getString("REQ_TIME_SERVER");
            AppLogger.info("strREQ_TIME_SERVER ::" + strREQ_TIME_SERVER);
            pstmt.setTimestamp(++count, Timestamp.valueOf(strREQ_TIME_SERVER));
            //long REQ_TIME_CLIENT = reqJson.getLong("REQ_TIME_CLIENT");
            long REQ_TIME_SERVER = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(reqJson.getString("REQ_TIME_SERVER")).getTime();
            pstmt.setLong(++count, REQ_TIME_SERVER - REQ_TIME_CLIENT); //STAG1_PROCESS_TIME
            String strREQ_TIME_SUBMIT_AUA = reqJson.getString("REQ_TIME_SUBMIT_AUA");
            AppLogger.info("strREQ_TIME_SUBMIT_AUA ::" + strREQ_TIME_SUBMIT_AUA);
            pstmt.setTimestamp(++count, Timestamp.valueOf(strREQ_TIME_SUBMIT_AUA));
            long REQ_TIME_SUBMIT_AUA = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(reqJson.getString("REQ_TIME_SUBMIT_AUA")).getTime();
            pstmt.setLong(++count, REQ_TIME_SUBMIT_AUA - REQ_TIME_SERVER); //STAG2_PROCESS_TIME
            String strRESP_AUA_SERVER = reqJson.getString("RESP_AUA_SERVER");
            AppLogger.info("strRESP_AUA_SERVER ::" + strRESP_AUA_SERVER);
            pstmt.setTimestamp(++count, Timestamp.valueOf(strRESP_AUA_SERVER));
            long RESP_AUA_SERVER = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(reqJson.getString("RESP_AUA_SERVER")).getTime();
            pstmt.setLong(++count, RESP_AUA_SERVER - REQ_TIME_SUBMIT_AUA); //STAG3_PROCESS_TIME
            pstmt.setInt(++count, reqJson.getInt("REQ_STATUS")); // isnertion sucess
            pstmt.setString(++count, reqJson.getString("REQ_COMMENTS"));
            pstmt.setInt(++count, "REEKYC".equalsIgnoreCase(reqJson.getString("FLOW_TYPE")) ? 2 : 1);
            pstmt.setString(++count, reqJson.getString("AADHAR_NO"));//
            pstmt.setLong(++count, reqJson.getLong("AADHAR_SEQ_ID"));
            String lobType = reqJson.containsKey("LOB_TYPE") ? reqJson.getString("LOB_TYPE") : "MOB"; // default MOB means Onboard
            pstmt.setString(++count, lobType);
            pstmt.setString(++count, reqJson.getString("UID_TOKEN"));
            insertResult = pstmt.executeUpdate();
            respJson.put("STATUS", insertResult);
            AppLogger.info("insertion of auditAadharRequest result ::" + insertResult);
        } catch (Exception e) {
            AppLogger.info("Error in [CRSOnboardIntegrationDAO][auditAadharRequest]:");
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error(sw.toString());
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        AppLogger.info("Response from [auditAadharRequest] insert count :: " + insertResult);
        AppLogger.info("[CRSOnboardIntegrationDAO][auditAadharRequest][END]");
        return respJson;

    }

    public String loginValidationOTP(JSONObject reqJson) {
        prInfo("[FMS_ekyc][loginValidationOTP] START");
        String returnVal = "FAIL";
         CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            //new FMS_NewForm().ClearSessionvals();
            request = ServletActionContext.getRequest();
            session = request.getSession(false);

            String lobType = reqJson.getString("lobType");
            long currentTimeMillis = System.currentTimeMillis();
            String userReqId = "Self" + "_" + currentTimeMillis;
            CRSThreadLocalManager.setRequestId(userReqId);

            prDebug("User session id is :: " + session.getId());
            prDebug("Request for login service is :: " + reqJson);
            String strRespData = "{\"Status\":\"success\",\"Data\":{\"ReqReachedTime\":1530608252105,\"ReqStartTime\":\"1530608252100\",\"AadharLoginFlag\":0,\"LoginID\":\"Self\",\"SystemInfo\":\"TRUE\",\"Message\":\"Valid user\",\"UserId\":\"1\",\"FirstName\":\"Self\",\"IsWingsJob\":true,\"FullName\":\"\",\"UP_Auth_Key\":\"4367877B8E3E\",\"LastLogin\":\"03-JUL-18 01:08:22 pm\",\"CircleCode\":\"-1\",\"AgentUserType\":\"\",\"CircleShortCode\":\"Self\",\"Activation_MobileNo\":\"\",\"CircleZoneCode\":\"NZ\",\"UserCode\":\"\",\"SSACode\":\"Self\",\"DBLink\":\"SIMNORTH\",\"UserFlag\":\"-1\",\"MobileNumber\":\"\",\"EmailID\":\"self@self.com\",\"BODbLink\":\"\",\"ZoneID\":\"-1\",\"ProcessPermissionsObj\":{\"MOBILE_ACC_FLAG\":\"1\",\"THICK_ACC_FLAG\":\"1\",\"M_KYC\":\"1\",\"M_EKYC\":\"1\",\"M_EVISA\":\"1\",\"T_KYC\":\"1\",\"T_EKYC\":\"1\",\"T_EVISA\":\"1\"},\"LangID\":\"\",\"UserName\":\"Self\",\"SeqNumber\":0,\"AadharMaxLimit\":5,\"AadharRevModEnableFlag\":\"TRUE\",\"MobileLogsDownloadFlag\":0,\"ThickLogsDownloadFlag\":0,\"LobType\":\"LL\",\"DeviceLocations\":{\"DeviceData\":{\"SecureGen_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/SecuGen_32.zip\",\"SecureGen_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/SecuGen_64.zip\",\"Startech_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/Startek_32.zip\",\"Startech_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/Startek_64.zip\",\"Morpho_safran_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/marpho_32.zip\",\"Morpho_safran_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/marpho_64.zip\",\"Mantra_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/Mantra_32.zip\",\"Mantra_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/Mantra_64.zip\",\"Startech_XP\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_XP/Startek_XP.zip\",\"Morpho_XP\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_XP/Morpho_XP.zip\"}},\"FrachiseeAddress\":\"Self\",\"FranchiseeName\":\"Self\",\"City\":\"Self\",\"State\":\"Self\",\"FMSCircle\":\"Self\",\"FMSZone\":\"\",\"FMSSSACode\":\"Self\",\"FranchiseeInfo\":[],\"AadharNumbers\":[],\"MobileVersion\":\"2.4.3\",\"MobileAppDownloadURL\":\"http://downloads.intense.in/Generic_BSNL_New_Theme.apk\",\"RoleNames\":\"Self\",\"ReqProcessedTime\":1530608252211}}";
            JSONObject response = (JSONObject) JSONSerializer.toJSON(strRespData);;

            prDebug("Response for LoginAuthentication service FMS_ekyc :: " + response);
            JSONObject respMsg = response.getJSONObject("Data");
            if (response.getString("Status").equals("success")) {
                try {
                    long millis = System.currentTimeMillis();
                    String sessionFolderPath = CRSAppResources.REPOSITORY_PATH + File.separator + "SessionFiles" + File.separator + "Wings" + "_" + millis;
                    File sessionFolder = new File(sessionFolderPath);
                    if (!sessionFolder.exists()) {
                        sessionFolder.mkdirs();
                        session.setAttribute("SessionFilePath", sessionFolderPath);
                    } else {
                        try {
                            new CRSLoginValidator().deleteDir(sessionFolder);
                            sessionFolder.mkdirs();
                            session.setAttribute("SessionFilePath", sessionFolderPath);
                        } catch (Exception e) {
                            prLog("Exception in  session folder creation :: ", e);
                        }
                        prDebug("Session file path :: " + session.getAttribute("SessionFilePath"));
                    }
                } catch (Exception e) {
                    prLog("Exception in  [FMS_ekyc][loginValidation] ::  ", e);
                }
                respMsg.put("USER_REQ_ID", userReqId);
                respMsg.put("lobType", reqJson.optString("lobType", "WINGS"));
                respMsg.put("FMSZone", reqJson.getString("zone"));
                respMsg.put("FMSCircle", reqJson.getString("state"));
                respMsg.put("State", reqJson.getString("state"));
                respMsg.put("CIRCLE_SH_CODE", reqJson.getString("state"));
                respMsg.put("RegMobNum", reqJson.optString("RegMobNum"));
                respMsg.put("regEmail", reqJson.optString("regEmail"));
                respMsg.put("regPINCode", reqJson.optString("regPINCode"));
                respMsg.put("isCircleEnable", reqJson.optString("isCircleEnable","1"));
                session.setAttribute("loginResponse", respMsg);
                session.setAttribute("RegMobNum", reqJson.optString("RegMobNum"));
                String formFiledVal = loginFormFieldsForFMS(lobType);
                session.setAttribute("Client_level_session", "starts");
                session.setAttribute("USER_REQ_ID", userReqId);
                returnVal = "SUCCESS";
            }
        } catch (Exception e) {
            prLog("Exception in  [FMS_ekyc][loginValidation] ::  ", e);
            // msgObj.getMessge("LOGIN_VALIDATION_ERROR")
        }
        prInfo("[FMS_ekyc][loginValidation] END");
        return returnVal;
    }
    
    public String loginFormFieldsForFMS(String lobType) {
        prInfo("[FMS_ekyc][loginFormFieldsForFMS] START");
        String outPutValue = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
//            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            prDebug(" FMS_ekyc loginFormFieldsForFMS loginResponse :: " + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadFMSDesign";
            prDebug("onBoardURL in FMS_ekyc loginFormFieldsForFMS method is :: " + serviceURL);

            JSONObject inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("LOB_TYPE", lobType);
            inputFieldsEntityJson.put("SOURCE", "TH");
            inputFieldsEntityJson.put("U_ID", loginResponse.getString("UserId"));
            inputFieldsEntityJson.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            inputFieldsEntityJson.put("CIRCLE_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntityJson.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntityJson.put("CIRCLE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntityJson.put("ZONE_CODE", loginResponse.getString("ZoneID"));
            inputFieldsEntityJson.put("DESIGN_VER", "");
            String inputFieldsEntity = inputFieldsEntityJson.toString();

            prDebug("input request for getting FMS_ekyc  loginFormFieldsForFms data to service :: " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            prDebug("output response from service for getting loginFormFieldsForFms data in FMS_ekyc :: " + strJobsCurrentStatus);
            JSONObject formFieldsJObj = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            final String resMessage = formFieldsJObj.get("MESSAGE").toString();
            if (formFieldsJObj.getString("STATUS").equals("0")) {

//                String FMS_ATTACHMENTS_OPTNL = formFieldsJObj.getString("FMS_ATTACHMENTS_OPTNL");
                String FMS_ATTACHMENTS_OPTNL = "FALSE";
//                String FMS_ATTACH_SHOW_HIDE = formFieldsJObj.getString("FMS_ATTACH_SHOW_HIDE");
                String FMS_ATTACH_SHOW_HIDE = "FALSE";

                JSONObject formFieldsMetaData1 = formFieldsJObj.getJSONObject("T_KYC_FMS");

                JSONObject kycformFieldsMetaData = formFieldsMetaData1.getJSONObject("formFieldsMetaData");

                session.setAttribute("FMS_ATTACHMENTS_OPTNL", FMS_ATTACHMENTS_OPTNL.toString());
//                session.setAttribute("FMS_ATTACHMENTS_OPTNL", "FALSE");
                session.setAttribute("FMS_ATTACH_SHOW_HIDE", FMS_ATTACH_SHOW_HIDE.toString());
//                session.setAttribute("FMS_ATTACH_SHOW_HIDE", "FALSE");
                session.setAttribute("kycformFieldsMetaData", kycformFieldsMetaData.toString());
                session.setAttribute("LL_EMAIL_DESC", formFieldsJObj.getString("LL_EMAIL_DESC"));

                JSONObject kycFranchiseMetaData = formFieldsMetaData1.getJSONObject("franchiseMetaData");
                session.setAttribute("kycFranchiseMetaData", kycFranchiseMetaData.toString());

                session.setAttribute("ServiceInfo", loginResponse.getString("FranchiseeInfo"));
                if (formFieldsJObj.containsKey("AADHAR_LICSNSE_KEY")) {
                    String aadhaarLICkey = formFieldsJObj.getString("AADHAR_LICSNSE_KEY");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                    session.setAttribute("AADHAR_LICSNSE_KEY", aadhaarLICkey);
                } else {
                    prDebug(":::::::::AADHAR_LICSNSE_KEY key is not coming from OB service");
                    session.setAttribute("AADHAR_LICSNSE_KEY", "MLfiUpPlshWPSwUsxsR9YF67asxQqivpRWnE5UTW1JaNwAGZOx7HfBk");
                }
                JSONObject formFieldsMetaData2 = formFieldsJObj.getJSONObject("T_EKYC_FMS");
                JSONObject ekycformFieldsMetaData = formFieldsMetaData2.getJSONObject("formFieldsMetaData");
                session.setAttribute("ekycformFieldsMetaData", ekycformFieldsMetaData.toString());
                JSONObject ekycFranchiseMetaData = formFieldsMetaData2.getJSONObject("franchiseMetaData");
                session.setAttribute("ekycFranchiseMetaData", ekycFranchiseMetaData.toString());
                JSONObject fmsDDData = formFieldsJObj.getJSONObject("DD_DATA");
                session.setAttribute("fmsDDData", fmsDDData.toString());

                if (formFieldsJObj.containsKey("UPLOAD_IMG_SIZE")) {
                    session.setAttribute("IMAGESIZE", formFieldsJObj.getString("UPLOAD_IMG_SIZE"));
                    prDebug("Getting the values for service. Image size is :: " + formFieldsJObj.getString("UPLOAD_IMG_SIZE"));
                } else {
                    session.setAttribute("IMAGESIZE", "100");
                    prDebug("UPLOAD_IMG_SIZE  key is not avilabel in service response.So we take the Defulat Image size  is::::100");
                }

                if (formFieldsJObj.containsKey("SESSION_TIMEOUT")) {
                    String sessionTimeOut = formFieldsJObj.getString("SESSION_TIMEOUT");
                    prDebug(":::::::::$$$$$$$$$$$Session Time Out$$$$$$$$$$$\t" + sessionTimeOut);
                    session.setAttribute("SESSION_TIMEOUT", sessionTimeOut);
                }

                if (formFieldsJObj.containsKey("UPLOAD_IMG_RESOLUTION")) {
                    JSONObject resolution = formFieldsJObj.getJSONObject("UPLOAD_IMG_RESOLUTION");
                    session.setAttribute("RES_MIN_WIDTH", resolution.getJSONObject("MIN").getString("WIDTH"));
                    session.setAttribute("RES_MIN_HEIGHT", resolution.getJSONObject("MIN").getString("HEIGHT"));
                    session.setAttribute("RES_MAX_WIDTH", resolution.getJSONObject("MAX").getString("WIDTH"));
                    session.setAttribute("RES_MAX_HEIGHT", resolution.getJSONObject("MAX").getString("HEIGHT"));
                    prDebug("Getting the values for service. Image Resloution is :: " + formFieldsJObj.getString("UPLOAD_IMG_RESOLUTION"));
                } else {
                    session.setAttribute("RES_MIN_WIDTH", "640");
                    session.setAttribute("RES_MIN_HEIGHT", "480");
                    session.setAttribute("RES_MAX_WIDTH", "800");
                    session.setAttribute("RES_MAX_HEIGHT", "600");
                    prDebug("UPLOAD_IMG_RESOLUTION  key is not avilabel in service response.So we take the Defulat RESOLUTION  is:::: Minmum Reslution is 640 X480 and Max Reslution is 800X600");
                }
                if (formFieldsJObj.containsKey("AADHAR_LICSNSE_KEY")) {
                    String aadhaarLICkey = formFieldsJObj.getString("AADHAR_LICSNSE_KEY");
                    session.setAttribute("AADHAR_LICSNSE_KEY", aadhaarLICkey);
                } else {
                    prDebug(":::::::::AADHAR_LICSNSE_KEY key is not coming from OB service");
                    session.setAttribute("AADHAR_LICSNSE_KEY", "MLfiUpPlshWPSwUsxsR9YF67asxQqivpRWnE5UTW1JaNwAGZOx7HfBk");
                }
                //AADHAR_AC
                if (formFieldsJObj.containsKey("AADHAR_AC")) {
                    String AADHAR_AC = formFieldsJObj.getString("AADHAR_AC");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                    session.setAttribute("AADHAR_AC", AADHAR_AC);
                } else {
                    prInfo(":::::::::AADHAR_AC key is not coming from OB service");
                    session.setAttribute("AADHAR_AC", "STGBSNL001");
                }
                //AADHAR_SA
                if (formFieldsJObj.containsKey("AADHAR_SA")) {
                    String AADHAR_SA = formFieldsJObj.getString("AADHAR_SA");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                    session.setAttribute("AADHAR_SA", AADHAR_SA);
                } else {
                    prInfo(":::::::::AADHAR_SA key is not coming from OB service");
                    session.setAttribute("AADHAR_SA", "STGBSNL001");
                }
                //AADHAR_WADH
                if (formFieldsJObj.containsKey("AADHAR_WADH")) {
                    String AADHAR_WADH = formFieldsJObj.getString("AADHAR_WADH");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                    session.setAttribute("AADHAR_WADH", AADHAR_WADH);
                } else {
                    prInfo(":::::::::AADHAR_WADH key is not coming from OB service");
                    session.setAttribute("AADHAR_WADH", "E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=");
                }
                //AADHAR_ENV
                if (formFieldsJObj.containsKey("AADHAR_ENV")) {
                    String AADHAR_ENV = formFieldsJObj.getString("AADHAR_ENV");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                    session.setAttribute("AADHAR_ENV", AADHAR_ENV);
                } else {
                    prInfo(":::::::::AADHAR_ENV key is not coming from OB service");
                    session.setAttribute("AADHAR_ENV", "PP");
                }
//                response.setSuccess(true);
//                response.setMessage(resMessage);
//                response.setResponseData(formFieldsJObj);
            } else {
//                response.setSuccess(false);
//                response.setMessage(resMessage);
//                response.setResponseData(formFieldsJObj);
            }
        } catch (Exception e) {
            prLog("Exception occured in [FMS_ekyc][loginFormFieldsForFMS] :: ", e);
//            response.setSuccess(false);
//            response.setMessage("Exception occured in [CRSLoginValidator][loginFormFieldsForFMS]");
        }
        prInfo("[FMS_ekyc][loginFormFieldsForFMS] END");
        return "success";
    }
    
    public long compareTwoTimeStamps(java.sql.Timestamp currentTime, java.sql.Timestamp oldTime) {
		long milliseconds1 = oldTime.getTime();
		long milliseconds2 = currentTime.getTime();
		long diff = milliseconds2 - milliseconds1;
		long diffMinutes = diff / (60 * 1000);
		return diffMinutes;
	}
    
    public String getWingsPlans() {
        prInfo("[FMS_ekyc][getWingsPlans][START]");
        JSONObject result = new JSONObject();
        JSONArray wingsPlansArr = new JSONArray();
        response = new CRSResponse();
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        JSONObject wingsPlanJson = null;
        String defaultWingsPlan = "";
        try {
            String wingsPlansSelctQry = new CRSPropertyReader().getQueryonId("GET_WINGS_PLANS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query to get WINGS plans ::" + wingsPlansSelctQry);
            con = CRSDBManager.getConnection();
            prInfo("Con ::" + con);
            pstmt = con.prepareStatement(wingsPlansSelctQry);
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
                wingsPlansArr.add(bpJson);

            }
            result.put("WINGS_PLANS", wingsPlansArr);
            response.setSuccess(true);
            response.setResponseData(result);
        } catch (Exception e) {
            prInfo("Error in [FMS_ekyc][getWingsPlans]");
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            prDebug(sw.toString());
            response.setSuccess(false);
            response.setResponseData(result);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prDebug("WINGS plans ::" + wingsPlansArr);
        prInfo("[FMS_ekyc][getWingsPlans][END]");
        return "success";
    }
    
    public String fetchCafDetails() {
        prInfo("[FMS_ekyc][fetchCafDetails][START]");
        JSONObject result = new JSONObject();
        JSONArray wingsCafDetailsArr = new JSONArray();
        request = ServletActionContext.getRequest();
        response = new CRSResponse();
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        JSONObject wingsPlanJson = null;
        try {
            String strReqData = request.getParameter("reqData");
            if(strReqData == null || strReqData.isEmpty()){
            	return "InvalidRequest";
            }
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[fetchCafDetails] reqJson:"+reqJson);
            String wingsPlansSelctQry = new CRSPropertyReader().getQueryonId("GET_WINGS_CAF_DETAILS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query to get WINGS Caf Details ::" + wingsPlansSelctQry);
            con = CRSDBManager.getConnection();
            prInfo("Con ::" + con);
            pstmt = con.prepareStatement(wingsPlansSelctQry);
            String caf_no=new CRSAuthenticate().Decrypt(reqJson.getString("CAF_NO"));
            prInfo("decripted caf no::"+caf_no);
            pstmt.setString(1, caf_no);
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            if (resultSet.next()) {
                JSONObject bpJson = new JSONObject();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    bpJson.put(colName, colValue);
                }
                wingsCafDetailsArr.add(bpJson);
            }
            prInfo("wings caf details :: " + wingsCafDetailsArr);
            result.put("CAF_DETAILS", wingsCafDetailsArr);
            if(wingsCafDetailsArr.size()>0){
                 JSONObject cafDataJson = new JSONObject();
                 cafDataJson=wingsCafDetailsArr.getJSONObject(0);
                 cafDataJson.put("ROW_DATA", cafDataJson);
                 cafDataJson.put("bckBtnEnable", true);
                prInfo("fetchCafDetails::"+cafDataJson);
                loadekyc(cafDataJson);
            }else{
             prInfo("fetchCafDetails::Do not have data");
            }
            //prepare reqqest format for FMS_eKYC_otp            
            //call the loadEkyc method
            request.setAttribute("session_id", wingsCafDetailsArr.getJSONObject(0).get("SESSIONID"));
            prInfo("session_id [fetchCafDetails] :: " + request.getAttribute("session_id"));
            response.setSuccess(true);
            response.setResponseData(result);
        } catch (Exception e) {
            prInfo("Error in [FMS_ekyc][fetchCafDetails]");
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            prDebug(sw.toString());
            response.setSuccess(false);
            response.setResponseData(result);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prDebug("WINGS fetchCafDetails ::" + wingsCafDetailsArr);
        prInfo("[FMS_ekyc][fetchCafDetails][END]");
        return "success";
    }
    
     public String doZip(String ZipFilePath, List imageList, List docList, String Folder) {
        AppLogger.info(" Starting of doZip method in JobUpload "+ Folder+ " | ZipFilePath: " +ZipFilePath);
        String status = "fail";
        FileOutputStream fos = null;
        ZipOutputStream zos = null;
        try {
            fos = new FileOutputStream(ZipFilePath + File.separator + Folder + ".zip");
            zos = new ZipOutputStream(fos);
            for (int i = 0; i < imageList.size(); i++) {
                addToZipFile(imageList.get(i) + "", docList.get(i) + "", zos);
            }
            zos.close();
            fos.close();
            AppLogger.debug("ZipFilePath in doZip method" + ZipFilePath + File.separator + Folder + ".zip");
            return new File (ZipFilePath + File.separator + Folder + ".zip").getAbsolutePath();
        } catch (Exception e) {
            status = "fail";
            e.printStackTrace();
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  doZip block :::" + sw.toString());
        } finally {
            if (zos != null) {
                try {
                    zos.close();
                } catch (IOException ex) {
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException ex) {
                }
            }
        }
        AppLogger.info(" Ending of doZip method in JobUpload ");
        return status;
    }

    public void addToZipFile(String fileName, String Name, ZipOutputStream zos) {
        AppLogger.info(" Starting of addToZipFile method in JobUpload ");
        AppLogger.debug("In addToZipFile mehtod  Writing '" + fileName + "' to zip file" +Name);
        FileInputStream fis = null;
        ZipEntry zipEntry = null;
        try {
            File file = new File(fileName);
            fis = new FileInputStream(file);
            zipEntry = new ZipEntry(Name);
            zos.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int length;
            while ((length = fis.read(bytes)) >= 0) {
                zos.write(bytes, 0, length);
            }
            zos.closeEntry();
            fis.close();
        } catch (Exception e) {
            e.printStackTrace();
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  addToZipFile :::" + sw.toString());
        } finally {
            try {
                zos.closeEntry();
            } catch (IOException ex) {
                Logger.getLogger(FMS_ekyc.class.getName()).log(Level.SEVERE, null, ex);
            }
            try {
                fis.close();
            } catch (IOException ex) {
                Logger.getLogger(FMS_ekyc.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        AppLogger.info(" Ending of addToZipFile method in JobUpload ");
    }
    
       public String processFlow()     {
        String retVal="InvalidRequest";
        AppLogger.debug("in processFlow method ...!");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for processFlow is : " + reqJson);
                if (reqJson.containsKey("flow") && "DigitalKYC".equals(reqJson.getString("flow"))) {
                    retVal = "DKYC";
                } else {
                    retVal = "EKYC";
                }
                request.setAttribute("LOGIN_INFO", reqJson);
            }
            
        } catch (Exception e) {           
            prLog("Error in [FMS_ekyc][processFlow]:  ", e);
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
     * @return the userFileS
     */
    public File getUserFileS() {
        return userFileS;
    }

    /**
     * @param userFileS the userFileS to set
     */
    public void setUserFileS(File userFileS) {
        this.userFileS = userFileS;
    }

    /**
     * @return the userFileL
     */
    public File getUserFileL() {
        return userFileL;
    }

    /**
     * @param userFileL the userFileL to set
     */
    public void setUserFileL(File userFileL) {
        this.userFileL = userFileL;
    }

    /**
     * @return the userFileSContentType
     */
    public String getUserFileSContentType() {
        return userFileSContentType;
    }

    /**
     * @param userFileSContentType the userFileSContentType to set
     */
    public void setUserFileSContentType(String userFileSContentType) {
        this.userFileSContentType = userFileSContentType;
    }

    /**
     * @return the userFileLContentType
     */
    public String getUserFileLContentType() {
        return userFileLContentType;
    }

    /**
     * @param userFileLContentType the userFileLContentType to set
     */
    public void setUserFileLContentType(String userFileLContentType) {
        this.userFileLContentType = userFileLContentType;
    }

    /**
     * @return the userFileSFileName
     */
    public String getUserFileSFileName() {
        return userFileSFileName;
    }

    /**
     * @param userFileSFileName the userFileSFileName to set
     */
    public void setUserFileSFileName(String userFileSFileName) {
        this.userFileSFileName = userFileSFileName;
    }

    /**
     * @return the userFileLFileName
     */
    public String getUserFileLFileName() {
        return userFileLFileName;
    }

    /**
     * @param userFileLFileName the userFileLFileName to set
     */
    public void setUserFileLFileName(String userFileLFileName) {
        this.userFileLFileName = userFileLFileName;
    }
    

}
