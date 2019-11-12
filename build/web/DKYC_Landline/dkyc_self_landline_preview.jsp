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
                            JSONObject objDKYCLLJobUpload = null;
            try {
                JSONObject requestPar = (JSONObject) request.getAttribute("DKYC_JOB_INFO");
                if (requestPar != null) {
                    AppLogger.debug("request DKYC LL in  Preview Page::" + requestPar.toString());
                    objDKYCLLJobUpload = requestPar;
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
              history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };
            var llDKYCJobupload = '<%=objDKYCLLJobUpload%>'; 
            
            </script>

</head>
<body onload="setPreviewData();">
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
          <h1 class="page_heading"><s:text name="dekyc.Digital.Preview"/></h1>
        </div>
      </div>
      <div class="clear mrg65B"></div>
      <div class="row box mrg25B" id="page_content_block" >
         <div class="col-lg-12 pad10A">
            <div class="row">
              <div class="col-md-12 PreviewTables">
                  <div id="frachiseDiv" style="display: none">
              <h4 class="mrg10B"><s:text name="dekyc.Digital.Franchiseedetails"/></h4>
                <table class="table table-noborder table-condensed table_bold">
                  <tr>
                    <td><s:text name="dekyc.Digital.Franchiseecode"/></td>
                    <td  class="width80">FS5684522RJY</td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.Address:"/></td>
                    <td><s:text name="dekyc.Digital.InnerRingRoad"/></td>
                  </tr>
                </table>
                  </div>
                <h4 class="mrg10B"><s:text name="dekyc.Digital.Customerdetails"/></h4>
                <table class="table table-noborder table-condensed table_bold">
<!--                  <tr>
                    <td>Customer account no. :</td>
                    <td>652434</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>-->
                  <tr>
                    <td><s:text name="dekyc.Digital.Title"/></td>
                    <td id="cust_title_ecaf" ></td>
                    <td><s:text name="dekyc.Digital.FirstName"/></td>
                    <td id="first_name"></td>
                    <td><s:text name="dekyc.Digital.LastName"/></td>
                    <td id="cust_last_name" ></td>
                  </tr>
                  <tr>
                     <td><s:text name="dekyc.Digital.Father"/></td>
                    <td id="f_h_name" ></td>
                    <td><s:text name="dekyc.Digital.Gender"/></td> 
                    <td id="gender_ecaf" ></td>
                    <td><s:text name="dekyc.Digital.DOB"/></td>
                    <td id="dob" ></td>
                  </tr>
                  <tr>
                    <!-- <td><s:text name="dekyc.Digital.Age"/></td>
                    <td id="age" ></td>-->
                    <td><s:text name="dekyc.Digital.Nationality"/></td>
                    <td id="nationality_ecaf" ></td>
                    <td><s:text name="dekyc.Digital.CustomerType"/></td>
                    <td id="customer_type_ecaf" > </td>
                    <td><s:text name="dekyc.Digital.Usagecode"/></td>
                    <td id="cust_usage_code_ecaf" > </td>
                  </tr>
                  <tr>
                    
                    <td><s:text name="dekyc.Digital.PrepaidType"/></td>
                    <td id="cust_pre_type_ecaf" ></td>
                    <td><s:text name="dekyc.Digital.PreferredCommMethd"/></td>
                    <td id="cust_pref_comm_ecaf" > </td>
                    <td><s:text name="dekyc.Digital.Email"/></td>
                    <td id="email" ></td>
                  </tr>
                  <tr>
<!--                    <td>Home phone no. :</td>
                    <td id="cust_last_name" >040-6325410</td>-->
                    
                    <td> <s:text name="dekyc.Digital.Mobile"/></td>
                    <td id="cust_mobile_no" ></td>
<!--                    <td>Alternate mobile no. : </td>
                    <td id="cust_last_name" >9632587410</td>-->
                  </tr>
<!--                   <tr>
                    <td>Email address :</td>
                    <td id="email" ></td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>-->
                </table>
                <h4 class="mrg10B"><s:text name="dekyc.Digital.Installation"/></h4>
                <table class="table table-noborder table-condensed table_bold">                  
                  <tr>
                    <td><s:text name="dekyc.Digital.House"/></td>
                    <td id="inst_addr_hno" ></td>
                    <td><s:text name="dekyc.Digital.Village"/></td>
                    <td id="inst_addr_vill"> </td>
                    <td><s:text name="dekyc.Digital.City"/></td>
                    <td id="inst_addr_city"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.State"/></td>
                    <td id="inst_addr_state_ecaf"></td>
                    <td><s:text name="dekyc.Digital.District"/></td>
                    <td id="inst_addr_district_ecaf"></td>
                    <td><s:text name="dekyc.Digital.Main"/></td>
                    <td id="inst_main_locality_ecaf"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.Sub"/></td>
                    <td id="inst_sub_locality_ecaf">  </td>
                    <td><s:text name="dekyc.Digital.Exchange"/></td>
                    <td id="inst_exchange_code_ecaf"></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
                
                <h4 class="mrg10B"><s:text name="dekyc.Digital.Billing"/> </h4>
                <table class="table table-noborder table-condensed table_bold" >
                <tr>
                    <td><s:text name="dekyc.Digital.Billingacc"/></td>
                    <td id="bill_acc_no_ecaf"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.Billingacctype"/></td>
                    <td id="bill_acc_type_ecaf"></td>
                    <td><s:text name="dekyc.Digital.Billingacctypesub"/></td>
                    <td id="bill_acc_sub_type_ecaf" ></td>
                    <td><s:text name="dekyc.Digital.BillingF"/></td>
                    <td id="bill_frequency_ecaf" ></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.BillM"/></td>
                    <td id="bill_media_ecaf" ></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </table>
                  <h4 class="mrg10B"><s:text name="dekyc.Digital.BillAdd"/>  </h4>
                <table class="table table-noborder table-condensed table_bold">
                  <tr>
                    <td><s:text name="dekyc.Digital.BillHouseNo"/></td>
                    <td id="bill_addr_house_no" ></td>
                    <td><s:text name="dekyc.Digital.BillVillage"/></td>
                    <td id="bill_addr_vill"> </td>
                    <td><s:text name="dekyc.Digital.BillCity"/></td>
                    <td id="bill_addr_city"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.BillState"/></td>
                    <td id="bill_addr_state_ecaf"></td>
                    <td><s:text name="dekyc.Digital.BillDis"/></td>
                    <td id="bill_addr_district_ecaf"></td>
                    <td><s:text name="dekyc.Digital.BillMain"/></td>
                    <td id="bill_main_locality_ecaf"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.BillSub"/></td>
                    <td id="bill_sub_locality_ecaf">  </td>
                    <td><s:text name="dekyc.Digital.BillEx"/></td>
                    <td id="bill_exchange_code_ecaf"></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
                  <h4 class="mrg10B"><s:text name="dekyc.Digital.POIPOA"/>  </h4>
                <table class="table table-noborder table-condensed table_bold">
                  <tr>
                    <td><s:text name="dekyc.Digital.Photo"/></td>
                    <td id="poi_type_ecaf"></td>
                    <td><s:text name="dekyc.Digital.Document"/></td>
                    <td id="poi_number"></td>
                    <td><s:text name="dekyc.Digital.Place"/></td>
                    <td id="poi_issue_place"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.Issuing"/></td>
                    <td id="poi_issuing_auth_ecaf"></td>
                    <td><s:text name="dekyc.Digital.Dateissue"/></td>
                    <td id="poi_issue_date"></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.AddressPro"/></td>
                    <td id="poa_type_ecaf"></td>
                    <td><s:text name="dekyc.Digital.Documentnumber"/></td>
                    <td id="poa_number"></td>
                    <td><s:text name="dekyc.Digital.PlaceOfisuue"/></td>
                    <td id="poa_issue_place"></td>
                  </tr>
                  <tr>
                    <td><s:text name="dekyc.Digital.auth"/></td>
                    <td id="poa_issuing_auth_ecaf"></td>
                    <td><s:text name="dekyc.Digital.DateOFissue"/></td>
                    <td id="poa_issue_date"></td>
                    <td></td>
                    <td></td>
                  </tr>
                  
                </table>
                <h4 class="mrg10B"><s:text name="dekyc.Digital.Servicedetails"/> </h4>
                <table class="table table-noborder table-condensed table_bold">
                  <tr>
                    <td><s:text name="dekyc.Digital.Stype"/></td>
                    <td id="service_type_ecaf"></td>
                    <td><s:text name="dekyc.Digital.SelectLLNum"/></td>
                    <td id="sel_mob_no"></td>
                    
                  </tr>
                  <tr id="conn_dtls_hide" style="display: none">
<!--                    <td><s:text name="dekyc.Digital.Conntype"/></td>
                    <td id="connection_type_ecaf"></td>-->
                    <td><s:text name="dekyc.Digital.Bonly"/></td>
                    <td id="bb_only_ecaf"></td>
                    <td><s:text name="dekyc.Digital.BREqyes"/></td>
                    <td id="bb_req_yes_ecaf"></td>
                    
                    <td></td>
                    <td></td>
                  </tr>
                 
                </table>
              </div>
              <div class="col-md-12">
                <div class=""> <a href="#CusDec"  data-toggle="modal" class="primarybt"><s:text name="dekyc.Digital.Confirm"/></a> 
<!--                    <a onclick="goBackToLLForm();" class="primarybt1"><s:text name="aadhar.bck.btn"/></a> -->
                    <a onclick="goToHome();" class="secondarybt"><s:text name="dekyc.Digital.Cancel"/></a> 
                </div>
              </div>
              <div class="clear mrg10B"></div>
            </div>
          </div>
         
          <div class="clear "></div>
          
        </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="footer"><s:text name="dekyc.Digital.Copyright"/></div>
	
<div id="CusDec" class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><s:text name="dekyc.Digital.CustomerDeclaration"/></h4>
      </div>
      <div class="modal-body">
        <div class="ticklist">
          <ul>
            <li><s:text name="dekyc.Digital.CustomerDeclaration"/></li>
            <li> <s:text name="dekyc.Digital.InfoPro"/></li>
          </ul>
        </div>
        <div class="clear mrg20B"></div>
<!--        <div class="form-group mrg0B">
          <label>Enter Customer OTP <span class="redtxt">*</span></label>
          <input   type="text" autocomplete="on" class="txtinput " value="">
          <small class="mrg10R">OTP sent to 9876543210 </small> <a href="#ChangeNumber" data-toggle="modal" title="Change mobile number" data-dismiss="modal" class="red" ><i class="fa fa-edit"></i></a> </div>-->
      </div>
        <div class="modal-footer" id="submit_btn"> <a class="primarybt"  href="#" onclick="saveDKYCLLJob();" ><s:text name="dekyc.Digital.Agree"/></a>
        <button type="submit" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Disagree"/></button>
      </div>
    </div>
  </div>
</div>
  <div class="modal fade" id="cancelConf" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header orange">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span> </button>
                            <h4 class="modal-title"><s:text name="dekyc.Digital.Confirmation"/></h4>
                        </div>
                        <div class="modal-body">
                            <p><s:text name="dekyc.Digital.DOu"/></p>
                        </div>
                        <div class="modal-footer">
                            <button id="btnStudent" type="button" class="primarybt" data-dismiss="modal" onclick="confCancel()"><s:text name="dekyc.Digital.Submit"/></button>
                            <button type="button" class="secondarybt" data-dismiss="modal" ><s:text name="dekyc.Digital.Close"/></button>
                        </div>
                    </div>
                </div>
            </div>
<div id="ChangeNumber" class="modal fade" tabindex="-1" aria-hidden="true"  >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><s:text name="dekyc.Digital.ChangeCN"/></h4>
      </div>
      <div class="modal-body">
        <div class="form-group mrg0B">
          <label><s:text name="dekyc.Digital.NANM"/> <span class="redtxt">*</span></label>
          <input   type="text" autocomplete="on" class="txtinput " value="">
       
        
      </div>
      <div class="form-group">
                    <input id="" name="" tabindex="-1" type="checkbox">
                          <label><s:text name="dekyc.Digital.dekyc.Digital.MyOwnAl"/></label>               
                </div>
      </div>
      <div class="modal-footer"> <a class="primarybt" href="#CusDec" data-toggle="modal"  data-dismiss="modal"  ><s:text name="dekyc.Digital.Save"/></a>
        <a type="submit" class="secondarybt"  href="#CusDec" data-toggle="modal"  data-dismiss="modal" ><s:text name="dekyc.Digital.Cancel1"/></a>
      </div>
    </div>
  </div>
</div>

</body>
</html>
