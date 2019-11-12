/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var altRegExp = /^([6789])([0-9])+$/;

function searchTicket() {

    var search = $("#serachCriteria" + ' option:selected').text();
    var searchValue = "";
    if (search == 'Ticket ID') {
        searchValue = $("#serachvalue").val();
    } else if (search == 'Severity') {
        searchValue = $("#Severity_cmb").val();
    } else if (search == 'Status') {
        searchValue = $("#serachCriteria_cmb").val();
    }
    if (search === 'Select from list') {
        alert("Please select from list");
        return false;
    } else {


        if (searchValue.length > 0 && searchValue != '0') {
            var reqData = {};
            reqData.seacrhCriteria = search;
            reqData.srachValue = searchValue;
            loadComplaints('1');

        } else {
            if (search == 'Ticket ID') {
                alert("Please enter TicketId");
            } else if (search == 'Severity') {
                alert("Please seelct  Severity");
            } else if (search == 'Status') {
                alert("please select status");
            }
            return false;
        }

    }
}
function serachCriteriaChng() {
    var searchValue = $("#serachCriteria").val();
    if (searchValue === '1') {

        $("#serachvalue").show();
        $("#serachCriteria_cmb").hide();
        $("#Severity_cmb").hide();

    } else if (searchValue === '2') {
        $("#serachvalue").hide();
        $("#Severity_cmb").show();
        $('#serachCriteria_cmb').hide();



    } else if (searchValue === '3') {
        $("#serachvalue").hide();
        $("#Severity_cmb").hide();
        $("#serachCriteria_cmb").show();

    }

}
function loadComplaintList(reqestData) {
    var repObj = {};
    try {
        var reqData = {};
        //        alert(reqestData);
        if (reqestData === '1') {
            var search = $("#serachCriteria" + ' option:selected').text();
            var searchValue = "";
            if (search == 'Ticket ID') {
                searchValue = $("#serachvalue").val();
            } else if (search == 'Severity') {
                searchValue = $("#Severity_cmb").val();
            } else if (search == 'Status') {
                searchValue = $("#serachCriteria_cmb").val();
            }
            var reqData = {};
            reqData.seacrhCriteria = search;
            reqData.srachValue = searchValue;
        }
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        $.ajax({
            url: "compalintList.do",
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                var res = JSON.parse(JSON.stringify(data));
                console.log("res:::" + JSON.stringify(data))
                repObj = res.response.responseData;
            },
            error: function (data) {
                repObj.MESSAGE = "Data loaded faild.";
                repObj.STATUS = "error";
            }

        });
    } catch (e) {
    }
    return repObj;
}

function loadComplaintType() {

    try {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        $.ajax({
            url: "ComplaintTypes.do",
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                var res = JSON.parse(JSON.stringify(data));
                //                console.log("res:::"+JSON.stringify(data))
                repObj = res.response.responseData.Data;
                if (res.response.success === true) {
                    $(repObj).each(function (index) {
                        $('#ddlConnection').append(new Option(repObj[index].COMPLAINT_TYPE_NAME, repObj[index].COMPLAINT_TYPE_NO));
                    }
                    );
                } else {
                    alert(res.response.responseData.MESSAGE)
                }

                //ddlConnection    
                //        {"response":{"browserId":"a37d1c98f97a2c520d49e834e80a8d37644a83e937372b830fccb5d6c64ab8e7","message":"","responseData":{"STATUS":"SUCCESS","MESSAGE":"Successfully fetch all complaint types","Data":[{"COMPLAINT_TYPE_NO":1,"COMPLAINT_TYPE_NAME":"aaa"},{"COMPLAINT_TYPE_NO":2,"COMPLAINT_TYPE_NAME":"bbb"},{"COMPLAINT_TYPE_NO":3,"COMPLAINT_TYPE_NAME":"ccc"}]},"success":true}}
            },
            error: function (data) {

            }

        });
    } catch (e) {
    }

}

