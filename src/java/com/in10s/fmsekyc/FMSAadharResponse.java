/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmsekyc;

/**
 *
 * @author swaroopeshwar
 */
import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSResourcesInfo;

import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
//import javafx.application.Platform;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.codec.binary.Base64;
import org.apache.struts2.ServletActionContext;
import static org.apache.struts2.ServletActionContext.getServletContext;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;
import sun.misc.BASE64Decoder;

public class FMSAadharResponse {

    String onBoardURL = CRSAppResources.ONBOARD_URL;

    public String prepareKYCData(String data, String type, String basePath) {
//        JSONObject result = new JSONObject();
        String req = "", result = "";
        try {
            req = readFileAsString(basePath + "/" + type);
            byte[] bytesEncoded = Base64.encodeBase64(data.getBytes());
            result = new String(bytesEncoded);

            req = req.replace("$$BASE64_AUTH_XML$$", result);
            AppLogger.debug("Encrypted PID::" + req);

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  prepare KYC authuntication :::  " + sw.toString());
        }
        return req;
    }
    HttpSession session = null;
    HttpServletRequest httprequest = null;
    JSONObject loginResponse = null;

    public JSONObject prepareXMLData(String uid, String UDC, JSONObject fmrData, String type, String basePath, String AuthenticateType) {
        JSONObject resJson = new JSONObject();
        String req = "";
        try {
            httprequest = ServletActionContext.getRequest();
            session = httprequest.getSession(false);
            req = readFileAsString(basePath + File.separator + type);
            AppLogger.debug("req:::::" + req);
            if (AuthenticateType.equalsIgnoreCase("Summary_Subscriber")) {//customer_declaration
//                uid = (String) session.getAttribute("CUST_TOKEN");
                uid = (String) session.getAttribute("SubscriberAadhar");
            } else if (AuthenticateType.equalsIgnoreCase("agent_declaration")) {//agent_declaration
//                uid = (String) session.getAttribute("POS_TOKEN");
                JSONObject AgentDetials = (JSONObject) session.getAttribute("AgentAadharResponse");
                uid = AgentDetials.getString("UidData_uid");
            } else {
//                uid = uid;
            }

//expecting keys 
            req = req.replace("$$AC$$", (String) session.getAttribute("AADHAR_AC"));//AADHAR_AC
            req = req.replace("$$LK$$", (String) session.getAttribute("AADHAR_LICSNSE_KEY"));//AADHAR_LICSNSE_KEY
//            req = req.replace("$$LK$$", "MLfiUpPlshWPSwUsxsR9YF67asxQqivpRWnE5UTW1JaNwAGZOx7HfBk");
            req = req.replace("$$SA$$", (String) session.getAttribute("AADHAR_SA"));//AADHAR_SA
            String txn = "UKC:0000960000:";//UserId_UserName_4 digit Randomnumber(Pending)
            String UserId = (String) loginResponse.getString("UserId");
            txn += new Date().getTime();
            //            AppLogger.debug(" Transection id is: " + txn);
            req = req.replace("$$TXN$$", txn + UserId);
            req = req.replace("$$UID$$", uid);

            req = req.replace("$$DC$$", fmrData.getString("dc"));
            req = req.replace("$$DPID$$", fmrData.getString("dpId"));
            req = req.replace("$$MC$$", fmrData.getString("mc"));
            req = req.replace("$$MI$$", fmrData.getString("mi"));
            req = req.replace("$$RDSID$$", fmrData.getString("rdsId"));
            req = req.replace("$$RDSVER$$", fmrData.getString("rdsVer"));
//            req = req.replace("$$UDC$$", UDC);
            req = req.replace("$$CI$$", fmrData.getString("skey_ci"));
            req = req.replace("$$SKEY$$", fmrData.getString("skey_value"));
            req = req.replace("$$HMAC$$", fmrData.getString("Hmac"));
            req = req.replace("$$DATA$$", fmrData.getString("data"));
//            AppLogger.debug("after replace req:::::" + new CRSAuthenticate().Encrypt(req));
            resJson.put("xmlData", req);
//            resJson.put("pidData", pid.getTs().toString());

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  prepareXMLData in AadharReqPreparation :::  " + sw.toString());
        }
        return resJson;
    }
//

    public String readFileAsString(String fileName) throws FileNotFoundException, IOException {
        StringBuffer sb = new StringBuffer();

        FileReader reader = new FileReader(fileName);
        int len = 0;
        char[] ch = new char[4096];

        try {
            while ((len = reader.read(ch)) > 0) {
                sb.append(ch, 0, len);
            }
        } finally {
            if (reader != null) {
                reader.close();
            }
        }

        return sb.toString().trim();
    }
//    

