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
            session = request.getSession();
            JSONObject request1 = (JSONObject) request.getAttribute("loginResponse");
            String serchType = "";
            String serchValue = "";
            String circleValue = "";
            if (request1 != null) {
                if (request1.containsKey("RegMobNum")) {
                    try {
                        serchValue = request1.getString("RegMobNum");
                        circleValue = request1.getString("CIRCLE_SH_CODE");
                    } catch (Exception e) {
                    }
                }
            }
        %>
        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
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
        <script >
  
               history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };  
            var serchValue = '<%= serchValue%>';
            var circleValue = '<%= circleValue%>';
           var otpEmprt="<s:text name="aadhar.otp.empty"/>";
           var alretStatesel="<s:text name="login.alrt.statesel"/>";
           var alretNumStrtWth="<s:text name="login.alrt.mobnum.valdation.stwth"/>";
           var alretNumsecDigit="<s:text name="login.alrt.mobnum.valdation.secdegwth"/>";
           var alret11Digit="<s:text name="login.alrt.mobnum.valdation.11deg"/>";
           var alretmobnoVal="<s:text name="login.alrt.mobnum.valdation.alretmobnoval"/>";
           var alretmobnoempty="<s:text name="login.alrt.mobnum.valdation.empty"/>";
           var alretOnbStatus="<s:text name="login.alrt.onb.status"/>";
           var alretOnbEnable="<s:text name="login.alrt.onb.enable"/>";
           var countDownTime="<s:text name="login.alrt.rsndotp.cntdwn"/>";
           var alertemptyEmail="<s:text name="login.alrt.email.empty"/>";
           var pinEmptylogpage="<s:text name="login.alrt.pincode.empty"/>";
           var notValidPin="<s:text name="login.alrt.pincode.check.invalid"/>";
           var pinNotMapped="<s:text name="login.alrt.pincode.check.not.mapped"/>";
           var otpInvalid="<s:text name="aadhar.otp.invalid"/>";
        </script>
        
        <style>
            .iconBlock{text-align: center;}
        </style>
                <style>
            .k-tabstrip-items .k-state-active {
                background-color: #999;
                background-image: none;
                border-color: #5c6bc0;
            }
            #toolStripc .k-tabstrip-items {
                overflow-x: hidden;
                overflow-y: hidden;
                white-space: nowrap;
            }
        </style>
        
    </head>

    <body onload="loadFMSCircles();" > 
       
        <!--onload="encript();"-->
      <!--onload="loadFMSCircles();"-->
        <div class="header"><i class="logo"></i></div>
        <div class="clear"></div>
        <div class="row">
            <div id="main_class" class="main col-sm-12">
                <div class="mask" style="display:none" id="wait">
                    <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                </div>
                <div class="col-sm-8 pad10A pad0B">
                    <h3 class="mrg15L">Welcome to BSNL Self-registration portal</h3>
                    <h5 class="mrg15L"><b>Landline/Broadband/FTTH services</b></h5>
                     <p class="mrg15L">BSNL offers registration of Landline, Broadband, FTTH services using self-portal. Now you can book your connection online at your convenience and select the desired landline number & plan and fulfill KYC using this portal. You can also call our customer service for assistance to book your connection on call.
                    </p>
                    <h5 class="mrg15L"><b>WINGS</b></h5>
                    <p class="mrg15L">BSNL offers Internet Telephony (VOIP) service with brand name “WINGS”. To use the service, customer needs to install a SIP client (soft app) on any of its smart devices (laptop/smart mobile handset/tablet etc.) having internet which will act as SIP phone to make and receive calls from anywhere in India and shortly available to make and receive call anywhere abroad on additional tariff basis. The subscriber uses its parent IMS core and IP access network of any location for the voice service through BSNL “WINGS”.</p>

                    <div class="clear mrg20B"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-user" aria-hidden="true"></i> New User </h3>
                                    <!--<h3 class="panel-title"><i class="fas fa-phone-office" aria-hidden="true"></i> New User </h3>-->
                                </div>
                                <div class="panel-body pad10A">
                                    <!--<p>New Connections booking can be done by registering the mobile number. <b>Willing customers will be waitlisted and given service on first come first serve basis in Karnataka, Maharashtra & UP-East circles.</b> For other circles connection will be made available by Digital KYC. For registration and activation, enter Mobile Number and click Verify Mobile Number.-->
                                    <p>
                                        <div class="ticklist">
                                        <ul>
                                            <li>Register for Landline and WINGS services online using Digital KYC</li>
                                            <li>WINGS offers FREE Audio/Video calling for one year at one time activation for Rs. 1099/-  + tax as applicable..</li>
                                                                                  
                                        </ul>
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-mobile" aria-hidden="true"></i> BSNL WINGS</h3>
                                </div>
                                <div class="panel-body pad10A">
                                    <p> 
                                     <div class="ticklist">
                                        <ul>
                                            <li>ISD/IR facility is available on WINGS at an additional deposit + Call charges as per tariff.</li>
                                                                                  
                                        </ul>
                                    </div>
                                    </p>
                                    <!--<p class="redtxt bold pad10T"></span></p>-->

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-info-circle" aria-hidden="true"></i> Easy steps to avail New Landline/WINGS connection  </h3>
                                </div>
                                <div class="panel-body pad10A">
                                    <div class="ticklist">
                                        <ul>
                                            <li>Select <b>State</b>,  <b>Mobile Number and Email address</b> to register.</li>
                                            <li>Provide OTP sent to your registered mobile number.</li>
                                            <li> Select the service you wish to avail i.e. Landline/Broadband/FTTH/WINGS (Service currently not available in Mumbai/Delhi metro cities).</li>
                                            <li>Upload your KYC documents i.e. Color Passport size photograph, Proof of Identity (POI), Proof of Address (POA), valid ID card for availing discount plans (click here to see the POI, POA list).</li>
                                            <li>Fill in the Customer Application Form (CAF) and submit.</li>
                                            <li>Make a note of CAF serial number, receipt number and selected Landline/WINGS number for future correspondence.</li>
                                            <li>Call Landline helpdesk 1500/1800-345-1500 for any help.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-sm-4 pad10A">
                    <div class="box pad15A">
