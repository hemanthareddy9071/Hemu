/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmsekyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSNotificationManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.fmskyc.FMS_NewForm;
import com.in10s.logger.AppLogger;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.Iterator;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author praveen.k
 */
public class FMSWingsCustomerSupport {
    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    
    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }
    
    public String fetchCustTockenValue() {
        prInfo("[FMSWingsCustomerSupport][fetchCustTockenValue] START");
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
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            String searchWith ="";
            prDebug("input request  in [fetchCustTockenValue] :: " + reqJson);
            if(reqJson.getString("serchTocken").equals("1")){
            searchWith= msgObj.getMessge("SEARCH_WITH_MOB_NO");
            }else if (reqJson.getString("serchTocken").equals("2")){
            searchWith=msgObj.getMessge("SEARCH_WITH_WLCAF");
            }else{
            searchWith=msgObj.getMessge("SEARCH_WITH_WINGS_MOB");
            }
            String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_CUST_TOK_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA).replace("@@SECONDRY_STRING@@", searchWith);
            prDebug("Query for fetchCustTockenValue : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[FMSWingsCustomerSupport][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("serchvalue"));
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
            prDebug("FMSWingsCustomerSupport:[cust data] " + circlesJson.toString());
                 JSONObject resultJson=customJsonFormat(circlesJson);
            if (resultJson.size() > 0) {
                resultJson.put("STATUS", "0");
                response.setSuccess(true); 
                response.setMessage(msgObj.getMessge("FETCH_CS_DATA_SUCCESS"));
                response.setResponseData(resultJson);
            } else {
                resultJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_CS_DATA_FAIL"));
                response.setResponseData(resultJson);
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMSWingsCustomerSupport][fetchCustTockenValue]:  ", ex);
            circlesJson.put("STATUS", "-1");
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_CIRCLES_ERROR"));
            response.setResponseData(circlesJson);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][loadFMSCircles] END");
        return "success";
    } 
   
    public  JSONObject customJsonFormat(JSONObject reqJson) {
        JSONObject respJson = new JSONObject();
        JSONArray DataArr = null;
        JSONObject jsonObject = null;
        JSONArray JsonArry = new JSONArray();
        prInfo("customJsonFormat::"+reqJson);
        CRSPropertyReader msgObj = new CRSPropertyReader();
        DataArr = reqJson.getJSONArray("Data");
        for (int i = 0; i < DataArr.size(); i++) {
            JSONObject jobJson = DataArr.getJSONObject(i);
            jsonObject = new JSONObject();
            Iterator<?> keys = jobJson.keys();
            while (keys.hasNext()) {
                String key = ((String) keys.next()).trim();
                String value = ((String) jobJson.get(key)).trim();
//                System.out.println("Key: " + key + " | Value: " + jobJson.get(key));
                jsonObject.put(key, value);
                String configValue = "";
                if (key.equalsIgnoreCase("PAY_STATUS")) {

                    if (value.equalsIgnoreCase("pending")) {
                        configValue = msgObj.getMessge("LABEL_PYMT_PENDING"+reqJson.optString("LABELS")); // TODO
                    } else if (value.equalsIgnoreCase("success")) {
                        configValue = msgObj.getMessge("LABEL_PYMT_SUCCESS"); // TODO
                    } else if (value.equalsIgnoreCase("failed")) {
                        configValue = msgObj.getMessge("LABEL_PYMT_FAIL");// TODO
                    }else{
                      configValue = msgObj.getMessge("LABEL_PYMT_PENDING"+reqJson.optString("LABELS")); 
                    }
                    jsonObject.put("PYMT_LABEL", configValue);
                } else if (key.equalsIgnoreCase("ACTION_DTLS")) {
                    if (value.equalsIgnoreCase("0")) {
                        configValue = msgObj.getMessge("LABEL_ACT_ZERO");
                    } else if (value.equalsIgnoreCase("1")) {
                        configValue = msgObj.getMessge("LABEL_ACT_ONE"+reqJson.optString("LABELS")).replace("@val@", jobJson.getString("CAF_NO"));
                    }
                   else if (value.equalsIgnoreCase("2")) {
                        configValue = msgObj.getMessge("LABEL_ACT_TWO"+reqJson.optString("LABELS")).replace("@val@", jobJson.getString("CAF_NO"));
                    }else{
                        configValue = msgObj.getMessge("LABEL_ACT_THREE"+reqJson.optString("LABELS"));
                   }
                    jsonObject.put("EKYC_LABLE", configValue);
                } else if (key.equalsIgnoreCase("WINGS_PIN")) {
                    if (value.isEmpty()) {
                        configValue = ""; // TODO
                    } else {
                        configValue = msgObj.getMessge("LABEL_ACTIVE");
                    }
                    jsonObject.put("ACTIVATION_LABEL", configValue);
                }

            }
            JsonArry.add(jsonObject);
        }
        respJson.put("Data", JsonArry);
        return respJson;
    }
   
    public String customerSupportPage() {
        prInfo("[FMSWingsCustomerSupport][customerSupportPage] ");
        return "success";
    }
    
    public String sendPaymentLink() {
        prInfo("[FMSWingsCustomerSupport][sendPaymentLink] ");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject cafData = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [sendPaymentLink] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("FETCH_PAY_LINL_REQ_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for sendPaymentLink : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[sendPaymentLink][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("CAF_NO"));
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
            cafData.put("Data", jobsArr);
            prDebug("sendPaymentLink Data: " + cafData.toString());
                 JSONObject resultJson=cafData.getJSONArray("Data").getJSONObject(0);
            if (resultJson.size() > 0) {
                
               boolean isNotified=prepareNotification(resultJson);
                if(isNotified){
                resultJson.put("STATUS", "0");
                response.setSuccess(true); 
                response.setMessage(msgObj.getMessge("FETCH_DATA_SUCCESS"));
                response.setResponseData(resultJson);
                }else{
                 resultJson.put("STATUS", "1");
                 response.setSuccess(false);
                }
            } else {
                resultJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_DATA_FAIL"));
                response.setResponseData(resultJson);
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMSWingsCustomerSupport][sendPaymentLink]:  ", ex);
            cafData.put("STATUS", "-1");
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_DATA_ERROR"));
            response.setResponseData(cafData);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        return "success";
    }
    
    public String sendOBLink() {
        prInfo("[FMSWingsCustomerSupport][sendOBLink] ");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject cafData = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [sendOBLink] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("FETCH_PAY_LINL_REQ_DTLS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for sendOBLink : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[sendPaymentLink][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("CAF_NO"));
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
            cafData.put("Data", jobsArr);
            prDebug("sendOBLink Data: " + cafData.toString());
                 JSONObject resultJson=cafData.getJSONArray("Data").getJSONObject(0);
            if (resultJson.size() > 0) {
                
               boolean isNotified=prepareNotification(resultJson);
                if(isNotified){
                resultJson.put("STATUS", "0");
                response.setSuccess(true); 
                response.setMessage(msgObj.getMessge("FETCH_DATA_SUCCESS"));
                response.setResponseData(resultJson);
                }else{
                 resultJson.put("STATUS", "1");
                 response.setSuccess(false);
                }
            } else {
                resultJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_DATA_FAIL"));
                response.setResponseData(resultJson);
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMSWingsCustomerSupport][sendOBLink]:  ", ex);
            cafData.put("STATUS", "-1");
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_DATA_ERROR"));
            response.setResponseData(cafData);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        return "success";
    }
    
    public boolean prepareNotification(JSONObject reqData) {

        prDebug("input request  in [prepareNotification] :: " + reqData);
        CRSPropertyReader msgObj = new CRSPropertyReader();
        boolean retVal = false;
        String url="";
        String urlType="";
        String msg="";
        try {
            if(reqData.containsKey("CAF_NO")&& !"".equalsIgnoreCase(reqData.optString("CAF_NO"))){
            JSONObject objCafNo = new JSONObject();
            objCafNo.put("CAF_NO", reqData.getString("CAF_NO"));
             url = msgObj.getMessge("PAY_REQ_LINK").replace("@@CAF_DATA@@", encrptString(objCafNo.toString()));
             urlType="Payment";
             msg= msgObj.getMessge("SEND_PAY_LINK").replace("@@URL@@", String.valueOf(url));
            }else{
            url = msgObj.getMessge("OB_PAY_LINK");
            urlType="Onboard and Payment";
            msg= msgObj.getMessge("SEND_OB_PAY_LINK").replace("@@URL@@", String.valueOf(url));
            }
            prDebug("[prepareNotification][URL] :: " + url);
            JSONObject messageJSON = new JSONObject();
            messageJSON.put("msg",msg);
            messageJSON.put("subject", "PAYMENT");
            messageJSON.put("MOBILE_NO", reqData.getString("CUST_MOBILE_NO"));
            messageJSON.put("EMAIL", reqData.getString("EMAIL"));
            messageJSON.put("TYPE", "S");
            messageJSON.put("sub_date", "");
            JSONObject resultJson = new CRSNotificationManager().sendNotification(messageJSON);
                JSONObject wingsLinksData = new JSONObject();
                wingsLinksData.put("CAF_NO", reqData.getString("WL_CAF_NO")); 
                wingsLinksData.put("EMAIL", reqData.getString("EMAIL"));
                wingsLinksData.put("MOBILE_NO", reqData.getString("CUST_MOBILE_NO"));
                wingsLinksData.put("ACKID", resultJson.optString("ackId", ""));
                wingsLinksData.put("LINK", url);
                wingsLinksData.put("LINK_TYPE", urlType);
                wingsLinkAudit(wingsLinksData);
            AppLogger.info("response fron [sendNotification]::" + resultJson);

            if ("PARTIAL".equalsIgnoreCase(resultJson.getString("STATUS")) || "SUCCESS".equalsIgnoreCase(resultJson.getString("STATUS"))) {
                retVal = true;
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("WINGS_SMS_SEND_SUCCESS"));
            } else {
                retVal = false;
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("WINGS_SMS_SEND_FAIL"));
            }
        } catch (Exception e) {
            prLog("Exception in  [prepareNotification]:  ", e);
            retVal = false;
            response.setSuccess(false);
        }

        return retVal;
    }
    
    public void wingsLinkAudit(JSONObject wingsLinksData){
        prInfo("[wingsLinkAudit][START]");
        prDebug("wingsLinkAudit Data :" + wingsLinksData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [wingsLinkAudit]  ::  " + con);
            String[] columns = {"ACKID", "CAF_NO", "EMAIL", "MOBILE_NO",  "LINK_TYPE", "LINK"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_LINK_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [wingsLinkAudit] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, wingsLinksData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("wingsLinkAudit count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in [wingsLinkAudit] :", e);
        } finally { 
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[wingsLinkAudit][END]");
    
    
    }
    
    public String encrptString(String inputString) throws ScriptException, NoSuchMethodException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        String script = "function encrypt(param) {     var Param1=param;         var key=\"1COLD5\";     var dest2=\"\";     var len=key.length;     var SrcAsc=-1, KeyPos=-1;     var offset=((Math.random()*10000)%255)+1;     dest2=decimalToHex(offset,2);     var myarr=dest2.toString().split(\".\");     var dest=myarr[0];     if(dest.length==1)         dest=\"0\"+dest;        for(var SrcPos=0;SrcPos<Param1.length;SrcPos++)     {         var ascii=(Param1.substring(SrcPos,SrcPos+1)).charAt(0);         ascii=ascii_value(ascii);         SrcAsc=parseInt((ascii+offset)%255);         if (KeyPos<len-1)             KeyPos++;         else KeyPos=0;         ascii=(key.substring(KeyPos,KeyPos+1)).charAt(0);         ascii=ascii_value(ascii);         SrcAsc=SrcAsc^ascii;         if(SrcAsc<=15)         {             dest2=decimalToHex(SrcAsc,2);             myarr=dest2.toString().split(\".\");             dest=dest+myarr[0];         }         else         {             dest2=decimalToHex(SrcAsc,2);             myarr=dest2.toString().split(\".\");             dest=dest+myarr[0];         }         offset=SrcAsc;     }         dest=dest.toUpperCase();        return dest; };function decimalToHex(d, padding) {     var hex = Number(d).toString(16);     padding = typeof (padding) === \"undefined\" || padding === null ? padding = 2 : padding;     while (hex.length < padding) {         hex = \"0\" + hex;     }     return hex; }; function ascii_value (c) {     c = c . charAt (0);     var i;     for (i = 0; i < 256; ++ i)     {         var h = i . toString (16);         if (h . length == 1)             h = \"0\" + h;         h = \"%\" + h;         h = unescape (h);         if (h == c)             break;     }     return i; };";
        engine.eval(script);
        Invocable inv = (Invocable) engine;
        String encString = (String) inv.invokeFunction("encrypt", inputString);

        return encString;
    }  
    
    public String loadWingscomplaint() {
        prInfo("[FMSWingsCustomerSupport][loadWingscomplaint] START");
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
            prDebug("input request  in [loadWingscomplaint] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_WINGS_COMPLAINTS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for LOAD_WINGS_COMPLAINTS : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[loadWingscomplaint][Connection]::" + con);
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
            prDebug("loadWingscomplaint: " + circlesJson.toString());

            if (circlesJson.size() > 0) {
                circlesJson.put("STATUS", "0");
                response.setSuccess(true); 
                response.setMessage(msgObj.getMessge("FETCH_COMPLAINTS_SUCCESS"));
                response.setResponseData(circlesJson);
            } else {
                circlesJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_COMPLAINTS_FAIL"));
                response.setResponseData(circlesJson);
            }

        } catch (Exception ex) {
            prLog("Exception in  [FMS_ekyc][loadFMSCircles]:  ", ex);
            circlesJson.put("STATUS", "-1");
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_COMPLAINTS_ERROR"));
            response.setResponseData(circlesJson);
        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMSWingsCustomerSupport][loadWingscomplaint] END");
        return "success";
    }
    
    public String submitWingsComplaint() {
        prInfo("[FMSWingsCustomerSupport][submitWingsComplaint] ");
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prDebug("input request  in [submitWingsComplaint] :: " + reqJson);
            if (prepareNEForComplaints(reqJson)) {
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("SUBMIT_COMPLAINT_SUCCESS"));
            } else {
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("SUBMIT_COMPLAINTS_FAIL"));
            }
        } catch (Exception ex) {
            prLog("Exception in  [FMSWingsCustomerSupport][submitWingsComplaint]:  ", ex);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("SUBMIT_COMPLAINTS_FAIL"));
        }
        return "success";
    }
     
    public boolean prepareNEForComplaints(JSONObject reqData) {
        prDebug("input request  in [prepareNEForComplaints] :: " + reqData);
        CRSPropertyReader msgObj = new CRSPropertyReader();
        boolean retVal = false;
        String msg="";
        try {
            msg=reqData.getString("SUBJECT");
            JSONObject messageJSON = new JSONObject();
            messageJSON.put("msg",msg);
            messageJSON.put("subject", "PAYMENT");
            messageJSON.put("EMAIL", reqData.getString("TO_EMAIL"));
            messageJSON.put("MOBILE_NO", "");
            messageJSON.put("TYPE", "S");
            JSONObject resultJson = new CRSNotificationManager().sendNotification(messageJSON);
                JSONObject wingsComplaintsData = new JSONObject();
                wingsComplaintsData.put("FROM_EMAIL", reqData.getString("FROM_EMAIL")); 
                wingsComplaintsData.put("TO_EMAIL", reqData.getString("TO_EMAIL"));
                wingsComplaintsData.put("COMPLAINT_ID", reqData.getString("COMPLAINT_TYPE"));
                wingsComplaintsData.put("ACKID", resultJson.optString("ackId", ""));
                wingsComplaintsData.put("STATUS", resultJson.optString("STATUS", ""));
                wingsComplaintsData.put("MAIL_CONTENT", msg);
                wingsComplaintAudit(wingsComplaintsData);
            AppLogger.info("response fron [sendNotification]::" + resultJson);
            if ("PARTIAL".equalsIgnoreCase(resultJson.getString("STATUS")) || "ACCEPTED".equalsIgnoreCase(resultJson.getString("STATUS"))) {
                retVal = true;
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("WINGS_SMS_SEND_SUCCESS"));
            } else {
                retVal = false;
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("WINGS_SMS_SEND_FAIL"));
            }
        } catch (Exception e) {
            prLog("Exception in  [prepareNotification]:  ", e);
            retVal = false;
            response.setSuccess(false);
        }
        return retVal;
    }
     
    public void wingsComplaintAudit(JSONObject wingsComplaintData){
        prInfo("[wingsComplaintAudit][START]");
        prDebug("wingsComplaintAudit Data :" + wingsComplaintData);
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [wingsComplaintAudit]  ::  " + con);
            String[] columns = {"ACKID", "FROM_EMAIL", "TO_EMAIL", "COMPLAINT_ID",  "STATUS", "MAIL_CONTENT"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("WINGS_COMPLAINT_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [wingsComplaintAudit] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, wingsComplaintData.optString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("wingsComplaintAudit count :: " + insCount);
            if (insCount == 1) {
                status = true;
            }
        } catch (Exception e) {
            prLog("Error in [wingsComplaintAudit] :", e);
        } finally { 
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[wingsComplaintAudit][END]");
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
