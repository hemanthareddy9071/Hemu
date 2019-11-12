/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Main Locality,sub locality and exchange codes loading from OB service

var dobValidationFlag = true;
var metaDataValidation = {};
var idValues = [];
var cust_age;
var inst_category;


$(document).ready(function () {
//    $("#poi_issue_date").datetimepicker({
//        format: 'DD/MM/YYYY',
//        maxDate: new Date()
//
//    });
//    $("#poa_issue_date").datetimepicker({
//        format: 'DD/MM/YYYY',
//        maxDate: new Date()
//
//
//    });
//    $("#dob").datetimepicker({
//        format: 'DD/MM/YYYY',
//        maxDate: new Date()
//
//
//    });
});
function poiDetailsSameChk() {

    if (document.getElementById('check_poi_same').checked) {
        var poi_type = $("#poi_type").val();
        var poiIssueDate = $('#poi_issue_date').val()
        var poi_number = $('#poi_number').val()
        var poi_issue_place = $('#poi_issue_place').val()
        var poi_issuing_auth = $('#poi_issuing_auth').val()
        if (poiIssueDate === '' || poi_number === '' || poi_issue_place === '' || poi_type === '')
        {
            alert('Please fill all poi values.');
            document.getElementById('check_poi_same').checked = false;
            return false;
        }
        if (poi_type == "11" || poi_type == "12" || poi_type == "25" || poi_type == "2" || poi_type == "24" || poi_type == "22" || poi_type == "10" || poi_type == "19" || poi_type == "21" || poi_type == "6" || poi_type == "23" || poi_type == "4") {
            $('#poa_issue_date').val(poiIssueDate).attr('readonly', 'readonly');
            $('#poa_number').val(poi_number).attr('readonly', 'readonly');
            $('#poa_issue_place').val(poi_issue_place).attr('readonly', 'readonly');
            $('#poa_issuing_auth').val(poi_issuing_auth).attr('disabled', 'disabled');
            $('#poa_type').val(poi_type).attr('disabled', 'disabled');
            if ($('#poiDateNotFnd').is(":checked")) {
                $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
            }
            $('#poi_issue_date').attr('readonly', 'readonly');
            $('#poi_number').attr('readonly', 'readonly');
            $('#poi_issue_place').attr('readonly', 'readonly');
            $('#poi_issuing_auth').attr('disabled', 'disabled');
            $('#poi_type').attr('disabled', 'disabled');
            $('#poiDateNotFnd').attr('disabled', 'disabled');
            $('#poaDateNotFnd').attr('disabled', 'disabled');
            $('#poi_same_chk').val("true");
            newFormMem.setProperty("poi_same_chk", "true");
        } else {
            alert('This POI type is not considered as POA');
            document.getElementById('check_poi_same').checked = false;
            return false;
        }
    } else {
        //poi
        $('#poi_issue_date').attr('readonly', false);
        $('#poi_number').attr('readonly', false);
        $('#poi_issue_place').attr('readonly', false);
        $('#poi_issuing_auth').attr('disabled', false);
        $('#poi_type').attr('disabled', false);
        $('#poiDateNotFnd').attr('disabled', false);
        //poa
        $('#poa_issue_date').val('').attr('readonly', false);
        $('#poa_number').val('').attr('readonly', false);
        $('#poa_issue_place').val('').attr('readonly', false);
        $('#poa_issuing_auth').val('').attr('disabled', false);
        $('#poa_type').val('').attr('disabled', false);
        $('#poaDateNotFnd').prop('checked', false).attr('disabled', false);
        $('#poi_same_chk').val("false");
        newFormMem.setProperty("poi_same_chk", "false");
        try {
            var availablebillTypesJOBJ = {};
//            var availablebillTypesJOBJ1 = newFormMem.getProperty("fmsDDData") + "";
            var availablebillTypesJOBJ1 = $('#fmsDDData').val();
            availablebillTypesJOBJ = JSON.parse(availablebillTypesJOBJ1);
            try {
                var availableLoaclJOBJ2 = {};
                availableLoaclJOBJ2 = availablebillTypesJOBJ.Local_poa_type;
                $('#poa_type').children().remove();
                $('#poa_type').append('<option value="0">Select from list</option>');
                for (var j in availableLoaclJOBJ2) {
                    $('#poa_type').append(new Option(availableLoaclJOBJ2[j].DD_VALUE, availableLoaclJOBJ2[j].DD_CODE));
                }
            } catch (e) {
//                alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading poa_type poiDetailsSameChk::::" + e);
            }

            try {
//                var availableLoaclJOBJ3 = {};
//                availableLoaclJOBJ3 = availablebillTypesJOBJ.Local_poa_issuing_auth;
//                $('#poa_issuing_auth').children().remove();
//                $('#poa_issuing_auth').append('<option value="0">Select from list</option>');
//                for (var j in availableLoaclJOBJ3) {
//                    $('#poa_issuing_auth').append(new Option(availableLoaclJOBJ3[j].DD_VALUE, availableLoaclJOBJ3[j].DD_CODE));
//                }
            } catch (e) {
//                alert("JS Log(FMS_kycCaf.js)::Exception in  loading poa_issuing_auth:: poiDetailsSameChk:::" + e);
            }
        } catch (e) {

        }

    }
}
function mainLocalitiesLoad() {//complete
//states


//    try {
//        var reqData = {};
////        reqData.reqSessionId = $("#reqSessionId").val();
//
//        reqData.type = "FMSKYC";
//        $.ajax({
//            url: "statesLoading.do", //parameters go here in object literal form
//            type: 'POST',
//            async: false,
//            data: {"reqData": encrypt(JSON.stringify(reqData))},
//            success: function (data) {
//                ////sessionCheck(data);(data);
//                var resJson = JSON.parse(JSON.stringify(data));
////                alert("statesLoading  " + JSON.stringify(data));
//                var availablestaesLoading = resJson.response.responseData;
//                var availableStatesJOBJ = {};
//                availableStatesJOBJ = availablestaesLoading;
//                if (availableStatesJOBJ.STATUS === 0 || availableStatesJOBJ.STATUS === '0') {
//                    var availStatesarr = availableStatesJOBJ.STATES;
//                    $('#inst_addr_state').children().remove();
//                    $('#inst_addr_state').append('<option value="0">Select from list</option>');
//                    $(availStatesarr).each(function (index) {
//                        $('#inst_addr_state').append(new Option(availStatesarr[index].DD_VALUE, availStatesarr[index].DD_CODE));
//                    });
//                    $('#bill_addr_state').children().remove();
//                    $('#bill_addr_state').append('<option value="0">Select from list</option>');
//                    $(availStatesarr).each(function (index) {
//                        $('#bill_addr_state').append(new Option(availStatesarr[index].DD_VALUE, availStatesarr[index].DD_CODE));
//                    });
//                }
//            }, error: function (data) {
//                alert("error : staesloding" + JSON.stringify(data));
//            }
//        });
//    } catch (e) {
////        alert("JS Log(FMS_kycCaf.js):::::::exception  in staesloding :::::" + e);
//    }
//main locality
//    try {
//        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
//        reqData.state = $('#bill_addr_state').val();
//        reqData.district = $('#bill_addr_district').val();
//        $.ajax({
//            url: "mainlocalityLoading.do", //parameters go here in object literal form
//            type: 'POST',
//            async: false,
//            data: {"reqData": encrypt(JSON.stringify(reqData))},
//            success: function (data) {
//                //sessionCheck(data);(data);
//                var resJson = JSON.parse(JSON.stringify(data));
////                alert("statesLoading  " + JSON.stringify(data));
//                var availablestaesLoading = resJson.response.responseData;
//                var availableLoaclJOBJ = {};
//                availableLoaclJOBJ = availablestaesLoading;
//
//                if (availableLoaclJOBJ.STATUS === "0") {
//                    var availloaclarr = availableLoaclJOBJ.MESSAGE;
//                    $('#inst_main_locality').children().remove();
//                    $('#inst_main_locality').append('<option value="0">Select from list</option>');
//                    $(availloaclarr).each(function (index) {
//                        $('#inst_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                    });
//                    $("#inst_main_locality").kendoDropDownList({
//                        filter: "contains"
//                    });
//                    //billing address main localities loading
//
//                    $('#bill_main_locality').children().remove();
//                    $('#bill_main_locality').append('<option value="0">Select from list</option>');
//                    $(availloaclarr).each(function (index) {
//                        $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                    });
//                    $("#bill_main_locality").kendoDropDownList({
//                        filter: "contains"
//                    });
//                }
//            }, error: function (data) {
//                alert("error : mainLocalitiesLoad" + JSON.stringify(data));
//            }
//        });
//
//    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in mainLocalitiesLoad for main localities loading:::::" + e);
//    }

// billing types loading
//    try {
//
//
//        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
//        reqData.type = "FMSKYC";
//        $.ajax({
//            url: "billingtypesLoading.do", //parameters go here in object literal form
//            type: 'POST',
//            async: false,
//            data: {"reqData": encrypt(JSON.stringify(reqData))},
//            success: function (data) {
//                //sessionCheck(data);(data);
//                var resJson = JSON.parse(JSON.stringify(data));
////                alert("statesLoading  " + JSON.stringify(data));
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
////        var availablebilltypes = FMSnewFormMem.fetchbillingTypes();
//
//    } catch (e) {
////        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billingtypesLoading for billing types loading:::::" + e);
//    }
////setting poi poa types
//    try {
//
//        var availablebillTypesJOBJ = {};
//        var availablebillTypesJOBJ1 = $('#fmsDDData').val();
//        availablebillTypesJOBJ = JSON.parse(availablebillTypesJOBJ1);
//        try {
//            var availableLoaclJOBJ = {};
//            availableLoaclJOBJ = availablebillTypesJOBJ.Local_poi_type;
//            $('#poi_type').children().remove();
//            $('#poi_type').append('<option value="0">Select from list</option>');
//            for (var j in availableLoaclJOBJ) {
//                $('#poi_type').append(new Option(availableLoaclJOBJ[j].DD_VALUE, availableLoaclJOBJ[j].DD_CODE));
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in  loading poi_type:::::" + e);
//        }
//
//
//        try {
//            var availableLoaclJOBJ1 = {};
//            availableLoaclJOBJ1 = availablebillTypesJOBJ.Local_poi_issuing_auth;
//            $('#poi_issuing_auth').children().remove();
//            $('#poi_issuing_auth').append('<option value="0">Select from list</option>');
//            for (var j in availableLoaclJOBJ1) {
//                $('#poi_issuing_auth').append(new Option(availableLoaclJOBJ1[j].DD_VALUE, availableLoaclJOBJ1[j].DD_CODE));
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading poi_issuing_auth:::::" + e);
//        }
//
//        try {
//
//            var availableLoaclJOBJ2 = {};
//            availableLoaclJOBJ2 = availablebillTypesJOBJ.Local_poa_type;
//            $('#poa_type').children().remove();
//            $('#poa_type').append('<option value="0">Select from list</option>');
//            for (var j in availableLoaclJOBJ2) {
//                $('#poa_type').append(new Option(availableLoaclJOBJ2[j].DD_VALUE, availableLoaclJOBJ2[j].DD_CODE));
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading poa_type:::::" + e);
//        }
//
//        try {
//            var availableLoaclJOBJ3 = {};
//            availableLoaclJOBJ3 = availablebillTypesJOBJ.Local_poa_issuing_auth;
//            $('#poa_issuing_auth').children().remove();
//            $('#poa_issuing_auth').append('<option value="0">Select from list</option>');
//            for (var j in availableLoaclJOBJ3) {
//                $('#poa_issuing_auth').append(new Option(availableLoaclJOBJ3[j].DD_VALUE, availableLoaclJOBJ3[j].DD_CODE));
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in  loading poa_issuing_auth:::::" + e);
//        }
//
//    } catch (e) {
////        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in poi poa types loading:::::" + e);
//    }
//
////instal district loading based on states 
//    $("#inst_addr_state").on('change', function () {
//
////        alert("inst_addr_state");
//        unclicksameadress();
//        try {
////            debugger;
//            $('#inst_addr_district').children().remove();
//            $('#inst_addr_district').append('<option value="0">Select from list</option>');
//            $('#inst_main_locality').children().remove();
//            $('#inst_main_locality').append('<option value="0">Select from list</option>');
//            $('#inst_sub_locality').children().remove();
//            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
//            $('#inst_exchange_code').children().remove();
//            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//            $('#INSTAL_ADDR_PINCODE').val('');
//
//            $('#inst_category').val('');
//            var state = $("#inst_addr_state").val();
//            if (state == "0") {
//                alert("Please select state");
//                return false;
//            } else {
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.state = state;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "districtsLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableDistrictssJOBJ = {};
//                        availableDistrictssJOBJ = availablestaesLoading;
//                        if (availableDistrictssJOBJ.STATUS === 0 || availableDistrictssJOBJ.STATUS === '0') {
//                            var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
//                            $('#inst_addr_district').children().remove();
//                            $('#inst_addr_district').append('<option value="0">Select from list</option>');
//                            $(availDistrictsarr).each(function (index) {
//                                $('#inst_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
//                            });
//
//                        } else {
//                            $('#inst_addr_district').val("");
//                        }
//
//                        $("#inst_main_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                        $("#inst_sub_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                    }, error: function (data) {
//                        alert("error : uploadForms" + JSON.stringify(data));
//                    }
//                });
////                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
//        }
//    });
//    $("#inst_addr_district").on('change', function () {
//        unclicksameadress();
//        try {
//            $('#inst_main_locality').children().remove();
//            $('#inst_main_locality').append('<option value="0">Select from list</option>');
//            $('#inst_sub_locality').children().remove();
//            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
//            $('#inst_exchange_code').children().remove();
//            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//            $('#INSTAL_ADDR_PINCODE').val('');
//            $('#inst_category').val('');
//            var state = $("#inst_addr_state").val();
//            var district = $("#inst_addr_district").val();
//            if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            } else {
//
//
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.state = state;
//                reqData.district = district;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "mainlocalityLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
////                alert("statesLoading  " + JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableLoaclJOBJ = {};
//                        availableLoaclJOBJ = availablestaesLoading;
//                        if (availableLoaclJOBJ.STATUS === "0") {
//                            var availloaclarr = availableLoaclJOBJ.MESSAGE;
//                            $('#inst_main_locality').children().remove();
//                            $('#inst_main_locality').append('<option value="0">Select from list</option>');
//                            $(availloaclarr).each(function (index) {
//                                $('#inst_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                            });
//                            $("#inst_main_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
//                        }
//                        $("#inst_sub_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                    }, error: function (data) {
//                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
//                    }
//                });
////                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
//        }
//    });
//
//
////installation sub localities loading based on installation main locality
//    $("#inst_main_locality").on('change', function () {
//        try {
//            unclicksameadress();
//            $('#inst_sub_locality').children().remove();
//            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
//            $('#inst_exchange_code').children().remove();
//            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//            $('#INSTAL_ADDR_PINCODE').val('');
//            $('#inst_category').val('');
////              debugger;
//            var mainLocality = $('#inst_main_locality').val();
//            var state = $("#inst_addr_state").val();
//            var district = $("#inst_addr_district").val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            } else if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            } else {
////                var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);
//
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.mainLocality = mainLocality;
//                reqData.state = state;
//                reqData.district = district;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "sublocalitLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableSubLocalJOBJ = {};
//                        availableSubLocalJOBJ = availablestaesLoading;
//                        if (availableSubLocalJOBJ.STATUS === "0") {
//                            var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
//                            $('#inst_sub_locality').children().remove();
//                            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
//                            $(availsubloaclarr).each(function (index) {
//                                $('#inst_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
//                            });
//                            $("#inst_sub_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
//                        } else {
//                            $('#inst_main_locality').val("");
//                        }
//                    }, error: function (data) {
//                        alert("error : sublocalitLoading" + JSON.stringify(data));
//                    }
//                });
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in sub localities loading:::::" + e);
//        }
//    });
////installation exchange codes loading based on installation sub locality
//    $("#inst_sub_locality").on('change', function () {
//        try {
//
////            alert("inst_sub_locality");
//            unclicksameadress();
//            $('#inst_exchange_code').children().remove();
//            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//            $('#INSTAL_ADDR_PINCODE').val('');
//            $('#inst_category').val('');
//            var state = $("#inst_addr_state").val();
//            var district = $("#inst_addr_district").val();
//            var mainLocality = $('#inst_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
//            var subLocality = $('#inst_sub_locality').val();
//            if (subLocality == "0") {
//                alert("Please select sub locality from list");
//                return false;
//            }
//            if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            }
////            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
//            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
//            reqData.mainLocality = mainLocality;
//            reqData.subLocality = subLocality;
//            reqData.state = state;
//            reqData.district = district;
//            reqData.type = "FMSKYC";
//            $.ajax({
//                url: "ExchangeCode.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    //sessionCheck(data);(data);
//                    var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
//                    var availablestaesLoading = resJson.response.responseData;
//                    var availableexchCodeJOBJ = {};
//                    availableexchCodeJOBJ = availablestaesLoading;
//                    if (availableexchCodeJOBJ.STATUS === "0") {
//                        var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
//                        $("#EXCHNAGE_DTLS").val(JSON.stringify(availexCodelarr));
//                        $('#inst_exchange_code').children().remove();
//                        $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//                        $(availexCodelarr).each(function (index) {
//                            $('#inst_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
//                        });
//                    } else {
//                        $('#inst_sub_locality').val("");
//                    }
//                }, error: function (data) {
//                    alert("error : exchange codes loading" + JSON.stringify(data));
//                }
//            });
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
//        }
//    });
////installation pin code and category  loading
//    $("#inst_exchange_code").on('change', function () {
//        try {
//            unclicksameadress();
////             alert("inst_exchange_code");
//            $('#INSTAL_ADDR_PINCODE').val('');
//            $('#inst_category').val('');
////        var availexCodelarr = newFormMem.getProperty("EXCHNAGE_DTLS");
//            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
////            alert(availexCodelarr);
//            var availexCodelObj = JSON.parse(availexCodelarr);
//            $(availexCodelObj).each(function (index) {
//                if ($("#inst_exchange_code").val() == availexCodelObj[index].DD_CODE) {
//                    $('#INSTAL_ADDR_PINCODE').attr("readonly", "readonly");
//                    $('#INSTAL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
//                    inst_category = availexCodelObj[index].CATEGORY;
////                    $('#inst_category').val(availexCodelObj[index].CATEGORY);
//                }
//            });
//        } catch (e) {
////            alert(e);
//        }
//
//        try {
//            var mainLocality = $('#inst_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
//            var subLocality = $('#inst_sub_locality').val();
//            if (subLocality == "0") {
//                alert("Please select sub locality from list");
//                return false;
//            }
//            var exchange = $('#inst_exchange_code').val();
//            if (exchange == "0") {
//                alert("Please select Exchange code from list");
//                return false;
//            }
////            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
//            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
//            reqData.mainLocality = mainLocality;
//            reqData.subLocality = subLocality;
//            reqData.exchange = exchange;
//            reqData.type = "FMSKYC";
//            $.ajax({
//                url: "loadGSTCodesForFMS.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    //sessionCheck(data);(data);
//                    var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
//                    var availableGSTLoading = resJson.response.responseData;
//                    var availableGSTCodeJOBJ = {};
//                    availableGSTCodeJOBJ = availableGSTLoading;
//                    if (availableGSTCodeJOBJ.STATUS === "0") {
//                        var availexCodelarr = availableGSTCodeJOBJ.GST_CODE_DTLS;
////                        $("#GST_STATE_CODE").val(JSON.stringify(availexCodelarr));
//                        $('#INST_GST_STATE_CODE').children().remove();
//                        $('#INST_GST_STATE_CODE').append('<option value="0">Select from list</option>');
//                        $(availexCodelarr).each(function (index) {
//                            $('#INST_GST_STATE_CODE').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
//                        });
//                    } else {
//                        alert(availableGSTCodeJOBJ.MESSAGE);
//                        $('#inst_exchange_code').val("0");
//                    }
//                }, error: function (data) {
//                    alert("error : GST codes loading" + JSON.stringify(data));
//                }
//            });
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
//        }
//
//    });
//    //billing district loading based on states 
//    $("#bill_addr_state").on('change', function () {
//        try {
//            $('#bill_addr_district').children().remove();
//            $('#bill_addr_district').append('<option value="0">Select from list</option>');
//            $('#bill_main_locality').children().remove();
//            $('#bill_main_locality').append('<option value="0">Select from list</option>');
//            $('#bill_sub_locality').children().remove();
//            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
//            $('#bill_exchange_code').children().remove();
//            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
//            $('#BILL_ADDR_PINCODE').val('');
//            $('#bill_category').val('');
//            var state = $("#bill_addr_state").val();
//            if (state == "0") {
//                alert("Please select state from list");
//                return false;
//            } else {
////                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.state = state;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "districtsLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableDistrictssJOBJ = {};
//                        availableDistrictssJOBJ = availablestaesLoading;
//                        if (availableDistrictssJOBJ.STATUS === '0' || availableDistrictssJOBJ.STATUS === 0) {
//                            var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
//                            $('#bill_addr_district').children().remove();
//                            $('#bill_addr_district').append('<option value="0">Select from list</option>');
//                            $(availDistrictsarr).each(function (index) {
//                                $('#bill_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
//                            });
////                    $("#bill_addr_district").kendoDropDownList({
////                        filter: "contains"
////                    });
//                        } else {
//                            $('#bill_addr_district').val("");
//                        }
//                        $("#bill_main_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                        $("#bill_sub_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                    }, error: function (data) {
//                        alert("error : billing  district ::loading" + JSON.stringify(data));
//                    }
//                });
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::exception  in billing  district ::loading:::" + e);
//        }
//    });
//
//    $("#bill_addr_district").on('change', function () {
////        unclicksameadress();
//        try {
//            $('#bill_main_locality').children().remove();
//            $('#bill_main_locality').append('<option value="0">Select from list</option>');
//            $('#bill_sub_locality').children().remove();
//            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
//            $('#bill_exchange_code').children().remove();
//            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
//            $('#BILL_ADDR_PINCODE').val('');
//            $('#bill_category').val('');
//            var state = $("#bill_addr_state").val();
//            var district = $("#bill_addr_district").val();
//            if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            } else {
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.state = state;
//                reqData.district = district;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "mainlocalityLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
////                alert("statesLoading  " + JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableLoaclJOBJ = {};
//                        availableLoaclJOBJ = availablestaesLoading;
//                        if (availableLoaclJOBJ.STATUS === "0") {
//                            var availloaclarr = availableLoaclJOBJ.MESSAGE;
//                            $('#bill_main_locality').children().remove();
//                            $('#bill_main_locality').append('<option value="0">Select from list</option>');
//                            $(availloaclarr).each(function (index) {
//                                $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                            });
//                            $("#bill_main_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
//                        }
//                        $("#bill_sub_locality").kendoDropDownList({
//                            filter: "contains"
//                        });
//                    }, error: function (data) {
//                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
//                    }
//                });
////                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
//        }
//    });
////billing sub localities loading based on billing main locality
//    $("#bill_main_locality").on('change', function () {
//        try {
//            var mainLocality = $('#bill_main_locality').val();
//            $('#bill_sub_locality').children().remove();
//            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
//            $('#bill_exchange_code').children().remove();
//            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
//            $('#BILL_ADDR_PINCODE').val('');
//            $('#bill_category').val('');
//            //alert(mainLocality + ":::::mainLocality");
//            var state = $("#bill_addr_state").val();
//            var district = $("#bill_addr_district ").val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            } else if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            } else {
////                var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);
//                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
//                reqData.mainLocality = mainLocality;
//                reqData.state = state;
//                reqData.district = district;
//                reqData.type = "FMSKYC";
//                $.ajax({
//                    url: "sublocalitLoading.do", //parameters go here in object literal form
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        //sessionCheck(data);(data);
//                        var resJson = JSON.parse(JSON.stringify(data));
////                        alert("sublocalitLoading  " + JSON.stringify(data));
//                        var availablestaesLoading = resJson.response.responseData;
//                        var availableSubLocalJOBJ = {};
//                        availableSubLocalJOBJ = availablestaesLoading;
//                        if (availableSubLocalJOBJ.STATUS === "0") {
//                            var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
//                            $('#bill_sub_locality').children().remove();
//                            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
//                            $(availsubloaclarr).each(function (index) {
//                                $('#bill_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
//                            });
//                            $("#bill_sub_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
//                        } else {
//                            $('#bill_main_locality').val("");
//                        }
//                    }, error: function (data) {
//                        alert("error :  billing sub localities loading" + JSON.stringify(data));
//                    }
//                });
//            }
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub localities loading:::::" + e);
//        }
//    });
////billing exchange codes loading based on billing sub locality
//    $("#bill_sub_locality").on('change', function () {
//        try {
////            var mainLocality = $('#bill_main_locality').val();
//            $('#bill_exchange_code').children().remove();
//            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
//            $('#BILL_ADDR_PINCODE').val('');
//            $('#bill_category').val('');
//            var state = $("#bill_addr_state").val();
//            var district = $("#bill_addr_district").val();
//            var mainLocality = $('#bill_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
//            var subLocality = $('#bill_sub_locality').val();
//            if (subLocality == "0") {
//                alert("Please select sub locality from list");
//                return false;
//            }
//            if (state == "0" || state == null) {
//                alert("Please select state from list");
//                return false;
//            } else if (district == "0" || district == null) {
//                alert("Please select district from list");
//                return false;
//            }
////            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
//            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
//            reqData.mainLocality = mainLocality;
//            reqData.subLocality = subLocality;
//            reqData.state = state;
//            reqData.district = district;
//            reqData.type = "FMSKYC";
//            $.ajax({
//                url: "ExchangeCode.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    //sessionCheck(data);(data);
//                    var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
//                    var availablestaesLoading = resJson.response.responseData;
//                    var availableexchCodeJOBJ = {};
//                    availableexchCodeJOBJ = availablestaesLoading;
//                    if (availableexchCodeJOBJ.STATUS === "0") {
//                        var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
//                        $("#EXCHNAGE_DTLS").val(JSON.stringify(availexCodelarr))
//                        $('#bill_exchange_code').children().remove();
//                        $('#bill_exchange_code').append('<option value="0">Select from list</option>');
//                        $(availexCodelarr).each(function (index) {
//                            $('#bill_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
//                        });
//                    } else {
//                        $('#bill_sub_locality').val("");
//                    }
//                }, error: function (data) {
//                    alert("error : billing exchange codes loading" + JSON.stringify(data));
//                }
//            });
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
//        }
//    });
////billing pin code and category  loading
//    $("#bill_exchange_code").on('change', function () {
//        try {
////        alert("bill_exchange_code");
//            $('#BILL_ADDR_PINCODE').val('');
//            $('#bill_category').val('');
//            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
////        alert(availexCodelarr);
//            var availexCodelObj = JSON.parse(availexCodelarr);
//            $(availexCodelObj).each(function (index) {
//                if ($("#bill_exchange_code").val() === availexCodelObj[index].DD_CODE) {
//                    $('#BILL_ADDR_PINCODE').attr("readonly", "readonly");
//                    $('#BILL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
//                    $('#bill_category').val(availexCodelObj[index].CATEGORY);
//                }
//
//            });
//        } catch (e) {
////            alert(e);
//        }
//
//        try {
//            var mainLocality = $('#bill_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
//            var subLocality = $('#bill_sub_locality').val();
//            if (subLocality == "0") {
//                alert("Please select sub locality from list");
//                return false;
//            }
//            var exchange = $('#bill_exchange_code').val();
//            if (exchange == "0") {
//                alert("Please select Exchange code from list");
//                return false;
//            }
////            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
//            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
//            reqData.mainLocality = mainLocality;
//            reqData.subLocality = subLocality;
//            reqData.exchange = exchange;
//            reqData.type = "FMSKYC";
//            $.ajax({
//                url: "loadGSTCodesForFMS.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    //sessionCheck(data);(data);
//                    var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
//                    var availableGSTLoading = resJson.response.responseData;
//                    var availableGSTCodeJOBJ = {};
//                    availableGSTCodeJOBJ = availableGSTLoading;
//                    if (availableGSTCodeJOBJ.STATUS === "0") {
//                        var availexCodelarr = availableGSTCodeJOBJ.GST_CODE_DTLS;
////                        $("#GST_STATE_CODE").val(JSON.stringify(availexCodelarr));
//                        $('#BILL_GST_STATE_CODE').children().remove();
//                        $('#BILL_GST_STATE_CODE').append('<option value="0">Select from list</option>');
//                        $(availexCodelarr).each(function (index) {
//                            $('#BILL_GST_STATE_CODE').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
//                        });
//                    } else {
//                        alert(availableGSTCodeJOBJ.MESSAGE);
//                        $('#bill_exchange_code').val("0");
//                    }
//                }, error: function (data) {
//                    alert("error : GST codes loading" + JSON.stringify(data));
//                }
//            });
//        } catch (e) {
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
//        }
//
//    });
////billing sub types loading based on billing types
//    $("#bill_acc_type").on('change', function () {
//        try {
//            var billaccType = $('#bill_acc_type').val();
//            $('#bill_acc_sub_type').children().remove();
//            $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
//            if (billaccType == "0") {
//                alert("Please select bill account type");
//                return false;
//            }
////            var availbillaccType = FMSnewFormMem.fetchbillingSubTypes(billaccType);
//
//            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
//            reqData.billAccType = billaccType;
//            reqData.type = "FMSKYC";
//            $.ajax({
//                url: "fetchbillingSubTypes.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    //sessionCheck(data);(data);
//                    var resJson = JSON.parse(JSON.stringify(data));
////                        alert("districtsLoading  " + JSON.stringify(data));
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
////            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub types loading:::::" + e);
//        }
//    });
//    $('#poa_issue_date').on('dp.change', function () {
//        var poa_typeVal = $('#poa_type').val();
//        if (poa_typeVal == "" || poa_typeVal == '0' || poa_typeVal == null) {
//            alert(("common.valid.poa"));
//            $("#poa_issue_date").val('');
//            $("#poa_type").focus();
//            return false;
//        } else {
//            if (document.getElementById('poaDateNotFnd').checked) {
//
//            } else {
//                var poa = $("#poa_issue_date").val();
//                var dob = $("#dob").val();
//                if (dob === '' || dob === undefined) {
//                    alert('please select Dob');
//                    //$("#dob").focus();
//                    $("#poa_issue_date").val('');
//                    return false;
//                }
//                if (!DateComparsionEkyc(dob, poa)) {
//                    alert(("kyc.formfields.invaliddate"));
//                    $("#poa_issue_date").val('');
//                }
//            }
//        }
//    });
//    $('#poi_issue_date').on('dp.error', function () {
//        var poi = $("#poi_issue_date").val();
//        alert(("kyc.formfields.invaliddate"));
//        $("#poi_issue_date").val('');
//    });
//    $('#poa_issue_date').on('dp.error', function () {
//        var poi = $("#poa_issue_date").val();
//        alert(("kyc.formfields.invaliddate"));
//        $("#poa_issue_date").val('');
//    });
//    $('#poi_issue_date').on('dp.change', function () {
//        var poi_typeVal = $('#poi_type').val();
//        if (poi_typeVal == '' || poi_typeVal == '0') {
//            alert(("common.valid.poitype"));
//            $("#poi_issue_date").val('');
//            $("#poi_type").focus();
//            return false;
//        } else {
//            if (document.getElementById('poiDateNotFnd').checked) {
//
//            } else {
//                var poi = $("#poi_issue_date").val();
//                var dob = $("#dob").val();
//                if (dob === '' || dob === undefined) {
//                    alert('please select Dob');
//                    $("#poi_issue_date").val('');
//                    return false;
//                }
//                if (!DateComparsionEkyc(dob, poi)) {
//                    alert(("kyc.formfields.invaliddate"));
//                    $("#poi_issue_date").val('');
//                    $('#poa_issue_date').val('');
//                } else {
//                    var samecheck = $("#poi_same_check").val();
//                    if (samecheck == "true") {
//                        $('#poa_issue_date').val($('#poi_issue_date').val())
//                    }
//                }
//            }
//        }
//    });
    $('#dob').on('click', function () {
        if (this.value.length > 0 && dobValidationFlag) {
            var dobVal = this.value;
            if (dobVal.length === "1" || dobVal.length === 1) {
                $('#dob').val('');
                $('#age').val('');
            }
            var age = getAge(this.value);
            cust_age = age;
            if (age >= 18 && age <= 100) {
                $("#age").val(age);
            } else {
                if (age < 18) {
                    alert("Age should be greater than 18 years");
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
            $('#age').val('');
            $('#dob').val('');
            dobValidationFlag = true;
        }

    });
    document.getElementById('wait').style.display = 'none';
}
function dateFormatter() {
    try {
        
        var dateValue = $('#dob').val();
//        alert('dateValue.length::' + dateValue.length);
        if (dateValue.length === "0") {
            alert('Please enter date fo birth');
            $('#age').val('');
            dobValidationFlag = false;
        }
        var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (dateValue.length === 2)
        {
            if (dateValue <= 31 && dateValue >= 1) {
                dateValue = dateValue + "/";
                $('#dob').val(dateValue);
            } else {
                $('#dob').val("");
                alert('Day should be valid');
                dobValidationFlag = false;
            }
        } else if (dateValue.length === 5)
        {
            var splitval = dateValue.split('/');
            if (splitval[1] <= 12 && splitval[1] >= 1)
            {
                var dateVal = dateValue + "/";
                $('#dob').val(dateVal);
            } else {
                $('#dob').val(splitval[0] + "/");
                alert('Month should be valid');
                dobValidationFlag = false;
            }
            if (splitval[1] == 1 || splitval[1] > 2)
            {
                if (splitval[0] > ListofDays[splitval[1] - 1])
                {
                    $('#dob').val(splitval[0] + "/");
                    alert('Month should be valid');
                    dobValidationFlag = false;
                    $('#dob').focus();
                }
            }
        } else if (dateValue.length == 10)
        {
            var splitval = dateValue.split('/');
            var year = splitval[2];
            if (!(splitval[0] <= 31 && splitval[0] >= 1 && splitval[1] <= 12 && splitval[1] >= 1)) {
                $('#dob').val('');
                $('#age').val('');
                alert("Please enter valid date");
                dobValidationFlag = false;
                $('#dob').focus();
                return false;
            } else if (splitval[1] == 1 || splitval[1] > 2)
            {
                if (splitval[0] > ListofDays[splitval[1] - 1])
                {
//                    $('#dob').val(splitval[0] + "/");
                    $('#dob').val("");
                    alert('Month should be valid');
                    dobValidationFlag = false;
                    $('#dob').focus();
                    $('#age').val("");
                    return false;
                }
            }
            var today = new Date();
            var curr_year = today.getFullYear();
            if (curr_year < year) {
                $('#dob').val("");
                $('#age').val("");
                alert('Year should be less than current year');
                dobValidationFlag = false;
                return false;
            } else {
//leap year
                if (year % 4 == 0) {
                    if (splitval[1] == 02) {
                        var splitval_date = dateValue.split('/');
                        if (splitval_date[0] <= 29 && splitval_date[0] >= 1) {
                            var month = $('#dob').val(dateValue);
                        } else {
                            $('#dob').val("");
                            $('#age').val("");
                            alert('Day should be valid');
                            dobValidationFlag = false;
                        }
                    } else {
                        var month = $('#dob').val(dateValue);
                    }

                } else { //non leap year
                    if (splitval[1] == 02) {//feb
                        var splitval_date = dateValue.split('/');
                        if (splitval_date[0] <= 28 && splitval_date[0] >= 1) {
                            var month = $('#dob').val(dateValue);
                        } else {
                            $('#dob').val("");
                            $('#cust_age').val("");
                            alert('Please enter valid Date of Birth');
                            dobValidationFlag = false;
                        }
                    } else {
                        var month = $('#dob').val(dateValue);
                    }
                }
            }
        } else if (dateValue.length > 10) {
            var splitval = dateValue.split('/');
            $('#dob').val(splitval[0] + "/" + splitval[1] + "/");
            alert('Please enter valid year');
            dobValidationFlag = false;
        }
    } catch (e) {
//        alert("JS Log(FMS_ekyc_Validation.js):::::Exception in dateFormatter:::::::" + e);
    }

}
function getAge(birth) {
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
//        alert("JS Log(FMS_kycCaf.js):::::Exception in getAge:::::::" + e);
    }
}
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
function setpoiAuthority() {
    var poi = $("#poi_type").val();
    $("#poi_issuing_auth").val(poi).attr('disabled', 'disabled');
    $("#poi_number").val('');
    $("#poi_issue_place").val('');
    $("#poi_issue_date").val('').prop('disabled', false);
//    $("#poi_issue_place").val('');
    $('#poiDateNotFnd').prop('checked', false).prop('disabled', false);
    // var samecheck = newFormMem.getProperty("poi_same_check");

    // alert(samecheck);
    //if (!samecheck == "true") {
    $("#check_poi_samesession").val("false");
//    $("#poa_issuing_auth").val("0");
    $("#poa_type").val("0");
    $("#poa_number").val('');
    $("#poa_issue_place").val('');
    $("#poa_issue_date").val('').prop('disabled', false);
//    $("#poi_issue_place").val('');
    $('#poaDateNotFnd').prop('checked', false).prop('disabled', false);
    $('#check_poi_same').prop('checked', false);



    var kycpageStatus = $("#kycpageStatus").val();
    if (kycpageStatus == "2") {
        console.log("deleting poikyc caf ")
        deleteImage("POI");
    }

    // }
}
function setpoiAuthorityback() {
    var poi = $("#poi_type").val();
    $("#poi_issuing_auth").val(poi).attr('disabled', 'disabled');
    $("#poi_number").val('');
    $("#poi_issue_place").val('');
    $("#poi_issue_date").val('');
//    $("#poi_issue_place").val('');
    $('#poiDateNotFnd').prop('checked', false).prop('disabled', false);
}
function setpoaAuthority() {
    var poi = $("#poi_type").val();
    var poa = $("#poa_type").val();
    try {
        // alert(poa);
        // alert(poi);
//        if (poa == poi) {
//            document.getElementById('check_poi_same').checked = true;
//           
//            var poa = $("#poa_type").val();
//            var poi_type = $("#poi_type").val();
//            var poiIssueDate = $('#poi_issue_date').val();
//            var poi_number = $('#poi_number').val();
//            var poi_issue_place = $('#poi_issue_place').val();
//            var poi_issuing_auth = $('#poi_issuing_auth').val();
//            if (poiIssueDate === '' || poi_number === '' || poi_issue_place === '' || poi_issuing_auth === '' || poi_issuing_auth === '0')
//            {
//                alert('please fill all poi values.');
////        $('#check_poi_same').prop('checked', false);
//                $("#poa_type").val("");
//                $("#poa_issuing_auth").val(poa).attr('disabled', 'disabled');
//                $("#poa_number").val('').removeAttr('readonly');
//                $("#poa_issue_date").val('').removeAttr('disabled');
//                $("#poa_issue_place").val('').removeAttr('readonly');
//                $('#poaDateNotFnd').prop('checked', false).prop('disabled', false);
//                newFormMem.setProperty("poi_same_check", "false");
//
//                document.getElementById('check_poi_same').checked = false;
//
//                return false;
//            }
//            if (poi_type == "11" || poi_type == "12" || poi_type == "25" || poi_type == "2" || poi_type == "24" || poi_type == "22" || poi_type == "10" || poi_type == "19" || poi_type == "21" || poi_type == "6" || poi_type == "23" || poi_type == "4") {
//                //  alert(poiIssueDate);
//                //  alert(poi_number);
//                try {
//                    $('#poa_issue_date').val(poiIssueDate).attr('readonly', 'readonly');
//                    $('#poa_number').val(poi_number).attr('readonly', 'readonly');
//                    $('#poa_issue_place').val(poi_issue_place).attr('readonly', 'readonly');
//                    $('#poa_issuing_auth').val(poi_issuing_auth).attr('disabled', 'disabled');
//                    // $('#poa_type').val(poi_type).attr('disabled', 'disabled');
//                    if ($('#poiDateNotFnd').is(":checked")) {
//                        $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
//                    } else {
//                        $('#poaDateNotFnd').prop('checked', false).attr('disabled', 'disabled');
//                    }
//                    document.getElementById('check_poi_same').checked = true;
//                } catch (e) {
//                    alert(e);
//                }
//                newFormMem.setProperty("poi_same_check", "true");
//            } else {
//                // alert('This POI type is not considered as POA');
//                //  $(this).prop('checked', false);
//                $("#poa_issuing_auth").val(poa).attr('disabled', 'disabled');
//                $("#poa_number").val('').removeAttr('readonly');
//                $("#poa_issue_date").val('').removeAttr('disabled');
//                $("#poa_issue_place").val('').removeAttr('readonly');
//                $('#poaDateNotFnd').prop('checked', false).prop('disabled', false);
//                newFormMem.setProperty("poi_same_check", "false");
//                document.getElementById('check_poi_same').checked = false;
//            }
//        } else {
//            newFormMem.setProperty("poi_same_check", "false");
//            $("#poa_issuing_auth").val(poa).attr('disabled', 'disabled');
//            $("#poa_number").val('').removeAttr('readonly');
//            $("#poa_issue_date").val('').removeAttr('readonly');
//            $("#poa_issue_place").val('').removeAttr('readonly');
//            $('#poaDateNotFnd').prop('checked', false).prop('disabled', false);
//            document.getElementById('check_poi_same').checked = false;
//        }
        if (poa == poi) {
            document.getElementById('check_poi_same').checked = true;
            poiDetailsSameChk();
        } else {
            $("#poa_issuing_auth").val(poa).attr('disabled', 'disabled');
            $("#poa_number").val('').removeAttr('readonly');
            $("#poa_issue_date").val('').removeAttr('readonly');
            $("#poa_issue_place").val('').removeAttr('readonly');
            $('#poaDateNotFnd').prop('checked', false).prop('disabled', false);
            document.getElementById('check_poi_same').checked = false;
            $('#poi_same_chk').val("false");
//            newFormMem.setProperty("poi_same_chk", "false");
        }
        var kycpageStatus = $("#kycpageStatus").val();
        if (kycpageStatus == "2") {
            console.log("deleting poa kyc caf ")
            deleteImage("POA");
        }

    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::exception in setpoaAuthority ' + e);
        //alert(e);
    }




}


function deleteImage(imageId) {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.imageId = imageId;
    $.ajax({
        url: "fmsdeleteAttachment.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            //sessionCheck(data);(data);
            var res = JSON.parse(JSON.stringify(data.response.responseData));

        }, error: function (data) {

        }
    });
}

