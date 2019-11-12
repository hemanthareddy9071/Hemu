var numberReg = /^([789])([0-9])+$/;
var numberallowedReg = /^[0-9/]+$/;
var downloadCAfJobArray = [];
var cafDataObj = {};
var searchData = [];
//function timeoutdownload_caf() {
//
////        loadUserName();
////        loadMenuContentFun();
//    loadMenuContent();
//
//}
function searchCCMSCafs(telephoneNumber, accountnumber, simNumber) {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.telephoneNumber = telephoneNumber;
    reqData.accountnumber = accountnumber;
    reqData.simNumber = simNumber;
    $.ajax({
        url: "searchCCMSCafs.do", //parameters go here in object literal form
        type: 'POST',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        async: false,
        success: function (data) {
            sessionCheck(data);
            var objCYMN = JSON.parse(JSON.stringify(data));
//             alert(JSON.stringify(data));
            cafDataObj = objCYMN.response.responseData;
//            alert(objCYMN.response.success);
            if (objCYMN.response.success === "true" || objCYMN.response.success === true) {
//                alert(cafDataObj.STATUS);
                if (cafDataObj.STATUS ==='0') {
//                    console.log(data);
                    downloadCAF();
                    $('#grid').show();
                } else {
                    alert(cafDataObj.MESSAGE);
                }
            } else {
                alert(objCYMN.response.message);
            }

        }, error: function (data) {
            alert("errored occured while loading data");
////            newFormMem.alert(cafDataObj.MESSAGE);
            downloadCAfJobArray = [];
            $('#grid').hide();
            $("#telephonenumber").val('');
            $("#accountnumber").val('');
            $("#simNumber").val('');
            $("#telephonenumber").focus();
        }

    });
}


function MobileSearchBtn() {
    var telephoneNumber = $("#telephonenumber").val();
    var accountnumber = $("#accountnumber").val();
    var simNumber = $("#simNumber").val();
    if ($("#telephonenumber").val().length != 0) {
        searchCCMSCafs(telephoneNumber, accountnumber, simNumber);
    } else {
        alert("Please enter telephone number");
        $("#telephonenumber").focus();
    }
}
function telephnNumValid() {

    var telephoneNumber = $("#telephonenumber").val();
    if (!numberallowedReg.test(telephoneNumber)) {
        alert("It should be allowed only numbers");
        $("#telephonenumber").val("");
    }
}
function accounttNumValid() {
    var accountnumber = $("#accountnumber").val();
    if (!numberallowedReg.test(accountnumber)) {
        alert("It should be allowed only numbers");
        $("#accountnumber").val("");
    }
}
function simNumValid() {
    var simNumber = $("#simNumber").val();
    if (!numberallowedReg.test(simNumber)) {
        alert("It should be allowed only numbers");
        $("#simNumber").val("");
    }
}
function downloadCAF() {
    downloadCAfJobArray = cafDataObj.CAF_DATA;//assing her aftewr complete get data
    var downloadCAfDataNextID = downloadCAfJobArray.length + 1;
    function getIndexById(id) {
        var idx, len = downloadCAfDataNextID.length;
        for (var j; j < len; j++) {
            if (downloadCAfDataNextID[j].ProductID == id) {
                return j;
            }
        }
        return null;
    }
    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(downloadCAfJobArray);
                    },
                    create: function (e) {
                        e.data.ProductID = downloadCAfDataNextID++;
                        downloadCAfJobArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        downloadCAfJobArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        downloadCAfJobArray.splice(getIndexById(e.data.ProductID), 1);
                        e.success();
                    }
                },
                error: function (e) {
                    // handle data operation error
                    alert("Category: " + e.Category + "; Error message: " + e.errorThrown);
                },
                pageSize: 10,
                batch: false,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            circleShortCode: {type: "string"},
                            SSAName: {type: "string"},
                            LOTName: {type: "string"},
                            mimetype: {type: "string"},
                            lotsource: {type: "string"},
                            firstName: {type: "string"},
                            TelephoneNumber: {type: "string"},
                            accountNumber: {type: "string"},
                            SIMNumber: {type: "string"},
                            IMSINumber: {type: "string"},
                            AAdharNumber: {type: "string"},
                            activationDate: {type: "string"},
                            Action: {type: "celleHtml"}
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
            columns: [
                {
                    field: "circleShortCode",
                    title: "circleShortCode",
                    hidden: true,
                    menu: false,
                    width: 150
                }, {
                    field: "SSAName",
                    title: "SSAName",
                    hidden: true,
                    menu: false,
                    width: 150
                }, {
                    field: "LOTName",
                    title: "LOTName",
                    hidden: true,
                    menu: false,
                    width: 150
                }, {
                    field: "mimetype",
                    title: "mimetype",
                    hidden: true,
                    menu: false,
                    width: 150
                }, {
                    field: "lotsource",
                    title: "lotsource",
                    hidden: true,
                    menu: false,
                    width: 150
                }, {
                    field: "firstName",
                    title: "Name",
                    width: 150
                }, {
                    field: "TelephoneNumber",
                    title: "Telephone number",
                    width: 220
                }, {
                    field: "accountNumber",
                    title: "Account number",
                    width: 200
                }, {
                    field: "SIMNumber",
                    title: "SIM number",
                    width: 180
                }, {
                    field: "IMSINumber",
                    title: "IMSI number",
                    width: 180
                }, {
                    field: "AAdharNumber",
                    title: "Aadhar number",
                    width: 200
                }, {
                    field: "activationDate",
                    title: "Activation date",
                    width: 220
                }, {
                    headerAttributes: {
                        style: "padding: 10px 30px;"
                    },
                    command: [
                        {
                            template: "<div class='action'><a href='javascript:void(0);' title='DownloadPDF' onclick='downloadReceipt(this)'><i class='download_ic'></i></a></div>"
                        }
                    ],
                    title: "<font color='black'> Actions</font>",
                    width: 250
                }
            ]
        });
    });
}

