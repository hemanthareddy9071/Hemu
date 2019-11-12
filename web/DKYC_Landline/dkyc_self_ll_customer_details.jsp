<%@page import="net.sf.json.JSONSerializer"%>
<%@page import="com.in10s.commons.CRSPropertyReader"%>
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
            JSONObject objDKYCFormInfo = null;
            JSONObject objDKYCDocInfo = null;
            JSONObject requestAttach = null;
            
            String mainBilling="";
            String subBilling="";
            CRSPropertyReader msgObj = new CRSPropertyReader();
            try{
             mainBilling = WfPropertyManager.getInstance().getValue("WINGS", "MAIN_BILL_DD");
             subBilling = WfPropertyManager.getInstance().getValue("WINGS", "SUB_BILL_DD");
             
            }catch(Exception e){
            e.printStackTrace();
            }
            try {
                JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_FORM_DATA");
                 requestAttach = (JSONObject) request.getAttribute("DKYC_ATTACHMENT_DATA");
                if (requestPar != null) {
                    AppLogger.debug("request DKYC FORM::" + requestPar.toString());
                    objDKYCFormInfo = requestPar;
                }
                if (requestAttach != null) {
                    AppLogger.debug("request DKYC Land Line DOcuments Info::" + requestAttach.toString());
                    objDKYCDocInfo = requestAttach;
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
            var dkycFormData = '<%=objDKYCFormInfo%>';
            var dkycDocData = '<%=objDKYCDocInfo%>';
            var mainBillingDD = '<%=mainBilling%>';
            var subBillingDD = '<%=subBilling%>';
            var objDocs={};
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
             var alrtInstFil="<s:text name="dkyc.form.labl.inst.addr.fill"/>";
         var dkycSelfLandlineEmail = "<s:text name="dkyc.Self.Landline.billingEmail"/>";
           var dkycSelfPincodeProceed = "<s:text name="dkyc.Self.PinCode.proceed"/>";
            var dkycSelfPincodeStateNotAvi = "<s:text name="dkyc.Self.PinCode.StateNotAvi"/>";
             var dkycSelfPincodeEnter = "<s:text name="dkyc.Self.PinCode.Enter"/>";
           
                 var dkycSelfStateEnter = "<s:text name="dkyc.Self.State"/>";
                 var dkycSelfDistrictList = "<s:text name="dkyc.Self.DistrictList"/>";
                  var dkycSelfStateList = "<s:text name="dkyc.Self.StateList"/>";
                    var dkycSelfBillAccType = "<s:text name="dkyc.Self.billAccType"/>";
                
                 
       
        </script>
        <style>
            tr.spaceUnder>td {
                padding-bottom: 1em;
            }
        </style>
    <body onload="loadDDReq();setmetadata();loadWingsPlan();">
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
            <input type="hidden" id="regPINCode" value="<s:property value="#session.regPINCode"/>"  />
            <input type="hidden" id="ResponseData" value="<s:property value="#session.ResponseData"/>"  /> 
            <input type="hidden" id="Payment_Status" value="<s:property value="#session.Payment_Status"/>" />
            <input type="hidden" id="DOCS_FILE_PATH" value="<s:property value="#session.DOCS_FILE_PATH"/>" />
            <input type="hidden" id="LL_EMAIL_DESC" value="<s:property value="#session.LL_EMAIL_DESC"/>" />
            <input type="hidden" id="inst_category" value="" />
            <input type="hidden" id="bill_category" value="" />
            <input type="hidden" id="std_code" value="" />
            <!--<input type="hidden" id="age" name="age" value="" />-->
           
<!--            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"><a href='#' ><s:text name="ekyc.form.nav1"/> </a></span>  <span class="larrow">&gt;</span> <span class="bluetxt"><s:text name="ekyc.form.nav2"/></span></div>
                    <h1 class="page_heading"><s:text name="ekyc.form.cust.details"/></h1>
                </div>
            </div>-->
            <!--<div class="clear mrg65B"></div>-->
            <div class="header"><i class="logo"></i></div>
<div class="clear"></div>
            <div id="page-wrapper" class="row">

                <div class="row">
                    <div class="mask" style="display:none" id="wait">
                            <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                        </div>
                    <!--<div class="clear mrg65B"></div>-->
                    <div id="content-wrapper" class="mrg0L">
                        <div id="page_header_bar" class="row">
                            <div class="col-xs-12 pad20T">
                                <h1 class="page_heading"><s:text name="dekyc.Digital.CustomerDetails"/></h1>
                            </div>
                        </div>
                        <div class="clear mrg65B"></div>
                        <div class="row" id="page_content_block" >
                            <div class="col-lg-12 pad10A">
                                <!--<div class="clear mrg65B"></div>--> 
                                <div class="row">

                                    <div class="clear"></div>
                                    <div class="row">
                                        
                                        <div class="col-md-12 mrg10B">
                                            <h4 style="color: #008cc7 !important;"><s:text name="ekyc.form.cust.dtls"/></h4>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1a.</span> <s:text name="dekyc.Digital.Title"/> <font color="red">*</font></label>
                                            <select  id="cust_title"  name="select" class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1b.</span><s:text name="dekyc.form.firstname"/><font color="red">*</font></label>
                                            <input  id="first_name" type="text" onChange="formFieldValidationDKYC(this);" class="form-control"   value="" maxlength="50">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">1c.</span><s:text name="dekyc.form.lastname"/><font color="red">*</font></label>
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
                                             <div class="col-md-9 form-group pad0R">
                                            <label ><span class="bold">4a.</span><s:text name="ekyc.form.dob"/> &nbsp;</label>
                                            <input type="text" size="10" id="dob" placeholder="DD/MM/YYYY"  maxlength="10" name="dob" onkeyup="dateFormatter()" class="form-control" placeholder="Date Of Birth"  onkeypress="dtAllowedValidation(this);">
                                             </div>
                                            <div class="col-md-3 form-group" style="display: none">
                                                <label><span class="bold">4b.</span><s:text name="dekyc.form.gen.Age"/> </label>
                                                <input type="text" size="10" id="age" name="age" value="" class="form-control"  disabled  />
                                            </div>
                                        </div>
                                        <div class="clear"></div>

                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">5a.</span> <s:text name="ekyc.form.usecode"/><font color="red">*</font></label>
                                            <select id="cust_usage_code" onchange="formFieldValidationDKYC(this);" name="select"  size="1"  class="form-control">
                                                <option value="0">Select from list</option>
                                                <option value="1"><s:text name="ekyc.form.usecode.bsns"/> </option>
                                                <option value="2"><s:text name="ekyc.form.usecode.res"/> </option>

                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">5b.</span><s:text name="dekyc.form.PrepaidType"/><span class="red">*</span></label>
                                            <select id="cust_pre_type" name="select" class="form-control" size="1">
                                                <option value="0">Select from list</option>
                                                <option value="1">Postpaid</option>
                                                <option value="2">Prepaid</option>
                                                
<!--                                                <option value="2">IPTV Prepaid</option>
                                                <option value="2">Prepaid</option>-->
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">6.</span> <s:text name="ekyc.form.pref.comm"/> <font color="red">*</font></label>
                                            <select  id="cust_pref_comm" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label class="ui-state-error" id="pre_label"><div class="divWork" style="display:none;"><span  class="bold">
                                                    </span ><s:text name="dekyc.form.WorkPhoneNo"/><font color="red">*</font></div></label>
                                            <div class="divWork" style="display:none;" id="divWork">
                                                <input  id="cust_pre_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control" value="" maxlength="12" ></div>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">7.</span><s:text name="ekyc.form.mobno"/> <font color="red">*</font></label>
                                            <input id="cust_mobile_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"   value="" maxlength="11">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">8.</span> <s:text name="dekyc.form.Email"/>  <font color="red">*</font></label>
                                            <input id="email" type="text"  onchange="validateTariffFields(this, 'emailreg', 'Email ');" class="form-control"    value="" maxlength="50">
                                        </div>


                                            <div class="clear"></div>
                                            <div class="col-md-4 form-group" style="display: none">
                                                <label><span class="bold">8a.</span>  <s:text name="dekyc.form.ConnType"/><font color="red">*</font></label>
                                                <select  id="cust_con_type" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                                </select>
                                            </div>
                                            <div class="col-md-4 form-group" style="display: none" >
                                                <label><span class="bold">8b.</span>  <s:text name="dekyc.form.ServiceType"/> <font color="red">*</font></label>
                                                <select  id="serv_type" onChange="formFieldValidationDKYC(this);" class="form-control" name="select"  size="1">
                                                </select>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="col-md-12 mrg10B">
                                                <h4 style="color: #008cc7 !important;"><s:text name="dekyc.form.InstallAddDetails"/></h4>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9a.</span> <s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                                <input  type="text" id="INSTAL_ADDR_PINCODE" class="form-control" onchange="fetchStatesFrmPin(this);"  onkeyup="isBillAddChkd();"   maxlength="6">
                                            </div>
                                            
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9b.</span><s:text name="ekyc.form.hno"/> <font color="red">*</font></label>
                                                <input id="inst_addr_hno" onChange="formFieldValidationDKYC(this);" type="text" class="form-control" onkeyup="isBillAddChkd();"   value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9c.</span><s:text name="ekyc.form.vill"/> <font color="red">*</font></label>
                                                <input id="inst_addr_vill" onChange="formFieldValidationDKYC(this);"  type="text" class="form-control"onkeyup="isBillAddChkd();"  value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9d.</span><s:text name="dkyc.ll.form.add.dtls"/> <font color="red">*</font></label>
                                                <input id="inst_addr_add_dtls"   type="text" class="form-control" onkeyup="isBillAddChkd();" value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9e.</span><s:text name="dkyc.ll.form.landmark"/> </label>
                                                <input id="inst_addr_landmark"   type="text" class="form-control" onkeyup="isBillAddChkd();" value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9f.</span> <s:text name="ekyc.form.city"/> <font color="red">*</font></label>
                                                <input id="inst_addr_city" onChange="formFieldValidationDKYC(this);"  type="text" class="form-control" onkeyup="isBillAddChkd();" value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9g.</span> <s:text name="ekyc.form.state"/> <font color="red">*</font></label>
                                                <select  id="inst_addr_state" onchange="isBillAddChkd();" class="form-control" size="1">
                                                </select>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9h.</span> <s:text name="ekyc.form.dstic"/> <font color="red">*</font></label>
                                                <select  id="inst_addr_district" onchange="isBillAddChkd();" class="form-control" >
                                                </select>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9i.</span> <s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                                <select  id="inst_main_locality" onchange="isBillAddChkd();" class="form-control"  size="1">
                                                </select>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9j.</span> <s:text name="ekyc.form.subloc"/> <font color="red">*</font></label>
                                                <select  id="inst_sub_locality" onchange="isBillAddChkd();" class="form-control" size="1">
                                                </select>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">9k.</span> <s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                                <select  id="inst_exchange_code"  onchange="isBillAddChkd();" class="form-control" >
                                                </select>
                                            </div>
                                            <div class="col-md-4 form-group" >
                                            <label><span class="bold">9l.</span><s:text name="ekyc.form.gstcode"/>   <font color="red">*</font></label>
                                            <select  name="INST_GST_STATE_CODE"   id="INST_GST_STATE_CODE" class="form-control">
                                                <option value="0">Select from list</option>
                                            </select>
                                          </div>
                                            
                                           
                                           <div class="clear"></div>
                                            <div class="col-md-12 mrg10B" >
                                            <h4 style="color: #008cc7 !important;"><s:text name="dekyc.form.gen.BillAcDetails"/> </h4>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10a.</span> <s:text name="dekyc.form.BillingAccNo"/> <span class="red">*</span></label>
                                            <select  name="bill_acc_no" class="form-control"  id="bill_acc_no">
                                                <option value="0">Select from list</option>
                                                <option value="1">New</option>
                                                <option value="2">Existing</option>
                                            </select>
                                        </div>
                                        <div class="divExisting col-md-4 form-group" style="display:none;">
                                            <label> <s:text name="dekyc.form.ExistingAccNo"/> <span class="red">*</span></label>
                                            <input  type="text" class="form-control"   value=" " maxlength="50"></div>

                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10b.</span><s:text name="dekyc.form.BillAccType"/>    <span class="red">*</span></label>
                                            <select id="bill_acc_type" name="select" onchange="setSubBill();" class="form-control" size="1">
<!--                                                <option value="0">Select from list</option>
                                                <option value="1">Individual</option>
                                                <option value="2">Business</option>-->
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10c.</span><s:text name="dekyc.form.BillAccSubType"/>   <span class="red">*</span></label>
                                            <select id="bill_acc_sub_type" name="select" class="form-control" size="1">
<!--                                                <option value="0">Select from list</option>
                                                <option value="1">Others</option>-->
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">10d.</span><s:text name="dekyc.form.BillingFre"/>   <span class="red">*</span></label>
                                            <select id="bill_frequency" name="select" class="form-control" size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label id="bill_email_label" ><span class="bold">10e.</span><s:text name="dekyc.form.BillMedia"/>  <span class="red">*</span></label>
                                            <select id="bill_media" name="select" class="form-control" size="1" onchange="checkBillMedia();" >
                                                <option value="0">Select from list</option>
                                                <optgroup label="Go Green">
                                                <option value="1">Email</option>
                                                </optgroup>
                                                 <optgroup label="Print">
                                                <option value="2">Print Bill On Paper</option>
                                                <option value="3">Paper and Email</option>
                                                 </optgroup>
                                            </select>
                                            <b><font id="labl_ofer" color="green"></font></b>
                                        </div>

                                        <div id="billMedia_email" class="BillMedia form-group col-md-4" style="display:none;">
                                            <label  id="bill_email_text"><span class="bold">10f.</span> <s:text name="dekyc.form.BillEmailAddr"/>  <span class="red">*</span></label>
                                            <input id ="bill_email" type="text" class="form-control"  value="" onchange="validateTariffFields(this, 'emailreg', 'Bill Email ');" maxlength="50"></div>
                                        <div class="col-md-4 form-group">
                                                <label><span class="bold">10g.</span> <s:text name="dkyc.ll.form.gstin"/> </label>
                                                <input  type="text" id="BILL_GSTIN" class="form-control" onchange="validateTariffFields(this, 'GSTIN', 'GST Number ');"   maxlength="15">
                                            </div>

                                    
                                    <div class="clear"></div>
                                    <div class="col-md-12 mrg10B">
                                        <h4 style="color: #008cc7 !important;"><s:text name="dekyc.form.BillingAddress"/> </h4>
                                    </div>
                                        <div class="col-md-12 mrg10B">
                                            <input value="" type="checkbox" id="addr_same_check" onchange="checkSmeInstaLL();">
                                            <label> <s:text name="dekyc.form.BillCheckInsAdd"/></label>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11a.</span> <s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                            <input  type="text" class="form-control" id="BILL_ADDR_PINCODE" onchange="fetchStatesFrmPin(this);"     maxlength="6">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11b.</span> <s:text name="ekyc.form.hno"/>   <font color="red">*</font></label>
                                            <input id="bill_addr_house_no" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                        </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">11c.</span><s:text name="ekyc.form.vill"/> <font color="red">*</font></label>
                                                <input id="bill_addr_vill" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">11d.</span><s:text name="dkyc.ll.form.add.dtls"/> <font color="red">*</font></label>
                                                <input id="bill_addr_add_dtls"   type="text" class="form-control"  value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">11e.</span><s:text name="dkyc.ll.form.landmark"/> </label>
                                                <input id="bill_addr_landmark"   type="text" class="form-control"  value="" maxlength="50">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">11f.</span> <s:text name="ekyc.form.city"/> <font color="red">*</font></label>
                                                <input id="bill_addr_city" onChange="formFieldValidationDKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                            </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11g.</span> <s:text name="ekyc.form.state"/> <font color="red">*</font></label>
                                            <select id="bill_addr_state"   class="form-control" size="1">
                                            </select>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11h.</span> <s:text name="ekyc.form.dstic"/> <font color="red">*</font></label>
                                            <select id="bill_addr_district"  class="form-control"  size="1">
                                            </select>
                                        </div>
                                            <!--<div class="clear"></div>-->
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11i.</span> <s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                            <select id="bill_main_locality"  class="form-control"  size="1">
                                            </select>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="col-md-4 form-group">
                                            <label><span class="bold">11j.</span> <s:text name="ekyc.form.subloc"/> <font color="red">*</font></label>
                                            <select id="bill_sub_locality"  class="form-control"  size="1">
                                                <!--<option value="0">Select from list</option>-->
                                            </select>
                                        </div>
                                            <div class="col-md-4 form-group">
                                                <label><span class="bold">11k.</span> <s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                                <select id="bill_exchange_code" name="select" class="form-control"  size="1">
                                                    <!--<option value="0">Select from list</option>-->
                                                </select>
                                            </div>
                                                <div class="col-md-4 form-group" >
                                            <label><span class="bold">11l.</span><s:text name="ekyc.form.gstcode"/>   <font color="red">*</font></label>
                                            <select  name="BILL_GST_STATE_CODE"   id="BILL_GST_STATE_CODE" class="form-control">
                                                <option value="0">Select from list</option>
                                            </select>
                                          </div>
                                                
                                      <div class="clear"></div>
                                        <div class="col-md-12 mrg5B">
                                            <table id="parent_table" width="100%" >

                                                <tr>
                                                    <td colspan="3"><h4><s:text name="dekyc.form.BillPOIAndPOA"/> </h4></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="ui-state-error"><span class="bold">12.</span><s:text name="dekyc.form.BillPhoteIdAndType"/> (<font class="sublabels"><s:text name="dekyc.form.BillDrivLicAndother"/></font>) <font color="red">*</font>
                                                </tr>
                                                <tr class="spaceUnder">
                                                    <td colspan="3"><select id="poi_type" name="poi_type" class="man" onchange="setPOIAuth();">
                                                        </select>
                                                        &nbsp; </td>
                                                </tr>
                                                <tr >
                                                    <td colspan="3"><input type="text" value="" placeholder="Document number"  name="poi_number" maxlength="25" onchange="checkProofNumber('poi');" class="sel_man" id="poi_number">
                                                        <input type="text" value="" placeholder="place of issue" name="poi_issue_place"  maxlength="20" class="sel_man" id="poi_issue_place" onChange="formFieldValidationDKYC(this);" >
                                                        <select id="poi_issuing_auth" name="poi_issuing_auth" class="sel_man"  style="width: 250px;">
                                                          </select>                      
                                                        <input type="text" size="10" value=""  placeholder="Date of issue" class="issuedate sel_man" name="poi_issue_date"  onkeyup="dtAllowedValidation(this);"  id="poi_issue_date">
                                                        (DD/MM/YYYY)<font color="red">
                                                        <input type="checkbox" id="poiDateNotFnd" value="1"  name='poiDateNotFnd'  >
                                                        <label for="Itemized"><s:text name="dekyc.form.BillCheckDate"/> </label>
                                                        </font> </td>
                                                </tr>
                                                <table id="poa_addr_dtls">
                                                    <tr>
                                                        <td colspan="3" class="ui-state-error"><span class="bold">13.</span> <s:text name="dekyc.form.BillAddProfType"/> (<font class="sublabels"><s:text name="dekyc.form.BillAddPassportAother"/> </font>) <font color="red">*</font><font id="copy_span">
                                                            <input type="checkbox" id="check_poi_same" onchange="copypoiTopoa();">
                                                            <label><s:text name="dekyc.form.BillClickSame"/> </label>
                                                            </font> 
                                                    </tr>
                                                    <tr class="spaceUnder">
                                                        <td colspan="3"><select id="poa_type"  name="address_proof" onchange="setPOAAuth();">
               
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3"><input type="text" value="" placeholder="Document number" name="poa_number" maxlength="25"  class="sel_man" id="poa_number"  onchange="checkProofNumber('poa');" >
                                                            <input type="text" value="" placeholder="place of issue" name="poa_issue_place"  maxlength="20" class="sel_man" id="poa_issue_place" onChange="formFieldValidationDKYC(this);" >
                                                            <select id="poa_issuing_auth" name="poa_issuing_auth" class="sel_man"  style="width: 250px;">
                                                           </select>                      
                                                            <input type="text" size="10" value=""  placeholder="Date of issue" class="issuedate sel_man" name="poa_issue_date"  onkeyup="dtAllowedValidation(this);"  id="poa_issue_date">
                                                            (DD/MM/YYYY)<font color="red">
                                                            <input type="checkbox" id="poaDateNotFnd" value="1"  name='poaDateNotFnd'  >
                                                            <label for="Itemized"><s:text name="dekyc.form.BillClickDateIsNA"/> </label>
                                                            </font> </td>
                                                    </tr>
                                                </table>


                                            </table>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="clear mrg10B"></div>

                                        <div class="row">
                                            <div class="col-md-12 form-group pad20R">
                                                <a onclick="validateDKYCLLCafNxt();"  class="primarybt1" ><s:text name="ekyc.form.nxt.btn"/></a>
                                                <!--<a onclick="back2DKYCDocs();" class="secondarybt"><s:text name="aadhar.bck.btn"/>  </a>-->
                                                <a onclick="goToHome();" class="secondarybt">Cancel</a>
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
            <div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>

            <div class="modal fade" id="cancelConf" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header orange">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                            <h4 class="modal-title"><s:text name="dekyc.Digital.Confirmation"/></h4>
                        </div>
                        <div class="modal-body">
                            <p><s:text name="dekyc.form.DoUProcess"/></p>
                        </div>
                        <div class="modal-footer">
                            <button id="btnStudent" type="button" class="primarybt" data-dismiss="modal" onclick="confCancel()"><s:text name="dekyc.Digital.Submit"/></button>
                            <button type="button" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Close"/></button>
                        </div>
                    </div>
                </div>
            </div>
           
        </form>


        <script>
            var titlePreComm = ['cust_title', 'cust_pref_comm', 'bill_frequency'];
            var mindate = new Date().getFullYear() -100;
            $('#labl_ofer').text($('#LL_EMAIL_DESC').val());

            $(document).ready(function () {
//            $("#dob").datetimepicker({
//                format: 'DD/MM/YYYY',
//                minDate : '01/01/'+mindate
//                          
//            });            
          
            $("#poi_issue_date").datetimepicker({
                format: 'DD/MM/YYYY',
                maxDate: new Date()
            });
      
        
            $("#poa_issue_date").datetimepicker({
                format: 'DD/MM/YYYY',
                maxDate: new Date()
            });
       
            $("#inst_main_locality").kendoDropDownList({
                filter: "contains"
            });
            $("#inst_sub_locality").kendoDropDownList({
                filter: "contains"
            });
             $("#bill_main_locality").kendoDropDownList({
                filter: "contains"
            });
            $("#bill_sub_locality").kendoDropDownList({
                filter: "contains"
            });
            $('#bill_acc_no').val('1').prop('disabled',true);
            
            
             });
             
            function setmetadata() {
                setMetaDataforDKYC();
                setTitlePreCommuniDKYC(titlePreComm);
                setFormDD();
                loadBillingTypesDkycLL();
                setLoginInfo();
                if (!(dkycFormData == 'null')) {
                    setDKYCCustData();
                }
                if (!(dkycDocData == 'null')) {
                    setDKYCDocData();
                    //setStatesDD();
                }
                try {
                    var regUserResp = $('#ResponseData').val();
                    var regUserData = {};
                    regUserData = JSON.parse(regUserResp);
                    if (regUserData.EMAIL != "") {
                        $('#email').val(regUserData.EMAIL).attr("disabled", "disabled");
                    }
                    } catch (e) {
                    }
                    //$('#inst_addr_state').children().remove();
                    //$('#bill_addr_state').children().remove();
                    $('#bill_media').val('1').trigger('change').prop('disabled',true);
                    $('#cust_pre_type').val('1').prop('disabled',true);
//                    $('#bill_acc_sub_type').val('1').prop('disabled',true);
//                    $('#bill_acc_type').val('1').prop('disabled',true);
                    $('#bill_frequency').val('1').prop('disabled',true);
                    //$("#bill_acc_type option[value='24']").remove();
//                   $('#INSTAL_ADDR_PINCODE').val($('#regPINCode').val()).prop('disabled',true);  
                   $('#INSTAL_ADDR_PINCODE').val($('#regPINCode').val()).trigger('change');  
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
          
            function loadDDReq(){
                mainBillingDD= JSON.parse(mainBillingDD);
                subBillingDD=JSON.parse(subBillingDD);
                objDocs= JSON.parse(dkycDocData);
                var zoneCode= objDocs.zone;
                $('#bill_acc_type').children().remove();
                $('#bill_acc_type').append('<option value="0">Select from list</option>');
                $('#bill_acc_type').append('<option value="'+mainBillingDD[zoneCode].I+'">Individual</option>');
                $('#bill_acc_type').append('<option value="'+mainBillingDD[zoneCode].B+'">Business</option>');
              
            }
 
            function setSubBill(){
                var mainBillText=$('#bill_acc_type option:selected').text();
                var mainBill=$('#bill_acc_type').val();
                var zoneCode= objDocs.zone;
                var operator="";
                   if(mainBill != 0){
                       if(mainBillText.toUpperCase()=='INDIVIDUAL'){
                         operator= zoneCode+'_I'; 
                       }else{
                           operator= zoneCode+'_B';
                       }
                   }else{
                       alert("please select Bill account type");
                   }
                $('#bill_acc_sub_type').children().remove();
                $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
                $('#bill_acc_sub_type').append('<option seleacted value="'+subBillingDD[operator]+'">Others</option>');
                $('#bill_acc_sub_type').val(subBillingDD[operator]).prop('disabled',true);
            }
          
            function checkPlanReq(){   
                    
                    var regUserResp = $('#ResponseData').val();
                    var regUserData = {};
                      
                    if(regUserResp !=""){
                    regUserData = JSON.parse(regUserResp);
                   if(regUserData.STATUS.toUpperCase()=="SUCCESS"){
                       
                       if(regUserData.TARIFF_PLAN_ID !="" && regUserData.TARIFF_PLAN_ID !="WTP1" ){
                           $('select[name="wingstariff"]').find('option[value="'+regUserData.TARIFF_PLAN_ID+'"]').attr("selected",true);
                             confDeclaraion();
                           $('#cust_wings_traiff').attr('disabled', 'disabled');
                       }else{
                     $('select[name="wingstariff"]').find('option[value="WTP1"]').attr("selected",true);  
                      $('#cust_wings_traiff').attr('disabled', 'disabled');  
                  }
                       
                   }
                    if(regUserData.ROW_DATA !='undefined'||regUserData.ROW_DATA != ""){
                        if(regUserData.ROW_DATA.WINGS_PRE_NO !='undefined' || regUserData.ROW_DATA.WINGS_PRE_NO !=""){
                            if((regUserData.ROW_DATA.WINGS_PRE_NO !="") && (regUserData.ROW_DATA.WINGS_PRE_PIN !="")){
                            $('#sel_mob_no').val(regUserData.ROW_DATA.WINGS_PRE_NO);
                            $('#wngsSelBtn').hide();
                            $('select[name="wingstariff"]').find('option[value="WTP1"]').attr("selected",true);
                            $('#cust_wings_traiff').attr('disabled', 'disabled');
                            $('#wings_pin').val(regUserData.ROW_DATA.WINGS_PRE_PIN);
                            }else{
                                 $('#wings_pin').val('');    
                                 }
                        }else{
                             $('#wings_pin').val('');    
                             }
                    }else{$('#wings_pin').val('');}
                    }else{
                          $('#wings_pin').val('');  
                        }
                }
                
            function copypoiTopoa() {

                if (document.getElementById('check_poi_same').checked) {

                    var poi_type = $("#poi_type").val();
                     if (poi_type == "11" || poi_type == "12" || poi_type == "25" || poi_type == "2" || poi_type == "24" || poi_type == "22" || poi_type == "10" || poi_type == "19" || poi_type == "21" || poi_type == "6" || poi_type == "23" || poi_type == "4") {
                    } else {
                         $("#check_poi_same").prop("checked", false);
                        alert('This POI type is not considered as POA');
                        return false;
                    }
                    var poi_number = $("#poi_number").val();
                    var poi_issue_place = $("#poi_issue_place").val();
                    var poi_issuing_auth = $("#poi_issuing_auth option:selected").text();
                    var poi_issue_date = $("#poi_issue_date").val();
                    var poiDateNotFnd = $("#poiDateNotFnd").prop('checked');


                    $("#poa_type").find('option[value="' + $("#poi_type").val() + '"]').prop("selected", true).change();
                    $("#poa_number").val(poi_number);
                    $("#poa_issue_place").val(poi_issue_place);

                    $("#poa_issuing_auth").find('option[value="' + $("#poi_issuing_auth").val() + '"]').prop("selected", true).change();
                    $("#poa_issue_date").val(poi_issue_date);
                    $("#poaDateNotFnd").prop('checked',poiDateNotFnd);
                } else {
                    $("#poa_type").val(0);
                    $("#poa_number").val(" ");
                    $("#poa_issue_place").val("");
                    $("#poa_issuing_auth").val(0);
                    $("#poa_issue_date").val("");
                    $("#poaDateNotFnd").prop('checked',false);


                }
            }
            
            function validateTarifAtachment(obj) {
                var id=obj.getAttribute('id');
                var userFile = document.getElementById(id);
                   if (userFile.files[0].size > 102400 ) {
                      alert("upload size should me less than"+102400/1024+"KB");
                        $("#"+id).val("");
                      return false;
                   }
                var fileName = userFile.value;
                var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
                   if (!(ext == "jpeg" || ext == "jpg" || ext == "pdf" )){
                     alert("File type should be jpeg or pdf only ");
                     $("#"+id).val("");
                    return false;
                }
            }
        </script>

        <script>
            function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }
            $(function() {
                $('#first_name').on('keypress', function(e) {
                    if (e.which == 32 && !this.value.length)
                        return false;
                });
                $('#cust_last_name').on('keypress', function(e) {
                    if (e.which == 32 && !this.value.length)
                        return false;
                });
                $('#f_h_name').on('keypress', function(e) {
                    if (e.which == 32 && !this.value.length)
                        return false;
                });
  
            });
            
            function setStatesDD(){
        try{
        
        var statesArrFrmPin=dkycDocData.STATES;
      
        $('#inst_addr_state').children().remove();
                    $('#inst_addr_state').append('<option value="0">Select from list</option>');
                    for(var i=0;i<statesArrFrmPin.length;i++){
                    $('#inst_addr_state').append(new Option(statesArrFrmPin[i].DD_VALUE, statesArrFrmPin[i].DD_CODE));
     
                    }

    }catch(e){}
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
