<%-- 
Document   : FMS_kyc_step1
Created on : Mar 26, 2018, 11:22:07 AM
Author     : ramesh.a
--%>

<%@page import="com.in10s.config.CRSAppResources"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include  file="../browserInterceptor.jsp" %>
<!DOCTYPE html>
<html lang="en">
    <head>
                    <% 
                String CSS_JS_PATH = "";
            String CSS_JS_VERSION = "";
            CSS_JS_PATH = CRSAppResources.CSS_JS_PATH;
            CSS_JS_VERSION = CRSAppResources.CSS_JS_VERSION;
                session = request.getSession();
                String mainMenuObj = "";
                JSONObject loginRes = (JSONObject) session.getAttribute("loginResponse");
//                System.out.println("loginRes id : " + loginRes);
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
        <link href="<%=CSS_JS_PATH%>css/bootstrap.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <link href="<%=CSS_JS_PATH%>css/style.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/font-awesome.min.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <link href="<%=CSS_JS_PATH%>css/bootstrap-datetimepicker.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet" type="text/css" />
        <script src="<%=CSS_JS_PATH%>js/jquery.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/bootstrap.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <link href="<%=CSS_JS_PATH%>css/dropzone.css?ReqParam=<%=CSS_JS_VERSION%>" rel="stylesheet">
        <script src="<%=CSS_JS_PATH%>js/dropzone.js?ReqParam=<%=CSS_JS_VERSION%>" type="text/javascript"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/moment.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script type="text/javascript" src="<%=CSS_JS_PATH%>js/bootstrap-datetimepicker.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/scripts.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <!-- Kendo script starts-->
        <script src="<%=CSS_JS_PATH%>js/kendo/kendo.all.min.js?ReqParam=<%=CSS_JS_VERSION%>"></script>

        <script src="<%=CSS_JS_PATH%>js/Application/FMS/FMS_kyc_Validation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/encrypt.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <script src="<%=CSS_JS_PATH%>js/sessionValidation.js?ReqParam=<%=CSS_JS_VERSION%>"></script>
        <%@page import="net.sf.json.JSONObject"%>
        <script>


            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };

