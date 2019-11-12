var reservedGridArray = [];
var reservedGridobj = {};
var checked;
var TxnID;
var TxnType;
var PRICE;
function reservedNosGrid() {
    checked = "";
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();

    $.ajax({
        url: "listOfReserveNo.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            sessionCheck(data);
            var objFetch = JSON.stringify(data);
            reservedGridobj = JSON.parse(objFetch);
            reservedGridobj = reservedGridobj.response.responseData;
        }, error: function (data) {
            alert("error:" + JSON.stringify(data));
        }

    });
    if (reservedGridobj.STATUS == "0") {
        reservedGridArray = reservedGridobj.RESERVE_NOS;
    } else {
        alert(reservedGridobj.MESSAGE);
        return;
    }

    reservedGridNextID = reservedGridArray.length + 1;

    $(document).ready(function () {
        $("#grid1").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(reservedGridArray);
                    },
                    create: function (e) {
                        e.data.ProductID = reservedGridNextID++;
                        reservedGridArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        reservedGridArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        reservedGridArray.splice(getIndexById(e.data.ProductID), 1);
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
                            TRANS_TYPE: {type: "string"},
                            GSMNO: {type: "string"},
//                            Starttime: {type: "string"},
                            Action: {
                                type: "celleHtml"

                            }
                        }
                    }
                }
            },
            height: 440,
            sortable: true,
            reorderable: true,
            //groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [/*{ template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 80 },*/
//                {
//                    template: "<input type='checkbox' onclick='selectReserRow(this)' class='row-checkbox'/> <label>&nbsp;</label>", 
//                    width: 80
//                },
                {
                    field: "CAF_STATUS",
                    title: "CAF_STATUS",
                    width: 160,
                    hidden: true
                }, {

                    field: "PRICE",
                    title: "PRICE",
                    width: 160,
                    hidden: true
                },
                {

                    field: "TXN_ID",
                    title: "TXN_ID",
                    width: 160,
                    hidden: true
                }, {
                    field: "GSMNO",
                    title: "Mobile no.",
                    width: 160
                }, {
                    field: "TRANS_TYPE",
                    title: "Type.",
                    width: 160
                }, {
                    command: [
                        {
                            template: "<div class='action'><a href='javascript:void(0);' id='pay_btn_id' class='primarybt2' title='Pay' onclick='payFancyAmountPopup(this)'>Pay</a><a href='javascript:void(0);' class='primarybt2' id='caf_entry_id' title='CAF entry' onclick='goToCAFEntry(this)'>CAF entry</a></div>",
                        },
                    ],
                    field: "Action",
                    title: "Action",
//				encoded: false,
//				attributes: {"class": "action"},
                    width: 180
                }
            ],
            dataBound: function () {
                var grid = this;

                grid.tbody.find("tr").each(function (e) {
                    var model = grid.dataItem(this);
                    if (model.TRANS_TYPE === 'CYMN') {
                        $(this).find("#pay_btn_id").hide();
                        $(this).find("#caf_entry_id").show();
                    } else if (model.TRANS_TYPE === 'FANCY' || model.TRANS_TYPE === 'Fancy') {
                        if (model.CAF_STATUS === "2") {//CAF_STATUS = 2 -- payment not done
                            $(this).find("#pay_btn_id").show();
                            $(this).find("#caf_entry_id").hide();
                        } else if (model.CAF_STATUS === "1") {
                            $(this).find("#pay_btn_id").hide();
                            $(this).find("#caf_entry_id").show();
                        }
                    }
                });
            }
        });
    });
}
function selectReserRow(e) {

    try {
        checked = $(e).is(':checked');
        var row = $(e).closest("tr");
        var grid = $("#grid1").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        var value = dataItem.GSMNO;
//        newFormMem.setProperty("CYMN_GSM_NO", value);
        $("input.row-checkbox", "#grid1").prop("checked", false);
        $(e).prop("checked", checked);
    } catch (e) {
        checkedBooelan = 'false';
        //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in selectReserRow " + e);
    }
}
var cafData = {};
function goToCAFEntry(obj) {
    try {
        cafData = obj;
        parent.$('#corfirmation').modal('show');

//        alert(mobileNumber + ":::mobileNumber");
    } catch (e) {
        //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in goToCAFEntry " + e);
    }
}

function goToDataEntry() {
    var cafType = parent.$("input[name='reservedCafType']:checked").val();
    if (cafType == "eKYC" || cafType == "KYC") {
        gotoCAFOnCond(cafType);
        parent.$('#corfirmation').modal('hide');
    }
}

