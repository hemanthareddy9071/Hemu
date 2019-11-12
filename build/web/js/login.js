/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var gridDs;
//var wingsGridData=[{"ZONE_CODE":"SZ","NAME":"reterte","MOBILE":"9876543210","REGISTER_DATE":"2018-7-23 11:51:41. 147000000","CAF_NO":"WL_10008373","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"sdfgs","MOBILE":"9494233193","REGISTER_DATE":"2018-7-19 19:43:10. 581000000","CAF_NO":"WL_10008364","CIRCLE_CODE":"Chattisgarh"},{"ZONE_CODE":"SZ","NAME":"Durga","MOBILE":"9666234198","REGISTER_DATE":"2018-7-20 10:11:58. 695000000","CAF_NO":"WL_10008366","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"NZ","NAME":"ravi","MOBILE":"9876543210","REGISTER_DATE":"2018-7-20 10:51:8. 36000000","CAF_NO":"WL_10008367","CIRCLE_CODE":"New Delhi"},{"ZONE_CODE":"SZ","NAME":"dfg","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 13:47:5. 15000000","CAF_NO":"WL_10008375","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"sdfasd","MOBILE":"9494233193","REGISTER_DATE":"2018-7-23 15:0:21. 822000000","CAF_NO":"WL_10008377","CIRCLE_CODE":"AP"},{"ZONE_CODE":"NZ","NAME":"fgdh","MOBILE":"9876543210","REGISTER_DATE":"2018-7-20 10:58:58. 273000000","CAF_NO":"WL_10008368","CIRCLE_CODE":"New Delhi"},{"ZONE_CODE":"SZ","NAME":"fdgfdg","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 13:52:0. 171000000","CAF_NO":"WL_10008376","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"fgf","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 15:7:52. 60000000","CAF_NO":"WL_10008378","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"NZ","NAME":"sfdsf","MOBILE":"9494233193","REGISTER_DATE":"2018-7-19 19:19:32. 600000000","CAF_NO":"WL_10008363","CIRCLE_CODE":"New Delhi"},{"ZONE_CODE":"SZ","NAME":"sdfgfsd","MOBILE":"9494233193","REGISTER_DATE":"2018-7-20 9:52:59. 696000000","CAF_NO":"WL_10008365","CIRCLE_CODE":"Kerala"},{"ZONE_CODE":"NZ","NAME":"asdf","MOBILE":"9494233193","REGISTER_DATE":"2018-7-20 12:27:20. 250000000","CAF_NO":"WL_10008369","CIRCLE_CODE":"Haryana"},{"ZONE_CODE":"SZ","NAME":"dfd","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 12:54:47. 924000000","CAF_NO":"WL_10008374","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"fgdfg","MOBILE":"9494233193","REGISTER_DATE":"2018-7-20 16:24:44. 418000000","CAF_NO":"WL_10008371","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"wewrewerrer","MOBILE":"9876543210","REGISTER_DATE":"2018-7-21 17:2:7. 735000000","CAF_NO":"WL_10008372","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"dfgdfg","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 15:29:15. 20000000","CAF_NO":"WL_10008384","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"fgdfg","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 15:16:17. 787000000","CAF_NO":"WL_10008381","CIRCLE_CODE":"Andhra Pradesh"},{"ZONE_CODE":"SZ","NAME":"dsfsdf","MOBILE":"9666234198","REGISTER_DATE":"2018-7-23 15:23:7. 760000000","CAF_NO":"WL_10008382","CIRCLE_CODE":"Andhra Pradesh"}];
var wingsGridData=[];
var otpResTxn;
var aadharSeqId;
var zoneCode;
var stateCode;
var isCircleEnbDis;
var regMobNo;

 /*............Running functionss............*/
 

