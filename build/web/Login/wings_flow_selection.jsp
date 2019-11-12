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
            JSONObject objLoginData = null;
            try{
            JSONObject requestPar = (JSONObject) request.getAttribute("LOGIN_DATA");
            if (requestPar != null) {
                 requestPar.put("ZipFileCreation", "");  
                AppLogger.debug("requestCustFormData" + requestPar);
                //objfrmData = requestPar;
               objLoginData = requestPar;
               
            }
            }catch(Exception e){}
            
                  
        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title> BSNL </title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            var custLoginInfo='<%=objLoginData%>';
            if (custLoginInfo != 'null') {
              custLoginInfo = JSON.parse(custLoginInfo)
            }
           
             var wngflowselection="<s:text name="dkyc.form.login.flow.selection"/>";
             var wngflowval="<s:text name="dkyc.form.login.flow.ll.states.valid"/>";
             var wngflowstatesempty="<s:text name="dkyc.form.login.flow.ll.states.empty"/>";
        </script>
<style>
.card-img-top {
    width: auto;
    height: 150px;
    margin: 10px auto;
}
.card-body.mb {
    border-top: 1px solid #ccc;
    padding: 10px;
}

.card {
    font-size: 1em;
    overflow: hidden;
    padding: 0;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
    font-size: 1em;
    position: relative;
    margin: 0;
    padding: 1em;
    border: none;
    border-top: 1px solid rgba(34, 36, 38, .1);
    box-shadow: none;
}


.card-title {
    font-size: 1.28571429em;
    font-weight: 700;
    line-height: 1.2857em;
}

.card-text {
    clear: both;
    margin-top: .5em;
    color: rgba(0, 0, 0, .68);
}

.card-footer {
    font-size: 1em;
    position: static;
    top: 0;
    left: 0;
    max-width: 100%;
    padding: .75em 1em;
    color: rgba(0, 0, 0, .4);
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
    background: #fff;
}
.card-inverse .btn {
    border: 1px solid rgba(0, 0, 0, .05);
}



</style>
</head>
<body> 
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div id="page-wrapper" class="container">
  <div class="row">
    <div id="content-wrapper" class="mrg0L">
      <div id="page_header_bar" class="row">
        <div class="col-xs-12 pad20T">
          <h1 class="page_heading">Select for Landline & WINGS New Connection</h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row box mrg45B" id="page_content_block1" >
        <!--<div class="alert alert-info">
          <p>Note: - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>-->
        <div class="row">
            <div class="clear mrg65B">
                <div class="col-md-6" ></div>
                <div class="col-md-4" ></div>
                <div class="col-md-1" ></div>
                <div class="col-md-1" ><a style="text-align:right;" href='Login.do'  class="primarybt1">Back</a></div>
                
            </div>
        <div class="col-md-2"></div>
        <div class="col-md-4" style="display: none" >
    		<div class="card mb">
              <img class="card-img-top img-responsive" src="images/adhar-card.png" alt="Card image cap">
              <div class="card-body mb">
                <h5 class="card-title text-center">eKYC</h5>
                <p class="card-text">Use any government approved photo identity and address proof to  enroll for Landline, Broadband, FTTH voice & FTTH Broadband  connection.</p>
                
              </div>
              <div class="card-footer text-center">
                  <a href='#' onclick="goToAadharEkyc();" class="primarybt1">Go</a>
              </div>
            </div>
        </div>
        <div class="col-md-4" >
    		<div class="card mb">
              <img class="card-img-top img-responsive" src="images/landline_bb.png" alt="Card image cap">
              <div class="card-body mb">
                <h5 class="card-title text-center">Landline & Broadband</h5>
                <p class="card-text">Use any government approved photo identity and address proof to  enroll for Landline, Broadband, FTTH voice & FTTH Broadband  connection.</p>
                
              </div>
              <div class="card-footer text-center">
                  <a href='#' onclick="goToDKYCLL();" class="primarybt1">Go</a>
              </div>
            </div>
        </div>
            <div class="col-md-4">
    		<div class="card mb">
              <img class="card-img-top img-responsive" src="images/wings.jpg" alt="Card image cap">
              <div class="card-body mb">
                <h5 class="card-title text-center">Wings </h5>
                <p class="card-text">Use any government approved photo identity and address proof to  enroll for wings connection.</p>
                
              </div>
              <div class="card-footer text-center">
                  <a onclick="goToDkyc();" class="primarybt1">Go</a>
              </div>
            </div>
        </div>
        </div>
        <div class="clear mrg65B"></div>
        
      </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer">Copyright © 2018 Intense Technologies Limited. All rights reserved.</div>

</body>
</html>