function poiDateNotFndFun() {
    try {
        if (document.getElementById('poiDateNotFnd').checked) {

            if ($('#poi_type').val() == "" || $('#poi_type').val() == "0") {
                alert("Please select poi type");
                document.getElementById('poiDateNotFnd').checked = false;
                $('#poa_issue_date').val('');
                return false;
            }

            $('#poi_issue_date').val('01/01/1900').attr('readonly', 'readonly');
//            var samecheck = newFormMem.getProperty("poi_same_check");
            var samecheck = $('#poi_same_check').val();
            if (samecheck == "true") {
                if ($('#poiDateNotFnd').is(":checked")) {
                    $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
                    $('#poa_issue_date').val('01/01/1900').attr('readonly', 'readonly');
                }

            }

        } else {
            var samecheck = $('#poi_same_check').val();
            if (samecheck == "true") {
                if ($('#poiDateNotFnd').is(":checked")) {
                    $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
                    $('#poa_issue_date').val($('#poi_issue_date').val());
                } else {
                    $('#poa_issue_date').val("");
                    $('#poaDateNotFnd').prop('checked', false);
                }
            }
            $('#poi_issue_date').val('');
            $('#poiDateNotFnd').prop('checked', false);
            $('#poi_issue_date').removeAttr('readonly');
        }
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::exception while check poidate not found ' + e);
    }
}
function poaDateNotFndFun() {
    try {
        if (document.getElementById('poaDateNotFnd').checked) {
            if ($('#poa_type').val() == "" || $('#poa_type').val() == "0") {
                alert("Please select poa type");
                $('#poa_issue_date').val('');
                document.getElementById('poaDateNotFnd').checked = false;
                return false;
            }

            $('#poa_issue_date').val('01/01/1900').attr('readonly', 'readonly');
        } else {
            $('#poa_issue_date').val('');
            $('#poaDateNotFnd').prop('checked', false);
            $('#poa_issue_date').removeAttr('readonly');
        }
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::exception while check poa date not found' + e);
    }
}
function checksameValues() {
    if (document.getElementById('addr_same_check').checked) {
        try {
            try {
                var inst_addr_hno = $('#inst_addr_hno').val();
                var inst_addr_vill = $('#inst_addr_vill').val();
                var inst_addr_city = $('#inst_addr_city').val();
                var inst_addr_state = $('#inst_addr_state').val();
                var inst_addr_district = $('#inst_addr_district').val();
                var inst_main_locality = $('#inst_main_locality').val();
                var inst_sub_locality = $('#inst_sub_locality').val();
                var inst_exchange_code = $('#inst_exchange_code').val();
                var INSTAL_ADDR_PINCODE = $('#INSTAL_ADDR_PINCODE').val();
                var INSTAL_GST_STATE_CODE = '';
                var inst_category = $('#inst_category').val();
            } catch (e) {
//                alert('JS Log(FMS_kycCaf.js)::::::::::::exception while getting addr_same_check data' + e);
            }

            try {
                if (inst_addr_hno == '' || inst_addr_vill == '' || inst_addr_city == '' || inst_addr_state == '0' || inst_addr_district == '0' || inst_main_locality == '0' || inst_sub_locality == '0' || inst_exchange_code == '0' || inst_main_locality == '' || inst_sub_locality == '' || inst_exchange_code == '' || INSTAL_GST_STATE_CODE == '0' || inst_main_locality == null || inst_sub_locality == null || inst_exchange_code == null || INSTAL_ADDR_PINCODE == '' || inst_category == '') {
                    alert('Please enter installation address first.')
                    document.getElementById('addr_same_check').checked = false;
                } else {
//$('#bill_addr_house_no').val(inst_addr_hno);
                    $('#bill_addr_house_no').val(inst_addr_hno).attr('readonly', 'readonly');
                    $('#bill_addr_vill').val(inst_addr_vill).attr('readonly', 'readonly');
//                    $('#bill_addr_state').val(inst_addr_state).attr('readonly', 'readonly');
                    $('#bill_addr_city').val(inst_addr_city).attr('readonly', 'readonly');
//                    $('#bill_addr_district').val(inst_addr_district).attr('readonly', 'readonly');
                    $('#BILL_ADDR_PINCODE').val(INSTAL_ADDR_PINCODE).attr('readonly', 'readonly');
                    $('#bill_category').val(inst_category).attr('readonly', 'readonly');
//                $('#bill_addr_vill').val(inst_addr_vill);
//                $('#bill_addr_state').val(inst_addr_state);
                    //                $('#bill_addr_city').val(inst_addr_city);
                    //                $('#bill_addr_district').val(inst_addr_district);
                    $('#bill_addr_state').children().remove();
                    $('#bill_addr_state').append(new Option($('#inst_addr_state option:selected').text(), inst_addr_state));
                    $('#bill_addr_state').attr('readonly', 'readonly');
                    $('#bill_addr_district').children().remove();
                    $('#bill_addr_district').append(new Option($('#inst_addr_district option:selected').text(), inst_addr_district));
                    $('#bill_addr_district').attr('readonly', 'readonly');
                    $('#bill_main_locality').children().remove();
                    $('#bill_main_locality').append(new Option($('#inst_main_locality option:selected').text(), inst_main_locality));
                    $('#bill_main_locality').attr('readonly', 'readonly');
                    $('#bill_sub_locality').children().remove();
                    $('#bill_sub_locality').append(new Option($('#inst_sub_locality option:selected').text(), inst_sub_locality));
                    $('#bill_sub_locality').attr('readonly', 'readonly');
                    $('#bill_exchange_code').children().remove();
                    $('#bill_exchange_code').append(new Option($('#inst_exchange_code option:selected').text(), inst_exchange_code));
                    $('#bill_exchange_code').attr('readonly', 'readonly');
//                    $('#BILL_GST_STATE_CODE').children().remove();
//                    $('#BILL_GST_STATE_CODE').append(new Option($('#INST_GST_STATE_CODE option:selected').text(), INSTAL_GST_STATE_CODE));
//                    $('#BILL_GST_STATE_CODE').attr('readonly', 'readonly');
                    $("#bill_main_locality").kendoDropDownList({
                        filter: "contains"
                    });
                    $("#bill_sub_locality").kendoDropDownList({
                        filter: "contains"
                    });
                }
            } catch (e) {
//                alert('JS Log(FMS_kycCaf.js)::::::::::::exception while setting  addr_same_check data' + e);
            }
        } catch (e) {
//            alert('JS Log(FMS_kycCaf.js)::::::::::::exception while in addr_same_check' + e);
        }
    } else {
        $('#bill_main_locality').children().remove();
        $('#bill_sub_locality').children().remove();
        $('#bill_exchange_code').children().remove();
        $('#bill_addr_state').children().remove();
        $('#bill_addr_district').children().remove();
        $('#bill_addr_house_no').val('');
        $('#bill_addr_vill').val('');
//        $('#bill_addr_state').val('');
        $('#bill_addr_city').val('');
//        $('#bill_addr_district').val('')
        $('#BILL_ADDR_PINCODE').val('');
        $('#bill_category').val('');
        $('#bill_addr_house_no').removeAttr('readonly');
        $('#bill_addr_vill').removeAttr('readonly');
        $('#bill_addr_state').removeAttr('readonly');
        $('#bill_addr_city').removeAttr('readonly');
        $('#bill_addr_district').removeAttr('readonly');
        $('#bill_main_locality').removeAttr('readonly');
        $('#bill_sub_locality').removeAttr('readonly');
        $('#bill_exchange_code').removeAttr('readonly');
//        $('#BILL_GST_STATE_CODE').removeAttr('readonly');
        try {
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.type = "FMSKYC";
            $.ajax({
                url: "statesLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                alert("statesLoading  " + JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableStatesJOBJ = {};
                    availableStatesJOBJ = availablestaesLoading;
                    if (availableStatesJOBJ.STATUS === 0 || availableStatesJOBJ.STATUS === '0') {
                        var availStatesarr = availableStatesJOBJ.STATES;
                        $('#bill_addr_district').children().remove();
                        $('#bill_addr_state').children().remove();
                        $('#bill_addr_state').append('<option value="0">Select from list</option>');
                        $(availStatesarr).each(function (index) {
                            $('#bill_addr_state').append(new Option(availStatesarr[index].DD_VALUE, availStatesarr[index].DD_CODE));
                        });
                        $("#bill_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        $("#bill_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }
                }, error: function (data) {
                    alert("error : uploadForms" + JSON.stringify(data));
                }
            });
        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading states  in chack as same addr :::::" + e);
        }
    }
}
function setTitlePreCommuni(targetID) {//use
    try {
        for (var j = 0; j < targetID.length; j++) {
            var dropID = targetID[j];

//            console.log("metaDataValidation" + JSON.stringify(metaDataValidation));
            var objIdvlMetaData = metaDataValidation[dropID];
            var name = objIdvlMetaData.NAME;
            var DD_OPTIONS = objIdvlMetaData.DD_OPTIONS;
            $('#' + name).children().remove();
            $('#' + name).append('<option id="" value="0">Select from list</option>');
            $('#' + name).append(DD_OPTIONS);
        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in setTitlePreCommuni loading:::::" + e);
    }
}

//showing data to user in preview page
function setKYCPreviewData() {
    var FMS_KYC_Cust_Data = $("#FMS_KYC_Cust_Data").val();
    var CustmrData = JSON.parse(FMS_KYC_Cust_Data);
    try {
        var cust_title = CustmrData.cust_title_ecaf;
        $("#pre_cust_tilte").text(cust_title);
    } catch (e) {
    }
    try {
        var cust_last_name = CustmrData.cust_last_name;
        $("#pre_cust_last_name").text(cust_last_name);
    } catch (e) {
    }
    try {
        var first_name = CustmrData.first_name;
        $("#pre_first_name").text(first_name);
    } catch (e) {
    }
    try {
        var f_h_name = CustmrData.f_h_name;
        $("#pre_f_h_name").text(f_h_name);
    } catch (e) {
    }
    try {
        var gender = CustmrData.gender;
        if (gender == "1") {
            $("#pre_gender").text("Female");
        } else if (gender == "2") {
            $("#pre_gender").text("Male");
        } else if (gender == "3") {
            $("#pre_gender").text("Other");
        }
    } catch (e) {
    }
    try {
        var dob = CustmrData.dob;
        $("#pre_dob").text(dob);
    } catch (e) {
    }
    try {
        var age = CustmrData.age;
        $("#pre_age").text(age);
    } catch (e) {
    }
    try {
        var nationality = CustmrData.nationality;
        $("#pre_nationality").text(nationality);
    } catch (e) {
    }
    try {
        var customer_type = CustmrData.customer_type_ecaf;
        $("#pre_customer_type").text(customer_type);
    } catch (e) {
    }
    try {
        var cust_usage_code = CustmrData.cust_usage_code_ecaf;
        $("#pre_usage_code").text(cust_usage_code);
    } catch (e) {
    }
    try {
        var cust_pre_type = CustmrData.cust_pre_type_ecaf;
        $("#pre_cust_pre_type").text(cust_pre_type);
    } catch (e) {
    }
    try {
        var cust_pref_comm = CustmrData.cust_pref_comm_ecaf;
        $("#pre_cust_pref_comm").text(cust_pref_comm);
        if (CustmrData.cust_pref_comm == '3') {
            $("#pre_label").text(cust_pref_comm);
            $("#pre_cust_home_no").text(CustmrData.cust_home_no);
        } else if (CustmrData.cust_pref_comm == '4') {
            $("#pre_label").text(cust_pref_comm);
            $("#pre_cust_home_no").text(CustmrData.cust_work_no);
        } else if (CustmrData.cust_pref_comm == '6') {
            $("#pre_label").text('Fax no.');
            $("#pre_cust_home_no").text(CustmrData.fax_no);
        } else {
            $("#pre_label").text("");
            $("#pre_cust_home_no").text("");
        }
    } catch (e) {
    }

//Customer contact details

    try {
        var cust_mobile_no = CustmrData.cust_mobile_no;
        $("#pre_cust_mobile_no").text(cust_mobile_no);
    } catch (e) {
    }
    try {
        var cust_email = CustmrData.email;
        $("#pre_email").text(cust_email);
    } catch (e) {
    }
}

function  setKYCReceiptData() {
    try {    
        $('#wait').show();
        setTimeout(function(){
        var paymentTxnResp = paymentData;//$('#PAYMENT_TXN').val();
        if (paymentTxnResp != "{}") {
            paymentTxnResp = JSON.parse(paymentTxnResp);
            $("#divWings").modal('show');
            $('#wl_job_upload_msg').append("Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest," + "<span class='redtxt'><b>Kindly make a note of the Registration No for future correspondence " + paymentTxnResp.CAF_NO + "<br>  Payment Ref No: " + paymentTxnResp.PORTAL_TXN_ID + "</b> </b></span>");
            try {
                $("#date_of_application").text(paymentTxnResp.DATE_ALLOTMENT); //DATE_TIME
            } catch (e) {
            }
            try {
                $("#caf_serial_no").text(paymentTxnResp.CAF_NO);
            } catch (e) {
            }
            try {
                $("#connection_applied").text(paymentTxnResp.CONN_APPLIED);
            } catch (e) {
            }
            try {
                $("#selected_mob_no").text(paymentTxnResp.SERVICE_NUMBER);
            } catch (e) {
            }
            try {
                if(paymentTxnResp.BANK_NAME==""){
                  $("#bnk_name").text('N/A');  
                }else{
                $("#bnk_name").text(paymentTxnResp.BANK_NAME);
            }
            } catch (e) {
            }
            try {
                if(paymentTxnResp.PORTAL_TXN_ID==""){
                   $("#portal_txn_id").text('N/A'); 
                }else{
                $("#portal_txn_id").text(paymentTxnResp.PORTAL_TXN_ID);
            }
            } catch (e) {
            }

            try {
                $("#txn_status").text(paymentTxnResp.TXN_STATUS);
            } catch (e) {
            }
            try {
                if(paymentTxnResp.PAYMENT_TIME ==""){
                    $("#pymt_date").text('N/A');
                }else{
                $("#pymt_date").text(paymentTxnResp.PAYMENT_TIME);
            }
            } catch (e) {
            }
            try {
                if(paymentTxnResp.TARIFF_PLAN_ID ==""){
                    $("#tariff_plan_id").text('N/A');
                }else{
                $("#tariff_plan_id").text(paymentTxnResp.TARIFF_PLAN_ID);
            }
            } catch (e) {
            }
            try {
                $("#cust_name").text(paymentTxnResp.CUST_NAME);
            } catch (e) {
            }
            try {
                $("#cust_address").text(paymentTxnResp.UID_CUST_ADDR);
            } catch (e) {
            }
            try {
                $("#ack_email").text(paymentTxnResp.EMAIL);
            } catch (e) {
            }
            try {
                $("#cust_mobile_no").text(paymentTxnResp.CUST_MOBILE_NO);
            } catch (e) {
            }
            try {
                $("#tariff_amount").text('Rs. '+paymentTxnResp.TARIFF_PLAN_AMOUNT);
            } catch (e) {
            }
            try {
                $("#wings_scheme_amt").text('Rs. '+paymentTxnResp.SCHEME_AMOUNT);
            } catch (e) {
            }
            try {
                $("#wings_scheme").text(paymentTxnResp.WINGS_SCHEME_NAME);
            } catch (e) {
            }
            try {
                var ir_Amt_disp=0;
                if(paymentTxnResp.WINGS_IR =='1'){
                   ir_Amt_disp='Rs.'+irAmt;  
                }else{
                  ir_Amt_disp='N/A'  
                }
                $("#ir_amt").text(ir_Amt_disp);
            } catch (e) {
            }
            try {
                var isd_Amt_disp=0;
                if(paymentTxnResp.WINGS_ISD =='1'){
                  isd_Amt_disp='Rs.'+isdAmt;  
                }else{
                  isd_Amt_disp='N/A'  
                }
                $("#isd_amt").text(isd_Amt_disp);
            } catch (e) {
            }
                try {
                    var totalAmount=0;
                   totalAmount=totalAmount+ Number(paymentTxnResp.TARIFF_PLAN_AMOUNT);
                   totalAmount = totalAmount+Number(paymentTxnResp.SCHEME_AMOUNT)
                   if(paymentTxnResp.WINGS_IR =='1'){
                     totalAmount=totalAmount+ irAmt;   
                   } if(paymentTxnResp.WINGS_ISD =='1'){
                      totalAmount=totalAmount+ isdAmt; 
                   } 
                   $('#amount').text('Rs.'+totalAmount);
                } catch (e) {
                }
                if(paymentTxnResp.TXN_STATUS == 'TRAIL') {
                     $('#amount').text('Rs.0');
                     $("#isd_amt").text('Rs.0');
                     $("#ir_amt").text('Rs.0');
                }
        } else {
            alert(alrtTransDtlsEmpty);
            $('#wait').hide();
        }
        $('#wait').hide();
        },1000);
    } catch (e) {
    } 
    
}

function  setRegReceiptData() {
    try {
       $('#wait').show();
        setTimeout(function(){
        var paymentTxnResp = paymentData;
        if (paymentTxnResp != "") {
            paymentTxnResp = JSON.parse(paymentTxnResp);
            $("#divWings").modal('show');
            $('#wl_job_upload_msg').append("Thank you for the interest shown in availing WINGS connection. Our team will get in touch with you at the earliest," + "<span class='redtxt'><b>Kindly make a note of the Registration No for future correspondence " + paymentTxnResp.CAF_NO + "<br>  Payment Ref No: " + paymentTxnResp.PORTAL_TXN_ID + "</b> </b></span>");
            try {
                $("#date_of_application").text(paymentTxnResp.DATE_ALLOTMENT); //DATE_TIME
            } catch (e) {
            }
            try {
                $("#caf_serial_no").text(paymentTxnResp.CAF_NO);
            } catch (e) {
            }
//            try {
//                $("#connection_applied").text(paymentTxnResp.CONN_APPLIED);
//            } catch (e) {
//            }
//            try {
//                $("#selected_mob_no").text(paymentTxnResp.SERVICE_NUMBER);
//            } catch (e) {
//            }
            try {
                if(paymentTxnResp.BANK_NAME==""){
                  $("#bnk_name").text('N/A');  
                }else{
                $("#bnk_name").text(paymentTxnResp.BANK_NAME);
            }
            } catch (e) {
            }
            try {
                $("#portal_txn_id").text(paymentTxnResp.PORTAL_TXN_ID);
            } catch (e) {
            }
            try {
                if(paymentTxnResp.AMOUNT==""){
                    $("#amount").text('0');
                }else{
                $("#amount").text(paymentTxnResp.AMOUNT);
            }
            } catch (e) {
            }
            try {
                $("#txn_status").text(paymentTxnResp.TXN_STATUS);
            } catch (e) {
            }
            try {
                $("#pymt_date").text(paymentTxnResp.PAYMENT_TIME);
            } catch (e) {
            }
            try {
                $("#cust_name").text(paymentTxnResp.CUST_NAME);
            } catch (e) {
            }
//            try {
//                $("#cust_address").text(paymentTxnResp.UID_CUST_ADDR);
//            } catch (e) {
//            }
        } else {
            alert(alrtRegTransDtlsEmpty);
             $('#wait').hide();
        }
        $('#wait').hide();
        },1000);
    } catch (e) {
    }
}

function setMetaDataForValidationFMS() {
//    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::starting of setMetaDataForValidationFMS');
    try {
        var formfieldData = {};
        var formfieldData1 = $("#kycformFieldsMetaData").val();
//        alert(formfieldData1);
        formfieldData = JSON.parse(formfieldData1);
        metaDataValidation = formfieldData;
    } catch (e) {
//        alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in  setMetaDataForValidationFMS' + e);
    }
//    alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Ending of setMetaDataForValidationFMS');
}

function backtoData() {
    try {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Starting of backtoData");
        var billaccType = $('#bill_acc_type').val();
        if (billaccType == "") {
//alert("Please select bill account type");
            return false;
        }
//        var availbillaccType = FMSnewFormMem.fetchbillingSubTypes(billaccType);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.billAccType = billaccType;
        reqData.type = "FMSKYC";
        $.ajax({
            url: "fetchbillingSubTypes.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availbillaccTypeJOBJ = {};
                availbillaccTypeJOBJ = availablestaesLoading;
                if (availbillaccTypeJOBJ.STATUS === "0") {
                    var availbillaccTypearr = availbillaccTypeJOBJ.SUB_BILLING_TYPES;
                    $('#bill_acc_sub_type').children().remove();
                    $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
                    $(availbillaccTypearr).each(function (index) {
                        $('#bill_acc_sub_type').append(new Option(availbillaccTypearr[index].DD_VALUE, availbillaccTypearr[index].DD_CODE));
                    });
                } else {
                    $('#bill_acc_type').val("");
                }
            }, error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }
        });
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub types loading:::::" + e);
    }
}
function setbackdata() {
    try {
//var isBack =$('#kycpageStatus').val();
//            alert("isBack"+isBack);
//            if(!(isBack =='undefined')){
//                alert("not undefined");
//            }else{
//                alert("un defined")
//            }
//        var backflag = $("#CafsetValues").val();
//        alert("nndkd"+backflag);
//        if (backflag == "1") {
            var AdharRes = $('#FMS_KYC_Cust_Data').val();
            var CustmrData = JSON.parse(AdharRes);
            for (var j in CustmrData) {
                try {
                    var sub_key = j;
//                    var sub_val = CustmrData[j];
//                    if (sub_key == 'addr_same_check') {
//                        if (CustmrData[sub_key] == 'true') {
//                            document.getElementById(sub_key).checked = true;
//                            checksameValues();
//                        } else {
//                            document.getElementById(sub_key).checked = false;
//                        }
//                    } else if (sub_key == 'check_poi_same') {
//                        if (CustmrData[sub_key] == 'true') {
//                            document.getElementById(sub_key).checked = true;
//                            poiDetailsSameChk();
//                        } else {
//                            document.getElementById(sub_key).checked = false;
//                        }
//                    } else if (sub_key == 'poiDateNotFnd') {
//                        if (CustmrData[sub_key] == 'true') {
//                            document.getElementById(sub_key).checked = true;
//                            poiDateNotFndFun();
//                        } else {
//                            document.getElementById(sub_key).checked = false;
//                        }
//                    } else if (sub_key == 'poaDateNotFnd') {
//                        if (CustmrData[sub_key] == 'true') {
//                            document.getElementById(sub_key).checked = true;
////                    poiDateNotFndFun();
//                            $('#poa_issue_date').val('01/01/1900').attr('readonly', 'readonly');
//                        } else {
//                            document.getElementById(sub_key).checked = false;
//                        }
//                    } else if (sub_key == 'poi_type') {
//                        $('#' + sub_key).val(CustmrData[sub_key]);
//                        setpoiAuthorityback();
//                    } else if (sub_key == 'poa_type') {
//                        $('#' + sub_key).val(CustmrData[sub_key]);
//                        setpoaAuthority();
//                    }
                     if (sub_key == 'gender') {
                        if (CustmrData[sub_key] == '1') {
                            document.getElementsByName('gender')[1].checked = true;
                        } else if (CustmrData[sub_key] == '2') {
                            document.getElementsByName('gender')[0].checked = true;
                        } else if (CustmrData[sub_key] == '3') {
                            document.getElementsByName('gender')[2].checked = true;
                        }
                    } 
//                    else if (sub_key == 'cust_pref_comm') {
//                        try {
//                            $('#' + sub_key).val(CustmrData[sub_key]);
////                        alert("123" + CustmrData[sub_key]);
//                            if (CustmrData[sub_key] == '3') {
////                            $('#pre_label').text("6a." + CustmrData['cust_pref_comm_ecaf']);
//                                $('#pre_label').html("<span class='bold'>" + "6a. </span>" + CustmrData['cust_pref_comm_ecaf']);
//                                $('#cust_pre_no').val(CustmrData['cust_home_no']);
//                                $('#divWork').show();
//                            } else if (CustmrData[sub_key] == '4') {
////                            $('#pre_label').text("6a." + CustmrData['cust_pref_comm_ecaf']);
//                                $('#pre_label').html("<span class='bold'>" + "6a. </span>" + CustmrData['cust_pref_comm_ecaf']);
//                                $('#cust_pre_no').val(CustmrData['cust_work_no']);
//                                $('#divWork').show();
//                            } else if (CustmrData[sub_key] == '6') {
////                            $('#pre_label').text("6a." + CustmrData['cust_pref_comm_ecaf']);
//                                $('#pre_label').html("<span class='bold'>" + "6a. </span>" + CustmrData['cust_pref_comm_ecaf'] + "<font color='red'>*</font>");
//                                $('#cust_pre_no').val(CustmrData['fax_no']);
//                                $('#divWork').show();
//                            }
//                        } catch (e) {
////                            alert(e);
//                        }
//                    } else {
//                        try {
//
//                            if (sub_key == "inst_addr_state") {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                                instAddrDistrict();
//                            } else if (sub_key == "inst_addr_district") {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                                instaldistrictLaoding();
//                            }
//                            if (sub_key == "bill_acc_type") {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                                backtoData();
//                            } else
//                            if (sub_key === "inst_main_locality") {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                                instalmainlocalityload(CustmrData[sub_key]);
//                                $("#inst_main_locality").kendoDropDownList({
//                                    filter: "contains"
//                                });
//                            } else
//                            if (sub_key == "inst_sub_locality") {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                                instsublocatilyload();
//                            }
//                            if (sub_key == "INST_GST_STATE_CODE") {
//                                instGSTCodesload();
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//
//                            }
//                            if (sub_key == "bill_addr_state") {
//                                if (CustmrData['addr_same_check'] == 'true') {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billAddrDistrict();
//                                } else {
                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billAddrDistrict();
//                                }
//
//                            } else if (sub_key == "bill_addr_district") {
//                                if (CustmrData['addr_same_check'] == 'true') {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billdistrictLaoding();
//                                } else {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billdistrictLaoding();
//                                }
//                            }
//                            if (sub_key == "bill_main_locality") {
//
//                                if (CustmrData['addr_same_check'] == 'true') {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billmainlocalityload();
//                                } else {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billmainlocalityload();
//                                    $("#bill_main_locality").kendoDropDownList({
//                                        filter: "contains"
//                                    });
//                                }
//                            } else
//                            if (sub_key == "bill_sub_locality") {
//                                if (CustmrData['addr_same_check'] == 'true') {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billsublocatilyload();
//                                } else {
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                    billsublocatilyload();
//                                }
//                            } else {
//                                $('#' + sub_key).val(CustmrData[sub_key]);
//                            }
//
//                            if (sub_key == "BILL_GST_STATE_CODE") {
//                                if (CustmrData['addr_same_check'] == 'true') {
//                                    billGSTCodesload();
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                } else {
//                                    billGSTCodesload();
//                                    $('#' + sub_key).val(CustmrData[sub_key]);
//                                }
//                            }
//                        } catch (e) {
////alert(e);
//                        }
//                    }
//setting label for bill email label based on  bill media drop down
//                    if (CustmrData['bill_media'] === '1') {
//                        document.getElementById("bill_email_label").style.display = "block";
//                        document.getElementById("bill_email_text").style.display = "block";
//                    } else {
//                        document.getElementById("bill_email_label").style.display = "none";
//                        document.getElementById("bill_email_text").style.display = "none";
//                    }
                } catch (e) {
//                    alert("JS Log(FMS_kycCaf.js):::::::::::Exception in setbackdata:::::" + e);
                }
            }
//        } else {
//        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in setbackdata:::::" + e);
    }
}

