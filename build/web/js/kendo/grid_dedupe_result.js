var cafDataJSON = {};
var inputJSON = {};
var dedupeStatusJOBJ = {};
$(document).ready(function () {
    $("#cancleBtnId").on('click', function (val) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.ekycfinalData = cafDataJSON;
        document.dedupe.method = "post";
        document.dedupe.action = "rejectDedupe.do";
        document.dedupe.reqData.value = encrypt(JSON.stringify(reqData));
        document.dedupe.submit();
    });
    $("#backBtnId").on('click', function (val) {
        var strLoginResponse = document.getElementById("loginResponse").value;
        var loginResponse = JSON.parse(strLoginResponse);
        var Attach_Optional_Flag = loginResponse.Thick_ImageShow_Flag;
        var page = "CAF";
        if (Attach_Optional_Flag == "0") {//Attachmnets optional
            page = 'CAF';
        } else {
            page = 'Attachment';
        }
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.rootpage = page;
        reqData.kycpageStatus = "2";
        reqData.KYC_Fancy_load_Flag = "1"

        document.dedupe.method = "post";
        document.dedupe.action = "kycBack.do";
        document.dedupe.reqData.value = encrypt(JSON.stringify(reqData));
        document.dedupe.submit();
    });

    $("#rejectBtnId").on('click', function (val) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.ekycfinalData = cafDataJSON;
        document.dedupe.method = "post";
        document.dedupe.action = "rejectDedupe.do";
        document.dedupe.reqData.value = encrypt(JSON.stringify(reqData));
        document.dedupe.submit();
    });

    $("#acceptBtnId").on('click', function (val) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        document.dedupe.method = "post";
        document.dedupe.action = "acceptDedupe.do";
        document.dedupe.reqData.value = encrypt(JSON.stringify(reqData));
        document.dedupe.submit();
    });

    $("#nextBtnId").on('click', function (val) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        document.dedupe.method = "post";
        document.dedupe.action = "acceptDedupe.do";
        document.dedupe.reqData.value = encrypt(JSON.stringify(reqData));
        document.dedupe.submit();
    });
});

function getDedupeStatus() {
    //Dedupe
    try {
        var cafData = $('#kycFullData').val();
        cafDataJSON = JSON.parse(cafData);

        var month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(cafDataJSON.dob);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var dedupe_date = curr_date + "-" + month_names[curr_month] + "-" + curr_year;
        cafDataJSON['DEDUPE_DOB'] = dedupe_date;


        var dedupeStatus = {};

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.ekycfinalDaTa = cafDataJSON;
        $.ajax({
            url: "dedupeStatus.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                dedupeStatus = JSON.stringify(data);
            },
            error: function (data) {
                alert("error getDedupeStatus, data :" + JSON.stringify(data));
            }

        });


        dedupeStatusJOBJ = JSON.parse(dedupeStatus);
        dedupeStatusJOBJ = dedupeStatusJOBJ.response.responseData;
        if (dedupeStatusJOBJ.STATUS === "0") {

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
                var loginResponse = $("#loginResponse").val();
                var userFlag = loginResponse.UserFlag;
                if (userFlag == 3 || userFlag == 5) {
                    document.getElementById('cancleBtnId').style.display = 'none';
                    document.getElementById('nextBtnId').style.display = 'none';
                    document.getElementById('backBtnId').style.display = 'block';
                    document.getElementById('acceptBtnId').style.display = 'block';
                    document.getElementById('rejectBtnId').style.display = 'block';
                } else {
                    alert("Sorry, you cannot register this customer,since the existing connections with the customer has already reached the maximumm limit.");
                }
            } else if (dedupeStatusJOBJ.DEDUPE_DEDUPSTATUS === "E") {
                //DEDUPE_DEDUPSTATUS E for DEDUPE failure(DEDUPE Server problem)
                document.getElementById('cancleBtnId').style.display = 'block';
                alert(dedupeStatusJOBJ.MESSAGE);
            } else {
                document.getElementById('cancleBtnId').style.display = 'block';
                alert(dedupeStatusJOBJ.MESSAGE);
            }
        } else {
            //STATUS -1 for OnboardServer failure.
            document.getElementById('cancleBtnId').style.display = 'block';
            alert(dedupeStatusJOBJ.MESSAGE);
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
//        inputJSON['TRANSACTION_ID'] = '22032018111548416';
        inputJSON['DEDUPE_DEDUPSTATUS'] = dedupeStatusJOBJ.DEDUPE_DEDUPSTATUS;
        var strInputJSON = JSON.stringify(inputJSON);
        var dedupeDetailsJOBJ = {};
        var dedupeDetails = {};
        var dedupeDetailsFinalRes = {};
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.inputJSON = inputJSON;
        $.ajax({
            url: "dedupeDetails.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                dedupeDetails = JSON.stringify(data);

            },
            error: function (data) {
                alert("error countires, data :" + JSON.stringify(data));
            }

        });

        dedupeDetailsJOBJ = JSON.parse(dedupeDetails);
        dedupeDetailsFinalRes = dedupeDetailsJOBJ.response.responseData;

        if (dedupeDetailsFinalRes.STATUS === "0") {
            sampleData = dedupeDetailsFinalRes.DEDUPE_DATA;
            if (sampleData.length > 0) {
                loadGrid();
            } else {
                alert("No Data Found");
            }
        } else {
            alert(dedupeDetailsFinalRes.MESSAGE);
        }
    } catch (e) {
        //        alert(e);
    }
}


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
                        TRANSACTION_ID: {
                            type: "string"
                        },
                        RULE: {
                            type: "string"
                        },
                        MSISDN: {
                            type: "string"
                        },
                        NAME: {
                            type: "string"
                        },
                        FATHER_NAME: {
                            type: "string"
                        },
                        PRESENTADDRESS: {
                            type: "string"
                        },
                        REPLY_CNT: {
                            type: "string"
                        },
                        TYPE: {
                            type: "string"
                        }
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