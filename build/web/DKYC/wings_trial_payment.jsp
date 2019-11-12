<%@page import="java.io.File"%>
<%@page import="com.in10s.commons.WfPropertyManager"%>
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
                 String file_path = "";
                CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
                CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
                response.setHeader("Pragma", "no-cache");
                response.setDateHeader("Expires", 0);
                response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
                JSONObject custData = null;
                String queryParamFlag = "";
                int IRAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"));
                int ISDAmount = Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD"));
                try {
                    custData = (JSONObject) request.getAttribute("CUST_DATA");
                } catch (Exception e) {
                }
                try {
                    queryParamFlag = (String)request.getAttribute("QUERY_PARAM");
                } catch (Exception e) {
                }
                if (custData != null) {
                        if (custData.getJSONArray("Data").size() > 0) {
                            custData = custData.getJSONArray("Data").getJSONObject(0);
                            System.out.println("custData"+custData.toString());
                             file_path = custData.getString("FILE_PATH");
                            file_path = new File(file_path).getAbsolutePath();
                            if (file_path.contains(".pdf") || file_path.contains(".PDF")) {
                                int index = file_path.lastIndexOf(File.separator);
                                file_path = (index > -1) ? new File(file_path.substring(0, index)).getAbsolutePath() : new File(file_path).getAbsolutePath();
                            }
                            custData.put("FILE_PATH", "");
                            AppLogger.info("custDataTRIAL$$$:: " + custData.toString());

                        } else {
                            AppLogger.info("custDataTrial is Empty : " + custData.toString());
                        }
                    }
        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
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
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Authentication.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/responsive_bootstrap_carousel.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_FormValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_newform.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
         <script>
            var custPayReqData = '<%= custData%>';
            var imgFilePath = '<%= file_path%>';
            var queryParamFlagStr = '<%= queryParamFlag%>';
             var fileUpldempty = "<s:text name="ekyc.form.wngs.img.empty"/>";
            var fileUpldsize = "<s:text name="ekyc.form.wngs.img.size"/>";
            var fileUpldsizealt = "<s:text name="ekyc.form.wngs.img.size.alt"/>";
            var payIntFail="<s:text name="wings.service.payinfail"/>";
            var unableProcReq="<s:text name="wings.service.unbleproreq"/>";
            var lblSDNTname="<s:text name="ekyc.form.wngs_trf_stnt_name"/>";
             var lblSDNTval="<s:text name="ekyc.form.wngs_trf_stnt_val"/>";
             var lblSDNTid="<s:text name="ekyc.form.wngs_trf_stnt_id"/>";
             var lblGOVTname="<s:text name="ekyc.form.wngs_trf_govt_name"/>";
             var lblGOVTval="<s:text name="ekyc.form.wngs_trf_govt_val"/>";
             var lblGOVTid="<s:text name="ekyc.form.wngs_trf_govt_id"/>";
             var lblBSNLname="<s:text name="ekyc.form.wngs_trf_bsnl_emp_name"/>";
             var lblBSNLval="<s:text name="ekyc.form.wngs_trf_bsnl_emp_val"/>";
             var lblBSNLid="<s:text name="ekyc.form.wngs_trf_bsnl_emp_id"/>";
             var lblLLname="<s:text name="ekyc.form.wngs_trf_ll_val"/>";
             var lblLLval="<s:text name="ekyc.form.wngs_trf_llAc_val"/>";
             var lblLLid="<s:text name="ekyc.form.wngs_trf_ll_id"/>";
             var lblpophead2="<s:text name="dkyc.form.plan.wtp2.head"/>";
             var lblpopmsg2="<s:text name="dkyc.form.plan.wtp2.body"/>";
             var lblpophead3="<s:text name="dkyc.form.plan.wtp3.head"/>";
             var lblpopmsg3="<s:text name="dkyc.form.plan.wtp3.body"/>";
             var lblpophead4="<s:text name="dkyc.form.plan.wtp4.head"/>";
             var lblpopmsg4="<s:text name="dkyc.form.plan.wtp4.body"/>";
             var lblpophead7="<s:text name="dkyc.form.plan.wtp7.head"/>";
             var lblpopmsg7="<s:text name="dkyc.form.plan.wtp7.body"/>";
             var rmnvalidsuccess="<s:text name="dkyc.form.plan.num.valid.success"/>";
             var alrtplanatch="<s:text name="dkyc.form.wngs_trf_plan_validate.attach"/>";
             var alrtplandtls="<s:text name="dkyc.form.wngs_trf_plan_validation"/>";
             var tarifAtchSize="<s:text name="dkyc.form.wngs_trf_attach_size"/>";
             var lblwtp8name="<s:text name="dkyc.form.wngs_trf.plan.wtp8name"/>";
             var lblwtp8val="<s:text name="dkyc.form.wngs_trf.plan.wtp8val"/>";
             var lblwtp8id="<s:text name="dkyc.form.wngs_trf.plan.wtp8id"/>";
             var lblpophead8="<s:text name="dkyc.form.plan.wtp8.head"/>";
             var lblpopmsg8="<s:text name="dkyc.form.plan.wtp8.body"/>";
             var alrtcircleEmpty="<s:text name="dkyc.form.plan.wtp6a.circle.empty"/>";
             var plzVlidNum="<s:text name="dkyc.form.plan.wtp6a.mobnum.notvalid"/>";
             var plzVlidOTP="<s:text name="dkyc.form.plan.wtp6a.otp.notvalid"/>";
             var labgovtName = "<s:text name="ekyc.form.wngs_trf_govt_name"/>";
            var labgovtVal = "<s:text name="ekyc.form.wngs_trf_govt_val"/>";
            var irMsg = "<s:text name="wings.service.ir.msg.form"/>";
            var isdMsg = "<s:text name="wings.service.isd.msg.form"/>";            
            var ISDAmount='<%=ISDAmount%>';
            ISDAmount=Number(ISDAmount);
            var IRAmount='<%=IRAmount%>';
            IRAmount=Number(IRAmount);
        </script>
    </head>