function validatekycCaf() {
   
    try {
        var objCustData = {};
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
                if (target == "gender1") {
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
//        alert(e)
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
                } 
//                else if (target == "cust_home_no") {
//
//                    try {
//                        var targetVal = $('#cust_pref_comm').val();
//                        if (!(MANDATORY == 'N')) {
//                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
//                                alert(dispName + '  should be mandatory.')
//                                try {
//                                    parent.$('#wait').hide();
//                                } catch (e) {
////        alert(e)
//                                }
//                                return false;
//                            } else if (targetVal == '3') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#cust_pre_no').val('');
//                                    $('#cust_pre_no').focus().css('border-color', 'red');
//                                    alert('Home phone should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//                                    objCustData["cust_home_no"] = targetv;
//                                    $('#' + target).focus().css('border-color', 'green');
//                                }
//
//                            } else {
//
//                                objCustData["cust_home_no"] = "";
//                            }
//                        } else {
//                            if (targetVal == '3') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#cust_pre_no').val('');
//                                    $('#cust_pre_no').focus().css('border-color', 'red');
//                                    alert('Home phone should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//                                    objCustData["cust_home_no"] = targetv;
//                                    $('#' + target).focus().css('border-color', 'green');
//                                }
//
//                            } else {
//
//                                objCustData["cust_home_no"] = "";
//                            }
//
//                        }
//
//                    } catch (e) {
////                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);
//                    }
//
//                }
//                else if (target == "cust_work_no") {
//
//                    try {
//                        var targetVal = $('#cust_pref_comm').val();
//                        if (!(MANDATORY == 'N')) {
//
//                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
//                                alert(dispName + '  should be mandatory.')
//                                try {
//                                    parent.$('#wait').hide();
//                                } catch (e) {
////        alert(e)
//                                }
//                                return false;
//                            } else if (targetVal == '4') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#' + target).val('');
//                                    $('#' + target).focus().css('border-color', 'red');
//                                    alert('Work phone should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//
//                                    objCustData["cust_work_no"] = targetv;
//                                }
//
//                            } else {
//
//                                objCustData["cust_work_no"] = "";
//                            }
//
//                        } else {
//                            if (targetVal == '4') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#cust_pre_no').val('');
//                                    $('#cust_pre_no').focus().css('border-color', 'red');
//                                    alert('Work phone should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//                                    objCustData["cust_work_no"] = targetv;
//                                    $('#' + target).focus().css('border-color', 'green');
//                                }
//
//                            } else {
//
//                                objCustData["cust_work_no"] = "";
//                            }
//
//                        }
//
//                    } catch (e) {
////                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);
//                    }
//
//                } else if (target == "fax_no") {
//
//                    try {
//                        var targetVal = $('#cust_pref_comm').val();
//                        if (!(MANDATORY == 'N')) {
//
//                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
//                                alert(dispName + ' should be mandatory.');
//                                try {
//                                    parent.$('#wait').hide();
//                                } catch (e) {
////        alert(e)
//                                }
//                                return false;
//                            } else if (targetVal == '6') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#' + target).val('');
//                                    $('#' + target).focus().css('border-color', 'red');
//                                    alert('Fax no should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//
//                                    objCustData["fax_no"] = targetv;
//                                }
//
//                            } else {
//
//                                objCustData["fax_no"] = "";
//                            }
//
//                        } else {
//                            if (targetVal == '6') {
//                                var targetv = $('#cust_pre_no').val();
//                                if (targetv.length == 0) {
//                                    $('#cust_pre_no').val('');
//                                    $('#cust_pre_no').focus().css('border-color', 'red');
//                                    alert('Fax no should be mandatory.')
//                                    try {
//                                        parent.$('#wait').hide();
//                                    } catch (e) {
////        alert(e)
//                                    }
//                                    return false;
//                                } else {
//                                    objCustData["fax_no"] = targetv;
//                                    $('#' + target).focus().css('border-color', 'green');
//                                }
//
//                            } else {
//
//                                objCustData["fax_no"] = "";
//                            }
//
//                        }
//
//                    } catch (e) {
////                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);
//                    }
//
//                } else if (target == "cust_pref_comm") {
//                    try {
//                        var targetVal = $('#' + target).val();
//                        if (!(MANDATORY == 'N')) {
//                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
//                                alert(dispName + ' should be mandatory.')
//                                try {
//                                    parent.$('#wait').hide();
//                                } catch (e) {
////        alert(e)
//                                }
//                                return false;
//                            } else {
//                                objCustData[target] = targetVal;
//                                var idval = target + "_ecaf";
//                                objCustData[idval] = $('#' + target + '  option:selected').text();
//                            }
//                        } else {
//                            objCustData[target] = targetVal;
//                            var idval = target + "_ecaf";
//                            objCustData[idval] = $('#' + target + '  option:selected').text();
//                        }
//
//                    } catch (e) {
////                        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception comm' + e);
//                    }
//                }
//                else if (target == "bill_email") {
//                    var targetVal = $('#' + target).val();
//                    if ($("#bill_media").val() === "1") {
//                        if (targetVal.length == 0) {
//                            $('#' + target).val('');
//                            $('#' + target).focus().css('border-color', 'red');
//                            alert(dispName + ' should be mandatory.')
//                            try {
//                                parent.$('#wait').hide();
//                            } catch (e) {
////        alert(e)
//                            }
//                            return false;
//                        } else {
//                            objCustData[target] = targetVal;
//                            $('#' + target).focus().css('border-color', 'green');
//                        }
//                    } else {
//                        objCustData[target] = targetVal;
//                        $('#' + target).focus().css('border-color', 'green');
//                    }
//                } 
                else {
                    if (TYPE == 'TF' || TYPE == 'DT') {
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
//alert(target+"::::::1111 ::::target");
//                             alert(targetVal+"::::::1111 ::::");
                            if (targetVal.length == '0') {
                                if(target=='f_h_name'){}else{
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + ' should be mandatory.');

                                $('#' + target).val('');
                                try {
                                    $('#wait').hide();
                                } catch (e) {
//        alert(e)
                                }
                                return false;
                            }
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
//                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality') {
                                if (target == 'cust_title') {
                                    $('#' + target).focus().css('border-color', 'red');
                                    alert(dispName + '  should be mandatory.')

                                    return false;
//                                    var dd = $('#' + target).data("kendoDropDownList");
//                                    dd.focus();
                                } else {
                                }
                    
                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                // for insta & Bill addr fields _ecaf same as targetVal 
//                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
//                                    objCustData[idval] = targetVal;
                                } else {
                                    objCustData[idval] = $('#' + target + ' option:selected').text();
                                }
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                            var idval = target + "_ecaf";
                            // for insta & Bill addr fields _ecaf same as targetVal 
                            if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
//                                objCustData[idval] = targetVal;
                            } else {
                                objCustData[idval] = $('#' + target + ' option:selected').text();
                            }
                        }
                        var CustType = $('#cust_usage_code').find("option:selected").val();
                        if(CustType==0){
                            alert("Please select User Code/User Type.");
                             $('#cust_usage_code').focus().css('border-color', 'red');
                            return false;
                        }
                    }
                    
