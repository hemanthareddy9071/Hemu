/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import java.io.Serializable;

/**
 *
 * @author pardha.s
 */
public class CRSResBean implements  Serializable{

    private boolean loginStatus;

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(boolean loginStatus) {
        this.loginStatus = loginStatus;
    }

    @Override
    public String toString() {
        return "CRSResBean{" + "loginStatus=" + loginStatus + ", message=" + message + '}';
    }
    
}