<!--                        <div class="center mrg15B">
                            <div class="iconBlock">
                                <img src="<%=CSS_JS_PATH%>images\wings.jpg?ReqParam=<%=CSS_JS_VERSION%>" style="height: 70px; width:auto;">
                                 <h2 class="mrg5A">Login</h2> 
                                <p id="loginLabel"></p>

                                <input type="hidden" name="browserId" id="browserId"/>
                                <s:set var="varLob" value="LOB" />
                                <input type="hidden" id="lob_type" value=""/>

                                <div id="error" class="redtxt pad5B"><b></b></div>
                            </div>
                        </div>-->
                        <h3 class=""><s:text name="login.mainheadline"/></h3>
                        
                        <div class="">
                      
                            <!--<input type="hidden" name="reqData" id="reqData"/>-->
                            
                            <div class="form-group">
                                <label><s:text name="login.sel.state"/><span class="redtxt">*</span></label>
                                <select  id="zoneCode" name="select" class="txtinput" onchange="clearScreen('1');">
                                </select>

                            </div>
                            <div class="form-group">
                                <label><s:text name="login.pincode.num"/><span class="redtxt">*</span></label>
                                <input name="target" type="text"  class="txtinput" value="" onkeypress="return isNumberKey(event);" id="log_pincode" onkeyup="checkPinCodeValid();" placeholder="Enter Pincode" maxlength="6" >
                            </div>
                            <div class="form-group">
                                <label><s:text name="login.email.id"/><span class="redtxt">*</span></label>
                                <input name="target" type="text"  class="txtinput" value="" id="log_email" placeholder="Enter Email Address" maxlength="40" >
                            </div>

                            <div class="form-group">
                                <label><s:text name="login.mob.num"/><span class="redtxt">*</span></label>
                                <input name="target" type="text"  class="txtinput" value="" id="filterTxt" placeholder="Enter mobile number" maxlength="11" >
                            </div>

                                <div class="form-group"  id="enterotpdiv">
                                    <!--<label>OTP <span class="redtxt">*</span></label>-->
                                    <input  style="display: none" type="text" class="txtinput" id="enterotp" placeholder="Enter OTP" maxlength="6"/>
                                </div>
                                
                                <div id="otpResend" class="form-group" >
                                    <a href="#">  <label id="m_timer" class="left text-danger" ></label></a> <a href="#" style="display: none" class="mrg5R right" id="resnbuttn" onclick="resendOtp()">Resend OTP</a> 
                                </div>
                                <div class="clear"></div>
                                <button type="button" id="fetchData" class="primarybt1" ><s:text name="login.verifymobnum.btn"/></button>
                            <button id='verifyOtpphone' style="display: none" href='#' class="primarybt1" ><s:text name="login.verifyotp.btn"/></button><a class="secondarybt" onclick="clearScreen();"><s:text name="login.cancel.btn"/></a>
                                <!--<a class="secondarybt" onclick="downloadPdf();">DownloadPdf</a>-->
                        </div>
                        <div class="col-md-6" style="display: none">
                            <button type="button" id="newRegbtn" class="btn btn-info btn-lg btn-block" data-toggle="modal" data-target="#NewRegistration">New<br>Registration</button>
                        </div>
                        <div class="col-md-6"  style="display: none">
                            <button   id="btnTrigger" class="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#myModal">Already<br>Registered</button>
                        </div> 
                        <div class="clear mrg10B"></div>
                          
                            <div>
                            </div>
                    </div>
                                
                                 
                                <div class=""><h3 class="mrg10T"> Landline</h3></div>
                    <div class="clear mrg20B">
                        <p>
                                       For complete list of landline plans click the given link and select your circle 
                                       <a href="http://www.bsnl.co.in/opencms/bsnl/BSNL/services/landline/tele_tariff.html">
                                            Landline Tariff </a>
                                    </p>

                    </div>
