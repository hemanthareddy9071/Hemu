/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmskyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.core.CRSLoginValidator;
import com.in10s.fmsekyc.FMSWingsCustomerSupport;
import com.in10s.logger.AppLogger;
import com.in10s.payment.PaymentGateway;
import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileDeleteStrategy;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramesh.a
 */
public class FMS_NewForm {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String LoadKYcPage() {
        prInfo("[FMS_NewForm][LoadKYcPage] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            session.setAttribute("KYCType", "FMSKYC");
            session.setAttribute("kycpageStatus", "0");
            session.removeAttribute("FMS_Step1_status");
            session.removeAttribute("fms_kyc_Stp1Data");
            session.removeAttribute("reqData");
            session.removeAttribute("STATES");
            session.removeAttribute("main_locality");
            session.removeAttribute("sub_locality");
            session.removeAttribute("DISTRICTS");
            session.removeAttribute("EXCHNAGE_DTLS");
            session.removeAttribute("poi_same_chk");
            try {
                String SessionFilePathImages = (String) session.getAttribute("SessionFilePath");
                File destinationfile = new File(SessionFilePathImages);
                File sourFileArr1[] = destinationfile.listFiles();
                for (int imgIndex = 0; imgIndex < sourFileArr1.length; imgIndex++) {
                    File file1 = sourFileArr1[imgIndex];
                    deleteFile(file1);
                }
            } catch (Exception e) {
                prLog("Exception occured while deleting files in session::: ", e);
            }
//            session.removeAttribute("FMS_KYCType");
//            session.removeAttribute("FMS_Step1_status");
//            session.removeAttribute("fms_ekyc_Stp1Data");
//            session.removeAttribute("FMS_KYC_Cust_Data");
//            session.removeAttribute("poi_same_check");
            response = new CRSResponse();
            response.setSuccess(true);
            response.setResponseData("");
        } catch (Exception e) {
            prLog("Exception occured in [FMS_NewForm][LoadKYcPage] :: ", e);
            response.setSuccess(false);
            response.setMessage("Exception occured while loading the loginFormFields");
        }
        prInfo("[FMS_NewForm][LoadKYcPage] END");
        return "success";
    }

    public boolean deleteFile(File file) {
        boolean fileDelStatus = file.delete();
        try {
            if (!fileDelStatus) {
                FileDeleteStrategy.FORCE.delete(file);
            }
        } catch (Exception e) {
            prLog("Exception occured in [FMS_NewForm][deleteFile]  ::: ", e);
        }
        return true;
    }

    public String setValueIntoSession() {
        prInfo("[FMS_NewForm][setValueIntoSession] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");
            strReqData = new CRSAuthenticate().Decrypt(strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            session.setAttribute(reqJson.getString("id"), reqJson.getString("value"));
            response = new CRSResponse();
            response.setSuccess(true);
            response.setResponseData("");
        } catch (Exception e) {
            prLog("Exception occured in [FMS_NewForm][setValueIntoSession]:::", e);
            response.setSuccess(false);
            response.setMessage("Exception occured in [FMS_NewForm][setValueIntoSession]");
        }
        prInfo("[FMS_NewForm][setValueIntoSession] END");
        return "success";
    }

    public String fetchServiceType() {
        prInfo("[FMS_NewForm][fetchServiceType] START");
        JSONObject inputFieldsEntity = null;
        try {
            String franchisecode = "";
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [fetchServiceType] :: " + reqJson);
            franchisecode = reqJson.getString("franchiseCode");
            /*String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);*/
            String upURL = CRSAppResources.UP_URL;
            String serviceURL = upURL.toString().trim() + "/webresources/UserServices/FetchUsrServiceTypes";
            prInfo("upURL for [fetchServiceType] :: " + serviceURL);
            prInfo("Lobtype : " + session.getAttribute("Lobtype"));
            inputFieldsEntity = new JSONObject();
            inputFieldsEntity.put("FranchiseeCode", franchisecode);
            inputFieldsEntity.put("UID", loginResponse.getString("UserId"));
            inputFieldsEntity.put("LoginID", loginResponse.getString("LoginID"));
            inputFieldsEntity.put("ChannelType", session.getAttribute("actual_lob"));
            inputFieldsEntity.put("UserFlag", loginResponse.getString("UserFlag"));
            if (loginResponse.containsKey("AgentUserType")) {
                inputFieldsEntity.put("AgentUserType", loginResponse.getString("LoginID"));
            } else {
                inputFieldsEntity.put("AgentUserType", "");
            }

            prDebug("Input  for FetchUsrServiceTypes service :: " + inputFieldsEntity.toString());
            //String strJobsCurrentStatus = new CRSClient().UPServicecall(serviceURL, inputFieldsEntity);
            JSONObject JobsCurrentStatus = new CRSClient().UPServicecall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from FetchUsrServiceTypes service :: " + JobsCurrentStatus);
            JSONObject formFieldsJObj = (JSONObject) JSONSerializer.toJSON(JobsCurrentStatus);
            // final String resMessage = formFieldsJObj.get("MESSAGE").toString();
            final String message = formFieldsJObj.get("Message").toString();
            if (formFieldsJObj.getString("Status").equalsIgnoreCase("success")) {
                String data = formFieldsJObj.getString("Data");
                prDebug("Required data from FetchUsrServiceTypes service :: " + data);
                JSONObject serializedata = (JSONObject) JSONSerializer.toJSON(data);
                response.setSuccess(true);
                response.setMessage(message);
                response.setResponseData(serializedata);
            } else {
                response.setSuccess(false);
                response.setMessage(message);
                response.setResponseData("");
            }
        } catch (Exception e) {
            prLog("Exception in FMS_NewForm][fetchServiceType] :", e);
            response.setSuccess(false);
            response.setMessage("Exception in FMS_NewForm][fetchServiceType].");
        }
        prInfo("[FMS_NewForm][fetchServiceType] END");
        return "success";
    }