<body onload="setCustomerData();loadPlanAmount();">
      <form name="trialPaymentPage" enctype="multipart/form-data">
            <input type="hidden" name="reqData" id="reqData"/>
      </form>
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div class="row">
  <div class="main">
    <div class="col-md-2"></div>
    <div class="col-xs-12 pad0A col-md-8">
      <div class="box1 pad15A">
        <div class="center">
          <div class="iconBlock"> <img src="images\wings.jpg" style="height: 70px; width:auto;"></div>
          <h3>Renewal Intimation</h3>
        </div>
        <div class="infoList1">
            <table class="table table-noborder table-condensed table_bold">
                 <tr>
                    <td><s:text name="wings.service.name"/> </td>
                    <td id="UID_FIRST_NAME"></td>
                    <td ><s:text name="wings.service.mobno"/> </td>
                    <td id="SEL_MOB_NO"></td>   
                </tr>
                <tr>
                    <td><s:text name="wings.service.cafno"/> </td>
                    <td id="CAF_NO"></td>
                    <td><s:text name="wings.service.regDate"/> </td>
                    <td id="DATE_ALLOTMENT"></td>                
                </tr>
                <tr>
                    <td><s:text name="wings.service.regMobno"/> </td>
                    <td id="CUST_MOBILE_NO"></td> 
                    <td><s:text name="wings.service.regEmail"/></td>
                    <td id="EMAIL"><br></td>
                </tr>
<!--                <tr>
                    <td><s:text name="wings.service.aadharno"/></td>
                    <td id="POI_NUMBER"><br></td>
                    <td><s:text name="wings.service.amount"/> </td>
                    <td id="PLAN_AMOUNT"> <span> /-</span>></td> 
                </tr>                                -->
            </table>
