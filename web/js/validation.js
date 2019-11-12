/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//Regular Expressions 
var alphanumericReg = /^[a-zA-Z0-9 _]+$/;
var alphanumericRegEXp = /^[a-zA-Z0-9]+$/;
var alphabeticReg = /^[(a-z )(A-Z)]+$/;
var alphabeticReg1 = /^[a-zA-Z]+$/;
var numberReg = /^[0-9]+$/;
var alternateContactReg = /^([6789])([0-9])+$/;
var alphanumericSpecialReg = /^[(a-z )(A-Z)(0-9-,/)]+$/;
var emailReg = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.([a-zA-Z]{2,4})+([a-zA-Z.]{0,4})$/;
var mobsizeReg = /^[0-9]{0-10}$/;
var textSizeReg = /^[a-zA-Z]{7}$/;
var usernameReg = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
var spaceaphanumeric = /^[A-Za-z0-9? ,_-]+$/;
var passportReg = /^[a-zA-Z0-9]+$/;
//var passportReg=/^(([a-zA-Z]{2})\\d{7})$/;
//var passportReg=/^[A-Z][A-Z0-9]*[0-9A-Za-z]$/;
//var aadharReg=/^[0-9]$/;
var aadharReg = /^[2-9][0-9]{11,11}$|^[Nn][Aa]$/;
var panReg = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
//var panReg=/^([a-zA-Z]){3}([CPHFTBLJGcphftbljg]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
var alphabetReg = /^[a-zA-Z]+$/;
var alphabetWthSpaceReg = /^[a-zA-Z ]+$/;
var dateallowedReg = /^[0-9/]+$/;
var alpha1 = /^[a-zA-Z]*$/;
//Main Validations 

function alphabetic(alphabetic) {

    if (!alphabeticReg.test(alphabetic)) {
        return false;
    } else {
        return true;
    }


}
function alphabetic1(keyE) {
    var charV = keyE.key;

    if (charV == undefined) {
        //alert('undefined');
        charV = String.fromCharCode(keyE.charCode)
    }
    if (charV == 'Backspace' || charV == 'Tab') {
        return true;
    }
    if (!alphabeticReg1.test(charV)) {
        return false;
    } else {
        return true;
    }


}

function spaceUnderscoreAlphanumeric(alphanumeric) {
    if (!spaceaphanumeric.test(alphanumeric)) {
        return false;
    } else {
        return true;
    }
}

