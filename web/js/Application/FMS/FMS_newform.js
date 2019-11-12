

//Main Locality,sub locality and exchange codes loading from OB service

var dobValidationFlag = true;
var deviceSerialReg = /^[a-zA-Z0-9.-]+$/;
var metaDataValidation = {};
var idValues = [];
function mainLocalitiesEKYCLoad() {
    //states
    try {
        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
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
                    $('#inst_addr_state').children().remove();
                    $('#inst_addr_state').append('<option value="0">Select from list</option>');
                    $(availStatesarr).each(function (index) {
                        $('#inst_addr_state').append(new Option(availStatesarr[index].DD_VALUE, availStatesarr[index].DD_CODE));
                    });
                    $('#bill_addr_state').children().remove();
                    $('#bill_addr_state').append('<option value="0">Select from list</option>');
                    $(availStatesarr).each(function (index) {
                        $('#bill_addr_state').append(new Option(availStatesarr[index].DD_VALUE, availStatesarr[index].DD_CODE));
                    });
                }
            }, error: function (data) {
                alert("error : staesloding" + JSON.stringify(data));
            }
        });
    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in staesloding :::::" + e);
    }
//    alert("mainLocalitiesLoad")
//    try {
//        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
//        $.ajax({
//            url: "statesLoading.do", //parameters go here in object literal form
//            type: 'POST',
//            async: false,
//            data: {"reqData": encrypt(JSON.stringify(reqData))},
//            success: function (data) {
//                //sessionCheck(data);(data);
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
//        alert("JS Log(FMS_kycCaf.js):::::::exception  in staesloding :::::" + e);
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
    try {


        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.type = "FMSEKYC";
        $.ajax({
            url: "billingtypesLoading.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                //sessionCheck(data);(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                alert("statesLoading  " + JSON.stringify(data));
                var availablestaesLoading = resJson.response.responseData;
                var availablebillTypesJOBJ = {};
                availablebillTypesJOBJ = availablestaesLoading;
                if (availablebillTypesJOBJ.STATUS === "0") {
                    var availbillTypearr = availablebillTypesJOBJ.BILLING_TYPES;
                    $('#bill_acc_type').children().remove();
                    $('#bill_acc_type').append('<option value="0">Select from list</option>');
                    $(availbillTypearr).each(function (index) {
                        $('#bill_acc_type').append(new Option(availbillTypearr[index].DD_VALUE, availbillTypearr[index].DD_CODE));
                    });
                }
            }, error: function (data) {
                alert("error : billingtypesLoading" + JSON.stringify(data));
            }
        });
//        var availablebilltypes = FMSnewFormMem.fetchbillingTypes();

    } catch (e) {
        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billingtypesLoading for billing types loading:::::" + e);
    }
//setting poi poa types
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
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in  loading poi_type:::::" + e);
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
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading poi_issuing_auth:::::" + e);
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
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in loading poa_type:::::" + e);
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
//            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in  loading poa_issuing_auth:::::" + e);
//        }
//
//    } catch (e) {
//        alert("JS Log(FMS_kycCaf.js):::::::::::Exception in poi poa types loading:::::" + e);
//    }

//instal district loading based on states 
    $("#inst_addr_state").on('change', function () {

//        alert("inst_addr_state");
//        unclicksameadress();
        try {
            $('#inst_addr_district').children().remove();
            $('#inst_addr_district').append('<option value="0">Select from list</option>');
            $('#inst_main_locality').children().remove();
            $('#inst_main_locality').append('<option value="0">Select from list</option>');
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            $('#INSTAL_ADDR_PINCODE').val('');
            $('#inst_category').val('');
            var state = $("#inst_addr_state").val();
            if (state == "0") {
                alert("Please select state");
                return false;
            } else {
                var reqData = {};
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.state = state;
                reqData.type = "FMSEKYC";
                $.ajax({
                    url: "districtsLoading.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        //sessionCheck(data);(data);
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
                        }

                        $("#inst_main_locality").kendoDropDownList({
                            filter: "contains"
                        });
                        $("#inst_sub_locality").kendoDropDownList({
                            filter: "contains"
                        });
                    }, error: function (data) {
                        alert("error : uploadForms" + JSON.stringify(data));
                    }
                });
            }
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);

//            }
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
        }
    });
    $("#inst_addr_district").on('change', function () {
//        unclicksameadress();

        try {
            $('#inst_main_locality').children().remove();
            $('#inst_main_locality').append('<option value="0">Select from list</option>');
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            $('#INSTAL_ADDR_PINCODE').val('');
            $('#inst_category').val('');
            var state = $("#inst_addr_state").val();
            var district = $("#inst_addr_district").val();
            if (state == "0" || state == null) {
                alert("Please select state from list");
                return false;
            } else if (district == "0" || district == null) {
                alert("Please select district from list");
                return false;
            } else {


                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.state = state;
                reqData.district = district;
                reqData.type = "FMSEKYC";
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
                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                    }
                });
            }
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);

//            }
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
        }
    });


//installation sub localities loading based on installation main locality
    $("#inst_main_locality").on('change', function () {
        try {
//            unclicksameadress();
            $('#inst_sub_locality').children().remove();
            $('#inst_sub_locality').append('<option value="0">Select from list</option>');
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            $('#INSTAL_ADDR_PINCODE').val('');
            $('#inst_category').val('');
            var mainLocality = $('#inst_main_locality').val();
            var state = $("#inst_addr_state").val();
            var district = $("#inst_addr_district").val();
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
//                var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);

            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSEKYC";
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
                    alert("error : sublocalitLoading" + JSON.stringify(data));
                }
            });
//            }
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in sub localities loading:::::" + e);
        }
    });
//installation exchange codes loading based on installation sub locality
    $("#inst_sub_locality").on('change', function () {
        try {

//            alert("inst_sub_locality");
//            unclicksameadress();
            $('#inst_exchange_code').children().remove();
            $('#inst_exchange_code').append('<option value="0">Select from list</option>');
            $('#INSTAL_ADDR_PINCODE').val('');
            $('#inst_category').val('');
            var state = $("#inst_addr_state").val();
            var district = $("#inst_addr_district").val();
            var mainLocality = $('#inst_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
            var subLocality = $('#inst_sub_locality').val();
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
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSEKYC";
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
                        $("#EXCHNAGE_DTLS").val(JSON.stringify(availexCodelarr));
                        $('#inst_exchange_code').children().remove();
                        $('#inst_exchange_code').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#inst_exchange_code').append(new Option(availexCodelarr[index].DD_VALUE, availexCodelarr[index].DD_CODE));
                        });
                    } else {
                        $('#inst_sub_locality').val("");
                    }
                }, error: function (data) {
                    alert("error : exchange codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in exchange codes loading:::::" + e);
        }
    });
//installation pin code and category  loading
    $("#inst_exchange_code").on('change', function () {
        try {
//            unclicksameadress();
//             alert("inst_exchange_code");
            $('#INSTAL_ADDR_PINCODE').val('');
            $('#inst_category').val('');
//        var availexCodelarr = newFormMem.getProperty("EXCHNAGE_DTLS");
            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
//            alert(availexCodelarr);
            var availexCodelObj = JSON.parse(availexCodelarr);
            $(availexCodelObj).each(function (index) {
                if ($("#inst_exchange_code").val() == availexCodelObj[index].DD_CODE) {
                    $('#INSTAL_ADDR_PINCODE').attr("readonly", "readonly");
                    $('#INSTAL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
                    $('#inst_category').val(availexCodelObj[index].CATEGORY);
                }
            });
        } catch (e) {
//            alert(e);
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
    //billing district loading based on states 
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
            $('#BILL_ADDR_PINCODE').val('');
            $('#bill_category').val('');
            var state = $("#bill_addr_state").val();
            if (state == "0") {
                alert("Please select state from list");
                return false;
            } else {
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
                var reqData = {};
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
                        if (availableDistrictssJOBJ.STATUS === '0' || availableDistrictssJOBJ.STATUS === 0) {
                            var availDistrictsarr = availableDistrictssJOBJ.DISTRICTS;
                            $('#bill_addr_district').children().remove();
                            $('#bill_addr_district').append('<option value="0">Select from list</option>');
                            $(availDistrictsarr).each(function (index) {
                                $('#bill_addr_district').append(new Option(availDistrictsarr[index].DD_VALUE, availDistrictsarr[index].DD_CODE));
                            });
//                    $("#bill_addr_district").kendoDropDownList({
//                        filter: "contains"
//                    });
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
                        alert("error : billing  district ::loading" + JSON.stringify(data));
                    }
                });
            }
        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::exception  in billing  district ::loading:::" + e);
        }
    });

    $("#bill_addr_district").on('change', function () {
//        unclicksameadress();
        try {
            $('#bill_main_locality').children().remove();
            $('#bill_main_locality').append('<option value="0">Select from list</option>');
            $('#bill_sub_locality').children().remove();
            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            $('#BILL_ADDR_PINCODE').val('');
            $('#bill_category').val('');
            var state = $("#bill_addr_state").val();
            var district = $("#bill_addr_district").val();
            if (state == "0" || state == null) {
                alert("Please select state from list");
                return false;
            } else if (district == "0" || district == null) {
                alert("Please select district from list");
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
                        alert("error : mainLocalitiesLoad" + JSON.stringify(data));
                    }
                });
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);

            }
        } catch (e) {
//            alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
        }
    });
