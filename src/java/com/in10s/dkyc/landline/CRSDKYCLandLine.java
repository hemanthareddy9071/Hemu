/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.dkyc.landline;

import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSMDH5;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.core.CRSUtils;
import com.in10s.dkyc.CRSDKYCJobUpload;
import com.in10s.fmsekyc.FMS_ekyc;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author praveen.k
 */
public class CRSDKYCLandLine {


    
    private HttpSession session = null;
    private HttpServletRequest request = null;
    private CRSResponse response;

    public String nxtToDKYCLLDocs() {
        String retVal = "InvalidRequest";
        AppLogger.debug("in nxtToDKYCLLDocs method ...!");
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for processFlow is : " + reqJson);

                getRequest().setAttribute("LOGIN_INFO", reqJson);
            }

        } catch (Exception e) {
            prErr("Error in [FMS_ekyc][processFlow]:  ", e);
        }

        return "success";
    }

    public String dkycLLFormData() {
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for dkycLLFormData is : " + reqJson);

                getRequest().setAttribute("DKYC_JOB_INFO", reqJson);
            }

        } catch (Exception e) {
            prErr("Error in [FMS_ekyc][processFlow]:  ", e);
        }

        return "success";
    }

    public String nxtToDKYCLLPlan() {
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for nxtToDKYCLLPlan is : " + reqJson);

                getRequest().setAttribute("DKYC_JOB_INFO", reqJson);
            }

        } catch (Exception e) {
            prErr("Error in [FMS_ekyc][processFlow]:  ", e);
        }

        return "success";
    }

    public String nxtToDKYCLLPreview() {
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for nxtToDKYCLLPreview is : " + reqJson);

                getRequest().setAttribute("DKYC_JOB_INFO", reqJson);
            }

        } catch (Exception e) {
            prErr("Error in [FMS_ekyc][processFlow]:  ", e);
        }

        return "success";
    }

    public String saveDKYCLLJob() {
        String client_ipAddr= "";
        String retVal = "fail";
        String ZipFilePath = "";
        File zip = null;
        JSONObject fmsdkycllData = null;
        InetAddress ip = null;
        InetAddress networkIP = null;
        CRSUtils utils = new CRSUtils();
        List DOCList = new ArrayList();
        List ImagePathList = new ArrayList();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        JSONObject serviceRes = new JSONObject();
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {

                fmsdkycllData = (JSONObject) JSONSerializer.toJSON(strReqJson);
                prInfo("reqJson [saveDKYCLLJob] :: " + fmsdkycllData);
                try {
                    client_ipAddr=request.getHeader("X-FORWARDED-FOR");
                    AppLogger.info("client_ipAddr---X-FORWARDED-FOR :: "+client_ipAddr);
                    if(client_ipAddr == null){
                    client_ipAddr=request.getRemoteAddr();
                    }
                    networkIP = InetAddress.getLocalHost();
                    ip = utils.getLocalHostLANAddress();
                    AppLogger.debug("N/W IP address is: : " + client_ipAddr);
//                    fmsdkycllData.put("PC_IP", networkIP.getHostAddress());
                    fmsdkycllData.put("PC_IP", client_ipAddr);
                } catch (Exception e) {
                    fmsdkycllData.put("PC_IP", "");
                    prErr("Exception in IP address getting [saveDKYCLLJob] ", e);
                }
                try {
                    NetworkInterface network = NetworkInterface.getByInetAddress(ip);
                    byte[] mac = network.getHardwareAddress();
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < mac.length; i++) {
                        sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
                    }
                    AppLogger.debug("System MAC address in job upload is :" + sb.toString());
                    fmsdkycllData.put("PC_MAC", sb.toString());
                } catch (Exception e) {
                    fmsdkycllData.put("PC_MAC", "");
                    prErr("Exception in MAC address getting [saveDKYCLLJob] :", e);
                }
                try {
                    AppLogger.debug("System name in job upload is :" + networkIP.getHostName());
                    fmsdkycllData.put("PC_MAKE", networkIP.getHostName());
                } catch (Exception e) {
                    fmsdkycllData.put("PC_MAKE", "");
                    prErr("Exception in PC Name getting [saveDKYCLLJob]", e);
                }
                if(!fmsdkycllData.getBoolean("isSkipImgs")){
                String dovFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
                File UploadJob = new File(dovFilePath);
                if (!UploadJob.exists()) {
                    UploadJob.mkdirs();
                }
                try {
                    session.removeAttribute("DOCS_FILE_PATH");
                } catch (Exception e) {
                }
                String FolderName = UploadJob.getName();
                File[] filesList = UploadJob.listFiles();
                for (int j = 0; j < filesList.length; j++) {
                    AppLogger.debug("ZIP File name [saveDKYCLLJob]  : " + filesList[j].getName() + " , folder length  : " + filesList.length);
                    if (filesList[j].isFile() && !(filesList[j].getName().contains("json"))) {
                        ImagePathList.add(filesList[j].getAbsolutePath());
                        DOCList.add(filesList[j].getName());
                    }
                }
                
                if (ImagePathList.size() > 0 && (DOCList.size() == ImagePathList.size())) {
                    ZipFilePath = new FMS_ekyc().doZip(UploadJob.getAbsolutePath(), ImagePathList, DOCList, FolderName);
                    String HashKey = new CRSMDH5().getHashKey(new File(ZipFilePath), "MD5");
                    AppLogger.debug("Hashkey of zipFile [saveDKYCLLJob] :: " + HashKey);
                    fmsdkycllData.put("HashKey", HashKey);

                } else {
                    fmsdkycllData.put("HashKey", "");
                }
                }
                zip = new File(ZipFilePath);
                AppLogger.debug("Zip file size  [saveDKYCLLJob] :::::: " + zip.length() / 1024 + "kb");
                fmsdkycllData.put("ZipFileList", DOCList);
                fmsdkycllData.put("ZipFileCreation", ZipFilePath);
                fmsdkycllData.put("ZipFileLength", zip.length());
                fmsdkycllData.put("FILE_NAME", zip.getName());
                fmsdkycllData.put("TARIFF_ID_DOC_PATH", ZipFilePath);
                JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
                AppLogger.debug("loginResponse [saveDKYCLLJob] :: " + loginResponse);
                fmsdkycllData.put("APP_VERSION", CRSAppResources.AppVersion);
                fmsdkycllData.put("JOB_SOURCE", "S");
                fmsdkycllData.put("FLOW_TYPE", "DKYC");
                fmsdkycllData.put("USER_ID", loginResponse.getString("UserId"));
                fmsdkycllData.put("CIRCLE_SHORT_CODE", loginResponse.getString("CIRCLE_SH_CODE"));
                fmsdkycllData.put("HUB_CODE", loginResponse.getString("CircleZoneCode"));
                fmsdkycllData.put("franch_address", loginResponse.getString("FrachiseeAddress"));
                fmsdkycllData.put("FranchiseeName", loginResponse.getString("FranchiseeName"));//FranchiseeName
                fmsdkycllData.put("pos_agent_name", loginResponse.getString("FranchiseeName"));//pos_agent_name
                fmsdkycllData.put("JOB_TYPE", "FMS_DKYC");
                fmsdkycllData.put("ZONE", loginResponse.getString("FMSZone"));//FMSZone
                fmsdkycllData.put("JOB_USER", loginResponse.getString("UserFlag"));
                fmsdkycllData.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
                fmsdkycllData.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
                fmsdkycllData.put("CLIENT_REQ_TIME", Calendar.getInstance().getTime().getTime());//CLIENT_REQ_TIME
                fmsdkycllData.put("pos_name", "Self");
                fmsdkycllData.put("pos_code", "Self");
                fmsdkycllData.put("franchisee_code", "self");
                fmsdkycllData.put("isWingsFlag", "true");
                fmsdkycllData.put("isCircleEnable", loginResponse.getString("isCircleEnable"));
                fmsdkycllData.put("service_type", fmsdkycllData.getString("service_type_ecaf"));
                fmsdkycllData.put("AREA_CODE", fmsdkycllData.getJSONObject("RESERVE_RESP").getString("AREA_CODE"));
                fmsdkycllData.put("NGN_FLAG", fmsdkycllData.getJSONObject("RESERVE_RESP").getString("NGN_FLAG"));
                fmsdkycllData.put("RESERVATION_ID", fmsdkycllData.getJSONObject("RESERVE_RESP").getString("RESERVATION_ID"));
                fmsdkycllData.put("PORT_NAME", fmsdkycllData.getJSONObject("RESERVE_RESP").getString("PORT_NAME"));
                fmsdkycllData.put("PORT_VAL", fmsdkycllData.getJSONObject("RESERVE_RESP").getString("PORT_VAL"));
                
                ZipFilePath = fmsdkycllData.optString("TARIFF_ID_DOC_PATH");
                if (new FMS_NewForm().validateCircleDetails(fmsdkycllData)) {
                    AppLogger.debug("Upload data [saveDKYCLLJob] :::::::: " + fmsdkycllData.toString());
                    String onBoardURL = CRSAppResources.ONBOARD_URL;
                    String OnboardURL = onBoardURL.toString().trim() + "/bsnl/DKYCService/saveFMSDKYCJob";
                    AppLogger.debug("onBoardURL in [saveDKYCLLJob] :" + OnboardURL);
                    serviceRes = new CRSClient().serviceRequest(ZipFilePath, fmsdkycllData.toString(), OnboardURL);
                    AppLogger.debug("Response of saveCAFData serviuce [saveDKYCLLJob]:" + serviceRes);
                    if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                       serviceRes.put("application_date",new SimpleDateFormat("dd MMM yyyy").format(new Date(System.currentTimeMillis()))); 
                        retVal = "success";
                    }
                    try {
                        prInfo("Starting of Response time sending to OB Job upload Service ");
                        String serviceUrl = onBoardURL + "/bsnl/OnboardIntegrationService/auditJobTransaction";
                        AppLogger.debug("onBoardURL in Job upload method for audinting " + serviceUrl);
                        String inputFieldsEntity = "{\"CAF_AUDIT_ID\":'"
                                + serviceRes.getString("CAF_AUDIT_ID") + "',\"SERVER_RESP_TIME\":'"
                                + serviceRes.getString("SERVER_RESP_TIME") + "',\"CLIENT_RESP_TIME\":'"
                                + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"S_LL\",\"USER_ID\":'"
                                + loginResponse.getString("UserId") + "'}";
                        AppLogger.debug("Input data for auditJobTransaction [saveDKYCLLJob]: " + inputFieldsEntity);
                        String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                        AppLogger.debug("Response from auditJobTransaction  [saveDKYCLLJob] :" + SLAResponse);
                    } catch (Exception e) {
                        prErr("Exception in auditJobTransaction [saveDKYCLLJob]:  ", e);
                    }
                } else {
                    prInfo("validateCircleDetails error :: " + msgObj.getMessge("CHECK_USER_CIRCLE_FAIL"));
                }
            } else {
                prInfo("Request is null [saveDKYCLLJob]");
            }
        } catch (Exception e) {
            prErr("Error in [saveDKYCLLJob]:  " + msgObj.getMessge("UPLOAD_WINGS_JOB_ERROR"), e);
        } finally {
            try {
                fmsdkycllData.remove("TARIFF_ID_DOC_PATH");
                fmsdkycllData.remove("ZipFileCreation");
                getRequest().setAttribute("DKYC_JOB_INFO", fmsdkycllData);
                getRequest().setAttribute("DKYC_JOB_RESP", serviceRes);
                prInfo("[CRSDKYCLandLine][saveDKYCLLJob] finally block " + retVal);
                new FMS_NewForm().ClearSessionvals();
                AppLogger.info("ZipFilePath in finally block " + ZipFilePath);
               /* if (!ZipFilePath.isEmpty()) {
                    File deletionPath = new File(ZipFilePath);
                    int index = deletionPath.getAbsolutePath().lastIndexOf(File.separator);
                    deletionPath = (index > -1) ? new File(deletionPath.getAbsolutePath().substring(0, index)) : new File(deletionPath.getAbsolutePath());
                    new CRSDKYCJobUpload().deleteDirOFFMS(deletionPath);
                }*/
            } catch (Exception e) {
                prErr("Exception in deleteDirOFFMS [saveDKYCLLJob]:  ", e);
            }
        }
                        getRequest().setAttribute("MESSAGE", "Unable to Save JOB");

        return retVal;
    }
    
    public String processSkippedDocs(){
    String retVal = "fail";
        AppLogger.debug("in processSkippedDocs method ...!");
        try {
            setRequest(ServletActionContext.getRequest());
            setSession(getRequest().getSession(false));
            setResponse(new CRSResponse());
            String strReqJson = getRequest().getParameter("reqData");
            if (strReqJson != null) {
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
                AppLogger.debug("request for processSkippedDocs is : " + reqJson);
                getRequest().setAttribute("SKIPPED_DOCS_INFO", reqJson);
                retVal ="success";
            }

        } catch (Exception e) {
            prErr("Error in [FMS_ekyc][processFlow]:  ", e);
        }

    
    return retVal;
    }
    
    
    

    /*  setter getters for session request and responce */

    public HttpSession getSession() {
        return session;
    }
   
    public void setSession(HttpSession session) {
        this.session = session;
    }
 
    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String strMsg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(sw.toString());
    }

}
