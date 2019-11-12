<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.commons.WfPropertyManager"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
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
              JSONObject objDKYCLLData = null;
            try {
                JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_JOB_INFO");
                if (requestPar != null) {
                    AppLogger.debug("request DKYC LL in NUMBER SEL Page::" + requestPar.toString());
                    objDKYCLLData = requestPar;
                }
                
            } catch (Exception e) {
                e.printStackTrace();
            }

        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/bootstrap-datetimepicker.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/moment.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/bootstrap-datetimepicker.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kycCaf.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Authentication.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_grid_choosenumbers.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_newform.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_FormValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_Landline.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            var landlineDKYCJob = '<%=objDKYCLLData%>'; 
             landlineDKYCJob= JSON.parse(landlineDKYCJob);
            
            
            var dkycSelfNumSearchType = "<s:text name="dkyc.Self.Num.SearchTYPE"/>";
              var dkycSelfNumReseve = "<s:text name="dkyc.Self.Landline.NumReseve"/>";
              var unableToResrvNum = "<s:text name="dkyc.Self.Landline.NumReseve.unable.reserve"/>";
              var loadLLNumbsfail = "<s:text name="dkyc.Self.Landline.NumReseve.unable.load"/>";
            </script>
</head>
<body onload="chooseLLNmubers();">
    <form name="DKycLLNumSelection" enctype="multipart/form-data">
         <input type="hidden" name="WINGS_LL_NO" id="WINGS_LL_NO" value=""/>
         <input type="hidden" name="sel_mob_no" id="sel_mob_no" value=""/>
    </form>
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div id="page-wrapper" class="container">
  <div class="row">
      <div class="mask" style="display:none" id="wait">
            <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
        </div>
    <div id="content-wrapper" class="mrg0L">
      <div id="page_header_bar" class="row">
        <div class="col-xs-12 ">

          <div class="breadcrumtxt"></div>
            <h1 class="page_heading"><s:text name="dekyc.Digital.ResNum"/></h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row" id="page_content_block" >
          <div class="col-lg-12 pad10A">
            <div class="row">
              <div class="col-md-6">
                <div class="col-md-12">
                  <!--<div class="form-group">
                    <label>Select Reserve number type<span class="redtxt">*</span></label>
                    <select  id="ddlFranchisee" name="select" class="txtinput" size="1">
                      <option value="0">Select from list</option>
                      <option value="1">CYMN</option>
                      <option value="2">Fancy</option>
                    </select>
                  </div>-->
                  <div id="divCYMN">
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.LLnum"/> <span class="redtxt">*</span></label>
                      <select class="txtinput" id="searchoperator" onchange="clrSrchTok();" >
                        <option value="" >--Select filter--</option>
                        <option value="ew" >ends with</option>
                        <!--<option value="en">does not end with</option>-->
                        <option value="bw">begins with</option>
<!--                        <option value="bn">does not begin with</option>
                        <option value="cn">contains</option>
                        <option value="nc">does not contain</option>-->
                      </select>
                      <input autocomplete="on" id="wingsLL_srch_num" class="txtinput" value="" type="text">
                    </div>
<!--                    <div class="form-group">
                      <label>Total digits sum of landline no. <span class="redtxt">*</span></label>
                      <input autocomplete="on" class="txtinput" value="" type="text">
                    </div>-->
<div class="form-group"> <a href="#" onclick="chooseLLNmubers();" class="primarybt" id="btnGetInfo"><s:text name="dekyc.Digital.Search2"/></a> </div>
                  </div>
                  
                </div>
              </div>
              <div class="col-md-6"  id="divGetInfo" >
                <h4><s:text name="dekyc.Digital.ALLnum"/></h4>
                 <div class="clear mrg10B"></div>
                 <div id="wng_num">
                     <div class="mask" style="display:none" id="wait_ftcNum">
                         <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                     </div>   
                 </div>
                <div class="clear mrg10B"></div>
                <div class="pad10A"> <a href="#" onclick="reserveLLNmubers();" class="primarybt1"><s:text name="dekyc.Digital.Reserve"/></a> </div>
              </div>
              
              <div class="clear"></div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer"><s:text name="dekyc.Digital.PBYIntense"/></div>

<script>

function clrSrchTok(){
    $('#wingsLL_srch_num').val('');
}



</script>
</body>
</html>
