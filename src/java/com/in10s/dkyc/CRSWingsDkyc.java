/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.dkyc;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSClient;
import com.in10s.commons.CRSDBManager;
import com.in10s.commons.CRSMDH5;
import com.in10s.commons.CRSNotificationManager;
import com.in10s.commons.CRSPropertyReader;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.fmsekyc.FMS_ekyc;
import static com.in10s.fmsekyc.FMS_ekyc.generateRandom;
import com.in10s.logger.AppLogger;
import com.in10s.payment.PaymentGateway;
import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import static org.apache.commons.io.FileUtils.forceDelete;
import org.apache.commons.io.FilenameUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author praveen.k
 */
public class CRSWingsDkyc {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;
    private File userFile;
    private File userFileS;
    private File userFileL;
    private String userFileContentType;
    private String userFileSContentType;
    private String userFileLContentType;
    private String userFileFileName;
    private String userFileSFileName;
    private String userFileLFileName;
    FileInputStream fileInputStream;
    private File file;
    private String contentType;
    private String filename;
    
        private void prInfo(String strMsg) {
        AppLogger.info(strMsg);
    }

    private void prDebug(String strMsg) {
        AppLogger.debug(strMsg);
    }

    private void prErr(String strMsg, Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        AppLogger.error(sw.toString());
    }

    /**
     * @return the userFileS
     */
    public File getUserFileS() {
        return userFileS;
    }

    /**
     * @param userFileS the userFileS to set
     */
    public void setUserFileS(File userFileS) {
        this.userFileS = userFileS;
    }

    /**
     * @return the userFileL
     */
    public File getUserFileL() {
        return userFileL;
    }

    /**
     * @param userFileL the userFileL to set
     */
    public void setUserFileL(File userFileL) {
        this.userFileL = userFileL;
    }

    /**
     * @return the userFileSContentType
     */
    public String getUserFileSContentType() {
        return userFileSContentType;
    }

    /**
     * @param userFileSContentType the userFileSContentType to set
     */
    public void setUserFileSContentType(String userFileSContentType) {
        this.userFileSContentType = userFileSContentType;
    }

    /**
     * @return the userFileLContentType
     */
    public String getUserFileLContentType() {
        return userFileLContentType;
    }

    /**
     * @param userFileLContentType the userFileLContentType to set
     */
    public void setUserFileLContentType(String userFileLContentType) {
        this.userFileLContentType = userFileLContentType;
    }

    /**
     * @return the userFileSFileName
     */
    public String getUserFileSFileName() {
        return userFileSFileName;
    }

    /**
     * @param userFileSFileName the userFileSFileName to set
     */
    public void setUserFileSFileName(String userFileSFileName) {
        this.userFileSFileName = userFileSFileName;
    }

    /**
     * @return the userFileLFileName
     */
    public String getUserFileLFileName() {
        return userFileLFileName;
    }

    /**
     * @param userFileLFileName the userFileLFileName to set
     */
    public void setUserFileLFileName(String userFileLFileName) {
        this.userFileLFileName = userFileLFileName;
    }

    /**
     * @return the userFile
     */
    public File getUserFile() {
        return userFile;
    }

    /**
     * @param userFile the userFile to set
     */
    public void setUserFile(File userFile) {
        this.userFile = userFile;
    }

    /**
     * @return the userFileContentType
     */
    public String getUserFileContentType() {
        return userFileContentType;
    }

    /**
     * @param userFileContentType the userFileContentType to set
     */
    public void setUserFileContentType(String userFileContentType) {
        this.userFileContentType = userFileContentType;
    }

    /**
     * @return the userFileFileName
     */
    public String getUserFileFileName() {
        return userFileFileName;
    }

    /**
     * @param userFileFileName the userFileFileName to set
     */
    public void setUserFileFileName(String userFileFileName) {
        this.userFileFileName = userFileFileName;
    }

    public CRSResponse getResponse() {
        return response;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

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
    
    
    /* -------------------  functions ----------------------------- */

    public String dkycFormData() {
        JSONObject fmskycData = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            if (strReqData == "" || strReqData == null) {
                return "InvalidRequest";
            }
            String ZipFilePath = "";
            File zip = null;
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("input request from dkycFormData ::::::" + reqJson);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MMM/dd");
            java.util.Date date = Calendar.getInstance().getTime();
            String strDate = sdf.format(date);

            fmskycData = reqJson;

//            if (fmskycData.containsKey("TARRIF_FLAG") && !("".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG")))) {
            if (fmskycData.containsKey("TARRIF_FLAG")) {
                String dovFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
                File UploadJob = new File(dovFilePath);
                if (!UploadJob.exists()) {
                    boolean folderStatus = UploadJob.mkdirs();
                }
                //session.removeAttribute("DOCS_FILE_PATH");
                if (fmskycData.containsKey("TARRIF_FLAG") && !("".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) && !("TRAIL_OFFER".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG")))) {
//                if ("GOVT".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
                    FileUtils.copyFile(this.userFile, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileFileName()).getAbsolutePath())));

//                } else if ("STUDENT".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
//                    FileUtils.copyFile(this.userFileS, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileSFileName()).getAbsolutePath())));
//
//                } else if ("LANDLINE".equalsIgnoreCase(fmskycData.getString("TARRIF_FLAG"))) {
//                    FileUtils.copyFile(this.userFileL, new File(UploadJob.getAbsoluteFile() + File.separator + "TARIFF_ID." + FilenameUtils.getExtension(new File(getUserFileLFileName()).getAbsolutePath())));
//
//                }
                }
            }

            JSONObject documentTypes = new JSONObject();

