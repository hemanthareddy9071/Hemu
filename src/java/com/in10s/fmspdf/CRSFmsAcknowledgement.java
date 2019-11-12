/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.in10s.fmspdf;

import com.in10s.commons.WfPropertyManager;
import com.in10s.config.CRSAppResources;
import com.in10s.logger.AppLogger;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
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
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author ramesh.a
 */
public class CRSFmsAcknowledgement {

    static HttpSession session = null;
    static HttpServletRequest request = null;
    static List attributeList = null;

    public JSONObject createFmsPdf(String sessionPath, String Formdata, JSONObject reqJson) {
        prInfo("[CRSFmsAcknowledgement][createFmsPdf] START");
        JSONObject jSONObject = new JSONObject();
        PdfWriter writer = null;
         String file = "";
        try {
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            attributeList = Collections.list(session.getAttributeNames());
//            String KYCType = (String) session.getAttribute("KYCType");
//            String strEviseDrmData = (String) session.getAttribute(Formdata);
            JSONObject evisaData = reqJson;//(JSONObject) JSONSerializer.toJSON(strEviseDrmData);
            String filename = reqJson.getString("CAF_NO") + ".pdf";
            file = sessionPath + File.separator + filename;
            prDebug("PDF File Location in createFmsPdf is :: " + file);
            HashMap map = new HashMap();
            String flow_Type = reqJson.getString("flow_Type");
            map.put("flow_Type", flow_Type);
            try {
                map.put("date_of_application", reqJson.getString("DATE_ALLOTMENT"));
            } catch (Exception e) {
                prLog("Exception to set date_of_application ", e);
            }
//            try {
//                map.put("Receipt_no", reqJson.getString("Receipt_no"));
//
//            } catch (Exception ea) {
//                prLog("Exception set Receipt_no ", ea);
//            }
            try {
//                map.put("franchisee_name", reqJson.getString("franchisee_name"));

            } catch (Exception eb) {
                prLog("Exception  set franchisee_name ", eb);
            }
//            try {
////                map.put("franchisee_Address", reqJson.getString("re_franchise_addr"));
//
//            } catch (Exception ec) {
//                prLog("Exception  set FrachiseeAddress ", ec);
//            }
//            try {
////                map.put("POS_code", reqJson.getString("POS_code"));
//
//            } catch (Exception ed) {
//                map.put("POS_code", "");
//                prLog("Exception  set POS_code ", ed);
//            }

            try {
                map.put("CAFserialno", reqJson.getString("CAF_NO"));

            } catch (Exception ef) {
                map.put("CAFserialno", "");
                prLog("Exception  set CAFserialno ", ef);
            }
            try {
//                map.put("cust_name", evisaData.getString("first_name"));

//                if (evisaData.getString("gender").equalsIgnoreCase("2")) {
//                    map.put("gender", "Male");
//                } else if (evisaData.getString("gender").equalsIgnoreCase("1")) {
//                    map.put("gender", "Female");
//                } else if (evisaData.getString("gender").equalsIgnoreCase("3")) {
//                    map.put("gender", "Others");
//                }
//
//                map.put("dob", evisaData.getString("dob"));
//                map.put("age", evisaData.getString("age"));
//                if (flow_Type.equalsIgnoreCase("FMSEKYC")) {
                map.put("cust_name", evisaData.getString("CUST_NAME"));
//                } 

//                map.put("re_poi_type", evisaData.getString("poi_type_ecaf"));
//                map.put("re_poi_issuing_auth", evisaData.getString("poi_issuing_auth_ecaf"));
//                map.put("re_poi_issue_date", evisaData.getString("poi_issue_date"));
//                map.put("re_poi_number", evisaData.getString("poi_number"));
//                map.put("re_poa_type", evisaData.getString("poa_type_ecaf"));
//                map.put("re_poa_issuing_auth", evisaData.getString("poa_issuing_auth_ecaf"));
//                map.put("re_poa_issue_date", evisaData.getString("poa_issue_date"));
//                map.put("re_poa_number", evisaData.getString("poa_number"));
//                String res = "";
//                int count = 0;
//                if (!evisaData.getString("inst_addr_hno").equalsIgnoreCase("")) {
//                    if (count == 0) {
//                        res = res + evisaData.getString("inst_addr_hno");
//                        count++;
//                    } else {
//                        res = res + "," + evisaData.getString("inst_addr_hno");
//                        count++;
//                    }
//
//                }
//                if (!evisaData.getString("inst_addr_vill").equalsIgnoreCase("")) {
//                    if (count == 0) {
//                        res = res + evisaData.getString("inst_addr_vill");
//                        count++;
//                    } else {
//                        res = res + "," + evisaData.getString("inst_addr_vill");
//                        count++;
//                    }
//
//                }
//                if (!evisaData.getString("inst_addr_city").equalsIgnoreCase("")) {
//                    if (count == 0) {
//                        res = res + evisaData.getString("inst_addr_city");
//                        count++;
//                    } else {
//                        res = res + "," + evisaData.getString("inst_addr_city");
//                        count++;
//                    }
//
//                }
//                if (!evisaData.getString("inst_addr_district").equalsIgnoreCase("")) {
//                    if (count == 0) {
//                        res = res + evisaData.getString("inst_addr_district");
//                        count++;
//                    } else {
//                        res = res + "," + evisaData.getString("inst_addr_district");
//                        count++;
//                    }
//
//                }
//                if (!evisaData.getString("inst_addr_state").equalsIgnoreCase("")) {
//                    if (count == 0) {
//                        res = res + evisaData.getString("inst_addr_state");
//                        count++;
//                    } else {
//                        res = res + "," + evisaData.getString("inst_addr_state");
//                        count++;
//                    }
//
//                }
//
//                map.put("address2", res);
//                prDebug("service_Type::::" + evisaData.getString("service_type_cmb_ecaf"));
                map.put("service_Type", "WINGS");
            } catch (Exception ef) {
                prLog("Exception in  setting cust data for pdf generation", ef);
            }
//            prDebug("PDF input is:::::::::::::" + map);

            //Document document = new Document();
            Document document = new Document(PageSize.A4);
            // step 2
            writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            //writer.setPageEvent(new Watermark());

            // step 3
//            String strFontFile = strFontFilesession.getAttribute("workingFolderForHtml") + "\\fonts\\arial.ttf";
            String path = ServletActionContext.getServletContext().getRealPath("/");
            String strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";

            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);

            Font boldFont = new Font(baseFont, 10, Font.BOLD);
            Font redFont = new Font(baseFont, 10, Font.BOLD, Color.RED);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            //blueFont.setColor(73, 142, 255);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));

            document.open();
            prInfo("Document Object is opend ");
            // step 4
//            Image header = Image.getInstance(IOUtils.toByteArray(getClass().getResourceAsStream("/HTML/images/logo.png")));
////
//            header.scaleAbsolute(60f, 30f);
//            header.setAbsolutePosition(270f, 805f);
//            document.add(header);
            prInfo("BSNL Logo Added to document");
//            Paragraph paragraphTable1 = new Paragraph();
//            paragraphTable1.setSpacingAfter(5f);
//
//            Phrase p = new Phrase("                                                                        Receipt");
//            document.add(paragraphTable1);
//
//            document.add(p);
//
//            paragraphTable1.setSpacingAfter(15f);
//            document.add(paragraphTable1);
            PdfPTable table = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cell = new PdfPCell(new Phrase("  "));
            cell.setPadding(0);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell);