<div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"><i class="fa fa-info-circle" aria-hidden="true"></i> WINGS  </h3>
                                </div>
                                <div class="panel-body pad10A pad0T">
                                    <div class="ticklist">
                                        <ol>
                                            <li>One time registration charge Rs. 1099/- + taxes as applicable</li>
                                            <li>No fixed monthly charges</li>
                                            <li>No Installation and activation charge.</li>
                                            <li>ISD/IR is available on paying security deposit + call charges as per tariff</li>
                                            <li>Call charges free to any network for one year in India</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                                <!--
                   <div class=""><h3 class="mrg10T"> WINGS</h3></div>
                    <div class="">
                        <img src="<%=CSS_JS_PATH%>images/plan.png?ReqParam=<%=CSS_JS_VERSION%>" class="img-responsive">

                    </div>
                    -->
                  
                        
                </div>
                    <div class="clear mrg20B"></div>
            </div>
                        <div id="grid_class" style="display: none"class="main col-sm-12">
                             
                            <div align="right" ><button type="button" id="" class="primarybt" onclick="newRegisterReq();"><s:text name="login.grid.newreg.btn"/></button></div>
                            <div class="clear mrg20B"></div>
                            <div  class="demo-section k-content">
                            <div id="toolStripc" >
<!--                                <div id="appendTabs" class="tab-content pad10A" >
                                </div>-->
                            </div>
                        </div>
                        </div>
                             <div class="clear mrg20B"></div>
                              <div class="clear mrg20B"></div>
        </div>
<div class="pre-footer" style="background:none repeat scroll 0 0 #3E4D5C;color:#fff">
      <div class="container">
        <div class="row">
          <!-- BEGIN BOTTOM ABOUT BLOCK -->
          <div class="col-md-4 col-sm-4 pre-footer-col">
            <h2>About us</h2>
            <p>Bharat Sanchar Nigam Ltd. was incorporated on 15th september 2000 . It took over the business of providing of telecom services and network management from the erstwhile Central Government Departments of Telecom Services (DTS) and Telecom Operations (DTO), with effect from 1st October' 2000 on going concern basis.It is one of the largest &amp; leading public sector units providing comprehensive range of telecom services in India. </p>

            
          </div>
          <!-- END BOTTOM ABOUT BLOCK -->

          <!-- BEGIN BOTTOM CONTACTS -->
          <div class="col-md-4 col-sm-4 pre-footer-col">
            <h2>Our Contacts</h2>
            <address class="margin-bottom-40">
              Corporate Office<br>
              Bharat Sanchar Bhavan<br>
              Harish Chandra Mathur Lane<br>
              Janpath, New Delhi-110 001<br>
              Phone: 1800-345-1500<br>             
              <!-- Email: <a href="mailto:info@metronic.com">info@bsnl.co.in</a><br>-->
              Corporate identity Number<br> 
			  (CIN):U74899DL2000GOI107739             
            </address>
            
          </div>
          <!-- END BOTTOM CONTACTS -->
          
           <!-- BEGIN BOTTOM CONTACTS -->
          <div class="col-md-4 col-sm-4 pre-footer-col">
           <h2>Customer Care</h2>
            <h4 style="color:#59CCF9" class="margin-bottom-0">Landline / Broadband</h4>
            1800-345-1500
            <p></p>
            <h4 style="color:#59CCF9" class="margin-bottom-0">GSM Postpaid / Prepaid</h4>
            1800-180-1503
            <p></p>
            <h4 style="color:#59CCF9" class="margin-bottom-0">WLL / CDMA</h4>
            1800-180-1502
            <br>
          
          </div>

          
          
          <!-- BEGIN TWITTER BLOCK --> 
         <!-- <div class="col-md-4 col-sm-6 pre-footer-col">
            <h2 class="margin-bottom-0">Latest Tweets</h2>
            <a class="twitter-timeline" href="https://twitter.com/twitterapi" data-tweet-limit="2" data-theme="dark" data-link-color="#57C8EB" data-widget-id="455411516829736961" data-chrome="noheader nofooter noscrollbar noborders transparent">Loading tweets by @keenthemes...</a>
          </div>-->
          <!-- END TWITTER BLOCK -->
        </div>
      </div>
    </div>
	<div class="footer" style="background:none repeat scroll 0 0 #364554;color:#fff; padding-top: 0px; padding-bottom: 5px;">
      <div class="container">
        <div class="row">
          <!-- BEGIN COPYRIGHT -->
          <div class="col-md-6 col-sm-6 padding-top-10">
            Copyright &copy; 2018 Intense Technologies Limited. All rights reserved. <a href="PrivacyPolicy.jsp">Privacy Policy</a> | <a href="LegalDisclaimer.jsp">Legal Disclaimer</a>
          </div>
          <!-- END COPYRIGHT -->
          <!-- BEGIN PAYMENTS -->
          <div class="col-md-6 col-sm-6">
           
          </div>
          <!-- END PAYMENTS -->
        </div>
      </div>
    </div>

        <!-- <div class="footer">Copyright &copy; 2018 Intense Technologies Limited. All rights reserved.</div> -->
        <!-- Modal -->
        

        <div id="myModal" class="modal fade" data-backdrop="static" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <form name="regUsrFrm" >
                    <input type="hidden" style="display: none" name="reqData" id="reqData"/>
                </form>
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" id="cross" class="close" onclick="clearScreen();" data-dismiss="modal" >&times;</button>
                        <h4 class="modal-title"><s:text name="login.popup.label"/></h4>
                        
                    </div>
                        
                    <div class="modal-body" >   
                        
                        <div class="left pad10T" id="disable_circle_msg" style="display: none"><b><span class="redtxt"><s:text name="wings.reg.grid.info"/></span></b></div>
                        <div align="right" ><button type="button" id="" class="primarybt" onclick="newRegisterReq();"><s:text name="login.grid.newreg.btn"/></button></div>
                        <div class="clear mrg10B"></div>
                        <!--<div id="wingsDataGrid"></div>-->
                       
