<%@page import="com.in10s.config.CRSAppResources"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">

    <head>
        <% response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache, no-store, private, max-age=0, must-revalidate");
            boolean is_back_action = false;
            String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
            try {
                String reqParam = (String) request.getAttribute("IS_BACK_ACTION");
                if ("TRUE".equals(reqParam)) {
                    is_back_action = true;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        %>
        <script>
            var alretAadharEntUID="<s:text name="aadhar.alrt.enter.uid"/>";
            var alretAadharDec="<s:text name="aadhar.alrt.enter.decl"/>";
            var otpEmprt="<s:text name="aadhar.otp.empty"/>";
            var otpInvalid="<s:text name="aadhar.otp.invalid"/>";
        </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/moment.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/bootstrap-datetimepicker.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_newform.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Authentication.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <%@page import="net.sf.json.JSONObject"%>
        <%@ taglib prefix="s" uri="/struts-tags"%>
        <script>
                history.pushState(null, null, location.href);
                window.onpopstate = function () {
                history.go(1);
            };        
               var setbackButton ='<%=is_back_action%>';
                var loginResponse = {};
            function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }
            function setPrefAction(){
              if(setbackButton =='true'){
                 $('#backButton').show();
                }
            }
            
        </script>
    </head>

    <body onload="setPrefAction();">
       div class="clear"></div>
<div id="page-wrapper" class="container">
  <div class="row">
    <div id="content-wrapper">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
               <div class="breadcrumtxt"> <span class="bluetxt"><a href='#'> <s:text name="aadhar.nav1"/> </a></span>  <span class="larrow">&gt;</span> <span class="bluetxt"><s:text name="aadhar.nav1"/></span></div>
                <h1 class="page_heading"><s:text name="aadhar.cust.auth"/></h1>
                </div>
            </div>

            <div class="clear mrg65B"></div>


            <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="Agent">
                                <div class="clear"></div>
                                <div>
                                    <div class="divInfo">
                                        <div class="form-group">

                                            <div class="pull-left mrg20L">
                                                <label><s:text name="aadhar.enteruid.num"/><span class="redtxt">*</span></label>
                                                <div class="clear mrg30L" id="newAadharDiv" >
                                                    <input type="text" class="col-md-8 form-group pad0A mrg0L form-control" id="inputAadharNum"  maxlength="16" onkeypress="return isNumberKey(event)" onchange="valAADHAARFun(this);" onpaste="return false;"/>
                                                    <a id='otpbtn' href='#' class="primarybt1"  ><s:text name="aadhar.sendotp.labl"/></a>
                                                </div><div class="clear mrg30L" > </div>
                                            </div>
                                        </div>
                                        <div class="clear mrg15B"></div>
                                        <div class="pull-left mrg20L" >
                                        <div class="clear mrg30L" id="otpDiv" style="display: none" >
                                            <label><s:text name="aadhar.enterotp.num"/><span class="redtxt">*</span></label>
                                            <div class="clear mrg30L" id="" >
                                                <input type="text" class="width200px" id="enteredotp" maxlength="6"/>
                                            </div><div class="clear mrg30L" > </div>
                                        </div>
                                        </div>
                                        <div class="clear mrg15B"></div>
                                        <div class="mrg20L">
                                            <ul class="redtxt">
                                                <li id="otpDecl">
                                                    <input  id="ch1" type="checkbox" checked="checked" ><label for="mobileNumber">I hereby give my consent for demographic authentication through UIDAI</</label>
                                                </li>
                                                <li id="otpAuth1" style="display: none" >
                                                    <input id="ch2" type="checkbox" checked="checked" ><label for="mobileNumber">By sharing of Aadhaar OTP, I hereby give my consent to fetch my name, Date of Birth, Address, Gender, and Photo from UIDAI.</</label>
                                                </li>
                                                <li id="otpAuth2" style="display: none">
                                                    <input id="ch3" type="checkbox" checked="checked" ><label for="mobileNumber">This OTP authentication can be treated as my signature</label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="clear mrg25B"></div>

                                </div>
                            </div>
                            <div class="form-group pull-left mrg20L "> 
                                <a id='verifyOtp' style="display: none" href='#' class="primarybt1" ><s:text name="aadhar.verifysubmit.btn"/> </a>
                                <a  id='backButton' style="display: none"  href='backToGrid.do' class="secondarybt" ><s:text name="aadhar.bck.btn"/></a> 
                                <a href='Login.do' class="secondarybt" ><s:text name="aadhar.cncl.btn"/></a>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                <div class="mask" style="display:none" id="wait">
                    <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                </div>
            </div>
            </div>
            <script>
                $("#inputAadharNum").keyup(function(event) {
                        if (event.keyCode === 13) {
                            $("#otpbtn").click();
                        }
                    });

                $("#otpbtn").click(function() {
                 sendOTPRequest('aadhar');
                });


                $("#enteredotp").keyup(function(event) {
                  if (event.keyCode === 13) {
                      $("#verifyOtp").click();
                  }
                });

                $("#verifyOtp").click(function() {
                  verfyOTPAndSubmit('aadhar');
                });

            </script>
 
        
    </body>
</html>