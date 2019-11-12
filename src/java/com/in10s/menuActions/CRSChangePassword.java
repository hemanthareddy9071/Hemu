/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.menuActions;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSResourcesInfo;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author jangachary.s
 */
public class CRSChangePassword {

    CRSClient client = new CRSClient();
    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response = null;
    CRSAuthenticate objCRSAuthenticate = new CRSAuthenticate();

    public String getLOB() {
        return LOB;
    }

    public void setLOB(String LOB) {
        this.LOB = LOB;
    }
    private String LOB;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String changePassword() {
        AppLogger.info(" Starting of changePassword method in CRSChangePassword ");
        String retValue = "success";

        String result = "";
        JSONObject jobj = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("Request data in changePassword method is : " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);
            String OldPwd = reqJson.getString("OldPwd");
            String NewPwd = reqJson.getString("NewPwd");
            String UniPackURL = CRSAppResources.UP_URL;// CRSResourcesInfo.getAppSettingsProperty("UP_URL");
            String webservice = UniPackURL + "/webresources/UserServices/ChangePWD";
//            String webservice = UniPackURL + "/webresources/UserServices/ChangePWD";
            AppLogger.info("UniPackURL in  changePassword method is :" + webservice);
            String username = reqJson.getString("UserName");
            String password = (String) session.getAttribute("Password");

            JSONObject passwordFieldJson = new JSONObject();

            passwordFieldJson.put("UserName", username);
            passwordFieldJson.put("OldPwd", OldPwd);
            passwordFieldJson.put("NewPwd", NewPwd);
            passwordFieldJson.put("PwdChangeType", "ChangePwd");

            String changePwdFiledsRequest = passwordFieldJson.toString();

            AppLogger.debug("Input data for ChangePWD service in changePassword method is : " + changePwdFiledsRequest);

            if (OldPwd.equalsIgnoreCase(password)) {

                jobj = new CRSClient().UPServicecall(webservice, changePwdFiledsRequest);

                result = (String) jobj.get("Status");
                response.setSuccess(true);
                response.setResponseData("success");
                //updating new password in session
                session.setAttribute("Password", NewPwd);
                response.setMessage("Password Changed successfully");
//                setMessage("Password Changed successfully");

                AppLogger.debug("Response from ChangePWD service in changePassword method is : " + result);
            } else {
                response.setSuccess(false);
                response.setResponseData("fail");
                response.setMessage("Entered old Password is Invalid");
//                setMessage("Entered old Password is Invalid");

                AppLogger.info("Entered old Password is Invalid");
            }
        } catch (Exception e) {

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            response.setSuccess(false);
            response.setResponseData("fail");
            response.setMessage("Password change failed");

            AppLogger.error("Exception in ChangePassword method:  " + sw.toString());

        }
        AppLogger.info(" Ending of changePassword method in CRSChangePassword ");
        return retValue;

    }

    public String newPWDChanage() {
        AppLogger.info(" Starting of newPWDChanage method in CRSChangePassword ");
        String retValue = "success";

        String result = "";
        JSONObject jobj = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqJson = objCRSAuthenticate.Decrypt(request.getParameter("reqData"));
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("Request data in changePassword method is : " + reqJson);

            String OldPwd = reqJson.getString("OldPwd");
            String NewPwd = reqJson.getString("NewPwd");
            String UniPackURL = CRSAppResources.UP_URL;// CRSResourcesInfo.getAppSettingsProperty("UP_URL");
            String webservice = UniPackURL + "/webresources/UserServices/ChangePWD";
//            String webservice = "http://rsweb48:8888/UniserveWebV4-BSNL/webresources/UserServices/ChangePWD";
            AppLogger.info("UniPackURL in  changePassword method is :" + webservice);
            String username = reqJson.getString("username");
            JSONObject passwordFieldJson = new JSONObject();
            passwordFieldJson.put("UserName", username);
            passwordFieldJson.put("OldPwd", OldPwd);
            passwordFieldJson.put("NewPwd", NewPwd);
            passwordFieldJson.put("PwdChangeType", "ForgotPwd");
            String changePwdFiledsRequest = passwordFieldJson.toString();
            AppLogger.debug("Input data for ChangePWD service in newPWDChanage method is : " + changePwdFiledsRequest);
            jobj = new CRSClient().UPServicecall(webservice, changePwdFiledsRequest);
            result = (String) jobj.get("Status");
            response.setSuccess(true);
            response.setResponseData(jobj);
//            session.setAttribute("Password", NewPwd);
            AppLogger.debug("Response from ChangePWD service in newPWDChanage method is : " + jobj);
        } catch (Exception e) {

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            response.setSuccess(false);
            response.setResponseData("fail");
            response.setMessage("Password Changed  failed");

            AppLogger.error("Exception in newPWDChanage method:  " + sw.toString());

        }
        AppLogger.info(" Ending of newPWDChanage method in CRSChangePassword ");
        return retValue;

    }

    public String generateOTP() {
        AppLogger.info(" Starting of generateOTP method ");
        String retValue = "success";

        String result = "";
        JSONObject jobj = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqJson = objCRSAuthenticate.Decrypt(request.getParameter("reqData"));

            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);

            AppLogger.debug("Request data in generateOTP method is : " + reqJson);
            String username = reqJson.getString("username");
            String UniPackURL = CRSAppResources.UP_URL;// CRSResourcesInfo.getAppSettingsProperty("UP_URL");
            String webservice = UniPackURL + "/webresources/UserServices/sendOTPThick";
