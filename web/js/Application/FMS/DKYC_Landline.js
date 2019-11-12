/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fetchWingsLLNosobj = {};
var objWingsLLPlans = {};
var WingsLLNoDataArry = [];
var gridDataSourceLL;

function mask() {
    try {
        $('#wait').show();
    } catch (e) {
    }
}

function unMask() {
    try {
        $('#wait').hide();
    } catch (e) {
    }
}

function goToLLDocs() {
    mask();
    var reqData = dkyclogDtls;
    var application_type = $('#ddlApplicationType').find("option:selected").val();
    var application_type_ecaf = $('#ddlApplicationType').find("option:selected").text();
    reqData.ONBOARD_BY = application_type;
    reqData.ONBOARD_BY_ecaf = application_type_ecaf;
    reqData.WINGS_CSC_CODE = '';
    reqData.WINGS_FR_RET_CODE = '';
    reqData.ftth_ont_type = '';
    reqData.ftth_ont_type_ecaf = '';
    reqData.ftth_ont_acq_type = '';
    reqData.ftth_ont_acq_type_ecaf = '';
    reqData.no_of_bb_cons = '';
    reqData.no_of_voice_cons = '';
    reqData.bb_req_yes = '';
    reqData.bb_req_yes_ecaf = '';
    reqData.bb_only = '';
    reqData.bb_only_ecaf = '';
    reqData.service_type_cmb = '';
    reqData.service_type = '';
    reqData.service_type_ecaf = '';
    reqData.connection_type = '';
    reqData.connection_type_ecaf = '';
    reqData.modem_type = '';
    reqData.modem_acq_type = '';
    reqData.clip_type = '';
    reqData.clip_type_ecaf = '';
    reqData.modem_type_ecaf = '';
    reqData.modem_acq_type_ecaf = '';

    if (application_type == '1') {
        var csccode = $('#csc_code').val();
        if (csccode.trim() == "") {
            unMask();
            alert(dkycSelfNum);
            $('#csc_code').focus();
            return false;
        }
        reqData.WINGS_CSC_CODE = csccode;
    } else if (application_type == '2') {
        var francode = $('#franch_code').val();
        if (francode.trim() == "") {
            unMask();
            alert(dkycSelfCTOPUP);
            $('#franch_code').focus();
            return false;
        }
        reqData.WINGS_FR_RET_CODE = francode;
    }
    var service_type = $('#ddlServiceType').find("option:selected").val();
    var service_type_ecaf = $('#ddlServiceType').find("option:selected").text();
    if (service_type == '0') {
        unMask();
        alert(dkycSelfServiceType);
        $('#ddlServiceType').focus();
        return false;
    }
    reqData.service_type_cmb = service_type;
    reqData.service_type = service_type;
    reqData.service_type_ecaf = service_type_ecaf;
    if (service_type == '2') {
        var bb_con_no = $('#bb_con_no').val();
        if (bb_con_no.trim() == "") {
            unMask();
            alert(dkycSelfBBConnection);
            $('#bb_con_no').focus();
            return false;
        }
        var voc_con_no = $('#voc_con_no').val();
        if (voc_con_no.trim() == "") {
            unMask();
            alert(dkycSelfVoiceConn);
            $('#voc_con_no').focus();
            return false;
        }
        var bb_acquisition_type = $('#modem_acq_type').find("option:selected").val();
        var bb_acquisition_type_ecaf = $('#modem_acq_type').find("option:selected").text();
        if (bb_acquisition_type == '0') {
            unMask();
            alert(dkycSelfBFAccAcqType);
            $('#bb_acquisition_type').focus();
            return false;
        }
        reqData.ftth_ont_acq_type = bb_acquisition_type;
        reqData.ftth_ont_acq_type_ecaf = bb_acquisition_type_ecaf;
//        reqData.modem_acq_type = bb_acquisition_type;
//        reqData.modem_acq_type_ecaf = bb_acquisition_type_ecaf;
        if (voc_con_no == '1') {
            var ftth_ont_type = $('#ftth_ont_type').find("option:selected").val();
            var ftth_ont_type_ecaf = $('#ftth_ont_type').find("option:selected").text();
            if (ftth_ont_type == '0') {
                unMask();
                alert(dkycSelfOnTType);
                $('#ftth_ont_type').focus();
                return false;
            }
            var ftth_ont_acq_type = $('#ftth_ont_acq_type').find("option:selected").val();
            var ftth_ont_acq_type_ecaf = $('#ftth_ont_acq_type').find("option:selected").text();
            if (ftth_ont_acq_type == 0) {
                unMask();
                alert(dkycSelfOnTAqyType);
                $('#ftth_ont_acq_type').focus();
                return false;
            }

            reqData.ftth_ont_type = ftth_ont_type;
            reqData.ftth_ont_type_ecaf = ftth_ont_type_ecaf;
            reqData.clip_type = ftth_ont_acq_type_ecaf;
            reqData.clip_type_ecaf = ftth_ont_acq_type_ecaf;
//            reqData.ftth_ont_acq_type = ftth_ont_acq_type;
//            reqData.ftth_ont_acq_type_ecaf = ftth_ont_acq_type_ecaf;
        }
        //reqData.ftth_ont_type = ftth_ont_type;
        //reqData.ftth_ont_type_ecaf = ftth_ont_type_ecaf;
        reqData.no_of_bb_cons = bb_con_no;
        reqData.no_of_voice_cons = voc_con_no;
    } else if (service_type == '4') {
        var bb_con_no = $('#bb_con_v').val();
        if (bb_con_no.trim() == "") {
            unMask();
            alert(dkycSelfBBConnection);
            $('#bb_con_v').focus();
            return false;
        }
        var voc_con_no = $('#voc_con_v').val();
        if (voc_con_no.trim() == "") {
            unMask();
            alert(dkycSelfVoiceConn);
            $('#voc_con_v').focus();
            return false;
        }
        if (bb_con_no == '1' || bb_con_no == '0') {
            var bb_acquisition_type = $('#modem_acq_type').find("option:selected").val();
            var bb_acquisition_type_ecaf = $('#modem_acq_type').find("option:selected").text();
            if (bb_acquisition_type == '0') {
                unMask();
                alert(dkycSelfBFAccAcqType);
                $('#bb_acquisition_type').focus();
                return false;
            }
//            reqData.modem_acq_type = bb_acquisition_type;
//            reqData.modem_acq_type_ecaf = bb_acquisition_type_ecaf;
            reqData.ftth_ont_acq_type = bb_acquisition_type_ecaf;
            reqData.ftth_ont_acq_type_ecaf = bb_acquisition_type_ecaf;
        }
        var ftth_ont_type = $('#ftth_ont_type').find("option:selected").val();
        var ftth_ont_type_ecaf = $('#ftth_ont_type').find("option:selected").text();
        if (ftth_ont_type == '0') {
            unMask();
            alert(dkycSelfOnTType);
            $('#ftth_ont_type').focus();
            return false;
        }
        var ftth_ont_acq_type = $('#ftth_ont_acq_type').find("option:selected").val();
        var ftth_ont_acq_type_ecaf = $('#ftth_ont_acq_type').find("option:selected").text();
        if (ftth_ont_acq_type == 0) {
            unMask();
            alert(dkycSelfOnTAqyType);
            $('#ftth_ont_acq_type').focus();
            return false;
        }

        reqData.ftth_ont_type = ftth_ont_type;
        reqData.ftth_ont_type_ecaf = ftth_ont_type_ecaf;
//        reqData.ftth_ont_acq_type = ftth_ont_acq_type;
//        reqData.ftth_ont_acq_type_ecaf = ftth_ont_acq_type_ecaf;
        reqData.clip_type = ftth_ont_acq_type_ecaf;
        reqData.clip_type_ecaf = ftth_ont_acq_type_ecaf;
        reqData.no_of_bb_cons = bb_con_no;
        reqData.no_of_voice_cons = voc_con_no;
    } else if (service_type == '1') { //LandLine

        var broadbandonly = $('#ddlBroadbandonly').find("option:selected").val();
        var broadbandonlyeCaf = $('#ddlBroadbandonly').find("option:selected").text();
        if (broadbandonly == '0') {
            unMask();
            alert(dkycSelfBBtype);
            $('#ddlBroadbandonly').focus();
            return false;
        }
        reqData.bb_only = broadbandonly;
        reqData.bb_only_ecaf = broadbandonlyeCaf;
        var bb_req_yes = $('#bb_req_yes').find("option:selected").val();
        var bb_req_yes_ecaf = $('#bb_req_yes').find("option:selected").text();
        if (bb_req_yes == '0') {
            unMask();
            alert(dkycSelfBBRequired);
            $('#bb_req_yes').focus();
            return false;
        }
        if (bb_req_yes == '1') {

            var bb_con_type = $('#bb_con_type').find("option:selected").val();
            var bb_con_type_ecaf = $('#bb_con_type').find("option:selected").text();
            if (bb_con_type == '0') {
                unMask();
                alert(dkycSelfBBConnType);
                $('#bb_con_type').focus();
                return false;
            }

            var bb_modem_type = $('#bb_modem_type').find("option:selected").val();
            var bb_modem_type_ecaf = $('#bb_modem_type').find("option:selected").text();
            if (bb_modem_type == '0') {
                unMask();
                alert(dkycSelfBBModemType);
                $('#bb_modem_type').focus();
                return false;
            }
            var bb_acquisition_type = $('#bb_acquisition_type').find("option:selected").val();
            var bb_acquisition_type_ecaf = $('#bb_acquisition_type').find("option:selected").text();
            if (bb_acquisition_type == '0') {
                unMask();
                alert(dkycSelfBBAcquisitionType);
                $('#bb_acquisition_type').focus();
                return false;
            }

            reqData.connection_type = bb_con_type;
            reqData.connection_type_ecaf = bb_con_type_ecaf;
            reqData.modem_type = bb_modem_type;
            reqData.modem_type_ecaf = bb_modem_type_ecaf;
            reqData.modem_acq_type = bb_acquisition_type;
            reqData.modem_acq_type_ecaf = bb_acquisition_type_ecaf;



        }
        if (bb_req_yes == '2' || broadbandonly == '2') {
            var clip_type = $('#bb_access_acq_type').find("option:selected").val();
            var clip_type_ecaf = $('#bb_access_acq_type').find("option:selected").text();
            if (clip_type == '0') {
                unMask();
                alert(dkycAccAcqType);
                $('#bb_access_acq_type').focus();
                return false;
            }
        }
        reqData.bb_req_yes = bb_req_yes;
        reqData.bb_req_yes_ecaf = bb_req_yes_ecaf;
        reqData.clip_type = clip_type;
        reqData.clip_type_ecaf = clip_type_ecaf;

    }
    
    reqData.comments = service_type_ecaf;
    var form = document.createElement("form");
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqData));
    inputField.value = strData;
    form.setAttribute("action", "nxtToDKYCLLDocs.do");
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();


}

