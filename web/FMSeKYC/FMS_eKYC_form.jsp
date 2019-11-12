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
            int IRAmount= Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_IR"));
            int ISDAmount= Integer.parseInt(WfPropertyManager.getInstance().getValue("MISC", "WINGS_ISD"));
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
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/fileinput.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        
        <script>
             var isdAmt='<%=ISDAmount%>';
             var irAmt='<%=IRAmount%>';
             var alretNumStrtWth ="<s:text name="login.alrt.mobnum.valdation.stwth"/>";
             var validmobilenumber = '<s:text name="helpdesk.alert.validmobilenumber"/>';
             var alretNumsecDigit="<s:text name="login.alrt.mobnum.valdation.secdegwth"/>";
             var alret11Digit="<s:text name="login.alrt.mobnum.valdation.11deg"/>";
             var alretmobnoempty="<s:text name="login.alrt.mobnum.valdation.empty"/>";
             var fileUpldempty="<s:text name="ekyc.form.wngs.img.empty"/>";
             var fileUpldsize="<s:text name="ekyc.form.wngs.img.size"/>";
             var fileUpldsizealt="<s:text name="ekyc.form.wngs.img.size.alt"/>";
             var fileUpldtype="<s:text name="ekyc.form.wngs.img.type"/>";
             var selTarifpln="<s:text name="ekyc.form.wngs.trf.sel"/>";
             var llnumEmpty="<s:text name="ekyc.form.wngs.trf.ll.empty"/>";
             var llAccnumEmpty="<s:text name="ekyc.form.wngs_trf_llAc_val"/>";
             var locEmpty="<s:text name="ekyc.form.wngs.trf.loc.empty"/>";
             var stntNmEmpty="<s:text name="ekyc.form.wngs.trf.stnt.name.empty"/>";
             var govtValEmpty="<s:text name="ekyc.form.wngs.trf.govt.Nmempty"/>";
             var govtNameEmpty="<s:text name="ekyc.form.wngs.trf.govt.org.empty"/>";
             var labStntNm="<s:text name="ekyc.form.wngs_trf_stnt_name"/>";
             var labStntLoc="<s:text name="ekyc.form.wngs_trf_stnt_val"/>";
             var labgovtName="<s:text name="ekyc.form.wngs_trf_govt_name"/>";
             var labgovtVal="<s:text name="ekyc.form.wngs_trf_govt_val"/>";
             var CSCcode="<s:text name="ekyc.form.CSCcode"/>";
             var cscFranchAlrt="<s:text name="ekyc.form.cscFranchAlrt"/>";
             var franLab="<s:text name="ekyc.form.fran.lab"/>";
             var cscLab="<s:text name="ekyc.form.csc.lab"/>";
             var hrmsNum="<s:text name="ekyc.form.hrmsnum"/>";
             var irMsg="<s:text name="wings.service.ir.msg.form"/>";
             var isdMsg="<s:text name="wings.service.isd.msg.form"/>";
        </script>
    </head>
    <body onload="setmetadata();loadWingsPlan();">
        <!--loadWingsPlan();-->
        <form name="uploadCafeKycForm" enctype="multipart/form-data">
            <input type="hidden" name="reqData" id="reqData"/>

            <input type="hidden" id="ekycformFieldsMetaData" value="<s:property value="#session.ekycformFieldsMetaData"/>" />
            <input type="hidden" id="fms_ekyc_Stp1Data" value="<s:property value="#session.fms_ekyc_Stp1Data"/>" />
            <input type="hidden" id="FMS_KYC_Cust_Data" value="<s:property value="#session.FMS_KYC_Cust_Data"/>" />
            <input type="hidden" id="AadharResponse" value="<s:property value="#session.AadharResponse"/>" />
            <input type="hidden" id="main_locality" value="<s:property value="#session.main_locality"/>" />
            <input type="hidden" id="sub_locality" value="<s:property value="#session.sub_locality"/>" />
            <input type="hidden" id="DISTRICTS" value="<s:property value="#session.DISTRICTS"/>" />
            <input type="hidden" id="fmsDDData" value="<s:property value="#session.fmsDDData"/>" />
            <input type="hidden" id="EXCHNAGE_DTLS" value="<s:property value="#session.EXCHNAGE_DTLS"/>" />
            <input type="hidden" id="RegMobNum" value="<s:property value="#session.RegMobNum"/>"  /> 
            <input type="hidden" id="ResponseData" value="<s:property value="#session.ResponseData"/>"  /> 
            <input type="hidden" id="Payment_Status" value="<s:property value="#session.Payment_Status"/>" />
            <input type="hidden" name="CYMN_GSM_NO" id="CYMN_GSM_NO" value=""/>
        
        
      
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"><a href='#' ><s:text name="ekyc.form.nav1"/> </a></span>  <span class="larrow">&gt;</span> <span class="bluetxt"><s:text name="ekyc.form.nav2"/></span></div>
                    <h1 class="page_heading"><s:text name="ekyc.form.cust.details"/></h1>
                </div>
            </div>

            <div class="clear mrg65B"></div>
            <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="mask" style="display:none" id="waitform">
                        <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                    </div>
                    <div class="row">
                        <div class="clear mrg25B"></div>
                        <div class="col-md-12 tablepad">

                            <div class="picBlock" style="display: none" ><img src="" id="aadhar_photo" class="photobr" height="80%" width="100%"></div>
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <!--<div class="col-md-4">-->
                                    <label><s:text name="ekyc.form.wings.mobno"/> <font color="red">*</font></label>
                                    <input  type="text" id='sel_mob_no' disabled="true" maxlength="20"  class="form-control" />
                                </div>
                                <div id="wngsSelBtn" class="col-md-3 text-center pad20T form-group">
                                    <a onClick="fmschooseNmubers('false', '1');"  class="primarybt" ><s:text name="ekyc.form.wings.mobnosel"/></a>
                                </div>
                                <div class="col-md-4 form-group" >
                                    <label><s:text name="ekyc.form.hrmsnum"/></label>
                                    <input type="text" class="form-control" id="hrms_number" onkeypress="return isNumberKey(event)" onchange="validateTariffFields(this,'alphNumeric',hrmsNum);" >
                                </div> 
                                    <div class="col-md-4 form-group" style="display: none" >
                                    <input type="text" class="form-control" id="wings_pin">
                                </div> 
                            </div>
                                <div class="row">
                                    <div id="tariff_plan_dd" class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_dd"/><font color="red">*</font></label>
                                        <select  id="cust_wings_traiff" onchange="toggleFields();" name="wingstariff" class="form-control"  size="1">
