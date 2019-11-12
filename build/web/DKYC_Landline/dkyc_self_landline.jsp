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
            JSONObject objLoginDtls=null;
             try{
            JSONObject logInfo = (JSONObject) request.getAttribute("LOGIN_INFO");
            if(logInfo != null){
            objLoginDtls = logInfo;
              AppLogger.debug("request LoginData in DKYC LAND LINE attachments page::"+objLoginDtls); 
            }
            
            }catch(Exception e){}
    %>

<meta charset="utf-8">
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
            var dkyclogDtls ='<%=objLoginDtls%>';
            if(dkyclogDtls != 'null'){
                dkyclogDtls=JSON.parse(dkyclogDtls);
            }
            
            
            var dkycSelfNum = "<s:text name="dkyc.Self.Numsel.enterCsc"/>";
            var dkycSelfCTOPUP = "<s:text name="dkyc.Self.Numsel.CTOPUP"/>";
            var dkycSelfServiceType = "<s:text name="dkyc.Self.Numsel.ServicType"/>";
            var dkycSelfBBConnection = "<s:text name="dkyc.Self.Numsel.BBConnection"/>";
            var dkycSelfVoiceConn = "<s:text name="dkyc.Self.Numsel.VoiceConn"/>";
            var dkycSelfBBtype = "<s:text name="dkyc.Self.Numsel.BBtype"/>";
            var dkycSelfBBRequired = "<s:text name="dkyc.Self.Numsel.BBRequired"/>";
            var dkycSelfBBConnType = "<s:text name="dkyc.Self.Numsel.BBConnType"/>";
            var dkycSelfBBModemType = "<s:text name="dkyc.Self.Numsel.BBModemType"/>";
            var dkycSelfBBAcquisitionType = "<s:text name="dkyc.Self.Numsel.BBAcquisitionType"/>";
            var dkycSelfBFAccAcqType = "<s:text name="dkyc.Self.ll.dkycSelfBFAccAcqType"/>";
            var dkycSelfOnTType = "<s:text name="dkyc.Self.Numsel.OntType"/>";
            var dkycSelfOnTAqyType = "<s:text name="dkyc.Self.Numsel.accAqy.OntType"/>";
            var dkycAccAcqType = "<s:text name="dkyc.Self.accAqy.type"/>";
            var validmobilenumber = '<s:text name="helpdesk.alert.validmobilenumber"/>';
            var alretNumStrtWth = "<s:text name="login.alrt.mobnum.valdation.stwth"/>";
            var alretmobnoempty = "<s:text name="login.alrt.mobnum.valdation.empty"/>";
            var alret11Digit = "<s:text name="login.alrt.mobnum.valdation.11deg"/>";
            var alretNumsecDigit = "<s:text name="login.alrt.mobnum.valdation.secdegwth"/>";
              
          
            
        </script>