function goToHome() {
    $('#cancelConf').modal('show');
}
function goBackToLLForm() {
    mask();
    var reqData = llDKYCJobupload;
    var form = document.createElement("form");
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqData));
    inputField.value = strData;
    form.setAttribute("action", "editDKYCLLJob.do");
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();
    
   
}



function confCancel() {
    window.location.href = 'Login.do';
}

function validateDKYCLLCafNxt() {
    mask();
    debugger;
    try {
        var objCustData = dkycDocData;
            metaDataValidationDKYC.dob = {"NAME": "dob", "DISPLAY_NAME": "Date Of Birth(DD/MM/YYYY)","MANDATORY": "N","VISIBLE": "Y","MIN_LENGTH": "1","MAX_LENGTH": "NA","FIELD_ORDER": "36","GROUP_ORDER": "1","READONLY": "N","DATE_CLASS": "form-control","ALLOWED_VALUES": "DATE","TYPE": "DT","ZONE_DOC": "","PAGE_NO": "","FORM_GROUP": "Customer details"};
            metaDataValidationDKYC.age = {"NAME": "age","DISPLAY_NAME": "Age","MANDATORY": "N","VISIBLE": "Y","MIN_LENGTH": "1","MAX_LENGTH": "NA","FIELD_ORDER": "37","GROUP_ORDER": "1","READONLY": "N","ALLOWED_VALUES": "NUMERIC","TYPE": "TF","ZONE_DOC": "","PAGE_NO": "","FORM_GROUP": "Customer details"};
        //objCustData.DKYC_LL_FORM_INFO = ;
        for (var j in metaDataValidationDKYC) {
            try {
                var target = j;
                var objIdvlMetaData = metaDataValidationDKYC[j];
                var dispName = objIdvlMetaData.DISPLAY_NAME;
                var MANDATORY = objIdvlMetaData.MANDATORY;
                var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
                var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
                var TYPE = objIdvlMetaData.TYPE;
                var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES.toString();
                if (target == "gender") {
                    if (!(MANDATORY == 'N')) {
                        if (document.getElementsByName('gender')[0].checked) {
                            objCustData[target] = '2';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'male';
                        } else if (document.getElementsByName('gender')[1].checked) {
                            objCustData[target] = '1';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'female';
                        } else if (document.getElementsByName('gender')[2].checked) {
                            objCustData[target] = '3';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'others';
                        } else {
                            $('#' + target).focus().css('border-color', 'red');
                            alert(dispName + '  should be mandatory.')
                            try {
                                unMask();
                            } catch (e) {
                            }
                            return false;
                        }

                    } else {

                        if (document.getElementsByName('gender')[0].checked) {
                            objCustData[target] = '2';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'male';
                        } else if (document.getElementsByName('gender')[1].checked) {
                            objCustData[target] = '1';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'female';
                        } else if (document.getElementsByName('gender')[2].checked) {
                            objCustData[target] = '3';
                            var idval = target + "_ecaf";
                            objCustData[idval] = 'others';
                        }

                    }
                } else if (target == "cust_home_no") {

                    try {
                        var targetVal = $('#cust_pref_comm').val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal == '0') {
                                $('#' + target).focus().css('border-color', 'red');
                                unMask();
                                alert(dispName + '  should be mandatory.');
                                return false;
                            } else if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWinghomephone)
                                    return false;
                                } else {
                                    objCustData["cust_home_no"] = targetv;
                                    $('#' + target).focus().css('border-color', 'green');
                                }

                            } else {

                                objCustData["cust_home_no"] = "";
                            }
                        } else {
                            if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWinghomephone);
                                    return false;
                                } else {
                                    objCustData["cust_home_no"] = targetv;
                                    $('#' + target).focus().css('border-color', 'green');
                                }

                            } else {

                                objCustData["cust_home_no"] = "";
                            }

                        }

                    } catch (e) {
                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);

                    }

                } else if (target == "cust_work_no") {

                    try {
                        var targetVal = $('#cust_pref_comm').val();

                        if (!(MANDATORY == 'N')) {

                            if (targetVal == '0') {
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + '  should be mandatory.')
                                return false;
                            } else if (targetVal == '4') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#' + target).val('');
                                    $('#' + target).focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWingworkphone);
                                    return false;
                                } else {

                                    objCustData["cust_work_no"] = targetv;

                                }

                            } else {

                                objCustData["cust_work_no"] = "";
                            }

                        } else {
                            if (targetVal == '4') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWingworkphone);
                                    return false;
                                } else {
                                    objCustData["cust_work_no"] = targetv;
                                    $('#' + target).focus().css('border-color', 'green');
                                }

                            } else {

                                objCustData["cust_work_no"] = "";
                            }

                        }

                    } catch (e) {
                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);

                    }

                } else if (target == "fax_no") {

                    try {
                        var targetVal = $('#cust_pref_comm').val();
                        if (!(MANDATORY == 'N')) {

                            if (targetVal == '0') {
                                $('#' + target).focus().css('border-color', 'red');
                                unMask();
                                alert(dispName + ' should be mandatory.');
                                return false;
                            } else if (targetVal == '6') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#' + target).val('');
                                    $('#' + target).focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWingfax);
                                    return false;
                                } else {

                                    objCustData["fax_no"] = targetv;

                                }

                            } else {

                                objCustData["fax_no"] = "";
                            }

                        } else {
                            if (targetVal == '6') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    unMask();
                                    alert(dkycfWingfax);
                                    return false;
                                } else {
                                    objCustData["fax_no"] = targetv;
                                    $('#' + target).focus().css('border-color', 'green');
                                }

                            } else {

                                objCustData["fax_no"] = "";
                            }

                        }

                    } catch (e) {
                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);

                    }

                } else if (target == "cust_pref_comm") {
                    try {
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal == '0') {
                                $('#' + target).focus().css('border-color', 'red');
                                unMask();
                                alert(dispName + '  should be mandatory.');
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                objCustData[idval] = $('#' + target + '  option:selected').text();
                            }
                        } else {
                            objCustData[target] = targetVal;
                            var idval = target + "_ecaf";
                            objCustData[idval] = $('#' + target + '  option:selected').text();
                        }

                    } catch (e) {
                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);

                    }
                } else {
                    if (TYPE == 'TF' || TYPE == 'DT') {
                        var targetVal = $('#' + target).val().trim();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal.length == '0') {
                                if (target == 'poa_number' || target == 'poa_issue_date' || target == 'poa_issue_place' && dkycDocData.POI_POA_SAME) {
                                    continue;
                                }
                                $('#' + target).focus().css('border-color', 'red');
                                unMask();
                                alert(dispName + ' should be mandatory.');
                                $('#' + target).val('');
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                        }
                    } else if (TYPE === 'DD') {
                        var targetVal = $('#' + target).val().trim();
                        if (!(MANDATORY == 'N')) {

                            if (targetVal === '0' || targetVal === 'null' || targetVal === null) {
                                if (target == 'poa_issuing_auth' && dkycDocData.POI_POA_SAME) {
                                    continue;
                                }
                                $('#' + target).focus().css('border-color', 'red');
                                unMask();
                                alert(dispName + '  should be mandatory.');
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                objCustData[idval] = $('#' + target + ' option:selected').text();
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                            var idval = target + "_ecaf";
                            objCustData[idval] = $('#' + target + ' option:selected').text();
                        }
                        var CustType = $('#cust_usage_code').find("option:selected").val();
                        if (CustType == 0) {
                            unMask();
                            alert(dkycfWingusercode);
                            $('#cust_usage_code').focus().css('border-color', 'red');
                            return false;
                        }
                    } else if (TYPE == 'RB') {

                    } else if (TYPE == 'CB') {
                        if (document.getElementById(target).checked) {
                            objCustData[target] = "true";
                        } else {
                            objCustData[target] = "false";
                        }
                    }
                }
            } catch (e) {}

        }

        if ($('#bill_media').val() == '1') {
            if ($('#bill_email').val().trim() == '') {
                unMask();
                alert(dkycSelfLandlineEmail);
                $('#bill_email').focus();
                return false;
            }
        }
        objCustData.STD_CODE = $('#std_code').val();
        objCustData.customer_type_ecaf = 'Individual';
        objCustData.PIN_CODE = $('#INSTAL_ADDR_PINCODE').val();
        objCustData.nominee_value = '';
        objCustData.nominee_value = '';
        objCustData.nominee_type = '';
        objCustData.nominee_type_ecaf = '';
        objCustData.nationality = 'Indian';
        objCustData.nationality_ecaf = 'Indian';
        objCustData.instal_chkif_same = $('#addr_same_check').is(':checked');
        if (dkycDocData.POI_POA_SAME) {
            objCustData.poa_type = $('#poa_type').find("option:selected").val();
            objCustData.poa_issuing_auth = $('#poi_issuing_auth').find("option:selected").val();
            objCustData.poa_type_ecaf = $('#poa_type').find("option:selected").text();
            objCustData.poa_issuing_auth_ecaf = $('#poi_issuing_auth').find("option:selected").text();
            objCustData.poa_issue_place = $('#poi_issue_place').val();
            objCustData.poa_issue_date = $('#poi_issue_date').val();
            objCustData.poa_number = $('#poi_number').val();
        }
        objCustData.payment_type = '1';
        objCustData.payment_type_ecaf = 'Cash';
        objCustData.CATEGORY = $('#inst_category').val();
        var dkycFullData = objCustData;
        var reqData = dkycFullData;
        document.uploadCafDKycForm.method = "post";
        document.uploadCafDKycForm.action = "dkycLLFormData.do";
        document.uploadCafDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
        document.uploadCafDKycForm.submit();

    } catch (e) {
    }
}