function searchTocken() {
    $('#toolStrip').html('');

    var serchTocken = $("input[name='radio']:checked").val();
    var serchvalue = $("#searchkey").val();
   //var serchTocken=$("#reg_mob_no").val()==""?$("#waitlist_caf_no").val()==""?$("#wings_mob_num").val()==""?"":$("#wings_mob_num").val():$("#waitlist_caf_no").val():$("#reg_mob_no").val();
    if (serchvalue == "") {
       
        alert(info);
        return false;
    } else {

        var reqData = {};
        if (serchTocken == "1" || serchTocken == "3") {
            var mob_no = $('#searchkey').val();
            if (mob_no != "") {
                var target = 'searchkey'
                var regExp1 = /(^[6-9]{1})([0-9]{0,9})$/;
                var targetVal = $('#' + target).val();
                if(!regExp1.test(targetVal)){
                   $('#' + target).val('');
                   alert(validmobilenumber);
                   return false;
                }
                if (targetVal.length == 10) {
                    if (!regExp1.test(targetVal)) {
                        $('#' + target).val('');
                        $('#' + target).focus();
                        alert(alretNumStrtWth);
                        return false;
                    } else {


                    }
                } else if (targetVal.length == 11) {
                    var targetVal = $('#' + target).val();
                    var zeroindx = targetVal.substr(0, 1);
                    if (zeroindx === 0 || zeroindx === '0') {
                        var firstindx = targetVal.substr(1, 1);
                        if (firstindx === 6 || firstindx === '6' || firstindx === 7 || firstindx === '7' || firstindx === 8 || firstindx === '8' || firstindx === 9 || firstindx === '9') {
                        } else {
                            alert(alretNumsecDigit);
                            $('#' + target).val('');
                            $('#' + target).focus();
                            return false;
                        }
                    } else {
                        alert(alret11Digit);
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }
                } else {
                    alert(validmobilenumber);
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false;
                }
            } else {
                alert(alretmobnoempty);
                return false;
            }
        } else if (serchTocken == "2") {
           serchvalue =serchvalue.toUpperCase();
           var firstIndex=serchvalue.substr(0,1);
           if(!(firstIndex =="L" || firstIndex =="W")){
             alert(cafno);
             $('#searchkey').val('');
             return false;
           }
        }
        reqData.serchTocken = serchTocken;
        reqData.serchvalue = serchvalue;
        $.ajax({
            url: 'fetchCustTockenValue.do',
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {"reqData": JSON.stringify(reqData)},
            success: function (res) {
                var res = JSON.parse(JSON.stringify(res));
                dataSource1 = [];
                try {
                    if (res.response.success) {

                        if (res.response.responseData.Data.length > 0) {
                            jobArr = res.response.responseData.Data;
                            loadInfoTabs();

                        } else {
                            alert(nodata);
                        }
                    } else {
                        alert("Alert::" + res.response.message);
                    }
                } catch (e) {
                    alert(e);
                }

            }, error: function (data) {
                alert("error print " + JSON.stringify(data));
            }
        });

    }

}

function loadComplaintsList(){
   
    var reqData = {};
    reqData.type = "FMSEKYC";
    $.ajax({
        url: "loadWingscomplaint.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availableCircles = resJson.response.responseData;
                    if (availableCircles.STATUS === "0") {
                        var availexCodelarr = availableCircles.Data;
                        $('#cmplntdd_type').children().remove();
                        $('#cmplntdd_type').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                            $('#cmplntdd_type').append($("<option></option>").attr("value",availexCodelarr[index].COMPLAINT_ID).text(availexCodelarr[index].COMPLAINT_NAME).attr("toEmail",availexCodelarr[index].TO_EMAIL).attr("subject",availexCodelarr[index].SUBJECT));
                        });
                    } else {
                        $('#cmplntdd_type').val("");
                    }
                }, error: function (data) {
                    alert("Unable to fetch complaints");
                }
    });
   
}

function clearInfo(){
   try{
    $('#cmplntdd_email').val('');
    setTimeout(function(){$('#cmplntdd_email').focus();},300);
    $('#cmplntdd_type').val('');
    $('#cmplntdd_msg').val('');
   }catch(e){
       alert(e);
   }
}

function isvalidEmail(event){
    var target = event.getAttribute('id');
    var targetVal=$('#' + target).val();
           if (!emailValidation(targetVal)) {
                            $('#' + target).val('');
                            $('#' + target).focus();
                            alert(MsgEmailValid);
                            return false;
                        } else {

                        }
}

function submitComplaint() {
    var reqData = {};
    var email = $('#cmplntdd_email').val();
    var complaint_type = $('#cmplntdd_type').val();
    var toEmail = $('#cmplntdd_type').find("option:selected").attr('toEmail');
    var subject = $('#cmplntdd_msg').val();
    var subjectValidmin = $('#cmplntdd_msg').attr('minlength');
    var subjectValidmax = $('#cmplntdd_msg').attr('maxlength');
    if (subject.trim() == "") {
        alert(MsgNotEmpty);
        return false;
    } else {
        if (subject.length < subjectValidmin) {
            alert(minMsgReq.replace('@size@', minLen));
            return false;
        }

    }
    if (complaint_type == 0) {
        alert(SelComType);
        return false;
    }
    if (email == "") {
        alert(MsgEmail);
        return false;
    }
    reqData.FROM_EMAIL = email;
    reqData.COMPLAINT_TYPE = complaint_type;
    reqData.SUBJECT = subject;
    reqData.TO_EMAIL = toEmail;
    $.ajax({
        url: "submitWingsComplaint.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            var resJson = JSON.parse(JSON.stringify(data));
            alert(resJson.response.message);
            $('#clsbtn').click();
        }, error: function (data) {
            alert("Unable to submit Job");
            $('#popRaiseComplaint').hide();
        }
    });

}

