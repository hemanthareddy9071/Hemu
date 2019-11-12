var CYMNNoDataArry = [];
var fetchCYMNNosobj = {};
var fectchCYMNNoData = {};
var dataSourceObj;
var checked;
var searchbtnFlag = "false";
var currentPage = 1;
var lastPage = 1;
var navPageSize = 0;
var ddlFranchisee;
var numberReg = /^[0-9]+$/;
//var CYMN_GSM_NO;


function fmschooseNmubers(searchbtnFlag, status) {
    
    try {
//        if (document.getElementById('mobile_num').checked) {
        chooseNmubers(searchbtnFlag, status);
//        }
    } catch (e) {
    }


}

function chooseNmubers(searchbtnFlag, status) {
    checked = "";
    
    try {
        $('#btn6').attr("disabled", "disabled");
//        $("#fmsgrid1").remove();
//        $("#fmsdivchoosenumb").show();
//        document.getElementById('step2').style.display = 'none';
//        document.getElementById('step1').style.display = 'block';
        var cymn_srch_num = $("#cymn_srch_num").val();
        var searchoperator = $("#searchoperator").val();
        var cymn_total_dig = $("#cymn_total_dig").val();
//        var caf_type;
        if (status === '1') {//ekyc.html
//            caf_type = $("#remarks").val();
            $('#mobile_no').val('').attr('readonly', false);
            $('#cymn_mobile_pin').val('').attr('readonly', false);
            $('#sim_number').val('');
            $('#simNumber').val('');
//            $('input:radio[name="choose_num"]').filter('[value="1"]').attr('checked', false);
        } else if (status === '2') { //reserve number.html
//            ddlFranchisee = $("#ddlFranchisee").val();
//            caf_type = $("#ddlFranchisee option:selected").text();
        }
        var reqData = {};
//        reqData.reqSessionId = parent.$("#reqSessionId").val();
        if (searchbtnFlag == "false") {
            $("#cymn_srch_num").val('');
            $("#searchoperator").val('ew');
            $("#cymn_total_dig").val('');
            currentPage = 1;
            reqData.cymn_srch_num = "";
            reqData.searchoperator = "";
            reqData.cymn_total_dig = "";
            reqData.caf_type = "CYMN";
            reqData.currentPage = currentPage;
        } else {
            reqData.cymn_srch_num = cymn_srch_num;
            reqData.searchoperator = searchoperator;
            reqData.cymn_total_dig = cymn_total_dig;
            reqData.caf_type = "CYMN";
            ;
            reqData.currentPage = currentPage;
        }
        
        $.ajax({
            url: "FMSSelectReserveNo.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
//                sessionCheck(data); 

                var objFetch = JSON.parse(JSON.stringify(data));
               
            if(objFetch.response.success){
                fetchCYMNNosobj = objFetch;
               
                fetchCYMNNosobj = fetchCYMNNosobj.response.responseData;
            }else{
                 alert("Numbers Not Available")
            }
//                   
//                }
//               alert("fetchCYMNNosobj:::::"+JSON.stringify(fetchCYMNNosobj))
               
            }, error: function (data) {
                alert("error:" + JSON.stringify(data));
            }

        });
//        parent.$('#wait').hide();
        if (fetchCYMNNosobj.STATUS == "0") {
            if (status === '1') {
                $("#CYMN_THRGH_SRCH").val("0");
//                $("#fmsdivchoosenumb").modal('show');
                $("#fmsdivchoosenumb").modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
            } else {
                if (ddlFranchisee === '1') {
//                    $("#divGetInfo").show();
//                    $("#divGetInfo1").hide();
                } else {
//                    $("#divGetInfo").hide();
//                    $("#divGetInfo1").show();
                }

            }
            CYMNNoDataArry = fetchCYMNNosobj.DATA;
            var totalrecord = fetchCYMNNosobj.RECORDS;
            navPageSize = fetchCYMNNosobj.LIMIT;
            lastPage = fetchCYMNNosobj.TOTAL_PAGES;
//            dataSourceObj.data(CYMNNoDataArry);
            loadGrid();
            
        }
//            var endingRecNo = currentPage * navPageSize;
//            var startingRecNo = (endingRecNo + 1) - navPageSize;
////            alert("::::1111 ::: "+startingRecNo + " - " + endingRecNo + " of " + totalrecord + " items");
//            $("#btn6").attr('value', ' ' + currentPage + ' ');
////            $("#btn5").text(startingRecNo + " - " + endingRecNo + " of " + totalrecord + " items");
//            $('#btn1').addClass("k-state-disabled");
//            $('#btn2').addClass("k-state-disabled");
//            $("#btn1").removeAttr("onclick");
//            $("#btn2").removeAttr("onclick");
//            $('#btn3').attr("onclick", "loadGridData('Next','2')");
//            $('#btn4').attr("onclick", "loadGridData('Last','2')");
//            $('#btn3').removeClass("k-state-disabled");
//            $('#btn4').removeClass("k-state-disabled");
//            var CYMNNoDataNextID = CYMNNoDataArry.length + 1;
//            function getIndexById(id) {
//
//                var idx, len = CYMNNoDataArry.length;
//                for (var j; j < len; j++) {
//                    if (CYMNNoDataArry[j].ProductID == id) {
//                        return j;
//                    }
//                }
//                return null;
//            }
//          
//            if (status === '1' || ddlFranchisee === '1') {
//                alert()
//                loadGrid();
//
//                
//            } else {
////                $(document).ready(function () {
////                    $("#grid_fancy").kendoGrid({
////                        dataSource: dataFancySourceObj,
////                        height: "410px",
////                        pageable: false,
////                        sortable: true,
////                        scrollable: true,
//////                    dataBound: onDataBound,
////                        columns: [
////                            {template: "<input type='checkbox' onclick='selectRow(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
////                            {
////                                field: "DD_CODE",
////                                title: "Mobile no."
////                            }, {
////                                field: "PRICE",
////                                title: "Amount."
////                            }
////                        ]
////                    });
////                });
//            }
//        } else if (searchbtnFlag == "true" && (fetchCYMNNosobj.STATUS == "1" || fetchCYMNNosobj.STATUS == "-1")) {
//            $("#cymn_srch_num").val('');
//            $("#searchoperator").val('ew');
//            $("#cymn_total_dig").val('');
//            //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in reserveNumbers " + JSON.stringify(fetchCYMNNosobj));
//            if (status === '1') {
////                $('#fmsdivchoosenumb').modal('show');
//                $("#fmsdivchoosenumb").modal({
//                    backdrop: 'static',
//                    keyboard: false,
//                    show: true
//                });
//            } else {
//                $('#ddlFranchisee').val('0');
////                $("#divCYMN").hide();
////                $("#divFancy").hide();
////                $("#divGetInfo").hide();
////                $("#divGetInfo1").hide()
//            }
//            //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in reserveNumbers " + JSON.stringify(fetchCYMNNosobj));
//            alert(fetchCYMNNosobj.MESSAGE);
//        } else {
//            //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in reserveNumbers " + JSON.stringify(fetchCYMNNosobj));
//            $('#fmsdivchoosenumb').modal('hide');
////            $('#ddlFranchisee').val('0');
////            $("#divCYMN").hide();
////            $("#divFancy").hide();
////            $("#divGetInfo").hide();
////            $("#divGetInfo1").hide()
//            alert(fetchCYMNNosobj.MESSAGE);
//        }
    } catch (e) {
        alert(e);
//        utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in chooseNmubers " + e);
    }
}
function fetchCYMNNoSearch(status) {
    try {
        parent.$('#wait').show();
        searchbtnFlag = "true";
        setTimeout(function () {
            chooseNmubers("true", status);
        }, 100);
    } catch (e) {
//utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in fetchCYMNNoSearch " + e);
    }
}
function clearbtn(status) {
    chooseNmubers("false", status);
}
function selectRow(e) {

    try {
        checked = $(e).is(':checked');
        var row = $(e).closest("tr");
        var grid = $("#fmsgrid1").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        var value = dataItem.DD_CODE;
        $('#CYMN_GSM_NO').val(value);
        $("input.row-checkbox", "#fmsgrid1").prop("checked", false);
        $(e).prop("checked", checked);
    } catch (e) {
        checkedBooelan = 'false';
        //utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in selectRow " + e);
    }

}