//billing sub localities loading based on billing main locality
    $("#bill_main_locality").on('change', function () {
        try {
            var mainLocality = $('#bill_main_locality').val();
            $('#bill_sub_locality').children().remove();
            $('#bill_sub_locality').append('<option value="0">Select from list</option>');
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            $('#BILL_ADDR_PINCODE').val('');
            $('#bill_category').val('');
            //alert(mainLocality + ":::::mainLocality");
            var state = $("#bill_addr_state").val();
            var district = $("#bill_addr_district ").val();
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
//                var availableSubLocal = FMSnewFormMem.fetchSubLocality(mainLocality);
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSEKYC";
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
                        $('#bill_sub_locality').append('<option value="0">Select from list</option>');
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
                    alert("error :  billing sub localities loading" + JSON.stringify(data));
                }
            });
//            }
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub localities loading:::::" + e);
        }
    });
//billing exchange codes loading based on billing sub locality
    $("#bill_sub_locality").on('change', function () {
        try {
//            var mainLocality = $('#bill_main_locality').val();
            $('#bill_exchange_code').children().remove();
            $('#bill_exchange_code').append('<option value="0">Select from list</option>');
            $('#BILL_ADDR_PINCODE').val('');
            $('#bill_category').val('');
            var state = $("#bill_addr_state").val();
            var district = $("#bill_addr_district").val();
            var mainLocality = $('#bill_main_locality').val();
//            if (mainLocality == "0") {
//                alert("Please select main locality from list");
//                return false;
//            }
            var subLocality = $('#bill_sub_locality').val();
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
//            var availableexbgCode = FMSnewFormMem.fetchExchangeCode(mainLocality, subLocality);
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.mainLocality = mainLocality;
            reqData.subLocality = subLocality;
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSEKYC";
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
                    alert("error : billing exchange codes loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
        }
    });
//billing pin code and category  loading
    $("#bill_exchange_code").on('change', function () {
        try {
//        alert("bill_exchange_code");
            $('#BILL_ADDR_PINCODE').val('');
            $('#bill_category').val('');
            var availexCodelarr = $('#EXCHNAGE_DTLS').val();
//        alert(availexCodelarr);
            var availexCodelObj = JSON.parse(availexCodelarr);
            $(availexCodelObj).each(function (index) {
                if ($("#bill_exchange_code").val() === availexCodelObj[index].DD_CODE) {
                    $('#BILL_ADDR_PINCODE').attr("readonly", "readonly");
                    $('#BILL_ADDR_PINCODE').val(availexCodelObj[index].PIN);
                    $('#bill_category').val(availexCodelObj[index].CATEGORY);
                }

            });
        } catch (e) {
//            alert(e);
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
//billing sub types loading based on billing types
    $("#bill_acc_type").on('change', function () {
        try {
            var billaccType = $('#bill_acc_type').val();
            $('#bill_acc_sub_type').children().remove();
            $('#bill_acc_sub_type').append('<option value="0">Select from list</option>');
            if (billaccType == "0") {
                alert("Please select bill account type");
                return false;
            }
//            var availbillaccType = FMSnewFormMem.fetchbillingSubTypes(billaccType);

            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.billAccType = billaccType;
            reqData.type = "FMSEKYC";
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
                        alert(availbillaccTypeJOBJ.MESSAGE);
                        $('#bill_acc_type').val("0");
                    }
                }, error: function (data) {
                    alert("error : billing sub types loading" + JSON.stringify(data));
                }
            });
        } catch (e) {
            alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing sub types loading:::::" + e);
        }
    });
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
//    $('#dob').on('blur', function () {
//        if (this.value.length > 0 && dobValidationFlag) {
//            var dobVal = this.value;
//            if (dobVal.length === "1" || dobVal.length === 1) {
//                $('#dob').val('');
//                $('#age').val('');
//            }
//            var age = getAge(this.value);
//            if (age >= 18 && age <= 100) {
//                $("#age").val(age);
//            } else {
//                if (age < 18) {
//                    alert("Age should be greater than 18 years");
//                } else if (age >= 100) {
//                    alert("Age must be less than 100 years");
//                } else {
//                    alert(("kyc.age.greater_than_message"));
//                }
//                $('#dob').val('');
//                $('#age').val('');
//                if (dobVal.length != 0)
//                    $('#dob').focus();
//            }
//        } else {
//            $('#age').val('');
//            $('#dob').val('');
//            dobValidationFlag = true;
//        }
//
//    });
//    document.getElementById('wait').style.display = 'none';
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
        return false;//not allowed
    } else if (dob_parts[2] == poi_parts[2]) {
        if (dob_parts[1] < poi_parts[1]) {
            return true;// alowed

        } else if (dob_parts[1] == poi_parts[1]) {
            if (dob_parts[0] < poi_parts[0]) {
                return true;// alowed
            } else if (dob_parts[0] == poi_parts[0]) {
                return false;///not allowed
            } else {
                return false;//not allowed
            }

        } else {
            return false;///not allowed
        }
    } else {
        return true;//allowed
    }
}


//function fmsKYCCAFBack() {
//
//    document.uploadCafeKycForm.method = "post";
//    document.uploadCafeKycForm.action = "sendBackToStep1.do";
//    document.uploadCafeKycForm.submit();
//
//}





function poiDateNotFndEKYCFun() {
    try {
        if (document.getElementById('poiDateNotFnd').checked) {
            $('#poi_issue_date').val('01/01/1900').attr('readonly', 'readonly');
            $('#poa_issue_date').val('01/01/1900').attr('readonly', 'readonly');
            $('#poaDateNotFnd').prop('checked', true);
            $('#poaDateNotFnd').attr('disabled', 'disabled');
        } else {
            $('#poi_issue_date').val('');
            $('#poa_issue_date').val('');
            $('#poiDateNotFnd').prop('checked', false);
            $('#poaDateNotFnd').prop('checked', false);
            $('#poi_issue_date').removeAttr('readonly');
            $('#poa_issue_date').removeAttr('readonly');
            $('#poaDateNotFnd').removeAttr('disabled');
        }
    } catch (e) {
        alert('JS Log(FMS_newform.js):::::::::::exception while check poidate not found ' + e);
    }
}
function checksameEmail() {
    try {
        if (document.getElementById('check_email_address_same').checked) {
            var email = $("#email").val();
            // var email = newFormMem.getProperty("cust_email_Aadh");
            if (email.length > 0) {
                $('#bill_email').val(email).attr('readonly', 'readonly');
            } else {
                alert("Aadhaar email address is not available");
                document.getElementById('check_email_address_same').checked = false;
            }
        } else {
            $('#bill_email').val('');
            $('#bill_email').removeAttr('readonly');
        }
    } catch (e) {
        alert("JS Log(FMS_newform.js):::::::::::Exception in checksameEmail" + e);
    }
}
function poaDateNotFndEKYCFun() {
    try {
        if (document.getElementById('poaDateNotFnd').checked) {
            $('#poa_issue_date').val('01/01/1900').attr('readonly', 'readonly');
        } else {
            $('#poa_issue_date').val('');
            $('#poaDateNotFnd').prop('checked', false);
            $('#poa_issue_date').removeAttr('readonly');
        }
    } catch (e) {
        alert('JS Log(FMS_newform.js):::::::::::exception while check poadate not found ' + e);
    }
}

function setMetaDataFMSEKYC() {

    try {
        var formfieldData = {};
        var formfieldData1 = $("#ekycformFieldsMetaData").val();

        formfieldData = JSON.parse(formfieldData1);

        metaDataValidation = formfieldData;
//        console.log("metaDataValidation::"+metaDataValidation);
    } catch (e) {
//        alert('JS Log(FMS_ekyc_Validation.js):::::::::::::::::::Exception in  setMetaDataForValidationFMS' + e);
    }
}