function wingsPaymentRequest() {

    var wngPayReqObj = JSON.parse(custPayReqData);
    if (wngPayReqObj.length != undefined || wngPayReqObj != "") {
        var reqData = {};
        reqData.CAF_NO = wngPayReqObj.CAF_NO;
        reqData.CUST_MOBILE_NO = wngPayReqObj.CUST_MOBILE_NO;
        reqData.CIRCLE_CODE = wngPayReqObj.CIRCLE_CODE;
        reqData.WL_CAF_NO = wngPayReqObj.WL_CAF_NO;
        $.ajax({
            url: 'paymentRequest.do',
            type: 'POST',
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(wngPayReqObj))},
            success: function (data) {

                if (data.response.success) {
                    if ('S' == data.response.responseData.PYMT) {
                        window.location.href = data.response.responseData.PYMT_URL;
                    } else {
                        alert(payIntFail);
                        setTimeout(function () {
                            window.location.href = 'Login.do';
                        }, 300);
                    }
                } else {
                    alert(data.response.message);
                }
            }, error: function (data) {
                alert(JSON.stringify(data));
                setTimeout(function () {
                    window.location.href = 'Login.do';
                }, 300);
            }
        });
    } else {
        alert(unableProcReq);
    }


}




 
function setCustomerData() {
    if (custPayReqData != null) {
        var custPayReqDataobj = JSON.parse(custPayReqData);
        for (var prop in custPayReqDataobj) {
            if (!custPayReqDataobj.hasOwnProperty(prop))
                continue;
            $('#' + prop).text(custPayReqDataobj[prop]);
        }
    }
    if(queryParamFlagStr == 'T'){
        $('#backButton').hide();
    }
}
 
 function resendOtp(){
     $('#resnbuttn').hide();
      sendOTPRequest('internal');
 }
 
function enterKey(event) {

    if (event.keyCode == 13) {

        $("#loginID").click(loginSubmitFun());
    }
    event.stopPropagation();
}

function performAction(obj){
     var reqData={}; 
         var row = $(obj).closest("tr");
    var gridRowDate = $("#wingsDataGrid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
       if(rowdata.OB_ENABLE=='1'){
           if(rowdata.OB_STATUS=='0'){
       reqData.MOBILE=rowdata.MOBILE;
       reqData.CAF_NO=rowdata.CAF_NO;
       reqData.STATUS=rowdata.STATUS;
       reqData.EMAIL =rowdata.EMAIL;
       reqData.SESSIONID =rowdata.SESSIONID;
       reqData.ROW_DATA =rowdata;
       reqData.bckBtnEnable =true;
        document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
        document.regUsrFrm.method = "post";
        document.regUsrFrm.action = "FMS_eKYC_otp.do";
        document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
        document.regUsrFrm.submit();
    }else{
         alert(alretOnbStatus);
    }
    }else{
       alert(alretOnbEnable);
    }
}

function loadFMSCircles() {
   
    var reqData = {};
    reqData.type = "FMSEKYC";
    $.ajax({
        url: "loadFMSCircles.do",
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
                    var resJson = JSON.parse(JSON.stringify(data));
                    var availableCircles = resJson.response.responseData;
                    if (availableCircles.STATUS === "0") {
                        var availexCodelarr = availableCircles.Data;
                        $('#zoneCode').children().remove();
                        $('#zoneCode').append('<option value="0">Select from list</option>');
                        $(availexCodelarr).each(function (index) {
                           //$('#zoneCode').append(new Option(availexCodelarr[index].CIRCLE_NAME, availexCodelarr[index].ZONE_CODE));
                            $('#zoneCode').append($("<option></option>").attr("value",availexCodelarr[index].ZONE_CODE).text(availexCodelarr[index].CIRCLE_NAME).attr("stateCode",availexCodelarr[index].FMS_CIRCLE).attr("isCircleEnable",availexCodelarr[index].WINGS_ENABLE).attr("validPin",availexCodelarr[index].VALID_PIN));
                        });
                    } else {
                        $('#zoneCode').val("");
                    }
                }, error: function (data) {
                    alert("Unable to fetch circles");
                }
    });
    ifPossible();
}