function nextToLLPLan() {
    mask();
    var reqData = landlineDKYCJob;
    var SEL_MOB_NO = $('#WINGS_LL_NO').val();
    reqData.sel_mob_no = SEL_MOB_NO;
    var form = document.createElement("form");
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqData));
    inputField.value = strData;
    form.setAttribute("action", "nxtToDKYCLLPlan.do");
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();


}

function nxtToConfDKYCLL(obj) {
    mask();
    var target = obj.getAttribute('id');
    var id=target+'_dtls';
    var plan_name = $("#" + id).attr('plan_name');
    var plan_amount = $("#" + id).attr('plan_amount');
    var reqData = llDKYCJobfullData;
    reqData.PLAN_ID = target;
    reqData.PLAN_NAME = plan_name;
    reqData.PLAN_AMOUNT =plan_amount ;
    var form = document.createElement("form");
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqData));
    inputField.value = strData;
    form.setAttribute("action", "nxtToDKYCLLPreview.do");
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();

}

function setPreviewData() {
    mask();
    try {
        if (llDKYCJobupload != '{}') {
            llDKYCJobupload = JSON.parse(llDKYCJobupload);
        }
        for (var key in llDKYCJobupload) {
            $('#' + key).text((llDKYCJobupload[key] == "")?"N/A" :llDKYCJobupload[key]);
        }
        if (llDKYCJobupload.service_type_ecaf.toUpperCase() == 'LANDLINE') {
            $('#conn_dtls_hide').show();
        }
        unMask();
    } catch (e) {
        unMask();
    }

}

function setLLReceiptData() {
    mask();
    try {
        for (var key in llReceiptReqInfo) {
            $('#' + key).text(llReceiptReqInfo[key]);
        }
        for (var key in llReceiptRespData) {
            $('#' + key).text(llReceiptRespData[key]);
        }
        unMask();
    } catch (e) {
        unMask();
    }
}

function saveDKYCLLJob() {
    $('#CusDec').hide();
    mask();
    var reqData = llDKYCJobupload;
    var form = document.createElement("form");
    var inputField = document.createElement("input");
    inputField.name = "reqData";
    inputField.setAttribute("type", "hidden");
    var strData = encrypt(JSON.stringify(reqData));
    inputField.value = strData;
    form.setAttribute("action", "saveDKYCLLJob.do");
    form.setAttribute("method", "POST");
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();

}

function chooseLLNmubers() {
    var reqData = {};
    reqData.SEARCH_PATTERN = "";
    reqData.SEARCH_VAL = "";
    var serchOperator = $('#searchoperator').find("option:selected").val();
    if (serchOperator.trim() != "") {
        reqData.SEARCH_PATTERN = serchOperator;
        var wingsLL_srch_val = $('#wingsLL_srch_num').val();
        if (wingsLL_srch_val.trim() == "") {
            alert(dkycSelfNumSearchType);
            return false;
        }
        reqData.SEARCH_VAL = wingsLL_srch_val;
    }
    $('#wait_ftcNum').show();
    reqData.SERVICE_TYPE = landlineDKYCJob.service_type_ecaf.toUpperCase();
    reqData.SERVICE_TYPE_ID = landlineDKYCJob.service_type;
    reqData.BROADBAND_REQ = landlineDKYCJob.bb_req_yes_ecaf;
    reqData.EXCHANGE_CODE = landlineDKYCJob.inst_exchange_code;
    reqData.STD_CODE = landlineDKYCJob.STD_CODE;
    mask();
    $.ajax({
        url: 'loadWingsLLNos.do', //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait_ftcNum').hide();
            unMask();
            fetchWingsLLNosobj = {};
            if (data.response.success) {
                fetchWingsLLNosobj = data.response.responseData;
                WingsLLNoDataArry = fetchWingsLLNosobj.LL_NOS;
                try {
                    $('#wingsLLgrid').remove();
                } catch (e) {
                    alert(e);
                }
                $('#wng_num').append('<div id="wingsLLgrid"></div>');
                loadWingsLLNumbersGrid();
            } else {
//                alert(loadLLNumbsfail);
                alert(data.response.message);
            }
        }, error: function (data) {
            $('#wait_ftcNum').hide();
            unMask();
            alert("error:" + fetchWingsLLNosobj.response.responseData.message);
        }
    });

}

