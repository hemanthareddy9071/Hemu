/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class CRSPropertyReader {

    private static Map queriesMap = new HashMap();
    public static HashMap resoursesMap = new HashMap();
    public static HashMap messgaesMap = new HashMap();

    static {
        initialize();
    }

    private static void initialize() {
        try {
            queriesMap.clear();
            Properties props = new Properties();
            URL propUrl = CRSPropertyReader.class.getClassLoader().getResource("QueryList.properties");
            InputStream in = propUrl.openStream();
            props.load(in);
            in.close();
            queriesMap.putAll((Map) props);            

            messgaesMap.clear();
            propUrl = CRSPropertyReader.class.getClassLoader().getResource("Messages.properties");
            in = propUrl.openStream();
            props.load(in);
            in.close();
            messgaesMap.putAll((Map) props);

        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    public String getQueryonId(String str) {
        String query = "";
        if (queriesMap.containsKey(str)) {
            query = (String) queriesMap.get(str);            
        }
        return query;
    }

    public String getResource(String str) {
        String resource = "";
        if (resoursesMap.containsKey(str)) {
            resource = (String) resoursesMap.get(str);
        }
        return resource;
    }

    public String getMessge(String str) {
        String message = "";
        if (messgaesMap.containsKey(str)) {
            message = (String) messgaesMap.get(str);
        }
        return message;
    }

    public static void reload() {
        initialize();
    }
}