function alphanumerics(alphanumeric) {

    if (!alphanumericReg.test(alphanumeric)) {
        return false;
    } else {
        return true;
    }


}
function alphanumericsVal(alphanumericVal) {

    if (!alphanumericRegEXp.test(alphanumericVal)) {
        return false;
    } else {
        return true;
    }


}
function isNumber(keyE) {
    var charV = keyE.key;

    if (charV == undefined) {
        //alert('undefined');
        charV = String.fromCharCode(keyE.charCode)
    }
    if (charV == 'Backspace' || charV == 'Tab') {
        return true;
    }
    var reg = /[0-9]$/;
    if (reg.test(charV)) {
        //        if($("#digits").val().length == 4){
        //            searchForSims(contextpath,$("#digits").val()+charV);
        //        }
        return true;
    }
    return false;
}
function numeric(numeric) {
    if (!numberReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

function dateallowedRegFun(numeric) {
    if (!dateallowedReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

function altContact(numeric) {
    if (!alternateContactReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}
function alphanumericsSpecChar(alphanumericspec) {

    if (!alphanumericSpecialReg.test(alphanumericspec)) {
        return false;
    } else {
        return true;
    }


}

function emailValidation(email) {
    if (!emailReg.test(email)) {
        return false;
    } else {
        return true;
    }


}

function mobileLengthValidation(mobno) {
    if (!emailReg.test(mobno)) {
        return false;
    } else {
        return true;
    }


}

function textfieldLengthValidation(textdata) {
    if (!textSizeReg.test(textdata)) {
        return false;
    } else {
        return true;
    }


}

//passport,pan,aadhar validations

function passportValidation(textdata) {
    if (!passportReg.test(textdata)) {
        return false;
    } else {
        return true;
    }
}
function panValidation(textdata) {
    if (!panReg.test(textdata)) {
        return false;
    } else {
        return true;
    }
}

function aadharValidation(textdata) {
    if (!aadharReg.test(textdata)) {
        return false;
    } else {
        return true;
    }
}



//Individual field Validation....

function loginUserNameValidation() {
    //    newFormMem.alert('Login UserName');
    var userNameStatus = spaceUnderscoreAlphanumeric($('#msisdn').val());

    if (userNameStatus == true) {
        $('#msisdn').css('border-color', 'green');
    } else {
        $("#msisdn").val("");
        $('#msisdn').focus().css('border-color', 'red');
    }


}

function userNameValidation() {
    var usernameStatus = alphanumerics($('#msisdn').val());
    if (usernameStatus == true) {
        $('#msisdn').css('border-color', 'green');
    } else {
        $("#msisdn").val("");
        $('#msisdn').focus().css('border-color', 'red');
    }

}

function forgetpswdUserNameValidation() {
    var usernameStatus = alphabetic($('#username').val());
    if (usernameStatus == true) {
        $('#username').css('border-color', 'green');
    } else {
        $("#username").val("");
        $('#username').focus().css('border-color', 'red');
    }

}

function languageValidation() {
    var usernameStatus = alphabetic($('#lang').val());
    if (usernameStatus == true) {
        $('#lang').css('border-color', 'green');
    } else {
        $("#lang").val("");
        $('#lang').focus().css('border-color', 'red');
    }
}



function deviceTypeValidation() {
    var devicetype = $('#devicetype').val();
    var deviceStatus = alphanumerics(devicetype);
    if (deviceStatus == true) {
        $('#devicetype').css('border-color', 'green');
    } else {
        $("#devicetype").val("");
        $('#devicetype').focus().css('border-color', 'red');
    }
}
function devicUserValidation() {
    var deviceUser = $('#devuser').val();
    var deviceUserStatus = alphanumerics(deviceUser);
    if (deviceUserStatus == true) {
        $('#devuser').css('border-color', 'green');
    } else {
        $("#devuser").val("");
        $('#devuser').focus().css('border-color', 'red');
    }
}

function deviceUserMobNo() {

    var mobile = $('#devmob').val();
    var mobileStatus = altContact(mobile);

    if (mobileStatus == true) {
        $('#devmob').css('border-color', 'green');
    } else {
        newFormMem.alert("It should be a valid mobile number which should start with 6,7,8,9");
        $("#devmob").val("");
        $('#devmob').focus().css('border-color', 'red');
    }
}

function emailFieldValidation() {
    //    newFormMem.alert('Email is')
    var email = $('#devemail').val();
    var emailValStatus = emailValidation(email);
    if (emailValStatus == true) {
        $('#devemail').css('border-color', 'green');
    } else {
        $("#devemail").val("");
        $('#devemail').focus().css('border-color', 'red');
    }


}
//KYCType
var metaData = {};
function setMetaDataForValidation(objmetaData) {
    metaData = objmetaData;
//newFormMem.getAttribute('KYCType')
}
function dtAllowedValidation(idVal) {
    var target = idVal.getAttribute('id');
    var targetVal = $('#' + target).val();
    if (!dateallowedRegFun(targetVal)) {
        $('#' + target).val('');
        $('#' + target).focus();
        return false;
    }
}
function captialLetters(event) {
    var target = event.getAttribute('id');

    if (target == 'upc_code') {
        var val = $('#' + target).val();
        $('#' + target).val(val.toUpperCase());
    }
    if (target == 'pan_gir_uid') {
        var val = $('#' + target).val();
        $('#' + target).val(val.toUpperCase());

    }

}
function formFieldValidation(event) {
    //newFormMem.alert('metaData:'+metaData);
    var target = event.getAttribute('id');
    if (target == 'existing_number_count') {
        $(".opratorTR").remove();
        var existing_number_count = $('#existing_number_count').val();
        if (existing_number_count > 8) {
            alert("Maximum permitted connections in a circle is 9. Please enter a value less than 9.");
            $('#existing_number_count').val('');
            $('#existing_number_count').focus();
            return false;
        }
        if (existing_number_count > 0) {
            var DD_DATA = $("#DD_DATA").val();
            var DD_DATA_obj = JSON.parse(DD_DATA);
            var OpearatorList = DD_DATA_obj.OPERATORS_LIST;

            var content = '<td style="width:350px";padding:6px 2px><span class="bold">';
            var content1 = '</span><input type="text"   placeholder="Operator Name" maxlength="15" id="';
            var content2 = '" onkeypress="return alphabetic1(event);"/> <input type="text"  placeholder="Numbers Held" value="" id="';
//            var content1 = '</span><select  placeholder="Operator Name" maxlength="15" id="operator_list" name=""';
//            var content2 = '<option value="">Select from list</option> /> <input type="text"  placeholder="Numbers Held" value="" id="';
            var content3 = '" class="num" maxlength="1"  onpaste="return  isNumber(event);" onkeypress="return isNumber(event)";" style="width:110px"/></td>';
            var finalContent = '<tr class="opratorTR">';
            var repeat = 0;
            for (var i = 1; i <= OpearatorList.length; i++) {
                if (i % 3 == 0) {
                    finalContent = finalContent + content + i + ")&nbsp;" + content1 + "oprator_" + i + content2 + "opratorCount_" + i + content3 + "</tr><tr class='opratorTR'>";

                } else {
                    finalContent = finalContent + content + i + ")&nbsp;" + content1 + "oprator_" + i + content2 + "opratorCount_" + i + content3;

                }
            }
            finalContent = finalContent + "</tr>";
            $(finalContent).insertAfter("#existing_number_count");


            for (var i = 0; i < OpearatorList.length; i++) {
                $("#oprator_" + (i + 1)).val(OpearatorList[i].DD_VALUE);
            }

        }

    }
    if (target == 'branch_name') {
        var branch_name = $('#branch_name').val();

        var isnum = /^\d+$/.test(branch_name);
        if (isnum) {
            alert("Enter valid branch name");
            $('#branch_name').val('');
            $('#branch_name').focus();
            return false;
        }
    }

    if (target == 'bank_ifsc_code') {
        var val1 = $('#' + target).val();
        var isnum = /^\d+$/.test(val1);
        if (isnum) {
            alert("Enter valid IFSC code");
            $('#bank_ifsc_code').val('');
            $('#bank_ifsc_code').focus();
            return false;
        }
    }

    if (target == 'loc_addr_street' || target == 'perm_addr_street' || target == 'loc_ref_details') {
        var val1 = $('#' + target).val();
        var isnum = /^\d+$/.test(val1);
        if (isnum) {
            alert("Please enter valid Address");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
    }
    if (target == 'loc_addr_locality' || target == 'perm_addr_locality') {
        var val1 = $('#' + target).val();
        var isnum = /^\d+$/.test(val1);
        if (isnum) {
            alert("Please enter valid Locality/Tehsil ");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
    }

    if (target == 'loc_addr_landmark' || target == 'perm_addr_landmark') {
        var val1 = $('#' + target).val();
        var isnum = /^\d+$/.test(val1);
        if (isnum) {
            alert("Please enter valid Address Landmark");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
    }


    if (target == 'upc_code') {
        try {
            var flag = "false";
            var upc_code = $('#' + target).val();
            var charArray = upc_code.split('');
            if (upc_code == '') {
                alert("UPC Code field must not be empty");
                setTimeout(function () {
                    $('#upc_code').focus();
                }, 5);
                return true;
            } else {
                if (upc_code.length == 8) {
                    // auto populating previous operator
                    var availablePrev_OperJOBJ = {};
                    var strPrevOptr = $("#prev_optr_data").val();
                    availablePrev_OperJOBJ = JSON.parse(strPrevOptr);
                    $(availablePrev_OperJOBJ).each(function (index) {
                        if (charArray[0] === availablePrev_OperJOBJ[index].CODE) {
                            flag = "true";
                            return false;
                        } else {
                            flag = "false";

                        }
                    });
                    //auto populating donor circle
                    var availableDonr_CircleJOBJ1 = {};
                    var strDonarCircle = $("#donor_circle_data").val();
                    availableDonr_CircleJOBJ1 = JSON.parse(strDonarCircle);
                    $(availableDonr_CircleJOBJ1).each(function (index) {
                        if (charArray[1] === availableDonr_CircleJOBJ1[index].CODE) {
                            flag = "true";
                            return false;
                        } else {
                            flag = "false";

                        }

                    });
                    var strLoginResponse = parent.$("#loginResponse").val();
                    var AIRCEL_MNP_MSG = $("#AIRCEL_MNP_MSG").val();
                    var loginResponse = JSON.parse(strLoginResponse);
                    var userFlag = loginResponse.UserFlag;

//                    var upcCodeStauts = numeric(upc_code.substr(2, upc_code.length));
                    var upcCodeStauts = numeric(upc_code.substr(3, upc_code.length));
                    if (flag === 'false' || upcCodeStauts === false) {
                        alert("Please enter proper UPC Code");
                        $('#' + target).val('');
                        setTimeout(function () {
                            $('#upc_code').focus();
                        }, 5);
                        return true;
                    } else {

                        var availablePrev_OperJOBJ = {};
                        var aircelCode = "";
                        var strPrevOptr = $("#prev_optr_data").val();
                        availablePrev_OperJOBJ = JSON.parse(strPrevOptr);
                        $(availablePrev_OperJOBJ).each(function (index) {
                            if ($("#AIRCEL_MNP_CODE").val() === availablePrev_OperJOBJ[index].DD_VALUE) {
                                aircelCode = availablePrev_OperJOBJ[index].CODE;
                            }
                        });
//                        if (userFlag === "3") {
                        if (alphabetReg.test(upc_code.substr(0, 3))) {
                            $('#AIRCEL_MNP_FLG').val('0');
                        }
//                        } 
//                        else {
//                            if (alphabetReg.test(upc_code.substr(0, 3))) {
//                                alert(AIRCEL_MNP_MSG);
//                                $('#' + target).val('');
//                                setTimeout(function () {
//                                    $('#upc_code').focus();
//                                }, 5);
//                                return true;
//                            } else if (!alphabetReg.test(upc_code.substr(0, 2))) {
//                                alert("Please enter proper UPC Code");
//                                $('#' + target).val('');
//                                setTimeout(function () {
//                                    $('#upc_code').focus();
//                                }, 5);
//                                return true;
//                            } else if (charArray[0] === aircelCode) {
//                                alert(AIRCEL_MNP_MSG);
//                                $('#' + target).val('');
//                                setTimeout(function () {
//                                    $('#upc_code').focus();
//                                }, 5);
//                                return true;
//                            }
//
//                        }

                    }

                } else {
                    alert("UPC Code length must be 8");
                    $('#' + target).val('');
                    setTimeout(function () {
                        $('#upc_code').focus();
                    }, 5);
                    return true;
                }
            }
        } catch (e) {
            //alert(e)
        }
    } else if (target == 'bsnl_telno') {
//        var deposit_amt = $('#' + target).val();

//        if (deposit_amt == '' || deposit_amt == 0) {
//            var bsnl_telno = $('#bsnl_telno').val();
//            if (bsnl_telno <= 16 && bsnl_telno >= 10) {
//            } else {
//                $('#bsnl_telno').val("");
//
//                newFormMem.alert(newFormMem.getI18Message("common.mnp.valid.bsnlland"));
//
//
//            }
//        }

    } else if (target == 'MIGMobile') {
        var MIG_Length = $('#' + target).val();
        var MIG_Mobile = numeric($('#' + target).val());

        if (MIG_Mobile == true) {
            //            newFormMem.alert("::::::::"+MIG_Length.length);
            if (MIG_Length.length == 10) {
            } else {
                alert("Please enter 10 digits Mobile Number");
                return false;
            }
        } else {
            alert("Please enter number");

            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }


    } else if (target == "loc_addr_pin") {

        var pinCodeArray = [];

        var targetVal = $("#" + target).val();
        if (!numeric(targetVal)) {
            alert("Please enter valid PIN code");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
        if (targetVal.length < 6) {
            alert("PIN length must be 6 characters long");
            $('#' + target).val('');
            $('#' + target).focus();
            return false
        }
        var target2 = targetVal.charAt(0) + targetVal.charAt(1);



        var resState = $('#STATES_PIN_DATA').val();

        pinCodeArray = JSON.parse(resState);

        var state = $("#loc_addr_state").val();
        if (state == '') {
            alert("Please select the state");

            $('#' + target).val("");
            return false;
        }
        var val = $('#' + target).val();
        if (val.length == 6) {
            for (var i = 0; i < pinCodeArray.length; i++) {

                var pinCodeJOBJ = pinCodeArray[i];
                if (pinCodeJOBJ.DD_CODE == state) {

                    var pincode = pinCodeJOBJ.DD_VALUE;

                    var codes;

                    if (pincode.length >= 4) {
                        codes = pincode.split(',');
                        var status = false;
                        for (j = 0; j < codes.length; j++) {
                            if (target2 == codes[j]) {
                                status = true;
                                break;
                            } else {
                                status = false;
                            }
                        }
                        if (status == false) {
                            alert("Please enter valid PIN code");

                            $('#' + target).val("");
                            return false;
                        }
                    } else if (pincode.length < 4) {
                        if (target2 == pincode) {

                        } else {
                            alert("Please enter valid PIN code");

                            $('#' + target).val("");
                            return false;
                        }
                    }
                }
            }
        } else {

        }





    }
    //permanent address pin
    else if (target == "perm_addr_pin") {

        var kycCust_type = $("#customer_type").val();
        if (kycCust_type === '0004') {
        } else {

            var pinCodeJOBJ = [];

            var targetVal = $("#" + target).val();
            if (!numeric(targetVal)) {
                alert("Please enter valid PIN code");
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
            if (targetVal.length < 6) {
                alert("PIN length must be 6 characters long");
                $('#' + target).val('');
                $('#' + target).focus();
                return false
            }
            var target2 = targetVal.charAt(0) + targetVal.charAt(1);


            var picoderesRes = $('#OTHER_STATES_PIN_DATA').val();
            pinCodeJOBJ = JSON.parse(picoderesRes);
            var state = $("#perm_addr_state").val();
            if (state == '') {
                alert("Please select the state");

                $('#' + target).val("");
                return false;
            }
            var val = $('#' + target).val();
            if (val.length == 6) {
                for (var i = 0; i < pinCodeJOBJ.length; i++) {
                    if (pinCodeJOBJ[i].DD_CODE == state) {
                        var pincode = pinCodeJOBJ[i].DD_VALUE;

                        var codes;

                        if (pincode.length >= 4) {
                            codes = pincode.split(',');
                            var status = false;
                            for (j = 0; j < codes.length; j++) {
                                if (target2 == codes[j]) {
                                    status = true;
                                    break;
                                } else {
                                    status = false;
                                }
                            }
                            if (status == false) {
                                alert("Please enter valid PIN code");

                                $('#' + target).val("");
                                return false;
                            }
                        } else if (pincode.length < 4) {
                            if (target2 == pincode) {

                            } else {
                                alert("Please enter valid PIN code");

                                $('#' + target).val("");
                                return false;
                            }
                        }
                    }
                }
            } else {

            }


        }


    }
    //poa_number validation
    else if (target == 'poa_number') {

        var objIdvlMetaData = {};
        objIdvlMetaData = metaData[target];
        var dispName = objIdvlMetaData.DISPLAY_NAME;
        var targetVal = $('#' + target).val();
        var poa_typeVal = $('#poa_type').val();

        if (poa_typeVal == '') {

            alert("Please enter valid POA number");


            return true;
        } else {
            //passport(Forieng)
            if (poa_typeVal == "Z00078") {
//                if (targetVal.length < 9) {
//                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
//                    $('#' + target).val('');
//                    $('#' + target).focus();
//                    return false
//                }
                if (targetVal.length > 15) {
                    alert("Passport number maximum length must be 15 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                }
                if (!passportValidation(targetVal)) {
                    alert("please enter valid passport number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }
            }
            //passport
            else if (poa_typeVal == "4") {
//                if (targetVal.length < 9) {
//
//                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
//                    $('#' + target).val('');
//                    $('#' + target).focus();
//                    return false
//                } 
                if (targetVal.length > 15) {
                    alert("Passport number maximum length must be 15characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                }
                if (!passportValidation(targetVal)) {
                    alert("please enter valid passport number");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }

            }
            //            Aadharcard

            else if (poa_typeVal == "23") {
                if (targetVal.length < 12 || targetVal.length > 12) {
                    alert("Aadhaar card number length must be 12 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!aadharValidation(targetVal)) {
                    alert("Please enter valid Aadhaar card number");


                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {

                }

            }
            //pancard
            else if (poa_typeVal == "23") {
                if (targetVal.length < 10 || targetVal.length > 10) {

                    alert("PAN length must be 10 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!panValidation(targetVal)) {
                    alert("Please enter valid PAN");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {

                }

            } else {
                if (targetVal.length < 8) {


                    alert("POA number length must be 8 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!alphanumericsVal(targetVal)) {

                    alert("Please enter valid POA number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }
            }

        }
    }
    //POItype validation
    else if (target == 'poi_number') {
        var objIdvlMetaData = {};
        objIdvlMetaData = metaData[target];
        var dispName = objIdvlMetaData.DISPLAY_NAME;
        var targetVal = $('#' + target).val();
        var poi_typeVal = $('#poi_type').val();

        if (poi_typeVal == '') {

            alert("Please select Poi Type");

            return true;
        } else {
            //passport(Forieng)
            if (poi_typeVal == "Z00078") {
//                if (targetVal.length < 9) {
//
//                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
//                    $('#' + target).val('');
//                    $('#' + target).focus();
//                    return false
//                } 
                if (targetVal.length > 15) {
                    alert("Passport number maximum length must be 15 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                }
                if (!passportValidation(targetVal)) {

                    alert("please enter valid passport number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }
            }
            //passport
            else if (poi_typeVal == "4") {
//                if (targetVal.length < 9) {
//                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
//
//                    $('#' + target).val('');
//                    $('#' + target).focus();
//                    return false
//                }
                if (targetVal.length > 15) {
                    alert("Passport number maximum length must be 15 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                }
                if (!passportValidation(targetVal)) {
                    alert("please enter valid passport number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {

                }

            }
            //            Aadharcard

            else if (poi_typeVal == "23") {
                if (targetVal.length < 12 || targetVal.length > 12) {

                    alert("Aadhaar card number length must be 12 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!aadharValidation(targetVal)) {

                    alert("Please enter valid Aadhaar card number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }


            }
            //pancard
            else if (poi_typeVal == "15") {
                if (targetVal.length < 10 || targetVal.length > 10) {


                    alert("PAN length must be 10 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!panValidation(targetVal)) {
                    alert("Please enter valid PAN");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }

            } else {
                if (targetVal.length < 8) {
                    alert("POI number length must be 8 characters long");
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                }
                if (!alphanumericsVal(targetVal)) {

                    alert("Please enter valid POI number");

                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false
                } else {
                }
            }

        }


    }
    //Payment type cheque
    else if (target == 'payment_type') {
        var objIdvlMetaData = {};
        objIdvlMetaData = metaData[target];
        var dispName = objIdvlMetaData.DISPLAY_NAME;
        var targetVal = $('#' + target).val();
        if (targetVal == '2') {
            //            var bank_account_no = $("#bank_account_no").val();
            //            var bank_name= $("#bank_branch").val();
            //            var bank_ifsc_code = $("#bank_ifsc_code").val();
            //            var bank_branch= $("#bank_branch").val();
            if (!regExp.test(val)) {
                alert(dispName + '  should be valid.')
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
            if (val.length < MinLen) {
                alert(dispName + ' minimum length is ' + MinLen + ' characters')

                $('#' + target).focus();
                return false;
            }
        }

    }
//    else if (target == 'gsm_number') {
//
//        var targetVal = numeric($('#' + target).val());
//        if (targetVal.length < 10){
//            newFormMem.alert("GSM Number  min length is 10");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false
//        }
//        if (targetVal == true) {
//        } else {
//            newFormMem.alert('GSM Number  should be valid.');
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
//    } 
    else if (target == 'bank_name') {
        var targetVal = $('#' + target).val();
        if (!alphabetWthSpaceReg.test(targetVal)) {
            alert("Enter valid Bank name");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
    }
//     else if (target == 'bank_name') {
//        var branchName = $('#' + target).val();
//        if (!alphabetReg.test(branchName)) {
//            newFormMem.alert("Enter valid Branch name");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
//    } 
//    
//    else if (target == 'bank_name') {
//        var branchName = numeric($('#' + target).val());
//        if (branchName == true) {
//        } else {
//            newFormMem.alert("Enter valid Account Number");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
//
//
//    } else if (target == 'bank_name') {
//
//        var ifsc_code = alphanumericsVal($('#' + target).val());
//        if (ifsc_code == true) {
//        } else {
//            newFormMem.alert("Enter valid IFSC Code");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
//
//    } else if (target == 'bank_name') {
//        var chequeNo = numeric($('#' + target).val());
//        if (chequeNo == true) {
//        } else {
//            newFormMem.alert("Enter valid Cheque Number");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
//    } 
    else if (target == 'alt_cont_no') {
        var alt_cont_no = altContact($('#' + target).val());
        if (alt_cont_no == true) {
            if (($('#' + target).val()).length == 10) {
            } else {
                alert(" Alternate number length should be 10");
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
        } else {
            alert("It should be a valid mobile number which should start with 6,7,8,9");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }
//    } else if (target == 'loc_ref_contact') {
//        var loc_ref_contact = altContact($('#' + target).val());
//        var loc_ref_contact_val = $('#' + target).val();
//        if (loc_ref_contact == true) {
//            if (loc_ref_contact_val.length >= 10 && loc_ref_contact_val.length <= 12) {
//            } else {
//                alert("Please enter valid local reference contact number");
//                $('#' + target).val('');
//                $('#' + target).focus();
//                return false;
//            }
//        } else {
//            alert("It should be a valid mobile number which should start with 6,7,8,9");
//            $('#' + target).val('');
//            $('#' + target).focus();
//            return false;
//        }
    } else if (target == 'otherAddr') {
        var other_Addr = $('#otherAddr').val();

        var isnum = /^\d+$/.test(other_Addr);
        if (isnum) {
            alert("Enter valid Address");
            $('#otherAddr').val('');
            $('#otherAddr').focus();
            return false;
        }
    } else if (target == 'cymn_mobile_pin') {
        var cymnVal = $('#' + target).val();
        var cymnData = numeric($('#' + target).val());

        if (cymnData == true) {
//            if (cymnVal.length == 10) {
//            } else {
//                newFormMem.alert(newFormMem.getI18Message("common.mnp.valid.mobileno"));
//
//            }
        } else {
            alert("Please enter number");

            $('#' + target).val('');
            $('#' + target).focus();
        }

    } else if (target == 'pan_gir_uid') {
        var panVal = $('#' + target).val();
        var panData = alphanumericsVal(panVal);
        if (panData == true)
        {
            if (panVal.length == 10) {
                var isnum = /^\d+$/.test(panVal);
                if (isnum || (/^[a-zA-Z]+$/.test(panVal))) {
                    alert("Enter valid PAN/UIS Number");
                    $('#pan_gir_uid').val('');
                    $('#pan_gir_uid').focus();
                    return false;
                } else {

                    if ((/^[A-Z0-9]+$/).test(panVal)) {

                    } else {
                        alert("Enter valid PAN/UIS Number");
                        $('#pan_gir_uid').val('');
                        $('#pan_gir_uid').focus();
                        return false;
                    }
                }
            } else {
                alert("PAN/UIS number length should be 10");
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
        } else {
            alert("Enter valid PAN/UIS");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }

    } else {
        var value = $('#' + target).val();
        var objIdvlMetaData = {};
        objIdvlMetaData = metaData[target];
        var strReg = objIdvlMetaData.ALLOWED_VALUES;
        var regExp = eval(strReg);
        var dispName = objIdvlMetaData.DISPLAY_NAME;
        var MinLen = objIdvlMetaData.MIN_LENGTH;
        var MaxLen = objIdvlMetaData.MAX_LENGTH;
        if (value.length > 0) {
            if (!regExp.test(value)) {
                if (target === 'gsm_number') {
                    alert("It should be a valid mobile number which should start with 6,7,8,9");
                } else {
                    alert(dispName + '  should be valid.')
                }
                $('#' + target).val('');
                $('#' + target).focus();

                return false;
            } else {
                if (target == 'first_name') {
                    var caf_type = $("#CAF_TYPE").val();
                    if (caf_type == 'Prepaid - Postpaid' || caf_type == 'Postpaid - Prepaid') {
                        var migrationRes = $("#Migration_AccDetails").val();
                        var migrationJSOn = JSON.parse(migrationRes);
                        $("#aadhar_name").text($('#' + target).val(''));
                        $("#billing_name").text(migrationJSOn.BILL_FNAME);
                    }
                }
            }
        }
        if (value.length < MinLen) {
            $('#' + target).focus();
            $('#' + target).val('');
            alert(dispName + ' minimum length is ' + MinLen + ' characters')
            return false;
        }
        if (value.length > MaxLen) {
            $('#' + target).focus();
            $('#' + target).val('');
            alert(dispName + ' maximum length is ' + MaxLen + ' characters')
            return false;
        }
    }
}

function formFieldValidation1(event) {

    var target = event.getAttribute('id');
    //newFormMem.alert(target+":::target");
    if (target == 'email') {
        var val1 = $('#' + target).val();
        var emailStatus = emailValidation(val1);

        if (emailStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'existing_number_count') {
        var val1 = $('#' + target).val();
        var numberCountStatus = numeric(val1);

        if (numberCountStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'pan_gir_uid') {
        var panVal = $('#' + target).val();
        if (panVal.length == 10) {
            var panData = alphanumericsVal(panVal);
            alert(panData);
            if (panData == true) {

            } else {
//            newFormMem.alert("Enter valid PAN/UIS");
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
            var isnum = /^\d+$/.test(panVal);
            if (isnum || (/^[a-zA-Z]+$/.test(panVal))) {
//                    newFormMem.alert("Enter valid PAN/UIS Number");
                $('#pan_gir_uid').val('');
                $('#pan_gir_uid').focus();
                return false;
            } else {

                if ((/^[A-Z0-9]+$/).test(panVal)) {

                } else {
//                        newFormMem.alert("Enter valid PAN/UIS Number");
                    $('#pan_gir_uid').val('');
                    $('#pan_gir_uid').focus();
                    return false;
                }
            }
        } else {
//                newFormMem.alert("PAN/UIS number length should be 10");
            $('#' + target).val('');
            $('#' + target).focus();
            return false;
        }


    }

    if (target == 'f_h_name') {
        var val1 = $('#' + target).val();
        var f_h_name = alphabetic(val1);

        if (f_h_name == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'first_name' || target == 'last_name') {
        var val1 = $('#' + target).val();
        var first_name = alphabetic(val1);

        if (first_name == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'gsm_number' || target == 'imsi') {
        var val1 = $('#' + target).val();
        var gsm_number = numeric(val1);

        if (gsm_number == true) {


        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_addr_city' || target == 'loc_addr_locality' || target == 'loc_addr_state' || target == 'loc_addr_street') {
        var val1 = $('#' + target).val();
        var alphabeticStatus = alphabetic(val1);

        if (alphabeticStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_addr_hno') {
        var val1 = $('#' + target).val();
        var alphanumericStatus = alphanumericsSpecChar(val1);

        if (alphanumericStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_addr_pin') {
        var val1 = $('#' + target).val();
        var numberCountStatus = numeric(val1);

        if (numberCountStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_ref_buildingname') {
        var val1 = $('#' + target).val();
        var alphanumericStatus = alphanumerics(val1);

        if (alphanumericStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_ref_city' || target == 'loc_ref_district' || target == 'loc_ref_locality') {
        var val1 = $('#' + target).val();
        var alphabeticStatus = alphabetic(val1);

        if (alphabeticStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'loc_ref_contact') {
        var val1 = $('#' + target).val();
        var alphanumericStatus = numeric(val1);

        if (alphanumericStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'loc_ref_hno') {
        var val1 = $('#' + target).val();
        var alphanumericStatus = alphanumericsSpecChar(val1);

        if (alphanumericStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'bank_account_no') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = numeric(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'bank_ifsc_code') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphanumerics(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'bank_name') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphabetic(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'bank_branch') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphabetic(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }


    //loc_ref_pincode - Numaric
    if (target == 'loc_ref_pincode') {
        var val1 = $('#' + target).val();
        var loc_ref_pincode = numeric(val1);

        if (loc_ref_pincode == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //loc_ref_state -Alpha
    if (target == 'loc_ref_state') {
        var val1 = $('#' + target).val();
        var loc_ref_state = alphabetic(val1);

        if (loc_ref_state == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //loc_ref_street -Alpha
    if (target == 'loc_ref_street') {
        var val1 = $('#' + target).val();
        var loc_ref_street = alphabetic(val1);

        if (loc_ref_street == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //passport_no- Alphanumaric
    if (target == 'passport_no') {
        var val1 = $('#' + target).val();
        var passport_no = alphanumerics(val1);

        if (passport_no == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    //perm_addr_city -Alpha
    if (target == 'perm_addr_city') {
        var val1 = $('#' + target).val();
        var perm_addr_city = alphabetic(val1);

        if (perm_addr_city == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //perm_addr_hno -ALPHA NUMERIC - /,
    if (target == 'perm_addr_hno') {
        var val1 = $('#' + target).val();
        var perm_addr_hno = alphanumericsSpecChar(val1);

        if (perm_addr_hno == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    //perm_addr_locality   -ALPHA
    if (target == 'perm_addr_locality') {
        var val1 = $('#' + target).val();
        var perm_addr_locality = alphabetic(val1);

        if (perm_addr_locality == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //    perm_addr_pin -Numaric
    if (target == 'perm_addr_pin') {
        var val1 = $('#' + target).val();
        var perm_addr_pin = numeric(val1);

        if (perm_addr_pin == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //perm_addr_state -Alpha
    if (target == 'perm_addr_state') {
        var val1 = $('#' + target).val();
        var perm_addr_state = alphabetic(val1);

        if (perm_addr_state == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //perm_addr_street -Alpha
    if (target == 'perm_addr_street') {
        var val1 = $('#' + target).val();
        var perm_addr_street = alphabetic(val1);

        if (perm_addr_street == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //    poa_issue_place -Alpha
    if (target == 'poa_issue_place') {
        var val1 = $('#' + target).val();
        var poa_issue_place = alphabetic(val1);

        if (poa_issue_place == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //poa_issuing_auth -Alpha 
    if (target == 'poa_issuing_auth') {
        var val1 = $('#' + target).val();
        var poa_issuing_auth = alphabetic(val1);

        if (poa_issuing_auth == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //poa_number-Alpha Numaric
    if (target == 'poa_number') {
        var val1 = $('#' + target).val();
        var poa_number = alphanumerics()(val1);

        if (poa_number == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //poi_issue_place -Alpha
    if (target == 'poi_issue_place') {
        var val1 = $('#' + target).val();
        var poi_issue_place = alphabetic(val1);

        if (poi_issue_place == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //poi_issuing_auth -Alpha
    if (target == 'poi_issuing_auth') {
        var val1 = $('#' + target).val();
        var poi_issuing_auth = alphabetic(val1);

        if (poi_issuing_auth == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //poi_number- Alphanumaric
    if (target == 'poi_number') {
        var val1 = $('#' + target).val();
        var poi_number = alphanumerics(val1);

        if (poi_number == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //sim_number -Numaric
    if (target == 'sim_number') {
        var val1 = $('#' + target).val();
        var sim_number = numeric(val1);

        if (sim_number == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //visa_no- AlphaNumaric
    if (target == 'visa_no') {
        var val1 = $('#' + target).val();
        var visa_no = numeric(val1);

        if (visa_no == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == 'aadhar_no') {
        var val1 = $('#' + target).val();
        var alphaStatus = numeric(val1);
        //        var alphaStatus = alphabetic(val1);

        if (alphaStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'loc_ref_name') {
        var val1 = $('#' + target).val();
        var alphaStatus = alphabetic(val1);

        if (alphaStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    if (target == 'alt_cont_no') {
        var val1 = $('#' + target).val();
        var numericStatus = numeric(val1);

        if (numericStatus == true) {

        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }





    //e-VISA Validations

    //country
    if (target == 'country') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphabetic(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //subscriber
    if (target == 'subscriber') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphanumerics(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }


    //eKYC Validations

    if (target == 'services') {
        var val1 = $('#' + target).val();
        var mobileNoStatus = alphanumeric(val1);

        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }


}





function prefUserValidation() {
    var usernameStatus = alphabetic($('#prefusername').val());
    if (usernameStatus == true) {
        $('#prefusername').css('border-color', 'green');
    } else {
        $("#prefusername").val("");
        $('#prefusername').focus().css('border-color', 'red');
    }
}





//FormValidation...

function settingsFormisEmpty() {
    function settingsValidation() {
        newFormMem.alert('::::::::::Settings Validation::::::::::::');
        var url1 = $('#othersurl').val();
        var url2 = $('#othersurl1').val();
        if (url1 == '' || url2 == '') {
            return false
        } else {
            return true;
        }
        return true;
    }
}

function deviceFormValidation() {
    //   newFormMem.alert(':::::::::::::::::::deviceFormValidation:::::::::::::::::::::');
    var devicetype = $('#devicetype').val();
    var devuser = $('#devuser').val();
    var devmob = $('#devmob').val();
    var devemail = $('#devemail').val();
    //    newFormMem.alert('deviceformValidation');
    if (devicetype == '' || devuser == '' || devmob == '' || devemail == '') {
        newFormMem.alert('Please enter mandatory fields');
        return false
    } else {
        deviceRegistration();
        return true;
    }
}

function devicePrefFormValidation() {

    var usrname = $('#prefusername').val();
    var oldpswd = $('#prefoldpswd').val();
    var newpswd = $('#prefnewpswd').val();
    var hq = $('#prefhq').val();
    var ha = $('#prefha').val();
    if (usrname == '' || oldpswd == '' || newpswd == '' || hq == '' || ha == '') {
        return false;
    } else {
        return true;
    }
    return true;
}


//mobile validation on changing in sim caf

$("#pairedMobile").on("change", function () {
    var strLoginResponse = parent.$("#loginResponse").val();
    var loginResponse = JSON.parse(strLoginResponse);
    var userFlag = loginResponse.UserFlag;
    var connection_type = $("input[name='connection_type']:checked").val();
    var pairedMobile = $("#pairedMobile").val();
    if (connection_type == "1") {
        if (pairedMobile.length < 10) {
            alert("Enter valid 10 digits GSM number");
            $("#pairedMobile").val('');
        }
        $("#sim_type").val("");
        $("#gsm_number").val("");
        $("#sim_number").val("");
        $("#imsi").val("");
        $("#plan_code").val("");
    } else {
        $("#Purpose").val("");
    }
    if (userFlag == 5) {
        $("#Retailer").val("");
    }
    $("#divGetInfo").hide();
});

$("#gsm_number").on("change", function () {
    $("#divGetInfo").hide();
});

$("#MIGMobile").on("change", function () {
    $("#divGetInfo").hide();
    $("#account_no").val("");
});
$("#swapMobile").on("change", function () {
    $("#divGetInfo").hide();
    $("#account_no").val("");
});
$("#simNumber").on("change", function () {
    $("#imsi").val("");
    $("#plan_code").val("");
    $("#divGetInfo").hide();

});