function setTitlePreCommuniEKYC(targetID) {
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
function setEKYCPreviewData() {

    var FMS_KYC_Cust_Data = $("#FMS_KYC_Cust_Data").val();
    var CustmrData = JSON.parse(FMS_KYC_Cust_Data);

    try {
        var sel_mob_no = CustmrData.sel_mob_no;
        $("#wings_mob").text(sel_mob_no);
    } catch (e) {
        $("#wingtab").hide();
    }
    try {
        var bill_account_no = CustmrData.bill_account_no;
        $("#pre_cust_acc_no").text(bill_account_no);
    } catch (e) {
    }
    try {
        var cust_title = CustmrData.cust_title_ecaf;
        $("#pre_cust_tilte").text(cust_title);
    } catch (e) {
    }
    try {
        var cust_last_name = CustmrData.uid_last_name;
        $("#pre_cust_last_name").text(cust_last_name);
    } catch (e) {
    }
    try {
        var first_name = CustmrData.uid_first_name;
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


    try {
        var cust_mobile_no = CustmrData.cust_mobile_no;
        $("#pre_cust_mobile_no").text(cust_mobile_no);
    } catch (e) {
    }
    try {
        var alt_mobile_no = CustmrData.alt_mobile_no;
        $("#pre_alt_mobile_no").text(alt_mobile_no);
    } catch (e) {
    }
    try {
        var cust_email = CustmrData.email;
        $("#pre_email").text(cust_email);
    } catch (e) {
    }
    try {
        var inst_addr_hno = CustmrData.inst_addr_hno;
        $("#pre_inst_addr_hno").text(inst_addr_hno);
    } catch (e) {
    }
    try {
        var inst_addr_vill = CustmrData.inst_addr_vill;
        $("#pre_inst_addr_vill").text(inst_addr_vill);
    } catch (e) {
    }
    try {
        var inst_addr_city = CustmrData.inst_addr_city;
        $("#pre_inst_addr_city").text(inst_addr_city);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_addr_state = CustmrData.inst_addr_state;
        $("#pre_inst_addr_state").text(inst_addr_state);
    } catch (e) {
        //   alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_addr_district = CustmrData.inst_addr_district;
        $("#pre_inst_addr_district").text(inst_addr_district);
    } catch (e) {
        //   alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_main_locality = CustmrData.inst_main_locality;
        $("#pre_inst_main_locality").text(inst_main_locality);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_sub_locality = CustmrData.inst_sub_locality;
        $("#pre_inst_sub_locality").text(inst_sub_locality);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_exchange_code = CustmrData.inst_exchange_code;
        $("#pre_inst_exchange_code").text(inst_exchange_code);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var INSTAL_ADDR_PINCODE = CustmrData.INSTAL_ADDR_PINCODE;
        $("#pre_INSTAL_ADDR_PINCODE").text(INSTAL_ADDR_PINCODE);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var inst_category = CustmrData.inst_category;
        $("#pre_inst_category").text(inst_category);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }

//Billing account

    try {
        var bill_acc_no = CustmrData.bill_acc_no_ecaf;
        $("#pre_bill_acc_no").text(bill_acc_no);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
//Billing account details
    try {
        var bill_acc_type = CustmrData.bill_acc_type_ecaf;
        $("#pre_bill_acc_type").text(bill_acc_type);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_acc_sub_type = CustmrData.bill_acc_sub_type_ecaf;
        $("#pre_bill_acc_sub_type").text(bill_acc_sub_type);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_frequency = CustmrData.bill_frequency_ecaf;
        $("#pre_bill_frequency").text(bill_frequency);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_media = CustmrData.bill_media_ecaf;
        $("#pre_bill_media").text(bill_media);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_email = CustmrData.bill_email;
        if (bill_email.length <= 0) {
//            document.getElementById("pre_bill_email_lbl").style.display = 'none';
//            document.getElementById("pre_bill_email").style.display = 'none';
            $("#pre_bill_email_lbl").hide();
            $("#pre_bill_email").hide();
        } else {
//            document.getElementById("pre_bill_email_lbl").style.display = 'block';
//            document.getElementById("pre_bill_email").style.display = 'block';
            $("#pre_bill_email_lbl").show();
            $("#pre_bill_email").show();
        }
        $("#pre_bill_email").text(bill_email);
    } catch (e) {
        //  alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_addr_hno = CustmrData.bill_addr_house_no;
        $("#pre_bill_addr_hno").text(bill_addr_hno);
    } catch (e) {
        // alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_addr_vill = CustmrData.bill_addr_vill;
        $("#pre_bill_addr_vill").text(bill_addr_vill);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_addr_city = CustmrData.bill_addr_city;
        $("#pre_bill_addr_city").text(bill_addr_city);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_addr_state = CustmrData.bill_addr_state;
        $("#pre_bill_addr_state").text(bill_addr_state);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_addr_district = CustmrData.bill_addr_district;
        $("#pre_bill_addr_district").text(bill_addr_district);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_main_locality = CustmrData.bill_main_locality;
        $("#pre_bill_main_locality").text(bill_main_locality);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_sub_locality = CustmrData.bill_sub_locality;
        $("#bill_sub_locality").text(bill_sub_locality);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_exchange_code = CustmrData.bill_exchange_code;
        $("#pre_bill_exchange_code").text(bill_exchange_code);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var BILL_ADDR_PINCODE = CustmrData.BILL_ADDR_PINCODE;
        $("#pre_BILL_ADDR_PINCODE").text(BILL_ADDR_PINCODE);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bill_category = CustmrData.bill_category;
        $("#pre_bill_category").text(bill_category);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
//Poi details
    try {
        var poi_type = CustmrData.poi_type_ecaf;
        $("#pre_poi_type").text(poi_type);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poi_number = CustmrData.poi_number;
        $("#pre_poi_number").text(poi_number);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poi_issue_place = CustmrData.poi_issue_place;
        $("#pre_poi_issue_place").text(poi_issue_place);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poi_issuing_auth = CustmrData.poi_issuing_auth_ecaf;
        $("#pre_poi_issuing_auth").text(poi_issuing_auth);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poi_issue_date = CustmrData.poi_issue_date;
        $("#pre_poi_issue_date").text(poi_issue_date);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }

//
    try {
        var poa_type = CustmrData.poa_type_ecaf;
        $("#pre_poa_type").text(poa_type);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poa_number = CustmrData.poa_number;
        $("#pre_poa_number").text(poa_number);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poa_issue_place = CustmrData.poa_issue_place;
        $("#pre_poa_issue_place").text(poa_issue_place);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poa_issuing_auth = CustmrData.poa_issuing_auth_ecaf;
        $("#pre_poa_issuing_auth").text(poa_issuing_auth);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var poa_issue_date = CustmrData.poa_issue_date;
        $("#pre_poa_issue_date").text(poa_issue_date);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }

//Service type
    try {
        var service_type = CustmrData.service_type_cmb_ecaf;
        $("#pre_service_type").text(service_type);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var comments = CustmrData.comments;
        $("#pre_comments").text(comments);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }

    //Nominee type
    try {
        var nominee_type = CustmrData.nominee_type_ecaf;
        $("#pre_nominee_type").text(nominee_type);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var nominee_value = CustmrData.nominee_value;
        $("#pre_nominee_value").text(nominee_value);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }

    try {
        var serviceType = CustmrData.service_type_cmb;
//         alert(serviceType+"::serviceType");
        if (serviceType === "1" || serviceType === "8") {
            $("#pre_bb_only").show();
            $("#pre_bb_only_lbl").show();
            $("#pre_bb_req_yes").show();
            $("#pre_bb_req_yes_lbl").show();
        } else {
            $("#pre_bb_only").hide();
            $("#pre_bb_only_lbl").hide();
            $("#pre_bb_req_yes").hide();
            $("#pre_bb_req_yes_lbl").hide();
        }
        if (serviceType === "2" || serviceType === "3") {//FTTH BB,FTTH Broadband cons
            $("#bb_conns_lbl").show();
            $("#bb_conns").show();
            $("#bb_conns").text(CustmrData.no_of_bb_cons);
            $("#voice_conns_lbl").show();
            $("#voice_conns").show();
            $("#voice_conns").text(CustmrData.no_of_voice_cons);
        } else if (serviceType === "4") {//FTTH voice cons
            $("#voice_conns_lbl").show();
            $("#voice_conns").show();
            $("#voice_conns").text(CustmrData.no_of_voice_cons);
            $("#bb_conns_lbl").show();
            $("#bb_conns").show();
            $("#bb_conns").text(CustmrData.no_of_bb_cons);
        }
        var bb_only = CustmrData.bb_only_ecaf;
        $("#pre_bb_only").text(bb_only);
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bb_req_yes = CustmrData.bb_req_yes_ecaf;
        $("#pre_bb_req_yes").text(bb_req_yes);
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }
    try {
        var bb_req_yes = CustmrData.bb_req_yes;
        if (bb_req_yes == "1" || bb_req_yes == '2' || serviceType === "6") {
            $("#pre_connection_type").show();
            $("#pre_connection_type_lbl").show();
        } else {
            $("#pre_connection_type").hide();
            $("#pre_connection_type_lbl").hide();
        }
        var connection_type = CustmrData.connection_type_ecaf;
        $("#pre_connection_type").text(connection_type);
    } catch (e) {
//        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while getting data in setKYCPreviewData' + e);
    }


    try {
        window.parent.$('#wait').hide();
    } catch (e) {
        alert(e)
    }
}

function  setEKYCReceiptData() {
//ycCaf.js):::::::::::::::::::starting of setKYCReceiptData');
    try {
        //job upload message
        var job_status_mesg = $("#JOB_STATUS").val();
        if (job_status_mesg !== null && job_status_mesg !== '') {
            $("#divWings").modal('show');
            $('#wl_job_upload_msg').append(job_status_mesg);
        }
        $("#date_of_application").text($("#DATE_TIME").val()); //DATE_TIME
        $("#Receipt_no").text($("#RECEIPTNO").val()); //RECEIPT_SEQ_NO
//        $("#franchisee_name").text(FranchiseName); //FranchiseeName
//        $("#re_franchise_addr").text(franchaddress); //FrachiseeAddress

        try {
            var cafSerialNo = $("#CAF_NO").val();
            if (cafSerialNo == "null" || cafSerialNo == "" || cafSerialNo == null) {
                $("#caf_serial_no").text("");
            } else {
                $("#caf_serial_no").text(cafSerialNo);
            }
        } catch (e) {
//            alert('JS Log(FMS_newform.js):::::::::::::::::::Exception in setEKYCReceiptData');
        }
        var FMS_KYC_Cust_Data = $("#FMS_KYC_Cust_Data").val();
        var AdharRes = FMS_KYC_Cust_Data;
        var CustmrData = JSON.parse(AdharRes);
//        try {
//            var UserCode = franchisecode;
//            if (UserCode == "null" || UserCode == "" || UserCode == null) {
//                $("#POS_code").text("");
//            } else {
//                $("#POS_code").text(franchisecode);
//            }
//        } catch (e) {
////            utilsObj.writeLog('JS Log(FMS_newform.js):::::::::::::::::::Exception in setEKYCReceiptData');
//        }
        $("#cust_name").text(CustmrData.first_name);
        var gender = CustmrData.gender;
        if (gender == "1") {
            $("#gender").text("Female");
        } else if (gender == "2") {
            $("#gender").text("Male");
        } else if (gender == "3") {
            $("#gender").text("Other");
        }
        $("#dob").text(CustmrData.dob);
        $("#age").text(CustmrData.age);
        var res = "";
        var count = 0;
        if (CustmrData.inst_addr_hno.length > 0) {
            if (count == '0') {
                res = res + CustmrData.inst_addr_hno;
                count = 1;
            } else {
                res = res + "," + CustmrData.inst_addr_hno;
                count = 1;
            }
        }
        if (CustmrData.inst_addr_vill.length > 0) {

            if (count == '0') {
                res = res + CustmrData.inst_addr_vill;
                count = 1;
            } else {
                res = res + "," + CustmrData.inst_addr_vill;
                count = 1;
            }

        }
        if (CustmrData.inst_addr_city.length > 0) {
            if (count == '0') {
                res = res + "," + CustmrData.inst_addr_city;
                count = 1;
            } else {
                res = res + "," + CustmrData.inst_addr_city;
                count = 1;
            }

        }
        if (CustmrData.inst_addr_district.length > 0) {

            if (count == '0') {
                res = res + "," + CustmrData.inst_addr_district;
                count = 1;
            } else {
                res = res + "," + CustmrData.inst_addr_district;
                count = 1;
            }

        }
        if (CustmrData.inst_addr_state.length > 0) {
            if (count == '0') {
                res = res + "," + CustmrData.inst_addr_state;
                count = 1;
            } else {
                res = res + "," + CustmrData.inst_addr_state;
                count = 1;
            }

        }

        $("#connection_applied").text(CustmrData.service_type_cmb_ecaf);
        $("#address2").text(res);
        $("#service_Type").text(CustmrData.service_type_cmb_ecaf);
        $("#re_poi_type").text(CustmrData.poi_type_ecaf);
        $("#re_poi_issuing_auth").text(CustmrData.poi_issuing_auth_ecaf);
        $("#re_poi_issue_date").text(CustmrData.poi_issue_date);
        $("#re_poi_number").text(CustmrData.poi_number);
        $("#re_poa_type").text(CustmrData.poa_type_ecaf);
        $("#re_poa_issuing_auth").text(CustmrData.poa_issuing_auth_ecaf);
        $("#re_poa_issue_date").text(CustmrData.poa_issue_date);
        $("#re_poa_number").text(CustmrData.poa_number);
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::Exception in setKYCReceiptData');
    }
//    alert('JS Log(FMS_kycCaf.js):::::::::::::::::::ending of setKYCReceiptData');

    try {
        //document.getElementById('wait').style.display = 'none';
    } catch (e) {
        alert(e)
    }
}

function validateEKYCCafNxt() {
//    alert('JS Log(FMS_newform.js):::::::::::::::::::starting of validateCaf');
    try {
        var objCustData = {};
//        alert('JS Log(FMS_newform.js):::::::::::::::::::' + JSON.stringify(metaDataValidation));

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
                                alert(dispName + '  should be mandatory.')
                                return false;
                            } else if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    alert('Home phone should be mandatory.')
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
                                    alert('Home phone should be mandatory.')
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
                                    alert('Work phone should be mandatory.')
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
                                    alert('Work phone should be mandatory.')
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
                                    alert('Fax no should be mandatory.')
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
                                    alert('Fax no should be mandatory.')
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
                } else if (target == "bill_email") {
                    var targetVal = $('#' + target).val();
                    if ($("#bill_media").val() === "1") {
                        if (targetVal.length == 0) {
                            $('#' + target).val('');
                            $('#' + target).focus().css('border-color', 'red');
                            alert(dispName + '  should be mandatory.')
                            return false;
                        } else {
                            objCustData[target] = targetVal;
                            $('#' + target).focus().css('border-color', 'green');
                        }
                    } else {
                        objCustData[target] = targetVal;
                        $('#' + target).focus().css('border-color', 'green');
                    }
                } else {
                    if (TYPE == 'TF' || TYPE == 'DT') {
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal.length == 0) {
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + '  should be mandatory.');
                                $('#' + target).val('');
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                        }
                    } else if (TYPE == 'DD') {
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality') {
                                    var dd = $('#' + target).data("kendoDropDownList");
                                    dd.focus();
                                } else {
                                    $('#' + target).focus().css('border-color', 'red');
                                }
                                alert(dispName + '  should be mandatory.')
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                // for insta & Bill addr fields _ecaf same as targetVal 
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' || target == 'bill_main_locality' || target == 'bill_sub_locality' || target == 'bill_exchange_code' || target == 'inst_exchange_code') {
                                    objCustData[idval] = targetVal;
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
                                objCustData[idval] = targetVal;
                            } else {
                                objCustData[idval] = $('#' + target + ' option:selected').text();
                            }

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
                //alert('JS Log(FMS_newform.js):::::::::::::::::::exception for loop  validateCaf' + e);
            }
        }
        if (objCustData.f_h_name.length > 0) {
            if (objCustData.me_f_h_name === "") {
                alert("Father name must not be empty");
                $("#me_f_h_name").focus();
                return false;
            }
        } else if (objCustData.f_h_name === "" && objCustData.me_f_h_name === "") {
            alert("Father name must not be empty");
            $("#me_f_h_name").focus();
            return false;
        }


        var fmskycfinalDaTa = JSON.stringify(objCustData);
        var fmskycFullData = fmskycfinalDaTa.concat($('#fms_ekyc_Stp1Data').val());

