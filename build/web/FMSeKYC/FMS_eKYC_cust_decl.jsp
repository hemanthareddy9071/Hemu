<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>BSNL</title>
        <!-- Styling -->
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <!--<script src="js/FMS_ekyc_UserDetails.js"></script>-->
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.common-material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <link rel="stylesheet" href="<%=CSS_JS_PATH%>css/kendo/kendo.dataviz.material.min.css?ReqParam=<%=CSS_JS_VERSION%>" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/moment.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/bootstrap-datetimepicker.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/login.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/common.js?ReqParam=<%=CSS_JS_VERSION%>"></script>

        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_ekyc_Authentication.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMSAadhar2.0.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/DeviceSrNo2.0.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <%@ taglib prefix="s" uri="/struts-tags"%>
        <script>
            function capture() {
                try {
                    alert("Summary_Subscriber")
                    //window.location.href="FMS_eKYC_step7.html";
                    captureFinger('Summary_Subscriber', 'FMS_eKYC_step6', 'FMS_eKYC_cust_decl', 'EKYC', 'FMS_eKYC_cust_decl');
                } catch (e) {
                    alert("Exception in capture: " + e);
                }
            }
            function loadAADHAARno() {
                try {
                    var subAadhaarNo = $("#Subscriber_Aadhar").val();
                    // var subAadhaarNo = newFormMem.getProperty("subAAdharNo");
                    subAadhaarNo = subAadhaarNo.replace(/.(?=.{4})/g, 'X');
                    $("#Cust_Aadhaar").val(subAadhaarNo);
                } catch (e) {

                }

            }

        </script>
    </head>
    <body onload="loadAADHAARno();

            loadDeviceName();">

        <form name="FMS_eKYC_cust_decl">
            <input type="hidden" name="errMsg" id="errMsg" value="<s:property value="#session.errMsg"/>"/>
            <input type="hidden" name="loginResponse" id="loginResponse" value="<s:property value="#session.loginResponse"/>" />
            <input type="hidden" name="DeviceSerialNumber" id="DeviceSerialNumber" value="<s:property value="#session.DeviceSerialNumber"/>" />
            <input type="hidden" name="Device_SerialNumber" id="Device_SerialNumber" value="<s:property value="#session.Device_SerialNumber"/>" />
            <input type="hidden" name="Subscriber_Aadhar" id="Subscriber_Aadhar" value="<s:property value="#session.Subscriber_Aadhar"/>" />
            <input type="hidden" name="selectDevice" id="selectDevice" value="<s:property value="#session.selectDevice"/>" />
            <input type="hidden" name="AgentAadhar" id="AgentAadhar" value="<s:property value="#session.AgentAadhar"/>" />
            <input type="hidden" name="DEVICE_SR_FLG" id="DEVICE_SR_FLG" value="" />
            <input type="hidden" name="BIODEVICE_MAKE" id="BIODEVICE_MAKE" value="<s:property value="#session.BIODEVICE_MAKE"/>" />
            <input type="hidden" name="reqData" id="reqData"/>
            <input type="hidden" name="validationKey" id="validationKey" value="<s:property value="#session.validationKey"/>" />
            <input type="hidden" name="UDC" id="UDC" value="<s:property value="#session.UDC"/>" />
            <input type="hidden" name="DeviceSerialNumber" id="DeviceSerialNumber" value="<s:property value="#session.DeviceSerialNumber"/>" />
        </form>




        <div id="page_header_bar" class="row" >
            <div class="col-xs-12">
                <div class="breadcrumtxt"> <span class="bluetxt"><a href="#" onclick="parent.pageLoad('fmsDashboard.do');"> Home</a></span> <span class="larrow">&gt;</span> <span class="bluetxt"> Landline eKYC</span></div>
                <h1 class="page_heading">Customer declaration</h1>
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
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Customer UID / VID number<span class="redtxt">*</span> : </label>
                                            <input  name="Aadhaar name" type="text" class="form-control width60" readonly title="Aadhaar" id="Cust_Aadhaar">
                                            <!--<input  name="Aadhaar name" type="text" class="form-control width60" title="Aadhaar" id="AadharSubscriber" maxlength="12" onpaste="return false;" onchange="valAADHAARFun(this);" onkeypress="return isNumberKey(event)">-->
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Select device<span class="redtxt">*</span> : </label>
                                            <select id="BioDeviceList" name="select" class="form-control width60" size="1">
                                                <option value="0">Select device</option>
                                                <option value="1">Morpho Safran</option>
                                                <!--                                                                <option value="2">Datamini Secugen</option>-->
                                                <!--<option value="2">Evolute</option>-->
                                                <option value="3">Startek</option>
                                                <option value="4">SecuGen</option>
                                                <option value="5">Mantra</option>
                                                <option value="6">Precision</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--                                                    <div class="col-sm-6">
                                                                                            <div class="form-group">
                                                                                                <label id="selectBioDevices">Device serial number <span class="redtxt">*</span>:</label>
                                                                                                <input  name="device_serial_num" type="text" class="form-control width60" title="Device Serial Number" id="device_serial_num" >
                                    
                                                                                            </div>
                                                                                        </div>-->
                                </div>
                            </div>
                            <!--                                            <div class="ticklist">
                                                                            <ul>
                                                                                <li>The information provided by me (apart from the data received from UIDAI) is correct.</li>
                                                                                <li> My biometric authentication can be treated as my signature </li>
                                                                            </ul>
                                                                        </div>-->
                            <!--                                            <div class="modal-body">  
                                                                            <div class="ticklist">
                                                                                <ul>
                                                                                    <li style="align: left">The information provided by me (apart from the data received from UIDAI) is correct.</li>
                                                                                    <li>My biometric authentication can be treated as my signature </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div class="clear mrg25B"></div>
                                                                        </div>-->
                            <div>
                                <div class="clear"></div>
                                <div class="center pad15A">
                                    <p class="pad15B">The information provided by me (apart from the data received from UIDAI) is correct.</p>
                                    <p class="pad15B">My biometric authentication can be treated as my signature </p>
                                    <p class="pad15B">Place your customer's finger on scanner to authenticate >> Capture fingureprint >> Authenticate</p>
                                    <div class="fingerprint1"><img class="img-responsive fingerprint_preview" src=""></div>
                                    <div class="clear mrg15T"> 
                                        <button class="primarybt" onclick="captureFinger('Summary_Subscriber', 'FMS_eKYC_step6', 'FMS_eKYC_cust_decl', 'FMSEKYC', 'FMS_eKYC_cust_decl');" id="Sub_capture">Capture & Authenticate</button>
                                        <!--<a href="#" class="primarybt">Capture & Authenticate</a> </div>-->
                                    </div>
                                </div>
                            </div>
                            <div class="form-group pad20R">

                                <!--<a href="FMS_eKYC_step3.html" class="secondarybt">Back</a>--> 
                                <a href='#' class="primarybt1" onclick="parent.pageLoad('FMS_eKYC_step1.do');"> Cancel </a>
                                <!--<a href="#" onClick="validateSubscriber('FMS_eKYC_step5.html')" class="primarybt">Next</a>--> 
                            </div>

                            <div class="clear" style="height:300px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mask" style="display:none" id="wait">
                <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
            </div>
        </div>




        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/menu.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script>
                                    function isNumberKey(evt)
                                    {
                                        var charCode = (evt.which) ? evt.which : event.keyCode
                                        if (charCode > 31 && (charCode < 48 || charCode > 57))
                                            return false;

                                        return true;
                                    }
                                    //                                                            function loadMenuContent() {
                                    //                                                                setTimeout(function () {
                                    //                                                                    loadMenuContentFuneKYC();
                                    //                                                                }, 10);
                                    //                                                            }
                                    //                                                            function loadMenuContentFuneKYC() {
                                    //                                                                document.getElementById("menuId").innerHTML = newFormMem.getProperty("menuId");
                                    //                                                            }
                                    $("#btnGetInfo").click(function () {
                                        $("#divGetInfo").show();
                                    });
        </script>
    </body>
</html>