function downloadReceipt(obj) {
    var dataPrepare = {};
    var row = $(obj).closest("tr");
    var gridRowDate = $("#grid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
//     reqData.reqSessionId = 
    dataPrepare['reqSessionId'] = parent.$("#reqSessionId").val();
    dataPrepare['circleShortCode'] = rowdata.circleShortCode;
    dataPrepare['SSAName'] = rowdata.SSAName;
    dataPrepare['LOTName'] = rowdata.LOTName;
    dataPrepare['mimetype'] = rowdata.mimetype;
    dataPrepare['lotsource'] = rowdata.lotsource;
    dataPrepare['firstName'] = rowdata.firstName;
    dataPrepare['TelephoneNumber'] = rowdata.TelephoneNumber;
    dataPrepare['accountNumber'] = rowdata.accountNumber;
    dataPrepare['SIMNumber'] = rowdata.SIMNumber;
    dataPrepare['IMSINumber'] = rowdata.IMSINumber;
    dataPrepare['AAdharNumber'] = rowdata.AAdharNumber;
    dataPrepare['activationDate'] = rowdata.activationDate;

    $.ajax({
        url: "downloadCCMSCafsPDF.do", //parameters go here in object literal form
        type: 'POST',
        data: {"reqData": encrypt(JSON.stringify(dataPrepare))},
        async: false,
        success: function (data) {
            sessionCheck(data);
            var objCYMN = JSON.parse(JSON.stringify(data));
//            alert(JSON.stringify(data));

            var cafDownload = objCYMN.response.responseData;

            if (objCYMN.response.success === "true" || objCYMN.response.success === true) {
                if (cafDownload.STATUS ==='0') {
//                    alert(cafDownload.STATUS);
//                     sessionCheck(data);
                    var downloadpdf = {};
                    downloadpdf.FilePath = cafDownload.FilePath;
                    downloadpdf.FileName = cafDownload.FileName;
                    document.getElementById("reqData").value = encrypt(JSON.stringify(downloadpdf));
                    document.caf_retrival.method = "post";
                    document.caf_retrival.action = "downloadPdf.do";
                    document.caf_retrival.reqData = encrypt(JSON.stringify(downloadpdf));
                    document.caf_retrival.submit();
                } else {
                var downloadpdf = {};
                    downloadpdf.FilePath = cafDownload.FilePath;
                    downloadpdf.FileName = cafDownload.FileName;
                    document.getElementById("reqData").value = encrypt(JSON.stringify(downloadpdf));
                    document.caf_retrival.method = "post";
                    document.caf_retrival.action = "downloadPdf.do";
                    document.caf_retrival.reqData = encrypt(JSON.stringify(downloadpdf));
                    document.caf_retrival.submit();
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




//    newFormMem.downloadCAFPrintReceipt(JSON.stringify(dataPrepare), "Download");
//    var status = newFormMem.getProperty("downloadReceiptStatus");
//    if (status == 'fail') {
//        newFormMem.alert("Problem while download receipt");
//    }
}