var numberReg = /^([6789])([0-9])+$/;
var frcDtlsarr = [];
var frcSelectionVal;
var agentDetails;
var mobileNumber = "";
var grid_mobile_no;
var connection = "";
var frcClickValstaus;
var connection = "";
function timeoutUploadForms() {
    uploadForms();
}
//function timeoutSavedForm() {
//        SavedFormsData();
//}
var uploadJobArray = []
function uploadForms() {

    parent.$("#wait").hide();
    var mobileNumber = $("#mobileNo_val").val();
    if (mobileNumber.length == 0) {
        mobileNumber = "";
    } else {
        if (mobileNumber.length >= 1 && mobileNumber.length < 10) {
            alert("Enter valid 10 digit mobile number");
            $("#mobileNo_val").val('');
            return  false;
        }
    }

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.mobileNumber = mobileNumber;

    $.ajax({
        url: "uploadedJobs.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        data: {
            "reqData": encrypt(JSON.stringify(reqData))
        },
        success: function (data) {
            sessionCheck(data);
            var resJson = JSON.parse(JSON.stringify(data));
            uploadJobArray = resJson.response.responseData;
        },
        error: function (data) {
            alert("error : uploadForms" + JSON.stringify(data));
        }

    });
    if (uploadJobArray === null) {
        $('#grid').hide();
        alert("GSM is not available in uploaded jobs");
        $("#mobileNo_val").val('');

    } else {
        $('#grid').show();
        parent.resizeFrameHeight('frameBody', document.documentElement.scrollHeight);
    }

    var uploadDataNextID = uploadJobArray.length + 1;
    function getIndexById(id) {
        var uploadJosArray_Len = uploadJobArray.length;
        for (var upload_Data = 0; upload_Data < uploadJosArray_Len; upload_Data++) {
            if (uploadJobArray[upload_Data].ProductID == id) {
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
                            GSM_NUMBER: {
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
                    field: "GSM_NUMBER",
                    title: "GSM Number",
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
                    width: 180,
                    template: '<span style="#= (STATUS_CODE === "2") ? "color: \\#FFA500;" : (STATUS_CODE === "1") ? "color: \\#5cb85c;" : (STATUS_CODE === "0") ? "color: \\#000000;" : "color: \\#FF0000;" #">#: JOB_STATUS#</span>'
                },
                {
                    headerAttributes: {
                        style: "padding: 10px 30px;"
                                //                        style: "padding: 10px 30px;"
                    },
                    command: [
                        {
                            //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' onclick='downloadReceipt(this)'><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a></div>"
                            //                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' ><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a></div>"
                            template: "<div class='action'><a href='javascript:void(0);' title='GenerateReceipt' onclick='printReceipt(this)'><i class='print_ic'></i></a>&nbsp;&nbsp;&nbsp;<a id='downloadBtn' href='javascript:void(0);' title='DownloadReceipt' ><i class='download_ic'></i></a> <a  id='grid_FRC_BTN_ID' href='javascript:void(0);' title='FRC' onclick='gridFRCFun(this)'><i class='recharg_ic'></i></a><a  id='grid_MNP_EDIT_ID' href='javascript:void(0);' title='EditMNP' onclick='loadMNPEdit()'><i class='mnp_ic'></i></a></div>"

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
                        var CAFTYPE = model.CAF_TYPE;
                        var reqData = {};
                        reqData.mobileNumber = model.GSM_NUMBER;
                        reqData.JOB_TYPE = model.JOB_TYPE;
                        reqData.CAF_NO = model.CAF_NO;
                        reqData.INSTANCE_ID = model.INSTANCE_ID;
                        reqData.type = "Download";
                        reqData.reqSessionId = parent.$("#reqSessionId").val();
                        $(this).find("#downloadBtn").attr('href', 'downloadPrintReceipt.do?reqData=' + encrypt(JSON.stringify(reqData)));

                        var FRCEnableStatus = $("#FRC_ENABLE").val();
                        //                    var FRCEnableStatus = "false";
                        //                        alert(CAF_TYPE + ":GSM_NUMBER::::" + model.GSM_NUMBER);
                        if (CAFTYPE === "SIM REPLACEMENT") {
                            $(this).find("#grid_FRC_BTN_ID").hide();
                        } else {
                            if (FRCEnableStatus === "TRUE" || FRCEnableStatus === "true") {
                                if (model.CONNECTION_TYPE === 'PREPAID') {
                                    $(this).find("#grid_FRC_BTN_ID").show();
                                } else if (model.CONNECTION_TYPE === 'POSTPAID') {
                                    $(this).find("#grid_FRC_BTN_ID").hide();
                                }
                                if (model.STATUS_CODE === '-1' || model.STATUS_CODE === '-2') {
                                    $(this).find("#grid_FRC_BTN_ID").hide();

                                }
                            } else {
                                $(this).find("#grid_FRC_BTN_ID").hide();
                            }
                        }

                        if (model.STATUS_CODE === '-2') {
                            $(this).find("#grid_MNP_EDIT_ID").show();
                        } else {
                            $(this).find("#grid_MNP_EDIT_ID").hide();
                        }


                    });
                } catch (e) {
                    alert(e)
                }
            }

        });
    });



}

