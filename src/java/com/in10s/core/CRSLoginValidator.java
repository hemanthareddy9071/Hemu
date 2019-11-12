/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.core;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.config.CRSAppResources;
import com.in10s.dkyc.CRSDKYCJobUpload;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.logger.AppLogger;
import com.in10s.logger.CRSThreadLocalManager;
import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author pardha.s
 */
public class CRSLoginValidator {

    CRSClient client = new CRSClient();
    HttpSession session = null;
    HttpServletRequest request = null;
    private String message;
    private String LOB;
    private String UserName;

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public String getLOB() {
        return LOB;
    }

    public void setLOB(String LOB) {
        this.LOB = LOB;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String sancharUserLogin() {
        prInfo("[CRSLoginValidator][sancharUserLogin] SATRT");
        String returnVal = "login";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession();
            String Uname = request.getParameter("UserName");
            prDebug("Sanchar Username :: " + Uname);
            setLOB("MOB");
            setUserName(Uname);
        } catch (Exception e) {
            prLog("Exception in [CRSLoginValidator][sancharUserLogin] :: ", e);
        }
        prInfo("[CRSLoginValidator][sancharUserLogin] END");
        return returnVal;
    }

    public String loginReqForword() {
        prInfo("[CRSLoginValidator][loginReqForword] SATRT");
        String returnVal = "success";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession();
            String reqData = request.getParameter("reqData");
            CRSAuthenticate authenticate = new CRSAuthenticate();
            JSONObject object = null;
            try {
                object = (JSONObject) JSONSerializer.toJSON(authenticate.Decrypt(reqData));
            } catch (Exception e) {
                object = (JSONObject) JSONSerializer.toJSON(reqData);
            }
            String lob_type = object.getString("lob_type");
            setLOB(lob_type);
            returnVal = "success";
        } catch (Exception e) {
            prLog("Exception in [CRSLoginValidator][loginReqForword] :: ", e);
            returnVal = "error";
        }
        prInfo("[CRSLoginValidator][loginReqForword] END");
        return returnVal;
    }

    public String preLoginProcess() {
        prInfo("[CRSLoginValidator][preLoginProcess] START");
        String returnVal = "login";
        try {
            request = ServletActionContext.getRequest();
            if (request != null) {
                session = request.getSession(false);
                if (session != null) {
                   /* try {
                        String file_path = (String) session.getAttribute("DOCS_FILE_PATH");
                        prInfo("file_path::session::" + file_path);
                        if (!StringUtils.isEmpty(file_path)) {
                            new CRSDKYCJobUpload().deleteDirOFFMS(new File(file_path));
                        }
                    } catch (Exception e) {
                    }*/
                    Enumeration<String> e = session.getAttributeNames();
                    while (e.hasMoreElements()) {
                        try {
                            String param = e.nextElement();
                            session.removeAttribute(param);
                        } catch (Exception ex) {

                        }
                    }
                }
            }

            returnVal = "login";
        } catch (Exception e) {
            prLog("Exception in [CRSLoginValidator][preLoginProcess] :: ", e);
            returnVal = "error";
        }
        prInfo("[CRSLoginValidator][preLoginProcess] END");
        return returnVal;
    }

    public String loginValidation() {
        prInfo("[CRSLoginValidator][loginValidation] START");
        String returnVal = "FAIL";
//        JSONObject inputFieldsEntityJson = null;
//        JSONObject inputFieldsEntityJson1 = null;

        try {
            new FMS_NewForm().ClearSessionvals();
            request = ServletActionContext.getRequest();
            session = request.getSession();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
//            String userName = reqJson.getString("userName");
//            String password = reqJson.getString("password");
            String lobType = reqJson.getString("lobType");
//            String browserId = reqJson.getString("browserId");
//            session.setAttribute("Lobtype", lobType);
//            session.setAttribute("actual_lob", lobType);
            long currentTimeMillis = System.currentTimeMillis();
            String userReqId = "Self" + "_" + currentTimeMillis;
            CRSThreadLocalManager.setRequestId(userReqId);

            prDebug("User session id is :: " + session.getId());
            prDebug("Request for login service is :: " + reqJson);
//            inputFieldsEntityJson = new JSONObject();
//            inputFieldsEntityJson.put("UserName", userName);
//            inputFieldsEntityJson.put("Password", password);
//            inputFieldsEntityJson.put("LobType", lobType);
//            inputFieldsEntityJson.put("DeviceType", "ThickClient");
//            inputFieldsEntityJson.put("ReqStartTime", Calendar.getInstance().getTime().getTime());
//            setLOB(lobType);
//            String UniPackURL = "http://rsweb72:4040/UniserveWebV4-BSNL/webresources/UserServices/LoginAuthentication";
//            String UniPackURL = CRSAppResources.UP_URL.trim() + "/webresources/UserServices/LoginAuthentication";
//            prDebug("UniPackURL for LoginAuthentication : " + UniPackURL);
//            prDebug("inputFieldsEntityJson for LoginAuthentication service : " + inputFieldsEntityJson);
            String strRespData = "{\"Status\":\"success\",\"Data\":{\"ReqReachedTime\":1530608252105,\"ReqStartTime\":\"1530608252100\",\"AadharLoginFlag\":0,\"LoginID\":\"Self\",\"SystemInfo\":\"TRUE\",\"Message\":\"Valid user\",\"UserId\":\"1\",\"FirstName\":\"Self\",\"IsWingsJob\":true,\"FullName\":\"\",\"UP_Auth_Key\":\"4367877B8E3E\",\"LastLogin\":\"03-JUL-18 01:08:22 pm\",\"CircleCode\":\"-1\",\"AgentUserType\":\"\",\"CircleShortCode\":\"Self\",\"Activation_MobileNo\":\"\",\"CircleZoneCode\":\"NZ\",\"UserCode\":\"\",\"SSACode\":\"Self\",\"DBLink\":\"SIMNORTH\",\"UserFlag\":\"-1\",\"MobileNumber\":\"\",\"EmailID\":\"self@self.com\",\"BODbLink\":\"\",\"ZoneID\":\"-1\",\"ProcessPermissionsObj\":{\"MOBILE_ACC_FLAG\":\"1\",\"THICK_ACC_FLAG\":\"1\",\"M_KYC\":\"1\",\"M_EKYC\":\"1\",\"M_EVISA\":\"1\",\"T_KYC\":\"1\",\"T_EKYC\":\"1\",\"T_EVISA\":\"1\"},\"LangID\":\"\",\"UserName\":\"Self\",\"SeqNumber\":0,\"AadharMaxLimit\":5,\"AadharRevModEnableFlag\":\"TRUE\",\"MobileLogsDownloadFlag\":0,\"ThickLogsDownloadFlag\":0,\"LobType\":\"LL\",\"DeviceLocations\":{\"DeviceData\":{\"SecureGen_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/SecuGen_32.zip\",\"SecureGen_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/SecuGen_64.zip\",\"Startech_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/Startek_32.zip\",\"Startech_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/Startek_64.zip\",\"Morpho_safran_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/marpho_32.zip\",\"Morpho_safran_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/marpho_64.zip\",\"Mantra_32\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Device_32bit/Mantra_32.zip\",\"Mantra_64\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_64bit/Mantra_64.zip\",\"Startech_XP\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_XP/Startek_XP.zip\",\"Morpho_XP\":\"http://192.168.5.59:9090/BSNLThickWeb/DeviceDrivers/Devices_XP/Morpho_XP.zip\"}},\"FrachiseeAddress\":\"Self\",\"FranchiseeName\":\"Self\",\"City\":\"Self\",\"State\":\"Self\",\"FMSCircle\":\"Self\",\"FMSZone\":\"\",\"FMSSSACode\":\"Self\",\"FranchiseeInfo\":[],\"AadharNumbers\":[],\"MobileVersion\":\"2.4.3\",\"MobileAppDownloadURL\":\"http://downloads.intense.in/Generic_BSNL_New_Theme.apk\",\"RoleNames\":\"Self\",\"ReqProcessedTime\":1530608252211}}";
            JSONObject response = (JSONObject) JSONSerializer.toJSON(strRespData);;
//            JSONObject response = client.restClient(UniPackURL, inputFieldsEntityJson.toString(), "UNIPACK");
//            JSONObject dummyInput = new JSONObject();
//            try {
//                for (Iterator<String> iterator = response.getJSONObject("Data").keys(); iterator.hasNext();) {
//                    String key = iterator.next();
//                    String value = (String) response.getString(key);
//                    if (key.equalsIgnoreCase("AadharNumbers") || key.equalsIgnoreCase("LoginAadharNo")) {
//                        //don't do any thing
//                    } else {
//                        dummyInput.put(key, value);
//                    }
//                }
//
//            } catch (Exception ex) {//               
//                prLog("Exception in preparing clone of login response with out Aadhhar numbers ::: " , ex);
//                //TODO process exception
//            }
            prDebug("Response for LoginAuthentication service :: " + response);
            JSONObject respMsg = response.getJSONObject("Data");
//            if (response.isEmpty()) {
//                prInfo(":::::::::::::::::Login method Response from Server is Empty::::::::::::::::");
////                prDebug("UniPackURL is :: " + UniPackURL + " down");
//                setMessage("Service is down. Please try later");
//                returnVal = "FAIL";
//            }
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
                            deleteDir(sessionFolder);
                            sessionFolder.mkdirs();
                            session.setAttribute("SessionFilePath", sessionFolderPath);
                        } catch (Exception e) {
                            prLog("Exception in  session folder creation :: ", e);
                        }
                        prDebug("Session file path :: " + session.getAttribute("SessionFilePath"));
                    }
                } catch (Exception e) {
                    prLog("Exception in  [loginValidation] ::  ", e);
                }
                //Request for SLA services
