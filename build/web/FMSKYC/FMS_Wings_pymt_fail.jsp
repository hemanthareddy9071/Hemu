<%-- 
    Document   : FMS_kyc_step1
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : praveen.k
--%>

<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONSerializer"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
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
          var alrtpayfailmsg="<s:text name="wings.pay.fail"/>";
         </script>
        
        <script>

            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };  
            function setWingsFailRcpt(){
               $("#divWings").modal('show');
               $('#wl_job_upload_msg').append(alrtpayfailmsg); 
            }
        </script>
    </head>
    <body onload="setWingsFailRcpt();">
        <div id="xcb">
            <div class="clear mrg65B"></div>
            <div id="divWings" class="modal fade"  data-backdrop="static" tabindex="-1" aria-hidden="true">
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
                                    <li id="wl_job_upload_msg1"><s:text name="wings.rcpt.advt1"/></li>

                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href='Login.do' class="secondarybt" >Ok</a> 
                        </div>
                    </div>
                </div>
            </div>
    </body>
</html>