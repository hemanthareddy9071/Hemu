///*
// * To change this template, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.in10s.commons;
//
//import java.io.BufferedWriter;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileWriter;
//import java.io.InputStream;
//import java.net.URLDecoder;
//import java.util.HashMap;
//import java.util.Map;
//import javax.xml.parsers.DocumentBuilder;
//import javax.xml.parsers.DocumentBuilderFactory;
//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;
//import net.sf.json.JSONSerializer;
//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
//import org.w3c.dom.NodeList;
//
///**
// *
// * @author chenchulu
// */
//public class CRSIndexTemplates {
//
//    public static CRSIndexTemplates objCRSIndexTemplates = null;
//    private static double nLocalTemplateVersion = 0;
//    public static Map allTemplates = null;
//
//    static {
//
//        getInstance();
//    }
//
//    public static double getLocalTemplateVersion() {
//        return nLocalTemplateVersion;
//    }//End of getLocalTemplateVersion method
//
//    public static String getWorkFolder() {
////        String strPath = getClass().getProtectionDomain().getCodeSource().getLocation() + "";
////        strPath = strPath.substring(strPath.indexOf("/") + 1, strPath.lastIndexOf("/"));
//
//        String strWorkFolderPath = System.getProperty("user.home") + "\\AppData\\Local\\UniServeThickClient\\";
//
//        return strWorkFolderPath;
//
//    }//End of getCurrentLocation method
//
//    public static void loadIndexTemplate(String strVersion, String strAllTemplates) {
//
//        getInstance();
//
//        try {
//            JSONObject jsonAllTemplates = (JSONObject) JSONSerializer.toJSON(strAllTemplates);
//
//            String strWorkFolder = getWorkFolder();
//            System.out.println("Current Location :" + strWorkFolder);
//
//            strWorkFolder = URLDecoder.decode(strWorkFolder);
//            System.out.println("Current Location after decode :" + strWorkFolder);
//
//            String strConfigFilePath = strWorkFolder + "IndexTemplates.xml";
//            strConfigFilePath = strConfigFilePath.replace("\\", "/");
//            System.out.println("Resource Info file path :" + strConfigFilePath);
//            File configFile = new File(strConfigFilePath);
//
//            //configFile.createNewFile();
//
//            System.out.println("File created...");
//
//            FileWriter fw = new FileWriter(configFile);
//            BufferedWriter bw = new BufferedWriter(fw);
//            bw.write("<TEMPLATES>   <VERSION NUMBER='" + strVersion + "' />");
//
//            JSONArray jsonArrNames = jsonAllTemplates.names();
//            int nJsonLen = jsonArrNames.size();
//            System.out.println("nJsonLen ::" + nJsonLen);
//            JSONObject jsonTemplate = null;
//
//            for (int nCnt = 0; nCnt < nJsonLen; nCnt++) {
//
//                String strTemplateName = jsonArrNames.getString(nCnt);
//                System.out.println("strTemplateName ::" + strTemplateName);
//
//                bw.write(" <TEMPLATE NAME='" + strTemplateName + "'>");
//
//                jsonTemplate = jsonAllTemplates.getJSONObject(strTemplateName);
//
//                bw.write("<HTML>   <![CDATA[ " + jsonTemplate.getString("formHTMLDesign") + " ]]>  </HTML>");
//                bw.write("<FIELDS_LIST>   <![CDATA[ " + jsonTemplate.getString("formFieldsMetaData") + " ]]>  </FIELDS_LIST>");
//
//                System.out.println("jsonTemplate ::" + jsonTemplate.toString());
//                bw.write("</TEMPLATE>");
//
//            }
//
//            bw.write("</TEMPLATES>");
//            bw.flush();
//            fw.flush();
//            bw.close();
//            fw.close();
//            bw = null;
//            fw = null;
//
//            XMLToObjects(strConfigFilePath);
//
//        } catch (Exception e) {
//
//            System.out.println("Error in loadIndexTemplate method");
//            e.printStackTrace();
//        }
//
//    }//End of loadIndexTemplate method
//
//    public static void XMLToObjects(String strConfigFilePath) {
//
//        InputStream inputStream = null;
//        DocumentBuilderFactory dbf = null;
//        DocumentBuilder db = null;
//        Document doc = null;
//
//        try {
//            inputStream = new FileInputStream(strConfigFilePath);
//
//            dbf = DocumentBuilderFactory.newInstance();
//            db = dbf.newDocumentBuilder();
//            doc = db.parse(inputStream);
//
//            Element eleVersion = (Element) doc.getElementsByTagName("VERSION").item(0);
//            nLocalTemplateVersion = Double.parseDouble(eleVersion.getAttribute("NUMBER"));
//
//            NodeList nlTemplates = doc.getElementsByTagName("TEMPLATE");
//            Element eleTemplate = null;
//            String strTemplateName = "", strTemplateHTML = "", strTemplateFieldsList = "";
//
//            for (int nCnt = 0; nCnt < nlTemplates.getLength(); nCnt++) {
//
//                eleTemplate = (Element) nlTemplates.item(nCnt);
//                strTemplateName = eleTemplate.getAttribute("NAME");
//
//                strTemplateHTML = eleTemplate.getElementsByTagName("HTML").item(0).getTextContent();
//                strTemplateFieldsList = eleTemplate.getElementsByTagName("FIELDS_LIST").item(0).getTextContent();
//
//                System.out.println("strTemplateHTML ==> " + strTemplateHTML);
//                System.out.println("strTemplateFieldsList ==> " + strTemplateFieldsList);
//
//                JSONObject jsonArrFields = (JSONObject) JSONSerializer.toJSON(strTemplateFieldsList.trim());
//
//                System.out.println("jsonArrFields ==> " + jsonArrFields);
//
//                allTemplates.put(strTemplateName + "_HTML", strTemplateHTML);
//                allTemplates.put(strTemplateName + "_FIELDS_LIST", jsonArrFields);
//
//            }//for loop : all the Templates in the xml file
//
//        } catch (Exception e) {
//
//            System.out.println("Exception in XMLToObjects method of CRSIndexTemplates class");
//            e.printStackTrace();
//
//        } finally {
//
//            inputStream = null;
//            dbf = null;
//            db = null;
//            doc = null;
//        }
//
//    }//End of XMLToObjects method
//
//    public static synchronized void getInstance() {
//
//        try {
//            if (objCRSIndexTemplates == null) {
//                objCRSIndexTemplates = new CRSIndexTemplates();
//                allTemplates = new HashMap();
//
//                String strWorkFolder = objCRSIndexTemplates.getWorkFolder();
//                System.out.println("Current Location :" + strWorkFolder);
//
//                strWorkFolder = URLDecoder.decode(strWorkFolder);
//                System.out.println("Current Location after decode :" + strWorkFolder);
//
//                String strConfigFilePath = strWorkFolder + "/IndexTemplates.xml";
//                System.out.println("Index templates file path :" + strConfigFilePath);
//                File configFile = new File(strConfigFilePath);
//
//                if (configFile.exists()) {
//                    System.out.println("IndexTemplates.xml file available");
//
//                    XMLToObjects(strConfigFilePath);
//
//                } else {
//                    System.out.println("IndexTemplates.xml file not available");
//                    nLocalTemplateVersion = 0;
//                }
//
//                configFile = null;
//
//            }
//
//        } catch (Exception e) {
//            System.out.println("Exception in getInstance method of CRSIndexTemplates class");
//            e.printStackTrace();
//        }
//
//    }//End of getInstance method 
//
//    public static String getTemplateHTML(String strTemplateName) {
//
//        return (String) allTemplates.get(strTemplateName + "_HTML");
//
//    }//End of getTemplateHTML method
//
//    public static JSONObject getTemplateFieldsList(String strTemplateName) {
//
//        return (JSONObject) allTemplates.get(strTemplateName + "_FIELDS_LIST");
//
//    }//End of getTemplateHTML method
//
//}//End of CRSIndexTemplates class
