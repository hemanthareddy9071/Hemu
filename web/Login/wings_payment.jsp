<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
    <head>
        <%
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
                        JSONObject custData = null;
                            try {
                                custData = (JSONObject) request.getAttribute("CUST_DATA");
                            } catch (Exception e) {
                            }
                            if (custData != null) {
                                if(custData.getJSONArray("Data").size()>0){
                                custData = custData.getJSONArray("Data").getJSONObject(0);
                                AppLogger.info("custData$$$:: " + custData.toString());
                                } else {
                                     AppLogger.info("custData is Empty : " + custData.toString());
                                }
                            }
        %>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title> BSNL </title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/responsive_bootstrap_carousel_mega_min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" media="all">
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/grid_mobile_list.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/responsive_bootstrap_carousel.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
    
        <script>
            var custPayReqData = '<%= custData%>';
            var payIntFail="<s:text name="wings.service.payinfail"/>";
            var unableProcReq="<s:text name="wings.service.unbleproreq"/>";
        </script>
    </head>
    
    <body onload="setCustomerData();">
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div class="row">
  <div class="main">
    <div class="col-md-4"></div>
    <div class="col-xs-12 pad0A col-md-4">
      <div class="box pad15A">
        <div class="center">
          <div class="iconBlock"> <img src="<%=CSS_JS_PATH%>images/wings.jpg" style="height: 70px; width:auto;"></div>
          <h3><s:text name="wings.service.payment"/></h3>          
        </div>
              <div class="">
                                  <div class="col-md-12">
                            <!-- <h4 class="mrg10B">Provisional Receipt</h4>-->
                            <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td><s:text name="wings.service.name"/> </td>
                                    <td id="UID_FIRST_NAME"></td>
                                </tr>
                                <tr>
                                    <td ><s:text name="wings.service.mobno"/> </td>
                                    <td id="SEL_MOB_NO"></td>   
                                </tr>
                                <tr>
                                    <td><s:text name="wings.service.cafno"/> </td>
                                    <td id="CAF_NO"></td>
                                </tr>
                                <tr>
                                    <td><s:text name="wings.service.regDate"/> </td>
                                    <td id="DATE_ALLOTMENT"></td>                
                                </tr>

                                <tr>
                                    <td><s:text name="wings.service.regMobno"/> </td>
                                    <td id="CUST_MOBILE_NO"></td>                   
                                </tr>

                                <tr>
                                    <td><s:text name="wings.service.regEmail"/></td>
                                    <td id="EMAIL"><br></td>
                                </tr>
                                <tr>
                                    <td><s:text name="wings.service.aadharno"/></td>
                                    <td id="POI_NUMBER"><br></td>
                                </tr>
                                <tr>
                                    <td><s:text name="wings.service.amount"/> </td>
                                    <td id="AMOUNT"><s:text name="wings.service.amount.val"/> </td>
                                </tr>
                            </table>
                       <div class="clear mrg10B"></div>
                       <a href="#" onclick="wingsPaymentRequest();" class="primarybt"><s:text name="wings.service.pay"/></a>
                        </div>
           <div class="small mrg10T"><s:text name="wings.service.decl"/></div>
          </div>
        
      </div>
    
     
    </div>

  </div>
</div>
<div class="clear"></div>
<div class="footer">Copyright © 2018 Intense Technologies Limited. All rights reserved.</div>
<script>
      
    function encript(){
        var reqData={}
        reqData.CAF_NO='LE10008720';
     console.log(":::"+ encrypt(JSON.stringify(reqData)));
    }
</script>
</body>
</html>