<!--                                            <option value="0">Select from list</option>
                                            <option value="1">Regular Plan </option>
                                            <option value="2">Government employee </option>
                                            <option value="3">Student </option>
                                            <option value="4">Existing BSNL landline customer </option>-->
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group" >
                                        <label>Other facilities</label>
                                        <div class="pad5T">
                                            <input name="International" id="chkISD" type="checkbox" value="ISD">
                                            <label for="ISD">ISD</label>
                                            <input type="checkbox" name="International" id="chkIR" value="IR" >
                                            <label for="IR">International Roaming</label>
                                        </div>
                                    </div>
                 
                                </div>
                            
                            
                            
                            </div>
                    </div>
                </div>     
                            
                            
                            
                            
                                <div class="row" id="plan_2" style="display: none">
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_govt_name"/><font color="red">*</font></label>						
                                        <input  id="plan_org_name"  type="text" class="form-control"  onchange="validateTariffFields(this,'alphNumeric',labgovtName);"  value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">  
                                        <label><s:text name="ekyc.form.wngs_trf_govt_val"/><font color="red">*</font></label>
                                        <input  id="plan_service_num"  type="text" class="form-control" onchange="validateTariffFields(this,'alphNumeric',labgovtVal);" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_govt_id"/><font color="red">*</font></label>
                                        <!--<input id="input_POI_gov" type="file"  class="file" data-show-preview="false"   data-show-remove="false" />-->
                                       <input id="input_POI_govt" type="file" name="userFile" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                       <font color="red"><s:text name="ekyc.form.upload.info"/></font>
                                    </div>
                                </div>


                                <div class="row" id="plan_3" style="display: none">
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_stnt_name"/><font color="red">*</font></label>						
                                        <input  id="plan_inst_name"  type="text" class="form-control" onchange="validateTariffFields(this,'alphNumeric',labStntNm);"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">  
                                        <label><s:text name="ekyc.form.wngs_trf_stnt_val"/><font color="red">*</font></label>
                                        <input  id="plan_loc_name"  type="text" class="form-control" onchange="validateTariffFields(this,'alphNumeric',labStntLoc);"   value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_stnt_id"/><font color="red">*</font></label>