//                try {
//                    prInfo("<----------------Response time sending to Unipack Audit Service  starts---------->");
////                    String serviceUrl = CRSAppResources.UP_URL.trim() + "/webresources/UserServices/LoginSLA";
//                    if (reqJson.getString("lobType").equalsIgnoreCase("MOB")) {
//
//                        inputFieldsEntityJson1 = new JSONObject();
//                        inputFieldsEntityJson1.put("AuditType", "Login");
//                        inputFieldsEntityJson1.put("DeviceType", "ThickClient");
//                        inputFieldsEntityJson1.put("UID", respMsg.getString("UserId"));
//                        inputFieldsEntityJson1.put("ZoneID", respMsg.getString("ZoneID"));
//                        inputFieldsEntityJson1.put("SSACode", respMsg.getString("SSACode"));
//                        inputFieldsEntityJson1.put("SSCode", respMsg.getString("UserCode"));
//                        inputFieldsEntityJson1.put("UserFlag", respMsg.getString("UserFlag"));
//                        inputFieldsEntityJson1.put("CircleCode", respMsg.getString("CircleCode"));
//                        inputFieldsEntityJson1.put("UserType", respMsg.getString("AgentUserType"));
//                        inputFieldsEntityJson1.put("ReqStartTime", respMsg.getString("ReqStartTime"));
//                        inputFieldsEntityJson1.put("ReqReachedTime", respMsg.getString("ReqReachedTime"));
//                        inputFieldsEntityJson1.put("ReqProcessedTime", respMsg.getString("ReqProcessedTime"));
//                        inputFieldsEntityJson1.put("ResponseRenderTime", Calendar.getInstance().getTime().getTime());
//
//                    } else {
//
//                        inputFieldsEntityJson1 = new JSONObject();
//                        inputFieldsEntityJson1.put("UserType", "");
//                        inputFieldsEntityJson1.put("AuditType", "Login");
//                        inputFieldsEntityJson1.put("DeviceType", "ThickClient");
//                        inputFieldsEntityJson1.put("UID", respMsg.getString("UserId"));
//                        inputFieldsEntityJson1.put("ZoneID", respMsg.getString("ZoneID"));
//                        inputFieldsEntityJson1.put("SSACode", respMsg.getString("FMSSSACode"));
//                        inputFieldsEntityJson1.put("UserFlag", respMsg.getString("UserFlag"));
//                        inputFieldsEntityJson1.put("CircleCode", respMsg.getString("CircleCode"));
//                        inputFieldsEntityJson1.put("ReqStartTime", respMsg.getString("ReqStartTime"));
//                        inputFieldsEntityJson1.put("ReqReachedTime", respMsg.getString("ReqReachedTime"));
//                        inputFieldsEntityJson1.put("ReqProcessedTime", respMsg.getString("ReqProcessedTime"));
//                        inputFieldsEntityJson1.put("ResponseRenderTime", Calendar.getInstance().getTime().getTime());
//
//                    }
//                    prDebug("UniPackURL for auditJobTransaction  LoginSLA :: " + serviceUrl);
//                    prDebug("inputFieldsEntityJson1 for auditJobTransaction  LoginSLA :: " + inputFieldsEntityJson1);
//
//                    JSONObject SLAResponse = client.restClient(serviceUrl, inputFieldsEntityJson1.toString(), "UNIPACK");
//                    prDebug("<---- Response time sending to Unipack Audit Service ends ---->" + SLAResponse);
//                } catch (Exception e) {//                    
//                    prLog("Exception in  Response time sending to Unipack Audit Service ::  ", e);
//                }

//                try {
//                    JSONObject tempdata = new JSONObject();
//                    String strResponseData = respMsg.toString();
//                    tempdata = (JSONObject) JSONSerializer.toJSON(strResponseData);
//                    if (tempdata.containsKey("AadharNumbers")) {
//                        prInfo(":::Login Success response is:::::tempdata: AadharNumbers key is avilabel");
//                        tempdata.remove("AadharNumbers");
//                    } else {
//                        prInfo(":::Login Success response is:::::tempdata: AadharNumbers key is not avilabel");
//                    }
//                    if (tempdata.containsKey("LoginAadharNo")) {
//                        prInfo(":::Login Success response is:::::tempdata: LoginAadharNo key is avilabel");
//                        tempdata.remove("LoginAadharNo");
//                    } else {
//                        prInfo(":::Login Success response is:::::tempdata: LoginAadharNo key is not avilabel");
//                    }
////                        tempdata.remove("AadharNumbers");
//                    prDebug(":::Login Success response is:::::tempdata : " + tempdata);
//                } catch (Exception e) {//                    
//                    prLog("Exception in login response printing without aadhar details " , e);
//                }
//                try {
//                    long millis = System.currentTimeMillis();
//                    String sessionFolderPath = CRSAppResources.REPOSITORY_PATH + File.separator + "SessionFiles" + File.separator + userName + "_" + millis;
//                    File sessionFolder = new File(sessionFolderPath);
//                    if (!sessionFolder.exists()) {
//                        sessionFolder.mkdirs();
//                        session.setAttribute("SessionFilePath", sessionFolderPath);
//                    } else {
//                        try {
//                            deleteDir(sessionFolder);
//                            sessionFolder.mkdirs();
//                            session.setAttribute("SessionFilePath", sessionFolderPath);
//                        } catch (Exception e) {//                            
//                            prLog("Exception in  session folder creation ", e);
//                        }
//                        prDebug("Session file path :: " + session.getAttribute("SessionFilePath"));
//                    }
//                } catch (Exception e) {//                   
//                    prLog("Exception in  loginValidation method::::  " , e);
//                }
//                respMsg.put("browserId", browserId);
                session.setAttribute("RegMobNum",  reqJson.getString("RegMobNum"));
                respMsg.put("USER_REQ_ID", userReqId);
                respMsg.put("lobType", reqJson.optString("lobType", "WINGS"));
                respMsg.put("FMSZone", reqJson.getString("zone"));
                respMsg.put("State", reqJson.getString("state"));
                respMsg.put("RegMobNum", reqJson.getString("RegMobNum"));
                session.setAttribute("loginResponse", respMsg);
