<%@page import="com.in10s.logger.AppLogger"%>
<%@ page language="java" %>
<%@ page import="java.io.*" %>
<%@ page import="com.in10s.commons.CRSAuthenticate"%>
<%--<%@ page import="com.in10s.mybill.CRSFileDownload"%>--%>
<%--<%@ page import = "com.in10s.mybill.CRSPDFDownload"%>--%>

<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="net.sf.json.JSONSerializer"%>

<%

    CRSAuthenticate objCRSAuthenticate = new CRSAuthenticate();

    String filePathNew = (String) session.getAttribute("PDFFilePath");
    AppLogger.debug("Print Report.jsp strDestFilePath :" + filePathNew);
    String encryptvar = objCRSAuthenticate.Encrypt(filePathNew);
    AppLogger.debug("encryptvar :" + encryptvar);

    String strReqData = request.getParameter("reqData");
    System.out.println("strReqData in printReport : " + strReqData);
%>


<HTML><HEAD><TITLE>Print Bill </TITLE>
        <LINK href="Styles/IdeaStyles.css" type="text/css" rel="styleSheet">

        <SCRIPT language="javascript">
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

            function setBillPeriods(selValue)
            {
                try
                {
                    if (selValue != "") {
                        //document.getElementById("ifrmPDFPrint").src = "SilentPrintServlet?rand="+selValue;
                        document.getElementById("rand").value = selValue;
                        document.getElementById('printForm').submit();

                    }
                } catch (e) {
                }
            }
        </SCRIPT>

    </HEAD>
    <BODY  onload="setBillPeriods('<%= encryptvar%>')">




        <form method="post" id="printForm" target="ifrmPDFPrint"  action="PrintPDFStream.jsp">
            <input type="hidden" name="rand" id="rand" value=""/>
            <table bgcolor="#FFFFFF" width="780"  border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                    <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td height="30" align="center" valign="middle"><table width="96%" border="0" cellspacing="0" cellpadding="0">
                                        <!--                                        <tr>
                                                                                    <td align="left" valign="top" class="account"><strong>Account No:</strong> </td>
                                                                                    <td align="right" valign="top"><input  type="button" class="buttontext" value="Close" onclick="javascript:window.self.close()"  id="button3" name="button3" title="Close"/></td>
                                                                                </tr>-->
                                    </table></td>
                            </tr>
                            <tr>
                                <td height="35" align="center" valign="middle" bgcolor="#CCE5FF"><table width="96%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left" valign="top" class="titleboder">Print Receipt</td>
                                        </tr>
                                    </table></td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                        <tr>
                                            <td height="10" align="left" valign="top"></td>
                                        </tr>
                                        <tr>
                                            <td align="left"  valign="top" class="sep-line"></td>
                                        </tr>
                                        <tr>
                                            <td height="10" align="left" valign="top"></td>
                                        </tr>
                                        <tr>
                                        <table width="100%" border="0">
                                            <tr><td colspan="4" class="contentA"><b>&nbsp;&nbsp;&nbsp;&nbsp;PDF generated successfully. Please wait for printer dialog.</b></td></tr>
                                            <tr>

                                            </tr>
                                        </table>
                            </tr>
                            <tr>
                                <td height="10px" align="left" valign="top"></td>
                            </tr>
                            <tr>
                                <td align="left" valign="top" class="sep-line"></td>
                            </tr>
                            <tr>
                                <td height="10" align="left" valign="top"></td>
                            </tr>
                            <tr>
                                <td align="center">
                                </td>
                            </tr>
                            <tr>
                                <td align="left" valign="top">&nbsp;</td>
                            </tr>
                        </table></td>
                </tr>
                <tr>
                    <td>
                        <iframe name="ifrmPDFPrint" src="" frameborder="0" height="5px" width="5px"></td>

                    </td>
                </tr>
            </table></td>
    </tr>

</table>
</form>


</BODY>
</HTML>
