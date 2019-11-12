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
            JSONObject objDKYCLLFullInfo = null;
            JSONObject objDKYCLLRespData = null;
            try {
                JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_JOB_INFO");
                if (requestPar != null) {
                    AppLogger.debug("request DKYC LL in Receipt[request data--objDKYCLLFullInfo] Page::" + requestPar.toString());
                    objDKYCLLFullInfo = requestPar;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            try {
                JSONObject respPar = (JSONObject) request.getAttribute("DKYC_JOB_RESP");
                if (respPar != null) {
                    AppLogger.debug("request DKYC LL in Receipt[responce data--objDKYCLLRespData] Page::" + respPar.toString());
                    objDKYCLLRespData = respPar;
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
         <script>
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            var llReceiptReqInfo = '<%=objDKYCLLFullInfo%>'; 
             llReceiptReqInfo= JSON.parse(llReceiptReqInfo);
            var llReceiptRespData = '<%=objDKYCLLRespData%>'; 
             llReceiptRespData= JSON.parse(llReceiptRespData);
             //alert("Job Uploaded Successfully");
            </script>

</head>
<body onload="displayPopMsg();setLLReceiptData();">
    <form name="DKycLLReceipt" >
         <input type="hidden" name="data" id="data"/>
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
             <div class="breadcrumtxt"> </div>
          <!--<div class="breadcrumtxt"> <span class="bluetxt"><a href="index.html"> Home </a></span> <span class="larrow">&gt;</span> <span class="bluetxt"> Digital KYC Landline</span></div>-->
          <h1 class="page_heading"><s:text name="dekyc.Digital.Acknowledgment"/></h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row box mrg25B" id="page_content_block" >
         <div class=" ">
            <div class="row">
              <div class="col-md-12">
               <!-- <h4 class="mrg10B">Provisional Receipt</h4>-->
                <table class="table table-noborder table-condensed table_bold">
                  <tr>
                    <td><s:text name="dekyc.Digital.DateofApp"/></td>
                    <td id="DATE_TIME"></td>
                    <td><s:text name="dekyc.Digital.Receipt"/></td>
                    <td id="RECEIPTNO"></td>
                  </tr>
<!--                  <tr>
                  	<td>Franchisee Name :</td>
                    <td>M/S Bharti Telecom</td>
                    <td>POS code :</td>
                    <td> RJ01101 / M/S Bharti telecom</td>                   
                  </tr>-->
<!--                   <tr>
                     <td><s:text name="dekyc.Digital.Address1"/><br></td>
                    <td colspan="3">54, Vikrampuri, Secondarabad - 500002</td>                    
                  </tr>-->
                  
                  <tr>
                  	<td><s:text name="dekyc.Digital.conn"/></td>
                    <td id="service_type_ecaf"></td>
                    <td><s:text name="dekyc.Digital.CAFno"/></td>
                    <td id="CAF_NO"></td>                        
                  </tr>
                  
                </table>
                <table class="table table-bordered table-condensed table-striped table_bold">
                  <tr>
                    <td width="20%"><s:text name="dekyc.Digital.Name1"/></td>
                    <td width="24%" id="first_name"></td>
                    <td width="15%"><s:text name="dekyc.Digital.TPOI"/></td>
                    <td width="41%" id="poi_type_ecaf"></td>
                  </tr>
                  
                  <tr>
                   
                    <td><s:text name="dekyc.Digital.ll.email"/></td>
                    <td id="email"></td>
                      <td><s:text name="dekyc.Digital.ll.mob.no"/></td>
                    <td id="cust_mobile_no"></td>
                  </tr>
                  <tr>
                   
                    <td><s:text name="dekyc.Digital.IssuingAuth"/></td>
                    <td id="poi_issuing_auth_ecaf"></td>
                      <td>Date of issue:</td>
                    <td id="poi_issue_date"></td>
                  </tr>
                  <tr>
                  
                    <td><s:text name="dekyc.Digital.Serialnu"/></td>
                    <td id="poi_number"></td>
                      <td> <s:text name="dekyc.Digital.TypeOfPOA"/></td>
                    <td id="poa_type_ecaf"></td>
                  </tr>
                  <tr>
                  
                    <td> <s:text name="dekyc.Digital.IssueAuth"/></td>
                    <td id="poa_issuing_auth_ecaf"></td>
                      <td>Date of issue:</td>
                    <td id="poa_issue_date"></td>
                  </tr>
                  <tr>
                  
                    <td><s:text name="dekyc.Digital.numberSer"/></td>
                    <td id="poa_number"></td>
                      <td><s:text name="dekyc.Digital.Address3"/></td>
                      <td colspan="3"><label id="bill_addr_house_no"></label> , <label id="bill_addr_vill"></label> , <label id="bill_addr_add_dtls"></label> , <label id="bill_addr_city"></label> , <label id="bill_addr_state_ecaf"></label> , <label id="bill_addr_district_ecaf"></label> , <label id="bill_main_locality_ecaf"></label> , <label id="bill_sub_locality_ecaf"></label> , <label id="bill_exchange_code_ecaf"></label>  - <label id="BILL_ADDR_PINCODE"></label></td>     
                  </tr>
                  <tr>
                  
                    <td><s:text name="dekyc.Digital.ll.plan.dtls"/></td>
                    <td ><label id="PLAN_NAME"></label> - <label id="PLAN_AMOUNT"></label></td>
                      <td><s:text name="dekyc.Digital.ll.sel.no"/></td>
                      <td id="sel_mob_no"></td>     
                  </tr>
                

                </table>
              </div>
              <div class="col-md-12">
                  <div class="">  <button  class="primarybt1" onclick="downloadReceiptLL();" id="Generatereceipt"> <s:text name="dekyc.Digital.DDRe"/></button>
                <button style="display: none" class="primarybt1" id="Generatereceipt"> <s:text name="dekyc.Digital.DDEcaf"/> </button> 
                <a class="primarybt1" id="Generatereceipt" href="Login.do"><s:text name="dekyc.Digital.Home1"/></a></div>
              </div>
              <div class="clear mrg10B"></div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
<div class="clear"></div>
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
                        <!-- <li id="wl_job_upload_msg"><b>Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest",Kindly make a note of the application number for future correspondence</b></li><br><br>-->
                        <div class="item "> <img src="<%=CSS_JS_PATH%>images/landline_bb.png?ReqParam=<%=CSS_JS_VERSION%>" alt=""> </div>
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
<div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>
	
<!-- Upload  popup div starts-->
<div id="divUpload" class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><s:text name="dekyc.Digital.Uploaddocument"/></h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label><s:text name="dekyc.Digital.Selectdocument"/></label>
          <span class="red">*</span>
          <input id="input_POI" type="file"  class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" />
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="submit" class="primarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Upload1"/></button>
        <button type="submit" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Cancel1"/></button>
      </div>
    </div>
  </div>
</div>
<!-- Upload   popup div ends-->

<script>

$(".elarge_ic").click(function(){    
	$(".imgMask").show();
});
$(".imgClose").click(function(){    
	$(".imgMask").hide();
});
$(".remove_ic").click(function(){    
	$(".imgPreview").hide();
});

function displayPopMsg(){
    
    $("#divWings").modal('show');
    $('#wl_job_upload_msg').append("Thank you for the interest shown in availing LandLine connection. Our team will get in touch with you at the earliest," + "<span class='redtxt'><b>Kindly make a note of the Registration No for future correspondence " + llReceiptRespData.CAF_NO + "</b> </b></span>");
}
</script>

</body>
</html>
