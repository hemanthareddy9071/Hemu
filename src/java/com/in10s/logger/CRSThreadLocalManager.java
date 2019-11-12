/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.logger;

/**
 *
 * @author chenchulu
 */
public class CRSThreadLocalManager {

    public static final ThreadLocal userThreadLocal = new ThreadLocal();

    public static void setRequestId(String strId) {
        userThreadLocal.set(strId);
    }

    public static void unset() {
        userThreadLocal.remove();
    }

    public static String getRequestId() {
        return (String) userThreadLocal.get();
    }

}