var Caf_No = "";
//frc function for ekyc job upload
function frcClickFun() {
    parent.$("#divFRCMandate").modal('hide');
    mobileNumber = $('#mobileNo').text();
    connection = $('#conType').text();

    Caf_No = $('#caf').text();
    //    parent.$("#divFRC").modal('show');
    parent.$("#divFRC").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
    var ddlBundlePlan = $("#bp_plan_id").val();
    var IS_FRC_MAND_status = $("#IS_FRC_MANDATE").val();
    if (IS_FRC_MAND_status === "TRUE" || IS_FRC_MAND_status === "true" || frc_mand_spec_pln === "1") {
        parent.$("#closeBtn").hide();
        parent.$("#cancelBtn").hide();
    } else {
        parent.$("#closeBtn").show();
        parent.$("#cancelBtn").show();
    }

    loadFRCdeatils("2");

}


//frc function for job upload status
function gridFRCFun(obj) {

    try {
        var row = $(obj).closest("tr");

        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);

        grid_mobile_no = rowdata.GSM_NUMBER;
        Caf_No = rowdata.CAF_NO;

        connection = rowdata.CONNECTION_TYPE;

        //        newFormMem.setProperty("Connection", connection);
        //        newFormMem.setProperty("grid_FRC_CLICK", "1");
        //        parent.$("#divFRC").modal('show');
        parent.$("#divFRC").modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
        parent.$("#closeBtn").show();
        parent.$("#cancelBtn").show();
        loadFRCdeatils("1");
    } catch (e) {
        //        alert(JSON.stringify(e));
    }
}