//        alert('JS Log(newForm.js):::::::::::::::::::ekyc Form Full Data ' + ekycFullData);
        fmskycFullData = fmskycFullData.replace("}{", ",");
//        console.log("::::" + fmskycFullData);
        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.FMS_KYC_Cust_Data = fmskycFullData;
        reqData.ekycformFieldsMetaData = $("#ekycformFieldsMetaData").val();
        reqData.fms_ekyc_Stp1Data = $("#fms_ekyc_Stp1Data").val();

        try {
            document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
            document.uploadCafeKycForm.method = "post";
            document.uploadCafeKycForm.action = "fmsekycFullData.do";
            document.uploadCafeKycForm.reqData.value = encrypt(JSON.stringify(reqData));
            document.uploadCafeKycForm.submit();
        } catch (e) {
//                alert(e)
        }
//        }
    } catch (e) {
        //alert('JS Log(FMS_newform.js):::::::::::::::::::exception validateCaf' + e);
    }
}

function fmsJOBUpload() {
    try {
        FMSnewFormMem.setFMSKYCTypes();
        window.location.href = "FMS_kyc_step5.html";
//        fmsJOb.uploadFMSJob();

    } catch (e) {
        alert('JS Log(FMS_newform.js)::::Exception in :::::::fmsJOBUpload:::') + e;
    }

}

