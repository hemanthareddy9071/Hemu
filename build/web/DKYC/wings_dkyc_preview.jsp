<%-- 
    Document   : FMS_kyc_step1
    Created on : Mar 26, 2018, 11:22:07 AM
    Author     : ramesh.a
--%>

<%@page import="com.in10s.logger.AppLogger"%>
<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONSerializer"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <% response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            JSONObject objfrmData = new JSONObject();
            JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_FORM_DATA");
            requestPar.put("ZipFileCreation", "");  
            //requestPar.put("TARIFF_ID_DOC_PATH", "");  
            if (requestPar != null) {
                AppLogger.debug("requestCustFormData" + requestPar);
               objfrmData = requestPar;
               
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
        <!-- Kendo CSS -->
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
         <script src="<%=CSS_JS_PATH%>js/Application/FMS/DKYC_FormValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
            var alrtcafSubsuccess="<s:text name="ekyc.receipt.cafsubmit.succ"/>";
            var alrtpymtIncomp="<s:text name="ekyc.receipt.pymt.incomp"/>";
            var alrtjobUploderr="<s:text name="ekyc.receipt.jobupload.err"/>";
            
        </script>
        
        <script>
            var custFormData='<%=objfrmData%>';
             custFormData=JSON.parse(custFormData);
                history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };  
            var prev_isd="0";
            var prev_ir="0";
            var takeIsdPayment=true;

                $(document).ready(function(){
                        try{
                            
                            if(custFormData.WINGS_TARIFF_PLAN_ID =="WTP6B"){
                                $('#payment_pending').hide();
                                $('#payment_success').show();
                            }  
                        var Payment_Status =$("#Payment_Status").val();
                        if(Payment_Status != ""){
                           
                           var preIsdIrDtls=$("#prev_isdir_dtls").val();
                           if(preIsdIrDtls !=""){
                               
                              preIsdIrDtls=JSON.parse(preIsdIrDtls);
                              prev_isd=preIsdIrDtls.WINGS_ISD;
                              prev_ir=preIsdIrDtls.WINGS_IR;
                           }
                           var isd=custFormData.WINGS_ISD;
                            var ir=custFormData.WINGS_IR;
                                
                                if((prev_ir=='1' || prev_isd =='1')){
                                    takeIsdPayment=false;
                                }else if(!(isd || ir)){
                                   takeIsdPayment=false; 
                                }
                     if(custFormData.WINGS_TARIFF_PLAN_ID =="WTP6B"){
                                $('#payment_pending').hide();
                                $('#payment_success').show();
                            }  
                            else if(custFormData.TARRIF_FLAG == "TRAIL_OFFER"){
                                 takeIsdPayment=false;
                                $('#payment_pending').hide();
                                $('#payment_success').show();
                            } else{
                            if((Payment_Status.toUpperCase()== 'TRUE') && ! takeIsdPayment){
                                $('#payment_pending').hide();
                                $('#payment_success').show();
                            }else{
                                $('#payment_success').hide(); 
                            }
                        }
                        }
                    }catch(e){
                        alert(e)
                    }
                });
             

        </script>

    </head>
    <body onload="setDKYCPreviewData();">
        <form name="FMSDKYC_receipt">
            <input type="hidden" name="reqData" id="reqData"/>
            <input type="hidden" name="ADDRESS" id="ADDRESS"/>
            <input type="hidden" name="editKycFlag" id="editKycFlag"/>
            <input type="hidden" name="subAAdharNo" id="subAAdharNo" value="#session.subAAdharNo"/>
            <input type="hidden" id="kycformFieldsMetaData" value="<s:property value="#session.kycformFieldsMetaData"/>" />
            <input type="hidden" name="JOB_STATUS" id="JOB_STATUS" value="<s:property value="#session.JOB_STATUS"/>" />
            <input type="hidden" name="loginResponse" id="loginResponse" value="<s:property value="#session.loginResponse"/>" />
            <input type="hidden" name="FMS_KYC_Cust_Data" id="FMS_KYC_Cust_Data" value="<s:property value="#session.FMS_KYC_Cust_Data"/>" />
            <input type="hidden" name="JOB_STATUS" id="JOB_STATUS" value="<s:property value="#session.JOB_STATUS"/>" />
            <input type="hidden" name="subs_details" id="subs_details" value="<s:property value="#session.subs_details"/>" />
            <input type="hidden" name="DATE_TIME" id="DATE_TIME" value="<s:property value="#session.DATE_TIME"/>" />
            <input type="hidden" name="RECEIPT_SEQ_NO" id="RECEIPT_SEQ_NO" value="<s:property value="#session.RECEIPT_SEQ_NO"/>" />
            <input type="hidden" name="CSR_CENTER" id="CSR_CENTER" value="<s:property value="#session.CSR_CENTER"/>" />
            <input type="hidden" name="CAF_SEQ_NO" id="CAF_SEQ_NO" value="<s:property value="#session.CAF_SEQ_NO"/>" />
            <input type="hidden" name="Payment_Status" id="Payment_Status" value="<s:property value="#session.Payment_Status"/>" />
            <input type="hidden" name="prev_isdir_dtls" id="prev_isdir_dtls" value="<s:property value="#session.prev_isdir_dtls"/>" />
        </form> 
       