//                if (reqJson.getString("lobType").equalsIgnoreCase("MOB")) {//for mobility
//                    String formFiledVal = loginFormFields(userName);
//                    prDebug("Response from loginFormFields :: " + formFiledVal);
//                } else {
//                    String formFiledVal = loginFormFieldsForFMS(lobType);
//                    prDebug("Response from loginFormFields :: " + formFiledVal);
//                }
                String formFiledVal = loginFormFieldsForFMS(lobType);
                session.setAttribute("Client_level_session", "starts");
//                session.setAttribute("Password", password);
//                session.setAttribute("BID", browserId);
                session.setAttribute("USER_REQ_ID", userReqId);
                returnVal = "SUCCESS";
            }
//            else if (response.getString("Status").equals("FirstLogin")) {
//                //Request for SLA services
//                String serviceUrl = "";
//                try {
//                    prInfo("<----------------Response time sending to Unipack Audit Service  starts---------->");
//                    serviceUrl = CRSAppResources.UP_URL.trim() + "/webresources/UserServices/LoginSLA";
//                    String inputFieldsEntity1 = "{\"AuditType\":\"Login\",\"ReqStartTime\":'" + response.getString("ReqStartTime") + "',\"ResponseRenderTime\":'" + Calendar.getInstance().getTime().getTime() + "',\"ReqReachedTime\":'" + response.getString("ReqReachedTime") + "',\"ReqProcessedTime\":'" + response.getString("ReqProcessedTime") + "',\"DeviceType\":\"" + "ThickClient" + "\",\"UID\":'" + response.getString("UserId") + "',\"CircleCode\":'\"\"',\"ZoneID\":'\"\"',\"SSACode\":'\"\"',\"SSCode\":'\"\"',\"UserFlag\":'\"\"',\"UserType\":'\"\"'}";
////                                    String inputFieldsEntity = "{CIRCLE_CODE:" + CRSSession.getInstance().getAttribute("CircleCode") + ",connection_type:' 1 '}";
//                    prDebug("<---auditJobTransaction Service inputFieldsEntity  ----------------->" + inputFieldsEntity1);
//                    JSONObject SLAResponse = client.restClient(serviceUrl, inputFieldsEntity1, "UNIPACK");
//                    prDebug("<---Response time sending to Unipack Audit Service ends ----------------->" + SLAResponse);
//                } catch (Exception e) {//                   
//                    prLog("Exception in  Response time sending to Unipack Audit Service ::::  " , e);
//                }
//
//                prInfo("Login method FirstLogin Option");
//                respMsg.put("LoginID", userName);
//                session.setAttribute("loginResponse", respMsg);
//                return "FirstLogin";
//            } else if (response.getString("Status").equals("PasswordChange")) {
//
//                prInfo("Login method PasswordChange Option");
//                String changePswdData = response.getString("Data");
//                JSONObject changePWDObj = (JSONObject) JSONSerializer.toJSON(changePswdData);
//                prDebug("Login method PasswordChange Option message  " + changePWDObj.getString("Message"));
//                respMsg.put("LoginID", userName);
//                session.setAttribute("loginResponse", respMsg);
//                return "PasswordChange";
//            } else {
//
//                JSONObject failResponse = response.getJSONObject("Data");
//                if (failResponse.containsKey("Message") || (!failResponse.getString("Message").equalsIgnoreCase("Unable to process your request"))) {
//                    final String failMessage = failResponse.getString("Message");
//                    if (failMessage.equalsIgnoreCase("User already logged with this User.")) {
////                           
//                        returnVal = "USER_LOGGED_IN";
//                    } else {
//                        setMessage(respMsg.getString("Message"));
//                        returnVal = "FAIL";
//                    }
//                }
//                respMsg.put("LoginID", userName);
//                session.setAttribute("loginResponse", respMsg);
//            }

//                    prDebug(":::Login Success response is::::::" + respMsg);
//                    prDebug(":::Login Success response Data Object is::::::" + respMsg);
//                    prDebug(":::::::::::::::::::::Adhar Number is::::::::::\t" + respMsg.getString("AadharNumbers"));
            //for FMS keys
            //Session keys for login
