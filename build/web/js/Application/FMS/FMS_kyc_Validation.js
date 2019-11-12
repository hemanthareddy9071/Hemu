
var objCustData = {};
var objServicesData = {};
var objReceiptData = {};
var numberReg = /^[0-9]+$/;
//var emailReg=/^[A-Za-z0-9._]+@[A-Za-z0-9]+\.([a-zA-Z]{2,4})+([a-zA-Z.]{0,4})$/;
//var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\[a-zA-Z]{2,3})+$/;
var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passportReg = /^[a-zA-Z0-9]+$/;
var dateallowedReg = /^[0-9/]+$/;
var aadharReg = /^[2-9][0-9]{11,11}$|^[Nn][Aa]$/;
var panReg = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
var alpha1 = /^[a-zA-Z]*$/;
var alternateContactReg = /^([789])([0-9])+$/;
var faxNotReg = /^[0-9 ()+]+$/;
//var faxNotReg = /^\+?[0-9]+$/;

//var idValues = ['cust_title', 'cust_usage_code', 'cust_pre_type', 'cust_pref_comm', 'alt_mobile_no', 'inst_main_locality', 'inst_sub_locality', 'inst_exchange_code', 'bill_main_locality', 'bill_acc_sub_type', 'bill_frequency', 'bill_media', 'bill_email', 'bill_sub_locality', 'bill_exchange_code'];
//var idValues = [];
var metaDataValidation = {};
var dobValidationFlag = true;
function dtAllowedValidation(idVal) {
    var target = idVal.getAttribute('id');
    var targetVal = $('#' + target).val();
    if (!dateallowedRegFun(targetVal)) {
        $('#' + target).val('');
        $('#' + target).focus();
        return false;
    }
}
function dateallowedRegFun(numeric) {
    if (!dateallowedReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

function setAge(event) {
    if ($('#' + event.getAttribute('id')).val().length > 0 && dobValidationFlag) {
        var dobVal = $('#' + event.getAttribute('id')).val();

        try {
            var age = getAgekyc(dobVal);

        } catch (e) {
//            alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception while getting age' + e);

        }

        if (age >= 10 && age <= 100) {
            $("#age").val(age);
        } else {
            if ($('#' + event.getAttribute('id')).val().length < 10) {
                alert("Please enter valid date");
            } else if (age >= 100) {
                alert("Age must be less than 100 years");
            } else {
                alert(("kyc.age.greater_than_message"));
            }
            $('#dob').val('');
            $('#age').val('');
            if (dobVal.length != 0)
                $('#dob').focus();
        }
    } else {
        dobValidationFlag = true;
    }

}


function getAge(birth) {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();
    var pieces = birth.split('-');
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

function getAgekyc(birth) {
    try {
        var today = new Date();
        var curr_date = today.getDate();
//    ( '0' + (myDate.getMonth()+1) ).slice( -2 );
        var curr_month = today.getMonth() + 1;

        var curr_year = today.getFullYear();
        var pieces = birth.split('/');

        if (pieces.length < 3) {
            return false;
        }
        var birth_date = pieces[0];
        var birth_month = pieces[1];
        var birth_year = pieces[2];


        if (parseInt(curr_month) === parseInt(birth_month) && parseInt(curr_date) >= parseInt(birth_date)) {
            return parseInt(curr_year - birth_year);

        }
        if (parseInt(curr_month) === parseInt(birth_month) && parseInt(curr_date) < parseInt(birth_date)) {
            return parseInt(curr_year - birth_year - 1);
        }
        if (parseInt(curr_month) > parseInt(birth_month)) {
            return parseInt(curr_year - birth_year);
        }
        if (parseInt(curr_month) < parseInt(birth_month)) {
            return parseInt(curr_year - birth_year - 1);
        }
    } catch (e) {
//        alert("JS Log(FMS_ekyc_Validation.js):::::Exception in getAge:::::::" + e);
    }
}



function formFieldValidationFMSkycthin(event) {
    var target = event.getAttribute('id');    
    try {
//        if (document.getElementById('addr_same_check').checked) {
//            if (target == 'inst_addr_hno' || target == 'inst_addr_vill' || target == 'inst_addr_city' || target == 'inst_exchange_code') {
//                document.getElementById('addr_same_check').checked = false;
//                checksameValues();
//            }
//        }
        if (target == 'cust_pref_comm') {
            var objIdvlMetaData = metaDataValidation[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES.toString();

            var targetVal = $('#' + target).val();

            // newFormMem.alert(targetVal);
            if (targetVal == '0') {
                $('#' + target).focus();
                alert(dispName + ' should be mandatory.');
                return false;
            } else if (targetVal == '3') {
                try {
//                    $('#pre_label').text('6a.' + $('#' + target + ' option:selected').text());
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + "<font color='red'> *</font>");
                    $('#cust_pre_no').val('');
//                    $('#divWork').show();
                      document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');


                } catch (e) {
//                    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in set cust_home_no' + e);
                }

            } else if (targetVal == '4') {
                try {
//                    $('#pre_label').text('6a.' + $('#' + target + ' option:selected').text());
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + "<font color='red'> *</font>");
                    $('#cust_pre_no').val('');
//                    $('#divWork').show();
                     document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');
                } catch (e) {
//                    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in set cust_work_no' + e);
                }
            } else if (targetVal == '6') {
                try {
//                    $('#pre_label').text('6a.' + $('#' + target + ' option:selected').text() + ' no.');
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + ' no.' + "<font color='red'>*</font>");
                    $('#cust_pre_no').val('');
//                    $('#divWork').show();
                     document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');
                } catch (e) {
//                    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in set fax_no' + e);
                }
            } else {
                try {
                    $('#' + target).focus().css('border-color', 'green');
                    $('#pre_label').text('')
//                    $('#divWork').hide()();
                      document.getElementById("divWork").style.display = 'none';

                } catch (e) {
//                    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in  delete data' + e);
                }


            }

        } 
//        else if (target == 'poi_number') {
//            var objIdvlMetaData = {};
//            objIdvlMetaData = metaDataValidation[target];
//            var dispName = objIdvlMetaData.DISPLAY_NAME;
//            var targetVal = $('#' + target).val();
//            var poi_typeVal = $('#poi_type').val();
//
//            if (poi_typeVal == '' || poi_typeVal == '0') {
//
//                alert("Please select Poi Type");
//                $("#poi_number").val('');
//                $("#poi_type").focus();
//                return true;
//            } else {
//                //passport(Forieng)
//                if (poi_typeVal == "Z00078") {
////                if (targetVal.length < 9) {
////
////                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
////                    $('#' + target).val('');
////                    $('#' + target).focus();
////                    return false
////                } 
//                    if (targetVal.length > 15) {
//                        alert("Passport number maximum length must be 15 characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                    }
//                    if (!passportValidation(targetVal)) {
//
//                        alert("please enter valid passport number");
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//                        var samecheck = $('#poi_same_check').val();
//                        if (samecheck == "true") {
//                            $('#poa_number').val($('#' + target).val())
//                        }
//                    }
//                }
//                //passport
//                else if (poi_typeVal == "4") {
////                if (targetVal.length < 9) {
////                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
////
////                    $('#' + target).val('');
////                    $('#' + target).focus();
////                    return false
////                }
//                    if (targetVal.length > 15) {
//                        alert("Passport number maximum length must be 15 characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                    }
//                    if (!passportValidation(targetVal)) {
//                        alert("please enter valid passport number");
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//                        var samecheck = $('#poi_same_check').val();
//                        if (samecheck == "true") {
//                            $('#poa_number').val($('#' + target).val())
//                        }
//                    }
//
//                }
//                //            Aadharcard
//
//                else if (poi_typeVal == "23") {
//                    if (targetVal.length > 12 && targetVal.length < 16) {
//                        alert(("Please enter valid UID"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {}
//                    if (targetVal.length < 12 ) {
//
//                        alert("Aadhaar card number length must be 12 characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }if(targetVal.length == 12){
//                    if (!aadharValidation(targetVal)) {
//
//                        alert("Please enter valid Aadhaar card number");
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//                        var samecheck = $('#poi_same_check').val();
//                        if (samecheck == "true") {
//                            $('#poa_number').val($('#' + target).val())
//                        }
//                    }
//
//                    }
//                }
//            
//                //pancard
//                else if (poi_typeVal == "15") {
//                    if (targetVal.length < 10 || targetVal.length > 10) {
//
//
//                        alert("PAN length must be 10 characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }
//                    if (!panValidation(targetVal)) {
//                        alert(("Please enter valid PAN"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//                        var samecheck = $('#poi_same_check').val();
//                        if (samecheck == "true") {
//                            $('#poa_number').val($('#' + target).val())
//                        }
//                    }
//
//                } else {
//                    if (targetVal.length < 8) {
//                        alert(("POI number length must be 8 characters long"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }
//                    var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                    if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//
//                    } else {
//                        ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                        var regExp = eval(ALLOWED_VALUES);
//                        var targetVal = $('#' + target).val().trim();
//                        if (targetVal.length > 0) {
//                            if (!regExp.test(targetVal)) {
//                                $('#' + target).val('');
//                                $('#' + target).focus();
//                                alert(dispName + ' should be valid.')
//                                return false;
//                            } else {
//                                var samecheck = $('#poi_same_check').val();
//                                if (samecheck == "true") {
//                                    $('#poa_number').val($('#' + target).val())
//                                }
//                            }
//                        }
//                    }
//                }
//
//            }



//        } else if (target == 'poa_number') {
//
//            var objIdvlMetaData = {};
//            objIdvlMetaData = metaDataValidation[target];
//            var dispName = objIdvlMetaData.DISPLAY_NAME;
//            var targetVal = $('#' + target).val();
//            var poa_typeVal = $('#poa_type').val();
//
//            if (poa_typeVal == "" || poa_typeVal == '0' || poa_typeVal == 'undefined') {
//
//                alert(("Please select POA Type"));
//                $("#poa_number").val('');
//                $("#poa_type").focus();
//                return true;
//            } else {
//                //passport(Forieng)
//                if (poa_typeVal == "Z00078") {
////                if (targetVal.length < 9) {
////                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
////                    $('#' + target).val('');
////                    $('#' + target).focus();
////                    return false
////                }
//                    if (targetVal.length > 15) {
//                        alert("Passport number maximum length must be 15 characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                    }
//                    if (!passportValidation(targetVal)) {
//                        alert(("please enter valid passport number"));
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//
//                    }
//                }
//                //passport
//                else if (poa_typeVal == "4") {
////                if (targetVal.length < 9) {
////
////                    newFormMem.alert(newFormMem.getI18Message("common.valid.passlength"));
////                    $('#' + target).val('');
////                    $('#' + target).focus();
////                    return false
////                } 
//                    if (targetVal.length > 15) {
//                        alert("Passport number maximum length must be 15characters long");
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                    }
//                    if (!passportValidation(targetVal)) {
//                        alert(("please enter valid passport number"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//
//                    }
//
//                }
//                //            Aadharcard
//
//                else if (poa_typeVal == "23") {
//                    if (targetVal.length > 12 && targetVal.length < 16) {
//                         alert(("Please enter valid UID"));
//                         $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }else{}
//                    if (targetVal.length < 12 ) {
//                        alert(("Aadhaar card number length must be 12 characters long"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }if(targetVal.length == 12){
//                    if (!aadharValidation(targetVal)) {
//                        alert(("Please enter valid Aadhaar card number"));
//
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//
//                    }
//
//                }
//            }
//                //pancard
//                else if (poa_typeVal == "23") {
//                    if (targetVal.length < 10 || targetVal.length > 10) {
//
//                        alert(("PAN length must be 10 characters long"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }
//                    if (!panValidation(targetVal)) {
//                        alert(("Please enter valid PAN"));
//
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    } else {
//
//                    }
//
//                } else {
//                    if (targetVal.length < 8) {
//
//
//                        alert(("POA number length must be 8 characters long"));
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        return false
//                    }
//                    var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                    if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//
//                    } else {
//                        ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                        var regExp = eval(ALLOWED_VALUES);
//                        var targetVal = $('#' + target).val().trim();
//                        if (targetVal.length > 0) {
//                            if (!regExp.test(targetVal)) {
//                                $('#' + target).val('');
//                                $('#' + target).focus();
//                                alert(dispName + ' should be valid.')
//                                return false;
//                            } else {
//
//                            }
//                        }
//                    }
//                }
//
//            }
//        }
        else if (target == "cust_mobile_no" ) {  //|| target == "alt_mobile_no"
           var objIdvlMetaData = metaDataValidation[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
            var testval = $('#' + target).val();
            if (Numeric(testval)) {
            } else {
                alert(dispName + ' should be numeric only');
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }

            if ($('#' + target).val().length == 10) {
                try {
                    if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {

                    } else {
                        ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                        var regExp1 = eval(ALLOWED_VALUES);
                        var targetVal = $('#' + target).val();
                        if (targetVal.length > 0) {
                            if (!regExp1.test(targetVal)) {
                                $('#' + target).val('');
                                $('#' + target).focus();
                                alert(dispName + ' must start with 6,7,8,9 and only numeric are allowed')
                                return false;
                            } else {
                                if (target === "cust_mobile_no") {
                                    if ($('#' + target).val() === $('#alt_mobile_no').val()) {
                                        alert('Mobile no and Alternate mobile no should not be same');
                                        $('#' + target).val('');
                                        $('#' + target).focus();
                                        return false;
                                    } else {
                                    }
                                } else if (target === "alt_mobile_no") {
                                    if ($('#' + target).val() === $('#cust_mobile_no').val()) {
                                        alert('Alternate mobile no and Mobile no should not be same');
                                        $('#' + target).val('');
                                        $('#' + target).focus();
                                        return false;
                                    } else {
                                    }
                                }

                            }
                        }
                    }

                } catch (e) {
//                    utilsObj.writeLog("Exception in alternate and mobile number validation ::::: " + e);
                    //alert(e);
                }


            } else if ($('#' + target).val().length === 11) {
                try {
                    if (target === "cust_mobile_no") {
                        if ($('#' + target).val() === $('#alt_mobile_no').val()) {
                            alert('Mobile no and Alternate mobile no should not be same');
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        } else {
                        }
                    } else if (target === "alt_mobile_no") {
                        if ($('#' + target).val() === $('#cust_mobile_no').val()) {
                            alert('Alternate mobile no and Mobile no should not be same');
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        } else {
                        }
                    }
                    var targetVal = $('#' + target).val();
                    var zeroindx = targetVal.substr(0, 1);
                    if (zeroindx === 0 || zeroindx === '0') {
                        var firstindx = targetVal.substr(1, 1);
                        if (firstindx === 6 || firstindx === '6' || firstindx === 7 || firstindx === '7' || firstindx === 8 || firstindx === '8' || firstindx === 9 || firstindx === '9') {
                        } else {
                            alert(dispName + ' second digit must start with 6,7,8,9 for 11 digit number');
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        }
                    } else {
                        alert('If it is 11 digit mobile number which should start with 0');
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }
                } catch (e) {
//                    utilsObj.writeLog("Exception in alternate and mobile number  11 digit validation ::::: " + e);
                }

            } else {
                alert(dispName + ' should be 10 or 11 digit mobile number');
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
          } else if (target == "cust_pre_no") {
            if ($("#cust_pref_comm").val() === '6') {
                var objIdvlMetaData = metaDataValidation["fax_no"];
                var dispName = objIdvlMetaData.DISPLAY_NAME;
                var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
                var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
                var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                var testval = $('#' + target).val();
                var regExp = eval(ALLOWED_VALUES);
                var targetVal = $('#' + target).val().trim();
                if (targetVal.length > 0) {
                    if (!regExp.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(dispName + ' should be valid.')
                        return false;
                    } else {

                    }
                }

                if (!(MIN_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
                if (!(MAX_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
            }else if ($("#cust_pref_comm").val() === '4') {
                var objIdvlMetaData = metaDataValidation["cust_work_no"];
                var dispName = objIdvlMetaData.DISPLAY_NAME;
                var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
                var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
                var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                var testval = $('#' + target).val();
                var regExp = eval(ALLOWED_VALUES);
                var targetVal = $('#' + target).val().trim();
                if (targetVal.length > 0) {
                    if (!regExp.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(dispName + ' should be valid.')
                        return false;
                    } else {

                    }
                }

                if (!(MIN_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
                if (!(MAX_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
            } else if ($("#cust_pref_comm").val() === '3') {
                var objIdvlMetaData = metaDataValidation["cust_home_no"];
                var dispName = objIdvlMetaData.DISPLAY_NAME;
                var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
                var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
                var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                var testval = $('#' + target).val();
                var regExp = eval(ALLOWED_VALUES);
                var targetVal = $('#' + target).val().trim();
                if (targetVal.length > 0) {
                    if (!regExp.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(dispName + ' should be valid.')
                        return false;
                    } else {

                    }
                }

                if (!(MIN_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
                if (!(MAX_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
            }

        } else if ( target == "email") {  //target == "bill_email" ||

            var objIdvlMetaData = metaDataValidation[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;

            if ($('#' + target).val().length > 0) {
                try {
//                   if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//
//                    }
//                    else {
//                        var regExp1 = eval(ALLOWED_VALUES);
                    var targetVal = $('#' + target).val();
                    if (targetVal.length > 0) {
                        var zeroindx = targetVal.substr(0, 1);
                        if (numberReg.test(zeroindx)) {
                            $('#' + target).val('');
                            $('#' + target).focus();
                            alert(dispName + ' first letter should not be number.')
                            return false;
                        } else {
                            if (!emailValidation(targetVal)) {
                                $('#' + target).val('');
                                $('#' + target).focus();
                                alert(dispName + ' should be valid.')
                                return false;
                            } else {
                            }
                        }
                    }
                } catch (e) {
//                    alert(e);
                }

            } else {
                alert("Please enter " + dispName);
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }


        }
//        else if (target == "f_h_name") {
//            //alert(target);
//            var objIdvlMetaData = metaDataValidation[target];
//            var dispName = objIdvlMetaData.DISPLAY_NAME;
//            var MANDATORY = objIdvlMetaData.MANDATORY;
//            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
//            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
//            var TYPE = objIdvlMetaData.TYPE;
//            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//
//            if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//
//            } else {
//                ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                var regExp = eval(ALLOWED_VALUES);
//                var targetVal = $('#' + target).val();
//                if (targetVal.length > 0) {
//                    if (!regExp.test(targetVal)) {
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        newFormMem.alert(dispName + ' should be valid.')
//                        return false;
//                    } else {
//
//                    }
//                }
//            }
//            if (!(MIN_LENGTH == 'NA')) {
//                if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
//                    newFormMem.alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
//                    $('#' + target).focus();
//                    return false;
//                } else {
//
//                }
//            }
//            if (!(MAX_LENGTH == 'NA')) {
//                if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
//                    newFormMem.alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
//                    $('#' + target).focus();
//                    return false;
//                } else {
//
//                }
//            }
//        } else if (target == "first_name") {
//            //alert(target);
//            var objIdvlMetaData = metaDataValidation[target];
//            var dispName = objIdvlMetaData.DISPLAY_NAME;
//            var MANDATORY = objIdvlMetaData.MANDATORY;
//            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
//            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
//            var TYPE = objIdvlMetaData.TYPE;
//            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//
//            if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//
//            } else {
//                ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                var regExp = eval(ALLOWED_VALUES);
//                var targetVal = $('#' + target).val();
//                if (targetVal.length > 0) {
//                    if (!regExp.test(targetVal)) {
//                        $('#' + target).val('');
//                        $('#' + target).focus();
//                        newFormMem.alert(dispName + ' should be valid.')
//                        return false;
//                    } else {
//
//                    }
//                }
//            }
//            if (!(MIN_LENGTH == 'NA')) {
//                if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
//                    newFormMem.alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
//                    $('#' + target).focus();
//                    return false;
//                } else {
//
//                }
//            }
//            if (!(MAX_LENGTH == 'NA')) {
//                if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
//                    newFormMem.alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
//                    $('#' + target).focus();
//                    return false;
//                } else {
//
//                }
//            }
//        } 

//        else if (target == "poi_issue_place") {
//            // alert("54321");
//            if ($("#poi_type").val() == '' || $("#poi_type").val() == "0") {
//                alert("Please select Poi Type");
//                $("#poi_issue_place").val('');
//                $("#poi_type").focus();
//                return false;
//            }
//            var objIdvlMetaData = metaDataValidation[target];
//            var dispName = objIdvlMetaData.DISPLAY_NAME;
//            var MANDATORY = objIdvlMetaData.MANDATORY;
//            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
//            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
//            var TYPE = objIdvlMetaData.TYPE;
//            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//            if (TYPE == 'TF') {
//                //alert(target);
//                //alert(ALLOWED_VALUES);
//
//                if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {
//                    var samecheck = $("#poi_same_check").val();
//                    // alert(samecheck);
//                    if (samecheck == "true") {
//                        $('#poa_issue_place').val($('#' + target).val())
//                    }
//                } else {
//                    ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
//                    var regExp = eval(ALLOWED_VALUES);
//                    var targetVal = $('#' + target).val().trim();
//                    if (targetVal.length > 0) {
//                        if (!regExp.test(targetVal)) {
//                            $('#' + target).val('');
//                            $('#' + target).focus();
//                            alert(dispName + ' should be valid.')
//                            return false;
//                        } else {
//                            var samecheck = $("#poi_same_check").val();
//                            if (samecheck == "true") {
//                                $('#poa_number').val($('#' + target).val(''))
//                            }
//                        }
//                    }
//                }
//                if (!(MIN_LENGTH == 'NA')) {
//                    if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
//                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
//                        $('#' + target).focus();
//                        $('#' + target).val("");
//                        return false;
//                    } else {
//
//                    }
//                }
//                if (!(MAX_LENGTH == 'NA')) {
//                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
//                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
//                        $('#' + target).focus();
//                        $('#' + target).val("");
//                        return false;
//                    } else {
//
//                    }
//                }
//            } else if (TYPE == 'DD') {
//                if (!(MANDATORY == 'N')) {
//                    var targetVal = $('#' + target).val();
//                    if (targetVal == '0') {
//                        $('#' + target).focus();
//                        alert(dispName + ' should be mandatory.')
//                        return false;
//                    } else {
//
//                    }
//
//                }
//            }
//        }
        else {
            var objIdvlMetaData = metaDataValidation[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
            if (TYPE == 'TF') {
                //alert(target);
                //alert(ALLOWED_VALUES);
//                if (target === 'poa_issue_place' && (($("#poa_type").val() == '' || $("#poa_type").val() == '0'))) {
//                    alert("Please select POA Type");
//                    $("#poa_issue_place").val('');
//                    $("#poa_type").focus();
//                    return false;
//                }
                if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {

                } else {
                    ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                    var regExp = eval(ALLOWED_VALUES);
                    var targetVal = $('#' + target).val().trim();
                    if (targetVal.length > 0) {
                        if (!regExp.test(targetVal)) {
                            $('#' + target).val('');
                            $('#' + target).focus();
                            alert(dispName + ' should be valid.')
                            return false;
                        } else {

                        }
                    }
                }
                if (!(MIN_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
                if (!(MAX_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val("");
                        return false;
                    } else {

                    }
                }
            } else if (TYPE == 'DD') {
                if (!(MANDATORY == 'N')) {
                    var targetVal = $('#' + target).val();
                    if (targetVal == '0') {
                        $('#' + target).focus();
                        alert(dispName + ' should be mandatory.')
                        return false;
                    } else {

                    }

                }
            }
        }
    } catch (e)
    {
//        alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in  formFieldValidationFMS' + e);
    }


}


function poipoachecking() {

    var poi_issue_place = $('#poi_issue_place').val();
    if (poi_issue_place.length > 0) {
        $('#poi_issue_place').focus().css('border-color', 'green');
    }
    //newFormMem.alert(poi_issue_place);
    $('#poa_issue_place').val(poi_issue_place);
    $('#poa_issue_place').attr('readonly', 'readonly');
}
function poapoidatechecking() {

    var dob = $('#dob').val();

    var poa_issuedate = $('#poi_issue_date').val();

    if (dob == 'DD/MM/YYYY') {
        $('#poi_issue_date').val('');
        alert(("kyc.formfields.dob"));
    } else {
        var cmp = DateComparsionEkyc(dob, poa_issuedate);
        if (DateComparsionEkyc(dob, poa_issuedate)) {
//            $("#poa_issue_date").val(poa_issuedate);
        } else {
            $('#poi_issue_date').val('');
            alert(("kyc.formfields.invaliddate"));
        }
    }

}
$('#poiDateNotFnd').change(function () {
    if ($(this).is(":checked")) {
//'checked' event code
        $('#poi_issue_date').val('01/01/1900').attr('readonly', 'readonly');
        $('#poa_issue_date').val('01/01/1900');
        $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
    } else {
        $('#poi_issue_date').val('');
        $('#poa_issue_date').val('');
        $('#poaDateNotFnd').prop('checked', false);
        $('#poiDateNotFnd').prop('checked', false);
        $('#poi_issue_date').removeAttr('readonly');
    }
});
//Exception getting data from receipt

function DateComparsionEkyc(dob, poi) {

//    if (poi === '01-01-1900')
//    {
//        return true;
//    }
    var dob_parts = dob.split("/");
    var poi_parts = poi.split("/");
    /*Year comparasion 
     *Dob year should be grater than seleted Issued year
     *
     *Dob month should not excced Issued month (if DOB month is 3rd month than we ara allowed 4th month onwords...),same as date
     *
     */
    if (dob_parts[2] > poi_parts[2]) {
        return false; //not allowed
    } else if (dob_parts[2] == poi_parts[2]) {
        if (dob_parts[1] < poi_parts[1]) {
            return true; // alowed

        } else if (dob_parts[1] == poi_parts[1]) {
            if (dob_parts[0] < poi_parts[0]) {
                return true; // alowed
            } else if (dob_parts[0] == poi_parts[0]) {
                return false; ///not allowed
            } else {
                return false; //not allowed
            }

        } else {
            return false; ///not allowed
        }
    } else {
        return true; //allowed
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

function altContact(numeric) {
    if (!alternateContactReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}
function faxnumber(numeric) {
    if (!faxNotReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

function Numeric(numeric) {
    if (!numberReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

function emailValidation(email) {
    if (emailReg.test(email))
    {
        return true;
    } else {

        return false;

    }


}

function unclicksameadress() {
    if (document.getElementById('addr_same_check').checked) {

        document.getElementById('addr_same_check').checked = false;
        checksameValues();

    }

}

function formFranchiseValidationFms(event) {
    var target = event.getAttribute('id');
//    utilsObj.writeLog('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::starting of formFranchiseValidation');
    try {
        var objIdvlMetaData = metaDataValidation[target];
        var dispName = objIdvlMetaData.DISPLAY_NAME;
        var MANDATORY = objIdvlMetaData.MANDATORY;
        var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
        var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
        var TYPE = objIdvlMetaData.TYPE;
        var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
        if (TYPE == 'TF') {

            if ((ALLOWED_VALUES == 'NA') || (ALLOWED_VALUES == 'ALL')) {

            } else {
                ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
                var regExp = eval(ALLOWED_VALUES);
                var targetVal = $('#' + target).val().trim();
                if (targetVal.length > 0) {
                    if (!regExp.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(dispName + ' should be valid.');
                        return false;
                    } else {

                    }
                }
            }
            if (!(MIN_LENGTH == 'NA')) {
                if ((targetVal.length) * 1 < MIN_LENGTH * 1) {
                    alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters');
                    $('#' + target).focus();
                    $('#' + target).val("");
                    return false;
                } else {

                }
            }
            if (!(MAX_LENGTH == 'NA')) {
                if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                    alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters');
                    $('#' + target).focus();
                    $('#' + target).val("");
                    return false;
                } else {

                }
            }
        } else if (TYPE == 'DD') {
            if (!(MANDATORY == 'N')) {
                var targetVal = $('#' + target).val();
                if (targetVal == '0') {
                    $('#' + target).focus();
                    alert(dispName + ' should be mandatory.');
                    return false;
                } else {

                }

            }
        }
    } catch (e) {
//        utilsObj.writeLog('JS Log(FMS_ekyc_Validation.js):::exception in formFranchiseValidation' + e);
    }
//    utilsObj.writeLog('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::endingf of formFranchiseValidation');
}