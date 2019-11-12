/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var numberReg = /^[0-9]+$/;
var dateallowedReg = /^[0-9/]+$/;
var today = new Date();
var endDays = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
function mobileNumValidate(keyE) {
    try {
        var charV = keyE.key;

        if (charV == undefined) {
            //alert('undefined');
            charV = String.fromCharCode(keyE.charCode)
        }
        if (charV == 'Backspace' || charV == 'Tab') {
            return true;
        }
        var reg = /[0-9]$/;
        if (reg.test(charV)) {
            var gsm_number = $('#gsm_number').val();
            if (gsm_number.length == 0) {
                if (charV === '6' ||charV === '7' || charV === '8' || charV === '9') {
                } else {
                    alert("It should be a valid mobile number which should start with 6,7,8,9");
                    $('#gsm_number').val('');
                    $('#gsm_number').focus();
                    return false;
                }

            }
            return true;
        }
        return false;
    } catch (e) {

    }
}
function loadDefaultValues() {
    $("#upc_date").datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        maxDate: endDays
    });
}
function fecthUPCDataFun() {
    var gsm_number = $("#gsm_number").val();
    if (gsm_number == "") {
        alert("Please enter the GSM number")
        $("#divGetInfo").hide();
        return false;
    }
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.gsm_number = $("#gsm_number").val();

    var mnp_details = {};
    $.ajax({
        url: "mnpInfo.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            sessionCheck(data);
            mnp_details = data.response.responseData;
        },
        error: function (data) {
            //                    alert("error : change password "+JSON.stringify(data));
        }
    });
    var status = mnp_details.STATUS;

    if (status == 0) {
        $("#divGetInfo").show();
        var mnp_values = mnp_details.UPC_DATA;
        $("#gsm_num").text(mnp_values.GSM_Number);
        $("#sim_num").text(mnp_values.SIM_Number);
        $("#date_of_allot").text(mnp_values.Date_of_Allottment);
        $("#cust_name").text(mnp_values.Customer_Name);
        $("#address").text(mnp_values.Address);

    } else if (status == 1) {
        var mesg = "";
        try {
            mesg = mnp_details.MESSAGE;

        } catch (e) {
            mesg = "Data not found";
        }
        if (mesg == "") {
            mesg = "Data not found";
        }
        $("#gsm_number").val("");
        alert(mesg);
    }


}
function submitUPCCode() {
    var upc = $("#upc_Code").val();
    if (upc == "") {
        alert("Please enter the UPC Code")
        return false;
    }
    var upc_date = $("#upc_date").val();
    if (upc_date == "") {
        alert("Please select the UPC date")
        return false;
    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.gsm_number = $("#gsm_num").text();
    reqData.sim_number = $("#sim_num").text();
    reqData.UPC_Code = upc;
    reqData.upc_date = upc_date;

    document.mnpEdit.method = "post";
    document.mnpEdit.action = "submitUPCDetails.do";
    document.mnpEdit.reqData.value = encrypt(JSON.stringify(reqData));
    document.mnpEdit.submit();
//                $.ajax({
//                    url: "submitUPCDetails.do",
//                    type: 'POST',
//                    async: false,
//                    data: {"reqData": encrypt(JSON.stringify(reqData))},
//                    success: function (data) {
//                        sessionCheck(data);
//                        mnp_details = data.response.responseData;
//                    }, error: function (data) {
//                        //                    alert("error : change password "+JSON.stringify(data));
//                    }
//                }); 
}
function validUPCCode() {
    try {
        var flag = "false";
        var upc_code = $('#upc_Code').val();
        var charArray = upc_code.split('');
        if (upc_code == '') {
            alert("UPC Code field must not be empty");
        } else {
            if (upc_code.length == 8) {
                // auto populating previous operator
                var availablePrev_OperJOBJ = {};
                var strPrevOptr = $("#prev_optr_data").val();
                availablePrev_OperJOBJ = JSON.parse(strPrevOptr);
                $(availablePrev_OperJOBJ).each(function (index) {
                    if (charArray[0] === availablePrev_OperJOBJ[index].CODE) {
                        flag = "true";
                        return false;
                    } else {
                        flag = "false";

                    }
                });
                //auto populating donor circle
                var availableDonr_CircleJOBJ1 = {};
                var strDonarCircle = $("#donor_circle_data").val();
                availableDonr_CircleJOBJ1 = JSON.parse(strDonarCircle);
                $(availableDonr_CircleJOBJ1).each(function (index) {
                    if (charArray[1] === availableDonr_CircleJOBJ1[index].CODE) {
                        flag = "true";
                        return false;
                    } else {
                        flag = "false";
                    }

                });
                var upcCodeStauts = numeric(upc_code.substr(2, upc_code.length));
                if (flag === 'false' || upcCodeStauts === false) {
                    $('#upc_Code').val('');
                    alert("Please enter proper UPC Code");
                    return false;
                }
            } else {
                $('#upc_Code').val('');
                alert("UPC Code length must be 8");
                return false;
            }
        }
    } catch (e) {
        //            alert(e)
    }
}

function captialLetters() {
    var val = $('#upc_Code').val();
    $('#upc_Code').val(val.toUpperCase());
}
function displayMessage() {
    var mesg = document.getElementById("respMsg").value;
    if (mesg !== null && mesg !== '') {
        alert(mesg);
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.message = false;
        $.ajax({
            url: "clearMessage.do",
            type: 'POST',
            async: false,
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                alert("success");
            },
            error: function (data) {
                alert("error");
                //                    alert("error : change password "+JSON.stringify(data));
            }
        });
        $("#respMsg").val("");

    }
}
function dtAllowedValidation(idVal) {
    var target = idVal.getAttribute('id');
    var targetVal = $('#' + target).val();
    if (!dateallowedRegFun(targetVal)) {
        $('#' + target).val('');
        $('#' + target).focus();
        return false;
    }
}