//            if (reqJson.getString("lobType").equalsIgnoreCase("MOB")) {//for mobility specific keys
//                session.setAttribute("Attach_Optional_Flag", respMsg.getString("Thick_ImageShow_Flag"));
//                session.setAttribute("AGENT_NAME_SS", respMsg.getString("DealerName"));
//                session.setAttribute("AadharRevModEnableFlag", respMsg.getString("AadharRevModEnableFlag"));
//                session.setAttribute("UserCode", respMsg.getString("UserCode"));
//                session.setAttribute("EKYC_CHECK", respMsg.getString("SSALevelCheck"));//SSALevelCheck respMsg.getString("FirstName"));
//                session.setAttribute("ReferenceNumber", respMsg.getString("ReferenceNumber"));
//                session.setAttribute("HRNO", respMsg.getString("HRNO"));
//                session.setAttribute("Designation", respMsg.getString("Designation"));
//                session.setAttribute("ACTIVATION_MOBILENO", respMsg.getString("Activation_MobileNo"));
//                session.setAttribute("SSAName", respMsg.getString("SSAName"));
//                session.setAttribute("SSACode", respMsg.getString("SSACode"));
//                session.setAttribute("SalesChannelID", respMsg.getString("SalesChannelID"));
//                session.setAttribute("MappingCode", respMsg.getString("MappingCode"));
//                session.setAttribute("AgentUserType", respMsg.getString("AgentUserType"));
//                session.setAttribute("MaxDedupCount", respMsg.getString("MaxDedupCount"));
//
//                try {
//                    session.setAttribute("CircleStates", respMsg.getJSONArray("CircleStates"));
//                    prDebug("circleStates:::::::::::::::::::::::::::" + session.getAttribute("CircleStates"));
////                        CircleStates
//                } catch (Exception e) {//                    
//                    prLog("Exception in CircleStates key getting " , e);
//                }
//            } else {// for landline
//                session.setAttribute("FMSCircle", respMsg.getString("FMSCircle"));
//                session.setAttribute("FMSZone", respMsg.getString("FMSZone"));
//                session.setAttribute("FMSSSACode", respMsg.getString("FMSSSACode"));
//                session.setAttribute("ServiceInfo", respMsg.getString("FranchiseeInfo"));
//                session.setAttribute("FranchiseeName", respMsg.getString("FranchiseeName"));
//                session.setAttribute("FrachiseeAddress", respMsg.getString("FrachiseeAddress"));
//            }
//            session.setAttribute("AadharNumbers", respMsg.getJSONArray("AadharNumbers"));
//            session.setAttribute("LOBTYPE", reqJson.getString("lobType"));
//            session.setAttribute("UNIPACK_RES", respMsg);
//            session.setAttribute("LogOutSeqSno", respMsg.getString("SeqNumber"));//Sequence number
//            session.setAttribute("AadharMaxLimit", respMsg.getString("AadharMaxLimit"));//AadharMaxLimit
//            session.setAttribute("AadharLoginFlag", respMsg.getString("AadharLoginFlag"));//aadhaaroptinalFlag
//            if (respMsg.getString("AadharLoginFlag").equalsIgnoreCase("1")) {
//                session.setAttribute("LoginAadharNo", respMsg.getString("LoginAadharNo"));//LoginAadharNo 
//            }
//            session.setAttribute("CircleCode", respMsg.getString("CircleCode"));
//            session.setAttribute("UserId", respMsg.getString("UserId"));
//            session.setAttribute("FirstName", respMsg.getString("FirstName"));
//            session.setAttribute("UserName", reqJson.getString("userName"));
//            session.setAttribute("LoginID", respMsg.getString("LoginID"));
////                    System.out.println("Password is"+Password);
//            session.setAttribute("Password", reqJson.getString("password") );
//            session.setAttribute("CircleShortCode", respMsg.getString("CircleShortCode"));
//            session.setAttribute("CircleZoneTemp", "SE");
//            session.setAttribute("CircleZoneCode", respMsg.getString("CircleZoneCode"));
//            session.setAttribute("DBLink", respMsg.getString("DBLink"));
//            session.setAttribute("BO_DBLink", respMsg.getString("BODbLink"));
//            session.setAttribute("UP_Auth_Key", respMsg.getString("UP_Auth_Key"));
//            session.setAttribute("UserFlag", respMsg.getString("UserFlag"));
//            session.setAttribute("MobileNumber", respMsg.getString("MobileNumber"));
//            session.setAttribute("EmailID", respMsg.getString("EmailID"));
//            session.setAttribute("ZoneID", respMsg.getString("ZoneID"));
/* DeviceLocations key set*/
//            try {
//                String deviceData = respMsg.getJSONObject("DeviceLocations").getJSONObject("DeviceData").toString();
//                prDebug("Device Data\t" + deviceData);
//                String networkIp = CRSResourcesInfo.getAppSettingsProperty("REGISTERED_NETWORK_IP");
//                prDebug("Device Drivers URL\t" + networkIp);
//                String finalDeviceData = deviceData.replaceAll("@@NWIP@@", networkIp);
//                session.setAttribute("DeviceLocations", finalDeviceData);
//                prDebug("DeviceLocations After Convertion:::::::::::::::::::::::::::" + finalDeviceData);
////                        DeviceLocations
//            } catch (Exception e) {//               
//                prLog("Exception in DeviceLocations key getting " , e);
//            }
            //Process Permissions
//            JSONObject processPerJOBJ = respMsg.getJSONObject("ProcessPermissionsObj");
////                    System.out.println("processPerJOBJ ::::" + processPerJOBJ);
//            prDebug("processPerJOBJ ::::" + processPerJOBJ);
////                    System.out.println("T_KYC ::::" + processPerJOBJ.getString("T_KYC") + "::: T_EKYC :::: " + processPerJOBJ.getString("T_EKYC") + ":::: T_EVISA:::: " + processPerJOBJ.getString("T_EVISA"));
//            prDebug("T_KYC ::::" + processPerJOBJ.getString("T_KYC") + "::: T_EKYC :::: " + processPerJOBJ.getString("T_EKYC") + ":::: T_EVISA:::: " + processPerJOBJ.getString("T_EVISA"));
//            session.setAttribute("T_KYC", processPerJOBJ.getString("T_KYC"));
//            session.setAttribute("T_EKYC", processPerJOBJ.getString("T_EKYC"));
//            session.setAttribute("T_EVISA", processPerJOBJ.getString("T_EVISA"));
//
//            String folderName = "";
//            try {
//                folderName = System.currentTimeMillis() + "";
//                session.setAttribute("tempFolderName", folderName);
//                File folder = new File(session.getAttribute("WorkingFolder") + "/SessionFiles/" + folderName);
//
//                if (!folder.exists()) {
//                    boolean status = folder.mkdirs();
//                    prDebug(folder.getName() + " Creation status :::::::::::" + status);
//                }
//            } catch (Exception e) {
//                prLog("Exception in " + folderName + " folder Creation::::  " , e);
//
//            }
//
//            if (respMsg.containsKey("LastLogin")) {
//                session.setAttribute("LastLogin", respMsg.getString("LastLogin"));
//            }

            /*
             Client information capture while we excute GetSystemDetails.class
             */
//            try {
//                if (!respMsg.getString("ThickClassBinaryData").equals("")) {
//                    prDebug("Starts the analysis of client machine");
//                    String data = respMsg.getString("ThickClassBinaryData");
//                    byte[] decodeRaWData = Base64.decodeBase64((String) data);
//                    String tempFolderPath = (String) session.getAttribute("WorkingFolder");
//                    String filePath = tempFolderPath + "GetSystemDetails.class";
//                    FileOutputStream fos = new FileOutputStream(filePath);
//                    fos.write(decodeRaWData);
//                    fos.close();
//                    ExecuteClsThread th1 = new ExecuteClsThread();
//                    th1.start();
//                }
//            } catch (Exception e) {
//                prLog("Exception in  Login method in ThickClassBinaryData key check::::  " , e);
//            }

            /* Thick client logs download bloack*/
//            try {
//                if (respMsg.getString("ThickLogsDownloadFlag").equals("1")) {
//                    prDebug("ThickLogsDownloadFlag is : " + respMsg.getString("ThickLogsDownloadFlag"));
//                    CRSThickLogSenderThread t = new CRSThickLogSenderThread();
//                    t.start();
//                }
//            } catch (Exception e) {//               
//                prLog("Exception in  Login method in ThickLogsDownloadFlag key check:::  " + sw.toString());
//            }

            /* Thick client SystemInfo capture block*/