//            String webservice = "http://rsweb48:8888/UniserveWebV4-BSNL/webresources/UserServices/sendOTPThick";
            AppLogger.info("UniPackURL in  generateOTP method is :" + webservice);
            JSONObject generateOTPJson = new JSONObject();
            generateOTPJson.put("LOGIN_ID", username);
            generateOTPJson.put("DEVICE_IMEI", "");
            generateOTPJson.put("CHANNEL", "T");
            generateOTPJson.put("LobType", "Mobility");
            generateOTPJson.put("OTPType", reqJson.getString("OTPType"));
            generateOTPJson.put("USER_ID", reqJson.getString("USER_ID"));
            String generateOTPFiledsRequest = generateOTPJson.toString();

            AppLogger.debug("Input data for in generateOTP method is : " + generateOTPFiledsRequest);
            jobj = new CRSClient().UPServicecall(webservice, generateOTPFiledsRequest);
            AppLogger.debug("Response from generateOTP method is : " + jobj);
            session.setAttribute("generateOTPObj", jobj);
            result = (String) jobj.get("STATUS");
            response.setSuccess(true);
            response.setResponseData(jobj);
            AppLogger.debug("Response from generateOTP method is : " + result);
        } catch (Exception e) {

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            response.setSuccess(false);
            response.setResponseData("fail");
            response.setMessage("Password change failed");
            AppLogger.error("Exception in generateOTP method:  " + sw.toString());
        }
        AppLogger.info(" Ending of generateOTP method");
        return retValue;
    }

    public String validateOTPFrgPwd() {
        AppLogger.info(" Starting of validateOTP method ");
        String retValue = "success";

        String result = "";
        JSONObject jobj = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqJson = objCRSAuthenticate.Decrypt(request.getParameter("reqData"));
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);

            AppLogger.debug("Request data in validateOTP method is : " + reqJson);
            String UniPackURL = CRSAppResources.UP_URL;// CRSResourcesInfo.getAppSettingsProperty("UP_URL");
            String webservice = UniPackURL + "/webresources/UserServices/validateOTPForThick";
//            String webservice = "http://rsweb48:8888/UniserveWebV4-BSNL/webresources/UserServices/validateOTPForThick";
            AppLogger.info("UniPackURL in  validateOTP method is :" + webservice);
            JSONObject validateOTPJson = new JSONObject();

            validateOTPJson.put("LobType", "");
            validateOTPJson.put("IMEI", "");
            validateOTPJson.put("IMEI", "");
            validateOTPJson.put("DeviceType", "T");
            validateOTPJson.put("TRANS_ID", reqJson.getString("TRANS_ID"));
            validateOTPJson.put("INPUT_OTP_VALUE", reqJson.getString("generatedOTP"));
            validateOTPJson.put("MobileNumber", reqJson.getString("MobileNumber"));
            validateOTPJson.put("LOGIN_ID", reqJson.getString("LOGIN_ID"));
            validateOTPJson.put("StatusFlag", reqJson.getString("StatusFlag"));
            validateOTPJson.put("USER_ID", reqJson.getString("USER_ID"));
            String validateOTPFiledsRequest = validateOTPJson.toString();

            AppLogger.debug("Input data for in validateOTP method is : " + validateOTPFiledsRequest);
            jobj = new CRSClient().UPServicecall(webservice, validateOTPFiledsRequest);
            AppLogger.debug("Response from validateOTP method is : " + jobj);
            if (jobj.getString("STATUS").equalsIgnoreCase("success")) {
                session.setAttribute("username", jobj.getString("UserName"));
            }
            System.out.println("USERNAME:::::::::::::::::::::" + session.getAttribute("username"));
            result = (String) jobj.get("STATUS");
            response.setSuccess(true);
            response.setResponseData(jobj);
        } catch (Exception e) {

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            response.setSuccess(false);
            response.setResponseData("fail");
            response.setMessage("Password change failed");
            AppLogger.error("Exception in validateOTP method:  " + sw.toString());
        }
        AppLogger.info(" Ending of validateOTP method");
        return retValue;
    }
}
