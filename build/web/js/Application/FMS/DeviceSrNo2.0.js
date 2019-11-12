var params = "", deviceInfo = "", capture = "";
var uri;
var port;
var AjaxResp = false;

function DeviceChgSrNo(DeviceName)

{

//    alert(":::::::DeviceName::::::");
//    alert("JS Log(DeviceSrNo2.0.js)DeviceName::::::::" + DeviceName);

//                var uri;
    try {
        var xhr = [];
        var deviceJsonObject = [];
        var parser, xmlDoc;
        var status;
        var SuccessDevice = "";
        var count = 0;
        var item = {};
        for (var i = 11100; i <= 11120; i++) {

            (function (i) {

                xhr[i] = new XMLHttpRequest();

                uri = "http://127.0.0.1:" + i;
//                        alert("info::::::"+uri);
                xhr[i].open("RDSERVICE", uri, true);
                xhr[i].onreadystatechange = function () {
                    if (xhr[i].status == 0) {
                        //ready state change response come at 4 times
                        count++;
                    } else if (xhr[i].status == 200) {
                        count++;
                    } else {
                        count++;
                    }
                    if (xhr[i].readyState == 4 && xhr[i].status == 200) {
                        var xmlResponse = xhr[i].responseText;
//                                var xmlResponse = '<RDService status="NOTREADY" info="Morpho_RD_Service"><Interface id="CAPTURE" path="/127.0.0.1:11102/capture" /><Interface id="DEVICEINFO" path="/127.0.0.1:11102/getDeviceInfo" /></RDService>';
                      // alert("JS Log(DeviceSrNo2.0.js) Response::for RD service::::::" + xmlResponse);
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                        status = xmlDoc.getElementsByTagName("RDService")[0].getAttribute('status');
//                        alert("status:::"+status)
                        var info = xmlDoc.getElementsByTagName("RDService")[0].getAttribute('info');



                        if (DeviceName === "Mantra") {
                            deviceInfo = xmlDoc.getElementsByTagName("Interface")[0].getAttribute('path');
                        } else {
                            
                            deviceInfo = xmlDoc.getElementsByTagName("Interface")[1].getAttribute('path');
                        }
                        if (info.includes(DeviceName)) {
                            SuccessDevice = DeviceName;

                            if (status === 'READY') {
                                $('#wait').show();
                                DeviceInfoSrNo(i, DeviceName, deviceInfo);
                                //utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)::device::::::::" + info + "::::status::::::" + status);
                                return;
                            } else {

                               alert("Please connect the device");
                                $('#BioDeviceList').val('0');
                                return;
                            }
                        }
                        if (DeviceName === 'Startek') {
                            if (xmlResponse.includes('xmlns:xsi')) {
                                SuccessDevice = DeviceName;
                                if (status === 'READY') {
                                    DeviceInfoSrNo(i, DeviceName, deviceInfo);
                                    return;
                                } else {
                                alert("Please connect the device");
                                    $('#BioDeviceList').val('0');
                                    return;
                                }
                            }
                            return;
                        }

//                        alert("deviceJsonObject::::" + JSON.stringify(deviceJsonObject));


//                       
                    }

                    if (count == 21) {
                        if (DeviceName === 'Startek' && SuccessDevice !== DeviceName) {
                            $('#wait').hide();
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
                           // alert("JS Log(DeviceSrNo2.0.js)::: Startrek 32,64,xp links are visibled");
                          alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        } else if (DeviceName === 'Mantra' && SuccessDevice !== DeviceName) {
                            $('#wait').hide();
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
                            alert("JS Log(DeviceSrNo2.0.js)::: Mantra 32,64 links are visibled");
                           alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        } else if (DeviceName === 'Morpho' && SuccessDevice !== DeviceName) {
                            $('#wait').hide();
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
                            //utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)::: Morpho Safran 32,64,xp links are visibled");
                          alert("Either RD services or the device drivers are not installed in your system.Please Install.");


                        } else if (DeviceName === 'SecuGen' && SuccessDevice !== DeviceName) {
                            $('#wait').hide();
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
                            //utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)::: Securegen 32,64 links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");
//          
                        } else if (DeviceName === 'Precision' && SuccessDevice !== DeviceName) {
                            $('#wait').hide();
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
                            //utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)::: Precision links are visibled");
                            alert("Either RD services or the device drivers are not installed in your system.Please Install.");

                        }
                    }

                };
                xhr[i].send();

            })(i);

        }


    } catch (e) {
       alert("Exception in Rd service::::::::" + e);
    }
//               


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
    alert("Check if RDSERVICE is running ");

}
function DeviceInfoSrNo(port, DeviceName, deviceInfo)
{

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
           // utilsObj.writeLog("JS Log(DeviceSrNo2.0.js) Response::for RD service::::::" + xmlResponse);
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
            var dpId = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('dpId');
            var srno;

            if (dpId.includes(DeviceName.toUpperCase())) {
                if (xmlResponse.includes("additional_info") && xmlResponse.includes("name")) {
                    srno = xmlDoc.getElementsByTagName("Param")[0].getAttribute('value');
                   // newFormMem.setProperty("DEVICE_SR_FLG", "true");
                   $("#DEVICE_SR_FLG").val("true");
                } else if (xmlResponse.includes("srno")) {
                    srno = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('srno');
                   // newFormMem.setProperty("DEVICE_SR_FLG", "true");
                    $("#DEVICE_SR_FLG").val("true");
                }
                $("#device_serial_num").val(srno);
                $("#device_serial_num").attr('readonly', 'readonly');
                $("#DeviceSerialNumber").val(srno);
               // newFormMem.setProperty("DeviceSerialNumber", srno);
                $('#wait').hide();

            } else if (dpId.includes("Morpho.SmartChip") && DeviceName === 'Morpho_RD_Service') {
                if (xmlResponse.includes("dc")) {
                    srno = xmlDoc.getElementsByTagName("DeviceInfo")[0].getAttribute('dc');
                    //newFormMem.setProperty("DEVICE_SR_FLG", "false");
                    $("#DEVICE_SR_FLG").val("false");
                }
                $("#device_serial_num").val(srno);
                $("#device_serial_num").attr('readonly', 'readonly');
                $("#DeviceSerialNumber").val(srno)
             //   newFormMem.setProperty("DeviceSerialNumber", srno);
                $('#wait').hide();
            } else {
                $('#wait').hide();
                //utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)dpId::::does not match with device name::");
            }

        } else if (xmlhttp.status == 404)

        {
            $('#wait').hide();
            failCall(xmlhttp.status)

        } else if (xmlhttp.status == 503)

        {
            $('#wait').hide();
            failCall(xmlhttp.status);

        }
    }

    xmlhttp.onerror = function ()

    {
        $('#wait').hide();
        failCall(xmlhttp.status);

    }

    xmlhttp.onabort = function ()

    {

//        alert("Aborted");

    }

    xmlhttp.open("DEVICEINFO", uri, true);

    xmlhttp.send();

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
  //  utilsObj.writeLog("JS Log(DeviceSrNo2.0.js)dpIdCheck if RDSERVICE is running");

}