//            $(document).ready(function () {
//                var errMsg = $('#message').val();
//                if (errMsg == "" || errMsg == null) {
//                } else {
//                    alert(errMsg);
//
//                }
//
//            });
            var metaDataValidation = {};
            function setFranchiseMetaDatakyc() {
//                alert('JS Log(FMS_ekyc_step1.js):::::::::::::::::::starting of setFranchiseMetaDatakyc');
                try {
                    var formfieldData = {};
                    var formfieldData1 = $("#kycFranchiseMetaData").val();
                    formfieldData = JSON.parse(formfieldData1);
                    metaDataValidation = formfieldData;
                } catch (e) {
                    //alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in  setMetaDataForValidationFMS' + e);
                }
//                alert('JS Log(FMS_ekyc_step1.js):::::::::::::::::::Ending of setFranchiseMetaDatakyc');
            }
            $(document).ready(function () {
                $('#service_type_cmb').on('change', function () {
                    $('#bb_only').val("0");
                    $('#bb_req_yes').val("0");
                    $('#connection_type').val("0");
                    if ($('#service_type_cmb').val() === '2' || $('#service_type_cmb').val() === '3')//FTTH BroadBand,FTTH BB value is always 2
                    {
                        //no_of_bb_cons,no_of_voice_cons Combo values loading
                        $('#no_of_bb_cons').children().remove();
                        $('#no_of_bb_cons').append('<option value="">Select No. of BroadBand connections</option>');
                        $('#no_of_bb_cons').append('<option value="1">1</option>');
                        $('#no_of_bb_cons').append('<option value="2">2</option>');
                        $('#no_of_bb_cons').append('<option value="3">3</option>');
                        $('#no_of_bb_cons').append('<option value="4">4</option>');

                        $('#no_of_voice_cons').children().remove();
                        $('#no_of_voice_cons').append('<option value="">Select No. of Voice connections</option>');
                        $('#no_of_voice_cons').append('<option value="0">0</option>');
                        $('#no_of_voice_cons').append('<option value="1">1</option>');
                        $('#no_of_voice_cons').append('<option value="2">2</option>');

                        $("#no_of_bb_cons").val('');
                        $("#divFtthBB").show();
                        $("#no_of_voice_cons").val('');
                        $("#divFtthVoice").show();
                    } else if ($('#service_type_cmb').val() === '4')//FTTH Voice value is always 4
                    {
                        //no_of_bb_cons,no_of_voice_cons Combo values loading
                        $('#no_of_bb_cons').children().remove();
                        $('#no_of_bb_cons').append('<option value="">Select No. of BroadBand connections</option>');
                        $('#no_of_bb_cons').append('<option value="0">0</option>');
                        $('#no_of_bb_cons').append('<option value="1">1</option>');
                        $('#no_of_bb_cons').append('<option value="2">2</option>');
                        $('#no_of_bb_cons').append('<option value="3">3</option>');
                        $('#no_of_bb_cons').append('<option value="4">4</option>');

                        $('#no_of_voice_cons').children().remove();
                        $('#no_of_voice_cons').append('<option value="">Select No. of Voice connections</option>');
                        $('#no_of_voice_cons').append('<option value="1">1</option>');
                        $('#no_of_voice_cons').append('<option value="2">2</option>');

                        $("#no_of_voice_cons").val('');
                        $("#divFtthVoice").show();
                        $("#no_of_bb_cons").val('');
                        $("#divFtthBB").show();
                    } else {
                        $("#divFtthBB").hide();
                        $("#divFtthVoice").hide();
                    }
                    if ($('#service_type_cmb').val() === '1' || $('#service_type_cmb').val() === '8')//landline value is always 1
                    {
                        $("#divLandline").show();
                        $("#bb_only_id").show();
                        $("#bb_req_yes_id").show();
                        $("#divConnectionType").show();
                    } else
                    {
                        $("#divLandline").hide();
                        $("#bb_only_id").hide();
                        $("#bb_req_yes_id").hide();
                        $("#divConnectionType").hide();
                    }
                    //Connection type combo values loading based on service type
                    if ($('#service_type_cmb').val() === '6') {//BB over WiFi
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                        $('#connection_type').append('<option value="1">POSTPAID</option>');
                        $("#divConnectionType").show();
                        $("#divLandline").show();
                        $("#bb_only_id").hide();
                        $("#bb_req_yes_id").hide();
                    } else if ($('#service_type_cmb').val() === '1' || $('#service_type_cmb').val() === '8') {
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                    } else {
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                        $('#connection_type').append('<option value="1">Normal Connection</option>');
                        $('#connection_type').append('<option value="2">VPN with Internet</option>');
                        $('#connection_type').append('<option value="3">VPN with out Internet</option>');
                        $('#connection_type').append('<option value="4">As per CA data</option>');
                    }


                    parent.resizeFrameHeight('frameBody', document.documentElement.scrollHeight);


                });

                $('#bb_only').on('change', function () {
                    if (this.value == '1')
                    {
                        $('#bb_req_yes').children().remove();
                        $('#bb_req_yes').append('<option value="0">Select BB Required Yes/No</option>');
                        $('#bb_req_yes').append('<option value="1">Yes</option>');
                        $('#bb_req_yes').val('1');
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                        $('#connection_type').append('<option value="1">Normal LL + BB</option>');
                        $('#connection_type').append('<option value="2">VPN with Internet</option>');
                        $('#connection_type').append('<option value="3">VPN with out Internet</option>');
//                        $("#divConnectionType").show();
                    } else
                    {
                        $('#bb_req_yes').children().remove();
                        $('#bb_req_yes').append('<option value="0">Select BB Required Yes/No</option>');
                        $('#bb_req_yes').append('<option value="1">Yes</option>');
                        $('#bb_req_yes').append('<option value="2">No</option>');
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                    }
                });
                $('#bb_req_yes').on('change', function () {
                    if (this.value == '1')
                    {
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                        $('#connection_type').append('<option value="1">Normal LL + BB</option>');
                        $('#connection_type').append('<option value="2">VPN with Internet</option>');
                        $('#connection_type').append('<option value="3">VPN with out Internet</option>');
//                        $("#divConnectionType").show();
                    } else
                    {
                        $('#connection_type').children().remove();
                        $('#connection_type').append('<option value="0">Select connection type</option>');
                        $('#connection_type').append('<option value="1">Normal LL</option>');
                        $('#connection_type').append('<option value="2">VPN with Internet</option>');
                        $('#connection_type').append('<option value="3">VPN with out Internet</option>');
//                        $("#divConnectionType").show();
                    }
                });


                $("#franchisee_code").on('change', function () {
                    try {
                        $("#divFtthVoice").hide();
                        $("#divFtthBB").hide();
                        var frachisCode = $('#franchisee_code').val();
                        if ($('#franchisee_code').val() === '0') {
                            alert('Please select franchisee code');
                            $('#franchisee_code').focus();
                            return false;
                        }
                        // var servType = FMSnewFormMem.fetchServiceType(frachisCode);
                        try {
                            var formfieldData = {};

                            var reqData = {};
                            reqData.reqSessionId = parent.$("#reqSessionId").val();
                            reqData.franchiseCode = frachisCode;
                            var servType = ""
                            $.ajax({
                                url: "fetchServicetype.do", //parameters go here in object literal form
                                type: 'POST',
                                async: false,
                                data: {"reqData": encrypt(JSON.stringify(reqData))},
                                success: function (data) {
                                    sessionCheck(data);
                                    var resJson = JSON.parse(JSON.stringify(data));
//                                    alert(JSON.stringify(data))
                                    var servTypeJOBJ = {};
                                    servTypeJOBJ = resJson.response.responseData;
//                        utilsObj.writeLog("JS Log(FMS_kycCaf.js):::::::servTypeJOBJ in exchangeCodesLoading :::::");
//                                    alert(resJson.response.success)
                                    if (resJson.response.success === "true" || resJson.response.success === true) {
                                        var availexCodelJOBJ = {};
                                        availexCodelJOBJ = servTypeJOBJ;
                                        var availexCodelarr = availexCodelJOBJ.ServiceInfo;
                                        $('#service_type_cmb').children().remove();
                                        $('#service_type_cmb').append('<option value="0">Select from list</option>');
                                        $(availexCodelarr).each(function (index) {
                                            $('#service_type_cmb').append(new Option(availexCodelarr[index].ServiceCode, availexCodelarr[index].FlagValue));
                                        });
                                    } else {
                                        $('#franchisee_code').val("0");
                                    }
                                    $("#divLandline").hide();
                                    $('#comments').val('');

                                }, error: function (data) {
                                    alert("error : uploadForms" + JSON.stringify(data));
                                }

                            });


//                    var formfieldData1 = newFormMem.getProperty("kycFranchiseMetaData") + "";
//        var formfieldData1 = fieldsValidation;

//                    formfieldData = JSON.parse(formfieldData1);
//document.getElementById("kycFranchiseMetaData").value
                            // var valfrn = $("#kycFranchiseMetaData").val();
//                    alert(valfrn);
//alert($("#kycFranchiseMetaData")val());
                            // formfieldData = JSON.parse(valfrn);
                            // metaDataValidation = formfieldData;
                        } catch (e) {
//                            alert('JS Log(FMS_ekyc_step1.js):::::::::::::::::::Exception in  setFranchiseMetaDatakyc' + e);
                        }



                    } catch (e) {
//                        utilsObj.writeLog("JS Log(FMS_kyc_step1.html):::::::::::Exception in service types loading:::::" + e);
                    }

//                    setFrameHeight();

                    parent.resizeFrameHeight('frameBody', document.documentElement.scrollHeight)
                });

            });

            function goToStep1Fun() {
                try {
                    $('#wait').show();
//                    metaDataValidation = $("#kycFranchiseMetaData").val();
//                    console.log(metaDataValidation);

                    var fmsFormData = {};
//                    utilsObj.writeLog('JS Log(FMS_kyc_step1.js):::::::::::::::::::' + JSON.stringify(metaDataValidation));
                    for (var j in metaDataValidation) {
                        try {
                            var target = j;
                            var objIdvlMetaData = metaDataValidation[j];
                            var dispName = objIdvlMetaData.DISPLAY_NAME;
                            var MANDATORY = objIdvlMetaData.MANDATORY;
                            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
                            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
                            var TYPE = objIdvlMetaData.TYPE;
                            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES.toString();
                            if (TYPE == 'TF') {
                                var targetVal = $('#' + target).val();
                                if (!(MANDATORY == 'N')) {
                                    if (targetVal.length == '0') {
                                        $('#' + target).focus().css('border-color', 'red');
                                        alert(dispName + ' should be mandatory.');
                                        $('#' + target).val('');
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
                                            //alert(e)
                                        }

                                        return false;
                                    } else {
                                        fmsFormData[target] = targetVal;
                                        $('#' + target).focus().css('border-color', 'green');
                                    }
                                } else {
                                    fmsFormData[target] = targetVal;
                                }
                            } else if (TYPE === 'DD') {
                                var targetVal = $('#' + target).val().trim();
                                if (!(MANDATORY == 'N')) {
                                    if (targetVal === '0' || targetVal === 'null' || targetVal === null) {
                                        $('#' + target).focus().css('border-color', 'red');
                                        alert(dispName + '  should be mandatory.')
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
                                            //alert(e)
                                        }

                                        return false;
                                    } else {
                                        fmsFormData[target] = targetVal;
                                        var idval = target + "_ecaf";
                                        fmsFormData[idval] = $('#' + target + ' option:selected').text();
                                        $('#' + target).focus().css('border-color', 'green');
                                    }
                                }
                            }
                            if (target === 'bb_only' || target === 'bb_req_yes' || target === 'connection_type') {
                                var targetVal = $('#' + target).val();
                                if ($('#service_type_cmb').val() == '1' || $('#service_type_cmb').val() === 1 || $('#service_type_cmb').val() === '8') {
                                    if (targetVal === '0') {
                                        $('#' + target).focus().css('border-color', 'red');
                                        alert(dispName + '  should be mandatory.');
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
                                            //alert(e)
                                        }

                                        return false;
                                    } else {
                                        fmsFormData[target] = targetVal;
                                        var idval = target + "_ecaf";
                                        fmsFormData[idval] = $('#' + target + ' option:selected').text();
                                        $('#' + target).focus().css('border-color', 'green');
                                    }
                                }
                            }
                            //No of voice and bb connection mandatory checking.
                            if (target === 'no_of_bb_cons') {
                                if ($('#service_type_cmb').val() === '2' || $('#service_type_cmb').val() === '4') {//FTTH BroadBand value is always 2
                                    if ($('#' + target).val().length <= 0) {
                                        $('#' + target).focus();
                                        alert(dispName + '  should be mandatory.');
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
//                                            alert(e)
                                        }
                                        return false;
                                    }
                                }
                            }
                            if (target === 'no_of_voice_cons') {
                                if ($('#service_type_cmb').val() === '4' || $('#service_type_cmb').val() === '2') {//FTTH Voice value is always 4
                                    if ($('#' + target).val().length <= 0) {
                                        $('#' + target).focus();
                                        alert(dispName + '  should be mandatory.');
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
//                                            alert(e)
                                        }
                                        return false;
                                    }
                                }
                            }
                            if (target === 'connection_type') {
                                if ($('#service_type_cmb').val() === '6') {//BB over WIFI
                                    if ($('#' + target).val() === 0 || $('#' + target).val() === "0") {
                                        $('#' + target).focus();
                                        alert(dispName + '  should be mandatory.');
                                        try {
                                            parent.$('#wait').hide();
                                        } catch (e) {
//                                            alert(e)
                                        }
                                        return false;
                                    } else {
                                        fmsFormData[target] = targetVal;
                                        var idval = target + "_ecaf";
                                        fmsFormData[idval] = $('#' + target + ' option:selected').text();
                                        $('#' + target).focus().css('border-color', 'green');
                                    }
                                }
                            }
                        } catch (e) {
//                            utilsObj.writeLog("JS Log(FMS_kyc_step1.html):::::::::::Exception in goToStep1Fun::fmsFormData:::" + e);
                        }

                    }
                    if ($('#service_type_cmb').val() === '6') {//BB over WiFi
                        fmsFormData['bb_req_yes'] = '1';
                        fmsFormData['bb_req_yes_ecaf'] = 'Yes';
                    }
                    fmsFormData['service_type'] = $('#service_type_cmb option:selected').text();
                    var strfmsFormData = JSON.stringify(fmsFormData);
                    var reqData = {};
                    reqData.reqSessionId = parent.$("#reqSessionId").val();
                    reqData.fms_kyc_Stp1Data = strfmsFormData;
                    reqData.FMS_Step1_status = "1";
                    reqData.FMS_KYCType = "FMSKYC";
                    reqData.UserCode = $('#franchisee_code').val();
                    reqData.kycpageStatus = "1";
