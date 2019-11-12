<%-- 
    Document   : FMS_kyc_step1
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : ramesh.a
--%>

<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <%
                    String CSS_JS_PATH = "";
                    String CSS_JS_VERSION = "";
                    CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
                    CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
                    boolean is_back_action = false;
                    response.setHeader("Pragma", "no-cache");
                    response.setDateHeader("Expires", 0);
                    response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");

                    try {
                        String reqParam = (String) request.getAttribute("IS_BACK_ACTION");
                        if (reqParam != null && reqParam.equals("TRUE")) {
                            is_back_action = true;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();

                    }

                %>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />

        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />


        <link href="<%=CSS_JS_PATH%>css/dropzone.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <script src="<%=CSS_JS_PATH%>js/dropzone.js?ReqParam=<%=CSS_JS_VERSION%>" type="text/javascript"></script>

        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/bootstrap-datetimepicker.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/moment.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/bootstrap-datetimepicker.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kycCaf.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            
        </script>
        <script>
                history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };  
                
                var setbackDataFlag='<%=is_back_action%>';
        </script>

        <script>
            var titlePreComm = ['cust_title','customer_type', 'cust_pre_type'];
            
            
            function setmetadata() {

                try {
                    setMetaDataForValidationFMS();
                } catch (e) {
                }
                try {
                    setTitlePreCommuni(titlePreComm);
                } catch (e) {
                }
                try {
                    mainLocalitiesLoad();
                } catch (e) {
                }
                $('#cust_mobile_no').val($('#RegMobNum').val()).attr('disabled', 'disabled');
                try {
                    if(setbackDataFlag =='true'){
                       setbackdata();
                    }else{}
                } catch (e) {
                    alert(e);
                }
            }

        </script>
        <style>
            .issuedate {
                display: inline-block !important;
                width: 50%;
            }
        </style>
    </head>
    <body onload="setmetadata();">
        <!--<body onload="parent.resizeFrame('frameBody');setmetadata();"  style="overflow-y: hidden;">-->
        <form name="uploadkycCafForm">
            <select type="hidden" id="poi_issuing_auth" name="poi_issuing_auth" class="sel_man"  style="width: 250px;" disabled=""></select>
            <select type="hidden" id="poa_issuing_auth" name="poa_issuing_auth" class="sel_man"  style="width: 250px;" disabled=""></select>
            <input type="hidden" name="reqData" id="reqData" value=""/>
            <input type="hidden" id="reqSessionId" value="" />
            <input type="hidden" id="kycpageStatus" value="<s:property value="#session.kycpageStatus"/>"  /> 
            <input type="hidden" id="RegMobNum" value="<s:property value="#session.RegMobNum"/>"  /> 
            <input type="hidden" id="kycformFieldsMetaData" value="<s:property value="#session.kycformFieldsMetaData"/>" />
            <input type="hidden" id="STATES" value="<s:property value="#session.STATES"/>" />
            <input type="hidden" id="fmsDDData" value="<s:property value="#session.fmsDDData"/>" />
            <input type="hidden" id="main_locality" value="<s:property value="#session.main_locality"/>" />
            <input type="hidden" id="sub_locality" value="<s:property value="#session.sub_locality"/>" />
            <input type="hidden" id="DISTRICTS" value="<s:property value="#session.DISTRICTS"/>" />
            <input type="hidden" id="EXCHNAGE_DTLS" value="<s:property value="#session.EXCHNAGE_DTLS"/>" />
            <input type="hidden" id="poi_same_chk" value="<s:property value="#session.poi_same_chk"/>" />
            <input type="hidden" id="check_poi_samesession" value="<s:property value="#session.check_poi_samesession"/>" />
            <input type="hidden" id="fms_kyc_Stp1Data" value="<s:property value="#session.fms_kyc_Stp1Data"/>" />
            <input type="hidden" id="FMS_KYC_Cust_Data" value="<s:property value="#session.FMS_KYC_Cust_Data"/>" />
            <input type="hidden" id="CafsetValues" value="<s:property value="#session.CafsetValues"/>" />
            <input type="hidden" id="FMS_ATTACHMENTS_OPTNL" value="<s:property value="#session.FMS_ATTACHMENTS_OPTNL"/>" />
            <input type="hidden" id="FMS_ATTACH_SHOW_HIDE" value="<s:property value="#session.FMS_ATTACH_SHOW_HIDE"/>" />
        </form>
        <div id="">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='Login.do' ><s:text name="register.form.nav1"/> </a></span> <span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"><s:text name="register.form.nav2"/></span></div>
                    <h1 class="page_heading">Customer details</h1>
                </div>
            </div>
            <div class="clear mrg65B"></div>
            <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-12 tablepad">
                            <div class="row">
                                <div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;"><s:text name="register.form.custdtls"/> </h4></div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">1a.</span> Title <font color="red">*</font></label>
                                    <select  id="cust_title"  name="select" class="form-control"  size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">1b.</span><s:text name="register.form.fstname"/> <font color="red">*</font></label>
                                    <input  id="first_name" type="text" onchange="formFieldValidationFMSkycthin(this);" class="form-control"   value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">1c.</span><s:text name="register.form.lastname"/> <font color="red">*</font></label>
                                    <input  id="cust_last_name" type="text" onchange="formFieldValidationFMSkycthin(this);" class="form-control"   value="" maxlength="50" >
                                </div>