    public static JSONObject getPIDData(String strPIDXML) {
        JSONObject aadharObj = new JSONObject();
        try {

            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(new InputSource(new StringReader(strPIDXML)));

            Element deviceInfoPrts = (Element) doc.getElementsByTagName("DeviceInfo").item(0);

            aadharObj.put("dpId", deviceInfoPrts.getAttribute("dpId"));
            aadharObj.put("rdsId", deviceInfoPrts.getAttribute("rdsId"));
            aadharObj.put("rdsVer", deviceInfoPrts.getAttribute("rdsVer"));
            aadharObj.put("mi", deviceInfoPrts.getAttribute("mi"));
            aadharObj.put("mc", deviceInfoPrts.getAttribute("mc"));
            aadharObj.put("dc", deviceInfoPrts.getAttribute("dc"));

            Element skeyPrts = (Element) doc.getElementsByTagName("Skey").item(0);
            aadharObj.put("skey_ci", skeyPrts.getAttribute("ci"));
            aadharObj.put("skey_value", skeyPrts.getTextContent());

            Element hMacPrts = (Element) doc.getElementsByTagName("Hmac").item(0);
            aadharObj.put("Hmac", hMacPrts.getTextContent());

            Element dataPrts = (Element) doc.getElementsByTagName("Data").item(0);
            aadharObj.put("data", dataPrts.getTextContent());
            AppLogger.debug("aadharObj :: " + aadharObj);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return aadharObj;
    }

    public JSONObject UDC(String DeviceName, String AadharNo, String fllowType, String PIDBlock, String authType, String AuthenticateType, String nxtHTML, String currentHTML, String DeviceSerialNumber, String UDC) {
        AppLogger.debug(":::::::::::::::Entered UDC in CRSAadharResponse::::::::::::::");
        JSONObject response = new JSONObject();
        httprequest = ServletActionContext.getRequest();
        session = httprequest.getSession(false);
        loginResponse = (JSONObject) session.getAttribute("loginResponse");
        AppLogger.debug("loginResponse" + loginResponse);
        long Aadharservice_StartTime, Aadharservice_endTime, serviceResponseTime;
        String UserName = (String) loginResponse.getString("UserName");
//        BSNLThickClient.setMask();
        CRSClient client = new CRSClient();
//        try {
//            if (!DeviceSerialNumber.equalsIgnoreCase("")) {
//                System.out.println("selectDevice:::UDC:::::::" + session.getAttribute("selectDevice"));
//
//                c = CRSDBManager.getConnection();
//                AppLogger.debug("Database Connection object Created..........................");
//                stmt = c.createStatement();
//                boolean insert = false;
//                try {
//                    String UDCQuary = "SELECT UDC from DEVICE_INFO WHERE SERIALNO='" + DeviceSerialNumber + "'";
//                    AppLogger.debug("quary is::::::" + UDCQuary);
//                    data = stmt.executeQuery(UDCQuary);
//                    if (data.next()) {
//                        UDC = data.getString("UDC");
//                        AppLogger.debug("UDC form sqllite table:::::::" + UDC);
//                        insert = false;
//                    } else {
//                        insert = true;
//                    }
//                } catch (Exception e) {
//                    StringWriter sw = new StringWriter();
//                    PrintWriter pw = new PrintWriter(sw);
//                    e.printStackTrace(pw);
//                    String strErrMsg = sw.toString();
//                    AppLogger.error("DEVICE_INFO doesn't exisit" + strErrMsg);
////                        String sqlQuery = "CREATE TABLE DEVICE_INFO (USERID TEXT, SERIALNO TEXT, UDC TEXT, DEVICETYPE TEXT, DEVICE_UDC_CREATION_TIMESTAMP TEXT)";
////                        stmt.execute(sqlQuery);
////                        AppLogger.debug("DEVICE_INFO table created Successfully... ");
//                    insert = true;
//                }
//                Timestamp date = null;
//                AppLogger.debug("insert is::::::;" + insert);
//                if (insert) {
//
//                    String service1 = onBoardURL.toString().trim() + "/bsnl/OnboardIntegrationService/getUDC";
//                    JSONObject UDCObj = new JSONObject();
//                    UDCObj.put("DEVICE_TYPE", DeviceName);
//                    UDCObj.put("DEVICE_SNO", DeviceSerialNumber);
//                    UDCObj.put("USER_ID", loginResponse.getString("UserId"));
//                    UDCObj.put("SOURCE", "T");
//                    AppLogger.debug("Service is::::::" + service1);
//                    AppLogger.debug("Service request  is::::::" + UDCObj);
//
//                    String Response = client.OnBoardServiceCall(service1, UDCObj.toString());
//                    AppLogger.debug("Service response  is::::::" + Response);
//                    JSONObject UDCRes = JSONObject.fromObject(Response);
//                    if (UDCRes.containsKey("STATUS")) {
//                        if (UDCRes.getString("STATUS").equalsIgnoreCase("0")) {
//                            if (UDCRes.containsKey("UDC")) {
//                                UDC = UDCRes.getString("UDC");
//
////                                String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
//                                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
//                                AppLogger.debug("timeStamp ::::::" + timestamp);
//                                AppLogger.debug("UDC ::::::" + UDC);
//
//                                String sqlQuery1 = "INSERT INTO DEVICE_INFO VALUES(?,?,?,?,?)";
//                                preparedStatement = c.prepareStatement(sqlQuery1);
//                                preparedStatement.setString(1, (String) loginResponse.getString("UserId"));
//                                preparedStatement.setString(2, (String) DeviceSerialNumber);
//                                preparedStatement.setString(3, UDC);
//                                preparedStatement.setString(4, DeviceName);
//                                preparedStatement.setTimestamp(5, timestamp);
//                                int update = preparedStatement.executeUpdate();
//                                AppLogger.debug("Update status is:::::::" + update);
//                            } else {
//                                AppLogger.debug("UDC key is not available in reponse.");
////                                    BSNLThickClient.unSetMask();
//                                response.put("status", "FAIL");
//                                response.put("reason", "UDC key is not available in reponse");
//                                response.put("MESG", UDCRes.getString("MESSAGE"));
//                                response.put("rootingPage", currentHTML);
//                                return response;
//                            }
//
//                        } else if (UDCRes.getString("STATUS").equalsIgnoreCase("-1")) {
//                            if (UDCRes.containsKey("MESSAGE")) {
//                                response.put("status", "FAIL");
//                                response.put("reason", UDCRes.getString("MESSAGE"));
//                                response.put("MESG", UDCRes.getString("MESSAGE"));
//                                response.put("rootingPage", currentHTML);
//                                return response;
//                            } else {
//                                response.put("status", "FAIL");
//                                response.put("reason", "MESSAGE key is avilable in UDC resp");
//                                response.put("MESG", "Device serial number is not fetching from device");
//                                response.put("rootingPage", currentHTML);
//                                return response;
//                            }
//                        } else {
//                            AppLogger.debug("STATUS key is not available in reponse.");
//                            response.put("status", "FAIL");
//                            response.put("reason", "STATUS key is avilable in UDC resp");
//                            response.put("MESG", "");
//                            response.put("rootingPage", currentHTML);
//                            return response;
//                        }
//                    } else {
//                        AppLogger.debug("STATUS key is not available in reponse.");
//                        response.put("status", "FAIL");
//                        response.put("reason", "STATUS key is avilable in UDC resp");
//                        response.put("MESG", "");
//                        response.put("rootingPage", currentHTML);
//                        return response;
//                    }
//
//                }
//
////                }
//            } else {
//
//                AppLogger.debug("DeviceSerialNumber key is not available");
//                response.put("status", "FAIL");
//                response.put("reason", "device serial number not avilable in session");
//                response.put("MESG", "Unable to fetch the device serial number from device");
//                response.put("rootingPage", currentHTML);
//                return response;
//            }
//
//        } catch (Exception e) {
//            StringWriter sw = new StringWriter();
//            PrintWriter pw = new PrintWriter(sw);
//            e.printStackTrace(pw);
//            String strErrMsg = sw.toString();
//            AppLogger.error("Exception ocured while we retriving the UDC value::" + strErrMsg);
////            BSNLThickClient.unSetMask();
//            response.put("status", "FAIL");
//            response.put("reason", "EXCEPTION in UDC BLOCK");
//            response.put("MESG", "");
//            response.put("rootingPage", currentHTML);
//            return response;
//        } finally {
//            if (data != null) {
//                try {
//                    data.close();
//                } catch (Exception e) {
//                }
//                data = null;
//            }
//
//            if (stmt != null) {
//                try {
//                    stmt.close();
//                } catch (Exception e) {
//                }
//                stmt = null;
//            }
//            if (preparedStatement != null) {
//                try {
//                    preparedStatement.close();
//                } catch (Exception e) {
//                }
//                preparedStatement = null;
//            }
//
////            if (c != null) {
////                try {
////                    c.close();
////                } catch (Exception e) {
////                }
////                c = null;
////            }
//        }

        try {
            String service = "", ID = "";

            AppLogger.debug("Device Logs::::::" + DeviceName);
            JSONObject request = new JSONObject();
            request.put("USER_ID", loginResponse.getString("UserId"));
            request.put("SOURCE", "ThickClient");
            request.put("AADHAR_NO", AadharNo);
            request.put("FLOW_TYPE", fllowType);
            JSONObject AUAInput = getPIDData(PIDBlock);
            AppLogger.debug("UDC input for prepareXMLData is :::::: " + UDC);
            session.setAttribute("UDC", UDC.toString());
            ServletContext servletContext = getServletContext();
            String contextPath = servletContext.getRealPath(File.separator);
            String cirtificatePath = contextPath + File.separator + "certificates";
            AppLogger.debug("Cirtificate path : " + cirtificatePath);

            JSONObject xmlDataJson = prepareXMLData(AadharNo, UDC, AUAInput, authType, cirtificatePath, AuthenticateType);

            AppLogger.debug("xmlDataJson::::::::::::::::::::::" + xmlDataJson);
//            if (authType.equalsIgnoreCase("Subscriber")) {
            request.put("REQUEST_XML", xmlDataJson.getString("xmlData"));
//            } else {
//                String  Base64res = prepareKYCData(xmlDataJson.getString("xmlData"), "kycrequest.xml", CRSSession.getInstance().getAttribute("WorkingFolder") + "/cert/");
//                request.put("REQUEST_XML", Base64res);
//            }
            request.put("EKYC_TS", "BSNL");
            request.put("LOB_TYPE", "LL");
            AppLogger.debug("Device Logs::::::Authenticate Type is" + AuthenticateType);
            session.setAttribute("Device_SerialNumber", DeviceSerialNumber);
            if (AuthenticateType.equalsIgnoreCase("Subscriber")) {//Demographic data

                service = onBoardURL.toString().trim() + "/bsnl/EKYCService/getAadharDetails";
                request.put("AUTH_TYPE", "SA");
                request.put("AADHAR_SEQ_ID", session.getAttribute("AADHAR_SEQ_ID"));//AADHAR_SEQ_ID
                request.put("REQ_TIME_CLIENT", Calendar.getInstance().getTime().getTime());//req_Time
                request.put("USER_FLAG", loginResponse.getString("UserFlag"));//UserFlag
                request.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));//CircleCode
                request.put("CIRCLE_SHORT_CODE", loginResponse.getString("FMSCircle"));//CircleShortCode
                request.put("USER_CODE", session.getAttribute("UserCode"));//UserCode
                request.put("SSA_CODE", loginResponse.getString("FMSSSACode"));//SSACode
                request.put("remarks", "");//SSACode
                ID = "SubscriberFinger";
                session.setAttribute("Subscriber_Aadhar", AadharNo);
            } else if (AuthenticateType.equalsIgnoreCase("Agent")) {//Demographic data
                service = onBoardURL.toString().trim() + "/bsnl/EKYCService/getAadharDetails";
                request.put("AUTH_TYPE", "AA");
                request.put("REQ_TIME_CLIENT", Calendar.getInstance().getTime().getTime());//req_Time
                request.put("USER_FLAG", loginResponse.getString("UserFlag"));//UserFlag
                request.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));//CircleCode
                request.put("CIRCLE_SHORT_CODE", loginResponse.getString("FMSCircle"));//CircleShortCode
                request.put("USER_CODE", session.getAttribute("UserCode"));//UserCode
                request.put("SSA_CODE", loginResponse.getString("FMSSSACode"));//SSACode
                request.put("remarks", "");//SSACode
                ID = "AgentFinger";//
                session.setAttribute("Agent_Aadhar", AadharNo);
            } else if (AuthenticateType.equalsIgnoreCase("Summary_Subscriber")) {//Declaration
                service = onBoardURL.toString().trim() + "/bsnl/EKYCService/authenticateaAdhar";
                request.put("AUTH_TYPE", "SD");
                request.put("AADHAR_SEQ_ID", session.getAttribute("AADHAR_SEQ_ID"));//AADHAR_SEQ_ID
                request.put("REQ_TIME_CLIENT", Calendar.getInstance().getTime().getTime());//req_Time
                request.put("USER_FLAG", loginResponse.getString("UserFlag"));//UserFlag
                request.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));//CircleCode
                request.put("CIRCLE_SHORT_CODE", loginResponse.getString("FMSCircle"));//CircleShortCode
                request.put("USER_CODE", session.getAttribute("UserCode"));//UserCode
                request.put("SSA_CODE", loginResponse.getString("FMSSSACode"));//SSACode
                request.put("remarks", "");//SSACode
                ID = "Summary_Sub";//
                request.put("AADHAR_NO", (String) session.getAttribute("SubscriberAadhar"));
                request.put("UID_TOKEN", (String) session.getAttribute("CUST_TOKEN"));
            } else if (AuthenticateType.equalsIgnoreCase("agent_declaration")) {
                service = onBoardURL.toString().trim() + "/bsnl/EKYCService/authenticateaAdhar";
                request.put("AUTH_TYPE", "AD");
                request.put("AADHAR_SEQ_ID", session.getAttribute("AADHAR_SEQ_ID"));//AADHAR_SEQ_ID
                request.put("REQ_TIME_CLIENT", Calendar.getInstance().getTime().getTime());//req_Time
                request.put("USER_FLAG", loginResponse.getString("UserFlag"));//UserFlag
                request.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));//CircleCode
                request.put("CIRCLE_SHORT_CODE", loginResponse.getString("FMSCircle"));//CircleShortCode
                request.put("USER_CODE", session.getAttribute("UserCode"));//UserCode
                request.put("SSA_CODE", loginResponse.getString("FMSSSACode"));//SSACode
                request.put("remarks", "");//SSACode
                ID = "Agent_dec";//
                JSONObject AgentDetials = (JSONObject) session.getAttribute("AgentAadharResponse");
                request.put("AADHAR_NO", AgentDetials.getString("UidData_uid"));
                request.put("UID_TOKEN", (String) session.getAttribute("POS_TOKEN"));
            }
            AppLogger.debug(" aadhaar FMS req in encrypt :::::" + new CRSAuthenticate().Encrypt(request.toString()));
            // AADHAAR request for logs.
            JSONObject reuestJOBJfrlg = new JSONObject();
            try {
                for (Iterator<String> iterator = request.keys(); iterator.hasNext();) {
                    String key = iterator.next();
                    String value = (String) request.getString(key);
                    if (key.equalsIgnoreCase("AADHAR_NO") || key.equalsIgnoreCase("REQUEST_XML") || key.equalsIgnoreCase("EKYC_TS")) {
                        //don't do any thing
                    } else {
                        reuestJOBJfrlg.put(key, value);
                    }
                }

            } catch (Exception ex) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                ex.printStackTrace(pw);
                ex.printStackTrace();
                AppLogger.debug("Exception in preparing clone aadhaar request JSON Object ::: " + ex.toString());
                //TODO process exception
            }
            AppLogger.debug("Request sent to Aadhar services with out AADHAR_NO,REQUEST_XML and EKYC_TS keys::::  " + reuestJOBJfrlg);
            AppLogger.debug("Request sent to Aadhar services sucessfully");

            Aadharservice_StartTime = System.currentTimeMillis();
            String Response = client.OnBoardServiceCallWithMutlipart(service, request.toString());
            AppLogger.debug("Response::" + Response);
            Aadharservice_endTime = System.currentTimeMillis();
            try {
                serviceResponseTime = (Aadharservice_endTime - Aadharservice_StartTime) / 1000;
                AppLogger.debug("Aadhar Response time is " + serviceResponseTime + " ms");
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                AppLogger.debug("Exception in  serviceResponseTime calculation :::  " + sw.toString());
            }
            AppLogger.debug(" Getting response form Aadhar servicess successfully");
            if (Response.equalsIgnoreCase("404") || Response.equalsIgnoreCase("500") || Response.equalsIgnoreCase("ResponseFails")) { //500

                response.put("status", "FAIL");
                response.put("reason", "Response");
                response.put("MESG", "Authentication fails, Please try again");
                response.put("rootingPage", currentHTML);
                return response;

            } else {
                JSONObject AadharJSON = JSONObject.fromObject(Response);
//                        AppLogger.debug("Aadhar response JSON is:::::::" + AadharJSON);
                final String messageVALUE = AadharJSON.getString("MESSAGE");

                if (AuthenticateType.equalsIgnoreCase("Summary_Subscriber")) {//Subscriber Declaration
                    if (AadharJSON.containsKey("STATUS") && AadharJSON.getString("STATUS").equalsIgnoreCase("0")) {////Success case
                        session.setAttribute("ErrorMsg", "");
                        AppLogger.debug("*********************     Authenticated Successfully         **************");

                        //Request for SLA services
                        String serviceUrl = "";
                        try {
                            AppLogger.debug("<----------------Response time sending to OB Service  starts---------->");
                            serviceUrl = onBoardURL.toString().trim() + "/bsnl/EKYCService/auditAadharTransaction";
                            String inputFieldsEntity = "{\"AUDIT_ID\":'" + AadharJSON.getString("AUDIT_ID") + "',\"RESP_AUA_SERVER\":'" + AadharJSON.getString("RESP_AUA_SERVER") + "',\"RESP_TO_CLIENT\":'" + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"T\",\"USER_ID\":'" + loginResponse.getString("UserId") + "'}";
                            AppLogger.debug("<---auditAadharTransaction Service inputFieldsEntity  ----------------->" + inputFieldsEntity);
                            String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                            AppLogger.debug("<---Response time sending to OB Service ends ----------------->" + SLAResponse);
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in  Response time sending to OB Service ::::  " + sw.toString());
                        }

                        session.setAttribute("DeclarationAadharResponse", AadharJSON);

                        try {
                            session.setAttribute("DecAuthDate", AadharJSON.getString("AuthRes_ts"));
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in DecAuthDate in Authentication thread:::::::::: " + sw.toString());
                        }
                        try {
                            session.setAttribute("DecAuthTime", getCurrentTime());
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in DecAuthTime in Authentication thread:::::::::: " + sw.toString());
                        }
//                          
//                        CRSApplicationUtils utils = (CRSApplicationUtils) CRSSession.getInstance().getAttribute("ApplicationUtils");

//                        BSNLThickClient.setImage(CRSSession.getInstance().getAttribute("WorkingFolder") + "/SessionFiles/" + (String) CRSSession.getInstance().getAttribute("tempFolderName") + "\\" + AuthenticateType + ".jpeg", ID);
                        AppLogger.debug("::::::::::Image Set into the Pannel:::::::::::");
                        session.setAttribute("BIODEVICE_MAKE", DeviceName);
                        if (AuthenticateType.equalsIgnoreCase("Summary_Subscriber")) {
                            try {
                                if (fllowType.equalsIgnoreCase("FMSEKYC")) {//for ekyc based on CAF type dedupe is provided
                                    response.put("status", "SUCCESS");
                                    response.put("reason", "Authuntication success");
                                    response.put("MESG", "");
                                    response.put("rootingPage", nxtHTML);
                                    return response;
                                }
                            } catch (Exception e) {
                                StringWriter sw = new StringWriter();
                                PrintWriter pw = new PrintWriter(sw);
                                e.printStackTrace(pw);
                                AppLogger.debug("Exception in Summary_Subscriber in loading to html page based on caf:::  " + sw.toString());
                            }

                        }
                    } else {//Failure case
                        AppLogger.debug("Failure response from subscriber declaration");
                        response.put("status", "SUCCESS");
                        response.put("reason", messageVALUE);
                        response.put("MESG", messageVALUE);
                        session.setAttribute("ErrorMsg", messageVALUE);
                        response.put("rootingPage", currentHTML);
                        return response;

                    }
//                          
                } else if (AuthenticateType.equalsIgnoreCase("agent_declaration")) {//agent Declaration
                    if (AadharJSON.containsKey("STATUS") && AadharJSON.getString("STATUS").equalsIgnoreCase("0")) {////Success case
                        AppLogger.debug("*********************     Authenticated Successfully         **************");
                        JSONObject AadharResponse = AadharJSON;
                        //Request for SLA services
                        String serviceUrl = "";
                        try {
                            AppLogger.debug("<----------------Response time sending to OB Service  starts---------->");
                            serviceUrl = onBoardURL.toString().trim() + "/bsnl/EKYCService/auditAadharTransaction";
//                                    serviceUrl = CRSSession.getInstance().getAttribute("ONBOARDURL") + "/bsnl/OnboardIntegrationService/getCountries";
                            String inputFieldsEntity = "{\"AUDIT_ID\":'" + AadharJSON.getString("AUDIT_ID") + "',\"RESP_AUA_SERVER\":'" + AadharJSON.getString("RESP_AUA_SERVER") + "',\"RESP_TO_CLIENT\":'" + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"T\",\"USER_ID\":'" + loginResponse.getString("UserId") + "'}";
//                                    String inputFieldsEntity = "{CIRCLE_CODE:" + CRSSession.getInstance().getAttribute("CircleCode") + ",connection_type:' 1 '}";
                            AppLogger.debug("<---auditAadharTransaction Service inputFieldsEntity  ----------------->" + inputFieldsEntity);
                            String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                            AppLogger.debug("<---Response time sending to OB Service ends ----------------->" + SLAResponse);
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in  Response time sending to OB Service ::::  " + sw.toString());
                        }

                        session.setAttribute("AgentDeclarationAadharResponse", AadharJSON);
                        try {
                            session.setAttribute("AgentDecAuthDate", AadharJSON.getString("AuthRes_ts"));
//                                    session.setAttribute("DecAuthDate", getCurrentDate());
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in AgentDecAuthDate in Authentication thread:::::::::: " + sw.toString());
                        }
                        try {
                            session.setAttribute("AgentDecAuthTime", getCurrentTime());
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in AgentDecAuthTime in Authentication thread:::::::::: " + sw.toString());
                        }
//                                           
//                        BSNLThickClient.setImage(CRSSession.getInstance().getAttribute("WorkingFolder") + "/SessionFiles/" + (String) CRSSession.getInstance().getAttribute("tempFolderName") + "\\" + AuthenticateType + ".jpeg", ID);
                        AppLogger.debug("::::::::::Image Set into the Pannel:::::::::::");
                        session.setAttribute("BIODEVICE_MAKE", DeviceName);
                        if (AuthenticateType.equalsIgnoreCase("agent_declaration")) {
                            try {
                                if (AadharJSON.getString("STATUS").equalsIgnoreCase("0")) {
//                                    BSNLThickClient.setImage(CRSSession.getInstance().getAttribute("WorkingFolder") + "//" + UserName + "\\" + AuthenticateType + ".jpeg", ID);
//                                    AppLogger.debug("Image Set into the Pannel");
//                                            BSNLThickClient.browser.loadURL(CRSSession.getInstance().getAttribute("workingFolderForHtml") + "/" + nxtHTML);
                                    if (session.getAttribute("ekycCaf1Formvalues") != null) {
                                        String result = (String) session.getAttribute("ekycCaf1Formvalues");
                                        JSONObject jsonObj = (JSONObject) JSONSerializer.toJSON(result);
                                        if (jsonObj.containsKey("customer_type")) {
                                            if (jsonObj.getString("customer_type").equalsIgnoreCase("0005")) {
                                                session.setAttribute("agent_decl_status", "true");

                                            } else {
                                                AppLogger.debug("customer_type is:" + jsonObj.getString("customer_type"));
                                                session.setAttribute("agent_decl_status", "false");

                                            }

                                        } else {
                                            AppLogger.debug("customer_type data is not available");
                                            session.setAttribute("agent_decl_status", "false");

                                        }

                                    } else {
                                        AppLogger.debug("ekycCaf1Formvalues data is not available");
                                        session.setAttribute("agent_decl_status", "false");

                                    }

                                    response.put("status", "SUCCESS");
                                    response.put("reason", "Authunication success");
                                    response.put("rootingPage", nxtHTML);
                                    response.put("MESG", "");
                                    return response;

                                } else {
                                    response.put("status", "FAIL");
                                    response.put("reason", "Agent declaration authunication fail");
                                    response.put("rootingPage", currentHTML);
                                    response.put("MESG", "Authentication failed");
                                    return response;
                                }
                            } catch (Exception e) {
                                StringWriter sw = new StringWriter();
                                PrintWriter pw = new PrintWriter(sw);
                                e.printStackTrace(pw);
                                AppLogger.debug("Exception in Agent declaration in loading to html page based on caf:::  " + sw.toString());
                            }

                        }
                    } else {//Failure case
                        AppLogger.debug("Failure response from agent declaration");

                        response.put("status", "FAIL");
                        response.put("reason", "Agent declaration authunication fail");
                        response.put("MESG", messageVALUE);
                        response.put("rootingPage", currentHTML);
                        return response;
                    }
                } else if (AuthenticateType.equalsIgnoreCase("Agent") || AuthenticateType.equalsIgnoreCase("Subscriber")) {
                    String aadharLimit = "";
                    if (AadharJSON.containsKey("STATUS") && AadharJSON.getString("STATUS").equalsIgnoreCase("0")) {////Success case
                        AppLogger.debug("*********************   e_Kyc   Authenticated Successfully         **************");

                        //Request for SLA services
                        String serviceUrl = "";
                        try {
                            AppLogger.debug("<----------------Response time sending to OB Service  starts---------->");
                            serviceUrl = onBoardURL.toString().trim() + "/bsnl/EKYCService/auditAadharTransaction";
//                                    serviceUrl = CRSSession.getInstance().getAttribute("ONBOARDURL") + "/bsnl/OnboardIntegrationService/getCountries";
                            String inputFieldsEntity = "{\"AUDIT_ID\":'" + AadharJSON.getString("AUDIT_ID") + "',\"RESP_AUA_SERVER\":'" + AadharJSON.getString("RESP_AUA_SERVER") + "',\"RESP_TO_CLIENT\":'" + Calendar.getInstance().getTime().getTime() + "',\"SOURCE\":\"T\",\"USER_ID\":'" + loginResponse.getString("UserId") + "'}";
//                                    String inputFieldsEntity = "{CIRCLE_CODE:" + CRSSession.getInstance().getAttribute("CircleCode") + ",connection_type:' 1 '}";
                            AppLogger.debug("<---auditAadharTransaction Service inputFieldsEntity  ----------------->" + inputFieldsEntity);
                            String SLAResponse = new CRSClient().OnBoardServiceCall(serviceUrl, inputFieldsEntity);
                            AppLogger.debug("<---Response time sending to OB Service ends ----------------->" + SLAResponse);
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in  Response time sending to OB Service ::::  " + sw.toString());
                        }

                        try {
                            if (AuthenticateType.equalsIgnoreCase("Subscriber")) {
                                try {
                                    session.setAttribute("SubscriberAuthDate", AadharJSON.getString("KycRes_ts"));
                                    session.setAttribute("AADHAR_SEQ_ID_sub", AadharJSON.getString("AADHAR_SEQ_ID"));
//                                    session.setAttribute("AADHAR_SEQ_ID", AadharJSON.getString("AADHAR_SEQ_ID"));
                                    session.setAttribute("DATEOFBIRTH", AadharJSON.getString("Poi_dob"));
                                    session.setAttribute("CUST_TOKEN", AadharJSON.getString("UidData_tkn"));//UidData_tkn 
                                } catch (Exception e) {
                                    StringWriter sw = new StringWriter();
                                    PrintWriter pw = new PrintWriter(sw);
                                    e.printStackTrace(pw);
                                    AppLogger.debug("Exception in  getting SubscriberAuthDate key form session:::  " + sw.toString());
                                }
                                try {
                                    session.setAttribute("SubscriberAuthTime", getCurrentTime());
                                } catch (Exception e) {
                                    StringWriter sw = new StringWriter();
                                    PrintWriter pw = new PrintWriter(sw);
                                    e.printStackTrace(pw);
                                    AppLogger.debug("Exception in  getting SubscriberAuthTime key form session:::  " + sw.toString());
                                }

                                session.setAttribute("AadharResponse", AadharJSON);
                                session.setAttribute("SubscriberAadhar", AadharJSON.getString("UidData_uid"));
                                session.setAttribute("Subscriber_Aadhar", AadharJSON.getString("UidData_uid"));

                                response.put("status", "SUCCESS");
                                response.put("reason", "authunication success");
                                response.put("MESG", "");
                                response.put("rootingPage", nxtHTML);
                                return response;

////                                String cutomerType = (String) session.getAttribute("customer_type");
//                                String cutomerType = "004";
//                                System.out.println("customerType ::::::::: " + cutomerType);
//                                AppLogger.debug("customerType ::::::::: " + cutomerType);
//                                session.setAttribute("SubscriberAadhar", AadharNo);
//                                BASE64ToImage(AadharJSON.getString("Pht"), session.getAttribute("SessionFilePath") + "\\SUBSCRIBER_PHOTO.jpg");
//                                session.setAttribute("Aadhar_SubscriberPhoto", session.getAttribute("SessionFilePath") + "\\SUBSCRIBER_PHOTO.jpg");
//                                AppLogger.debug("Subscriber Photo Decoded SuccessFully ");
//                                if (cutomerType.equalsIgnoreCase("0005")) {//for outstation cutomer
//                                    AppLogger.debug("checking states for outstation customer ::::::::: " + cutomerType);
//                                    JSONObject AadharResponse = AadharJSON;
//                                    JSONArray JSONArray=new JSONArray();
//                                    JSONArray AgentAadharResponse = (JSONArray) loginResponse.getJSONArray("CircleStates");
//                                    AppLogger.debug("CircleStates is " + AgentAadharResponse);
//                                    if (AgentAadharResponse != null) {
//                                        if (AadharResponse.containsKey("Poa_state")) {
//                                            System.out.println("AadharResponse::subscriber::::::::::::" + AadharResponse);
//                                            if (AadharResponse.getString("Poa_state").length() > 0 && AgentAadharResponse.size() > 0) {
//                                                boolean states = true;
//                                                for (int i = 0; i < AgentAadharResponse.size(); i++) {
//                                                    JSONObject statesJSON = AgentAadharResponse.getJSONObject(i);
//                                                    if (statesJSON.containsKey("STATE_NAME")) {
//
//                                                        if (AadharResponse.getString("Poa_state").equalsIgnoreCase(statesJSON.getString("STATE_NAME"))) {
//                                                            states = false;
//                                                            break;
//                                                        }
//                                                    } else {
//                                                        AppLogger.debug("STATE_NAME  value is not available  in CircleStates");
//                                                    }
//
//                                                }
//                                                AppLogger.debug("states key value is:::" + states);
//                                                if (states) {
//                                                    response.put("status", "SUCCESS");
//                                                    response.put("reason", "authunication success");
//                                                    response.put("MESG", "");
//                                                    response.put("rootingPage", nxtHTML);
//                                                    return response;
//
//                                                } else {
//                                                    response.put("status", "FAIL");
//                                                    response.put("reason", "states are different");
//                                                    response.put("MESG", "Local customer are not allowed");
//                                                    response.put("rootingPage", currentHTML);
//                                                    return response;
//                                                }
//
//                                            } else {
//                                                AppLogger.debug("Poa_state  values not avilabel  aadhar reponse");
//                                                response.put("status", "FAIL");
//                                                response.put("reason", "Poa_state  values not avilabel  aadhar reponse");
//                                                response.put("MESG", "");
//                                                response.put("rootingPage", currentHTML);
//                                                return response;
//                                            }
//                                        } else {
//                                            AppLogger.debug("Poa_state  key is not avilabel  aadhar reponse");
//                                            response.put("status", "FAIL");
//                                            response.put("reason", "Poa_state  key is not avilabel  aadhar reponse");
//                                            response.put("MESG", "");
//                                            response.put("rootingPage", currentHTML);
//                                            return response;
//
//                                        }
//                                    } else {
//                                        AppLogger.debug("CircleStates not available in login response");
//                                        AppLogger.debug("Poa_state  values not avilabel  aadhar reponse");
//                                        response.put("status", "FAIL");
//                                        response.put("reason", "CircleStates not available in login response");
//                                        response.put("MESG", "");
//                                        response.put("rootingPage", currentHTML);
//                                        return response;
//                                    }
//
//                                } else {//for local cutomer
//                                    AppLogger.debug("low level and high level check starts for local customer ::::::::: " + cutomerType);
//                                    JSONObject AadharResponse = AadharJSON;
//                                    JSONArray AgentAadharResponse = (JSONArray) loginResponse.getJSONArray("CircleStates");
//                                    AppLogger.debug("CircleStates is " + AgentAadharResponse);
//                                    AppLogger.debug("Poa_state " + AadharResponse.getString("Poa_state"));
//                                    if (AgentAadharResponse != null) {
//                                        if (AadharResponse.containsKey("Poa_state")) {
//                                            if (AadharResponse.getString("Poa_state").length() > 0 && AgentAadharResponse.size() > 0) {
//                                                boolean states = false;
////                                                String eKYCCheck = (String) loginResponse.getString("SSALevelCheck");
//                                                String eKYCCheck = "0"; // for testing perpose
//                                                AppLogger.debug("eKYCCheck:::::::::::::::::::" + eKYCCheck);
//                                                if (eKYCCheck.equalsIgnoreCase("0")) {//low level check means only state check
//                                                    for (int i = 0; i < AgentAadharResponse.size(); i++) {
//                                                        JSONObject statesJSON = AgentAadharResponse.getJSONObject(i);
//                                                        if (statesJSON.containsKey("STATE_NAME")) {
//                                                            if (AadharResponse.getString("Poa_state").equalsIgnoreCase(statesJSON.getString("STATE_NAME"))) {
//                                                                states = true;
//                                                                break;
//                                                            }
//                                                        } else {
//                                                            AppLogger.debug("STATE_NAME  value is not available  in CircleStates");
//                                                        }
//
//                                                    }
//                                                    AppLogger.debug("states key value is:::" + states);
//                                                    if (states) {
//                                                        response.put("status", "SUCCESS");
//                                                        response.put("reason", "authunication success");
//                                                        response.put("MESG", "");
//                                                        response.put("rootingPage", nxtHTML);
//                                                        return response;
//                                                    } else {
//
//                                                        response.put("status", "FAIL");
//                                                        response.put("reason", "states are different");
//                                                        response.put("MESG", "Outstation customer are not allowed");
//                                                        response.put("rootingPage", currentHTML);
//                                                    }
//
//                                                } else {//high level check means state and disttict also
//                                                    //OB service calling
//                                                    JSONObject checkLowlevelEkycUserJOBJ = null;
//                                                    JSONObject modJSAADHAARObj = AadharResponse;
//                                                    try {
//                                                        String onBoardURL = CRSAppResources.ONBOARD_URL;
//                                                        String serviceURL = onBoardURL.toString().trim() + "/bsnl/EKYCService/checkLowlevelEkycUser";
//                                                        String inputFieldsEntity = "{\"SSA_CODE\":'" + loginResponse.getString("SSACode") + "',\"CIRCLE_CODE\":'" + loginResponse.getString("CircleCode") + "',\"AADHAAR_DATA\":" + modJSAADHAARObj + "}";
//                                                        AppLogger.debug("serviceURL for checkLowlevelEkycUser ::::: " + serviceURL);
//                                                        AppLogger.debug("inputFieldsEntity for checkLowlevelEkycUser ::::: " + "{'SSA_CODE':'" + loginResponse.getString("SSACode") + "','CIRCLE_CODE':'" + loginResponse.getString("CircleCode") + "':}");
//
//                                                        String checkLowlevelEkycUserRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
//                                                        AppLogger.debug("check Lowlevel EkycUser Response successfully ::::: ");
//                                                        checkLowlevelEkycUserJOBJ = (JSONObject) JSONSerializer.toJSON(checkLowlevelEkycUserRes);
//
//                                                        if (checkLowlevelEkycUserJOBJ.containsKey("STATUS") && checkLowlevelEkycUserJOBJ.containsKey("MESSAGE")) {
//                                                            final String resMessage = checkLowlevelEkycUserJOBJ.get("MESSAGE").toString();
//                                                            if (checkLowlevelEkycUserJOBJ.get("STATUS").equals("0")) {
//                                                                response.put("status", "SUCCESS");
//                                                                response.put("reason", resMessage);
//                                                                response.put("rootingPage", nxtHTML);
//                                                                response.put("MESG", "");
//                                                                return response;
//                                                            } else {
//                                                                response.put("status", "FAIL");
//                                                                response.put("reason", resMessage);
//                                                                response.put("rootingPage", currentHTML);
//                                                                response.put("MESG", resMessage);
//                                                                return response;
//                                                            }
//                                                        } else {
//                                                            AppLogger.debug("Missing STATUS & MESSAGE in checkLowlevelEkycUser response");
//                                                        }
//
//                                                    } catch (Exception ex) {
//                                                        StringWriter sw = new StringWriter();
//                                                        PrintWriter pw = new PrintWriter(sw);
//                                                        ex.printStackTrace(pw);
//                                                        AppLogger.debug("Exception in  checkLowlevelEkycUser ::::  " + sw.toString());
//                                                    }
//                                                }
//
//                                            } else {
//                                                AppLogger.debug("Poa_state  values not avilabel  aadhar reponse");
//                                                response.put("status", "FAIL");
//                                                response.put("reason", "Poa_state  values not avilabel  aadhar reponse");
//                                                response.put("MESG", "");
//                                                response.put("rootingPage", currentHTML);
//                                                return response;
//                                            }
//                                        } else {
//                                            AppLogger.debug("Poa_state key is not avilabel in aadhar reponse");
//                                            response.put("status", "FAIL");
//                                            response.put("reason", "Poa_state key is not avilabel in aadhar reponse");
//                                            response.put("MESG", "");
//                                            response.put("rootingPage", currentHTML);
//                                            return response;
//                                        }
//                                    } else {
//                                        AppLogger.debug("CircleStates not available in login response");
//                                        AppLogger.debug("Poa_state key is not avilabel in aadhar reponse");
//                                        response.put("status", "FAIL");
//                                        response.put("reason", "CircleStates not available in login response");
//                                        response.put("MESG", "");
//                                        response.put("rootingPage", currentHTML);
//                                        return response;
//                                    }
//                                }
                            } else if (AuthenticateType.equalsIgnoreCase("Agent")) {

                                //AADHAR_SEQ_ID setting
                                if (AuthenticateType.equalsIgnoreCase("Agent")) {
                                    session.setAttribute("AADHAR_SEQ_ID", AadharJSON.getString("AADHAR_SEQ_ID"));
                                    session.setAttribute("POS_TOKEN", AadharJSON.getString("UidData_tkn"));//UidData_tkn
                                }
                                try {
                                    session.setAttribute("AgentAuthDate", AadharJSON.getString("KycRes_ts"));
                                } catch (Exception e) {
                                    StringWriter sw = new StringWriter();
                                    PrintWriter pw = new PrintWriter(sw);
                                    e.printStackTrace(pw);
                                    AppLogger.debug("Exception in  AgentAuthDate key set to session ::::  " + sw.toString());
                                }
                                try {
                                    session.setAttribute("AgentAuthTime", getCurrentTime());
                                } catch (Exception e) {
                                    StringWriter sw = new StringWriter();
                                    PrintWriter pw = new PrintWriter(sw);
                                    e.printStackTrace(pw);
                                    AppLogger.debug("Exception in  AgentAuthTime key set to session ::::  " + sw.toString());
                                }
                                session.setAttribute("AgentAadharResponse", AadharJSON);
                                session.setAttribute("Agent_Aadhar", AadharJSON.getString("UidData_uid"));

//                                session.setAttribute("AgentAadharNumber", AadharNo);//for displaying agent name in agent declartion 
                                BASE64ToImage(AadharJSON.getString("Pht"), session.getAttribute("SessionFilePath") + "\\AGENT PHOTO.jpg");
                                session.setAttribute("Aadhar_AgentPhoto", session.getAttribute("SessionFilePath") + "\\AGENT PHOTO.jpg");
                                AppLogger.debug("Agent Photo Decoded SuccessFully ");
                            }
                        } catch (Exception e) {
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in  decoded aadhar photo::::  " + sw.toString());
                        }

//                               
//                        CRSApplicationUtils utils = (CRSApplicationUtils) CRSSession.getInstance().getAttribute("ApplicationUtils");
//                               
                        session.setAttribute("BIODEVICE_MAKE", DeviceName);
                        try {
//                                AgentAadhar_No
                            if (AuthenticateType.equalsIgnoreCase("Agent")) {
                                if (((String) session.getAttribute("AgentAadhar_No")).equalsIgnoreCase("Enter")) {
                                    String AadharUpdationRes = "";
                                    String agent_name = "";
                                    try {
                                        String UniPackURL = CRSAppResources.UP_URL;
//                    utils.gettingDataFromXML("UNIPACKURL");
                                        UniPackURL = UniPackURL.trim() + "/webresources/UserServices/AddAadharNumbers";
                                        AppLogger.debug("AddAadharNumbers URL:::::" + UniPackURL);

                                        if (AadharJSON.containsKey("Poi_name")) {
//                                            if (AadharNo.equalsIgnoreCase(AadharJSON.getString("UidData_uid"))) {
                                            agent_name = AadharJSON.getString("Poi_name");
                                            session.setAttribute("AgentAadharNumber", agent_name);
//                                            } else {
//                                                AppLogger.info("Aadhar number does not matched");
//                                            }

                                        } else {
                                            AppLogger.info("AadharJSON does not contain Poi_name");
                                        }

//                                        String reqServiceParam = "{UID:'" + loginResponse.getString("UserId") + "',AadharNumbers:[{AadharNumber:'" + AadharNo + "',ReferenceName:''}]}";
                                        JSONObject inputJsonReq = new JSONObject();
                                        JSONObject inputJson = new JSONObject();
                                        inputJson.put("AadharNumber", AadharJSON.getString("UidData_uid"));
                                        inputJson.put("ReferenceName", agent_name);
                                        inputJson.put("UIDToken", AadharJSON.getString("UidData_tkn"));//UIDToken
                                        JSONArray inputJsonArr = new JSONArray();
                                        inputJsonArr.add(inputJson);
                                        inputJsonReq.put("UID", loginResponse.getString("UserId"));
                                        inputJsonReq.put("AadharNumbers", inputJsonArr);
//                                                        AppLogger.debug(":::::::UniPackURL is::::::" + UniPackURL + "\t request is :::::::::" + reqServiceParam);
                                        //Calling Service.....
                                        JSONObject resp = new CRSClient().restClient(UniPackURL, inputJsonReq.toString(), "UNIPACK");
                                        AppLogger.debug(":::::::Agent Aadhar number updation  reponse is:::::" + resp);
                                        System.out.println(":::::::------------------->Agent Aadhar number updation  reponse is:::::" + resp);

                                        if (resp.getString("Status").equals("success")) {
                                            AppLogger.debug("Agent Aadhar number successfully updated");
                                            JSONArray aadharNumbers = (JSONArray) loginResponse.getJSONArray("AadharNumbers");
                                            JSONObject newAadharNum = new JSONObject();
                                            newAadharNum.put("AadharNumber", AadharJSON.getString("UidData_tkn"));
                                            newAadharNum.put("ReferenceName", agent_name);
                                            aadharNumbers.add(newAadharNum);
                                            AppLogger.debug("Setting updated aadhar list while adding the aadhar number : " + aadharNumbers);
                                            session.setAttribute("AadharNumbers", aadharNumbers);
                                        } else {
                                            aadharLimit = resp.getString("Status");
                                            final String errorMsg = resp.getString("Message");
                                            AadharUpdationRes = "";
                                            response.put("status", "FAIL");
                                            response.put("reason", errorMsg);
                                            response.put("rootingPage", "FMS_eKYC_step2");
                                            response.put("MESG", errorMsg);
                                            return response;

                                        }

                                    } catch (Exception e) {
                                        StringWriter sw = new StringWriter();
                                        PrintWriter pw = new PrintWriter(sw);
                                        e.printStackTrace(pw);
                                        AppLogger.debug("Exception in  AadharUpdationRes method::::  " + sw.toString());
                                    }

                                } else {
                                    //Token service updation commented.
//                                    AppLogger.info("AadharNo.length() :::: " + AadharNo.length());
//                                    if (AadharNo.length() == 12) {
//                                        //Request for Aadhar Token service updation
//                                        String upServiceUrl = CRSAppResources.UP_URL;
////                                        String upServiceUrl = "http://rsweb72:4040/UniserveWebV4-BSNL";
//                                        try {
//                                            AppLogger.info("<----------------Aadhar Token service request preparation starts in " + AuthenticateType + "---------->");
//                                            upServiceUrl = upServiceUrl.toString().trim() + "/webresources/UserServices/UpdateUidToken";
//                                            AppLogger.debug("Aadhar Token service is::" + upServiceUrl);
//                                            String inputFieldsEntity = "{\"UID\":'" + loginResponse.getString("UserId") + "',\"UIDTOKEN\":'" + AadharJSON.getString("UidData_tkn") + "',\"FormatedAadharNo\":'" + AadharJSON.getString("UidData_uid") + "',\"AadharNumber\":'" + AadharNo + "',\"SOURCE\":\"T\"}";
//                                            AppLogger.debug("Aadhar Token service request is::" + inputFieldsEntity);
//                                            JSONObject SLAResponse = new CRSClient().UPServicecall(upServiceUrl, inputFieldsEntity);
//                                            AppLogger.debug("Aadhar Token service reponse is" + SLAResponse);
//                                        } catch (Exception e) {
//                                            StringWriter sw = new StringWriter();
//                                            PrintWriter pw = new PrintWriter(sw);
//                                            e.printStackTrace(pw);
//                                            AppLogger.error("Exception in  Aadhar Token service ::::  " + sw.toString());
//                                        }
//                                    }

                                    try {
                                        //for setting name in agent declaration 
                                        String listOfAdharNo;
                                        JSONArray aadharNumbers = (JSONArray) loginResponse.getJSONArray("AadharNumbers");
                                        for (int i = 0; i < aadharNumbers.size(); i++) {
                                            listOfAdharNo = aadharNumbers.getJSONObject(i).getString("AadharNumber");
                                            if (listOfAdharNo.equalsIgnoreCase(AadharNo)) {
                                                session.setAttribute("AgentAadharNumber", aadharNumbers.getJSONObject(i).getString("ReferenceName"));//for displaying agent name in agent declartion 
                                                break;
                                            }
                                        }

                                    } catch (Exception e) {
                                        e.printStackTrace();
                                        StringWriter sw = new StringWriter();
                                        PrintWriter pw = new PrintWriter(sw);
                                        e.printStackTrace(pw);
                                        AppLogger.debug("Exception in  Aadhar no updation in agent declaration::::  " + sw.toString());
                                    }

//                                    
                                }

                            }
                        } catch (Exception e) {
//                            BSNLThickClient.unSetMask();
                            e.printStackTrace();
                            StringWriter sw = new StringWriter();
                            PrintWriter pw = new PrintWriter(sw);
                            e.printStackTrace(pw);
                            AppLogger.debug("Exception in  Aadhar no updation block::::  " + sw.toString());
                        }
                        //initialize the DB resources
                        Connection c = null;
                        ResultSet data = null;
                        Statement stmt = null;
                        PreparedStatement preparedStatement = null;
                        if (AuthenticateType.equalsIgnoreCase("Agent")) {
                            if (aadharLimit.equalsIgnoreCase("fail")) {
                                AppLogger.debug("Aadhar limit reached. so unable to go to the next page.please select the exisiting Aadhar number.");
                            } else {

                                c = CRSDBManager.getConnection();
                                AppLogger.debug("Database Connection object Created..........................");
                                stmt = c.createStatement();
                                boolean status = false;
                                try {
                                    int AADHARNocount = 0;

                                    String AadharNoQuery = "SELECT count(*) from AGENT_CAF_ENABLE where AADHAAR_NO='" + AadharNo + "' and STATUS=1";
                                    AppLogger.debug("AGENT_CAF_ENABLE query is::::::" + AadharNoQuery);
                                    data = stmt.executeQuery(AadharNoQuery);
                                    if (data.next()) {
                                        AADHARNocount = data.getInt(1);

                                    }
                                    if (AADHARNocount > 0) {
                                        AppLogger.info("Image Set into the Pannel");
                                        response.put("status", "SUCCESS");
                                        response.put("reason", "Authunication success");
                                        response.put("MESG", "");
                                        response.put("rootingPage", "FMS_eKYC_step4");
                                        return response;
                                    } else {
                                        String sqlQuery1 = "INSERT INTO AGENT_CAF_ENABLE VALUES(?,?)";
                                        preparedStatement = c.prepareStatement(sqlQuery1);
                                        preparedStatement.setString(1, AadharNo);
                                        preparedStatement.setString(2, "1");
                                        int update = preparedStatement.executeUpdate();
                                        AppLogger.debug("Update status is:::::::" + update);
//                                        AppLogger.debug("Image Set into the Pannel");
                                        response.put("status", "SUCCESS");
                                        response.put("reason", "Authunication success");
                                        response.put("MESG", "");
                                        response.put("rootingPage", "FMS_eKYC_step3");
                                        return response;
                                    }

                                } catch (Exception e) {
                                    StringWriter sw = new StringWriter();
                                    PrintWriter pw = new PrintWriter(sw);
                                    e.printStackTrace(pw);
                                    String strErrMsg = sw.toString();
                                    AppLogger.error("AGENT_CAF_ENABLE doesn't exisit " + strErrMsg);
                                } finally {
                                    if (stmt != null) {
                                        try {
                                            stmt.close();
                                        } catch (Exception e) {
                                        }
                                        stmt = null;
                                    }
                                    if (preparedStatement != null) {
                                        try {
                                            preparedStatement.close();
                                        } catch (Exception e) {
                                        }
                                        preparedStatement = null;
                                    }
                                    try {
                                        if (c != null) {
                                            try {
                                                c.close();
                                            } catch (Exception e) {
                                            }
                                            c = null;
                                        }
                                    } catch (Exception e) {
                                    }
                                }
//                                BSNLThickClient.setImage(CRSSession.getInstance().getAttribute("WorkingFolder") + "//" + UserName + "\\" + AuthenticateType + ".jpeg", ID);
                            }
                        }

                    } else {//Failure case
                        AppLogger.debug("Failure response from subscriber declaration");

                        response.put("status", "FAIL");
                        response.put("reason", "subscriber declaration fails");
                        response.put("MESG", messageVALUE);
                        response.put("rootingPage", currentHTML);
                        return response;

                    }
                }
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String strErrMsg = sw.toString();
            AppLogger.error("Exception ocured while we retriving the UDC functionality ::" + strErrMsg);
        }
        return response;
    }

