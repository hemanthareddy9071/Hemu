/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmsekyc;

import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramu
 */
public class FMSReserveNumbers {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String FMSunReserveCYMNNos() {
        AppLogger.info("starting of loadWingsMobileNos method in FMSReserveNumbers");
        JSONObject CYMNNosObj = null;
        JSONArray CYMNNosData = new JSONArray();
        boolean searchFlag = false;
        String facevalue = "0";

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in loadWingsMobileNos method is :  " + strReqData);
            String cymn_srch_num = reqJson.getString("cymn_srch_num");
            String searchoperator = reqJson.getString("searchoperator");
            String cymn_total_dig = reqJson.getString("cymn_total_dig");
            String caf_type = reqJson.getString("caf_type");
            String currentPage = reqJson.getString("currentPage");

            if (cymn_srch_num.length() > 0) {
                searchFlag = true;
            }
            if (cymn_total_dig.length() > 0) {
                facevalue = cymn_total_dig;
                searchFlag = true;
            }

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/loadWingsMobileNos";
            AppLogger.debug("onBoardURL for loadWingsMobileNos method is : " + serviceURL);
            JSONObject umJOBJNew = new JSONObject();
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            umJOBJNew = (JSONObject) loginResponse.discard("DeviceLocations");
            String fmsCircle=getFmsCircle(umJOBJNew.getString("State"));
            umJOBJNew.put("FMSCircle", fmsCircle);
            String inputFieldsEntity = "{\"filter\":\"" + caf_type + "\",\"CIRCLE_CODE\":\"" + loginResponse.getString("CircleCode") + "\",\"zone\":\"" + loginResponse.getString("CircleZoneCode") + "\",\"pageno\":\"" + currentPage + "\",\"facevalue\": \"" + facevalue + "\",\"searchFlag\": \"" + searchFlag + "\", \"searchoperator\": \"" + searchoperator + "\", \"searchstring\": \"" + cymn_srch_num + "\",\"JOB_SOURCE\":\"T\",\"UNIPACK_DATA\":" + umJOBJNew + ",\"JOB_USER\":" + loginResponse.getString("UserFlag") + ",\"USER_ID\":\"" + loginResponse.getString("UserId") + "\"}";
            AppLogger.debug("Input data  for  services in loadWingsMobileNos method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from  services in loadWingsMobileNos method is : " + strJobsCurrentStatus);
            CYMNNosObj = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            if (CYMNNosObj.containsKey("STATUS")) {
                session.setAttribute("CYMN_SOURCE", CYMNNosObj.get("CYMN_SOURCE"));
                response.setSuccess(true);
                response.setResponseData(CYMNNosObj);
            } else {
                AppLogger.debug("Status key missing in loadWingsMobileNos services repsonse is : " + CYMNNosObj);
                response.setSuccess(false);
                response.setResponseData(CYMNNosObj);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in  FMSunReserveCYMNNos method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of FMSunReserveCYMNNos method in FMSReserveNumbers");
        return "success";
    }
    