            PdfPCell cell1 = new PdfPCell(new Phrase("Receipt", boldFont));
            cell1.setPadding(0);
            cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell1.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell1);

            PdfPCell cell2 = new PdfPCell(new Phrase("  "));
//        cell2.setPadding(0);
            cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell2.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell2);

            document.add(table);

            PdfPTable table1 = new PdfPTable(4);
            table1.setTotalWidth(500);
            table1.setLockedWidth(true);
            int[] columnWidths = {120, 220, 100, 100};
            table1.setWidths(columnWidths);

//            table1.setWidthPercentage(100);
            PdfPCell cell3 = new PdfPCell(new Phrase("Date of Application : ", blackFont));
            cell3.setPadding(10);
            cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell3.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cell3);

            PdfPCell cell4 = new PdfPCell(new Phrase(new Paragraph(map.get("date_of_application") + "", blueFont)));
            cell4.setPadding(10);
            cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell4.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cell4);

            PdfPCell cell5 = new PdfPCell(new Phrase("Receipt no : ", blackFont));
            cell5.setPadding(10);
            cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell5.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cell5);

//            PdfPCell cell6 = new PdfPCell(new Phrase(new Paragraph(map.get("Receipt_no") + "", blueFont)));
//        cell6.setPadding(10);
//            cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cell6.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cell6);
            //            table1.setWidthPercentage(100);
            PdfPCell cellDAPP = new PdfPCell(new Phrase("CustName : ", blackFont));
            cellDAPP.setPadding(10);
            cellDAPP.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellDAPP.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cellDAPP);

            PdfPCell cellDAPP2 = new PdfPCell(new Phrase(new Paragraph(map.get("cust_name") + "", blueFont)));
            cellDAPP2.setPadding(10);
            cellDAPP2.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellDAPP2.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cellDAPP2);

//            //            table1.setWidthPercentage(100);
//            PdfPCell cellG = new PdfPCell(new Phrase("Gender : ", blackFont));
//        cellG.setPadding(10);
//            cellG.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cellG.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cellG);
//
//            PdfPCell cellG2 = new PdfPCell(new Phrase(new Paragraph(map.get("gender") + "", blueFont)));
//        cellG2.setPadding(10);
//            cellG2.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cellG2.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cellG2);
//
//            //            table1.setWidthPercentage(100);
//            PdfPCell celldob = new PdfPCell(new Phrase("Date of Birth : ", blackFont));
//        celldob.setPadding(10);
//            celldob.setHorizontalAlignment(Element.ALIGN_LEFT);
//            celldob.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(celldob);
//
//            PdfPCell celldob2 = new PdfPCell(new Phrase(new Paragraph(map.get("dob") + "", blueFont)));
//        celldob2.setPadding(10);
//            celldob2.setHorizontalAlignment(Element.ALIGN_LEFT);
//            celldob2.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(celldob2);
//
//            //            table1.setWidthPercentage(100);
//            PdfPCell cellage = new PdfPCell(new Phrase("Age : ", blackFont));
//        cellage.setPadding(10);
//            cellage.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cellage.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cellage);
//
//            PdfPCell cellage2 = new PdfPCell(new Phrase(new Paragraph(map.get("age") + "", blueFont)));
//        cellage2.setPadding(10);
//            cellage2.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cellage2.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cellage2);
            //            table1.setWidthPercentage(100);
            PdfPCell cellCAF = new PdfPCell(new Phrase("CAF serial no : ", blackFont));
            cellCAF.setPadding(10);
            cellCAF.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellCAF.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cellCAF);

            PdfPCell cellCAF2 = new PdfPCell(new Phrase(new Paragraph(map.get("CAFserialno") + "", blueFont)));
            cellCAF2.setPadding(10);
            cellCAF2.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellCAF2.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cellCAF2);

            PdfPCell cell54 = new PdfPCell(new Phrase(""));