function loadWingsLLNumbersGrid() {
    gridDataSourceLL = new kendo.data.DataSource({
        data: WingsLLNoDataArry,
        pageSize: 5,
        batch: true,
        cache: false,

        schema: {
            model: {
                id: "ProductID",
                fields: {

                    LLNO: {
                        type: "string"
                    }
                }
            }
        }
    });

    $("#wingsLLgrid").kendoGrid({
        dataSource: gridDataSourceLL,
        sortable: true,
        reorderable: true,
        groupable: false,
        resizable: true,
        filterable: true,
        columnMenu: true,
        pageable: true,
        scrollable: true,
        noRecords: true,
        cache: false,

        height: 340,

        columns: [
            {template: "<input type='checkbox' onclick='selectRowLL(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
            {
                field: "LLNO",
                title: "Landline no."
            }
        ]
    });

}

function selectRowLL(e) {

    try {
        checked = $(e).is(':checked');
        var row = $(e).closest("tr");
        var grid = $("#wingsLLgrid").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        var value = dataItem.LLNO;
        $('#WINGS_LL_NO').val(value);
        $("input.row-checkbox", "#wingsLLgrid").prop("checked", false);
        $(e).prop("checked", checked);
    } catch (e) {
        checkedBooelan = 'false';
    }

}

function reserveLLNmubers() {
    var reqData = {};
    if (checked) {
        var SEL_MOB_NO = $('#WINGS_LL_NO').val();
        reqData.SERVICE_TYPE = landlineDKYCJob.service_type_ecaf;
        reqData.EXCHANGE_CODE = landlineDKYCJob.inst_exchange_code;
        reqData.SERVICE_TYPE_ID = landlineDKYCJob.service_type;
        reqData.BROADBAND_REQ = landlineDKYCJob.bb_req_yes_ecaf;
        reqData.BB_FLAG = "";
        reqData.SERVICE_SUBTYPE = "";
        reqData.LL_NO = SEL_MOB_NO;
        reqData.sel_mob_no = SEL_MOB_NO;
        mask();
        $.ajax({
            url: 'reserveWingsLLNos.do',
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                unMask();
                rserveWingsLLNosobj = {};
                if (data.response.success) {
                    rserveWingsLLNosobj = data.response.responseData;
                    landlineDKYCJob.RESERVE_RESP = rserveWingsLLNosobj;
                    nextToLLPLan();
                } else {
                    alert(unableToResrvNum);
                }
            }, error: function (data) {
                unMask();
                var objFetch = JSON.stringify(data);
                objFetch = JSON.parse(objFetch);
                alert("error:" + objFetch.response.responseData.message);
            }
        });

    } else {
        alert(dkycSelfNumReseve);
        return false;
    }




}

function loadLLPlans() {
    var reqData = {}
    reqData.JOB_SOURCE = 'S';
    reqData.SERVICE_TYPE_ID = llDKYCJobfullData.service_type;
    reqData.SERVICE_TYPE = llDKYCJobfullData.service_type_ecaf;
    reqData.BROADBAND_REQ = llDKYCJobfullData.bb_req_yes_ecaf == '' ? 'NO' : llDKYCJobfullData.bb_req_yes_ecaf;
    reqData.BB_ONLY = llDKYCJobfullData.bb_only_ecaf == '' ? 'NO' : llDKYCJobfullData.bb_only_ecaf;
    reqData.CATEGORY = llDKYCJobfullData.CATEGORY;
    reqData.STD_CODE = llDKYCJobfullData.STD_CODE;
    reqData.NO_OF_BB_CONS = llDKYCJobfullData.no_of_bb_cons;
    reqData.NO_OF_VOICE_CONS = llDKYCJobfullData.no_of_voice_cons;
    mask();
    $.ajax({
        url: 'loadWingsLLPlans.do', //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            unMask();
            if (data.response.success) {
                objWingsLLPlans = data.response.responseData;
                planArr = objWingsLLPlans.LL_PLANS;
                loadLLPlanDiv();
            } else {
                alert("Unable to load plans at this time please try again after some time.");
                window.location.href = 'Login.do';
            }
        }, error: function (data) {
            unMask();
            alert("error:" + objWingsLLPlans.response.responseData.message);
            window.location.href = 'Login.do';
        }
    });

}

function fetchStatesFrmPin(event) {
    var target = event.getAttribute('id');
    var reqData = {}
    var pin_code = $('#' + target).val();
    if (pin_code.trim() == '') {
        alert(dkycSelfPincodeProceed);
        return false;
    }
    reqData.JOB_SOURCE = 'S_LL';
    reqData.PIN_CODE = pin_code;
    mask();
    $.ajax({
        url: 'loadLLStatesByPin.do', //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            unMask();
            var objWingsLLStates = {};
            var objFetch = JSON.stringify(data);
            objWingsLLStates = JSON.parse(objFetch);
            objWingsLLStates = objWingsLLStates.response.responseData;
            if (objWingsLLStates.STATUS === 0 || objWingsLLStates.STATUS === 2) {
                var statesArrFrmPin = objWingsLLStates.STATES;
                if ('BILL_ADDR_PINCODE' == target.trim()) {
                    $('#bill_addr_state').children().remove();
                    $('#bill_addr_state').append('<option value="0">Select from list</option>');
                    $(statesArrFrmPin).each(function (index) {
                        $('#bill_addr_state').append(new Option(statesArrFrmPin[index].DD_VALUE, statesArrFrmPin[index].DD_CODE));
                    });
                } else {
                    $('#inst_addr_state').children().remove();
                    $('#inst_addr_state').append('<option value="0">Select from list</option>');
                    $(statesArrFrmPin).each(function (index) {
                        $('#inst_addr_state').append(new Option(statesArrFrmPin[index].DD_VALUE, statesArrFrmPin[index].DD_CODE));
                    });
                }
            } else {
                if ('BILL_ADDR_PINCODE' == target.trim()) {
                    $('#bill_addr_state').children().remove();
                } else {
                    $('#inst_addr_state').children().remove();
                }
                alert(dkycSelfPincodeStateNotAvi);
            }
        }, error: function (data) {
            unMask();
            alert("error:" + objWingsLLPlans.response.responseData.message);
            window.location.href = 'Login.do';
        }
    });

}