function loadWingsGrid() {
    gridDs = new kendo.data.DataSource({
        data: wingsGridData,
        pageSize: 5,
        batch: false,

        schema: {
            model: {
                id: "ProductID",
                fields: {
                    NAME: {
                        type: "string"
                    },
                    CAF_NO: {
                        type: "string"
                    },
                    MOBILE: {
                        type: "string"
                    },
                    REGISTER_DATE: {
                        type: "string"
                    },
                    STATUS: {
                        type: "string"
                    },
                    ActivationStatus: {
                        type: "string"
                    },
                    WINGSPIN: {
                        type: "string"
                    },
                    ACTION: {
                        type: "celleHtml"
                    }
                }
            }
        }
    });



    $("#wingsDataGrid").kendoGrid({
        dataSource: gridDs,
        sortable: true,
        reorderable: true,
        groupable: false,
        resizable: true,
        filterable: true,
        columnMenu: true,
        pageable: true,
        scrollable: true,
        noRecords: true,
        
        columns: [{
                field: "NAME",
                title: "Name",
                encoded: false,
                width: "20%"
            },
            {
                field: "CAF_NO",
                title: "CAF NO",
                width: "20%",
                attributes: {
                    style: 'white-space: nowrap '
                }
            },
            {
                field: "MOBILE",
                title: "Mobile",
                width: "20%"
            },
            {
                field: "CIRCLE_CODE",
                title: "CIRCLE",
                width: "20%"
            },
            {
                field: "REGISTER_DATE",
                title: "Register Date",
                width: "20%"
            },
            {
                field: "STATUS",
                title: "Payment Status",
                width: "20%"
            },
            {
                field: "ActivationStatus",
                title: "Activation Status",
                width: "20%"
            },
            {
                field: "WINGSPIN",
                title: "WINGS PIN",
                width: "20%"
            },
            {
                field: "ACTION",
                headerAttributes: {
                    style: "padding: 10px 30px;"
                },
                command: [
                    {
                        template: "<a id='performAction' class='view btn btn-sm btn-success mrg2L' onclick = 'performAction(this)' title='Click here for EKYC' data-toggle='modal'><i class='fa fa-file-text-o'></i></a>"
                    },
                    {
                         template: "<label id='ekycComlete' style='display:none' ><b>EKYC Completed</b> </label>"

                    },
                    {
                         template:"<a id='paymentReq' style='display:none' class='view btn btn-sm btn-warning mrg2L' onclick = 'processPayment(this)' title='pay' data-toggle='modal'><i class='fa fa-money'></i></a>" 

                    },
                    {
                         template:"<a id='reqISDIR' style='display:none' class='view btn btn-sm btn-info mrg2L' onclick = 'proReqFrISDIR(this)' title='ISDIR' data-toggle='modal'><i class='fa fa-globe'></i></a>" 

                    },
                    {
                         template:"<a id='viewReq' style='display:none' class='btn btn-sm btn-info mrg2L'  onclick='showInfo(this)' title='View' ><i class='fa fa-file-text-o'></i></a>" 

                    }
                ],
                title: 'Click  for EKYC',
                width: "20%"
            }
        ],
        dataBound: permit_gridDataBound,
    });
}

function permit_gridDataBound(arg) {

var grid=this;
    var gridRows = grid.tbody.find("tr");
    gridRows.each(function (e) {
        var model= grid.dataItem(this);
             if (model.OB_STATUS=='1') {
                  $(this).find("#performAction").hide();
                  $(this).find("#ekycComlete").show();
                  $(this).find("#reqISDIR").show();
                  $(this).find("#viewReq").hide();
        }
          
        if(model.OB_STATUS=='1' && model.STATUS !='Success'){
             $(this).find("#paymentReq").show();
             $(this).find("#reqISDIR").show();
             $(this).find("#ekycComlete").hide();
             $(this).find("#performAction").hide();
             $(this).find("#viewReq").hide();
        }
        if(model.isCircleEnable=='0'){
            $(this).find("#paymentReq").hide();
             $(this).find("#ekycComlete").hide();
             $(this).find("#performAction").hide(); 
             $(this).find("#reqISDIR").hide(); 
             $("#disable_circle_msg").show(); 
        }
    });


}

function clearScreen(val) {
    try {
        $('#filterTxt').val('');
        $('#log_email').val('');
        $('#log_pincode').val('');
        $('#enterotp').val('');
        $('#enterotp').hide();
        $('#wingsDataGrid').empty();
        if(val==1){
            genPinArr();
        }else{
        $('#zoneCode').val('0');}
        $('#verifyOtpphone').hide();
        $('#fetchData').show();
        $('#filterTxt').attr('disabled', false);
        $('#log_email').attr('disabled', false);
        $('#log_pincode').attr('disabled', false);
        $('#otpResend').hide();
    } catch (e) {

    }

}

