/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmspdf;

import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.io.FileUtils;

import org.apache.struts2.ServletActionContext;

/**
 *
 * @author Praveen.K
 */
public class CRSFmsPdf {

    HttpSession session = null;
    HttpServletRequest request = null;
    CRSResponse response;

    InputStream fileInputStream;
    String fileName;

    private String message;

    public String getMessage() {
        return message;
    }

    public InputStream getFileInputStream() {
        return fileInputStream;
    }

    public String getFileName() {
        return fileName;
    }

    public void setResponse(CRSResponse response) {
        this.response = response;
    }

    public CRSResponse getResponse() {
        return response;
    }

    public String createfmsPdf() {
        prInfo("[CRSFmsPdf][createfmsPdf] START");
        String retValue = "success";
        JSONObject jSONObject = new JSONObject();
        String file = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");

            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            JSONObject loginResponse = (JSONObject) session.getAttribute("loginResponse");
            response = new CRSResponse();
            String SessionFilePath = (String) session.getAttribute("SessionFilePath");

//            String flow_Type = "EKYC";
            String flow_Type = (String) session.getAttribute("KYCType");
//            System.out.println("KYCType:::" + flow_Type);
//            String strBrowserId = reqJson.getString("reqSessionId");
//            String sessionAndBId[] = strBrowserId.split("@#@");
//            String browserId = sessionAndBId[1];
//            response.setBrowserId(browserId);
            if (flow_Type.equalsIgnoreCase("FMSEKYC")) {
                jSONObject = new CRSFmsAcknowledgement().createFmsPdf(SessionFilePath, "FMS_KYC_Cust_Data", reqJson);
            } else if (flow_Type.equalsIgnoreCase("FMSKYC")) {
                jSONObject = new CRSFmsAcknowledgement().createFmsPdf(SessionFilePath, "FMS_KYC_Cust_Data", reqJson);
            }

            String status = jSONObject.getString("status");
            if (status.equalsIgnoreCase("success")) {
                prInfo("createfmsPdf file status is " + status);
                file = jSONObject.getString("file");
                fileInputStream = new FileInputStream(jSONObject.getString("file"));
                fileName = jSONObject.getString("filename");
                retValue = "download";
            } else {
                message = jSONObject.getString("message");
                retValue = "failed";
            }

        } catch (Exception e) {
            prLog("Exception in [CRSFmsPdf][createfmsPdf] ", e);
            retValue = "failed";
            return retValue;
        }finally {
          if(new File(file).exists())
                    new File(file).delete();
        }
        prInfo("[CRSFmsPdf][createfmsPdf] END");
        return retValue;
    }
    
   public String createfmsDownloadPdf() {
        
        prInfo("[CRSFmsPdf][createfmsDownloadPdf] START");
        String retValue = "success";
        JSONObject jSONObject = new JSONObject();
        String file = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");
            String flow_Type = "FMSEKYC";//(String) session.getAttribute("KYCType");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            reqJson.put("flow_Type", flow_Type);
            System.out.println("reqJson[createfmsDownloadPdf]:::: "+reqJson.toString());
            response = new CRSResponse();
            String SessionFilePath = CRSAppResources.PDF_CREATION_PATH;//(String) session.getAttribute("SessionFilePath");
            System.out.println("PDF_CREATION_PATH::"+SessionFilePath);
//            jSONObject = new CRSFmsAcknowledgement().createFmsPdf(SessionFilePath, "FMS_KYC_Cust_Data", reqJson);
            jSONObject = new CRSFmsAcknowledgement().createFmsDownloadPdf(SessionFilePath,  reqJson);

            String status = jSONObject.getString("status");
            if (status.equalsIgnoreCase("success")) {
                prInfo("createfmsDownloadPdf file status is " + status);
                file = jSONObject.getString("file");
                fileInputStream = new FileInputStream(jSONObject.getString("file"));
                fileName = jSONObject.getString("filename");
                session.setAttribute("PDFFilePath", file);
                response.setSuccess(true);
                retValue = "download";
            } else {
                message = jSONObject.getString("message");
                retValue = "failed";
            }

        } catch (Exception e) {
            prLog("Exception in [CRSFmsPdf][createfmsDownloadPdf] ", e);
            retValue = "failed";
            return retValue;
       } 
//        finally {
//           try {
//               prInfo("Exception in [CRSFmsPdf][finaly block] ");
//               fileInputStream.close();
//               if (new File(file).exists()) {
//                   FileUtils.forceDelete(new File(file));
//               }
//           } catch (Exception e) {
//               e.printStackTrace();
//           }
//       }
       prInfo("[CRSFmsPdf][createfmsDownloadPdf] END");
        return retValue;
    }

   
    public String createfmsPrintPdf() {
        prInfo("[CRSFmsPdf][createfmsPrintPdf] START");
        String retValue = "success";
        String pdfFilePath = "";
        String file = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            response = new CRSResponse();
            String strReqJson = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqJson);
            reqJson.put("flow_Type", "FMSEKYC");
            prDebug("Request data in createfmsPrintPdf method  is :: " + reqJson);
            String sessionpath = CRSAppResources.PDF_CREATION_PATH;
            String filename = reqJson.getString("CAF_NO") + ".pdf";
            file = sessionpath + File.separator + filename;
            HashMap map = new CRSFmsAcknowledgement().preparePdfMap(reqJson);
            pdfFilePath = new CRSFmsAcknowledgement().uploadJobPDFPrint(map, file);
            if (pdfFilePath.equalsIgnoreCase("")) {
            } else {
                prInfo("PDF file generated " + pdfFilePath);
                session.setAttribute("PDFFilePath", pdfFilePath);
            }
            response.setSuccess(true);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("unable to generate reciept");
            message = "unable to generate reciept";
            prLog("Exception in [CRSFmsPdf][createfmsPrintPdf] :: ", e);
        } 
        prInfo("[CRSFmsPdf][createfmsPrintPdf] END");
        return retValue;
    }
   

    public String dateFormatPrint(String date) {
         prInfo("[CRSFmsPdf][dateFormatPrint] START");
        String temp = "";
        try {
            prDebug("Converted date is :: " + date);
            String str[] = date.split("-");
            prDebug("[dateFormatPrint] :: " +str[2] + "/" + str[1] + "/" + str[0]);
            temp = str[2] + "/" + str[1] + "/" + str[0];
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsPdf][dateFormatPrint] ::  ", e);
            return date;
        }
       prInfo("[CRSFmsPdf][dateFormatPrint] END");
        return temp;
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