<!--                  <div class="col-md-6">
          	<span>Name</span><span id="UID_FIRST_NAME"></span>
          </div>
          <div class="col-md-6">
          	<span>WINGS No.</span><span id="SEL_MOB_NO"></span>
          </div>
          <div class="col-md-6"><span>CAF No.</span><span id="CAF_NO"></span></div>
            <div class="col-md-6"><span>Onboarded Date</span><span id="DATE_ALLOTMENT"></span></div>
            <div class="col-md-6"><span>Reg. Mobile No.</span><span id="CUST_MOBILE_NO" ></span></div>
            <div class="col-md-6"><span>Email Address</span><span id="EMAIL"></span></div>
            <div class="col-md-6"><span>Aadhaar No.</span><span id="POI_NUMBER"></span></div>
            <div class="col-md-6"><span>Paid Amount</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp<span id="PLAN_AMOUNT"> </span>/-</div>-->

            
            <div class="col-md-4">
              <label>WINGS tariff <font color="red">*</font></label><br>
              <select id="cust_wings_traiff" onchange="toggleFields2();checkAmount();">
               </select>              
            </div>
            <div class="col-md-4 form-group" id="divOtherFacilities">
              <label>Other facilities</label>
              <div class="pad5T">
                <input name="International" id="chkISD" type="checkbox" value="ISD">
                <label for="ISD">ISD</label>
                 <input type="checkbox" name="International" id="chkIR" value="IR" checked >
                <!--<label for="IR">International Roaming</label>-->
              </div>
            </div>
            <div  id="wings_scheme_dd" class="col-md-4 form-group" style="display: none">
                <label><s:text name="ekyc.form.wngs_scheme_dd"/><font color="red">*</font></label>
                <select  id="wings_scheme"  name="wingsScheme" class="form-control" onchange="checkAmount();" size="1">
                </select>
            </div>
            
            <div class="clear mrg10B"></div>
            <div  id="plan_dtls_div" style="display: none">
                <div class="row">
                    <div class="col-md-6 form-group" id="name_plan">
                        <label id="plan_lbl_name"><s:text name="ekyc.form.wngs_trf_govt_name"/> <font color="red">*</font></label>						
                        <input  id="plan_org_name"  type="text" class="form-control"  onchange="validatePOIName(this);"  value="" maxlength="50">
                    </div>
                    <div class="col-md-6 form-group" id="value_plan">  
                        <label id="plan_lbl_val"><s:text name="ekyc.form.wngs_trf_govt_val"/> <font color="red">*</font></label>
                        <input  id="plan_service_num"  type="text" class="form-control" onchange="validatePOIVal(this);" maxlength="50">
                    </div>
                    <div class="col-md-6 form-group" id="attach_plan">
                        <label id="plan_lbl_id"><s:text name="ekyc.form.wngs_trf_govt_id"/> <font color="red">*</font></label>
                        <!--<input id="input_POI_gov" type="file"  class="file" data-show-preview="false"   data-show-remove="false" />-->
                        <input id="input_POI" type="file" name="userFile" onchange="validTrialTarifAttach(this);" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                        <font color="red"><s:text name="ekyc.form.upload.info"/></font>
                    </div>
                </div>
            </div>
                    <div class="col-md-12" id="amt_lab_div" style="display: none">
                        Payble Amount: Rs. <label id="pay_amount"></label> /-
                    </div>
            <div class="clear mrg10B"></div>
            <div class="col-md-12">
                <button id='take_pymt_btn' onclick="payReqforTrial();" class="primarybt">Pay</button>
                <button id='disconnect_btn' onclick="disconnectTrialPlan();" style="display: none" class="primarybt">Disconnect</button>
                    <a  id='backButton'   href='backToGrid.do' class="secondarybt" ><s:text name="aadhar.bck.btn"/></a>
            </div>
          <div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="clear mrg20B"></div>
          <div class="footer"><s:text name="dekyc.Digital.Copyright"/> </div>        
            <div class="modal fade" id="popModel" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header orange">
                            <button type="button" onclick="deniedDeclaration()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                            <h4 class="modal-title" id="pop_lab_header"></h4>
                        </div>
                        <div class="modal-body">
                            <p id="pop_lab_msg"></p>
                            <!---->
                        </div>
                        <div class="modal-footer">
                            <button id="btnStudent" type="button" class="primarybt" value="submit" onclick="confDeclaraion()" data-dismiss="modal">Submit</button>
                            <button type="button" class="secondarybt" id="Closed" data-dismiss="modal" onclick="deniedDeclaration()">Close</button>
                        </div>
                    </div>
                </div>
            </div>
          <div class="modal fade" id="popInternationalRoaming">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header orange">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span> </button>
                            <h4 class="modal-title">Info</h4>
                        </div>
                        <div class="modal-body">
                            <p id="info_msg"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="primarybt" data-dismiss="modal">Ok</button>
                            <!--<button type="button" class="secondarybt" data-dismiss="modal">Close</button>-->
                        </div>
                    </div>
                </div>
            </div>