function sendOTPRequest(type) {

    var reqData = {};
    reqData.inputType = type;
    
    var zone_code = $('#zoneCode').find("option:selected").val();
    var state_code = $('#zoneCode').find("option:selected").attr('stateCode');
    var regMobileNo = $('#filterTxt').val();
    var reqEmail = $('#log_email').val();
    var regPIN = $('#log_pincode').val();
    if(regPIN.trim()==''){
        alert(pinEmptylogpage);
        $('#log_pincode').focus();
        $('#log_pincode').val('');
        return false;
    }
   try{
    if (regMobileNo.length == 11) {
        regMobileNo = regMobileNo.substr(1);
    }
    
   }catch(e){}
    reqData.lobType = 'Wings';
    reqData.zone = zone_code;
    reqData.state = state_code;
    reqData.mobile_no = regMobileNo;
    reqData.email_id = reqEmail;
    if (type == 'internal') {
        if (zone_code == 0) {
            alert(alretStatesel);
            return false;
        }

        var mob_no = $('#filterTxt').val();
        if (mob_no != "") {
            var target = 'filterTxt'
            var regExp1 = /(^[6-9]{1})([0-9]{0,9})$/;
            var targetVal = $('#' + target).val();
            if (targetVal.length == 10) {
                if (!regExp1.test(targetVal)) {
                    $('#' + target).val('');
                    $('#' + target).focus();
                    alert(alretNumStrtWth);
                    return false;
                } else {


                }
            } else if (targetVal.length == 11) {
                var targetVal = $('#' + target).val();
                var zeroindx = targetVal.substr(0, 1);
                if (zeroindx === 0 || zeroindx === '0') {
                    var firstindx = targetVal.substr(1, 1);
                    if (firstindx === 6 || firstindx === '6' || firstindx === 7 || firstindx === '7' || firstindx === 8 || firstindx === '8' || firstindx === 9 || firstindx === '9') {
                    } else {
                        alert(alretNumsecDigit);
                        $('#' + target).val('');
                        $('#' + target).focus();
                        return false;
                    }
                } else {
                    alert(alret11Digit);
                    $('#' + target).val('');
                    $('#' + target).focus();
                    return false;
                }
            } else {
                alert(alretmobnoVal);
                $('#' + target).val('');
                $('#' + target).focus();
                return false;
            }
        } else {
            alert(alretmobnoempty);
            return false;
        }
        if(reqEmail.trim()==''){
        alert(alertemptyEmail);
        return false;
    }
    if(reqEmail !=''){
        var  regExp = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.([a-zA-Z]{2,4})+([a-zA-Z.]{0,4})$/;
        if (!regExp.test(reqEmail)) {
             alert("Email Address should be Valid");
            $('#log_email').focus();
            $('#log_email').val('');
            return false;
        }
    }

    } else {
        var uid = $('#inputAadharNum').val();
        var isCheckBoxChecked = $('#ch1').prop('checked');
        if (uid == "") {
            alert(alretAadharEntUID);
            return false;
        } else {
            reqData.UID = uid;
        }
        if (!isCheckBoxChecked) {
            alert(alretAadharDec);
            return false;
        }

    }

    $('#wait').show();
    $.ajax({
        url: "sendOTPRequest.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            var res = JSON.parse(JSON.stringify(data));
            if (res.response.success) {
                $('#wait').hide();
                if (type == 'internal') {
                    $('#enterotp').show();
                    $('#fetchData').hide();
                    $('#verifyOtpphone').show();
                    $('#filterTxt').attr('disabled', 'disabled');
                    $('#log_email').attr('disabled', 'disabled');
                    $('#log_pincode').attr('disabled', 'disabled');
                    $('#otpResend').show();
                    $('#resnbuttn').hide();
                    $('#m_timer').countdowntimer({
                        seconds: countDownTime,
                    });
                   setTimeout(function(){
                       $('#m_timer').text('');  
                       $('#otpResend').show(); 
                       $('#resnbuttn').show();}, countDownTime*1000);

                    
                } else {
                    otpResTxn = res.response.responseData.OtpRes_txn;
                    aadharSeqId = res.response.responseData.AADHAR_OTP_SEQ_ID;
                    $('#otpDiv').show();
                    $('#otpbtn').hide();
                    $('#verifyOtp').show();
                    $('#inputAadharNum').attr('disabled', 'disabled');
                    $('#otpDecl').hide();
                    $('#otpAuth1').show();
                    $('#otpAuth2').show();
                }
            } else {
                alert(res.response.message);
                $('#wait').hide();
                return false;
            }

        }, error: function (data) {
            alert( JSON.stringify(data));
            $('#wait').hide();
        }
    });
}

