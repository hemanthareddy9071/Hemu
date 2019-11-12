/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.util.EntityUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author swaroopeshwar
 */
public class CRSClient {

    JSONObject seviceResObj = new JSONObject();
    HttpServletRequest request = null;
    HttpSession session = null;

    public JSONObject restClient(String webServiceURL, String entity, String urlType) {
        try {
            AppLogger.info("***********Rest services starts*****************");
            AppLogger.debug("Web Service URL is:::::::: webServiceURL ::" + webServiceURL + ":: urlType :: " + urlType);
            AppLogger.info("Service input is ::::::::::" + entity);
            DefaultHttpClient defaultclient = new DefaultHttpClient(new BasicHttpParams());
            URL url_webservice = new URL(webServiceURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                AppLogger.debug("Port:::::::::" + url_webservice.getPort());
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                defaultclient = httpclient1;
            }
            List<NameValuePair> list = new ArrayList<NameValuePair>();

            if (urlType.equalsIgnoreCase("UNIPACK")) {
//                webServiceURL = CRSResourcesInfo.getAppSettingsProperty("URL") + "/Uniserve-WebV4/" + webServiceURL;
                list.add(new BasicNameValuePair("ReqJsonStr", entity));
            } else if (urlType.equalsIgnoreCase("Document_UploadService")) {
//                webServiceURL = CRSResourcesInfo.getAppSettingsProperty("URL") + webServiceURL;
            } else if (urlType.equalsIgnoreCase("ONBOARD")) {
//                webServiceURL = CRSResourcesInfo.getAppSettingsProperty("URL") + "/ONB_Huawei/" + webServiceURL;
                list.add(new BasicNameValuePair("reqData", entity));
            } else if (urlType.equalsIgnoreCase("Reports")) {
//                webServiceURL = CRSResourcesInfo.getAppSettingsProperty("URL") + "/Reports/" + webServiceURL;
                list.add(new BasicNameValuePair("ReqJsonStr", entity));
            }
            AppLogger.info("webServiceURL :: " + webServiceURL);

            if (urlType.equalsIgnoreCase("Document_UploadService")) {
                JSONObject data = (JSONObject) JSONSerializer.toJSON(entity);
                AppLogger.debug("Job upload Data is:::" + data);
                File inFile = new File(data.getString("ZIP_FILE"));
                HttpPost httppost = new HttpPost(webServiceURL.trim());
                MultipartEntity entity1 = new MultipartEntity();
                if (inFile.exists()) {
                    entity1.addPart("ZIP_FILE", new FileBody(inFile));
                } else {
                    AppLogger.debug("ZIP_FILE is missing in response");
                    seviceResObj.put("errorDesc", "fail");
                }
                try {
                    String strKey = "";
                    Iterator<String> itr = data.keys();
                    while (itr.hasNext()) {
                        strKey = itr.next();
                        entity1.addPart(strKey, new StringBody(data.getString(strKey)));
                    }
                } catch (Exception e) {
                }
                httppost.setHeader("username", "intense");
                httppost.setHeader("password", "intense@2016");
                httppost.setEntity(entity1);
                HttpResponse response = defaultclient.execute(httppost);
                int responseCode = response.getStatusLine().getStatusCode();
                AppLogger.info("::::::::::::Response code from Server is::::::::::" + responseCode);
                if (responseCode == 200) {
                    HttpEntity responseEntity = response.getEntity();
                    String responseString = EntityUtils.toString(responseEntity, "UTF-8");
                    seviceResObj = (JSONObject) JSONSerializer.toJSON(responseString);
                    JSONObject dummyInput = new JSONObject();
                    try {
                        for (Iterator<String> iterator = seviceResObj.getJSONObject("Data").keys(); iterator.hasNext();) {
                            String key = iterator.next();
                            String value = (String) seviceResObj.getString(key);
                            if (key.equalsIgnoreCase("AadharNumbers") || key.equalsIgnoreCase("LoginAadharNo")) {
                                //don't do any thing
                            } else {
                                dummyInput.put(key, value);
                            }
                        }

                    } catch (Exception ex) {
                        StringWriter sw = new StringWriter();
                        PrintWriter pw = new PrintWriter(sw);
                        ex.printStackTrace(pw);
                        ex.printStackTrace();
                        AppLogger.error("Exception in preparing clone of unipack response with out Aadhhar numbers ::: " + ex.toString());
                        //TODO process exception
                    }
                    AppLogger.info("::::::::::::Response from Server is::::::::::" + dummyInput);

                } else {
                    HttpEntity resp_ent = response.getEntity();
                    AppLogger.debug("Entity response:::" + EntityUtils.toString(resp_ent));
                    seviceResObj.put("errorDesc", "fail");
                }
                return seviceResObj;
            } else {
                HttpPost postcall = new HttpPost(webServiceURL);
                postcall.setEntity(new UrlEncodedFormEntity(list, Consts.UTF_8));
                HttpResponse response = defaultclient.execute(postcall);
                int responseCode = response.getStatusLine().getStatusCode();
                AppLogger.info(":::::::::::Service status is:::::::::::::::" + responseCode);

                if (responseCode == 200) {

                    BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                    String output = "";
                    String resString = "";

                    while ((output = br.readLine()) != null) {
                        AppLogger.info("::::::::::::Response from Server is::::::::::" + output);
                        resString = output;
                    }
                    JSONObject resObj = (JSONObject) JSONSerializer.toJSON(resString);
                    seviceResObj = resObj;

                } else {
                    if (urlType.equalsIgnoreCase("UNIPACK")) {
                        JSONObject mesg = new JSONObject();
                        mesg.put("Message", "Unable to process your request");
                        seviceResObj.put("Status", "Failed");
                        seviceResObj.put("Data", mesg.toString());
                    } else if (urlType.equalsIgnoreCase("ONBOARD")) {
                        JSONObject result = new JSONObject();
                        result.put("success", false);
                        seviceResObj.put("objCRSResponse", result);
                    } else if (urlType.equalsIgnoreCase("Reports")) {
                        seviceResObj.put("successFlag", "fail");
                        seviceResObj.put("message", "Unable to process your request");
                    }
                    AppLogger.debug("Response composed as:::  " + seviceResObj);
                }

            }
        } catch (Exception e) {
            if (urlType.equalsIgnoreCase("UNIPACK")) {
                JSONObject mesg = new JSONObject();
                mesg.put("Message", "Unable to process your request");
                seviceResObj.put("Status", "Failed");
                seviceResObj.put("Data", mesg.toString());
            } else if (urlType.equalsIgnoreCase("ONBOARD")) {
                JSONObject result = new JSONObject();
                result.put("success", false);
                seviceResObj.put("objCRSResponse", result);
            } else if (urlType.equalsIgnoreCase("Document_UploadService")) {
                seviceResObj.put("errorDesc", "fail");
            } else if (urlType.equalsIgnoreCase("Document_UploadService")) {
                seviceResObj.put("errorDesc", "fail");
            }
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.debug("Exception in rest Client method" + sw.toString());
        }
        //AppLogger.debug("Response composed as11:::  " + seviceResObj);
        return seviceResObj;
    }

