var cafActivationArray = [];
var ActivationArray = [];
var FRC_MSG;
function cafActicationGridLoad() {
    cafActivationLoad();
    $('#IDCardType').children().remove();
    $('#IDCardType').append('<option value="">Select from list</option>');
}
function cafActivationLoad() {

    //    parent.$("#wait").hide();
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    var respObj = {};
    $.ajax({
        url: "cafActivation.do", //parameters go here in object literal form
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
            return;
        }

    });
    if (respObj.STATUS === "0") {
        ActivationArray = respObj.BP_JOBS;
        FRC_MSG=respObj.FRC_MSG;
    } else {
        alert(respObj.MESSAGE);
        return;
    }
    if (ActivationArray === null || ActivationArray.length < 0) {
        $('#grid').hide();
        return;
    } else {
        $('#grid').show();
    }
    var jObj = {};
    //    for (i = 0; i < ActivationArray.length; i++) {
    //       jObj=ActivationArray[i];
    //       jObj["Action"]="<a data-toggle='modal' href='#divActivation'>Details</a>";
    //       cafActivationArray[i]=jObj;
    ////       alert(jObj.Action);
    //    }
    //    alert(cafActivationArray[0].Action);
    cafActivationArray = ActivationArray;
    var cafActivationNextID = cafActivationArray.length + 1;
    function getIndexById(id) {
        var cafActivationArray_Len = cafActivationArray.length;
        for (var cafActivation_Data = 0; cafActivation_Data < cafActivationArray_Len; cafActivation_Data++) {
            if (cafActivationArray[cafActivation_Data].ProductID == id) {
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
                        e.success(cafActivationArray);
                    },
                    create: function (e) {
                        e.data.ProductID = cafActivationNextID++;
                        cafActivationArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        cafActivationArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        cafActivationArray.splice(getIndexById(e.data.ProductID), 1);
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

                            MESSAGE_ID: {
                                type: "string"
                            },
                            INSTANCE_ID: {
                                type: "string"
                            },
                            FRC_AMT: {
                                type: "string"
                            },
                            FILE_PATH: {
                                type: "string"
                            },
                            STATUS_CODE: {
                                type: "string"
                            },
                            NAME_ID: {
                                type: "string"
                            },
                            NAME_UID: {
                                type: "string"
                            },
                            BP_EMP_ID: {
                                type: "string"
                            },
                            BP_EMP_ID_TYPE: {
                                type: "string"
                            },
                            GSM_NUMBER: {
                                type: "string"
                            },
                            FRC_ID: {
                                type: "string"
                            },
                            
                            //                        Bulkqty: {type: "string"},
                            STATUS: {
                                type: "string"
                            },
                            DATE_ALLOTMENT: {
                                type: "string"
                            },
                            Action: {
                                type: "celleHtml"
                            //
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
            columns: [{
                field: "INSTANCE_ID",
                title: "Instance ID",
                width: 200,
                hidden: true
            }, {
                field: "MESSAGE_ID",
                title: "Message ID",
                width: 160,
                hidden: true
            }, {
                field: "GSM_NUMBER",
                title: "GSM Number",
                width: 190
            }, {
                field: "DATE_ALLOTMENT",
                title: "Allotment Date",
                width: 190
            }
            ,
            {
                field: "STATUS",
                title: "Status",
                width: 180,
                template: '<span style="#= (STATUS_CODE === "2") ? "color: \\#FFA500;" : (STATUS_CODE === "1") ? "color: \\#5cb85c;" : (STATUS_CODE === "0") ? "color: \\#000000;" : "color: \\#FF0000;" #">#: STATUS#</span>'
            },
            {
                headerAttributes: {
                    style: "padding: 10px 30px;"
                //                        style: "padding: 10px 30px;"
                },
                command: [
                {
                    //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' onclick='downloadReceipt(this)'><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a></div>"
                    template: "<div class='action'><a data-toggle='modal' href='javascript:void(0)' onclick='deatils(this)'>Details</a></div>"
                //                            template: "<div class='action'><a data-toggle='modal' href='#divActivation'>Details</a></div>"
                //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' ><i class='download_ic'></i></a></div>"

                }

                ]
                ,

                title: "<font color='black'> Actions</font>",
                width: 250

            }
            ]
        });
    });
}
var sampleDataNextID = cafActivationArray.length + 1;

