var gspsApprJobArray = "";
function gspsCAFApprGrid() {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();

    $.ajax({
        url: "gspsCAFApprJobs.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            sessionCheck(data);
            var resJson = JSON.parse(JSON.stringify(data));
            gspsApprJobArray = resJson.response.responseData;
        },
        error: function (data) {
            alert("error : uploadForms" + JSON.stringify(data));
        }

    });
    if (gspsApprJobArray === null || gspsApprJobArray.length === 0) {
        $('#grid').hide();
        alert("GSPS jobs are not found");

    } else {
        $('#grid').show();
        parent.resizeFrameHeight('frameBody', document.documentElement.scrollHeight);
    }

    var uploadDataNextID = gspsApprJobArray.length + 1;
    function getIndexById(id) {
        var uploadJosArray_Len = gspsApprJobArray.length;
        for (var upload_Data = 0; upload_Data < uploadJosArray_Len; upload_Data++) {
            if (gspsApprJobArray[upload_Data].ProductID == id) {
                return upload_Data;
            }
        }
        return null;
    }

    $(document).ready(function () {

        //        $("#grid_FRC_BTN_ID").hide();

        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(gspsApprJobArray);
                    },
                    create: function (e) {
                        e.data.ProductID = uploadDataNextID++;
                        gspsApprJobArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        gspsApprJobArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        gspsApprJobArray.splice(getIndexById(e.data.ProductID), 1);
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

                            INSTANCE_ID: {
                                type: "string"
                            },
                            CAF_NO: {
                                type: "String"
                            },
                            CUST_NAME: {
                                type: "string"
                            },
                            USER_NAME: {
                                type: "string"
                            },
                            USER_ID: {
                                type: "string"
                            },
                            STATUS: {
                                type: "string"
                            },
                            APPROVED_STATUS: {
                                type: "string"
                            },
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
            columns: [{
                    field: "INSTANCE_ID",
                    title: "Instance ID",
                    width: 200,
                    hidden: true
                }, {
                    field: "CAF_NO",
                    title: "CAF Number",
                    width: 160
                }, {
                    field: "CUST_NAME",
                    title: "Subscriber Name",
                    width: 190
                }, {
                    field: "USER_NAME",
                    title: "CSC",
                    width: 190
                }, {
                    field: "USER_ID",
                    title: "User ID",
                    width: 190,
                    hidden: true
                }, {
                    field: "STATUS",
                    title: "Status",
                    width: 180
//                    template: '<span style="#= (STATUS_CODE === "2") ? "color: \\#FFA500;" : (STATUS_CODE === "1") ? "color: \\#5cb85c;" : (STATUS_CODE === "0") ? "color: \\#000000;" : "color: \\#FF0000;" #">#: JOB_STATUS#</span>'
                }, {
                    field: "APPROVED_STATUS",
                    title: "Approved Status",
                    width: 180,
                    hidden: true
//                    template: '<span style="#= (STATUS_CODE === "2") ? "color: \\#FFA500;" : (STATUS_CODE === "1") ? "color: \\#5cb85c;" : (STATUS_CODE === "0") ? "color: \\#000000;" : "color: \\#FF0000;" #">#: JOB_STATUS#</span>'
                },
                {
                    headerAttributes: {
                        style: "padding: 10px 30px;"
                                //                        style: "padding: 10px 30px;"
                    },
                    command: [
                        {
                            //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' onclick='downloadReceipt(this)'><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a></div>"
                            template: "<div class='action'><a id='grid_EDIT_ID' href='javascript:void(0);' title='Edit' onclick='GSPSApproveCAF(this)'><i class='fa fa-pencil-square fa-2x'></i></a><a id='grid_VIEW_ID' href='javascript:void(0);' title='View' onclick='GSPSViewCAF(this)'><i class='fa fa-file-text-o fa-2x'></i></a>&nbsp;&nbsp;&nbsp;<a id='grid_PRINT_ID' href='javascript:void(0);' title='Print' onclick='GSPSPrintCAF(this)'><i class='print_ic'></i></a></div>"
//                            template: "<div class='action'><a href='javascript:void(0);' onclick='gotoGSPSCAF(this) title='Edit'><i class='fa fa-pencil-square fa-2x'></i></a></div>"
                        }
                    ]
                    ,
                    title: "<font color='black'> Actions</font>",
                    width: 250
                }
            ],

            dataBound: function () {
                try {
                    var grid = this;
                    grid.tbody.find("tr").each(function (e) {
                        var model = grid.dataItem(this);
                        if (model.APPROVED_STATUS === '0') {
                            $(this).find("#grid_EDIT_ID").show();
                            $(this).find("#grid_VIEW_ID").hide();
                            $(this).find("#grid_PRINT_ID").hide();
                        } else {
                            $(this).find("#grid_EDIT_ID").hide();
                            $(this).find("#grid_VIEW_ID").show();
                            $(this).find("#grid_PRINT_ID").show();
                        }
                    });
                } catch (e) {
//                    alert(e)
                }
            }
        });
    });
}
function GSPSApproveCAF(obj) {
    try {
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var CAF_NO = rowdata.CAF_NO;
        var INSTANCE_ID = rowdata.INSTANCE_ID;

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.CAF_NO = CAF_NO;
        reqData.INSTANCE_ID = INSTANCE_ID;
        reqData.ACTION_ID = "0";//EDIT
//        alert(JSON.stringify(reqData) + ":::: reqData");
        document.GSPS_eKYC_ApproveForm.method = "post";
        document.GSPS_eKYC_ApproveForm.action = "gotoGSPSApprCAF.do";
        document.GSPS_eKYC_ApproveForm.reqData.value = encrypt(JSON.stringify(reqData));
        document.GSPS_eKYC_ApproveForm.submit();


    } catch (e) {
//        alert(e);
    }
}
function GSPSViewCAF(obj) {
    try {
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var CAF_NO = rowdata.CAF_NO;
        var INSTANCE_ID = rowdata.INSTANCE_ID;

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.CAF_NO = CAF_NO;
        reqData.INSTANCE_ID = INSTANCE_ID;
        reqData.ACTION_ID = "1";//VIEW
//        alert(JSON.stringify(reqData) + ":::: reqData");
        document.GSPS_eKYC_ApproveForm.method = "post";
        document.GSPS_eKYC_ApproveForm.action = "gotoGSPSApprCAF.do";
        document.GSPS_eKYC_ApproveForm.reqData.value = encrypt(JSON.stringify(reqData));
        document.GSPS_eKYC_ApproveForm.submit();


    } catch (e) {
//        alert(e);
    }
}
function GSPSPrintCAF(obj) {
    try {
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var INSTANCE_ID = rowdata.INSTANCE_ID;
        var dataPrepare = {};
        dataPrepare['reqSessionId'] = parent.$("#reqSessionId").val();
        dataPrepare['INSTANCE_ID'] = INSTANCE_ID;
        $.ajax({
            url: "downloadGSPSCafPDF.do", //parameters go here in object literal form
            type: 'POST',
            data: {"reqData": encrypt(JSON.stringify(dataPrepare))},
            async: false,
            success: function (data) {
                sessionCheck(data);
                var objCYMN = JSON.parse(JSON.stringify(data));
//                alert(JSON.stringify(data));
                var cafDownload = objCYMN.response.responseData;
                if (objCYMN.response.success === "true" || objCYMN.response.success === true) {
                    if (cafDownload.STATUS === '0') {
//                        alert(cafDownload.STATUS);
//                     sessionCheck(data);
                        var downloadpdf = {};
                        downloadpdf.FilePath = cafDownload.FilePath;
                        downloadpdf.FileName = cafDownload.FileName;
                        document.getElementById("reqData").value = encrypt(JSON.stringify(downloadpdf));
                        document.GSPS_eKYC_ApproveForm.method = "post";
                        document.GSPS_eKYC_ApproveForm.action = "downloadPdf.do";
                        document.GSPS_eKYC_ApproveForm.reqData = encrypt(JSON.stringify(downloadpdf));
                        document.GSPS_eKYC_ApproveForm.submit();
                    } else {
                        var downloadpdf = {};
                        downloadpdf.FilePath = cafDownload.FilePath;
                        downloadpdf.FileName = cafDownload.FileName;
                        document.getElementById("reqData").value = encrypt(JSON.stringify(downloadpdf));
                        document.GSPS_eKYC_ApproveForm.method = "post";
                        document.GSPS_eKYC_ApproveForm.action = "downloadPdf.do";
                        document.GSPS_eKYC_ApproveForm.reqData = encrypt(JSON.stringify(downloadpdf));
                        document.GSPS_eKYC_ApproveForm.submit();
                        alert(cafDownload.MESSAGE);
                    }
                } else {
                    alert(objCYMN.response.message);
                }

            }, error: function (data) {
                alert("error : getUploadCount");
                alert(JSON.stringify(data));
            }

        });
    } catch (e) {

    }
}


			