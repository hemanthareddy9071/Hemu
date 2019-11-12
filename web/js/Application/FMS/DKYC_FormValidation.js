/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var metaDataValidationDKYC = {};



function back2DKYCForm() {
    var reqData = dkycFormData;
    document.attachDKycForm.method = "post";
    document.attachDKycForm.action = "back2DKYCForm.do";
    document.attachDKycForm.reqData.value = encrypt(reqData);
    document.attachDKycForm.submit();
}

function setMetaDataforDKYC() {
    var formfieldData = {};
    var formMetaInfo = $("#kycformFieldsMetaData").val();
    formfieldData = JSON.parse(formMetaInfo);
    metaDataValidationDKYC = formfieldData;

}

function validateDKYCCafNxt() {

    try {
        var objCustData = {};
        var sel_mob_no = $('#sel_mob_no').val();
        if (sel_mob_no == '') {
            alert(dkycfWingMobNum);
            return false;
        }
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
                                $('#wait').hide();
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
                }else if (target == "cust_home_no") {

                    try {
                        var targetVal = $('#cust_pref_comm').val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal == '0') {
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + '  should be mandatory.')
                                return false;
                            } else if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    alert(dkycfWinghomephone)
                                    return false;
                                } else {
                                    objCustData["cust_home_no"] = targetv;
                                    $('#' + target).focus().css('border-color', 'green');
                                }

                            }
                        
                            
                            else {

                                objCustData["cust_home_no"] = "";
                            }
                        } else {
                            if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
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
                                    alert(dkycfWingworkphone)
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
                                alert(dispName + ' should be mandatory.');
                                return false;
                            } else if (targetVal == '6') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#' + target).val('');
                                    $('#' + target).focus().css('border-color', 'red');
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
                                    alert(dkycfWingfax)
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
                                alert(dispName + '  should be mandatory.')
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
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            
                            if (targetVal.length == '0') {
                                if(target=='poa_number' || target=='poa_issue_date' || target=='poa_issue_place' && dkycDocData.POI_POA_SAME){
                                    continue;  
                                }
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + ' should be mandatory.');

                                $('#' + target).val('');
                                try {
                                    $('#wait').hide();
                                } catch (e) {
                                }
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
                                //if (target == 'cust_title') {
                                if(target=='poa_issuing_auth' && dkycDocData.POI_POA_SAME){
                                    continue;  
                                }
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + '  should be mandatory.')
                                return false;
