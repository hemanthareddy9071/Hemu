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

            JSONObject objDKYCBSNLCustInfo = null;
            try {
                
                JSONObject bsnlEmpInfo = (JSONObject) request.getAttribute("BSNL_EMP_DATA");
               
                if (bsnlEmpInfo != null) {
                    AppLogger.debug("request DKYC DOcuments BSNL CUST Info::" + bsnlEmpInfo.toString());
                    objDKYCBSNLCustInfo = bsnlEmpInfo;
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
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            
             var dkycDocData = '';
            var dkycBSNLCustData = '<%=objDKYCBSNLCustInfo%>';
            var rmn_no_exist=false;
            var validation_req=false;
            var rmn_valid_done=false;
            var is_mob_valid_req=false;
            var mobile_num_valid_done=false;
            var is_otp_validated=false;
            var alretNumStrtWth = "<s:text name="login.alrt.mobnum.valdation.stwth"/>";
            var validmobilenumber = '<s:text name="helpdesk.alert.validmobilenumber"/>';
            var alretNumsecDigit = "<s:text name="login.alrt.mobnum.valdation.secdegwth"/>";
            var alret11Digit = "<s:text name="login.alrt.mobnum.valdation.11deg"/>";
            var alretmobnoempty = "<s:text name="login.alrt.mobnum.valdation.empty"/>";
            var fileUpldempty = "<s:text name="ekyc.form.wngs.img.empty"/>";
            var fileUpldsize = "<s:text name="ekyc.form.wngs.img.size"/>";
            var fileUpldsizealt = "<s:text name="ekyc.form.wngs.img.size.alt"/>";
            var fileUpldtype = "<s:text name="ekyc.form.wngs.img.type"/>";
            var selTarifpln = "<s:text name="ekyc.form.wngs.trf.sel"/>";
            var llnumEmpty = "<s:text name="ekyc.form.wngs.trf.ll.empty"/>";
            var llAccnumEmpty = "<s:text name="ekyc.form.wngs_trf_llAc_val"/>";
            var fHname = "<s:text name="ekyc.form.wngs_trf_f_h_val"/>";
            var locEmpty = "<s:text name="ekyc.form.wngs.trf.loc.empty"/>";
            var stntNmEmpty = "<s:text name="ekyc.form.wngs.trf.stnt.name.empty"/>";
            var govtValEmpty = "<s:text name="ekyc.form.wngs.trf.govt.Nmempty"/>";
            var govtNameEmpty = "<s:text name="ekyc.form.wngs.trf.govt.org.empty"/>";
            var labStntNm = "<s:text name="ekyc.form.wngs_trf_stnt_name"/>";
            var labStntLoc = "<s:text name="ekyc.form.wngs_trf_stnt_val"/>";
            var labgovtName = "<s:text name="ekyc.form.wngs_trf_govt_name"/>";
            var labgovtVal = "<s:text name="ekyc.form.wngs_trf_govt_val"/>";
            var CSCcode = "<s:text name="ekyc.form.CSCcode"/>";
            var cscFranchAlrt = "<s:text name="ekyc.form.cscFranchAlrt"/>";
            var franLab = "<s:text name="ekyc.form.fran.lab"/>";
            var cscLab = "<s:text name="ekyc.form.csc.lab"/>";
            var hrmsNum = "<s:text name="ekyc.form.hrmsnum"/>";
            var irMsg = "<s:text name="wings.service.ir.msg.form"/>";
            var isdMsg = "<s:text name="wings.service.isd.msg.form"/>";
            var dkycfWinghomephone="<s:text name="dkyc.form.wngs.homephone"/>";
            var dkycfWingworkphone="<s:text name="dkyc.form.wngs.Workphone"/>";
            var dkycfWingfax="<s:text name="dkyc.form.wngs.fax"/>";
            var dkycfWingusercode="<s:text name="dkyc.form.wngs.usercode"/>";
             var dkycfWingMobNum="<s:text name="dkyc.form.wngs.att"/>";
             var bangName="<s:text name="dkyc.form.labl.bang"/>";
             var trailNum="<s:text name="wings.dkyc.trail.ref.no"/>";
             var trailCoupan="<s:text name="wings.dkyc.trail.offr.coupan.no"/>";
             var trailcopAlrt="<s:text name="dkyc.wings.trail.offer.ref.coupon.alrt"/>";
             var trailNumAlrt="<s:text name="dkyc.wings.trail.offer.ref.mob.alrt"/>";
             var trailRMNno="<s:text name="dkyc.wings.trail.offer.ref.rmn.alrt"/>";
             var trailRMNnoEmpty="<s:text name="dkyc.form.trail.rmn.empty"/>";
             var trailRMNnovalid="<s:text name="dkyc.form.trail.rmn.no.validation"/>";
             var trailRMNnomatch="<s:text name="dkyc.form.trail.rmn.not.match"/>";
             var enterValidLLnum="<s:text name="dkyc.form.trail.ll.not.valid.num"/>";
             var emptyLLNum="<s:text name="dkyc.form.trail.ll.empty.num"/>";
             var emptyMOBNum="<s:text name="dkyc.form.trail.MOB.empty.num"/>";
             var emptyOTPfld="<s:text name="dkyc.form.trail.MOB.empty.otp"/>";
             var invalidOTPfld="<s:text name="dkyc.form.trail.MOB.invalid.otp"/>";
             
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
             var tarifAtchTypeUplod="<s:text name="dkyc.form.trif.img.type.valid"/>";
             var tarifimageAlrt="<s:text name="dkyc.form.trif.img.size"/>";
             var lblwtp8name="<s:text name="dkyc.form.wngs_trf.plan.wtp8name"/>";
             var lblwtp8val="<s:text name="dkyc.form.wngs_trf.plan.wtp8val"/>";
             var lblwtp8id="<s:text name="dkyc.form.wngs_trf.plan.wtp8id"/>";
             var lblpophead8="<s:text name="dkyc.form.plan.wtp8.head"/>";
             var lblpopmsg8="<s:text name="dkyc.form.plan.wtp8.body"/>";
             var alrtcircleEmpty="<s:text name="dkyc.form.plan.wtp6a.circle.empty"/>";
             var plzVlidNum="<s:text name="dkyc.form.plan.wtp6a.mobnum.notvalid"/>";
             var plzVlidOTP="<s:text name="dkyc.form.plan.wtp6a.otp.notvalid"/>";
             var trialMobRmn="<s:text name="wings.dkyc.trail.input.rmn.no"/>";
             var trialMobnum="<s:text name="dkyc.trail.plan.MOB.sel.mobno"/>";
             var unableValMobotp="<s:text name="dkyc.trail.plan.MOB.sel.mobno.otp.not.valid"/>";
             var unablemobValidCheck="<s:text name="dkyc.trail.plan.mobno.unablemobValidCheck"/>";
             var validMOBNOTrial="<s:text name="dkyc.wings.trial.plan.mobno.valid"/>";
             var invalidMOBNOTrial="<s:text name="dkyc.wings.trial.plan.mobno.invalid"/>";
             
             
        </script>
        <style>
            tr.spaceUnder>td {
                padding-bottom: 1em;
            }
        </style>
    <body onload="setmetadata();setBSNLCustData();">
        <form name="uploadCafDKycForm" enctype="multipart/form-data">
            <input type="hidden" name="reqData" id="reqData"/>

            <input type="hidden" id="ekycformFieldsMetaData" value="<s:property value="#session.ekycformFieldsMetaData"/>" />
            <input type="hidden" id="kycformFieldsMetaData" value="<s:property value="#session.kycformFieldsMetaData"/>" />
            <input type="hidden" id="fms_ekyc_Stp1Data" value="<s:property value="#session.fms_ekyc_Stp1Data"/>" />
            <input type="hidden" id="FMS_KYC_Cust_Data" value="<s:property value="#session.FMS_KYC_Cust_Data"/>" />
            <input type="hidden" id="AadharResponse" value="<s:property value="#session.AadharResponse"/>" />
            <input type="hidden" id="main_locality" value="<s:property value="#session.main_locality"/>" />
            <input type="hidden" id="sub_locality" value="<s:property value="#session.sub_locality"/>" />
            <input type="hidden" id="DISTRICTS" value="<s:property value="#session.DISTRICTS"/>" />
            <input type="hidden" id="fmsDDData" value="<s:property value="#session.fmsDDData"/>" />
            <input type="hidden" id="EXCHNAGE_DTLS" value="<s:property value="#session.EXCHNAGE_DTLS"/>" />
            <input type="hidden" id="RegMobNum" value="<s:property value="#session.RegMobNum"/>"  /> 
            <input type="hidden" id="regEmail" value="<s:property value="#session.regEmail"/>"  /> 
            <input type="hidden" id="ResponseData" value="<s:property value="#session.ResponseData"/>"  /> 
            <input type="hidden" id="Payment_Status" value="<s:property value="#session.Payment_Status"/>" />
            <input type="hidden" id="DOCS_FILE_PATH" value="<s:property value="#session.DOCS_FILE_PATH"/>" />
            <input type="hidden" name="CYMN_GSM_NO" id="CYMN_GSM_NO" value=""/>
            <input type="hidden" name="age" id="age" value=""/>
            <input type="hidden" name="RMN_NO" id="RMN_NO" value=""/>
<!--            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"><a href='#' ><s:text name="ekyc.form.nav1"/> </a></span>  <span class="larrow">&gt;</span> <span class="bluetxt"><s:text name="ekyc.form.nav2"/></span></div>
                    <h1 class="page_heading"><s:text name="ekyc.form.cust.details"/></h1>
                </div>
            </div>-->
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
            <!--<div class="clear mrg65B"></div>-->
            <div id="page-wrapper" class="row">
                <div class="mask" style="display:none" id="wait">
                    <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                </div>
                <div class="row">
                    <!--<div class="clear mrg65B"></div>-->
                    <div id="content-wrapper" class="mrg0L">
                        <div id="page_header_bar" class="row">
                            <div class="col-xs-12 pad20T">
                                <h1 class="page_heading">Customer  Details </h1>
                            </div>
                        </div>
                        <div class="clear mrg65B"></div>
                        <div class="row" id="page_content_block" >
                            <div class="col-lg-12 pad10A">
                                <div class="clear mrg65B"></div> 
                                <div class="row">
                                    <!--            <div class="col-md-4 form-group">
                                                  <label>Wait list CAF number <font color="red">*</font></label>
                                                  <div>
                                                    <input type="text" class="width70p">
                                                    <button class="primarybt" type="button">Validate</button>
                                                  </div>
                                                </div>-->
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wings.mobno"/> <font color="red">*</font></label>


                                        <input  type="text" id='sel_mob_no' disabled="true" maxlength="20"  class="form-control" />



                                    </div>

                                    <div id="wngsSelBtn" class="col-md-4 text-center pad20T form-group">
                                        <a onclick="fmschooseNmubers('false', '1');" class="primarybt"><s:text name="ekyc.form.wings.mobnosel"/></a>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.hrmsnum"/></label>
                                        <input type="text" class="form-control" id="hrms_number" onkeypress="return isNumberKey(event)" onchange="validateTariffFields(this, 'alphNumeric', hrmsNum);" maxlength="20">
                                    </div>
                                        <div class="col-md-4 form-group" style="display: none" >
                                    <input type="text" class="form-control" id="wings_pin">
                                </div> 

                                    <div class="clear"></div>
                                    <div  id="tariff_plan_dd" class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_dd"/><font color="red">*</font></label>
                                        <select  id="cust_wings_traiff"  name="wingstariff" class="form-control"  size="1">
                                            <option  selected value="WTP6B">Bsnl Employee </option>
                                            <!--                <option value="0">Select from list</option>
                                                            <option value="RegularPlan">Regular Plan </option>
                                                            <option value="GovernmentEmployee">Government employee </option>
                                                            <option value="Student">Student </option>
                                                            <option value="ExistingCustomer">Existing BSNL landline customer </option>
                                                            <option value="Demo">Demo/Test numbers (for BSNL staff only) </option>-->
                                        </select>
                                    </div>
<!--                                    <div class="col-md-4 form-group" id="isdirDiv">
                                        <label>Other facilities</label>
                                        <div class="pad5T">
                                            <input name="International" id="chkISD" type="checkbox" value="ISD">
                                            <label for="ISD">ISD</label>
                                            <input type="checkbox" name="International" id="chkIR" value="IR" >
                                            <label for="IR">International Roaming</label>
                                        </div>
                                    </div>-->
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.csc.lab"/><small class="redtxt"><s:text name="ekyc.form.csc.lab.wrn"/></small></label>
                                        <input  id="cust_bsnl_csc" type="text" class="form-control" maxlength="20"  onchange="validateTariffFields(this, 'alphNumeric', cscLab);" >
                                    </div>
                                    <div class="clear"></div>
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.fran.lab"/> <br>
                                            <small class="redtxt"><s:text name="ekyc.form.fran.lab.wrn"/></small></label>
                                        <input  id="cust_bsnl_franchise"  maxlength="20"  onchange="validateTariffFields(this, 'numeric', franLab);" type="text" class="form-control"   >
                                    </div>
                                        <div id="trail_pack_dtls_bkp" style="display: none">
                                        <div class="col-md-4 form-group" >
                                        <label><s:text name="wings.dkyc.trail.ref.no"/><font color="red">*</font></label>
                                        <input  id="cust_bsnl_trail_mobno_b"  maxlength="20" onkeyup="checkCouponCode();" onchange="validateTariffFields(this, 'numeric', trailNum);" type="text" class="form-control" placeholder="<s:text name="wings.dkyc.trail.ref.no.eg"/>"  >
                                    </div>
                                    <div class="col-md-4 form-group" >
                                        <label><s:text name="wings.dkyc.trail.offr.coupan.no"/><font color="red">*</font><br>  <small class="redtxt"><s:text name="wings.dkyc.trail.offr.coupon.opt"/></small> </label>
                                        <input  id="cust_bsnl_trail_code"  maxlength="20"  onchange="validateTariffFields(this, 'alphNumeric', trailCoupan);isCoupanValid();" type="text" class="form-control"   >
                                    </div>
                                        </div>
                                    <div class="clear"></div>
                                    <div class="row" id="trail_pack_dtls" style="display: none">
                                        <div class="col-md-4 form-group">
                                            &nbsp; <label><s:text name="wings.dkyc.trail.ref.no"/><font color="red">*</font></label>						
                                           &nbsp; <input  id="cust_bsnl_trail_mobno" style="padding:10px" class="col-md-2 form-group" maxlength="5" onkeyup="checkCouponCode();moveCurser();"  onchange="validateTariffFields(this, 'LandlineNumPrefix', trailNum);clrTrailFlags();" type="text"  placeholder="<s:text name="wings.dkyc.trail.ref.no.eg"/>"  >
                                          &nbsp; &nbsp;<input  id="cust_bsnl_trail_mobno2" style="padding:10px" class="col-md-4 form-group"  maxlength="8" onkeyup="checkCouponCode();"  onchange="validateTariffFields(this, 'LandlineNumSufix', trailNum);clrTrailFlags();" type="text"  placeholder="<s:text name="wings.dkyc.trail.ref.no.eg2"/>"  >
                                            &nbsp;<a onclick="validateLLNum();" class="primarybt"><s:text name="dkyc.form.trail.num.valid"/></a>
                                        </div>
                                        <div id="rmn_dtls_div" style="display: none">
                                        <div class="col-md-4 form-group" >
                                            <label><s:text name="wings.dkyc.trail.rmn.no"/><font color="red">*</font></label>
                                            <input readonly id="cust_rmn_no"  maxlength="20"  type="text" class="form-control" >
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><s:text name="wings.dkyc.trail.input.rmn.no"/><font color="red">*</font></label>
                                             <input  id="cust_rmn_no_valid"  maxlength="10"  onchange="validateTariffFields(this, 'mobileNumber', trialMobRmn );checkRMNValid();" type="text" class="form-control" >
                                        </div>
                                        </div>
                                    </div>
                                    <div class="row" id="plan_dtls_div" style="display: none">
                                        <div class="col-md-4 form-group" id="name_plan">
                                            <label id="plan_lbl_name"><s:text name="ekyc.form.wngs_trf_govt_name"/><font color="red">*</font></label>						
                                            <input  id="plan_org_name"  type="text" class="form-control"  onchange="validateTariffFields(this, 'alphNumeric', labgovtName);"  value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group" id="value_plan">  
                                            <label id="plan_lbl_val"><s:text name="ekyc.form.wngs_trf_govt_val"/><font color="red">*</font></label>
                                            <input  id="plan_service_num"  type="text" class="form-control" onchange="validateTariffFields(this, 'alphNumeric', labgovtVal);" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group" id="attach_plan">
                                            <label id="plan_lbl_id"><s:text name="ekyc.form.wngs_trf_govt_id"/><font color="red">*</font></label>
                                            <!--<input id="input_POI_gov" type="file"  class="file" data-show-preview="false"   data-show-remove="false" />-->
                                            <input id="input_POI" type="file" name="userFile" onchange="validateTarifAtachment(this);" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                            <font color="red"><s:text name="ekyc.form.upload.info"/></font>
                                        </div>
                                    </div>
                                    <div class="row" id="free_mob_plan" style="display: none">
                                        <div class="col-md-4 form-group" id="name_plan">
                                            <label id="plan_lbl_name"><s:text name="dkyc.trail.plan.MOB.sel.circle"/><font color="red">*</font></label>						
                                            <select  id="free_zone"  name="select" class="form-control"  size="1">
<!--                                                <option value="0">Select from list</option>
                                                <option value="1">North Zone</option>
                                                <option value="2">East Zone</option>
                                                <option value="3">West Zone</option>
                                                <option value="4">South Zone</option>-->
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group" id="value_plan">  
                                          <label id="plan_lbl_val"><s:text name="dkyc.trail.plan.MOB.sel.mobno"/><font color="red">*</font></label>
                                        <input  id="freeplan_mob_num"  type="text"  onchange="validateTariffFields(this, 'mobileNumber', trialMobnum);" maxlength="11">
                                        <a onclick="validateTrailPlanMobNum();" class="primarybt"><s:text name="dkyc.trail.plan.MOB.val.btn"/></a>
                                        </div>
                                        <div class="col-md-4 form-group" id="otp_mob_plan" style="display: none">
                                            <label id="plan_lbl_id"><s:text name="dkyc.trail.plan.MOB.sel.mobOTP"/><font color="red">*</font></label>
                                             <input  id="freeplan_mob_num_otp"  type="text"  maxlength="6">
                                             <a onclick="validateTrailPlanOTP();" class="primarybt"><s:text name="dkyc.trail.plan.MOB.validotp.btn"/></a>
                                        </div>
                                    </div>
<!--                                    <div class="row" id="plan_3" style="display: none">
                                        <div class="col-md-4 form-group">
                                            <label><font color="red">*</font></label>						
                                            <input  id="plan_inst_name"  type="text" class="form-control" onchange="validateTariffFields(this, 'alphNumeric', labStntNm);"    value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">  
                                            <label><s:text name="ekyc.form.wngs_trf_stnt_val"/><font color="red">*</font></label>
                                            <input  id="plan_loc_name"  type="text" class="form-control" onchange="validateTariffFields(this, 'alphNumeric', labStntLoc);"   value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><s:text name="ekyc.form.wngs_trf_stnt_id"/><font color="red">*</font></label>
                                                                                    <input  id="input_POI_sdnt"  type="file" class="form-control"    value="" maxlength="50">
                                            <input id="input_POI_stnt" type="file" name="userFileS" onchange="validateTarifAtachment(this);" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                            <font color="red"><s:text name="ekyc.form.upload.info"/></font>
                                        </div>
                                    </div>-->
<!--                                    <div class="row" id="plan_4" style="display: none">
                                        <div class="col-md-4 form-group">
                                            <label><s:text name="ekyc.form.wngs_trf_ll_val"/><font color="red">*</font></label>						
                                            <input  id="plan_exst_llno"  type="text" class="form-control" onkeypress="return isNumberKey(event)"  value="" maxlength="12">
                                        </div>
                                        <div class="col-md-4 form-group">  
                                            <label><s:text name="ekyc.form.wngs_trf_llAc_val"/><font color="red">*</font></label>
                                            <input  id="plan_exst_llaccno"  type="text" class="form-control" onchange="validateTariffFields(this, 'alphNumeric', llAccnumEmpty);"   value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><s:text name="ekyc.form.wngs_trf_ll_id"/><font color="red">*</font></label>
                                                                                    <input  id="input_POI_sdnt"  type="file" class="form-control"    value="" maxlength="50">
                                            <input id="input_POI_ll" type="file" name="userFileL" onchange="validateTarifAtachment(this);" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                            <label><font color="red"><s:text name="ekyc.form.upload.info"/></font></label>
                                        </div>

                                    </div>-->
                                    <div class="clear"></div>
                                    <div class="row">
                                        <div class="col-md-12 mrg10B">
                                            <h4 style="color: #008cc7 !important;"><s:text name="ekyc.form.cust.dtls"/></h4>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1a.</span> Title <font color="red">*</font></label>
                                            <select  id="cust_title"  name="select" class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1b.</span><s:text name="ekyc.form.firstname"/><font color="red">*</font></label>
                                            <input  id="first_name" type="text" onChange="formFieldValidationDKYC(this);" class="form-control"   value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1c.</span><s:text name="ekyc.form.lastname"/><font color="red">*</font></label>
                                            <input  id="cust_last_name" type="text" onChange="formFieldValidationDKYC(this);" class="form-control"   value="" maxlength="50" >
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">2.</span> <s:text name="ekyc.form.fathname"/><font color="red">*</font></label>
                                            <input id="f_h_name"  type="text" class="form-control"  onchange="validateTariffFields(this, 'alphabets', fHname);"    value="" maxlength="30">
                                        </div>
                                        <div class="col-md-4 form-group" >
                                            <label><span class="bold">3.</span><s:text name="ekyc.form.gen"/><font color="red">*</font></label>
                                            <div>
                                                <div>
                                                    <input name="gender" type="radio"    id="gender" value='2'   >
                                                    <label for="male"><s:text name="ekyc.form.gen.m"/></label>
                                                    <input type="radio" id="gender"    name="gender" value='1' >
                                                    <label for="female"><s:text name="ekyc.form.gen.f"/></label>
                                                    <input type="radio" id="gender"  name="gender"  value='3'  >
                                                    <label for="other"><s:text name="ekyc.form.gen.o"/></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">4.</span><s:text name="ekyc.form.dob"/> &nbsp;<font color="red">*</font></label>
                                            <input type="text" size="10" id="dob" placeholder="DD/MM/YYYY"  maxlength="11" name="dob" onkeyup="dateFormatter()" class="form-control" placeholder="Date Of Birth" onblur="pickDateAge();" onkeypress="dtAllowedValidation(this);">
                                        </div>
                                        <div class="clear"></div>

                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">5.</span> <s:text name="ekyc.form.usecode"/><font color="red">*</font></label>
                                            <select id="cust_usage_code" onchange="formFieldValidationDKYC(this);" name="select"  size="1"  class="form-control">
                                                <option value="0">Select from list</option>
                                                <option value="1"><s:text name="ekyc.form.usecode.bsns"/> </option>
                                                <option value="2"><s:text name="ekyc.form.usecode.res"/> </option>

                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">6.</span> <s:text name="ekyc.form.pref.comm"/> <font color="red">*</font></label>
                                            <select  id="cust_pref_comm" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label class="ui-state-error" id="pre_label"><div class="divWork" style="display:none;"><span  class="bold">
                                                    </span > Work phone no.<font color="red">*</font></div></label>
                                            <div class="divWork" style="display:none;" id="divWork">
                                                <input  id="cust_pre_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control" value="" maxlength="12" ></div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">7.</span><s:text name="ekyc.form.mobno"/> <font color="red">*</font></label>
                                            <input id="cust_mobile_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"   value="" maxlength="11">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">8.</span>  Email <font color="red">*</font></label>
                                            <input id="email" type="text"  onchange="validateTariffFields(this, 'emailreg', 'Email ');" class="form-control"    value="" maxlength="50">
                                        </div>


                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group" style="display: none">
                                            <label><span class="bold">8a.</span> Connection type<font color="red">*</font></label>
                                            <select  id="cust_con_type" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group" style="display: none" >
                                            <label><span class="bold">8b.</span> Service Type <font color="red">*</font></label>
                                            <select  id="serv_type" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                            </select>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-12 mrg10B">
                                            <h4 style="color: #008cc7 !important;">Installation address details</h4>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9a.</span><s:text name="ekyc.form.hno"/> <font color="red">*</font></label>
                                            <input id="inst_addr_hno" onChange="formFieldValidationDKYC(this);" type="text" class="form-control" onkeyup="isBillAddChkd();"    value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9b.</span><s:text name="ekyc.form.vill"/> <font color="red">*</font></label>
                                            <input id="inst_addr_vill" onChange="formFieldValidationDKYC(this);"  type="text" class="form-control" onkeyup="isBillAddChkd();"  value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9c.</span> <s:text name="ekyc.form.city"/> <font color="red">*</font></label>
                                            <input id="inst_addr_city" onChange="formFieldValidationDKYC(this);"  type="text" class="form-control" onkeyup="isBillAddChkd();" value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9d.</span> <s:text name="ekyc.form.state"/> <font color="red">*</font></label>
                                            <select  id="inst_addr_state" class="form-control" onchange="isBillAddChkd();" size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9e.</span> <s:text name="ekyc.form.dstic"/> <font color="red">*</font></label>
                                            <select  id="inst_addr_district" onchange="isBillAddChkd();" class="form-control" >
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9f.</span> <s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                            <select  id="inst_main_locality" onchange="isBillAddChkd();" class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9g.</span> <s:text name="ekyc.form.subloc"/> <font color="red">*</font></label>
                                            <select  id="inst_sub_locality" onchange="isBillAddChkd();" class="form-control" size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9h.</span> <s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                            <select  id="inst_exchange_code" onchange="isBillAddChkd();"  class="form-control" >
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">9i.</span> <s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                            <input  type="text" id="INSTAL_ADDR_PINCODE" class="form-control"    maxlength="6">
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-12 mrg10B" style="display: none">
                                            <h4 style="color: #008cc7 !important;">Billing account details </h4>
                                        </div>
                                        <div class="col-md-4 form-group" style="display: none">
                                            <label><span class="bold">10a.</span> Bill media <font color="red">*</font></label>
                                            <select id="bill_media1" name="select" class="form-control"  size="1" onChange="billemailMand()">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label class="ui-state-error" >
                                                <div class="BillMedia" id="bill_email_label" style="display: none;"><span class="bold">10b.</span> Billing email address <font color="red">*</font></div>
                                            </label>
                                            <div class="BillMedia" id="bill_email_text" style="display: none;">
                                                <input type="text" class="form-control" id="bill_email1"  value=" " onChange="formFieldValidationDKYC(this);" maxlength="50">
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-12 mrg10B">
                                            <h4 style="color: #008cc7 !important;">Billing address </h4>
                                        </div>
                                        <div class="col-md-12 mrg10B">
                                            <input value="" type="checkbox" id="addr_same_check" onchange="checkSmeInsta()">
                                            <label>Check if same as installation address </label>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10a.</span> <s:text name="ekyc.form.hno"/>   <font color="red">*</font></label>
                                            <input id="bill_addr_house_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10b.</span><s:text name="ekyc.form.vill"/> <font color="red">*</font></label>
                                            <input id="bill_addr_vill" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10c.</span> <s:text name="ekyc.form.city"/> <font color="red">*</font></label>
                                            <input id="bill_addr_city" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10d.</span> <s:text name="ekyc.form.state"/> <font color="red">*</font></label>
                                            <select id="bill_addr_state" name="select"  class="form-control" size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10e.</span> <s:text name="ekyc.form.dstic"/> <font color="red">*</font></label>
                                            <select id="bill_addr_district" name="select" class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10f.</span> <s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                            <select id="bill_main_locality" name="select" class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10g.</span> <s:text name="ekyc.form.subloc"/> <font color="red">*</font></label>
                                            <select id="bill_sub_locality" name="select" class="form-control"  size="1">
                                                <option value="0">Select from list</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10h.</span> <s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                            <select id="bill_exchange_code" name="select" class="form-control"  size="1">
                                                <option value="0">Select from list</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10i.</span> <s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                            <input  type="text" class="form-control" id="BILL_ADDR_PINCODE"      maxlength="6">
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-12 mrg5B" style="display: none">
                                            <table id="parent_table" width="100%" >

                                                <tr>
                                                    <td colspan="3"><h4><s:text name="dekyc.form.BillPOIAndPOA"/></h4></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="ui-state-error"><span class="bold">11.</span> Photo ID Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/PAN card/Aadhaar/other specify</font>) <font color="red">*</font>
                                                </tr>
                                                <tr class="spaceUnder">
                                                    <td colspan="3"><select id="poi_type_1" name="poi_type" class="man" onchange="setPOIAuth();">
                                                            <!--                        <option value="">-----------Select---------</option>
                                                                                <Option value='11'>CGHS/EGHS Card</option>
                                                                                <Option value='12'>Certificate issued by MLA MP GR 'A' Off</option>
                                                                                <Option value='25'>Defence Service Certificate</option>
                                                                                <Option value='7'>Driving Licence</option>
                                                                                <Option value='9'>Govt ID card</option>
                                                                                <Option value='15'>PAN Card</option>
                                                                                <Option value='24'>Paramilitary Force Card</option>
                                                                                <Option value='22'>Passbook of Bank or Post office</option>
                                                                                <Option value='4'>Passport</option>
                                                                                <Option value='13'>Photo ID card by Edu Institute</option>
                                                                                <Option value='10'>Photo ID card with Address</option>
                                                                                <Option value='20'>Photo Id by Postal Dept</option>
                                                                                <Option value='14'>Photo Id by Village Panchayath</option>
                                                                                <Option value='3'>Ration Card with Photo</option>
                                                                                <Option value='19'>Registered Sale or Lease Deed</option>
                                                                                <Option value='21'>Smart Card by CSD Defence</option>
                                                                                <Option value='23'>Unique Identification Authority of India (12Digts)</option>
                                                                                <Option value='6'>Voter ID Card</option>-->
                                                        </select>
                                                        &nbsp; </td>
                                                </tr>
                                                <tr >
                                                    <td colspan="3"><input type="text" value="" placeholder="Document number"  name="poi_number" maxlength="25"  class="sel_man" id="poi_number_1" onchange="checkProofNumber('poi');">
                                                        <input type="text" value="" placeholder="place of issue" name="poi_issue_place"  maxlength="20" class="sel_man" id="poi_issue_place_1" onChange="formFieldValidationDKYC(this);" >
                                                        <select id="poi_issuing_auth_1" name="poi_issuing_auth" class="sel_man"  style="width: 250px;">
                                                            <!--                       <option value=""> Select issuing authority</option>
                                                                                    <Option value='23'>UIDAI</option>
                                                                                    <Option value='23'>Government of India(GOI)</option>
                                                                                    <Option value='23'>State Government</option>-->
                                                        </select>                      
                                                        <input type="text" size="10" value=""  placeholder="Date of issue" class="issuedate sel_man" name="poi_issue_date"  onkeyup="dtAllowedValidation(this);"  id="poi_issue_date_1">
                                                        (DD/MM/YYYY)<font color="red">
                                                        <input type="checkbox" id="poiDateNotFnd" value="1"  name='poiDateNotFnd'  >
                                                        <label for="Itemized">Click if DATE is N/A</label>
                                                        </font> </td>
                                                </tr>
                                                <table id="poa_addr_dtls">
                                                    <tr>
                                                        <td colspan="3" class="ui-state-error"><span class="bold">12.</span> Address Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/Aadhaar/Other</font>) <font color="red">*</font><font id="copy_span">
                                                            <input type="checkbox" id="check_poi_same_1" onchange="copypoiTopoa();">
                                                            <label>Click if same as above</label>
                                                            </font> 
                                                    </tr>
                                                    <tr class="spaceUnder">
                                                        <td colspan="3"><select id="poa_type_1"  name="address_proof" onchange="setPOAAuth();">
                                                                <!--                         <option value="">-----------Select---------</option>
                                                                                    <Option value='5'>Arms Licence</option>
                                                                                    <Option value='11'>CGHS/EGHS Card</option>
                                                                                    <Option value='12'>Certificate issued by MLA MP GR 'A' Off</option>
                                                                                    <Option value='16'>Company Letter</option>
                                                                                    <Option value='25'>Defence Service Certificate</option>
                                                                                    <Option value='2'>Driving Licence</option>
                                                                                    <Option value='9'>Electricity Bill</option>
                                                                                    <Option value='17'>IT assessment order</option>
                                                                                    <Option value='8'>MOU of Company</option>
                                                                                    <Option value='3'>PAN Card</option>
                                                                                    <Option value='24'>Paramilitary Force Card</option>
                                                                                    <Option value='22'>Passbook of Bank or Post office</option>
                                                                                    <Option value='4'>Passport</option>
                                                                                    <Option value='1'>Photo Credit Card</option>
                                                                                    <Option value='10'>Photo ID card with Address</option>
                                                                                    <Option value='13'>Ration Card</option>
                                                                                    <Option value='19'>Registered Sale or Lease Deed</option>
                                                                                    <Option value='26'>Registration certificate of company/Firm</option>
                                                                                    <Option value='21'>Smart Card by CSD Defence</option>
                                                                                    <Option value='14'>Telephone Bill</option>
                                                                                    <Option value='23'>Unique Identification Authority of India(12Digits)</option>
                                                                                    <Option value='18'>Vehicle Reg Certificate</option>
                                                                                    <Option value='6'>Voter ID Card</option>
                                                                                    <Option value='7'>Water Bill</option>-->
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3"><input type="text" value="" placeholder="Document number" name="poa_number" maxlength="25"  class="sel_man" id="poa_number_1" onchange="checkProofNumber('poa');">
                                                            <input type="text" value="" placeholder="place of issue" name="poa_issue_place"  maxlength="20" class="sel_man" id="poa_issue_place_1" onChange="formFieldValidationDKYC(this);" >
                                                            <select id="poa_issuing_auth_1" name="poa_issuing_auth" class="sel_man"  style="width: 250px;">
                                                                <!--                        <option value="">Select issuing authority</option>
                                                                                        <Option value='23'>UIDAI</option>
                                                                                        <Option value='23'>Government of India(GOI)</option>
                                                                                        <Option value='23'>State Government</option>-->
                                                            </select>                      
                                                            <input type="text" size="10" value=""  placeholder="Date of issue" class="issuedate sel_man" name="poa_issue_date"  onkeyup="dtAllowedValidation(this);"  id="poa_issue_date_1">
                                                            (DD/MM/YYYY)<font color="red">
                                                            <input type="checkbox" id="poaDateNotFnd" value="1"  name='poaDateNotFnd'  >
                                                            <label for="Itemized">Click if DATE is N/A</label>
                                                            </font> </td>
                                                    </tr>
                                                </table>


                                            </table>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="clear mrg10B"></div>

                                        <div class="row">
                                            <div class="col-md-12 form-group pad20R">
                                                <a onclick="validateDKYCCafNxt();"  class="primarybt1" ><s:text name="ekyc.form.nxt.btn"/></a>
                                                <a href="Login.do" class="secondarybt"><s:text name="aadhar.cncl.btn"/>  </a>
                                            </div>
                                            <div class="col-md-12"><p class="redtxt"></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="footer">Copyright © 2018 Intense Technologies Limited. All rights reserved.</div>
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
        </form>
        <!--FMSChoosenumbers Popup div starts-->
        <div id="fmsdivchoosenumb" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header "  >
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="btncloseFun();">&times;</button>
                        <h2 class="modal-title">Wings mobile numbers</h2>
                    </div>
                    <div class="modal-body">
                        <div id="step1">
                            <div class="col-md-3 pad10T">
                                <label>Mobile number</label>

                            </div>
                            <div class="col-md-4">   
                                <select id="searchoperator" class="form-control">
                                    <option value="ew"  selected="selected">ends with</option>
                                    <option value="en">does not end with</option>
                                    <option value="bw">begins with</option>
                                    <option value="bn">does not begin with</option>
                                    <option value="cn">contains</option>
                                    <option value="nc">does not contain</option>
                                </select>
                            </div>
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="wings_srch_num"   maxlength="10">            
                            </div>
                            <div class="clear mrg10B"></div>

                            <div class="clear marginbottom10"></div>
                            <div class="form-group pad10L">
                                <button type="submit" class="primarybt" onclick="fetchCYMNNoSearch('1');">Search</button>
                                <button type="submit" class="secondarybt" onclick="clearbtn('1');">Clear</button>
                            </div>
                            <div class="clear marginbottom10"></div>        
                            <div id="wng_num"></div>

                        </div>

                        <div class="clear mrg65B"></div>
                        <button type="submit" class="primarybt mrg10A" onClick="fmsreserveNumbers();">Select number</button>        
                        
                    </div>             

                    <div id="step2" style="display:none;" >    
                        <div class="alert alert-info alert-dismissable" style="display:none;">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">?</button>
                            <h4><strong>Confirmation</strong></h4>
                            <p>Enter received PIN sent to your mobile via. SMS...! (OR) in case SMS not received provide: <span class="redtxt bold">6658952</span></p>
                        </div>
                        <div class="col-md-6"><label>Enter mobile number to generate PIN.</label>
                            <input id="usr_mobileno" name="usr_mobileno" onchange='formFieldValidation(this)' type="text" class="form-control" maxlength="10">            
                        </div>
                        <div class="clear marginbottom10"></div>        

                        <div class="redbg" style="display:none;">Please wait for the SMS to Receive PIN...!</div>
                        <div class="clear mrg25B"></div>        

                        <button class="primarybt" onclick="resrvmoblSubmt();">Submit</button>
                        <button type="submit" class="secondarybt" data-dismiss="modal" >Cancel</button>

                    </div>


                </div>
            </div>
        </div>

        <!--FMSChoosenumbers Popup div ends-->

        <script>
            var titlePreComm = ['cust_title', 'cust_pref_comm', 'cust_pre_type', 'bill_frequency', 'bill_media'];

          
            $("#poi_issue_date").datetimepicker({
                format: 'DD/MM/YYYY',
                maxDate: new Date()
            });
            $("#poa_issue_date").datetimepicker({
                format: 'DD/MM/YYYY',
                maxDate: new Date()
            });
            function setmetadata() {
                setMetaDataforDKYC();
                setTitlePreCommuniDKYC(titlePreComm);
                setFormDD();
                mainLocalitiesEKYCLoad();
                setLoginInfo();
        
            }
            
             function setLoginInfo(){
                 var regMobNo=$('#RegMobNum').val();
                 var regEmail=$('#regEmail').val();
                 if(regMobNo !=""){
                  $('#cust_mobile_no').val(regMobNo).prop('disabled','disabled');   
                 }
                 if(regEmail !=""){
                 $('#email').val(regEmail).prop('disabled','disabled'); 
                 }
                    
             }
            $("#poiDateNotFnd").change(function () {
                if (document.getElementById('poiDateNotFnd').checked) {

                    $("#poi_issue_date").val('01/01/1900');
                } else {
                    $("#poi_issue_date").val('');
                }
            });
            $("#poaDateNotFnd").change(function () {
                if (document.getElementById('poaDateNotFnd').checked) {

                    $("#poa_issue_date").val('01/01/1900');
                } else {
                    $("#poa_issue_date").val('');
                }
            });
            $("#wings_tariff").change(function () {
        //alert("Test");
                if ($(this).val() == "GovernmentEmployee") {
                    $('#popGovernmentEmployee').modal('show');

                }
                if ($(this).val() == "Student") {
                    $('#popStudent').modal('show');
                }
                if ($(this).val() == "ExistingCustomer") {
                    $('#popExistingCustomer').modal('show');
                }
                if ($(this).val() == "RegularPlan") {
                    $("#divStudent").hide();
                    $("#divGovernmentEmployee").hide();
                    $("#divExistingCustomer").hide();
                }
                if ($(this).val() == "Demo") {
                    $("#divStudent").hide();
                    $("#divGovernmentEmployee").hide();
                    $("#divExistingCustomer").hide();
                }
                if ($(this).val() == "0") {
                    $("#divStudent").hide();
                    $("#divGovernmentEmployee").hide();
                    $("#divExistingCustomer").hide();
                }

            });
            $("#btnGovernmentEmployee").click(function () {
                $("#divGovernmentEmployee").show();
                $("#divStudent").hide();
                $("#divExistingCustomer").hide();
            });
            $("#btnStudent").click(function () {
                $("#divStudent").show();
                $("#divGovernmentEmployee").hide();
                $("#divExistingCustomer").hide();
            });
            $("#btnExistingCustomer").click(function () {
                $("#divExistingCustomer").show();
                $("#divGovernmentEmployee").hide();
                $("#divStudent").hide();
            });

       
          
            function copypoiTopoa() {

                if (document.getElementById('check_poi_same').checked) {

                    var poi_type = $("#poi_type option:selected").text();
                    var poi_number = $("#poi_number").val();
                    var poi_issue_place = $("#poi_issue_place").val();
                    var poi_issuing_auth = $("#poi_issuing_auth option:selected").text();
                    var poi_issue_date = $("#poi_issue_date").val();


                    $("#poa_type").find('option[value="' + $("#poi_type").val() + '"]').prop("selected", true).change();
                    $("#poa_number").val(poi_number);
                    $("#poa_issue_place").val(poi_issue_place);

                    $("#poa_issuing_auth").find('option[value="' + $("#poi_issuing_auth").val() + '"]').prop("selected", true).change();
                    $("#poa_issue_date").val(poi_issue_date);
                } else {
                    $("#poa_type").val(0);
                    $("#poa_number").val(" ");
                    $("#poa_issue_place").val("");
                    $("#poa_issuing_auth").val(0);
                    $("#poa_issue_date").val("");


                }
            }
            
            

        </script>
        <!-- Kendo script starts-->

        <script>
            function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }

           
            $('#chkISD').change(function () {
                var chkISD = $('#chkISD').is(':checked');
                var chkIR = $('#chkIR').is(':checked');
                if (chkISD && !chkIR) {
                     $('#chkIR').prop('checked', true);
                    $('#popInternationalRoaming').modal('show');
                    $('#info_msg').text(isdMsg);

                }
                else if (chkIR && chkISD) {
                }

            });
            
            
            $('#chkIR').change(function () {
                var chkISD = $('#chkISD').is(':checked');
                var chkIR = $('#chkIR').is(':checked');
                if (chkIR && !chkISD) {
                    //$('#chkISD').prop('checked', true);
                    $('#popInternationalRoaming').modal('show');
                    $('#info_msg').text(irMsg);
                }uncheck(this);

            });
            function uncheck() {
                $("#chkISD").prop("checked", false);
            }
           

        function setBSNLCustData(){
            dkycBSNLCustData= JSON.parse(dkycBSNLCustData);
            $('#hrms_number').val(dkycBSNLCustData.HRMSNO).prop('disabled',true);
            $('#cust_mobile_no').val(dkycBSNLCustData.MOBILENO).prop('disabled',true);
            if(dkycBSNLCustData.ZONE =="SZ" || dkycBSNLCustData.ZONE=="EZ"){
                $("#cust_pref_comm").val("1");
            }else{
                 $("#cust_pref_comm").val("7");
            }
            $('#cust_pref_comm').prop("disabled",true);
//            var theText="Residential";
//            $("#cust_usage_code option:contains(" + theText + ")").attr('selected', 'selected');
            $("#cust_usage_code").val("2");
            $('#cust_usage_code').prop("disabled",true);
            

        }
            function setPOIAuth(){
                 var poi = $("#poi_type").val();
                 $('#check_poi_same').prop('checked',false).trigger('change');
               $("#poi_issuing_auth").val(poi).attr('disabled', 'disabled');
               if(poi=='23'){
               $('#poi_issue_place').val(bangName);    
               $('#poiDateNotFnd').prop('checked', true).trigger("change");   
               $('#poiDateNotFnd').prop('disabled', true);
               }else{
                $('#poi_issue_place').val('');    
                $('#poiDateNotFnd').prop('checked', false).trigger("change");   
                $('#poiDateNotFnd').prop('disabled', false);
               }
            }
            function setPOAAuth(){
                 var poa = $("#poa_type").val();
               $("#poa_issuing_auth").val(poa).attr('disabled', 'disabled');
               if(poa=='23'){
               $('#poa_issue_place').val(bangName);    
               $('#poaDateNotFnd').prop('checked', true).trigger("change");   
               $('#poaDateNotFnd').prop('disabled', true);
               }else{
               $('#poa_issue_place').val('');    
               $('#poaDateNotFnd').prop('checked', false).trigger("change");   
               $('#poaDateNotFnd').prop('disabled', false);
               }
            }
            function isBillAddChkd(){
                if($('#addr_same_check').is(':checked')){
                   $('#addr_same_check').prop('checked',false).trigger("change"); 
                }
                
            }

 
            
            
           

        </script>
    </body>
</html>
