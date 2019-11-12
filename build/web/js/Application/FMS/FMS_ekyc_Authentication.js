/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//$('#AadharSubscriber').change(function () {
//    newFormMem.alert($('#AadharSubscriber').val());
//});
var objFieldsData = {};
var connType = '';
var altRegExp = /^([789])([0-9])+$/;
var numberReg = /^[0-9]+$/;
var aadharReg = /^[2-9][0-9]{11,11}$|^[Nn][Aa]$/;
var deviceSerialReg = /^[a-zA-Z0-9.-]+$/;
var custName = '';
//agent adhar number
$("#AadharAgent").on('change', function (val) {
    var AgentAadharNum = $("#AadharAgent").val();
    if (AgentAadharNum == 'Select from list') {

    } else {
        $('#AadharNumber').val(AgentAadharNum);
    }
});


//load device name
function loadDeviceName() {

    var selectedDevice = $("#selectDevice").val();
    $('#BioDeviceList').val(selectedDevice).attr('disabled', 'disabled');
    var device_serial_num = $("#DeviceSerialNumber").val();
    if (device_serial_num.length > 0) {

        if (deviceSerialReg.test(device_serial_num)) {
            $('#device_serial_num').val(device_serial_num).attr('readonly', 'readonly');
        } else {
            $('#device_serial_num').val("").removeAttr('readonly');
        }

    }
}


function displayAadharNo() {
    var AgentAadharJOBJ = loginResponse.AadharNumbers;
    if (AgentAadharJOBJ.length > 0) {
        $(AgentAadharJOBJ).each(function (index) {
            $('#AadharAgent').append(new Option(AgentAadharJOBJ[index].ReferenceName, AgentAadharJOBJ[index].AadharNumber));
        });



    } else {
        alert("Please add the Aadhar number");
    }
}