//                                } else {
//                                }

                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                // for insta & Bill addr fields _ecaf same as targetVal 
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
                                    objCustData[idval] = targetVal;
                                } else {
                                    objCustData[idval] =  $('#' + target + ' option:selected').text();
                                }
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                            var idval = target + "_ecaf";
                            // for insta & Bill addr fields _ecaf same as targetVal 
                            if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
                                objCustData[idval] = targetVal;
                            } else {
                                objCustData[idval] = $('#' + target + ' option:selected').text();
                            }
                        }
                        var CustType = $('#cust_usage_code').find("option:selected").val();
                        if (CustType == 0) {
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
            } catch (e) {
            }

        }
       
        objCustData.service_type = 'WINGS';
        if (validation_req) {
            var input_rmn_no = $('#cust_bsnl_trail_mobno').val().trim();
            var input_rmn_no2 = $('#cust_bsnl_trail_mobno2').val().trim();
                    if (input_rmn_no == ""  ) {
                        alert(trailNum + " should be mandatory.");
                        $('#cust_bsnl_trail_mobno').focus();
                        return false;
                    }
                    if (input_rmn_no2 == ""   ) {
                        alert(trailNum + " should be mandatory.");
                        $('#cust_bsnl_trail_mobno2').focus();
                        return false;
                    }
            
            if (rmn_valid_done) {
                if (rmn_no_exist) {
                    var input_rmn_no = $('#cust_rmn_no_valid').val().trim();
                    if (input_rmn_no == "") {
                        alert(trailRMNnoEmpty +" should not be empty");
                        $('#cust_rmn_no_valid').focus();
                        return false;
                    } else {
                        objCustData.RMN_NO = $('#RMN_NO').val();
                        objCustData.RMN_NO_EXIST = true;
                        objCustData.INPUT_RMN_NO = input_rmn_no;
                    }
                }
            } else {
                alert(trailRMNnovalid);
                $('#cust_bsnl_trail_mobno').focus();
                return false;
            }
        }
        if(is_mob_valid_req){
            var zone_freePlan=$('#free_zone').val();
            if(zone_freePlan == 0){
                alert(alrtcircleEmpty);
                $('#free_zone').focus();
                return false;
            }else{
              objCustData.MOB_ZONE=zone_freePlan;
            }
            var input_mob_no=$('#freeplan_mob_num').val();
            if(input_mob_no ==""){
                alert(emptyMOBNum);
                return false;
            }else{
            if(mobile_num_valid_done){
                objCustData.MOB_NUM_VALID= input_mob_no;
                objCustData.TRAIL_COUPON_CODE= input_mob_no;
            }else{
                alert(plzVlidNum);
                return false;
            }
        }
       var input_otp= $('#freeplan_mob_num_otp').val();
       if(input_otp.trim()==""){
           alert(emptyOTPfld);
           return false;
       }else{
            if(is_otp_validated){
                objCustData.MOB_VALID_OTP=input_otp;
            }else{
                alert(plzVlidOTP);
                return false;
            }
        }
            
        }
        
              var selTarifPlan = $("#cust_wings_traiff").val();
        var selTarifPlanName = $('#cust_wings_traiff').find("option:selected").text();
        if (selTarifPlan != 0) {
            
            if (selTarifPlan == "WTP1" || selTarifPlan == "WTP6" || selTarifPlan == "WTP6A" || selTarifPlan == "WTP6B" || selTarifPlan == "WTP9") {
                if (selTarifPlan == "WTP6") {
                var trail_ref_no = $('#cust_bsnl_trail_mobno').val().trim();
                var input_rmn_no2 = $('#cust_bsnl_trail_mobno2').val().trim();
                objCustData.TARRIF_FLAG = "TRAIL_OFFER";
                if (trail_ref_no == "") {
                    alert(trailNum + " Should not be empty");
                    $('#cust_bsnl_trail_mobno').focus();
                    return false;
                }
                if (input_rmn_no2 == "" ) {
                        alert(trailNum);
                        $('#cust_bsnl_trail_mobno2').focus();
                        return false;
                    }
                    var trail_ref_no_final=trail_ref_no+'-'+input_rmn_no2;
                objCustData.TARIFF_ID_NAME = "TRAIL_OFFER";
                objCustData.TARIFF_ID_VALUE = trail_ref_no_final;

            }else if(selTarifPlan == "WTP6A"){
               objCustData.TARIFF_ID_NAME = $('#free_zone').val();
               objCustData.TARIFF_ID_VALUE =$('#freeplan_mob_num').val();
               objCustData.TARRIF_FLAG = "TRAIL_OFFER";
            } else if(selTarifPlan == "WTP6B"){
               objCustData.poi_type_ecaf='BSNL_EMP';
               objCustData.poi_issuing_auth_ecaf='BSNL_EMP';
               objCustData.poa_type_ecaf='BSNL_EMP';
               objCustData.poa_issuing_auth_ecaf='BSNL_EMP';
               objCustData.TARIFF_ID_NAME = '';
               objCustData.TARIFF_ID_VALUE ='';
               objCustData.TARRIF_FLAG = "TRAIL_OFFER";
                var hrms_number = $('#hrms_number').val();
                    if (hrms_number.trim() == "") {
                        alert(hrmsNum + ' Should Not Be Empty');
                        $("#hrms_number").focus();
                        return false;
                    } else {

                        if( ! (validateHRMSNum(hrms_number))){
                            return false;
                        }
                    }
            }else if(selTarifPlan == "WTP9"){
                var trail_ref_no = $('#cust_bsnl_trail_mobno').val().trim();
                var input_rmn_no2 = $('#cust_bsnl_trail_mobno2').val().trim();
                objCustData.TARRIF_FLAG = selTarifPlanName;
                if (trail_ref_no == "") {
                    alert(trailNum + " Should not be empty");
                    $('#cust_bsnl_trail_mobno').focus();
                    return false;
                }
                if (input_rmn_no2 == "" ) {
                        alert(trailNum);
                        $('#cust_bsnl_trail_mobno2').focus();
                        return false;
                    }
                    var trail_ref_no_final=trail_ref_no+'-'+input_rmn_no2;
                objCustData.TARIFF_ID_NAME = $('#cust_wings_traiff').find("option:selected").text();
                objCustData.TARIFF_ID_VALUE = trail_ref_no_final;
                
            }
            else{
                objCustData.TARIFF_ID_NAME = "";
                objCustData.TARIFF_ID_VALUE = "";
                objCustData.TARRIF_FLAG = "";
               
            }
        }else if(selTarifPlan == "WTP2" || selTarifPlan == "WTP3" || selTarifPlan == "WTP4" || selTarifPlan == "WTP7" || selTarifPlan == "WTP8"){
            var plan_org_name = $('#plan_org_name').val();
            if(selTarifPlan == "WTP8"){
                plan_org_name=$('#cust_wings_traiff').find("option:selected").text();
            }
                var plan_service_num = $('#plan_service_num').val();
                objCustData.TARRIF_FLAG = selTarifPlanName;
                if (plan_org_name.trim() == "") {
                    alert($('#plan_lbl_name').text().replace("*","") +' should not be empty');
                    $('#plan_org_name').focus();
                    return false;
                } else if (plan_service_num.trim() == "") {
                    alert($('#plan_lbl_val').text().replace("*","") +' should not be empty');
                    $('#plan_service_num').focus();
                    return false;
                }
                var userFile = document.getElementById("input_POI");
                if (!validateUserFile(userFile, alrtplanatch , 'input_POI')) {
                    return false;
                }
                objCustData.TARIFF_ID_NAME = plan_org_name;
                objCustData.TARIFF_ID_VALUE = plan_service_num;
            }else{
                objCustData.TARIFF_ID_NAME = "";
                objCustData.TARIFF_ID_VALUE = "";
                objCustData.TARRIF_FLAG = "";
            }
            if( !(selTarifPlan == "WTP6" || selTarifPlan == "WTP6A" || selTarifPlan == "WTP6B") ){
            var selSchemePlan = $("#wings_scheme").val();
            var selSchemePlanName = $('#wings_scheme').find("option:selected").text();
            objCustData.WINGS_SCHEME_ID = selSchemePlan;
            objCustData.WINGS_SCHEME_NAME = selSchemePlanName;
            } 
        } else {
            alert(selTarifpln);
            objCustData.TARRIF_FLAG = "";
            return false;
        }
        var cust_bsnl_csc = $("#cust_bsnl_csc").val().trim();
        var cust_bsnl_franchise = $("#cust_bsnl_franchise").val().trim();
        if (!cust_bsnl_csc == "" && !cust_bsnl_franchise == "") {
            $("#cust_bsnl_csc").val("");
            $("#cust_bsnl_franchise").val("");
            $("#cust_bsnl_franchise").focus();
            alert(cscFranchAlrt);
            return false;
        }
        var wngPin = $('#wings_pin').val();
        var chkISD = $('#chkISD').is(':checked');
        var chkIR = $('#chkIR').is(':checked');
        var hrms_number = $('#hrms_number').val();
        objCustData.cust_pre_type = 'None';
        objCustData.age = $('#age').val();
        objCustData.bill_media_ecaf = 'None';
        objCustData.customer_type_ecaf = 'Individual';
        objCustData.cust_pre_type_ecaf = 'None';
        objCustData.bill_acc_type = 'WINGS';
        objCustData.bill_acc_no = 'New'
        objCustData.bill_acc_no_ecaf = 'New'
        objCustData.bill_acc_type = '';
        objCustData.bill_acc_type_ecaf = '';
        objCustData.nominee_value = '';
        objCustData.nominee_value = '';
        objCustData.nominee_type = '';
        objCustData.nominee_type_ecaf = '';
        objCustData.bill_acc_sub_type = 'WINGS';
        objCustData.bill_acc_type_ecaf = 'WINGS';
        objCustData.bill_acc_sub_type_ecaf = 'WINGS';
        objCustData.bill_frequency = 'Monthly';
        objCustData.bill_frequency_ecaf = 'Monthly';
        objCustData.service_type = 'WINGS';
        objCustData.service_type_ecaf = 'WINGS';
        objCustData.EMP_REFERAL = hrms_number;
        objCustData.WINGS_TARIFF_PLAN_ID = selTarifPlan;
        objCustData.WINGS_TARIFF_PLAN_ecaf = selTarifPlanName;
        objCustData.WINGS_PIN = wngPin;
        objCustData.WINGS_ISD = chkISD;
        objCustData.WINGS_IR = chkIR;
        objCustData.WINGS_CSC_CODE = cust_bsnl_csc;
        objCustData.WINGS_FR_RET_CODE = cust_bsnl_franchise;
        objCustData.DKYC_ATTACHMENT_DATA = dkycDocData;
        objCustData.BILL_GST_STATE_CODE = '';
        objCustData.INST_GST_STATE_CODE_ecaf = '';
        objCustData.nationality = 'Indian';
        objCustData.nationality_ecaf = 'Indian';
        objCustData.instal_chkif_same = $('#addr_same_check').is(':checked');
        objCustData.service_type_cmb = -1;
        if (dkycDocData.POI_POA_SAME) {
            objCustData.poa_type = $('#poa_type').find("option:selected").val();
            objCustData.poa_issuing_auth = $('#poi_issuing_auth').find("option:selected").val();
            objCustData.poa_type_ecaf = $('#poa_type').find("option:selected").text();
            objCustData.poa_issuing_auth_ecaf = $('#poi_issuing_auth').find("option:selected").text();
            objCustData.poa_issue_place = $('#poi_issue_place').val();
            objCustData.poa_issue_date = $('#poi_issue_date').val();
            objCustData.poa_number = $('#poi_number').val();
            
        }
        var dkycFullData = objCustData;
        var reqData = dkycFullData;
        document.uploadCafDKycForm.method = "post";
        document.uploadCafDKycForm.action = "dkycFormData.do";
        document.uploadCafDKycForm.reqData.value = JSON.stringify(reqData);
        document.uploadCafDKycForm.submit();

    } catch (e) {
    }
}