    public String getFmsCircle(String StateCode) {
        AppLogger.info("[FMSunReserveCYMNNos][getFmsCircle] START");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        String colValue = "";
        try {
            String fetchQry = new CRSPropertyReader().getQueryonId("LOAD_FMS_CIRCLE_CODE").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            AppLogger.info("Query for getFmsCircle : " + fetchQry);
            con = CRSDBManager.getConnection();
            AppLogger.info("[getFmsCircle][Connection]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, StateCode);
            resultSet = pstmt.executeQuery();
            while (resultSet.next()) {
                colValue = resultSet.getString(1);
            }
             AppLogger.info("fmsCircle: " + colValue);
        } catch (Exception e) {
            AppLogger.info("Exception in  [FMSunReserveCYMNNos][getFmsCircle]:  " + e);

        } finally {
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closeCon(con);

        }

        return colValue;
    }
    public String reserveMobile() {
        AppLogger.info("starting of reserveMobile method in FMSReserveNumbers");
        JSONObject resrvMoblSubmtJObj = null;
        response = new CRSResponse();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in reserveMobile method is : " + reqJson);
            String mobileNo = reqJson.getString("gsmNumber");
            String gsmSeleType = reqJson.getString("reserveNumType");
            String price = reqJson.getString("price");;
            if (gsmSeleType.trim().equalsIgnoreCase("")) {
                gsmSeleType = "CYMN";
            }

            AppLogger.debug("gsmSeleType in reserveMobile method is : " + gsmSeleType);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");

            session.setAttribute("CAF_TYPE", gsmSeleType);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            AppLogger.debug("onBoardURL in reserveMobile method is : " + onBoardURL);
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/CYMNService/reserveNo";
            String AadharLoginFlag = loginResponse.getString("AadharLoginFlag");
            String usrMobileNo = "";
            if (AadharLoginFlag.equalsIgnoreCase("0")) {
                usrMobileNo = "";
            } else {
                usrMobileNo = loginResponse.getString("UserName");
            }
            String inputFieldsEntity = "{\"gsmno\":\"" + mobileNo + "\",\"usermobile\":\"" + usrMobileNo + "\",\"filter\":\"RESERVE\",\"zone\":\"" + loginResponse.getString("CircleZoneCode") + "\",\"SOURCE\":\"T\",\"type\":\"" + gsmSeleType + "\",\"JOB_TYPE\":\"" + session.getAttribute("KYCType") + "\",\"USER_ID\":\"" + loginResponse.getString("UserId") + "\",\"CIRCLE_CODE\":\"" + loginResponse.getString("CircleCode") + "\",\"DB_LINK\":\"" + loginResponse.getString("DBLink") + "\",\"BO_DBLink\":\"" + loginResponse.getString("BODbLink") + "\",\"SS_CODE\":\"" + loginResponse.getString("UserCode") + "\",\"AGENT_TYPE\":\"" + loginResponse.getString("AgentUserType") + "\",\"USER_FLAG\":\"" + loginResponse.getString("UserFlag") + "\",\"LOGIN_ID\":\"" + loginResponse.getString("UserName") + "\",\"PRICE\":\"" + price + "\",\"CYMN_SOURCE\":\"" + session.getAttribute("CYMN_SOURCE") + "\"}";
            AppLogger.debug("Input data  for reserveNo service in reserveMobile method is : " + inputFieldsEntity);
            String resrvMoblSubmtRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from reserveNo service in reserveMobile method is : " + resrvMoblSubmtRes);
            resrvMoblSubmtJObj = (JSONObject) JSONSerializer.toJSON(resrvMoblSubmtRes);
//            resrvMoblSubmtJObj = (JSONObject) JSONSerializer.toJSON("{\"STATUS\":\"0\",\"RESPONSE\":\"Selected Number has been reserved successfully...\",\"PIN\":\"6840217\",\"MESSAGE\":\"Selected Number has been reserved successfully...\",\"GSMNO\":\"7901269534\",\"USERMOBILE\":\"8985414432\",\"AMOUNT\":0,\"DISCOUNT\":0,\"TAX\":0,\"TOTAL_AMT\":0}");
            //AMOUNT
            if (resrvMoblSubmtJObj.getString("AMOUNT").equalsIgnoreCase("")) {
                session.setAttribute("AMOUNT", "0");
                AppLogger.debug("Amount in reserveMobile method is if empty : \t" + session.getAttribute("AMOUNT"));
            } else {
                session.setAttribute("AMOUNT", resrvMoblSubmtJObj.get("AMOUNT").toString());
                AppLogger.debug("Amount in reserveMobile method is :\t" + session.getAttribute("AMOUNT"));

            }
            //DISCOUNT
            if (resrvMoblSubmtJObj.getString("DISCOUNT").equalsIgnoreCase("")) {
                session.setAttribute("DISCOUNT", "0");
                AppLogger.debug("DISCOUNT in reserveMobile method is :\t" + session.getAttribute("DISCOUNT"));
            } else {
                session.setAttribute("DISCOUNT", resrvMoblSubmtJObj.get("DISCOUNT").toString());
                AppLogger.debug("DISCOUNT in reserveMobile method is :\t" + session.getAttribute("DISCOUNT"));
            }
            //TAX
            if (resrvMoblSubmtJObj.getString("TAX").equalsIgnoreCase("")) {
                session.setAttribute("TAX", "0");
                AppLogger.debug("TAX in reserveMobile method is :\t" + session.getAttribute("TAX"));
            } else {
                session.setAttribute("TAX", resrvMoblSubmtJObj.get("TAX").toString());
                AppLogger.debug("TAX in reserveMobile method is :\t" + session.getAttribute("TAX"));
            }
            //TOTAL_AMT
            if (resrvMoblSubmtJObj.getString("TOTAL_AMT").equalsIgnoreCase("")) {
                session.setAttribute("TOTAL_AMT", "0");
                AppLogger.debug("TOTAL_AMT in reserveMobile method is :\t" + session.getAttribute("TOTAL_AMT"));
            } else {
                session.setAttribute("TOTAL_AMT", resrvMoblSubmtJObj.get("TOTAL_AMT").toString());

                AppLogger.debug("TOTAL_AMT in reserveMobile method is :\t" + session.getAttribute("TOTAL_AMT"));
            }
            response.setSuccess(true);
            response.setResponseData(resrvMoblSubmtJObj);
//            resrvMoblSubmtJObj.get("AMOUNT");

        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.debug("Exception in reserveMobile method is :  " + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of reserveMobile method in FMSReserveNumbers");
        return "success";
    }

    public String fetchReserveNo() {
        AppLogger.info("Starting of fetchReserveNo method in FMSReserveNumbers");
        JSONObject resrvedNosJobj = null;
        JSONArray resrvedNosJArr = null;
        response = new CRSResponse();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();

            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in fetchReserveNo method is : " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject umJOBJNew = new JSONObject();
            umJOBJNew = (JSONObject) loginResponse.discard("DeviceLocations");
            AppLogger.debug("Unipack response  in fetchReserveNo method is : " + umJOBJNew);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/CYMNService/getReserveNosWithStatus";
            AppLogger.debug("onBoardURL in fetchReserveNo method is : " + serviceURL);
//            String inputFieldsEntity = "{\"LOGIN_ID\":\"" + CRSSession.getInstance().getAttribute("UserName") + "\",\"JOB_USER\":\"" + CRSSession.getInstance().getAttribute("UserFlag") + "\",\"USER_ID\":\"" + CRSSession.getInstance().getAttribute("UserId") + "\",\"SSA_CODE\":\"" + CRSSession.getInstance().getAttribute("SSACode") + "\",\"ZONE_CODE\":\"" + CRSSession.getInstance().getAttribute("CircleZoneCode") + "\",\"SOURCE\":\"T\",\"CTOPUP\":\"\",\"SS_CODE\":\"" + (String) CRSSession.getInstance().getAttribute("UserCode") + "\",\"UNIPACK_DATA\":" + umJOBJNew + ",\"CIRCLE_CODE\":\"" + CRSSession.getInstance().getAttribute("CircleCode") + "\",\"USER_FLAG\":\"" + CRSSession.getInstance().getAttribute("UserFlag") + "\"}";
            String inputFieldsEntity = "{\"LOGIN_ID\":\"" + loginResponse.getString("UserName") + "\",\"JOB_USER\":\"" + loginResponse.getString("UserFlag") + "\",\"USER_ID\":\"" + loginResponse.getString("UserId") + "\",\"SSA_CODE\":\"" + loginResponse.getString("SSACode") + "\",\"ZONE_CODE\":\"" + loginResponse.getString("CircleZoneCode") + "\",\"SOURCE\":\"T\",\"CTOPUP\":\"" + (String) loginResponse.getString("Activation_MobileNo") + "\",\"SS_CODE\":\"" + loginResponse.getString("UserCode") + "\",\"UNIPACK_DATA\":" + umJOBJNew + ",\"CIRCLE_CODE\":\"" + loginResponse.getString("CircleCode") + "\",\"USER_FLAG\":\"" + loginResponse.getString("UserFlag") + "\"}";
            AppLogger.debug("Input data for getReserveNosWithStatus service in fetchReserveNo method is : " + inputFieldsEntity);
            String getResrvedNosWTHStausRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from getReserveNosWithStatus service in fetchReserveNo method is : " + getResrvedNosWTHStausRes);

            resrvedNosJobj = (JSONObject) JSONSerializer.toJSON(getResrvedNosWTHStausRes);

            if (resrvedNosJobj.containsKey("STATUS")) {
                if (resrvedNosJobj.getString("STATUS").equalsIgnoreCase("0")) {
                    resrvedNosJArr = resrvedNosJobj.getJSONArray("RESERVE_NOS");
                } else {
                    if (resrvedNosJobj.containsKey("MESSAGE")) {
                    } else {
                        AppLogger.debug("MESSAGE key missing in getReserveNosWithStatus service repsonse is : " + resrvedNosJobj);
                    }
                }
            } else {

                AppLogger.debug("Status key missing in getReserveNosWithStatus service repsonse is : " + resrvedNosJobj);
            }
            response.setSuccess(true);
            response.setResponseData(resrvedNosJobj);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in fetchReserveNo method is :  " + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of fetchReserveNo method in FMSReserveNumbers");
        return "success";
    }

    public String payFancyAmount() {
        AppLogger.info("Starting of payFancyAmount method in FMSReserveNumbers");
        JSONObject paisFancyNosJobj = null;
        response = new CRSResponse();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in payFancyAmount method is : " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            String copup_no = reqJson.getString("copup_no");
            String copup_mpin = reqJson.getString("copup_mpin");
            String gsmNumber = reqJson.getString("gsmNumber");
            String TxnID = reqJson.getString("TxnID");
            String TxnType = reqJson.getString("TxnType");
            String PRICE = reqJson.getString("PRICE");

            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            JSONObject umJOBJNew = new JSONObject();

            umJOBJNew = (JSONObject) loginResponse.discard("DeviceLocations");
            AppLogger.debug("unipack response in payFancyAmountmethod is : " + umJOBJNew);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/CYMNService/payAmount";
            AppLogger.debug("onBoardURL in payFancyAmountmethod is :  " + serviceURL);
//            String inputFieldsEntity = "{\"LOGIN_ID\":\"" + CRSSession.getInstance().getAttribute("UserName") + "\",\"JOB_USER\":\"" + CRSSession.getInstance().getAttribute("UserFlag") + "\",\"USER_ID\":\"" + CRSSession.getInstance().getAttribute("UserId") + "\",\"SSA_CODE\":\"" + CRSSession.getInstance().getAttribute("SSACode") + "\",\"ZONE_CODE\":\"" + CRSSession.getInstance().getAttribute("CircleZoneCode") + "\",\"SOURCE\":\"T\",\"CTOPUP\":\"\",\"SS_CODE\":\"" + (String) CRSSession.getInstance().getAttribute("UserCode") + "\",\"UNIPACK_DATA\":" + umJOBJNew + ",\"CIRCLE_CODE\":\"" + CRSSession.getInstance().getAttribute("CircleCode") + "\",\"USER_FLAG\":\"" + CRSSession.getInstance().getAttribute("UserFlag") + "\",\"MPIN\":\"\",\"GSMNO\":\"\",}";
            String inputFieldsEntity = "{\"LOGIN_ID\":\"" + loginResponse.getString("UserName") + "\",\"JOB_USER\":\"" + loginResponse.getString("UserFlag") + "\",\"USER_ID\":\"" + loginResponse.getString("UserId") + "\",\"SSA_CODE\":\"" + loginResponse.getString("SSACode") + "\",\"ZONE_CODE\":\"" + loginResponse.getString("CircleZoneCode") + "\",\"SOURCE\":\"T\",\"CTOPUP\":\"" + copup_no + "\",\"SS_CODE\":\"" + (String) loginResponse.getString("UserCode") + "\",\"UNIPACK_DATA\":" + umJOBJNew + ",\"CIRCLE_CODE\":\"" + loginResponse.getString("CircleCode") + "\",\"USER_FLAG\":\"" + loginResponse.getString("UserFlag") + "\",\"MPIN\":\"" + copup_mpin + "\",\"GSMNO\":\"" + gsmNumber + "\",\"TXN_ID\":\"" + TxnID + "\",\"TRANS_TYPE\":\"" + TxnType + "\",\"PRICE\":\"" + PRICE + "\"}";
            AppLogger.debug("Input data  for payAmount service in  payFancyAmountmethod method is :" + inputFieldsEntity);
            String payFancyAmountRes = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from  payAmount service in  payFancyAmountmethod method is :" + payFancyAmountRes);

            paisFancyNosJobj = (JSONObject) JSONSerializer.toJSON(payFancyAmountRes);
            response.setSuccess(true);
            response.setResponseData(paisFancyNosJobj);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in payFancyAmount method is :" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of payFancyAmount method in FMSReserveNumbers");
        return "success";
    }
    
