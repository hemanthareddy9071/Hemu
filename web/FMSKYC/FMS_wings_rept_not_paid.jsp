<%-- 
    Document   : FMS_wings_rept_not_paid.jsp
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : praveen.k
--%>

<%@page import="com.in10s.logger.AppLogger"%>
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
            JSONObject RespData= new JSONObject();
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            try {
                    JSONObject responceObj = (JSONObject) request.getAttribute("Responce");
                    if (responceObj != null){
                    RespData=responceObj;
                    }

                } catch (Exception e) {
                    e.printStackTrace();

                }
             
        %>
       
        <meta charset="utf-8">
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
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            var custData='<%=RespData%>';
          
        </script>

    </head>
    <body onload="setRegCustData();">
                <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='Login.do'><s:text name="receipt.regack.nav1"/>  </a></span><span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"><s:text name="register.form.nav2"/> </span></div>
                    <h1 class="page_heading"><s:text name="receipt.regack.headline"/></h1>
                </div>
            </div>
              <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td ><s:text name="receipt.regnpay.cafno"/></td>
                                    <td id="caf_no"></td>   
                                    <td><s:text name="receipt.regnpay.servtype"/> </td>
                                    <td id="service_type"></td>   
                                </tr>
                                <tr>
                                     <td ><s:text name="receipt.regnpay.fname"/></td>
                                    <td id="first_name"></td>  
                                    <td><s:text name="receipt.regnpay.lname"/><br></td>
                                    <td  id ="cust_last_name"></td>
                                                  
                                </tr>
                                <tr>
                                    <td><s:text name="receipt.regnpay.mobnum"/><br></td>
                                    <td  id ="cust_mobile_no"></td>
                                    <td><s:text name="receipt.regnpay.email"/></td>
                                    <td id="email"></td>                
                                </tr>
                                                        
                            </table>
                       <div class="clear mrg10B"></div>
                       <label style="color: red"><b><s:text name="receipt.regnpay.decl"/></b></label>
                        </div>
                        <div class="clear mrg10B"></div>
                        <div class="col-md-12">
                            <div class="">
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
            <script>
                   function setRegCustData() {
                        if (custData != null) {
                            var custPayReqDataobj = JSON.parse(custData);
                            for (var prop in custPayReqDataobj) {
                            if(!custPayReqDataobj.hasOwnProperty(prop)) continue;
                                $('#' + prop).text(custPayReqDataobj[prop]);
                            }
                        }
                 }
            </script>
    </body>
</html>