//                    else if (TYPE == 'RB') {
//
//                    } 
//                    else if (TYPE == 'CB') {
//                        if (document.getElementById(target).checked) {
//                            objCustData[target] = "true";
//                        } else {
//                            objCustData[target] = "false";
//                        }
//                    }
                }
            } catch (e) {
//                alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception for loop  validatekycCaf' + e);
            }

        }
        objCustData.nationality = 'Indian';
        objCustData.nationality_ecaf = 'Indian';
        objCustData.customer_type = '1';
        objCustData.customer_type_ecaf = 'Individual';
        objCustData.cust_pre_type = '1';
        objCustData.cust_pre_type_ecaf = 'NONE';
        objCustData.alt_mobile_no = '';
        objCustData.bill_acc_no = '1';
        objCustData.bill_acc_no_ecaf = 'New';
        objCustData.bill_acc_type = '15';
        objCustData.bill_acc_type_ecaf = 'WINGS';
        objCustData.bill_acc_sub_type = '16';
        objCustData.bill_acc_sub_type_ecaf = 'WINGS';
        objCustData.bill_frequency = '1';
        objCustData.bill_frequency_ecaf = 'Monthly';
        objCustData.INST_GST_STATE_CODE = '';
        objCustData.INST_GST_STATE_CODE_ecaf = '';
        objCustData.BILL_GST_STATE_CODE = '';
        objCustData.BILL_GST_STATE_CODE_ecaf = '';
        objCustData.age = cust_age;
        objCustData.inst_category = inst_category;
        objCustData.service_type = 'Wings';
        objCustData.cust_usage_code = '2';
        objCustData.cust_usage_code_ecaf = 'Personal';
        objCustData.dob = '';

        var fmskycfinalDaTa = JSON.stringify(objCustData);
