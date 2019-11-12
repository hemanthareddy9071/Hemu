var FANCYNoDataArry = [];
var fetchFANCYNosobj = {};
var checked;
var searchbtnFlag = "false";
var currentPage = 1;
var lastPage = 1;
var navPageSize = 0;
var ddlFranchisee;
var numberReg = /^[0-9]+$/;
var amount;
var FANCY_GSM_NO;
var dataFancySourceObj = new kendo.data.DataSource({
    transport: {
        read: function (e) {
            e.success(FANCYNoDataArry);
        }
    },
    error: function (e) {
        // handle data operation error
        alert("Status: " + e.status + "; Error message: " + e.errorThrown);
    },
//    batch: false,
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
});


function chooseNmubersFancy(searchbtnFlag) {
    checked = "";
    try {
        $('#btn6_fancy').attr("disabled", "disabled");
        var fancy_srch_num = $("#fancy_srch_num").val();
        var fancy_searchoperator = $("#fancy_searchoperator").val();
        var fancy_total_dig = $("#fancy_total_dig").val();

        var caf_type;
        ddlFranchisee = $("#ddlFranchisee").val();
        if (ddlFranchisee === '2') {
            caf_type = $("#ddlFranchisee option:selected").text();
        }
        var reqData = {};
        reqData.reqSessionId=parent.$("#reqSessionId").val();
        if (searchbtnFlag == "false") {
            $("#fancy_srch_num").val('');
            $("#fancy_searchoperator").val('ew');
            $("#fancy_total_dig").val('');
            currentPage = 1;
            reqData.cymn_srch_num = "";
            reqData.searchoperator = "";
            reqData.cymn_total_dig = "";
            reqData.caf_type = caf_type;
            reqData.currentPage = currentPage;
        } else {
            reqData.cymn_srch_num = fancy_srch_num;
            reqData.searchoperator = fancy_searchoperator;
            reqData.cymn_total_dig = fancy_total_dig;
            reqData.caf_type = caf_type;
            reqData.currentPage = currentPage;
        }
        $.ajax({
            url: "SelectReserveNo.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                sessionCheck(data);
                var objFetch = JSON.stringify(data);
                fetchFANCYNosobj = JSON.parse(objFetch);
                fetchFANCYNosobj = fetchFANCYNosobj.response.responseData;
            }, error: function (data) {
                alert("error:" + JSON.stringify(data));
            }

        });

        $('#wait').hide();
        if (fetchFANCYNosobj.STATUS == "0") {
            ddlFranchisee = $("#ddlFranchisee").val();
            if (ddlFranchisee === '1') {
                $("#divGetInfo").show();
                $("#divGetInfo1").hide();
            } else {
                $("#divGetInfo").hide();
                $("#divGetInfo1").show();
            }
            FANCYNoDataArry = fetchFANCYNosobj.ROWS;
            var totalrecord = fetchFANCYNosobj.RECORDS;
            navPageSize = fetchFANCYNosobj.LIMIT;
            lastPage = fetchFANCYNosobj.TOTAL_PAGES;

            dataFancySourceObj.data(FANCYNoDataArry);

            var endingRecNo = currentPage * navPageSize;
            var startingRecNo = (endingRecNo + 1) - navPageSize;
            $("#btn6_fancy").attr('value', ' ' + currentPage + ' ');
            $("#btn5_fancy").text(startingRecNo + " - " + endingRecNo + " of " + totalrecord + " items");
            $('#btn1_fancy').addClass("k-state-disabled");
            $('#btn2_fancy').addClass("k-state-disabled");
            $("#btn1_fancy").removeAttr("onclick");
            $("#btn2_fancy").removeAttr("onclick");
            $('#btn3_fancy').attr("onclick", "fancyGridDataLoading('Next')");
            $('#btn4_fancy').attr("onclick", "fancyGridDataLoading('Last')");
            $('#btn3_fancy').removeClass("k-state-disabled");
            $('#btn4_fancy').removeClass("k-state-disabled");

            var CYMNNoDataNextID = FANCYNoDataArry.length + 1;
            function getIndexById(id) {

                var idx, len = FANCYNoDataArry.length;
                for (var j; j < len; j++) {
                    if (FANCYNoDataArry[j].ProductID == id) {
                        return j;
                    }
                }
                return null;
            }
            if (ddlFranchisee === '2') {
                $(document).ready(function () {
                    $("#grid_fancy").kendoGrid({
                        dataSource: dataFancySourceObj,
                        height: "410px",
                        pageable: false,
                        sortable: true,
                        scrollable: true,
//                    dataBound: onDataBound,
                        columns: [
                            {template: "<input type='checkbox' onclick='fancyNoSelectRowFun(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
                            {
                                field: "GSMNO",
                                title: "Mobile no."
                            }, {
                                field: "PRICE",
                                title: "Amount."
                            }, {
                                field: "FACEVALUE",
                                title: "Face Value."
                            }
                        ]
                    });
                });
            } else {
//                $(document).ready(function () {
//                    $("#grid1").kendoGrid({
//                        dataSource: dataFancySourceObj,
//                        height: "410px",
//                        pageable: false,
//                        sortable: true,
//                        scrollable: true,
////                    dataBound: onDataBound,
//                        columns: [
//                            {template: "<input type='checkbox' onclick='selectRow(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
//                            {
//                                field: "GSMNO",
//                                title: "Mobile no."
//                            }, {
//                                field: "FACEVALUE",
//                                title: "Face Value."
//                            }
//                        ]
//                    });
//                });
            }

        } else {
            //utilsObj.writeLog("Log(grid_fancy.js):::::::::::: Exception in reserveNumbers " + JSON.stringify(fetchFANCYNosobj));

            $('#ddlFranchisee').val('0');
            $("#divCYMN").hide();
            $("#divFancy").hide();
            $("#divGetInfo").hide();
            $("#divGetInfo1").hide()
            alert(fetchFANCYNosobj.MESSAGE);
        }
    } catch (e) {
        //utilsObj.writeLog("Log(grid_fancy.js):::::::::::: Exception in chooseNmubers " + e);
    }
}
function clearbtnfancy() {
    chooseNmubersFancy("false");
}
function fancyNoSelectRowFun(e) {
    try {
        checked = $(e).is(':checked');
        var row = $(e).closest("tr");
        var grid = $("#grid_fancy").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        var value = dataItem.GSMNO;
        amount = dataItem.PRICE;
        FANCY_GSM_NO = value;
        $("input.row-checkbox", "#grid_fancy").prop("checked", false);
        $(e).prop("checked", checked);
    } catch (e) {
        checkedBooelan = 'false';
        //utilsObj.writeLog("Log(grid_fancy.js):::::::::::: Exception in fancyNoSelectRowFun " + e);
    }

}
function fancyGridDataFun(str) {
    $('#wait').show();
    setTimeout(function () {
        fancyGridDataLoading(str);
    }, 100);

}
function fancyGridDataLoading(str) {
//    $('#wait').show();
//     $('#wait').hide();
    try {
        if (str == "First") {
            currentPage = 1;
        } else if (str == "Back") {
            currentPage = currentPage - 1;
//        alert("In Back Current page : " + currentPage);
        } else if (str == "Next") {
            currentPage = currentPage + 1;
//        alert("In Next Current page : " + currentPage);
        } else if (str == "Last") {
            currentPage = lastPage;
//        alert("In Last Current page : " + lastPage);
        }
        if (currentPage == 1) {
            $('#btn1_fancy').addClass("k-state-disabled");
            $('#btn2_fancy').addClass("k-state-disabled");
            $("#btn1_fancy").removeAttr("onclick");
            $("#btn2_fancy").removeAttr("onclick");
            $('#btn3_fancy').attr("onclick", "fancyGridDataLoading('Next')");
            $('#btn4_fancy').attr("onclick", "fancyGridDataLoading('Last')");
            $('#btn3_fancy').removeClass("k-state-disabled");
            $('#btn4_fancy').removeClass("k-state-disabled");
        } else if (currentPage == lastPage) {
            $('#btn3_fancy').addClass("k-state-disabled");
            $('#btn4_fancy').addClass("k-state-disabled");
            $("#btn3_fancy").removeAttr("onclick");
            $("#btn4_fancy").removeAttr("onclick");
            $('#btn1_fancy').attr("onclick", "fancyGridDataLoading('First')");
            $('#btn2_fancy').attr("onclick", "fancyGridDataLoading('Back')");
            $('#btn1_fancy').removeClass("k-state-disabled");
            $('#btn2_fancy').removeClass("k-state-disabled");
        } else {
            $('#btn1_fancy').attr("onclick", "fancyGridDataLoading('First')");
            $('#btn2_fancy').attr("onclick", "fancyGridDataLoading('Back')");
            $('#btn1_fancy').removeClass("k-state-disabled");
            $('#btn2_fancy').removeClass("k-state-disabled");
            $('#btn3_fancy').attr("onclick", "fancyGridDataLoading('Next')");
            $('#btn4_fancy').attr("onclick", "fancyGridDataLoading('Last')");
            $('#btn3_fancy').removeClass("k-state-disabled");
            $('#btn4_fancy').removeClass("k-state-disabled");
        }

        var fancy_srch_num = $("#fancy_srch_num").val();
        var fancy_searchoperator = $("#fancy_searchoperator").val();
        var fancy_total_dig = $("#fancy_total_dig").val();
        var caf_type;
        if (ddlFranchisee === '2') {
            ddlFranchisee = $("#ddlFranchisee").val();
            caf_type = $("#ddlFranchisee option:selected").text();
        }
        var reqData = {};
        reqData.reqSessionId=parent.$("#reqSessionId").val();
        try {
            if (searchbtnFlag == "false") {
                $("#fancy_srch_num").val('');
                $("#fancy_searchoperator").val('ew');
                $("#fancy_total_dig").val('');
                reqData.cymn_srch_num = "";
                reqData.searchoperator = "";
                reqData.cymn_total_dig = "";
                reqData.caf_type = caf_type;
                reqData.currentPage = currentPage;
            } else {
                reqData.cymn_srch_num = fancy_srch_num;
                reqData.searchoperator = fancy_searchoperator;
                reqData.cymn_total_dig = fancy_total_dig;
                reqData.caf_type = caf_type;
                reqData.currentPage = currentPage;
            }
            $.ajax({
                url: "SelectReserveNo.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    sessionCheck(data);
                    var objFetch = JSON.stringify(data);
                    fetchFANCYNosobj = JSON.parse(objFetch);
                    fetchFANCYNosobj = fetchFANCYNosobj.response.responseData;
                }, error: function (data) {
                    alert("error:" + JSON.stringify(data));
                }

            });
        } catch (e) {
//alert("Exp : " + e);
            //utilsObj.writeLog("Log(grid_fancy.js) Exception in loadGridDataFancy :::: " + e);
        }
        try {
            if (fetchFANCYNosobj.STATUS == "0") {
                $('#wait').hide();
                if (ddlFranchisee === '1') {
                    $("#divGetInfo").show();
                    $("#divGetInfo1").hide();
                } else {
                    $("#divGetInfo1").show();
                    $("#divGetInfo").hide();
                }
                var totalrecord = fetchFANCYNosobj.RECORDS;
                FANCYNoDataArry = fetchFANCYNosobj.ROWS;
                navPageSize = fetchFANCYNosobj.LIMIT;
                dataFancySourceObj.data(FANCYNoDataArry);
                $("#btn6_fancy").attr('value', ' ' + currentPage + ' ');
                if (currentPage == lastPage) {
                    var remainder = totalrecord % navPageSize;
                    $("#btn5_fancy").text((totalrecord - remainder) + " - " + totalrecord + " of " + totalrecord + " items");
                } else {
                    var endingRecNo = currentPage * navPageSize;
                    var startingRecNo = (endingRecNo + 1) - navPageSize;
                    $("#btn5_fancy").text(startingRecNo + " - " + endingRecNo + " of " + totalrecord + " items");
                }
                function getIndexById(id) {
                    var idx, len = FANCYNoDataArry.length;
                    for (var j; j < len; j++) {
                        if (FANCYNoDataArry[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                dataFancySourceObj.data(FANCYNoDataArry);
            } else {
//        alert("fail"); 
            }
        } catch (e) {
            //utilsObj.writeLog("Log(grid_fancy.js) Exception in fetchFANCYNosobj :::: " + e);
        }
    } catch (e) {
//        alert(e + ":::exception in method calling")
        //utilsObj.writeLog("Log(grid_fancy.js) Exception in fetchFANCYNosobj :::: " + e);
    }
}
//reserver number.hmtl page function
function fancySrchFun() {
    try {
        $('#wait').show();
        setTimeout(function () {
            chooseNmubersFancy("true");
        }, 10);
    } catch (e) {
        //utilsObj.writeLog("Log(grid_fancy.js):::::::::::: Exception in btnGetInfo " + e);
    }
}
function fancyReserveFun() {
    try {
        var resrvMobileJSON = {};
        if (checked) {
            var resrvMobileRes;
            var gsmNumber = FANCY_GSM_NO;
            var reserveNumType = $("#ddlFranchisee option:selected").text();
            //utilsObj.writeLog("JS Logs(grid_fancy.js):::::FANCY_GSM_NO gsmNumber:::" + gsmNumber + ":::: reserveNumType :::: " + reserveNumType + "amount::::" + amount);
            var reqData = {};
            reqData.reqSessionId=parent.$("#reqSessionId").val();
            if (ddlFranchisee !== null || ddlFranchisee !== '') {
                reqData.gsmNumber = gsmNumber;
                reqData.reserveNumType = reserveNumType;
                reqData.price = amount;
                $.ajax({
                    url: "reserveMobileNO.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {"reqData": encrypt(JSON.stringify(reqData))},
                    success: function (data) {
                        sessionCheck(data);
                        var objCYMN = JSON.stringify(data);
                        resrvMobileJSOn = JSON.parse(objCYMN);
                        resrvMobileJSOn = resrvMobileJSOn.response.responseData;
                    }, error: function (data) {
                        alert(JSON.stringify(data));
                    }

                });
            }
//            resrvMobileJSOn = JSON.parse(resrvMobileJSOn);
            //utilsObj.writeLog("JS Logs(grid_fancy):::::resrvMobileJSOn:::::::::::::" + resrvMobileJSOn);
            if (resrvMobileJSOn.STATUS === "0") {
                alert(resrvMobileJSOn.MESSAGE);
                chooseNmubersFancy("false");

            } else {
                $('#ddlFranchisee').val('0');
                $("#divCYMN").hide();
                $("#divFancy").hide();
                $("#divGetInfo").hide();
                $("#divGetInfo1").hide()
                alert(resrvMobileJSOn.MESSAGE);
            }
            $("input.row-checkbox", "#grid_fancy").prop("checked", false);
        } else {
            alert("Please select mobile number ");
        }
    } catch (e) {
        //utilsObj.writeLog("JS Logs(grid_fancy.js):::::Exception in fancyReserveFun:::::::::::::" + e);
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
                alert("Enter valid Mobile number");
                return false;
            }
        }
        if (id === 'fancy_total_dig') {
            if (!/^[1-9]+$/.test(fancy_total_dig)) {
                $("#fancy_total_dig").val('');
                alert("Enter valid Total digits sum of mobile no.");
                return false;
            }
        }
    } catch (e) {
        //utilsObj.writeLog("JS Logs(grid_fancy.js):::::Exception in fancyValidationFun:::::::::::::" + e);
    }
}
