/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.commons;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.util.Properties;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author chenchulu
 */
public class CRSResourcesInfo {

    public static CRSResourcesInfo objCRSResourcesInfo = null;
    public static Properties appSettingsProperties = null;
    public static Properties logProperties = null;
    public static Properties userInfoProperties = null;
    public static Properties imageInfoProperties = null;

    static {

        getInstance();
    }

    public String getWorkFolder() {
//        String strPath = getClass().getProtectionDomain().getCodeSource().getLocation() + "";
//        strPath = strPath.substring(strPath.indexOf("/") + 1, strPath.lastIndexOf("/"));

        String strWorkFolderPath = System.getProperty("user.home") + "\\AppData\\Local\\UniServeThickClient\\";

        return strWorkFolderPath;

    }//End of getCurrentLocation method

    public static synchronized void getInstance() {

        InputStream inputStream = null;
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        Document doc = null;

        String strWorkFolderPath = System.getProperty("user.home") + "\\AppData\\Local\\UniServeThickClient\\";
        File folder = new File(strWorkFolderPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        try {
            if (objCRSResourcesInfo == null) {
                objCRSResourcesInfo = new CRSResourcesInfo();

                appSettingsProperties = new Properties();
                logProperties = new Properties();
                userInfoProperties = new Properties();
                imageInfoProperties = new Properties();

                String strWorkFolder = objCRSResourcesInfo.getWorkFolder();
                System.out.println("Current Location :" + strWorkFolder);

                strWorkFolder = URLDecoder.decode(strWorkFolder);
                System.out.println("Current Location after decode :" + strWorkFolder);

                String strConfigFilePath = strWorkFolder + "\\ResourcesInfo.xml";
                System.out.println("Resource Info file path :" + strConfigFilePath);
                File configFile = new File(strConfigFilePath);

                if (configFile.exists()) {
                    System.out.println("ResourcesInfo.xml file available");
                    String ResourcesInfoContent = readFileAsString(strConfigFilePath);
                    String ResourcesInfoArray[] = ResourcesInfoContent.split("</ROOT>");
                    String ResourcesCOntnet = ResourcesInfoArray[0];
                    if (ResourcesCOntnet.contains("IMAGE_INFO")) {
                        System.out.println("IMAGE_INFO tag is avilable in Register.xml");
                    } else {
                        try {

                            FileWriter fw = new FileWriter(configFile);
                            BufferedWriter bw = new BufferedWriter(fw);
                            bw.write(ResourcesCOntnet + " <IMAGE_INFO>    <PROPERTY NAME='IMAGESIZE'></PROPERTY>  "
                                    + "  <PROPERTY NAME='RES_MIN_WIDTH'></PROPERTY>   "
                                    + " <PROPERTY NAME='RES_MIN_HEIGHT'></PROPERTY>  "
                                    + "  <PROPERTY NAME='RES_MAX_WIDTH'></PROPERTY>   "
                                    + " <PROPERTY NAME='RES_MAX_HEIGHT'></PROPERTY> "
                                    + " </IMAGE_INFO> </ROOT>");
                            bw.flush();
                            fw.flush();
                            bw.close();
                            fw.close();
                            bw = null;
                            fw = null;

                            System.out.println("File Rewritten done");

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }

                    //Resource INfo.xml updation for LOG_DATE_PATTERN added and LOG_MAX_FILESIZE updation
                    Document resourceInfodoc = null;
                    try {
                        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
                        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
                        resourceInfodoc = docBuilder.parse(strConfigFilePath);

                        Node rootNode = resourceInfodoc.getElementsByTagName("ROOT").item(0);
                        NamedNodeMap attr = rootNode.getAttributes();
                        Node nodeAttr = attr.getNamedItem("VERSION");
                        String rootNoDeVER = nodeAttr.getTextContent();
                        System.out.println("rootNoDeVER:::: " + rootNoDeVER);
                        if (rootNoDeVER.equalsIgnoreCase("1.0")) {
                            System.out.println(":::::::: Updations started in Resource info.xml file,as version is 1.0 ::::::: ");
                            nodeAttr.setTextContent("1.1");// for root VERSION to 1.1
                            Node logSettings = resourceInfodoc.getElementsByTagName("LOG_SETTINGS").item(0);
                            Element logDatePattern = resourceInfodoc.createElement("PROPERTY");
                            logDatePattern.setAttribute("NAME", "LOG_DATE_PATTERN");
                            logDatePattern.setTextContent("yyyy-MM-dd-HH");
//                System.out.println("logDatePattern :::: "+logDatePattern);
                            logSettings.appendChild(logDatePattern);

                            // loop the LOG_SETTINGS child node
                            NodeList list = logSettings.getChildNodes();
                            System.out.println("logSettings node length ::::::: " + list.getLength());
                            for (int temp = 0; temp < list.getLength(); temp++) {
                                Node node = list.item(temp);
                                if (node.getNodeType() == Node.ELEMENT_NODE) {
                                    Element eElement = (Element) node;
                                    if ("PROPERTY".equals(eElement.getNodeName())) {
                                        System.out.println("NAME ATTR Value :::: " + eElement.getAttributeNode("NAME").getValue());
//                            if ("10000MB".equals(eElement.getTextContent())) {
                                        if ("LOG_MAX_FILESIZE".equals(eElement.getAttributeNode("NAME").getValue())) {
                                            eElement.setTextContent("10485760");
                                        }
                                    }
                                }
                            }
                            // write the content into xml file
                            System.out.println(":::::: write the content into xml file started :::::::");
                            TransformerFactory transformerFactory = TransformerFactory.newInstance();
                            Transformer transformer = transformerFactory.newTransformer();
                            DOMSource source = new DOMSource(resourceInfodoc);
                            StreamResult result = new StreamResult(new File(strConfigFilePath));
                            transformer.transform(source, result);
                            System.out.println(":::::: write the content into xml file completed :::::::");
                        }

                        //If version is 1.1
                        if (rootNoDeVER.equalsIgnoreCase("1.1")) {
                            System.out.println(":::::::: Updations started in Resource info.xml file,as version is 1.1 ::::::: ");
                            nodeAttr.setTextContent("1.2");// for root VERSION to 1.1
                            Node appSettings = resourceInfodoc.getElementsByTagName("APP_SETTINGS").item(0);
                            Element appRegNWPrty = resourceInfodoc.createElement("PROPERTY");
                            appRegNWPrty.setAttribute("NAME", "REGISTERED_NETWORK");
                            appRegNWPrty.setTextContent("");//                
                            appSettings.appendChild(appRegNWPrty);

                            Element appRegNWIPPrty = resourceInfodoc.createElement("PROPERTY");
                            appRegNWIPPrty.setAttribute("NAME", "REGISTERED_NETWORK_IP");
                            appRegNWIPPrty.setTextContent("");//                
                            appSettings.appendChild(appRegNWIPPrty);

                            // write the content into xml file
                            System.out.println(":::::: write the app settings content into xml file started :::::::");
                            TransformerFactory transformerFactory = TransformerFactory.newInstance();
                            Transformer transformer = transformerFactory.newTransformer();
                            DOMSource source = new DOMSource(resourceInfodoc);
                            StreamResult result = new StreamResult(new File(strConfigFilePath));
                            transformer.transform(source, result);
                            System.out.println(":::::: write the app settings content into xml file completed :::::::");
                        }
                    } catch (Exception e) {
                        System.out.println("Exception Resourceinfo.xml file updation::::: " + e.getMessage());
                        e.printStackTrace();
                    } finally {
                        resourceInfodoc = null;
                    }

                } else {
                    System.out.println("ResourcesInfo.xml file not available");

                    configFile.createNewFile();
                    System.out.println("File created...");

                    File logFileLocation = new File(System.getProperty("user.home") + "/AppData/Local/UniServeThickClient/logs");
                    logFileLocation.mkdir();

                    FileWriter fw = new FileWriter(configFile);
                    BufferedWriter bw = new BufferedWriter(fw);
                    bw.write("<ROOT VERSION='1.2'>  <APP_SETTINGS>  "
                            + "  <PROPERTY NAME='DEVICE_REGISTER'>false</PROPERTY> "
                            + "   <PROPERTY NAME='FIRST_LOGIN'>false</PROPERTY> "
                            + "   <PROPERTY NAME='UP_URL'></PROPERTY>  "
                            + "  <PROPERTY NAME='ONBOARD_URL'></PROPERTY>  "
                            + "  <PROPERTY NAME='THREAD_RESUME_TIME'>15</PROPERTY> "
                            + "  <PROPERTY NAME='REGISTERED_NETWORK'></PROPERTY> "
                            + "  <PROPERTY NAME='REGISTERED_NETWORK_IP'></PROPERTY> "
                            + " </APP_SETTINGS> "
                            + " <LOG_SETTINGS>    <PROPERTY NAME='LOG_PATH'>" + logFileLocation.getAbsolutePath() + "</PROPERTY> "
                            + "   <PROPERTY NAME='LOG_PATTERN'> %d{dd MMM yyyy HH:mm:ss SSS} %-5p:: %m  %n </PROPERTY> "
                            + "   <PROPERTY NAME='LOG_LEVEL'>DEBUG</PROPERTY>   "
                            + " <PROPERTY NAME='LOG_MAX_FILESIZE'>10485760</PROPERTY>   "//in bytes (10 MB) 
                            + " <PROPERTY NAME='LOG_BACKUP_INDEX'>25</PROPERTY> "
                            + " <PROPERTY NAME='LOG_DATE_PATTERN'>yyyy-MM-dd-HH</PROPERTY> "
                            + " </LOG_SETTINGS> "
                            + " <USER_INFO>    <PROPERTY NAME='USERNAME'></PROPERTY>  "
                            + "  <PROPERTY NAME='PASSWORD'></PROPERTY>   "
                            + " <PROPERTY NAME='AADHARNUMBER'></PROPERTY>  "
                            + "  <PROPERTY NAME='USERCODE'></PROPERTY>   "
                            + " <PROPERTY NAME='CIRCLECODE'></PROPERTY> "
                            + " </USER_INFO>"
                            + " <IMAGE_INFO>    <PROPERTY NAME='IMAGESIZE'></PROPERTY>  "
                            + "  <PROPERTY NAME='RES_MIN_WIDTH'></PROPERTY>   "
                            + " <PROPERTY NAME='RES_MIN_HEIGHT'></PROPERTY>  "
                            + "  <PROPERTY NAME='RES_MAX_WIDTH'></PROPERTY>   "
                            + " <PROPERTY NAME='RES_MAX_HEIGHT'></PROPERTY> "
                            + " </IMAGE_INFO> </ROOT>");
                    bw.flush();
                    fw.flush();
                    bw.close();
                    fw.close();
                    bw = null;
                    fw = null;

                    System.out.println("File written done");
                }

                configFile = null;

                inputStream = new FileInputStream(strConfigFilePath);

                dbf = DocumentBuilderFactory.newInstance();
                db = dbf.newDocumentBuilder();
                doc = db.parse(inputStream);

                Element eleAppSettings = (Element) doc.getElementsByTagName("APP_SETTINGS").item(0);
                NodeList nlAppSettings = eleAppSettings.getElementsByTagName("PROPERTY");
                Element eleAppSettingsPrty = null;
                String strAppSettingsPrtyName, strAppSettingsPrtyVal;

                for (int cnt = 0; cnt < nlAppSettings.getLength(); cnt++) {

                    eleAppSettingsPrty = (Element) nlAppSettings.item(cnt);
                    strAppSettingsPrtyName = eleAppSettingsPrty.getAttribute("NAME");
                    strAppSettingsPrtyVal = eleAppSettingsPrty.getTextContent();

                    appSettingsProperties.put(strAppSettingsPrtyName, strAppSettingsPrtyVal);

                }//for loop : APP_SETTINGS properties length

                Element eleLogSettings = (Element) doc.getElementsByTagName("LOG_SETTINGS").item(0);
                NodeList nlLogSettings = eleLogSettings.getElementsByTagName("PROPERTY");
                Element eleLogSettingsPrty = null;
                String strLogSettingsPrtyName, strLogSettingsPrtyVal;

                for (int cnt = 0; cnt < nlLogSettings.getLength(); cnt++) {

                    eleLogSettingsPrty = (Element) nlLogSettings.item(cnt);
                    strLogSettingsPrtyName = eleLogSettingsPrty.getAttribute("NAME");
                    strLogSettingsPrtyVal = eleLogSettingsPrty.getTextContent();

                    logProperties.put(strLogSettingsPrtyName, strLogSettingsPrtyVal);

                }//for loop : LOG_SETTINGS properties length

                Element eleUserInfo = (Element) doc.getElementsByTagName("USER_INFO").item(0);
                NodeList nlUserInfo = eleUserInfo.getElementsByTagName("PROPERTY");
                Element eleUserInfoPrty = null;
                String strUserInfoPrtyName, strUserInfoPrtyVal;

                for (int cnt = 0; cnt < nlUserInfo.getLength(); cnt++) {

                    eleUserInfoPrty = (Element) nlUserInfo.item(cnt);
                    strUserInfoPrtyName = eleUserInfoPrty.getAttribute("NAME");
                    strUserInfoPrtyVal = eleUserInfoPrty.getTextContent();

                    userInfoProperties.put(strUserInfoPrtyName, strUserInfoPrtyVal);

                }//for loop : USER_INFO properties length

                Element imgAppSettings = (Element) doc.getElementsByTagName("IMAGE_INFO").item(0);
                NodeList imNodeAppSettings = imgAppSettings.getElementsByTagName("PROPERTY");
                Element imgAppSettingsPrty = null;
                String strImgSettingsPrtyName, strImgSettingsPrtyVal;

                for (int cnt = 0; cnt < imNodeAppSettings.getLength(); cnt++) {

                    imgAppSettingsPrty = (Element) imNodeAppSettings.item(cnt);
                    strImgSettingsPrtyName = imgAppSettingsPrty.getAttribute("NAME");
                    strImgSettingsPrtyVal = imgAppSettingsPrty.getTextContent();

                    imageInfoProperties.put(strImgSettingsPrtyName, strImgSettingsPrtyVal);

                }//for loop : IMAGE_INFO properties length

                System.out.println("All the information loaded from ResourcesInfo.xml file");
                System.out.println("Application settings :" + appSettingsProperties);
                System.out.println("Log properties :" + logProperties);
                System.out.println("User Information :" + userInfoProperties);
                System.out.println("Images Information :" + userInfoProperties);

            }

        } catch (Exception e) {
            System.out.println("Exception in getInstance method of CRSResourcesInfo class");
            e.printStackTrace();
        } finally {

            inputStream = null;
            dbf = null;
            db = null;
            doc = null;
        }

    }//End of getInstance method 

    public static String getAppSettingsProperty(String strPrtyName) {
        String strPrtyVal = "";
        try {
            strPrtyVal = appSettingsProperties.getProperty(strPrtyName);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return strPrtyVal;
    }//End of getAppSettingsProperty method 

    public static String getLogProperty(String strPrtyName) {
        String strPrtyVal = "";
        try {
            strPrtyVal = logProperties.getProperty(strPrtyName);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return strPrtyVal;
    }//End of getLogProperty method 

    public static String getUserInfoProperty(String strPrtyName) {
        String strPrtyVal = "";
        try {
            strPrtyVal = userInfoProperties.getProperty(strPrtyName);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return strPrtyVal;
    }//End of getUserInfoProperty method  

    public static String getImageInfoProperty(String strPrtyName) {
        String strPrtyVal = "";
        try {
            strPrtyVal = imageInfoProperties.getProperty(strPrtyName);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return strPrtyVal;
    }//End of getUserInfoProperty method  

    public static void setAppSettingsProperty(String strPrtyName, String strPrtyVal) {

        String strWorkFolder = objCRSResourcesInfo.getWorkFolder();
        System.out.println("Current Location :" + strWorkFolder);

        strWorkFolder = URLDecoder.decode(strWorkFolder);
        System.out.println("Current Location after decode :" + strWorkFolder);

        String strConfigFilePath = strWorkFolder + "/ResourcesInfo.xml";
        System.out.println("Resource Info file path :" + strConfigFilePath);

        InputStream inputStream = null;
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        Document doc = null;

        try {

            inputStream = new FileInputStream(strConfigFilePath);

            dbf = DocumentBuilderFactory.newInstance();
            db = dbf.newDocumentBuilder();
            doc = db.parse(inputStream);

            Element eleAppSettings = (Element) doc.getElementsByTagName("APP_SETTINGS").item(0);
            NodeList nlAppSettings = eleAppSettings.getElementsByTagName("PROPERTY");
            Element eleAppSettingsPrty = null;
            String strAppSettingsPrtyName;

            for (int cnt = 0; cnt < nlAppSettings.getLength(); cnt++) {

                eleAppSettingsPrty = (Element) nlAppSettings.item(cnt);
                strAppSettingsPrtyName = eleAppSettingsPrty.getAttribute("NAME");

                if (strAppSettingsPrtyName.equals(strPrtyName)) {
                    eleAppSettingsPrty.setTextContent(strPrtyVal);
                    appSettingsProperties.put(strAppSettingsPrtyName, strPrtyVal);
                }//If required property encountered                                         

            }//for loop : APP_SETTINGS properties length

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            DOMSource source = new DOMSource(doc);

            StreamResult result = new StreamResult(strConfigFilePath);
            transformer.transform(source, result);

            System.out.println("Settings property updated. Property name:" + strPrtyName + ", value:" + appSettingsProperties.get(strPrtyName));

        } catch (Exception e) {
            System.out.println("Exception in setAppSettingsProperty method of CRSResourcesInfo class");
            e.printStackTrace();
        } finally {

            inputStream = null;
            dbf = null;
            db = null;
            doc = null;
        }

    }//End of setAppSettingsProperty method

    public static void setLogProperty(String strPrtyName, String strPrtyVal) {

        String strWorkFolder = objCRSResourcesInfo.getWorkFolder();
        System.out.println("Current Location :" + strWorkFolder);

        strWorkFolder = URLDecoder.decode(strWorkFolder);
        System.out.println("Current Location after decode :" + strWorkFolder);

        String strConfigFilePath = strWorkFolder + "/ResourcesInfo.xml";
        System.out.println("Resource Info file path :" + strConfigFilePath);

        InputStream inputStream = null;
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        Document doc = null;

        try {

            inputStream = new FileInputStream(strConfigFilePath);

            dbf = DocumentBuilderFactory.newInstance();
            db = dbf.newDocumentBuilder();
            doc = db.parse(inputStream);

            Element eleLogSettings = (Element) doc.getElementsByTagName("LOG_SETTINGS").item(0);
            NodeList nlLogSettings = eleLogSettings.getElementsByTagName("PROPERTY");
            Element eleLogSettingsPrty = null;
            String strLogSettingsPrtyName;

            for (int cnt = 0; cnt < nlLogSettings.getLength(); cnt++) {

                eleLogSettingsPrty = (Element) nlLogSettings.item(cnt);
                strLogSettingsPrtyName = eleLogSettingsPrty.getAttribute("NAME");

                if (strLogSettingsPrtyName.equals(strPrtyName)) {
                    eleLogSettingsPrty.setTextContent(strPrtyVal);
                    logProperties.put(strLogSettingsPrtyName, strPrtyVal);
                }//If required property encountered                                         

            }//for loop : LOG_SETTINGS properties length

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            DOMSource source = new DOMSource(doc);

            StreamResult result = new StreamResult(strConfigFilePath);
            transformer.transform(source, result);

//            AppLogger.close();
            System.out.println("Logger property updated. Property name:" + strPrtyName + ", value:" + logProperties.get(strPrtyName));

        } catch (Exception e) {
            System.out.println("Exception in setLogProperty method of CRSResourcesInfo class");
            e.printStackTrace();
        } finally {

            inputStream = null;
            dbf = null;
            db = null;
            doc = null;
        }

    }//End of setLogProperty method

    public static void setUserInfoProperty(String strPrtyName, String strPrtyVal) {

        String strWorkFolder = objCRSResourcesInfo.getWorkFolder();
        System.out.println("Current Location :" + strWorkFolder);

        strWorkFolder = URLDecoder.decode(strWorkFolder);
        System.out.println("Current Location after decode :" + strWorkFolder);

        String strConfigFilePath = strWorkFolder + "/ResourcesInfo.xml";
        System.out.println("Resource Info file path :" + strConfigFilePath);

        InputStream inputStream = null;
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        Document doc = null;

        try {

            inputStream = new FileInputStream(strConfigFilePath);

            dbf = DocumentBuilderFactory.newInstance();
            db = dbf.newDocumentBuilder();
            doc = db.parse(inputStream);

            Element eleUserInfo = (Element) doc.getElementsByTagName("USER_INFO").item(0);
            NodeList nlUserInfo = eleUserInfo.getElementsByTagName("PROPERTY");
            Element eleUserInfoPrty = null;
            String strUserInfoPrtyName;

            for (int cnt = 0; cnt < nlUserInfo.getLength(); cnt++) {

                eleUserInfoPrty = (Element) nlUserInfo.item(cnt);
                strUserInfoPrtyName = eleUserInfoPrty.getAttribute("NAME");

                if (strUserInfoPrtyName.equals(strPrtyName)) {
                    eleUserInfoPrty.setTextContent(strPrtyVal);
                    userInfoProperties.put(strUserInfoPrtyName, strPrtyVal);
                }//If required property encountered                                         

            }//for loop : USER_INFO properties length

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            DOMSource source = new DOMSource(doc);

            StreamResult result = new StreamResult(strConfigFilePath);
            transformer.transform(source, result);

            System.out.println("User  Info property updated. Property name:" + strPrtyName + ", value:" + userInfoProperties.get(strPrtyName));

        } catch (Exception e) {
            System.out.println("Exception in setUserInfoProperty method of CRSResourcesInfo class");
            e.printStackTrace();
        } finally {

            inputStream = null;
            dbf = null;
            db = null;
            doc = null;
        }

    }//End of setUserInfoProperty method  

    public static void setImageSettingsProperty(String strPrtyName, String strPrtyVal) {

        String strWorkFolder = objCRSResourcesInfo.getWorkFolder();
        System.out.println("Current Location :" + strWorkFolder);

        strWorkFolder = URLDecoder.decode(strWorkFolder);
        System.out.println("Current Location after decode :" + strWorkFolder);

        String strConfigFilePath = strWorkFolder + "/ResourcesInfo.xml";
        System.out.println("Resource Info file path :" + strConfigFilePath);

        InputStream inputStream = null;
        DocumentBuilderFactory dbf = null;
        DocumentBuilder db = null;
        Document doc = null;

        try {

            inputStream = new FileInputStream(strConfigFilePath);

            dbf = DocumentBuilderFactory.newInstance();
            db = dbf.newDocumentBuilder();
            doc = db.parse(inputStream);

            Element eleAppSettings = (Element) doc.getElementsByTagName("IMAGE_INFO").item(0);
            NodeList nlAppSettings = eleAppSettings.getElementsByTagName("PROPERTY");
            Element eleAppSettingsPrty = null;
            String strAppSettingsPrtyName;

            for (int cnt = 0; cnt < nlAppSettings.getLength(); cnt++) {

                eleAppSettingsPrty = (Element) nlAppSettings.item(cnt);
                strAppSettingsPrtyName = eleAppSettingsPrty.getAttribute("NAME");

                if (strAppSettingsPrtyName.equals(strPrtyName)) {
                    eleAppSettingsPrty.setTextContent(strPrtyVal);
                    imageInfoProperties.put(strAppSettingsPrtyName, strPrtyVal);
                }//If required property encountered                                         

            }//for loop : APP_SETTINGS properties length

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            DOMSource source = new DOMSource(doc);

            StreamResult result = new StreamResult(strConfigFilePath);
            transformer.transform(source, result);

            System.out.println("Settings property updated. Property name:" + strPrtyName + ", value:" + appSettingsProperties.get(strPrtyName));

        } catch (Exception e) {
            System.out.println("Exception in setAppSettingsProperty method of CRSResourcesInfo class");
            e.printStackTrace();
        } finally {

            inputStream = null;
            dbf = null;
            db = null;
            doc = null;
        }

    }//End of setAppSettingsProperty method

    private static String readFileAsString(String filePath) throws IOException {
        try {
            StringBuffer fileData = new StringBuffer();
            BufferedReader reader = new BufferedReader(
                    new FileReader(filePath));
            char[] buf = new char[1024];
            int numRead = 0;
            while ((numRead = reader.read(buf)) != -1) {
                String readData = String.valueOf(buf, 0, numRead);
                fileData.append(readData);
            }
            reader.close();
            return fileData.toString();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
//            AppLogger.debug("Read the File to Sting in readFileAsString method" + sw.toString());
            e.printStackTrace();
            return "";
        }

    }
}//End of CRSResourcesInfo class