<!--                                        <input  id="input_POI_sdnt"  type="file" class="form-control"    value="" maxlength="50">-->
                                       <input id="input_POI_stnt" type="file" name="userFileS" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                      <font color="red"><s:text name="ekyc.form.upload.info"/></font>
                                    </div>
                                </div>
                                <div class="row" id="plan_4" style="display: none">
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_ll_val"/><font color="red">*</font></label>						
                                        <input  id="plan_exst_llno"  type="text" class="form-control" onkeypress="return isNumberKey(event)"  value="" maxlength="12">
                                    </div>
                                    <div class="col-md-4 form-group">  
                                        <label><s:text name="ekyc.form.wngs_trf_llAc_val"/><font color="red">*</font></label>
                                        <input  id="plan_exst_llaccno"  type="text" class="form-control" onchange="validateTariffFields(this,'alphNumeric',llAccnumEmpty);"   value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><s:text name="ekyc.form.wngs_trf_ll_id"/><font color="red">*</font></label>
<!--                                        <input  id="input_POI_sdnt"  type="file" class="form-control"    value="" maxlength="50">-->
                                       <input id="input_POI_ll" type="file" name="userFileL" class="file" data-show-preview="false"  data-show-upload="false"  data-show-remove="false" multiple="multiple" >
                                       <label><font color="red"><s:text name="ekyc.form.upload.info"/></font></label>
                                    </div>

                                </div>
                                     <div class="row">
                                                             <div class="col-md-4 form-group">
                                        <label><span class="bold"></span><s:text name="ekyc.form.csc.lab"/><font color="red"><s:text name="ekyc.form.csc.lab.wrn"/></font></label>
                                        <input  id="cust_bsnl_csc" type="text" class="form-control"  onchange="validateTariffFields(this,'alphNumeric',cscLab);" >
                                    </div>

                                    <div class="col-md-5 form-group">
                                        <label><span class="bold"></span> <s:text name="ekyc.form.fran.lab"/> <font color="red"><s:text name="ekyc.form.fran.lab.wrn"/></font></label>
                                        <input  id="cust_bsnl_franchise"  onchange="validateTariffFields(this,'numeric',franLab);" type="text" class="form-control"   >
                                    </div>
                                     </div>
                                <div class="row">

                                    <div class="col-md-12 mrg10T"><h4 style="color: #008cc7 !important;"><s:text name="ekyc.form.cust.dtls"/></h4></div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 mrg5B mrg5T"><span class="bold">1.</span><s:text name="ekyc.form.name.sbscriber"/> (<font class="sublabels"><s:text name="ekyc.form.name.sbscriber.subline"/></font>)<font color="red"> *</font></div>
                                    <div class="col-md-2 form-group">
                                        <label><span class="bold">1a.</span> Title <font color="red">*</font></label>
                                        <select  id="cust_title" onchange="formFieldValidationFMSeKYC(this);" class="form-control" name="select" >
                                            <option value="0">Select from list</option>                                                     
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">1b.</span><s:text name="ekyc.form.subname"/><font color="red">*</font></label>
                                        <input  id="first_name" type="text" class="form-control"    value="" disabled maxlength="50">
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label><span class="bold">1c.</span><s:text name="ekyc.form.firstname"/>  <font color="red">*</font></label>
                                        <input  id="uid_first_name" type="text" class="form-control"   disabled maxlength="50" > 
                                    </div>
                                    <div class="col-md-1 text-center pad20T"><a href="#" class="swap_ic " id='cust_swap_btn'  onclick="swapNames();" ></a> </div>
                                    <div class="col-md-2 form-group">
                                        <label><span class="bold">1d.</span><s:text name="ekyc.form.lastname"/><font color="red">*</font></label>
                                        <input  id="uid_last_name" type="text" class="form-control"   disabled maxlength="50">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8 form-group">
                                        <label><span class="bold">2a.</span><s:text name="ekyc.form.fathname"/> </label>
                                        <input type="text"   name="hfname" id="f_h_name" maxlength="50"  class="form-control" disabled="">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">2b.</span><s:text name="ekyc.form.fathname.auth"/> <font id="me_f_h_name_asterik" color="red">*</font></label>
                                        <input type="text"  onchange='formFieldValidationFMSeKYC(this)'    name="hfname" id="me_f_h_name" maxlength="50"  class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 form-group" style="display: none;">
                                        <label><span class="bold">3.</span><s:text name="ekyc.form.gen"/><font color="red">*</font></label>
                                        <div>
                                            <input name="gender" type="radio"  disabled class="form-control" id="gender" value='2'   >
                                            <label for="male"><s:text name="ekyc.form.gen.m"/></label>
                                            <input type="radio" id="gender"  disabled  name="gender" value='1' class="form-control" >
                                            <label for="female"><s:text name="ekyc.form.gen.f"/></label>
                                            <input type="radio" id="gender"  name="gender" disabled value='3' class="form-control" >
                                            <label for="other"><s:text name="ekyc.form.gen.o"/></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label><span class="bold">3a.</span><s:text name="ekyc.form.dob"/> &nbsp;<font color="red">*</font></label>
                                        <input type="text" size="10" id="dob" placeholder="DD/MM/YYYY" disabled maxlength="0" name="dob" onkeyup="dateFormatter()" class="form-control" placeholder="Date Of Birth" onblur="pickDateAge();" onkeypress="dtAllowedValidation(this);">
                                    </div>
                                    <div class="col-md-1 form-group">
                                        <label><span class="bold">3b.</span><s:text name="ekyc.form.age"/>  <font color="red">*</font></label>
                                        <input type="text" size="8" id="age" value=""  name="cust_age" disabled class="form-control" disabled>
                                    </div>
                                    <div class="col-md-2 form-group">
                                        <label><span class="bold">4.</span><s:text name="ekyc.form.nation"/>  <font color="red"> *&nbsp;</font></label>
                                        <select id="nationality"  name="nationality" disabled style="" size="1" class="form-control">
                                            <option value="Indian" selected>Indian</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label><span class="bold">5a.</span><s:text name="ekyc.form.custype"/> <font color="red">*</font></label>
                                        <select id="customer_type"  name="select" disabled size="1"  class="form-control">
                                            <option value="0">Select from list</option>
                                            <option value="0001" selected><s:text name="ekyc.form.custype.indi"/> </option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label><span class="bold">5b.</span><s:text name="ekyc.form.usecode"/>  <font color="red">*</font></label>
                                        <select id="cust_usage_code" onchange="formFieldValidationFMSeKYC(this);" name="select"  size="1"  class="form-control">
                                            <option value="0">Select from list</option>
                                            <option value="1"><s:text name="ekyc.form.usecode.bsns"/> </option>
                                            <option value="2"><s:text name="ekyc.form.usecode.res"/> </option>

                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">6.</span><s:text name="ekyc.form.pref.comm"/> <font color="red">*</font></label>
                                        <select  id="cust_pref_comm" onchange="formFieldValidationFMSeKYC(this);" name="select" class="form-control"  size="1">
                                            <option value="0">Select from list</option>                                                                    
                                        </select>
                                    </div>

                                    <div class="col-md-4 form-group">
                                        <label id="pre_label"><div class="divWork" style="display:none;">
                                                <span  class="bold">
                                                    6b.</span ><s:text name="ekyc.form.pref.comm.wrkpn"/> <font color="red">*</font></div></label>
                                        <div class="divWork" style="display:none;" id="divWork">
                                            <input  id="cust_pre_no" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control" value=""></div></div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">7a.</span><s:text name="ekyc.form.mobno"/><font color="red">*</font></label>
                                        <input  id="cust_mobile_no" type="text" class="form-control" onchange="formFieldValidationFMSeKYC(this);"   value=""  maxlength="10">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">7b.</span> <s:text name="ekyc.form.alt.mobno"/></label>
                                        <input  id="alt_mobile_no" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control"    value="" maxlength="10">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">8.</span><s:text name="ekyc.form.email"/> <font color="red">*</font></label>
                                        <input  id="email" type="text" class="form-control"    value="" onchange="formFieldValidationFMSeKYC(this);" maxlength="50">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <label><span class="bold">9.</span><s:text name="ekyc.form.cust.addr"/> <font color="red"> *</font></label>
                                        <input type="text"   name="uid_cust_addr" id="uid_cust_addr" maxlength="50" value=""  class="form-control" disabled="">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;"><s:text name="ekyc.form.contact.dtls"/></h4></div>
                                    <div class="col-md-12 mrg5B">
                                        <input value="" type="checkbox" id="instal_chkif_samebill" onclick="instal_chkif_sameFunBill();">
                                        <label><s:text name="ekyc.form.chksame.aadhaddr"/> </label>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10a.</span><s:text name="ekyc.form.hno"/>  <font color="red">*</font></label>
                                        <input  id="inst_addr_hno" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10b.</span><s:text name="ekyc.form.vill"/>  <font color="red">*</font></label>
                                        <input  id="inst_addr_vill" onchange="formFieldValidationFMSeKYC(this);"  type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10c.</span><s:text name="ekyc.form.city"/>  <font color="red">*</font></label>
                                        <input  id="inst_addr_city" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10d.</span><s:text name="ekyc.form.state"/>  <font color="red">*</font></label>
                                        <select id="inst_addr_state" name="select"  size="1" class="form-control">
                                        </select>

                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10e.</span><s:text name="ekyc.form.dstic"/><font color="red">*</font></label>
                                        <select id="inst_addr_district" name="select"  size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10f.</span><s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                        <select id="inst_main_locality" name="select"   size="1" class="form-control">
                                        </select>

                                    </div>
                                    <div class="clear"></div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10g.</span><s:text name="ekyc.form.subloc"/>  <font color="red">*</font></label>
                                        <select id="inst_sub_locality" name="select"   size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10h.</span><s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                        <select id="inst_exchange_code" name="select"   size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10i.</span><s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                        <input  type="text" class="form-control" id="INSTAL_ADDR_PINCODE" disabled  maxlength="6">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10j.</span><s:text name="ekyc.form.gstcode"/>   <font color="red">*</font></label>
                                        <select  name="BILL_GST_STATE_CODE"   id="INST_GST_STATE_CODE" class="form-control">
                                            <option value="0">Select from list</option>
                                        </select>
                                    </div>

                                </div>
                                        
                                        