<!--                        <div  class="demo-section k-content">
                            <div id="toolStrip" >
                                <div id="appendTabs" class="" >
                                </div>
                            </div>
                        </div>-->
                       
                    </div>

                </div>
            </div>
        </div>
                        
           <div id="divWingsAvail" class="modal fade"  data-backdrop="static" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" id="cross" class="close" onclick="clearScreen();" data-dismiss="modal" >&times;</button>
                            <h4 class="modal-title">Message</h4>
                        </div>
                        <div class="modal-body">                      
                                    <!--<a href="images/praveen.pdf" download><img src="images/pdf.png"  width="50" height="50"></a>-->
                                    <div class="item " style="text-align:center;"> <img src="<%=CSS_JS_PATH%>images/image003.jpg?ReqParam=<%=CSS_JS_VERSION%>" alt=""> </div>
                                    <div id="wl_job_upload"><b><span class="redtxt"><s:text name="wings.reg.info"/></span></b></div>

                          
                        </div>
                        <div class="modal-footer">
                            <a href='Login.do' class="secondarybt" >Ok</a> 
                        </div>
                    </div>
                </div>
            </div>
           <div id="divWingsmsg" class="modal fade"  tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Message</h4>
                        </div>
                        <div class="modal-body">
                            <div class="">
                                <ul>
                                    <!--<a href="images/praveen.pdf" download><img src="images/pdf.png"  width="50" height="50"></a>-->
                                    <div class="item " style="align-items: center"> <img src="<%=CSS_JS_PATH%>images/image003.jpg?ReqParam=<%=CSS_JS_VERSION%>" alt=""> </div>
                                    <li id="wl_job_upload"><b><span class="redtxt"><s:text name="wings.reg.grid.info"/></span></b></li>

                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href='#' data-dismiss= 'modal' class='secondarybt'>Ok</a> 
                        </div>
                    </div>
                </div>
            </div>

        <script>
    
    
    function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }
            
$("#filterTxt").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#fetchData").click();
    }
});

$("#fetchData").click(function() {
  sendOTPRequest('internal');
  $("#enterotp").focus();
});

$("#enterotp").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#verifyOtpphone").click();
    }
});

