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
        <!-- Kendo CSS -->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min_helpdesk.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/grid_mobile_list.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/jquery.countdownTimer.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/responsive_bootstrap_carousel.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min_helpdesk.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            var info = '<s:text name="helpdesk.alert.fieldSearch"/>';
            var validmobilenumber = '<s:text name="helpdesk.alert.validmobilenumber"/>';
            var cafno = '<s:text name="helpdesk.alert.validcafno"/>';
            var nodata = '<s:text name="helpdesk.alert.nodata"/>';
           
            var MsgNotEmpty='<s:text name="helpdesk.alert.MsgNotEmpty"/>';
            var SelComType='<s:text name="helpdesk.alert.SelComType"/>';
            var MsgEmail='<s:text name="helpdesk.alert.MsgEmail"/>';
            var MsgEmailValid='<s:text name="helpdesk.alert.MsgEmail.valid"/>';
            var minMsgReq='<s:text name="helpdesk.alert.minMsgReq"/>';
            var minLen='<s:text name="helpdesk.alert.minLen"/>';
            var maxLen='<s:text name="helpdesk.alert.maxLen"/>';
           
        </script>
        <style>
            .k-tabstrip-items .k-state-active {
                background-color: #999;
                background-image: none;
                border-color: #5c6bc0;
            }
            #toolStrip > .k-tabstrip-items {
                overflow-x: hidden;
                overflow-y: hidden;
                white-space: nowrap;
            }
        </style>
    </head>
    <body >
        <div class="header"><i class="logo"></i></div>
        <div class="clear"></div>
        <div class="row">
            <div class="main col-sm-12">
                <div class="pull-left">
                    <form onsubmit="searchTocken(); return false;">
                        <div >
                            <input  type="radio" name="radio" value="1" checked>
                            <label><s:text name="helpdesk.radio.regmob"/></label>
                            <input  type="radio" name="radio" value="2" >
                            <label><s:text name="helpdesk.radio.wlid"/></label>
                            <input  type="radio"  name="radio" value="3" >
                            <label><s:text name="helpdesk.radio.wingsPhoneNumber"/></label>

                        </div>
                        <div> <input id="searchkey" type="text" class="mrg10L width200px"   value="">  <button  type="submit" class="primarybt2 inlineblock"  title="Search"><s:text name="helpdesk.button.search"/></button> </div>

                    </form>
                </div>
                <div class="clear mrg20B"></div>
                <div class="clear mrg20B"></div>
                <div class="col-sm-10  pad0L">
                    <div  class="demo-section k-content">
                        <div id="toolStrip" >
                            <div id="appendTabs" class="tab-content pad10A" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 pad10A" style="margin-top: -12px">
                    <div class="jumbotron jumbotron-warning">
                        <label><s:text name="helpdesk.tabs.SancharAadhaarHelp"/></label><br>
                        <label><s:text name="helpdesk.tabs.ForRegistrationrelatedqueries"/></label>
                        <h2 class="mrg10T"> <label><s:text name="helpdesk.tabs.mobileNumber"/></label></h2>

                    </div>

                    <div class="jumbotron jumbotron-success">
                        <label><s:text name="helpdesk.tabs.BSNLNGNHelpdesk"/></label>
                        <br>
                        <label><s:text name="helpdesk.tabs.forActivationRelatedQueries"/></label>

                        <h2 class="mrg10T"><label><s:text name="helpdesk.tabs.landlinenumber"/></label></h2>
                        <h4><label><s:text name="helpdesk.tabs.ngmailid"/></label></h4>

                    </div>
<!--                    <div class="jumbotron jumbotron-info">
                        Instructions for Activation<br>
                        <a href="images/activationInstructions.pdf" download>Click to Download</a>
                    </div>                          -->
                    <div class="jumbotron jumbotron-danger">
                        <a href="#" data-toggle="modal" data-target="#popRaiseComplaint" onclick="clearInfo();loadComplaintsList();" >Raise a Complaint</a>
                    </div>
                </div>
                <div class="clear mrg20B"></div>
            </div>
        </div>
        <div class="clear"></div>

        <div class="footer"><label><s:text name="helpdesk.label.poweredbyIntensertech"/></label></div>
        <div class="modal fade" id="popRaiseComplaint" data-backdrop="static"                                                                                                                                                                                                                                                                                                                                                                         >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header orange">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span> </button>
                        <h4 class="modal-title"> <label><s:text name="helpdesk.Cmpmdl.RaiseComt"/></label></h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label> <s:text name="helpdesk.Cmpmdl.Email"/><span class="redtxt">*</span></label>
                            <input type="text" autocomplete="on" class="txtinput" onchange="isvalidEmail(this);" id="cmplntdd_email" value="" >
                        </div>
                        <div class="form-group">
                            <label><s:text name="helpdesk.Cmpmdl.Cpmtype"/><span class="redtxt">*</span></label>
                            <select id="cmplntdd_type" name="select" class="txtinput" size="1" >
