/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.menuActions;

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
import java.sql.ResultSetMetaData;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramu.k
 */
public class CRSFmsDashboard {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    String franchiseCode = null;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String fmsFetchCurdayStatus() {
        AppLogger.info(" Starting fmsFetchCurdayStatus grid load method in CRSFmsDashboard ");
        String retValue = "success";
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject CurdaylstJOBJ = null;
        try {

            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            response = new CRSResponse();
            session.setAttribute("respMsg", "");

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("Request for client: " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            con = CRSDBManager.getConnection();
            AppLogger.info("Database Connection object is Created");
            JSONArray CurdayARR = new JSONArray();
            JSONObject CurdayJOBJ = null;
            CurdaylstJOBJ = new JSONObject();
            String FMS_CUR_DAY_STATUS_QRY = new CRSPropertyReader().getQueryonId("FMS_CUR_DAY_STATUS_QRY").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
             pstmt = con.prepareStatement(FMS_CUR_DAY_STATUS_QRY);
            JSONArray frachiseInfoArr = (JSONArray.fromObject(loginResponse.getString("FranchiseeInfo")));
            for (int i = 0; i < frachiseInfoArr.size(); i++) {
                franchiseCode = frachiseInfoArr.getJSONObject(i).getString("FranchiseeCode");

            }
            pstmt.setString(1, franchiseCode);
            AppLogger.debug("fmsFetchCurdayStatus quary is:::" + FMS_CUR_DAY_STATUS_QRY);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                CurdayJOBJ = new JSONObject();
                CurdayJOBJ.put("TOT_CNT", rs.getString("TOT_COUNT"));
                CurdayJOBJ.put("SUCCESS_CNT", rs.getString("SUCCESS_COUNT"));
                CurdayJOBJ.put("REJ_CNT", rs.getString("REJECTED_COUNT"));
                CurdayJOBJ.put("PEN_CNT", rs.getString("PENDING_COUNT"));
                CurdayARR.add(CurdayJOBJ);
            }
            if (CurdayARR.isEmpty()) {
                CurdaylstJOBJ.put("STATUS", "1");
                CurdaylstJOBJ.put("MESSAGE", "Current day status not availble");
                CurdaylstJOBJ.put("CUR_DAY_STATUS_LST", CurdayARR);
            } else {
                CurdaylstJOBJ.put("STATUS", "0");
                CurdaylstJOBJ.put("MESSAGE", "Current day status report data fetched successfully");
                CurdaylstJOBJ.put("CUR_DAY_STATUS_LST", CurdayARR);
            }
            AppLogger.debug("fmsFetchCurdayARR ::: " + CurdayARR);
            response.setSuccess(true);
            response.setResponseData(CurdaylstJOBJ);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            response.setSuccess(false);
            AppLogger.error("Exception in fmsFetchCurdayStatus grid load method : " + sw.toString());
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
                rs = null;
            }

            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (Exception e) {
                }
                pstmt = null;
            }