            documentTypes.put("JOB_TYPE", "KYC");
            documentTypes.put("LOB_TYPE", "LANDLINE");

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            e.printStackTrace();
            AppLogger.error("Exception in dkycFormData method :" + sw.toString());
            response.setSuccess(false);
            response.setMessage("Exception occured while sending");
        }

        request.setAttribute("DKYC_FORM_DATA", fmskycData);

        return "success";
    }

    public String back2DKYCForm() {
        request = ServletActionContext.getRequest();
        response = new CRSResponse();
        String strReqData = request.getParameter("reqData");
        if (strReqData == "" || strReqData == null) {
            return "InvalidRequest";
        }
        strReqData = new CRSAuthenticate().Decrypt(strReqData);
        JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);

        AppLogger.debug("input request from back2DKYCForm ::::::" + reqJson);

        request.setAttribute("DKYC_FORM_DATA", reqJson);
        return "success";
    }

    public String back2DKYCDocs() {
        String retVal = "InvalidRequest";
        request = ServletActionContext.getRequest();
        session = request.getSession(false);
        response = new CRSResponse();
        JSONObject objDKYCAttachmentsData = new JSONObject();
        try {
            String strReqData = request.getParameter("reqData");
            AppLogger.debug("input request from back2DKYCDocs before Parse::::::" + strReqData);

            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            reqJson.put("reqFrmBck", true);
            AppLogger.debug("input request from back2DKYCDocs after Parse::::::" + strReqData);
            if (session != null) {
                String DOC_Path = (String) session.getAttribute("DOCS_FILE_PATH");
                AppLogger.debug("DOC_Path  to fetch Docs ::::::" + DOC_Path);
                objDKYCAttachmentsData.put("FIELDS_INFO", reqJson);
                if (!"".equals(DOC_Path)) {
                    JSONObject reqData = new JSONObject();
                    reqData.put("FILE_PATH", DOC_Path);
                    JSONArray base64Images = convertImageToBase64String(reqData);
                    objDKYCAttachmentsData.put("DOCS_INFO", base64Images);
                    retVal = "success";
                }
            }

            request.setAttribute("DKYC_DOC_INFO", objDKYCAttachmentsData);
        } catch (Exception e) {
            prErr("Error in ", e);
        }
        return retVal;
    }

    public String wingsDKYCForm() {
        request = ServletActionContext.getRequest();
        response = new CRSResponse();
        String retVal="InvalidRequest";
        String strReqData = request.getParameter("reqData");
        if (strReqData == "" || strReqData == null) {
            return "InvalidRequest";
        }
        JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);

        AppLogger.debug("input request from wingsDKYCForm ::::::" + reqJson);

        checkReqImgs(reqJson);

        request.setAttribute("DKYC_ATTACHMENT_DATA", reqJson);
        if("LLDKYC".equalsIgnoreCase(reqJson.optString("inputType")) || "LL_SKIP_ATTACH".equalsIgnoreCase(reqJson.optString("inputType"))){
        retVal="LLDKYC";
        }else{
        retVal="DKYC";
        }
        return retVal;
    }

    public boolean checkReqImgs(JSONObject reqJson) {
        boolean retVal = true;
        request = ServletActionContext.getRequest();
        session = request.getSession(false);
        response = new CRSResponse();
        try {

            AppLogger.info("reqJsone: " + reqJson);
            String filePath = (String) session.getAttribute("DOCS_FILE_PATH");
            File fileDir = new File(filePath);
            File[] fileList = fileDir.listFiles();
            for (int i = 0; i < fileList.length; i++) {
                File file = fileList[i];
                String fileName = FilenameUtils.removeExtension(file.getName());
                AppLogger.info("File Name: " + fileName);
                if (!fileName.equalsIgnoreCase("SUBSCRIBER_PHOTO") && !fileName.equalsIgnoreCase("POI")) {
                    if (file.exists()) {
                        AppLogger.info("File exists");
                        if (!reqJson.optBoolean(fileName, true)) {
                            file.delete();
                            AppLogger.info("File is deleted : " + fileName);
                        }
                        if (reqJson.optBoolean("POI_POA_SAME", true) && fileName.equalsIgnoreCase("POA")) {
                            file.delete();
                            AppLogger.info("File is deleted : " + fileName);
                        }
                    } else {
                        AppLogger.info("File not exists");
                    }
                }
            }
        } catch (Exception e) {
        }

        return retVal;
    }

    public String chooseFlow() {
        request = ServletActionContext.getRequest();
        session = request.getSession(false);
        response = new CRSResponse();
        String strReqData = request.getParameter("reqData");
        if (strReqData == "" || strReqData == null) {
            return "InvalidRequest";
        }

        try {
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("input request from chooseFlow ::::::" + reqJson);

            session.removeAttribute("DOCS_FILE_PATH");
        } catch (Exception e) {
        }

        return "success";
    }

    public String uploadImage() {
        InputStream inStream = null;
        OutputStream outStream = null;
        FileInputStream fis = null;
        String imageString = "";
        AppLogger.info("Starting of uploadImage in Attachments class file " + file);
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("request for uploadImage is : " + reqJson);
            String SessionFilePath = reqJson.getString("imgFlodLoc");
            if (SessionFilePath.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MMM/dd");
                java.util.Date date = Calendar.getInstance().getTime();
                String strDate = sdf.format(date);
                SessionFilePath = new File(CRSAppResources.TARIFF_ZIP_PATH + File.separator + "DKYCJobs" + File.separator + strDate + File.separator + System.currentTimeMillis() + "_" + session.getAttribute("RegMobNum")).getAbsolutePath();
                new File(SessionFilePath).mkdirs();
            }
            String imageName = reqJson.getString("imageName");
            File outFile = new File(SessionFilePath + File.separator + imageName + ".jpeg");            
            if (reqJson.containsKey("imageType") && "TAKE_PIC".equalsIgnoreCase(reqJson.getString("imageType"))) {
                String imageData = reqJson.getString("imageData");
                imageString = imageData.split(",")[1];
                byte[] base64Val = Base64.decodeBase64(imageString);
                BufferedImage image = ImageIO.read(new ByteArrayInputStream(base64Val));
                ImageIO.write(image, "jpeg", outFile);

            } else {

                inStream = new FileInputStream(file);
                outStream = new FileOutputStream(outFile);
                byte[] buffer = new byte[1024];
                int fileLength;
                while ((fileLength = inStream.read(buffer)) > 0) {
                    outStream.write(buffer, 0, fileLength);
                }
                fis = new FileInputStream(outFile);
                byte byteArray[] = new byte[(int) outFile.length()];
                fis.read(byteArray);
                imageString = Base64.encodeBase64String(byteArray);

            }

            session.setAttribute("DOCS_FILE_PATH", SessionFilePath);
            AppLogger.info("Image uploaded successfully to file path " + outFile.getAbsolutePath());
            response.setSuccess(true);
            response.setResponseData(imageString);
            response.setMessage(SessionFilePath);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
             response.setSuccess(false);
            AppLogger.error("Exception in  checkAttachments ::::  " + sw.toString());
        } finally {
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException ex) {
                    Logger.getLogger(CRSWingsDkyc.class.getName()).log(Level.SEVERE, null, ex);
                }

            }
            if (outStream != null) {
                try {
                    outStream.close();
                } catch (IOException ex) {
                    Logger.getLogger(CRSWingsDkyc.class.getName()).log(Level.SEVERE, null, ex);
                }

            }
            if(fis != null){
                try {
                    fis.close();
                } catch (IOException ex) {
                    Logger.getLogger(CRSWingsDkyc.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }
        AppLogger.info("End of uploadImage in Attachments class");
        return "success";
    }

    public String deleteAttachment() {
        AppLogger.info("Starting of deleteAttachment in Attachments class");
        JSONObject loginResponse = null;
        JSONObject respnseJSON = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("request for deleteAttachment is : " + reqJson);
            String SessionFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
            loginResponse = (JSONObject) session.getAttribute("loginResponse");

            String imageId = reqJson.getString("imageId");

            File file = new File(SessionFilePath + File.separator + imageId + ".jpeg");
            if (file.exists()) {

                file.delete();
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
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in  deleteAttachment ::::  " + sw.toString());
        }

        AppLogger.info("End of deleteAttachment......");
        return "success";
    }
    
    public String fetchWingsLLNos() {
        AppLogger.info("starting of fetchWingsLLNos method");
        JSONObject objWingsLLNOs = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in fetchWingsLLNos method is :  " + reqJson);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getAvailableLLNumbers";
//            String serviceURL = "http://rsweb66:8083/OnboardService/bsnl/Exchange/getAvailableLLNumbers";
            AppLogger.debug("onBoardURL for fetchWingsLLNos method is : " + serviceURL);
            JSONObject umJOBJNew = new JSONObject();
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
           reqJson.put("JOB_SOURCE", "S_LL");
            reqJson.put("JOB_TYPE", "FMS_DKYC");
           reqJson.put("SS_CODE", "");
           reqJson.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
           reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for fetchWingsLLNos services in fetchWingsLLNos method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from fetchWingsLLNos services in fetchWingsLLNos method is : " + strJobsCurrentStatus);
            objWingsLLNOs = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("objWingsLLNOs :" + objWingsLLNOs);
            if ("0".equalsIgnoreCase(objWingsLLNOs.optString("STATUS","-1"))) {
                response.setSuccess(true);
                response.setMessage(objWingsLLNOs.optString("MESSAGE"));
                response.setResponseData(objWingsLLNOs);
            } else {
                AppLogger.debug("Status key missing in fetchWingsLLNos services repsonse is : " + objWingsLLNOs);
                response.setSuccess(false);
                response.setMessage(objWingsLLNOs.optString("MESSAGE"));
                response.setResponseData(objWingsLLNOs);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  fetchWingsLLNos method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of fetchWingsLLNos method ");
        return "success";
    }
    
    public String loadWingsLLPlans() {
        AppLogger.info("starting of loadWingsLLPlans method");
        JSONObject objWingsLLPlans = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in loadWingsLLPlans method is :  " + reqJson);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getLLPlans";
//            String serviceURL = "http://rsweb66:8083/OnboardService/bsnl/Exchange/getLLPlans";
            AppLogger.debug("onBoardURL for loadWingsLLPlans method is : " + serviceURL);
            JSONObject umJOBJNew = new JSONObject();
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
           reqJson.put("JOB_SOURCE", "S");
            reqJson.put("JOB_TYPE", "FMS_DKYC");
           reqJson.put("SS_CODE", "");
           reqJson.put("CIRCLE", loginResponse.getString("FMSCircle"));
           reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for loadWingsLLPlans services in fetchWingsLLNos method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from loadWingsLLPlans services in loadWingsLLPlans method is : " + strJobsCurrentStatus);
            objWingsLLPlans = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("loadWingsLLPlans :" + objWingsLLPlans);
            if ("0".equalsIgnoreCase(objWingsLLPlans.optString("STATUS","-1"))) {
                response.setSuccess(true);
                response.setMessage(objWingsLLPlans.optString("MESSAGE"));
                response.setResponseData(objWingsLLPlans);
            } else {
                AppLogger.debug("Status key missing in loadWingsLLPlans services repsonse is : " + objWingsLLPlans);
                response.setSuccess(false);
                response.setMessage(objWingsLLPlans.optString("MESSAGE"));
                response.setResponseData(objWingsLLPlans);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  loadWingsLLPlans method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of loadWingsLLPlans method ");
        return "success";
    }
    
    public String loadLLStatesByPin() {
        AppLogger.info("starting of loadLLStatesByPin method");
        JSONObject objWingsLLStates = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in loadLLStatesByPin method is :  " + reqJson);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getStatesByPINCode";
//            String serviceURL = "http://rsweb66:8083/OnboardService/bsnl/Exchange/getStatesByPINCode";
            AppLogger.debug("onBoardURL for loadLLStatesByPin method is : " + serviceURL);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
           reqJson.put("JOB_SOURCE", "S_LL");
            reqJson.put("JOB_TYPE", "FMS_DKYC");
           reqJson.put("SS_CODE", "");
           reqJson.put("CIRCLE", loginResponse.getString("FMSCircle"));
           reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for loadLLStatesByPin services in loadLLStatesByPin method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from loadLLStatesByPin services in loadLLStatesByPin method is : " + strJobsCurrentStatus);
            objWingsLLStates = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("loadLLStatesByPin :" + objWingsLLStates);
            if ("0".equalsIgnoreCase(objWingsLLStates.optString("STATUS","-1"))) {
                response.setSuccess(true);
                response.setMessage(objWingsLLStates.optString("MESSAGE"));
                response.setResponseData(objWingsLLStates);
            } else {
                AppLogger.debug("Status key missing in loadLLStatesByPin services repsonse is : " + objWingsLLStates);
                response.setSuccess(false);
                response.setMessage(objWingsLLStates.optString("MESSAGE"));
                response.setResponseData(objWingsLLStates);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  loadLLStatesByPin method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of loadLLStatesByPin method ");
        return "success";
    }
    
    public String loadLLDistrics() {
        AppLogger.info("starting of loadLLDistrics method");
        JSONObject objWingsLLDistrics = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in loadLLDistrics method is :  " + reqJson);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getDistrictsByPINCode";
//            String serviceURL = "http://rsweb66:8083/OnboardService/bsnl/Exchange/getDistrictsByPINCode";
            AppLogger.debug("onBoardURL for loadLLDistrics method is : " + serviceURL);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
           reqJson.put("JOB_SOURCE", "S_LL");
           reqJson.put("JOB_TYPE", "FMS_DKYC");
           reqJson.put("SS_CODE", "");
           reqJson.put("CIRCLE", reqJson.getString("CIRCLE").toUpperCase());
           reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for loadLLDistrics services in loadLLDistrics method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from loadLLDistrics services in loadLLDistrics method is : " + strJobsCurrentStatus);
            objWingsLLDistrics = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("loadLLDistrics :" + objWingsLLDistrics);
            if ("0".equalsIgnoreCase(objWingsLLDistrics.optString("STATUS","-1"))) {
                response.setSuccess(true);
                response.setMessage(objWingsLLDistrics.optString("MESSAGE"));
                response.setResponseData(objWingsLLDistrics);
            } else {
                AppLogger.debug("Status key missing in loadLLDistrics services repsonse is : " + objWingsLLDistrics);
                response.setSuccess(false);
                response.setMessage(objWingsLLDistrics.optString("MESSAGE"));
                response.setResponseData(objWingsLLDistrics);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  loadLLDistrics method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of loadLLDistrics method ");
        return "success";
    }
    
    public String reserveWingsLLNos() {
        AppLogger.info("starting of reserveWingsLLNos method");
        JSONObject objWingsLLNOsReserve = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in reserveWingsLLNos method is :  " + reqJson);

            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/reserveLLNo";
//            String serviceURL = "http://rsweb66:8083/OnboardService/bsnl/Exchange/reserveLLNo";
            AppLogger.debug("onBoardURL for reserveWingsLLNos method is : " + serviceURL);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
           reqJson.put("JOB_SOURCE", "S_LL");
            reqJson.put("JOB_TYPE", "FMS_DKYC");
           reqJson.put("SS_CODE", "");
           reqJson.put("CIRCLE_CODE", loginResponse.getString("FMSCircle"));
           reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for reserveWingsLLNos services in reserveWingsLLNos method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from reserveWingsLLNos services in reserveWingsLLNos method is : " + strJobsCurrentStatus);
            objWingsLLNOsReserve = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("objWingsLLNOsReserve :" + objWingsLLNOsReserve);
            if ("0".equalsIgnoreCase(objWingsLLNOsReserve.optString("STATUS","-1"))) {
                response.setSuccess(true);
                response.setMessage(objWingsLLNOsReserve.optString("MESSAGE"));
                response.setResponseData(objWingsLLNOsReserve);
            } else {
                AppLogger.debug("Status key missing in reserveWingsLLNos services repsonse is : " + objWingsLLNOsReserve);
                response.setSuccess(false);
                response.setMessage(objWingsLLNOsReserve.optString("MESSAGE"));
                response.setResponseData(objWingsLLNOsReserve);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  reserveWingsLLNos method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of reserveWingsLLNos method ");
        return "success";
    }

    public JSONArray convertImageToBase64String(JSONObject reqData) {
        prInfo("[convertImageToBase64String][START]");
        prDebug("Request data [convertImageToBase64String] : " + reqData);
        String base64EncodedData = "";
        JSONArray base64Images = new JSONArray();
        try {
            String basePath = reqData.getString("FILE_PATH");
            String strFilePath = basePath;
            prInfo("FILE_PATH: " + strFilePath);
            File file = new File(strFilePath);
            String[] list_of_files = file.list();
            prInfo("list_of_files:" + list_of_files.length);
            for (int i = 0; i < list_of_files.length; i++) {
                strFilePath = basePath;
                strFilePath += File.separator + list_of_files[i];
                File tempfile = new File(strFilePath);
                JSONObject temp = new JSONObject();
                AppLogger.info("" + tempfile.getName());
                if (tempfile.exists() && (tempfile.getName().contains("jpeg") || tempfile.getName().contains("JPEG"))) {
                    base64EncodedData = encode(tempfile.getAbsolutePath(), false);
                    temp.put(list_of_files[i], base64EncodedData);
                    base64Images.add(temp);
                }
            }
        } catch (Exception e) {
            prErr("Error in [CRSBPDAO][convertImageToBase64String]", e);
        } finally {
            prInfo("[convertImageToBase64String][END]" + base64Images);
        }
        return base64Images;
    }

    public String encode(String sourceFile, boolean isChunked) throws Exception {
        prInfo("[encode][START]");
        byte[] base64EncodedData = Base64.encodeBase64(loadFileAsBytesArray(sourceFile), isChunked);
        prInfo("[encode][END]");
        return new String(base64EncodedData);
    }

    public byte[] loadFileAsBytesArray(String fileName) throws Exception {
        prInfo("[loadFileAsBytesArray][START]");
        BufferedInputStream bufferedinput_Stream = null;
        byte[] bytes = null;
        try {
            File file = new File(fileName);
            int length = (int) file.length();
            bufferedinput_Stream = new BufferedInputStream(new FileInputStream(file));
            bytes = new byte[length];
            bufferedinput_Stream.read(bytes, 0, length);
        } catch (Exception e) {
            prErr("Error in [loadFileAsBytesArray]", e);
        } finally {
            if (bufferedinput_Stream != null) {
                try {
                    bufferedinput_Stream.close();
                } catch (Exception e) {

                }
            }
        }
        prInfo("[loadFileAsBytesArray][END]");
        return bytes;
    }
    
    public String checkUserEntry() {
        AppLogger.info("starting of checkUserEntry method");
        JSONObject respJson = new JSONObject();
        JSONObject objWingsLLStates = null;

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            AppLogger.debug("Request data in checkUserEntry method is :  " + reqJson);
             String onBoardURL = CRSAppResources.ONBOARD_URL;
            String serviceURL = onBoardURL.toString().trim() + "/bsnl/Exchange/getStatesByPINCode";
            AppLogger.debug("onBoardURL for checkUncompletedTxnsCount method is : " + serviceURL);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("loginResponse data in checkUserEntry method is :  " + loginResponse);
            reqJson.put("JOB_SOURCE", "S");
            reqJson.put("JOB_TYPE", "FMS_DKYC");
            reqJson.put("SS_CODE", "");
            reqJson.put("CIRCLE", loginResponse.getString("FMSCircle"));
            reqJson.put("ZONE_CODE", loginResponse.getString("FMSZone"));
            reqJson.put("MOBILE_NO", loginResponse.getString("RegMobNum"));
            reqJson.put("EMAILID", loginResponse.getString("regEmail"));
            reqJson.put("PIN_CODE", session.getAttribute("regPINCode"));
            JSONObject countJson = checkUncompletedTxnsCount(reqJson);
            String inputFieldsEntity = reqJson.toString();
            AppLogger.debug("Input data  for loadLLStatesByPin services in checkUncompletedTxnsCount method is : " + inputFieldsEntity);
            String strJobsCurrentStatus = new CRSClient().OnBoardServiceCall(serviceURL, inputFieldsEntity);
            AppLogger.debug("Response from loadLLStatesByPin services in checkUncompletedTxnsCount method is : " + strJobsCurrentStatus);
            objWingsLLStates = (JSONObject) JSONSerializer.toJSON(strJobsCurrentStatus);
            prDebug("loadLLStatesByPin [checkUserEntry]:" + objWingsLLStates);
            respJson.put("STATES_INFO",objWingsLLStates);
            prDebug("Response from [checkUserEntry]  :: " + respJson);
            
            if (countJson.getInt("STATUS") == 0) {
                JSONObject auditJson = insertSelfDkycAudit(reqJson);
                String seqID = auditJson.getString("SEQ_ID");
                if (auditJson.getInt("STATUS") == 0) {
                    respJson.put("SEQ_ID", seqID);
                    response.setSuccess(true);
                    response.setMessage(auditJson.optString("MESSAGE"));
                    response.setResponseData(respJson);
                } else {
                    response.setSuccess(false);
                    response.setMessage(auditJson.getString("MESSAGE"));
                    response.setResponseData(respJson);
                }
            } else if (countJson.getInt("STATUS") == 1) {
                respJson.put("SEQ_ID",countJson.getString("SEQ_ID"));
                response.setSuccess(true);
                response.setMessage(countJson.getString("MESSAGE"));
                response.setResponseData(respJson);
            } else {
                response.setSuccess(false);
                response.setMessage(countJson.getString("MESSAGE"));
                response.setResponseData(respJson);
            }
       
            
           
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);            
            AppLogger.error("Exception in  loadLLStatesByPin method :::" + sw.toString());
            response.setSuccess(false);
            response.setResponseData(sw.toString());
        }
        AppLogger.info("Ending of loadLLStatesByPin method ");
        return "success";
    }
    
    public JSONObject checkUncompletedTxnsCount(JSONObject reqJson) {
        prInfo("[CRSDKYCLandLine][checkUncompletedTxnsCount][START]");
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        int nStatus = -1;
        String errMsg = "";
        JSONObject respJson = new JSONObject();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        JSONObject objWingsLLStates = null;

        try {            
            String checkUncompletedTxnsCountQry = new CRSPropertyReader().getQueryonId("CHECK_LL_USER_COUNT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [checkUncompletedTxnsCount] :  " + checkUncompletedTxnsCountQry);
            con = CRSDBManager.getConnection();
            prDebug("Conn  [checkUncompletedTxnsCount] :  " + con);
            String[] columns = {"MOBILE_NO","EMAILID", "JOB_TYPE", "JOB_SOURCE", "MOBILE_NO",  "EMAILID"};
            pstmt = con.prepareStatement(checkUncompletedTxnsCountQry);
             for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, reqJson.getString(columns[i]));
            }
            resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                nStatus = 1;
                errMsg = msgObj.getMessge("LL_USER_CHECK_FAIL");
                respJson.put("SEQ_ID", resultSet.getString("SDKYC_ID"));
            } else {
                nStatus = 0;
                errMsg = "SUCCESS";
            }
        } catch (Exception e) {                    
            errMsg = msgObj.getMessge("LL_USER_CHECK_ERR");
            prErr(errMsg, e);    
        } finally {
            respJson.put("STATUS", nStatus);            
            respJson.put("MESSAGE", errMsg);
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        
        }        
        prInfo("[CRSDKYCLandLine][checkUncompletedTxnsCount][END]");
        return respJson;
    }
    
    public JSONObject insertSelfDkycAudit(JSONObject reqData) throws Exception {
        prInfo("[CRSDKYCLandLine][insertSelfDkycAudit][START]");
        prDebug("insertSelfDkycAudit Data :" + reqData);
        Connection con = null;
        PreparedStatement pstmt = null;
        JSONObject respJson = new JSONObject();
         CRSPropertyReader msgObj = new CRSPropertyReader();
        int nStatus = -1;
        String errMsg = "";
        String seqID = "";
        try {
            seqID = getSeqID("FMS_LL_SEQ_NO");
            reqData.put("SDKYC_ID", seqID);
            con = CRSDBManager.getConnection();
            prDebug("Con in [insertSelfDkycAudit]  ::  " + con);
            String[] columns = {"SDKYC_ID", "MOBILE_NO", "EMAILID", "CIRCLE"};
            String auditPaymentTxn_Qry = new CRSPropertyReader().getQueryonId("SELF_LL_DKYC_AUDIT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [insertSelfDkycAudit] :: " + auditPaymentTxn_Qry + " | Column Length :: " + columns.length);
            pstmt = con.prepareStatement(auditPaymentTxn_Qry);
            for (int i = 0; i < columns.length; i++) {
                pstmt.setString(i + 1, reqData.getString(columns[i]));
            }
            int insCount = pstmt.executeUpdate();
            prDebug("insertSelfDkycAudit count :: " + insCount);
            if (insCount == 1) {
                nStatus = 0;
            } else {
                errMsg = msgObj.getMessge("LL_AUDIT_USER_FAIL");
            }
        } catch (Exception e) {           
             errMsg = msgObj.getMessge("LL_AUDIT_USER_ERR");
            prErr(errMsg, e);
        } finally {
            respJson.put("STATUS", nStatus);
            respJson.put("SEQ_ID", seqID);
            respJson.put("MESSAGE", errMsg);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[CRSDKYCLandLine][insertSelfDkycAudit][END]");
        return respJson;
    }
      
    public String getSeqID(String seqIDQry) {
        prInfo("[CRSDKYCLandLine][getSeqID][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        String seqID = null;
        Connection con = null;
        try {            
            con = CRSDBManager.getConnection();
            prDebug("Con in [getSeqID]  ::  " + con);
            String cafSeqQry = new CRSPropertyReader().getQueryonId(seqIDQry).replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
             prDebug("Query to [getSeqID] :  " + cafSeqQry);
            pstmt = con.prepareStatement(cafSeqQry);
            resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                seqID = resultSet.getString(1);
            }
        } catch (Exception e) {
            prErr("Error in [CRSDKYCLandLine][getSeqID][Connection]:", e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);        }
        prDebug("Response from [getSeqID] :: " + seqID);
        prInfo("[CRSDKYCLandLine][getSeqID][END]");
        return seqID;
    }
    
    public String uploadFMSDKYCImage() {
        AppLogger.info("Starting of uploadFMSDKYCImage in CRSDigitalFMSKYCAttachments class file");
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            AppLogger.debug("request for uploadFMSDKYCImage is : " + reqJson);
            String imageName = reqJson.getString("imageName");
            String imageType = reqJson.getString("imageType");
            String imageData = reqJson.getString("imageData");
            String SessionFilePath = reqJson.getString("imgFlodLoc");
            if (SessionFilePath.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MMM/dd");
                java.util.Date date = Calendar.getInstance().getTime();
                String strDate = sdf.format(date);
                SessionFilePath = new File(CRSAppResources.TARIFF_ZIP_PATH + File.separator + "DKYCJobs" + File.separator + strDate + File.separator + System.currentTimeMillis() + "_" + session.getAttribute("RegMobNum")).getAbsolutePath();
                new File(SessionFilePath).mkdirs();
            } 
            File outFile = new File(SessionFilePath + File.separator + imageName + ".jpeg");
            byte[] base64Val = Base64.decodeBase64(imageData.split(",")[1]);
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(base64Val));
                ImageIO.write(image, "jpg", outFile);
                AppLogger.info("Image uploaded successfully");
                response.setSuccess(true);
            
            response.setResponseData(imageData);
        } catch (Exception ex) {
            response.setSuccess(false);
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            ex.printStackTrace(pw);
            AppLogger.error("Exception in uploadFMSDKYCImage method of CRSDigitalFMSKYCAttachments ::::  " + sw.toString());
        }
        AppLogger.info("End of uploadFMSDKYCImage in CRSDigitalFMSKYCAttachments class");
        return "success";
    }
    
    public String saveSkippedDocs(){
        String ZipFilePath = "";
        CRSPropertyReader msgObj = new CRSPropertyReader();
        File zip = null;
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("saveSkippedDocs reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("JobUpload saveSkippedDocs method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/DKYCService/saveFMSDKYCSkipImages";
            //String OnboardURL = "http://RSWEB91:2021/BSNL_OB_Service/bsnl/DKYCService/saveFMSDKYCSkipImages";
            AppLogger.debug("onBoardURL in JobUpload saveSkippedDocs method :" + OnboardURL);
            JSONObject skippedJob_Details = reqJson; // (JSONObject) JSONSerializer.toJSON(strEviseDrmData);
                String dovFilePath = (String) session.getAttribute("DOCS_FILE_PATH");
                File UploadJob = new File(dovFilePath);
                if (!UploadJob.exists()) {
                    boolean folderStatus = UploadJob.mkdirs();
                }
                session.removeAttribute("DOCS_FILE_PATH");
                List DOCList = new ArrayList();
                List ImagePathList = new ArrayList();
                String FolderName = UploadJob.getName();

                File[] filesList = UploadJob.listFiles();
                for (int j = 0; j < filesList.length; j++) {
                    AppLogger.debug("ZIP File name in saveSkippedDocs method is : " + filesList[j].getName());
                    AppLogger.debug("folder length in saveSkippedDocs method is : " + filesList.length);
                    if (filesList[j].isFile() && !(filesList[j].getName().contains("json"))) {
                        ImagePathList.add(filesList[j].getAbsolutePath());
                        DOCList.add(filesList[j].getName());
                    }
                }

                if (ImagePathList.size() > 0 && (DOCList.size() == ImagePathList.size())) {
                    ZipFilePath = new FMS_ekyc().doZip(UploadJob.getAbsolutePath(), ImagePathList, DOCList, FolderName);
                    String HashKey = new CRSMDH5().getHashKey(new File(ZipFilePath), "MD5");
                    AppLogger.debug("Hashkey of zipFile in saveSkippedDocs method is :" + HashKey);
                    skippedJob_Details.put("HashKey", HashKey);

                } else {
                    skippedJob_Details.put("HashKey", "");
                }
                zip = new File(ZipFilePath);
                AppLogger.debug("Zip file size  in saveSkippedDocs method is::::::" + zip.length() / 1024 + "kb");
                skippedJob_Details.put("ZipFileList", DOCList);
                skippedJob_Details.put("ZipFileCreation", ZipFilePath);
                skippedJob_Details.put("ZipFileLength", zip.length());
                skippedJob_Details.put("FILE_NAME", zip.getName());
                skippedJob_Details.put("TARIFF_ID_DOC_PATH", ZipFilePath);
                skippedJob_Details.put("ZONE", loginResponse.getString("FMSZone"));
                skippedJob_Details.put("JOB_SOURCE", "S");
                skippedJob_Details.put("JOB_USER", "-1");
                skippedJob_Details.put("JOB_TYPE", "FMS_DKYC");
                skippedJob_Details.put("CIRCLE", loginResponse.getString("FMSCircle"));

                JSONObject serviceRes = new CRSClient().serviceRequest(ZipFilePath, skippedJob_Details.toString(), OnboardURL);
                AppLogger.debug("Response of saveCAFData service in  saveSkippedDocs method for FMSDKYC:" + serviceRes);
            if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                response.setSuccess(true);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            }else{
               response.setSuccess(false);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            }
            
        }catch(Exception e){
                  response.setSuccess(false);
                response.setMessage("Exception Occered in saveSkippedDocs");
        }
    
    return "success";
    }
    
    public String couponValidCheck() {
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("couponValidCheck reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("couponValidCheck method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/Wings/validateTrailCoupon";
//            String OnboardURL = "http://RSWEB91:2021/BSNL_OB_Service/bsnl/DKYCService/saveFMSDKYCSkipImages";
            AppLogger.debug("onBoardURL in  couponValidCheck method :" + OnboardURL);
            JSONObject coupon_Details = reqJson; // (JSONObject) JSONSerializer.toJSON(strEviseDrmData);
            coupon_Details.put("ZONE", loginResponse.getString("FMSZone"));
            coupon_Details.put("JOB_SOURCE", "S");
            coupon_Details.put("JOB_USER", "-1");
            coupon_Details.put("JOB_TYPE", "FMS_DKYC");
            coupon_Details.put("CIRCLE", loginResponse.getString("FMSCircle"));
            coupon_Details.put("REG_MOB_NO", loginResponse.getString("RegMobNum"));
            String serviceRes1 = new CRSClient().OnBoardServiceCall(OnboardURL, coupon_Details.toString());
            AppLogger.debug("Response of saveCAFData service in  saveSkippedDocs method for FMSDKYC:" + serviceRes1);
            JSONObject serviceRes = (JSONObject) JSONSerializer.toJSON(serviceRes1);
            if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                response.setSuccess(true);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            } else {
                response.setSuccess(false);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            }

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Exception Occered in saveSkippedDocs");
        }

        return "success";
    }
    
    public String llNumValidCheck() {
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject coupon_Details = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("couponValidCheck reqJson :" + coupon_Details);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("couponValidCheck method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL ="";
            if(coupon_Details.optString("PLAN_ID").equals("WTP9")){
             OnboardURL = onBoardURL.toString().trim() + "/bsnl/Wings/validateLLNoForWINGS";
            }else{
             OnboardURL = onBoardURL.toString().trim() + "/bsnl/Wings/validateTrailCoupon";
            }        
            
            AppLogger.debug("onBoardURL in  couponValidCheck method :" + OnboardURL);
            coupon_Details.put("ZONE", loginResponse.getString("FMSZone"));
            coupon_Details.put("JOB_SOURCE", "S");
            coupon_Details.put("JOB_USER", "-1");
            coupon_Details.put("JOB_TYPE", "FMS_DKYC");
            coupon_Details.put("CIRCLE", loginResponse.getString("FMSCircle"));
            coupon_Details.put("REG_MOB_NO", loginResponse.getString("RegMobNum"));
            AppLogger.debug("Response of  request in  llNumValidCheck method for FMSDKYC:" + coupon_Details);
            String serviceRes1 = new CRSClient().OnBoardServiceCall(OnboardURL, coupon_Details.toString());
            AppLogger.debug("Response of  service in  llNumValidCheck method for FMSDKYC:" + serviceRes1);
            JSONObject serviceRes = (JSONObject) JSONSerializer.toJSON(serviceRes1);
            if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                response.setSuccess(true);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            } else {
                response.setSuccess(false);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            }
        } catch (Exception e) {
                response.setSuccess(false);
                response.setMessage("Exception Occered in llNumValidCheck");
        }
        return "success";
    }
    
    public String mobNumValidCheck() {
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject trail_Details = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("mobNumValidCheck reqJson :" + trail_Details);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("mobNumValidCheck method loginResponse:" + loginResponse);
            String onBoardURL = CRSAppResources.ONBOARD_URL;
            String OnboardURL = onBoardURL.toString().trim() + "/bsnl/Wings/validateTrailGSMNo";
            AppLogger.debug("onBoardURL in  mobNumValidCheck method :" + OnboardURL);
            trail_Details.put("ZONE", loginResponse.getString("FMSZone"));
            trail_Details.put("JOB_SOURCE", "S");
            trail_Details.put("JOB_USER", "-1");
            trail_Details.put("JOB_TYPE", "FMS_DKYC");
            AppLogger.debug("Response of  request in  mobNumValidCheck method for FMSDKYC:" + trail_Details);
            String serviceRes1 = new CRSClient().OnBoardServiceCall(OnboardURL, trail_Details.toString());
            AppLogger.debug("Response of  service in  mobNumValidCheck method for FMSDKYC:" + serviceRes1);
//              String serviceRes1="{ \"STATUS\":\"0\", \"MESSAGE\":\"success\", \"OTP\":\"000000\" }";
            JSONObject serviceRes = (JSONObject) JSONSerializer.toJSON(serviceRes1);
            if (serviceRes.getString("STATUS").equalsIgnoreCase("0")) {
                response.setSuccess(true);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
                session.setAttribute("VALID_MOB_OTP", serviceRes.getInt("OTP"));
            } else {
                response.setSuccess(false);
                response.setMessage(serviceRes.getString("MESSAGE"));
                response.setResponseData(serviceRes);
            }
        } catch (Exception e) {
                response.setSuccess(false);
                response.setMessage("Exception Occered in mobNumValidCheck");
        }
        return "success";
    }
    
    public String otpValidForMOBPlan() {
        CRSPropertyReader configObj = new CRSPropertyReader();

        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("otpValidForMOBPlan reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("otpValidForMOBPlan method loginResponse:" + loginResponse);
            if ((session.getAttribute("VALID_MOB_OTP")).equals(reqJson.getInt("INPUT_OTP"))) {
                response.setSuccess(true);
                response.setMessage(configObj.getMessge("OTP_VALID_SUCCESS"));

            } else {
                response.setSuccess(false);
                response.setMessage(configObj.getMessge("OTP_INVALID_MOBILITY"));

            }

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(configObj.getMessge("UNABLE_OTP_VALID"));
        }
        return "success";
    }
    
    public String loadCircleList() {
        prInfo("[CRSWingsDkyc][loadCircleList][START]");
        int nStatus = -1;
        String errMsg = "";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        JSONObject getCircleListResp = new JSONObject();
        JSONArray CircleJsonArry = new JSONArray();
        CRSPropertyReader configObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String getCircleListQry = configObj.getQueryonId("FETCH_CIRCLE_LIST").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [loadCircleList] :: " + getCircleListQry);
            conn = CRSDBManager.getConnection();
            pstmt = conn.prepareStatement(getCircleListQry);
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                JSONObject ssaJson = new JSONObject();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    ssaJson.put(colName, colValue);
                }
                CircleJsonArry.add(ssaJson);
            }
            if (!CircleJsonArry.isEmpty()) {
                nStatus = 0;
                response.setSuccess(true);
                response.setMessage(configObj.getMessge("GET_CIRCLE_LIST_SUCC"));
                response.setResponseData(CircleJsonArry);
                errMsg = configObj.getMessge("GET_CIRCLE_LIST_SUCC"); // TODO
            } else {
                nStatus = 1;
                response.setSuccess(false);
                response.setMessage(configObj.getMessge("GET_CIRCLE_LIST_NOT_FOUND"));
                response.setResponseData(CircleJsonArry);
                errMsg = configObj.getMessge("GET_CIRCLE_LIST_NOT_FOUND");  // TODO
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(configObj.getMessge("GET_CIRCLE_LIST_ERROR"));
            response.setResponseData(CircleJsonArry);
            errMsg = configObj.getMessge("GET_CIRCLE_LIST_ERROR");  // TODO
            prInfo("Connection [loadCircleList] :: " + conn);
            prInfo("Error in [CRSWingsDkyc][loadCircleList] reqJson :: " + e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(conn);
            getCircleListResp.put("STATUS", nStatus + "");
            getCircleListResp.put("MESSAGE", errMsg);
            getCircleListResp.put("CIRCLE_LIST", CircleJsonArry);
            getCircleListResp.put("CIRCLE_LIST_COUNT", CircleJsonArry.size());
        }
        prInfo("[CRSWingsDkyc][loadCircleList][END]");
        return "success";
    }
    
    public String fetchPlanAmt() {
        prInfo("[CRSWingsDkyc][fetchPlanAmt][START]");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        JSONArray planAmtArry = new JSONArray();
        JSONObject planAmtobj = new JSONObject();
        JSONObject result = new JSONObject();
        CRSPropertyReader configObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String fetchPlanAmtQry = configObj.getQueryonId("FETCH_PLAN_AMT").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [fetchPlanAmt] :: " + fetchPlanAmtQry);
            conn = CRSDBManager.getConnection();
            pstmt = conn.prepareStatement(fetchPlanAmtQry);
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                JSONObject ssaJson = new JSONObject();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    ssaJson.put(colName, colValue);
                }
                planAmtArry.add(ssaJson);
            }
            result.put("WINGS_PLANS", planAmtArry);
            
            if (!planAmtArry.isEmpty()) {
                for (int i = 0; i <= planAmtArry.size() - 1; i++) {
                    JSONObject jsontemp = planAmtArry.getJSONObject(i);
                    planAmtobj.put(jsontemp.getString("PLAN_ID"), jsontemp.getInt("AMOUNT"));
                }
                result.put("PLAN_AMOUNT", planAmtobj);
                response.setSuccess(true);
                response.setMessage(configObj.getMessge("GET_CIRCLE_LIST_SUCC"));
                response.setResponseData(result);
            } else {
                response.setSuccess(false);
                response.setMessage(configObj.getMessge("GET_PLANS_LIST_NOT_FOUND"));
                response.setResponseData(result);
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(configObj.getMessge("GET_PLANS_LIST_ERROR"));
            response.setResponseData(planAmtArry);
            prInfo("Error in [CRSWingsDkyc][loadCircleList] reqJson :: " + e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(conn);
        }
        prInfo("[CRSWingsDkyc][loadCircleList][END]");
        return "success";
    }
    
    public String takePaymentForTrial() {
        prInfo("[CRSWingsDkyc][takePaymentForTrial][START]");
        int nStatus = -1;
        String retVal = "";
        JSONObject result = new JSONObject();
        JSONObject initiatePaymentReq = new JSONObject();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[CRSWingsDkyc][takePaymentForTrial] strReqData : " + strReqData);
            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[CRSWingsDkyc][takePaymentForTrial] reqJson :" + reqJson);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            AppLogger.debug("LoginResponse [takePaymentForTrial]: " + loginResponse);
            if(loginResponse != null){
                initiatePaymentReq.put("STATE", loginResponse.getString("State"));
            }else{
                initiatePaymentReq.put("STATE", reqJson.getString("CIRCLE_CODE"));
            }
            initiatePaymentReq.put("AMOUNT", reqJson.getInt("PAY_REQ_AMOUNT"));
            initiatePaymentReq.put("WINGS_SCHEME_ID", reqJson.getString("WINGS_SCHEME_ID"));
            initiatePaymentReq.put("WINGS_SCHEME_NAME", reqJson.getString("WINGS_SCHEME_NAME"));
            initiatePaymentReq.put("SESSION_ID", sessionID);
            initiatePaymentReq.put("CAF_NO", reqJson.getString("WL_CAF_NO"));
            initiatePaymentReq.put("CONTACT_NO", reqJson.getString("CUST_MOBILE_NO"));
            initiatePaymentReq.put("OB_CAF_NO", reqJson.getString("CAF_NO"));
            initiatePaymentReq.put("RETURN_URL", CRSAppResources.TRIAL_RETURN_URL);
            prInfo("Payment req [takePaymentForTrial]  : " + initiatePaymentReq);
            PaymentGateway objPaymentGateway = new PaymentGateway();
            JSONObject initiatePaymentStatus = objPaymentGateway.initiatePayment(initiatePaymentReq);
            prInfo("initiatePaymentStatus [takePaymentForTrial]  : " + initiatePaymentStatus);
            if (0 == initiatePaymentStatus.getInt("STATUS")) {
                result.put("PYMT", "S");
                result.put("PYMT_URL", CRSAppResources.PYMT_URL + "?sessionId=" + sessionID);
                prInfo("tempJson [takePaymentForTrial] : " + result);
                StringBuilder info2Data = null;
                info2Data = new StringBuilder();
                info2Data = info2Data.append("WINGS_TARIFF_PLAN_ID:").append(reqJson.getString("WINGS_TARIFF_PLAN_ID")).append(",");
                info2Data = info2Data.append("WINGS_TARIFF_PLAN_VALUE:").append(reqJson.getString("WINGS_TARIFF_PLAN_VALUE")).append(",");
                info2Data = info2Data.append("TARIFF_ID_NAME:").append(reqJson.getString("TARIFF_ID_NAME")).append(",");
                info2Data = info2Data.append("TARIFF_ID_VALUE:").append(reqJson.getString("TARIFF_ID_VALUE")).append(",");
                info2Data = info2Data.append("SCHEME_ID:").append(reqJson.getString("WINGS_SCHEME_ID")).append(",");
                info2Data = info2Data.append("SCHEME_NAME:").append(reqJson.getString("WINGS_SCHEME_NAME")).append(",");
                info2Data = info2Data.append("SESSION_ID:").append(sessionID).append(",");
                info2Data = info2Data.append("WINGS_ISD:").append(reqJson.getBoolean("ISD_ENABLE") ? 1 : 0).append(",");
                info2Data = info2Data.append("WINGS_IR:").append(reqJson.getBoolean("IR_ENABLE") ? 1 : 0).append(",");
                info2Data = info2Data.append("CAF_NO:").append(reqJson.getString("CAF_NO"));
                prInfo("info2Data [takePaymentForTrial] :: " + info2Data);
                initiatePaymentReq.put("WINGS_ISD", reqJson.getBoolean("ISD_ENABLE"));
                initiatePaymentReq.put("WINGS_IR", reqJson.getBoolean("IR_ENABLE"));
                initiatePaymentReq.put("Info2", info2Data);
                if(insertWingsTrialPrePaymentJob(initiatePaymentReq, info2Data.toString())){
                response.setSuccess(true);
                response.setMessage("Success");
                response.setResponseData(result);
                }else{
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                response.setResponseData(result);
                prInfo("[CRSWingsDkyc][takePaymentForTrial][Fail to insert into trail partial jobs]");
                }
            } else {
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("INITIATE_PYMT_FAIL"));
                response.setResponseData(result);
            }
            initiatePaymentStatus.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
            initiatePaymentStatus.put("CAF_NO", reqJson.getString("WL_CAF_NO"));
            initiatePaymentStatus.put("REQ_TYPE", "N");
            initiatePaymentStatus.put("TARIFF_PLAN_ID", reqJson.getString("PLAN_ID"));
            if (!objPaymentGateway.auditPaymentTxn(initiatePaymentStatus)) {
                result.put("PYMT", "F");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
                response.setResponseData(result);
            }
            if(initiatePaymentReq.getBoolean("WINGS_ISD")){
            objPaymentGateway.auditPaymentTxnforISDIR(initiatePaymentStatus);
            }
            if(!reqJson.getString("WINGS_SCHEME_ID").equals("WS0")){
            objPaymentGateway.auditSchemePaymentTxn(initiatePaymentStatus);
            }
        } catch (Exception e) {
            prInfo("Error in [CRSWingsDkyc][takePaymentForTrial]  :: " + e);
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("INITIATE_PYMT_ERROR"));
        } finally {
            prInfo("[CRSWingsDkyc][takePaymentForTrial][END]" +retVal);
            
        }        
        return "success";
    }

    public boolean insertWingsTrialPrePaymentJob(JSONObject inputdata, String info2Data) throws  Exception {
        prInfo("[CRSFmsJobUpload][insertWingsPrePaymentJob][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        boolean status = false;
        try {
            con = CRSDBManager.getConnection();
            prDebug("Con in [insertWingsPrePaymentJob]  :: " + con);
            String insertWingsPrePaymentJobQry = new CRSPropertyReader().getQueryonId("INSERT_TRIAL_PARTIAL_JOB").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query to fetch CAF No :  " + insertWingsPrePaymentJobQry);
            pstmt = con.prepareStatement(insertWingsPrePaymentJobQry);
            pstmt.setString(1, inputdata.getString("SESSION_ID"));
            pstmt.setString(2, inputdata.toString());
            pstmt.setString(3, inputdata.optString("Info1"));
            pstmt.setString(4, info2Data);
            pstmt.setString(5, inputdata.optBoolean("WINGS_ISD") ? "1" : "0");
            pstmt.setString(6, inputdata.optBoolean("WINGS_IR") ? "1" : "0");
            int insertWingsPrePaymentJobCount = pstmt.executeUpdate();
            prInfo("count [insertWingsPrePaymentJob] :" + insertWingsPrePaymentJobCount);
            if (insertWingsPrePaymentJobCount == 1) {
                status = true;
            }
    } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }       
        prInfo("[CRSFmsJobUpload][insertWingsPrePaymentJob][END]" +status);
        return status;
    }

    public String bsnlEmpHRMSUrl() {

        prInfo("[FMS_ekyc][bsnlEmpHRMSUrl] START");
        String retVal = "InvalidRequest";
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject empDataJson = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        JSONObject reqJson = new JSONObject();
        try {
            request = ServletActionContext.getRequest();
            response = new CRSResponse();
            session = request.getSession();
            String strQueryReqData = "";
            strQueryReqData = request.getQueryString();

            prDebug("input strReqData  in [bsnlEmpHRMSUrl] :: " + strQueryReqData);
            strQueryReqData = strQueryReqData.replaceAll("%20", " ");
            strQueryReqData = new CRSAuthenticate().Decrypt(strQueryReqData);
            prDebug("After decrypt strReqData  in [bsnlEmpHRMSUrl] :: " + strQueryReqData);
            if (strQueryReqData != null) {
                String[] queryParamKeyVal = strQueryReqData.split("&");
                for (String keyVal : queryParamKeyVal) {
                    String[] queryParamData = keyVal.split("=");
                    if (queryParamData.length == 2) {
                        reqJson.put(queryParamData[0], queryParamData[1]);
                    } else {
                        prInfo("invalid query param::" + keyVal);
                    }
                }
            }
            prDebug("input request  in [bsnlEmpHRMSUrl] :: " + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("FETCH_EMP_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for bsnlEmpHRMSUrl : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[bsnlEmpHRMSUrl][Con]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("hrmsno"));//1234
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            JSONObject empJson = new JSONObject();
            while (resultSet.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    empJson.put(colName, colValue);
                }
                jobsArr.add(empJson);

            }

            empDataJson.put("Data", jobsArr);
            prDebug("fetch emp details: " + empDataJson.toString());
            if (jobsArr.size() > 0) {
                prInfo("Emp Data loaded Successfully");
                prInfo("Emp json object" + empJson);
                if (empJson.getString("UTILIZE").equals("1")) {
                    retVal = "used";
                    request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_BSNL_EMP_DATA_HRMS_USED"));
                } else {
                    try {
                        FMS_ekyc fmsObj = new FMS_ekyc();
                        int otpNum = (int) generateRandom(6);
                        JSONObject messageJSON = new JSONObject();
                        messageJSON.put("msg", msgObj.getMessge("MOB_OTP_MSG").replace("@@OTP@@", String.valueOf(otpNum)));
                        messageJSON.put("subject", "OTP");
                        messageJSON.put("MOBILE_NO", empJson.getString("MOBILENO"));
                        messageJSON.put("TYPE", "S");
                        messageJSON.put("sub_date", "");
                        messageJSON.put("BSNL_URL", 1);
                        AppLogger.info("send notification req json1:: " + messageJSON);
//                        request.setAttribute("OTP", 000000);
                        request.setAttribute("OTP", otpNum);
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
                        String date = sdf.format(new java.util.Date());
                        String wingsOTPAckRandom = Integer.toString((int) (10000000.0 * Math.random()));
                        AppLogger.info("random number for otp ack :: " + wingsOTPAckRandom);
                        String ack = date + wingsOTPAckRandom;
                        AppLogger.info("Ack in wings otp :: " + ack);
                        JSONObject wingsOTPData = new JSONObject();
                        wingsOTPData.put("ZONE_CODE", empJson.getString("ZONE"));
                        wingsOTPData.put("CIRCLE", empJson.getString("CIRCLE"));
                        wingsOTPData.put("MOBILE_NO", empJson.getString("MOBILENO"));
                        wingsOTPData.put("OTP", otpNum);
                        JSONObject resultJson1 = new CRSNotificationManager().sendOTPFromBSNL(messageJSON);
                        AppLogger.info("Response from [sendNotification] first service :: " + resultJson1);
                        wingsOTPData.put("STATUS", resultJson1.getString("STATUS"));
                        wingsOTPData.put("ACKID", resultJson1.optString("ackId", ack));
                        wingsOTPData.put("COMMENTS", resultJson1.optJSONArray("errdesc"));
                        fmsObj.wingsOTPAudit(wingsOTPData);
                        messageJSON.put("BSNL_URL", 2);
                        wingsOTPAckRandom = Integer.toString((int) (10000000.0 * Math.random()));
                        ack = date + wingsOTPAckRandom;
                        AppLogger.info("send notification req json2 :: " + messageJSON);
                        JSONObject resultJson2 = new CRSNotificationManager().sendOTPFromBSNL(messageJSON);
                        AppLogger.info("response from [sendNotification] second service :: " + resultJson2);
                        wingsOTPData.put("STATUS", resultJson2.getString("STATUS"));
                        wingsOTPData.put("ACKID", resultJson2.optString("ackId", ack));
                        wingsOTPData.put("COMMENTS", resultJson2.optJSONArray("errdesc"));
                        fmsObj.wingsOTPAudit(wingsOTPData);
                        retVal = "success";
                        empDataJson.put("STATUS", "0");
                        request.setAttribute("BSNL_EMP_DATA", empDataJson);
                        request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_BSNL_EMP_DATA_SUCCESS"));

                        if ("PARTIAL".equalsIgnoreCase(resultJson1.getString("STATUS")) || "PARTIAL".equalsIgnoreCase(resultJson2.getString("STATUS"))) {
//                        if(true){
                            retVal = "success";
                            response.setSuccess(true);
                            response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_SUCCESS"));

                        } else {
                            retVal = "fail";
                            response.setSuccess(false);
                            response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_FAIL"));
                        }

                    } catch (Exception e) {
                        prErr("Exception in sendOTPRequest : :: ", e);
                        response.setSuccess(false);
                        response.setMessage(msgObj.getMessge("WINGS_OPT_SEND_ERROR"));
                        retVal = "fail";
                        return retVal;
                    }

                }

            } else {
                prInfo("Unable to load CustomerData");
                retVal = "empty";
                empDataJson.put("STATUS", "1");
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("FETCH_BSNL_EMP_DATA_FAIL"));
                response.setResponseData(empDataJson);
                request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_BSNL_EMP_DATA_FAIL"));
            }
        } catch (Exception ex) {
            prErr("Exception in  [FMS_ekyc][bsnlEmpHRMSUrl]:  ", ex);
            empDataJson.put("STATUS", "-1");
            retVal = "fail";
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("FETCH_BSNL_EMP_DATA_ERROR"));
            response.setResponseData(empDataJson);
            request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_BSNL_EMP_DATA_ERROR"));
            if (reqJson.isEmpty()) {
                request.setAttribute("MESSAGE", msgObj.getMessge("FETCH_BSNL_EMP_DATA_URL_ERROR"));
            }
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }
        prInfo("[FMS_ekyc][bsnlEmpHRMSUrl] END");
        return retVal;

    }
    
    
    public String proceedToOnbEmp() {
        prInfo("[CRSWingsDkyc][proceedToOnbEmp][START]");
        String retVal="fail";
        JSONObject result = new JSONObject();
        JSONObject initiatePaymentReq = new JSONObject();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[CRSWingsDkyc][proceedToOnbEmp] strReqData : " + strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[CRSWingsDkyc][proceedToOnbEmp] reqJson :" + reqJson);
            reqJson.put("zone",reqJson.getString("ZONE"));
            reqJson.put("circle", reqJson.getString("CIRCLE"));
            reqJson.put("state", reqJson.getString("CIRCLE"));
            reqJson.put("isSkipImgs", true);
            String status =new FMS_ekyc().loginValidationOTP(reqJson);
            request.setAttribute("BSNL_EMP_DATA", reqJson);
            prInfo("[CRSWingsDkyc][proceedToOnbEmp][END]");
            if(status.equals("SUCCESS")){
                retVal="success";
            } 
        } catch (Exception e) {
             prErr("Exception [CRSWingsDkyc][proceedToOnbEmp] ::", e);
        }

        return "success";
    }
    
    public String validateHRMS() {
        prInfo("[CRSWingsDkyc][validateHRMS][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        JSONObject empDataJson = new JSONObject();
        JSONArray jobsArr = new JSONArray();
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[CRSWingsDkyc][validateHRMS] strReqData : " + strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[CRSWingsDkyc][validateHRMS] reqJson :" + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("FETCH_EMP_DATA").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for validateHRMS : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[validateHRMS][Con]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("HRMS_NUM"));//1234
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            JSONObject empJson = new JSONObject();
            while (resultSet.next()) {
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    empJson.put(colName, colValue);
                }
                jobsArr.add(empJson);

            }

            empDataJson.put("Data", jobsArr);
            prDebug("fetch emp details: " + empDataJson.toString());
            if (jobsArr.size() > 0) {
                prInfo("Data loaded Successfully");
                prInfo("json object" + empJson);
                if (empJson.getString("UTILIZE").equals("1")) {
                     response.setSuccess(false);
                     response.setMessage(msgObj.getMessge("FETCH_BSNL_EMP_DATA_HRMS_USED"));
                    }else{
                    response.setSuccess(true);
                }
            }else{
            response.setSuccess(false);
            response.setMessage(msgObj.getMessge("HRMS_NUM_NOT_AVAIL"));
            }
        } catch (Exception e) {
             prErr("Exception [CRSWingsDkyc][proceedToOnbEmp] ::", e);
        }finally{
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }

        return "success";
    }
    
    public String checkRMNStatus() {
        prInfo("[CRSWingsDkyc][checkRMNStatus][START]");
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        Connection con = null;
        CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[CRSWingsDkyc][checkRMNStatus] strReqData : " + strReqData);
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[CRSWingsDkyc][checkRMNStatus] reqJson :" + reqJson);
            String fetchQry = new CRSPropertyReader().getQueryonId("GET_RMN_STATUS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query for checkRMNStatus : " + fetchQry);
            con = CRSDBManager.getConnection();
            prInfo("[checkRMNStatus][Con]::" + con);
            pstmt = con.prepareStatement(fetchQry);
            pstmt.setString(1, reqJson.getString("RegMobNum"));//1234
            resultSet = pstmt.executeQuery();
            if (resultSet.next() && resultSet.getInt(1) > 0) {
                response.setSuccess(false);
                response.setMessage(msgObj.getMessge("RMN_NUM_IS_REG"));
                prInfo("[CRSWingsDkyc][checkRMNStatus][Count]" + resultSet.getInt(1));
            } else {
                response.setSuccess(true);
                response.setMessage(msgObj.getMessge("RMN_NUM_IS_NOT_REG"));
                prInfo("[CRSWingsDkyc][checkRMNStatus][Count]" + resultSet.getInt(1));
            }
        } catch (Exception e) {
             prErr("Exception [CRSWingsDkyc][checkRMNStatus] ::", e);
        }finally{
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(con);
        }

        return "success";
    }
    
     public String disconnectTrial() {
        String retVal = "error";
         CRSPropertyReader msgObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqData = request.getParameter("reqData");
            prInfo("[CRSWingsDkyc][disconnectTrial] strReqData : " + strReqData);
            UUID uniqueKey = UUID.randomUUID();
            String sessionID = uniqueKey.toString();
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            prInfo("[CRSWingsDkyc][disconnectTrial] reqJson :" + reqJson);
            String CafNo = reqJson.getString("CAF_NO");
            JSONObject reqData=new JSONObject();
            reqData.put("CAFNO", CafNo);
            reqData.put("queryId", "DISCON_DKYC_CHECK");
            int count=new PaymentGateway().validateDisconnectionCAF(reqData);
            if(count == 0) {
            reqJson.put("sessionId", sessionID);
            reqJson.put("SESSION_ID", sessionID);
            reqJson.put("CAF_NO", reqJson.getString("WL_CAF_NO"));
            reqJson.put("BNK_TXN_ID", "N/A");
            reqJson.put("AMOUNT", -1);
            reqJson.put("TARIFF_PLAN_AMOUNT", 0);
            reqJson.put("ServiceName", "Wings");
            reqJson.put("SERVICE_NUMBER", reqJson.getString("SEL_MOB_NO"));
            reqJson.put("PORTAL_TXN_ID", "N/A");
            String txn_id = "IN10S_" + new SimpleDateFormat("ddMMyyyyhhmmsss").format(new Date()) + "_" + (reqJson.getString("CAF_NO").substring(3));
            reqJson.put("VENDOR_TXN_ID", txn_id);
            reqJson.put("TXN_STATUS", "SUCCESS");
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh.mm.ss aa");
            String formattedDate = dateFormat.format(new Date());
            reqJson.put("TIME_STAMP", formattedDate);
            reqJson.put("PAYMENT_TIME", formattedDate);
            reqJson.put("Info1", reqJson.getString("CUST_MOBILE_NO"));
            reqJson.put("TARIFF_PLAN_ID", reqJson.getString("WINGS_TARIFF_PLAN_ID"));
            reqJson.put("CUST_NAME", reqJson.getString("UID_FIRST_NAME"));
            prInfo("reqJson [CRSWingsDkyc][disconnectTrial]  :" + reqJson);
            StringBuilder info2Data = null;
            info2Data = new StringBuilder();
            info2Data = info2Data.append("WINGS_TARIFF_PLAN_ID:").append(reqJson.getString("WINGS_TARIFF_PLAN_ID")).append(",");
            info2Data = info2Data.append("WINGS_TARIFF_PLAN_VALUE:").append(reqJson.getString("WINGS_TARIFF_PLAN_VALUE")).append(",");
            info2Data = info2Data.append("TARIFF_ID_NAME:").append(reqJson.getString("TARIFF_ID_NAME")).append(",");
            info2Data = info2Data.append("TARIFF_ID_VALUE:").append(reqJson.getString("TARIFF_ID_VALUE")).append(",");
            info2Data = info2Data.append("SESSION_ID:").append(sessionID).append(",");
            info2Data = info2Data.append("WINGS_ISD:").append(reqJson.getBoolean("ISD_ENABLE") ? 1 : 0).append(",");
            info2Data = info2Data.append("WINGS_IR:").append(reqJson.getBoolean("IR_ENABLE") ? 1 : 0).append(",");
            info2Data = info2Data.append("CAF_NO:").append(CafNo);
            prInfo("info2Data [disconnectTrial] :: " + info2Data);
            reqJson.put("Info2", info2Data);
            prInfo("[CRSWingsDkyc][disconnectTrial] Trial partial jobs insert  :" + insertWingsTrialPrePaymentJob(reqJson, info2Data.toString()));
            prInfo("[CRSWingsDkyc][disconnectTrial] Audit status :" + new PaymentGateway().auditPaymentTxn(reqJson));
            reqJson.put("CAF_NO", CafNo);
            prInfo("[CRSWingsDkyc][disconnectTrial] FMS DATA UPDATE status :" + new PaymentGateway().updateFMSTrialData(reqJson));
            reqJson.put("AMOUNT", 0);
            reqJson.put("TXN_STATUS", "Disconnected");
            request.setAttribute("PAYMENT_TXN", reqJson);
            retVal = "success";
            }else if(count == 1){
            	request.setAttribute("MESSAGE", msgObj.getMessge("ALREADY_DISC_CAF"));
                retVal = "error";
            }else {
            	request.setAttribute("MESSAGE", msgObj.getMessge("EXCEP_DISC_TRIAL"));
                retVal = "error";
            }
        } catch (Exception e) {
            retVal = "error";
            request.setAttribute("MESSAGE",msgObj.getMessge("EXCEP_DISC_TRIAL"));
            prInfo("Error in [CRSWingsDkyc][disconnectTrial]  :: " + e);
        }

        return retVal;
    }
    
    public String loadWingsSchemes() {
        prInfo("[CRSWingsDkyc][loadWingsSchemes][START]");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet resultSet = null;
        JSONArray SchemeJsonArry = new JSONArray();
        JSONObject SchemeAmtobj = new JSONObject();
        JSONObject resSchobj = new JSONObject();
        CRSPropertyReader configObj = new CRSPropertyReader();
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String getWingsSchemesQry = configObj.getQueryonId("LOAD_WINGS_SCHEME_PLANS").replace("@@DBSCHEMA@@", CRSAppResources.DB_SCHEMA);
            prDebug("Query [loadWingsSchemes] :: " + getWingsSchemesQry);
            conn = CRSDBManager.getConnection();
            pstmt = conn.prepareStatement(getWingsSchemesQry);
            resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                JSONObject ssaJson = new JSONObject();
                for (int i = 1; i <= metaData.getColumnCount(); i++) {
                    String colName = metaData.getColumnName(i);
                    String colValue = resultSet.getString(colName);
                    colValue = colValue != null ? colValue.trim() : "";
                    ssaJson.put(colName, colValue);
                }
                SchemeJsonArry.add(ssaJson);
            }
            
            if (!SchemeJsonArry.isEmpty()) {
                for (int i = 0; i <= SchemeJsonArry.size() - 1; i++) {
                    JSONObject jsontemp = SchemeJsonArry.getJSONObject(i);
                    SchemeAmtobj.put(jsontemp.getString("SCHEME_ID"), jsontemp.getInt("SCHEME_AMT"));
                }
                resSchobj.put("SCHEME_AMT", SchemeAmtobj);
                resSchobj.put("SCHEME_DD", SchemeJsonArry);
                response.setSuccess(true);
                response.setMessage(configObj.getMessge("GET_WINGS_SCHEME_SUCC"));
                response.setResponseData(resSchobj);
            } else {
                response.setSuccess(false);
                response.setMessage(configObj.getMessge("GET_WINGS_SCHEME_NOT_FOUND"));
                response.setResponseData(resSchobj);
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(configObj.getMessge("GET_WINGS_SCHEME_ERROR"));
            response.setResponseData(resSchobj);
            prInfo("Error in [CRSWingsDkyc][loadWingsSchemes] :: " + e);
        } finally {
            CRSDBManager.closeRS(resultSet);
            CRSDBManager.closePS(pstmt);
            CRSDBManager.closeCon(conn);
        }
        prInfo("[CRSWingsDkyc][loadWingsSchemes][END]");
        return "success";
    }


}