function validateHRMSNum(hrmsNum) {
    try {
        var reqData = {};
        reqData.type = "DKYC";
        reqData.HRMS_NUM = hrmsNum;
        var returnVal = false;
        $.ajax({
            url: "validateHRMS.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                if (data.response.success) {
                returnVal=true;
                } else {
                    alert(data.response.message);
                    $("#hrms_number").val('');
                    $("#hrms_number").focus();
                   
                }
            }, error: function (data) {
                alert("error : " + JSON.stringify(data));
            }
        });
        return returnVal;
    } catch (e) {
    }
}

function setTitlePreCommuniDKYC(targetID) {
    try {
        for (var j = 0; j < targetID.length; j++) {
            var dropID = targetID[j];
            var objIdvlMetaData = metaDataValidationDKYC[dropID];

            var name = objIdvlMetaData.NAME;
            var DD_OPTIONS = objIdvlMetaData.DD_OPTIONS;
            $('#' + name).children().remove();
            $('#' + name).append('<option id="" value="0">Select from list</option>');
            $('#' + name).append(DD_OPTIONS);
        }
    } catch (e) {
    }
}

function validateMobileNum(event){
    var id = event;
    
                var mob_no = $('#'+id).val();
            if (mob_no != "") {
                var target = id
               // var regExp1 = /(^[6-9]{1})([0-9]{0,9})$/;
                 var regExp1 = /(^[6-9]{1})([0-9]{0,9})$/;
                var targetVal = $('#' + target).val();
               
                if (targetVal.length == 10) {
                    if (!regExp1.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(alretNumStrtWth);
                        return false;
                    } else {


                    }
                } else if (targetVal.length == 11) {
                    var targetVal = $('#' + target).val();
                    var zeroindx = targetVal.substr(0, 1);
                    if (zeroindx === 0 || zeroindx === '0') {
                        var firstindx = targetVal.substr(1, 1);
                        if (firstindx === 6 || firstindx === '6' || firstindx === 7 || firstindx === '7' || firstindx === 8 || firstindx === '8' || firstindx === 9 || firstindx === '9') {
                        } else {
                            alert(alretNumsecDigit);
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        }
                    } else {
                        alert(alret11Digit);
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }
                } else {
                    alert(validmobilenumber);
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false;
                }
            } else {
                alert(alretmobnoempty);
                return false;
            }
            return true;
    
}


function formFieldValidationDKYC(event) {
    var target = event.getAttribute('id');
    try {
        if (target == 'cust_pref_comm') {
            var objIdvlMetaData = metaDataValidationDKYC[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES.toString();

            var targetVal = $('#' + target).val();

            if (targetVal == '0') {
                $('#' + target).focus();
                alert(dispName + ' should be mandatory.');
                return false;
            } else if (targetVal == '3') {
                try {
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + "<font color='red'> *</font>");
                    $('#cust_pre_no').val('');
                    document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');

                } catch (e) {
                }

            } else if (targetVal == '4') {
                try {
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + "<font color='red'> *</font>");
                    $('#cust_pre_no').val('');
                    document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');
                } catch (e) {
                }
            } else if (targetVal == '6') {
                try {
                    $('#pre_label').html("<span class='bold'>" + "6a. </span>" + $('#' + target + ' option:selected').text() + ' no.' + "<font color='red'>*</font>");
                    $('#cust_pre_no').val('');
                    document.getElementById("divWork").style.display = 'block';
                    $('#' + target).focus().css('border-color', 'green');
                } catch (e) {
                }
            } else {
                try {
                    $('#' + target).focus().css('border-color', 'green');
                    $('#pre_label').text('')
                    document.getElementById("divWork").style.display = 'none';

                } catch (e) {
                }


            }

        }else if (target == "cust_pre_no") {
            if ($("#cust_pref_comm").val() === '6') {
                var cust_pref_comm = $("#cust_pref_comm").val();
//                alert(cust_pref_comm)
                var objIdvlMetaData = metaDataValidationDKYC["fax_no"];
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
            } else if ($("#cust_pref_comm").val() === '3' || $("#cust_pref_comm").val() === '4') {

                if ($('#' + target).val().length == 11) {
                    if (Numeric($('#' + target).val())) {
                        var indx = $('#' + target).val();
                        var zeroindx = indx.substr(0, 1);
                        if (zeroindx == '0') {

                        } else {
                            alert("If it is 11 digit mobile number which should start with 0");
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        }
                    } else {
                        alert('Entered value should be numeric only');
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }


                } else {
                    alert('Entered value should be 11 digit mobile number');
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false;
                }
            } else {
                if ($('#' + target).val().length == 10) {
                    var alt_cont_no = altContact($('#' + target).val());
                    if (alt_cont_no == true) {

                    } else {
                        alert("If it is 10 digit mobile number which should start with 7,8,9");
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }

                } else {
                    alert('Entered value should be 10 or 11 digit mobile number');
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false;
                }
            }

        } 
        else if (target == "cust_mobile_no" ) {
          
             validateMobileNum(target);



        } 
        else {
          
            var objIdvlMetaData = metaDataValidationDKYC[target];
            var dispName = objIdvlMetaData.DISPLAY_NAME;
            var MANDATORY = objIdvlMetaData.MANDATORY;
            var MAX_LENGTH = objIdvlMetaData.MAX_LENGTH;
            var MIN_LENGTH = objIdvlMetaData.MIN_LENGTH;
            var TYPE = objIdvlMetaData.TYPE;
            var ALLOWED_VALUES = objIdvlMetaData.ALLOWED_VALUES;
            if (TYPE == 'TF') {
                //alert(target);
                //alert(ALLOWED_VALUES);

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
                        alert(dispName + ' minimum length is ' + MIN_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val('');
                        return false;
                    } else {

                    }
                }
                if (!(MAX_LENGTH == 'NA')) {
                    if ((targetVal.length) * 1 > MAX_LENGTH * 1) {
                        alert(dispName + ' maximum length is ' + MAX_LENGTH + ' characters')
                        $('#' + target).focus();
                        $('#' + target).val('');
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
                        $('#' + target).focus();
                        $('#' + target).val(0);
                        return false;
                    } else {

                    }

                }
            }
        }
    } catch (e)
    {
        alert('JS Log(FMS_kyc_Validation.js):::::::::::::::::::Exception in  formFieldValidationFMS' + e);
    }


}