<!--                               billing app     -->
                                          <div class="row" id="FMS_Billing_Address">
                                    <div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;"><s:text name="ekyc.receipt.bill.dtls"/></h4></div>
                                    <div class="col-md-12 mrg5B">
<!--                                        <input value="" type="checkbox" id="instal_chkif_samebill" onclick="instal_chkif_sameFunBill();">
                                     <label><s:text name="ekyc.form.chksame.aadhaddr"/> </label>-->
                                     <input value="" type="checkbox" id="instal_chkif_con_details" onchange="checkSmeConDtls()">
                                     <label><s:text name="ekyc.form.chksame.contdtls"/> </label>
                                    </div>
                                    
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10a.</span><s:text name="ekyc.form.hno"/>  <font color="red">*</font></label>
                                        <input  id="bill_addr_house_no" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10b.</span><s:text name="ekyc.form.vill"/>  <font color="red">*</font></label>
                                        <input  id="bill_addr_vill" onchange="formFieldValidationFMSeKYC(this);"  type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10c.</span><s:text name="ekyc.form.city"/>  <font color="red">*</font></label>
                                        <input  id="bill_addr_city" onchange="formFieldValidationFMSeKYC(this);" type="text" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10d.</span><s:text name="ekyc.form.state"/>  <font color="red">*</font></label>
                                        <select id="bill_addr_state" name="select"  size="1" class="form-control">
                                        </select>

                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10e.</span><s:text name="ekyc.form.dstic"/><font color="red">*</font></label>
                                        <select id="bill_addr_district" name="select"  size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10f.</span><s:text name="ekyc.form.mainloc"/> <font color="red">*</font></label>
                                        <select id="bill_main_locality" name="select"   size="1" class="form-control">
                                        </select>

                                    </div>
                                    <div class="clear"></div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10g.</span><s:text name="ekyc.form.subloc"/>  <font color="red">*</font></label>
                                        <select id="bill_sub_locality" name="select"   size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10h.</span><s:text name="ekyc.form.exchcode"/> <font color="red">*</font></label>
                                        <select id="bill_exchange_code" name="select"   size="1" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">10i.</span><s:text name="ekyc.form.pin"/> <font color="red">*</font></label>
                                        <input  type="text" class="form-control" id="BILL_ADDR_PINCODE" disabled  maxlength="6" >
                                    </div>
                                 
                                </div>
                                <table id="parent_table" width="100%" style="display: none">


                                    <tr style="display: none">
                                        <td colspan="3" style=" color: #008cc7 !important;"><h4>POI & POA details </h4></td>
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3" class="ui-state-error"><span class="bold">13.</span> Photo ID Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/PAN card/Aadhaar/other specify</font>) <font color="red">*</font></td>
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3"><select id="poi_type" name="poi_type" class="form-control" disabled>
                                                <Option value='23'>Unique Identification Authority of India</option>
                                            </select>
                                            &nbsp; </td>
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3"><input type="text" value=""   name="poi_number" maxlength="25" disabled class="sel_man" id="poi_number" disabled>
                                            <input type="text" value=""  placeholder="place of issue" name="poi_issue_place"  maxlength="25" class="sel_man" id="poi_issue_place" onchange="poipoachecking();" >
                                            <select id="poi_issuing_auth" name="poi_issuing_auth" class="sel_man" disabled style="width: 250px;">
                                                <Option value='23'>UIDAI Government of India(GOI)</option>
                                            </select>                      
                                            <input type="text" size="10" value="01/01/1900"  placeholder="Date of issue" class="issuedate sel_man" name="poi_issue_date" onchange="poapoidatechecking();"  id="poi_issue_date">
                                            (DD/MM/YYYY)<font color="red">
                                            <input type="checkbox" id="poiDateNotFnd" onclick="poiDateNotFndEKYCFun();"  value="1" name='poiDateNotFnd'  >
                                            <label for="Itemized">Click if DATE is N/A</label>
                                            </font> </td>
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3" class="ui-state-error"><span class="bold">14.</span> Address Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/Aadhaar/Other</font>) <font color="red">*</font><font id="copy_span" style="display:none;color:red">
                                            <input type="checkbox" id="poi_details_same_chk">
                                            <label>Click if same as above</label>
                                            </font> 
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3"><select id="poa_type"  name="address_proof" disabled="">
                                                <Option value='23'>Unique Identification Authority of India</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr style="display: none">
                                        <td colspan="3"><input type="text" value=""   name="poa_number" maxlength="25"  class="sel_man" id="poa_number" disabled>
                                            <input type="text" value=""  placeholder="place of issue" name="poa_issue_place"  maxlength="25" class="sel_man" id="poa_issue_place" disabled>
                                            <select id="poa_issuing_auth" name="poa_issuing_auth" class="sel_man" disabled style="width: 250px;">
                                                <Option value='23'>UIDAI Government of India(GOI)</option>
                                            </select>                      
                                            <input type="text" size="10" value="01/01/1900"  placeholder="Date of issue" class="issuedate sel_man" name="poa_issue_date"  id="poa_issue_date" disabled="">
                                            (DD/MM/YYYY)<font color="red">
                                            <input type="checkbox" id="poaDateNotFnd" onclick="poaDateNotFndEKYCFun();" value="1"  name='poaDateNotFnd' disabled="" >
                                            <label for="Itemized">Click if DATE is N/A</label>
                                            </font> </td>
                                    </tr>

                                    <tr id="payment_lable" style='display: none'>
                                        <td colspan="3" style=" color: #008cc7 !important;"><h4>Payment details </h4></td>
                                    </tr>
                                    <tr id="payment_type_tr" style='display: none'>
                                        <td colspan="3">
                                            <span class="bold" id="payment_label">14a.</span> Payment Type 
                                            <select style="width:170px" id="payment_type" name="payment_type" class="form-control" onchange="return validPaymentType()">
                                                <option value="">Select from list</option>
                                                <option value="1" selected>Cash</option>
                                                <option value="2">Cheque</option>
                                                <!--<option value="3">Credit card/Debit card</option>-->
                                            </select>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span class="bold">14b.</span> Payment Amount &nbsp;<input  type="text" id='payment_amt' onchange='formFieldValidationFMSeKYC(this)' maxlength="5"  class="form-control" />
                                        </td>
                                    </tr>

                                    <tr id="bankDetails" style='display: none'>
                                        <!--style='display: none'   'bank_ifsc_code','bank_account_no','bank_name','branch_name' -->
                                        <td colspan="3"><input type="text"  onchange='formFieldValidationFMSeKYC(this)' id='bank_name' placeholder="Bank name"  maxlength="25" class="sel_man">
                                            <input type="text" id='branch_name'   onchange='formFieldValidationFMSeKYC(this)' placeholder="Branch"  name="issue_place_id2" maxlength="25" class="sel_man">
                                            <input type="text" onchange='formFieldValidationFMSeKYC(this)' id='bank_account_no' placeholder="Bank Account Number" name="issue_auth_id2"  maxlength="15" class="sel_man">
                                            <input type="text" size="10" placeholder="IFSC Code" onchange='formFieldValidationFMSeKYC(this)' id='bank_ifsc_code' class="issuedate sel_man" name="issue_date_id2" id="issue_date_id2" maxlength="20">                
                                            <input type="text" size="10" placeholder="Cheque No" id='cheque_no' onchange='formFieldValidationFMSeKYC(this)' class="issuedate sel_man" name="cheque_no" id="issue_date_id2" maxlength="10">                
                                            </font> 
                                        </td>

                                    </tr>



                                </table>

                                <div class="row">
                                    <div class="col-md-12 form-group pad20R">
                                        <!--<button class="primarybt1" id="uploadFMSjob" onclick="cancelButton();">Cancel</button>-->
                                        <a onclick="validateEKYCCafNxtOTP();"  class="primarybt1" ><s:text name="ekyc.form.nxt.btn"/></a>
                                        <a href='Login.do' class="primarybt"><s:text name="ekyc.form.cncl.btn"/>  </a>
                                        <!--<a href="index.html" class="secondarybt">Cancel</a>-->
                                        <!--<a href="eKYC_step4.html" class="secondarybt">Back</a>-->

                                    </div>
                                    <div class="col-md-12"><p class="redtxt"></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                                        
                </div>
            </div>
        </form>

                <div class="modal fade" id="popGovernment" data-backdrop="static">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header orange">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                                <h4 class="modal-title">Government Employee</h4>
                            </div>
                            <div class="modal-body">
                                <p>I here by declare that I am a government employee currently in service as on this date.</p>
                            </div>
                            <div class="modal-footer">
                                <button id="btnStudent" type="button" class="primarybt" value="submit" onclick="confDeclaraion()" data-dismiss="modal">Submit</button>
                                <button type="button" class="secondarybt" id="Closed" data-dismiss="modal" onclick="deniedDeclaration()">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="popStudent" data-backdrop="static">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header orange">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                                <h4 class="modal-title">Student</h4>
                            </div>
                            <div class="modal-body">
                                <p>I here by declare that I am eligible for discounted plan.</p>
                            </div>
                            <div class="modal-footer">
                                <button id="btnStudent" type="button" class="primarybt" data-dismiss="modal" onclick="confDeclaraion()">Submit</button>
                                <button type="button" class="secondarybt" data-dismiss="modal" onclick="deniedDeclaration()">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="popExistingPlanDetails" data-backdrop="static">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header orange">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                                <h4 class="modal-title">Existing Customer</h4>
                            </div>
                            <div class="modal-body">
                                <p>I here by conform that I am an existing BSNL Landline/Broadband customer as on this date</p>
                            </div>
                            <div class="modal-footer">
                                <button id="btnStudent" type="button" class="primarybt" data-dismiss="modal" onclick="confDeclaraion()">Submit</button>
                                <button type="button" class="secondarybt" data-dismiss="modal" onclick="deniedDeclaration()">Close</button>
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
                    //                    history.pushState(null, null, location.href);
                    //            window.onpopstate = function () {
                    //                history.go(1);
                    //            };  

                    $("#btnValidate").click(function () {
                        $("#divMobileVerification").hide();
                        $("#divSIMinfo").show();
                    });
                    $(document).ready(function () {
                        //$("input[name$='template']").prop('checked', false);
                        $("input[name$='template']").click(function () {
                            var test = $(this).val();
                            $("div.desc").hide();
                            $("#div" + test).show();
                        });

                        $("#cust_wings_traiff").change(function () {
                            
                        });
                    });
                    function isNumberKey(evt)
                            {
                                var charCode = (evt.which) ? evt.which : event.keyCode
                                if (charCode > 31 && (charCode < 48 || charCode > 57))
                                    return false;

                                return true;
                            }
                            $('#chkISD').change(function () {
                            var chkISD=$('#chkISD').is(':checked');
                            var chkIR=$('#chkIR').is(':checked');
                            if(chkISD && !chkIR){
                                $('#popInternationalRoaming').modal('show');
                                $('#info_msg').text(isdMsg);

                            }
                            uncheck(this);
                               });
                            $('#chkIR').change(function () {
                                var chkISD=$('#chkISD').is(':checked');
                            var chkIR=$('#chkIR').is(':checked');
                             if(chkIR && !chkISD){
                                 $('#chkISD').prop('checked', true);
                                $('#popInternationalRoaming').modal('show');
                                $('#info_msg').text(irMsg);
                            }else if(chkIR && chkISD){
//                                $('#popInternationalRoaming').modal('show');
//                                $('#info_msg').text(irMsg);

                            }
                               });
                               function uncheck(){
                                 $( "#chkIR" ).prop( "checked", false );
                               }
                               
                             
         $(document).ready(function () {
                      $("#FMS_Billing_Address").hide();
                             $("#chkISD").click(function () {
                             if ($('#chkISD').is(':checked')) {
                                 $("#FMS_Billing_Address").show();
                             } else {
                                 $("#FMS_Billing_Address").hide();
                             }
                         });
                            $("#chkIR").click(function () {
                             if ($('#chkIR').is(':checked')) {
                                 $("#FMS_Billing_Address").show();
                             } else {
                                 $("#FMS_Billing_Address").show();
                             }
                         });
                    });
                            

                            
                </script>
                <script>
                    


                    // var idValues = ['cust_title', 'first_name', 'cust_last_name', 'f_h_name', 'gender', 'dob', 'age', 'nationality', 'customer_type', 'cust_usage_code', 'cust_pre_type', 'cust_pref_comm', 'cust_mobile_no', 'alt_mobile_no', 'email', 'inst_addr_hno', 'inst_addr_vill', 'inst_addr_city', 'inst_addr_state', 'inst_addr_district', 'inst_main_locality', 'inst_sub_locality', 'inst_exchange_code', 'bill_acc_no', 'bill_acc_type', 'bill_acc_sub_type', 'bill_frequency', 'bill_media', 'bill_email', 'bill_addr_house_no', 'bill_addr_vill', 'bill_addr_city', 'bill_addr_state', 'bill_addr_district', 'bill_main_locality', 'bill_sub_locality', 'bill_exchange_code', 'poi_type', 'poi_number', 'poi_issue_place', 'poi_issuing_auth', 'poi_issue_date', 'poa_type', 'poa_number', 'poa_issue_place', 'poa_issuing_auth', 'poa_issue_date'];
                    //            var titlePreComm = ['cust_title', 'cust_pref_comm'];
                    var titlePreComm = ['cust_title', 'cust_pref_comm', 'cust_pre_type', 'bill_frequency', 'bill_media'];
                    function setmetadata() {
                        setMetaDataFMSEKYC();
                        setTitlePreCommuniEKYC(titlePreComm);
                        setCustmoreData();
                        mainLocalitiesEKYCLoad();
                        $('#cust_pre_type').val('1');
                        $('#cust_usage_code').val('2');
                        $('#cust_mobile_no').val($('#RegMobNum').val());
                        $('#customer_type').val('0001').attr('disabled', 'disabled');
                        try {
                            var regUserResp = $('#ResponseData').val();
                            var regUserData = {};
                            regUserData = JSON.parse(regUserResp);
                            if (regUserData.EMAIL != "") {
                                $('#email').val(regUserData.EMAIL).attr("disabled", "disabled");
                                //           $('#cust_mobile_no').val(regUserData.MOBILE);   
                            }
                        } catch (e) {
                        }
                    }
                function checkPlanReq(){   
                    
                    var regUserResp = $('#ResponseData').val();
                    var regUserData = {};
                      
                    if(regUserResp !=""){
                    regUserData = JSON.parse(regUserResp);
                   //console.log(JSON.stringify(regUserData));
                   
                   if(regUserData.STATUS.toUpperCase()=="SUCCESS"){
                       
                       if(regUserData.TARIFF_PLAN_ID !="" && regUserData.TARIFF_PLAN_ID !="WTP1" ){
                           $('select[name="wingstariff"]').find('option[value="'+regUserData.TARIFF_PLAN_ID+'"]').attr("selected",true);
                             // $('#cust_wings_traiff').trigger("onchange"); 
                             // $('#btnStudent').click();
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
            
       
                 




                </script>
                <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
                <br/><br/>
                <br/><br/> <br/><br/><br/>
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
                                        <input type="text" class="form-control" id="wings_srch_num"  onchange='formFieldValidation(this)' maxlength="10">            
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

                                <div class="clear marginbottom10"></div>
                                <button type="submit" class="primarybt mrg10A" onClick="fmsreserveNumbers();">Select number</button>        
                                <div class="mask" style="display:none" id="wait">
                                    <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                                </div>
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
                </body>
                </html>