//        cell5.setPadding(0);
            cell54.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell54.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cell54);

            PdfPCell cell64 = new PdfPCell(new Phrase(""));
//        cell6.setPadding(0);
            cell64.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell64.setBorder(PdfPCell.NO_BORDER);
            table1.addCell(cell64);

//            PdfPCell cell56 = new PdfPCell(new Phrase("CAF serial no   : ", blackFont));
////        cell5.setPadding(0);
//            cell56.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cell56.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cell56);
//
//            PdfPCell cell66 = new PdfPCell(new Phrase(new Paragraph(map.get("CAFserialno") + "", blueFont)));
////        cell6.setPadding(0);
//            cell66.setHorizontalAlignment(Element.ALIGN_LEFT);
//            cell66.setBorder(PdfPCell.NO_BORDER);
//            table1.addCell(cell66);
            document.add(table1);

            PdfPTable table3 = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cel11 = new PdfPCell(new Phrase("  "));
//        cel11.setPadding(0);
            cel11.setHorizontalAlignment(Element.ALIGN_CENTER);
            cel11.setBorder(PdfPCell.NO_BORDER);
            table3.addCell(cel11);
            document.add(table3);

            PdfContentByte canvas = writer.getDirectContentUnder();
            Image image = Image.getInstance(path + File.separator + "images" + File.separator + "BSNL.png");
//        image.scaleAbsolute(PageSize.A4.rotate());

            image.setAbsolutePosition(186, 557);
            canvas.saveState();
            PdfGState state = new PdfGState();
            state.setFillOpacity(0.6f);
            canvas.setGState(state);
            canvas.addImage(image);
            canvas.restoreState();
//            document.add(createFirstTable(map));
            prInfo("Tabel Added to document ");
            // step 5
            document.close();
            jSONObject.put("status", "success");
            jSONObject.put("file", file);
//            jSONObject.put("file", "C:/Users/ramesh.a/Downloads/8568568568.pdf");
            jSONObject.put("filename", filename);