function loadBillingTypesDkycLL() {


    /* loading billing types loading */
//    try {
//        var reqData = {};
//        reqData.type = "FMSEKYC";
//        $.ajax({
//            url: "billingtypesLoading.do", //parameters go here in object literal form
//            type: 'POST',
//            async: false,
//            data: {"reqData": encrypt(JSON.stringify(reqData))},
//            success: function (data) {
//                var resJson = JSON.parse(JSON.stringify(data));
//                var availablestaesLoading = resJson.response.responseData;
//                var availablebillTypesJOBJ = {};
//                availablebillTypesJOBJ = availablestaesLoading;
//                if (availablebillTypesJOBJ.STATUS === "0") {
//                    var availbillTypearr = availablebillTypesJOBJ.BILLING_TYPES;
//                    $('#bill_acc_type').children().remove();
//                    $('#bill_acc_type').append('<option value="0">Select from list</option>');
//                    $(availbillTypearr).each(function (index) {
//                        $('#bill_acc_type').append(new Option(availbillTypearr[index].DD_VALUE, availbillTypearr[index].DD_CODE));
//                    });
//                }
//            }, error: function (data) {
//                alert("error : billingtypesLoading" + JSON.stringify(data));
//            }
//        });
//
//    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billingtypesLoading for billing types loading:::::" + e);
//    }
    /*inst_addr_stateonchange*/
    $("#inst_addr_state").on('change', function () {
        try {
            //debugger;
            $('#inst_addr_district').children().remove();
            $('#inst_addr_district').append('<option value="0">Select from list</option>');
            $('#inst_main_locality').children().remove();
            $('#inst_main_locality').append('<option value="0">Select from list</option>');
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#inst_addr_state").val();
            var state_ecaf = $("#inst_addr_state").find("option:selected").text();
            var pin_code = $("#INSTAL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            if (state == "0") {
                alert(dkycSelfStateEnter);
                return false;
            } else {
                mask();
                var reqData = {};
                reqData.CIRCLE = state;
                reqData.PIN_CODE = pin_code;
                reqData.type = "FMSDSKYC";
                $.ajax({
                    url: "loadLLDistrics.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        unMask();
                        var resJson = JSON.parse(JSON.stringify(data));
                        var availablestaesLoading = resJson.response.responseData;
                        var availableDistrictssJOBJ = {};
                        availableDistrictssJOBJ = availablestaesLoading;
                        if (availableDistrictssJOBJ.STATUS === 0 || availableDistrictssJOBJ.STATUS === '0') {
                            var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
                            $('#inst_addr_district').children().remove();
                            $('#inst_addr_district').append('<option value="0">Select from list</option>');
                            $(availDistrictsarr).each(function (index) {
                                $('#inst_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
                            });

                        } else {
                            $('#inst_addr_district').val("");
                            alert(availableDistrictssJOBJ.MESSAGE);
                        }

                        $("#inst_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        $("#inst_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }, error: function (data) {
                        unMask();
                        alert("error : uploadForms" + JSON.stringify(data));
                    }
                });
            }

        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
        }
    });
    /*inst_addr_districtonchange*/
    $("#inst_addr_district").on('change', function () {

        try {
            $('#inst_main_locality').children().remove();
            $('#inst_main_locality').append('<option value="0">Select from list</option>');
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#inst_addr_state").val();
            var state_ecaf = $("#inst_addr_state").find("option:selected").text();
            var district = $("#inst_addr_district").val();
           var pin_code = $("#INSTAL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            if (state == "0" || state == null) {
                alert("Please select state from list");
                return false;
            } else if (district == "0" || district == null) {
                alert(dkycSelfDistrictList);
                return false;
            } else {
                mask();
                var reqData = {};
                reqData.state = state_ecaf.toUpperCase();
                reqData.district = district;
                reqData.PIN_CODE = pin_code;
                reqData.type = "FMSEKYC";
                $.ajax({
                    url: "mainlocalityLoading.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        unMask();
                        var resJson = JSON.parse(JSON.stringify(data));
                        var availablestaesLoading = resJson.response.responseData;
                        var availableLoaclJOBJ = {};
                        availableLoaclJOBJ = availablestaesLoading;
                        if (availableLoaclJOBJ.STATUS === "0") {
                            var availloaclarr = availableLoaclJOBJ.MESSAGE;
                            $('#inst_main_locality').children().remove();
                            $('#inst_main_locality').append('<option value="0">Select from list</option>');
                            $(availloaclarr).each(function (index) {
                                $('#inst_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
                            });
                            $("#inst_main_locality").kendoDropDownList({
                                filter: "contains"
                            });
                        }
                        $("#inst_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }, error: function (data) {
                        unMask();
                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                    }
                });
            }

        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
        }
    });
    /*inst_main_localityonchange*/
    $("#inst_main_locality").on('change', function () {
        try {
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            var mainLocality = $('#inst_main_locality').val();
            var state = $("#inst_addr_state").val();
            var state_ecaf = $("#inst_addr_state").find("option:selected").text();
            var district = $("#inst_addr_district").val();
            var pin_code = $("#INSTAL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            var reqData = {};
            mask();
            reqData.mainLocality = mainLocality;
            reqData.state = state_ecaf.toUpperCase();
            reqData.district = district;
            reqData.PIN_CODE = pin_code;
            reqData.type = "FMSEKYC";
            $.ajax({
                url: "sublocalitLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    unMask();
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableSubLocalJOBJ = {};
                    availableSubLocalJOBJ = availablestaesLoading;
                    if (availableSubLocalJOBJ.STATUS === "0") {
                        var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
                        $('#inst_sub_locality').children().remove();
                        $('#inst_sub_locality').append('<option value="0">Select from list</option>');
                        $(availsubloaclarr).each(function (index) {
                            $('#inst_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
                        });
                        $("#inst_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    } else {
                        $('#inst_main_locality').val("");
                    }
                }, error: function (data) {
                    unMask();
                    alert("error : sublocalitLoading" + JSON.stringify(data));
                }
            });

        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in sub localities loading:::::" + e);
        }
    });
    /*inst_sub_localityonchange*/
    $("#inst_sub_locality").on('change', function () {
        try {
            mask();
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#inst_addr_state").val();
            var state_ecaf = $("#inst_addr_state").find("option:selected").text();

            var district = $("#inst_addr_district").val();
            var mainLocality = $('#inst_main_locality').val();

            var subLocality = $('#inst_sub_locality').val();
            var pin_code = $("#INSTAL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }

            var reqData = {};
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.state = state_ecaf.toUpperCase();
            reqData.district = district;
            reqData.PIN_CODE = pin_code;
            if(dkycDocData.service_type_ecaf.toUpperCase() !='LANDLINE'){
            reqData.STD_CODE_CHECK = true;
           }
            reqData.type = "FMSEKYC";
            $.ajax({
                url: "ExchangeCode.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    unMask();
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableexchCodeJOBJ = {};
                    availableexchCodeJOBJ = availablestaesLoading;
                    if(availableexchCodeJOBJ.STATUS === "2"){
                      alert(resJson.response.message); 
                    }
                    else if (availableexchCodeJOBJ.STATUS === "0") {
                        var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
                        $("#EXCHNAGE_DTLS").val(JSON.stringify(availexCodelarr));
                        $('#inst_exchange_code').children().remove();
                        $('#inst_exchange_code').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#inst_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                        });
                        if(dkycDocData.service_type_ecaf.toUpperCase() !='LANDLINE'){
                            $('#std_code').val(availableexchCodeJOBJ.STD_CODE);
                        }else{
                           $('#std_code').val(''); 
                        }
                    } else {
                        $('#inst_sub_locality').val("");
                    }
                }, error: function (data) {
                    unMask();
                    alert("error : exchange codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
        }
    });
    /*inst_exchange_codeonchange*/
    $("#inst_exchange_code").on('change', function () {
        try {
            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
            var availexCodelObj = JSON.parse(availexCodelarr);
            $(availexCodelObj).each(function (index) {
                if ($("#inst_exchange_code").val() == availexCodelObj[index].DD_CODE) {
                    //$('#INSTAL_ADDR_PINCODE').attr("readonly", "readonly");
                    //$('#INSTAL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
                    $('#inst_category').val(availexCodelObj[index].CATEGORY);
                }
            });
        } catch (e) {
        }

        try {
            var mainLocality = $('#inst_main_locality').val();
            if (mainLocality == "0") {
                alert("Please select main locality from list");
                return false;
            }
            var subLocality = $('#inst_sub_locality').val();
            if (subLocality == "0") {
                alert("Please select sub locality from list");
                return false;
            }
            var exchange = $('#inst_exchange_code').val();
            if (exchange == "0") {
                alert("Please select Exchange code from list");
                return false;
            }
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
            var reqData = {};
            //reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.exchange = exchange;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "loadGSTCodesForFMS.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                    var availableGSTLoading = resJson.response.responseData;
                    var availableGSTCodeJOBJ = {};
                    availableGSTCodeJOBJ = availableGSTLoading;
                    if (availableGSTCodeJOBJ.STATUS === "0") {
                        var availexCodelarr = availableGSTCodeJOBJ.GST_CODE_DTLS;
//                        $("#GST_STATE_CODE").val(JSON.stringify(availexCodelarr));
                        $('#INST_GST_STATE_CODE').children().remove();
                        $('#INST_GST_STATE_CODE').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#INST_GST_STATE_CODE').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                        });
                    } else {
                        $('#inst_exchange_code').val("");
                    }
                }, error: function (data) {
                    alert("error : GST codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
        }


    });
    /*bill_addr_stateonchange*/
    $("#bill_addr_state").on('change', function () {
        try {
            $('#bill_addr_district').children().remove();
            $('#bill_addr_district').append('<option value="0">Select from list</option>');
            $('#bill_main_locality').children().remove();
            $('#bill_main_locality').append('<option value="0">Select from list</option>');
            $('#bill_sub_locality').children().remove();
            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#bill_addr_state").val();
            var state_ecaf = $("#bill_addr_state").find("option:selected").text();
            var pin_code = $("#BILL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            if (state == "0") {
                alert(dkycSelfStateList);
                return false;
            } else {
                mask();
                var reqData = {};
                reqData.CIRCLE = state;
                reqData.PIN_CODE = pin_code;
                reqData.type = "FMSDSKYC";
                $.ajax({
                    url: "loadLLDistrics.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        unMask();
                        var resJson = JSON.parse(JSON.stringify(data));
                        var availablestaesLoading = resJson.response.responseData;
                        var availableDistrictssJOBJ = {};
                        availableDistrictssJOBJ = availablestaesLoading;
                        if (availableDistrictssJOBJ.STATUS === '0' || availableDistrictssJOBJ.STATUS === 0) {
                            var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
                            $('#bill_addr_district').children().remove();
                            $('#bill_addr_district').append('<option value="0">Select from list</option>');
                            $(availDistrictsarr).each(function (index) {
                                $('#bill_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
                            });

                        } else {
                            $('#bill_addr_district').val("");
                        }
                        $("#bill_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        $("#bill_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }, error: function (data) {
                        unMask();
                        alert("error : billing  district ::loading" + JSON.stringify(data));
                    }
                });
            }
        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::exception  in billing  district ::loading:::" + e);
        }
    });
    /*bill_addr_districtonchange*/
    $("#bill_addr_district").on('change', function () {
        try {
            $('#bill_main_locality').children().remove();
            $('#bill_main_locality').append('<option value="0">Select from list</option>');
            $('#bill_sub_locality').children().remove();
            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#bill_addr_state").val();
            var state_ecaf = $("#bill_addr_state").find("option:selected").text();
            var district = $("#bill_addr_district").val();
            var pin_code = $("#BILL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            if (state == "0" || state == null) {
                alert(dkycSelfStateList);
                return false;
            } else if (district == "0" || district == null) {
                alert(dkycSelfDistrictList);
                return false;
            } else {
                mask();
                var reqData = {};
                reqData.state = state_ecaf.toUpperCase();
                reqData.district = district;
                reqData.PIN_CODE = pin_code;
                reqData.type = "FMSKYC";
                $.ajax({
                    url: "mainlocalityLoading.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        unMask();
                        var resJson = JSON.parse(JSON.stringify(data));
                        var availablestaesLoading = resJson.response.responseData;
                        var availableLoaclJOBJ = {};
                        availableLoaclJOBJ = availablestaesLoading;
                        if (availableLoaclJOBJ.STATUS === "0") {
                            var availloaclarr = availableLoaclJOBJ.MESSAGE;
                            $('#bill_main_locality').children().remove();
                            $('#bill_main_locality').append('<option value="0">Select from list</option>');
                            $(availloaclarr).each(function (index) {
                                $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
                            });
                            $("#bill_main_locality").kendoDropDownList({
                                filter: "contains"
                            });
                        }
                        $("#bill_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }, error: function (data) {
                        unMask();
                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                    }
                });

            }
        } catch (e) {
            unMask();
        }
    });
    /*bill_main_localityonchange*/
    $("#bill_main_locality").on('change', function () {
        try {
            mask();
            var mainLocality = $('#bill_main_locality').val();
            $('#bill_sub_locality').children().remove();
            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#bill_addr_state").val();
            var state_ecaf = $("#bill_addr_state").find("option:selected").text();
            var district = $("#bill_addr_district ").val();
            var pin_code = $("#BILL_ADDR_PINCODE").val();
            if (pin_code.trim() == '') {
                alert(dkycSelfPincodeEnter);
                return false;
            }
            var reqData = {};
            reqData.mainLocality = mainLocality;
            reqData.state = state_ecaf.toUpperCase();
            reqData.district = district;
            reqData.PIN_CODE = pin_code;
            reqData.type = "FMSEKYC";
            $.ajax({
                url: "sublocalitLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    unMask();
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableSubLocalJOBJ = {};
                    availableSubLocalJOBJ = availablestaesLoading;
                    if (availableSubLocalJOBJ.STATUS === "0") {
                        var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
                        $('#bill_sub_locality').children().remove();
                        $('#bill_sub_locality').append('<option value="0">Select from list</option>');
                        $(availsubloaclarr).each(function (index) {
                            $('#bill_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
                        });
                        $("#bill_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    } else {
                        unMask();
                        $('#bill_main_locality').val("");
                    }
                }, error: function (data) {
                    unMask();
                    alert("error :  billing sub localities loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub localities loading:::::" + e);
        }
    });
    /*bill_sub_localityonchange*/
    $("#bill_sub_locality").on('change', function () {
        try {
            mask();
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            var state = $("#bill_addr_state").val();
            var state_ecaf = $("#bill_addr_state").find("option:selected").text();
            var district = $("#bill_addr_district").val();
            var mainLocality = $('#bill_main_locality').val();
            var subLocality = $('#bill_sub_locality').val();
            var reqData = {};
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.state = state_ecaf.toUpperCase();
            reqData.district = district;
            reqData.type = "FMSEKYC";
            $.ajax({
                url: "ExchangeCode.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    unMask();
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableexchCodeJOBJ = {};
                    availableexchCodeJOBJ = availablestaesLoading;
                    if (availableexchCodeJOBJ.STATUS === "0") {
                        var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
                        $("#EXCHNAGE_DTLS").val(JSON.stringify(availexCodelarr))
                        $('#bill_exchange_code').children().remove();
                        $('#bill_exchange_code').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#bill_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                        });
                    } else {
                        $('#bill_sub_locality').val("");
                    }
                }, error: function (data) {
                    unMask();
                    alert("error : billing exchange codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            unMask();
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
        }
    });
    /*bill_exchange_codeonchange*/
    $("#bill_exchange_code").on('change', function () {
        try {
            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
            var availexCodelObj = JSON.parse(availexCodelarr);
            $(availexCodelObj).each(function (index) {
                if ($("#bill_exchange_code").val() === availexCodelObj[index].DD_CODE) {
                    //$('#BILL_ADDR_PINCODE').attr("readonly", "readonly");
                    //$('#BILL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
                    $('#bill_category').val(availexCodelObj[index].CATEGORY);
                }
            });
        } catch (e) {
        }

        try {
            var mainLocality = $('#bill_main_locality').val();
            if (mainLocality == "0") {
                alert("Please select main locality from list");
                return false;
            }
            var subLocality = $('#bill_sub_locality').val();
            if (subLocality == "0") {
                alert("Please select sub locality from list");
                return false;
            }
            var exchange = $('#bill_exchange_code').val();
            if (exchange == "0") {
                alert("Please select Exchange code from list");
                return false;
            }
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
            var reqData = {};
            //reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.exchange = exchange;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "loadGSTCodesForFMS.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                    var availableGSTLoading = resJson.response.responseData;
                    var availableGSTCodeJOBJ = {};
                    availableGSTCodeJOBJ = availableGSTLoading;
                    if (availableGSTCodeJOBJ.STATUS === "0") {
                        var availexCodelarr = availableGSTCodeJOBJ.GST_CODE_DTLS;
//                        $("#GST_STATE_CODE").val(JSON.stringify(availexCodelarr));
                        $('#BILL_GST_STATE_CODE').children().remove();
                        $('#BILL_GST_STATE_CODE').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#BILL_GST_STATE_CODE').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                        });
                    } else {
                        $('#bill_exchange_code').val("");
                    }
                }, error: function (data) {
                    alert("error : GST codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
        }

    });
    /*bill_acc_typeonchange*/
//    $("#bill_acc_type").on('change', function () {
//        try {
//            var billaccType = $('#bill_acc_type').val();
//            $('#bill_acc_sub_type').children().remove();
//            $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
//            if (billaccType == "0") {
//                alert(dkycSelfBillAccType);
//                return false;
//            }
//            var reqData = {};
//            reqData.billAccType = billaccType;
//            reqData.type = "FMSEKYC";
//            $.ajax({
//                url: "fetchbillingSubTypes.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    var resJson = JSON.parse(JSON.stringify(data));
//                    var availablestaesLoading = resJson.response.responseData;
//                    var availbillaccTypeJOBJ = {};
//                    availbillaccTypeJOBJ = availablestaesLoading;
//                    if (availbillaccTypeJOBJ.STATUS === "0") {
//                        var availbillaccTypearr = availbillaccTypeJOBJ.SUB_BILLING_TYPES;
//                        $('#bill_acc_sub_type').children().remove();
//                        $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
//                        $(availbillaccTypearr).each(function (index) {
//                            $('#bill_acc_sub_type').append(new Option(availbillaccTypearr[index].DD_VALUE, availbillaccTypearr[index].DD_CODE));
//                        });
//                    } else {
//                        alert(availbillaccTypeJOBJ.MESSAGE);
//                        $('#bill_acc_type').val("0");
//                    }
//                }, error: function (data) {
//                    alert("error : billing sub types loading" + JSON.stringify(data));
//                }
//            });
//        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub types loading:::::" + e);
//        }
//    });

}

function checkSmeInstaLL() {

    if (document.getElementById('addr_same_check').checked) {

        var inst_addr_hno = $("#inst_addr_hno").val();
        var inst_addr_vill = $("#inst_addr_vill").val();
        var inst_addr_city = $("#inst_addr_city").val();
        var INST_ADDR_PINCODE = $("#INSTAL_ADDR_PINCODE").val();
        var inst_addr_state = $("#inst_addr_state").val();
        var inst_addr_district = $("#inst_addr_district").val();
        var inst_addr_add_dtls = $("#inst_addr_add_dtls").val();
        var inst_addr_landmark = $("#inst_addr_landmark").val();
        if (!(inst_addr_district == 0 || inst_addr_district == null)) {
            var inst_main_locality = $("#inst_main_locality").val();
            var inst_sub_locality = $("#inst_sub_locality").val();
            var inst_exchange_code = $("#inst_exchange_code").val();
            var inst_gst_code = $("#INST_GST_STATE_CODE").val();
        }
        if (inst_addr_hno == '' || inst_addr_vill == '' || inst_addr_add_dtls == '' || inst_addr_city == '' || INST_ADDR_PINCODE == '' || inst_addr_state == 0 || inst_addr_district == 0 || inst_main_locality == 0 || inst_sub_locality == 0 || inst_exchange_code == 0 || inst_gst_code == 0) {
            $('#addr_same_check').prop('checked', false);
            alert(alrtInstFil);
            return false;
        } else {
            mask();
            $("#bill_addr_house_no").val(inst_addr_hno).prop('disabled', true);
            $("#bill_addr_vill").val(inst_addr_vill).prop('disabled', true);
            $("#bill_addr_city").val(inst_addr_city).prop('disabled', true);
            $("#bill_addr_add_dtls").val(inst_addr_add_dtls).prop('disabled', true);
            $("#bill_addr_landmark").val(inst_addr_landmark).prop('disabled', true);
            $("#BILL_ADDR_PINCODE").val(INST_ADDR_PINCODE).trigger('change').prop('disabled', true);
            $("#bill_addr_state").find('option[value="' + $("#inst_addr_state").val() + '"]').prop("selected", true).change();
            $("#bill_addr_state").prop('disabled', true);
            $("#bill_addr_district").find('option[value="' + $("#inst_addr_district").val() + '"]').prop("selected", true).change();
            $("#bill_addr_district").prop('disabled', true);
            $("#bill_main_locality").data('kendoDropDownList').value($("#inst_main_locality").val());
            $("#bill_main_locality").change();
            $("#bill_main_locality").data('kendoDropDownList').readonly();
            $("#bill_sub_locality").data('kendoDropDownList').value($("#inst_sub_locality").val());
            $("#bill_sub_locality").change();
            $("#bill_sub_locality").data('kendoDropDownList').readonly();
            $("#bill_exchange_code").find('option[value="' + $("#inst_exchange_code").val() + '"]').prop("selected", true).change();
            $("#bill_exchange_code").prop('disabled', true);
            $("#BILL_GST_STATE_CODE").find('option[value="' + $("#INST_GST_STATE_CODE").val() + '"]').prop("selected", true);
            $("#BILL_GST_STATE_CODE").prop('disabled', true);
            unMask();
        }
    } else {
        mask();
        $("#bill_addr_house_no").val("").prop('disabled', false);
        $("#bill_addr_vill").val("").prop('disabled', false);
        $("#bill_addr_add_dtls").val('').prop('disabled', false);
        $("#bill_addr_landmark").val('').prop('disabled', false);
        $("#bill_addr_city").val("").prop('disabled', false);
        $("#BILL_ADDR_PINCODE").val("").prop('disabled', false);
        $("#bill_addr_state").find('option[value="0"]').prop("selected", true);
        $("#bill_addr_state").prop('disabled', false);
        $("#bill_addr_district").find('option[value="0"]').prop("selected", true);
        $("#bill_addr_district").prop('disabled', false);
        $("#bill_main_locality").data('kendoDropDownList').select(0);
        $("#bill_main_locality").data('kendoDropDownList').readonly(false);
        $("#bill_sub_locality").data('kendoDropDownList').select(0);
        $("#bill_sub_locality").data('kendoDropDownList').readonly(false);
        $("#bill_exchange_code").find('option[value="0"]').prop("selected", true);
        $("#bill_exchange_code").prop('disabled', false);
        $('#addr_same_check').prop('checked', false);
        $("#BILL_GST_STATE_CODE").find('option[value="0"]').prop("selected", true);
        $("#BILL_GST_STATE_CODE").prop('disabled', false);
        unMask();
    }


}

function unCheckBillDetails() {
    $("#bill_addr_house_no").val("").prop('disabled', false);
    $("#bill_addr_vill").val("").prop('disabled', false);
    $("#bill_addr_add_dtls").val('').prop('disabled', false);
    $("#bill_addr_landmark").val('').prop('disabled', false);
    $("#bill_addr_city").val("").prop('disabled', false);
    $("#BILL_ADDR_PINCODE").val("").prop('disabled', false);
    $("#bill_addr_state").find('option[value="0"]').prop("selected", true);
    $("#bill_addr_state").prop('disabled', false);
    $("#bill_addr_district").find('option[value="0"]').prop("selected", true);
    $("#bill_addr_district").prop('disabled', false);
    $("#bill_main_locality").data('kendoDropDownList').select(0);
    $("#bill_main_locality").data('kendoDropDownList').readonly(false);
    $("#bill_sub_locality").data('kendoDropDownList').select(0);
    $("#bill_sub_locality").data('kendoDropDownList').readonly(false);
    $("#bill_exchange_code").find('option[value="0"]').prop("selected", true);
    $("#bill_exchange_code").prop('disabled', false);
    $('#addr_same_check').prop('checked', false);

}

function nxtToDKYCLLForm(type) {

    var reqData = dkycLoginInfo;
    reqData.inputType = type;
    reqData.isSkipImgs = true;
    if (type != 'LL_SKIP_ATTACH') {
        reqData.isPOIBack = '0';
        reqData.isPOABack = '0';
        reqData.isSkipImgs = false;
        var poaSameAspoi = $("#checkPOA").is(":checked");
//    var cust_photo = document.getElementById("SUBSCRIBER_PHOTO-Upload");
        var cust_photo = $('#SUBSCRIBER_PHOTOimg').attr('src');
        if (!validateDocFiles(cust_photo, 'Photograph')) {
            return false;
        }
//    var poi_frnt=document.getElementById("POI-Upload");
        var poi_frnt = $('#POIimg').attr('src');
        if (!validateDocFiles(poi_frnt, 'POI Front')) {
            return false;
        }
        if (isPOIBackReq) {
            //var poi_bck=document.getElementById("POIBack-Upload");   
            var poi_bck = $('#POIBackimg').attr('src');
            if (!validateDocFiles(poi_bck, 'POI Back')) {
                return false;
            }
            reqData.isPOIBack = '1';

        }
        if (!poaSameAspoi) {

            var poa_val = $('#poa_type').find("option:selected").val();
            reqData.poa_type = poa_val;
            if (poa_val == '0') {
                alert(dkyselfPoatype);

                return false;
            }
//         var poa_frnt=document.getElementById("POA-Upload");
            var poa_frnt = $('#POAimg').attr('src');
            if (!validateDocFiles(poa_frnt, 'POA Front')) {
                return false;
            }
            if (isPOABackReq) {
                //var poa_bck=document.getElementById("POABack-Upload");
                var poa_bck = $('#POABackimg').attr('src');
                if (!validateDocFiles(poa_bck, 'POA Back')) {
                    return false;
                }
                reqData.isPOABack = '1';

            }
        }
        mask();
        reqData.poi_type = $('#poi_type').find("option:selected").val();
        reqData.POIBack = isPOIBackReq;

        reqData.POABack = isPOABackReq;
        reqData.POI_POA_SAME = poaSameAspoi;
        reqData.check_poi_same = poaSameAspoi;
    }
    document.attachDKycForm.method = "post";
    document.attachDKycForm.action = "wingsDKYCForm.do";
    document.attachDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
    document.attachDKycForm.submit();

}

function validSerFieldsLL(event, allowedvalues, label) {
    var objid = event.getAttribute('id');

    var value_id = $("#" + objid).val();
    var regExp = "";
    if (allowedvalues == "alphabets") {
        regExp = /^[(a-z )(A-Z)]+$/;
    } else if (allowedvalues == "emailreg") {
        regExp = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.([a-zA-Z]{2,4})+([a-zA-Z.]{0,4})$/;
    } else if (allowedvalues == "numeric") {

        regExp = /^(([0-9]))+$/;
        if (objid == "mobile") {
            if (value_id.length != 10) {

                alertMessage("warning", almsgid + "  " + "minimum length is 10", altID);
                $('#' + objid).focus();
                $('#' + objid).val('');
            }
        }
    } else if (allowedvalues == "website") {
        regExp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    } else if (allowedvalues == "alphNumeric") {

        regExp = /^[a-zA-Z0-9 _]+$/;
    } else if (allowedvalues == "ALL") {
        regExp = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/;
    }


    if (!regExp.test(value_id)) {

        alert(label + " should be Valid");

        $('#' + objid).focus();
        $('#' + objid).val('');
    }
}

function downloadReceiptLL() {
    var reqData = llReceiptReqInfo;
//    reqData.RECEIPTNO=llReceiptRespData.RECEIPTNO;
//    reqData.CAF_NO=llReceiptRespData.CAF_NO;
//    reqData.DATE_TIME=llReceiptRespData.DATE_TIME;
    reqData.CAF_DETAILS = llReceiptRespData;
    document.getElementById("data").value = encrypt(JSON.stringify(reqData));
    document.DKycLLReceipt.method = "post";
//    document.DKycLLReceipt.action = "downloadpdfDKYCLL.do";
    document.DKycLLReceipt.action = "CRSFmsPdfDownload";
    document.DKycLLReceipt.data = encrypt(JSON.stringify(reqData));
    document.DKycLLReceipt.submit();

}

function valAADHAARFun(event) {
    var target = event.getAttribute('id');
    var aadhaarVAL = $('#' + target).val();
    if (aadhaarVAL.length === 12) {
        if (validate(aadhaarVAL)) {
        } else {
            alert("Please enter valid aadhaar number");
            $('#' + target).val('');
            $('#' + target).focus();
        }
    } else {
        alert("UID  number should be 12  digits");
        $('#' + target).val('');
        $('#' + target).focus();
    }
}

function checkBillMedia() {
    var bill_media = $('#bill_media').find("option:selected").val();
    if (bill_media == '1' || bill_media == '3') {
        $('#billMedia_email').show();
        if (bill_media == '1') {
            $('#labl_ofer').show();
        } else {
            $('#labl_ofer').hide();
        }

        $('#bill_email').val($('#email').val());
//      if(!$("#bill_frequency option[value='1']").length > 0){
//      $("#bill_frequency").append("<option value='1'>Monthly</option>");    
//      }

    } else {
        $('#billMedia_email').hide();
        $('#bill_email').val('');
        //$("#bill_frequency option[value='1']").remove();
        $('#labl_ofer').hide();
    }
}

function uploadSkippedDocs(type) {
    mask();
    var reqData = llSkipedDocInfo;
    reqData.inputType = type;
    reqData.isSkipImgs = true;
    if (type != 'LL_SKIP_ATTACH') {
        reqData.isPOIBack = '0';
        reqData.isPOABack = '0';
        reqData.isSkipImgs = false;
        var poaSameAspoi = true;
        var cust_photo = $('#SUBSCRIBER_PHOTOimg').attr('src');
        if (!validateDocFiles(cust_photo, 'Photograph')) {
            unMask();
            return false;
        }
        var poi_frnt = $('#POIimg').attr('src');
        if (!validateDocFiles(poi_frnt, 'POI Front')) {
            unMask();
            return false;
        }
        if (isPOIBackReq) {
            //var poi_bck=document.getElementById("POIBack-Upload");   
            var poi_bck = $('#POIBackimg').attr('src');
            if (!validateDocFiles(poi_bck, 'POI Back')) {
                unMask();
                return false;
            }
            reqData.isPOIBack = '1';

        }
         if (!(llSkipedDocInfo.POI_TYPE == llSkipedDocInfo.POA_TYPE)) {
          poaSameAspoi= false;
            var poa_val = $('#poa_type').find("option:selected").val();
            reqData.poa_type = poa_val;
            if (poa_val == '0') {
                alert(dkyselfPoatype);
                unMask();
                return false;
            }
//         var poa_frnt=document.getElementById("POA-Upload");
            var poa_frnt = $('#POAimg').attr('src');
            if (!validateDocFiles(poa_frnt, 'POA Front')) {
                unMask();
                return false;
            }
            if (isPOABackReq) {
                //var poa_bck=document.getElementById("POABack-Upload");
                var poa_bck = $('#POABackimg').attr('src');
                if (!validateDocFiles(poa_bck, 'POA Back')) {
                    unMask();
                    return false;
                }
                reqData.isPOABack = '1';

            }
        }
        
        reqData.poi_type = $('#poi_type').find("option:selected").val();
        reqData.POIBack = isPOIBackReq;

        reqData.POABack = isPOABackReq;
        reqData.POI_POA_SAME = poaSameAspoi;
        reqData.check_poi_same = poaSameAspoi;
    }
   
   
//    document.attachDKycForm.method = "post";
//    document.attachDKycForm.action = "saveSkippedDocs.do";
//    document.attachDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
//    document.attachDKycForm.submit();
    
    
     $.ajax({
                url: "saveSkippedDocs.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                     unMask();
                     if(data.response.success){
                    alert(data.response.message);
                    window.location.href='Login.do';
              }else{
                  alert(data.response.message);
                    window.location.href='Login.do';
              }
                    
                }, error: function (data) {
                    unMask();  
          alert("err"+data);
                }
            });

}