    public String IsSelectedNumberBlocked() {

        AppLogger.info("starting of isSelectedNumberBlocked");
        JSONObject selMobNOObj = null;
       
        boolean searchFlag = false;
        String facevalue = "0";

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in isSelectedNumberBlocked method is :  " + strReqData);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Wings/selWingsMobileNoCheck";
            AppLogger.debug("onBoardURL for isSelectedNumberBlocked method is : " + serviceURL);
            JSONObject umJOBJNew = new JSONObject();
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("isSelectedNumberBlocked loginResponse::" + loginResponse.toString());
            String inputFieldsEntity = "{\"CIRCLE_SH_CODE\":\"" + loginResponse.getString("CIRCLE_SH_CODE") + "\",\"SEL_MOB_NO\":\"" + reqJson.getString("SEL_MOB_NO") + "\"}";
            AppLogger.debug("Input data  for isSelectedNumberBlocked method is : " + inputFieldsEntity);

            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from isSelectedNumberBlocked method is : " + strJobsCurrentStatus);
            selMobNOObj = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            if (selMobNOObj.containsKey("STATUS")) {
                if (selMobNOObj.getString("STATUS").equalsIgnoreCase("0")) {
                    AppLogger.debug("SelectedNumber is Valid");
                    response.setSuccess(true);
                    response.setResponseData(selMobNOObj);
                } else {
                    AppLogger.debug("SelectedNumber is Already Booked");
                    response.setSuccess(false);
                    response.setResponseData(selMobNOObj);
                }
            } else {
                AppLogger.debug("Status key missing in isSelectedNumberBlocked services repsonse is : " + selMobNOObj);
                response.setSuccess(false);
                response.setResponseData(selMobNOObj);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in  isSelectedNumberBlocked method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of isSelectedNumberBlocked");
        return "success";
    }
}