function loadFRCdeatils(frcClickVal) {


    try {
        parent.$('#frcselectionID').val('');
        parent.$("#ctop_up_Num").val('');
        parent.$("#ctop_up_pin").val('');
        parent.$('#amount_lbl').text('');
        parent.$('#desc_lbl_li').text('');
        //        setTimeout(function () {


        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.connection = connection;
        reqData.grid_FRC_CLICK = frcClickVal;

        $.ajax({
            url: "loadfrcdetails.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            success: function (data) {
                sessionCheck(data);
                //                alert(JSON.stringify(data));
                agentDetails = data.response.responseData.agentDetails;
                frcDtls = data.response.responseData.loadFRCDetails;
            },
            error: function (data) {
                alert("error : uploadForms" + JSON.stringify(data));
            }

        });



        var frcDtlsJOBJ = {};

        frcDtlsJOBJ = frcDtls;
        if (frcDtlsJOBJ.STATUS === "0") {
            frcDtlsarr = frcDtlsJOBJ.DATA;
            parent.$('#frcselectionID').children().remove();
            parent.$('#frcselectionID').append('<option value="">Select from list</option>');
            $(frcDtlsarr).each(function (index) {
                parent.$('#frcselectionID').append(new Option(frcDtlsarr[index].FRC_NAME, frcDtlsarr[index].FRC_ID));
            });
        } else {
            alert(frcDtlsJOBJ.MESSAGE);
            return true;
        }
        frcClickValstaus = frcClickVal;
        //GSM number setting after  sucessful job upload through FRC in receipt2
        //            var frcClickVal =="2" //gsm NUMBER POPULATE IN FRC PAGE BASED ON FRC CLICK IN FINAL RECEIPT PAGE.1 FOR POPULATE

        if (frcClickVal === "2") {

            var objEformData = {};
            //            var strFormFields = newFormMem.getProperty('subs_details');
            //            objEformData = JSON.parse(strFormFields);
            //            utilsObj.writeLog("JS Log(frc.html):::objEformData :: " + JSON.stringify(objEformData));
            //            $('#mobile_number').val(objEformData.gsm_number);
            parent.$('#mobile_number').val(mobileNumber);


        } else {
            if (frcClickVal === "1") {//var frcClickVal =="1" //gsm NUMBER POPULATE IN FRC PAGE BASED ON FRC CLICK IN jobupload.1 FOR POPULATE
                //                utilsObj.writeLog("JS Log(frc.html):::::grid_mobile_no :: " + grid_mobile_no);
                parent.$('#mobile_number').val(grid_mobile_no);
            } else {
                parent.$('#mobile_number').val("");
            }
        }

        //loading ctop up number
        var cTopupnumberReg = /^[0-9]+$/;
        var username = agentDetails.Activation_MobileNo;
        var UserFlag = agentDetails.UserFlag;
        var AgentUserType = agentDetails.AgentUserType;

        //            if (cTopupnumberReg.test(username)) {
        parent.$("#ctop_up_Num").val(username);
        //            }
        if (UserFlag === '3' || (UserFlag === '5' && AgentUserType === "NORMAL")) {//aadhar flag is 1 i,e means it is with mobile or adhar number
            parent.$("#ctop_up_Num").attr("readonly", false);
        } else {
            parent.$("#ctop_up_Num").attr("readonly", "readonly");
        }

        //        }, 50);
    } catch (e) {
        //        alert("Exception in loadMenuContentinFRC :: " + e);
    }
}
function  frcselectionFun() {
    frcSelectionVal = parent.$('#frcselectionID').val();
    if (frcSelectionVal === "" || frcSelectionVal === null) {
        parent.$('#amount_lbl').text("");
        parent.$('#desc_lbl_li').text("");
    } else {
        $(frcDtlsarr).each(function (index) {
            if (frcSelectionVal === frcDtlsarr[index].FRC_ID) {
                parent.$('#amount_lbl').text(frcDtlsarr[index].FRC_AMT + "/-");
                parent.$('#desc_lbl_li').text(frcDtlsarr[index].FRC_DESC);
            }
        });
    }
}
function mobileNumValid(keyE) {
    try {
        var charV = keyE.key;
        if (charV == undefined) {
            charV = String.fromCharCode(keyE.charCode)
        }
        if (charV == 'Backspace' || charV == 'Tab') {
            return true;
        }
        var reg = /[0-9]$/;

        if (reg.test(charV)) {
            var mobile_no = parent.$('#mobile_number').val();
            if (mobile_no.length == 10) {
                if (charV === '7' || charV === '8' || charV === '9') {
                } else {
                    alert("Enter valid 10 digits mobile number");
                    parent.$('#mobile_number').val('');
                    parent.$('#mobile_number').focus();
                    return false;
                }
            }
            return true;
        }
        return false;


    } catch (e) {
        //alert("JS Log(frc.html):::: Exception in mobileNumValid ::: " + e);
    }
}