//            jSONObject.put("filename", "8568568568.pdf");

            writer.flush();
        } catch (Exception e) {
            jSONObject.put("status", "fail");
            jSONObject.put("message", "unable to generate PDF File");
            prLog("Exception in  [CRSFmsAcknowledgement][createFmsPdf] :: ", e);

        } finally {
            try {
                if (writer != null) {
                    writer.close();
                    writer = null;
                }               

            } catch (Exception e) {
                prLog("Exception in finally block in CRSFmsAcknowledgement :", e);
            }
            
        }
        prInfo("[CRSFmsAcknowledgement][createFmsPdf] END");
        return jSONObject;

    }

    public PdfPTable createFirstTable(Map map) {
        prInfo("[CRSFmsAcknowledgement][createFirstTable] START");
        // a table with three columns
        PdfPTable table = new PdfPTable(4);
        try {
            table.setTotalWidth(550);
            table.setLockedWidth(true);
            int[] columnWidths = {100, 175, 100, 175};
            table.setWidths(columnWidths);
            String flowType = map.get("flow_Type") + "";
            prInfo("starting of createFirstTable in CRSFmsAcknowledgement");
            String path = ServletActionContext.getServletContext().getRealPath("/");
            String strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";
            request = ServletActionContext.getRequest();
            session = request.getSession(false);
            attributeList = Collections.list(session.getAttributeNames());

            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);

            Font boldFont = new Font(baseFont, 10, Font.BOLD);
            Font thinFont = new Font(baseFont, 10, Font.NORMAL);
//             Font redFont = new Font(baseFont, 10, Font.BOLD, BaseColor.RED);
            Font redFont = new Font(baseFont, 10, Font.BOLD, java.awt.Color.RED);
//            Font blackFont = new Font(baseFont, 10, Font.NORMAL, BaseColor.BLACK);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, java.awt.Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            Font footer_green = new Font(baseFont, 10, Font.NORMAL);

            //blueFont.setColor(73, 142, 255);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));
            footer_green.setColor(WebColors.getRGBColor("#067404"));

            table.addCell(new Paragraph("Name", blackFont));
            table.addCell(new Paragraph(map.get("cust_name") + "", blueFont));
            if (flowType.equalsIgnoreCase("FMSKYC")) {
                table.addCell(new Paragraph("Gender", blackFont));
                table.addCell(new Paragraph(map.get("gender") + "", blueFont));
            }
            table.addCell(new Paragraph("Date of Birth", blackFont));
            table.addCell(new Paragraph(map.get("dob") + "", blueFont));
            table.addCell(new Paragraph("Age", blackFont));
            table.addCell(new Paragraph(map.get("age") + "", blueFont));
            //showing POI and POA details only to fms_kyc
            if (flowType.equalsIgnoreCase("FMSKYC")) {
                table.addCell(new Paragraph("Date of Application", blackFont));
                table.addCell(new Paragraph(map.get("date_of_application") + "", blueFont));
                table.addCell(new Paragraph("Receipt No", blackFont));
                table.addCell(new Paragraph(map.get("Receipt_no") + "", blueFont));
                table.addCell(new Paragraph("CAF serial No", blackFont));
                table.addCell(new Paragraph(map.get("CAFserialno") + "", blueFont));
//                table.addCell(new Paragraph("POI Number", blackFont));
//                table.addCell(new Paragraph(map.get("re_poi_number") + "", blueFont));
//
//                table.addCell(new Paragraph("Type Of POA", blackFont));
//                table.addCell(new Paragraph(map.get("re_poa_type") + "", blueFont));
//                table.addCell(new Paragraph("Issuing Authority(POA)", blackFont));
//                table.addCell(new Paragraph(map.get("re_poa_issuing_auth") + "", blueFont));
//                table.addCell(new Paragraph("Date Of Issue(POA)", blackFont));
//                table.addCell(new Paragraph(map.get("re_poa_issue_date") + "", blueFont));
//                table.addCell(new Paragraph("POA Number", blackFont));
//                table.addCell(new Paragraph(map.get("re_poa_number") + "", blueFont));
            } else {
                prDebug("POI and POA details are removed for :: " + flowType);
            }
//            table.addCell(new Paragraph("Address", blackFont));
//            table.addCell(new Paragraph(map.get("address2") + "", blueFont));
            if (flowType.equalsIgnoreCase("FMSKYC")) {
                table.addCell(new Paragraph("Service Type", blackFont));
                table.addCell(new Paragraph(map.get("service_Type") + "", blueFont));
            } else {
                table.addCell(new Paragraph("Service Type", blackFont));
                table.addCell(new Paragraph(map.get("service_Type") + "", blueFont));
                PdfPCell cellWithRowspan = new PdfPCell(new Phrase());
                cellWithRowspan.setColspan(2);
//                cellWithRowspan.setBorder(PdfPCell.NO_BORDER);
                table.addCell(cellWithRowspan);
            }
            table.addCell("");
            table.addCell("");
//DepositeAmount
        } catch (Exception e) {
            prLog("Exception in [CRSFmsAcknowledgement][createFirstTable] :: ", e);
//            e.printStackTrace();
        }
        prInfo("[CRSFmsAcknowledgement][createFirstTable] END");
        return table;
    }

    public String getCurrentDate() {
        String dateString = "";
        prInfo("[CRSFmsAcknowledgement][getCurrentDate] START");
        try {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-YYYY");
            dateString = sdf.format(date);
            prDebug("Date in getCurrentDate method :: " + dateString);
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsAcknowledgement][getCurrentDate] : ", e);
        }
        prInfo("[CRSFmsAcknowledgement][getCurrentDate] END");
        return dateString;
    }

    public String getCurrentTime() {
        String dateString = "";
        prInfo("[CRSFmsAcknowledgement][getCurrentTime] START");
        try {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss a");
            dateString = sdf.format(date);
            prDebug("Date in getCurrentTime method :: " + dateString);
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsAcknowledgement][getCurrentTime] ::  ", e);
        }
        prInfo("[CRSFmsAcknowledgement][getCurrentTime] END");
        return dateString;
    }

    public String receiptReprintFms(Map map) {
        prInfo("[CRSFmsAcknowledgement][receiptReprintFms] START");
        String fileName = "";
        prInfo("starting of receiptReprintFms method in CRSFmsAcknowledgemen");
        try {

            fileName = uploadJobPDFPrint(map, fileName);

            if (new File(fileName).exists()) {
                prDebug("Pdf generated and saved in receiptReprintFms to  :: " + fileName);
            } else {
                prInfo("pdf does not exist...");
            }
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsAcknowledgement][receiptReprintFms]  :", e);
        }
        prInfo("[CRSFmsAcknowledgement][receiptReprintFms] END");
        return fileName;
    }



    public String dateFormat(String date) {
        try {
            prInfo("[CRSFmsAcknowledgement][dateFormat] START");
            prDebug("Converted date in [dateFormat] is :: " + date);

            String str[] = date.split("-");
            prDebug("[dateFormat] :: " + str[2] + "/" + str[1] + "/" + str[0]);
            String temp = str[2] + "/" + str[1] + "/" + str[0];
            return temp;
        } catch (Exception e) {
            prLog("Exception in [CRSFmsAcknowledgement][dateFormat] ", e);
            return date;
        }
    }

    /*.............Preparing map object from the input reqjson...........*/
    public HashMap preparePdfMap(JSONObject reqJson) {
        HashMap map = new HashMap();
        try {
            String flow_Type = reqJson.getString("flow_Type");
            map.put("flow_Type", flow_Type);
            map.put("date_of_application", reqJson.optString("DATE_ALLOTMENT", ""));
            map.put("Receipt_no", reqJson.optString("RECEIPT_NO", ""));
            map.put("Connection_Applied", reqJson.optString("CONN_APPLIED", ""));
            map.put("CAFserialno", reqJson.optString("CAF_NO", ""));
            map.put("Service_Number", reqJson.optString("SERVICE_NUMBER", ""));
            map.put("POS_Contact", reqJson.optString("POS_CONTACT", ""));
            map.put("Payment_Mode", reqJson.optString("PAYMENT_MODE", ""));
            map.put("cust_name", reqJson.optString("CUST_NAME", ""));
            map.put("date_of_payment", reqJson.optString("PAYMENT_TIME", ""));
            // map.put("Amount", reqJson.optString("AMOUNT", "0"));
            map.put("Bank_Name", reqJson.optString("BANK_NAME", "N/A"));
            map.put("Payment_Ref", reqJson.optString("PORTAL_TXN_ID", ""));
            map.put("Address", reqJson.optString("UID_CUST_ADDR", ""));
            map.put("POS_Name", reqJson.optString("POS_NAME", ""));
            map.put("TARIFF_PLAN_ID", reqJson.optString("TARIFF_PLAN_ID", ""));

            // TODO           
            int ISDAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD"));
            int IRAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"));
            int tariffAmount = reqJson.getInt("TARIFF_PLAN_AMOUNT");
            int schemeAmount = reqJson.getInt("SCHEME_AMOUNT");
            int wings_isd = reqJson.getInt("WINGS_ISD");
            int wings_ir = reqJson.getInt("WINGS_IR");
            map.put("tariff_amount", tariffAmount);
            if (wings_isd == 1) {
                tariffAmount = tariffAmount + ISDAmount;
                map.put("wings_isd", Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD")));
            } else {
                map.put("wings_isd", "N/A");
            }
            if (wings_ir == 1) {
                tariffAmount = tariffAmount + IRAmount;
                map.put("wings_ir", Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR")));
            } else {
                map.put("wings_ir", "N/A");
            }
            tariffAmount = tariffAmount + schemeAmount;
            map.put("total_amount", tariffAmount);
            map.put("EMAIL", reqJson.optString("EMAIL", ""));
            map.put("CUST_MOBILE_NO", reqJson.optString("CUST_MOBILE_NO", ""));
            map.put("SCHEME_AMOUNT", reqJson.optString("SCHEME_AMOUNT", "N/A"));
            map.put("WINGS_SCHEME_NAME", reqJson.optString("WINGS_SCHEME_NAME", "N/A"));
            
            prInfo("[CRSFmsAcknowledgement][preparePdfMap] MAP: " + map);
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsAcknowledgement][preparePdfMap] :: ", e);
        }
        return map;
    }

    /*.......download pdf...........*/
    public JSONObject createFmsDownloadPdf(String sessionPath, JSONObject reqJson) {
        prInfo("[CRSFmsAcknowledgement][createFmsDownloadPdf] START");
        JSONObject jSONObject = new JSONObject();
        PdfWriter writer = null;
        String file = "";
        try {
            String filename = reqJson.getString("CAF_NO") + ".pdf";
            file = sessionPath + File.separator + filename;           
            prDebug("PDF File Location in createFmsDownloadPdf is :: " + file);
            HashMap map = new HashMap();
            map = preparePdfMap(reqJson);
            Document document = new Document(PageSize.A4);
            writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            String path = ServletActionContext.getServletContext().getRealPath("/");
            String strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";
            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
            Font boldFont = new Font(baseFont, 10, Font.BOLD);
            Font redFont = new Font(baseFont, 10, Font.BOLD, Color.RED);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));
            document.open();
            prInfo("Document Object is opend ");
            prInfo("BSNL Logo Added to document");
            PdfPTable table = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cell = new PdfPCell(new Phrase("  "));
            cell.setPadding(0);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell);
            PdfPCell cell1 = new PdfPCell(new Phrase(new CRSAppResources().getMessge("RECPT_HDLINE"), boldFont));
            cell1.setPadding(0);
            cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell1.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell1);
            PdfPCell cell2 = new PdfPCell(new Phrase("  "));
            cell2.setPadding(0);
            cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell2.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell2);
            document.add(table);
            /*...create plain view or Table view starts ...*/

            //document.add(createPlainView(map,blackFont,blueFont));
            document.add(createTableView(map, blackFont, blueFont));
            /*...create plain view or Table view  ends...*/
            PdfPTable table3 = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cel11 = new PdfPCell(new Phrase("  "));
            cel11.setPadding(0);
            cel11.setHorizontalAlignment(Element.ALIGN_CENTER);
            cel11.setBorder(PdfPCell.NO_BORDER);
            table3.addCell(cel11);
            document.add(table3);

            PdfContentByte canvas = writer.getDirectContentUnder();
            Image image = Image.getInstance(path + File.separator + "images" + File.separator + "BSNL.png");

            image.setAbsolutePosition(186, 557);
            canvas.saveState();
            PdfGState state = new PdfGState();
            state.setFillOpacity(0.6f);
            canvas.setGState(state);
            canvas.addImage(image);
            canvas.restoreState();

            prInfo("Tabel Added to document ");
            // step 5
            document.close();
            jSONObject.put("status", "success");
            jSONObject.put("file", file);
