/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.config;

import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 *
 * @author chenchulu
 */
public class CRSAppResources {

    public static HashMap messgaesMap = new HashMap();
    public static CRSAppResources objCRSAppResources = null;

    public static String LOG_PATH = "";
    public static String LOG_PATTERN = "";
    public static String LOG_LEVEL = "";
    public static String LOG_MAX_FILESIZE = "";
    public static String LOG_BACKUP_INDEX = "";
    public static String LOG_DATE_PATTERN = "";

    public static String UP_URL = "";
    public static String ONBOARD_URL = "";
    public static String CERTIFICATE = "";
    public static String PID_XML = "";
    public static String REPOSITORY_PATH = "";
    public static String AppVersion = "";

    public static String DB_USERNAME = "";
    public static String DB_PASSWORD = "";
    public static String DB_HOSTNAME = "";
    public static String DB_PORT = "";
    public static String DB_SID = "";

    public static String CAF_TYPES = "";

    public static String JNDI_NAME = "";
    public static String SERVER_NAME = "";

    public static String CONNECTION_POOL = "";
    public static String BCP_DRIVER = "";
    public static String BCP_URL = "";
    public static String BCP_DB_USERNAME = "";
    public static String BCP_DB_PWD = "";
    public static String BCP_DB_MIN_CONN = "";
    public static String BCP_DB_MAX_CONN = "";
    public static String BCP_DB_CON_TIMEOUT = "";
    public static String BCP_DB_IDLE_AGE = "";
    public static boolean BCP_DB_NULL_CON_TIME_OUT ;
    public static String TOOL_PATH = "";
    public static String CERT_PATH = "";
    public static String IMAGE_TYPE = "";
    public static String TOOL_VERSION = "";

    public static String DedupeFlag = "";
    public static String fmsEnable = "";
  

   
    public static String PYMT_URL = ""; 
  
 
    public static String AADHAR_SERVICE_REROUTE_URL = "";
    public static String AADHAR_SERVICE_URL = "";
  
   
    public static String DB_SCHEMA = "";
    public static String NE_URL = "";
    
    public static String HCP_DRIVER = "";
    public static String HCP_URL = "";
    public static String HCP_DB_USERNAME = "";
    public static String HCP_DB_PWD = "";
    public static String HCP_DB_MIN_CONN = "";
    public static String HCP_DB_MAX_CONN = "";
    public static String HCP_DB_IDLE_AGE = "";
    public static String HCP_DB_CON_TIMEOUT = "";
    public static String cachePrepStmts = "";
    public static String prepStmtCacheSize = "";
    public static String prepStmtCacheSqlLimit = "";
    public static String WINGS_NON_REGISTERED_USER_FLOW = "";
    public static String PDF_CREATION_PATH = "";
    public static String CSS_JS_PATH = "";
    public static String CSS_JS_VERSION = "";
    public static String RETURN_URL = "";
    public static String EKYC_RETURN_URL = "";
    public static String TARIFF_ZIP_PATH = "";
    public static String CDR_POI_PATH = "";
    public static String WINGS_PAY_AMOUNT = "";
    public static String WINGS_DEPOSIT_AMOUNT = "";
    public static String TRIAL_RETURN_URL = "";
    public static String CDR_TRIAL_RETURN_URL = "";
    public static String PAY_INIT_URL = "";
   
    
    
  


    public CRSAppResources() {
    }

    static {
        getInstance();
    }

