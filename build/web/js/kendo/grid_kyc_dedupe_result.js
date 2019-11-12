function dedupeResult() {
    setTimeout(function () {
        loadUserName();
        getDedupeStatus();
    }, 1000);
}

var cafDataJSON = {};
var inputJSON = {};
var dedupeStatusJOBJ = {};

$("#cancleBtnId").on('click', function (val) {
    var ekycfinalDaTa = JSON.stringify(cafDataJSON);
    newFormMem.dedupeCancleOrReject(ekycfinalDaTa);
    window.location.href = "index.html";
});
$("#backBtnId").on('click', function (val) {
//    window.location.href = "kycCafPage.html";
    if (newFormMem.isContainsKey("Attach_Optional_Flag")) {
        var attach_opt_Flag = newFormMem.getProperty('Attach_Optional_Flag');

        if (attach_opt_Flag == "0") {//Attachmnets optional
            window.location.href = 'kycCafPage.html';

        } else {//Attachmnets Mandatory
            window.location.href = 'attachments.html';
        }
    }
});

$("#rejectBtnId").on('click', function (val) {
    var ekycfinalDaTa = JSON.stringify(cafDataJSON);
    newFormMem.dedupeCancleOrReject(ekycfinalDaTa);
    window.location.href = "index.html";
});

$("#acceptBtnId").on('click', function (val) {
    window.location.href = "kycReceipt.html";
});

$("#nextBtnId").on('click', function (val) {
    window.location.href = "kycReceipt.html";
});

function getDedupeStatus() {
    //Dedupe
    try {
        var cafData = newFormMem.getProperty('kycFullData');
        cafDataJSON = JSON.parse(cafData);

        var month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(cafDataJSON.dob);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var dedupe_date = curr_date + "-" + month_names[curr_month] + "-" + curr_year;
        cafDataJSON['DEDUPE_DOB'] = dedupe_date;
        var ekycfinalDaTa = JSON.stringify(cafDataJSON);

        var dedupeStatus = newFormMem.getDedupeStatus(ekycfinalDaTa);
//        var dedupeStatus = '{"DEDUPE_COMMENT":"","DEDUPE_DEDUPCNT":"9","STATUS":"0","DEDUPE_DEDUPSTATUS":"S","DEDUPE_JOB_ID":"22512","DEDUPE_RULE":"R0","DEDUPE_TRANSACTIONID":"14042017201618539","DEDUPE_ERRCODE":"0","DEDUPE_ERRDESC":"","MESSAGE":"Dedupe status retrieved successfully","USER_ID":"39","JOB_TYPE":"eKYC","JOB_SOURCE":"T"}  ';
//        utilsObj.writeLog('JS Log ::::dedupeStatus in getDedupeStatus  method\t' + dedupeStatus);

        dedupeStatusJOBJ = JSON.parse(dedupeStatus);
        if (dedupeStatusJOBJ.STATUS === "0") {
            //STATUS and DEDUPE_DEDUPSTATUS 0 for success
//            newFormMem.setProperty('DEDUPE_DATA',dedupeStatus);
            var dedupeCount = dedupeStatusJOBJ.DEDUPE_DEDUPCNT;
            $('#dedupeCount').text(dedupeCount);
            document.getElementById('cancleBtnId').style.display = 'block';
            document.getElementById('backBtnId').style.display = 'block';
            document.getElementById('nextBtnId').style.display = 'block';

        } else if (dedupeStatusJOBJ.STATUS === "1") {
            //STATUS for 1 for DEDUPE failure.
            if (dedupeStatusJOBJ.DEDUPE_DEDUPSTATUS === "F") {
                //DEDUPE_DEDUPSTATUS F for Maximum connections exceed.
                var dedupeCount = dedupeStatusJOBJ.DEDUPE_DEDUPCNT;
                $('#dedupeCount').text(dedupeCount);
                var userFlag = newFormMem.getProperty('UserFlag');
                if (userFlag == 3 || userFlag == 5) {
                    document.getElementById('cancleBtnId').style.display = 'none';
                    document.getElementById('nextBtnId').style.display = 'none';
                    document.getElementById('backBtnId').style.display = 'block';
                    document.getElementById('acceptBtnId').style.display = 'block';
                    document.getElementById('rejectBtnId').style.display = 'block';
                } else {
                    newFormMem.alert("Sorry, you cannot register this customer,since the existing connections with the customer has already reached the maximumm limit.");
                }
            } else if (dedupeStatusJOBJ.DEDUPE_DEDUPSTATUS === "E") {
                //DEDUPE_DEDUPSTATUS E for DEDUPE failure(DEDUPE Server problem)
                document.getElementById('cancleBtnId').style.display = 'block';
                newFormMem.alert(dedupeStatusJOBJ.MESSAGE);
            }
        } else {
            //STATUS -1 for OnboardServer failure.
            document.getElementById('cancleBtnId').style.display = 'block';
            newFormMem.alert(dedupeStatusJOBJ.MESSAGE);
        }
    } catch (e) {
//        alert(e);
    }
}
var sampleData = [];
function loadDedupeData() {
    try {
        inputJSON['GSM_NUMBER'] = cafDataJSON.gsm_number;
        inputJSON['TRANSACTION_ID'] = dedupeStatusJOBJ.DEDUPE_TRANSACTIONID;
        inputJSON['DEDUPE_DEDUPSTATUS'] = dedupeStatusJOBJ.DEDUPE_DEDUPSTATUS;
        var strInputJSON = JSON.stringify(inputJSON);
        var dedupeDetailsJOBJ = {};
        var dedupeDetails = newFormMem.getDedupeDetails(strInputJSON);
        dedupeDetailsJOBJ = JSON.parse(dedupeDetails);
        if (dedupeDetailsJOBJ.STATUS == "0") {
            alert("STATUS : " + STATUS);
            sampleData = dedupeDetailsJOBJ.DEDUPE_DATA;
            if (sampleData.length > 0) {
                loadGrid();
            } else {
                newFormMem.alert("No Data Found");
            }
        } else {
            newFormMem.alert(dedupeDetailsJOBJ.MESSAGE);
        }
    } catch (e) {
//        alert(e);
    }
}


