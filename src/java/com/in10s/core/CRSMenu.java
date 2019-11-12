/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.core;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSResourcesInfo;
import com.in10s.commons.CRSResponse;
import com.in10s.commons.CRSSession;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.awt.Desktop;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author swaroopeshwar
 */
public class CRSMenu {

    CRSClient client = new CRSClient();
    CRSResponse response = null;
    HttpServletRequest request = null;

    public JSONObject uploadJobCount() {
        JSONObject uploadJobCount = new JSONObject();
        long start_Time = System.currentTimeMillis();

        JSONObject uploadFormJOB = null;

        AppLogger.debug(":::::::::::::::::::::::::uploadJobCount()::::::::::::::::::::");
        try {
            String serviceURL = "http://rsweb51:2021/BSNL_OB_Service/bsnl/OnboardIntegrationService/getJobsCount";
            HttpServletRequest request = ServletActionContext.getRequest();
            HttpSession session = request.getSession();
            JSONObject loginResp = (JSONObject) session.getAttribute("loginResponse");
            String inputFieldsEntity = "{\"JOB_SOURCE\":\"T\",\"JOB_TYPE\":\"KYC\",\"USER_ID\":\"" + loginResp.getString("UserId") + "\",\"USER_FLAG\":\"" + loginResp.getString("UserFlag") + "\",\"CIRCLE_CODE\":\"" + loginResp.getString("CircleCode") + "\"}";
            AppLogger.debug("inputFieldsEntity for uploadJobCount:::::::::::::::::::" + inputFieldsEntity);
            System.out.println("serviceURL for uploadJobCount:::::::::::::::::::::::::::::::" + serviceURL);
            uploadFormJOB = client.restClient(serviceURL, inputFieldsEntity, "ONBOARD");
            System.out.println("upload JobCount Status Response::::::::::::::::::::" + uploadFormJOB);
            AppLogger.debug("upload JobCount Status Response::::::::::::::::::::" + uploadFormJOB);

            if (uploadFormJOB.containsKey("STATUS")) {
                if (uploadFormJOB.getString("STATUS").equalsIgnoreCase("0")) {
                    if (uploadFormJOB.containsKey("UPLOADED_JOBS_COUNT")) {
                        uploadJobCount.put("count", Integer.parseInt(uploadFormJOB.getString("UPLOADED_JOBS_COUNT")));

                    }
                } else {
                    AppLogger.debug("Status key missing in repsonse" + uploadFormJOB);
                }
            }
        } catch (Exception ex) {
            uploadJobCount.put("count", 0);
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.debug("Exception in  uploadJobCount block :::" + sw.toString());
        }
        AppLogger.debug("::::::::Final uploadJobCount:::::::" + uploadJobCount);
        return uploadJobCount;
    }

    public String generateUniqueKeyUPService() {
        String retValue = "success";
        String uniqueKey = "";
        JSONObject inputFieldsEntityJson = null;
        response = new CRSResponse();

        try {
            AppLogger.info(":::::::::::::::::::generateUniqueKeyUPService Method::::::::::::");
            request = ServletActionContext.getRequest();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            HttpServletRequest request = ServletActionContext.getRequest();
            HttpSession session = request.getSession();
            JSONObject loginResp = (JSONObject) session.getAttribute("loginResponse");

//            String UniPackURL = CRSResourcesInfo.getAppSettingsProperty("UP_URL");
            String UniPackURL = CRSAppResources.UP_URL.trim() + "/webresources/UserServices/GenerateUniqueKey";
            String userFlag = loginResp.getString("UserCode");
            inputFieldsEntityJson = new JSONObject();

            inputFieldsEntityJson.put("UserName", loginResp.getString("UserName"));
            inputFieldsEntityJson.put("SessionID", loginResp.getString("UP_Auth_Key"));
            inputFieldsEntityJson.put("SeqNumber", loginResp.getString("SeqNumber"));

            AppLogger.info(":::::::Sending::request on\t" + UniPackURL + "\tas :::::::::" + inputFieldsEntityJson.toString());
            //Calling Service.....

            JSONObject responseObj = client.UPServicecall(UniPackURL, inputFieldsEntityJson.toString());
            System.out.println(":::::::responseObj from Server is:::::" + responseObj);
            AppLogger.info(":::::::responseObj from Server is:::::" + responseObj);
            AppLogger.debug(":::::::responseObj from Server is:::::" + responseObj);
            if (responseObj.getString("Status").equals("success")) {
                uniqueKey = responseObj.getString("UniqueKey");
                JSONObject inputFields = new JSONObject();
                inputFields.put("UniqueKey", uniqueKey);
                inputFields.put("UserName", loginResp.getString("UserName"));
                inputFields.put("SeqNumber", loginResp.getString("SeqNumber"));
                System.out.println("reqParam::::::" + inputFields.toString());
//                System.out.println("::::::::::::::"+CRSResourcesInfo.getAppSettingsProperty("UP_URL")+"/SSOLogInAction.do?\"ReqData\":{\"UniqueKey\":\"'"+ uniqueKey +"'\",\"UserName\":\"'"+ (String) CRSSession.getInstance().getAttribute("UserName") +"'\"});
//                System.out.println("UP_URL ::::::" + CRSResourcesInfo.getAppSettingsProperty("UP_URL") + "/SSOLogInAction.do?ReqData=" + new CRSAuthenticate().Encrypt(inputFields.toString()).toString().replaceAll(" ", "%20") + "");
//                String url = CRSResourcesInfo.getAppSettingsProperty("UP_URL") + "/SSOLogInAction.do?ReqData=" + URLEncoder.encode(new CRSAuthenticate().Encrypt(reqParam).toString().replaceAll(" ", "%20"), "UTF-8") + "";
//                URI uri = new URI(url);
                URI uri = new URI(CRSAppResources.UP_URL + "/SSOLogInAction.do?ReqData=" + new CRSAuthenticate().Encrypt(inputFields.toString()).toString().replaceAll(" ", "%20") + "");
//                URI uri = new URI(CRSResourcesInfo.getAppSettingsProperty("UP_URL")+"/SSOLogInAction.do?\"ReqData\":{\"UniqueKey\":\""+ uniqueKey +"\",\"UserName\":\""+ new CRSAuthenticate().Encrypt((String) CRSSession.getInstance().getAttribute("UserName")) +"\"}");
                try {
                    if (Desktop.isDesktopSupported()) {
                        Desktop.getDesktop().browse(uri);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    StringWriter sw = new StringWriter();
                    PrintWriter pw = new PrintWriter(sw);
                    e.printStackTrace(pw);
                    System.out.println("Exception in OnBoard URL calling using SSO :::: " + e.toString());
                    AppLogger.debug("Exception in OnBoard URL calling using SSO :::: " + e.toString());
                }
                response.setSuccess(true);
                response.setResponseData(responseObj);
            } else {
                response.setSuccess(false);
//                response.setMessage(Mesage);
                AppLogger.debug("status is fail  :::: " + responseObj.getString("Status"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.debug("Exception in  generateUniqueKeyUPService method::::  " + sw.toString());
        }
        return retValue;

    }
}