function fmsreserveNumbers() {
    try {
//        $("#usr_mobileno").val('');
        if (checked) {
//            alert($('#CYMN_GSM_NO').val() + ":::   11111");
            $("#sel_mob_no").val($('#CYMN_GSM_NO').val());
            $('#fmsdivchoosenumb').modal('hide');
//            resrvmoblSubmt();
//            document.getElementById('step2').style.display = 'block';
//            document.getElementById('step1').style.display = 'none';
        } else {
            alert("Please select mobile number ");
//            document.getElementById('step2').style.display = 'none';
//            document.getElementById('step1').style.display = 'block';
        }
    } catch (e) {
//utilsObj.writeLog("Log(grid_choosenumber.js):::::::::::: Exception in reserveNumbers " + e);
    }
    return false;
}
function loadGridDataFun(str, status) {
    parent.$('#wait').show();
//    alert(status + " loadGridDataFun");
    setTimeout(function () {

        loadGridData(str, status);
    }, 1000);
}
function loadGridData(str, status) {
//    $('#wait').show();
//     $('#wait').hide();
    if (str == "First") {
        currentPage = 1;
//        alert("In First Current page : " + currentPage);
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
        $('#btn1').addClass("k-state-disabled");
        $('#btn2').addClass("k-state-disabled");
        $("#btn1").removeAttr("onclick");
        $("#btn2").removeAttr("onclick");
        $('#btn3').attr("onclick", "loadGridData('Next','2')");
        $('#btn4').attr("onclick", "loadGridData('Last','2')");
        $('#btn3').removeClass("k-state-disabled");
        $('#btn4').removeClass("k-state-disabled");
    } else if (currentPage == lastPage) {
        $('#btn3').addClass("k-state-disabled");
        $('#btn4').addClass("k-state-disabled");
        $("#btn3").removeAttr("onclick");
        $("#btn4").removeAttr("onclick");
        $('#btn1').attr("onclick", "loadGridData('First','2')");
        $('#btn2').attr("onclick", "loadGridData('Back','2')");
        $('#btn1').removeClass("k-state-disabled");
        $('#btn2').removeClass("k-state-disabled");
    } else {
        $('#btn1').attr("onclick", "loadGridData('First','2')");
        $('#btn2').attr("onclick", "loadGridData('Back','2')");
        $('#btn1').removeClass("k-state-disabled");
        $('#btn2').removeClass("k-state-disabled");
        $('#btn3').attr("onclick", "loadGridData('Next','2')");
        $('#btn4').attr("onclick", "loadGridData('Last','2')");
        $('#btn3').removeClass("k-state-disabled");
        $('#btn4').removeClass("k-state-disabled");
    }

    var cymn_srch_num = $("#cymn_srch_num").val();
    var searchoperator = $("#searchoperator").val();
    var cymn_total_dig = $("#cymn_total_dig").val();
    var caf_type;
//    alert("status::" + status);
    if (status === '1') {
        caf_type = $("#remarks").val();
    } else if (status === '2') {
        ddlFranchisee = $("#ddlFranchisee").val();
        caf_type = $("#ddlFranchisee option:selected").text();
    }
    try {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        if (searchbtnFlag == "false") {
            $("#cymn_srch_num").val('');
            $("#searchoperator").val('ew');
            $("#cymn_total_dig").val('');
            reqData.cymn_srch_num = "";
            reqData.searchoperator = "";
            reqData.cymn_total_dig = "";
            reqData.caf_type = caf_type;
            reqData.currentPage = currentPage;
        } else {
            reqData.cymn_srch_num = cymn_srch_num;
            reqData.searchoperator = searchoperator;
            reqData.cymn_total_dig = cymn_total_dig;
            reqData.caf_type = caf_type;
            reqData.currentPage = currentPage;
        }
        $.ajax({
            url: "FMSSelectReserveNo.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
//                sessionCheck(data);
                var objCYMN = JSON.stringify(data);
                fetchCYMNNosobj = JSON.parse(JSON.stringify(data));
                fetchCYMNNosobj = fetchCYMNNosobj.response.responseData;
            }, error: function (data) {
//                alert(JSON.stringify(data));
            }

        });
    } catch (e) {
//alert("Exp : " + e);
    }
    if (fetchCYMNNosobj.STATUS == "0") {
        $('#wait').hide();
        if (status === '1') {
            $("#CYMN_THRGH_SRCH").val("0");
//            $("#fmsdivchoosenumb").modal('show');
            $("#fmsdivchoosenumb").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        } else {
//            alert(ddlFranchisee+"::::ddlFranchisee");
            if (ddlFranchisee === '1') {
                $("#divGetInfo").show();
                $("#divGetInfo1").hide();
            } else {
                $("#divGetInfo1").show();
                $("#divGetInfo").hide();
            }

        }
        var totalrecord = fetchCYMNNosobj.RECORDS;
        CYMNNoDataArry = fetchCYMNNosobj.DATA;
        navPageSize = fetchCYMNNosobj.LIMIT;
//        dataSourceObj.data(CYMNNoDataArry);
        $("#btn6").attr('value', ' ' + currentPage + ' ');
        if (currentPage == lastPage) {
            var remainder = totalrecord % navPageSize;
//            $("#btn5").text((totalrecord - remainder) + " - " + totalrecord + " of " + totalrecord + " items");
        } else {
            var endingRecNo = currentPage * navPageSize;
            var startingRecNo = (endingRecNo + 1) - navPageSize;
//            $("#btn5").text(startingRecNo + " - " + endingRecNo + " of " + totalrecord + " items");
        }
        function getIndexById(id) {
            var idx, len = CYMNNoDataArry.length;
            for (var j; j < len; j++) {
                if (CYMNNoDataArry[j].ProductID == id) {
                    return j;
                }
            }
            return null;
        }
        dataSourceObj.data(CYMNNoDataArry);
    } else {
//        alert("fail"); 
    }
}
function alreadyReserved() {
    $('#mobile_no').val('').attr('readonly', false);
    $('#cymn_mobile_pin').val('').attr('readonly', false);
    $('#sim_number').val('');
    $('#simNumber').val('');
}
function btncloseFun() {
    $('input:radio[name="choose_num"]').filter('[value="1"]').attr('checked', false);
}
//reserver number.hmtl page function

