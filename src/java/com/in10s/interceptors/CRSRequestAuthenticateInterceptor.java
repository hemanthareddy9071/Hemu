/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.interceptors;

import com.in10s.commons.CRSResponse;
import com.in10s.logger.AppLogger;
import com.in10s.logger.CRSThreadLocalManager;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import java.io.PrintWriter;
import java.io.StringWriter;
import net.sf.json.JSONSerializer;

/**
 *
 * @author pardha.s
 */
public class CRSRequestAuthenticateInterceptor extends AbstractInterceptor {

    HttpServletResponse httpResponse = null;
    HttpServletRequest request = null;
    HttpSession session = null;
    CRSResponse response;

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    @Override
    public String intercept(ActionInvocation invocation) {
        String strResult = "success";
        CRSRequestDecryptor deRequest = null;
        try {

            httpResponse = ServletActionContext.getResponse();
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");
            if (strReqData != null) {
                deRequest = new CRSRequestDecryptor(request);
                ServletActionContext.setRequest(deRequest);
            }

            JSONObject loginResponse = null;
            if (loginResponse == null) {
                if (true) {
                    CRSThreadLocalManager.setRequestId((String) session.getAttribute("USER_REQ_ID"));
                    prDebug("Allowed URI when session available " + request.getRequestURI());
                    strResult = invocation.invoke();
                }
            } else {
                String userReqId = loginResponse.optString("USER_REQ_ID", "11111");
                CRSThreadLocalManager.setRequestId(userReqId);
                prInfo(" -- Interceptor processing has been started -- ");
                prDebug("Allowed URI when session and loginResponse available :: " + request.getRequestURI());
                prDebug("request data : " + strReqData);

                String strJsonReqData = (String) deRequest.getParameter("reqData");
                JSONObject reqData = (JSONObject) JSONSerializer.toJSON(strJsonReqData);
                strResult = invocation.invoke();
            }
            httpResponse.setHeader("Pragma", "no-cache");
            httpResponse.setHeader("Cache-Control", "no-cache");
            httpResponse.setDateHeader("Expires", 0);
            prDebug("After invoke strResult >>> " + strResult);

        } catch (Exception e) {
            prLog("Error occured in intercept method :: ", e);
            strResult = "InvalidRequest";
        }

        return strResult;
    }//intercept

    public boolean isAjax(HttpServletRequest Request) {
        //  boolean flag = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
        //   prInfo("WHICH REQUES IT IS : " + flag);
        prDebug("ajax request..." + Request.getHeader("X-Requested-With"));
        return "XMLHttpRequest".equals(Request.getHeader("X-Requested-With"));
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
