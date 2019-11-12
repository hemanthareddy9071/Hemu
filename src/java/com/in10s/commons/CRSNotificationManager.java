/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

//import com.sun.jersey.api.client.Client;
//import com.sun.jersey.api.client.ClientResponse;
//import com.sun.jersey.api.client.WebResource;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.Iterator;
import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;

/**
 *
 * @author ravikiran.r
 */
public class CRSNotificationManager {
    
    private final String USER_AGENT = "Mozilla/5.0";

    public JSONObject sendNotification(JSONObject data) {
        JSONObject respJson = new JSONObject();
        try {
             
            prInfo("[CRSNotificationManager][sendNotification][START]");
            //prDebug("Request data [sendNotification] ::" + data);
            JSONObject tempObj = new JSONObject();
            tempObj.put("serviceURL", CRSAppResources.NE_URL);           
            JSONObject props=new JSONObject();
            mergeJson(tempObj, props);
            props.put("isFile", "true");
            props.put("contentType", "XML");
            props.put("requestType", "post");
            data.put("trans_id", "ALERT" + new Date().getTime());   
            String filepath = "";
            if (data.containsKey("TYPE")) {
                filepath = WPContextListener.confgFilesPath + "Inst_Notifications_" + data.getString("TYPE") + ".xml" + File.separator;
            }
            prDebug("[CRSNotificationManager][sendNotification] filepath ::" + filepath);
            props.put("requestFilePath", filepath);
            props.put("Params", data);
            JSONObject result = AnyWebServiceInvoker.invokService(props);
            prInfo("respJson::Alerts" + result);
            if("success".equalsIgnoreCase(result.getString("status"))){
                respJson.put("STATUS", "SUCCESS");
                String resXMLString = result.getString("Data");
                if (resXMLString.length() > 1) {
                    XMLSerializer xs = new XMLSerializer();
                    respJson = (JSONObject) xs.read(resXMLString);                   
                    respJson = respJson.getJSONObject("S:Body").getJSONObject("ns2:instantNotificationResponse").getJSONObject("return");
                    respJson.put("ackId", respJson.getString("ackId"));
                    respJson.put("STATUS", respJson.getString("status"));
                    /*if (respJson.getString("status").equalsIgnoreCase("success")) {                      
                    
                    }else{
                        respJson.put("MESSAGE", respJson.getString("RESPONSE"));
                        respJson.put("STATUS", "1");
                    }*/
                } else {
           
                }

            }else{
                respJson.put("STATUS", "FAIL");
            }          
        } catch (Exception e) {            
            prErr("Error in sendNotification ::", e);
            respJson.put("STATUS", "FAIL");
        }

        return respJson;
    }

    public boolean sendInstantNotification(JSONObject data) {
        boolean status = false;
        try {
            prInfo("[CRSNotificationManager][sendInstantNotification][START]");
            prDebug("Request data [sendInstantNotification] ::" + data);
            JSONObject tempObj = null;//WfPropertyManager.getInstance().getWfPropertyMap().get("NOTIFICATION");
            tempObj.put("serviceURL", "http://10.48.24.13:8080/jalsweb/AlsNESoapService");
            tempObj.put("USER", "intense");
            tempObj.put("URL", "http://www.mgage.solutions/SendSMS/sendmsg.php");
            tempObj.put("PWD", "welcome1");
            tempObj.put("SENDER_ID", "BCACMS");
            JSONObject props=new JSONObject();
            mergeJson(tempObj, props);
            props.put("isFile", "true");
            props.put("contentType", "XML");
            props.put("requestType", "post");
            data.put("trans_id", data.getString("TRANSACTION_ID"));
            String filepath = "";
            if (data.containsKey("TYPE")) {
                filepath = WPContextListener.confgFilesPath + "Inst_Notifications_" + data.getString("TYPE") + ".xml" + File.separator;
            }
            prDebug("[CRSNotificationManager][sendInstantNotification] filepath ::" + filepath);
            props.put("requestFilePath", filepath);
            props.put("Params", data);
            AnyWebServiceInvoker.invokService(props);
            prInfo("Notification request sent");
            status = true;
        } catch (Exception e) {
            prErr("Error in sendInstantNotification ::", e);
        }

        return status;
    }
    
    public static JSONObject mergeJson(JSONObject src, JSONObject desc) {
        if (src != null & src.size() > 0) {
            Iterator<String> it = src.keys();
            while (it.hasNext()) {
                String key = it.next();
                desc.put(key, src.getString(key));
            }
        }
        return desc;
    }
        public JSONObject sendOTPFromBSNL(JSONObject data) {
        JSONObject respJson = new JSONObject();
        try {
            prDebug("Request data [sendOTPFromBSNL] ::" + data);
            JSONObject smsServerInfo = WfPropertyManager.getInstance().getWfPropertyMap().get("NOTIFICATION");
            prDebug("smsServerInfo :" + smsServerInfo);
            String bsnlUrl = data.getInt("BSNL_URL") == 1 ? smsServerInfo.getString("BSNL_URL") : smsServerInfo.getString("BSNL_URL_2");
            prDebug("bsnlUrl::" + bsnlUrl);
            String msg = data.getString("msg");
            msg = msg.replace(" ", "+");
            bsnlUrl = bsnlUrl.replace("@@MOBILENO@@", data.getString("MOBILE_NO"));
            bsnlUrl = bsnlUrl.replace("@@MSG@@", msg);
             prDebug("After replacement bsnlUrl::" + bsnlUrl);
            long serviceCalStartTime = new Date().getTime();
            prInfo("Service call start :" + serviceCalStartTime);
            URL obj = new URL(bsnlUrl);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("User-Agent", USER_AGENT);
            int responseCode = con.getResponseCode();
            prInfo("Response Code [sendOTPFromBSNL]: " + responseCode);
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();                    
            long serviceCalEndTime = new Date().getTime();
            prInfo("Service call end :" + serviceCalEndTime);
            String respnse = response.toString();
            prDebug("Respnse from BSNL :: " + respnse);                       
            respJson.put("errdesc", respnse);
            if(respnse.contains("0:"))
                respJson.put("STATUS", "PARTIAL");
            else
                respJson.put("STATUS", "-1");
        } catch (Exception e) {
            prErr("Error in sendOTPFromBSNL ::", e);
            respJson.put("STATUS", "-1");
        }
        return respJson;
    }
    public void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    public void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    public void prErr(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }    
}