function aadharValidation(textdata) {
    if (textdata.length === 12) {
        if (!aadharReg.test(textdata)) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}
function captureFinger(Type, nxtHtml, oldHtml, flowtype, formName) {
//as html names dynamically for ekyc and Re-ekyc. 
//html names statically are given in their respective html pages like ekyc_step2.html captureFinger method

//    alert("call")
    var AadharNo, selectDevice;
    try {
        if (oldHtml == 'eKYC_Rev_step4.html') {
            selectDevice = $('#BIODEVICE_MAKE').val();
            // newFormMem.setProperty("selectDevice", selectDevice);
        } else {
            var selectDevice1 = $('#BioDeviceList :selected').val();

//            BioDeviceList
            selectDevice = $('#BioDeviceList :selected').text();
            if (selectDevice1 == 0) {
                alert("SelectDevice From List");
                return false;
            }
        }
    } catch (e) {
        alert("JS Log(FMS_ekyc_Authuntication.js)::: Exception in select device block ::" + e);
    }
    if (Type == 'Subscriber') {
        AadharNo = $("#AadharSubscriber").val()
        //    newFormMem.setProperty("subAAdharNo", AadharNo);
        if (AadharNo == '') {
            // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is" + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_Aadhar_message"));
            // newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_Aadhar_message"));
            alert("Please enter  Aadhar Number");
            return;
        } else if (AadharNo.length < 12 || AadharNo.length > 16) {
            alert("UID / VID should be 12 or 16 numeric digits");
            $("#AadharSubscriber").val('');
            return;
        } else {
            var deviceSerialNum = $('#device_serial_num').val();
            if (aadharValidation(AadharNo)) {
                if (oldHtml == 'eKYC_Rev_step4.html') { //deviceSerialNum for  RE-Ekyc given in Agent authentication 
//                    FMSAadharAuthentication.captureAndAuthenticate(Type, AadharNo, selectDevice, nxtHtml, oldHtml, flowtype);
                    if (selectDevice === 'Morpho Safran') { // For Aadhaar2.0 calling new method and created AAdhaar2.0.js
                        Info('Morpho_RD_Service', Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                    } else {
                        Info(selectDevice, Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                    }
                } else if (oldHtml == 'FMS_eKYC_step4') { //deviceSerialNum for ekyc given in subscriber authentication
                    if (deviceSerialNum == '') {
                        //  utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is Please enter device serial number");
                        alert("Please enter device serial number");
                        $('#device_serial_num').removeAttr('readonly');
                        return;
                    } else {
                        if (!(deviceSerialReg.test(deviceSerialNum))) {
                            $('#device_serial_num').val("");
                            $('#device_serial_num').focus;
                            // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is Please enter proper device serial number");
                            alert("Please enter proper device serial number");
                            return false;
                        } else {
                            $("#Device_SerialNumber").val(deviceSerialNum);
                            //newFormMem.setProperty("Device_SerialNumber", deviceSerialNum);
                            // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js):::customer  aadhar numbers is" + AadharNo);
//                            FMSAadharAuthentication.captureAndAuthenticate(Type, AadharNo, selectDevice, nxtHtml, oldHtml, flowtype);
                            if (selectDevice === 'Morpho Safran') { // For Aadhaar2.0 calling new method and created AAdhaar2.0.js
                                Info('Morpho_RD_Service', Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                            } else {
                                Info(selectDevice, Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                            }
                        }


                    }
                }
            } else {
                // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is" + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_proper_Aadhar_message"));
                // newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_proper_Aadhar_message"));
                $("#AadharSubscriber").val('');
                return;
            }

        }
    } else if (Type == 'Agent') {

        var aadharSelection = $('input[type=radio][name=aadhaar]:checked').val();

        // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: aadharSelection is::: " + aadharSelection);
        if (aadharSelection == '' || aadharSelection == undefined) {
            //   utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.choose_Aadhar_message"));
            //   newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.choose_Aadhar_message"));
            return false;
        }
//        var reponse_auth;
        if (aadharSelection == 'listAadharNo') {
            AadharNo = $("#AadharAgent").val();

            if (AadharNo == '') {

                //AgentAadhar_No
                //  utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.select_Aadhar_message"));
                // newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.select_Aadhar_message"));
                return false;
            } else {
                //  newFormMem.setProperty("AgentAadhar_No", "set");
//                newFormMem.setProperty("AadharNo", AadharNo);
                $("#AgentAadhar_No").val("set");

                if (selectDevice === 'Morpho Safran') { // For Aadhaar2.0 calling new method and created AAdhaar2.0.js
                    Info('Morpho_RD_Service', Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                } else {
                    Info(selectDevice, Type, nxtHtml, oldHtml, flowtype, AadharNo, formName);
                }
            }
        } else if (aadharSelection == 'NewAadhar') {
            var newAadharNo = $("#inputAadhar").val();
            //newFormMem.alert("123"+newAadharNo);

//            utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: New Aadhar number is::" + newAadharNo);
            if (newAadharNo == "") {
                alert("Please enter Aadhaar Number");
                return false;
            } else {
//newFormMem.alert("321"+newAadharNo);
                if (aadharValidation(newAadharNo)) {
                    $("#AgentAadhar_No").val("Enter");
//                    newFormMem.setProperty("AadharNo", newAadharNo);
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Agent new aadhar numbers is" + AadharNo);
//                    reponse_auth = FMSAadharAuthentication.captureAndAuthenticate(Type, newAadharNo, selectDevice, nxtHtml, oldHtml, flowtype);
                    if (selectDevice === 'Morpho Safran') { // For Aadhaar2.0 calling new method and created AAdhaar2.0.js
                        Info('Morpho_RD_Service', Type, nxtHtml, oldHtml, flowtype, newAadharNo, formName);
                    } else {
                        Info(selectDevice, Type, nxtHtml, oldHtml, flowtype, newAadharNo, formName);
                    }
                } else {
                    //utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_proper_Aadhar_message"));
                    alert("Please enter proper Aadhaar Number");
                    $("#inputAadhar").val("");
                    return false;
                }
            }
        }

//        if (reponse_auth != 'success') {
//            $('#deviceLocater').modal('show');
//            if (reponse_auth == 'Startech') {
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').show();
//                $('#StartechDiv_64').show();
//                $('#StartechDiv_XP').show();
//                $('#StartechDiv_XP_64').show();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#Morpho_safranDiv_XP').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//                $('#Morpho_safranDiv_XP_64').hide();
//                $('#PrecisionDiv').hide();
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Startrek 32,64,xp links are visibled");
//            } else if (reponse_auth == 'SECUGEN') {
//                $('#SecureGenDiv_32').show();
//                $('#SecureGenDiv_64').show();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#Morpho_safranDiv_XP').hide();
//                $('#StartechDiv_XP').hide();
//                $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//                $('#PrecisionDiv').hide();
//                $('#Morpho_safranDiv_XP_64').hide();
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Securegen 32,64 links are visibled");
//            } else if (reponse_auth == 'Morpho Safran') {
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').show();
//                $('#Morpho_safranDiv_64').show();
//                $('#Morpho_safranDiv_XP').show();
//                $('#StartechDiv_XP').hide();
//                $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//                $('#PrecisionDiv').hide();
//                $('#Morpho_safranDiv_XP_64').show();
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Morpho 32,64,XP links are visibled");
//            }
//
////            } 
//            else if (reponse_auth == 'mantra') {
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#Morpho_safranDiv_XP').hide();
//                $('#StartechDiv_XP').hide();
//                $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').show();
//                $('#MantraDiv_64').show();
//                $('#PrecisionDiv').hide();
//                $('#Morpho_safranDiv_XP_64').hide();
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Mantra 32,64 links are visibled");
//            } else if (reponse_auth == 'Precision') {
//
//
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#Morpho_safranDiv_XP').hide();
//                $('#StartechDiv_XP').hide();
//                $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//                $('#Morpho_safranDiv_XP_64').hide();
//                $('#PrecisionDiv').show();
//                utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Precision links are visibled");
//            }
//        }

    } else if (Type == 'Summary_Subscriber') {
        var subAadhaarNo = $("#Subscriber_Aadhar").val();
        selectDevice = $('#BIODEVICE_MAKE').val();

        if (selectDevice === 'Morpho Safran') { // For Aadhaar2.0 calling new method and created AAdhaar2.0.js
            Info('Morpho_RD_Service', Type, nxtHtml, oldHtml, flowtype, subAadhaarNo, formName);
        } else {
            Info(selectDevice, Type, nxtHtml, oldHtml, flowtype, subAadhaarNo, formName);
        }
//        FMSAadharAuthentication.captureAndAuthenticate(Type, subAadhaarNo, selectDevice, nxtHtml, oldHtml, flowtype);
    }


}

function validateAgent(html) {

    var AgentAadhar = $("#AadharAgent").val();
    if (AgentAadhar == '' || AgentAadhar == null) {
        // utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_Agent_Aadhar_message"));
        //   newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.Enter_Agent_Aadhar_message"));
    } else {
        alert("Please Authenticate the agent finger");
//        var response = FMSAadharAuthentication.agentValidation(AgentAadhar);
//        utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: Agent validation response is " + response);
//        if (response) {
//            window.location.href = html;
//            utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: loading HTML is: " + html);
//        } else {
//            utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Agent_Authenticate_Aadhar_message"));
//            newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.Agent_Authenticate_Aadhar_message"));
//        }

    }
}
function validateSubscriber(html) {
    var subscriberAadhar = $("#AadharSubscriber").val();
    if (subscriberAadhar = '' || subscriberAadhar == null || subscriberAadhar.length == 0) {
        utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is " + newFormMem.getI18Message("eKYC.Aadhar_Enter_Subscriber_Aadhar_message"));
        newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Enter_Subscriber_Aadhar_message"));
    } else {
        var response = FMSAadharAuthentication.subscriberValidation();
        if (response) {
            window.location.href = html;
            utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: loading HTML is " + html);
        } else {
            utilsObj.writeLog("JS Log(FMS_ekyc_Authuntication.js)::: message is " + newFormMem.getI18Message("eKYC.Aadhar_Mesg.Subscriber_Authenticate_Aadhar_message"));
            newFormMem.alert(newFormMem.getI18Message("eKYC.Aadhar_Mesg.Subscriber_Authenticate_Aadhar_message"));
        }


    }
}
function deviceSerialNumber() {
    try {
        $("#device_serial_num").val("");
        //newFormMem.removeAttribute('DeviceSerialNumber');
        $("#DeviceSerialNumber").val("");
        var selectDevice = $('#BioDeviceList :selected').text();

        if (selectDevice === 'Morpho Safran') {
            DeviceChgSrNo("Morpho_RD_Service");
        } else {
            DeviceChgSrNo(selectDevice);
        }



//        if (dpId.includes(selectDevice.toUpperCase())) {
//            var deviceSerialNum = $("#device_serial_num").val();
//            if (newFormMem.isContainsKey("DeviceSerialNumber")) {
//                var deviceNum = newFormMem.getProperty("DeviceSerialNumber");
//                if (deviceNum.length > 0) {
//                    $("#device_serial_num").val(deviceNum);
//                    $("#device_serial_num").attr('readonly', 'readonly');
//                    newFormMem.setProperty("Device_SerialNumber", deviceNum);
//                }
//            } else {
//                if (deviceSerialNum == '') {
//                    newFormMem.alert("Please enter device serial number");
//                    $('#device_serial_num').removeAttr('readonly');
//                    return;
//                } else {
//                    if (!(deviceSerialReg.test(deviceSerialNum))) {
//                        $('#device_serial_num').val("");
//                        $('#device_serial_num').focus;
//                        newFormMem.alert("Please enter proper device serial number");
//                        return false;
//                    } else {
//                        newFormMem.setProperty("Device_SerialNumber", deviceSerialNum);
//                    }
//                }
//            }
//        }
//        } else if (reponse_auth == 'false') {
//            $('#BioDeviceList').val("0");
//        } else {
//
//            if (reponse_auth == 'Startech') {
//                $('#deviceLocater').modal('show');
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').show();
//                $('#StartechDiv_64').show();
//                $('#StartechDiv_XP').show();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//            } else if (reponse_auth == 'SECUGEN') {
//                $('#deviceLocater').modal('show');
//                $('#SecureGenDiv_32').show();
//                $('#SecureGenDiv_64').show();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#StartechDiv_XP').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//            } else if (reponse_auth == 'Morpho Safran') {
//                $('#deviceLocater').modal('show');
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').show();
//                $('#Morpho_safranDiv_64').show();
//                $('#StartechDiv_XP').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').hide();
//                $('#MantraDiv_64').hide();
//            } else if (reponse_auth == 'mantra') {
//                $('#deviceLocater').modal('show');
//                $('#SecureGenDiv_32').hide();
//                $('#SecureGenDiv_64').hide();
//                $('#StartechDiv_32').hide();
//                $('#StartechDiv_64').hide();
//                $('#Morpho_safranDiv_32').hide();
//                $('#Morpho_safranDiv_64').hide();
//                $('#StartechDiv_XP').hide();
////                $('#EvoluteDiv').hide();
//                $('#MantraDiv_32').show();
//                $('#MantraDiv_64').show();
//            }
//        }

    } catch (e) {
        alert("JS Log(FMS_ekyc_Authentication.js)::Exception in setting device serial numner into panel " + e);
    }

}
function pickDateAge() {
    $("#dob").val();
    var age = getAge($("#dob").val(), '/');
               
            if (age >= 18 && age <= 100) {
                $("#age").val(age);
            } else {
                if (age < 18) {
                    alert("Age should be greater than 18 years");
                } else if (age >= 100) {
                    alert("Age must be less than 100 years");
                } 
                $('#dob').val('');
                $('#age').val('');
                $('#dob').focus();
            }
}


//set customer adhar values
function setCustmoreData() {
    //alert("JS Log(FMS_ekyc_Authentication.js)::Custmore Aadhaar values set into panel is started");
//       try {
//        if (type == 'Subscriber') {
//            var path = document.getElementById("Aadhar_SubscriberPhoto").value;
//            document.getElementById('aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);
//
////            newFormMem.setImage("Aadhar_SubscriberPhoto");
//        } else if (type == 'Agent') {
//            var path = document.getElementById("Aadhar_AgentPhoto").value;
//            document.getElementById('Agent_aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);
//        }
//
//    } catch (ee) {
////        newFormMem.alert(ee);
//    }
//    try {
//        newFormMem.setImage("aadhar_photo");
//    } catch (e) {
//        utilsObj.writeLog("JS Log(FMS_ekyc_Authentication.js)::Exception in Aadhaar Photo set into panel " + e);
//    }
//    cust_Aadhaar,
    var AdharRes = $("#AadharResponse").val();
    // var AdharRes = newFormMem.getJSONProperty('AadharResponse');
    var CustData = {};
    CustData = JSON.parse(AdharRes);
//           console.log("CustData:$$:"+JSON.stringify(CustData));
   try{
    $("#first_name").val(CustData.Poi_name);
    custName = CustData.Poi_name;
    var spilt = custName.split(" ");
    //swapping names::::::
    if (spilt[0].length > 0) {
        if (custName.indexOf(' ') == -1) {
            $("#cust_swap_btn").attr("disabled", true);
            $("#uid_first_name").val(spilt[0]);
            $("#uid_last_name").val("..");
        } else {
            $("#cust_swap_btn").attr("disabled", false);
            $("#uid_first_name").val(custName.substr(0, custName.indexOf(' ')));
            $('#cust_swap_btn').on('click', function () {
                var $this = $(this);
                if ($this.data('clicked')) {
                    $this.data('clicked', false);
                    $("#uid_first_name").val(custName.substr(0, custName.indexOf(' ')));
                    $("#uid_last_name").val(custName.substr(custName.indexOf(' ') + 1));

                } else {
                    $this.data('clicked', true);
                    $("#uid_last_name").val(custName.substr(0, custName.indexOf(' ')));
                    $("#uid_first_name").val(custName.substr(custName.indexOf(' ') + 1));

                }
            });
        }

    }

    if (spilt[1].length > 0) {
        $("#uid_last_name").val(custName.substr(custName.indexOf(' ') + 1));
    }
   }catch(e){}
    //swapping ends

    try {
        var cust_f_h_name = CustData.Poa_co;
//        var cust_f_h_m="";
        if (cust_f_h_name.toString().trim().length > 0) {

            $("#f_h_name").val(CustData.Poa_co);
            $("#f_h_name").attr('readonly', 'readonly');
            $("#f_h_name_label").text("Name Of Father/Husband ( As received from UIDAI)");
            $("#me_f_h_name").val(cust_f_h_name);
            $("#me_f_h_name_asterik").hide();
        } else {
            $("#me_f_h_name_asterik").show();
            $("#f_h_name").removeAttr('readonly');
        }
    } catch (e) {

    }

    var customer_addr = '';
    try {
        if (CustData.Poa_house.length > 0) {
            customer_addr += CustData.Poa_house + ", ";
        }
        if (CustData.Poa_loc.length > 0) {
            customer_addr += CustData.Poa_loc + ", ";
        }
        if (CustData.Poa_vtc.length > 0) {
            customer_addr += CustData.Poa_vtc + ", ";
        }
        if (CustData.Poa_state.length > 0) {
            customer_addr += CustData.Poa_state + ", ";
        }
        if (CustData.Poa_dist.length > 0) {
            customer_addr += CustData.Poa_dist + ", ";
            instaldistrictLaodingEkyc();
            billdistrictLaodingEkyc();

        }
        if (CustData.Poa_lm.length > 0) {
            customer_addr += CustData.Poa_lm + ", ";
        }
        if (CustData.Poa_street.length > 0) {
            customer_addr += CustData.Poa_street + ", ";
        }
        if (CustData.Poa_subdist.length > 0) {
            customer_addr += CustData.Poa_subdist + ", ";
        }
        if (CustData.Poa_po.length > 0) {
            customer_addr += CustData.Poa_po + ",";
        }
        if (CustData.Poa_pc.length > 0) {
            customer_addr += CustData.Poa_pc + " .";
        }
    } catch (e) {
    }
   
   




    $("#uid_cust_addr").val(customer_addr);
    try {
        if (CustData.UidData_uid.length > 0) {

            $("#poi_number").val(CustData.UidData_uid);
            $("#poa_number").val(CustData.UidData_uid);
        }
    } catch (e) {
//        alert("JS Log(FMS_ekyc_Authentication.js)::Exception in adhar values into panel " + e);
    }
    try {
        var Agent_Gen = CustData.Poi_gender;
        if (Agent_Gen.length > 0) {
            if (Agent_Gen == 'M') {
                $('input:radio[name="gender"]').filter('[value="2"]').attr('checked', true);
                $('input[name="gender"]').attr('disabled', 'disabled');
            } else if (Agent_Gen == 'F') {
                $('input:radio[name="gender"]').filter('[value="1"]').attr('checked', true);
                $('input[name="gender"]').attr('disabled', 'disabled');
            } else if (Agent_Gen == 'O') {
                $('input:radio[name="gender"]').filter('[value="3"]').attr('checked', true);
                $('input[name="gender"]').attr('disabled', 'disabled');
            }
        }
        
        if(CustData.Poi_dob.length==4){
            $('#dob').prop("disabled", false);
                    $("#dob").datetimepicker({
                    format: 'DD/MM/YYYY',
                    minDate: new Date('01/01/'+CustData.Poi_dob),
                    maxDate: new Date('12/31/'+CustData.Poi_dob),
                    
                });
                $('#dob').val('');

        }else{
            var formatedDate = getDataFormat(CustData.Poi_dob);
            $("#dob").val(formatedDate);
            var age = getAge(CustData.Poi_dob,'-');
            $("#age").val(age);
        }
        
    

        var cust_email = CustData.Poi_email;
        $("#email").val(cust_email);
        //newFormMem.setProperty("cust_email_Aadh", cust_email);
//        var cust_email="";
        if (cust_email.toString().trim().length > 0) {
            $("#email").val(CustData.Poi_email);
            $("#email").attr('readonly', 'readonly');
        } else {
            $("#email").removeAttr('readonly');
        }
        var cust_mobileNo = CustData.Poi_phone;
        if (cust_mobileNo.length > 0) {
            $("#cust_mobile_no").val(cust_mobileNo);
            $("#cust_mobile_no").attr('readonly', 'readonly');
        } else {
            $("#cust_mobile_no").removeAttr('readonly');
        }

    } catch (e) {
       // alert("JS Log(FMS_ekyc_Authentication.js)::Exception in adhar values into panel " + e);
    }




}
function getAge(birth,splitBy) {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();
    var pieces = birth.split(splitBy);
    var birth_date = pieces[0];
    var birth_month = pieces[1];
    var birth_year = pieces[2];
    if (curr_month == birth_month && curr_date >= birth_date)
        return parseInt(curr_year - birth_year);
    if (curr_month == birth_month && curr_date < birth_date)
        return parseInt(curr_year - birth_year - 1);
    if (curr_month > birth_month)
        return parseInt(curr_year - birth_year);
    if (curr_month < birth_month)
        return parseInt(curr_year - birth_year - 1);
}
function getDataFormat(dataValue) {
//    newFormMem.alert(dataValue);

    try {
        var pieces = dataValue.split('-');
        var birth_date = pieces[0];
        var birth_month = pieces[1];
        var birth_year = pieces[2];
        var formatedDate = birth_date + '/' + birth_month + '/' + birth_year;
        return formatedDate;
    } catch (e) {

    }
}
//function showCustmoreAadhaar() {
//    var subAadhaarNo = newFormMem.getProperty("subAAdharNo");
//    $("#Cust_Aadhaar").val(subAadhaarNo);
//}
function loadSubAadharNo() {


    var errMsg = $('#ErrorMsg').val();
    if (errMsg == "" || errMsg == null) {
    } else {
        alert(errMsg);
    }



    try {
        setTimeout(function () {
            loadUserName();
        }, 100);
    } catch (e) {

    }

}

$('#BioDeviceList').on('change', function () {

    $("#device_serial_num").val("");
//    newFormMem.removeAttribute('DeviceSerialNumber');
    var selectDevice = $('#BioDeviceList :selected').text();

    if (selectDevice === 'Morpho Safran') {
        DeviceChgSrNo("Morpho_RD_Service");
    } else {
        DeviceChgSrNo(selectDevice);
    }

//    if (dpId.includes(selectDevice.toUpperCase())) {
//        var deviceSerialNum = $("#device_serial_num").val();
//        if (newFormMem.isContainsKey("DeviceSerialNumber")) {
//            var deviceNum = newFormMem.getProperty("DeviceSerialNumber");
//            if (deviceNum.length > 0) {
//                $("#device_serial_num").val(deviceNum);
//                $("#device_serial_num").attr('readonly', 'readonly');
//                newFormMem.setProperty("Device_SerialNumber", deviceNum);
//            }
//        } else {
//            if (deviceSerialNum == '') {
//                newFormMem.alert("Please enter device serial number");
//                $('#device_serial_num').removeAttr('readonly');
//                return;
//            } else {
//                if (!(deviceSerialReg.test(deviceSerialNum))) {
//                    $('#device_serial_num').val("");
//                    $('#device_serial_num').focus;
//                    newFormMem.alert("Please enter proper device serial number");
//                    return false;
//                } else {
//                    newFormMem.setProperty("Device_SerialNumber", deviceSerialNum);
//                }
//            }
//        }
//    }
//    } else if (reponse_auth == 'false') {
//        $('#BioDeviceList').val("0");
//    } else {
//        if (reponse_auth == 'Startech') {
//            $('#deviceLocater').modal('show');
//            $('#SecureGenDiv_32').hide();
//            $('#SecureGenDiv_64').hide();
//            $('#StartechDiv_32').show();
//            $('#StartechDiv_64').show();
//            $('#StartechDiv_XP').show();
//            $('#StartechDiv_XP_64').show();
//            $('#Morpho_safranDiv_32').hide();
//            $('#Morpho_safranDiv_64').hide();
//            $('#Morpho_safranDiv_XP').hide();
////                $('#EvoluteDiv').hide();
//            $('#MantraDiv_32').hide();
//            $('#MantraDiv_64').hide();
//            $('#Morpho_safranDiv_XP_64').hide();
//            $('#PrecisionDiv').hide();
//            //utilsObj.writeLog("JS Log(Authuntication.js)::: Startrek 32,64,xp links are visibled");
//        } else if (reponse_auth == 'SECUGEN') {
//            $('#deviceLocater').modal('show');
//            $('#SecureGenDiv_32').show();
//            $('#SecureGenDiv_64').show();
//            $('#StartechDiv_32').hide();
//            $('#StartechDiv_64').hide();
//            $('#Morpho_safranDiv_32').hide();
//            $('#Morpho_safranDiv_64').hide();
//            $('#Morpho_safranDiv_XP').hide();
//            $('#StartechDiv_XP').hide();
//            $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//            $('#MantraDiv_32').hide();
//            $('#MantraDiv_64').hide();
//            $('#PrecisionDiv').hide();
//            $('#Morpho_safranDiv_XP_64').hide();
//            //utilsObj.writeLog("JS Log(Authuntication.js)::: Securegen 32,64 links are visibled");
//        } else if (reponse_auth == 'Morpho Safran') {
//            $('#deviceLocater').modal('show');
//            $('#SecureGenDiv_32').hide();
//            $('#SecureGenDiv_64').hide();
//            $('#StartechDiv_32').hide();
//            $('#StartechDiv_64').hide();
//            $('#Morpho_safranDiv_32').show();
//            $('#Morpho_safranDiv_64').show();
//            $('#Morpho_safranDiv_XP').show();
//            $('#StartechDiv_XP').hide();
//            $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//            $('#MantraDiv_32').hide();
//            $('#MantraDiv_64').hide();
//            $('#PrecisionDiv').hide();
//            $('#Morpho_safranDiv_XP_64').show();
//            //utilsObj.writeLog("JS Log(Authuntication.js)::: Morpho 32,64,XP links are visibled");
//        }
////            else if (reponse_auth == 'Evolute') {
////                $('#SecureGenDiv').hide();
////                $('#StartechDiv').hide();
////                $('#Morpho_safranDiv').hide();
////                $('#EvoluteDiv').show();
////                $('#MantraDiv').hide();
////            } 
//        else if (reponse_auth == 'mantra') {
//            $('#deviceLocater').modal('show');
//            $('#SecureGenDiv_32').hide();
//            $('#SecureGenDiv_64').hide();
//            $('#StartechDiv_32').hide();
//            $('#StartechDiv_64').hide();
//            $('#Morpho_safranDiv_32').hide();
//            $('#Morpho_safranDiv_64').hide();
//            $('#Morpho_safranDiv_XP').hide();
//            $('#StartechDiv_XP').hide();
//            $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//            $('#MantraDiv_32').show();
//            $('#MantraDiv_64').show();
//            $('#PrecisionDiv').hide();
//            $('#Morpho_safranDiv_XP_64').hide();
//            //utilsObj.writeLog("JS Log(Authuntication.js)::: Mantra 32,64 links are visibled");
//        } else if (reponse_auth == 'Precision') {
//            $('#deviceLocater').modal('show');
////                document.getElementById('SecureGenDiv_32').style.display = "none";
////                document.getElementById('SecureGenDiv_64').style.display = "none";
////                document.getElementById('StartechDiv_32').style.display = "none";
////                document.getElementById('StartechDiv_64').style.display = "none";
////                document.getElementById('StartechDiv_XP').style.display = "none";
////                document.getElementById('StartechDiv_XP_64').style.display = "none";
////                document.getElementById('Morpho_safranDiv_32').style.display = "none";
////                document.getElementById('Morpho_safranDiv_64').style.display = "none";
////                document.getElementById('Morpho_safranDiv_XP').style.display = "none";
////                document.getElementById('MantraDiv_32').style.display = "none";
////                document.getElementById('MantraDiv_64').style.display = "none";
////                document.getElementById('Morpho_safranDiv_XP_64').style.display = "none";
////                document.getElementById('PrecisionDiv').style.display = "block";
//            $('#SecureGenDiv_32').hide();
//            $('#SecureGenDiv_64').hide();
//            $('#StartechDiv_32').hide();
//            $('#StartechDiv_64').hide();
//            $('#Morpho_safranDiv_32').hide();
//            $('#Morpho_safranDiv_64').hide();
//            $('#Morpho_safranDiv_XP').hide();
//            $('#StartechDiv_XP').hide();
//            $('#StartechDiv_XP_64').hide();
////                $('#EvoluteDiv').hide();
//            $('#MantraDiv_32').hide();
//            $('#MantraDiv_64').hide();
//            $('#Morpho_safranDiv_XP_64').hide();
//            $('#PrecisionDiv').show();
//            //utilsObj.writeLog("JS Log(Authuntication.js)::: Precision links are visibled");
//        }
//    }


});


    function loadWingsPlan() {
    var reqData = {};
    reqData.jobType = 'Wings';
    $.ajax({
        url: "loadWingsPlan.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            var resJson = JSON.parse(JSON.stringify(data));
            var availablePlans = resJson.response.responseData;
            if (availablePlans.WINGS_PLANS.length > 0) {
                var availexCodelarr = availablePlans.WINGS_PLANS;
                $('#cust_wings_traiff').children().remove();
                $('#cust_wings_traiff').append('<option value="0">Select from list</option>');
                $(availexCodelarr).each(function (index) {
                    if(availexCodelarr[index].PLAN_ID =="WTP6" || availexCodelarr[index].PLAN_ID =="WTP6A"){
                       $('#cust_wings_traiff').append('<option style="font-weight:bold" value='+availexCodelarr[index].PLAN_ID+'>'+availexCodelarr[index].PLAN_NAME+'</option>'); 
                    }else{
                    $('#cust_wings_traiff').append(new Option(availexCodelarr[index].PLAN_NAME, availexCodelarr[index].PLAN_ID));
                }
                    });
            } 

        }, error: function (data) {
            alert("Plans not available");
        }
        
    });
   checkPlanReq(); 
}

    function toggleFields() {
             clearTrailFlag();
             clearTraffValues();
             loadWingsSchemes();
             $('#hrmImp').hide();
        if ($("#cust_wings_traiff").val() == "WTP2") {
            $('#plan_lbl_name').text(lblGOVTname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblGOVTval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblGOVTid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead2);
            $('#pop_lab_msg').text(lblpopmsg2);
            $("#popModel").modal();
        } else if ($("#cust_wings_traiff").val() == "WTP3") {
            $('#plan_lbl_name').text(lblSDNTname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblSDNTval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblSDNTid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead3);
            $('#pop_lab_msg').text(lblpopmsg3);
            $("#popModel").modal();
        } else if ($("#cust_wings_traiff").val() == "WTP4") {
            $('#plan_lbl_name').text(lblLLname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblLLval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblLLid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead4);
            $('#pop_lab_msg').text(lblpopmsg4);
            $("#popModel").modal();
        }else if($("#cust_wings_traiff").val() == "WTP6"){
            $('#trail_pack_dtls').show();
            validation_req=true;
            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide();
            $('#wings_scheme_dd').hide();
            
        }else if($("#cust_wings_traiff").val() == "WTP6A"){
            $('#trail_pack_dtls').hide();
            $('#free_mob_plan').show();
            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide(); 
            $('#wings_scheme_dd').hide(); 
            is_mob_valid_req=true;
            loadCircleList();
        }else if($("#cust_wings_traiff").val() == "WTP6B"){
            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide();
            $('#wings_scheme_dd').hide();
            $('#hrmImp').show();
                   
        }
        else if( $("#cust_wings_traiff").val() =="WTP7"){
            $('#plan_lbl_name').text(lblBSNLname).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblBSNLval).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblBSNLid).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead7);
            $('#pop_lab_msg').text(lblpopmsg7);
            $("#popModel").modal();            
        } else if( $("#cust_wings_traiff").val() =="WTP8"){
            $('#plan_lbl_name').text(lblwtp8name).append('<font color="red">*</font>');
            $('#plan_lbl_val').text(lblwtp8val).append('<font color="red">*</font>');
            $('#plan_lbl_id').text(lblwtp8id).append('<font color="red">*</font>');
            $('#pop_lab_header').text(lblpophead8);
            $('#pop_lab_msg').text(lblpopmsg8);
            $("#popModel").modal();   
            $('#name_plan').hide();
            
        }else if($("#cust_wings_traiff").val() == "WTP9"){
            $('#trail_pack_dtls').show();
            validation_req=true;
//            $('#isdirDiv').hide();
            $('#plan_dtls_div').hide();
//            $('#wings_scheme_dd').hide();
            
        }        
        else {
            $('#plan_dtls_div').hide();
            clearTraffValues();
        }
    }  
    
    function loadCircleList(){
        $('#wait').show();
    var reqData = {};
    reqData.type = "DKYC";
    reqData.LOB_TYPE = "WINGS";
    $.ajax({
        url: "loadCircleList.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait').hide();
            if (data.response.success) {
                var circlesArr = data.response.responseData;
                $('#free_zone').children().remove();
                $('#free_zone').append('<option value="0">Select from list</option>');
                $(circlesArr).each(function (index) {
                    $('#free_zone').append($("<option></option>").attr("value", circlesArr[index].CIRCLE_CODE).text(circlesArr[index].CIRCLE_NAME).attr("zone_code", circlesArr[index].ZONE_CODE));
                });

            } else {
                alert(data.response.message);
                $('#free_zone').children().remove();
                $('#free_zone').append('<option value="0">Select from list</option>');
                return false;
            }
        }, error: function (data) {
            $('#wait').hide();
            alert("error : " + JSON.stringify(data));
        }
    });

    }
   var scheme_amt ={}; 
    function loadWingsSchemes(){
        $('#wait').show();
        $('#wings_scheme_dd').show();
    var reqData = {};
    reqData.type = "DKYC";
    reqData.LOB_TYPE = "WINGS";
    $.ajax({
        url: "loadWingsSchemes.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait').hide();
            if (data.response.success) {
                var schemesArr = data.response.responseData.SCHEME_DD;
                scheme_amt ={};
                scheme_amt = data.response.responseData.SCHEME_AMT;
                $('#wings_scheme').children().remove();
                //$('#cust_wings_traiff').append('<option value="0">Select from list</option>');
                $(schemesArr).each(function (index) {
                    $('#wings_scheme').append($("<option></option>").attr("value", schemesArr[index].SCHEME_ID).text(schemesArr[index].SCHEME_NAME).attr("SCHEME_AMOUNT", schemesArr[index].SCHEME_AMT));
                });

            } else {
                alert(data.response.message);
                $('#wings_scheme').children().remove();
                //$('#free_zone').append('<option value="0">Select from list</option>');
                return false;
            }
        }, error: function (data) {
            $('#wait').hide();
            alert("error : " + JSON.stringify(data));
        }
    });

    }
    
    function clearTrailFlag(){
        $('#trail_pack_dtls').hide();
        $('#isdirDiv').show();
        $('#cust_rmn_no_valid').val('');
        $('#name_plan').show();
        $('#otp_mob_plan').hide();
        $('#plan_org_name').val('');
        $('#freeplan_mob_num').val('');
        $('#freeplan_mob_num').prop('disabled',false);
        $('#freeplan_mob_num_otp').val('');
        $('#freeplan_mob_num_otp').prop('disabled',false);
        $('#free_zone').prop('disabled',false);
        $('#free_zone').val(0);
        $('#free_mob_plan').hide();
        $('#cust_bsnl_trail_mobno').prop('disabled',false);
        $('#cust_bsnl_trail_mobno2').prop('disabled',false);
        $('#rmn_dtls_div').hide();
        rmn_no_exist=false;
        rmn_valid_done=false;
        validation_req=false;
        is_mob_valid_req=false;
    }

    function deniedDeclaration() {
        $('#cust_wings_traiff').val('0');
        $('#plan_dtls_div').hide();
    }

    function confDeclaraion() {
        var selTarrifPlan = $("#cust_wings_traiff").val();
        clearTraffValues();
        if (selTarrifPlan != 0) {
            if (selTarrifPlan == "WTP6" || selTarrifPlan == "WTP1") {
                $('#plan_dtls_div').hide();
            } else {
                $('#plan_dtls_div').show();
            }
        } else {
            alert("Please select tarrif Plan");
            return false;
        }
    }

    var planfield=[
    "plan_org_name","plan_service_num","input_POI_govt",
    "plan_inst_name","plan_loc_name","input_POI_stnt",
    "plan_exst_llno","input_POI_ll","cust_bsnl_trail_mobno","cust_bsnl_trail_mobno2","cust_bsnl_trail_code","cust_rmn_no_valid"];

    function   clearTraffValues() {
    for (var i in planfield) {
        $('#' + planfield[i]).val('');
    }
}
     