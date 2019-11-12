var gridDataSource;
var CYMNNoDataArry = [];
var fetchCYMNNosobj = {};
var fectchCYMNNoData = {};
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
        chooseNmubers(searchbtnFlag, status);
    } catch (e) {
    }


}

function chooseNmubers(searchbtnFlag, status) {
    checked = "";
    try {
        var wings_srch_num = $("#wings_srch_num").val();
        var searchoperator = $("#searchoperator").val();
        if (status === '2') {//ekyc.html

            if (wings_srch_num === "") {
                alert("Please enter wings search number");
                $("#wings_srch_num").val('').focus();
                return  false;
            }
        }
        var reqData = {};
        if (searchbtnFlag === "false") {
            $("#searchoperator").val('ew');
            currentPage = 1;
            reqData.cymn_srch_num = "";
            reqData.searchoperator = "";
            reqData.cymn_total_dig = "";
            reqData.caf_type = "CYMN";
            reqData.currentPage = currentPage;
            reqData.cymn_total_dig = "";
        } else {
            reqData.cymn_srch_num = wings_srch_num;
            reqData.searchoperator = searchoperator;
            reqData.cymn_total_dig = "";
            reqData.caf_type = "CYMN";
            reqData.currentPage = currentPage;
        }
        $.ajax({
            url: "FMSSelectReserveNo.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                fetchCYMNNosobj = {};
                var objFetch = JSON.stringify(data);
                fetchCYMNNosobj = JSON.parse(objFetch);
                fetchCYMNNosobj = fetchCYMNNosobj.response.responseData;
                CYMNNoDataArry = fetchCYMNNosobj.DATA;
                try {
                    $('#fmsgrid1').remove();
                } catch (e) {
                    alert(e);
                }
                $('#wng_num').append('<div id="fmsgrid1"></div>');
                loadWingsNumbersGrid();
            }, error: function (data) {
                alert("error:" + JSON.stringify(data));
            }
        });
        $('#wait').hide();
        if (fetchCYMNNosobj.STATUS == "0") {
            $("#fmsdivchoosenumb").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
            CYMNNoDataArry = fetchCYMNNosobj.DATA;
            function getIndexById(id) {

                var idx, len = CYMNNoDataArry.length;
                for (var j; j < len; j++) {
                    if (CYMNNoDataArry[j].ProductID == id) {
                        return j;
                    }
                }
                return null;
            }
        } else if (searchbtnFlag == "true" && (fetchCYMNNosobj.STATUS == "1" || fetchCYMNNosobj.STATUS == "-1")) {
            $("#wings_srch_num").val('');
            $("#searchoperator").val('ew');
            $("#cymn_total_dig").val('');
            if (status === '1') {
                $("#fmsdivchoosenumb").modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
            } else {
                $('#ddlFranchisee').val('0');
            }
            alert(fetchCYMNNosobj.MESSAGE);
        } else {
            $('#fmsdivchoosenumb').modal('hide');
            alert(fetchCYMNNosobj.MESSAGE);
        }
    } catch (e) {
    }
}

function fetchCYMNNoSearch(status) {
    try {
        $('#wait').show();
        searchbtnFlag = "true";
        setTimeout(function () {
            chooseNmubers("true", status);
        }, 100);
    } catch (e) {
        $('#wait').hide();
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
            var reqData={};
//            alert($('#CYMN_GSM_NO').val() + ":::   11111");
            var SEL_MOB_NO =$('#CYMN_GSM_NO').val();
           
            reqData.SEL_MOB_NO=SEL_MOB_NO;
            $.ajax({
                url: "IsSelectedNumberBlocked.do", //parameters go here in object literal form
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                     var objisNumBlocked = JSON.parse(JSON.stringify(data));
                    objisNumBlocked = objisNumBlocked.response.responseData;
                    if(objisNumBlocked.STATUS == '0'){
                      $('#fmsdivchoosenumb').modal('hide');  
                       $("#sel_mob_no").val(SEL_MOB_NO);
                    }else if(objisNumBlocked.STATUS=='1'){
                        alert(objisNumBlocked.MESSAGE);
                        $("#sel_mob_no").val('');
                        checked=false;
                        
                        
                    }
                }, error: function (data) {
                alert(JSON.stringify(data));
                }

            });
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

function btncloseFun() {
    $('input:radio[name="choose_num"]').filter('[value="1"]').attr('checked', false);
}

function ValidationFun(event) {
    try {
        var id = event.getAttribute('id');
        var cymn_srch_num = $("#wings_srch_num").val();
//        var cymn_total_dig = $("#cymn_total_dig").val();
        if (id === 'wings_srch_num') {
            if (!numberReg.test(cymn_srch_num)) {
                $("#wings_srch_num").val('');
                alert("Enter valid Mobile number");
                return false;
            }
        }
//        if (id === 'cymn_total_dig') {
//            if (!numberReg.test(cymn_total_dig)) {
//                $("#cymn_total_dig").val('');
//                alert("Enter valid Total digits sum of mobile no.");
//                return false;
//            }
//        }
    } catch (e) {
////utilsObj.writeLog("JS Logs(grid_choosenumber.js):::::Exception in ValidationFun:::::::::::::" + e);
    }
}

function clearbtn(status) {
    try {
        $("#wings_srch_num").val("");
        fmschooseNmubers("false", status);
    } catch (e) {
//        alert(e);
    }
}

function loadWingsNumbersGrid() {
    gridDataSource = new kendo.data.DataSource({
        data: CYMNNoDataArry,
        pageSize: 5,
        batch: true,
        cache: false,

        schema: {
            model: {
                id: "ProductID",
                fields: {

                    DD_CODE: {
                        type: "string"
                    },
                    DD_VALUE: {
                        type: "String"
                    }
                }
            }
        }
    });
   
    $("#fmsgrid1").kendoGrid({
        dataSource: gridDataSource,
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