    public String OnBoardServiceCall(String serviceURL, String inputFieldsEntity) {

        AppLogger.info("Starting of OnBoardServiceCall in CRSClient");
        String responseString = "";
        BufferedReader breader = null;
        try {
            HttpClient client = new DefaultHttpClient();
            URL url_webservice = new URL(serviceURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                client = httpclient1;
            }
            try {
                //request = ServletActionContext.getRequest();
                //session = request.getSession(false);
                JSONObject requestObj = (JSONObject) JSONSerializer.toJSON(inputFieldsEntity);
                //JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
                AppLogger.debug("com.in10s.commons.CRSClient.OnBoardServiceCall():" + requestObj.toString());
                requestObj.put("JOB_USER", "-1");
                requestObj.put("LOCATION", "-1");

                //Enumeration<String> enm = session.getAttributeNames();
                //List<String> sessionkeys = Collections.list(enm);
                try {
                    requestObj.put("PRILOCATION", "-1");
                    /*if (sessionkeys.contains("ekycCaf1Formvalues")) {
                        String ekycCAF = (String) session.getAttribute("ekycCaf1Formvalues");
                        JSONObject eKYCForm1JOBJ = (JSONObject) JSONSerializer.toJSON(ekycCAF);
                        requestObj.put("REMARKS", eKYCForm1JOBJ.getString("remarks"));

                        String userFlag = loginResponse.getString("UserFlag");
                        String locationVal = "";
                        String preLocationVal = "";
                        if (userFlag.equalsIgnoreCase("3") && eKYCForm1JOBJ.getString("remarks").equalsIgnoreCase("Dealer CAF")) {
                            locationVal = (String) session.getAttribute("CSC_CODE");//CSC_CODE
                            preLocationVal = loginResponse.getString("UserCode");
                        }
                        if (userFlag.equalsIgnoreCase("5")) {
                            locationVal = loginResponse.getString("UserCode");//CSC_CODE
                            preLocationVal = loginResponse.getString("UserCode");
                        } else {
                            locationVal = loginResponse.getString("UserCode");
                            preLocationVal = loginResponse.getString("MappingCode");
                        }
                        requestObj.put("PRILOCATION", preLocationVal);
                    }*/
                } catch (Exception e) {
                    StringWriter sw = new StringWriter();
                    PrintWriter pw = new PrintWriter(sw);
                    e.printStackTrace(pw);
                    AppLogger.debug("Exception occured because  REMARKS,PRILOCATION key are additionally add into onboard service" + sw.toString());
                }

                //if (sessionkeys.contains("CONNECTION_TYPE")) {
                    //String CONNECTION_TYPE = (String) session.getAttribute("CONNECTION_TYPE");
                    requestObj.put("CONNECTION_TYPE", "");
                //}
                //if (sessionkeys.contains("KYCType")) {
                    //String KYCType = (String) session.getAttribute("KYCType");
                    requestObj.put("JOB_TYPE",requestObj.optString("JOB_TYPE", "FMSEKYC"));
                //}
                requestObj.put("USER_ID", "-1");
                requestObj.put("DB_LINK", "-1");
                requestObj.put("BO_DBLink", "-1");
                //requestObj.put("CIRCLE_CODE", loginResponse.getString("CircleCode"));
                //requestObj.put("ZONE_CODE", loginResponse.getString("CircleZoneCode"));
                requestObj.put("SSA_CODE", "-1");
                requestObj.put("JOB_SOURCE", "S");
                requestObj.put("USER_AGENT_TYPE", "-1");
                requestObj.put("SS_CODE", "-1");
                requestObj.put("LOGIN_ID", "-1");
                requestObj.put("CTOPNO", "-1");

                inputFieldsEntity = requestObj.toString();
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                AppLogger.debug("Exception occured because   additionally keys are add into onboard service" + sw.toString());
            }
            AppLogger.debug("inputFieldsEntity::::" + inputFieldsEntity);
            HttpPost postRequest = new HttpPost(serviceURL);
            postRequest.addHeader("Content-Type", "application/json");
            StringEntity userEntity = new StringEntity(inputFieldsEntity);  // form filds inputs
//            StringEntity userEntity = new StringEntity("{\"CAF_TYPE\":\"DE\"}");  // form filds fetching
            postRequest.setEntity(userEntity);
            HttpResponse response = client.execute(postRequest);
            if (response != null) {
                AppLogger.info("Response code is : " + response.getStatusLine().getStatusCode());
                String outPutValue = "";
                String output;
                if (response.getStatusLine().getStatusCode() == 200) {
                    breader = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));
                    while ((output = breader.readLine()) != null) {
                        responseString = outPutValue + output;
                    }
//                    System.out.println("responseString ::" + responseString);
                }
            }
            if (breader != null) {
                breader.close();
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in  onboard service calling block::::  " + sw.toString());
        }
        return responseString;
    }

    public String OnBoardServiceCallWithMutlipart(String serviceURL, String inputFieldsEntity) {
//        try {
//            String session = sessionValidation();
//            AppLogger.debug("OnBoardServiceCall serviceURL ::::: " + serviceURL);
//            if (session.equalsIgnoreCase("SessionMismatch") || session.equalsIgnoreCase("UserDoesNotExist")) {
//
//                AppLogger.debug("**************** Invalid Session *********************");
//                System.out.println(":::::::::::::::::::::::::LoginSession" + CRSSession.getInstance().getAttribute("LoginSession"));
//                if (((String) CRSSession.getInstance().getAttribute("LoginSession")).equalsIgnoreCase("Differ")) {
//                    CRSSession.getInstance().setAttribute("LoginSession", "HitAgain");
//                    Platform.runLater(new Runnable() {
//                        @Override
//                        public void run() {
////                            new MessageBox("Alert", "Your session has expired") {
//                            new MessageBox("Alert", CRSI18NMessages.getI18NMessage("CRSRestClient_Msg.Session_Expired")) {
//                                @Override
//                                public void comfirmMessage() {
//                                    return;
//                                }
//                            };
//                        }
//                    });
//                }
//                BSNLThickClient.browser.loadURL(CRSSession.getInstance().getAttribute("workingFolderForHtml") + "\\login_exist.html");
//
//                return "";
//            } else if (session.equalsIgnoreCase("SessionEmpty")) {
//                AppLogger.debug("**************** SessionEmpty *********************");
//                BSNLThickClient.browser.loadURL(CRSSession.getInstance().getAttribute("workingFolderForHtml") + "\\errorpage.html");
//                return "";
//            } else if (session.equalsIgnoreCase("ServiceDown")) {
//                AppLogger.debug("****************Uniserve-Web ServiceDown *********************");
//                return "";
//            } else if (session.equalsIgnoreCase("SessionValid")) //             / SessionValid /  / UserDoesNotExist"))
//            {
//                AppLogger.debug("**************** valid Session *********************");
//            }
//        } catch (Exception e) {
//            StringWriter sw = new StringWriter();
//            PrintWriter pw = new PrintWriter(sw);
//            e.printStackTrace(pw);
//            AppLogger.debug("Exception in  sessionValidation block::::  " + sw.toString());
//        }
        AppLogger.info("Starting of OnBoardServiceCallWithMutlipart in CRSClient");
        String BASE_URL = serviceURL;//"http://rsweb51:2020/BSNLMobileApp/bsnl/EKYCService/authenticateaAdhar"; 
        try {
            HttpClient client = new DefaultHttpClient();
            URL url_webservice = new URL(serviceURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                client = httpclient1;
            }

            HttpPost postRequest = new HttpPost(BASE_URL);
            postRequest.addHeader("Content-Type", "application/json");
            StringEntity userEntity = new StringEntity(inputFieldsEntity);
            postRequest.setEntity(userEntity);
            HttpResponse response = client.execute(postRequest);
            if (response != null) {
                AppLogger.info("Response code is : " + response.getStatusLine().getStatusCode());
                String outPutValue = "";
                String output;
                if (response.getStatusLine().getStatusCode() == 200) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(
                            (response.getEntity().getContent())));
                    while ((output = br.readLine()) != null) {
                        outPutValue = outPutValue + output;
                    }
//                    AppLogger.debug("outPutValue ::" + outPutValue);
                    return outPutValue;
                } else {
//                    AppLogger.debug(""+response.getStatusLine().getStatusCode());
                    return response.getStatusLine().getStatusCode() + "";
                }

            } else {
                return "ResponseFails";
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in OnBoardServiceCallWithMutlipart::::  " + sw.toString());
            return "ResponseFails";
        }

    }

    public JSONObject serviceRequest(String ZIPFilePath, String Feilds, String ConnectionURL) {
        AppLogger.info("Starting of serviceRequest in CRSClient");
        JSONObject responseObject = new JSONObject();

        File inFile = new File(ZIPFilePath);//"C:\\ThickClientTemp\\ExportedJobs\\sravanthick_ZipFile_1466744089007.zip"

        try {
            DefaultHttpClient httpclient = new DefaultHttpClient();
            URL url_webservice = new URL(ConnectionURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                httpclient = httpclient1;
            }

            HttpPost httppost = new HttpPost(ConnectionURL);//http://rsweb29:4444/RestFilesReceiver/CaptureData/recieve1Data
            MultipartEntity entity = new MultipartEntity();
            if (inFile.exists()) {
                entity.addPart("FILE", new StringBody(convertFileToString(inFile)));
            } else {
                entity.addPart("FILE", new StringBody(""));
            }

//            String input = "{\"CAFNO\":\"CAF001\",\"title\":\"Fade To Black\",\"FILE_NAME\":\"" + inFile.getName() + "\"}";
//            AppLogger.debug("Input For JOB UploadFeild::::::::::::::" + Feilds);
            entity.addPart("CAF_DATA", new StringBody(Feilds));
            httppost.setEntity(entity);
            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");
            responseObject = (JSONObject) JSONSerializer.toJSON(responseString);
//            System.out.println("responseString::::" + responseString);
            AppLogger.debug("statusCode::" + statusCode);
            return responseObject;
        } catch (ClientProtocolException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Unable to make connection " + sw.toString());
            responseObject.put("STATUS", "2");
            responseObject.put("MESSAGE", "Internal Problem.");
            return responseObject;
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Unable to read file " + sw.toString());
            responseObject.put("STATUS", "2");
            responseObject.put("MESSAGE", "Internal Problem.");
            return responseObject;
        }
    }

    private static String convertFileToString(File file) throws IOException {
        byte[] bytes = Files.readAllBytes(file.toPath());
        return new String(DatatypeConverter.printBase64Binary(bytes));

    }

    public JSONObject UPServicecall(String webServiceURL, String entity) {
        try {
            String url = "";
            AppLogger.info("***********Service Starts*****************");
            System.out.println("webServiceURL::::::::::" + webServiceURL);
            DefaultHttpClient defaultclient = new DefaultHttpClient(new BasicHttpParams());
            URL url_webservice = new URL(webServiceURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                AppLogger.debug("Port:::::::::" + url_webservice.getPort());
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                defaultclient = httpclient1;
            }

//            AppLogger.info(":::::::::::::::::::::Connecting URL::::::" + webServiceURL);
            if (webServiceURL.contains("LoginAuthentication") || webServiceURL.contains("ChangePWD") || webServiceURL.contains("LogoutUser") || webServiceURL.contains("AddAadharNumbers")) {
            } else {
//                AppLogger.info(":::::::::::Request for Service::::::::::" + entity);
            }
            HttpPost postcall = new HttpPost(webServiceURL);

//            HttpPost postcall = new HttpPost("http://rsweb86:9999/Uniserve-WebV4/webresources/UserServices/DeviceRegistration");
            //testingURL(webServiceURL);
            List<NameValuePair> list = new ArrayList<NameValuePair>();
            list.add(new BasicNameValuePair("ReqJsonStr", entity));
//            list.add(new BasicNameValuePair("ReqJsonStr", "{\"MAC\":\"/2V2HQ12/CN7016343J006H/1892087312\",\"device_type\":\"windows\",\"user_name\":\"system\",\"mob_no\":\"7702305661\"\"email\":\"ravikiran.rayprolu@intense.in\"}"));
            postcall.setEntity(new UrlEncodedFormEntity(list, Consts.UTF_8));

            HttpResponse response = defaultclient.execute(postcall);

            AppLogger.info(":::::::::::Server Response Status Code:::::::::::::::" + response.getStatusLine().getStatusCode());

            if (response.getStatusLine().getStatusCode() == 200) {
//                throw new RuntimeException("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                String output = "";
                String resString = "";

                while ((output = br.readLine()) != null) {
                    if (webServiceURL.contains("LoginAuthentication")) {
                    } else {
//                        AppLogger.info("::::::::::::Response from Server is::::::::::" + output);
                    }
                    resString = output;
                }

                JSONObject resObj = (JSONObject) JSONSerializer.toJSON(resString);

                seviceResObj = resObj;

//                System.out.println("::::::::::::::::::response JsonObect:::::::::::::::" + seviceResObj);
                if (webServiceURL.contains("LoginAuthentication")) {
                } else {
//                    AppLogger.info("::::::::::::::::::response JsonObect:::::::::::::::" + seviceResObj);
                }

            } else {
//                AppLogger.info(":::::::Server Response Code:::::" + response.getStatusLine().getStatusCode());
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            AppLogger.error("Exception in  unipack service calling method::::  " + sw.toString());
        }

        return seviceResObj;
    }

    public String OnBoardServiceFile(String serviceURL, String inputFieldsEntity, String filePath) {

//        StringBuilder responseString = new StringBuilder();
        String serviceRequest = "";
        BufferedReader breader = null;
        FileOutputStream outputStream = null;
        InputStream inputStream = null;
        try {
//            String BASE_URL = "http://rsweb51:2020/BSNLMobileApp/bsnl/OnboardIntegrationService/preapareForm"; // aadharDetails   aAdharAuthenticate
            AppLogger.debug("OnBoardServiceCall serviceURL ::::: " + serviceURL);
            HttpClient client = new DefaultHttpClient();
            URL url_webservice = new URL(serviceURL);
            if (url_webservice.getProtocol().toLowerCase().equals("https")) {
                MyHttpClient httpclient1 = new MyHttpClient(url_webservice.getPort());
                client = httpclient1;
            }
            HttpPost postRequest = new HttpPost(serviceURL);
            postRequest.addHeader("Content-Type", "application/json");
            StringEntity userEntity = new StringEntity(inputFieldsEntity);  // form filds inputs

            postRequest.setEntity(userEntity);
            HttpResponse response = client.execute(postRequest);
            outputStream = new FileOutputStream(new File(filePath));
            if (response != null) {
                System.out.println(response.getStatusLine().getStatusCode());
                if (response.getStatusLine().getStatusCode() == 200) {

                    inputStream = response.getEntity().getContent();

                    int read = 0;
                    byte[] bytes = new byte[1024];

                    while ((read = inputStream.read(bytes)) != -1) {
                        outputStream.write(bytes, 0, read);
                    }
                    outputStream.close();
                    outputStream.flush();
                } else {
                    filePath = "";
                }
            }
            if (breader != null) {
                breader.close();
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.debug("Exception in  onbord service (getting file) calling method::::  " + sw.toString());
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (Exception e) {
                }
                outputStream = null;
            }
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception e) {
                }
                inputStream = null;
            }
        }
        return filePath;
    }
}
