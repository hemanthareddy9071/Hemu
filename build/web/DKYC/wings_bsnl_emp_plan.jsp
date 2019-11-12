<%@page import="com.in10s.config.CRSAppResources"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.in10s.logger.AppLogger"%>
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
            JSONObject reqParam = null;
            JSONObject objDKYCBsnlCustInfo = null;
            JSONArray objDataArr = null;
            String maskMobNum="";
            int otp=0;
            try {
                 otp = (Integer)request.getAttribute("OTP");
                 reqParam = (JSONObject) request.getAttribute("BSNL_EMP_DATA");
                   if (reqParam != null) {
                    AppLogger.debug("request DKYC BSNL EMP FORM::" + reqParam.toString());
                    objDKYCBsnlCustInfo = reqParam.getJSONArray("Data").getJSONObject(0);
                     AppLogger.debug("DKYC BSNL EMP FORM::" + objDKYCBsnlCustInfo.toString());
                  objDataArr = reqParam.getJSONArray("Data");
                
                  
                 String MobNum=objDataArr.getJSONObject(0).getString("MOBILENO");
                    if (!MobNum.isEmpty()) {
                    int srNolength = MobNum.length();
                    int length = srNolength - 4;
                    String xxxx = "";
                    for (int i = 0; i < length; i++) {
                        xxxx = xxxx + "X";
                    }
                    String mask="##" + xxxx + "##";
                    int index = 0;
        StringBuilder masked = new StringBuilder();
        for (int i = 0; i < mask.length(); i++) {
            char c = mask.charAt(i);
            if (c == '#') {
                masked.append(MobNum.charAt(index));
                index++;
            } else if (c == 'X') {
                masked.append(c);
                index++;
            } else {
                masked.append(c);
            }
        }
                    maskMobNum= masked.toString();
                    
                }
                  
                }
                
            } catch (Exception e) {
                AppLogger.debug("Exception in wings bsnl emp plan:" + e);
            }
          
            

        %>

        <meta charset="utf-8">
        <link rel="icon" href="<%=CSS_JS_PATH%>images/BSNL_ICN.png">
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
            var dkycBSNLEmpData = '<%=objDKYCBsnlCustInfo%>';
            var maskNum = '<%=maskMobNum%>';

            if (dkycBSNLEmpData != null) {
                dkycBSNLEmpData = JSON.parse(dkycBSNLEmpData);

            }

        </script>
    </head>

    <body onload="">
        <form name="bsnlEmpOTPPage" enctype="multipart/form-data">
             <input type="hidden"  name="reqData" id="reqData" value="" />
           
        </form>
        <div class="clear"> </div>
        <div id="page-wrapper" class="container">
            <div class="row">

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
                                                    <label><s:text name="wings.bsnl.emp.req.otp"/><span id="maskNum"></span><span class="redtxt">*</span></label>
                                                    <div class="clear mrg25B"></div>
                                                    <!--                                                <div class="clear mrg30L" id="newAadharDiv" >
                                                                                                        <input type="text" class="col-md-8 form-control" id="inputAadharNum"  maxlength="6" onkeypress="return isNumberKey(event)" />
                                                                                                        <a id='otpbtn' href='#' class="primarybt1"  ><s:text name="aadhar.sendotp.labl"/></a>
                                                                                                    </div>-->
                                                    <div class="col-md-7 form-group">
                                                        <!--<label><s:text name="wings.bsnl.emp.req.otp"/><span id="maskNum"></span><span class="redtxt">*</span></label>-->
                                                        <input type="text" class="form-control" id="inputOtpNum"  maxlength="6" onkeypress="return isNumberKey(event)" />
                                                    </div>
                                                    <div id="wngsSelBtn" class="col-md-5 text-center form-group">
                                                        <a id='empotpVal' onclick="validateBSNLEmpOTP();" href='#' class="primarybt1"  ><s:text name="wings.bsnl.emp.verify.otp"/></a>
                                                    </div>
                                                    <div class="clear mrg30L" > </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="clear mrg25B"></div>

                                </div>
                            </div>
                            <div class="form-group pull-left mrg20L "> 

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
        </div>


        <script>
            var otpStr = <%=otp%>;
            function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }


            $('#maskNum').html('<b>' + maskNum + '</b>');
            function validateBSNLEmpOTP() {
                var inputOTP = $('#inputOtpNum').val().trim();
                if (inputOTP != "" ) {
//                    if (inputOTP == $('#bsnlEmpOtp').val()) {

                    if (inputOTP == otpStr && inputOTP.length ==6) {
                        var reqData = dkycBSNLEmpData;
                         reqData.lobType ='WINGS';  
                        document.bsnlEmpOTPPage.method = "post";
                        document.bsnlEmpOTPPage.action = "proceedToOnbEmp.do";
                        document.bsnlEmpOTPPage.reqData.value = encrypt(JSON.stringify(reqData));
                        document.bsnlEmpOTPPage.submit();
                        
                    } else {
                        alert("Please Enter Valid OTP");
                        $('#inputOtpNum').val('');
                        $('#inputOtpNum').focus();
                        return false;
                    }
                } else {
                    alert("Please Enter OTP to Proceed..");
                    $('#inputOtpNum').focus();
                    return false;
                }

            }
            
            $('#inputOtpNum').keypress(function (e) {
                var key = e.which;
                if(key == 13)  // the enter key code
                {
                    validateBSNLEmpOTP();
                    return false;  
                }
            });

        </script>


    </body>
</html>
