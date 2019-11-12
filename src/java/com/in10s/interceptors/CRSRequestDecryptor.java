/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.interceptors;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.logger.AppLogger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 *
 * @author pardha.s
 */
public class CRSRequestDecryptor extends HttpServletRequestWrapper implements HttpServletRequest {

    HttpServletRequest req;

    public CRSRequestDecryptor(HttpServletRequest request) {
        super(request);
        req = request;
    }

    @Override
    public String getParameter(String strParam) {

        AppLogger.info("*********** In getParameter() of  CRSRequestDecryptor ******************");

        CRSAuthenticate authenticate = new CRSAuthenticate();
        String strAParameterName = req.getParameter(strParam);

        if (strAParameterName == null || strAParameterName.equals("null") || strAParameterName.trim().equals("")) {
            return strAParameterName;
        } else {
            strAParameterName = authenticate.Decrypt(strAParameterName);

            return strAParameterName;
        }

    }

}