function setDKYCCustData() {
    try {


        dkycFormData = JSON.parse(dkycFormData);

        for (var key in metaDataValidationDKYC) {
            if (!dkycFormData.hasOwnProperty(key))
                continue;

            var obj = dkycFormData[key];
            var objMeta = metaDataValidationDKYC[key];
            if (objMeta.TYPE == 'TF' || objMeta.TYPE == 'DT') {
                $('#' + key).val(obj);

            }

            if (objMeta.TYPE == 'DD') {
                if (key == 'inst_main_locality' || key == 'inst_sub_locality' || key == 'bill_main_locality' || key == 'bill_sub_locality') {
                    $('#' + key).data('kendoDropDownList').value(obj);
                    $('#' + key).change();
                } else {
                    $('#' + key).val(obj).trigger("change");
                }
            }
            if (objMeta.TYPE == 'RB') {
                try {
                    $("input[name=" + key + "][value=" + obj + "]").prop('checked', true);
                } catch (e) {
                }
            }

        }

    } catch (e) {
        alert(e);
    }
}

function setDKYCDocData(){
    dkycDocData = JSON.parse(dkycDocData);
    try{
       if(dkycDocData.POI_POA_SAME != undefined){
        if( dkycDocData.POI_POA_SAME ){
         $('#poa_type').val(dkycDocData.poi_type).prop('disabled',true).trigger('change');   
         $('#poi_type').val(dkycDocData.poi_type).prop('disabled',true).trigger('change');   
         $('#check_poi_same').prop('checked', true).trigger("change");   
         $('#check_poi_same').prop('disabled', true);   
         $('#poa_addr_dtls').hide();
     
        }else{
         $('#poi_type').val(dkycDocData.poi_type).prop('disabled',true).trigger('change'); 
          $('#poa_type').val(dkycDocData.poa_type).prop('disabled',true).trigger('change'); 
         $('#check_poi_same').prop('checked', false);  
         $('#check_poi_same').prop('disabled', true); 
        }
    }
            if(dkycDocData.poi_type =="23"){
         $('#poi_issue_place').val(bangName);    
         $('#poiDateNotFnd').prop('checked', true).trigger("change");   
         $('#poiDateNotFnd').prop('disabled', true);
         }
         if(dkycDocData.poa_type =="23"){
         $('#poa_issue_place').val(bangName);    
         $('#poiDateNotFnd').prop('checked', true).trigger("change");   
         $('#poiDateNotFnd').prop('disabled', true);
         }
    }catch(e){alert(e);}
    

    
}

function checkSmeInsta() {
    if (document.getElementById('addr_same_check').checked) {

        var inst_addr_hno = $("#inst_addr_hno").val();
        var inst_addr_vill = $("#inst_addr_vill").val();
        var inst_addr_city = $("#inst_addr_city").val();
        var INST_ADDR_PINCODE = $("#INSTAL_ADDR_PINCODE").val();
        var inst_addr_state = $("#inst_addr_state").val();
        var inst_addr_district = $("#inst_addr_district").val();
        if (!(inst_addr_district == 0 || inst_addr_district == null)) {
            var inst_main_locality = $("#inst_main_locality").val();
            var inst_sub_locality = $("#inst_sub_locality").val();
            var inst_exchange_code = $("#inst_exchange_code").val();
        }
        if (inst_addr_hno == '' || inst_addr_vill == '' || inst_addr_city == '' || INST_ADDR_PINCODE == '' || inst_addr_state == 0 || inst_addr_district == 0 || inst_main_locality == 0 || inst_sub_locality == 0 || inst_exchange_code == 0) {
            alert("Please fill the contact details");
            $('#addr_same_check').prop('checked', false);
            return false;
        } else {
            $("#bill_addr_house_no").val(inst_addr_hno);
            $("#bill_addr_vill").val(inst_addr_vill);
            $("#bill_addr_city").val(inst_addr_city);
            $("#BILL_ADDR_PINCODE").val(INST_ADDR_PINCODE);
            $("#bill_addr_state").find('option[value="' + $("#inst_addr_state").val() + '"]').prop("selected", true).change();
            $("#bill_addr_district").find('option[value="' + $("#inst_addr_district").val() + '"]').prop("selected", true).change();
            $("#bill_main_locality").data('kendoDropDownList').value($("#inst_main_locality").val());
            $("#bill_main_locality").change();
            $("#bill_main_locality").data('kendoDropDownList').readonly();
            $("#bill_sub_locality").data('kendoDropDownList').value($("#inst_sub_locality").val());
            $("#bill_sub_locality").change();
            $("#bill_sub_locality").data('kendoDropDownList').readonly();
            $("#bill_exchange_code").find('option[value="' + $("#inst_exchange_code").val() + '"]').prop("selected", true).change();
        }
    } else {
        $("#bill_addr_house_no").val(" ");
        $("#bill_addr_vill").val(" ");
        $("#bill_addr_city").val(" ");
        $("#BILL_ADDR_PINCODE").val(" ");
        $("#bill_addr_state").find('option[value="0"]').prop("selected", true);
        $("#bill_addr_district").find('option[value="0"]').prop("selected", true);
        $("#bill_main_locality").data('kendoDropDownList').select(0);
        $("#bill_main_locality").data('kendoDropDownList').readonly(false);
        $("#bill_sub_locality").data('kendoDropDownList').select(0);
        $("#bill_sub_locality").data('kendoDropDownList').readonly(false);
        
        $("#bill_exchange_code").find('option[value="0"]').prop("selected", true);

    }


}