<script>   
        $('#chkISD').change(function () {
            var chkISD = $('#chkISD').is(':checked');
            var chkIR = $('#chkIR').is(':checked');
            if (chkISD && !chkIR) {
                 $('#chkIR').prop('checked', true);
                $('#popInternationalRoaming').modal('show');
                $('#info_msg').text(isdMsg);
            }
            else if (chkIR && chkISD) {
                $('#popInternationalRoaming').modal('show');
                $('#info_msg').text(isdMsg);
            }
            checkAmount();
        });  
        $('#chkIR').change(function () {
            var chkISD = $('#chkISD').is(':checked');
            var chkIR = $('#chkIR').is(':checked');
            if (chkIR && !chkISD) {
                //$('#chkISD').prop('checked', true);
                $('#popInternationalRoaming').modal('show');
                $('#info_msg').text(irMsg);
            }uncheck(this);
            checkAmount();
        });
       function uncheck() {
            $("#chkISD").prop("checked", false);
       }             
       function payReqforTrial(){           
          var reqData = JSON.parse(custPayReqData);
          reqData.TARIFF_ID_NAME = '';
          reqData.TARIFF_ID_VALUE = '';
          var selTarifPlan= $('#cust_wings_traiff').val();
          var selTarifPlanName = $('#cust_wings_traiff').find("option:selected").text();         
          if(selTarifPlan != 0 && selTarifPlan != null ){
                reqData.WINGS_TARIFF_PLAN_ID = selTarifPlan;
                reqData.WINGS_TARIFF_PLAN_VALUE =selTarifPlanName ;
                var isd=$('#chkISD').is(':checked');
                var ir=$('#chkIR').is(':checked');
                checkAmount();             
                if (selTarifPlan == "WTPO3" || selTarifPlan == "WTPO1" ) {             
                    reqData.TARIFF_ID_NAME = "";
                    reqData.TARIFF_ID_VALUE = "";
                    reqData.TARRIF_FLAG = "";
                } else{
                    var plan_org_name = $('#plan_org_name').val();
                    if(selTarifPlan == "WTP8"){
                        plan_org_name=$('#cust_wings_traiff').find("option:selected").text();
                    }
                    var plan_service_num = $('#plan_service_num').val();
                    reqData.TARRIF_FLAG = selTarifPlanName;
                    if (plan_org_name.trim() == "") {
                         alert($('#plan_lbl_name').text().replace("*","") +' should not be empty');
                        $('#plan_org_name').focus();
                        return false;
                    } else if (plan_service_num.trim() == "") {
                        alert($('#plan_lbl_val').text().replace("*","") +' should not be empty');
                        $('#plan_service_num').focus();
                        return false;
                    }
                    var userFile = document.getElementById("input_POI");
                    if (!validateUserFile(userFile, alrtplanatch , 'input_POI')) {
                        return false;
                    }
                    reqData.TARIFF_ID_NAME = plan_org_name;
                    reqData.TARIFF_ID_VALUE = plan_service_num;
            }         
          } else{
              alert('Please select Plan to proceed payment');
              return false;
          }
          var selSchemePlan = $("#wings_scheme").val();
          var selSchemePlanName = $('#wings_scheme').find("option:selected").text();
          reqData.WINGS_SCHEME_ID = selSchemePlan;
          reqData.WINGS_SCHEME_NAME = selSchemePlanName;
          reqData.TYPE="DKYC";
          reqData.PLAN_ID=selTarifPlan;
          reqData.ISD_ENABLE=isd;
          reqData.IR_ENABLE=ir;
          reqData.PAY_REQ_AMOUNT=PaybleAmount;
           $.ajax({
            url: "takePaymentForTrial.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                 if (data.response.success) {
                     if ('S' == data.response.responseData.PYMT) {
                        window.location.href = data.response.responseData.PYMT_URL;
                    } else{
                        alert("Payment failed ..");                        
                    }                     
                }else{
                    alert(data.response.message);
                } 
            }, error: function (data) {
                alert("error : " + JSON.stringify(data));
            }
        });
       }
       var PaybleAmount=0;
       function checkAmount(){
            var reqAmt=0;
            var isd=$('#chkISD').is(':checked');
            var ir=$('#chkIR').is(':checked');
            var schemeId=$("#wings_scheme").val();
            if(schemeId !="WS0"){
                reqAmt=reqAmt+scheme_amt[schemeId];
            }
            if(isd){
                reqAmt=reqAmt+ISDAmount;
            }
            if(ir){
                reqAmt=reqAmt+IRAmount;
            }
           var Plain_id= $('#cust_wings_traiff').val(); 
            if(Plain_id != 0){
                reqAmt=reqAmt+PlanAmount[Plain_id];
            }     
            $('#amt_lab_div').show();
            $('#pay_amount').text(reqAmt);
            PaybleAmount= reqAmt;
             if(reqAmt == 0){
                  $('#amt_lab_div').hide();
             }else{
                  $('#amt_lab_div').show();
             }
//            if(reqAmt >0){
//                $('#take_pymt_btn').show();
//            }else{
//                $('#take_pymt_btn').hide();
//            }          
       }
        var PlanAmount={};
       function loadPlanAmount(){
           var reqData={};
           reqData.TYPE="DKYC";
           $.ajax({
            url: "fetchPlanAmt.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                 if (data.response.success) {
                     PlanAmount={};
                     var availablePlans = data.response.responseData;
                     PlanAmount=availablePlans.PLAN_AMOUNT;
                    if (availablePlans.WINGS_PLANS.length > 0) {
                        var availexCodelarr = availablePlans.WINGS_PLANS;
                        $('#cust_wings_traiff').children().remove();
                        $('#cust_wings_traiff').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#cust_wings_traiff').append(new Option(availexCodelarr[index].PLAN_NAME, availexCodelarr[index].PLAN_ID));
                            });
                    } 
                }else{
                    alert(data.response.message);
                    //window.location.href='Login.do';
                    return false;
                } 
            }, error: function (data) {
                alert("error : " + JSON.stringify(data));
            }
        });
       }    
       
       function disconnectTrialPlan(){
          var reqData = JSON.parse(custPayReqData);
          reqData.TARIFF_ID_NAME = '';
          reqData.TARIFF_ID_VALUE = '';
          var selTarifPlan= $('#cust_wings_traiff').val();
          var selTarifPlanName = $('#cust_wings_traiff').find("option:selected").text();         
          reqData.WINGS_TARIFF_PLAN_ID = selTarifPlan;
          reqData.WINGS_TARIFF_PLAN_VALUE =selTarifPlanName ;
          reqData.TYPE="DKYC";
          reqData.PLAN_ID=selTarifPlan;
          reqData.ISD_ENABLE=false;
          reqData.IR_ENABLE=false;
          reqData.PAY_REQ_AMOUNT=0;
          document.trialPaymentPage.method = "post";
          document.trialPaymentPage.action = "disconnectTrial.do";
          document.trialPaymentPage.reqData.value = encrypt(JSON.stringify(reqData));
          document.trialPaymentPage.submit();
       }