function frcCancel() {
    try {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        if (objEformData.JOB_TYPE === "KYC") {
            parent.$("#divFRC").modal('hide');
        } else {
            if (frc_mand_spec_pln === "0") {
                alert(frc_msg_spec_pln);
                parent.$("#divFRC").modal('hide');
                document.eKYC_receipt2.method = "post";
                document.eKYC_receipt2.action = "Dashboard.do";
                document.eKYC_receipt2.reqData.value = encrypt(JSON.stringify(reqData));
                document.eKYC_receipt2.submit();
            } else {
                parent.$("#divFRC").modal('hide');
            }
        }

    } catch (e) {
    }
}

function frcCancelFun() {
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();

    try {
        parent.$("#ctop_up_Num").val('');
        parent.$("#ctop_up_pin").val('');
        //        newFormMem.setProperty("FRC_CLICK", "0");
        //        newFormMem.setProperty("grid_FRC_CLICK", "0");
        parent.$("#divFRC").modal('hide');
        if (frcClickValstaus === '1') {
        } else {
            var KYCType = $("#KYCType").val();
            if (KYCType === "eKYC") {
                document.eKYC_receipt2.method = "post";
                document.eKYC_receipt2.action = "Dashboard.do";
                document.eKYC_receipt2.reqData.value = encrypt(JSON.stringify(reqData));
                document.eKYC_receipt2.submit();
            } else {
                document.kycReciept2.method = "post";
                document.kycReciept2.action = "Dashboard.do";
                document.kycReciept2.reqData.value = encrypt(JSON.stringify(reqData));
                document.kycReciept2.submit();
            }

        }
    } catch (e) {
        //        alert(" Exception in frcCancelFun :: " + e);
    }
}
function frcSubmitFun() {
    try {
        var cTopupPinReg = /^[0-9]+$/;
        var ctopUPNum = parent.$("#ctop_up_Num").val();
        var ctopUPPin = parent.$("#ctop_up_pin").val();
        var mobile_number = parent.$("#mobile_number").val();
        var amount = parent.$('#amount_lbl').text();
        var FRC_ID = parent.$('#frcselectionID').val();
        var FRC_NAME = parent.$('#frcselectionID option:selected').text();
        var FRC_AMT = amount.substring(0, amount.length - 2);
        var FRC_DESC = parent.$('#desc_lbl').text();
        if (FRC_ID === "" || FRC_ID === null) {
            alert("Please select FRC from list ");
            parent.$('#frcselectionID').focus();
            return false;
        }
        if (mobile_number.length < 10) {
            alert("Enter valid 10 digits mobile number");
            parent.$('#mobile_number').val('');
            parent.$('#mobile_number').focus();
            return false;
        } else {
            if (!numberReg.test(mobile_number)) {
                alert("It should be a valid mobile number which should start with 6,7,8,9");
                parent.$('#mobile_number').val('');
                parent.$('#mobile_number').focus();
                return false;
            }
        }

        if (ctopUPNum.length == '0' || ctopUPNum.length < 10) {
            alert("Enter valid 10 digits CTOPUP no.");
            parent.$("#ctop_up_Num").val('');
            parent.$("#ctop_up_Num").focus();
        } else {
            if (!numberReg.test(ctopUPNum)) {
                alert("It should be a valid CTOPUP number which should start with 6,7,8,9");
                parent.$('#ctop_up_Num').val('');
                parent.$('#ctop_up_Num').focus();
                if (!cTopupPinReg.test(ctopUPPin) && ctopUPPin.length > '0') {
                    parent.$('#ctop_up_pin').val('');
                }
                return false;
            }
            if (ctopUPPin.length == "0") {
                alert("Please enter  PIN/UPC/MPIN code.");
                parent.$("#ctop_up_pin").focus();
            } else {
                if (!cTopupPinReg.test(ctopUPPin)) {
                    alert("Enter valid PIN/UPC/MPIN code.");
                    parent.$('#ctop_up_pin').val('');
                    parent.$('#ctop_up_pin').focus();
                    return false;
                }
                //                    var frcData = JSON.parse(newFormMem.getProperty("FRC_Data"));
                var reqData = {};
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                reqData.mobile_number = mobile_number;
                reqData.FRC_ID = FRC_ID;
                reqData.FRC_NAME = FRC_NAME;
                reqData.FRC_AMT = FRC_AMT;
                reqData.ctopUPPin = ctopUPPin;
                reqData.ctopUPNum = ctopUPNum;
                reqData.connection = connection;
                reqData.Caf_No = Caf_No;

                //                var saveFRCTran = newFormMem.saveFRCTransaction(mobile_number, FRC_ID, FRC_NAME, FRC_AMT, ctopUPPin, ctopUPNum);

                var saveFRCTran;

                $.ajax({
                    url: "saveFRCTransaction.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    data: {
                        "reqData": encrypt(JSON.stringify(reqData))
                    },
                    success: function (data) {
                        sessionCheck(data);
                        var frcTransObj = JSON.parse(JSON.stringify(data));
                        saveFRCTran = frcTransObj.response.responseData;
                        var saveFRCTranJOBJ = {};
                        saveFRCTranJOBJ = saveFRCTran;
                        if (saveFRCTranJOBJ.STATUS === '0') {
                            alert(saveFRCTranJOBJ.MESSAGE);
                            parent.$("#divFRC").modal('hide');
                            if (frcClickValstaus === '1') {
                                $("#mobileNo_val").val('');
                                uploadForms();
                            } else {
                                var KYCType = $("#KYCType").val();
                                var reqData = {};
                                reqData.reqSessionId = parent.$("#reqSessionId").val();
                                var IS_FRC_MAND_status = $("#IS_FRC_MANDATE").val();
                                if (IS_FRC_MAND_status === "TRUE" || IS_FRC_MAND_status === "true") {
                                    $.ajax({
                                        url: "ekycReceipt2.do", //parameters go here in object literal form
                                        type: 'POST',
                                        async: false,
                                        dataType: 'json',
                                        data: {
                                            "reqData": encrypt(JSON.stringify(reqData))
                                        },
                                        success: function (data) {
                                            //                                            alert("success::::" + JSON.stringify(data))
                                        },
                                        error: function (data) {
                                            alert("error receiptSeqNumberRes, data :" + JSON.stringify(data));
                                        }

                                    });
                                } else {
                                    if (KYCType === "eKYC") {
                                        var ddlbundlePlan = $("#bp_plan_id").val();
                                        if (ddlbundlePlan > 0 || ddlbundlePlan > '0') {
                                            $.ajax({
                                                url: "ekycReceipt2.do", //parameters go here in object literal form
                                                type: 'POST',
                                                async: false,
                                                dataType: 'json',
                                                data: {
                                                    "reqData": encrypt(JSON.stringify(reqData))
                                                },
                                                success: function (data) {
                                                },
                                                error: function (data) {
                                                    alert("error receiptSeqNumberRes, data :" + JSON.stringify(data));
                                                }

                                            });
                                        } else {
                                            document.eKYC_receipt2.method = "post";
                                            document.eKYC_receipt2.action = "Dashboard.do";
                                            document.eKYC_receipt2.reqData.value = encrypt(JSON.stringify(reqData));
                                        }

                                    } else {
                                        document.kycReciept2.method = "post";
                                        document.kycReciept2.action = "Dashboard.do";
                                        document.kycReciept2.reqData.value = encrypt(JSON.stringify(reqData));
                                        document.kycReciept2.submit();
                                    }
                                }
                            }
                        } else {
                            parent.$("#divFRC").modal('hide');
                            if (frcClickValstaus === '1') {
                                //                                parent.$("#divFRC").modal('hide');
                                $("#mobileNo_val").val('');
                                uploadForms();
                            } else {
                                var KYCType = $("#KYCType").val();
                                if (KYCType === "eKYC") {
                                    document.eKYC_receipt2.method = "post";
                                    document.eKYC_receipt2.action = "Dashboard.do";
                                    document.eKYC_receipt2.reqData.value = encrypt(JSON.stringify(reqData));
                                    document.eKYC_receipt2.submit();
                                } else {
                                    document.kycReciept2.method = "post";
                                    document.kycReciept2.action = "Dashboard.do";
                                    document.kycReciept2.reqData.value = encrypt(JSON.stringify(reqData));
                                    document.kycReciept2.submit();
                                }
                            }
                            alert(saveFRCTranJOBJ.MESSAGE);
                        }
                    },
                    error: function (data) {
                        alert(data.response.responseData.MESSAGE);
                        //                        alert("error : uploadForms" + JSON.stringify(data));
                    }
                });
            }

        }



    } catch (e) {

        //        alert(" Exception in FRC submit click :: " + e);
    }
}
function ctopUpNumValid(keyE) {

    try {
        var charV = keyE.key;
        if (charV == undefined) {
            //alert('undefined');
            charV = String.fromCharCode(keyE.charCode);
        }
        if (charV == 'Backspace' || charV == 'Tab') {
            return true;
        }
        var reg = /[0-9]$/;

        if (reg.test(charV)) {
            var mobile_no = parent.$('#ctop_up_Num').val();
            if (mobile_no.length == 0) {
                if (charV === '7' || charV === '8' || charV === '9') {
                } else {
                    alert("CTOPUP should be valid number");
                    parent.$('#ctop_up_Num').val('');
                    parent.$('#ctop_up_Num').focus();
                    return false;
                }

            }

            return true;
        }
        return false;


    } catch (e) {
        //        alert("Exception in ctopUpNumValid ::: " + e);
    }
}
function cTopMpinValid(keyE) {

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
            return true;
        } else {
            parent.$('#ctop_up_pin').val('');
            parent.$('#ctop_up_pin').focus();
            alert("PIN/UPC/MPIN code  should be valid.");
            return false;
        }
        return false;


    } catch (e) {
        //        alert("JS Log(grid_reserved.js):::: Exception in cTopUpNumValid ::: " + e);
    }
}