function gotoCAFOnCond(cafType) {
    var rowDATAJOBJ = {};
    var row = $(cafData).closest("tr");
    var gridRowDate = $("#grid1").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    var mobileNumber = rowdata.GSMNO;
    rowDATAJOBJ['GSMNO'] = mobileNumber;
    if (rowdata.PRICE === "") {
        rowDATAJOBJ['PRICE'] = "0";
    } else {
        rowDATAJOBJ['PRICE'] = rowdata.PRICE;
    }
    rowDATAJOBJ['FACEVALUE'] = rowdata.FACEVALUE;
    rowDATAJOBJ['USER_MOB_NO'] = rowdata.USER_MOB_NO;
    rowDATAJOBJ['PIN_NO'] = rowdata.PIN_NO;
    rowDATAJOBJ['TRANS_TYPE'] = rowdata.TRANS_TYPE;
    rowDATAJOBJ['CAF_STATUS'] = rowdata.CAF_STATUS;
    parent.$('#EKYC_LOAD_FLAG').val('1');
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.EKYC_LOAD_FLAG = "1";
    reqData.ROW_DATA = rowDATAJOBJ;
    document.reservedNumberForm.method = "post";
    document.reservedNumberForm.action = cafType + ".do";
    document.reservedNumberForm.reqData.value = encrypt(JSON.stringify(reqData));
    document.reservedNumberForm.submit();
}

function payFancyAmountPopup(obj) {
    try {
        var loginResponse = {};
        var strloginResponse = document.getElementById("loginResponse").value;
        loginResponse = JSON.parse(strloginResponse);

        $('#facncy_ctopup').val('');
        $('#facncy_mpin').val('');
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid1").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var mobileNumber = rowdata.GSMNO;
        TxnID = rowdata.TXN_ID;
        TxnType = rowdata.TRANS_TYPE;
        if (rowdata.PRICE === "") {
            PRICE = "0";
        } else {
            PRICE = rowdata.PRICE;
        }
        $('#divPay').modal("show");
        $('#gsmno_lable').text(rowdata.GSMNO);
        $('#amount_lable').text(rowdata.PRICE);
        //CTOPUP number loading
        var username = loginResponse.Activation_MobileNo;
        var UserFlag = loginResponse.UserFlag;
        var AgentUserType = loginResponse.AgentUserType;
        $("#facncy_ctopup").val(username);
//            }
        if (UserFlag === '3' || (UserFlag === '5' && AgentUserType === "NORMAL")) {//aadhar flag is 1 i,e means it is with mobile or adhar number
            $("#facncy_ctopup").attr("readonly", false);
        } else {
            $("#facncy_ctopup").attr("readonly", "readonly");
        }
    } catch (e) {
        //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in payFancyAmountPopup " + e);
    }
}

function fancyPayAmount() {
    try {
        var copup_no = $("#facncy_ctopup").val();
        var copup_mpin = $("#facncy_mpin").val();
        var gsmNumber = $("#gsmno_lable").text();
        if (copup_no.length < 10) {
            alert("Please enter  CTOPUP no.");
            $("#facncy_ctopup").val('');
            $("#facncy_ctopup").focus();
            return false;
        } else {
            if (copup_mpin.length === '0' || copup_mpin.length === 0) {
                alert("Please enter  PIN/UPC/MPIN code.");
                $("#facncy_mpin").focus();
                return false;
            } else {
                var reqData = {};
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.copup_no = copup_no;
                reqData.copup_mpin = copup_mpin;
                reqData.gsmNumber = gsmNumber;
                reqData.TxnID = TxnID;
                reqData.TxnType = TxnType;
                reqData.PRICE = PRICE;
                var fancyPayJSON = {};
                $.ajax({
                    url: "fancyMobileNoPay.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        sessionCheck(data);
                        var objFetch = JSON.stringify(data);
                        fancyPayJSON = JSON.parse(objFetch);
                        fancyPayJSON = fancyPayJSON.response.responseData;
                    }, error: function (data) {
                        alert("error:" + JSON.stringify(data));
                    }

                });

                reservedNosGrid();
                alert(fancyPayJSON.MESSAGE);
                $('#divPay').modal("hide");
            }
        }
    } catch (e) {
        //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in fancyPayAmount " + e);
    }
}
function fancyPayCnclFun() {
    $("#facncy_ctopup").val('');
    $("#facncy_mpin").focus();
    pageLoad('reservedNumber.do');
//    window.location.href = "reserved_numbers.html";
}

function cTopUpNumValid(keyE) {

    try {
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
            var mobile_no = $('#facncy_ctopup').val();
            if (mobile_no.length == 10) {
                if (charV === '6' || charV === '7' || charV === '8' || charV === '9') {
                } else {
                    newFormMem.alert("It should be a valid mobile number which should start with 6,7,8,9");
                    $('#facncy_ctopup').val('');
                    $('#facncy_ctopup').focus();
                    return false;
                }

            }

            return true;
        }
        return false;


    } catch (e) {
        //utilsObj.writeLog("JS Log(grid_reserved.js):::: Exception in cTopUpNumValid ::: " + e);
    }
}
function cTopUpMpinValid(keyE) {

    try {
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
            return true;
        } else {
            $('#facncy_mpin').val('');
            $('#facncy_mpin').focus();
            newFormMem.alert("It should be a valid pin number");
            return false;
        }
        return false;


    } catch (e) {
        //utilsObj.writeLog("JS Log(grid_reserved.js):::: Exception in cTopUpNumValid ::: " + e);
    }
}