/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.menuActions;

import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSResourcesInfo;
import com.in10s.commons.CRSResponse;
import com.in10s.commons.CRSSession;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramesh.a
 */
public class CRSFMSUploadJobsAndCount {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String FMSUploadJobs() {
        JSONObject FMSUploadJobsJOB = null, JobData1 = null;
        JSONArray JobData = new JSONArray();
        String FMSJobsCount = null;
        JSONObject FMSjobKeys = null;
        JSONArray jobArraykeyList = new JSONArray();
        AppLogger.info("Starting of Getting FMS Uploaded Jobs");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("input request from Getting FMS Uploaded Jobs::::::" + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getFMSUploadJobs";
            AppLogger.info("serviceURL for Getting FMS Uploaded Jobs:::  " + serviceURL);
//            String serviceURL = "http://192.168.5.79:2021/OnboardService/bsnl/Exchange/getFMSUploadJobs";
//                "{CIRCLE_CODE:" + CRSSession.getInstance().getAttribute("CircleCode") + ",connection_type:\"" + connection + "\"}";
            JSONObject inputFields = new JSONObject();
            inputFields.put("SOURCE", "T");
            inputFields.put("FRANCHISE_CODE", "");
//        inputFields.put("JOB_TYPE", "KYC");
            inputFields.put("USER_ID", loginResponse.getString("UserId"));
//            inputFields.put("USER_ID", "77");
            inputFields.put("CIRCLE_SH_CODE", loginResponse.getString("FMSCircle"));
            inputFields.put("ZONE_SH_CODE", loginResponse.getString("FMSZone"));
            inputFields.put("SSA_CODE", loginResponse.getString("FMSSSACode"));
//        inputFields.put("USER_FLAG", loginRes.getString("UserFlag"));
//        inputFields.put("CIRCLE_CODE", loginRes.getString("CircleCode"));
            String inputFieldsEntity = inputFields.toString();
//            String inputFieldsEntity = "{\"SOURCE\":\"T\",\"FRANCHISE_CODE\":\"\",\"USER_ID\":\"" + CRSSession.getInstance().getAttribute("UserId") + "\",\"CIRCLE_SH_CODE\":\"" + CRSSession.getInstance().getAttribute("FMSCircle") + "\",\"ZONE_SH_CODE\":\"" + CRSSession.getInstance().getAttribute("FMSZone") + "\",\"SSA_CODE\":\"" + CRSSession.getInstance().getAttribute("FMSSSACode") + "\"}";
            AppLogger.debug("Input request for Getting FMS Uploaded Jobs from Service :::: " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Service Response for Getting FMS Uploaded Jobs from Service: " + strJobsCurrentStatus);
            FMSUploadJobsJOB = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            String reqMessage = FMSUploadJobsJOB.getString("MESSAGE");
            if (FMSUploadJobsJOB.containsKey("STATUS")) {
                if (FMSUploadJobsJOB.getString("STATUS").equalsIgnoreCase("0")) {
                    if (FMSUploadJobsJOB.containsKey("UPLOADED_JOBS")) {
                        JobData = FMSUploadJobsJOB.getJSONArray("UPLOADED_JOBS");
                        FMSJobsCount = FMSUploadJobsJOB.getString("UPLOADED_JOBS_COUNT");
                    }
                    JSONObject grodJOBJ = FMSUploadJobsJOB.getJSONObject("FIELD_DATA_TYPES");
                    JSONObject grodColsJOBJ = null;
                    JSONObject gridfieldsJOBJ = null;
                    JSONObject gridFinlfieldJOBJ = new JSONObject();
                    JSONArray grodColsJARR = new JSONArray();
                    for (Object key : grodJOBJ.keySet()) {
                        gridfieldsJOBJ = new JSONObject();
                        grodColsJOBJ = new JSONObject();
                        grodColsJOBJ.put("field", key);
                        grodColsJOBJ.put("title", "<font color='black'>" + key.toString().replaceAll("_", " ") + "</font>");
                        grodColsJOBJ.put("width", 160);
                        grodColsJARR.add(grodColsJOBJ);
                        gridfieldsJOBJ.put("type", grodJOBJ.getString(key.toString()));
                        gridFinlfieldJOBJ.put(key, gridfieldsJOBJ);
                    }
                    AppLogger.debug("Grid column arrray in FMS Uploaded Jobs:::::" + grodColsJARR);
                    AppLogger.debug("Grid Fields object in FMS Uploaded Jobs:::::" + gridFinlfieldJOBJ);
//                    session.setAttribute("gridColumnArray", grodColsJARR.toString());
//                    session.setAttribute("gridFieldObj", gridFinlfieldJOBJ.toString());
                    FMSUploadJobsJOB.put("gridColumnArray", grodColsJARR.toString());
                    FMSUploadJobsJOB.put("gridFieldObj", gridFinlfieldJOBJ.toString());
                    response.setSuccess(true);
                    response.setResponseData(FMSUploadJobsJOB);
                    response.setMessage(reqMessage);

                } else {
                    response.setSuccess(false);
                    response.setMessage(reqMessage);
                    response.setResponseData(FMSUploadJobsJOB);
                }
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.debug("Exception While Getting FMS Uploaded Jobs" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception While Getting FMS Uploaded Jobs");
        }
        AppLogger.info("Ending of Getting FMS Uploaded Jobs");
        return "success";
    }
}