<div class="header"><i class="logo"></i></div>
<div class="clear"></div>
<div class="row">
    <div id="content-wrapper" class="mrg0L">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='#' ><s:text name="ekyc.receipt.nav1"/>  </a></span>       <span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId">DKYC </span></div>
                    <h1 class="page_heading">Preview </h1>
                </div>
            </div>
    <div class="clear mrg65B"></div
            <div class="row preview" id="page_content_block" >

                <div class="col-lg-12 pad10A">
            <div class="mask" style="display:none" id="waitConf">
                <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
            </div>
                    <div class="row">
                        <div class="col-md-12">
                                <h4 class="mrg10B" style=" color: #008cc7 !important;"><s:text name="ekyc.receipt.wngmobno"/></h4>
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.wngmobnum"/></label><span id="wings_mob"></span>       
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                                <h4 class="mrg10B" style=" color: #008cc7 !important;"><s:text name="ekyc.receipt.custdtls"/></h4>
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.custttl"/></label><span id="pre_cust_title"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.fstname"/></label><span id="pre_first_name"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.lstname"/></label><span id="pre_cust_last_name"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.fathusname"/></label><span id="pre_f_h_name"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.dob"/></label><span id="pre_dob"></span>       
                        </div>
<!--                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.age"/></label><span id="pre_age"></span>       
                        </div>-->
<!--                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.nation"/></label><span id="pre_nationality"></span>       
                        </div>-->
<!--                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.custtype"/></label><span id="pre_customer_type"></span>       
                        </div>-->
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.usrcode"/></label><span id="pre_cust_usage_code"></span>       
                        </div>
<!--                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.pretype"/></label><span id=""></span>       
                        </div>-->
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.prefcomm"/></label><span id="pre_cust_pref_comm"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.mobno"/></label><span id="pre_cust_mobile_no"></span>       
                        </div>