function saveComplaint() {
    var complaint_type = $("#ddlConnection").val();
    var severity = $("#severity" + ' option:selected').text();
    var description = $("#description").val();
    var alt_cont_no = $("#alt_cont_no").val();
    var complaintDate = $("#compDateTime").val();
    var imageLength = document.getElementById("imageListUL").getElementsByTagName("li").length;
    if (complaint_type == "0") {
        $("#complaint_type").focus();
        alert("Please select Complaint type");
        return false;
    } else {
        if (severity === "Select Severity type") {
            $("#severity").focus();
            alert("Please select severity type");
            return false;
        } else {
            if (description.length > 0) {
                if (complaintDate.length > 0) {
                    if (alt_cont_no.length > 0) {
                        if (imageLength > 0) {

                        } else {
                            alert("Submit the complaint without attchments.");
                        }
                    } else {
                        $("#alt_cont_no").focus();
                        alert("Alternate contact number should not be empty");
                        return false;
                    }
                } else {
                    $("#compDateTime").focus();
                    alert("Please select report occurrence timestamp ");
                    return false;
                }

            } else {
                $("#description").focus();
                alert("Description should not be empty");
                return false;
            }
        }

    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.complaint_type = complaint_type;
    reqData.description = description;
    reqData.alt_cont_no = alt_cont_no;
    reqData.ReportOccurenceTime = complaintDate;
    reqData.severity = severity;


    document.newComplait.method = "post";
    document.newComplait.action = "newComplaints.do";
    document.newComplait.reqData.value = encrypt(JSON.stringify(reqData));
    document.newComplait.submit();

}
function saveComments() {
    var comments = $("#comments").val();
    if (comments.length > 0) {
        alert("Please enter comments");
        $("#comments").focus();
        return false;
    }
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.ticketID = $("#complaintID").text();
    reqData.commetns = $("#comments").val();

    document.viewComplaint.method = "post";
    document.viewComplaint.action = "resolveComplaint.do";
    document.viewComplaint.reqData.value = encrypt(JSON.stringify(reqData));
    document.viewComplaint.submit();
}
function loadComplaintView() {
    var ticket = $("#ticketDeatils").val();
    var ticketDeatils = {};
    ticketDeatils = JSON.parse(ticket);

    $("#complaintID").text(ticketDeatils.ticketID);

    $("#discription").text(ticketDeatils.Description);
    $("#mobile_no").text(ticketDeatils.AlternateContactNo);
    $("#ReportId").text(ticketDeatils.ReportingTime);
    $("#comments").val(ticketDeatils.CloseComments);
    $("#complaintType").text(ticketDeatils.ComplaintTypeName);
//    if(ticketDeatils.ComplaintTypeNo=='1'){
//        $("#complaintType").text("High"); 
//    }else if(ticketDeatils.ComplaintTypeNo=='2'){
//        $("#complaintType").text("Medium"); 
//    }
//    else if(ticketDeatils.ComplaintTypeNo=='3'){
//        $("#complaintType").text("Low"); 
//    }

}
function resetFeilds() {
    try {
        $("#severity").val("0");
        $("#ddlConnection").val("0");
        $("#description").val("");
        $("#compDateTime").val("");
        document.getElementById("uploadForm").reset();

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();

        document.newComplait.method = "post";
        document.newComplait.action = "deleteImages.do";
        document.newComplait.reqData.value = encrypt(JSON.stringify(reqData));
        document.newComplait.submit();

    } catch (e) {
        alert(e);
    }
}


$(document).ready(function () {

    $('#alt_cont_no').on('change', function () {
        var alconno = $('#alt_cont_no').val();
        if (altRegExp.test(alconno)) {
            return true;
        } else {
            $("#alt_cont_no").val("");
            $("#alt_cont_no").focus();
            alert("Alternate contact number should be a valid mobile number which should start with 6,7,8,9")
            return false;
        }
    });
});