</head>
<body onload="setLoadVals();">
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div id="page-wrapper" class="container">
  <div class="row">
      <div class="mask" style="display:none" id="wait">
            <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
        </div>
    <div id="content-wrapper" class="mrg0L">
        <div id="page_header_bar" class="row" style="">
        <div class="col-xs-12 pad20T">
          <h1 class="page_heading"><s:text name="dekyc.Digital.landline"/></h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row" id="page_content_block" >
          <div class="col-lg-12 pad10A">
            <div class="row">
              <div class="col-md-8">
                <div class="col-md-9">
                  <div class="form-group">
                    <label><s:text name="dekyc.Digital.BookingBy"/><span class="redtxt">*</span></label>
                    <select  id="ddlApplicationType" name="select" class="form-control">
                      <option value="0">Self</option>
                      <option value="1">CSC Code</option>
                      <option value="2">Franchise/Retailer</option>
                      <option value="3">Call Center</option>
                    </select>
                  </div>
			<div class="form-group" id="divCSC"  style="display:none;">
                    <label><s:text name="dekyc.Digital.CSCCODE"/><span class="redtxt">*</span></label>
                    <input  id="csc_code"  type="text" autocomplete="on" maxlength="20" class="form-control" onchange="validSerFieldsLL(this,'alphNumeric','CSC Code');" value="">
                  </div>
                  <div class="form-group" id="divFranchise" style="display:none;">
                    <label><s:text name="dekyc.Digital.CTOPUP"/><span class="redtxt">*</span></label>
                    <input id="franch_code"  type="text" autocomplete="on" class="form-control" maxlength="11" onchange="validateMobileNum('franch_code');" value="">
                  </div>
                  <div class="form-group">
                    <label><s:text name="dekyc.Digital.Servicetype"/><span class="redtxt">*</span></label>
                    <select  id="ddlServiceType" name="select" class="form-control">
                      <option value="0">Select service type</option>
                      <option value="1">Landline</option>
                      <option value="2">Bharat Fiber BroadBand</option>
                      <option value="4">Bharat Fiber Voice</option>
                      <!--<option value="4">Broadband </option>-->
                    </select>
                  </div>
                  <div id="divFtthBB" style="display:none;">
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.BroadbandConn"/><span class="redtxt">*</span></label>
                      <!--<input id="bb_con_no"  type="number" autocomplete="on" class="form-control" min="0" value="1" max="1" disabled>-->
                      <select id="bb_con_no" name="select" class="form-control" size="1" disabled>
                        <option value="">Select Number of Broadband Connections </option>
                        <option value="0">0 </option>
                        <option value="1" selected>1</option>                  
                      </select>

                    </div>
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.connections"/><span class="redtxt">*</span></label>
                      <!--<input  id="voc_con_no"  type="number" autocomplete="on" onchange="allowAcqType();"  onkeydown="return isNumVal(this);" class="form-control" min="0" value="" max="1" maxlength="1">-->
                     <select id="voc_con_no" name="select" class="form-control" size="1" onchange="allowAcqType();">
                        <option value="">Select Number of Voice Connections </option>
                        <option value="0">0 </option>
                        <option value="1">1</option>                  
                      </select>
                    </div>
                    
                  </div>
                  <div id="divFtthVoice" style="display:none;">
                  <div class="form-group">
                      <label><s:text name="dekyc.Digital.BroadbandConn"/><span class="redtxt">*</span></label>
                      <!--<input id="bb_con_v"  type="number" autocomplete="on" onchange="allowModAcqType();" onkeydown="return isNumVal(this);" class="form-control" min="1" max="1" value="" max="1" maxlength="1" >-->
                     <select id="bb_con_v" name="select" class="form-control" size="1" onchange="allowModAcqType();">
                        <option value="">Select Number of Broadband Connections </option>
                        <option value="0">0 </option>
                        <option value="1">1</option>                  
                      </select>
                  </div>
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.connections"/><span class="redtxt">*</span></label>
                      <!--<input id="voc_con_v"  type="number"  autocomplete="on" class="form-control" min="1" max="1" value="1" max="1" disabled>-->
                      <select id="voc_con_v" name="select" class="form-control" size="1" disabled>
                        <option value="">Select Number of Voice Connections </option>
                        <option value="0">0 </option>
                        <option value="1" selected>1</option>                  
                      </select>
                    </div>
                    
                    
                  </div>
                  <div id="divFtthOnt" style="display:none;">
                  <div class="form-group" style="display:none;">
                      <label><s:text name="dekyc.Digital.acc.type"/><span class="redtxt">*</span></label>
                  <select  id="ftth_ont_type" name="select" class="form-control" >
                        <option value="0">Select Accessory Type</option>
                        <option value="1">ONT TYPE A</option>
                        <option value="2">ONT TYPE B</option>
                        <!--<option value="3">As per CA details</option>-->
                      </select>  
                  </div>
                  <div class="form-group" id="modem_acq_type_div" style="display: none" >
                      <label><s:text name="dekyc.Digital.Modemacqe.ftth"/><span class="redtxt">*</span></label>
                      <select id="modem_acq_type" name="select" class="form-control" size="1">
                        <option value="0">Select Bharat Fiber Accessory Acquisition type</option>
                        <option value="1">OWNED </option>
                        <option value="2">RENTAL</option>                  
                      </select>
                    </div>
                  <div class="form-group" id="acc_acq_type" style="display: none">
                      <label><s:text name="dekyc.Digital.acc.aquist.type.ftth"/><span class="redtxt">*</span></label>
                   <select  id="ftth_ont_acq_type" name="select" class="form-control" >
                        <option value="0">Select Instrument Acquisition type</option>
                        <option value="1">CLIP OWNED</option>
                        <option value="2">CLIP Purchased from BSNL</option>
                        <!--<option value="3">As per CA details</option>-->
                      </select>  
                    </div>
                    
                    
                  </div>
                  <div id="divLandline" style="display:none;">
                    <div class="form-group" style="display:none;">
                      <label><s:text name="dekyc.Digital.Broadbandonly"/><span class="redtxt">*</span></label>
                      <select  id="ddlBroadbandonly" name="select" class="form-control" >
                        <option value="0">Select BB Only Yes/No</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        <!--<option value="3">As per CA details</option>-->
                      </select>
                    </div>
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.BroadbandReqYes"/><span class="redtxt">*</span></label>
                      <select id="bb_req_yes" name="select" class="form-control" size="1" onchange="bbReqYesNo();">
                        <option value="0">Select BB Required Yes/No</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>
                    <div style="display:none;" id="divConnectionType" >
                        <div class="form-group" id="con_type_bb">
                      <label><s:text name="dekyc.Digital.Connectiontype"/><span class="redtxt">*</span></label>
                      <select id="bb_con_type" name="select" class="form-control" size="1">
                        <option value="0">Select connection type</option>
                        <option value="1">Normal LL + BB</option>
                        <option value="2">VPN with Internet</option>
                        <option value="3">VPN with out Internet</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.Modemtype"/><span class="redtxt">*</span></label>
                      <select id="bb_modem_type" name="select" class="form-control" size="1">
                        <option value="0">Select Broadband modem type</option>
                        <option value="1">Type W1(1 PORT WITH  WI-FI) </option>
                        <option value="2">Type W2(4 PORT WITH  WI-FI)</option>
                        <!--<option value="3">Type WT</option>-->
                        <!--<option value="4">Type B1</option>-->
                        <!--<option value="5">Type B2</option>-->                        
                      </select>
                    </div>
                    <div class="form-group">
                      <label><s:text name="dekyc.Digital.Modemacqe"/><span class="redtxt">*</span></label>
                      <select id="bb_acquisition_type" name="select" class="form-control" size="1">
                        <option value="0">Select Broadband acquisition type</option>
                        <option value="1">OWNED </option>
                        <option value="2">Purchased from BSNL</option>                  
                        <option value="">RENTAL</option>                  
                      </select>
                    </div>
                    
                    </div>
                      <div class="form-group" >
                      <label><s:text name="dekyc.Digital.acc.aquist.type"/><span class="redtxt">*</span></label>
                      <select id="bb_access_acq_type" name="select" class="form-control" size="1">
                        <option value="0">Select Accessory Acquisition type</option>
                        <option value="1">CLIP OWNED </option>
                        <option value="2">CLIP Purchased from BSNL</option>                  
                      </select>
                    </div>
                  </div>
                    <div class="form-group" style="display: none">
                    <label><s:text name="dekyc.Digital.plan"/><span class="redtxt">*</span></label>
                    <textarea rows="3" class="form-control" ><s:text name="dekyc.Digital.textarea.comment"/>
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="col-md-4 ticklist ">
                
              </div>
              <div class="clear"></div>
              <div class="col-md-12">
                  <div class="form-group col-md-12"> <a href="#" onclick="goToLLDocs();" class="primarybt" id=""><s:text name="dekyc.form.nxt.btn"/></a> <a href="Login.do"  class="secondarybt" id=""><s:text name="dekyc.Digital.Cancel1"/></a> </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>

