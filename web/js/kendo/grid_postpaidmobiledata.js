var numberReg = /^[0-9%]+$/;

var postpaidGridArray = [];
var postpaidJsonObj = {};
var resultData;
function mobileValidation() {
    var mobileNumber = $("#post_mobID").val();
    if (!numberReg.test(mobileNumber)) {
        $('#post_mobID').val('');
//        alert('Please enter proper data ');
//         console.log('(JS grid_postpaidmobiledata.js) :: entered mobile number is :: ' + mobileNumber);
    }
}
function postpaidGrid() {
    try {
        var mobileNumber = $("#post_mobID").val();
        if (mobileNumber == "") {

            alert('Please enter GSM number');
        } else {
            if (!numberReg.test(mobileNumber)) {

                $('#post_mobID').val('');
                postpaidGridArray = [];
                $('#divGetInfo').hide();
                $('#grid').hide();
                alert('Please enter proper data ');
            } else {

                if (mobileNumber.length < 10) {
                    if (mobileNumber.indexOf('%') == '-1') {
                        $('#post_mobID').val('');
                        postpaidGridArray = [];
                        $('#divGetInfo').hide();
                        $('#grid').hide();
                        alert('% is mandatory if GSM number is less than 10 digits');
                    } else {
                        console.log("mobileNumber.length < 10 else ");
                     
                        getMobileNumbers(mobileNumber);
                     
                        postpaidJsonObj = JSON.parse(JSON.stringify(resultData));//UploadForms...
                        if (postpaidJsonObj.STATUS == '0') {
                            $("#divGetInfo").show();
                            $('#grid').show();
                            postpaidGridArray = postpaidJsonObj.GSM_DATA;
                            loadData();
                            var postMobDataNextID = postpaidGridArray.length + 1;
                            function getIndexById(id) {
                                var uploadJosArray_Len = postpaidGridArray.length;
                                for (var upload_Data = 0; upload_Data < uploadJosArray_Len; upload_Data++) {
                                    if (postpaidGridArray[upload_Data].ProductID == id) {
                                        return upload_Data;
                                    }
                                }
                                return null;
                            }
                        } else {
                            alert(postpaidJsonObj.MESSAGE);
                            postpaidGridArray = [];
                            $('#grid').hide();
                            $('#divGetInfo').hide();
                            $('#post_mobID').val('');

                        }
                    }
                } else if (mobileNumber.length == 10) {
		
                                                    getMobileNumbers(mobileNumber);             
                   postpaidJsonObj = JSON.parse(JSON.stringify(resultData));//UploadForms...
                    if (postpaidJsonObj.STATUS == '0') {
                        $("#divGetInfo").show();
                        $('#grid').show();
                        postpaidGridArray = postpaidJsonObj.GSM_DATA;
                        loadData();
                        var postMobDataNextID = postpaidGridArray.length + 1;
                        function getIndexById(id) {
                            var uploadJosArray_Len = postpaidGridArray.length;
                            for (var upload_Data = 0; upload_Data < uploadJosArray_Len; upload_Data++) {
                                if (postpaidGridArray[upload_Data].ProductID == id) {
                                    return upload_Data;
                                }
                            }
                            return null;
                        }
                    } else {

                        alert(postpaidJsonObj.MESSAGE);
                        postpaidGridArray = [];
                        $('#grid').hide();
                        $('#divGetInfo').hide();
                        $('#post_mobID').val('');

                    }
                } else {
                    postpaidGridArray = [];
                    $('#grid').hide();
                    $('#divGetInfo').hide();
                    $('#post_mobID').val('');
                }

            }
        }
    } catch (e) {
//        console.log('(JS grid_postpaidmobiledata.js) :: Exception in  :: postpaidGrid method::' + e);
    }

}


function  getMobileNumbers(mobileNumber) {



    var reqData = {};
    reqData.reqSessionId=parent.$("#reqSessionId").val();
    reqData.mobileNumber = mobileNumber;
    
    $.ajax({
        url: "postpaidmobiledetails.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            sessionCheck(data);
            resultData = data.response.responseData;
        }, error: function (data) {
            alert("error : getMobileNumbers");
        }

    });

}

function resetForm() {
    if (postpaidGridArray.length > 0) {
        postpaidGridArray = [];
        loadData();
        $("#grid").hide();
    } else {
        postpaidGridArray = [];
        $("#grid").hide();
    }

    $('#divGetInfo').hide();
    $('#post_mobID').val('');
}

function loadData() {
    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(postpaidGridArray);
                },
                create: function (e) {
                    e.data.ProductID = postMobDataNextID++;
                    postpaidGridArray.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    postpaidGridArray[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    postpaidGridArray.splice(getIndexById(e.data.ProductID), 1);
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
                        GSM_NO: {
                            type: "String"
                        },
                        ALLDIGIT_SUM: {
                            type: "string"
                        },
                        LAST5_SUM: {
                            type: "string"
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
                field: "GSM_NO",
                title: "GSM Number",
                width: 160
            }, {
                field: "ALLDIGIT_SUM",
                title: "Sum(All 10 digits)",
                width: 190
            }, {
                field: "LAST5_SUM",
                title: "Sum(Last 5 digits)",
                width: 190
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
        ]
    });

}