<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">2.</span> Father/Husband name </label>
                                    <input id="f_h_name"  type="text" class="form-control"   value="" maxlength="30">
                                </div>-->
<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">3.</span> Gender<font color="red">*</font></label>
                                    <div>
                                        <input name="gender" type="radio" id="gender" value='2'   >
                                        <label for="male">Male</label>
                                        <input type="radio" id="gender"  name="gender" value='1'  >
                                        <label for="female">Female</label>
                                        <input type="radio" id="gender"  name="gender" value='3'  >
                                        <label for="other">Other</label>
                                    </div>
                                </div>-->
<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">4.</span> Date Of Birth(DD/MM/YYYY) <font color="red">*</font></label>
                                    <input type="text" size="10" id="dob" name="dob" value="" onkeyup="dateFormatter()" class="form-control" placeholder="Date Of Birth"  onkeypress="dtAllowedValidation(this);"  />                                   
                                </div>-->

<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">5.</span> Usage code /  Usage Type <font color="red">*</font></label>
                                    <select id="cust_usage_code"  name="select" class="form-control"  size="1">
                                        <option value="0">Select from list</option>
                                        <option value="1">Business </option>
                                        <option value="2">Personal </option>
                                    </select>
                                </div>-->
<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">6.</span> Preferred comm. method <font color="red">*</font></label>
                                    <select  id="cust_pref_comm" onchange="formFieldValidationFMSkycthin(this);" class="form-control" name="select"  size="1">
                                                                    </select>
                                                                </div>-->
                                    <div class="col-md-4 form-group">
                                        <label><span class="bold">2.</span> <s:text name="register.form.email"/>   <font color="red">*</font></label>
                                        <input id="email" type="text"  onchange="formFieldValidationFMSkycthin(this);" class="form-control"    value="" maxlength="50">
                                    </div>
                                    <div class="col-md-4 form-group">
                                    <label><span class="bold">3.</span><s:text name="register.form.mobno"/>  <font color="red">*</font></label>
                                    <input id="cust_mobile_no" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control"   value="" maxlength="11">
                                    </div>
                                      <div class="col-md-4 form-group">
                                    <label class="ui-state-error" id="pre_label"><div class="divWork" style="display:none;"><span  class="bold">
                                            </span ><s:text name="register.form.wrkmobno"/>  <font color="red">*</font></div></label>
                                    <div class="divWork" style="display:none;" id="divWork">
                                        <input  id="cust_pre_no" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control" value="" maxlength="12" ></div>
                                </div>
                                <div class="clear"></div>
                                
                             
                                <div class="clear"></div>
                                <!--<div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;">Installation address details</h4></div>-->
<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9a.</span> House no. <font color="red">*</font></label>
                                    <input id="inst_addr_hno" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control"    value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9b.</span> Village/Colony name <font color="red">*</font></label>
                                    <input id="inst_addr_vill" onchange="formFieldValidationFMSkycthin(this);"  type="text" class="form-control"  value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9c.</span> City <font color="red">*</font></label>
                                    <input id="inst_addr_city" onchange="formFieldValidationFMSkycthin(this);"  type="text" class="form-control"  value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9d.</span> State <font color="red">*</font></label>
                                    <select  id="inst_addr_state" class="form-control" size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9e.</span> District <font color="red">*</font></label>
                                    <select  id="inst_addr_district" class="form-control"  onchange="unclicksameadress();"  size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9f.</span> Main locality <font color="red">*</font></label>
                                    <select  id="inst_main_locality" class="form-control"  size="1">
                                    </select>
                                </div>
                                <div class="clear"></div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9g.</span> Sub locality <font color="red">*</font></label>
                                    <select  id="inst_sub_locality" class="form-control" size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9h.</span> Exchange code <font color="red">*</font></label>
                                    <select  id="inst_exchange_code" onchange="unclicksameadress();" class="form-control" size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">9i.</span> Pin code <font color="red">*</font></label>
                                    <input  type="text" id="INSTAL_ADDR_PINCODE" class="form-control"    maxlength="6">
                                </div>
                                <div class="clear"></div>-->
                                <!--<div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;">Billing account details </h4></div>-->

