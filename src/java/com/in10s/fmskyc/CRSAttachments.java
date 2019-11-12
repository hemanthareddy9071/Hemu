/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmskyc;

import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.codec.binary.Base64;

import org.apache.struts2.ServletActionContext;

/**
 *
 * @author jangachary.s
 */
public class CRSAttachments {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
//    private File file;
    FileInputStream fileInputStream;
    String toolname;

    public String getToolname() {
        return toolname;
    }

    public void setToolname(String toolname) {
        this.toolname = toolname;
    }
    private File file;
    private String contentType;
    private String filename;

    public void setFileInputStream(FileInputStream fileInputStream) {
        this.fileInputStream = fileInputStream;
    }

    public FileInputStream getFileInputStream() {
        return fileInputStream;
    }

    public void setUpload(File file) {
        this.file = file;
    }

    public void setUploadContentType(String contentType) {
        this.contentType = contentType;
    }

    public void setUploadFileName(String filename) {
        this.filename = filename;
    }

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public String uploadImage() {
        prInfo("[CRSAttachments][uploadImage] START");
//        JSONObject loginResponse = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String SessionFilePath = (String) session.getAttribute("SessionFilePath");
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for uploadImage is :: " + reqJson);
            JSONObject respnseJSON = new JSONObject();
            String imageName = reqJson.getString("imageName");
            File outFile = new File(SessionFilePath + File.separator + imageName + ".jpeg");
            InputStream inStream = null;
            OutputStream outStream = null;
            inStream = new FileInputStream(file);
            outStream = new FileOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int fileLength;
            while ((fileLength = inStream.read(buffer)) > 0) {
                outStream.write(buffer, 0, fileLength);
            }
            inStream.close();
            outStream.close();
            prInfo("Image uploaded successfully");
            response.setResponseData(respnseJSON);
        } catch (Exception ex) {
            prLog("Exception in  [CRSAttachments][uploadImage] ::  ", ex);
        }
        prInfo("[CRSAttachments][uploadImage] END");
        return "success";
    }

    public String checkAttachments() {
        prInfo("[CRSAttachments][checkAttachments] START");
        JSONObject loginResponse = null;
        try {

            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String SessionFilePath = (String) session.getAttribute("SessionFilePath");
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for checkAttachments is :: " + reqJson);
//            loginResponse = (JSONObject) session.getAttribute("loginResponse");

//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String imageIds = reqJson.getString("imageIds");
//            imageIds = imageIds.substring(0, imageIds.length() - 1);
            String[] images = imageIds.split(",");
            prDebug("imageIds :: " + imageIds);
            prDebug("images length is :: " + images.length);

            JSONObject respnseJSON = new JSONObject();
            for (String image : images) {
                String encodedfile = null;
                File file = new File(SessionFilePath + File.separator + image + ".jpeg");
                if (file.exists()) {
                    FileInputStream fis = new FileInputStream(file);
                    byte byteArray[] = new byte[(int) file.length()];
                    fis.read(byteArray);
                    String imageString = Base64.encodeBase64String(byteArray);
                    respnseJSON.put(image, imageString);

                    fis.close();
                } else {
                    prInfo("image not found");
                }
            }
//            prInfo("SessionFilePath  " + SessionFilePath);
//            prInfo("loginResponse" + loginResponse);
            response.setResponseData(respnseJSON);
        } catch (Exception ex) {
            prLog("Exception in  [CRSAttachments][checkAttachments] :: ", ex);
        }
        prInfo("[CRSAttachments][checkAttachments] END");
        return "success";
    }

    public String deleteAttachment() {
        prInfo("[CRSAttachments][deleteAttachment] START");
        JSONObject respnseJSON = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            prDebug("request for deleteAttachment is :: " + reqJson);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            String SessionFilePath = (String) session.getAttribute("SessionFilePath");
//            loginResponse = (JSONObject) session.getAttribute("loginResponse");
            String imageId = reqJson.getString("imageId");
            File file = new File(SessionFilePath + File.separator + imageId + ".jpeg");
            if (file.exists()) {
                boolean delete = file.delete();
                System.out.println("is file delete" + delete);
                respnseJSON.put("message", "image deleted");
            } else {
                respnseJSON.put("message", "image not found deleted");
            }
            respnseJSON.put("status", "success");
            response.setSuccess(true);

            response.setResponseData(respnseJSON);
        } catch (Exception ex) {
            respnseJSON.put("status", "fail");
            respnseJSON.put("message", "unable to delete");
            response.setResponseData(respnseJSON);
            response.setSuccess(false);
            prLog("Exception in  [CRSAttachments][deleteAttachment] ::  ", ex);
        }
        prInfo("[CRSAttachments][deleteAttachment] END");
        return "success";
    }

    public String preparedownloadtool() {
        prInfo("[CRSAttachments][uploadImage] START");
        JSONObject loginResponse = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
//            String strReqJson = request.getParameter("reqData");
//            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
//            String SessionFilePath = (String) session.getAttribute("SessionFilePath");
//            loginResponse = (JSONObject) session.getAttribute("loginResponse");
//            JSONObject respnseJSON = new JSONObject();
            try {
                setToolname("ImageUploadTool.zip");
                fileInputStream = new FileInputStream(CRSAppResources.TOOL_PATH);
            } catch (Exception e) {
                prLog("Exception in  preparedownloadtool method ::::  ", e);

                session.setAttribute("msgErr", "Image Upload Tool not found");
                return "failed";
            }
            response.setResponseData("");
        } catch (Exception ex) {
            prLog("Exception in  [CRSAttachments][uploadImage] ::  ", ex);
        }
        prInfo("[CRSAttachments][uploadImage] END");
        return "download";
    }

    public String moveToReceipt() {
        prInfo("[CRSAttachments][moveToReceipt] START");
        String nextPage = "";
        try {
            response = new CRSResponse();
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String poi_same_chk = (String) session.getAttribute("poi_same_chk");
            String SessionFilePath = (String) session.getAttribute("SessionFilePath");
            File attachmentsPOI = new File(SessionFilePath + "//POI.jpeg");
            File attachmentsPOA = new File(SessionFilePath + "//POA.jpeg");
            File attachmentsPhotograph = new File(SessionFilePath + "//SUBSCRIBER_PHOTO.jpeg");
            File attachmentsCAF = new File(SessionFilePath + "//CAF.jpeg");
            if (poi_same_chk.equalsIgnoreCase("true")) {
                if (attachmentsPOI.exists()) {
                    if (attachmentsPhotograph.exists()) {
                        if (attachmentsCAF.exists()) {
                            session.removeAttribute("msgErr");
                            String strReqJson = request.getParameter("reqData");
                            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
//                            String strBrowserId = reqJson.getString("reqSessionId");
//                            String sessionAndBId[] = strBrowserId.split("@#@");
//                            String browserId = sessionAndBId[1];
//                            response.setBrowserId(browserId);

                            String dedupeFlag = CRSAppResources.DedupeFlag;
                            if (dedupeFlag.equalsIgnoreCase("0")) {
                                prInfo("Dedupe disabled");
                                nextPage = "receipt";
                            } else {
                                prInfo("Dedupe enabled");
                                nextPage = "kycDedupe";
                            }
                        } else {
                            prInfo("CAF not attached");
                            session.setAttribute("msgErr", "Please attach CAF");
                            nextPage = "Attachment";
                        }
                    } else {
                        prInfo("Photograpth not attached");
                        session.setAttribute("msgErr", "Please attach Photograph");
                        nextPage = "Attachment";
                    }

                } else {
                    prInfo("POI / POA not attached");
                    session.setAttribute("msgErr", "Please attach POI");
                    nextPage = "Attachment";
                }
            } else {
                if (attachmentsPOI.exists()) {
                    if (attachmentsPOA.exists()) {
                        if (attachmentsPhotograph.exists()) {
                            if (attachmentsCAF.exists()) {
                                session.removeAttribute("msgErr");
                                String strReqJson = request.getParameter("reqData");
                                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
//                                String strBrowserId = reqJson.getString("reqSessionId");
//                                String sessionAndBId[] = strBrowserId.split("@#@");
//                                String browserId = sessionAndBId[1];
//                                response.setBrowserId(browserId);

                                String dedupeFlag = CRSAppResources.DedupeFlag;
                                if (dedupeFlag.equalsIgnoreCase("0")) {
                                    prInfo("Dedupe disabled");
                                    nextPage = "receipt";
                                } else {
                                    prInfo("Dedupe enabled");
                                    nextPage = "kycDedupe";
                                }
                            } else {
                                prInfo("CAF not attached");
                                session.setAttribute("msgErr", "Please attach CAF");
                                nextPage = "Attachment";
                            }
                        } else {
                            prInfo("Photograpth not attached");
                            session.setAttribute("msgErr", "Please attach Photograph");
                            nextPage = "Attachment";
                        }
                    } else {
                        prInfo("POA not attached");
                        session.setAttribute("msgErr", "Please attach POA");
                        nextPage = "Attachment";
                    }
                } else {
                    prInfo("POI not attached");
                    session.setAttribute("msgErr", "Please attach POI");
                    nextPage = "Attachment";
                }
            }

            prDebug("After Attachment page is :: " + nextPage);
            prInfo("End of moveToReceipt method");
        } catch (Exception e) {
            prLog("Exception in  [CRSAttachments][moveToReceipt] ::  ", e);
        }
        prInfo("[CRSAttachments][moveToReceipt] END");
        return nextPage;
    }

    private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String strMsg) {
        AppLogger.error(strMsg);
    }

    private void prLog(String msg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(msg + sw.toString());
    }
}
