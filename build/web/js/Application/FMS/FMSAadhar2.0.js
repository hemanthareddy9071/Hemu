var params = "", deviceInfo = "", capture = "";
var uri;
var port;
var AjaxResp = false;
var deviceSerialReg = /^[a-zA-Z0-9.-]+$/;
function Info(DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName)

{




    try {
        var xhr = [];
        var parser, xmlDoc;
        var status;
        var SuccessDevice = "";
        var count = 0;
        for (var i = 11100; i <= 11120; i++) {



            //            for(var j = 1; j <= 112000; j++){
            //                
            //            }

            (function (i) {

                xhr[i] = new XMLHttpRequest();

                uri = "http://127.0.0.1:" + i;
                //                        alert("info::::::"+uri);
                xhr[i].open("RDSERVICE", uri, true);
                xhr[i].onreadystatechange = function () {
                    if (xhr[i].status == 0) {
                        //ready state change response come at 4 times
                        count++;
                        //                       alert("count "+count);
                    } else if (xhr[i].status == 200) {
                        count++;
                    } else {
                        count++;
                    }

                    //                    alert(xhr[i].status);
                    //                    alert(xhr[i].readyState);
                    if (xhr[i].readyState == 4 && xhr[i].status == 200) {
                        var xmlResponse = xhr[i].responseText;
                        //                                var xmlResponse = '<RDService status="NOTREADY" info="Morpho_RD_Service"><Interface id="CAPTURE" path="/127.0.0.1:11102/capture" /><Interface id="DEVICEINFO" path="/127.0.0.1:11102/getDeviceInfo" /></RDService>';
                        //  utilsObj.writeLog("JS Log(Aadhar2.0.js) Response::for RD service::::::" + xmlResponse);
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                        status = xmlDoc.getElementsByTagName("RDService")[0].getAttribute('status');

                        var info = xmlDoc.getElementsByTagName("RDService")[0].getAttribute('info');


                        if (info.includes(DeviceName) && DeviceName !== 'Startek') {
                            SuccessDevice = DeviceName;
                            //  utilsObj.writeLog("JS Log(Aadhar2.0.js)::device::::::::" + info + "::::status::::::" + status);
                            if (status === 'READY') {
                                if (DeviceName === "Mantra") {
                                    capture = xmlDoc.getElementsByTagName("Interface")[1].getAttribute('path');
                                    deviceInfo = xmlDoc.getElementsByTagName("Interface")[0].getAttribute('path');
                                } else {
                                    capture = xmlDoc.getElementsByTagName("Interface")[0].getAttribute('path');
                                    deviceInfo = xmlDoc.getElementsByTagName("Interface")[1].getAttribute('path');
                                }
                                if (currentHTML === 'FMS_eKYC_step2') {
                                    DeviceInfo(i, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                                } else {
                                    //                                    alert("before capture:::" + AadharNo);
                                    window.parent.$('#wait').show();
                                    Capture(i, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                                }

                                return;
                            } else {
                                window.parent.$('#wait').hide();
                                alert("Please connect the device");
                                $('#BioDeviceList').val('0');
                                $("#device_serial_num").val('');
                                return;
                            }
                        }
                        if (DeviceName === 'Startek') {
                            if (xmlResponse.includes('xmlns:xsi')) {
                                SuccessDevice = DeviceName;
                                if (status === 'READY') {
                                    capture = xmlDoc.getElementsByTagName("Interface")[0].getAttribute('path');
                                    deviceInfo = xmlDoc.getElementsByTagName("Interface")[1].getAttribute('path');
                                    window.parent.$('#wait').show();
                                    DeviceInfo(i, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                                    return;
                                } else {
                                    alert("Please connect the device");
                                    $('#BioDeviceList').val('0');
                                    $("#device_serial_num").val('');
                                    window.parent.$('#wait').hide();
                                    return;

                                }
                            }
                            return;
                        }
                    }
                    if (count == 21) {
                        if (DeviceName === 'Startek' && SuccessDevice !== DeviceName) {
                            window.parent.$('#wait').hide();
                            $('#deviceLocater').modal('show');
                            $('#SecureGenDiv_32').hide();
                            $('#SecureGenDiv_64').hide();
                            $('#StartechDiv_32').show();
                            $('#StartechDiv_64').show();
                            //                            $('#StartechDiv_XP').show();
                            //                            $('#StartechDiv_XP_64').show();
                            $('#Morpho_safranDiv_32').hide();
                            $('#Morpho_safranDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP').hide();
                            $('#MantraDiv_32').hide();
                            $('#MantraDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP_64').hide();
                            $('#PrecisionDiv').hide();
                            //utilsObj.writeLog("JS Log(Authuntication.js)::: Startrek 32,64,xp links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        } else if (DeviceName === 'Mantra' && SuccessDevice !== DeviceName) {
                            window.parent.$('#wait').hide();
                            $('#deviceLocater').modal('show');
                            $('#SecureGenDiv_32').hide();
                            $('#SecureGenDiv_64').hide();
                            $('#StartechDiv_32').hide();
                            $('#StartechDiv_64').hide();
                            $('#Morpho_safranDiv_32').hide();
                            $('#Morpho_safranDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP').hide();
                            //                            $('#StartechDiv_XP').hide();
                            //                            $('#StartechDiv_XP_64').hide();
                            $('#MantraDiv_32').show();
                            $('#MantraDiv_64').show();
                            $('#PrecisionDiv').hide();
                            //                            $('#Morpho_safranDiv_XP_64').hide();
                            // utilsObj.writeLog("JS Log(Authuntication.js)::: Mantra 32,64 links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        } else if (DeviceName === 'Morpho_RD_Service' && SuccessDevice !== DeviceName) {
                            window.parent.$('#wait').hide();
                            $('#deviceLocater').modal('show');
                            $('#SecureGenDiv_32').hide();
                            $('#SecureGenDiv_64').hide();
                            $('#StartechDiv_32').hide();
                            $('#StartechDiv_64').hide();
                            $('#Morpho_safranDiv_32').show();
                            $('#Morpho_safranDiv_64').show();
                            //                            $('#Morpho_safranDiv_XP').show();
                            //                            $('#StartechDiv_XP').hide();
                            //                            $('#StartechDiv_XP_64').hide();
                            $('#MantraDiv_32').hide();
                            $('#MantraDiv_64').hide();
                            $('#PrecisionDiv').hide();
                            //                            $('#Morpho_safranDiv_XP_64').show();
                            //utilsObj.writeLog("JS Log(Authuntication.js)::: Morpho Safran 32,64,xp links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");


                        } else if (DeviceName === 'SecuGen' && SuccessDevice !== DeviceName) {
                            window.parent.$('#wait').hide();
                            //          
                            $('#deviceLocater').modal('show');
                            $('#SecureGenDiv_32').show();
                            $('#SecureGenDiv_64').show();
                            $('#StartechDiv_32').hide();
                            $('#StartechDiv_64').hide();
                            $('#Morpho_safranDiv_32').hide();
                            $('#Morpho_safranDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP').hide();
                            $('#StartechDiv_XP').hide();
                            //                            $('#StartechDiv_XP_64').hide();
                            $('#MantraDiv_32').hide();
                            $('#MantraDiv_64').hide();
                            $('#PrecisionDiv').hide();
                            //                            $('#Morpho_safranDiv_XP_64').hide();
                            //.writeLog("JS Log(Authuntication.js)::: Securegen 32,64 links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");
                            //                        

                        } else if (DeviceName === 'Precision' && SuccessDevice !== DeviceName) {
                            window.parent.$('#wait').hide();
                            $('#deviceLocater').modal('show');
                            $('#SecureGenDiv_32').hide();
                            $('#SecureGenDiv_64').hide();
                            $('#StartechDiv_32').hide();
                            $('#StartechDiv_64').hide();
                            $('#Morpho_safranDiv_32').hide();
                            $('#Morpho_safranDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP').hide();
                            //                            $('#StartechDiv_XP').hide();
                            //                            $('#StartechDiv_XP_64').hide();
                            $('#MantraDiv_32').hide();
                            $('#MantraDiv_64').hide();
                            //                            $('#Morpho_safranDiv_XP_64').hide();
                            $('#PrecisionDiv').show();
                            //utilsObj.writeLog("JS Log(Authuntication.js)::: Precision links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        }


                    }


                    //                    setTimeout(function () {
                    //                        if (count == 21) {
                    //                            if (DeviceName === 'Morpho_RD_Service' && SuccessDevice !== DeviceName) {
                    //                                $('#wait').hide();
                    //                                $('#deviceLocater').modal('show');
                    //                                $('#SecureGenDiv_32').hide();
                    //                                $('#SecureGenDiv_64').hide();
                    //                                $('#StartechDiv_32').hide();
                    //                                $('#StartechDiv_64').hide();
                    //                                $('#Morpho_safranDiv_32').show();
                    //                                $('#Morpho_safranDiv_64').show();
                    ////                            $('#Morpho_safranDiv_XP').show();
                    ////                            $('#StartechDiv_XP').hide();
                    ////                            $('#StartechDiv_XP_64').hide();
                    //                                $('#MantraDiv_32').hide();
                    //                                $('#MantraDiv_64').hide();
                    //                                $('#PrecisionDiv').hide();
                    ////                            $('#Morpho_safranDiv_XP_64').show();
                    ////                                utilsObj.writeLog("JS Log(FMSAadhaar2.0.js)::: Morpho Safran 32,64,xp links are visibled");
                    //                                alert("Either RD services or the device drivers are not installed in your system.Please Install.");
                    //                            }
                    //                        }
                    //                    }, 50);

                };
                xhr[i].send();

            })(i);

        }

    } catch (e) {
        //        alert("Exceptio/n in Rd service::::::::" + e);
    }
//               


}
function Capture(port, deviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName)
{

    try {
        var uri;
        var parser, xmlDoc;
        var validationKey = $("#validationKey").val();
        var AADHAR_WADH = parent.$("#AADHAR_WADH").val();
        var AADHAR_ENV = parent.$("#AADHAR_ENV").val();
        //alert("AADHAR_WADH :: " + AADHAR_WADH + ":: AADHAR_ENV :: " + AADHAR_ENV);
        if (deviceName === 'Morpho_RD_Service') {
            //            uri = port;
            uri = "http://127.0.0.1:" + port + "/capture";
            //            params = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"0\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh=\"\" posh=\"\"/>' + '</PidOptions>';
            params = '<PidOptions ver=\"1.0\">' + ' <CustOpts/> <Demo/> <Opts env=\"' + AADHAR_ENV + '\" fCount=\"1\" fType=\"0\" format=\"0\" wadh = \"' + AADHAR_WADH + '\" pidVer=\"2.0\"/>' + '</PidOptions>';
        } else {
            uri = "http://127.0.0.1:" + port + capture;
            if (deviceName === 'Startek') {
                if (validationKey === "") {
                    //                    alert("here")
                    params = '<PidOptions> <Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" posh=\"UNKNOWN\" env=\"' + AADHAR_ENV + '\" wadh=\"' + AADHAR_WADH + '\" /> <Demo></Demo> <CustOpts> <Param name=\"ValidationKey\" value=\"js1fuuea8+e7lE1MEow3VX6SyG1WuNETPSrfEip83zBzIBxTgGDYI8X9KUffza0U64BpryYJRLRkg3rIkyHemqe+OxFetRI1QQKvVtAG/9lP+ibAqzGboPugE5YtfqbXEjkMEMZtupumTgmwyE0ut5KgA5ai19KXFU+3bLHol5NCCYmLJynrCQkaZJPc81aF\" /> </CustOpts> </PidOptions>';
                } else if (validationKey !== null || validationKey !== "") {
                    params = '<PidOptions> <Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" posh=\"UNKNOWN\" env=\"' + AADHAR_ENV + '\" wadh=\"' + AADHAR_WADH + '\" /> <Demo></Demo> <CustOpts> <Param name=\"ValidationKey\" value=\"' + validationKey + '\" /> </CustOpts> </PidOptions>';
                }

            } else if (deviceName === 'Mantra') {
                params = '<PidOptions ver=\"2.0\"><Opts fCount=\"1\" fType=\"0\" iCount=\"0\" iType=\"0\" pCount=\"0\" pType=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" posh=\"UNKNOWN\" wadh=\"' + AADHAR_WADH + '\"  env=\"' + AADHAR_ENV + '\"/></PidOptions>';
            } else if (deviceName === 'SecuGen') {
                params = '<PidOptions ver="1.0"> <Opts fCount="1"  format="0" pidVer="2.0" timeout="20000" env="' + AADHAR_ENV + '" posh="UNKNOWN" wadh=\"' + AADHAR_WADH + '\"  />';
                params += '</PidOptions>';
            } else if (deviceName === 'Precision') {
                params = '<?xml version="1.0"?><PidOptions ver=\"1.0\"> <Opts fCount=\"1\" fType=\"0\"  format=\"0\" pidVer=\"2.0\" timeout=\"20000\" env=\"' + AADHAR_ENV + '\" posh=\"UNKNOWN\" />';
                params += '<CustOpts> <Param name=\"LockingKey\" value=\"\" /><Param name=\"IsGUIRequired\" value=\"n\"/> </CustOpts></PidOptions>';
            }

        }
        console.log("JS Log(FMS_Aadhar2.0.js)params:::::::::" + params);
        //utilsObj.writeLog("JS Log(Aadhar2.0.js) uri:::::" + uri + ":::::currentHTML::::::::" + currentHTML);
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()

        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)

            {

                SucessInfo(xmlhttp.responseText);
                var xmlResponse = xmlhttp.responseText;
                console.log("JS Log(FMS_Aadhar2.0.js)xmlResponse for Capture::::::::::" + xmlResponse);

                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                var errCode = xmlDoc.getElementsByTagName("Resp")[0].getAttribute('errCode');
                var errInfo = xmlDoc.getElementsByTagName("Resp")[0].getAttribute('errInfo');
                var srno;
                if (xmlResponse.includes("value")) {
                    var name_srno = xmlDoc.getElementsByTagName("Param")[0].getAttribute('name');
                    if (name_srno === 'srno') {
                        srno = xmlDoc.getElementsByTagName("Param")[0].getAttribute('value');
                        $("#DEVICE_SR_FLG").val("true");
                    }
                } else if (xmlResponse.includes("srno")) {
                    srno = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('srno');
                    $("#DEVICE_SR_FLG").val("true");
                } else if (xmlResponse.includes("dc")) {
                    srno = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('dc');
                    $("#DEVICE_SR_FLG").val("false");
                }

                if (errCode === '0') {
                    $("#DEVICE_SR_FLG").val("false");
                    $("#DeviceSerialNumber").val(srno);
                    if (AuthenticateType === 'Agent' && deviceName !== "Startek") {
                        var reqData = {};
                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                        reqData.deviceName = deviceName;
                        reqData.deviceSRNo = srno;
                        var repObj = {};

                        $.ajax({
                            url: "fmsDeviceLock.do", //parameters go here in object literal form
                            type: 'POST',
                            async: false,
                            dataType: 'json',
                            data: {
                                "reqData": encrypt(JSON.stringify(reqData))
                            },
                            success: function (data) {
                                //sessionCheck(data);
                                var res = JSON.parse(JSON.stringify(data));
                                console.log("res:::" + JSON.stringify(data))
                                repObj = res.response.responseData;
                                if (repObj.STATUS == "0") {
                                    validationKey = repObj.VALIDATION_KEY;
                                    $("#validationKey").val(validationKey);
                                    UDC = repObj.UDC;
                                    $("#UDC").val(UDC);
                                } else {
                                    alert(repObj.MESSAGE);
                                }

                            },
                            error: function (data) {

                            }

                        });
                    }
                    try {
                        var reqData = {};
                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                        reqData.formName = formName;
                        reqData.deviceName = deviceName;
                        reqData.AadharNo = AadharNo;
                        reqData.flowtype = flowtype;
                        reqData.responseText = xmlhttp.responseText;
                        reqData.AuthenticateType = AuthenticateType;
                        reqData.nxtHTML = nxtHTML;
                        reqData.currentHTML = currentHTML;
                        reqData.DeviceSerialNumber = srno;
                        reqData.selectDevice = $("#selectDevice").val();
                        reqData.validationKey = validationKey;
                        reqData.UDC = $("#UDC").val();
                        if (formName == 'FMS_eKYC_step2') {
                            reqData.AgentAadhar_No = $("#AgentAadhar_No").val();
                            document.FMS_eKYC_step2.method = "post";
                            document.FMS_eKYC_step2.action = "FmsEkycauthenticate.do";
                            document.FMS_eKYC_step2.reqData.value = encrypt(JSON.stringify(reqData));
                            document.FMS_eKYC_step2.submit();
                        } else if (formName == 'FMS_eKYC_step4') {
                            document.FMS_eKYC_step4.method = "post";
                            document.FMS_eKYC_step4.action = "FmsEkycauthenticate.do";
                            document.FMS_eKYC_step4.reqData.value = encrypt(JSON.stringify(reqData));
                            document.FMS_eKYC_step4.submit();
                        } else if (formName == 'FMS_eKYC_step6') {
                            document.FMS_eKYC_step6.method = "post";
                            document.FMS_eKYC_step6.action = "FmsEkycauthenticate.do";
                            document.FMS_eKYC_step6.reqData.value = encrypt(JSON.stringify(reqData));
                            document.FMS_eKYC_step6.submit();

                        } else if (formName == 'FMS_eKYC_cust_decl') {
                            document.FMS_eKYC_cust_decl.method = "post";
                            document.FMS_eKYC_cust_decl.action = "FmsEkycauthenticate.do";
                            document.FMS_eKYC_cust_decl.reqData.value = encrypt(JSON.stringify(reqData));
                            document.FMS_eKYC_cust_decl.submit();
                        } else if (formName == 'agentDeclaration') {
                            document.agentDeclaration.method = "post";
                            document.agentDeclaration.action = "FmsEkycauthenticate.do";
                            document.agentDeclaration.reqData.value = encrypt(JSON.stringify(reqData));
                            document.agentDeclaration.submit();
                        }
                    } catch (e) {
                        alert("PR : " + e);
                    }
                    window.parent.$('#wait').hide();

                } else if (errCode == 900) {
                    window.parent.$('#wait').hide();
                    alert("This device is not for this application");

                } else {
                    window.parent.$('#wait').hide();
                    alert("Please Capture the fingerprint again");
                }


            } else if (xmlhttp.status == 404)

            {

                failCall(xmlhttp.status)

            } else if (xmlhttp.status == 503)

            {
                alert("server Unavailable");
            }
        }

        xmlhttp.onerror = function ()

        {

            failCall(xmlhttp.status);

        }

        xmlhttp.onabort = function ()

        {

            //        alert("Aborted");

        }

        xmlhttp.open("CAPTURE", uri, true);

        //xmlhttp.send(encodeURIComponent(params));
        //alert(params);
        xmlhttp.send(params);
    } catch (e) {
        //        alert("JS Log(Aadhar2.0.js)Exception  in Capture::::::::::" + e);
    }

}
function DeviceInfo(port, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName)
{
    try {
        var parser, xmlDoc;

        var uri = "http://127.0.0.1:" + port + deviceInfo;
        //    alert("::deviceinfo uri:" + uri + ":::::::DeviceName:::::::::" + DeviceName);
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()

        {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)

            {
                SucessInfo(xmlhttp.responseText);
                var xmlResponse = xmlhttp.responseText;
                //                                var xmlResponse = '<RDService status="NOTREADY" info="Morpho_RD_Service"><Interface id="CAPTURE" path="/127.0.0.1:11102/capture" /><Interface id="DEVICEINFO" path="/127.0.0.1:11102/getDeviceInfo" /></RDService>';
                //utilsObj.writeLog("JS Log(Aadhar2.0.js) Response::for DeviceInfo:::::" + xmlResponse);
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                var dpId = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('dpId');
                if (DeviceName === 'Morpho_RD_Service') {
                    if (dpId.includes("Morpho.SmartChip")) {
                        var deviceSerialNum = $('#device_serial_num').val();
                        if (currentHTML === 'FMS_eKYC_step2') { //checking deviuce serial number for re Ekyc
                            if (deviceSerialNum == '') {
                                //  utilsObj.writeLog("JS Log(Authuntication.js)::: message is Please enter device serial number");
                                alert("Please enter device serial number");
                                $('#device_serial_num').removeAttr('readonly');
                                return;
                            } else {
                                if (!(deviceSerialReg.test(deviceSerialNum))) {
                                    $('#device_serial_num').val("");
                                    $('#device_serial_num').focus;
                                    //utilsObj.writeLog("JS Log(Authuntication.js)::: message is Please enter proper device serial number");
                                    alert("Please enter proper device serial number");
                                    return false;
                                } else {
                                    $("#Device_SerialNumber").val(deviceSerialNum);
                                    window.parent.$('#wait').show();
                                    Capture(port, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                                }
                            }
                        } else {
                            window.parent.$('#wait').show();
                            Capture(port, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                        }
                    } else {
                        window.parent.$('#wait').hide();
                        // utilsObj.writeLog("JS Log(aadhar2.0.js)dpId::::does not match with device name::");
                    }
                } else {//other than morpho device
                    if (dpId.includes(DeviceName.toUpperCase())) {
                        if (DeviceName === "Startek") {
                            var deviceSerialNum = $('#DeviceSerialNumber').val();
                            var validationKey = $("#validationKey").val();
                            var UDC = $("#UDC").val();
                            var srno_PID = xmlDoc.getElementsByTagName("Param")[0].getAttribute('value');
                            if ((srno_PID == deviceSerialNum) || AuthenticateType == 'Agent') {

                                if (validationKey == null || validationKey == "") {
                                    //                                    alert("we  have "+validationKey);
                                    var DeviceTypeText = xmlDoc.getElementsByTagName("Param")[1].getAttribute('name');

                                    if (DeviceTypeText === "DeviceType") {

                                        var DeviceType = xmlDoc.getElementsByTagName("Param")[1].getAttribute('value');
                                        $("#DeviceSecureStatus").val(DeviceType);

                                        var reqData = {};
                                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                                        reqData.deviceName = DeviceName;
                                        reqData.deviceSRNo = srno_PID;
                                        var repObj = {};

                                        $.ajax({
                                            url: "fmsDeviceLock.do", //parameters go here in object literal form
                                            type: 'POST',
                                            async: false,
                                            dataType: 'json',
                                            data: {
                                                "reqData": encrypt(JSON.stringify(reqData))
                                            },
                                            success: function (data) {
                                                //sessionCheck(data);
                                                var res = JSON.parse(JSON.stringify(data));
                                                console.log("res:::" + JSON.stringify(data))
                                                repObj = res.response.responseData;
                                                if (repObj.STATUS == "0") {
                                                    validationKey = repObj.VALIDATION_KEY;
                                                    $("#validationKey").val(validationKey);
                                                    UDC = repObj.UDC;
                                                    $("#UDC").val(UDC);
                                                } else {
                                                    alert(repObj.MESSAGE);
                                                }

                                            },
                                            error: function (data) {

                                            }

                                        });
                                    } else {
                                        alert("Internal error.");
                                        console.log("DeviceTypeText::" + DeviceTypeText);
                                    }
                                }
                            } else {
                                alert("New device is not allowed. Please use previous device.")
                                window.parent.$('#wait').hide();
                                return false;
                            }

                        }
                        if (currentHTML === 'FMS_eKYC_step2') {
                            //checking deviuce serial number for re Ekyc
                            var deviceSerialNum = $('#device_serial_num').val();
                            if (deviceSerialNum == '') {
                                //  utilsObj.writeLog("JS Log(Authuntication.js)::: message is Please enter device serial number");
                                alert("Please enter device serial number");
                                window.parent.$('#wait').hide();
                                $('#device_serial_num').removeAttr('readonly');
                                return;
                            } else {
                                if (!(deviceSerialReg.test(deviceSerialNum))) {
                                    $('#device_serial_num').val("");
                                    $('#device_serial_num').focus;
                                    //  utilsObj.writeLog("JS Log(Authuntication.js)::: message is Please enter proper device serial number");
                                    alert("Please enter proper device serial number");
                                    return false;
                                } else {
                                    $("#Device_SerialNumber").val(deviceSerialNum);
                                    window.parent.$('#wait').show();
                                    Capture(port, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                                }
                            }
                        } else {
                            window.parent.$('#wait').show();
                            Capture(port, DeviceName, AuthenticateType, nxtHTML, currentHTML, flowtype, AadharNo, formName);
                        }
                    } else {
                        window.parent.$('#wait').hide();
                        // utilsObj.writeLog("JS Log(FMsaadhar2.0.js)dpId::::does not match with device name::");
                    }
                }

            } else if (xmlhttp.status == 404)

            {
                failCall(xmlhttp.status)

            } else if (xmlhttp.status == 503)

            {
                failCall(xmlhttp.status);

            }
        }

        xmlhttp.onerror = function ()

        {

            failCall(xmlhttp.status);

        }

        xmlhttp.onabort = function ()

        {

            //        alert("Aborted");

        }

        xmlhttp.open("DEVICEINFO", uri, true);

        xmlhttp.send();
    } catch (e) {
        //utilsObj.writeLog("JS Log(Aadhar2.0.js)Exception  in deviceinfo::::::::::" + e);
    }

}
function	SucessInfo(result)
{
//    alert(result);
}

function	failCall(status)
{

    /* 	
     If you reach here, user is probabaly not running the 
     service. Redirect the user to a page where he can download the
     executable and install it. 
     */
//utilsObj.writeLog("JS Log(aadhar2.0.js)Check if RDSERVICE is running");
}
