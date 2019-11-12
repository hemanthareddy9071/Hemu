
<%@page import="com.in10s.logger.AppLogger"%>
<%@ page import = "java.io.*"%>
<%@ page import = "javax.servlet.http.*"%>

<%@ page import="com.in10s.commons.CRSAuthenticate"%>

<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="net.sf.json.JSONSerializer"%>

<%
    String filePathNew="";
    try {
         filePathNew = (String) session.getAttribute("PDFFilePath");
        AppLogger.debug("Start PDF rendering..."+filePathNew);
        FileInputStream fis = new FileInputStream(filePathNew);

        BufferedInputStream bis = new BufferedInputStream(fis);
        response.setContentLength(fis.available());
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "inline; filename=test.pdf");
        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
        byte[] buff = new byte[1024];
        int bytesRead;
        while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
            bos.write(buff, 0, bytesRead);
        }
        bos.flush();
        bos.close();
        bis.close();
        response.flushBuffer();
        fis.close();
        out.clear();
        out = pageContext.pushBody();

        AppLogger.debug("PDF rendering is over");

    } catch (Exception e) {
        e.printStackTrace();
    }
    finally {
            try {
                if (new File(filePathNew).exists()) {
                    new File(filePathNew).delete();
                }
            } catch (Exception e) {
            }
        }
    
%>