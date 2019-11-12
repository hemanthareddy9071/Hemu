/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import java.net.URL;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author ravikiran.r
 */
public class WPContextListener implements ServletContextListener {

    public static String confgFilesPath = null;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("******contextInitialized*****");
        URL propUrl = null;
        try {
            propUrl = WPContextListener.class.getClassLoader().getResource("/");
            String strConfgFilePath = propUrl.getFile();
            System.out.println("ConfgFilePath before :" + strConfgFilePath);
            strConfgFilePath = strConfgFilePath.substring(0, strConfgFilePath.lastIndexOf("/"));
            strConfgFilePath = strConfgFilePath.substring(0, strConfgFilePath.lastIndexOf("/"));
            strConfgFilePath = strConfgFilePath + "/" + "lib" + "/" + "configurations" + "/";
            confgFilesPath = strConfgFilePath;
            if (confgFilesPath != null) {
                confgFilesPath = confgFilesPath.replaceAll("%20", " ");
            }
            System.out.println("ConfgFilePath after :" + strConfgFilePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("****** contextDestroyed **********");
    }

}