<!--                                <div class="col-md-4 form-group">
                                    <label><span class="bold">10a.</span> Bill media <font color="red">*</font></label>
                                    <select id="bill_media" name="select" class="form-control"  size="1" onchange="billemailMand()">

                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label class="ui-state-error" ><div class="BillMedia" id="bill_email_label" style="display: none;"><span class="bold">10b.</span> Billing email address <font color="red">*</font></div></label>
                                    <div class="BillMedia" id="bill_email_text" style="display: none;"><input type="text" class="form-control" id="bill_email"  value=" " onchange="formFieldValidationFMSkycthin(this);" maxlength="50"></div>

                                </div>
                                <div class="clear"></div>
                                <div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;">Billing address </h4></div>
                                <div class="col-md-12 mrg10B"><input onclick="checksameValues();
                                        formFieldValidationFMSkycthin(this)"  id="addr_same_check" type="checkbox">
                                    <label>Check if same as installation address </label></div>

                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11a.</span> House no. <font color="red">*</font></label>
                                    <input id="bill_addr_house_no" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control"    value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11b.</span> Village/Colony name <font color="red">*</font></label>
                                    <input id="bill_addr_vill" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control"    value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11c.</span> City <font color="red">*</font></label>
                                    <input id="bill_addr_city" onchange="formFieldValidationFMSkycthin(this);" type="text" class="form-control"    value="" maxlength="50">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11d.</span> State <font color="red">*</font></label>
                                    <select id="bill_addr_state" name="select"  class="form-control" size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11e.</span> District <font color="red">*</font></label>
                                    <select id="bill_addr_district" name="select" class="form-control"  size="1">
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11f.</span> Main locality <font color="red">*</font></label>
                                    <select id="bill_main_locality" name="select" class="form-control"  size="1">
                                    </select>
                                </div>
                                <div class="clear"></div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11g.</span> Sub locality <font color="red">*</font></label>
                                    <select id="bill_sub_locality" name="select" class="form-control"  size="1">
                                        <option value="0">Select from list</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11h.</span> Exchange code <font color="red">*</font></label>
                                    <select id="bill_exchange_code" name="select" class="form-control"  size="1">
                                        <option value="0">Select from list</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label><span class="bold">11i.</span> Pin code <font color="red">*</font></label>
                                    <input  type="text" class="form-control" id="BILL_ADDR_PINCODE"      maxlength="6">
                                </div>

                                <div class="clear"></div>-->
                                <!--<div class="col-md-12 mrg10B"><h4 style="color: #008cc7 !important;">POI & POA details </h4></div>-->                                