function nxtToDKYCForm(type) {
   
  
    if(dkycLoginInfo =="{}"){
      var reqData={};  
    }else{
       var reqData = dkycLoginInfo;  
   }

    
    
    reqData.isPOIBack = '0';
    reqData.isPOABack = '0';
    var poaSameAspoi = $("#checkPOA").is(":checked");
//    var cust_photo = document.getElementById("SUBSCRIBER_PHOTO-Upload");
    var cust_photo = $('#SUBSCRIBER_PHOTOimg').attr('src');
    if(!validateDocFiles(cust_photo,'Photograph')){return false;}
//    var poi_frnt=document.getElementById("POI-Upload");
    var poi_frnt=$('#POIimg').attr('src');
    if(!validateDocFiles(poi_frnt,'POI Front')){return false;}
    if(isPOIBackReq){
      //var poi_bck=document.getElementById("POIBack-Upload");   
      var poi_bck=$('#POIBackimg').attr('src');   
      if(!validateDocFiles(poi_bck,'POI Back')){return false;}
       reqData.isPOIBack = '1';
      
    }
    if(!poaSameAspoi){
        
         var poa_val = $('#poa_type').find("option:selected").val();
         reqData.poa_type =poa_val;
         if(poa_val=='0'){
             alert("Please select poa type");
             return false;
         }
//         var poa_frnt=document.getElementById("POA-Upload");
         var poa_frnt=$('#POAimg').attr('src');
    if(!validateDocFiles(poa_frnt,'POA Front')){return false;}
    if(isPOABackReq){
          //var poa_bck=document.getElementById("POABack-Upload");
          var poa_bck=$('#POABackimg').attr('src');
      if(!validateDocFiles(poa_bck,'POA Back')){return false;}
          reqData.isPOABack = '1';
   
    }
    }
    
    reqData.inputType = type;
    reqData.poi_type = $('#poi_type').find("option:selected").val();
    reqData.POIBack = isPOIBackReq;

    reqData.POABack = isPOABackReq;
    reqData.POI_POA_SAME = poaSameAspoi;
    reqData.check_poi_same = poaSameAspoi;
    document.attachDKycForm.method = "post";
    document.attachDKycForm.action = "wingsDKYCForm.do";
    document.attachDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
    document.attachDKycForm.submit();

}

function validateUserFile(userFile,dispName,id) {

    if (userFile.files[0] == undefined || userFile.files[0] == "undefined") {
        alert("Please Upload "+dispName);
        $('#'+id).focus();
        return false;
    }
    
    if (userFile.files[0].size/1024 > tarifAtchSize ) {
        alert("upload size should me less than "+tarifAtchSize+" KB");
         $('#'+id).focus();
        return false;
    }
    var fileName = userFile.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!(ext == "jpeg" || ext == "jpg" || ext == "pdf"))
    {
        alert("File type should be jpeg or pdf ");
        $('#'+id).focus();
        return false;
    }
    return true;
}
function validateDocFiles(userFile,dispName) {
if(userFile==""){
    $('wait').hide();
    alert(dkycimgValid + dispName);
    return false;
}
//    if (userFile.files[0] == undefined || userFile.files[0] == "undefined") {
//        alert("Please Upload all the files");
//        return false;
//    }
//    
//    if (userFile.files[0].size > 102400 ) {
//        alert("upload size should me less than"+102400/1024+"KB");
//        return false;
//    }
//    var fileName = userFile.value;
//    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
//    if (!(ext == "jpeg" || ext == "jpg" || ext == "pdf"))
//    {
//        alert("File type should be jpeg ");
//
//        return false;
//    }
    return true;
}

function bckToFlowSelection() {
    var reqData = {};
    reqData.inputType = 'DKYC';
    document.attachDKycForm.method = "post";
    document.attachDKycForm.action = "chooseFlow.do";
    document.attachDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
    document.attachDKycForm.submit();

}