//        console.log('fmskycfinalDaTa::' + fmskycfinalDaTa);
//        var fmskycfinalDaTa = objCustData;



//        var fmskycFullData = "{\"cust_title\":\"3\",\"cust_title_ecaf\":\"MISS\",\"first_name\":\"hdfhd\",\"cust_last_name\":\"dfhdf\",\"f_h_name\":\"dfhdfh\",\"gender\":\"2\",\"gender_ecaf\":\"male\",\"dob\":\"09/02/1954\",\"age\":\"64\",\"nationality\":\"Indian\",\"nationality_ecaf\":\"Indian\",\"cust_pref_comm\":\"5\",\"cust_pref_comm_ecaf\":\"Mobile\",\"cust_home_no\":\"\",\"cust_work_no\":\"\",\"fax_no\":\"\",\"customer_type\":\"1\",\"customer_type_ecaf\":\"Individual\",\"cust_usage_code\":\"2\",\"cust_usage_code_ecaf\":\"Residential \",\"cust_pre_type\":\"1\",\"cust_pre_type_ecaf\":\"NONE\",\"cust_mobile_no\":\"09585698569\",\"alt_mobile_no\":\"08546856856\",\"email\":\"ramesh@gmail.com\",\"inst_addr_hno\":\"dfhdf\",\"inst_addr_vill\":\"dfhdfh\",\"inst_addr_city\":\"fhdfh\",\"inst_addr_state\":\"Karnataka\",\"inst_addr_state_ecaf\":\"Karnataka\",\"inst_addr_district\":\"GADAG\",\"inst_addr_district_ecaf\":\"GADAG\",\"inst_main_locality\":\"GADAG\",\"inst_main_locality_ecaf\":\"GADAG\",\"inst_sub_locality\":\"ADARSHA NAGAR\",\"inst_sub_locality_ecaf\":\"ADARSHA NAGAR\",\"inst_exchange_code\":\"HBLGDO\",\"inst_exchange_code_ecaf\":\"HBLGDO\",\"INSTAL_ADDR_PINCODE\":\"582103\",\"inst_category\":\"URBAN\",\"inst_category_ecaf\":\"URBAN\",\"bill_acc_no\":\"1\",\"bill_acc_no_ecaf\":\"New\",\"bill_acc_type\":\"3\",\"bill_acc_type_ecaf\":\"BUSINESS\",\"bill_acc_sub_type\":\"2\",\"bill_acc_sub_type_ecaf\":\"ENTERTAINMENTS\",\"bill_frequency\":\"1\",\"bill_frequency_ecaf\":\"Monthly\",\"bill_media\":\"5\",\"bill_media_ecaf\":\"CD\",\"bill_email\":\"\",\"addr_same_check\":\"true\",\"bill_addr_house_no\":\"dfhdf\",\"bill_addr_vill\":\"dfhdfh\",\"bill_addr_city\":\"fhdfh\",\"bill_addr_state\":\"Karnataka\",\"bill_addr_state_ecaf\":\"Karnataka\",\"bill_addr_district\":\"GADAG\",\"bill_addr_district_ecaf\":\"GADAG\",\"bill_main_locality\":\"GADAG\",\"bill_main_locality_ecaf\":\"GADAG\",\"bill_sub_locality\":\"ADARSHA NAGAR\",\"bill_sub_locality_ecaf\":\"ADARSHA NAGAR\",\"bill_exchange_code\":\"HBLGDO\",\"bill_exchange_code_ecaf\":\"HBLGDO\",\"BILL_ADDR_PINCODE\":\"582103\",\"bill_category\":\"URBAN\",\"bill_category_ecaf\":\"URBAN\",\"poi_type\":\"23\",\"poi_type_ecaf\":\"Unique Identification Authority of India\",\"poi_number\":\"767656564565\",\"poi_issue_place\":\"dfhdfh\",\"poi_issuing_auth\":\"23\",\"poi_issuing_auth_ecaf\":\"UIDAI Government of India (GOI)\",\"poi_issue_date\":\"01/01/1900\",\"check_poi_same\":\"true\",\"poa_type\":\"23\",\"poa_type_ecaf\":\"Unique Identification Authority of India\",\"poa_number\":\"767656564565\",\"poa_issue_place\":\"dfhdfh\",\"poa_issuing_auth\":\"23\",\"poa_issuing_auth_ecaf\":\"UIDAI Government of India (GOI)\",\"poa_issue_date\":\"01/01/1900\",\"poiDateNotFnd\":\"true\",\"poaDateNotFnd\":\"true\",\"franchisee_code\":\"C000701110\",\"franchisee_code_ecaf\":\"C000701110\",\"service_type_cmb\":\"1\",\"service_type_cmb_ecaf\":\"Landline\",\"bb_only\":\"1\",\"bb_only_ecaf\":\"Yes\",\"bb_req_yes\":\"2\",\"bb_req_yes_ecaf\":\"No\",\"connection_type\":\"1\",\"connection_type_ecaf\":\"Normal Connection\",\"comments\":\"dfh\",\"no_of_bb_cons\":\"\",\"no_of_voice_cons\":\"\",\"service_type\":\"Landline\"}";
        var fmskycFullData = fmskycfinalDaTa.concat($('#fms_kyc_Stp1Data').val());
        fmskycFullData = fmskycFullData.replace("}{", ",");

        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.FMS_KYC_Cust_Data = fmskycFullData;
        reqData.kycformFieldsMetaData = $("#kycformFieldsMetaData").val();