function  getEKYCReceiptData(from) {
    try {


        var date_of_application = $("#date_of_application").text();
        var Receipt_no = $("#Receipt_no").text();
//        var franchisee_name = $("#franchisee_name").text();
//        var POS_code = $("#POS_code").text();
//        var re_franchise_addr = $("#re_franchise_addr").text();
//        var connection_applied = servicetype;
        var caf_serial_no = $("#caf_serial_no").text();


        if (from == 'Generatereceipt') {
            document.acknowledgement.action = "";
            var reqData = {};
//            reqData.reqSessionId = parent.$("#reqSessionId").val()
            reqData.date_of_application = date_of_application;
            reqData.Receipt_no = Receipt_no;
//            reqData.franchisee_name = franchisee_name;
//            reqData.POS_code = POS_code;
//            reqData.re_franchise_addr = re_franchise_addr;
//            reqData.connection_applied = connection_applied;
            reqData.caf_serial_no = caf_serial_no;

            $.ajax({
                url: 'uploadFmsEkycPrintReceipt.do',
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
                    //                alert("error print " + JSON.stringify(data));
                }
            });
        } else if (from == 'Generatepdf') {
            try {
                var reqData = {};
//                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.date_of_application = date_of_application;
                reqData.Receipt_no = Receipt_no;
//                reqData.franchisee_name = franchisee_name;
//                reqData.POS_code = POS_code;
//                reqData.re_franchise_addr = re_franchise_addr;
//                reqData.connection_applied = connection_applied;
                reqData.caf_serial_no = caf_serial_no;
                document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
                document.acknowledgement.method = "post";
                document.acknowledgement.action = "downloadfmsEkycpdfKYC.do";
                document.acknowledgement.reqData = encrypt(JSON.stringify(reqData));
                document.acknowledgement.submit();

            } catch (e) {
                alert("JS Log(FMS_kycCaf.js):::::::::::Exception in billing exchange codes loading:::::" + e);
            }

        }
    } catch (e) {
        alert('JS Log(FMS_kycCaf.js):::::::::::::::::::exception while forwardng data' + e);
    }

}


function loadEKYCAadharValues(type) {
//    setTimeout(function () {
//        alert('JS Log(newForm.js):::::::::::::::::::Load Aadhar details starts ');
//        loadUserName();
    setAadharValues(type);
    // setCAFMobiledate();
//        alert('JS Log(newForm.js):::::::::::::::::::Load Aadhar details ends ');
//    }, 10);
}
function setAadharValues(type) {
    var strLoginResponse = document.getElementById("loginResponse").value;
    var loginResponse = JSON.parse(strLoginResponse);
    try {
        if (type == 'Subscriber') {
            var path = document.getElementById("Aadhar_SubscriberPhoto").value;
            document.getElementById('aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);

//            newFormMem.setImage("Aadhar_SubscriberPhoto");
        } else if (type == 'Agent') {
            var path = document.getElementById("Aadhar_AgentPhoto").value;
            document.getElementById('Agent_aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);
        }

    } catch (ee) {
//        alert(ee);
    }


    try {
        var objagentAdharRes = {};
        var stragentAdharRes = "";
        if (type == 'Agent') {
//            stragentAdharRes = newFormMem.getJSONProperty('AgentAadharResponse');

            var eKYCDataEntry = document.getElementById("AgentAadharResponse").value;
            objagentAdharRes = JSON.parse(eKYCDataEntry);

            var agentAadharNo = objagentAdharRes.UidData_uid;
            //        var agentAadharNo=objagentAdharRes.Aadhar_Id;
            if (agentAadharNo.length > 0) {
                $("#aadhar_no_txt").text(agentAadharNo);
                //            $("#poi_number").val(agentAadharNo);  

            }

            // alert(type);
            var agentFather = objagentAdharRes.Poa_co;
            // alert(agentFather);
            try {
                if (agentFather.toString().trim().length > 0) {
                    $("#f_h_name").val(agentFather);
                    $("#f_h_name").attr('readonly', 'readonly');
                } else {
                    $("#f_h_name").val('');
                }
            } catch (e) {
//            alert(e);
            }


            var Agentname = objagentAdharRes.Poi_name;
            //        var Agentname=objagentAdharRes.Poi_Name;
            if (Agentname.length > 0) {
                $("#first_name").val(Agentname);

            } else {
                $("#first_name").val('');

            }

            var Agent_Gen = objagentAdharRes.Poi_gender;
            //        var Agent_Gen=objagentAdharRes.Poi_Gender;
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
            var formatedDate = getDataFormat(objagentAdharRes.Poi_dob);
            //        var formatedDate =getDataFormat(objagentAdharRes.Poi_Dob);

            $("#dob").val(formatedDate);

            var age = getAge(objagentAdharRes.Poi_dob);
            //        var age = getAge(objagentAdharRes.Poi_Dob);
            $("#age").val(age);

            var Agent_Email = objagentAdharRes.Poi_email;
            //        var Agent_Email=objagentAdharRes.Poa_email;
            if (Agent_Email.length > 0) {
                $("#email").val(Agent_Email);
                $("#email").attr('readonly', 'readonly');
            } else {
                $("#email").val();
            }

            var Agent_hno = objagentAdharRes.Poa_house;
            //        var Agent_hno=objagentAdharRes.Poa_house;
            if (Agent_hno.length > 0) {
                $("#loc_addr_hno").val(Agent_hno);

            } else {
                $("#loc_addr_hno").val('');

            }

            var Agent_locality = objagentAdharRes.Poa_loc;
            if (Agent_locality.length > 0) {
                $("#loc_addr_locality").val(Agent_locality);
                $("#loc_addr_locality").attr('readonly', 'readonly');
            } else {

            }

            var Agent_landmark = objagentAdharRes.Poa_lm;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_landmark.length > 0) {
                $("#loc_addr_landmark").val(Agent_landmark);
                $("#loc_addr_landmark").attr('readonly', 'readonly');

            } else {
            }

            var Agent_subDistrict = objagentAdharRes.Poa_subdist;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_subDistrict.length > 0) {
                $("#loc_addr_sub_dist").val(Agent_subDistrict);
                $("#loc_addr_sub_dist").attr('readonly', 'readonly');

            } else {
            }

            var Agent_postOffice = objagentAdharRes.Poa_po;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_postOffice.length > 0) {
                $("#loc_addr_post_office").val(Agent_postOffice);
                $("#loc_addr_post_office").attr('readonly', 'readonly');

            } else {
            }
            var Agent_street = objagentAdharRes.Poa_street;
            //        var Agent_street=objagentAdharRes.Poa_street;
            if (Agent_street.length > 0) {
                $("#loc_addr_street").val(Agent_street).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_street").val();

            }


            var Agent_city = objagentAdharRes.Poa_vtc;
            //        var Agent_city=objagentAdharRes.Poa_dist;
            if (Agent_city.length > 0) {
                $("#loc_addr_city").val(Agent_city).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_city").val();

            }


            var Agent_dist = objagentAdharRes.Poa_dist;
            //        var Agent_city=objagentAdharRes.Poa_dist;
            if (Agent_dist.length > 0) {
                $("#loc_addr_district").val(Agent_dist).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_district").val();

            }

            var Agent_state = objagentAdharRes.Poa_state;
            //        var Agent_state=objagentAdharRes.Poa_state;
            if (Agent_state.length > 0) {
                $("#loc_addr_state").val(Agent_state).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_state").val('');

            }

            var Agent_Pincode = objagentAdharRes.Poa_pc;
            //        var Agent_Pincode=objagentAdharRes.Poa_pc;
            if (Agent_Pincode.length > 0) {
                $("#loc_addr_pin").val(Agent_Pincode).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_pin").val();

            }
            var agent_Unique_response_code = objagentAdharRes.KycRes_code;
            //        var agent_Unique_response_code=objagentAdharRes.e_Kyc_RRN;
            if (agent_Unique_response_code.length > 0) {
                $("#Agent_Unique_Response_Code").text(agent_Unique_response_code);
//                newFormMem.setProperty("Agent_Unique_Response_Code", agent_Unique_response_code);
                $("#Agent_Unique_Response_Code").val(agent_Unique_response_code);
            } else {
                $("#Agent_Unique_Response_Code").text('');

            }
            var agent_number = objagentAdharRes.Poi_phone;
//            var agent_number = "8008065276";
            if (agent_number.length > 0) {
                $("#mobile_no_txt").text(agent_number);
            } else {
                $("#mobile_no_txt").text("");
            }

            var agent_Date = $("#AgentAuthDate").val();
            //            var agent_Time=newFormMem.getProperty("AgentAuthTime");
            if (agent_Date.length > 0) {
                $("#Agent_Date").text(agent_Date);
                $("#AgentDate").val(agent_Date);

            } else {
                $("#Agent_Date").text('');

            }
        }
    } catch (e1) {
        alert('JS Log(newForm.js):::::::::::::::::::Exception in setAadharValues  block 2' + e1);
    }

}

function  nextBtnInAck() {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
//                document.location.href = "generatefmspdfKYC.do?reqData=" + encrypt(JSON.stringify(reqData));
    document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
    document.FMSeKYC_receipt.method = "post";
    document.FMSeKYC_receipt.action = "fmsDashboard.do";
    document.FMSeKYC_receipt.reqData = encrypt(JSON.stringify(reqData));
    document.FMSeKYC_receipt.submit();

}