function getIndexById(id) {

    var idx,
    l = cafActivationArray.length;

    for (var j; j < l; j++) {
        if (cafActivationArray[j].ProductID == id) {
            return j;
        }
    }
    return null;
}

function deatils(obj) {
    //   divActivation
    parent.$("#nameASIdProof").text("");
    parent.$("#nameASAadhaar").text("");
    parent.$("#EmployeeId").text("");
    parent.$("#IDCardType").val("");
    parent.$("#MESSAGE_ID").val("");
    parent.$("#INSTANCE_ID").val("");
    parent.$("#Status").val("");
    parent.$("#comments").val("");
    parent.$('#patahjaliImage').attr('src', "");
    var row = $(obj).closest("tr");

    var gridRowDate = $("#grid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);

    var grid_mobile_no = rowdata.GSM_NUMBER;
    var requireObj = {};
    for (var i = 0; i < cafActivationArray.length; i++) {
        if (cafActivationArray[i].GSM_NUMBER == grid_mobile_no) {
            requireObj = cafActivationArray[i];
            parent.$("#nameASIdProof").text(requireObj.NAME_ID);
            parent.$("#nameASAadhaar").text(requireObj.NAME_UID);
            parent.$("#EmployeeId").text(requireObj.BP_EMP_ID);
            //            $("#IDCardType").val(1);
            parent.$("#IDCardType option:selected").text(requireObj.BP_EMP_ID_TYPE);
            parent.$("#IDCardType").attr('disabled', 'disabled');
            //            $("option:selected #IDCardType").text(requireObj.BP_EMP_ID_TYPE);
            parent.$("#MESSAGE_ID").val(requireObj.MESSAGE_ID);
            parent.$("#INSTANCE_ID").val(requireObj.INSTANCE_ID);
            parent.$("#Status").val(requireObj.STATUS);
            parent.$("#STATUS_CODE").val(requireObj.STATUS_CODE);
            if(requireObj.FRC_ID=='-1'){
                parent.$("#AIRCEL_MNP_MSG_id").show();
                
                parent.$("#AIRCEL_MNP_MSG_id").text(FRC_MSG);
            }else{
                parent.$("#AIRCEL_MNP_MSG_id").hide();
            }

        }
    }
    if (requireObj.STATUS_CODE == '0') {
        parent.$("#Accept_button").show();
        parent.$("#Reject_button").show();
        parent.$("#Cancel_button").hide();
        parent.$("#comment_div").show();
    } else {
        parent.$("#Accept_button").hide();
        parent.$("#Reject_button").hide();
        parent.$("#Cancel_button").show();
        parent.$("#comment_div").hide();
    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.filePath = requireObj.FILE_PATH;
    var respObj = {};
    $.ajax({
        url: "cafActivationImage.do", //parameters go here in object literal form
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
            return;
        }


    });
    if (respObj.STATUS == 0) {
        parent.$('#patahjaliImage').attr('src', 'data:image/jpeg;base64,' + respObj.FILE_DATA);
        parent.$("#divActivation").modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
    } else {
        alert(respObj.MESSAGE);
        parent.$("#divActivation").modal('hide');
    }


}

function submitData(obj) {

    if (obj == 2) {
        var comments = parent.$("#comments").val();
        if (comments == null || comments == "") {
            alert("Please enter rejected Remarks/Comments ");
            return false;
        }
    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.MESSAGE_ID = parent.$("#MESSAGE_ID").val();
    reqData.INSTANCE_ID = parent.$("#INSTANCE_ID").val();
    reqData.IS_ACCEPTED = obj;
    reqData.COMMENTS = parent.$("#comments").val();
    var respObj = {};
    $.ajax({
        url: "cafActivationSubmition.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            sessionCheck(data);
            var resJson = JSON.parse(JSON.stringify(data));
            respObj = resJson.response.responseData;
            alert(respObj.MESSAGE);
        },
        error: function (data) {
            return;
        }


    });
    parent.$("#divActivation").modal('hide');

}