<!--                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.altmobno"/></label><span id="pre_alt_mobile_no"></span>       
                        </div>-->
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.email"/></label><span id="pre_email"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6" id="pre_label"></label><span id="pre_cust_home_no"></span>       
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12">
                                <h4 class="mrg10B" style=" color: #008cc7 !important;"><s:text name="ekyc.receipt.contact.dtls"/>  </h4>
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.hnno"/></label><span id="pre_inst_addr_hno"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.vill"/></label><span id="pre_inst_addr_vill"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.city"/></label><span id="pre_inst_addr_city"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.state"/></label><span id="pre_inst_addr_state"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.dist"/></label><span id="pre_inst_addr_district"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.mainloc"/></label><span id="pre_inst_main_locality"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.subloc"/></label><span id="pre_inst_sub_locality"></span>       
                        </div>
                        <div class="col-md-4">
                            <label class="col-md-6"><s:text name="ekyc.receipt.exccode"/></label><span id="pre_inst_exchange_code"></span>       
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12 pad10T">
                            <div class="" id="payment_pending" > 
                                <a href="#"  data-toggle="modal" class="primarybt" onclick="DKYCJOBUpload();"><s:text name="ekyc.receipt.confPay"/></a> 
                                <a href='Login.do' class="primarybt1" ><s:text name="ekyc.receipt.cancel"/>  </a>
                            </div>
                            <div class="" style="display: none" id="payment_success" >
                                <a href="#"   data-toggle="modal" class="primarybt" onclick="DKYCJOBUpload();"><s:text name="ekyc.receipt.confSubmit"/></a><a href='Login.do' class="primarybt1" > <s:text name="ekyc.receipt.cancel"/>  </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row" style="display: none">
                        <div class="col-md-12 PreviewTables">
 
                           
                            <!--Hiding POI and POA details -->
                            <!--<h4 class="mrg10B" style=" color: #008cc7 !important;">POI & POA details  </h4>--> 
                            <table class="table table-noborder table-condensed table_bold" style="display: none">
                                <tr>
                                    <td>Photo ID proof document type :</td>
                                    <td id="pre_poi_type"></td>
                                    <td>Document number :</td>
                                    <td id="pre_poi_number"></td>
                                    <td>Place of issue :</td>
                                    <td id="pre_poi_issue_place"></td>
                                </tr>
                                <tr>
                                    <td>Issuing authority :</td>
                                    <td id="pre_poi_issuing_auth"></td>
                                    <td>Date of issue :</td>
                                    <td id="pre_poi_issue_date"></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Address proof document type :</td>
                                    <td id="pre_poa_type"></td>
                                    <td>Document number :</td>
                                    <td id="pre_poa_number"></td>
                                    <td>Place of issue :</td>
                                    <td id="pre_poa_issue_place"></td>
                                </tr>
                                <tr>
                                    <td>Issuing authority :</td>
                                    <td id="pre_poa_issuing_auth"></td>
                                    <td>Date of issue :</td>
                                    <td id="pre_poa_issue_date"></td>
                                    <td></td>
                                    <td></td>
                                </tr>

                            </table>
<!--                            <h4 class="mrg10B" style=" color: #008cc7 !important;">Nominee Details </h4>
                             <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td>Nominee type  :</td>
                                    <td id="pre_nominee_type"  ></td>
                                    <td >Nominee Value :</td>
                                    <td id="pre_nominee_value"></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                             </table>-->
<!--                            <h4 class="mrg10B" style=" color: #008cc7 !important;">Service details </h4>
                            <table class="table table-noborder table-condensed table_bold">
                                <tr>
                                    <td>Service type  :</td>
                                    <td id="pre_service_type"  ></td>
                                    <td >Plan/Remarks :</td>
                                    <td id="pre_comments"></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td id="bb_conns_lbl" style="display: none">No. of BroadBand connections :</td>
                                    <td id="bb_conns" style="display: none"></td>
                                    <td id="voice_conns_lbl" style="display: none">No. of Voice connections :</td>
                                    <td id="voice_conns" style="display: none"></td>
                                    <td id="pre_bb_only_lbl">Broadband only :</td>
                                    <td id="pre_bb_only"></td>
                                    <td id="pre_bb_req_yes_lbl">Broadband req. yes :</td>
                                    <td id="pre_bb_req_yes"></td>
                                    <td id="pre_connection_type_lbl">Connection type :</td>
                                    <td id="pre_connection_type"></td>

                                </tr>


                            </table>-->
                        </div>
                        <div class="col-md-12">
                            
                                </div>
                             <!--<button type="button" id="payment_pending" class="primarybt1" onclick="fmseKYCJOBUpload('false');">Confirm & Pay</button>-->
                            <!--<button id='payment_success' style="display: none" href='#' class="primarybt1" onclick="fmseKYCJOBUpload('true');">Confirm & Submit</button>-->
                          
                                <!--<button class="primarybt1" id="uploadFMSjob" onclick="nextBtnInPReview();">Cancel</button></div>-->
                            
                            <div class="clear"></div>
                            <div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>
                                                     
                        </div>
                    </div>
                </div>
            </div>
</div>
        

    </body>
</html>