function verfyOTPAndSubmit(type) {

    var otp;
    var reqData = {};
    var zone_code = $('#zoneCode').find("option:selected").val();
    var state_code = $('#zoneCode').find("option:selected").attr('stateCode');
    var isCircleEnable = $('#zoneCode').find("option:selected").attr('isCircleEnable');
    var mobile = $('#filterTxt').val();
    var email_id = $('#log_email').val();
    var pin_code = $('#log_pincode').val();
   try{
    if (mobile.length == 11) {
        mobile = mobile.substr(1);
    }
   }catch(e){}
    zoneCode=zone_code
    stateCode=state_code
    isCircleEnbDis=isCircleEnable
    regMobNo=mobile
    reqData.lobType = 'wings';
    reqData.zone = zone_code;
    reqData.RegMobNum = mobile;
    reqData.state = state_code;
    reqData.mobile_no = mobile;
    reqData.inputType = type;
    reqData.isCircleEnable = isCircleEnable;
    reqData.regEmail = email_id;
    reqData.regPINCode = pin_code;
    if (type == 'internal') {
        var mob_no = $('#filterTxt').val();
        if (mob_no.length == 11) {
            mob_no = mob_no.substr(1);
        }
        reqData.mobile_number = mob_no;
        reqData.isCircleEnable = isCircleEnable;
        otp = $('#enterotp').val();
        if (zone_code == 0) {
            alert(alretStatesel);
            return false;
        }

    } else {
        var uid = $('#inputAadharNum').val();
        var isCheckBox1Checked = $('#ch2').prop('checked');
        var isCheckBox2Checked = $('#ch3').prop('checked');
        otp = $('#enteredotp').val();
        reqData.UID = uid;
        reqData.REQ_TYPE = "OTPKYC";
        reqData.AADHAR_NO = uid;
        if (!(isCheckBox1Checked && isCheckBox2Checked)) {
            alert(alretAadharDec);
            return false;
        }
    }
    if (otp == "") {
        alert(otpEmprt);
        return false;
    } else if (otp.length < 6) {
        alert(otpInvalid);
        return false;
    }

        $('#wait').show();
        reqData.TXN = otpResTxn;
        reqData.AADHAR_OTP_SEQ_ID = aadharSeqId;

        reqData.OTP = otp;
        $.ajax({
            url: "verfyOTPAndSubmit.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                var res = JSON.parse(JSON.stringify(data));
                if (res.response.success ) {
                    $('#wait').hide();
                    if (type == 'internal') {
                        if (res.response.responseData.Data.length > 0) {
//                        if (false) {
//                            $("#myModal").modal('show');
                            $("#main_class").hide();
                            $("#grid_class").show();
                            
                            $('#wingsDataGrid').empty();
                            wingsGridData = res.response.responseData.Data;
                            //loadWingsGrid();
                            loadCustInfoTabs();

                        } else {
                            var form = document.createElement("form");
                            var input = document.createElement("input");
                            input.setAttribute("type", "hidden");
                            input.setAttribute("name", "reqData");
                            input.setAttribute("id", "reqData");
                            input.setAttribute("value", encrypt(JSON.stringify(reqData)));
                            form.appendChild(input);
                            form.action = "newUserReister.do";
                            form.method = "POST";
                            document.body.appendChild(form);
                            form.submit();
                        }
                    } else {
                        var form = document.createElement("form");
                        var input = document.createElement("input");
                        input.setAttribute("name", "reqData");
                        input.setAttribute("id", "reqData");
                        input.setAttribute("value", encrypt(JSON.stringify(reqData)));
                        form.appendChild(input);
                        form.method = "post";
                        form.action = "FmsEkycCall.do";
                        document.body.appendChild(form);
                        form.submit();
                    }

                    $('#verifyOtpphone').hide();
                    $('#fetchData').show();
                    $('#filterTxt').attr('disabled', false);
                    $('#log_email').attr('disabled', false);
                    $('#log_pincode').attr('disabled', false);
                    $('#enterotp').val('');
                    $('#enterotp').hide();
                } else {
                    $('#wait').hide();
                    alert(res.response.message);
                    if (type != 'internal') {
                    $('#inputAadharNum').attr('disabled', false);
                    $('#inputAadharNum').val('');
                    $('#verifyOtp').hide();
                    $('#enteredotp').val('');
                    // $('#enteredotp').hide();
                    $('#otpDiv').hide();
                    $('#otpbtn').show();
                    $('#otpDecl').show();
                    $('#otpAuth1').hide();
                    $('#otpAuth2').hide();
                }
                }

            }, error: function (data) {
                $('#wait').hide();
                alert(JSON.stringify(data));

            }
        });
    
}


 
function loadWingsDataGrid() {
    var serchValue = $('#filterTxt').val();
    if (serchValue.length == 11) {
        serchValue = serchValue.substr(1);
    }
    var circleValue = $('#zoneCode').find("option:selected").attr('stateCode');
    var circleEnable = $('#zoneCode').find("option:selected").attr('isCircleEnable');
    var serchType = 'Phone';//$('input[name="check_addr"]:checked').val();
    if (serchValue != '') {

        try {
            var reqData = {};
            reqData.serchType = serchType;
            reqData.serchValue = serchValue;
            reqData.circleValue = circleValue;
            reqData.isCircleEnable = circleEnable;
            $.ajax({
                url: 'loadRegisteredUsers.do',
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (res) {
                    var res = JSON.parse(JSON.stringify(res));
                    try {
                        if (res.response.success) {
                           
                            if (res.response.responseData.Data.length > 0) {
//                              $("#myModal").modal('show');
//                              $('#wingsDataGrid').empty();
//                              wingsGridData = res.response.responseData.Data;
//                              loadWingsGrid();
                                $("#main_class").hide();
                                $("#grid_class").show();
                                wingsGridData = res.response.responseData.Data;
                                loadCustInfoTabs();

                            } else {
                                document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
                                document.regUsrFrm.method = "post";
                                document.regUsrFrm.action = "FMS_eKYC_otp.do";
                                document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
                                document.regUsrFrm.submit();
                            }
                        } else {
                            alert("Alert::" + res.response.message);
                        }
                    } catch (e) {
                        alert(e);
                    }

                }, error: function (data) {
                    alert("error print " + JSON.stringify(data));
                }
            });
        
    } catch (e) {
        alert(e);
    }

   }else{
       alert("Please Enter "+$('input[name="check_addr"]:checked').val()+" Number");
       return false;
   }
   


     
 }
 
 function newRegisterReq(){
    var reqData = {};
    reqData.zone = zoneCode;
    reqData.state = stateCode;
    reqData.isCircleEnable = isCircleEnbDis;
    reqData.RegMobNum = regMobNo;

    var form = document.createElement("form");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "reqData");
    input.setAttribute("id", "reqData");
    input.setAttribute("value", encrypt(JSON.stringify(reqData)));
    form.appendChild(input);
    form.action = "newUserReister.do";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();

    
     
 }
 
