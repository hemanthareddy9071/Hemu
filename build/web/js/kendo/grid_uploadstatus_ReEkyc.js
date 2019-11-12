var numberReg = /^[0-9]+$/;
function timeoutUploadReEkycForms() {

    //    setTimeout(function () {
    //        loadUserName();
    ReEkycUploadForms();
//        loadMenuContentFun();
//    }, 100);


//   
}

var uploadJobArray = []
function ReEkycUploadForms() {




    //    uploadJobArray = JSON.parse(eval(uploadedFormObj.ReEkycUploadForms("")));
    var mobileNumber = $("#mobileNo_val").val();
    if ($("#mobileNo_val").val().length == 0) {
        mobileNumber = "";
    //        uploadJobArray = JSON.parse(eval(uploadedFormObj.ReEkycUploadForms(mobileNumber)));
    } else {
        mobileNumber = $("#mobileNo_val").val();
    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.mobileNumber = mobileNumber;
    $.ajax({
        url: "ReEkycUploadForms.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
            },
        success: function (data) {
            sessionCheck(data);
            var res = JSON.parse(JSON.stringify(data.response.responseData));
            uploadJobArray = res.JobData;
        }, 
        error: function (data) {

        }
    });
    setDatatoGrid();
}

$(document).ready(function () {
    setDatatoGrid();
});


function  setDatatoGrid() {
    try{
    var uploadDataNextID = uploadJobArray.length + 1;
    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(uploadJobArray);
                },
                create: function (e) {
                    e.data.ProductID = uploadDataNextID++;
                    uploadJobArray.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    uploadJobArray[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    uploadJobArray.splice(getIndexById(e.data.ProductID), 1);
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
                        CONNECTION_NUMBER: {
                            type: "string"
                        },
                        SUBMITTED_DATE: {
                            type: "string"
                        },
                        CONNECTION_TYPE: {
                            type: "string"
                        },
                        USER_ID: {
                            type: "string"
                        },
                        JOB_STATUS: {
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
            field: "CONNECTION_NUMBER",
            title: "Connection Number",
            width: 190
        }, {
            field: "SUBMITTED_DATE",
            title: "Submitted Date",
            width: 190
        }, {
            field: "CONNECTION_TYPE",
            title: "Connection Type",
            width: 130
        }, {
            field: "USER_ID",
            title: "User ID",
            width: 190
        }, {
            field: "JOB_STATUS",
            title: "JOB STATUS",
            width: 180
        },
        {
            headerAttributes: {
                style: "padding: 10px 30px;"
            //                        style: "padding: 10px 30px;"
            },
            command: [
            {
                //                        template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' title='DownloadReceipt' onclick='downloadReceipt(this)'><i class='download_ic'></i></a></div>"
                template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' ><i class='download_ic'></i></a></div>"

            }

            ]
            ,

            title: "<font color='black'> Actions</font>",
            width: 250

        }

        /*,{
             field: "Action",
             title: "Upload Status Results",
             encoded: false,
             attributes: {
             "class": "action"
             },
             width: 220
             }*/
        ],

        dataBound: function () {
            var grid = this;
            grid.tbody.find("tr").each(function (e) {
                var model = grid.dataItem(this);
                var reqData = {};
                reqData.mobileNumber = model.CONNECTION_NUMBER;
                reqData.type = "Download";
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.CAF_NO = model.CAF_NO;
                reqData.INSTANCE_ID = model.INSTANCE_ID;
               
                $(this).find("#downloadBtn").attr('href', 'ReEkycUploadDownloadReceipt.do?reqData=' + encrypt(JSON.stringify(reqData)));
            });
        }
    });
    }catch(e){
        alert(e);
    }
}


function getIndexById(id) {

    var uploadJosArray_Len = uploadJobArray.length;

    for (var upload_Data = 0; upload_Data < uploadJosArray_Len; upload_Data++) {
        if (uploadJobArray[upload_Data].ProductID == id) {
            return upload_Data;
        }
    }
    return null;
}



function printReceipt(obj) {
    try {
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var mobileNumber = rowdata.CONNECTION_NUMBER;
        //var mobileNumber = rowdata.CAF_NO;
        //        var filePath = newFormMem.ReEkycUploadPrintReceipt(mobileNumber, "Print");

        var status = "";
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.mobileNumber = mobileNumber;
        reqData.CAF_NO = rowdata.CAF_NO;
        reqData.INSTANCE_ID = rowdata.INSTANCE_ID;
    
        reqData.type = "Print";
        $.ajax({
            url: "ReEkycUploadPrintReceipt.do",
            type: 'POST',
            async: false,
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
                },
            success: function (data) {
                sessionCheck(data);
                if (data.response.success) {
                    var url = "MenuItems/PrintReport.jsp";
                    window.open(url, 'PrintBill', 'status=no,height=580px,width=850px,scrollbars=yes');
                } else {
                    alert(data.response.message);
                }
            //            uploadJobArray = res.JobData;
            }, 
            error: function (data) {

            }
        });
    } catch (e) {
    //alert(e);
    }

}

function downloadReceipt(obj) {

    console.log("downloadReceipt")

    var row = $(obj).closest("tr");
    console.log(row)
    var gridRowDate = $("#grid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    var mobileNumber = rowdata.CONNECTION_NUMBER;

    //var mobileNumber = rowdata.CAF_NO;
    //    newFormMem.ReEkycUploadPrintReceipt(mobileNumber, "Download");

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.mobileNumber = mobileNumber;
    reqData.CAF_NO = rowdata.CAF_NO;
    reqData.INSTANCE_ID = rowdata.INSTANCE_ID;
    reqData.type = "Download";
    $.ajax({
        url: "ReEkycUploadDownloadReceipt.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
            },
        success: function (data) {
            sessionCheck(data);
            var res = JSON.parse(JSON.stringify(data.response.responseData));
            console.log(res)
        //            uploadJobArray = res.JobData;
        }, 
        error: function (data) {

        }
    });





    var status = newFormMem.getProperty("downloadReceiptStatus");
    if (status == 'fail') {
        newFormMem.alert("Problem while download receipt");
    }
}
function mobileSearch() {
    if ($("#mobileNo_val").val().length != 0) {
        var mobileNumber = $("#mobileNo_val").val();

        if (!numberReg.test(mobileNumber)) {
            newFormMem.alert("Please Provide Mobile Number,It accepts digits only");
            $("#mobileNo_val").val("");
        } else {
            ReEkycUploadForms();
        }
    } else {
        ReEkycUploadForms();
    }

}