//        reqData.STATES = $("#STATES").val();
//        reqData.fmsDDData = $("#fmsDDData").val();
//        reqData.check_poi_same = document.getElementById('check_poi_same').checked;
//        reqData.sub_locality = $("#sub_locality").val();
//        reqData.DISTRICTS = $("#DISTRICTS").val();
//        reqData.EXCHNAGE_DTLS = $("#EXCHNAGE_DTLS").val();
//        reqData.poi_same_chk = $("#poi_same_chk").val();
//        reqData.check_poi_samesession = $("#check_poi_samesession").val();
        reqData.fms_kyc_Stp1Data = $("#fms_kyc_Stp1Data").val();
//        $("#CafsetValues").val("1");
//        reqData.CafsetValues = $("#CafsetValues").val();
 $('#wait').show();
        try {

//            $.ajax({
//                url: "cafCompleteData.do", //parameters go here in object literal form
//                type: 'POST',
//                async: false,
//                data: {"reqData": encrypt(JSON.stringify(reqData))},
//                success: function (data) {
//                    var resJson = JSON.parse(JSON.stringify(data));
//                    var message = resJson.response.message;
//                    var reqData = {};
//                    reqData.reqSessionId = parent.$("#reqSessionId").val();
////                    if (message == "attachmnetPage") {
////                        document.uploadkycCafForm.method = "post";
////                        document.uploadkycCafForm.action = "FMSAttachments.do";
////                        document.uploadkycCafForm.submit();
////                    } else {


            document.uploadkycCafForm.method = "post";
            document.uploadkycCafForm.action = "registerWingsUserWithoutPayment.do";
            document.uploadkycCafForm.reqData.value = encrypt(JSON.stringify(reqData));
            document.uploadkycCafForm.submit();

//                    }
//                }, error: function (data) {
//                    alert("error : staesloding" + JSON.stringify(data));
//                }
//            });
        } catch (e) {
             $('#wait').hide();
//            alert("JS Log(FMS_kycCaf.js):::::::exception  in staesloding :::::" + e);
        }
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception validateCaf  ' + e);
    }