            if (con != null) {
                try {
                    con.close();
                } catch (Exception e) {
                }
                con = null;
            }
        }
        AppLogger.info(" Ending of fmsFetchCurdayStatus grid load method ");
        return retValue;
    }

    public String fmsFetchBarGraphValues() {
        AppLogger.info(" Starting fmsFetchBarGraphValues grid load method ");
        String retValue = "success";
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject BarGraphJOBJ = null;
        try {

            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            response = new CRSResponse();
            session.setAttribute("respMsg", "");

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("Request for client: " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            con = CRSDBManager.getConnection();
            AppLogger.info("Database Connection object is Created");
            JSONArray BarGraphARR = new JSONArray();
            BarGraphJOBJ = new JSONObject();
            String FMS_BAR_GRAPH_QRY = new CRSPropertyReader().getQueryonId("FMS_BAR_GRAPH_QRY").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
             pstmt = con.prepareStatement(FMS_BAR_GRAPH_QRY);
            pstmt.setString(1, franchiseCode);
            pstmt.setString(2, reqJson.getString("minDate"));
            pstmt.setString(3, reqJson.getString("maxDate"));
            AppLogger.debug("fmsFetchBarGraphValues quary is:::" + FMS_BAR_GRAPH_QRY);
            rs = pstmt.executeQuery();
            ResultSetMetaData rsmd = rs.getMetaData();
            JSONObject headerList = new JSONObject();
            System.out.println("name of the column::::::::::::" + rs.getFetchSize());
            String name = "";
            try {
                for (int i = 1; i <= rs.getFetchSize(); i++) {
                    name = rsmd.getColumnName(i);
                    headerList.put(i + "", WordUtils.capitalizeFully(StringUtils.substringBefore(name, "_")));

                }
            } catch (Exception e) {
            }
            System.out.println("headerList::::::::::::::::::::" + headerList);
            while (rs.next()) {
                for (int i = 1; i <= headerList.size(); i++) {
                    JSONArray dtaArray = new JSONArray();
                    JSONObject jOBJ1 = new JSONObject();
                    String dataValues = rs.getString(i);
                    if (dataValues == null) {
                        BarGraphJOBJ.put("STATUS", "1");
                        BarGraphJOBJ.put("MESSAGE", "CAF Entry data are not availble");
                    } else {
                        jOBJ1.put("name", headerList.getString(i + ""));
                        AppLogger.debug("Null values ");
                        dtaArray.add(Integer.parseInt(rs.getString(i)));
                        jOBJ1.put("data", dtaArray);
                        if (headerList.getString(i + "").equalsIgnoreCase("Success")) {
                            jOBJ1.put("color", "#a8c374");
                        } else if (headerList.getString(i + "").equalsIgnoreCase("Pending")) {
                            jOBJ1.put("color", "#ffc539");
                        } else {
                            jOBJ1.put("color", "#dd6061");
                        }
                        BarGraphARR.add(jOBJ1);
                    }
                }
            }
            if (BarGraphARR.isEmpty()) {
                BarGraphJOBJ.put("STATUS", "1");
                BarGraphJOBJ.put("MESSAGE", "CAF Entry data are not availble");
                BarGraphJOBJ.put("BAR_GRAPH_LST", BarGraphARR);
            } else {
                BarGraphJOBJ.put("STATUS", "0");
                BarGraphJOBJ.put("MESSAGE", "CAF Entry data fetched successfully");
                BarGraphJOBJ.put("BAR_GRAPH_LST", BarGraphARR);
            }
            AppLogger.debug("BarGraphARR ::: " + BarGraphARR);
            response.setSuccess(true);
            response.setResponseData(BarGraphJOBJ);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            response.setSuccess(false);
            AppLogger.error("Exception in fmsFetchBarGraphValues grid load method : " + sw.toString());
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
                rs = null;
            }

            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (Exception e) {
                }
                pstmt = null;
            }

            if (con != null) {
                try {
                    con.close();
                } catch (Exception e) {
                }
                con = null;
            }
        }
        AppLogger.info(" Ending of fmsFetchBarGraphValues grid load method ");
        return retValue;
    }

    public String fmsFetchPieGraphValues() {
        AppLogger.info(" Starting fmsFetchPieGraphValues grid load method ");
        String retValue = "success";
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        JSONObject PieGraphJOBJ = null;
        try {

            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            response = new CRSResponse();
            session.setAttribute("respMsg", "");

            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("Request for client: " + reqJson);
            String strBrowserId = reqJson.getString("reqSessionId");
            String sessionAndBId[] = strBrowserId.split("@#@");
            String browserId = sessionAndBId[1];
            response.setBrowserId(browserId);

            con = CRSDBManager.getConnection();
            AppLogger.info("Database Connection object is Created");
            JSONArray PieGraphARR = new JSONArray();
            JSONObject PieGraphJSONOBJ = null;
            PieGraphJOBJ = new JSONObject();
            String FMS_PIE_GRAPH_QRY = new CRSPropertyReader().getQueryonId("FMS_PIE_GRAPH_QRY").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
             pstmt = con.prepareStatement(FMS_PIE_GRAPH_QRY);

            pstmt.setString(1, franchiseCode);
            pstmt.setString(2, reqJson.getString("minDate"));
            pstmt.setString(3, reqJson.getString("maxDate"));

            AppLogger.debug("fmsFetchPieGraphValues quary is:::" + FMS_PIE_GRAPH_QRY);
            rs = pstmt.executeQuery();

            ResultSetMetaData rsmd = rs.getMetaData();
            JSONObject headerList = new JSONObject();
            System.out.println("name of the column::::::::::::" + rs.getFetchSize());
            String name = "";
            try {
                for (int i = 1; i <= rs.getFetchSize(); i++) {
                    name = rsmd.getColumnName(i);
                    System.out.println(":::substring::::::::::::::::::::::" + name.replace("_", " "));
                    headerList.put(i + "", WordUtils.capitalizeFully((name.replace("_", " "))));

                }
            } catch (Exception e) {
            }
            while (rs.next()) {
                for (int i = 1; i <= headerList.size(); i++) {
                    JSONObject jOBJ1 = new JSONObject();
                    String dataValues = rs.getString(i);
                    if (dataValues == null) {
                        PieGraphJOBJ.put("STATUS", "1");
                        PieGraphJOBJ.put("MESSAGE", "CAF type data are not availble");
                    } else {
                        jOBJ1.put("category", headerList.getString(i + ""));
                        jOBJ1.put("value", Integer.parseInt(rs.getString(i)));
                        if (headerList.getString(i + "").equalsIgnoreCase("Ftth Broadband Count")) {
                            jOBJ1.put("color", "#46a5da");
                        } else if (headerList.getString(i + "").equalsIgnoreCase("Landline Count")) {
                            jOBJ1.put("color", "#a8c374");
                        } else if (headerList.getString(i + "").equalsIgnoreCase("Ftth Voice Count")) {
                            jOBJ1.put("color", "#ffc539");
                        } else if (headerList.getString(i + "").equalsIgnoreCase("Ftth Bb Count")) {
                            jOBJ1.put("color", "#587da3");
                        } else {
                            jOBJ1.put("color", "#dd6061");
                        }
                        PieGraphARR.add(jOBJ1);
                    }

                }
            }
            if (PieGraphARR.isEmpty()) {
                PieGraphJOBJ.put("STATUS", "1");
                PieGraphJOBJ.put("MESSAGE", "CAF type data are not availble");
                PieGraphJOBJ.put("PIE_CHART_LST", PieGraphARR);
            } else {
                PieGraphJOBJ.put("STATUS", "0");
                PieGraphJOBJ.put("MESSAGE", "CAF type data fetched successfully");
                PieGraphJOBJ.put("PIE_CHART_LST", PieGraphARR);
            }
            AppLogger.debug("fmsPieGraphARR ::: " + PieGraphARR);
            response.setSuccess(true);
            response.setResponseData(PieGraphJOBJ);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            response.setSuccess(false);
            AppLogger.error("Exception in fmsFetchPieGraphValues grid load method : " + sw.toString());
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
                rs = null;
            }

            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (Exception e) {
                }
                pstmt = null;
            }

            if (con != null) {
                try {
                    con.close();
                } catch (Exception e) {
                }
                con = null;
            }
        }
        AppLogger.info(" Ending of fmsFetchPieGraphValues grid load method ");
        return retValue;
    }

}