function processPayment(obj) {
    var reqData = {};
    var row = $(obj).closest("tr");
    var gridRowDate = $("#wingsDataGrid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    reqData.CAF_NO = rowdata.CAF_NO;
    reqData.STATUS = rowdata.STATUS;
    document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
    document.regUsrFrm.method = "post";
    document.regUsrFrm.action = "PayWingsAmt.do";
    document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
    document.regUsrFrm.submit();

}

function proReqFrISDIR(obj) {
    var reqData = {};
    var row = $(obj).closest("tr");
    var gridRowDate = $("#wingsDataGrid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    reqData.CAF_NO = rowdata.CAF_NO;
    reqData.STATUS = rowdata.STATUS;
    reqData.TYPE = "ISDIR";
    document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
    document.regUsrFrm.method = "post";
    document.regUsrFrm.action = "PayWingsAmt.do";
    document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
    document.regUsrFrm.submit();

}

function showCustDataFrISDIR() {
    if (custInfoISDIRReq != null) {
        var custPayReqDataobj = JSON.parse(custInfoISDIRReq);
        for (var prop in custPayReqDataobj) {
            if (!custPayReqDataobj.hasOwnProperty(prop))
                continue;
            $('#' + prop).text(custPayReqDataobj[prop]);
        }
    }
}

function submitISDIRReq() {

    var wngPayReqObj = JSON.parse(custInfoISDIRReq);
    var chkISD=$('#chkISD').is(':checked');
    var chkIR=$('#chkIR').is(':checked');
    if (wngPayReqObj.length != undefined || wngPayReqObj != "") {
        var reqData = {};
        reqData.CAF_NO = wngPayReqObj.CAF_NO;
        reqData.CUST_MOBILE_NO = wngPayReqObj.CUST_MOBILE_NO;
        reqData.CIRCLE_CODE = wngPayReqObj.CIRCLE_CODE;
        reqData.WL_CAF_NO = wngPayReqObj.WL_CAF_NO;
        reqData.AMOUNT = wngPayReqObj.PLAN_AMOUNT;
        reqData.PAY_STATUS = wngPayReqObj.PYMT_STATUS;
        reqData.WINGS_ISD = chkISD;
        reqData.WINGS_IR = chkIR;
        if(wngPayReqObj.PYMT_STATUS.toUpperCase()=='SUCCESS'){
        reqData.WINGS_ISD_PAID = wngPayReqObj.WINGS_ISD;
        reqData.WINGS_IR_PAID = wngPayReqObj.WINGS_IR;
        }
        
        $.ajax({
            url: 'paymentRequestForISDIR.do',
            type: 'POST',
            dataType: 'json',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {

                if (data.response.success) {
                    if ('S' == data.response.responseData.PYMT) {
                        window.location.href = data.response.responseData.PYMT_URL;
                    } else if('NR' == data.response.responseData.PYMT){
                        alert("Updated your information successfully");
                        setTimeout(function () {
                            window.location.href = 'Login.do';
                        }, 300);
                    }else {
                        alert(payIntFail);
                        setTimeout(function () {
                            window.location.href = 'Login.do';
                        }, 300);
                    }
                } else {
                    alert(data.response.message);
                }
            }, error: function (data) {
                alert(JSON.stringify(data));
                setTimeout(function () {
                    window.location.href = 'Login.do';
                }, 300);
            }
        });
    } else {
        alert(unableProcReq);
    }


}

function showInfo(obj){
    $('#divWingsmsg').modal('show');
}

function getCustInfoData(obj) {
    var target = obj.getAttribute('id');
    var id = target.split("-")[1];
    var custData = $("#wings_data_" + id).val();
    var ob_enable = $("#wings_data_" + id).attr('ob_enable');
    var ob_status = $("#wings_data_" + id).attr('ob_status');
    var wings_isd = $("#wings_data_" + id).attr('wings_isd');
    var wings_ir = $("#wings_data_" + id).attr('wings_ir');
    var pay_status = $("#wings_data_" + id).attr('pay_status');
    
    var reqData = {};
    if (ob_enable == '1') {
        if (ob_status == '0') {
            reqData.CAF_NO = custData;
            document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
            document.regUsrFrm.method = "post";
            document.regUsrFrm.action = "fetchCafDetails.do";
            document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
            document.regUsrFrm.submit();
        } else {
            if((wings_isd=='1' && wings_ir =='1' )&& pay_status.toUpperCase()=='SUCCESS'){alert(alretOnbStatus);}else{
            var reqData = {};
            var ob_caf = $("#wings_data_" + id).attr('ob_caf');
            if(ob_caf.trim() !=""){
            reqData.CAF_NO = ob_caf;
            reqData.TYPE = "ISDIR";
            document.regUsrFrm.reqData.value = encrypt(JSON.stringify(reqData));
            document.regUsrFrm.method = "post";
            document.regUsrFrm.action = "PayWingsAmt.do";
            document.regUsrFrm.reqData = encrypt(JSON.stringify(reqData));
            document.regUsrFrm.submit();
            }else{
                alert("Invalid Request");
            }
//            alert(alretOnbStatus);
        }
    }
    } else {
        alert(alretOnbEnable);
    }


}

function goToDKYCLL() {

//    alert(wngflowselection);
//    return false;
    var reqData = {};
    if (custLoginInfo != 'null') {
//        custLoginInfo = JSON.parse(custLoginInfo);
        reqData = custLoginInfo;
    }
    reqData.flow = "DKYCLL";
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "reqData");
    input.setAttribute("id", "reqData");
    input.setAttribute("value", encrypt(JSON.stringify(reqData)));
    form.appendChild(input);
    form.action = "processFlow.do";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();
//    $.ajax({
//        url: 'checkUserEntry.do',
//        type: 'POST',
//        async: false,
//        dataType: 'json',
//        data: {"reqData": encrypt(JSON.stringify(reqData))},
//        success: function (res) {
//            if (res.response.success) {
//                reqData.SDKYC_ID = res.response.responseData.SEQ_ID
//                reqData.FLOW_FLAG = 'N';
//                reqData.STD_CODE='';
//                if (res.response.responseData.STATES_INFO.STATUS == '2' || res.response.responseData.STATES_INFO.STATUS == '0') {
//                    if (res.response.responseData.STATES_INFO.STATUS == '2') {
//                        var confFlag = confirm(wngflowval);
//                        if (confFlag == false) {
//                            window.location.href = 'Login.do';
//                        }
//                        reqData.FLOW_FLAG = 'B';
//                    }
//                    reqData.STATES = res.response.responseData.STATES_INFO.STATES;
//                    reqData.STD_CODE = res.response.responseData.STATES_INFO.STD_CODE;
//                    // reqData.STD_CODE = '9900';
//                    var form = document.createElement("form");
//                    var input = document.createElement("input");
//                    input.setAttribute("type", "hidden");
//                    input.setAttribute("name", "reqData");
//                    input.setAttribute("id", "reqData");
//                    input.setAttribute("value", encrypt(JSON.stringify(reqData)));
//                    form.appendChild(input);
//                    form.action = "processFlow.do";
//                    form.method = "POST";
//                    document.body.appendChild(form);
//                    form.submit();
//                } else {
//                    alert(wngflowstatesempty);
//                    window.location.href = 'Login.do';
//                }
//
//
//            } else {
//                alert(res.response.message);
//            }
//
//        }, error: function (data) {
//            alert("error print " + JSON.stringify(data));
//        }
//    });

}

function goToAadharEkyc(){

     var reqData = {};
    reqData.flow = "AadharEkyc";
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "reqData");
    input.setAttribute("id", "reqData");
    input.setAttribute("value", encrypt(JSON.stringify(reqData)));
    form.appendChild(input);
    form.action = "FMS_eKYC_otp.do";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();

    
}

