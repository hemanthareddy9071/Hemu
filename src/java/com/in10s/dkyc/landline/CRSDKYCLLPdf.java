/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.dkyc.landline;

import com.in10s.commons.CRSResponse;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.html.WebColors;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfGState;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author durgaprasad.p
 */
public class CRSDKYCLLPdf {
 String strFontFile="";
    public String createDKYCLLPdf() {
        prInfo("[CRSDKYCLLPdf][createDKYCLLPdf][START]");
        String retValue = "success";
        JSONObject respJson = new JSONObject();
        String file = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            String strReqData = request.getParameter("reqData");
            JSONObject reqJson = (JSONObject) JSONSerializer.toJSON(strReqData);
            String flow_Type = "FMS_DKYC";
            reqJson.put("flow_Type", flow_Type);
            prInfo("reqJson [createDKYCLLPdf]:: " + reqJson.toString());
            response = new CRSResponse();
//            respJson = createDKYCLLDownloadPdf(reqJson);
            String status = respJson.getString("status");           
            if (status.equalsIgnoreCase("success")) {
                file = respJson.getString("file");
                fileInputStream = new FileInputStream(respJson.getString("file"));
                fileName = respJson.getString("filename");
                session.setAttribute("PDFFilePath", file);
                response.setSuccess(true);
                retValue = "success";
            } else {
                message = respJson.getString("message");
            }
        } catch (Exception e) {
            prLog("Exception in [CRSDKYCLLPdf][createDKYCLLPdf] ", e);
            return retValue;
        }
        prInfo("[CRSDKYCLLPdf][createDKYCLLPdf] [END]");
        return retValue;
    }

    public HashMap preparePdfMap(JSONObject reqJson) {
        prInfo("[CRSDKYCLLPdf][preparePdfMap] [START]");
        HashMap map = new HashMap();
        try {            
            reqJson.put("DATE_TIME", reqJson.getJSONObject("CAF_DETAILS").getString("DATE_TIME"));
            reqJson.put("CAF_NO", reqJson.getJSONObject("CAF_DETAILS").getString("CAF_NO"));
            reqJson.put("RECEIPTNO", reqJson.getJSONObject("CAF_DETAILS").getString("RECEIPTNO"));
            String full_name = reqJson.getString("first_name") + " " + reqJson.getString("cust_last_name");
            reqJson.put("full_name", full_name);
            String address = reqJson.getString("bill_addr_house_no") + "," + reqJson.getString("bill_addr_vill") + ","+reqJson.getString("bill_addr_add_dtls") + ","+ reqJson.getString("bill_addr_city") + ","+reqJson.getString("bill_addr_state_ecaf")+","+reqJson.getString("bill_addr_district_ecaf")+","+reqJson.getString("bill_main_locality_ecaf")+reqJson.getString("bill_exchange_code_ecaf")+"-" +reqJson.getString("BILL_ADDR_PINCODE");
            reqJson.put("address", address);
            String plan_dtls=reqJson.getString("PLAN_NAME") + "-" + reqJson.getString("PLAN_AMOUNT");
            reqJson.put("PLAN_DETAILS", plan_dtls);
            String[] keyNames = {"date_of_application:DATE_TIME", "receipt_no:RECEIPTNO", "Connection_applied:service_type", "caf_no:CAF_NO", "name:full_name", "type_of_poi:poi_type_ecaf", "poi_issuing_authority:poi_issuing_auth_ecaf", "poi_date_of_issue:poi_issue_date", "poi_serial_number:poi_number", "type_of_poa:poa_type_ecaf", "poa_issuing_authority:poa_issuing_auth_ecaf", "poa_date_of_issue:poa_issue_date", "poa_serial_number:poa_number", "address:address", "Service_Type:service_type","email:email", "cust_mobile_no:cust_mobile_no", "PLAN_DETAILS:PLAN_DETAILS", "sel_mob_no:sel_mob_no"};
            for (int i = 0; i < keyNames.length; i++) {
                String[] keyName = keyNames[i].split(":");
                String key = keyName[0];
                String value = reqJson.optString(keyName[1]);
                map.put(key, value);
            }           
            prInfo("[CRSDKYCLLPdf][preparePdfMap] MAP: " + map);
        } catch (Exception e) {
            prLog("Exception in  [CRSDKYCLLPdf][preparePdfMap] :: ", e);
        }
        prInfo("[CRSDKYCLLPdf][preparePdfMap] [END]");
        return map;
    }

    
    public JSONObject createDKYCLLDownloadPdf(HttpServletRequest request,JSONObject reqJson ) {
        prInfo("[CRSDKYCLLPdf][createDKYCLLDownloadPdf] START");
        JSONObject respJson = new JSONObject();
        PdfWriter writer = null;
        try {
            HashMap map = new HashMap();
            map = preparePdfMap(reqJson);
            String filename = map.get("caf_no") + ".pdf";
            String sessionPath = CRSAppResources.PDF_CREATION_PATH;
            String file = sessionPath + File.separator + filename;
            Document document = new Document(PageSize.A4);
            writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            HttpSession session = request.getSession(false);
            String path = session.getServletContext().getRealPath("/");
           // String path = ServletActionContext.getServletContext().getRealPath("/");
            strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";
            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
            Font boldFont = new Font(baseFont, 10, Font.BOLD);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));
            document.open();
            prInfo("Document Object [open]");

            PdfPTable table = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell pdfCellStart = new PdfPCell(new Phrase("  "));
            pdfCellStart.setPadding(0);
            pdfCellStart.setHorizontalAlignment(Element.ALIGN_CENTER);
            pdfCellStart.setBorder(PdfPCell.NO_BORDER);
            table.addCell(pdfCellStart);

            PdfPCell heading = new PdfPCell(new Phrase(new CRSAppResources().getMessge("RECPT_HDLINE"), boldFont));
            heading.setPadding(0);
            heading.setHorizontalAlignment(Element.ALIGN_CENTER);
            heading.setBorder(PdfPCell.NO_BORDER);
            table.addCell(heading);

            PdfPCell heading2 = new PdfPCell(new Phrase("  "));
            heading2.setHorizontalAlignment(Element.ALIGN_CENTER);
            heading2.setBorder(PdfPCell.NO_BORDER);
            table.addCell(heading2);

            document.add(table);
            prInfo("Header is added to Document Object");

            PdfPTable table1 = new PdfPTable(4);
            table1.setTotalWidth(500);
            table1.setLockedWidth(true);
            int[] columnWidths = {120, 150, 100, 150};
            table1.setWidths(columnWidths);
            prInfo("Try to add Cells to document");
            String[] keyNames = {"Date of Application : #date_of_application", "Receipt no : #receipt_no", "Connection applied : #Connection_applied", "CAF serial no : #caf_no"};
            for (int i = 0; i < keyNames.length; i++) {
                String[] keyName = keyNames[i].split("#");
                String key = keyName[0];
                String value = keyName[1];
                PdfPCell pdfCell = new PdfPCell(new Phrase(key, blackFont));
                pdfCell.setPadding(10);
                pdfCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                pdfCell.setBorder(PdfPCell.NO_BORDER);
                table1.addCell(pdfCell);

                PdfPCell pdfCell2 = new PdfPCell(new Phrase(new Paragraph(map.get(value) + "", blueFont)));
                pdfCell2.setPadding(10);
                pdfCell2.setHorizontalAlignment(Element.ALIGN_LEFT);
                pdfCell2.setBorder(PdfPCell.NO_BORDER);
                table1.addCell(pdfCell2);
            }
            PdfPCell pdfCellEnd = new PdfPCell(new Phrase(""));
            pdfCellEnd.setHorizontalAlignment(Element.ALIGN_LEFT);
            pdfCellEnd.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(pdfCellEnd);

            PdfPCell pdfCellEnd2 = new PdfPCell(new Phrase(""));
            pdfCellEnd2.setHorizontalAlignment(Element.ALIGN_LEFT);
            pdfCellEnd2.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(pdfCellEnd2);

            document.add(table1);
            prInfo("Cells Added to document");

            PdfPTable table2 = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cel11 = new PdfPCell(new Phrase("  "));
            cel11.setHorizontalAlignment(Element.ALIGN_CENTER);
            cel11.setBorder(PdfPCell.NO_BORDER);
            table2.addCell(cel11);
            document.add(table2);

            document.add(createFirstTable(map));
            prInfo("Table Added to document");

            PdfContentByte canvas = writer.getDirectContentUnder();
            Image image = Image.getInstance(path + File.separator + "images" + File.separator + "BSNL.png");
            image.setAbsolutePosition(186, 557);
            canvas.saveState();
            PdfGState state = new PdfGState();
            state.setFillOpacity(0.6f);
            canvas.setGState(state);
            canvas.addImage(image);
            canvas.restoreState();
            prInfo("BSNL Logo Added to document");

            document.close();
            writer.flush();

            prInfo("Document Object [close]");
            prDebug("Result PDF File [createDKYCLLDownloadPdf]  :: " + file);
            respJson.put("status", "success");
            respJson.put("file", file);
            respJson.put("filename", filename);
        } catch (Exception e) {
            respJson.put("status", "fail");
            respJson.put("message", "Unable to generate PDF File");
            prLog("Exception in  [CRSDKYCLLPdf][createDKYCLLDownloadPdf] :: ", e);
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                    writer = null;
                }
            } catch (Exception e) {
                prLog("Exception in [CRSDKYCLLPdf][createDKYCLLDownloadPdf] ", e);
            }
        }
         prInfo("Response [createDKYCLLDownloadPdf] :: " +respJson);
        prInfo("[CRSDKYCLLPdf][createDKYCLLDownloadPdf] END");
        return respJson;
    }

    public PdfPTable createFirstTable(Map map) {
        prInfo("[CRSDKYCLLPdf][createFirstTable] START");
        PdfPTable table = new PdfPTable(4);
        try {
            table.setTotalWidth(550);
            table.setLockedWidth(true);
            int[] columnWidths = {100, 150, 100, 175};
            table.setWidths(columnWidths);
            table.setSpacingAfter(10);
//            String path = ServletActionContext.getServletContext().getRealPath("/");
//            String strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";
            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, java.awt.Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            Font footer_green = new Font(baseFont, 10, Font.NORMAL);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));
            footer_green.setColor(WebColors.getRGBColor("#067404"));
            prInfo("Try to add table to document");
            String[] keyNames = {"Name#name", "Type of POI#type_of_poi", "Email ID#email", "Mobile Number#cust_mobile_no", "Issuing authority#poi_issuing_authority", "Date of issue#poi_date_of_issue", "Serial number#poi_serial_number", "Type of POA#type_of_poa", "Issuing authority#poa_issuing_authority", "Date of issue#poa_date_of_issue", "Serial number#poa_serial_number", "Address#address" ,"Plan Details#PLAN_DETAILS","Selected Number#sel_mob_no"};
            for (int i = 0; i < keyNames.length; i++) {
                String[] keyName = keyNames[i].split("#");
                String key = keyName[0];
                String value = keyName[1];
                PdfPCell pdfCell = new PdfPCell(new Paragraph(key, blackFont));
                pdfCell.setPadding(10);
                table.addCell(pdfCell);
                PdfPCell pdfCell2 = new PdfPCell(new Paragraph(map.get(value) + "", blueFont));
                pdfCell2.setPadding(10);
                table.addCell(pdfCell2);
            }
            table.addCell("");
            table.addCell("");
            prInfo("Added Table to document");
        } catch (Exception e) {
            prLog("Exception in [CRSDKYCLLPdf][createFirstTable] :: ", e);
        }
        prInfo("[CRSDKYCLLPdf][createFirstTable] END");
        return table;
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

}