<!--                                <div class="col-md-12 form-group">
                                    <label><span class="bold" >12.</span> Photo ID Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/PAN card/Aadhaar/other specify</font>) <font color="red">*</font></label>
                                    <select id="poi_type" name="poi_type" onchange="setpoiAuthority()" class="form-control"></select>
                                </div>
                                <div class="clear"></div>
                                <div class="col-md-4 form-group">
                                    <label>Document number</label>
                                    <input type="text" value="" placeholder="Document number"  name="poi_number" maxlength="16"  class="form-control" onchange='formFieldValidationFMSkycthin(this)' id="poi_number">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Place of issue</label>
                                    <input type="text" value="" placeholder="place of issue" name="poi_issue_place"  maxlength="16" class="form-control" id="poi_issue_place" onchange="formFieldValidationFMSkycthin(this);">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Date of issue(DD/MM/YYYY)</label>
                                    <div>
                                        <input type="text" size="10" value="" maxlength="10" placeholder="Date of issue" class="issuedate form-control" name="poi_issue_date"  onkeyup="dtAllowedValidation(this);" id="poi_issue_date">                                        
                                        <font color="red">
                                        <input type="checkbox" id="poiDateNotFnd" value="1" onclick="poiDateNotFndFun();" name='poiDateNotFnd'  >
                                        <label for="Itemized">Click if DATE is N/A</label>
                                        </font>
                                    </div>
                                </div>
                                <div class="clear"></div>
                                <div class="col-md-12 form-group">
                                    <label><span class="bold">13.</span> Address Proof Document Type (<font class="sublabels">Driving License/Voter ID Card/Passport/Aadhaar/Other</font>) <font color="red">*</font><font id="copy_span">
                                        <input type="checkbox" id="check_poi_same" name="check_poi_same" value="true" onclick="poiDetailsSameChk();" >
                                        <label>Click if same as above</label>
                                        </font></label>
                                    <select id="poa_type" onchange="setpoaAuthority()" name="address_proof" class="form-control"></select>
                                </div>
                                <div class="clear"></div>
                                <div class="col-md-4 form-group">
                                    <label>Document number</label>
                                    <input type="text" value="" placeholder="Document number" name="poa_number" maxlength="16"  class="form-control" onchange='formFieldValidationFMSkycthin(this)' id="poa_number">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Place of issue</label>
                                    <input type="text" value="" placeholder="place of issue" name="poi_issue_place"  maxlength="16" class="form-control" id="poa_issue_place" onchange="formFieldValidationFMSkycthin(this);">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Date of issue(DD/MM/YYYY)</label>
                                    <div>
                                        <input type="text" size="10" value="" maxlength="10" placeholder="Date of issue" class="issuedate form-control" name="poa_issue_date"  onkeyup="dtAllowedValidation(this);" id="poa_issue_date" >
                                        <font color="red">
                                        <input type="checkbox" id="poaDateNotFnd" onclick="poaDateNotFndFun();" value="1"  name='poaDateNotFnd'  >
                                        <label for="Itemized">Click if DATE is N/A</label>
                                        </font>
                                    </div>
                                </div>
                                <div class="clear"></div>-->
                                <div class="col-md-12">
                                    <a onclick="validatekycCaf()"  class="primarybt" ><s:text name="register.form.next"/></a>
                                    <a href="Login.do" class="secondarybt" ><s:text name="register.form.cancel"/></a>
                                </div>
                            </div>

                            <table id="parent_table" width="100%" style="display: none;">


                                <!--                                <tr>
                                                                    <td height="15"></td>
                                                                </tr>-->
                                <tr id="payment_lable" style='display: none'>
                                    <td colspan="3" style=" color: #008cc7 !important;"><h4>Payment details </h4></td>
                                </tr>
                                <tr id="payment_type_tr" style='display: none'>
                                    <td colspan="3">
                                        <span class="bold">14a.</span> Payment Type 
                                        <select style="width:170px" id="payment_type" name="payment_type" class="form-control" onchange="validPaymentType();">
                                            <option value="">Select from list</option>
                                            <option value="1" selected>Cash</option>
                                            <option value="2">Cheque</option>
                                            <!--<option value="3">Credit card/Debit card</option>-->
                                        </select>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span class="bold">14b.</span> Payment Amount &nbsp;<input  type="text" id='payment_amt' onchange='formFieldValidationFMSkycthin(this)' maxlength="5"  class="man num" />
                                    </td>
                                </tr>

                                <tr id="bankDetails" style='display: none'>
                                    <!--style='display: none'   'bank_ifsc_code','bank_account_no','bank_name','branch_name' -->
                                    <td colspan="3"><input type="text"  onchange='formFieldValidationFMSkycthin(this)' id='bank_name' placeholder="Bank name"  maxlength="25" class="sel_man">
                                        <input type="text" id='branch_name'   onchange='formFieldValidationFMSkycthin(this)' placeholder="Branch"  name="issue_place_id2" maxlength="25" class="sel_man">
                                        <input type="text" onchange='formFieldValidationFMSkycthin(this)' id='bank_account_no' placeholder="Bank Account Number" name="issue_auth_id2"  maxlength="15" class="sel_man">
                                        <input type="text" size="10" placeholder="IFSC Code" onchange='formFieldValidationFMSkycthin(this)' id='bank_ifsc_code' class="issuedate sel_man" name="issue_date_id2" id="issue_date_id2" maxlength="20">                
                                        <input type="text" size="10" placeholder="Cheque No" id='cheque_no' onchange='formFieldValidationFMSkycthin(this)' class="issuedate sel_man" name="cheque_no" id="issue_date_id2" maxlength="10">                
                                        </font> 
                                    </td>

                                </tr>
                            </table>
                            <div class="clear mrg25B"></div>
                            <div class="form-group pad20R">
                                <!--<a href="FMS_kyc_step1.html" class="secondarybt" onclick="clearCurrentPageData()">Cancel</a>-->

                                <!--<a href="#" class="secondarybt" onclick="fmsKYCCAFBack();">Back</a>-->
                            </div>
                            <div class="mask" style="display:none" id="wait">
                                 <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                             </div>
                            <div class="form-group">
                                <li><span class="redtxt">NOTE: ISD facility and International out roaming not available on WINGS at present.<br></span></li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <br/><br/><br/>

    </body>
</html>