</script>
        <script>
        function toggleFields2() {
             clearTrailFlag();
             clearTraffValues();  
             loadWingsSchemes();
        if ($("#cust_wings_traiff").val() == "WTP2") {
            $('#plan_lbl_name').text(lblGOVTname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblGOVTval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblGOVTid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead2);
            $('#pop_lab_msg').text(lblpopmsg2);
            $("#popModel").modal();
        } else if ($("#cust_wings_traiff").val() == "WTPO4") {
            $('#plan_lbl_name').text(lblSDNTname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblSDNTval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblSDNTid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead3);
            $('#pop_lab_msg').text(lblpopmsg3);
            $("#popModel").modal();
        } else if ($("#cust_wings_traiff").val() == "WTPO2") {
            $('#plan_lbl_name').text(lblLLname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblLLval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblLLid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead4);
            $('#pop_lab_msg').text(lblpopmsg4);
            $("#popModel").modal();
        }else if($("#cust_wings_traiff").val() == "WTP6"){
            $('#trail_pack_dtls').show();
            validation_req=true;
            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide();           
        }else if($("#cust_wings_traiff").val() == "WTP6A"){
            $('#trail_pack_dtls').hide();
            $('#free_mob_plan').show();
            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide(); 
            is_mob_valid_req=true;
            loadCircleList();
        }
        else if( $("#cust_wings_traiff").val() =="WTPO5"){
            $('#plan_lbl_name').text(lblBSNLname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblBSNLval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblBSNLid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead7);
            $('#pop_lab_msg').text(lblpopmsg7);
            $("#popModel").modal();            
        } else if( $("#cust_wings_traiff").val() =="WTP8"){
            $('#plan_lbl_name').text(lblwtp8name).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblwtp8val).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblwtp8id).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead8);
            $('#pop_lab_msg').text(lblpopmsg8);
            $("#popModel").modal();   
            $('#name_plan').hide();            
        } else {
            $('#plan_dtls_div').hide();
            clearTraffValues();
        }
        if($("#cust_wings_traiff").val() =="WTPD"){
            $('#chkISD').prop( "checked",false);
            $('#chkIR').prop( "checked",false);
            $('#divOtherFacilities').hide();
            $('#take_pymt_btn').hide();
            $('#disconnect_btn').show();
            $('#amt_lab_div').hide();
            $('#wings_scheme_dd').hide();
        }else{
             $('#divOtherFacilities').show();
             $('#amt_lab_div').show();
             $('#take_pymt_btn').show();
             $('#disconnect_btn').hide();
        }
    }  
    
    function validTrialTarifAttach(obj) {
        var id = obj.getAttribute('id');
        var userFile = document.getElementById(id);
//        if (userFile.files[0].size > 102400) {
        if (userFile.files[0].size > 3145728) {
            alert("Upload size should be less than " + 3145728 / 1024 + " KB");
            $("#" + id).val("");
            return false;
        }
        var fileName = userFile.value;
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (!(ext == "jpeg" || ext == "jpg" || ext == "pdf")) {
            alert("File type should be jpeg or pdf only ");
            $("#" + id).val("");
            return false;
        }
        var formData = new FormData();
        formData.append("upload", $(obj).prop('files')[0]);
        uploadImageAjaxCall(fileName, formData);
    }


    function uploadImageAjaxCall(strId, formData) {
        var reqData = {};
        reqData.imageName = 'TARIFF_ID';
        reqData.imgFlodLoc = imgFilePath;
        formData.append("reqData", JSON.stringify(reqData));
        $.ajax({
            url: "uploadImage.do",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
            },
            error: function (jqXHR, textStatus, errorMessage) {
            }
        });
    }
    
                function validatePOIName(obj){
           var label= ($('#plan_lbl_name').text()).replace("*","");
           var val=$('#plan_org_name').val();
          if(val.length<3){
              alert(label +' should contain atleast 3 characters');
              $('#plan_org_name').val('');
              return false;
          }
           validateTariffFields(obj,'alphNumeric',label);
       }
        function validatePOIVal(obj){
          var label= ($('#plan_lbl_val').text()).replace("*","");
           var val=$('#plan_service_num').val();
           if(val.length<3){
              alert(label +' should contain atleast 3 characters');
              $('#plan_service_num').val('');
              return false;
          }
          validateTariffFields(obj,'alphNumeric',label);
       }
          </script>
</body>
</html>