function printReceipt(obj) {

    try {
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var mobileNumber = rowdata.GSM_NUMBER;
        var JOB_TYPE = rowdata.JOB_TYPE;
        var CAF_NO = rowdata.CAF_NO;
        var INSTANCE_ID = rowdata.INSTANCE_ID;


        //        var filePath = newFormMem.uploadPrintReceipt(mobileNumber, "Print");
        var filePath = "";
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.mobileNumber = mobileNumber;
        reqData.JOB_TYPE = JOB_TYPE;
        reqData.CAF_NO = CAF_NO;
        reqData.INSTANCE_ID = INSTANCE_ID;
        reqData.type = "Print";

        $.ajax({
            url: 'uploadPrintReceipt.do',
            type: 'POST',
            data: {
                "reqData": encrypt(JSON.stringify(reqData))
            },
            async: false,
            success: function (data) {
                sessionCheck(data);
                if (data.response.success) {
                    var url = "MenuItems/PrintReport.jsp";
                    window.open(url, 'PrintBill', 'status=no,height=580px,width=850px,scrollbars=yes');
                } else {
                    alert(data.response.message);
                }



                //                url += "?rid="+Math.random();
                //                var objFrm = document.frmAccDetails;
                //                var wind = 
                //                window.open(url, 'PrintBill', 'status=no,height=580px,width=850px,scrollbars=yes');
                //                childwindows[childwindows.length] = wind;
                //               // objFrm.ReqData.value = rdata;
                //                objFrm.action = url;
                //                objFrm.target = "PrintBill";
                //                objFrm.submit();



            },
            error: function (data) {
                //                alert("error print " + JSON.stringify(data));
            }
        });
    } catch (e) {
        //alert(e);
    }
}