function setFormDD() {
    var DD_DATA = $("#fmsDDData").val()
    var DD_DATA_obj = JSON.parse(DD_DATA);
    
//        POIType
    var Local_poi_type = DD_DATA_obj.Local_poi_type;
    var Outstation_poi_type = DD_DATA_obj.Outstation_poi_type;
    var Foreign_poi_type = DD_DATA_obj.Foreign_poi_type;
//        POI issuing auth Type
    var Local_poi_issuing_auth = DD_DATA_obj.Local_poi_issuing_auth;
    var Outstation_poi_issuing_auth = DD_DATA_obj.Outstation_poi_issuing_auth;
    var Foreign_poi_issuing_auth = DD_DATA_obj.Foreign_poi_issuing_auth;
//POATYPE
    var Local_poa_type = DD_DATA_obj.Local_poa_type;
    var Outstation_poa_type = DD_DATA_obj.Outstation_poa_type;
    var Foreign_poa_type = DD_DATA_obj.Foreign_poa_type;
//POA issuing auth TYPE
    var Local_poa_issuing_auth = DD_DATA_obj.Local_poa_issuing_auth;
    var Outstation_poa_issuing_auth = DD_DATA_obj.Outstation_poa_issuing_auth;
    var Foreign_poa_issuing_auth = DD_DATA_obj.Foreign_poa_issuing_auth;


    //loading POI and POA type based on customer type
    var customer_type = '0001';
    if (customer_type === '0001') {//local
        //poi type
        $('#poi_type').children().remove();
        $('#poi_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Local_poi_type.length; i++) {
            //$('#poi_type').append(new Option(Local_poi_type[i].DD_VALUE, Local_poi_type[i].DD_CODE));
            $('#poi_type').append($("<option></option>").attr("value",Local_poi_type[i].DD_CODE).text(Local_poi_type[i].DD_VALUE).attr("visiCode",Local_poi_type[i].DD_OPTION));
        }

        $('#poi_issuing_auth').children().remove();
        $('#poi_issuing_auth').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Local_poi_issuing_auth.length; i++) {
           // $('#poi_issuing_auth').append(new Option(Local_poi_issuing_auth[i].DD_VALUE, Local_poi_issuing_auth[i].DD_CODE));
             $('#poi_issuing_auth').append($("<option></option>").attr("value",Local_poi_issuing_auth[i].DD_CODE).text(Local_poi_issuing_auth[i].DD_VALUE).attr("visiCode",Local_poi_issuing_auth[i].DD_OPTION));

        }

        //poa type
        $('#poa_type').children().remove();
        $('#poa_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Local_poa_type.length; i++) {
           // $('#poa_type').append(new Option(Local_poa_type[i].DD_VALUE, Local_poa_type[i].DD_CODE));
            $('#poa_type').append($("<option></option>").attr("value",Local_poa_type[i].DD_CODE).text(Local_poa_type[i].DD_VALUE).attr("visiCode",Local_poa_type[i].DD_OPTION));
            
        }
        $('#poa_issuing_auth').children().remove();
        $('#poa_issuing_auth').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Local_poa_issuing_auth.length; i++) {
            //$('#poa_issuing_auth').append(new Option(Local_poa_issuing_auth[i].DD_VALUE, Local_poa_issuing_auth[i].DD_CODE));
            $('#poa_issuing_auth').append($("<option></option>").attr("value",Local_poa_issuing_auth[i].DD_CODE).text(Local_poa_issuing_auth[i].DD_VALUE).attr("visiCode",Local_poa_issuing_auth[i].DD_OPTION));

        }
        //poa_issuing type


    } else if (customer_type === '0004') {//foreign
        //poi type
        $('#poi_type').children().remove();
        $('#poi_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Foreign_poi_type.length; i++) {
            $('#poi_type').append(new Option(Foreign_poi_type[i].DD_VALUE, Foreign_poi_type[i].DD_CODE));
        }
        //poi_issuing type


        //poa type
        $('#poa_type').children().remove();
        $('#poa_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Foreign_poa_type.length; i++) {
            $('#poa_type').append(new Option(Foreign_poa_type[i].DD_VALUE, Foreign_poa_type[i].DD_CODE));
        }

    } else {//outstation
        //poi type
        $('#poi_type').children().remove();
        $('#poi_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Outstation_poi_type.length; i++) {
            $('#poi_type').append(new Option(Outstation_poi_type[i].DD_VALUE, Outstation_poi_type[i].DD_CODE));
        }


        //pos type
        $('#poa_type').children().remove();
        $('#poa_type').append('<option value="0">Select from list</option>');
        for (var i = 0; i < Outstation_poa_type.length; i++) {
            $('#poa_type').append(new Option(Outstation_poa_type[i].DD_VALUE, Outstation_poa_type[i].DD_CODE));
        }

    }
}

function chkPOASame() {

    if (document.getElementById('checkPOA').checked) {
        
        var poi_type = $('#poi_type').find("option:selected").val();
        if (poi_type == "11" || poi_type == "12" || poi_type == "25" || poi_type == "2" || poi_type == "24" || poi_type == "22" || poi_type == "10" || poi_type == "19" || poi_type == "21" || poi_type == "6" || poi_type == "23" || poi_type == "4") {
           
        } else {
             $("#checkPOA").prop("checked", false);
            alert('This POI type is not considered as POA');
            
            return false;
        }
       // $('#poa_type').val('0');
        //var poi_frnt = document.getElementById("POI-Upload");
        var poi_frnt = $("#POIimg").attr("src");
//        var poi_bck = document.getElementById("POIBack-Upload");
        var poi_bck = $("#POIBackimg").attr("src");
        if (poi_frnt == "") {
            alert("Please Upload POI");
            $("#checkPOA").prop("checked", false);
            return false;
        }
        if (isPOIBackReq) {
            if (poi_bck == "") {
                alert("Please Upload POI Back");
                $("#checkPOA").prop("checked", false);
                return false;
            }

            $('#poaBDivSame').show();

        }else{
          isPOABackReq= false;
        }
         $('#poa_type').val(poi_type).attr('disabled', 'disabled');
        $('#poa_attach').hide();
        $('#poa_type_div').hide();
        $('#poa_same_attach').show();

    } else {
        $('#poa_same_attach').hide();
        $('#poa_type_div').show();
        $('#poa_attach').show();
        $('#poaBDivSame').hide();
        $('#poa_type').val('0').prop('disabled', false);
    }
}

function callImg(obj) {
    var strId = $(obj).prop("id").split('-')[0];
    var field_id = imgArr[strId];
    var poi_val = $('#' + field_id).find("option:selected").val();
    if (poi_val == '0') {
        alert("Please select " + strId +" type");
        $('#' + field_id).focus().css('border-color', 'red');
        return false;
    }

    return true;

}

function chkFrPoB(obj) {
    var strId = obj;
    var strDiv = strId.split('_')[0];
    var poi_val = $('#' + strId).find("option:selected").attr('visiCode');
    if (poi_val == '1') {
        $('#' + strDiv + 'BDiv').show();
        if(strDiv=='poi'){
        isPOIBackReq = true;
    }else{
         isPOABackReq = true;

    }
    } else {
        $('#' + strDiv + 'BDiv').hide();
         if(strDiv=='poi'){
        isPOIBackReq = false;
    }else{
         isPOABackReq = false;

    }
    }
    //if(dkycDocsInfo.reqFrmBck !='undefined'){
       removeImgTemp(obj);
  //  }
}
 
 function removeImgTemp(id){
     if(id=='poi_type'){
        $("#POIimg").attr('src', ""); 
        $("#POIBackimg").attr('src', ""); 
     }else{
        $("#POAimg").attr('src', ""); 
      //  $("#POIimgSame").attr('src', ""); 
        $("#POABackimg").attr('src', ""); 
      //  $("#POIBackimgSame").attr('src', ""); 
     }
     
     
 }


function back2DKYCDocs(){
   
    var reqData =dkycDocData;
    var form = document.createElement("form");
                        var inputField = document.createElement("input");
                        inputField.name = "reqData";
                        inputField.setAttribute("type", "hidden");

                        var strData = encrypt(JSON.stringify(reqData));
                        inputField.value = strData;
                        form.setAttribute("action", "back2DKYCDocs.do");
                        form.setAttribute("method", "POST");
                        form.appendChild(inputField);
                        document.body.appendChild(form);
                        form.submit();
//    document.attachDKycForm.method = "post";
//    document.attachDKycForm.action = "back2DKYCDocs.do";
//    document.attachDKycForm.reqData.value = encrypt(JSON.stringify(reqData));
//    document.attachDKycForm.submit();
}