//            try {
//                if (respMsg.getString("SystemInfo").equalsIgnoreCase("TRUE")) {
//                    prDebug("SystemInfo is : " + respMsg.getString("SystemInfo"));
//                    CRSSystemInfoThread t = new CRSSystemInfoThread();
//                    t.start();
//                }
//            } catch (Exception e) {              
//                prDebug("Exception in  Login method in SystemInfo key check:::  " + sw.toString());
//            }
        } catch (Exception e) {
            prLog("Exception in  [CRSLoginValidator][loginValidation] ::  ", e);
        }
        prInfo("[CRSLoginValidator][loginValidation] END");
        return returnVal;
    }

    public String logoutUser() {
        prInfo("[CRSLoginValidator][logoutUser] START");
        String logoutStatus = "fail";
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for LogoutUser service is :: " + reqJson);
            String userName = reqJson.getString("userName");

            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            String seqNum = loginResponse.getString("SeqNumber");

            String UniPackURL = CRSAppResources.UP_URL.trim() + "/webresources/UserServices/LogoutUser";

            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("UserName", userName);
            inputFieldsEntityJson.put("SeqNumber", seqNum);

            prDebug("UniPackURL for LogoutUser service in logoutUser method :: " + UniPackURL);
            String AadharLoginFlag = loginResponse.getString("AadharLoginFlag");
            if (AadharLoginFlag.equalsIgnoreCase("0")) {
                prDebug("inputFieldsEntityJson for LogoutUser service in logoutUser method :: " + inputFieldsEntityJson);
            }
            //Calling Service.....
            JSONObject response = client.restClient(UniPackURL, inputFieldsEntityJson.toString(), "UNIPACK");
            prDebug("Response from LogoutUser service in logoutUser method :: " + response);
//            if (response.getString("Status").equals("success")) {
            if (session != null) {
                try {
                    String sessionFilePath = (String) session.getAttribute("SessionFilePath");
                    if (!sessionFilePath.equalsIgnoreCase("") || !sessionFilePath.equalsIgnoreCase(null)) {
                        File sessionFolder = new File(sessionFilePath.toString());
                        if (!sessionFolder.exists()) {
                        } else {
                            try {
                                deleteDir(sessionFolder);
                                clearSession();
                            } catch (Exception e) {
                                prLog("Exception in  session folder deletion in logout user ", e);
                            }
                        }
                    }
                } catch (Exception e) {
                    prLog("Exception in  [logoutUser] ::  ", e);
                }
                session.invalidate();
                prInfo("session invalidated in logoutUser method");
            }
            logoutStatus = "SUCCESS";
//            } else {
//                logoutStatus = "SUCCESS";
//            }
        } catch (Exception e) {
            prLog("Exception in  [CRSLoginValidator][logoutUser] ::  ", e);
        }
        prInfo("[CRSLoginValidator][logoutUser] END");
        return logoutStatus;
    }

    public String loginFormFields(String username) {
        prInfo("[CRSLoginValidator][loginFormFields] START");
        String outPutValue = "";
        JSONObject loginResponse = null;
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            loginResponse = (JSONObject) session.getAttribute("loginResponse");

            String AadharLoginFlag = loginResponse.getString("AadharLoginFlag");
            if (AadharLoginFlag.equalsIgnoreCase("0")) {
                prDebug("Request parameter User Name is :: " + username);
            }
            String userFromsession = loginResponse.getString("LoginID");
            if (AadharLoginFlag.equalsIgnoreCase("0")) {
                prDebug("User Name From session :: " + userFromsession);
            }
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/OnboardIntegrationService/getFormFieldsForThick";
            // String serviceURL = "http://rsweb29:2020/OnboardService/bsnl/OnboardIntegrationService/getFormFieldsForThick";

//            double templateVersion = CRSIndexTemplates.getLocalTemplateVersion();
            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("SOURCE", "TH");
            inputFieldsEntityJson.put("CAF_TYPE", "DE");
            inputFieldsEntityJson.put("USER_ID", userFromsession);
            inputFieldsEntityJson.put("DB_LINK", loginResponse.getString("DBLink"));
            inputFieldsEntityJson.put("VERSION_FROM_THICK_REQUEST", "0");
            inputFieldsEntityJson.put("SSA_CODE", loginResponse.getString("SSACode"));
            inputFieldsEntityJson.put("BO_DBLink", loginResponse.getString("BODbLink"));
            inputFieldsEntityJson.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));

            prDebug("UniPackURL for [loginFormFields] :: " + serviceURL);
            if (AadharLoginFlag.equalsIgnoreCase("0")) {
                prDebug("inputFieldsEntityJson for [loginFormFields] :: " + inputFieldsEntityJson);
            } else {
//                prDebug("Input Fields Entity for login FormFields :: " + inputFieldsEntity1);
            }
            String formFieldsAndDesign = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntityJson.toString());
            JSONObject formFieldsJObj = (JSONObject) JSONSerializer.toJSON(formFieldsAndDesign);
            prDebug("Response for [loginFormFields] service :: " + formFieldsJObj);
            session.setAttribute("patanjaliMSG", formFieldsJObj.getString("Bundle_Plan_Msg"));
            session.setAttribute("ptanjaliMandatoryText", formFieldsJObj.getString("Bundle_Plan_Label"));
            /*
             Service Rturn Description For STATUS 
             STATUS - (0)  - Same Version Available In Local and Server
             STATUS - (1)  - New Verion
             STATUS - (-1) - Error Occurred In Service
             */