<!--                                <option value="0">Select complaint type</option>
                                <option value="1">complaint type 01</option>
                                <option value="2">complaint type 02</option>
                                <option value="3">complaint type 03</option>
                                <option value="4">complaint type 04</option>-->
                            </select>
                        </div>
                        <div class="form-group">
                            <label> <s:text name="helpdesk.Cmpmdl.msg"/><span class="redtxt">*</span></label>
                            <textarea rows="3" minlength="<s:text name="helpdesk.alert.minLen"/>" maxlength="<s:text name="helpdesk.alert.maxLen"/>" class="form-control" id="cmplntdd_msg"> </textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnStudent" type="button" class="primarybt" onclick="submitComplaint();"><s:text name="helpdesk.Cmpmdl.Submit"/></button>
                        <button type="button" id="clsbtn" class="secondarybt" data-dismiss="modal"><s:text name="helpdesk.Cmpmdl.close"/></button>
                    </div>
                </div>
            </div>
        </div>
        <script>
            var jobArr = [];
            var dataSource1 = [];
            function loadInfoTabs() {
                $(jobArr).each(function (idx) {
                    var data = {};
                    data.name = jobArr[idx].CAF_NO;
                    if(jobArr[idx].WINGS_ISD=='1'){
                        var isdResp='<label style="color: green" ><h3>Yes</h3></label>';
                    }else{
                        var isdResp='<label style="red green" ><h3>No</h3></label>'; 
                    }
                    if(jobArr[idx].WINGS_IR=='1'){
                        var irResp='<label style="color: green" ><h3>Yes</h3></label>';
                    }else{
                         var irResp='<label style="red green" ><h3>No</h3></label>';
                    }
                    var  encriptData= encrypt(jobArr[idx].CAF_NO);
//                    var tabHtml = ' <div id="tab' + idx + '" class="tab-pane fade in active"> <div class="row"> <div class="col-md-5"> <div class=""> <label id="reg_mob" class="bold width50"><label><s:text name="helpdesk.gridhtml.registeredmobile"/></label></label>' + jobArr[idx].REG_MOB_NO + ' </div><div class=""> <label id="reg_date" class="bold width50"><label><s:text name="helpdesk.gridhtml.registereddate"/></label></label> ' + jobArr[idx].REG_DATE_TIME + ' </div></div><div class="col-md-5"> <div class=""><label id="reg_name" class="bold width50"><label><s:text name="helpdesk.gridhtml.name"/></label></label>' + jobArr[idx].REG_CUST_NAME + '</div><div class=""><label id="reg_email" class="bold width50"><label><s:text name="helpdesk.gridhtml.Email"/></label></label>' + jobArr[idx].REG_MAIL + '</div></div><div class="col-md-20 text-center"> <div id="reg_info" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> </div></div></div><hr class="hr"> <div class="row"> <div class="col-md-5"> <div class=""><label id="pay_dttm" class="bold width50"><label><s:text name="helpdesk.gridhtml.PaymentDateTime"/></label></label>' + jobArr[idx].PAY_DATE_TIME + ' </div><div class=""><label id="bnk_nme" class="bold width50"><label><s:text name="helpdesk.gridhtml.BankName"/></label></label>' + jobArr[idx].PAY_BANL_NAME + ' </div></div><div class="col-md-5"> <div class=""> <label id="txn_id" class="bold width50"><label><s:text name="helpdesk.gridhtml.TransactionID"/></label></label>' + jobArr[idx].PAY_TXN_ID + ' </div><div class=""><label id="txn_sts" class="bold width50"><label><s:text name="helpdesk.gridhtml.Status"/></label></label> ' + jobArr[idx].PAY_STATUS + ' </div></div><div id="pay_info" class="col-md-20 text-center"> ' + jobArr[idx].PYMT_LABEL + ' </div></div><hr class="hr"> <div class="row"> <div class="col-md-5"> <div class=""> <label id="ekyc_date" class="bold width50"><label><s:text name="helpdesk.gridhtml.EKYCDate"/></label></label> ' + jobArr[idx].EKYC_DATE + ' </div><div class=""> <label id="aadhar_num" class="bold width50"><label><s:text name="helpdesk.gridhtml.AadhaarNumber"/></label></label> ' + jobArr[idx].AADHAR_NO + ' </div></div><div class="col-md-5"> <div class=""> <label id="name" class="bold width50"><label><s:text name="helpdesk.gridhtml.Name"/></label></label>' + jobArr[idx].OB_CUST_NAME + '</div><div class=""> <label id="wngs_num" class="bold width50"><label><s:text name="helpdesk.gridhtml.SelectedWingsNo"/></label></label>' + jobArr[idx].WINGS_MOB_NO + ' </div></div><div id="ekyc_info" class="col-md-20 text-center"> ' + jobArr[idx].EKYC_LABLE + ' </div></div><hr class="hr"> <div class="row"> <div class="col-md-5"> <div class=""> <label id="act_req_dt" class="bold width50"><label><s:text name="helpdesk.gridhtml.ActivationRequestDate"/></label></label> ' + jobArr[idx].ACTIVATION_REQ_DATE + ' </div><div class=""> <label id="app_no" class="bold width50"><label><s:text name="helpdesk.gridhtml.ApplicationNo"/></label></label> ' + jobArr[idx].APPLICATION_NO + ' </div></div><div class="col-md-5"> <div class=""> <label id="app_status" class="bold width50"><label><s:text name="helpdesk.gridhtml.Status"/></label></label> ' + jobArr[idx].ACTIVATION_STAT + ' </div><div class=""> <label id="remarks" class="bold width50"><label><s:text name="helpdesk.gridhtml.Remarks"/></label></label> ' + jobArr[idx].REMARKS + ' </div></div><div id="activation_info" class="col-md-20 text-center"> </div></div><hr class="hr"> <div class="row"> <div class="col-md-5"> <div class=""> <label id="activation_date" class="bold width50"><label><s:text name="helpdesk.gridhtml.ActivationDate"/></label></label> ' + jobArr[idx].ACTIVATION_DATE + ' </div><div class=""> <label id="circle" class="bold width50"><label><s:text name="helpdesk.gridhtml.Circle"/></label></label> ' + jobArr[idx].CIRCLE_CODE + ' </div></div><div class="col-md-5"> <div class=""> <label id="alloted_wings_no" class="bold width50"><label><s:text name="helpdesk.gridhtml.AllottedWingsMobile"/></label></label> ' + jobArr[idx].WINGS_MOB_NO + ' </div><div class=""> <label id="wings_pin" class="bold width50"><label><s:text name="helpdesk.gridhtml.WingsPin"/></label></label> ' + jobArr[idx].WINGS_PIN + ' </div></div><div class="col-md-20"> ' + jobArr[idx].ACTIVATION_LABEL + ' </div></div></div>';
                    if(jobArr[idx].SERVICE_TYPE.toUpperCase() == "WINGS"){
                            var tabHtml = '<div id="tab' + idx + '" class="tab-pane fade in active">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="reg_mob" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.registeredmobile"/>             </label>             </label>' + jobArr[idx].REG_MOB_NO + '          </div>          <div class="">             <label id="reg_date" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.registereddate"/>             </label>             </label> ' + jobArr[idx].REG_DATE_TIME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="reg_name" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.name"/>             </label>             </label>' + jobArr[idx].REG_CUST_NAME + '          </div>          <div class="">             <label id="reg_email" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Email"/>             </label>             </label>' + jobArr[idx].REG_MAIL + '          </div>       </div>       <div class="col-md-20 text-center">          <div id="reg_info" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> </div>       </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="pay_dttm" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.PaymentDateTime"/>             </label>             </label>' + jobArr[idx].PAY_DATE_TIME + '          </div>          <div class="">             <label id="bnk_nme" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.BankName"/>             </label>             </label>' + jobArr[idx].PAY_BANL_NAME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="txn_id" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.TransactionID"/>             </label>             </label>' + jobArr[idx].PAY_TXN_ID + '          </div>          <div class="">             <label id="txn_sts" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Status"/>             </label>             </label> ' + jobArr[idx].PAY_STATUS + '          </div>       </div>       <div id="pay_info" class="col-md-20 text-center"> ' + jobArr[idx].PYMT_LABEL + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="ekyc_date" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.EKYCDate"/>             </label>             </label> ' + jobArr[idx].EKYC_DATE + '          </div>          <div class="">             <label id="aadhar_num" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.AadhaarNumber"/>             </label>             </label> ' + jobArr[idx].AADHAR_NO + '                   </div>          <div class="">             <label id="ekyc_isd" class="bold width50">                                             <label>                <s:text name="helpdesk.gridhtml.EKYCIsd" />             </label>             </label> ' + isdResp + '                   </div>       </div>       <div class="col-md-5">          <div class="">             <label id="name" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Name"/>             </label>             </label>' + jobArr[idx].OB_CUST_NAME + '          </div>          <div class="">             <label id="wngs_num" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.SelectedWingsNo"/>             </label>             </label>' + jobArr[idx].WINGS_MOB_NO + '                   </div>          <div class="">             <label id="ekyc_ir" class="bold width50">                                             <label>                <s:text name="helpdesk.gridhtml.EKYCIr" />             </label>             </label> ' + irResp + '                   </div>       </div>       <div id="ekyc_info" class="col-md-20 text-center"> ' + jobArr[idx].EKYC_LABLE + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="act_req_dt" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.ActivationRequestDate"/>             </label>             </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '          </div>          <div class="">             <label id="app_no" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.ApplicationNo"/>             </label>             </label> ' + jobArr[idx].APPLICATION_NO + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="app_status" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Status"/>             </label>             </label> ' + jobArr[idx].ACTIVATION_STAT + '          </div>          <div class="">             <label id="remarks" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Remarks"/>             </label>             </label> ' + jobArr[idx].REMARKS + '          </div>       </div>       <div id="activation_info" class="col-md-20 text-center"> </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="activation_date" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.ActivationDate"/>             </label>             </label> ' + jobArr[idx].ACTIVATION_DATE + '          </div>          <div class="">             <label id="circle" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.Circle"/>             </label>             </label> ' + jobArr[idx].CIRCLE_CODE + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="alloted_wings_no" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.AllottedWingsMobile"/>             </label>             </label> ' + jobArr[idx].WINGS_MOB_NO + '          </div>          <div class="">             <label id="wings_pin" class="bold width50">             <label>                <s:text name="helpdesk.gridhtml.WingsPin"/>             </label>             </label> ' + jobArr[idx].WINGS_PIN + '          </div>       </div>       <div class="col-md-20"> ' + jobArr[idx].ACTIVATION_LABEL + ' </div>    </div>';

                    }else{
                        if(jobArr[idx].IMG_UPD_FLAG =='-1'){
                        var docStatus='<label style="color: black" ><h3>Pending</h3></label>';
                        var docsAction='<label style="color: black" ><h3>Pending</h3></label>';
//                        var docsAction='<button type="button" id="action-'+jobArr[idx].CAF_NO+' " class="primarybt" onclick="getUploadDocsInfo(this);">Upload Documents</button><input type="hidden" id="ll_docs_'+jobArr[idx].CAF_NO+'"  poi_type_ll_doc="'+jobArr[idx].POI_TYPE+'" poa_type_ll_doc="'+jobArr[idx].POA_TYPE+'"   ob_caf_ll="'+jobArr[idx].APPLICATION_NO+'">';
                    }else{
                        var docStatus='<label style="color: black" ><h3>Uploaded</h3></label>'; 
                        var docsAction='<i style="color: green" class="fa fa-check fa-3x" aria-hidden="true"> </i>'; 
                    }
                    if(jobArr[idx].IMG_UPD_FLAG !='-1' && jobArr[idx].APPLICATION_NO !=''){
                        var cafONBStatus='<i style="color: green" class="fa fa-check fa-3x" aria-hidden="true"> </i>';
                    }else{
                        var cafONBStatus='<label style="color: red" ><h3>Pending</h3></label>';
                    }
                       if(jobArr[idx].CA_BA_ID =='-1'){
                        var activationStatus='<label style="color: red" ><h3>Pending</h3></label>';
                    }else{
                        var activationStatus='<i class="fa fa-check fa-3x" aria-hidden="true"> </i>'; 
                    }
                        
                     var tabHtml = '<div id="tab' + idx + '" class="tab-pane fade in active">              <div class="row">                    <div class="col-md-5">                        <div class="">                         <label id="reg_mob_ll" class="bold width50">  <label>  <s:text name="helpdesk.gridhtml.registeredmobile" />   </label>    </label>' + jobArr[idx].REG_MOB_NO + '                         </div>                            <div class="">                            <label id="reg_date_ll" class="bold width50">                               <label>                                          <s:text name="helpdesk.gridhtml.registereddate" />                               </label>                              </label> ' + jobArr[idx].REG_DATE_TIME + '                          </div>                   </div>                     <div class="col-md-5">                         <div class="">                                  <label id="reg_name_ll" class="bold width50">                                <label>                                         <s:text name="helpdesk.gridhtml.name" />                                 </label>                            </label>' + jobArr[idx].REG_CUST_NAME + '                        </div>                          <div class="">                               <label id="reg_email_ll" class="bold width50">                               <label>                                          <s:text name="helpdesk.gridhtml.Email" />                              </label>                              </label>' + jobArr[idx].REG_MAIL + '                     </div>                   </div>                    <div class="col-md-20 text-center">                        <div id="reg_info_ll" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i>                     </div>                    </div>             </div>              <hr class="hr">             <div class="row">                   <div class="col-md-5">                        <div class="">                                <label id="service_type_ll" class="bold width50">                                  <label>                                            <s:text name="helpdesk.gridhtml.ll.service.type" />                               </label>                               </label>' + jobArr[idx].SERVICE_TYPE + '                            </div>                     <div class="">                             <label id="docs_sts_ll" class="bold width50">                                 <label>                                       <s:text name="helpdesk.gridhtml.ll.docs" />                                 </label>                               </label> ' + docStatus + '                       </div>                 </div>                     <div class="col-md-5">                       <div class="">                              <label id="pin_exch_ll" class="bold width50">                             <label>                                       <s:text name="helpdesk.gridhtml.ll.pincode" />                               </label>                                </label>' + jobArr[idx].PIN_CODE + ' / ' + jobArr[idx].EXCHANGE_CODE + '                        </div>                                                 </div>                      <div id="kyc_info_ll" class="col-md-20 text-center"> ' + docsAction + '                 </div>               </div>               <hr class="hr">              <div class="row">                  <div class="col-md-5">                        <div class="">                              <label id="caf_date_ll" class="bold width50">                                 <label>                                      <s:text name="helpdesk.gridhtml.ll.cafkycdate" />                              </label>                             </label> ' + jobArr[idx].EKYC_DATE + '                       </div>                          <div class="">                             <label id="caf_no_ll" class="bold width50">                               <label>                                        <s:text name="helpdesk.gridhtml.ll.cafno" />                               </label>                               </label> ' + jobArr[idx].APPLICATION_NO + '                          </div>                    </div>                    <div class="col-md-5">                        <div class="">                             <label id="name_ll" class="bold width50">                                <label>                                          <s:text name="helpdesk.gridhtml.Name" />                                 </label>                                 </label>' + jobArr[idx].OB_CUST_NAME + '                         </div>                           	                    <div class="">                             <label id="poi_type_ll" class="bold width50">                                <label>                                       <s:text name="helpdesk.gridhtml.ll.idproof" />                                </label>             </label> ' + jobArr[idx].POI_TYPE + '                      </div>                     </div>                     <div id="ekyc_info_ll" class="col-md-20 text-center"> ' + cafONBStatus + '                 </div>              </div>               <hr class="hr">               <div class="row">                   <div class="col-md-5">                      <div class="">                           <label id="act_req_dt_ll" class="bold width50">                               <label>                                       <s:text name="helpdesk.gridhtml.ll.active.date" />                             </label>                          </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '                        </div>                        <div class="">                              <label id="bill_acc_no_ll" class="bold width50">                                <label>                                      <s:text name="helpdesk.gridhtml.ll.bill.acc" />                                </label>                                </label> ' + jobArr[idx].BILL_ACCNT_NUM + '                          </div>                    </div>                     <div class="col-md-5">                       <div class="">                            <label id="cust_acc_no_ll" class="bold width50">                                 <label>                                     <s:text name="helpdesk.gridhtml.ll.cust.acc" />                               </label>                               </label> ' + jobArr[idx].CUST_ACCNT_NUM + '                        </div>                          <div class="">                                <label id="remarks_ll" class="bold width50">                                <label>                                           <s:text name="helpdesk.gridhtml.Remarks" />                                </label>             </label> ' + jobArr[idx].REMARKS + '                     </div>                    </div>                     <div id="activation_info_ll" class="col-md-20 text-center"> ' + activationStatus + '                 </div>             </div>               <hr class="hr">              <div class="row">                   <div class="col-md-5">                                                    <div class="">                               <label id="circle_ll" class="bold width50">                                    <label>                                           <s:text name="helpdesk.gridhtml.Circle" />                                 </label>                               </label> ' + jobArr[idx].CIRCLE_CODE + '                             </div>                      <div class="">                               <label id="service_id_ll" class="bold width50">                                   <label>                                     <s:text name="helpdesk.gridhtml.ll.service.id" />                                 </label>             </label> ' + jobArr[idx].SERVICE_ID + '                     </div>                                        </div>                     <div class="col-md-5">                         <div class="">                              <label id="alloted_service_no_ll" class="bold width50">                                <label>                                   <s:text name="helpdesk.gridhtml.ll.allowedno" />                             </label>                         </label> ' + jobArr[idx].WINGS_MOB_NO + '                            </div>                                                  <div class="">                               <label id="clarity_remark_ll" class="bold width50">                                   <label>                                     <s:text name="helpdesk.gridhtml.ll.remark" />                                 </label>             </label> ' + jobArr[idx].CLARITY_REMARKS + '                     </div>                     </div>                      <!-- <div class="col-md-20"> ' + activationStatus + ' </div>-->             </div>                <div class="row">                    <div align="right">                        <!--<button type="button" id="action-'+jobArr[idx].CAF_NO+' " class="primarybt1" onclick="getCustInfoData(this);">Proceed</button>-->                                          <!--<input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'">-->                 </div>             </div>         </div>';
                }
                    data.content = tabHtml;
                    dataSource1.push(data);
                });

                var tabstrip = $("#toolStrip").kendoTabStrip({
                    dataSource: dataSource1,
                    dataTextField: "name",
                    dataContentField: "content",
                    scrollable: true
                }).data("kendoTabStrip");

                tabstrip.select("li:first");
            }
            $('input[type=radio][name=radio]').change(function () {
                $('#searchkey').val('');
                $("#toolStrip").data("kendoTabStrip").setDataSource([]);

            });
            function sendInfoToNE(caf) {
                var caf_num = $('#pay_init_req_' + caf).attr("value");
                var reqData = {};
                reqData.CAF_NO = caf_num;
                $.ajax({
                    url: 'sendPaymentLink.do',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {"reqData": JSON.stringify(reqData)},
                    success: function (res) {
                        var res = JSON.parse(JSON.stringify(res));
                        dataSource1 = [];
                        try {
                            if (res.response.success) {
                                alert(res.response.message);
                            } else {
                                alert(res.response.message);
                            }
                        } catch (e) {
                            alert(e);
                        }
                    }, error: function (data) {
                        alert("error print " + JSON.stringify(data));
                    }
                });
            }

            function nottfyOBPay(caf) {
                var caf_num = $('#onb_pay_req_' + caf).attr("value");
                var reqData = {};
                reqData.CAF_NO = caf_num;
                $.ajax({
                    url: 'sendOBLink.do',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {"reqData": JSON.stringify(reqData)},
                    success: function (res) {
                        var res = JSON.parse(JSON.stringify(res));
                        dataSource1 = [];
                        try {
                            if (res.response.success) {
                                alert(res.response.message);
                            } else {
                                alert(res.response.message);
                            }
                        } catch (e) {
                            alert(e);
                        }
                    }, error: function (data) {
                        alert("error print " + JSON.stringify(data));
                    }
                });
            }
        </script>

    </body>
</html>