function setBackToAttach(){
   var POIBackAvail=false; 
   var POABackAvail=false; 
   var POA_SAME_POI=false; 
    if(dkycDocsInfo != 'null'){
        $('#poi_type').val(dkycDocsInfo.poi_type).trigger("change");
        if(dkycDocsInfo.POIBack){
         POIBackAvail= true;   
         $('#poiBDiv').show();
        }
        if(dkycDocsInfo.POI_POA_SAME){
         POA_SAME_POI = true;  
         if(dkycDocsInfo.POIBack){ $('#poaBDivSame').show();}
        $("#checkPOA").prop("checked", true);
        $('#poa_attach').hide();
        $('#poa_type_div').hide();
        $('#poa_same_attach').show();

         
        }else{
            
           $('#poa_type').val(dkycDocsInfo.poa_type).trigger("change"); 
            if(dkycDocsInfo.POABack){
              POABackAvail= true;  
              $('#poaBDivSame').show();
            }
        }
    }
    
    if(dkycAttachments != 'null'){
       dkycAttachments=JSON.parse(dkycAttachments);
       if (dkycAttachments.length > 0) {
           for (var i = 0; i < dkycAttachments.length; i++) {
               for (var prop in dkycAttachments[i]) {
                  var attlist = prop.split(".")[0];
                    var b64img = dkycAttachments[i][prop];
                    $('#'+attlist+'img').attr("src", "data:image/jpeg;base64," + b64img);
                    
                    $('#'+attlist+'imgSame').attr("src", "data:image/jpeg;base64," + b64img);
                
               }
       }
    }
}
}

function setDKYCPreviewData() {
    var formfieldData = {};
    var formMetaInfo = $("#kycformFieldsMetaData").val();
    formfieldData = JSON.parse(formMetaInfo);
    metaDataValidationDKYC = formfieldData;
    var CustmrData = custFormData;
    $('#wings_mob').text(CustmrData.sel_mob_no);
    for (var key in metaDataValidationDKYC) {
        if (!CustmrData.hasOwnProperty(key))
            continue;
        var obj = CustmrData[key];
        var objMeta = metaDataValidationDKYC[key];
        if (objMeta.TYPE == 'TF' || objMeta.TYPE == 'DT') {
            $('#pre_' + key).text(obj);
        }
        if (objMeta.TYPE == 'DD') {
            var keys = key + '_ecaf';
            var obj = CustmrData[keys];
            $('#pre_' + key).text(obj);
        }
    }
}

function DKYCJOBUpload(){
       try {
           $("#waitConf").show();
           var payStatus=$('#Payment_Status').val();
              if((!takeIsdPayment && payStatus == 'true') || custFormData.TARRIF_FLAG=='TRAIL_OFFER' || custFormData.WINGS_TARIFF_PLAN_ID =="WTP6B"){
                  
                try {
                    var reqData = custFormData;
                    reqData.KYCType = "FMSDKYC";
                    if(custFormData.TARRIF_FLAG=='TRAIL_OFFER' || custFormData.WINGS_TARIFF_PLAN_ID =="WTP6B"){
                        reqData.isPaymentDone = true;   
//                        if(custFormData.WINGS_TARIFF_PLAN_ID =="WTP6B"){
//                            reqData.isSkipImgs = true;
//                        }
                        document.FMSDKYC_receipt.reqData.value = encrypt(JSON.stringify(reqData));
                        document.FMSDKYC_receipt.method = "post";
                        document.FMSDKYC_receipt.action = "uploadDKYCTrailJob.do";
                        document.FMSDKYC_receipt.submit();
                    } else{
                        reqData.isPaymentDone = payStatus;
                        document.FMSDKYC_receipt.reqData.value = encrypt(JSON.stringify(reqData));
                        document.FMSDKYC_receipt.method = "post";
                        document.FMSDKYC_receipt.action = "uploadDKYCJobWithPayment.do";
                        document.FMSDKYC_receipt.submit();
                   }
                   
                } catch (e) {
                    $("#waitConf").hide();
//                    alert(':::::::::::::::Exception in uploadEkyc  method\t' + e);
                }
            
            
        } else {
        var reqData = custFormData;
        reqData.type = "DKYC";
        reqData.isPaymentDone = payStatus;
        
        $.ajax({
            url: "jobUploadDkyc.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                 if (data.response.success) {
                     $("#waitConf").hide();
                                    if('S' == data.response.responseData.PYMT) {
                                        window.location.href = data.response.responseData.PYMT_URL;
                                    } else {
                                        alert(alrtpymtIncomp);
                                        setTimeout(function () {
                                            window.location.href = 'Login.do';
                                        }, 300);
                                    }
                               
                            } else {
                                alert(data.response.message);
                                window.location.href = 'Login.do';
                                $("#waitConf").hide();
                            }
            }, error: function (data) {
                alert("error : " + JSON.stringify(data));
                $("#waitConf").hide();
            }
        });
    }
    } catch (e) {
    }
    
}


function checkProofNumber(str){
   if(str =='poi'){
    if($('#poi_type').val() =="23") {
        checkpoNum('poi_number','POI Number'); 
    }
       
   }
   if(str =='poa'){
    if($('#poa_type').val() =="23") {
        checkpoNum('poa_number','POA Number'); 
    }
       
   }
   
}

 function checkpoNum(objid,label){
     var regExp = /^(([0-9]))+$/;
    var token= $('#'+objid).val();
      if (!regExp.test(token)) {
             alert(  label+ " should be Valid");
            $('#' + objid).focus();
            $('#' + objid).val('');
            return false;
        }
         if (token.length === 12) {
        if (validate(token)) {
        } else {
            alert("Please enter valid aadhaar number");
            $('#' + objid).val('');
            $('#' + objid).focus();
             return false;
        }
    } else {
        alert("UID  number should be 12  digits");
        $('#' + objid).val('');
        $('#' + objid).focus();
        return false; 
    }
        
     
 }