//                    try {
//                        var form = document.createElement("form");
//                        var inputField = document.createElement("input");
//                        inputField.name = "reqData";
//                        inputField.setAttribute("type", "hidden");
//
//                        var strData = encrypt(JSON.stringify(reqData));
//                        inputField.value = strData;
//                        form.setAttribute("action", "sendFranchisedata.do");
//                        form.setAttribute("method", "POST");
//                        form.appendChild(inputField);
//                        document.body.appendChild(form);
//                        form.submit();
//                    } catch (e) {
//
//                    }

                    try {
                        document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
                        document.kycStep1Form.method = "post";
                        document.kycStep1Form.action = "sendFranchisedata.do";
                        document.kycStep1Form.reqData.value = encrypt(JSON.stringify(reqData));
                        document.kycStep1Form.submit();
                    } catch (e) {
//                        alert(e)
                    }

                } catch (e) {
                    //  alert("JS Log(FMS kyc step1.html)::::::exception in goToStep1Fun :::::::" + e);
                }
            }
            function setPreviousVals() {
                try {
                    var fmsStep1Status = $('#FMS_Step1_status').val();
                    if (fmsStep1Status === "1") {
                        var fmsKYCStep1Data = $('#fms_kyc_Stp1Data').val();
                        var objFieldsData = $.parseJSON(fmsKYCStep1Data);
                        var frachisCode = objFieldsData["franchisee_code"];
                        var reqData = {};
                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                        reqData.franchiseCode = frachisCode;
                        var servType = ""
                        $.ajax({
                            url: "fetchServicetype.do", //parameters go here in object literal form
                            type: 'POST',
                            async: false,
                            data: {"reqData": encrypt(JSON.stringify(reqData))},
                            success: function (data) {
                                sessionCheck(data);
                                var resJson = JSON.parse(JSON.stringify(data));
//                                    alert(JSON.stringify(data))
                                var servTypeJOBJ = {};
                                servTypeJOBJ = resJson.response.responseData;
//                        utilsObj.writeLog("JS Log(FMS_kycCaf.js):::::::servTypeJOBJ in exchangeCodesLoading :::::");
//                                    alert(resJson.response.success)
                                if (resJson.response.success === "true" || resJson.response.success === true) {
                                    var availexCodelJOBJ = {};
                                    availexCodelJOBJ = servTypeJOBJ;
                                    var availexCodelarr = availexCodelJOBJ.ServiceInfo;
                                    $('#service_type_cmb').children().remove();
                                    $('#service_type_cmb').append('<option value="0">Select from list</option>');
                                    $(availexCodelarr).each(function (index) {
                                        $('#service_type_cmb').append(new Option(availexCodelarr[index].ServiceCode, availexCodelarr[index].FlagValue));
                                    });
                                } else {
                                    $('#franchisee_code').val("0");
                                }
//                                    $("#divLandline").hide();
//                                    $('#comments').val('');

                            }, error: function (data) {
                                // alert("error : uploadForms" + JSON.stringify(data));
                            }

                        });



                        //Connection type combo values loading based on service type
                        var service_type_cmbval = objFieldsData["service_type_cmb"];
                        if (service_type_cmbval === '6') {//BB over WiFi
                            $('#connection_type').children().remove();
                            $('#connection_type').append('<option value="0">Select connection type</option>');
                            $('#connection_type').append('<option value="1">POSTPAID</option>');
                            $("#divConnectionType").show();
                            $("#divLandline").show();
                            $("#bb_only_id").hide();
                            $("#bb_req_yes_id").hide();
                        } else if (service_type_cmbval === '1' || service_type_cmbval === '8') {
                            var bb_req_yes = objFieldsData["bb_req_yes"];
                            if (bb_req_yes == "1") {
                                $('#connection_type').children().remove();
                                $('#connection_type').append('<option value="0">Select connection type</option>');
                                $('#connection_type').append('<option value="1">Normal LL + BB</option>');
                                $('#connection_type').append('<option value="2">VPN with Internet</option>');
                                $('#connection_type').append('<option value="3">VPN with out Internet</option>');
                                $('#connection_type').val("1");
                            } else {
                                $('#connection_type').children().remove();
                                $('#connection_type').append('<option value="0">Select connection type</option>');
                                $('#connection_type').append('<option value="1">Normal LL</option>');
                                $('#connection_type').append('<option value="2">VPN with Internet</option>');
                                $('#connection_type').append('<option value="3">VPN with out Internet</option>');
                                $('#connection_type').val("1");
                            }
//                            $('#connection_type').children().remove();
//                            $('#connection_type').append('<option value="0">Select connection type</option>');
                            $("#divLandline").show();
                            $("#divConnectionType").show();
                        } else {
                            $('#connection_type').children().remove();
                            $('#connection_type').append('<option value="0">Select connection type</option>');
                            $('#connection_type').append('<option value="1">Normal Connection</option>');
                            $('#connection_type').append('<option value="2">VPN with Internet</option>');
                            $('#connection_type').append('<option value="3">VPN with out Internet</option>');
                            $('#connection_type').append('<option value="4">As per CA data</option>');
                        }
                        if (service_type_cmbval === '2') {//FTTH BroadBand value is always 2

                            //no_of_bb_cons,no_of_voice_cons Combo values loading
                            $('#no_of_bb_cons').children().remove();
                            $('#no_of_bb_cons').append('<option value="">Select No. of BroadBand connections</option>');
                            $('#no_of_bb_cons').append('<option value="1">1</option>');
                            $('#no_of_bb_cons').append('<option value="2">2</option>');
                            $('#no_of_bb_cons').append('<option value="3">3</option>');
                            $('#no_of_bb_cons').append('<option value="4">4</option>');

                            $('#no_of_voice_cons').children().remove();
                            $('#no_of_voice_cons').append('<option value="">Select No. of Voice connections</option>');
                            $('#no_of_voice_cons').append('<option value="0">0</option>');
                            $('#no_of_voice_cons').append('<option value="1">1</option>');
                            $('#no_of_voice_cons').append('<option value="2">2</option>');

                            $("#divFtthBB").show();
                            $("#divFtthVoice").show();
//                            $("#divFtthBB").show();
                        } else if (service_type_cmbval === '4') {//FTTH Voice value is always 2

                            //no_of_bb_cons,no_of_voice_cons Combo values loading
                            $('#no_of_bb_cons').children().remove();
                            $('#no_of_bb_cons').append('<option value="">Select No. of BroadBand connections</option>');
                            $('#no_of_bb_cons').append('<option value="0">0</option>');
                            $('#no_of_bb_cons').append('<option value="1">1</option>');
                            $('#no_of_bb_cons').append('<option value="2">2</option>');
                            $('#no_of_bb_cons').append('<option value="3">3</option>');
                            $('#no_of_bb_cons').append('<option value="4">4</option>');

                            $('#no_of_voice_cons').children().remove();
                            $('#no_of_voice_cons').append('<option value="">Select No. of Voice connections</option>');
                            $('#no_of_voice_cons').append('<option value="1">1</option>');
                            $('#no_of_voice_cons').append('<option value="2">2</option>');

                            $("#divFtthVoice").show();
                            $("#divFtthBB").show();
//                            $("#divFtthVoice").show();
                        }

                        for (var id in objFieldsData) {
                            var service_type_cmb = objFieldsData["service_type_cmb"];
//                                                    if ($('#service_type_cmb option:selected').text() === 'Landline') {
                            if (service_type_cmb === '1') {
//                                $("#divLandline").show();
//                                $("#divConnectionType").show();

                            } else if (service_type_cmb === '2') {//FTTH BroadBand value is always 2
//                                $("#divFtthBB").show();
                            } else if (service_type_cmb === '4') {//FTTH Voice value is always 2
//                                $("#divFtthVoice").show();
                            }
                            $('#' + id).val(objFieldsData[id]);
                        }
                    }
                } catch (e) {
//                    alert("JS Log(FMS kyc step1.html)::::::exception in setPreviousVals :::::::" + e);
                }
            }
            function clearSessVals() {
//                setTimeout(function () {



//                }, 10);
                setFranchiseMetaDatakyc();
                serviceTypeValsload();
                setPreviousVals();
                clrSesValsKYCfms();
            }

            function serviceTypeValsload() {
                try {
                    var strLoginResponse = parent.$("#loginResponse").val();
                    var loginResponse = JSON.parse(strLoginResponse);
                    var UserFlag = loginResponse.UserFlag;
                    if (UserFlag === "3") {
                        var SSACode = loginResponse.SSACode;
                        $('#franchisee_code').children().remove();
//                        $('#franchisee_code').append('<option value="0">Select from list</option>');
                        $('#franchisee_code').append(new Option(SSACode, SSACode));
                        $("#franchisee_code").val(SSACode).hide();
                        $("#franchise_lable").hide();

                        try {
                            var reqData = {};
                            reqData.reqSessionId = parent.$("#reqSessionId").val();
                            reqData.franchiseCode = SSACode;
                            $.ajax({
                                url: "fetchServicetype.do", //parameters go here in object literal form
                                type: 'POST',
                                async: false,
                                data: {"reqData": encrypt(JSON.stringify(reqData))},
                                success: function (data) {
                                    sessionCheck(data);
                                    var resJson = JSON.parse(JSON.stringify(data));
//                                    alert(JSON.stringify(data))
                                    var servTypeJOBJ = {};
                                    servTypeJOBJ = resJson.response.responseData;
//                                    alert(resJson.response.success)
                                    if (resJson.response.success === "true" || resJson.response.success === true) {
                                        var availexCodelJOBJ = {};
                                        availexCodelJOBJ = servTypeJOBJ;
                                        var availexCodelarr = availexCodelJOBJ.ServiceInfo;
                                        $('#service_type_cmb').children().remove();
                                        $('#service_type_cmb').append('<option value="0">Select from list</option>');
                                        $(availexCodelarr).each(function (index) {
                                            $('#service_type_cmb').append(new Option(availexCodelarr[index].ServiceCode, availexCodelarr[index].FlagValue));
                                        });
                                    } else {
                                        $('#franchisee_code').val("0");
                                    }
                                    $("#divLandline").hide();
                                    $('#comments').val('');

                                }, error: function (data) {
                                    alert("error : uploadForms" + JSON.stringify(data));
                                }

                            });
                        } catch (e) {
//                            alert('JS Log(FMS_ekyc_step1.js):::::::::::::::::::Exception in  setFranchiseMetaDatakyc' + e);
                        }

                    } else {
                        $("#franchise_lable").show();
                        $("#franchisee_code").show();
                        var serviceTpyearr = [];
//                    alert($("#ServiceInfo").val());
                        serviceTpyearr = JSON.parse($("#ServiceInfo").val());
//                    utilsObj.writeLog("JS Logs(FMS_kyc_step1.html)::::: serviceTpyearr is::;" + serviceTpyearr);
                        $('#franchisee_code').children().remove();
                        $('#franchisee_code').append('<option value="0">Select from list</option>');
                        $(serviceTpyearr).each(function (index) {
                            $('#franchisee_code').append(new Option(serviceTpyearr[index].FranchiseeCode, serviceTpyearr[index].FranchiseeValue));
//                                                    $('#franchisee_code').append(new Option(serviceTpyearr[index].ServiceType, serviceTpyearr[index].FranchiseeCode));
                        });
                    }
                } catch (e) {
                    alert("JS Logs(FMS_kyc_step1.html):::::Exception serviceTypeValsload:;" + e);
                }
            }
            var alpha1 = /^[a-zA-Z0-9\&\,\.\/\:\-\\ ]*$/;
