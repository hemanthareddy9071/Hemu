/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmspdf;

import com.in10s.commons.CRSAuthenticate;
import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.dkyc.landline.CRSDKYCLLPdf;
import com.in10s.logger.AppLogger;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**
 *
 * @author Administrator
 */
public class CRSFmsPdfDownload extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        File downloadFile = null;
        OutputStream outStream = null;
        FileInputStream inStream = null;
        try {
            String reqString = request.getParameter("data");
            prInfo("reqString[processRequest][createfmsDownloadPdf]:::: " + reqString);
            if (reqString != null && reqString != "") {
                CRSAuthenticate encyptDecriptString = new CRSAuthenticate();
                String decString = encyptDecriptString.Decrypt(reqString);
                JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(decString);
                prInfo("reqJson[createfmsDownloadPdf]:::: " + reqJson.toString());
                String SessionFilePath = CRSAppResources.PDF_CREATION_PATH;
                prInfo("PDF_CREATION_PATH::" + SessionFilePath);
                JSONObject jSONObject = new CRSDKYCLLPdf().createDKYCLLDownloadPdf(request, reqJson);
                prInfo("reqJson[createfmsDownloadPdf]:::: " + jSONObject.toString());
                String status = jSONObject.getString("status");
                if (status.equalsIgnoreCase("success")) {
                    String file = jSONObject.getString("file");
                    prInfo("createfmsDownloadPdf file  " + file);
                    String filePath = file;
                    // reads input file from an absolute path
                    downloadFile = new File(filePath);
                    inStream = new FileInputStream(downloadFile);
                    // if you want to use a relative path to context root:
                    //String relativePath = getServletContext().getRealPath("");
                    //prInfo("relativePath = " + relativePath);
                    // obtains ServletContext
                    ServletContext context = getServletContext();
                    // gets MIME type of the file
                    String mimeType = context.getMimeType(filePath);
                    if (mimeType == null) {
                        // set to binary type if MIME mapping not found
                        mimeType = "application/octet-stream";
                    }
                    prInfo("MIME type: " + mimeType);
                    // modifies response
                    response.setContentType(mimeType);
                    response.setContentLength((int) downloadFile.length());
                    // forces download
                    String headerKey = "Content-Disposition";
                    String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
                    response.setHeader(headerKey, headerValue);
                    // obtains response's output stream
                    outStream = response.getOutputStream();
                    byte[] buffer = new byte[4096];
                    int bytesRead = -1;
                    while ((bytesRead = inStream.read(buffer)) != -1) {
                        outStream.write(buffer, 0, bytesRead);
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inStream != null) {
                inStream.close();
            }
            if (outStream != null) {
                outStream.close();
            }
            if (downloadFile != null) {
                downloadFile.delete();
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

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