//var sampleData = [
//    {"TRANSACTION_ID": "0907201516264311727", MobileNumber: "9899656681", AccountNumber: "9899656681", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311728", MobileNumber: "9899656785", AccountNumber: "9630125478", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Postpaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311729", MobileNumber: "9876543210", AccountNumber: "9874563254", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Postpaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311730", MobileNumber: "9630258741", AccountNumber: "8523697410", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311731", MobileNumber: "9510236874", AccountNumber: "7410236589", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311732", MobileNumber: "9630147852", AccountNumber: "7532014896", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311733", MobileNumber: "7410258963", AccountNumber: "8569741023", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311734", MobileNumber: "7896541230", AccountNumber: "87412369850", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Postpaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311735", MobileNumber: "8520369741", AccountNumber: "9874563210", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311736", MobileNumber: "8741023695", AccountNumber: "9512364780", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Postpaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"},
//    {"TRANSACTION_ID": "0907201516264311737", MobileNumber: "7530149520", AccountNumber: "7845632109", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"}
//
//];

//{SIMNo: "0907201516264311737", MobileNumber: "7530149520", AccountNumber: "7845632109", Name: "Amit", Fathername: "Ramanath", Address: "A1, Vikrampuri", City: "Hyderabad", Pincode: "500009", POAtype: "Passport", POAvalue: "A12 34567", POItype: "Pancard", POIvalue: "AAAPL1234C", ConnectionType: "Prepaid", Gender: "Male", Circle: "Andhra Pradesh", DateofBirth: "12/06/1989", SSA: " ", CscName: " ", ActivationDate: "28/01/2017"}
//{ "TRANSACTION_ID":"13042017115409639", "RULE":"R0", "SRC_MOBILE":"9949012345", "MSISDN":"9949012345", "NAME":"Harsh Kumar null null", "FATHER_NAME":"S/O Vijaypal Singh", "PRESENTADDRESS":"14 HARAVLI ROAD FATEH NAGAR", "REPLY_CNT":"1", "TYPE":"SOURCE" }

function getIndexById(id) {

    var idx,
            l = sampleData.length;

    for (var j; j < l; j++) {
        if (sampleData[j].ProductID == id) {
            return j;
        }
    }
    return null;
}
//$(document).ready(function () {
function loadGrid() {
    var sampleDataNextID = sampleData.length + 1;
    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(sampleData);
                },
                create: function (e) {
                    e.data.ProductID = sampleDataNextID++;
                    sampleData.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    sampleData[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    sampleData.splice(getIndexById(e.data.ProductID), 1);
                    e.success();
                }
            },
            error: function (e) {
                // handle data operation error
                alert("Category: " + e.Category + "; Error message: " + e.errorThrown);
            },
            pageSize: 7,
            batch: false,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        TRANSACTION_ID: {type: "string"},
                        RULE: {type: "string"},
                        MSISDN: {type: "string"},
                        NAME: {type: "string"},
                        FATHER_NAME: {type: "string"},
                        PRESENTADDRESS: {type: "string"},
                        REPLY_CNT: {type: "string"},
                        TYPE: {type: "string"},
//                        Action: {
//                            type: "celleHtml"
//
//                        }
                    }
                }
            }
        },

        //height: 440,
        sortable: true,
        reorderable: true,
        //groupable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [{
                field: "TRANSACTION_ID",
                title: "TRANSACTION ID",
                width: 200
            }, {
                field: "RULE",
                title: "RULE",
                width: 200
            }, {
                field: "MSISDN",
                title: "MSISDN",
                width: 200
            }, {
                field: "NAME",
                title: "NAME",
                width: 150
            }, {
                field: "FATHER_NAME",
                title: "FATHER NAME",
                width: 180
            }, {
                field: "PRESENTADDRESS",
                title: "PRESENT ADDRESS",
                width: 200
            }, {
                field: "REPLY_CNT",
                title: "REPLY CNT",
                width: 140
            }, {
                field: "TYPE",
                title: "TYPE",
                width: 120
            }
        ]
    });
}
//});


/*	$(function(){
 var celleHtml = "";
 celleHtml = "<div class='actions'>";	
 celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	
 
 celleHtml += "</div>";	
 $(".action").html(celleHtml);
 
 }); */