//                                        function commntsChg() {
//                                            try {
//                                                var cmmntsVal = $('#comments').val().toString().trim();
//                                                if (!alpha1.test(cmmntsVal)) {
//                                                    $('#comments').val('');
//                                                    $('#comments').focus();
//                                                    newFormMem.alert('Comments should not contain special characters except ,./:\\-&');
//                                                    return false;
//                                                } else {
//                                                    if (cmmntsVal.length !== 0) {
//                                                        if (cmmntsVal.length > 250) {
//                                                            $('#comments').val('');
//                                                            $('#comments').focus();
//                                                            newFormMem.alert('Max length for comments should be 250')
//                                                            return false;
//                                                        }
//                                                    } else {
//                                                        $('#comments').val('');
//                                                        $('#comments').focus();
//                                                        newFormMem.alert('Comments should be valid')
//                                                        return false;
//                                                    }
//
//                                                }
//                                            } catch (e) {
//                                                utilsObj.writeLog("JS Logs(FMS_kyc_step1.html):::::Exception commntsChg :;" + e);
//                                            }
//                                        }
            function clrSesValsKYCfms() {

                try {
                    var fmskycPage1 = $("#FMS_Step1_status").val();
//                    alert(fmskycPage1);
                    $("#FMS_Step1_status").val('');
                    //newFormMem.setProperty('FMS_Step1_status', '');
                    if (fmskycPage1 == 1) {
                    } else {

                        var reqData = {};
                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                        $.ajax({
                            url: "clearSesvals.do", //parameters go here in object literal form
                            type: 'POST',
                            async: false,
                            data: {"reqData": encrypt(JSON.stringify(reqData))},
                            success: function (data) {


                            }, error: function (data) {
                                alert("error : uploadForms" + JSON.stringify(data));
                            }

                        });


//                        newFormMem.removeAttribute('FMS_KYCType');
//                        newFormMem.removeAttribute('FMS_Step1_status');
//                        newFormMem.removeAttribute('fms_ekyc_Stp1Data');
//                        newFormMem.removeAttribute('FMS_KYC_Cust_Data');
//                        newFormMem.removeAttribute('poi_same_check');
                    }
                } catch (e) {

                }
            }


        </script>
    </head>
    <body onload="
            clearSessVals();">
        <form name="kycStep1Form">


            <input type="hidden" id="kycpageStatus" value="<s:property value="#session.kycpageStatus"/>" />
            <input type="hidden" id="kycFranchiseMetaData" value="<s:property value="#session.kycFranchiseMetaData"/>" />
            <input type="hidden" id="ServiceInfo" value="<s:property value="#session.ServiceInfo"/>" />
            <input type="hidden" id="FMS_Step1_status" value="<s:property value="#session.FMS_Step1_status"/>" />
            <input type="hidden" id="fms_kyc_Stp1Data" value="<s:property value="#session.fms_kyc_Stp1Data"/>" />
            <input type="hidden" name="reqData" id="reqData"/>
         <!--<input type="hidden" id="FRC_ENABLE" value="<s:property value="#session.FRC_ENABLE"/>" />-->
         <!--<input type="hidden" name="respMsg" id="respMsg" value="<s:property value="#session.respMsg"/>"/>-->

        </form> 
        <div id="">
            <div id="page_header_bar" class="row" >
                <div class="col-xs-12">
                    <div class="breadcrumtxt"> <span class="bluetxt"></span> 
                        <span class="bluetxt"><a href='#' onclick="parent.pageLoad('fmsDashboard.do');"> Home </a></span>       <span class="larrow">&gt;</span> <span class="bluetxt" id="navUploadStatusId"> Landline KYC</span></div>
                    <h1 class="page_heading">Landline KYC</h1>
                </div>
            </div>
            <div class="clear mrg65B"></div>


            <div class="row" id="page_content_block" >
                <div class="col-lg-12 pad10A">
                    <div class="row">
                        <div class="col-md-8">

                            <div class="col-md-9">
                                <div class="form-group">
                                    <label id="franchise_lable">Franchisee code<span class="redtxt">*</span></label>
                                    <select  id="franchisee_code" name="select" class="txtinput">
                                        <!--                                                <option value="0">Select franchisee code</option>
                                                                                        <option value="1">WMHPUNBHAGWATIELEC_A</option>
                                                                                        <option value="2">WMHPUNBHAGWATIELEC_B</option>                      
                                                                                        <option value="3">WMHPUNBHAGWATIELEC_C</option>
                                                                                        <option value="4">WMHPUNBHAGWATIELEC_D </option>
                                                                                        <option value="5">WMHPUNBHAGWATIELEC_E </option>-->
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Service type<span class="redtxt">*</span></label>
                                    <select  id="service_type_cmb" name="select" class="txtinput">
                                        <option value="0">Select service type</option>
                                        <!--                                                                                                <option value="1">FTTH BroadBand</option>
                                                                                                                                        <option value="2">FTTH Voice</option>                      
                                                                                                                                        <option value="3">Landline</option>
                                                                                                                                        <option value="4">Broadband</option>
                                                                                                                                        <option value="5">Landline & broadband</option>-->
                                    </select>
                                </div>
                                <div id="divFtthBB" style="display:none;">
                                    <div class="form-group">
                                        <label>No. of BroadBand connections <span class="redtxt">*</span></label>
                                        <select  id="no_of_bb_cons" name="select" class="txtinput">
                                            <option value="">Select No. of BroadBand connections</option>
                                        </select>
                                        <!--<input id="no_of_bb_cons" type="text" onkeyup="formFranchiseValidation(this);" autocomplete="on" class="txtinput" value="">-->
                                    </div>
                                </div>
                                <div id="divFtthVoice" style="display:none;">
                                    <div class="form-group">
                                        <label>No. of Voice  connections <span class="redtxt">*</span></label>
                                        <select  id="no_of_voice_cons" name="select" class="txtinput">
                                            <option value="">Select No. of Voice connections</option>
                                        </select>
                                        <!--<input id="no_of_voice_cons" onkeyup="formFranchiseValidation(this);" type="text" autocomplete="on" class="txtinput" value="">-->
                                    </div>
                                </div>
                                <div id="divLandline" style="display:none;">
                                    <div class="form-group" id="bb_only_id">
                                        <label>Broadband only<span class="redtxt">*</span></label>
                                        <select id="bb_only" name="select" class="txtinput" >
                                            <option value="0">Select BB Only Yes/No</option>
                                            <option value="1">Yes</option>
                                            <option value="2">No</option>
                                        </select>
                                    </div>
                                    <div class="form-group" id="bb_req_yes_id">
                                        <label>Broadband req. yes <span class="redtxt">*</span></label>
                                        <select id="bb_req_yes" name="select" class="txtinput" size="1">
                                            <option value="0">Select BB Required Yes/No</option>
                                            <option value="1">Yes</option>
                                            <option value="2">No</option>
                                        </select>
                                    </div>
                                    <div class="form-group" style="display:none;" id="divConnectionType" >
                                        <label>Connection type <span class="redtxt">*</span></label>
                                        <select id="connection_type" name="select" class="txtinput" size="1">
                                            <!--<option value="0">Select connection type</option>-->
                                            <!--                                                    <option value="1">NORMAL LL + BB </option>
                                                                                                <option value="2">FTTH Voice </option>
                                                                                                <option value="3">FTTH BB </option>
                                                                                                <option value="4">FTTH Voice + BB </option>-->
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Plan/Remarks <span class="redtxt">*</span></label>
                                    <textarea maxlength="250" onkeyup="formFranchiseValidationFms(this);" rows="3" id="comments" placeholder="Commercial plan information, installation scheme details, deposit scheme details etc." class="form-control"></textarea>
                                </div>
                                <!--                                    <div class="mask" style="display:none" id="wait">
                                                                        <img src="<%=CSS_JS_PATH%>images/m-wait.gif?ReqParam=<%=CSS_JS_VERSION%>" />
                                                                    </div>-->
                            </div>
                        </div>

                        <div class="clear"></div>
                        <div class="col-md-12">
                            <div class="form-group col-md-12"> <a href="#" onclick="goToStep1Fun();" class="primarybt">Next</a> </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>