//            jSONObject.put("file", "C:/Users/ramesh.a/Downloads/8568568568.pdf");
            jSONObject.put("filename", filename);
//            jSONObject.put("filename", "8568568568.pdf");

            writer.flush();
        } catch (Exception e) {
            jSONObject.put("status", "fail");
            jSONObject.put("message", "unable to generate PDF File createFmsDownloadPdf");
            prLog("Exception in  [CRSFmsAcknowledgement][createFmsDownloadPdf] :: ", e);

        } finally {
            try {
                if (writer != null) {
                    writer.close();
                    writer = null;
                }               

            } catch (Exception e) {
                prLog("Exception in finally block in CRSFmsAcknowledgement createFmsDownloadPdf:", e);
            }
        }
        prInfo("[CRSFmsAcknowledgement][createFmsDownloadPdf] END");
        return jSONObject;

    }
    
     /*.......Print pdf...........*/
    
    public String uploadJobPDFPrint(Map map, String fileName) {
        prInfo("[CRSFmsAcknowledgement][uploadJobPDFPrint] START");
        PdfWriter writer = null;
        try {

            Document document = new Document(PageSize.A4);
            writer = PdfWriter.getInstance(document, new FileOutputStream(fileName));
            String path = ServletActionContext.getServletContext().getRealPath("/");
            String strFontFile = path + File.separator + "fonts" + File.separator + "arial.ttf";
            BaseFont baseFont = BaseFont.createFont(strFontFile, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
            Font boldFont = new Font(baseFont, 10, Font.BOLD);
            Font redFont = new Font(baseFont, 10, Font.BOLD, Color.RED);
            Font blackFont = new Font(baseFont, 10, Font.NORMAL, Color.BLACK);
            Font blueFont = new Font(baseFont, 10, Font.BOLD);
            blueFont.setColor(WebColors.getRGBColor("#498ee1"));
            document.open();
            writer.addJavaScript("this.print({bUI: true, bSilent: false});", false);
            prInfo("Document Object is opend ");
            prInfo("BSNL Logo Added to document");
            PdfPTable table = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cell = new PdfPCell(new Phrase("  "));
            cell.setPadding(0);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell);
            PdfPCell cell1 = new PdfPCell(new Phrase(new CRSAppResources().getMessge("RECPT_HDLINE"), boldFont));
            cell1.setPadding(0);
            cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell1.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell1);
            PdfPCell cell2 = new PdfPCell(new Phrase("  "));
            cell2.setPadding(0);
            cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell2.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell2);
            document.add(table);
            /*......print pdf plain view or table view starts ....*/
            //document.add(createPlainView(map,blackFont,blueFont));
            document.add(createTableView(map, blackFont, blueFont));
            /*......print pdf plain view or table view ends ....*/
            PdfPTable table3 = new PdfPTable(1);
            table.setWidthPercentage(100);
            PdfPCell cel11 = new PdfPCell(new Phrase("  "));
            cel11.setPadding(0);
            cel11.setHorizontalAlignment(Element.ALIGN_CENTER);
            cel11.setBorder(PdfPCell.NO_BORDER);
            table3.addCell(cel11);
            document.add(table3);
            PdfContentByte canvas = writer.getDirectContentUnder();
            Image image = Image.getInstance(path + File.separator + "images" + File.separator + "BSNL.png");
            image.setAbsolutePosition(186, 557);
            canvas.saveState();
            PdfGState state = new PdfGState();
            state.setFillOpacity(0.6f);
            canvas.setGState(state);
            canvas.addImage(image);
            canvas.restoreState();
            prDebug("Tabel Added to document");
            document.close();
        } catch (Exception e) {
            prLog("Exception in  [CRSFmsAcknowledgement][uploadJobPDFPrint]  :: ", e);
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                    writer = null;
                }

            } catch (Exception e) {
                prLog("Exception in finally method in uploadJobPDFPrint : ", e);
            }
        }
        prInfo("[CRSFmsAcknowledgement][uploadJobPDFPrint] END");
        return fileName;
    }
    
    /*.................. common methods ...................*/

    public PdfPTable createPlainView(Map map, Font blackFont, Font blueFont) throws DocumentException, IOException {
        prInfo("[CRSFmsAcknowledgement][createPlainView] START");
        CRSAppResources msgObj = new CRSAppResources();
        PdfPTable table = new PdfPTable(4);
        table.setTotalWidth(500);
        table.setLockedWidth(true);
        int[] columnWidths = {130, 220, 110, 100};
        table.setWidths(columnWidths);

         PdfPCell cell = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_DTE_OF_APL"), blackFont));
            cell.setPadding(10);
            table.addCell(cell);
            PdfPCell cell1 = new PdfPCell(new Paragraph(map.get("date_of_application") + "", blueFont));
            cell1.setPadding(10);
            table.addCell(cell1);
            PdfPCell cell6 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CAF_NO"), blackFont));
            cell6.setPadding(10);
            table.addCell(cell6);
            PdfPCell cell7 = new PdfPCell(new Paragraph(map.get("CAFserialno") + "", blueFont));
            cell7.setPadding(10);
            table.addCell(cell7);
            PdfPCell cell4 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CON_APPLIED"), blackFont));
            cell4.setPadding(10);
            table.addCell(cell4);
            PdfPCell cell5 = new PdfPCell(new Paragraph(map.get("Connection_Applied") + "", blueFont));
            cell5.setPadding(10);
            table.addCell(cell5);
            PdfPCell cell8 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_SRVS_NO"), blackFont));
            cell8.setPadding(10);
            table.addCell(cell8);
            PdfPCell cell9 = new PdfPCell(new Paragraph(map.get("Service_Number") + "", blueFont));
            cell9.setPadding(10);
            table.addCell(cell9);
            PdfPCell cellbnk = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_BANK_NAME"), blackFont));
            cellbnk.setPadding(10);
            table.addCell(cellbnk);
            PdfPCell cellbnk2 = new PdfPCell(new Paragraph(map.get("Bank_Name") + "", blueFont));
            cellbnk2.setPadding(10);
            table.addCell(cellbnk2);
            PdfPCell cellpayref = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_PYMT_REF"), blackFont));
            cellpayref.setPadding(10);
            table.addCell(cellpayref);
            PdfPCell cellpayref2 = new PdfPCell(new Paragraph(map.get("Payment_Ref") + "", blueFont));
            cellpayref2.setPadding(10);
            table.addCell(cellpayref2);
            PdfPCell cell14 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_DATE_OF_PYMT"), blackFont));
            cell14.setPadding(10);
            table.addCell(cell14);
            PdfPCell cell15 = new PdfPCell(new Paragraph(map.get("date_of_payment") + "", blueFont));
            cell15.setPadding(10);
            table.addCell(cell15);
            /*PdfPCell cellamt = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_AMOUNT"), blackFont));
            cellamt.setPadding(10);
            table.addCell(cellamt);
            PdfPCell cellamt2 = new PdfPCell(new Paragraph(map.get("Amount") + "", blueFont));
            cellamt2.setPadding(10);*
            table.addCell(cellamt2);*/
            PdfPCell cell12 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CUST_NAME"), blackFont));
            cell12.setPadding(10);
            table.addCell(cell12);
            PdfPCell cell13 = new PdfPCell(new Paragraph(map.get("cust_name") + "", blueFont));
            cell13.setPadding(10);
            table.addCell(cell13);
            PdfPCell celladd = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_ADDR"), blackFont));
            celladd.setPadding(10);
            table.addCell(celladd);
            PdfPCell celladd2 = new PdfPCell(new Paragraph(map.get("Address") + "", blueFont));
            celladd2.setPadding(10);
            table.addCell(celladd2);
            
            // TODO
            PdfPCell celltariffAmount = new PdfPCell(new Paragraph(msgObj.getMessge("TARIFF_AMOUNT"), blackFont));
            celltariffAmount.setPadding(10);
            table.addCell(celltariffAmount);
            PdfPCell cellcelltariffAmount2 = new PdfPCell(new Paragraph(map.get("tariff_amount") + "", blueFont));
            cellcelltariffAmount2.setPadding(10);
            table.addCell(cellcelltariffAmount2);
            PdfPCell cellwings_isd = new PdfPCell(new Paragraph(msgObj.getMessge("WINGS_ISD"), blackFont));
            cellwings_isd.setPadding(10);
            table.addCell(cellwings_isd);
            PdfPCell cellwings_isd2 = new PdfPCell(new Paragraph(map.get("wings_isd") + "", blueFont));
            cellwings_isd2.setPadding(10);
            table.addCell(cellwings_isd2);
            PdfPCell cellwings_ir = new PdfPCell(new Paragraph(msgObj.getMessge("WINGS_IR"), blackFont));
            cellwings_ir.setPadding(10);
            table.addCell(cellwings_ir);
            PdfPCell cellwings_ir2 = new PdfPCell(new Paragraph(map.get("wings_ir") + "", blueFont));
            cellwings_ir2.setPadding(10);
            table.addCell(cellwings_ir2);	
            PdfPCell celltotal_amount = new PdfPCell(new Paragraph(msgObj.getMessge("TOTAL_AMOUNT"), blackFont));
            celltotal_amount.setPadding(10);
            table.addCell(celltotal_amount);
            PdfPCell celltotal_amount2 = new PdfPCell(new Paragraph(map.get("total_amount") + "", blueFont));
            celltotal_amount2.setPadding(10);
            table.addCell(celltotal_amount2);
            
        
        prInfo("[CRSFmsAcknowledgement][createPlainView] end");

        return table;
    }

    public PdfPTable createTableView(Map map, Font blackFont, Font blueFont) {
        prInfo("[CRSFmsAcknowledgement][createTableView] START");
        PdfPTable table = new PdfPTable(4);
        CRSAppResources msgObj = new CRSAppResources();

        try {
            table.setTotalWidth(550);
            table.setLockedWidth(true);
            int[] columnWidths = {100, 175, 100, 175};
            table.setWidths(columnWidths);
            PdfPCell cell = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_DTE_OF_APL"), blackFont));
            cell.setPadding(10);
            table.addCell(cell);
            PdfPCell cell1 = new PdfPCell(new Paragraph(map.get("date_of_application") + "", blueFont));
            cell1.setPadding(10);
            table.addCell(cell1);
            PdfPCell cell6 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CAF_NO"), blackFont));
            cell6.setPadding(10);
            table.addCell(cell6);
            PdfPCell cell7 = new PdfPCell(new Paragraph(map.get("CAFserialno") + "", blueFont));
            cell7.setPadding(10);
            table.addCell(cell7);
            PdfPCell cellEmail = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_EMAIL_ID"), blackFont));
            cellEmail.setPadding(10);
            table.addCell(cellEmail);
            PdfPCell cellEmail2 = new PdfPCell(new Paragraph(map.get("EMAIL") + "", blueFont));
            cellEmail2.setPadding(10);
            table.addCell(cellEmail2);
            PdfPCell custMobNO = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CUST_MOBILE_NO"), blackFont));
            custMobNO.setPadding(10);
            table.addCell(custMobNO);
            PdfPCell custMobNO2 = new PdfPCell(new Paragraph(map.get("CUST_MOBILE_NO") + "", blueFont));
            custMobNO2.setPadding(10);
            table.addCell(custMobNO2);
            PdfPCell cell4 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CON_APPLIED"), blackFont));
            cell4.setPadding(10);
            table.addCell(cell4);
            PdfPCell cell5 = new PdfPCell(new Paragraph(map.get("Connection_Applied") + "", blueFont));
            cell5.setPadding(10);
            table.addCell(cell5);
            PdfPCell cell8 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_SRVS_NO"), blackFont));
            cell8.setPadding(10);
            table.addCell(cell8);
            PdfPCell cell9 = new PdfPCell(new Paragraph(map.get("Service_Number") + "", blueFont));
            cell9.setPadding(10);
            table.addCell(cell9);
            PdfPCell cellbnk = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_BANK_NAME"), blackFont));
            cellbnk.setPadding(10);
            table.addCell(cellbnk);
            PdfPCell cellbnk2 = new PdfPCell(new Paragraph(map.get("Bank_Name") + "", blueFont));
            cellbnk2.setPadding(10);
            table.addCell(cellbnk2);
            PdfPCell cellpayref = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_PYMT_REF"), blackFont));
            cellpayref.setPadding(10);
            table.addCell(cellpayref);
            PdfPCell cellpayref2 = new PdfPCell(new Paragraph(map.get("Payment_Ref") + "", blueFont));
            cellpayref2.setPadding(10);
            table.addCell(cellpayref2);
            PdfPCell cell14 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_DATE_OF_PYMT"), blackFont));
            cell14.setPadding(10);
            table.addCell(cell14);
            PdfPCell cell15 = new PdfPCell(new Paragraph(map.get("date_of_payment") + "", blueFont));
            cell15.setPadding(10);
            table.addCell(cell15);
            /*PdfPCell cellamt = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_AMOUNT"), blackFont));
            cellamt.setPadding(10);
            table.addCell(cellamt);
            PdfPCell cellamt2 = new PdfPCell(new Paragraph(map.get("Amount") + "", blueFont));
            cellamt2.setPadding(10);
            table.addCell(cellamt2);*/
            PdfPCell cell12 = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_CUST_NAME"), blackFont));
            cell12.setPadding(10);
            table.addCell(cell12);
            PdfPCell cell13 = new PdfPCell(new Paragraph(map.get("cust_name") + "", blueFont));
            cell13.setPadding(10);
            table.addCell(cell13);
            PdfPCell celladd = new PdfPCell(new Paragraph(msgObj.getMessge("RECPT_ADDR"), blackFont));
            celladd.setPadding(10);
            table.addCell(celladd);
            PdfPCell celladd2 = new PdfPCell(new Paragraph(map.get("Address") + "", blueFont));
            celladd2.setPadding(10);
            table.addCell(celladd2);
            
            // TODO
            PdfPCell celltariffAmount = new PdfPCell(new Paragraph(msgObj.getMessge("TARIFF_AMOUNT"), blackFont));
            celltariffAmount.setPadding(10);
            table.addCell(celltariffAmount);
            PdfPCell cellcelltariffAmount2 = new PdfPCell(new Paragraph(map.get("tariff_amount") + "", blueFont));
            cellcelltariffAmount2.setPadding(10);
            table.addCell(cellcelltariffAmount2);
            PdfPCell cellwings_isd = new PdfPCell(new Paragraph(msgObj.getMessge("WINGS_ISD"), blackFont));
            cellwings_isd.setPadding(10);
            table.addCell(cellwings_isd);
            PdfPCell cellwings_isd2 = new PdfPCell(new Paragraph(map.get("wings_isd") + "", blueFont));
            cellwings_isd2.setPadding(10);
            table.addCell(cellwings_isd2);
            PdfPCell cellwings_ir = new PdfPCell(new Paragraph(msgObj.getMessge("WINGS_IR"), blackFont));
            cellwings_ir.setPadding(10);
            table.addCell(cellwings_ir);
            PdfPCell cellwings_ir2 = new PdfPCell(new Paragraph(map.get("wings_ir") + "", blueFont));
            cellwings_ir2.setPadding(10);
            table.addCell(cellwings_ir2);
            PdfPCell celltotal_amount = new PdfPCell(new Paragraph(msgObj.getMessge("TOTAL_AMOUNT"), blackFont));
            celltotal_amount.setPadding(10);
            table.addCell(celltotal_amount);
            PdfPCell celltotal_amount2 = new PdfPCell(new Paragraph(map.get("total_amount") + "", blueFont));
            celltotal_amount2.setPadding(10);
            table.addCell(celltotal_amount2);
            PdfPCell tariff_plan = new PdfPCell(new Paragraph(msgObj.getMessge("TARIFF_PLAN"), blackFont));
            tariff_plan.setPadding(10);
            table.addCell(tariff_plan);
            PdfPCell tariff_plan2 = new PdfPCell(new Paragraph(map.get("TARIFF_PLAN_ID") + "", blueFont));
            tariff_plan2.setPadding(10);
            table.addCell(tariff_plan2);
            PdfPCell scheme_amount = new PdfPCell(new Paragraph(msgObj.getMessge("SCHEME_AMOUNT"), blackFont));
            scheme_amount.setPadding(10);
            table.addCell(scheme_amount);
            PdfPCell scheme_amount1 = new PdfPCell(new Paragraph(map.get("SCHEME_AMOUNT") + "", blueFont));
            scheme_amount1.setPadding(10);
            table.addCell(scheme_amount1);
            PdfPCell scheme_name1 = new PdfPCell(new Paragraph(msgObj.getMessge("WINGS_SCHEME_NAME"), blackFont));
            scheme_name1.setPadding(10);
            table.addCell(scheme_name1);
            PdfPCell scheme_name = new PdfPCell(new Paragraph(map.get("WINGS_SCHEME_NAME") + "", blueFont));
            scheme_name.setPadding(10);
            table.addCell(scheme_name);

//            table.addCell("");
//            table.addCell("");
        } catch (Exception e) {
            prLog("Exception in [CRSFmsAcknowledgement][createTableView] :: ", e);
        }
        prInfo("[CRSFmsAcknowledgement][createTableView] END");
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
}