function cymnSearchFun(status) {
    try {
        parent.$('#wait').show();
        setTimeout(function () {
            chooseNmubers("true", status);
        }, 10);
    } catch (e) {
//utilsObj.writeLog("Log(grid_choosenumber.hmtl):::::::::::: Exception in btnGetInfo " + e);
    }
}
function cymnReserveFun() {

    try {
        if (checked) {
            var gsmNumber = $('#CYMN_GSM_NO').val();
            var reserveNumType = $("#ddlFranchisee option:selected").text();
            //utilsObj.writeLog("JS Logs(grid_choosenumber.js):::::gsmNumber:::" + gsmNumber + ":::: reserveNumType :::: " + reserveNumType);
//            var resrvMobileRes = newFormMem.resrvMoblSubmt(gsmNumber, reserveNumType, "");
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            var resrvMobileJSOn = {};
            reqData.gsmNumber = gsmNumber;
            reqData.reserveNumType = reserveNumType;
            reqData.price = "";
            $.ajax({
                url: "reserveMobileNO.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    sessionCheck(data);
                    var objCYMN = JSON.stringify(data);
//                    alert(objCYMN);
                    resrvMobileJSOn = JSON.parse(objCYMN);
                    resrvMobileJSOn = resrvMobileJSOn.response.responseData;
                }, error: function (data) {
//                    alert(JSON.stringify(data));
                }

            });

            //utilsObj.writeLog("JS Logs(grid_choosenumber.js):::::resrvMobileJSOn:::::::::::::" + resrvMobileJSOn);
            if (resrvMobileJSOn.STATUS == "0" || resrvMobileJSOn.STATUS === "0") {
                alert(resrvMobileJSOn.MESSAGE);
            } else {
                $('#ddlFranchisee').val('0');
                $("#divCYMN").hide();
                $("#divFancy").hide();
                $("#divGetInfo").hide();
                $("#divGetInfo1").hide()
                alert(resrvMobileJSOn.MESSAGE);
            }
            chooseNmubers("false", '2');
            $("input.row-checkbox", "#fmsgrid1").prop("checked", false);
        } else {
            alert("Please select mobile number ");
        }
    } catch (e) {
//utilsObj.writeLog("JS Logs(grid_choosenumber.js):::::Exception in cymnReserveFun:::::::::::::" + e);
    }
}
function ValidationFun(event) {
    try {
        var id = event.getAttribute('id');
        var cymn_srch_num = $("#cymn_srch_num").val();
        var cymn_total_dig = $("#cymn_total_dig").val();
        if (id === 'cymn_srch_num') {
            if (!numberReg.test(cymn_srch_num)) {
                $("#cymn_srch_num").val('');
                alert("Enter valid Mobile number");
                return false;
            }
        }
        if (id === 'cymn_total_dig') {
            if (!numberReg.test(cymn_total_dig)) {
                $("#cymn_total_dig").val('');
                alert("Enter valid Total digits sum of mobile no.");
                return false;
            }
        }
    } catch (e) {
////utilsObj.writeLog("JS Logs(grid_choosenumber.js):::::Exception in ValidationFun:::::::::::::" + e);
    }
}

function loadGrid() {
    dataSourceObj = new kendo.data.DataSource({

        data: CYMNNoDataArry,
        pageSize: 5,
        batch: false,
        schema: {
            model: {
                id: "ProductID",
                fields: {
//                                CAFno: {type: "string"},
                    DD_CODE: {
                        type: "string"
                    },
                    DD_VALUE: {
                        type: "string"
                    }
                }
            }
        },
    });

    $("#fmsgrid1").kendoGrid({
        dataSource: dataSourceObj,
        //  height: "410px",
        pageable: false,
        sortable: true,
        scrollable: true,
//                    dataBound: onDataBound,
        columns: [
            {template: "<input type='checkbox' onclick='selectRow(this)' class='row-checkbox'/> <label>&nbsp;</label>", width: 80},
            {
                field: "DD_CODE",
                title: "Mobile no."
            }, {
                field: "DD_VALUE",
                title: "Face Value.",
                hidden: true
            }
        ]
    });
                
}