//    public void deleteImages(String AuthenticateType) {
//        String UserName = (String) CRSSession.getInstance().getAttribute("UserName");
//        try {
//            AppLogger.debug(":::::::::::::::deleteImages method starts ::::::::::::::::::::::");
//            String filePathISO = CRSSession.getInstance().getAttribute("WorkingFolder") + "/SessionFiles/" + (String) CRSSession.getInstance().getAttribute("tempFolderName") + "\\" + AuthenticateType + ".iso";
//            String filePathJPEG = CRSSession.getInstance().getAttribute("WorkingFolder") + "/SessionFiles/" + (String) CRSSession.getInstance().getAttribute("tempFolderName") + "\\" + AuthenticateType + ".jpeg";
//
//            File file = new File(filePathISO);
//            File file_jpeg = new File(filePathJPEG);
//            if (file.exists()) {
//                boolean response = file.delete();
//                AppLogger.debug(AuthenticateType + " iso delete status is::::::::" + response);
//            }
//            if (file_jpeg.exists()) {
//                boolean response1 = file_jpeg.delete();
//                AppLogger.debug(AuthenticateType + " jpeg delete status is::::::::" + response1);
//            }
//        } catch (Exception e) {
//            StringWriter sw = new StringWriter();
//            PrintWriter pw = new PrintWriter(sw);
//            e.printStackTrace(pw);
//            AppLogger.debug("Exception in  deleteImages method::::  " + sw.toString());
//        }
//    }
    public String getCurrentTime() {
        String dateString = "";
        try {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss a");
            dateString = sdf.format(date);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.debug("Exception in  getCurrentTime method::::  " + sw.toString());
        }
        AppLogger.debug("get CurrentTime is " + dateString);
        return dateString;
    }

    public void BASE64ToImage(String bytes, String path) {
        try {
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] decodedBytes = decoder.decodeBuffer(bytes);
            InputStream in = new ByteArrayInputStream(decodedBytes);
            BufferedImage bImageFromConvert = ImageIO.read(in);

            ImageIO.write(bImageFromConvert, "jpg", new File(path));
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.debug("Exception in BASE64ToImage::::  " + sw.toString());
        }
    }
}
