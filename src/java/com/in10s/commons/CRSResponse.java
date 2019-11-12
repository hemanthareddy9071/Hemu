/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

/**
 *
 * @author sateesh
 */
public class CRSResponse {

    String message = "";
    String browserId = "";
    boolean Success = false;
    Object responseData = null;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getBrowserId() {
        return browserId;
    }

    public void setBrowserId(String browserId) {
        this.browserId = browserId;
    }

    public boolean isSuccess() {
        return Success;
    }

    public void setSuccess(boolean Success) {
        this.Success = Success;
    }

    public Object getResponseData() {
        return responseData;
    }

    public void setResponseData(Object responseData) {
        this.responseData = responseData;
    }

}