function goToDkyc(){
  
    var reqData =custLoginInfo;
    
    reqData.flow = "DigitalKYC";
   if(!checkRMNUsed()){ 
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "reqData");
    input.setAttribute("id", "reqData");
    input.setAttribute("value", encrypt(JSON.stringify(reqData)));
    form.appendChild(input);
    form.action = "processFlow.do";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit(); 
   }
    
}


function checkRMNUsed(){
    var boolean=false;
    typeof(custLoginInfo);
    var reqData=custLoginInfo;
            $.ajax({
                url: 'checkRMNStatus.do',
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (res) {
                    
                  if(res.response.success){
                      boolean=false;
                      
                  }else{
                      alert(res.response.message);
                       boolean=true;
                      
                  }

                }, error: function (data) {
                    alert("error print " + JSON.stringify(data));
                }
            });
    return  boolean;
}
var pinCodeArray=[];
function genPinArr(){
    var pinCodeStr = $('#zoneCode').find("option:selected").attr('validPin');
     var pinCodeArr = pinCodeStr.split(",");
     if(pinCodeArr !=""){
     pinCodeArray=[];
     pinCodeArray=pinCodeArr;
 }
}

function checkPinCodeValid(){
    if(pinCodeArray.length>0){
        var pin_code=$('#log_pincode').val().trim();
        if(pin_code.length == 2){
           if(!pinCodeArray.includes(pin_code)){
               alert(notValidPin);
               $('#log_pincode').val('');
           }
        }
    }else{alert(pinNotMapped);}
}