function mobileSearch() {
    try {
        if ($("#mobileNo_val").val().length != 0) {
            var mobileNumber = $("#mobileNo_val").val();

            if (!numberReg.test(mobileNumber)) {
                alert("It should be a valid mobile number which should start with 6,7,8,9");
                $("#mobileNo_val").val("");
            } else {
                parent.$("#wait").show();
                uploadForms();
            }
        } else {
            parent.$("#wait").show();
            uploadForms();
        }

    } catch (e) {

    }
}


function SavedFormsData() {
    //    alert("SavedFormsData()");



    //        var SavedFiles= JSON.parse('[{"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}]');

    var storedJobArray = JSON.parse(eval(uploadedFormObj.savedForms()));
    //        alert("jsonarray in uplaodFromData::::::::"+SavedFiles);
    var storedDataNextID = storedJobArray.length + 1;

    $("#toal_Stored_jobs").text(" (" + storedJobArray.length + ")");

    function getIndexById(id) {
        var storedJobArray_len = storedJobArray.length;

        for (var stored_data = 0; stored_data < storedJobArray_len; stored_data++) {
            if (storedJobArray[stored_data].ProductID == id) {
                return stored_data;
            }
        }
        return null;
    }
    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(storedJobArray);
                    },
                    create: function (e) {
                        e.data.ProductID = storedDataNextID++;
                        storedJobArray.push(e.data);
                        e.success(e.data);
                    },
                    update: function (e) {
                        storedJobArray[getIndexById(e.data.ProductID)] = e.data;
                        e.success();
                    },
                    destroy: function (e) {
                        storedJobArray.splice(getIndexById(e.data.ProductID), 1);
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

                            MobileNumber: {
                                type: "string"
                            },
                            CAFNumber: {
                                type: "string"
                            },
                            CapturedDate: {
                                type: "string"
                            },
                            LastAttemptedDate: {
                                type: "string"
                            },
                            CapturedBy: {
                                type: "string"
                            },
                            AttemptedCount: {
                                type: "int"
                            },
                            UniqueKey: {
                                type: "int"
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
                    field: "MobileNumber",
                    title: "Mobile Number",
                    width: 200
                }, {
                    field: "CAFNumber",
                    title: "CAF Number",
                    width: 160
                }, {
                    field: "CapturedDate",
                    title: "Captured Date",
                    width: 190
                }, {
                    field: "LastAttemptedDate",
                    title: "Last Attempted Date",
                    width: 190
                }, {
                    field: "CapturedBy",
                    title: "Captured By",
                    width: 130
                }, {
                    field: "AttemptedCount",
                    title: "Attempted Count",
                    width: 190
                }, {
                    field: "UniqueKey",
                    title: "Unique Key",
                    width: 180
                },
                {
                    command: {
                        text: "Retry",
                        click: retryJob
                    },
                    title: "Action ",
                    width: 180
                }
            ]
        });
    });

}
function loadMNPEdit() {
    var reqData = {};
    reqData.root = "upload";
    $('#grid_MNP_EDIT_ID').attr('href', "Editmnp.do?reqData=" + encrypt(JSON.stringify(reqData)));
}
function displayMessage() {
    try {
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
    } catch (e) {

    }
}
/*
 function downloadReceipt(obj) {
 
 alert("downloadReceipt");
 var row = $(obj).closest("tr");
 var gridRowDate = $("#grid").data("kendoGrid");
 var rowdata = gridRowDate.dataItem(row);
 var mobileNumber = rowdata.GSM_NUMBER;
 //var mobileNumber = rowdata.CAF_NO;
 //    newFormMem.uploadPrintReceipt(mobileNumber, "Download");
 
 
 
 $.ajax({
 url: 'downloadPrintReceipt.do',
 type: 'POST',
 data: {
 "mobileNumber": mobileNumber,
 "type": "Download"
 },
 async: false,
 success: function (data) {
 sessionCheck(data);
 //            alert("downloadReceipt  succ  " + JSON.stringify(data));
 console.log(JSON.stringify(data));
 }, error: function (data) {
 //            alert("error : downloadReceipt zdf  " + JSON.stringify(data));
 }
 
 });
 
 
 
 
 var status = newFormMem.getProperty("downloadReceiptStatus");
 if (status == 'fail') {
 newFormMem.alert("Problem while download receipt");
 }
 }
 */