    public String sendFranchiseData() {
        prInfo("[FMS_NewForm][sendFranchiseData] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            // strReqData = new CRSAuthenticate().Decrypt(strReqData);
//            System.out.println("strReqDataaaaaaaaaaa" + strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("request data in  [sendFranchiseData] :: " + reqJson);

//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String fmskycstpldata = reqJson.getString("fms_kyc_Stp1Data");
            String fmsstep1status = reqJson.getString("FMS_Step1_status");
            String fmskyctype = reqJson.getString("FMS_KYCType");
            String usercode = reqJson.getString("UserCode");

            session.setAttribute("fms_kyc_Stp1Data", fmskycstpldata);
            session.setAttribute("FMS_Step1_status", fmsstep1status);
            session.setAttribute("FMS_KYCType", fmskyctype);
            session.setAttribute("UserCode", usercode);
        } catch (Exception e) {
            prLog("Exception in [FMS_NewForm][sendFranchiseData] :", e);
            response.setSuccess(false);
            response.setMessage("Exception in [FMS_NewForm][sendFranchiseData]");
        }
        prInfo("[FMS_NewForm][sendFranchiseData] END");
        return "success";
    }

    public String kycCafData() {
        prInfo("[FMS_NewForm][kycCafData] START");
        String retValue = "success";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request Data for customerDetail mehtod is :" + reqJson);
            String fmskycFullData = reqJson.getString("FMS_KYC_Cust_Data");
//            String STATES = reqJson.getString("STATES");
//            String fmsDDData = reqJson.getString("fmsDDData");
//            String sub_locality = reqJson.getString("sub_locality");
//            String DISTRICTS = reqJson.getString("DISTRICTS");
//            String EXCHNAGE_DTLS = reqJson.getString("EXCHNAGE_DTLS");
            String fms_kyc_Stp1Data = reqJson.getString("fms_kyc_Stp1Data");
//            String CafsetValues = reqJson.getString("CafsetValues");

//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
//            JSONObject fmskycFull = (JSONObject) JSONSerializer.toJSON(fmskycFullData);
//            prDebug("fmskycFullData  "+fmskycFullData);
//            prDebug("fmskycFullData size "+fmskycFullData.length());
            session.setAttribute("FMS_KYC_Cust_Data", fmskycFullData);
//            session.setAttribute("fmskycFullData", fmskycFullData);
//            session.setAttribute("STATES", STATES);
//            session.setAttribute("fmsDDData", fmsDDData);
//            session.setAttribute("sub_locality", sub_locality);
//            session.setAttribute("DISTRICTS", DISTRICTS);
//            session.setAttribute("EXCHNAGE_DTLS", EXCHNAGE_DTLS);
//            String poi_same_chk = reqJson.getString("check_poi_same");
//            String check_poi_samesession = reqJson.getString("check_poi_samesession");

//            session.setAttribute("poi_same_chk", fmskycFull.getString("check_poi_same"));
//session.setAttribute("check_poi_samesession", fmskycFull.getString("check_poi_same"));
//            session.setAttribute("poi_same_chk", poi_same_chk);
//            session.setAttribute("check_poi_samesession", check_poi_samesession);
            session.setAttribute("fms_kyc_Stp1Data", fms_kyc_Stp1Data);
//            session.setAttribute("CafsetValues", CafsetValues);

//            JSONObject documentTypes = new JSONObject();
//            documentTypes.put("JOB_TYPE", "KYC");
//            documentTypes.put("LOB_TYPE", "LANDLINE");
//            documentTypes.put("POI_SAME_CHECK", poi_same_chk);
//            String SessionFilePath = session.getAttribute("SessionFilePath").toString();
//            FileOutputStream fop = new FileOutputStream(SessionFilePath + File.separator + "IMAGE_UPLOAD_TYPES.json");
//            fop.write(documentTypes.toString().getBytes());
//            prDebug("Document type JSON file generated in [kycCafData] :: " + documentTypes);
//            fop.close();
            //System.out.println("session.getAttribute(\"FMS_ATTACH_SHOW_HIDE\").toString()" + session.getAttribute("FMS_ATTACH_SHOW_HIDE").toString());
            //System.out.println("session.getAttribute(\"FMS_ATTACHMENTS_OPTNL\").toString()" + session.getAttribute("FMS_ATTACHMENTS_OPTNL").toString());
            if ((session.getAttribute("FMS_ATTACH_SHOW_HIDE").toString().equalsIgnoreCase("TRUE")) || (session.getAttribute("FMS_ATTACHMENTS_OPTNL").toString().equalsIgnoreCase("TRUE"))) {//images optional
////FmskycpreviewPage
//
//                response.setMessage("FmskycpreviewPage");
//                response.setSuccess(true);

                retValue = "FMSAttachments";
            } else {

//                response.setMessage("attachmnetPage");
//                response.setSuccess(true);
                retValue = "FmskycpreviewPage";
            }
        } catch (Exception e) {
            prLog("Exception in [FMS_NewForm][kycCafData] :", e);
            response.setSuccess(false);
            response.setMessage("Exception in [FMS_NewForm][kycCafData]");
            retValue = "fails";
        }
        prInfo("[FMS_NewForm][kycCafData] END");
        return retValue;//"success";
    }

    public String ValidationImages() {
        prInfo("[FMS_NewForm][ValidationImages] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            //strReqData = new CRSAuthenticate().Decrypt(strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [ValidationImages] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            if (reqJson.containsKey("skipAttachments")) {
                session.setAttribute("SKIP", "TRUE");
            } else {
                session.setAttribute("kycpageStatus", reqJson.getString("kycpageStatus"));
                String SessionFilePathImages = (String) session.getAttribute("SessionFilePath");

                String attachmentsPOA = SessionFilePathImages + File.separator + "POA.jpeg";
                attachmentsPOA = attachmentsPOA.replace("\\", "/");
                attachmentsPOA = attachmentsPOA.replace("//", "/");
                String attachmentsPOI = SessionFilePathImages + File.separator + "POI.jpeg";
                attachmentsPOI = attachmentsPOI.replace("\\", "/");
                attachmentsPOI = attachmentsPOI.replace("//", "/");
                String attachmentsSUBSCRIBER_PHOTO = SessionFilePathImages + File.separator + "SUBSCRIBER_PHOTO.jpeg";
                attachmentsSUBSCRIBER_PHOTO = attachmentsSUBSCRIBER_PHOTO.replace("\\", "/");
                attachmentsSUBSCRIBER_PHOTO = attachmentsSUBSCRIBER_PHOTO.replace("//", "/");
                String attachmentsCAF = SessionFilePathImages + File.separator + "CAF.jpeg";
                attachmentsCAF = attachmentsCAF.replace("\\", "/");
                attachmentsCAF = attachmentsCAF.replace("//", "/");
                prDebug("poi_same_chk session key value is :: " + session.getAttribute("poi_same_chk"));

                String poi_same_chk = (String) session.getAttribute("poi_same_chk");

                if (poi_same_chk.equalsIgnoreCase("true")) {//images optional
                    File attachmentsCAF1 = new File(attachmentsCAF);
                    if (attachmentsCAF1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");

                        return "error";

                    }
                    File attachmentsPOI1 = new File(attachmentsPOI);
                    if (attachmentsPOI1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                    File attachmentsSUBSCRIBER_PHOTO1 = new File(attachmentsSUBSCRIBER_PHOTO);
                    if (attachmentsSUBSCRIBER_PHOTO1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                } else {
                    File attachmentsCAF1 = new File(attachmentsCAF);
                    if (attachmentsCAF1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                    File attachmentsPOA1 = new File(attachmentsPOA);
                    if (attachmentsPOA1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                    File attachmentsPOI1 = new File(attachmentsPOI);
                    if (attachmentsPOI1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                    File attachmentsSUBSCRIBER_PHOTO1 = new File(attachmentsSUBSCRIBER_PHOTO);
                    if (attachmentsSUBSCRIBER_PHOTO1.exists()) {

                    } else {
                        response.setSuccess(false);
                        response.setMessage("Please select attachements");
                        session.setAttribute("msgErr", "Please select attachements");
                        return "error";
                    }
                }
            }
            session.setAttribute("msgErr", "");
        } catch (Exception e) {
            prLog("Exception in [FMS_NewForm][ValidationImages] :", e);
            response.setSuccess(false);
            response.setMessage("Exception in [FMS_NewForm][ValidationImages]");
        }
        prInfo("[FMS_NewForm][ValidationImages] END");
        return "success";
    }

    public String sendBackStep1Page() {
        prInfo("[FMS_NewForm][sendBackStep1Page] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request from Getting states data :: " + reqJson);
            session.setAttribute("FMS_Step1_status", "1");
            session.setAttribute("fms_kyc_Stp1Data", session.getAttribute("fms_kyc_Stp1Data"));
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
        } catch (Exception e) {
            prLog("Exception in [FMS_NewForm][sendBackStep1Page]: ", e);
            response.setSuccess(false);
            response.setMessage("Exception in [FMS_NewForm][sendBackStep1Page] ");
        }
        prInfo("[FMS_NewForm][sendBackStep1Page] END");
        return "success";
    }

    public String sendBackStep2Page() {
        prInfo("[FMS_NewForm][sendBackStep2Page] START");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqData = request.getParameter("reqData");
            //strReqData = new CRSAuthenticate().Decrypt(strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [sendBackStep2Page] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
//                   session.setAttribute("CafsetValues", reqJson.getString("kycpageStatus"));
//            session.setAttribute("kycpageStatus", reqJson.getString("kycpageStatus"));
            String stage = reqJson.getString("stage");
//            if (stage.equalsIgnoreCase("preview")) {
//                if ((session.getAttribute("FMS_ATTACH_SHOW_HIDE").toString().equalsIgnoreCase("TRUE"))
//                        || (session.getAttribute("FMS_ATTACHMENTS_OPTNL").toString().equalsIgnoreCase("TRUE"))) {//images optional
//                    return "imagpage";
//                } else {
//                    return "success";
//                }
//            } else {
             request.setAttribute("IS_BACK_ACTION", "TRUE");
            return "success";
//            }
        } catch (Exception e) {
            prLog("Exception in [FMS_NewForm][sendBackStep2Page] :", e);
            response.setSuccess(false);
            response.setMessage("Exception in [FMS_NewForm][sendBackStep2Page] ");
        }
        prInfo("[FMS_NewForm][sendBackStep2Page] END");
        return "success";
    }

    public String ClearSessionvals() {
        prInfo("[FMS_NewForm][ClearSessionvals] START");
        try {
            session = request.getSession(false);
        } catch (Exception n) {
        }
        if (session != null) {
            Enumeration<String> e = session.getAttributeNames();
            while (e.hasMoreElements()) {
                try {
                    String param = e.nextElement();
                    prInfo("[ClearSessionvals][param] " + param);
                    session.removeAttribute(param);
                } catch (Exception ex) {

                }
            }

            try {
                session.removeAttribute("FMS_Step1_status");

            } catch (Exception e1) {
            }
            try {
                session.removeAttribute("fms_ekyc_Stp1Data");

            } catch (Exception e2) {
            }
            try {
                session.removeAttribute("FMS_KYC_Cust_Data");

            } catch (Exception e3) {
            }
            try {
                session.removeAttribute("kycpageStatus");

            } catch (Exception e4) {
            }
            try {
                session.removeAttribute("CafsetValues");
            } catch (Exception e5) {
            }
            try {
                session.removeAttribute("kycpageStatus");

            } catch (Exception e6) {
            }
            try {
                session.removeAttribute("ResponseData");

            } catch (Exception e7) {
            }

            try {

                session.removeAttribute("RegMobNum");

            } catch (Exception e8) {
            }

            try {
                session.removeAttribute("fms_kyc_Stp1Data");

            } catch (Exception e9) {
            }

            try {
                response = new CRSResponse();
                response.setSuccess(true);
                response.setResponseData("");

            } catch (Exception e10) {
            }
        }

        prInfo("[FMS_NewForm][ClearSessionvals] END");
        return "success";
    }

    public String statesLoading() {
        prInfo("[FMS_NewForm][statesLoading] START");
        JSONObject statesLoadingJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("loginResponse in [statesLoading] :: " + loginResponse);
            prDebug("input in [statesLoading] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadFMSStates";
            prDebug("onBoardURL in [statesLoading] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
            inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("State"));
            inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));

            prDebug("Input data for loadFMSStates service in statesLoading method is :: " + inputFieldsEntity.toString());
            String statesLoadingRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadFMSStates service  :: " + statesLoadingRes);
            statesLoadingJOBJ = (JSONObject) JSONSerializer.toJSON(statesLoadingRes);
            if (statesLoadingJOBJ.containsKey("STATUS") && statesLoadingJOBJ.containsKey("STATES")) {
                String message = statesLoadingJOBJ.getString("MESSAGE");
                if (statesLoadingJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (statesLoadingJOBJ.getJSONArray("STATES").size() > 0) {
                        session.setAttribute("STATES", statesLoadingJOBJ.getJSONArray("STATES").toString());
                        response.setSuccess(true);
                        response.setMessage(message);
                        response.setResponseData(statesLoadingJOBJ);
                    } else {
                        prInfo("states are not available in loadFMSStates service");
                    }
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(statesLoadingJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadFMSStates service response");
            }
//            prDebug("::::: statesLoading method calling ended ::::: ");
        } catch (Exception ex) {
            prLog("Exception in [FMS_NewForm][statesLoading]:  ", ex);
        }
        prInfo("[FMS_NewForm][statesLoading] END");
        return "success";
    }

    public String fetchMainLocality() {
        prInfo("[FMS_NewForm][fetchMainLocality] START");
        JSONObject fetchMainLocalJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [fetchMainLocality] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
            String type = reqJson.getString("type");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadMainLocalities";
            prDebug("onBoardURL in [fetchMainLocality] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            if (type.equalsIgnoreCase("FMSKYC")) {
                inputFieldsEntity.put("JOB_TYPE", "FMSKYC");
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("PIN_CODE", reqJson.optString("PIN_CODE"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            } else {
                inputFieldsEntity.put("JOB_TYPE", "FMSEKYC");
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("PIN_CODE", reqJson.optString("PIN_CODE"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            }
            prDebug("Input request for loadMainLocalities service :: " + inputFieldsEntity.toString());
            String fetchMainLocalRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadMainLocalities service is :: " + fetchMainLocalRes);

            fetchMainLocalJOBJ = (JSONObject) JSONSerializer.toJSON(fetchMainLocalRes);
            if (fetchMainLocalJOBJ.containsKey("STATUS") && fetchMainLocalJOBJ.containsKey("MESSAGE")) {
                String message = fetchMainLocalJOBJ.getString("MESSAGE");
                if (fetchMainLocalJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchMainLocalJOBJ.getJSONArray("MESSAGE").size() > 0) {
                        session.setAttribute("main_locality", fetchMainLocalJOBJ.getJSONArray("MESSAGE").toString());
                        response.setSuccess(true);
                        response.setMessage(message);
                        response.setResponseData(fetchMainLocalJOBJ);
                    } else {
                        prInfo("Main Locality values are not available");
                    }
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchMainLocalJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadMainLocalities response");
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][fetchMainLocality] :  ", ex);
        }
        prInfo("[FMS_NewForm][fetchMainLocality] END");
        return "success";
    }

    public String fetchSubLocality() {
        prInfo("[FMS_NewForm][fetchSubLocality] START");
        JSONObject fetchSubLocalJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request from Getting SubLocality Data :: " + reqJson);
            String mainLocality = reqJson.getString("mainLocality");
            String type = reqJson.getString("type");
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadSubLocalities";
            prDebug("onBoardURL of [fetchSubLocality] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            if (type.equalsIgnoreCase("FMSKYC")) {
                inputFieldsEntity.put("JOB_TYPE", "FMSKYC");
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("PIN_CODE", reqJson.optString("PIN_CODE"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            } else {
                inputFieldsEntity.put("JOB_TYPE", "FMSEKYC");
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("PIN_CODE", reqJson.optString("PIN_CODE"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            }
            prDebug("input request for loadSubLocalities service is :: " + inputFieldsEntity.toString());
            String fetchSubLocalRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadSubLocalities service is :: " + fetchSubLocalRes);
            fetchSubLocalJOBJ = (JSONObject) JSONSerializer.toJSON(fetchSubLocalRes);
            if (fetchSubLocalJOBJ.containsKey("STATUS") && fetchSubLocalJOBJ.containsKey("MESSAGE")) {
                String message = fetchSubLocalJOBJ.getString("MESSAGE");
                if (fetchSubLocalJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchSubLocalJOBJ.getJSONArray("MESSAGE").size() > 0) {
                        session.setAttribute("sub_locality", fetchSubLocalJOBJ.getJSONArray("MESSAGE").toString());
                    } else {
                        prInfo("Sublocality values are not available");
                    }
                    response.setSuccess(true);
                    response.setMessage(message);
                    response.setResponseData(fetchSubLocalJOBJ);
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchSubLocalJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadSubLocalities response");
            }
            prDebug("Ending of Getting SubLocality Data");
        } catch (Exception ex) {
            prLog("Exception in [FMS_NewForm][fetchSubLocality]: ", ex);
        }
        prInfo("[FMS_NewForm][fetchSubLocality] END");
        return "success";
    }

    public String fetchbillingTypes() {
        prInfo("[FMS_NewForm][fetchbillingTypes] START");
        JSONObject fetchBillingTypesJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [fetchbillingTypes] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadBillingTypes";
            prDebug("onBoardURL in [fetchbillingTypes] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
            inputFieldsEntity.put("ZONE_ID", loginResponse.getString("ZoneID"));
            inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));

            prDebug("input request for loadBillingTypes service :: " + inputFieldsEntity.toString());
            String fetchBillTypesRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadBillingTypes service :: " + fetchBillTypesRes);

            fetchBillingTypesJOBJ = (JSONObject) JSONSerializer.toJSON(fetchBillTypesRes);
            if (fetchBillingTypesJOBJ.containsKey("STATUS") && fetchBillingTypesJOBJ.containsKey("MESSAGE")) {
                String message = fetchBillingTypesJOBJ.getString("MESSAGE");
                if (fetchBillingTypesJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchBillingTypesJOBJ.getJSONArray("BILLING_TYPES").size() > 0) {
                        prInfo("Billing types values are available");
                    } else {
                        prInfo("Billing types values are not available");
                    }
                    response.setSuccess(true);
                    response.setMessage(message);
                    response.setResponseData(fetchBillingTypesJOBJ);
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchBillingTypesJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in [fetchbillingTypes] response");
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][fetchbillingTypes]:  ", ex);
        }
        prInfo("[FMS_NewForm][fetchbillingTypes] END");
        return "success";
    }

    public String fetchbillingSubTypes() {
        prInfo("[FMS_NewForm][fetchbillingSubTypes] START");
        JSONObject fetchBillingSubTypesJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [fetchbillingSubTypes] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
            String billAccType = reqJson.getString("billAccType");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadSubBillingTypes";
            prDebug("onBoardURL in [fetchbillingSubTypes] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            inputFieldsEntity.put("BILLING_ID", billAccType);
            inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
            inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
            inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
            inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            inputFieldsEntity.put("ZONE_ID", loginResponse.getString("ZoneID"));

            prDebug("input request for loadSubBillingTypes service :: " + inputFieldsEntity.toString());
            String fetchbillSubTypesRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadSubBillingTypes service :: " + fetchbillSubTypesRes);

            fetchBillingSubTypesJOBJ = (JSONObject) JSONSerializer.toJSON(fetchbillSubTypesRes);
            if (fetchBillingSubTypesJOBJ.containsKey("STATUS") && fetchBillingSubTypesJOBJ.containsKey("MESSAGE")) {
                String message = fetchBillingSubTypesJOBJ.getString("MESSAGE");
                if (fetchBillingSubTypesJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchBillingSubTypesJOBJ.getJSONArray("SUB_BILLING_TYPES").size() > 0) {
                        prInfo("Billing sub types values are available");
                    } else {
                        prInfo("Billing sub types values are not available");
                    }
                    response.setSuccess(true);
                    response.setMessage(message);
                    response.setResponseData(fetchBillingSubTypesJOBJ);
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchBillingSubTypesJOBJ);
                }
            } else {
                prDebug("Missing STATUS & MESSAGE keys in [fetchbillingSubTypes] response");
            }
        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][fetchbillingSubTypes] ::  ", ex);
        }
        prInfo("[FMS_NewForm][fetchbillingSubTypes] END");
        return "success";
    }

    public String DistrictsLoding() {
        prInfo("[FMS_NewForm][DistrictsLoding] START");
        JSONObject DistrictsLodingJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request [DistrictsLoding] :: " + reqJson);
            String state = reqJson.getString("state");
            inputFieldsEntity = new JSONObject();
            inputFieldsEntity.put("STATE", state);
            inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
            inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("CIRCLE_SH_CODE"));
            prDebug("input request for loadFMSDistricts service :: " + inputFieldsEntity.toString());
            
            String selectedCircle = loginResponse.getString("CIRCLE_SH_CODE");
            String circleCodes =new CRSPropertyReader().getQueryonId("LOAD_CIRCLE_CODE").trim();
            String[] circles = circleCodes.split("\\,");
            boolean circleStatus = false;
            for (int i = 0; i < circles.length; i++) {
                String circle = circles[i];
                prDebug("Configured Circle :: " + circle);
                if (selectedCircle.equalsIgnoreCase(circle)) {
                    circleStatus = true;
                }
            }
            String DistrictsLodingRes = "";
            if (circleStatus) {
                DistrictsLodingRes = loadDistricts(inputFieldsEntity);//new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            } else {
                String onBoardURL = CRSAppResources.ONBOARD_URL;
                String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadFMSDistricts";
                prDebug("onBoardURL in [DistrictsLoding] :: " + serviceURL);
                DistrictsLodingRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            }
            
            prDebug("Response from loadFMSDistricts service :: " + DistrictsLodingRes);
            DistrictsLodingJOBJ = (JSONObject) JSONSerializer.toJSON(DistrictsLodingRes);
            if (DistrictsLodingJOBJ.containsKey("STATUS") && DistrictsLodingJOBJ.containsKey("DISTRICTS")) {
                String message = DistrictsLodingJOBJ.getString("MESSAGE");
                if (DistrictsLodingJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (DistrictsLodingJOBJ.getJSONArray("DISTRICTS").size() > 0) {
                        session.setAttribute("DISTRICTS", DistrictsLodingJOBJ.getJSONArray("DISTRICTS").toString());
                    } else {
                        prInfo("Districts values are not available in loadFMSDistricts service ");
                    }
                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(DistrictsLodingJOBJ);
                } else {

                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(DistrictsLodingJOBJ);

                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadFMSDistricts service response");
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][DistrictsLoding] :", ex);
        }
        prInfo("[FMS_NewForm][DistrictsLoding] END");
        return "success";
    }

    public String ExchangeCode() {
        prInfo("[FMS_NewForm][ExchangeCode] START");
        JSONObject fetchExChgCodeJOBJ = null;
        JSONObject inputFieldsEntity = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [ExchangeCode] :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
            String mainLocality = reqJson.getString("mainLocality");
            String subLocality = reqJson.getString("subLocality");
            String type = reqJson.getString("type");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadExchange";
            prDebug("onBoardURL in [ExchangeCode] :: " + serviceURL);
            inputFieldsEntity = reqJson; //new JSONObject();
            if (type.equalsIgnoreCase("FMSKYC")) {
                inputFieldsEntity.put("JOB_TYPE", "FMSKYC");
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("SUB_LOC", subLocality);
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            } else {
                inputFieldsEntity.put("JOB_TYPE", "FMSEKYC");
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("SUB_LOC", subLocality);
                inputFieldsEntity.put("STATE", reqJson.getString("state"));
                inputFieldsEntity.put("DISTRICT", reqJson.getString("district"));
                inputFieldsEntity.put("U_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            }
            prDebug("input request for loadExchange service :: " + inputFieldsEntity.toString());

            String fetchExchCodeRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadExchange service :: " + fetchExchCodeRes);
            fetchExChgCodeJOBJ = (JSONObject) JSONSerializer.toJSON(fetchExchCodeRes);
            if (fetchExChgCodeJOBJ.containsKey("STATUS") && fetchExChgCodeJOBJ.containsKey("MESSAGE")) {
                String message = fetchExChgCodeJOBJ.getString("MESSAGE");
                if (fetchExChgCodeJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchExChgCodeJOBJ.getJSONArray("EXCHNAGE_DTLS").size() > 0) {
                        session.setAttribute("EXCHNAGE_DTLS", fetchExChgCodeJOBJ.getJSONArray("EXCHNAGE_DTLS").toString());
                    } else {
                        prInfo("ExchangeCode values are not available in loadExchange service");
                    }
                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchExChgCodeJOBJ);
                } else {
                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchExChgCodeJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadExchange response ");
            }
//            prDebug("::::: fetchExchangeCode method calling ended ::::: ");
        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][ExchangeCode]  :  ", ex);
        }
        prInfo("[FMS_NewForm][ExchangeCode] END");
        return "success";
    }

    public String loadGSTCodesForFMS() {
        prInfo("[FMS_NewForm][loadGSTCodesForFMS] START");
        JSONObject fetchGSTCodeJOBJ = null;
        JSONObject inputFieldsEntity = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [loadGSTCodesForFMS] :: " + reqJson);
            //     String strBrowserId = reqJson.getString("reqSessionId");
            String mainLocality = reqJson.getString("mainLocality");
            String subLocality = reqJson.getString("subLocality");
            String type = reqJson.getString("type");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadGSTCodesForFMS";
            prDebug("onBoardURL in [loadGSTCodesForFMS] :: " + serviceURL);
            inputFieldsEntity = new JSONObject();
            if (type.equalsIgnoreCase("FMSKYC")) {
                inputFieldsEntity.put("JOB_TYPE", "FMSKYC");
                inputFieldsEntity.put("JOB_SOURCE", "T");
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("SUB_LOC", subLocality);
                inputFieldsEntity.put("EXCHANGE", reqJson.getString("exchange"));
                inputFieldsEntity.put("USER_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_CODE", loginResponse.getString("ZoneID"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("USER_FLAG", loginResponse.getString("UserFlag"));
            } else {
                inputFieldsEntity.put("JOB_TYPE", "FMSEKYC");
                inputFieldsEntity.put("JOB_SOURCE", "T");
                inputFieldsEntity.put("MAIN_LOC", mainLocality);
                inputFieldsEntity.put("SUB_LOC", subLocality);
                inputFieldsEntity.put("EXCHANGE", reqJson.getString("EXCHANGE"));
                inputFieldsEntity.put("USER_ID", loginResponse.getString("UserId"));
                inputFieldsEntity.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                inputFieldsEntity.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
                inputFieldsEntity.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
                inputFieldsEntity.put("USER_FLAG", loginResponse.getString("UserFlag"));
            }
            prDebug("input request for loadExchange service :: " + inputFieldsEntity.toString());

            String fetchGSTCodeRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity.toString());
            prDebug("Response from loadExchange service :: " + fetchGSTCodeRes);
            fetchGSTCodeJOBJ = (JSONObject) JSONSerializer.toJSON(fetchGSTCodeRes);
            if (fetchGSTCodeJOBJ.containsKey("STATUS") && fetchGSTCodeJOBJ.containsKey("MESSAGE")) {
                String message = fetchGSTCodeJOBJ.getString("MESSAGE");
                if (fetchGSTCodeJOBJ.getString("STATUS").equalsIgnoreCase("0")) {
                    if (fetchGSTCodeJOBJ.getJSONArray("GST_CODE_DTLS").size() > 0) {
                        session.setAttribute("GST_CODE_DTLS", fetchGSTCodeJOBJ.getJSONArray("GST_CODE_DTLS").toString());
                    } else {
                        prInfo("loadGSTCodesForFMS values are not available in loadExchange service");
                    }
                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchGSTCodeJOBJ);
                } else {
                    response.setSuccess(false);
                    response.setMessage(message);
                    response.setResponseData(fetchGSTCodeJOBJ);
                }
            } else {
                prInfo("Missing STATUS & MESSAGE keys in loadExchange response ");
            }
//            prDebug("::::: fetchloadGSTCodesForFMS method calling ended ::::: ");
        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][loadGSTCodesForFMS]:  ", ex);
        }
        prInfo("[FMS_NewForm][loadGSTCodesForFMS] END");
        return "success";
    }
    
    public String registerWingsUserWithoutPayment() {
        prInfo("[FMS_NewForm][registerWingsUserWithoutPayment] START");
        String retVal = "fail";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            CRSPropertyReader msgObj = new CRSPropertyReader();
            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            if (strReqData == "" || strReqData == null) {
                return "InvalidRequest";
            }
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [registerWingsUserWithoutPayment] :: " + reqJson);
            prDebug("loginResponse data in [registerWingsUserWithoutPayment] :: " + loginResponse);
            String SubscriberData = reqJson.getString("FMS_KYC_Cust_Data");
            JSONObject Subscriber_JSON = (JSONObject) JSONSerializer.toJSON(SubscriberData);
            Subscriber_JSON.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            Subscriber_JSON.put("STATE", loginResponse.getString("State"));
            Subscriber_JSON.put("REG_MOB_NO", loginResponse.getString("RegMobNum"));
            Subscriber_JSON.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
             Subscriber_JSON.put("ZONE", loginResponse.getString("FMSZone"));
            Subscriber_JSON.put("CIRCLE_CODE", loginResponse.getString("State"));
            JSONObject response2 = registerWingsJob(Subscriber_JSON);
            prDebug("Response from registerWingsJob :: " + response2);
            if (response2.getString("STATUS").equalsIgnoreCase("0")) {
                Subscriber_JSON.put("caf_no", response2.getString("caf_no"));
                request.setAttribute("Responce", Subscriber_JSON);
                
                retVal = "success";
            } else {
                request.setAttribute("MESSAGE", response2.getString("MESSAGE"));
                retVal = "fail";
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][registerWingsUserWithoutPayment]:  ", ex);
            retVal = "fail";
        } finally {
            prInfo("[FMS_NewForm][registerWingsUserWithoutPayment] finally block:");
            new FMS_NewForm().ClearSessionvals();
        }
        prInfo("[FMS_NewForm][registerWingsUserWithoutPayment] END");

        return retVal;
    }

    public String registerWingsUser() {
        prInfo("[FMS_NewForm][registerWingsUser] START");
        JSONObject responceJson = null;
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [registerWingsUser] :: " + reqJson);
            prDebug("loginResponse data in [registerWingsUser] :: " + loginResponse);
            String strEviseDrmData = "";
            strEviseDrmData = (String) session.getAttribute("FMS_KYC_Cust_Data");
            JSONObject Subscriber_JSON = (JSONObject) JSONSerializer.toJSON(strEviseDrmData);
            Subscriber_JSON.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            Subscriber_JSON.put("STATE", loginResponse.getString("State"));
            
            Subscriber_JSON.put("REG_MOB_NO", loginResponse.getString("RegMobNum"));
            Subscriber_JSON.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
            Subscriber_JSON.put("ZONE", loginResponse.getString("FMSZone"));
            Subscriber_JSON.put("CIRCLE_CODE", loginResponse.getString("State"));
            JSONObject response2 = registerWingsJob(Subscriber_JSON);
            prDebug("Response from registerWingsJob :: " + response2);
            if (response2.getString("STATUS").equalsIgnoreCase("0")) {
                session.setAttribute("JOB_STATUS", "Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest, Kindly make a note of the application number for future correspondance (e.g. WL0000234)");
                try {
                    session.setAttribute("CAF_NO", response2.getString("caf_no"));
                } catch (Exception e) {
                }
                JSONObject request = new JSONObject();
                request.put("CONTACT_NO", Subscriber_JSON.getString("cust_mobile_no"));
                request.put("CAF_NO", response2.getString("caf_no"));
                request.put("STATE", loginResponse.getString("State"));
                request.put("RETURN_URL", CRSAppResources.RETURN_URL);
                UUID uniqueKey = UUID.randomUUID();
                request.put("SESSION_ID", "REG-" + uniqueKey.toString()); 
                PaymentGateway objPaymentGateway = new PaymentGateway();
                JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(request);
                prInfo("initiatePaymentStatus :" + initiatePaymentStatus);
                if (0 == initiatePaymentStatus.getInt("STATUS")) {
                    response2.put("PYMT", "S");
                    String sessionID = initiatePaymentStatus.getString("sessionId");
                    response2.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                }
                initiatePaymentStatus.put("Info1", Subscriber_JSON.getString("cust_mobile_no"));
                initiatePaymentStatus.put("CAF_NO", response2.getString("caf_no"));
                
                if(objPaymentGateway.auditPaymentTxn(initiatePaymentStatus)){
                    response.setSuccess(true);
                    response.setMessage(response2.getString("MESSAGE"));
                    response.setResponseData(response2);
                }else{
                    response2.put("PYMT", "F");
                    response.setSuccess(false);
                    response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                    response.setResponseData(responceJson);
                }               

            } else {
                response.setSuccess(false);
                response.setMessage(response2.getString("MESSAGE"));
                response.setResponseData(responceJson);
            }    
        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][registerWingsUser]:  ", ex);           
        }finally{
            prInfo("[FMS_NewForm][registerWingsUser] finally block:");
            new FMS_NewForm().ClearSessionvals();
        }
        prInfo("[FMS_NewForm][registerWingsUser] END");

        return "success";
    }

    public JSONObject registerWingsJob(JSONObject reqJson) {
        prInfo("[FMS_NewForm][registerWingsJob][START]");
        PreparedStatement pstmt = null;
        Connection con = null;
        JSONObject respJson = new JSONObject();
        String strMessage = "";
        String status = "-1";
        String caf_no = "";
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            prInfo("Request in [FMS_NewForm][registerWingsJob] ::" + reqJson.toString());
            con = CRSDBManager.getConnection();
            prDebug("Con in [registerWingsJob]  ::  " + con);
            if (validateCircleDetails(reqJson)) {
                if (reqJson.containsKey("CAF_NO") && !"".equalsIgnoreCase(reqJson.getString("CAF_NO"))) {
                    caf_no = reqJson.getString("CAF_NO");
                } else {
                    caf_no = getWLCAFNo();
                }
                reqJson.put("caf_no", caf_no);
                String[] columns = {"caf_no", "cust_mobile_no", "STATE", "ZONE_SH_CODE", "cust_title_ecaf", "first_name", "cust_last_name", "f_h_name", "gender_ecaf", "dob", "cust_usage_code_ecaf", "email", "REQ_DATA"};
                String registerWingsJob_Qry = new CRSPropertyReader().getQueryonId("FMS_DATA_WEB_PORTAL").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
                prDebug("Query [registerWingsJob] :: " + registerWingsJob_Qry + " | Column Length :: " + columns.length);
                prDebug("Con in [registerWingsJob] :: " + con);
                pstmt = con.prepareStatement(registerWingsJob_Qry);
                for (int i = 0; i < columns.length - 1; i++) {
                    pstmt.setString(i + 1, reqJson.optString(columns[i]));
                }
                pstmt.setString(columns.length, reqJson.toString());
                int insCount = pstmt.executeUpdate();
                prDebug("registerWingsJob count :: " + insCount);
                if (insCount == 1) {
                    status = "0";
                    strMessage = msgObj.getMessge("WINGS_NEW_REG_SUCCESS");
                } else {
                    strMessage = msgObj.getMessge("WINGS_NEW_REG_FAIL");
                }
                respJson.put("caf_no", caf_no);
            } else {
                status = "1";
                strMessage = msgObj.getMessge("CHECK_USER_CIRCLE_FAIL");
            }
        } catch (Exception e) {
            status = "-1";
            strMessage = msgObj.getMessge("WINGS_NEW_REG_ERROR");
            prLog("Error in [FMS_NewForm][registerWingsJob] :: ", e);
        } finally {
            respJson.put("STATUS", status);
            respJson.put("MESSAGE", strMessage);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_NewForm][registerWingsJob][END]");
        return respJson;
    }
    
    public boolean validateCircleDetails(JSONObject reqData) {
        prInfo("Start : validateCircleDetails");
        prDebug("validateCircleDetails Data :" + reqData);
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        boolean bStatus = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [validateCircleDetails]  ::  " + con);
            String checkUserCircleQry = "";
            checkUserCircleQry = new CRSPropertyReader().getQueryonId("CHECK_USER_CIRCLE").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [validateCircleDetails] :: " + checkUserCircleQry);
            pstmt = con.prepareStatement(checkUserCircleQry);
            pstmt.setString(1, reqData.getString("CIRCLE_CODE"));
            pstmt.setString(2, reqData.getString("isCircleEnable"));
            pstmt.setString(3, reqData.getString("ZONE"));
            rs = pstmt.executeQuery();
            if (rs.next() && rs.getInt(1) > 0) {
                bStatus = true;
            }
        } catch (Exception e) {
            prLog("Error in validateCircleDetails :", e);
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("End : validateCircleDetails : " + bStatus);
        return bStatus;
    }

    public String getFMSCAFNo() {
        prInfo("[FMS_NewForm][getFMSCAFNo][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        String strCafNo = null;
        Connection con = null;
        try {            
            con = CRSDBManager.getConnection();
            prDebug("Con in [getFMSCAFNo]  ::  " + con);
            String cafSeqQry = new CRSPropertyReader().getQueryonId("FMS_CAF_SEQ_NO").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
             prDebug("Query to fetch CAF No :  " + cafSeqQry);
            pstmt = con.prepareStatement(cafSeqQry);
            resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                strCafNo = "LE_" + resultSet.getString(1);
            }
        } catch (Exception e) {
            prLog("Error in [FMS_NewForm][getFMSCAFNo][Connection]:", e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prDebug("Response from [getFMSCAFNo] :: " + strCafNo);
        prInfo("[FMS_NewForm][getFMSCAFNo][END]");
        return strCafNo;
    }
    
    public String getWLCAFNo() {
        prInfo("[FMS_NewForm][getWLCAFNo][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        String strCafNo = null;
        Connection con = null;
        try {   
            con = CRSDBManager.getConnection();
            prDebug("Con in [getWLCAFNo]  ::" + con);
            String cafSeqQry = new CRSPropertyReader().getQueryonId("WL_CAF_SEQ_NO").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query to fetch WL CAF No :  " + cafSeqQry);
            pstmt = con.prepareStatement(cafSeqQry);
            resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                strCafNo = "WL_" + resultSet.getString(1);
            }
        } catch (Exception e) {
            prLog("Error in [getWLCAFNo]:", e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
            
        }
        prDebug("Response from [getWLCAFNo] :: " + strCafNo);
        prInfo("[FMS_NewForm][getWLCAFNo][END]");
        return strCafNo;
    }
   
    public String loadRegisteredUsers() {
        prInfo("[FMS_NewForm][loadRegisteredUsers] START");
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
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("Request data in [loadRegisteredUsers] :: " + reqJson);
            String fetchQry = "";
            fetchQry = new CRSPropertyReader().getQueryonId("LOAD_WINGS_REGISTERED_USER").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for loadRegisteredUsers : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[FMS_NewForm][loadRegisteredUsers][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("serchValue"));
            pstmt.setString(2, reqJson.getString("circleValue"));
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                prInfo("resultSet [FMS_NewForm][loadRegisteredUsers]:  ");
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
            if (!jobsArr.isEmpty()) {
                responceJson.put("Data", jobsArr);
                responceJson.put("LABELS", "_LABL");
                JSONObject resultJson=new FMSWingsCustomerSupport().customJsonFormat(responceJson);
                response.setResponseData(resultJson);
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("FETCH_REG_USERS_SUCCESS"));
            } else {
                responceJson.put("Data", jobsArr);
                response.setResponseData(responceJson);
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("FETCH_REG_USERS_FAIL"));
            }
           
        } catch (Exception ex) {
            prLog("Exception in  [FMS_NewForm][loadRegisteredUsers]:  ", ex);
            response.setResponseData(responceJson);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_REG_USERS_ERROR"));
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_NewForm][loadRegisteredUsers] END");

        return "success";
    }
    
    
     public String loadDistricts(JSONObject reqJson) {
        prInfo("[FMS_NewForm][loadDistricts][START] ::");
        JSONObject respJson = new JSONObject();
        JSONArray distritcsList = new JSONArray();
        JSONObject distJson = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        Connection con = null;
        String strMsg = "";
        int nStatus = -1;
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {           
            String zoneCode = reqJson.getString("ZONE_SH_CODE");
            String statesQry = new CRSPropertyReader().getQueryonId("FMS_DISRICT_LIST").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA).replace("$ZONE_SH$", zoneCode);
            prDebug("loadDistricts :: Qry  ::" + statesQry);
            con = CRSDBManager.getConnection();
            prDebug("connection ::" + con);
            pst = con.prepareStatement(statesQry);
            pst.setString(1, zoneCode);
            pst.setString(2, reqJson.getString("STATE"));
            pst.setString(3, reqJson.getString("CIRCLE_SH_CODE"));
            rs = pst.executeQuery();
            while (rs.next()) {
                distJson = new JSONObject();
                distJson.put("DD_CODE", rs.getString("DD_CODE"));
                distJson.put("DD_VALUE", rs.getString("DD_VALUE"));
                distritcsList.add(distJson);
            }
            if (distritcsList.size() > 0) {
                nStatus = 0;
                strMsg = msgObj.getMessge("FMS_DISTRICT_SUCCESS");
            } else {
                nStatus = 1;
                strMsg = msgObj.getMessge("FMS_DISTRICT_NOT_AVAIL");
            }
        } catch (Exception e) {
            prLog("eroor occured loading FMS Districts", e);
            strMsg = msgObj.getMessge("FMS_DISTRICT_ERR");           
        } finally {
            CRSDBManager.closeRS(rs);
            CRSDBManager.closePS(pst);
            CRSDBManager.closeCon(con);
            prDebug("loadDistricts ::  list length " + (distritcsList != null ? distritcsList.size() : "null (Exception occured)"));
            respJson.put("DISTRICTS", distritcsList);
            respJson.put("STATUS", nStatus);
            respJson.put("MESSAGE", strMsg);
                    
        }
        prInfo("[FMS_NewForm][loadDistricts][END] ::");
        return respJson.toString();
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