function dateallowedRegFun(numeric) {
    if (!dateallowedReg.test(numeric)) {
        return false;
    } else {
        return true;
    }
}

//$("#upc_date").on('dp.change', function () {
//    var selectedDate = $("#upc_date").val();
//    var serverDate = new Date();
//    alert("serverDate::"+serverDate)
//    var convert_server_Date = convertPrevFormat(serverDate);
//    var noofDays = DateDiff(selectedDate, '/');
//
//    if (noofDays <= 16 && noofDays > 0) {
//        if (DateComparsionWithSever(selectedDate, convert_server_Date)) {
//            $("#upc_date").val(selectedDate);
//        } else {
//            $('#upc_date').val('');
//            alert("Selected invalid date");
//        }
//    } else {
//        $('#upc_date').val('');
//        alert("selected upc date should be within 16 days");
//    }
//
//});

function convertPrevFormat(usDate) {
    try {
        var dateParts = usDate.split("-");
        return dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
    } catch (e) {
        alert("JS Log(ekyc.js):::::::::::Exception in convertPrevFormat:::::::" + e);
    }
}
function DateComparsionWithSever(selectedDate, server) {
    try {
        var selected_parts = selectedDate.split("/");
        var server_parts = server.split("/");

        if (server_parts[2] < selected_parts[2]) {//server year less than sys  not allowed
            return true;//not allowed
        } else if (server_parts[2] == selected_parts[2]) {
            //        alert("same year false");
            if ((server_parts[1] > selected_parts[1])) {
                //            alert("month greater true");
                return false;// not allow
            } else if (server_parts[1] == selected_parts[1]) {
                //            alert("same month true");
                if (server_parts[0] < selected_parts[0]) {
                    //                alert("day is greate true");
                    return true//allow
                } else if (server_parts[0] == selected_parts[0]) {
                    //                alert("same day not allow false");
                    return true//not allow
                } else {
                    return false// not allow
                }

            } else {
                return true;//not allow
            }
        } else {
            return true;//allow
        }

    } catch (e) {
        alert("JS Logs(ekyc.js):::::Exception in DateComparsionWithSever:::::::::::::" + e)

    }
}