    public static synchronized void getInstance() {

        try {
            if (objCRSAppResources == null) {

                System.out.println("Called getInstance method of CRSAppResources class, Object is null");

                //TODO
                Properties props1 = new Properties();
                messgaesMap.clear();
                URL propUrl1 = CRSAppResources.class.getClassLoader().getResource("Messages.properties");
                InputStream in = propUrl1.openStream();
                props1.load(in);
                in.close();
                messgaesMap.putAll((Map) props1);
                
                objCRSAppResources = new CRSAppResources();
                Properties objProps = null;
                URL propUrl = CRSAppResources.class.getClassLoader().getResource("/");
                System.out.println("URL : " + propUrl);
                String strFilePath = propUrl.getFile();
                strFilePath = strFilePath.substring(0, strFilePath.lastIndexOf("/"));
                strFilePath = strFilePath.substring(0, strFilePath.lastIndexOf("/"));
                strFilePath = strFilePath + "/lib/AppResources.properties";

                System.out.println("File path of properties >> " + strFilePath);

                InputStream inputStream = new FileInputStream(strFilePath);
                //InputStream inputStream = propUrl.openStream();
                objProps = new Properties();
                objProps.load(inputStream);
                System.out.println("*** ClassPath:objProps:" + objProps);

                LOG_PATH = objProps.getProperty("LOG_PATH");
                LOG_PATTERN = objProps.getProperty("LOG_PATTERN");
                LOG_LEVEL = objProps.getProperty("LOG_LEVEL");
                LOG_MAX_FILESIZE = objProps.getProperty("LOG_MAX_FILESIZE");
                LOG_BACKUP_INDEX = objProps.getProperty("LOG_BACKUP_INDEX");
                LOG_DATE_PATTERN = objProps.getProperty("LOG_DATE_PATTERN");

                UP_URL = objProps.getProperty("UP_URL");
                ONBOARD_URL = objProps.getProperty("ONBOARD_URL");
                CERTIFICATE = objProps.getProperty("CERTIFICATE");
                PID_XML = objProps.getProperty("PID_XML");
                REPOSITORY_PATH = objProps.getProperty("REPOSITORY_PATH");
                AppVersion = objProps.getProperty("APPLICTION_VERSION");

                DB_USERNAME = objProps.getProperty("DB_USERNAME");
                DB_PASSWORD = objProps.getProperty("DB_PASSWORD");
                DB_HOSTNAME = objProps.getProperty("DB_HOSTNAME");
                DB_PORT = objProps.getProperty("DB_PORT");
                DB_SID = objProps.getProperty("DB_SID");

                CAF_TYPES = objProps.getProperty("CAF_TYPES");

                JNDI_NAME = objProps.getProperty("JNDI_NAME");
                SERVER_NAME = objProps.getProperty("SERVER_NAME");

                CONNECTION_POOL = objProps.getProperty("CONNECTION_POOL");
                BCP_DRIVER = objProps.getProperty("BCP_DRIVER");
                BCP_URL = objProps.getProperty("BCP_URL");
                BCP_DB_USERNAME = objProps.getProperty("BCP_DB_USERNAME");
                BCP_DB_PWD = objProps.getProperty("BCP_DB_PWD");
                BCP_DB_MIN_CONN = objProps.getProperty("BCP_DB_MIN_CONN");
                BCP_DB_MAX_CONN = objProps.getProperty("BCP_DB_MAX_CONN");
                BCP_DB_CON_TIMEOUT = objProps.getProperty("BCP_DB_CON_TIMEOUT");
                BCP_DB_IDLE_AGE = objProps.getProperty("BCP_DB_IDLE_AGE");
                BCP_DB_NULL_CON_TIME_OUT =  Boolean.parseBoolean(objProps.getProperty("BCP_DB_NULL_ON_CON_TIME_OUT"));

                TOOL_PATH = objProps.getProperty("TOOL_PATH");
                CERT_PATH = objProps.getProperty("CERT_PATH");
                IMAGE_TYPE = objProps.getProperty("IMAGE_TYPE");
                TOOL_VERSION = objProps.getProperty("TOOL_VERSION");

                DedupeFlag = objProps.getProperty("DEDUPE_FLAG");
                fmsEnable = objProps.getProperty("FMSENABLE");
                
        
       
                
                PYMT_URL = objProps.getProperty("PYMT_URL");
             

                
            
                AADHAR_SERVICE_REROUTE_URL = objProps.getProperty("AADHAR_SERVICE_REROUTE_URL");
                AADHAR_SERVICE_URL = objProps.getProperty("AADHAR_SERVICE_URL");
            
                DB_SCHEMA = objProps.getProperty("DB_SCHEMA");
                NE_URL = objProps.getProperty("NE_URL");
                HCP_DRIVER = objProps.getProperty("HCP_DRIVER");
                HCP_URL = objProps.getProperty("HCP_URL");
                HCP_DB_USERNAME = objProps.getProperty("HCP_DB_USERNAME");
                HCP_DB_PWD = objProps.getProperty("HCP_DB_PWD");
                HCP_DB_MIN_CONN = objProps.getProperty("HCP_DB_MIN_CONN");
                HCP_DB_MAX_CONN = objProps.getProperty("HCP_DB_MAX_CONN");
                HCP_DB_IDLE_AGE = objProps.getProperty("HCP_DB_IDLE_AGE");
                HCP_DB_CON_TIMEOUT = objProps.getProperty("HCP_DB_CON_TIMEOUT");
                cachePrepStmts = objProps.getProperty("cachePrepStmts");
                prepStmtCacheSize = objProps.getProperty("prepStmtCacheSize");
                prepStmtCacheSqlLimit = objProps.getProperty("prepStmtCacheSqlLimit");
                WINGS_NON_REGISTERED_USER_FLOW = objProps.getProperty("WINGS_NON_REGISTERED_USER_FLOW");
                PDF_CREATION_PATH = objProps.getProperty("PDF_CREATION_PATH");
                CSS_JS_PATH = objProps.getProperty("CSS_JS_PATH");
                CSS_JS_VERSION = objProps.getProperty("CSS_JS_VERSION");
                RETURN_URL = objProps.getProperty("RETURN_URL");
                EKYC_RETURN_URL = objProps.getProperty("EKYC_RETURN_URL");
                TARIFF_ZIP_PATH = objProps.getProperty("TARIFF_ZIP_PATH");
                WINGS_PAY_AMOUNT = objProps.getProperty("WINGS_PAY_AMOUNT");
                WINGS_DEPOSIT_AMOUNT = objProps.getProperty("WINGS_DEPOSIT_AMOUNT");
                TRIAL_RETURN_URL = objProps.getProperty("TRIAL_RETURN_URL");
                CDR_TRIAL_RETURN_URL = objProps.getProperty("CDR_TRIAL_RETURN_URL");
                CDR_POI_PATH = objProps.getProperty("CDR_POI_PATH");
                PAY_INIT_URL = objProps.getProperty("PAY_INIT_URL");
                
                
               

                objProps.clear();
                objProps = null;

                System.out.println("In getInstance method of CRSAppResources class, cleared properties object");
            }//FOR SINGLETON

        } catch (Exception e) {
            System.out.println("Exception in getInstance method of CRSAppResources class");
            e.printStackTrace();
        }

        //return objCRSAppResources;
    }//End of getInstance method 
     public String getMessge(String str) {
        String message = "";
        if (messgaesMap.containsKey(str)) {
            message = (String) messgaesMap.get(str);
        }
        return message;
    }

}
