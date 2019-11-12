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
                JSONObject objDKYCLLDataFull = null;
            try {
                JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_JOB_INFO");
                if (requestPar != null) {
                    AppLogger.debug("request DKYC LL in  Plan info Page::" + requestPar.toString());
                    objDKYCLLDataFull = requestPar;
                }
                
            } catch (Exception e) {
                e.printStackTrace();
            }
        %>
<meta charset="utf-8">
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
<link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
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
              var planArr=[];
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            var llDKYCJobfullData = '<%=objDKYCLLDataFull%>'; 
            
            if(llDKYCJobfullData !='null'){
                
                llDKYCJobfullData=JSON.parse(llDKYCJobfullData);
            }
            
            </script>

</head>
<body onload="loadLLPlans();">
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
             <div class="breadcrumtxt"> </div>
          <!--<div class="breadcrumtxt"> <span class="bluetxt"><a href="index.html"> Home </a></span> <span class="larrow">&gt;</span> <span class="bluetxt"> Digital KYC Landline</span></div>-->
          <h1 class="page_heading"><s:text name="dekyc.Digital.planinfo"/></h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row" id="page_content_block" >
        <div class="col-lg-12 pad15A pad25T pad25B text-center">
          <div class="pricing-table">
              <div id="appendPlans" ></div>
<!--            <div class="pricing-option">
              <h1>Plan 250</h1>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente harum voluptatum, sit cum voluptatibus inventore quae qui provident eveniet dicta at, quibusdam ipsam iusto reprehenderit hic saepe nesciunt sed illo.</p>
              <hr />
              <div class="price">
                <div class="front"> <span class="price"><i class="fa fa-inr"></i> 250</span> </div>
                <div class="back"> <a href="#" onclick="nxtToConfDKYCLL();" class="button">Select</a> </div>
              </div>
            </div>
            <div class="pricing-option">
              <h1>Plan 299</h1>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente harum voluptatum, sit cum voluptatibus inventore quae qui provident eveniet dicta at, quibusdam ipsam iusto reprehenderit hic saepe nesciunt sed illo.</p>
              <hr />
              <div class="price">
                <div class="front"> <span class="price"><i class="fa fa-inr"></i> 299 </span> </div>
                <div class="back"> <a href="dkyc_self_landline_step06.html" class="button">Select</a> </div>
              </div>
            </div>
            <div class="pricing-option">
              <h1>Plan 399</h1>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente harum voluptatum, sit cum voluptatibus inventore quae qui provident eveniet dicta at, quibusdam ipsam iusto reprehenderit hic saepe nesciunt sed illo.</p>
              <hr />
              <div class="price">
                <div class="front"> <span class="price"><i class="fa fa-inr"></i> 399</span> </div>
                <div class="back"> <a href="dkyc_self_landline_step06.html" class="button">Select</a> </div>
              </div>
            </div>
            <div class="pricing-option">
              <h1>Plan 448</h1>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente harum voluptatum, sit cum voluptatibus inventore quae qui provident eveniet dicta at, quibusdam ipsam iusto reprehenderit hic saepe nesciunt sed illo.</p>
              <hr />
              <div class="price">
                <div class="front"> <span class="price"><i class="fa fa-inr"></i> 448</span> </div>
                <div class="back"> <a href="dkyc_self_landline_step06.html" class="button">Select</a> </div>
              </div>
            </div>
            <div class="pricing-option">
              <h1>Plan 499</h1>
              <hr />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente harum voluptatum, sit cum voluptatibus inventore quae qui provident eveniet dicta at, quibusdam ipsam iusto reprehenderit hic saepe nesciunt sed illo.</p>
              <hr />
              <div class="price">
                <div class="front"> <span class="price"><i class="fa fa-inr"></i> 499</span> </div>
                <div class="back"> <a href="dkyc_self_landline_step06.html" class="button">Select</a> </div>
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>
<script>
   function loadLLPlanDiv(){
                   $(planArr).each(function (idx) {
                    var tabHtml = '<div class="pricing-option"  ><h1 id="'+planArr[idx].PLAN_ID+'"   onmouseover="mouseOver(this)" onmouseout="mouseOut(this)" >'+planArr[idx].PLAN_NAME+'</h1><hr /><p id="chargeDtls'+planArr[idx].PLAN_ID+'"  style="display:none" >'+planArr[idx].CHG_DETAILS+'</p>  <hr /><div class="price"><div class="front"> <span class="price"><i class="fa fa-inr"></i> '+planArr[idx].PLAN_CHARGE+'</span> </div><div class="back"> <a id="'+planArr[idx].PLAN_ID+'"  href="#" onclick="nxtToConfDKYCLL(this);" class="button">Select</a> </div></div></div><div><input type="hidden" id="'+planArr[idx].PLAN_ID+'_dtls" plan_name="'+planArr[idx].PLAN_NAME+'" plan_amount="'+planArr[idx].PLAN_CHARGE+'" /></div>';
                    $('#appendPlans').append(tabHtml);
                });
            }
            
            function mouseOver(obj){
                  var target = obj.getAttribute('id');
                  
                $("#chargeDtls"+target).show();
            }
            function mouseOut(obj){
                 var target = obj.getAttribute('id');
                  
                $("#chargeDtls"+target).hide();
            }
            
            
</script>
</body>
</html>