function loadDeviceNameFms() {

    var selectedDevice = $("#selectDevice").val();
//    alert("selectedDevice::::" + selectedDevice)
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


function  nextBtnInPReview() {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
//                document.location.href = "generatefmspdfKYC.do?reqData=" + encrypt(JSON.stringify(reqData));
    document.getElementById("reqData").value = encrypt(JSON.stringify(reqData));
    document.FMSeKYC_receipt.method = "post";
    document.FMSeKYC_receipt.action = "fmsDashboard.do";
    document.FMSeKYC_receipt.reqData = encrypt(JSON.stringify(reqData));
    document.FMSeKYC_receipt.submit();


}

function instal_chkif_sameFun() {
    try {

    } catch (e) {
//        alert("JS Log(FMS_newform.js)::Exception in instal_chkif_sameFun method call " + e);
    }

    if (document.getElementById('instal_chkif_same').checked) {
        //    cust_Aadhaar,
        var AdharRes = $('#AadharResponse').val();

        var CustData = {};
        CustData = JSON.parse(AdharRes);

        try {
            if (CustData.Poa_house.length > 0) {
                $("#inst_addr_hno").val(CustData.Poa_house).attr('readonly', 'readonly');
            }
        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }

        try {
            if (CustData.Poa_street.length > 0) {
                $("#inst_addr_vill").val(CustData.Poa_street).attr('readonly', 'readonly');
            }
        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }
        var citytxtVal = "";
        try {

            if (CustData.hasOwnProperty("Poa_po")) {
                if (CustData.Poa_po.length > 0) {
                    citytxtVal += CustData.Poa_po + ',';
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            if (CustData.hasOwnProperty("Poa_dist")) {
                if (CustData.Poa_dist.length > 0) {
                    citytxtVal += CustData.Poa_dist + ',';
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            if (CustData.hasOwnProperty("Poa_state")) {
                if (CustData.Poa_state.length > 0) {
                    citytxtVal += CustData.Poa_state;
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            $("#inst_addr_city").val(citytxtVal).attr('readonly', 'readonly');

//            if (CustData.Poa_po.length > 0) {
//                if (CustData.Poa_dist.length > 0) {
//                    if (CustData.Poa_state.length > 0) {
//                        $("#inst_addr_city").val(CustData.Poa_po + "," + CustData.Poa_dist + "," + CustData.Poa_state).attr('readonly', 'readonly');
//                    } else {
//                        $("#inst_addr_city").val(CustData.Poa_po + "," + CustData.Poa_dist).attr('readonly', 'readonly');
//                    }
//                } else {
//                    $("#inst_addr_city").val(CustData.Poa_po).attr('readonly', 'readonly');
//                }
//
//            }
        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }

//        try {
//            if (CustData.Poa_dist.length > 0) {
//                $("#inst_addr_district").val(CustData.Poa_dist).attr('readonly', 'readonly');
//            }
//        } catch (e) {
////            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
//        }
//
//        try {
//            if (CustData.Poa_state.length > 0) {
//                $("#inst_addr_state").val(CustData.Poa_state).attr('readonly', 'readonly');
//            }
//        } catch (e) {
////            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
//        }

    } else {
        $("#inst_addr_hno").val('').removeAttr('readonly');
        $("#inst_addr_vill").val('').removeAttr('readonly');
        $("#inst_addr_city").val('').removeAttr('readonly');
//        $("#inst_addr_state").val('').removeAttr('readonly');
//        $("#inst_addr_district").val('').removeAttr('readonly');
//        instaldistrictLaodingEkyc();
    }
}

function instal_chkif_sameFunBill() {
    try {

    } catch (e) {
//        alert("JS Log(FMS_newform.js)::Exception in instal_chkif_sameFun method call " + e);
    }

    if (document.getElementById('instal_chkif_samebill').checked) {
        //    cust_Aadhaar,
        var AdharRes = $('#AadharResponse').val();

        var CustData = {};
        CustData = JSON.parse(AdharRes);

        try {
            if (CustData.Poa_house != '') {
                $("#inst_addr_hno").val(CustData.Poa_house).attr('readonly', 'readonly');
            } else {
                $("#inst_addr_hno").val(CustData.Poa_loc).attr('readonly', 'readonly');

            }
//            if (CustData.Poa_house.length > 0) {
//                $("#bill_addr_house_no").val(CustData.Poa_house).attr('readonly', 'readonly');
//            }
        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }

        try {
            if (CustData.Poa_street.length > 0) {
                $("#inst_addr_vill").val(CustData.Poa_street).attr('readonly', 'readonly');
            }
        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }
        var citytxtVal = "";
        try {

            if (CustData.hasOwnProperty("Poa_po")) {
                if (CustData.Poa_po.length > 0) {
                    citytxtVal += CustData.Poa_po + ',';
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            if (CustData.hasOwnProperty("Poa_dist")) {
                if (CustData.Poa_dist.length > 0) {
                    citytxtVal += CustData.Poa_dist + ',';
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            if (CustData.hasOwnProperty("Poa_state")) {
                if (CustData.Poa_state.length > 0) {
                    citytxtVal += CustData.Poa_state;
                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
                }

            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
            }
            $("#inst_addr_city").val(citytxtVal).attr('readonly', 'readonly');

//            if (CustData.Poa_po.length > 0) {
//                if (CustData.Poa_dist.length > 0) {
//                    if (CustData.Poa_state.length > 0) {
//                        $("#bill_addr_city").val(CustData.Poa_po + "," + CustData.Poa_dist + "," + CustData.Poa_state).attr('readonly', 'readonly');
//                    } else {
//                        $("#bill_addr_city").val(CustData.Poa_po + "," + CustData.Poa_dist).attr('readonly', 'readonly');
//                    }
//                } else {
//                    $("#bill_addr_city").val(CustData.Poa_po).attr('readonly', 'readonly');
//                }
//
//            }

        } catch (e) {
//            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
        }

//        try {
//            if (CustData.Poa_dist.length > 0) {
//                $("#bill_addr_district").val(CustData.Poa_dist).attr('readonly', 'readonly');
//            }
//        } catch (e) {
////            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
//        }
//
//        try {
//            if (CustData.Poa_state.length > 0) {
//                $("#bill_addr_state").val(CustData.Poa_state).attr('readonly', 'readonly');
//            }
//        } catch (e) {
////            alert("JS Log(FMS_newform.js)::Exception in adhar values into panel " + e);
//        }

    } else {
        $("#inst_addr_hno").val('').removeAttr('readonly');
        $("#inst_addr_vill").val('').removeAttr('readonly');
        $("inst_addr_city").val('').removeAttr('readonly');
//        $("#bill_addr_state").val('').removeAttr('readonly');
//        $("#bill_addr_district").val('').removeAttr('readonly');
//        billdistrictLaodingEkyc();
    }
}

function instaldistrictLaodingEkyc() {
    try {
//        $('#inst_main_locality').children().remove();
//        $('#inst_main_locality').append('<option value="0">Select from list</option>');
        var state = $("#inst_addr_state").val();
        var district = $("#inst_addr_district").val();
        if (state == "0" || state == null) {
//            alert("Please select state");
            return false;
        } else if (district == "0" || district == null) {
//            alert("Please select district");
            return false;
        } else {
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            reqData.state = state;
            reqData.district = district;
            reqData.type = "FMSEKYC";
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
                        $('#inst_main_locality').append('<option value="0">Select from list</option>');
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
        }
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//        }
    } catch (e) {
        alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
    }
}
function billdistrictLaodingEkyc() {
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
            reqData.type = "FMSEKYC";
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
                        $('#bill_main_locality').append('<option value="0">Select from list</option>');
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
        }
//                var availableDistrictsLoading = FMSnewFormMem.DistrictsLoding(state);
//        }
    } catch (e) {
        alert("JS Log(FMS_kycCaf.js):::::::exception  in districtsLoading :::::" + e);
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

function validateEKYCCafNxtOTP() {

//    alert('JS Log(FMS_newform.js):::::::::::::::::::starting of validateCaf');
    try {
        var sel_mob_no = $('#sel_mob_no').val();
        if (sel_mob_no == '') {
            alert("Please select Wings Mobile number");
            return false;
        }
        var objCustData = {};
//        console.log('JS Log(FMS_newform.js):::::::::::::::::::' + JSON.stringify(metaDataValidation));

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
//alert(target);
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
                                alert(dispName + '  should be mandatory.')
                                return false;
                            } else if (targetVal == '3') {
                                var targetv = $('#cust_pre_no').val();
                                if (targetv.length == 0) {
                                    $('#cust_pre_no').val('');
                                    $('#cust_pre_no').focus().css('border-color', 'red');
                                    alert('Home phone should be mandatory.')
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
                                    alert('Home phone should be mandatory.')
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
                                    alert('Work phone should be mandatory.')
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
                                    alert('Work phone should be mandatory.')
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
                                    alert('Fax no should be mandatory.')
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
                                    alert('Fax no should be mandatory.')
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
                } else if (target == "bill_email") {
                    var targetVal = $('#' + target).val();
                    if ($("#bill_media").val() === "1") {
                        if (targetVal.length == 0) {
                            $('#' + target).val('');
                            $('#' + target).focus().css('border-color', 'red');
                            alert(dispName + '  should be mandatory.')
                            return false;
                        } else {
                            objCustData[target] = targetVal;
                            $('#' + target).focus().css('border-color', 'green');
                        }
                    } else {
                        objCustData[target] = targetVal;
                        $('#' + target).focus().css('border-color', 'green');
                    }
                } else if (target == "nominee_type") {
                    var targetVal = $('#' + target).val();
                    if (targetVal == 0) {
                        $('#' + target).focus().css('border-color', 'red');
                        alert(dispName + '  should be mandatory.')
                        return false;
                    } else {
                        objCustData[target] = targetVal;
                        var idval = target + "_ecaf";
                        objCustData[idval] = $('#' + target + '  option:selected').text();
                    }
                } else {
                    if (TYPE == 'TF' || TYPE == 'DT') {

                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            if(target=='bill_addr_house_no'||target=='bill_addr_vill'||target=='bill_addr_city' || target=='BILL_ADDR_PINCODE'){}else{
                            if (targetVal.length == 0) {
                                $('#' + target).focus().css('border-color', 'red');
                                alert(dispName + '  should be mandatory.');
                                $('#' + target).val('');
                                return false;
                            } else {
                                objCustData[target] = targetVal;
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        }
                        } else {
                            objCustData[target] = targetVal;
                        }
                    } else if (TYPE == 'DD') {
                        var targetVal = $('#' + target).val();
                        if (!(MANDATORY == 'N')) {
                            if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
                                 if(target=='bill_main_locality'){}else{
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality' ) {
                                    var dd = $('#' + target).data("kendoDropDownList");
                                    dd.focus();
                                } else {
                                    $('#' + target).focus().css('border-color', 'red');
                                }
                                alert(dispName + '  should be mandatory.')
                                return false;
                            }
                            } else {
                                objCustData[target] = targetVal;
                                var idval = target + "_ecaf";
                                // for insta & Bill addr fields _ecaf same as targetVal 
                                if (target == 'inst_main_locality' || target == 'inst_sub_locality'  || target == 'inst_exchange_code') {
                                    objCustData[idval] = targetVal;
                                } else {
                                    objCustData[idval] = $('#' + target + ' option:selected').text();
                                }
                                $('#' + target).focus().css('border-color', 'green');
                            }
                        } else {
                            objCustData[target] = targetVal;
                            var idval = target + "_ecaf";
                            // for insta & Bill addr fields _ecaf same as targetVal 
                            if (target == 'inst_main_locality' || target == 'inst_sub_locality'  || target == 'inst_exchange_code') {
                                objCustData[idval] = targetVal;
                            } else {
                                objCustData[idval] = $('#' + target + ' option:selected').text();
                            }

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
                //alert('JS Log(FMS_newform.js):::::::::::::::::::exception for loop  validateCaf' + e);
            }
        }

        if (objCustData.f_h_name.length > 0) {
            if (objCustData.me_f_h_name === "") {
                alert("Father name must not be empty");
                $("#me_f_h_name").focus();
                return false;
            }
        } else if (objCustData.f_h_name === "" && objCustData.me_f_h_name === "") {

            alert("Father name must not be empty");
            $("#me_f_h_name").focus();
            return false;
        }
        var hrms_num = $('#hrms_number').val();
//        if (hrms_num == "") {
//            alert("HRMS Number should be mandatory");
//            return false;
//        }

        var selTarifPlan = $("#cust_wings_traiff").val();
        var selTarifPlanName = $('#cust_wings_traiff').find("option:selected").text();
                if (selTarifPlan != 0) {
            if (selTarifPlan == "WTP2") {
                var plan_org_name = $('#plan_org_name').val();
                var plan_service_num = $('#plan_service_num').val();
                objCustData.TARRIF_FLAG = "GOVT";
//               $('#input_POI_gov').val();
                if (plan_org_name.trim() == "") {
                    alert(govtNameEmpty);
                    return false;
                } else if (plan_service_num.trim() == "") {
                    alert(govtValEmpty);
                    return false;
                }
                var userFile = document.getElementById("input_POI_govt");
                if(! validateUserFile(userFile)){
                      return false;
                  }
                objCustData.TARIFF_ID_NAME = plan_org_name;
                objCustData.TARIFF_ID_VALUE = plan_service_num;
            } else if (selTarifPlan == "WTP3") {
                var plan_inst_name = $('#plan_inst_name').val();
                var plan_loc_name = $('#plan_loc_name').val();
//                           $('#input_POI_sdnt').val();
                objCustData.TARRIF_FLAG = "STUDENT";
                if (plan_inst_name.trim() == "") {
                    alert(stntNmEmpty);
                    return false;
                } else if (plan_loc_name.trim() == "") {
                    alert(locEmpty);
                    return false;
                }
                var userFile = document.getElementById("input_POI_stnt");
                  if(! validateUserFile(userFile)){
                      return false;
                  }
                 
                objCustData.TARIFF_ID_NAME = plan_inst_name;
                objCustData.TARIFF_ID_VALUE = plan_loc_name;
            } else if (selTarifPlan == "WTP4") {
                var plan_exst_llno = $('#plan_exst_llno').val();
                var plan_exst_llaccno = $('#plan_exst_llaccno').val();
                objCustData.TARRIF_FLAG = "LANDLINE";
                if (plan_exst_llno.trim() == "") {
                    alert(llnumEmpty);
                    return false;
                }
                if (plan_exst_llaccno.trim() == "") {
                    alert(llAccnumEmpty+" Should not be empty");
                    return false;
                }
                var userFile = document.getElementById("input_POI_ll");
                  if(! validateUserFile(userFile)){
                      return false;
                  }
                   
                objCustData.TARIFF_ID_NAME = plan_exst_llno;
                objCustData.TARIFF_ID_VALUE = plan_exst_llaccno;
            }else{
                objCustData.TARIFF_ID_NAME = "";
                objCustData.TARIFF_ID_VALUE = "";
                objCustData.TARRIF_FLAG = "";
            }
        } else {
            alert(selTarifpln);
            objCustData.TARRIF_FLAG = "";
	    return false;
        }
        var cust_bsnl_csc=$("#cust_bsnl_csc").val().trim();
       var cust_bsnl_franchise=$("#cust_bsnl_franchise").val().trim();
        if (!cust_bsnl_csc == "" && !cust_bsnl_franchise == "") {
            $("#cust_bsnl_csc").val("");
            $("#cust_bsnl_franchise").val("");
            $("#cust_bsnl_franchise").focus();
            alert(cscFranchAlrt);
            return false;
        }
       var wngPin=$('#wings_pin').val();
        var chkISD=$('#chkISD').is(':checked');
        var chkIR=$('#chkIR').is(':checked');
        
        objCustData.sel_mob_no = sel_mob_no;
        objCustData.cust_pre_type = 'None';
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
        objCustData.bill_addr_house_no= objCustData.inst_addr_hno;
        objCustData.bill_addr_vill = objCustData.inst_addr_vill;
        objCustData.bill_addr_city = objCustData.inst_addr_city;
        objCustData.bill_addr_state = objCustData.inst_addr_state;
        objCustData.bill_addr_state_ecaf = objCustData.inst_addr_state_ecaf;
        objCustData.bill_addr_district= objCustData.inst_addr_district;
        objCustData.bill_addr_district_ecaf = objCustData.inst_addr_district_ecaf;
        objCustData.bill_main_locality = objCustData.inst_main_locality;
        objCustData.bill_main_locality_ecaf = objCustData.inst_main_locality_ecaf;
        objCustData.bill_sub_locality= objCustData.inst_sub_locality ;
        objCustData.bill_sub_locality_ecaf = objCustData.inst_sub_locality_ecaf;
        objCustData.bill_exchange_code = objCustData.inst_exchange_code;
        objCustData.bill_exchange_code_ecaf = objCustData.inst_exchange_code_ecaf;
        objCustData.BILL_ADDR_PINCODE = objCustData.INSTAL_ADDR_PINCODE;
        objCustData.BILL_GST_STATE_CODE = '';
        objCustData.INST_GST_STATE_CODE_ecaf = '';
        objCustData.instal_chkif_same = true;
        objCustData.EMP_REFERAL = hrms_num;
        objCustData.WINGS_TARIFF_PLAN_ID = selTarifPlan;
        objCustData.WINGS_TARIFF_PLAN_ecaf = selTarifPlanName;
        objCustData.WINGS_PIN = wngPin;
        objCustData.WINGS_ISD = chkISD;
        objCustData.WINGS_IR = chkIR;
        objCustData.WINGS_CSC_CODE = cust_bsnl_csc;
        objCustData.WINGS_FR_RET_CODE = cust_bsnl_franchise;
        objCustData.service_type_cmb = -1;
        if (chkISD) {
            var mdataTF = ['bill_addr_house_no', 'bill_addr_vill', 'bill_addr_city', 'BILL_ADDR_PINCODE'];
            var mdataTFDispName = ['House No', 'Village ', 'City', 'Pincode'];
            var mdataDD = ['bill_addr_state', 'bill_addr_district', 'bill_main_locality', 'bill_sub_locality', 'bill_exchange_code'];
            var mdataDDDispName = ['State', 'District', 'Main locality', 'Sub Locality', 'Exchange code'];

            for (var i in mdataTF) {
              
                var target = mdataTF[i];
                var targetVal = $('#' + target).val();
                if (targetVal.length == 0) {
                    $('#' + target).focus().css('border-color', 'red');
                    alert(mdataTFDispName[i] + '  should be mandatory.');
                    $('#' + target).val('');
                    return false;
                } else {
                    objCustData[target] = targetVal;
                    $('#' + target).focus().css('border-color', 'green');
                }

            }
            for (var i in mdataDD) {
              
                var target = mdataDD[i];
                var targetVal = $('#' + target).val();
                if (targetVal == '0') {
//                                $('#' + target).focus().css('border-color', 'red');
                    if ( target == 'bill_main_locality' || target == 'bill_sub_locality') {
                        var dd = $('#' + target).data("kendoDropDownList");
                        dd.focus();
                    } else {
                        $('#' + target).focus().css('border-color', 'red');
                    }
                    alert(mdataDDDispName[i] + '  should be mandatory.')
                    return false;
                } else {
                    objCustData[target] = targetVal;
                    var idval = target + "_ecaf";
                    // for insta & Bill addr fields _ecaf same as targetVal 
                    if ( target == 'bill_main_locality' || target == 'bill_sub_locality'  ) {
                        objCustData[idval] = targetVal;
                    } else {
                        objCustData[idval] = $('#' + target + ' option:selected').text();
                    }
                    $('#' + target).focus().css('border-color', 'green');
                }

            }
        }
        
        var fmskycfinalDaTa = JSON.stringify(objCustData);
        var fmskycFullData = fmskycfinalDaTa.concat($('#fms_ekyc_Stp1Data').val());

//        alert('JS Log(newForm.js):::::::::::::::::::ekyc Form Full Data ' + ekycFullData);
        fmskycFullData = fmskycFullData.replace("}{", ",");
//        console.log("::::" + fmskycFullData);

        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.FMS_KYC_Cust_Data = fmskycFullData;
        reqData.ekycformFieldsMetaData = $("#ekycformFieldsMetaData").val();
        reqData.fms_ekyc_Stp1Data = $("#fms_ekyc_Stp1Data").val();
//        var frmData =  new FormData();
//        frmData.append("userFile",userFile.files[0]);
//        frmData.append("reqData",(JSON.stringify(reqData)));
        $('#waitform').show();

//    var fd = new FormData();
//    fd.append("userFile", userFile.files[0]);
//    fd.append('ReqData', $("#ReqData").val());
        try {
            document.uploadCafeKycForm.method = "post";
            document.uploadCafeKycForm.action = "fmsekycFullDataOTP.do";
            document.uploadCafeKycForm.reqData.value = JSON.stringify(reqData);
            document.uploadCafeKycForm.submit();
        } catch (e) {
//                alert(e)
        }
//        }
    } catch (e) {
        //alert('JS Log(FMS_newform.js):::::::::::::::::::exception validateCaf' + e);
    }
}

function validateBillDtls(){

    $("#bill_addr_house_no").val();
        $("#bill_addr_vill").val();
        $("#bill_addr_city").val();
        $("#BILL_ADDR_PINCODE").val();
        $("#bill_addr_state").kendoDropDownList({dataSource: [$("#inst_addr_state").val()], });
        $("#bill_addr_district").kendoDropDownList({dataSource: [$("#inst_addr_district").val()], });
        $("#bill_main_locality").kendoDropDownList({dataSource: [$("#inst_main_locality").data("kendoDropDownList").text()], });
        $("#bill_sub_locality").kendoDropDownList({dataSource: [$("#inst_sub_locality").data("kendoDropDownList").text()], });
        $("#bill_exchange_code").kendoDropDownList({dataSource: [$("#inst_exchange_code").val()], });
    
}


function validateUserFile(userFile) {

    if (userFile.files[0] == undefined || userFile.files[0] == "undefined") {
        alert(fileUpldempty);
        return false;
    }
    
    if (userFile.files[0].size > fileUpldsize) {
        alert(fileUpldsizealt+fileUpldsize/1024+"KB");
        return false;
    }
    var fileName = userFile.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!(ext == "jpeg" || ext == "jpg" || ext == "pdf"))
    {
        alert(fileUpldtype);

        return false;
    }
    return true;
}

function validateMobile(event){
    var id = event.getAttribute('id');
                var mob_no = $('#'+id).val();
            if (mob_no != "") {
                var target = id
                var regExp1 = /(^[6-9]{1})([0-9]{0,9})$/;
                var targetVal = $('#' + target).val();
                if(!regExp1.test(targetVal)){
                   $('#' + target).val('');
                   alert(validmobilenumber);
                   return false;
                }
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

function validateTariffFields(event,allowedvalues,label){
        var objid = event.getAttribute('id');

    var value_id = $("#" + objid).val();
      var regExp="";
    if (allowedvalues == "alphabets") {
       regExp = /^[(a-z )(A-Z)]+$/;
    } else if (allowedvalues == "emailreg") {
        regExp = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.([a-zA-Z]{2,4})+([a-zA-Z.]{0,4})$/;
    } else if (allowedvalues == "numeric") {
        
        regExp = /^(([0-9]))+$/;
        if (objid == "mobile") {
           if (value_id.length != 10) {
             
          alertMessage("warning", almsgid + "  " + "minimum length is 10",altID);
          $('#' + objid).focus();
          $('#' + objid).val('');
            }
        } 
     } else if(allowedvalues=="website"){
        regExp =/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        
     }else if(allowedvalues == "alphNumeric") {
            
        regExp = /^[a-zA-Z0-9 _]+$/;
     }else if (allowedvalues == "ALL") {
            regExp = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/;
     }
     else if (allowedvalues == "LandlineNum") {
            regExp = /^[0-9]+(-)([0-9]+)+$/;
     }
     else if (allowedvalues == "LandlineNumPrefix") {
            regExp =  /^[0][0-9]{2,4}$/;
     }
     else if (allowedvalues == "LandlineNumSufix") {
            regExp = /^[2][0-9]{5,7}$/;
     }else if(allowedvalues == "GSTIN"){
         regExp = /^[a-zA-Z0-9 _]+$/;
     }
      
            if (allowedvalues == "mobileNumber") {
            
            regExp = /(^[6-9]{1})([0-9]{0,9})$/;
            if(value_id.length!=10){
               alert(invalidMOBNOTrial);
            $('#' + objid).focus();
            $('#' + objid).val('');  
            }else if (!regExp.test(value_id)) {
             alert(validMOBNOTrial);
            $('#' + objid).focus();
            $('#' + objid).val('');
        }
     }else if (!regExp.test(value_id)) {

             alert(  label+ " should be Valid");

            $('#' + objid).focus();
            $('#' + objid).val('');
        }
    
    
    
}

function checkSmeConDtls() {
    if (document.getElementById('instal_chkif_con_details').checked) {
        
        var inst_addr_hno = $("#inst_addr_hno").val();
        var inst_addr_vill = $("#inst_addr_vill").val();
        var inst_addr_city = $("#inst_addr_city").val();
        var INST_ADDR_PINCODE = $("#INSTAL_ADDR_PINCODE").val();
        var inst_addr_state = $("#inst_addr_state").val();
        var inst_addr_district = $("#inst_addr_district").val();
        if(!(inst_addr_district ==0 || inst_addr_district==null)){
               var inst_main_locality = $("#inst_main_locality").val();
               var inst_sub_locality = $("#inst_sub_locality").val();
               var inst_exchange_code = $("#inst_exchange_code").val();
        }
      if(inst_addr_hno=='' ||inst_addr_vill=='' ||inst_addr_city==''|| INST_ADDR_PINCODE =='' || inst_addr_state==0 || inst_addr_district== 0 ||inst_main_locality == 0  || inst_sub_locality== 0 || inst_exchange_code== 0 ){
          alert("Please fill the contact details");
          $('#instal_chkif_con_details').prop('checked', false);
          return false;
      }else{
        $("#bill_addr_house_no").val(inst_addr_hno);
        $("#bill_addr_vill").val(inst_addr_vill);
        $("#bill_addr_city").val(inst_addr_city);
        $("#BILL_ADDR_PINCODE").val(INST_ADDR_PINCODE);
        $("#bill_addr_state").find('option[value="'+$("#inst_addr_state").val()+'"]').prop("selected",true).change();
        $("#bill_addr_district").find('option[value="'+$("#inst_addr_district").val()+'"]').prop("selected",true).change();
        $("#bill_main_locality").data('kendoDropDownList').value($("#inst_main_locality").val());
        $("#bill_main_locality").change();
        $("#bill_sub_locality").data('kendoDropDownList').value($("#inst_sub_locality").val());
        $("#bill_sub_locality").change();
        $("#bill_exchange_code").find('option[value="'+$("#inst_exchange_code").val()+'"]').prop("selected",true).change();
    }
    } else {
        $("#bill_addr_house_no").val(" ");
        $("#bill_addr_vill").val(" ");
        $("#bill_addr_city").val(" ");
        $("#BILL_ADDR_PINCODE").val(" ");
        $("#bill_addr_state").find('option[value="0"]').prop("selected",true);
        $("#bill_addr_district").find('option[value="0"]').prop("selected",true);
        $("#bill_main_locality").data('kendoDropDownList').select(0);
        $("#bill_sub_locality").data('kendoDropDownList').select(0);
        $("#bill_exchange_code").find('option[value="0"]').prop("selected",true);

    }


}