//            if (formFieldsJObj.getString("STATUS").equals("1")) {
//                formFieldsAndDesign = formFieldsJObj.getString("FIELDS_DESIGN");
//                CRSIndexTemplates.loadIndexTemplate(formFieldsJObj.getString("VERSION_NO"), formFieldsAndDesign);
//            }

            if (formFieldsJObj.containsKey("UPLOAD_IMG_SIZE")) {
//                CRSResourcesInfo.setImageSettingsProperty("IMAGESIZE", formFieldsJObj.getString("UPLOAD_IMG_SIZE"));
                session.setAttribute("IMAGESIZE", formFieldsJObj.getString("UPLOAD_IMG_SIZE"));
                prDebug("Getting the values for service. Image size is:::: " + formFieldsJObj.getString("UPLOAD_IMG_SIZE"));
            } else {
//                CRSResourcesInfo.setImageSettingsProperty("IMAGESIZE", "100");
                session.setAttribute("IMAGESIZE", "100");
                prInfo("UPLOAD_IMG_SIZE  key is not avilabel in service response.So we take the Defulat Image size  is::::100");
            }

            if (formFieldsJObj.containsKey("SESSION_TIMEOUT")) {
                String sessionTimeOut = formFieldsJObj.getString("SESSION_TIMEOUT");
                prDebug(":::::::::$$$$$$$$$$$Session Time Out$$$$$$$$$$$\t" + sessionTimeOut);
                session.setAttribute("SESSION_TIMEOUT", sessionTimeOut);
            }

            if (formFieldsJObj.containsKey("UPLOAD_IMG_RESOLUTION")) {
                JSONObject resolution = formFieldsJObj.getJSONObject("UPLOAD_IMG_RESOLUTION");
//                CRSResourcesInfo.setImageSettingsProperty("RES_MIN_WIDTH", resolution.getJSONObject("MIN").getString("WIDTH"));
//                CRSResourcesInfo.setImageSettingsProperty("RES_MIN_HEIGHT", resolution.getJSONObject("MIN").getString("HEIGHT"));
//                CRSResourcesInfo.setImageSettingsProperty("RES_MAX_WIDTH", resolution.getJSONObject("MAX").getString("WIDTH"));
//                CRSResourcesInfo.setImageSettingsProperty("RES_MAX_HEIGHT", resolution.getJSONObject("MAX").getString("HEIGHT"));
                session.setAttribute("RES_MIN_WIDTH", resolution.getJSONObject("MIN").getString("WIDTH"));
                session.setAttribute("RES_MIN_HEIGHT", resolution.getJSONObject("MIN").getString("HEIGHT"));
                session.setAttribute("RES_MAX_WIDTH", resolution.getJSONObject("MAX").getString("WIDTH"));
                session.setAttribute("RES_MAX_HEIGHT", resolution.getJSONObject("MAX").getString("HEIGHT"));
                prDebug("Getting the values for service. Image Resloution is :: " + formFieldsJObj.getString("UPLOAD_IMG_RESOLUTION"));
            } else {
//                CRSResourcesInfo.setImageSettingsProperty("RES_MIN_WIDTH", "640");
//                CRSResourcesInfo.setImageSettingsProperty("RES_MIN_HEIGHT", "480");
//                CRSResourcesInfo.setImageSettingsProperty("RES_MAX_WIDTH", "800");
//                CRSResourcesInfo.setImageSettingsProperty("RES_MAX_HEIGHT", "600");
                session.setAttribute("RES_MIN_WIDTH", "640");
                session.setAttribute("RES_MIN_HEIGHT", "480");
                session.setAttribute("RES_MAX_WIDTH", "800");
                session.setAttribute("RES_MAX_HEIGHT", "600");
                prInfo("UPLOAD_IMG_RESOLUTION  key is not avilabel in service response.So we take the Defulat RESOLUTION  is:::: Minmum Reslution is 640 X480 and Max Reslution is 800X600");
            }

            if (formFieldsJObj.containsKey("AADHAR_LICSNSE_KEY")) {
                String aadhaarLICkey = formFieldsJObj.getString("AADHAR_LICSNSE_KEY");
//                prDebug(":::::::::$$$$$$$$$$$aadhaarLICkey$$$$$$$$$$$\t" + aadhaarLICkey);
                session.setAttribute("AADHAR_LICSNSE_KEY", aadhaarLICkey);
            } else {
                prInfo(":::::::::AADHAR_LICSNSE_KEY key is not coming from OB service");
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
            //WEST ZONE ID
            if (formFieldsJObj.containsKey("WEST_ZONE_ID")) {
                String zoneID = formFieldsJObj.getString("WEST_ZONE_ID");
//                String zoneID = "2";
                session.setAttribute("WEST_ZONE_ID", zoneID);
            } else {
                prInfo(":::::::::WEST_ZONE_ID key is not coming from OB service");
//               session.setAttribute("AADHAR_LICSNSE_KEY", "MLfiUpPlshWPSwUsxsR9YF67asxQqivpRWnE5UTW1JaNwAGZOx7HfBk");
            }

            //ALLOW CAF TYPES
            if (formFieldsJObj.containsKey("WEST_ALOWD_CAFS")) {
                String allowCAFs = formFieldsJObj.getString("WEST_ALOWD_CAFS");
//                String allowCAFs = "CAF Entry Mobile,MNP,CYMN,Data Card";
                session.setAttribute("WEST_ALOWD_CAFS", allowCAFs);
            } else {
                prInfo(":::::::::WEST_ALOWD_CAFS key is not coming from OB service");
            }

            //Customertype Enable flag
            if (formFieldsJObj.containsKey("OUT_STATION_ENABLE")) {
                String custEnable = formFieldsJObj.getString("OUT_STATION_ENABLE");
                session.setAttribute("OUT_STATION_ENABLE", custEnable);
            } else {
                session.setAttribute("OUT_STATION_ENABLE", "FALSE");
                prInfo(":::::::::OUT_STATION_ENABLE key is not coming from OB service");
            }

            //CYMN enable flag
            if (formFieldsJObj.containsKey("CYMN_SEARCH_ENABLE")) {
                session.setAttribute("CYMN_SEARCH_ENABLE", formFieldsJObj.getString("CYMN_SEARCH_ENABLE"));
            } else {
                session.setAttribute("CYMN_SEARCH_ENABLE", "FALSE");
            }
            //FRC ENABLE
            if (formFieldsJObj.containsKey("FRC_ENABLE")) {
                session.setAttribute("FRC_ENABLE", formFieldsJObj.getString("FRC_ENABLE"));
            } else {
                session.setAttribute("FRC_ENABLE", "FALSE");
            }
            //FANCY ENABLE
            if (formFieldsJObj.containsKey("FANCY_ENABLE")) {
                session.setAttribute("FANCY_ENABLE", formFieldsJObj.getString("FANCY_ENABLE"));
            } else {
                session.setAttribute("FANCY_ENABLE", "FALSE");
            }
            //IS_FRC_MANDATE
            if (formFieldsJObj.containsKey("IS_FRC_MANDATE")) {
                session.setAttribute("IS_FRC_MANDATE", formFieldsJObj.getString("IS_FRC_MANDATE"));
            } else {
                session.setAttribute("IS_FRC_MANDATE", "FALSE");
            }
            //AIRCEL_MNP_CODE
            if (formFieldsJObj.containsKey("AIRCEL_MNP_CODE")) {
                session.setAttribute("AIRCEL_MNP_CODE", formFieldsJObj.getString("AIRCEL_MNP_CODE"));
            } else {
                session.setAttribute("AIRCEL_MNP_CODE", "AIRCEL (DISHNET WIRELESS)(D)");
            }
            //AIRCEL_MNP_CODE
            if (formFieldsJObj.containsKey("AIRCEL_MNP_MSG")) {
                session.setAttribute("AIRCEL_MNP_MSG", formFieldsJObj.getString("AIRCEL_MNP_MSG"));
            } else {
                session.setAttribute("AIRCEL_MNP_MSG", "Aircel MNP not allowed. Please contact nearest CSC");
            }
            //GSPS_SSA_CODE
            if (formFieldsJObj.containsKey("GSPS_SSA_CODE")) {
                if (formFieldsJObj.getString("GSPS_SSA_CODE").equalsIgnoreCase(loginResponse.getString("SSACode"))) {
                    session.setAttribute("GSPS_APPRV_CSC", "true");
                } else {
                    session.setAttribute("GSPS_APPRV_CSC", "false");
                }
            } else {
                session.setAttribute("GSPS_APPRV_CSC", "false");
            }
            //BP_ALLOWED_CIRCLES
            String circle_Code = loginResponse.getString("CircleCode");
            String bpAllowFlg = "false";
            if (formFieldsJObj.containsKey("BP_ALLOWED_CIRCLES")) {
                JSONArray bpplanJarr = formFieldsJObj.getJSONArray("BP_ALLOWED_CIRCLES");
                for (int i = 0; i < bpplanJarr.size(); i++) {
                    String bpPlan = (String) bpplanJarr.get(i);
                    if (circle_Code.equalsIgnoreCase(bpPlan)) {
                        bpAllowFlg = "true";
                    } else {
                    }
                }
                session.setAttribute("BP_ALLOWED_FLAG", bpAllowFlg);
            } else {
                session.setAttribute("BP_ALLOWED_FLAG", bpAllowFlg);
                prDebug(" is not there in service response.");
            }

            session.setAttribute("CSCUSers", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("csc_mapping_code").toString());
            session.setAttribute("donor_circle", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("donor_circle").toString());
            session.setAttribute("prev_optr", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("prev_optr").toString());
            session.setAttribute("BP_PLANS_DATA", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("BP_PLANS").toString());
            session.setAttribute("DD_DATA", formFieldsJObj.getJSONObject("DD_DATA"));

            //System.out.println("BP_PLANS_DATA::::" + session.getAttribute("BP_PLANS_DATA"));
//            if (formFieldsJObj.getJSONObject("DD_DATA").containsKey("tariff_plan")) {
//               session.setAttribute("tariff_plan_PostPaid", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("tariff_plan").toString());
//               session.setAttribute("tariff_plan_POST", formFieldsJObj.getJSONObject("DD_DATA").getJSONArray("tariff_plan"));
//            } else {
//                prDebug(":::: tariff_plan key is not avilabel in reponse ::::::");
//            }
//            tariff_plan
            outPutValue = "success";

        } catch (Exception ex) {
            outPutValue = "fail";
            prLog("Error ocurrd in [CRSLoginValidator][loginFormFields] :: ", ex);
        }
        prInfo("[CRSLoginValidator][loginFormFields] END");
        return outPutValue;
    }

    public String clearSession() {
        try {
            prInfo("[CRSLoginValidator][clearSession] START");
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            if (session != null) {
                Enumeration enm = session.getAttributeNames();
                while (enm.hasMoreElements()) {
                    String sessionKey = (String) enm.nextElement();
                    if (sessionKey.equalsIgnoreCase("loginResponse") || sessionKey.equalsIgnoreCase("AADHAR_LICSNSE_KEY") || sessionKey.equalsIgnoreCase("WEST_ZONE_ID")
                            || sessionKey.equalsIgnoreCase("WEST_ALOWD_CAFS") || sessionKey.equalsIgnoreCase("OUT_STATION_ENABLE") || sessionKey.equalsIgnoreCase("CYMN_SEARCH_ENABLE")
                            || sessionKey.equalsIgnoreCase("FRC_ENABLE") || sessionKey.equalsIgnoreCase("CSCUSers") || sessionKey.equalsIgnoreCase("Password") || sessionKey.equalsIgnoreCase("SessionFilePath")
                            || sessionKey.equalsIgnoreCase("donor_circle") || sessionKey.equalsIgnoreCase("prev_optr") || sessionKey.equalsIgnoreCase("KYCType") || sessionKey.equalsIgnoreCase("FANCY_ENABLE")
                            || sessionKey.equalsIgnoreCase("IS_FRC_MANDATE") || sessionKey.equalsIgnoreCase("BID") || sessionKey.equalsIgnoreCase("USER_REQ_ID") || sessionKey.equalsIgnoreCase("DD_DATA")
                            || sessionKey.equalsIgnoreCase("RES_MIN_WIDTH")
                            || sessionKey.equalsIgnoreCase("RES_MIN_HEIGHT")
                            || sessionKey.equalsIgnoreCase("RES_MAX_WIDTH")
                            || sessionKey.equalsIgnoreCase("RES_MAX_HEIGHT")
                            || sessionKey.equalsIgnoreCase("FMS_ATTACH_SHOW_HIDE")
                            || sessionKey.equalsIgnoreCase("ekycformFieldsMetaData")
                            || sessionKey.equalsIgnoreCase("FMS_ATTACHMENTS_OPTNL")
                            || sessionKey.equalsIgnoreCase("ServiceInfo")
                            || sessionKey.equalsIgnoreCase("fmsDDData")
                            || sessionKey.equalsIgnoreCase("IMAGESIZE")
                            || sessionKey.equalsIgnoreCase("kycformFieldsMetaData")
                            || sessionKey.equalsIgnoreCase("kycFranchiseMetaData")
                            || sessionKey.equalsIgnoreCase("ekycFranchiseMetaData")
                            || sessionKey.equalsIgnoreCase("BP_PLANS_DATA")
                            || sessionKey.equalsIgnoreCase("BP_ALLOWED_FLAG")
                            || sessionKey.equalsIgnoreCase("patanjaliMSG")
                            || sessionKey.equalsIgnoreCase("JOB_STATUS")
                            || sessionKey.equalsIgnoreCase("AIRCEL_MNP_CODE")
                            || sessionKey.equalsIgnoreCase("AIRCEL_MNP_MSG")
                            || sessionKey.equalsIgnoreCase("GSPS_APPRV_CSC")
                            || sessionKey.equalsIgnoreCase("AADHAR_AC")
                            || sessionKey.equalsIgnoreCase("AADHAR_SA")
                            || sessionKey.equalsIgnoreCase("AADHAR_WADH")
                            || sessionKey.equalsIgnoreCase("AADHAR_ENV")
                            || sessionKey.equalsIgnoreCase("actual_lob")
                            || sessionKey.equalsIgnoreCase("Lobtype")
                            || sessionKey.equalsIgnoreCase("ptanjaliMandatoryText")) {
                    } else {
                        session.removeAttribute(sessionKey);
                        prDebug("removed session key is :: " + sessionKey);
                    }
                }
            }
        } catch (Exception ex) {
            prLog("Error ocurrd in [CRSLoginValidator][clearSession] :: ", ex);
        }
        prInfo("[CRSLoginValidator][clearSession] END");
        return "SUCCESS";
    }

    public boolean deleteDir(File dir) {
        prInfo("[deleteDir] START");
        try {
            if (dir.isDirectory()) {
                String[] children = dir.list();
                for (int i = 0; i < children.length; i++) {
                    boolean success = deleteDir(new File(dir, children[i]));
                    if (!success) {
                        return false;
                    }
                }
            }
            prInfo("Directory deleted successfully");
        } catch (Exception e) {
            prLog("Error ocurrd in [deleteDir] :: ", e);
        }
        prInfo("[deleteDir] END");

        return dir.delete();

    }

    public String hintQuestion() {
        prInfo("[CRSLoginValidator][hintQuestion] START");
        String retValue = "";
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("Request for ForgetPWD service is :: " + reqJson);
            String userName = reqJson.getString("userName");

            String UniPackURL = CRSAppResources.UP_URL;
//                    utils.gettingDataFromXML("UNIPACKURL");
            UniPackURL = UniPackURL.trim() + "/webresources/UserServices/FindUserHQ";

            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("UserName", userName);

            prDebug("UniPackURL for FindUserHQ service :: " + UniPackURL);
            prDebug("inputFieldsEntityJson for FindUserHQ service :: " + inputFieldsEntityJson);
            //Calling Service.....
            JSONObject response = new CRSClient().UPServicecall(UniPackURL, inputFieldsEntityJson.toString());
            prDebug("Response from FindUserHQ service :: " + response);

            if (response.getString("Status").equals("success")) {
                JSONObject hintQuestionResponse = response.getJSONObject("Data");
                String hintQuestion = hintQuestionResponse.getString("HintQuestion");
                setMessage(hintQuestion);
                prDebug("Hint Question is :: " + hintQuestion);
                retValue = "success";
            } else {
                JSONObject respMsg = response.getJSONObject("Data");
                setMessage(respMsg.getString("Message"));
                retValue = "success";
            }
        } catch (Exception e) {
            retValue = "fail";
            prLog("Exception in  [CRSLoginValidator][hintQuestion] ::  ", e);
        }
        prInfo("[CRSLoginValidator][hintQuestion] END");
        return retValue;
    }

    public String hintAnswer() {
        prInfo("[CRSLoginValidator][hintAnswer] START");
        String retValue = "FAIL";
        JSONObject msgresponse = null;
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            String UniPackURL = CRSAppResources.UP_URL;

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for ForgetPWD service is :: " + reqJson);
            String userName = reqJson.getString("userName");
            String hintQuestion = reqJson.getString("hintQuestion");
            String hintAnswer = reqJson.getString("hintAnswer");

            UniPackURL = UniPackURL.trim() + "/webresources/UserServices/ForgetPWD";
            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("UserName", userName);
            inputFieldsEntityJson.put("HintQuestion", hintQuestion);
            inputFieldsEntityJson.put("HintAnswer", hintAnswer);

            prDebug("UniPackURL for ForgetPWD service :: " + UniPackURL);
            prDebug("inputFieldsEntityJson for ForgetPWD service :: " + inputFieldsEntityJson);

            //Calling Service.....
            JSONObject responseObj = new CRSClient().UPServicecall(UniPackURL, inputFieldsEntityJson.toString());
            prDebug("Response from ForgetPWD is :: " + responseObj);

            if (responseObj.getString("Status").equals("success")) {
                msgresponse = responseObj.getJSONObject("Data");
                setMessage(msgresponse.getString("Message"));
                retValue = "SUCCESS";
            } else if (responseObj.getString("Status").equals("fail")) {
                msgresponse = responseObj.getJSONObject("Data");
                setMessage(msgresponse.getString("Message"));
                retValue = "FAIL";
            }
        } catch (Exception e) {
            prLog("Error ocurrd in [CRSLoginValidator][hintAnswer] :: ", e);
        }
        prInfo("[CRSLoginValidator][hintAnswer] END");
        return retValue;
    }

    public String updateChangePassword() {
        prInfo("[CRSLoginValidator][updateChangePassword] START");
        String retValue = "";
        JSONObject msgresponse = null;
        JSONObject responseObj = new JSONObject();
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession();
            String UniPackURL = CRSAppResources.UP_URL;

            JSONObject loginRes = (JSONObject) session.getAttribute("loginResponse");
            String username = loginRes.getString("LoginID");

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for ForgetPWD service is :: " + reqJson);
            String OldPwd = reqJson.getString("OldPwd");
            String NewPwd = reqJson.getString("NewPwd");

            String webservice = UniPackURL + "/webresources/UserServices/ChangePWD";

            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("UserName", username);
            inputFieldsEntityJson.put("OldPwd", OldPwd);
            inputFieldsEntityJson.put("NewPwd", NewPwd);

            prDebug("UniPackURL for ChangePWD service :: " + UniPackURL);
            prDebug("inputFieldsEntityJson for ChangePWD service :: " + inputFieldsEntityJson);

            responseObj = new CRSClient().UPServicecall(webservice, inputFieldsEntityJson.toString());
            prDebug("Response from ChangePWD : " + responseObj);
            msgresponse = responseObj.getJSONObject("Data");
            if (responseObj.getString("Status").equals("success")) {
//                setMessage(msgresponse.getString("Message"));
                retValue = "SUCCESS";
            } else if (responseObj.getString("Status").equals("fail")) {
                setMessage(msgresponse.getString("Message"));
                retValue = "FAIL";
            }
        } catch (Exception e) {
            prLog("Exception in [CRSLoginValidator][updateChangePassword] ::  ", e);
        }
        prInfo("[CRSLoginValidator][updateChangePassword] END");
        return retValue;
    }

    public String preferedUpdate() {
        prInfo("[CRSLoginValidator][preferedUpdate] START");
        String retValue = "FAIL";
        JSONObject resSerObj = null;
        JSONObject inputFieldsEntityJson = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession();
            String UniPackURL = CRSAppResources.UP_URL;

            JSONObject loginRes = (JSONObject) session.getAttribute("loginResponse");
            String username = loginRes.getString("LoginID");

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for ForgetPWD service is :: " + reqJson);
            String oldPswd = reqJson.getString("oldPswd");
            String newPswd = reqJson.getString("newPswd");
            String hintQuestion = reqJson.getString("hintQuestion");
            String hintAnswer = reqJson.getString("hintAnswer");

            String deviceRegistrationUrl = CRSAppResources.UP_URL;
            deviceRegistrationUrl = deviceRegistrationUrl.trim() + "/webresources/UserServices/UpdatePreferences";

            inputFieldsEntityJson = new JSONObject();
            inputFieldsEntityJson.put("UserName", username);
            inputFieldsEntityJson.put("OldPwd", oldPswd);
//            inputFieldsEntityJson.put("NewPwd", newPswd);
            inputFieldsEntityJson.put("HintQuestion", hintQuestion);
            inputFieldsEntityJson.put("HintAnswer", hintAnswer);

            prDebug("UniPackURL for UpdatePreferences service :: " + UniPackURL);
            prDebug("inputFieldsEntityJson for UpdatePreferences service :: " + inputFieldsEntityJson);

            resSerObj = new CRSClient().UPServicecall(deviceRegistrationUrl, inputFieldsEntityJson.toString());
            prInfo("Response from UpdatePreferences service :: " + resSerObj);

            if (resSerObj.getString("Status").equals("success")) {
                prInfo("::::::::::::::::::Prefered Updated Successfully::::::::::::::::::::::");
                retValue = "SUCCESS";
            } else if (resSerObj.getString("Status").equals("fail")) {
                JSONObject msgresponse = resSerObj.getJSONObject("Data");
                setMessage(msgresponse.getString("Message"));
                prInfo("::::::::::::::::::Prefered Update Fail::::::::::::::::::::::");
                retValue = "FAIL";
            }
        } catch (Exception e) {
            retValue = "FAIL";
            setMessage("Unable to process your request");
            prLog("Exception in  [CRSLoginValidator][preferedUpdate]  ::  ", e);
        }
        prInfo("[CRSLoginValidator][preferedUpdate] END");
        return retValue;
    }

    public String loginFormFieldsForFMS(String lobType) {
        prInfo("[CRSLoginValidator][loginFormFieldsForFMS] START");
        String outPutValue = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
//            String strReqData = request.getParameter("reqData");
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
//            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadFMSDesign";
            prDebug("onBoardURL in loginFormFieldsForFMS method is :: " + serviceURL);

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

            prDebug("input request for getting loginFormFieldsForFms data to service :: " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            prDebug("output response from service for getting loginFormFieldsForFms data :: " + strJobsCurrentStatus);
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
            prLog("Exception occured in [CRSLoginValidator][loginFormFieldsForFMS] :: ", e);
//            response.setSuccess(false);
//            response.setMessage("Exception occured in [CRSLoginValidator][loginFormFieldsForFMS]");
        }
        prInfo("[CRSLoginValidator][loginFormFieldsForFMS] END");
        return "success";
    }

    public String clearJobStatusSession() {
        try {
            prInfo("[CRSLoginValidator][clearJobStatusSession] START");
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            if (session != null) {
                session.removeAttribute("JOB_STATUS");
                prDebug("remove session key is::: JOB_STATUS");
            }
        } catch (Exception ex) {
            prLog("Error ocurrd in [CRSLoginValidator][clearJobStatusSession] :: ", ex);
        }
        prInfo("[CRSLoginValidator][clearJobStatusSession] END");
        return "SUCCESS";
    }

    public String loginValidationFrmSwitch() {
        try {
            prInfo("[CRSLoginValidator][loginValidationFrmSwitch] START");
            request = ServletActionContext.getRequest();
            session = request.getSession();

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            String userName = reqJson.getString("userName");
//            String password = reqJson.getString("password");
            String lobType = reqJson.getString("lobType");
            String actual_lob = reqJson.getString("actual_lob");
//            String browserId = reqJson.getString("browserId");

            session.setAttribute("Lobtype", lobType);
            setLOB(lobType);
            JSONObject modLoginResOBJ = new JSONObject();
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            System.out.println("loginResponse :: " + loginResponse);
            modLoginResOBJ = loginResponse;
            modLoginResOBJ.put("lobType", lobType);
            System.out.println("modLoginResOBJ :: " + modLoginResOBJ);
            session.setAttribute("loginResponse", modLoginResOBJ);
            session.setAttribute("actual_lob", actual_lob);
            if (reqJson.getString("lobType").equalsIgnoreCase("MOB")) {//for mobility
                String formFiledVal = loginFormFields(userName);
                prDebug("Response from loginValidationFrmSwitch :: " + formFiledVal);
            } else {
                String formFiledVal = loginFormFieldsForFMS(lobType);
                prDebug("Response from loginValidationFrmSwitch :: " + formFiledVal);
            }
        } catch (Exception ex) {
            prLog("Error ocurrd in [CRSLoginValidator][loginValidationFrmSwitch] :: ", ex);
        }
        prInfo("[CRSLoginValidator][loginValidationFrmSwitch] END");
        return "SUCCESS";
    }

    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String strMsg) {
        AppLogger.error(strMsg);
    }

    private void prLog(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }
}