<script>
$(document).ready(function() {

$('#ddlServiceType').on('change', function() {
		  if ( this.value == '1'){
			$("#divFtthBB").hide();
			$("#divFtthOnt").hide();
			$("#divFtthVoice").hide();
		  }else if(this.value == '2'){
                       $("#divFtthBB").show();
                        $("#divFtthVoice").hide();
                        $("#divFtthOnt").show();
                        $('#acc_acq_type').hide();
                        $('#modem_acq_type_div').show();
                  }else if(this.value == '4'){
                      $("#divFtthVoice").show();
                      $("#divFtthBB").hide();
                      $("#divFtthOnt").show();
                      $('#acc_acq_type').show();
                      $('#modem_acq_type_div').hide();
                  }else{
                  	$("#divFtthOnt").show();

                  }
		});
$('#ddlApplicationType').on('change', function() {
		  if ( this.value == '1')
		  {
			$("#divCSC").show();
			$("#divFranchise").hide();
		  }
		  else  if ( this.value == '2')
		  {
			$("#divFranchise").show();
			$("#divCSC").hide();
		  }
		 else
		  {
			$("#divFranchise").hide();
			$("#divCSC").hide();
		  }
		});



    $('#ddlServiceType').on('change', function() {
        if (this.value == '1') {
            $("#divLandline").show();
        } else {
            $("#divLandline").hide();
            
        }
        clearLLOptions();
    });
    
    function clearLLOptions(){
        $('#bb_req_yes').val(0);
        $('#bb_modem_type').val(0);
        $('#modem_acq_type').val(0);
        $('#bb_acquisition_type').val(0);
        $('#bb_access_acq_type').val(0);
        $('#ftth_ont_acq_type').val(0);
        $('#voc_con_no').val('');
        $('#bb_con_v').val('');
    }
    $('#ddlBroadbandonly').on('change', function() {
        if (this.value == '1') {
            $('#bb_req_yes').val(1).prop('disabled',true).trigger('change');
        } else {
             $('#bb_req_yes').val(0).prop('disabled',false).trigger('change');
        }
    });
     $('#ddlBroadbandonly').val('2').trigger('change');
     $('#ftth_ont_type').val('1');

});
    function bbReqYesNo(){
                    if($('#bb_req_yes').find("option:selected").val()=='1'){
                        $("#divConnectionType").show();
                        $("#bb_con_type").val('1');
                        
                         if($('#ddlBroadbandonly').find("option:selected").val()=='2'){
                           $("#div_clip_type").show();
                           $("#con_type_bb").hide();
                         }else{
                              $("#div_clip_type").hide();
                              $("#con_type_bb").show();
                         }
                    }else{
                         $("#divConnectionType").hide();
                         $("#div_clip_type").show();
                          $('#bb_access_acq_type').val(0);
                    }
    }
    
    function isNumVal(evt){
       
                   var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode =='8' ||charCode =='49'||charCode =='48' || charCode =='96' || charCode =='97' || charCode =='38' || charCode =='40'){
            var id= $(evt).prop("id");
                if($('#'+id).val().length>0){
                    if (charCode =='8'){
                     return true;   
                    }
                 return false;   
                }
            return true;
                }

                return false;
            
    }
    
    function allowAcqType(){
        if($('#voc_con_no').val().trim()=='1'){
          $('#acc_acq_type').show();
       }else{
            $('#acc_acq_type').hide();
       }
    }
    function allowModAcqType(){
        if($('#bb_con_v').val().trim()!=''){
          $('#modem_acq_type_div').show();
       }else{
            $('#modem_acq_type_div').hide();
       }
    }
    
     function setLoadVals(){
         if(dkyclogDtls.FLOW_FLAG=='B'){
             $('#ddlServiceType').val('1').trigger('change').prop('disabled',true);
         }
     }


</script>
</body>
</html>
