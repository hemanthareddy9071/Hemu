<%-- 
    Document   : FMS_kyc_step1
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : ramesh.a
--%>

<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONSerializer"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%--<%@include  file="../browserInterceptor.jsp" %>--%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <% response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            JSONObject objPaymentTran= new JSONObject();
            JSONObject requestPar = (JSONObject) request.getAttribute("PAYMENT_TXN");
            AppLogger.debug("request1"+requestPar.toString());
            if(requestPar != null){
            objPaymentTran=requestPar;
            }
        %>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />

        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/menu.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!--<script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>-->
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kycCaf.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            var alrtRegTransDtlsEmpty="<s:text name="register.receipt.transdtls.empty"/>";
        </script>
        <script>
          var paymentData='<%=objPaymentTran%>';
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
            history.go(1);
            };  
        </script>

    </head>
    <body onload="setRegReceiptData();">
        <form name="acknowledgement">
            <input type="hidden" id="reqSessionId" value="" />
            <input type="hidden" id="PAYMENT_TXN" value="<s:property value="#session.PAYMENT_TXN"/>" />
            <input type="hidden" id="RECEIPTNO" value="<s:property value="#session.RECEIPTNO"/>" />
            <input type="hidden" id="DATE_TIME" value="<s:property value="#session.DATE_TIME"/>" />
            <input type="hidden" id="JOB_STATUS" value="<s:property value="#session.JOB_STATUS"/>" />
            <input type="hidden" name="reqData" id="reqData"/>
        </form>
        <div id="xcb">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='Login.do'><s:text name="receipt.regack.nav1"/>  </a></span><span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"><s:text name="receipt.regack.nav2"/> </span></div>
                    <h1 class="page_heading"><s:text name="receipt.regack.headline"/></h1>
                </div>
            </div>
            <div class="clear mrg65B"></div>
            <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- <h4 class="mrg10B">Provisional Receipt</h4>-->
                            <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td ><s:text name="receipt.regack.dtofapp"/></td>
                                    <td id="date_of_application"></td>   
                                    <td ><s:text name="receipt.regack.cafno"/></td>
                                    <td id="caf_serial_no"></td>   
                                </tr>
<!--                                <tr>
                                    <td>Connection applied :</td>
                                    <td id="connection_applied"></td>
                                    <td>Selected MobileNo:</td>
                                    <td id='selected_mob_no'></td>                   
                                </tr>-->
                                <tr>
                                    <td><s:text name="receipt.regack.bankno"/><br></td>
                                    <td  id ="bnk_name"></td>
                                    <td><s:text name="receipt.regack.payref"/> </td>
                                    <td id="portal_txn_id"></td>                   
                                </tr>
                                <tr>
                                    <td><s:text name="receipt.regack.paydaate"/><br></td>
                                    <td  id ="pymt_date"></td>
                                    <td><s:text name="receipt.regack.amount"/></td>
                                    <td id="amount"></td>                
                                </tr>
                                <tr>
                                    <td><s:text name="receipt.regack.custname"/></td>
                                    <td id="cust_name"><br></td>
                                    <td><s:text name="receipt.regack.paystatus"/></td>
                                    <td id="txn_status"><br></td>               
                                </tr>

                           
                            </table>
                       <div class="clear mrg10B"></div>
                        </div>
                        <div class="col-md-12">
                            <div class="">
                                <!--<button class="primarybt1" id="Generatereceipt" onclick="getKYCReceiptData('Generatereceipt');"> Print PDF</button>-->
                                <!--<button class="primarybt1" id="Generatepdf" onclick="getKYCReceiptData('Generatepdf');"> Generate PDF</button>--> 
                                <a href='Login.do' class="primarybt1" ><s:text name="receipt.regack.close"/></a>
                            </div>
                            <div class="clear mrg10B"></div>
                            <div class="mask" style="display:none" id="wait">
                                <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divWings" class="modal fade" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Message</h4>
                        </div>
                        <div class="modal-body">
                            <div class="">
                                <ul>
                                    <li id="wl_job_upload_msg"><b></b></li><br><br>
                                    <div class="item "> <img src="<%=CSS_JS_PATH%>images/image003.jpg?ReqParam=<%=CSS_JS_VERSION%>" alt=""> </div>
                                    <li id="wl_job_upload_msg1"><s:text name="wings.rcpt.advt"/></li>

                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="secondarybt" data-dismiss="modal">Ok</button> 
                        </div>
                    </div>
                </div>
            </div>
            <script>
     
        
              
            </script>
    </body>
</html>