//    alert('JS Log(FMS_kycCaf.js):::::::::::::::::::ending of validateCaf');
}
//function backInStep4() {
//    try {
//
////        var attachShowHide = newFormMem.getProperty("FMS_ATTACH_SHOW_HIDE");//true for hide and flase for show
//        var attachShowHide = "TRUE"; //true for hide and flase for show
//        if (attachShowHide === "TRUE") {
////        if (attachShowHide.toUpperCase() === "TRUE") {
//            window.location.href = "FMS_kyc_step2.html";
//        } else {
//            window.location.href = "FMS_kyc_step3.html";
//        }
//    } catch (e) {
////        alert('JS Log(FMS_kycCaf.js)::::Exception in :::::::backInStep4:::') + e;
//    }
//}
function instAddrDistrict() {
    try {

        var state = $("#inst_addr_state").val();
        if (state == "0") {
            return false;
        }
        var district = $('#inst_addr_district').val();
        if (district == "") {
//alert("Please select sub locality");
            return false;
        }
//        var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.state = state;
        reqData.type = "FMSKYC";
        $.ajax({
            url: "districtsLoading.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availableDistrictssJOBJ = {};
                availableDistrictssJOBJ = availablestaesLoading;
                if (availableDistrictssJOBJ.STATUS === 0 || availableDistrictssJOBJ.STATUS === '0') {
                    var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
                    $('#inst_addr_district').children().remove();
//                    $('#inst_addr_district').append('<option value="0">Select from list</option>');
                    $(availDistrictsarr).each(function (index) {
                        $('#inst_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
                    });
                } else {
                    $('#inst_addr_district').val("");
                }
            }, error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }
        });
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in instAddrDistrict :::::" + e);
    }
}
function billAddrDistrict() {
    try {

        var state = $("#bill_addr_state").val();
        if (state == "0") {
            return false;
        }
        var district = $('#bill_addr_district').val();
        if (district == "") {
//alert("Please select sub locality");
            return false;
        }
//        var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.state = state;
        reqData.type = "FMSKYC";
        $.ajax({
            url: "districtsLoading.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availableDistrictssJOBJ = {};
                availableDistrictssJOBJ = availablestaesLoading;
                if (availableDistrictssJOBJ.STATUS === 0 || availableDistrictssJOBJ.STATUS === '0') {
                    var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
                    $('#bill_addr_district').children().remove();
                    $('#bill_addr_district').append('<option value="0">Select from list</option>');
                    $(availDistrictsarr).each(function (index) {
                        $('#bill_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
                    });
                } else {
                    $('#bill_addr_district').val("");
                }
            }, error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }
        });
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in bill addr  districts loading :::::" + e);
    }

}
function billmainlocalityload() {
    try {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::starting of billmainlocalityload');
        var mainLocality = $('#bill_main_locality').val();
        var state = $('#bill_addr_state').val();
        var district = $('#bill_addr_district').val();
        if (mainLocality == "") {
// alert("Please select main locality");
            return false;
        } else if (state == "0" || state == "") {
// alert("Please select main locality");
            return false;
        } else if (district == "0" || district == "") {
// alert("Please select main locality");
            return false;
        } else {
//            var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "sublocalitLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                        alert("sublocalitLoading  " + JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableSubLocalJOBJ = {};
                    availableSubLocalJOBJ = availablestaesLoading;
                    if (availableSubLocalJOBJ.STATUS === "0") {
                        var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
                        $('#bill_sub_locality').children().remove();
//                        $('#bill_sub_locality').append('<option value="0">Select from list</option>');
                        $(availsubloaclarr).each(function (index) {
                            $('#bill_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
                        });
                        $("#bill_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    } else {
                        $('#bill_main_locality').val("");
                    }
                }, error: function (data) {
                    alert("error : uploadForms" + JSON.stringify(data));
                }
            });
        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub localities loading:::::" + e);
    }
}
function instalmainlocalityload(mainlocality) {
    try {
//        $('#inst_sub_locality').children().remove();
//        $('#inst_sub_locality').append('<option value="0">Select from list</option>');
        var mainLocality = mainlocality;
//        alert(mainLocality);
        var state = $('#inst_addr_state').val();
//        debugger;
        var district = $('#inst_addr_district').val();
//        alert("state " + state);
//        alert("district " + district);
        if (mainLocality == "") {
// alert("Please select main locality");
            return false;
        } else if (state == "0" || state == "") {
// alert("Please select main locality");
            return false;
        } else if (district == "0" || district == "") {
// alert("Please select main locality");
            return false;
        } else {
//            var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "sublocalitLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableSubLocalJOBJ = {};
                    availableSubLocalJOBJ = availablestaesLoading;
                    if (availableSubLocalJOBJ.STATUS === "0") {
                        var availsubloaclarr = availableSubLocalJOBJ.MESSAGE;
//                        alert(JSON.stringify(availsubloaclarr));
                        $('#inst_sub_locality').children().remove();
//                        $('#inst_sub_locality').append('<option value="0">Select from list</option>');
                        $(availsubloaclarr).each(function (index) {
//                            alert("for loop");
                            $('#inst_sub_locality').append(new Option(availsubloaclarr[index].DD_VALUE, availsubloaclarr[index].DD_CODE));
                        });
                        $("#inst_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    } else {
                        $('#inst_main_locality').val("");
                    }
                }, error: function (data) {
                    alert("error : uploadForms" + JSON.stringify(data));
                }
            });
        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in sub localities loading:::::" + e);
    }
}
function instsublocatilyload() {
    try {
        var state = $("#inst_addr_state").val();
        var district = $("#inst_addr_district").val();
        var mainLocality = $('#inst_main_locality').val();
        if (mainLocality == "0") {
//                alert("Please select main locality");
            return false;
        }
        var subLocality = $('#inst_sub_locality').val();
        if (subLocality == "0") {
//                alert("Please select sub locality");
            return false;
        }
        if (state == "0" || state == null) {
//                alert("Please select state");
            return false;
        } else if (district == "0" || district == null) {
//                alert("Please select district");
            return false;
        }
//        var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.mainLocality = mainLocality;
        reqData.subLocality = subLocality;
        reqData.district = district;
        reqData.state = state;
        reqData.type = "FMSKYC";
        $.ajax({
            url: "ExchangeCode.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availableexchCodeJOBJ = {};
                availableexchCodeJOBJ = availablestaesLoading;
                if (availableexchCodeJOBJ.STATUS === "0") {
                    var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
                    $('#inst_exchange_code').children().remove();
                    $('#inst_exchange_code').append('<option value="0">Select from list</option>');
                    $(availexCodelarr).each(function (index) {
                        $('#inst_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                    });
                } else {
                    $('#inst_sub_locality').val("");
                }
            }, error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }
        });
//        var availableexchCodeJOBJ = {};
//        availableexchCodeJOBJ = JSON.parse(availableexbgCode);
//        alert("JS Log(FMS_kycCaf.js):::::::availableexchCodeJOBJ in exchangeCodesLoading :::::");
//        if (availableexchCodeJOBJ.STATUS === "0") {
//            var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
//            $('#inst_exchange_code').children().remove();
//            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
//            $(availexCodelarr).each(function (index) {
//                $('#inst_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
//            });
//        } else {
//            $('#inst_sub_locality').val("");
//        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
    }
}
function  instGSTCodesload() {
    try {
        var mainLocality = $('#inst_main_locality').val();
        if (mainLocality == "0") {
//            alert("Please select main locality from list");
            return false;
        }
        var subLocality = $('#inst_sub_locality').val();
        if (subLocality == "0") {
//            alert("Please select sub locality from list");
            return false;
        }
        var exchange = $('#inst_exchange_code').val();
        if (exchange == "0") {
//            alert("Please select Exchange code from list");
            return false;
        }
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
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
                    alert(availableGSTCodeJOBJ.MESSAGE);
                    $('#inst_exchange_code').val("0");
                }
            }, error: function (data) {
                alert("error : GST codes loading" + JSON.stringify(data));
            }
        });
    } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
    }
}

