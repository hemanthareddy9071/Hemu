var franchiseRepArray = [];
var frReportArray = [];
function franchiseRepGridLoad() {
    franchiseRepLoad("1");
    retailerLst();
}
function retailerLst() {
    try {
        var reqData = {};
        var retailerArray = [];
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        var respObj = {};
        $.ajax({
            url: "fetchRetailerLst.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                var resJson = JSON.parse(JSON.stringify(data));
                respObj = resJson.response.responseData;
            },
            error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
//                $('#grid').hide();
//                $('#franchise_id').val("");
                return;
            }
        });
        if (respObj.STATUS === "0") {
            retailerArray = respObj.RETAILER_LST;
            $('#franchise_id').children().remove();
            $('#franchise_id').append('<option value="">Select from list</option>');
            for (var i = 0; i < retailerArray.length; i++) {//DD_VALUE
                $('#franchise_id').append(new Option(retailerArray[i].RETAILER_NAME, retailerArray[i].RETAILER_CODE));
            }
        } else {
//            alert(respObj.MESSAGE);
        }
    } catch (e) {
//        alert(e);
    }

}
function franchiseRepLoad(gridLoadFlg) {

    parent.$("#wait").hide();
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.gridLoadFlg = gridLoadFlg;
    if (gridLoadFlg === "2") {//grid load from Search
        var franchiseName = $('#franchise_id').val();
        if (franchiseName === null || franchiseName === "") {
            alert("Please select retailer name ");
            $('#franchise_id').focus();
            return false;
        }
        frReportArray = [];
        franchiseRepArray = [];
        reqData.franchiseName = franchiseName;
    }
    var respObj = {};
    $.ajax({
        url: "fetchFranchiseeReport.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            sessionCheck(data);
            var resJson = JSON.parse(JSON.stringify(data));
            respObj = resJson.response.responseData;
        },
        error: function (data) {
            alert("error : uploadForms" + JSON.stringify(data));
            $('#grid').hide();
            $('#franchise_id').val("");
            return;
        }

    });
    if (respObj.STATUS === "0") {
        frReportArray = respObj.FRANCHISEE_REPORT;
        $('#GeneratePDF').show();
        $('#GenerateExcel').show();
//        alert(JSON.stringify(frReportArray) + "::::: frReportArray");
    } else {
        $('#grid').hide();
        $('#GeneratePDF').hide();
        $('#GenerateExcel').hide();
        frReportArray = [];
        franchiseRepArray = [];
        $('#franchise_id').val("");
        alert(respObj.MESSAGE);
        return;
    }
    if (frReportArray === null || frReportArray.length < 0) {
        $('#grid').hide();
        return;
    } else {
        $('#grid').show();
    }
    var jObj = {};
    //    for (i = 0; i < frReportArray.length; i++) {
    //       jObj=frReportArray[i];
    //       jObj["Action"]="<a data-toggle='modal' href='#divActivation'>Details</a>";
    //       franchiseRepArray[i]=jObj;
    ////       alert(jObj.Action);
    //    }
    //    alert(franchiseRepArray[0].Action);
    franchiseRepArray = frReportArray;
    var cafActivationNextID = franchiseRepArray.length + 1;
    function getIndexById(id) {
        var franchiseRepArray_Len = franchiseRepArray.length;
        for (var cafActivation_Data = 0; cafActivation_Data < franchiseRepArray_Len; cafActivation_Data++) {
            if (franchiseRepArray[cafActivation_Data].ProductID == id) {
                return cafActivation_Data;
            }
        }
        return null;
    }
    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(franchiseRepArray);
                    },
                    create: function (e) {
                        e.data.ProductID = cafActivationNextID++;
                        franchiseRepArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        franchiseRepArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        franchiseRepArray.splice(getIndexById(e.data.ProductID), 1);
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

                            DATEALLOTTMENT: {
                                type: "string"
                            },
                            RETAILER_CODE: {
                                type: "string"
                            },
                            FRANCHISEE_RETAILER: {
                                type: "String"
                            },
                            FR_NAME: {
                                type: "string"
                            },
                            DEVICE_TYPE: {
                                type: "string"
                            },
                            CAF_TYPE: {
                                type: "string"
                            },
                            USER_ID: {
                                type: "string"
                            },
                            SUCCESS_CNT: {
                                type: "string"
                            },
                            REJECTED_CNT: {
                                type: "string"
                            },
                            PENDING_CNT: {
                                type: "string"
                            }
                            //                            ,
                            //                            Action: {
                            //                                type: "celleHtml"
                            //
                            //                            }

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
            columns: [{
                    field: "DATEALLOTTMENT",
                    title: "Allotment Date",
                    width: 200
                }, {
                    field: "RETAILER_CODE",
                    title: "Retailer Code",
                    width: 160
                }, {
                    field: "FRANCHISEE_RETAILER",
                    title: "Franchisee/Retailer",
                    width: 190
                }, {
                    field: "FR_NAME",
                    title: "Franchisee Name",
                    width: 190
                }, {
                    field: "DEVICE_TYPE",
                    title: "Device Type",
                    width: 190
                }, {
                    field: "CAF_TYPE",
                    title: "CAF Type",
                    width: 190
                }, {
                    field: "SUCCESS_CNT",
                    title: "Success Count",
                    width: 180,
                    template: '<div class="action"><a data-toggle="modal" href="javascript:void(0)" onclick="deatils(this)">#: SUCCESS_CNT#</a></div>'
//                template: '<span style=""><a data-toggle='modal' href='javascript:void(0)' onclick='deatils(this)'>Details</a>#: STATUS#</span>'
                }, {
                    field: "REJECTED_CNT",
                    title: "Reject Count",
                    width: 180,
                    template: '<div class="action"><a data-toggle="modal" href="javascript:void(0)" onclick="deatils(this)">#: REJECTED_CNT#</a></div>'
//                template: '<span style=""><a data-toggle='modal' href='javascript:void(0)' onclick='deatils(this)'>Details</a>#: STATUS#</span>'
                }, {
                    field: "PENDING_CNT",
                    title: "Pending Count",
                    width: 180,
                    template: '<div class="action"><a data-toggle="modal" href="javascript:void(0)" onclick="deatils(this)">#: PENDING_CNT#</a></div>'
//                template: '<span style=""><a data-toggle='modal' href='javascript:void(0)' onclick='deatils(this)'>Details</a>#: STATUS#</span>'
                }
//                , {
//                    headerAttributes: {
//                        style: "padding: 10px 30px;"
//                                //                        style: "padding: 10px 30px;"
//                    },
//                    command: [
//                        {
//                            //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' onclick='downloadReceipt(this)'><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a></div>"
//                            template: "<div class='action'><a data-toggle='modal' href='javascript:void(0)' onclick='deatils(this)'>Details</a></div>"
//                                    //                            template: "<div class='action'><a data-toggle='modal' href='#divActivation'>Details</a></div>"
//                                    //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' ><i class='download_ic'></i></a></div>"
//
//                        }
//
//                    ]
//                    ,
//
//                    title: "<font color='black'> Actions</font>",
//                    width: 250
//
//                }
            ]
        });
    });
}

var sampleDataNextID = franchiseRepArray.length + 1;

function getIndexById(id) {

    var idx,
            l = franchiseRepArray.length;

    for (var j; j < l; j++) {
        if (franchiseRepArray[j].ProductID == id) {
            return j;
        }
    }
    return null;
}