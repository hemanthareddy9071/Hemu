var FANCYNoDataArry = [];
var fetchFANCYNosobj = {};
var checked;
var numberReg = /^[0-9]+$/;
var amount;
var GSMNO;
var userMob;
var pin;
function paidFancyNumbers() {
    checked = "";
    try {

        //ajax call
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        $.ajax({
            url: "fetchPaidFancyNumbers.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                sessionCheck(data);
                var fancyPinValidateRes = JSON.parse(JSON.stringify(data));
                fetchFANCYNosobj = fancyPinValidateRes.response.responseData;
//         
                if (fetchFANCYNosobj.STATUS == "0") {

//                    newFormMem.setProperty("FANCY_THRGH_SRCH", "0");
                    $('#FANCY_THRGH_SRCH').val('0');
//                    $("#divfancynumb").modal('show');
                    $("#divfancynumb").modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: true
                    });
                    FANCYNoDataArry = fetchFANCYNosobj.ROWS;
                    var FANCYNoDataNextID = FANCYNoDataArry.length + 1;
                    function getIndexById(id) {

                        var idx, len = FANCYNoDataArry.length;
                        for (var j; j < len; j++) {
                            if (FANCYNoDataArry[j].ProductID == id) {
                                return j;
                            }
                        }
                        return null;
                    }
                    try {
                        $(document).ready(function () {
                            $("#grid_PaidFancy").kendoGrid({
                                dataSource: {
                                    transport: {
                                        read: function (e) {
                                            e.success(FANCYNoDataArry);
                                        },
                                        create: function (e) {
                                            e.data.ProductID = FANCYNoDataNextID++;
                                            FANCYNoDataArry.push(e.data);
                                            e.success(e.data);
                                        },
                                        update: function (e) {
                                            FANCYNoDataArry[getIndexById(e.data.ProductID)] = e.data;
                                            e.success();
                                        },
                                        destroy: function (e) {
                                            FANCYNoDataArry.splice(getIndexById(e.data.ProductID), 1);
                                            e.success();
                                        }
                                    },
                                    error: function (e) {
                                        // handle data operation error
                                        alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                                    },
                                    pageSize: 10,
                                    batch: false,
                                    schema: {
                                        model: {
                                            id: "ProductID",
                                            fields: {
//                                CAFno: {type: "string"},
                                                GSMNO: {
                                                    ype: "string"
                                                },
                                                PRICE: {
                                                    type: "string"
                                                },
                                                FACEVALUE: {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },
                                },
                                sortable: true,
                                reorderable: true,
                                //groupable: true,
                                resizable: true,
                                filterable: true,
                                columnMenu: true,
                                pageable: true,
                                columns: [
                                    {template: "<input type='checkbox' onclick='fancyNoSelectRowFun1(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
                                    {
                                        field: "GSMNO",
                                        title: "Mobile no."
                                    }, {
                                        field: "PRICE",
                                        title: "Amount."
                                    }, {
                                        field: "FACEVALUE",
                                        title: "Face Value."
                                    }, {
                                        field: "USER_MOB_NO",
                                        title: "User Mobile No.",
                                        hidden: true
                                    }, {
                                        field: "PIN_NO",
                                        title: "Pin no.",
                                        hidden: true
                                    }
                                ]
                            });
                        });
                    } catch (e) {
//                        utilsObj.writeLog("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in gid loading " + e);
                    }
                } else {
//                    utilsObj.writeLog("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in reserveNumbers " + JSON.stringify(fetchFANCYNosobj));
                    $("#divfancynumb").modal('hide');
                    $("#simNumber_Div").hide();//removing simNumber_Div 
                    $("#cymn_mobile_pin_Div").hide();//removing cymn_mobile_pin_Div 
                    $("#mobile_no_Div").hide();//removing mobile_no_Div 
                    $('#remarks').val('');
                    alert(fetchFANCYNosobj.MESSAGE);
                }

            }, error: function (data) {
                alert("error fetchPaidFancyNumbers, data :" + JSON.stringify(data));
            }

        });
    } catch (e) {
        alert(e);
//        utilsObj.writeLog("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in paidFancyNumbers " + e);
    }
}
function paidClearbtnfancy() {
    $("#fancy_srch_num").val('');
    $("#fancy_searchoperator").val('ew');
    $("#fancy_total_dig").val('');
    paidFancyNumbers();
}
function fancyNoSelectRowFun1(e) {
    try {
        checked = $(e).is(':checked');
        var row = $(e).closest("tr");
        var grid = $("#grid_PaidFancy").data("kendoGrid");
        var dataItem = grid.dataItem(row);
//        utilsObj.writeLog("Log(grid_rservePaidfancyNo.js)::::::::::::row data " + JSON.stringify(dataItem));
        GSMNO = dataItem.GSMNO;
        amount = dataItem.PRICE;
        userMob = dataItem.USER_MOB_NO;
        pin = dataItem.PIN_NO;
//        newFormMem.setProperty("FANCY_GSM_NO", GSMNO);
//        newFormMem.setProperty("MOBILE_NO", userMob);
//        newFormMem.setProperty("TOTAL_AMT", amount);
        $('#MOBILE_NO').val(userMob);
        $('#TOTAL_AMT').val(amount);
        $("input.row-checkbox", "#grid_PaidFancy").prop("checked", false);
        $(e).prop("checked", checked);
    } catch (e) {
        checkedBooelan = 'false';
        utilsObj.writeLog("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in fancyNoSelectRowFun " + e);
    }

}
//reserver number.hmtl page function
function paidfancySrchFun() {
    try {
        paidFancyNumbers();
    } catch (e) {
        utilsObj.writeLog("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in btnGetInfo " + e);
    }
}
function fancyValidationFun(event) {
    try {


        var id = event.getAttribute('id');
        var fancy_srch_num = $("#fancy_srch_num").val();
        var fancy_total_dig = $("#fancy_total_dig").val();
        if (id === 'fancy_srch_num') {
            if (!numberReg.test(fancy_srch_num)) {
                $("#fancy_srch_num").val('');
                newFormMem.alert("Enter valid Mobile number");
                return false;
            }
        }
        if (id === 'fancy_total_dig') {
            if (!/^[1-9]+$/.test(fancy_total_dig)) {
                $("#fancy_total_dig").val('');
                newFormMem.alert("Enter valid Total digits sum of mobile no.");
                return false;
            }
        }
    } catch (e) {
        utilsObj.writeLog("JS Logs(grid_rservePaidfancyNo.js):::::Exception in fancyValidationFun:::::::::::::" + e);
    }
}

function paidfancyMoblNoSub() {
    try {
//        $("#usr_mobileno").val('');
        if (checked) {
//            alert(GSMNO+":::GSMNO ::: "+":::: pin ::: "+pin);
            $("#gsm_number").val(GSMNO).attr('readonly', 'readonly');//USERMOBILE
            $('#mobile_no').val(GSMNO).attr('readonly', 'readonly');
            $('#cymn_mobile_pin').val(pin).attr('readonly', 'readonly');
            alert("Selected Number has been reserved successfully...");
            $('#divfancynumb').modal('hide');
        } else {
            alert("Please select mobile number ");
//            document.getElementById('step2').style.display = 'none';
//            document.getElementById('step1').style.display = 'block';
        }
    } catch (e) {
        alert("Log(grid_rservePaidfancyNo.js):::::::::::: Exception in paidfancyMoblNoSub " + e);
    }
    return false;
}
function fancyBtncloseFun() {
    $('#remarks').val('');
    $('#cymn_mobile_pin_Div').hide();
    $('#mobile_no_Div').hide();
    $('#simNumber_Div').hide();
    $('#Retailer_Div').hide();
    $('#passport_expiry_Div').hide();
    $('#passport_no_Div').hide();
    $('#visa_no_Div').hide();
    $('#visa_validity_Div').hide();
    $('#visa_type_Div').hide();

}