function instaldistrictLaoding() {
    try {
//        $('#inst_main_locality').children().remove();
//        $('#inst_main_locality').append('<option value="0">Select from list</option>');
        var state = $("#inst_addr_state").val();
        var district = $("#inst_addr_district").val();
        if (state == "0" || state == null) {
            alert("Please select state");
            return false;
        } else if (district == "0" || district == null) {
            alert("Please select district");
            return false;
        } else {
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "mainlocalityLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                alert("statesLoading  " + JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableLoaclJOBJ = {};
                    availableLoaclJOBJ = availablestaesLoading;
                    if (availableLoaclJOBJ.STATUS === "0") {
                        var availloaclarr = availableLoaclJOBJ.MESSAGE;
                        $('#inst_main_locality').children().remove();
//                        $('#inst_main_locality').append('<option value="0">Select from list</option>');
                        $(availloaclarr).each(function (index) {
                            $('#inst_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
                        });
                        $("#inst_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        //billing address main localities loading

//                            $('#bill_main_locality').children().remove();
//                            $('#bill_main_locality').append('<option value="0">Select from list</option>');
//                            $(availloaclarr).each(function (index) {
//                                $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                            });
//                            $("#bill_main_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
                    }
                }, error: function (data) {
                    alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                }
            });
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);

        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
    }
}
function billdistrictLaoding() {
    try {
        $('#bill_main_locality').children().remove();
        $('#bill_main_locality').append('<option value="0">Select from list</option>');
        var state = $("#bill_addr_state").val();
        var district = $("#bill_addr_district").val();
        if (state == "0" || state == null) {
//                alert("Please select state");
            return false;
        } else if (district == "0" || district == null) {
//                alert("Please select district");
            return false;
        } else {


            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSKYC";
            $.ajax({
                url: "mainlocalityLoading.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
                    var resJson = JSON.parse(JSON.stringify(data));
//                alert("statesLoading  " + JSON.stringify(data));
                    var availablestaesLoading = resJson.response.responseData;
                    var availableLoaclJOBJ = {};
                    availableLoaclJOBJ = availablestaesLoading;
                    if (availableLoaclJOBJ.STATUS === "0") {
                        var availloaclarr = availableLoaclJOBJ.MESSAGE;
                        $('#bill_main_locality').children().remove();
                        $('#billt_main_locality').append('<option value="0">Select from list</option>');
                        $(availloaclarr).each(function (index) {
                            $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
                        });
                        $("#bill_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        //billing address main localities loading

//                            $('#bill_main_locality').children().remove();
//                            $('#bill_main_locality').append('<option value="0">Select from list</option>');
//                            $(availloaclarr).each(function (index) {
//                                $('#bill_main_locality').append(new Option(availloaclarr[index].DD_VALUE, availloaclarr[index].DD_CODE));
//                            });
//                            $("#bill_main_locality").kendoDropDownList({
//                                filter: "contains"
//                            });
                    }
                }, error: function (data) {
                    alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                }
            });
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);

        }
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
    }
}
function billsublocatilyload() {

    try {
        var state = $("#bill_addr_state").val();
        var district = $("#bill_addr_district").val();
        var mainLocality = $('#bill_main_locality').val();
        if (mainLocality == "0") {
//                alert("Please select main locality");
            return false;
        }
        var subLocality = $('#bill_sub_locality').val();
        if (subLocality == "0") {
//                alert("Please select sub locality");
            return false;
        }
        if (state == "0" || state == null) {
//                alert("Please select state");
            return false;
        } else if (district == "0" || district == null) {
//                alert("Please select district");
            return false;
        }
//        var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.mainLocality = mainLocality;
        reqData.subLocality = subLocality;
        reqData.district = district;
        reqData.state = state;
        reqData.type = "FMSKYC";
        $.ajax({
            url: "ExchangeCode.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                        alert("districtsLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availableexchCodeJOBJ = {};
                availableexchCodeJOBJ = availablestaesLoading;
                if (availableexchCodeJOBJ.STATUS === "0") {
                    var availexCodelarr = availableexchCodeJOBJ.EXCHNAGE_DTLS;
                    $('#bill_exchange_code').children().remove();
//                    $('#bill_exchange_code').append('<option value="0">Select from list</option>');
                    $(availexCodelarr).each(function (index) {
                        $('#bill_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                    });
                } else {
                    $('#bill_sub_locality').val("");
                }
            }, error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }
        });
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
    }
}

//
function billGSTCodesload() {
    try {
        var mainLocality = $('#bill_main_locality').val();
        if (mainLocality == "0") {
//            alert("Please select main locality from list");
            return false;
        }
        var subLocality = $('#bill_sub_locality').val();
        if (subLocality == "0") {
//            alert("Please select sub locality from list");
            return false;
        }
        var exchange = $('#bill_exchange_code').val();
        if (exchange == "0") {
//            alert("Please select Exchange code from list");
            return false;
        }
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
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
                    alert(availableGSTCodeJOBJ.MESSAGE);
                    $('#bill_exchange_code').val("0");

                }
            }, error: function (data) {
                alert("error : GST codes loading" + JSON.stringify(data));
            }
        });
    } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
    }
}

function  getKYCReceiptData(from) {
    try {

var paymentReceiptData=paymentData;//$('#PAYMENT_TXN').val();
     if(paymentReceiptData !=""){
      paymentReceiptData=JSON.parse(paymentReceiptData);
        if (from == 'Generatereceipt') {
            document.acknowledgement.action = "";
            var reqData = paymentReceiptData;
            $.ajax({
                url: 'uploadFmsPrintReceipt.do',
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    //sessionCheck(data);(data);
//                    alert(JSON.stringify(data))
                    if (data.response.success) {
                        var url = "./MenuItems/PrintReport.jsp?reqData=" + encrypt(JSON.stringify(reqData));
                        window.open(url, 'PrintBill', 'status=no,height=580px,width=850px,scrollbars=yes');
                    } else {
                        alert(data.response.message);
                    }
                }, error: function (data) {
                                    alert("error print " + JSON.stringify(data));
                }
            });
    
        } else if (from == 'Generatepdf') {
            try {
                var reqData = paymentReceiptData;
                document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
                document.acknowledgement.method = "post";
                document.acknowledgement.action = "downloadfmspdfKYC.do";
                document.acknowledgement.reqData = encrypt(JSON.stringify(reqData));
                document.acknowledgement.submit();
            
                } catch (e) {
//                alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
            }
        
        }
    }else{
        alert("Transaction Details Not found");
    }
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while forwardng data' + e);
    }
    
//    alert('JS Log(FMS_kycCaf.js):::::::::::::::::::ending of getKYCReceiptData');
    
}

function  nextBtnInAckfms() {
    lowindow.cation.href = "Login.do";
//    alert("calling");
//    var reqData = {};
//    reqData.reqSessionId = parent.$("#reqSessionId").val();
////                document.location.href = "generatefmspdfKYC.do?reqData=" + encrypt(JSON.stringify(reqData));
//    document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
//    document.acknowledgement.method = "post";
//    document.acknowledgement.action = "fmsDashboard.do";
//    document.acknowledgement.reqData = encrypt(JSON.stringify(reqData));
//    document.acknowledgement.submit();
}
function billemailMand() {
    if ($("#bill_media").val() === '1' || $("#bill_media").val() === '3') {
        document.getElementById("bill_email_label").style.display = "block";
        document.getElementById("bill_email_text").style.display = "block";
        $("#bill_email").val($('#email').val());
    } else {
        document.getElementById("bill_email_label").style.display = "none";
        document.getElementById("bill_email_text").style.display = "none";
        $("#bill_email").val('');
    }
}
function validPaymentType() {
    var paymentType = $("#payment_type").val();
    if (paymentType === "2") {
        $("#bankDetails").show();
    } else {
        $("#bankDetails").hide();
    }
}