$("#verifyOtpphone").click(function() {
verfyOTPAndSubmit('internal');
});
        function encript(){
//      Date.parse("05/05/2010").toString("MMMM yyyy");

        var reqData={}
        reqData.CAF_NO='WL_10000002';
//        reqData.REQ_DATE=1535618030000; 
        
     console.log(":::"+ encrypt(JSON.stringify(reqData)));
    }     

     function ifPossible(){
          if(serchValue != ""){
              $("#main_class").hide();
             //$("#myModal").modal('show');
              $('#filterTxt').val(serchValue);
//              $("select#zoneCode option[stateCode='"+ circleValue +"']").prop("selected", "selected");
              $("#zoneCode").find('option[stateCode="' + circleValue + '"]').prop("selected", true)
//             loadWingsDataGrid2(serchValue,circleValue);
             loadWingsDataGrid();
          }
          }

          $('#zoneCode').on('change',function(){
             if($('#zoneCode').find("option:selected").attr('isCircleEnable')=='2'){
                  $('#divWingsAvail').modal('show');
             }             
          });
           var jobArr = [];
          var dataSource2=[];
          function loadCustInfoTabs(){
              jobArr=wingsGridData;
              var disconnectLbl='<label style="color: #008cc7" ><h5><b>Request Submitted for Disconnection<b></h5></label>';
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
                    if(jobArr[idx].SERVICE_TYPE.toUpperCase() == "WINGS"){
                   
                    var tabHtml = '  <div id="tab' + idx + '" class="tab-pane fade in active">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="reg_mob" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registeredmobile" />             </label>             </label>' + jobArr[idx].REG_MOB_NO + '          </div>          <div class="">             <label id="reg_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registereddate" />             </label>             </label> ' + jobArr[idx].REG_DATE_TIME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="reg_name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.name" />             </label>             </label>' + jobArr[idx].REG_CUST_NAME + '          </div>          <div class="">             <label id="reg_email" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Email" />             </label>             </label>' + jobArr[idx].REG_MAIL + '          </div>       </div>       <div class="col-md-20 text-center">          <div id="reg_info" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> </div>       </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="pay_dttm" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.PaymentDateTime" />             </label>             </label>' + jobArr[idx].PAY_DATE_TIME + '          </div>          <div class="">             <label id="bnk_nme" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.BankName" />             </label>             </label>' + jobArr[idx].PAY_BANL_NAME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="txn_id" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.TransactionID" />             </label>             </label>' + jobArr[idx].PAY_TXN_ID + '          </div>          <div class="">             <label id="txn_sts" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> ' + jobArr[idx].PAY_STATUS + '          </div>       </div>       <div id="pay_info" class="col-md-20 text-center"> ' + jobArr[idx].PYMT_LABEL + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="ekyc_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCDate" />             </label>             </label> ' + jobArr[idx].EKYC_DATE + '          </div>          <div class="" style="display:none">             <label id="aadhar_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AadhaarNumber" />             </label>             </label> ' + jobArr[idx].AADHAR_NO + '          </div> 		 <div class="">             <label id="ekyc_isd" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIsd" />             </label>             </label> ' + isdResp + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Name" />             </label>             </label>' + jobArr[idx].OB_CUST_NAME + '          </div>          <div class="">             <label id="wngs_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.SelectedWingsNo" />             </label>             </label>' + jobArr[idx].WINGS_MOB_NO + '          </div> 		 <div class="">             <label id="ekyc_ir" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIr" />             </label>             </label> ' + irResp + '          </div>       </div>       <div id="ekyc_info" class="col-md-20 text-center"> ' + jobArr[idx].EKYC_LABLE + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="act_req_dt" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationRequestDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '          </div>          <div class="">             <label id="app_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ApplicationNo" />             </label>             </label> ' + jobArr[idx].APPLICATION_NO + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="app_status" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> ' + jobArr[idx].ACTIVATION_STAT + '          </div>          <div class="">             <label id="remarks" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Remarks" />             </label>             </label> ' + jobArr[idx].REMARKS + '          </div>       </div>       <div id="activation_info" class="col-md-20 text-center"> </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="activation_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_DATE + '          </div>          <div class="">             <label id="circle" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Circle" />             </label>             </label> ' + jobArr[idx].CIRCLE_CODE + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="alloted_wings_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AllottedWingsMobile" />             </label>             </label> ' + jobArr[idx].WINGS_MOB_NO + '          </div>          <div class="">             <label id="wings_pin" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.WingsPin" />             </label>             </label> ' + jobArr[idx].WINGS_PIN + '          </div>       </div>       <div class="col-md-20"> ' + jobArr[idx].ACTIVATION_LABEL + ' </div>    </div>    <div class="row">       <div align="right">             <button type="button" id="action-'+jobArr[idx].CAF_NO+'" class="primarybt1" onclick="getCustInfoData(this);">Proceed</button><a href="Login.do" class="primarybt">cancel </a>             <input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'" wings_plan_id="'+jobArr[idx].WINGS_PLAN_ID+'"> </div>    </div> </div>';
                    if(jobArr[idx].PAY_STATUS =='TRAIL' || jobArr[idx].PAY_STATUS=='TRIAL'){
                       tabHtml = '  <div id="tab' + idx + '" class="tab-pane fade in active">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="reg_mob" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registeredmobile" />             </label>             </label>' + jobArr[idx].REG_MOB_NO + '          </div>          <div class="">             <label id="reg_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registereddate" />             </label>             </label> ' + jobArr[idx].REG_DATE_TIME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="reg_name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.name" />             </label>             </label>' + jobArr[idx].REG_CUST_NAME + '          </div>          <div class="">             <label id="reg_email" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Email" />             </label>             </label>' + jobArr[idx].REG_MAIL + '          </div>       </div>       <div class="col-md-20 text-center">          <div id="reg_info" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> </div>       </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="pay_dttm" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.PaymentDateTime" />             </label>             </label>' + jobArr[idx].PAY_DATE_TIME + '          </div>          <div class="">             <label id="bnk_nme" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.BankName" />             </label>             </label>' + jobArr[idx].PAY_BANL_NAME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="txn_id" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.TransactionID" />             </label>             </label>' + jobArr[idx].PAY_TXN_ID + '          </div>          <div class="">             <label id="txn_sts" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> ' + jobArr[idx].PAY_STATUS + '          </div>       </div>       <div id="pay_info" class="col-md-20 text-center"> ' + jobArr[idx].PYMT_LABEL + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="ekyc_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCDate" />             </label>             </label> ' + jobArr[idx].EKYC_DATE + '          </div>          <div class="" style="display:none">             <label id="aadhar_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AadhaarNumber" />             </label>             </label> ' + jobArr[idx].AADHAR_NO + '          </div> 		 <div class="">             <label id="ekyc_isd" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIsd" />             </label>             </label> ' + isdResp + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Name" />             </label>             </label>' + jobArr[idx].OB_CUST_NAME + '          </div>          <div class="">             <label id="wngs_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.SelectedWingsNo" />             </label>             </label>' + jobArr[idx].WINGS_MOB_NO + '          </div> 		 <div class="">             <label id="ekyc_ir" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIr" />             </label>             </label> ' + irResp + '          </div>       </div>       <div id="ekyc_info" class="col-md-20 text-center"> ' + jobArr[idx].EKYC_LABLE + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="act_req_dt" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationRequestDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '          </div>          <div class="">             <label id="app_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ApplicationNo" />             </label>             </label> ' + jobArr[idx].APPLICATION_NO + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="app_status" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> ' + jobArr[idx].ACTIVATION_STAT + '          </div>          <div class="">             <label id="remarks" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Remarks" />             </label>             </label> ' + jobArr[idx].REMARKS + '          </div>       </div>       <div id="activation_info" class="col-md-20 text-center"> </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="activation_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_DATE + '          </div>          <div class="">             <label id="circle" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Circle" />             </label>             </label> ' + jobArr[idx].CIRCLE_CODE + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="alloted_wings_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AllottedWingsMobile" />             </label>             </label> ' + jobArr[idx].WINGS_MOB_NO + '          </div>          <div class="">             <label id="wings_pin" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.WingsPin" />             </label>             </label> ' + jobArr[idx].WINGS_PIN + '          </div>       </div>       <div class="col-md-20"> ' + jobArr[idx].ACTIVATION_LABEL + ' </div>    </div>    <div class="row">       <div align="right">         <button type="button" id="action-'+jobArr[idx].CAF_NO+'" class="primarybt1" onclick="getCustInfoTrial(this);">Proceed</button>    <a href="Login.do" class="primarybt">cancel </a>             <input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'"> </div>    </div> </div>';
                            //<button type="button" id="action-'+jobArr[idx].CAF_NO+'" class="primarybt1" onclick="getCustInfoTrial(this);">Proceed</button>                  
                      }
                    if(jobArr[idx].WINGS_PLAN_ID =='WTPD' ){
                       tabHtml = '  <div id="tab' + idx + '" class="tab-pane fade in active">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="reg_mob" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registeredmobile" />             </label>             </label>' + jobArr[idx].REG_MOB_NO + '          </div>          <div class="">             <label id="reg_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.registereddate" />             </label>             </label> ' + jobArr[idx].REG_DATE_TIME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="reg_name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.name" />             </label>             </label>' + jobArr[idx].REG_CUST_NAME + '          </div>          <div class="">             <label id="reg_email" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Email" />             </label>             </label>' + jobArr[idx].REG_MAIL + '          </div>       </div>       <div class="col-md-20 text-center">          <div id="reg_info" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i> </div>       </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="pay_dttm" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.PaymentDateTime" />             </label>             </label>' + jobArr[idx].PAY_DATE_TIME + '          </div>          <div class="">             <label id="bnk_nme" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.BankName" />             </label>             </label>' + jobArr[idx].PAY_BANL_NAME + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="txn_id" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.TransactionID" />             </label>             </label>' + jobArr[idx].PAY_TXN_ID + '          </div>          <div class="">             <label id="txn_sts" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> '+disconnectLbl+'        </div>       </div>       <div id="pay_info" class="col-md-20 text-center"> ' + jobArr[idx].PYMT_LABEL + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="ekyc_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCDate" />             </label>             </label> ' + jobArr[idx].EKYC_DATE + '          </div>          <div class="" style="display:none">             <label id="aadhar_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AadhaarNumber" />             </label>             </label> ' + jobArr[idx].AADHAR_NO + '          </div> 		 <div class="">             <label id="ekyc_isd" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIsd" />             </label>             </label> ' + isdResp + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="name" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Name" />             </label>             </label>' + jobArr[idx].OB_CUST_NAME + '          </div>          <div class="">             <label id="wngs_num" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.SelectedWingsNo" />             </label>             </label>' + jobArr[idx].WINGS_MOB_NO + '          </div> 		 <div class="">             <label id="ekyc_ir" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.EKYCIr" />             </label>             </label> ' + irResp + '          </div>       </div>       <div id="ekyc_info" class="col-md-20 text-center"> ' + jobArr[idx].EKYC_LABLE + ' </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="act_req_dt" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationRequestDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '          </div>          <div class="">             <label id="app_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ApplicationNo" />             </label>             </label> ' + jobArr[idx].APPLICATION_NO + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="app_status" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Status" />             </label>             </label> ' + jobArr[idx].ACTIVATION_STAT + '          </div>          <div class="">             <label id="remarks" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Remarks" />             </label>             </label> ' + jobArr[idx].REMARKS + '          </div>       </div>       <div id="activation_info" class="col-md-20 text-center"> </div>    </div>    <hr class="hr">    <div class="row">       <div class="col-md-5">          <div class="">             <label id="activation_date" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.ActivationDate" />             </label>             </label> ' + jobArr[idx].ACTIVATION_DATE + '          </div>          <div class="">             <label id="circle" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.Circle" />             </label>             </label> ' + jobArr[idx].CIRCLE_CODE + '          </div>       </div>       <div class="col-md-5">          <div class="">             <label id="alloted_wings_no" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.AllottedWingsMobile" />             </label>             </label> ' + jobArr[idx].WINGS_MOB_NO + '          </div>          <div class="">             <label id="wings_pin" class="bold width50">                                 <label>                <s:text name="helpdesk.gridhtml.WingsPin" />             </label>             </label> ' + jobArr[idx].WINGS_PIN + '          </div>       </div>       <div class="col-md-20"> ' + jobArr[idx].ACTIVATION_LABEL + ' </div>    </div>    <div class="row">       <div align="right">            <a href="Login.do" class="primarybt">cancel </a>             <input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'"> </div>    </div> </div>';
                          
                      }
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
                        
                     var tabHtml = '<div id="tab' + idx + '" class="tab-pane fade in active">              <div class="row">                    <div class="col-md-5">                        <div class="">                         <label id="reg_mob_ll" class="bold width50">  <label>  <s:text name="helpdesk.gridhtml.registeredmobile" />   </label>    </label>' + jobArr[idx].REG_MOB_NO + '                         </div>                            <div class="">                            <label id="reg_date_ll" class="bold width50">                               <label>                                          <s:text name="helpdesk.gridhtml.registereddate" />                               </label>                              </label> ' + jobArr[idx].REG_DATE_TIME + '                          </div>                   </div>                     <div class="col-md-5">                         <div class="">                                  <label id="reg_name_ll" class="bold width50">                                <label>                                         <s:text name="helpdesk.gridhtml.name" />                                 </label>                            </label>' + jobArr[idx].REG_CUST_NAME + '                        </div>                          <div class="">                               <label id="reg_email_ll" class="bold width50">                               <label>                                          <s:text name="helpdesk.gridhtml.Email" />                              </label>                              </label>' + jobArr[idx].REG_MAIL + '                     </div>                   </div>                    <div class="col-md-20 text-center">                        <div id="reg_info_ll" class="text-success "> <i class="fa fa-check fa-3x" aria-hidden="true"> </i>                     </div>                    </div>             </div>              <hr class="hr">             <div class="row">                   <div class="col-md-5">                        <div class="">                                <label id="service_type_ll" class="bold width50">                                  <label>                                            <s:text name="helpdesk.gridhtml.ll.service.type" />                               </label>                               </label>' + jobArr[idx].SERVICE_TYPE + '                            </div>                     <div class="">                             <label id="docs_sts_ll" class="bold width50">                                 <label>                                       <s:text name="helpdesk.gridhtml.ll.docs" />                                 </label>                               </label> ' + docStatus + '                       </div>                 </div>                     <div class="col-md-5">                       <div class="">                              <label id="pin_exch_ll" class="bold width50">                             <label>                                       <s:text name="helpdesk.gridhtml.ll.pincode" />                               </label>                                </label>' + jobArr[idx].PIN_CODE +  ' / ' + jobArr[idx].EXCHANGE_CODE + '                        </div>                                                 </div>                      <div id="kyc_info_ll" class="col-md-20 text-center"> ' + docsAction + '                 </div>               </div>               <hr class="hr">              <div class="row">                  <div class="col-md-5">                        <div class="">                              <label id="caf_date_ll" class="bold width50">                                 <label>                                      <s:text name="helpdesk.gridhtml.ll.cafkycdate" />                              </label>                             </label> ' + jobArr[idx].EKYC_DATE + '                       </div>                          <div class="">                             <label id="caf_no_ll" class="bold width50">                               <label>                                        <s:text name="helpdesk.gridhtml.ll.cafno" />                               </label>                               </label> ' + jobArr[idx].APPLICATION_NO + '                          </div>                    </div>                    <div class="col-md-5">                        <div class="">                             <label id="name_ll" class="bold width50">                                <label>                                          <s:text name="helpdesk.gridhtml.Name" />                                 </label>                                 </label>' + jobArr[idx].OB_CUST_NAME + '                         </div>                           	                    <div class="">                             <label id="poi_type_ll" class="bold width50">                                <label>                                       <s:text name="helpdesk.gridhtml.ll.idproof" />                                </label>             </label> ' + jobArr[idx].POI_TYPE + '                      </div>                     </div>                     <div id="ekyc_info_ll" class="col-md-20 text-center"> ' + cafONBStatus + '                 </div>              </div>               <hr class="hr">               <div class="row">                   <div class="col-md-5">                      <div class="">                           <label id="act_req_dt_ll" class="bold width50">                               <label>                                       <s:text name="helpdesk.gridhtml.ll.active.date" />                             </label>                          </label> ' + jobArr[idx].ACTIVATION_REQ_DATE + '                        </div>                        <div class="">                              <label id="bill_acc_no_ll" class="bold width50">                                <label>                                      <s:text name="helpdesk.gridhtml.ll.bill.acc" />                                </label>                                </label> ' + jobArr[idx].BILL_ACCNT_NUM + '                          </div>                    </div>                     <div class="col-md-5">                       <div class="">                            <label id="cust_acc_no_ll" class="bold width50">                                 <label>                                     <s:text name="helpdesk.gridhtml.ll.cust.acc" />                               </label>                               </label> ' + jobArr[idx].CUST_ACCNT_NUM + '                        </div>                          <div class="">                                <label id="remarks_ll" class="bold width50">                                <label>                                           <s:text name="helpdesk.gridhtml.Remarks" />                                </label>             </label> ' + jobArr[idx].REMARKS + '                     </div>                    </div>                     <div id="activation_info_ll" class="col-md-20 text-center"> ' + activationStatus + '                 </div>             </div>               <hr class="hr">              <div class="row">                   <div class="col-md-5">                                                    <div class="">                               <label id="circle_ll" class="bold width50">                                    <label>                                           <s:text name="helpdesk.gridhtml.Circle" />                                 </label>                               </label> ' + jobArr[idx].CIRCLE_CODE + '                             </div>                      <div class="">                               <label id="service_id_ll" class="bold width50">                                   <label>                                     <s:text name="helpdesk.gridhtml.ll.service.id" />                                 </label>             </label> ' + jobArr[idx].SERVICE_ID + '                     </div>                                        </div>                     <div class="col-md-5">                         <div class="">                              <label id="alloted_service_no_ll" class="bold width50">                                <label>                                   <s:text name="helpdesk.gridhtml.ll.allowedno" />                             </label>                         </label> ' + jobArr[idx].WINGS_MOB_NO + '                            </div>                                                  <div class="">                               <label id="clarity_remark_ll" class="bold width50">                                   <label>                                     <s:text name="helpdesk.gridhtml.ll.remark" />                                 </label>             </label> ' + jobArr[idx].CLARITY_REMARKS + '                     </div>                     </div>                      <!-- <div class="col-md-20"> ' + activationStatus + ' </div>-->             </div>                <div class="row">                    <div align="right">                        <!--<button type="button" id="action-'+jobArr[idx].CAF_NO+' " class="primarybt1" onclick="getCustInfoData(this);">Proceed</button>-->                     <a href="Login.do" class="primarybt">cancel </a>                       <!--<input type="hidden" id="wings_data_'+jobArr[idx].CAF_NO+'" value="'+encriptData+'" ob_enable="'+jobArr[idx].OB_ENABLE+'" wings_isd="'+jobArr[idx].WINGS_ISD+'" wings_ir="'+jobArr[idx].WINGS_IR+'" ob_status="'+jobArr[idx].OB_STATUS+'" pay_status="'+jobArr[idx].PAY_STATUS+'"  ob_caf="'+jobArr[idx].APPLICATION_NO+'">-->                 </div>             </div>         </div>';
                    }
                    data.content = tabHtml;
                    dataSource2.push(data);
                });
                var tabstrip = $("#toolStripc").kendoTabStrip({
                    dataSource:dataSource2 ,
                    dataTextField: "name",
                    dataContentField: "content",
                    
                }).data("kendoTabStrip");

                tabstrip.select("li:first");
              
          }
          
        function getUploadDocsInfo(obj){
        var target = obj.getAttribute('id');
        var id = target.split("-")[1];
        
    var poi_type = $("#ll_docs_" + id).attr('poi_type_ll_doc');
    var poa_type = $("#ll_docs_" + id).attr('poa_type_ll_doc');
    var caf_no = $("#ll_docs_" + id).attr('ob_caf_ll');
        var reqData={}
        reqData.REG_MOB_NO=serchValue;
        reqData.CIRCLE=circleValue;
        reqData.WL_CAF_NO=id;
        reqData.CAF_NO=caf_no;
        reqData.POI_TYPE=poi_type;
        reqData.POA_TYPE=poa_type;
        document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
        document.regUsrFrm.method = "post";
        document.regUsrFrm.action = "processSkippedDocs.do";
        document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
        document.regUsrFrm.submit();
//        $.ajax({
//        url: 'checkUploadDocs.do',
//        type: 'POST',
//        async: false,
//        dataType: 'json',
//        data: {"reqData": encrypt(JSON.stringify(reqData))},
//        success: function (res) {
//            if (res.response.success) {
//              
//
//            } else {
//                alert(res.response.message);
//            }
//
//        }, error: function (data) {
//            alert("error print " + JSON.stringify(data));
//        }
//    });
          }
          
          function getCustInfoTrial(obj){
  
               var target = obj.getAttribute('id');
                var id = target.split("-")[1];
                var custData = $("#wings_data_" + id).val();
                var ob_enable = $("#wings_data_" + id).attr('ob_enable');
                var ob_status = $("#wings_data_" + id).attr('ob_status');
                var wings_isd = $("#wings_data_" + id).attr('wings_isd');
                var wings_ir = $("#wings_data_" + id).attr('wings_ir');
                var pay_status = $("#wings_data_" + id).attr('pay_status');
                  if(pay_status.toUpperCase() !='SUCCESS'){
                        var reqData = {};
                        var ob_caf = $("#wings_data_" + id).attr('ob_caf');
                        if(ob_caf.trim() !=""){
                        reqData.CAF_NO = ob_caf;
                        reqData.TYPE = "TRIAL";
                        document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
                        document.regUsrFrm.method = "post";
                        document.regUsrFrm.action = "PayWingsAmt.do";
                        document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
                        document.regUsrFrm.submit();
                      
                      
                  }else{
                alert("Invalid Request");
            }
        }else{
                      alert('Paymet Done');
                  }
    
          }
          
     


        </script>

    </body>
</html>