function validateLLNum() {
    var reqData = {};
    reqData.type = "DKYC";
    reqData.LOB_TYPE = "LL";
    reqData.PLAN_ID = $("#cust_wings_traiff").val();
    var inputllNumPre = $('#cust_bsnl_trail_mobno').val();
    var inputllNumSuf = $('#cust_bsnl_trail_mobno2').val();
   var inputllNum=inputllNumPre+'-'+inputllNumSuf;
   if(inputllNum.trim().length == 12){
    if (inputllNum.trim() != "") {
        if (inputllNum.trim().length > 8) {
            reqData.TARIFF_ID_VALUE = inputllNum;
        } else {
            alert(enterValidLLnum);
            $('#cust_bsnl_trail_mobno').val('');
            $('#cust_bsnl_trail_mobno2').val('');
            return false;
        }
    } else {
        alert(emptyLLNum);
        return false;
    }
   }else{
       alert(enterValidLLnum);
            $('#cust_bsnl_trail_mobno').val('');
            $('#cust_bsnl_trail_mobno2').val('');
            return false;
   }

    $('#wait').show();
    $.ajax({
        url: "llNumValidCheck.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait').hide();
            rmn_valid_done=true;
            if (data.response.success) {
                 if (data.response.responseData.RMN_FLAGE) {
                    $('#RMN_NO').val(data.response.responseData.RMN_NO);
                    $('#cust_rmn_no').val(data.response.responseData.MASK_RMN_NO);
                    $('#cust_bsnl_trail_mobno').prop('disabled',true);
                    $('#cust_bsnl_trail_mobno2').prop('disabled',true);
                    $('#rmn_dtls_div').show();
                     $('#cust_rmn_no_valid').val('');
                    rmn_no_exist = true;
                } else {
                    rmn_no_exist = false;
                    $('#RMN_NO').val('');
                    $('#rmn_dtls_div').hide();
                   $('#cust_bsnl_trail_mobno').prop('disabled',true);
                   $('#cust_bsnl_trail_mobno2').prop('disabled',true);
                }
                alert(rmnvalidsuccess)
            } else {
                rmn_no_exist = false;
                
                alert(data.response.message);
                $('#rmn_dtls_div').hide();
                $('#cust_bsnl_trail_mobno').prop('disabled',false);
                $('#cust_bsnl_trail_mobno').val('');
                $('#cust_bsnl_trail_mobno2').prop('disabled',false);
                $('#cust_bsnl_trail_mobno2').val('');
            }
        }, error: function (data) {
            $('#wait').hide();
            alert("error : " + JSON.stringify(data));
            $('#rmn_dtls_div').hide();
        }
    });
}

function validateTrailPlanMobNum() {
    var reqData = {};
    reqData.type = "DKYC";
    reqData.LOB_TYPE = "WINGS";
    
   var zone_cide = $('#free_zone').val();
   if(zone_cide==0){
       alert(alrtcircleEmpty);
       return false;
   }else{
       var circle_code= $('#free_zone').find("option:selected").val();
       var circle= $('#free_zone').find("option:selected").text();
       var zone= $('#free_zone').find("option:selected").attr('zone_code');
        reqData.ZONE_CODE = zone;
        reqData.CIRCLE_CODE = circle_code;
        reqData.CIRCLE = circle;
   }

    var inputllNum = $('#freeplan_mob_num').val();
    if (inputllNum.trim() != "") {
       if(validateMobileNum('freeplan_mob_num')){
          reqData.GSM_NUMBER = inputllNum;
          reqData.TARIFF_ID_VALUE = inputllNum;
       }else{
           return false;
       }
    } else {
        alert(emptyMOBNum);
        return false;
    }

    $('#wait').show();
    $.ajax({
        url: "mobNumValidCheck.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait').hide();
            mobile_num_valid_done=true;
            if (data.response.success) {
                $('#freeplan_mob_num').prop('disabled', true);
                $('#free_zone').prop('disabled', true);
                $('#otp_mob_plan').show();
                $('#cust_rmn_no_valid').val('');
                alert(rmnvalidsuccess)
            } else {
                mobile_num_valid_done = false;
                alert(data.response.message);
                $('#otp_mob_plan').hide();
                $('#freeplan_mob_num').prop('disabled',false);
                $('#free_zone').prop('disabled',false);
                $('#freeplan_mob_num').val('');
            }
        }, error: function (data) {
            $('#wait').hide();
            alert(unablemobValidCheck);
            $('#otp_mob_plan').hide();
        }
    });
}

function validateTrailPlanOTP() {
    var reqData = {};
    reqData.type = "DKYC";
    reqData.LOB_TYPE = "WINGS";

    var zone_cide = $('#free_zone').val();
    if (zone_cide == 0) {
        alert(alrtcircleEmpty);
        return false;
    } else {
       var circle_code= $('#free_zone').find("option:selected").val();
       var circle= $('#free_zone').find("option:selected").text();
       var zone= $('#free_zone').find("option:selected").attr('zone_code');
        reqData.ZONE_CODE = zone;
        reqData.CIRCLE_CODE = circle_code;
        reqData.CIRCLE = circle;
    }
    var inputllNum = $('#freeplan_mob_num').val();
    if (inputllNum.trim() != "") {
        if (validateMobileNum('freeplan_mob_num')) {
            reqData.MOB_NUM = inputllNum;
        }
    } else {
        alert(emptyMOBNum);
        return false;
    }
    var inputOTP = $('#freeplan_mob_num_otp').val().trim();
    if (inputOTP != "") {
        if (inputOTP.length != 6) {
            alert(invalidOTPfld);
            return false;
        } else {
            reqData.INPUT_OTP = inputOTP;
        }
    } else {
        alert(emptyOTPfld);
        return false;
    }
    $('#wait').show();
    $.ajax({
        url: "otpValidForMOBPlan.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            $('#wait').hide();
            if (data.response.success) {
                is_otp_validated = true;
                $('#freeplan_mob_num_otp').prop('disabled', true);
                alert(data.response.message);
            } else {
                is_otp_validated = false;
                 mobile_num_valid_done = false;
                alert(data.response.message);
                $('#freeplan_mob_num_otp').prop('disabled', false);
                //$('#freeplan_mob_num').prop('disabled', false);
                //$('#freeplan_mob_num').val('');
                $('#freeplan_mob_num_otp').val('');
            }
        }, error: function (data) {
            $('#wait').hide();
            alert(unableValMobotp);
        }
    });
}

function checkRMNValid(){
    var inRMN =$('#cust_rmn_no_valid').val().trim();
    var validRMN =$('#RMN_NO').val().trim();
    if((inRMN.localeCompare(validRMN) != 0)){
        alert(trailRMNnomatch);
        $('#cust_rmn_no_valid').val('');
        return false;
    }
    
}

function clrTrailFlags(){
    rmn_valid_done=false;
}

function validHRMSNum(){
    if($("#cust_wings_traiff").val()=="WTP6B"){
        return validateHRMSNum($("#hrms_number").val());
    }
}