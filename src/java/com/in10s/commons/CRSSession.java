/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import com.in10s.logger.AppLogger;
import com.opensymphony.xwork2.ActionSupport;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author swaroopeshwar
 */
public class CRSSession extends ActionSupport {

    JSONObject objCRSResponse = new JSONObject();

    public JSONObject getObjCRSResponse() {
        System.out.println("calling geett");
        System.out.println("com.in10s.commons.CRSSession.getObjCRSResponse()");
        return objCRSResponse;
    }

    public void setObjCRSResponse(JSONObject objCRSResponse) {
        this.objCRSResponse = objCRSResponse;
    }

    @Override
    public String execute() {
        try {
            AppLogger.debug(" ********** getSeesionValue **************");
            HttpServletRequest request = ServletActionContext.getRequest();
            String key = request.getParameter("sessionKey");
            HttpSession session = request.getSession();

            objCRSResponse = new JSONObject();
            objCRSResponse.put("key", session.getAttribute(key));
            setObjCRSResponse(objCRSResponse);

        } catch (Exception e) {
            objCRSResponse.put("key", "");

        }
        return "success";
    }
}
