/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Metadataarr = [];
var finalFormdata = {};
var gsmNumber = "";
var availableplans = "";
var cymnValidateJOBJ = "";
var pairedMobileJSOn = {};
var availplansarr = [];
var objfinalFormdaobjta = {};
var ekycfinalFormdata = {};
var objFieldsData = {};
var connType = '';
var altRegExp = /^([6789])([0-9])+$/;
var numberReg = /^[0-9]+$/;
var typeCAFJOBJ = [];
var newFormMem = new Object();
var loginResponse = {};
var userFlag;
function altContact(numeric) {
    if (!altRegExp.test(numeric)) {
        return false;
    } else {
        return true;
    }


}

//date 
$("#poi_issue_date").datetimepicker({
    format: 'DD/MM/YYYY',
    maxDate: new Date()
});
$("#poa_issue_date").datetimepicker({
    format: 'DD/MM/YYYY',
    maxDate: new Date()
});

$('#otherServices').change(function () {
    var result = $('#otherServices').is(':checked');
    var val = $('#otherServices').val();


    if (result === true && val === 'Other') {
        $('#other_services_txt').show();
    } else {
        $('#other_services_txt').hide();
    }

});

//POA issuing date
$("#poa_issue_date").on('dp.change', function () {
    var dob = $('#dob').val();
    var poa_issuedate = $('#poa_issue_date').val();
    if (dob == 'DD/MM/YYYY') {
        $('#poa_issue_date').val('');
        alert("Enter Date of birth");

    } else {

        if (DateComparsionEkyc(dob, poa_issuedate)) {
            $("#poa_issue_date").val(poa_issuedate);
        } else {
            $('#poa_issue_date').val('');
            alert("Selected invalid date");

        }
    }
});
//POi issuing date
$("#poi_issue_date").on('dp.change', function () {
    var dob = $('#dob').val();
    var poi_issuedate = $('#poi_issue_date').val();
    if (dob == 'DD/MM/YYYY') {
        $('#poi_issue_date').val('');
        alert("Enter Date of birth");
    } else {

        if (DateComparsionEkyc(dob, poi_issuedate)) {
            $("#poi_issue_date").val(poi_issuedate);
        } else {
            $('#poi_issue_date').val('');
            alert("Selected invalid date");
        }
    }
    $("#poa_issue_date").val(poi_issuedate).attr('readonly', 'readonly');
});
//poaDateNotFound
$(document).on("change", "input[id='poiDateNotFnd']", function () {

    if ($(this).is(":checked")) {
        //'checked' event code
        $('#poi_issue_date').val('01/01/1900').attr('readonly', 'readonly');
        $('#poa_issue_date').val('01/01/1900');
        $('#poaDateNotFnd').prop('checked', true).attr('disabled', 'disabled');
    } else {
        $('#poi_issue_date').val('');
        $('#poa_issue_date').val('');
        $('#poaDateNotFnd').prop('checked', false);
        $('#poiDateNotFnd').prop('checked', false);
        $('#poi_issue_date').removeAttr('readonly');
    }
});
//$('#poaDateNotFnd').change(function () {
//    if ($(this).is(":checked")) {
//        //'checked' event code
//        $('#poa_issue_date').val('01/01/1900');
//
//    } else {
//        $('#poa_issue_date').val('');
//    }
//});
$("#poi_issue_place").on('change', function () {
    $("#poa_issue_place").val($("#poi_issue_place").val()).prop('readonly', true);

});
function billAddrFun(val) {
    if (val == '3') {
        $('#other_addr_text').show();
    } else {
        $('#other_addr_text').hide();
    }
}
//depsoit Amount
$("#deposit_amt").on('change', function () {

    var depositComboVal = $('#deposit').val();
    if (depositComboVal == '----Select from list----' || depositComboVal == '') {
        alert("Please select deposit");
        $('#deposit').val('');
        $('#deposit_amt').val('');
        $('#deposit').focus();
    } else {
        var depstAmountVal = $('#deposit_amt').val();
        if (depositComboVal == "1") {//deposit Amount
            //depstAmountVal
            if (!numberReg.test(depstAmountVal)) {
                alert("Please enter valid amount");
                $('#deposit_amt').val('');
                $('#deposit_amt').focus();
                return false;
            }
            var depAmtLen = depstAmountVal.length;
            if (depAmtLen > 5 || depAmtLen > "5" || parseInt(depAmtLen) > 5) {
                alert("Maximum length is 5");
                $('#deposit_amt').val('');
                $('#deposit_amt').focus();
                return false;
            }
        } else {//reason
            if (depstAmountVal.length > 150 || depstAmountVal.length > "150" || parseInt(depAmtLen) > 150 || numberReg.test(depstAmountVal)) {
                alert("Please enter valid reason");
                $('#deposit_amt').val('');
                $('#deposit_amt').focus();
                return false;
            }
        }
    }



});
$("#deposit").on('change', function () {
    var depstVal = $('#deposit').val();
    if (depstVal == '1') {
        $('#deposit_amt').attr('Placeholder', 'Enter Amount');
        $('#deposit_amt').val("");
        $('#deposit').focus();
        //        $("input[name=ADVRNT_ACTFEE_BILL][value=0]").prop("disabled", false);
    } else if (depstVal == '2') {
        $('#deposit_amt').attr('Placeholder', 'Enter Reason');
        $('#deposit_amt').val("");
        $('#deposit').focus();
        //        $("input[name=ADVRNT_ACTFEE_BILL][value=0]").prop("disabled", true);
    } else {
        $('#deposit_amt').attr('Placeholder', '');
    }
});
var paymentStatus = "1";
function validPaymentType() {
    paymentStatus = "1";
    var paymentType = $("#payment_type").val();
    try {
        $("#paymentType").val(paymentType);
        if (paymentType == 1 || paymentType == '')
        {
            paymentStatus = "0";
            $('#bankDetails').hide();
            // cafcommonFields =  $(cafcommonFields).not(postpaid_Fields).get();
        } else if (paymentType == 2) {
            paymentStatus = "0";
            //  cafcommonFields =  cafcommonFields.concat(postpaid_Fields);
            $('#bankDetails').show();
        } else {
            alert("Facility not available");
            $('#payment_type').val("");
            $('#bankDetails').hide();

            //            var depositamount = $('#deposit_amt').val();
            //            var bsnlno = $('#bsnl_telno').val();
            //            var tarifplan1 = $('#tariff_plan').val();
            //            var conType = newFormMem.getProperty("Connection");
            //
            //            if (conType == 2) {
            //
            //                if (tarifplan1.length !== 0) {
            //
            //                    if (depositamount.length !== 0) {
            //
            //                        if (depositamount != 0) {
            //
            //                            totalamount = calculateAmount();
            //
            //                            grandTotal = totalAmountToPay();
            //
            //                            grandTotal = grandTotal * 100;
            //                            orderId = 'bsnl' + Math.floor(Math.random() * (9999999 - 9000000) + 9000000);
            //                            if (grandTotal > 100) {
            //                                options = {
            //                                    "key": "rzp_live_hb1rvYfEkz95le",
            //                                    "amount": parseInt(grandTotal), // 2000 paise = INR 20
            //                                    "name": "BSNL",
            //                                    "description": "Your order id : " + orderId,
            ////                "receipt": orderId,
            ////                "order_id": "orderId",
            //                                    "image": "data:image/png;base64,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",
            //                                    "handler": function (response) {
            //
            //                                        if (response.razorpay_payment_id != null || response.razorpay_payment_id != '') {
            //                                            paymentStatus = "0";
            //                                            newFormMem.alert("Payment success");
            //                                            var id = response.razorpay_payment_id;
            //                                            newFormMem.setProperty("payment_id", id + "");
            //                                            newFormMem.setProperty("order_id", orderId + "");
            //                                        } else {
            //                                            paymentStatus = "1";
            //                                            newFormMem.alert("Payment failed");
            //                                        }
            //                                    },
            //                                    "prefill": {
            //                                        "name": "",
            //                                        "email": ""
            //                                    },
            //                                    "notes": {
            //                                        "address": "Hello World"
            //                                    },
            //                                    "theme": {
            //                                        "color": "#008cc7"
            //                                    },
            //                                    "modal": {
            //                                        "ondismiss": function () {
            //                                            var payment_id = newFormMem.getProperty("payment_id");
            //                                            if (payment_id != null && payment_id != '') {
            //                                            } else {
            //                                                $('#payment_type').val("");
            //                                                newFormMem.alert("Please select another payment");
            //                                            }
            //                                        }
            //                                    }
            //                                };
            //                            } else {
            //                                newFormMem.alert("Minimum Amount should be atleast 1 rupee!");
            //                            }
            //                        } else {
            //                            $('#payment_type').val("");
            //                            newFormMem.alert('Please Enter BSNL Number');
            //                        }
            //
            //                    } else {
            //                        $('#payment_type').val("");
            //                        newFormMem.alert('Please Enter Deposit Amount');
            //                    }
            //                } else {
            //                    $('#payment_type').val("");
            //                    newFormMem.alert('Please select the Tariffplan');
            //                }
            //            } else if (conType == 1) {
            //
            //                totalamount = calculateAmount();
            //                grandTotal = totalAmountToPay();
            //                grandTotal = grandTotal * 100;
            //                orderId = 'bsnl' + Math.floor(Math.random() * (9999999 - 9000000) + 9000000);
            //                if (grandTotal > 100) {
            //                    rzp1 = "";
            //                    options = {
            //                        "key": "rzp_live_hb1rvYfEkz95le",
            //                        "amount": parseInt(grandTotal), // 2000 paise = INR 20
            //                        "name": "BSNL",
            //                        "description": "Your order id : " + orderId,
            ////                "receipt": orderId,
            ////                "order_id": "orderId",
            //                        "image": "data:image/png;base64,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",
            //                        "handler": function (response) {
            //                            //alert(response.razorpay_payment_id);
            //                            if (response.razorpay_payment_id != null || response.razorpay_payment_id != '') {
            //                                paymentStatus = "0";
            //                                newFormMem.alert("Payment success");
            //                                var id = response.razorpay_payment_id;
            //                                newFormMem.setProperty("payment_id", id + "");
            //                                newFormMem.setProperty("order_id", orderId + "");
            //                            } else {
            //                                paymentStatus = "1";
            //                                newFormMem.alert("Payment failed");
            //                            }
            //                        },
            //                        "prefill": {
            //                            "name": "",
            //                            "email": ""
            //                        },
            //                        "notes": {
            //                            "address": "Hello World"
            //                        },
            //                        "theme": {
            //                            "color": "#008cc7"
            //                        },
            //                        "modal": {
            //                            "ondismiss": function () {
            //                                var payment_id = newFormMem.getProperty("payment_id");
            //                                if (payment_id != null && payment_id != '') {
            //                                } else {
            //                                    $('#payment_type').val("");
            //                                    newFormMem.alert("Please select another payment");
            //                                }
            //                            }
            //                        }
            //                    };
            //                } else {
            //                    newFormMem.alert("Minimum Amount should be atleast 1 rupee!");
            //                }
            //            }
            //            rzp1 = new Razorpay(options);
            ////                    alert(111);
            //            rzp1.open();
            //e.preventDefault();
        }
    } catch (e) {
        //newFormMem.alert(e);
    }

}
;

$('#deposit').on('change', function ( ) {

    var depositType = this.value;
    if (depositType == 1) {
        $('#deposit_amt').attr('Placeholder', 'Enter Amount');

    } else if (depositType == 2) {
        $('#deposit_amt').attr('Placeholder', 'Enter Reason');

    } else {
        $('#deposit_amt').attr('Placeholder', '');
    }

});

function loadCAFFields() {
    setTimeout(function () {
        loadUserName();
        // newFormMem.generateCaf(); PR
        loadFormFields()
    }, 1000);
}
function DateComparsionEkyc(dob, poi) {

    //    if (poi === '01-01-1900')
    //    {
    //        return true;
    //    }
    var dob_parts = dob.split("/");
    var poi_parts = poi.split("/");
    /*Year comparasion 
     *Dob year should be grater than seleted Issued year
     *
     *Dob month should not excced Issued month (if DOB month is 3rd month than we ara allowed 4th month onwords...),same as date
     *
     */
    if (dob_parts[2] > poi_parts[2]) {
        return false;//not allowed
    } else if (dob_parts[2] == poi_parts[2]) {
        if (dob_parts[1] < poi_parts[1]) {
            return true;// alowed

        } else if (dob_parts[1] == poi_parts[1]) {
            if (dob_parts[0] < poi_parts[0]) {
                return true;// alowed
            } else if (dob_parts[0] == poi_parts[0]) {
                return false;///not allowed
            } else {
                return false;//not allowed
            }

        } else {
            return false;///not allowed
        }
    } else {
        return true;//allowed
    }
}
function DateComparsionWithSever(selectedDate, server) {
    var selected_parts = selectedDate.split("/");
    var server_parts = server.split("/");

    if (server_parts[2] < selected_parts[2]) {//server year less than sys  not allowed
        return true;//not allowed
    } else if (server_parts[2] == selected_parts[2]) {
        if ((server_parts[1] > selected_parts[1])) {
            return false;//allow
        } else if (server_parts[1] == selected_parts[1]) {
            if (server_parts[0] < selected_parts[0]) {
                return true//allow
            } else if (server_parts[0] == selected_parts[0]) {
                return false//not allow
            } else {
                return false// not allow
            }
        } else {
            return false;//not allow
        }
    } else {
        return true;//allow
    }


}
function loadFormFields() {

    //    var formFieldsArray = newFormMem.formFieldsFrmFile("THICK_PRE_EKYC"); PR
    var formFieldsArray = [];
    var formArry = formFieldsArray.split("@@splidelimit@@");
    var htmlDIV = formArry[0];
    Metadataarr = formArry[1];

    document.getElementById("form_Design").innerHTML = htmlDIV;
    loadDefaultValues();
}

function loadDefaultValues() {
    //    newFormMem.setImage("aadhar_photo");PR
    //    newFormMem.setImage("Agent_aadhar_photo");

    //    /div_payment_details
    //    var conn_Type = newFormMem.getProperty('Connection');PR 
    var conn_Type = 1;

    //        newFormMem.alert(conn_Type+"::::conn_Type");
    $("#mblefrmBarCdBtn").on('click', function (val) {
        cam.load('barCodeKyc', 'pairedMobile');
    });
    //cym pin validation
    $("#cymn_mobile_pin").on('change', function (val) {
        var cymn_mobile_pin = $("#cymn_mobile_pin").val();
        if (cymn_mobile_pin.length < 4) {
            alert("Pin number minimum length should  be 4");
            $("#cymn_mobile_pin").val('');
            $("#cymn_mobile_pin").focus();
            return false;

        } else {

        }

    });
    //    present landmark as Permanenet landmark

    try {
        document.getElementById('caf_no_Div').style.display = 'none';
        if (conn_Type == "Individual_Prepaid") {

            $("#connection_type").val("1");
            document.getElementById('payment_type_Div').style.display = 'block';
            document.getElementById('bank_account_no_Div').style.display = 'none';
            document.getElementById('bank_name_Div').style.display = 'none';
            document.getElementById('bank_ifsc_code_Div').style.display = 'none';
            document.getElementById('branch_name_Div').style.display = 'none';
            document.getElementById('cheque_no_Div').style.display = 'none';
            document.getElementById('prev_optr_Div').style.display = 'none';
            document.getElementById('donor_circle_Div').style.display = 'none';
            document.getElementById('upc_code_Div').style.display = 'none';
            document.getElementById('upc_date_Div').style.display = 'none';

            document.getElementById('billing_address_type_Div').style.display = 'none';
            document.getElementById('deposit_amt_Div').style.display = 'none';
            document.getElementById('bsnl_telno_Div').style.display = 'none';
            document.getElementById('account_no_Div').style.display = 'none';

            $("#bank_account_no_Div").hide();
            $("#bank_name_Div").hide();
            $("#bank_ifsc_code_Div").hide();
            $("#branch_name_Div").hide();


            //document.getElementById('branch_Div').style.display='none';

            $("#cymn_paired_Div").show();
            $("#divMobileVerification").show();
            $("#divSIMinfo").hide();
        } else if (conn_Type == "Individual_Postpaid") {
            $("#connection_type").val("2");
            document.getElementById('payment_type_Div').style.display = 'block';
            document.getElementById('bank_account_no_Div').style.display = 'none';
            document.getElementById('bank_name_Div').style.display = 'none';
            document.getElementById('bank_ifsc_code_Div').style.display = 'none';
            document.getElementById('branch_name_Div').style.display = 'none';
            document.getElementById('cheque_no_Div').style.display = 'none';
            document.getElementById('prev_optr_Div').style.display = 'none';
            document.getElementById('donor_circle_Div').style.display = 'none';
            document.getElementById('upc_code_Div').style.display = 'none';
            document.getElementById('upc_date_Div').style.display = 'none';
            //document.getElementById('branch_Div').style.display='block';

            document.getElementById('billing_address_type_Div').style.display = 'block';
            document.getElementById('deposit_amt_Div').style.display = 'block';
            document.getElementById('bsnl_telno_Div').style.display = 'block';
            document.getElementById('account_no_Div').style.display = 'none';

            $("#cymn_paired_Div").show();
            $("#divMobileVerification").show();
            $("#divSIMinfo").hide();
        } else if (conn_Type == "MNP_Prepaid") {
            $("#connection_type").val("1");
            document.getElementById('payment_type_Div').style.display = 'block';
            document.getElementById('bank_account_no_Div').style.display = 'none';
            document.getElementById('bank_name_Div').style.display = 'none';
            document.getElementById('bank_ifsc_code_Div').style.display = 'none';
            document.getElementById('cheque_no_Div').style.display = 'none';
            document.getElementById('prev_optr_Div').style.display = 'block';
            document.getElementById('donor_circle_Div').style.display = 'block';
            document.getElementById('upc_code_Div').style.display = 'block';
            document.getElementById('upc_date_Div').style.display = 'block';

            document.getElementById('billing_address_type_Div').style.display = 'none';
            document.getElementById('deposit_amt_Div').style.display = 'none';
            document.getElementById('bsnl_telno_Div').style.display = 'none';
            document.getElementById('account_no_Div').style.display = 'none';


            $("#bank_account_no_Div").hide();
            $("#bank_name_Div").hide();
            $("#bank_ifsc_code_Div").hide();
            $("#branch_name_Div").hide();

            $("#cymn_paired_Div").hide();
            $("#divMobileVerification").hide();
            $("#divSIMinfo").show();
            $("#branch_name_Div").hide();

            document.getElementById("gsm_number").readOnly = false;

        } else if (conn_Type == "MNP_Postpaid") {
            $("#connection_type").val("2");
            document.getElementById('payment_type_Div').style.display = 'block';
            document.getElementById('bank_account_no_Div').style.display = 'none';
            document.getElementById('bank_name_Div').style.display = 'none';
            document.getElementById('bank_ifsc_code_Div').style.display = 'none';
            document.getElementById('cheque_no_Div').style.display = 'none';
            document.getElementById('prev_optr_Div').style.display = 'block';
            document.getElementById('donor_circle_Div').style.display = 'block';
            document.getElementById('upc_code_Div').style.display = 'block';
            document.getElementById('upc_date_Div').style.display = 'block';

            document.getElementById('billing_address_type_Div').style.display = 'block';
            document.getElementById('deposit_amt_Div').style.display = 'block';
            document.getElementById('bsnl_telno_Div').style.display = 'block';
            document.getElementById('account_no_Div').style.display = 'none';


            $("#cymn_paired_Div").hide();
            $("#divMobileVerification").hide();
            $("#divSIMinfo").show();
            $("#branch_name_DIv").hide();

            document.getElementById("gsm_number").readOnly = false;
        } else if (conn_Type == "MIG_Pre_To_Post") {
            $("#connection_type").val("2");

            $("#cymn_paired_Div").hide();

            $("#divMobileVerification").hide();

            $("#divSIMinfo").hide();

            $("#divMIG").show();
            $("#branch_name_Div").hide();
            document.getElementById('payment_type_Div').style.display = 'block';

            document.getElementById('bank_account_no_Div').style.display = 'none';

            document.getElementById('bank_name_Div').style.display = 'none';

            document.getElementById('bank_ifsc_code_Div').style.display = 'none';

            document.getElementById('cheque_no_Div').style.display = 'none';

            document.getElementById('prev_optr_Div').style.display = 'none';

            document.getElementById('donor_circle_Div').style.display = ' none';

            document.getElementById('upc_code_Div').style.display = 'none';

            document.getElementById('upc_date_Div').style.display = 'none';

            document.getElementById('billing_address_type_Div').style.display = 'block';
            //            newFormMem.alert("1");
            document.getElementById('deposit_amt_Div').style.display = 'block';
            //            newFormMem.alert("2");
            document.getElementById('bsnl_telno_Div').style.display = 'block';
            //            newFormMem.alert("3");//
            document.getElementById('account_no_Div').style.display = 'none';
            //            newFormMem.alert("4");



            document.getElementById("gsm_number").readOnly = true;
        } else if (conn_Type == "MIG_Post_To_Pre") {
            $("#connection_type").val("1");
            $("#cymn_paired_Div").hide();
            $("#divMobileVerification").hide();
            $("#divSIMinfo").hide();
            $("#divMIG").show();
            $("#branch_name_Div").hide();
            document.getElementById('payment_type_Div').style.display = 'block';
            document.getElementById('bank_account_no_Div').style.display = 'none';
            document.getElementById('bank_name_Div').style.display = 'none';
            document.getElementById('bank_ifsc_code_Div').style.display = 'none';
            document.getElementById('cheque_no_Div').style.display = 'none';
            document.getElementById('prev_optr_Div').style.display = 'none';
            document.getElementById('donor_circle_Div').style.display = 'none';
            document.getElementById('upc_code_Div').style.display = 'none';
            document.getElementById('upc_date_Div').style.display = 'none';


            document.getElementById('billing_address_type_Div').style.display = 'none';
            document.getElementById('deposit_amt_Div').style.display = 'none';
            document.getElementById('bsnl_telno_Div').style.display = 'none';
            document.getElementById('account_no_Div').style.display = 'block';



            document.getElementById("gsm_number").readOnly = true;

        }

        //for multi select functionality.
        $('#services').multiselect({
            columns: 1,
            placeholder: 'Select from list'
        });

        $("#poi_issue_date").datetimepicker({
            format: 'DD-MM-YYYY',
            showTodayButton: true,
            maxDate: new Date()
        });
        $("#poa_issue_date").datetimepicker({
            format: 'DD-MM-YYYY',
            showTodayButton: true,
            maxDate: new Date()
        });
        var today = new Date();
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        $("#upc_date").datetimepicker({
            format: 'DD/MM/YYYY',
            minDate: tomorrow
        });
        //        $('#upc_date').val('DD-MM-YYYY');
    } catch (e) {
        //         newFormMem.alert(e);

    }
    try {

        $("#pos_name_Div").hide();
        $("#pos_code").val(loginResponse.UserCode);
        $("#pos_hno_Div").hide();
        $("#pos_street_Div").hide();
        $("#pos_locality_Div").hide();
        $("#pos_city_Div").hide();
        $("#pos_state_Div").hide();
        $("#pos_pincode_Div").hide();
    } catch (u)
    {

    }

    //Agent information
    //    try{
    //        
    //        var objagentAdharRes ={};   
    //        var stragentAdharRes =newFormMem.getJSONProperty('AgentAadharResponse'); 
    //         
    //        objagentAdharRes =JSON.parse(stragentAdharRes);   
    //       
    //        var agentAadharNo=objagentAdharRes.Aadhar_Id;
    //       
    //       
    //        var Agentname=objagentAdharRes.Poi_Name;
    //        if(Agentname.length>0){
    //            
    //            $("#pos_name").val(Agentname);
    //        }else{
    //          
    //            $("#pos_name").val('');
    //        }
    //       
    //        var Agent_Gen=objagentAdharRes.Poi_Gender;
    //      
    //        var age = getAge(objagentAdharRes.Poi_Dob);
    //        //        $("#Agent_dob").text(age);  
    //      
    //        var Agent_Email=objagentAdharRes.Poa_email;
    //       
    //       
    //        var Agent_Fname=objagentAdharRes.Poa_co;
    //      
    //       
    //        var Agent_hno=objagentAdharRes.Poa_house;
    //        if(Agent_hno.length>0){
    //            //            $("#Agent_hno").text(Agent_hno);  
    //            $("#pos_hno").val(Agent_hno);
    //        }else{
    //            //            $("#Agent_hno").text('--'); 
    //            $("#pos_hno").val('');
    //        }
    //        
    //        var Agent_landmark=objagentAdharRes.Poa_landmark;
    //
    //        var Agent_street=objagentAdharRes.Poa_street;
    //        if(Agent_street.length>0){
    //            $("#pos_street").val(Agent_street);
    //        }else{
    //            $("#pos_street").val('');
    //        }
    //
    //        var Agent_city=objagentAdharRes.Poa_dist;
    //        if(Agent_city.length>0){
    //            $("#pos_city").val(Agent_city);
    //        }else{
    //            $("#pos_city").val('');
    //        }
    //        
    //        var Agent_state=objagentAdharRes.Poa_state;
    //        if(Agent_state.length>0){
    //            $("#pos_state").val(Agent_state);
    //        }else{
    //            $("#pos_state").val('');
    //        }
    //        
    //        var Agent_Pincode=objagentAdharRes.Poa_pc;
    //        if(Agent_Pincode.length>0){
    //            $("#pos_pincode").val(Agent_Pincode);
    //        }else{
    //            $("#pos_pincode").val('');
    //        }
    //        $("#pos_locality").val(objagentAdharRes.Poa_lc);
    //   
    //    //     'Agent_hno' 
    //    //         'Agent_landmark' 
    //    //	 'Agent_street' 
    //    //	   'Agent_city' 
    //    //	      'Agent_Pincode'
    //    }catch (e1){
    //    //        newFormMem.alert("Exception:::"+e1);
    //    } 




    //    $("#poi_issuing_auth").val('Z00005');  
    $("#poi_issuing_auth").val('23');
    //    $("#poa_issuing_auth").val('Z00005');
    $("#poa_issuing_auth").val('23');


    //    $("#poi_issuing_auth").val('Z00005');  
    //    $("#poa_issuing_auth").val('Z00005');
    $("#customer_type").val("0001");

    $("#nationality").val("IN");


    var aadharJSON = {};


    //        var aadharDetails = {
    //            TA:'  ',
    //            Response:'  ',
    //            Aadhar_Id:'331669967078',
    //            e_Kyc_Code:'189adc46c39142f699ca3043e669616f',
    //            e_Kyc_Description:'Authenticated Successfully',
    //            e_Kyc_RRN:'625018277715',
    //            e_Kyc_status:'y',
    //            e_Kyc:'    ',
    //            Poi_Dob:'10-08-1991',
    //            Poi_Gender:'M',
    //            Poi_Name:'Yarnagula Jyothi Swaroopeswar',
    //            Poi_Phone:'',
    //            Poa_co:'',
    //            Poa_dist:'Srikakulam',
    //            Poa_email:'',
    //            Poa_house:'9-2-35',
    //            Poa_landmark:'kazipet',
    //            Poa_lc:'Laxmi Nagar',
    //            Poa_pc:'532185',
    //            Poa_po:'',
    //            Poa_state:'Andhra Pradesh',
    //            Poa_street:'Laxmi Nagar',
    //            Poa_subdist:'',
    //            Poa_uidtag:'',
    //            Poa_vtc:'Amadalavalasa',
    //            Ldata_Name:'',
    //            Ldata_co:'',
    //            Ldata_dist:'',
    //            Ldata_house:'',
    //            Ldata_landmark:'',
    //            Ldata_lang:'',
    //            Ldata_lc:'',
    //            Ldata_luidtag:'',
    //            Ldata_pc:'0',
    //            Ldata_po:'',
    //            Ldata_state:'',
    //            Ldata_street:'',
    //            Ldata_subdist:'',
    //            Ldata_vtc:'',
    //            Photo:'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'
    //        };
    //     
    //        aadharJSON = aadharDetails;
    //    objagentAdharRes =aadharDetails;  
    //    var aadharDetails = newFormMem.getJSONProperty('AadharResponse'); PR
    var aadharDetails = {};
    aadharJSON = JSON.parse(aadharDetails);

    $("#aadhar_no").val(aadharJSON.UidData_uid);
    //    $("#aadhar_no").val(aadharJSON.Aadhar_Id);  
    //    newFormMem.alert(aadharJSON.Poi_Dob);
    var formatedDate = getDataFormat(aadharJSON.Poi_dob);
    //    var formatedDate =getDataFormat(aadharJSON.Poi_Dob);

    $("#dob").text(formatedDate);
    $("#dob").css("color", "#AEF805");
    //    $("#dob").text(aadharJSON.Poi_Dob);
    var age = getAge(aadharJSON.Poi_dob);
    //    var age = getAge(aadharJSON.Poi_Dob);

    //Age Calculation

    if (age > 10) {
        $("#cust_age").text(age);
        $("#cust_age").css("color", "#AEF805");
    } else {
        alert("Age should be more than 10 years");
        $('#dob').val("DD-MM-YYYY");
        $('#cust_age').val("");
    }


    //    if(aadharJSON.Poi_Gender == "M"){
    if (aadharJSON.Poi_gender == "M") {
        $("#gender").val("2");//Male

    } else {
        $("#gender").val("1");//FeMale
    }
    //POA issuing date
    $("#poa_issue_date").on('dp.change', function () {
        var dob = $('#dob').text();
        var poa_issuedate = $('#poa_issue_date').val();
        if (dob == 'DD-MM-YYYY') {
            $('#poa_issue_date').val('');
            alert("Enter Date of birth");

        } else {

            if (DateComparsionEkyc(dob, poa_issuedate)) {
                $("#poa_issue_date").val(poa_issuedate);
            } else {
                $('#poa_issue_date').val('');
                alert("Selected invalid date");

            }
        }
    });
    //POi issuing date
    $("#poi_issue_date").on('dp.change', function () {
        var dob = $('#dob').text();
        var poi_issuedate = $('#poi_issue_date').val();
        if (dob == 'DD-MM-YYYY') {
            $('#poi_issue_date').val('');
            alert("Enter Date of birth");
        } else {

            if (DateComparsionEkyc(dob, poi_issuedate)) {
                $("#poi_issue_date").val(poi_issuedate);
            } else {
                $('#poi_issue_date').val('');
                alert("Selected invalid date");
            }
        }
    });


    try {
        var FatherName = aadharJSON.Poa_co;
        //        var FatherName=aadharJSON.Poa_co;
        if (FatherName.length > 0) {
            //            var Father=newFormMem.validateFathername(FatherName);
            $("#f_h_name").val(FatherName).attr('disabled', 'disabled');
        }


    } catch (f) {

    }


    $("#first_name").text(aadharJSON.Poi_name);
    //    $("#first_name").text(aadharJSON.Poi_Name);
    $("#first_name").css("color", newFormMem.getI18Message("FontColour"));
    $("#alt_cont_no").val(aadharJSON.Poi_phone);
    //    $("#alt_cont_no").val(aadharJSON.Poi_Phone);

    $("#loc_addr_city").val(aadharJSON.Poa_dist);
    //    $("#loc_addr_city").val(aadharJSON.Poa_dist);

    $("#perm_addr_city").val(aadharJSON.Poa_dist);
    //    $("#perm_addr_city").val(aadharJSON.Poa_dist);  

    $("#email").val(aadharJSON.Poi_email);
    //    $("#email").val(aadharJSON.Poa_email);
    $("#email").css("color", "#AEF805");


    if (aadharJSON.Poi_email == '') {
        //    if(aadharJSON.Poa_email==''){


    } else {
        $("#email").val(aadharJSON.Poi_email);
        //        $("#email").val(aadharJSON.Poa_email);

    }
    //    newFormMem.alert("8");
    $("#loc_addr_hno").val(aadharJSON.Poa_house);
    //    $("#loc_addr_hno").val(aadharJSON.Poa_house); 
    $("#perm_addr_hno").val(aadharJSON.Poa_house);
    //    $("#perm_addr_hno").val(aadharJSON.Poa_house);

    $("#loc_addr_street").val(aadharJSON.Poa_street);
    //    $("#loc_addr_street").val(aadharJSON.Poa_street); 
    $("#perm_addr_street").val(aadharJSON.Poa_street);
    //    $("#perm_addr_street").val(aadharJSON.Poa_street);  
    $("#loc_addr_locality").val(aadharJSON.Poa_loc);
    //    $("#loc_addr_locality").val(aadharJSON.Poa_lc);

    $("#perm_addr_locality").val(aadharJSON.Poa_loc);
    //    $("#perm_addr_locality").val(aadharJSON.Poa_lc); 
    $("#loc_addr_landmark").val(aadharJSON.Poa_lm);
    //    $("#loc_addr_landmark").val(aadharJSON.Poa_landmark); 
    $("#loc_addr_landmark").css("color", "#AEF805");

    $("#loc_addr_landmark").on('change', function (val) {
        var loc_addr_landmark = $("#loc_addr_landmark").val();
        $("#perm_addr_landmark").val(loc_addr_landmark);


    });
    //    if(aadharJSON.Poa_landmark==''){
    if (aadharJSON.Poa_lm == '') {


    } else {
        $("#loc_addr_landmark").val(aadharJSON.Poa_lm).attr('readonly', 'readonly');
        //        $("#loc_addr_landmark").val(aadharJSON.Poa_landmark).attr('readonly','readonly');

        $("#perm_addr_landmark").val(aadharJSON.Poa_lm);
        //        $("#perm_addr_landmark").val(aadharJSON.Poa_landmark);
    }

    $("#loc_addr_pin").val(aadharJSON.Poa_pc);
    //    $("#loc_addr_pin").val(aadharJSON.Poa_pc); 
    $("#perm_addr_pin").val(aadharJSON.Poa_pc);
    //    $("#perm_addr_pin").val(aadharJSON.Poa_pc); 
    $("#loc_addr_state").val(aadharJSON.Poa_state);
    //    $("#loc_addr_state").val(aadharJSON.Poa_state);   
    $("#perm_addr_state").val(aadharJSON.Poa_state);
    //    $("#perm_addr_state").val(aadharJSON.Poa_state); 
    $("#poi_type").val("23");
    //    $("#poi_type").val("Z00005");  
    $("#poi_number").val(aadharJSON.UidData_uid);

    var poi_number = aadharJSON.UidData_uid;
    //    $("#poi_number").val(aadharJSON.Aadhar_Id); 

    $("#poa_type").val("23");
    //    $("#poa_type").val("Z00005");   
    $("#poa_number").val(aadharJSON.UidData_uid);
    //    $("#poa_number").val(aadharJSON.Aadhar_Id);

    $("#poa_issue_date").val('DD-MM-YYYY')
    //    $("#poi_issue_date").val('DD-MM-YYYY')

    $('#payment_type').on('change', function () {
        var payment_type = $("#payment_type").val();
        var payment_type_text = $("option:selected", "#payment_type").text();
        if (payment_type == '1' || payment_type == '') {
            $("#bank_account_no_Div").hide();
            $("#bank_name_Div").hide();
            $("#bank_ifsc_code_Div").hide();
            $("#branch_name_Div").hide();
            $("#cheque_no_Div").hide();
        } else {
            $("#bank_account_no_Div").show();
            $("#bank_name_Div").show();
            $("#bank_ifsc_code_Div").show();
            $("#branch_name_Div").show();
            $("#cheque_no_Div").show();
        }
    });
    //upc Date validation not to allow less than server date
    $("#upc_date").on('dp.change', function () {
        var selectedDate = $("#upc_date").val();
        //        var serverDate = newFormMem.getProperty('Date'); PR
        var convert_server_Date = convertPrevFormat(serverDate);
        var noofDays = DateDiff(selectedDate, '/');

        if (noofDays <= 15 && noofDays > 0) {

            if (DateComparsionWithSever(selectedDate, convert_server_Date)) {
                $("#upc_date").val(selectedDate);
            } else {
                $('#upc_date').val('');
                alert("Selected invalid date");
            }
        } else {
            $('#upc_date').val('');
            alert("selected upc date should be within 15 days");
        }

    });
    //
    if (conn_Type == "MNP_Prepaid" || conn_Type == "MNP_Postpaid") {
        $('#remarks').children().remove();
        $('#remarks').append('<option id="">Select from list</option>');
        $('#remarks').append('<option  value="MNP">MNP</option>');
    } else if (conn_Type == "MIG_Pre_To_Post" || conn_Type == "MIG_Post_To_Pre") {
        $('#remarks').children().remove();
        $('#remarks').append('<option id="">Select from list</option>');
        $('#remarks').append('<option  value="PRE TO POST">PRE TO POST</option>');
        $('#remarks').append('<option  value="POST TO PRE">POST TO PRE</option>');
    }

    $('#remarks').on('change', function () {
        var typeOfCaf = $("#remarks").val();
        if (typeOfCaf == "CDMA") {
            //sim_number_lbl
            $("#sim_number_lbl").text("RUIM Number");

        } else {
            $("#sim_number_lbl").text("SIM Number");
        }
        //        newFormMem.alert(typeOfCaf+":::::typeOfCaf:::");
        //        availableplans = newFormMem.getavailableplans(typeOfCaf); PR

        var availableplanJOBJ = {};
        availableplanJOBJ = JSON.parse(availableplans);

        if (availableplanJOBJ.STATUS === "0") {
            availplansarr = availableplanJOBJ.PLANS;
            $('#plan_code').children().remove();
            $('#plan_code').append('<option id="">Select from list</option>');
            $(availplansarr).each(function (index) {
                $('#plan_code').append(new Option(availplansarr[index].PLAN_NAME, availplansarr[index].PLAN_CODE));
            }
            );
        }

    });


    setMetaDataForValidation(JSON.parse(Metadataarr));
    prePopulateDta();
}

function getAge(birth) {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    var pieces = birth.split('-');
    var birth_date = pieces[0];
    var birth_month = pieces[1];
    var birth_year = pieces[2];

    if (curr_month == birth_month && curr_date >= birth_date)
        return parseInt(curr_year - birth_year);
    if (curr_month == birth_month && curr_date < birth_date)
        return parseInt(curr_year - birth_year - 1);
    if (curr_month > birth_month)
        return parseInt(curr_year - birth_year);
    if (curr_month < birth_month)
        return parseInt(curr_year - birth_year - 1);
}


//function subsNxtBtnFun() {
//
//    var connType = $("#connection_type").val();
//    var subscribeType = $("#customer_type").val();
//    var MetadataArray = [];
//    MetadataArray = JSON.parse(Metadataarr);
//    var fieldID;
//    var Fieldvalue;
//    var mandatry = "";
//    var sim_number = $("#sim_number").val();
//    var mobile_number = $("#gsm_number").val();
//    var category = $("#location_type").val();
//    var plan_applied = $("#plan_code").val();
//    var imsi = $("#imsi").val();
//    var services = $("#services").val();
////    var conn_TypefrMNP = newFormMem.getProperty('Connection'); PR
//
//    if (connType == "2") {
//
//        var payment_details = $("#payment_type").val();
//        //        newFormMem.alert(payment_details);
//        //        var bank_account_number = $("#bank_account_no").val();
//        //        var bank_name = $("#bank_name").val();
//        //        var ifsc_code = $("#bank_ifsc_code").val();
//        //        var branch = $("#bank_branch").val();
//
//        //        /payment_details
//        //        if(payment_details=="0"||payment_details=="0"){
//        //            newFormMem.alert("Please select Payment details");
//        //            return true;        
//        //        }
//
//        //        if(bank_account_number==""){
//        //            newFormMem.alert("Please enter bank account number");
//        //            return true;        
//        //        }
//
//        //        if(bank_name==""){
//        //            newFormMem.alert("Please enter bank name");
//        //            return true;        
//        //        }
//
//        //        if(ifsc_code==""){
//        //            newFormMem.alert("Please enter ifsc code");
//        //            return true;        
//        //        }
//        //        
//        //        if(branch==""){
//        //            newFormMem.alert("Please enter branch");
//        //            return true;        
//        //        }
//        finalFormdata["payment_type"] = payment_details;
//        //        finalFormdata["bank_account_no"] =  bank_account_number;
//        //        finalFormdata["bank_name"] =  bank_name;
//        //        finalFormdata["bank_ifsc_code"] =  ifsc_code;
//        //        finalFormdata["bank_branch"] =  branch;
//    }
//
//    var connType = $("#connection_type").val();
//    var subscribeType = $("#customer_type").val();
//    var MetadataArray = {};
//    MetadataArray = JSON.parse(Metadataarr);
//    var Fieldvalue;
//    var mandatry = "";
//    for (var key in MetadataArray) {
//        var idvlmetaDataObj = MetadataArray[key]
//        mandatry = idvlmetaDataObj.MANDATORY;
//        var fieldType = idvlmetaDataObj.TYPE;
//        var fieldname = idvlmetaDataObj.DISPLAY_NAME;
//        var fieldID = key;
//        if (document.getElementById(key)) {
//            if (fieldType != "LB") {
//                Fieldvalue = document.getElementById(key).value;
//            } else {
//                Fieldvalue = $("#" + key).text();
//            }
//            if (fieldType == 'DT') {
//                //                newFormMem.alert("key::::::"+key);
//                if (document.getElementById(key).value == "DD-MM-YYYY" || document.getElementById(key).value == "YYYY-MM-DD") {
//                    Fieldvalue = "";
//                } else {
//                    Fieldvalue = convretDate(document.getElementById(key).value);
//                }
//            }
//            try {
//                if (fieldID == 'dob') {
//                    var dob = $('#dob').text();
//                    Fieldvalue = convertPrevFormat(dob);
//
//                }
//            } catch (e) {
//
//            }
//
//
//            var payment_type = $('#payment_type').val();
//            if (conn_TypefrMNP == "MNP_Prepaid" || conn_TypefrMNP == "MNP_Postpaid") {
//                if (conn_TypefrMNP == "MNP_Prepaid" && (fieldID == "caf_no" || fieldID == "billing_address_type" || fieldID == "deposit_amt" || fieldID == "bsnl_telno")) {
//                    //deposit_amt bsnl_telno
//                } else if (fieldID == "caf_no" || fieldID == "bank_branch_no" || ((fieldID == "branch_name" || fieldID == "bank_ifsc_code" || fieldID == "bank_account_no" || fieldID == "bank_name" || fieldID == "cheque_no")) && payment_type != '2') {
//                    //                      bank_branch_no   bank_account_no
//                } else {
//
//                    if ((Fieldvalue == "" || Fieldvalue == 'Select from list') && mandatry == 'Y')
//                    {
//                        alert(fieldname + "must not be empty.");
//                        document.getElementById(key).focus();
//                        return false;
//                    }
//
//                    if (fieldID == 'prev_optr') {
//                        var optrVal = $('#prev_optr').val();
//                        finalFormdata["donar_optr_code"] = optrVal.split("@!@")[0];
//                        //                fieldID = "donar_optr_id";
//                        Fieldvalue = optrVal;
//                        finalFormdata["donar_optr_id"] = optrVal.split("@!@")[1];
//                    }
//                    if (fieldID == 'donor_circle') {
//                        var circleVal = $('#donor_circle').val();
//                        finalFormdata["donar_circle_code"] = circleVal.split("@!@")[0];
//                        //                fieldID = "donar_circle_id";
//                        Fieldvalue = circleVal;
//                        finalFormdata["donar_circle_id"] = circleVal.split("@!@")[1];
//                    }
//                }
//                //
//            } else {
//
//                if ((conn_TypefrMNP == "Individual_Prepaid" || conn_TypefrMNP == "MIG_Post_To_Pre") && (fieldID == "caf_no" || fieldID == "billing_address_type" || fieldID == "deposit_amt" || fieldID == "bsnl_telno")) {
//
//                } else if (fieldID == "caf_no" || fieldID == "prev_optr" || fieldID == "donor_circle" || fieldID == "upc_date" || fieldID == "upc_code" || fieldID == "bank_branch_no" || ((fieldID == "branch_name" || fieldID == "bank_ifsc_code" || fieldID == "bank_account_no" || fieldID == "bank_name" || fieldID == "cheque_no")) && payment_type != '2') {//upc_code
//
//                } else if (fieldID == "deposit_amt") {
//                    if ((Fieldvalue == "" || Fieldvalue == 'Select from list') && mandatry == 'Y')
//                    {
//                        newFormMem.alert(fieldname + newFormMem.getI18Message("common.formfields.validation"))
//                        document.getElementById(key).focus();
//                        return false;
//                    }
//                } else {
//                    if ((Fieldvalue == "" || Fieldvalue == 'Select from list') && mandatry == 'Y')
//                    {
//                        newFormMem.alert(fieldname + newFormMem.getI18Message("common.formfields.validation"))
//                        document.getElementById(key).focus();
//                        return false;
//                    }
//                }
//            }
//            if (conn_TypefrMNP == "Individual_Postpaid" || conn_TypefrMNP == "MNP_Postpaid" || conn_TypefrMNP == "MIG_Pre_To_Post") {
//                if (fieldID == 'billing_address_type') {
//                    var billingAddressVal = $('#billing_address_type').val();
//                    var loc_addr_hno = $('#loc_addr_hno').val();
//                    var loc_addr_street = $('#loc_addr_street').val();
//                    var loc_addr_locality = $('#loc_addr_locality').val();
//                    var loc_addr_state = $('#loc_addr_state').val();
//                    var loc_addr_district = $('#loc_addr_district').val();
//                    var loc_addr_city = $('#loc_addr_city').val();
//                    var loc_addr_pin = $('#loc_addr_pin').val();
//                    var perm_addr_hno = $('#perm_addr_hno').val();
//                    var perm_addr_street = $('#perm_addr_street').val();
//                    var perm_addr_locality = $('#perm_addr_locality').val();
//                    var perm_addr_state = $('#perm_addr_state').val();
//                    var perm_addr_district = $('#perm_addr_district').val();
//                    var perm_addr_city = $('#perm_addr_city').val();
//                    var perm_addr_pin = $('#perm_addr_pin').val();
//                    if (billingAddressVal == "1") {
//
//
//                        billingAddressVal = perm_addr_hno + "," + perm_addr_street + "," + perm_addr_locality + "," + perm_addr_state + ","
//                                + perm_addr_city + "," + perm_addr_pin
//                    } else {
//                        billingAddressVal = loc_addr_hno + "," + loc_addr_street + "," + loc_addr_locality + "," + loc_addr_state + ","
//                                + loc_addr_city + "," + loc_addr_pin
//                    }
//                    finalFormdata["billing_address"] = billingAddressVal;
//                }
//            }
//            if (conn_TypefrMNP == "Individual_Postpaid" || conn_TypefrMNP == "MIG_Pre_To_Post" || conn_TypefrMNP == "MNP_Postpaid") {
//                if (fieldID == 'deposit_amt') {
//                    var deposit_amount = document.getElementById('deposit_amt').value;
//                    if (deposit_amount == '0' || deposit_amount == '') {
//                        var bsnlnumber = document.getElementById('bsnl_telno').value;
//                        if (bsnlnumber == '' || bsnlnumber == null) {
//                            //                                newFormMem.alert(fieldname + " " +"is not ::::::::::::::Empty");
//                            newFormMem.alert("BSNL Number is Mandatory");
//                            document.getElementById('bsnl_telno').focus();
//                            return false;
//                        }
//                    } else {
//                        Fieldvalue = document.getElementById('deposit_amt').value;
//
//                    }
//
//                }
//            }
//            if (fieldType == 'DD') {
//                //for multi select values retrieval
//                if (fieldID == 'services') {
//                    var Fieldtext = '';
//                    var valueFields = '';
//                    var hexvalues = [];
//                    var labelvalues = [];
//                    //var Fieldtext =$('#' + fieldID ).val();
//                    $('#services :selected').each(function (i, selectedElement) {
//                        hexvalues[i] = $(selectedElement).val();
//                        labelvalues[i] = $(selectedElement).text();
//                    });
//                    for (var idx = 0; idx < hexvalues.length; idx++) {
//                        if (idx == 0) {
//                            valueFields = hexvalues[0];
//                            Fieldtext = labelvalues[0];
//                        } else {
//                            valueFields = valueFields + "," + hexvalues[idx];
//                            Fieldtext = Fieldtext + "," + labelvalues[idx];
//                        }
//                    }
//                    Fieldvalue = valueFields;
//                    finalFormdata[fieldID + "_ecaf"] = Fieldtext;
//                } else {
//                    //if not multi select
//                    var Fieldtext = $('#' + fieldID + ' option:selected').text();
//                    if (Fieldtext == "Select from list") {
//                        finalFormdata[fieldID + "_ecaf"] = "";
//                    } else {
//                        finalFormdata[fieldID + "_ecaf"] = Fieldtext;
//                    }
//
//                }
//
//
//            }
//
//            finalFormdata[key] = Fieldvalue;
//        }
//    }
//    finalFormdata['remarks'] = $('#remarks').val();
//    newFormMem.setProperty("remarks", $('#remarks').val());
//    try {
//
//        finalFormdata.totalamount = calculateAmount();
//    } catch (e) {
//        //            newFormMem.alert(e);
//    }
//
//    newFormMem.preRequisitesForUpload();
//    finalFormdata = JSON.stringify(finalFormdata);
//    newFormMem.setProperty('subs_details', finalFormdata);
//    newFormMem.preRequisitesForUpload();
//
//    //    window.location.href="declaration.html";
//    try {
//        $('#AgentDec').modal('show');
//
//    } catch (w) {
//        //    newFormMem.alert(w);
//    }
//}

function hideAgentDeclarationDiv() {
    try {
        parent.$('#AgentDec').modal('hide');
    } catch (w) {
        //    newFormMem.alert(w);
    }
}

function calculateAmount()
{
    //    newFormMem.alert("Amount details");
    var cafType = objFieldsData.remarks_ecaf;
    var connectionType = objFieldsData.connection_type;
    var totVal = 0;
    var advanceRent = 0;
    var numcost = 0;
    var servicetax = 0;
    var ttlsimandnumbamt = 0;
    var activationCharges = 0;
    var depositAmt = 0;
    var Charges = 0;
    var planamt = 0;

    try {
        if (cafType == "CDMA") {
            var pairedMobileAmount = $("#pairedMobileJSOn").val();
            var obj = JSON.parse(pairedMobileAmount);
            totVal = obj.TOTALVALUE;
            advanceRent = obj.ADVANCERENT;
            servicetax = obj.SERVICETAX;
        } else if ((cafType == 'CAF Entry Mobile' || cafType == "Vendor CAF" || cafType == "Dealer CAF") && connectionType == '1') {
            var pairedMobileAmount = $("#pairedMobileJSOn").val();
            var obj = JSON.parse(pairedMobileAmount);

            totVal = obj.TOTALVALUE;
            advanceRent = obj.ADVANCERENT;
            servicetax = obj.SERVICETAX;
        } else if ((cafType == 'CAF Entry Mobile' || cafType == "Vendor CAF" || cafType == "Dealer CAF") && connectionType == '2') {
            totVal = getAmount();
            advanceRent = getAdvAmount();
            servicetax = getServiceTax();
        } else
        {
            totVal = getAmount();
            advanceRent = getAdvAmount();
            servicetax = getServiceTax();
        }

        planamt = getplanAmount();

        var totalamount = parseFloat(totVal) + parseFloat(planamt);

        if (cafType == 'CYMN' || cafType == 'Fancy' || cafType == 'Auction') {
            //            numcost = newFormMem.getProperty('TOTAL_AMT'); PR
            numcost = objFieldsData.TOTAL_AMT;
            //            alert(numcost + ":::: numcost");

            ttlsimandnumbamt = parseFloat(totalamount) + parseFloat(numcost);

        } else {
            numcost = 0;
            ttlsimandnumbamt = totalamount;
        }
        $("#SIM_COSTVal").val(advanceRent + "");
        $("#Service_Tax").val(servicetax + "");
        $("#amount").val(totVal + "");

        // For PostPaid Amount including
        //        //utilsObj.writeLog('::::::::::::::: Connection Type calculateAmount method' + objFieldsData.connection_type);
        if (objFieldsData.connection_type == 2) {
            //depsoit amount
            //            //utilsObj.writeLog('::::::::::::::: ekycfinalFormdata.deposit calculateAmount method' + ekycfinalFormdata.deposit);
            if (ekycfinalFormdata.deposit == "2") {//NO
                depositAmt = 0;
            } else {//yes
                if (ekycfinalFormdata.deposit_amt.length > 0) {
                    //utilsObj.writeLog(':::::::::::::::ttlsimandnumbamt value in calculateAmount  method\t' + ttlsimandnumbamt);
                    depositAmt = parseFloat(ekycfinalFormdata.deposit_amt);
                } else {
                    depositAmt = 0;
                }
            }
            //activation charges
            try {
                //active_charge
                //                var typeCAFArr = $("#tariff_plann_PostPaid").val();
                //                var typeCAFJOBJ = $.parseJSON(typeCAFArr);
                var selectTarrif = ekycfinalFormdata.tariff_plan;
                for (var i = 0; i < typeCAFJOBJ.length; i++) {
                    if (selectTarrif == typeCAFJOBJ[i].DD_CODE) {
                        planamt = typeCAFJOBJ[i].PLANCHARGE;//Plan cost is fetched from postpaid-Copr_plans 
                        Charges = typeCAFJOBJ[i].ACTIVATION_CHARGES;
                        activationCharges = parseFloat(Charges);
                    }
                }
            } catch (e) {
                //                //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in activation charges block ' + e);
            }
            // act charges and Deposit amount including
            if (ekycfinalFormdata.ADVRNT_ACTFEE_BILL == 1) {
                $("#ACTIVATION_CHARGES").val("0");
                $("#Plan_AmountVal").val("0");
                planamt = 0;
                activationCharges = 0;
            } else {
                $("#ACTIVATION_CHARGES").val(activationCharges);
                $("#Plan_AmountVal").val(planamt);
            }
            ttlsimandnumbamt = parseFloat(totVal) + parseFloat(planamt) + parseFloat(activationCharges) + parseFloat(depositAmt) + parseFloat(numcost);
            //            //utilsObj.writeLog(':::::::::::::::ttlsimandnumbamt value in calculateAmount  method\t' + ttlsimandnumbamt);
        } else {
            $("#Plan_AmountVal").val(planamt);//Prepaid plan cost PR
        }

    } catch (e) {
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::Exception in calculateAmount in ekyc method\t' + e);
        //        newFormMem.alert(e);
    }
    return  ttlsimandnumbamt;
}
function getAmount() {
    var simAmount = 0;

    try {
        var simNumber = objFieldsData.simNumber;
        var cymnValidateAmount = $("#cymnValidateJOBJ").val();
        var amountObj = JSON.parse(cymnValidateAmount);
        $.each(amountObj, function (i, obj) {

            if (obj.SIM_NO === simNumber)
            {
                simAmount = obj.TOTALVALUE;

            }
        });
    } catch (e)
    {
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in calculateAmount  block ' + e);
        //        newFormMem.alert(e);
    }
    return simAmount;
//    cymnValidateJOBJ=[];
}
function getServiceTax() {
    var ServiceTax = 0;

    try {
        var simNumber = objFieldsData.simNumber;
        var cymnValidateAmount = $("#cymnValidateJOBJ").val();
        var simServObj = JSON.parse(cymnValidateAmount);
        $.each(simServObj, function (i, obj) {

            if (obj.SIM_NO === simNumber)
            {
                ServiceTax = obj.SERVICETAX;

            }
        });
    } catch (e)
    {
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in getServiceTax  block ' + e);
        //        newFormMem.alert(e);
    }
    return ServiceTax;
//    cymnValidateJOBJ=[];
}

function getplanAmount() {
    var planAmount = 0;

    try {
        var plan = objFieldsData.plan_code;
        var planList = $("#plansjObj").val();
        var planObj = $.parseJSON(planList);
        $.each(planObj, function (i, obj) {
            if (obj.PLAN_CODE === plan)
            {
                planAmount = obj.PLANCHARGE;
                $("#TALKVALUE").val(obj.TALKVALUE);
                $("#VALIDITY").val(obj.VALIDITY);
                $("#GRACEPERIOD").val(obj.GRACEPERIOD);
                $("#RETAIN").val(obj.RETAIN);
                $("#FOOTNOTEREMARKS").val(obj.FOOTNOTEREMARKS);


            }
        });

    } catch (e)
    {
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in getplanAmount  block ' + e);
    }

    return planAmount;
}
//advance Rent
function getAdvAmount() {
    var advAmount = 0;

    try {

        //        var cymnValidateAmount = newFormMem.getProperty("cymnValidateJOBJ"); PR
        var simobj = JSON.parse(cymnValidateAmount);
        $.each(simobj, function (i, obj) {
            if (obj.SIM_NO === objFieldsData.sim_number)
            {
                advAmount = obj.ADVANCERENT;


            }
        });

    } catch (e)
    {
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in getAdvAmount  block ' + e);
    }
    return advAmount;

}
function prePopulateDta() {
    //    var pageStatus = newFormMem.getProperty('pageStatus');PR
    //    newFormMem.alert(pageStatus);
    if (pageStatus == "0") {
        //        newFormMem.getCountries();PR

    } else {

        try {
            //            var remarks = newFormMem.getProperty('remarks'); PR
            $('#remarks').val(remarks);
            //            var availableplans = newFormMem.getavailableplans(remarks); PR
            var availableplanJOBJ = {};
            availableplanJOBJ = JSON.parse(availableplans);
            if (availableplanJOBJ.STATUS === "0") {
                var availplansarr = availableplanJOBJ.PLANS;
                $('#plan_code').children().remove();
                $('#plan_code').append('<option id="">Select from list</option>');
                $(availplansarr).each(function (index) {
                    $('#plan_code').append(new Option(availplansarr[index].PLAN_NAME, availplansarr[index].PLAN_CODE));
                }
                );
            }

            var MetadataArray = {};
            MetadataArray = JSON.parse(Metadataarr);
            //            var formData = newFormMem.getProperty('subs_details'); PR
            var json = JSON.parse(formData);
            for (var key in MetadataArray) {
                var idvlmetaDataObj = MetadataArray[key];
                var fieldType = idvlmetaDataObj.TYPE;

                if (document.getElementById(key)) {
                    if (fieldType != "LB") {

                        document.getElementById(key).value = json[key];


                        //for back multi select combo
                        if (key == 'services') {
                            $('#services').multiselect('setSelectedValue', json[key]);
                        }

                        if (fieldType == "DT") {


                            var convertedDate = convertPrevFormat(json[key]);

                            document.getElementById(key).value = convertedDate;
                        }
                    } else
                    {
                        $("#" + key).text(json[key]);
                    }
                }
            }
        } catch (exp)
        {
            //            //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in prePopulateDta  block ' + e);
        }
        var payment_type = $("#payment_type").val();
        //        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::payment_type is ' + payment_type);
        var payment_type_text = $("option:selected", "#payment_type").text();
        if (payment_type == '1') {
            $("#bank_account_no_Div").hide();
            $("#bank_name_Div").hide();
            $("#bank_ifsc_code_Div").hide();
            $("#branch_name_Div").hide();
            $("#cheque_no_Div").hide();
        } else {
            $("#bank_account_no_Div").show();
            $("#bank_name_Div").show();
            $("#bank_ifsc_code_Div").show();
            $("#branch_name_Div").show();
            $("#cheque_no_Div").show();
        }

    }
}

function goBackBtn() {
    //    newFormMem.setProperty('pageStatus', "1"); PR
    window.location.href = "subscriber_details.html";
}

function newFormNxtBtn() {
    var authentication = Aadhar_Authentication.checkImageStatus();
    if (authentication == true) {
        window.location.href = "subscriber_details.html";
    } else {
        alert("Aadhar Authentication required");

        window.location.href = "newform.html";
    }

}

function mobileValidate(event) {
    var target = event.getAttribute('id');
    if (target == "cymn_mobile_no") {
        var val1 = $('#' + target).val();
        var mobileNoStatus = numeric(val1);
        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
    //MIGMobile
    if (target == "MIGMobile") {
        var val1 = $('#' + target).val();
        var mobileNoStatus = numeric(val1);
        if (mobileNoStatus == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == "cymn_mobile_pin") {
        var val1 = $('#' + target).val();
        var cymn_mobile_pin = alphanumericsVal(val1);
        if (cymn_mobile_pin == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }

    if (target == "simNumber" || target == 'pairedMobile') {
        var val1 = $('#' + target).val();
        var simNumber = numeric(val1);
        if (simNumber == true) {
        } else {
            $('#' + target).val("");
            $('#' + target).focus();
        }
    }
//simNumber

}

function cymnValidate() {
    var simRadioType = $("input[name=simRadio]:checked").val();
    var cymn_mobile_no = $("#cymn_mobile_no").val();
    var cymn_mobile_pin = $("#cymn_mobile_pin").val();
    if (cymn_mobile_no == "") {
        alert("Please Enter Mobile number");

        return true;
    }
    if (cymn_mobile_pin == "") {
        alert("Please enter pin");

        return true;
    }
    //    newFormMem.alert(gsmSeleType+"::::gsmSeleType");
    //    var cymnValidateRes = newFormMem.cymnValidate(cymn_mobile_pin, cymn_mobile_no, gsmSeleType); PR
    var cymnValidateJSOn = JSON.parse(cymnValidateRes);
    if (cymnValidateJSOn.STATUS == "0") {
        //TOTAL_AMT 
        //        newFormMem.alert(cymnValidateJSOn.TOTAL_AMT+":::::cymnValidateJSOn.TOTAL_AMT");
        //        newFormMem.setProperty('NUMBER_COST', cymnValidateJSOn.TOTAL_AMT); PR
        alert(cymnValidateJSOn.MESSAGE);
        gsmNumber = cymnValidateJSOn.GSMNO;
        document.getElementById('divMobileVerification').style.display = 'none';
        document.getElementById('divSIMinfo').style.display = 'block';
        document.getElementById('simAllotBtn').style.display = 'block';
    } else {
        alert(cymnValidateJSOn.MESSAGE);
        return true;
    }
//    gsmSeleType = "";
}

function simSearch() {
    var simNumber = $("#simNumber").val();
    if (simNumber == "") {

        alert("Please enter pin");

        return true;
    }
    //    var cymnValidateRes = newFormMem.lstOfSimNos(simNumber);PR
    var cymnValidateResObj = {};
    cymnValidateResObj = JSON.parse(cymnValidateRes);

    if (cymnValidateResObj.STATUS == "0") {
        cymnValidateJOBJ = cymnValidateResObj.EMPTY_SIMS;

        var searchDivContent = '';
        $(cymnValidateJOBJ).each(function () {
            searchDivContent += '<a href="#" class="list-group-item" onClick=setPinAndMobile(this.innerHTML)>' + this.SIM_NO + '</a>'
        });
        $("#simSearchDIVId").html(searchDivContent);
    }
}

function setPinAndMobile(simNo)
{
    //    newFormMem.alert(simNo+":::::simNo::::");
    $("#simNumber").val(simNo);

    $("#gsm_number").val(gsmNumber);

    //    $("#gsm_number").val($("#cymn_mobile_no").val());
    $("#sim_number").val(simNo);

    gsmNumber = "";
    document.getElementById('simSearchDIVId').style.display = 'none';

    for (var i = 0; i < cymnValidateJOBJ.length; i++) {
        var valJsonObj = {};
        valJsonObj = cymnValidateJOBJ[i];
        if (valJsonObj.SIM_NO == simNo) {
            $("#imsi").val(valJsonObj.IMSI);

        }
    }
//    cymnValidateJOBJ=[];
}


function pairedMobileNum() {
    //    /pairedMobile
    var pairedMobile = $("#pairedMobile").val();
    var typeOfCAF = $("#remarks").val();
    if (pairedMobile == "") {
        newFormMem.alert(newFormMem.getI18Message("evisa.formfields.alertmobno"));
        return true;
    }
    if (typeOfCAF == "") {
        newFormMem.alert("Please select Type of CAF");
        return true;
    }
    var pairedMobileRes = newFormMem.getPairedSim(pairedMobile, typeOfCAF);
    pairedMobileJSOn = JSON.parse(pairedMobileRes);
    if (pairedMobileJSOn.STATUS == "0") {
        //        /pairedSIM
        newFormMem.alert(pairedMobileJSOn.MESSAGE);

        //        $("#pairedSIM").text(pairedMobileJSOn.SIMNO);

        //        $("#gsm_number").val(pairedMobile);

        $("#sim_number").val(pairedMobileJSOn.SIMNO);

        $("#imsi").val(pairedMobileJSOn.IMSI);

        document.getElementById("imsi").readOnly = true;

        var connection_type = $('#connection_type').val();
        if (connection_type == "1") {
            $("#plan_code").val(pairedMobileJSOn.PLAN_CODE).attr('disabled', 'disabled');
        }

    } else {
        newFormMem.alert(pairedMobileJSOn.MESSAGE);
        return true;
    }


}

function migration() {
    var MobileNum = $("#MIGMobile").val();
    //    newFormMem.alert("MobileNum : "+MobileNum);
    if (MobileNum == "") {
        newFormMem.alert(newFormMem.getI18Message("evisa.formfields.alertmobno"));

        return true;
    }
    //var MIG_circle= $("#MIGMobile").val();
    var MIG_circle_Val = $("#MIG_circle").val();
    if (MIG_circle_Val == "") {
        newFormMem.alert(newFormMem.getI18Message("evisa.mig.circle"));

        return true;

    }
    var MIG_circle_Val_1 = MIG_circle_Val.split("@!@");
    var MIG_circle = MIG_circle_Val_1[1];
    //    newFormMem.alert("MobileNum : "+MobileNum+" :: MIG_circle : "+MIG_circle);
    var pairedMobileRes = newFormMem.migrationNum(MobileNum, MIG_circle);
    //    newFormMem.alert("pairedMobileRes res : "+pai/redMobileRes);
    var pairedMobileJSOn = JSON.parse(pairedMobileRes);

    if (pairedMobileJSOn.MigrationResponse == true) {

        if (newFormMem.getProperty("isNewSim") == "true") {
            $("#divSIMinfo").show();//
            $("#divMIG").hide();//
        }


        $("#gsm_number").attr('disabled', 'disabled');

        if (pairedMobileJSOn.ConnectionType == 'PrePaid') {
            //            newFormMem.alert(pairedMobileJSOn.ConnectionType);
            $("#account_no").val(pairedMobileJSOn.ACCOUNT_NO);

            $("#sim_number").val(pairedMobileJSOn.SIM_NO);

            $("#imsi").val(pairedMobileJSOn.IMSI);

            document.getElementById("imsi").readOnly = false;
            $("#gsm_number").val(MobileNum);

            $("#first_name").val(pairedMobileJSOn.NAME);



        } else {
            //            newFormMem.alert(pairedMobileJSOn.ConnectionType);
            $("#gsm_number").val(MobileNum);

            $("#first_name").val(pairedMobileJSOn.NAME);

            $("#sim_number").val(pairedMobileJSOn.SIM_NO);

            $("#imsi").val(pairedMobileJSOn.IMSI);

            document.getElementById("imsi").readOnly = false;
            $("#account_no").val(pairedMobileJSOn.ACCOUNT_NO);

        }
    } else {


        $('#MIG_circle').prop('selectedIndex', 0);
        $('#MIGMobile').val("");
    }

//    var pairedMobileJSOn=JSON.parse(pairedMobileRes);


}

function simallotSubmit() {
    //simRadio
    var simRadioType = $("input[name=simRadio]:checked").val();

    if (simRadioType == "Paired") {
        //pairedMobile
        var pairedMobile = $("#pairedMobile").val();
        var pairedSIM = $("#pairedSIM").text();
        if (pairedMobile == "") {
            newFormMem.alert(newFormMem.getI18Message("evisa.formfields.alertmobno"));

            return true;
        }
        if (pairedSIM == "") {
            newFormMem.alert(newFormMem.getI18Message("evisa.formfields.simnumber"));

            return true;
        }
        $("#gsm_number").val(pairedMobile);

        $("#gsm_number").attr('disabled', 'disabled');

        $("#sim_number").val(pairedSIM);

        $("#sim_number").attr('disabled', 'disabled');

    } else {
        var cymn_mobile_no = $("#cymn_mobile_no").val();
        var simNumber = $("#simNumber").val();

        $("#gsm_number").val(cymn_mobile_no);

        $("#gsm_number").attr('disabled', 'disabled');
        //sim_number
        $("#sim_number").val(simNumber);

        $("#sim_number").attr('disabled', 'disabled');
    }
}

var gsmSeleType = "";
function cymnSelect(type) {
    gsmSeleType = type;
    newFormMem.setProperty("gsmSeleType", gsmSeleType);
    $('#imsi').val('');
    $('#gsm_number').val('');
    $('#sim_number').val('');
    $('#pairedMobile').val('');
    document.getElementById('divCYMN').style.display = 'block';
    document.getElementById('divPaired').style.display = 'none';
    document.getElementById('divSIMinfo').style.display = 'none';
    document.getElementById('simAllotBtn').style.display = 'none';

    document.getElementById("plan_code").readOnly = false;
//    var availableplans = newFormMem.getavailableplans();
//    newFormMem.alert(availableplans+":::availableplans");
//    var availableplanJOBJ = {};
//    availableplanJOBJ = JSON.parse(availableplans);
//   
//    if(availableplanJOBJ.STATUS == "0"){
//        var availplansarr = availableplanJOBJ.PLANS;
//        $(availplansarr).each(function(index){
//            $('#plan_code').append(new Option(availplansarr[index].PLAN_NAME, availplansarr[index].PLAN_CODE));
//        }
//        );  
//    } 
}

function pairedSelect(gsmSeleType) {
    newFormMem.setProperty("gsmSeleType", gsmSeleType);
    $('#imsi').val('');
    $('#gsm_number').val('');
    $('#sim_number').val('');
    $('#cymn_mobile_no').val('');
    $('#cymn_mobile_pin').val('');
    document.getElementById('divCYMN').style.display = 'none';
    document.getElementById('divPaired').style.display = 'block';
    document.getElementById('simAllotBtn').style.display = 'block';
}

function connection(type) {

    var eVISAPermission = newFormMem.getProperty("T_EVISA");
    var eKYCPermission = newFormMem.getProperty("T_EKYC");
    var kycPermission = newFormMem.getProperty("T_KYC");
    var userType = newFormMem.getProperty("UserFlag");

    if (type == "MNP_Postpaid" || type == "MIG_Pre_To_Post" || type == "MIG_Post_To_Pre" || type == "Individual_Postpaid" || type == "MNP_Prepaid") {
        document.getElementById("eVISAID").style.display = "none"; //

        //eKYC Permissions
        if (eKYCPermission == "1") {
            document.getElementById("eKYCID").style.display = "block";
        } else {
            document.getElementById("eKYCID").style.display = "none";
        }

        //KYC Permissions
        if (kycPermission == "1") {
            document.getElementById("eKYC").style.display = "block";
        } else {
            document.getElementById("eKYC").style.display = "none";
        }
    } else {

        //eVISA Permissions
        if (eVISAPermission == "1") {
            if (userType == "5") {
                document.getElementById("eVISAID").style.display = "none";
            } else {
                document.getElementById("eVISAID").style.display = "block";
            }
        } else {
            document.getElementById("eVISAID").style.display = "none";
        }

        //eKYC Permissions
        if (eKYCPermission == "1") {
            document.getElementById("eKYCID").style.display = "block";
        } else {
            document.getElementById("eKYCID").style.display = "none";
        }

        //KYC Permissions
        if (kycPermission == "1") {
            document.getElementById("eKYC").style.display = "block";
        } else {
            document.getElementById("eKYC").style.display = "none";
        }


    }
    newFormMem.setConnectionTypes(type);


}
function ekycsubcanfun() {
    window.location.href = "home.html";
}

//function KYCTypes(type){
//    var onbordStatus=login.onboardServerStatus();
//    if(onbordStatus==true){
//      
//        newFormMem.setKYCTypes(type);
//        if(type=='eKYC'){
//           
//            window.location.href="eKYC.jsp";             
//        }else if(type=='eVisa'){
//            window.location.href="evisa_scandocuments.html";
//        }else if(type=='KYC'){
//            window.location.href="kyc_subscriber_details.html";
//        }else{
//            
//            newFormMem.alert(newFormMem.getI18Message("kyc.formfields.kyctype"));
//            
//        }
//    }
//}
//Subscriber
function loadSubAadharNo() {
    setTimeout(function () {
        //        loadUserName();
        fingprintsLoad();
        //        setCAFMobiledate();
        //        goBack();
    }, 100);

}
var deviceSerialReg = /^[a-zA-Z0-9.-]+$/;
function loadSummeryDeviceName() {
    var selectedDevice = $("#selectDevice").val();
    $('#BioDeviceList').val(selectedDevice).attr('disabled', 'disabled');
}
function loadDeviceName() {

    var selectedDevice = $("#selectDevice").val();
    $('#BioDeviceList').val(selectedDevice).attr('disabled', 'disabled');
    var device_serial_num = $("#DeviceSerialNumber").val();
    if (device_serial_num.length > 0) {

        if (deviceSerialReg.test(device_serial_num)) {
            $('#device_serial_num').val(device_serial_num).attr('readonly', 'readonly');
        } else {
            $('#device_serial_num').val("").removeAttr('readonly');
        }

    }
}
//Agent
function loadAadharNo() {
    //    setTimeout(function(){
    //    loadUserName()
    var strloginResponse = document.getElementById("loginResponse").value;
    loginResponse = JSON.parse(strloginResponse);
    var aadharLogFlag = loginResponse.AadharLoginFlag;
    if (aadharLogFlag === '1') {
        var username = loginResponse.UserName;
        var userflag = loginResponse.UserFlag;
        if (userflag === '5') {
            $('#AadharAgent').append(new Option(username, username));
            $('#AadharAgent').val(username);
            $('#AadharNumber').val(username);
            //            newFormMem.setProperty("AadharNumber", username);
            $("#listAadharNo").prop('checked', true).attr("disabled", "disabled");
            $("#AadharAgent").attr('disabled', 'disabled');
            $("#NewAadhar").attr("disabled", "disabled");
            $("#inputAadhar").attr('disabled', "disabled");

        } else {
            //            //utilsObj.writeLog("Unable to load aadhar number because this user has no permission userflag is " + userflag);
        }
    } else {
        displayAadharNo();
    }


//    fingprintsLoad();
//    }, 100);  
}
function loadAadharValues(type) {
    setTimeout(function () {
        setAadharValues(type);
        setCAFMobiledate();
        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Load Aadhar details ends ');
    }, 10);
}
// 
function setCAFMobiledate() {
    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::CAF Mobile date  set into panel starts ');
    var eKYCDataEntry = $("#ekycCaf1Formvalues").val();
    objFieldsData = $.parseJSON(eKYCDataEntry);
    var customerType = objFieldsData.customer_type;
    connType = objFieldsData.connection_type;
    //    newFormMem.alert("::::::::::::::"+newFormMem.getProperty('caf_No'));
    var caf_seq = $("#CAF_SEQ_NO").val();
    $("#caf_no_txt").text("BE" + caf_seq);
    $("#SIM_NO_txt").text(objFieldsData.sim_number);
    //    $('input:radio[name="services"]').filter('[value="'+services+'"]').attr('checked', true);
    //    $('input[name="services"]').attr('disabled', 'disabled');
    //migration
    // $("#mobile_no_txt").text(objFieldsData.MIGMobile);

    if (connType == 1)
    {
        $(".services").prop('checked', true).attr('disabled', 'disabled');
        $("#Itemized").removeProp('checked').attr('disabled', 'disabled');
        $("#International").removeProp('checked').attr('disabled', 'disabled');
        $('input[name="services"][value="Other"]').remove();
        $('label[for=other_service]').remove();

    }
    if (objFieldsData.remarks_ecaf == 'Prepaid - Postpaid' || objFieldsData.remarks_ecaf == 'Postpaid - Prepaid') {
        document.getElementById("migr_table").style.display = "block";
        document.getElementById("mig_decl_Div").style.display = "block";
    } else {
        document.getElementById("migr_table").style.display = "none";
        document.getElementById("mig_decl_Div").style.display = "none";
    }
    if (customerType == '0005') {
        $('input:radio[name="subscriber_Type"]').filter('[value="Outstation"]').attr('checked', true);
        $('input[name="subscriber_Type"]').attr('disabled', 'disabled');
        $("input[name=check_addr][value=N]").prop('checked', true).trigger('change');
        $('input[name="check_addr"]').attr('disabled', 'disabled');
        $('#permaddrTr1').show();
        $('#permaddrTr2').show();
        $('#permaddrTr3').show();
    } else {
        $('input:radio[name="subscriber_Type"]').filter('[value="Individual"]').attr('checked', true);
        $('input[name="subscriber_Type"]').attr('disabled', 'disabled');
        //permanent and present add same
        $('input:radio[name="check_addr"]').filter('[value="Y"]').attr('checked', true);
        $('input[name="check_addr"]').attr('disabled', 'disabled');
        $('#loc_addr_hno').attr('readonly', 'readonly');
        $('#loc_addr_street').attr('readonly', 'readonly');
        $('#loc_addr_locality').attr('readonly', 'readonly');
        $('#loc_addr_landmark').attr('readonly', 'readonly');
        $('#loc_addr_district').attr('readonly', 'readonly');
        $('#loc_addr_state').attr('readonly', 'readonly');
        $('#loc_addr_pin').attr('readonly', 'readonly');
        $('#loc_addr_city').attr('readonly', 'readonly');
        $('#loc_addr_post_office').attr('readonly', 'readonly');
        $('#loc_addr_sub_dist').attr('readonly', 'readonly');
        $('#permaddrTr1').hide();
        $('#permaddrTr2').hide();
        $('#permaddrTr3').hide();
    }
//utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::CAF Mobile date  set into panel ends ');
}
function setAadharValues(type) {
    var strLoginResponse = document.getElementById("loginResponse").value;
    var loginResponse = JSON.parse(strLoginResponse);
    try {
        if (type == 'Subscriber') {
            var path = document.getElementById("Aadhar_SubscriberPhoto").value;
            document.getElementById('aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);

            //            newFormMem.setImage("Aadhar_SubscriberPhoto");
        } else if (type == 'Agent') {
            var path = document.getElementById("Aadhar_AgentPhoto").value;
            document.getElementById('Agent_aadhar_photo').setAttribute('src', 'data:image/jpeg;base64,' + path);
        }

    } catch (ee) {
        //        newFormMem.alert(ee);
    }

    try {
        var eKYCDataEntry = document.getElementById("ekycCaf1Formvalues").value;
        objFieldsData = $.parseJSON(eKYCDataEntry);
        connType = objFieldsData.connection_type;
        var customerType = objFieldsData.customer_type;
        if (type == 'Subscriber') {
            //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Subscriber data set into panel starts ');
            setMetaDataForValidation(ekycMetaData);
            $('input[name="poiDateNotFnd"][value="1"]').prop("checked", true);
            $('#poi_issue_date').val('01/01/1900').attr('readonly', 'readonly');
            $('input[name="poaDateNotFnd"][value="1"]').prop("checked", true);
            $('#poa_issue_date').val('01/01/1900');
            //            Loading pantajali plan
            var BpPlans = $("#BP_PLANS_DATA").val();
            var BP_PLANS_obj = JSON.parse(BpPlans);
            $('#bp_plan_id').children().remove();
            $('#bp_plan_id').append('<option value="">Select from list</option>');
            $(BP_PLANS_obj).each(function (index) {
                $('#bp_plan_id').append(new Option(BP_PLANS_obj[index].DD_VALUE, BP_PLANS_obj[index].DD_CODE));
            });
            if (connType == 1)
            {
                $("#tariff_plan_div").hide();
                $('input:radio[name="billing_address_type"]').filter('[value="2"]').attr('checked', true);
                $('input[name="billing_address_type"]').attr('disabled', 'disabled');
                document.getElementById("payment_label").innerHTML = '14.';
                if (customerType == '0005') {
                    document.getElementById("agent_tele_label").innerHTML = '18.';
                    document.getElementById("bundlePlanLbl").innerHTML = '19.';

                } else {
                    document.getElementById("bundlePlanLbl").innerHTML = '18.';
                    $("#decr_pos_Div").hide();
                    $("#agent_tele_div").hide();
                }

                //bill_addr
            } else {
                if (customerType == '0005') {
                    $('input[name="billing_address_type"]').attr('disabled', false);
                } else {
                    $('input:radio[name="billing_address_type"]').filter('[value="1"]').attr('disabled', true);
                }

                $("#tariff_plan_div").show();
                $("#font_lbl").show();
                document.getElementById("payment_label").innerHTML = '14b.';
                try {
                    var reqData = {};
                    reqData.reqSessionId = parent.$("#reqSessionId").val();

                    var tariffPlan = {};
                    var tariffPlanres = "";
                    $.ajax({
                        url: "tariffPlan.do", //parameters go here in object literal form
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        data: {
                            "reqData": encrypt(JSON.stringify(reqData))
                        },
                        success: function (data) {
                            sessionCheck(data);
                            tariffPlanres = JSON.stringify(data);
                            tariffPlan = JSON.parse(tariffPlanres);
                            tariffPlan = tariffPlan.response.responseData;
                            typeCAFJOBJ = tariffPlan.tariff_plan;
                            $('#tariff_plan').children().remove();
                            $('#tariff_plan').append('<option value="">Select from list</option>');
                            for (var i = 0; i < typeCAFJOBJ.length; i++) {//DD_VALUE
                                $('#tariff_plan').append(new Option(typeCAFJOBJ[i].DD_VALUE, typeCAFJOBJ[i].DD_CODE));
                            }

                        },
                        error: function (data) {
                            alert("error tariffPlan, data :" + JSON.stringify(data));
                        }

                    });


                } catch (e) {
                    //                    alert(e);
                }
                // West zone fileds showing in CAF for postpaid
                //ZoneID
                var westZoneCAfFlg = objFieldsData.westZoneCAfFlg;
                //                var westZoneCAfFlg = "true";

                //alert(westZoneCAfFlg + "::::westZoneCAfFlg")
                //utilsObj.writeLog("JS Log(newForm.js)::::::westZoneCAfFlg:::::::" + westZoneCAfFlg);
                if (westZoneCAfFlg === "true") {
                    $("#post_acc_ser_id").show();
                    $("#post_bill_pl_type_id").show();
                    if (customerType == '0005') {
                        document.getElementById("agent_tele_label").innerHTML = '18.';
                        document.getElementById("bundlePlanLbl").innerHTML = '19.';
                        document.getElementById("ACCOUNT_CATEGORY_label").innerHTML = '20.';
                        document.getElementById("EMF_CONFIG_label").innerHTML = '21.';
                        document.getElementById("FX_PLAN_label").innerHTML = '22.';
                        document.getElementById("ELEMENT_label").innerHTML = '23.';

                    } else {
                        document.getElementById("bundlePlanLbl").innerHTML = '18.';
                        document.getElementById("ACCOUNT_CATEGORY_label").innerHTML = '19.';
                        document.getElementById("EMF_CONFIG_label").innerHTML = '20.';
                        document.getElementById("FX_PLAN_label").innerHTML = '21.';
                        document.getElementById("ELEMENT_label").innerHTML = '22.';

                        $("#decr_pos_Div").hide();
                        $("#agent_tele_div").hide();
                    }
                    //OB Service caaling for combo field values.
                    //westZoneAllowCAFs
                    var allowCAFRes = {};
                    var reqData = {};
                    reqData.reqSessionId = parent.$("#reqSessionId").val();
                    $.ajax({
                        url: "westZoneCAF.do", //parameters go here in object literal form
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        data: {
                            "reqData": encrypt(JSON.stringify(reqData))
                        },
                        success: function (data) {
                            sessionCheck(data);
                            var allowCAF = JSON.stringify(data);
                            allowCAFRes = JSON.parse(allowCAF);
                            allowCAFRes = allowCAFRes.response.responseData;
                            //utilsObj.writeLog("JS Log(newForm.js)::::::ACCOUNT_CATEGORY:::::::" + accCATArr);
                            var accCATArrJOBJ = allowCAFRes.ACCOUNT_CATEGORY;
                            $('#ACCOUNT_CATEGORY').children().remove();
                            $('#ACCOUNT_CATEGORY').append('<option value="">Select from list</option>');
                            for (var i = 0; i < accCATArrJOBJ.length; i++) {//DD_VALUE
                                $('#ACCOUNT_CATEGORY').append(new Option(accCATArrJOBJ[i].DD_VALUE, accCATArrJOBJ[i].DD_CODE));
                            }

                            // EMF_CONFIG_ID combo value loading
                            //utilsObj.writeLog("JS Log(newForm.js)::::::EMF_CONFIG_ID:::::::" + serTYPEArr);
                            var serTYPEJOBJ = allowCAFRes.EMF_CONFIG_ID;
                            $('#EMF_CONFIG_ID').children().remove();
                            $('#EMF_CONFIG_ID').append('<option value="">Select from list</option>');
                            for (var i = 0; i < serTYPEJOBJ.length; i++) {//DD_VALUE
                                $('#EMF_CONFIG_ID').append(new Option(serTYPEJOBJ[i].DD_VALUE, serTYPEJOBJ[i].DD_CODE));
                            }

                            // FX_PLAN_CODE combo value loading
                            //utilsObj.writeLog("JS Log(newForm.js)::::::FX_PLAN_CODE:::::::" + billPlanArr);
                            var billPlanJOBJ = allowCAFRes.FX_PLAN_CODE;
                            $('#FX_PLAN_CODE').children().remove();
                            $('#FX_PLAN_CODE').append('<option value="">Select from list</option>');
                            for (var i = 0; i < billPlanJOBJ.length; i++) {//DD_VALUE
                                $('#FX_PLAN_CODE').append(new Option(billPlanJOBJ[i].DD_VALUE, billPlanJOBJ[i].DD_CODE));
                            }

                            // ELEMENT_ID combo value loading
                            //utilsObj.writeLog("JS Log(newForm.js)::::::ELEMENT_ID:::::::" + billTypeArr);
                            var billTypeJOBJ = allowCAFRes.ELEMENT_ID;
                            $('#ELEMENT_ID').children().remove();
                            $('#ELEMENT_ID').append('<option value="">Select from list</option>');
                            for (var i = 0; i < billTypeJOBJ.length; i++) {//DD_VALUE
                                $('#ELEMENT_ID').append(new Option(billTypeJOBJ[i].DD_VALUE, billTypeJOBJ[i].DD_CODE));
                            }

                        },
                        error: function (data) {
                            alert("error tariffPlan, data :" + JSON.stringify(data));
                        }

                    });


                    // ACCOUNT_CATEGORY combo value loading


                } else {
                    if (customerType == '0005') {
                        document.getElementById("agent_tele_label").innerHTML = '18.';
                        document.getElementById("bundlePlanLbl").innerHTML = '19.';
                    } else {
                        document.getElementById("bundlePlanLbl").innerHTML = '18.';
                        $("#decr_pos_Div").hide();
                        $("#agent_tele_div").hide();
                    }

                    $("#post_acc_ser_id").hide();
                    $("#post_bill_pl_type_id").hide();
                    //utilsObj.writeLog("JS Log(newForm.js)::::::westZoneCAfFlg is false,so no need to display west zone fields:::::::");

                }
            }
            //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Subscriber data set into panel ends ');
        }
    } catch (e) {
//        alert('JS Log(newForm.js):::::::::::::::::::Exception in setAadharValues  block ' + e)
        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in setAadharValues  block ' + e);
    }

    try {
        var objagentAdharRes = {};
        var stragentAdharRes = "";
        if (type == 'Subscriber') {
            stragentAdharRes = $("#AadharResponse").val();

        } else if (type == 'Agent') {
            stragentAdharRes = $("#AgentAadharResponse").val();
        }

        objagentAdharRes = JSON.parse(stragentAdharRes);

        var agentAadharNo = objagentAdharRes.UidData_uid;
        //        var agentAadharNo=objagentAdharRes.Aadhar_Id;
        if (agentAadharNo.length > 0) {
            agentAadharNo = agentAadharNo.replace(/.(?=.{4})/g, 'X');
            $("#aadhar_no_txt").text(agentAadharNo);

        }


        var Agentname = objagentAdharRes.Poi_name;
        if (Agentname.length > 0) {
            $("#first_name").val(Agentname);

        } else {
            $("#first_name").val('');

        }

        var Agent_Gen = objagentAdharRes.Poi_gender;
        if (Agent_Gen.length > 0) {
            $('#genderVal').val(objagentAdharRes.Poi_gender);
            //            if (Agent_Gen == 'M') {
            //              $("input[name='gender'][value='2']");
            ////                $('input:radio[name="gender"]').filter('[value="2"]').attr('checked', true);
            //                $('input[name="gender"]').attr('disabled', 'disabled');
            //            } else if (Agent_Gen == 'F') {
            //                  $("input[name='gender'][value='1']");
            ////                $('input:radio[name="gender"]').filter('[value="1"]').attr('checked', true);
            //                $('input[name="gender"]').attr('disabled', 'disabled');
            //            } else if (Agent_Gen == 'O') {
            //                  $("input[name='gender'][value='3']");
            ////                $('input:radio[name="gender"]').filter('[value="3"]').attr('checked', true);
            //                $('input[name="gender"]').attr('disabled', 'disabled');
            //            }
        }
        var formatedDate = getDataFormat(objagentAdharRes.Poi_dob);

        $("#dob").val(formatedDate);

        var age = getAge(objagentAdharRes.Poi_dob);
        $("#cust_age").val(age);

        var Agent_Email = objagentAdharRes.Poi_email;
        if (Agent_Email.length > 0) {
            $("#email").val(Agent_Email);
            $("#email").attr('readonly', 'readonly');
        } else {
            $("#email").val();
        }
        if (customerType == '0001' || type == 'Agent') {
            var Agent_hno = objagentAdharRes.Poa_house;
            //        var Agent_hno=objagentAdharRes.Poa_house;
            if (Agent_hno.length > 0) {
                $("#loc_addr_hno").val(Agent_hno);

            } else {
                $("#loc_addr_hno").val('');

            }

            var Agent_locality = objagentAdharRes.Poa_loc;
            if (Agent_locality.length > 0) {
                $("#loc_addr_locality").val(Agent_locality);
                $("#loc_addr_locality").attr('readonly', 'readonly');
            } else {

            }

            var Agent_landmark = objagentAdharRes.Poa_lm;
            if (Agent_landmark.length > 0) {
                $("#loc_addr_landmark").val(Agent_landmark);
                $("#loc_addr_landmark").attr('readonly', 'readonly');

            } else {
            }

            var Agent_subDistrict = objagentAdharRes.Poa_subdist;
            if (Agent_subDistrict.length > 0) {
                $("#loc_addr_sub_dist").val(Agent_subDistrict);
                $("#loc_addr_sub_dist").attr('readonly', 'readonly');

            } else {
            }

            var Agent_postOffice = objagentAdharRes.Poa_po;
            if (Agent_postOffice.length > 0) {
                $("#loc_addr_post_office").val(Agent_postOffice);
                $("#loc_addr_post_office").attr('readonly', 'readonly');

            } else {
            }
            var Agent_street = objagentAdharRes.Poa_street;
            if (Agent_street.length > 0) {
                $("#loc_addr_street").val(Agent_street).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_street").val();

            }


            var Agent_city = objagentAdharRes.Poa_vtc;
            if (Agent_city.length > 0) {
                $("#loc_addr_city").val(Agent_city).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_city").val();

            }


            var Agent_dist = objagentAdharRes.Poa_dist;
            //        var Agent_city=objagentAdharRes.Poa_dist;
            if (Agent_dist.length > 0) {
                $("#loc_addr_district").val(Agent_dist).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_district").val();

            }

            var Agent_state = objagentAdharRes.Poa_state;
            //        var Agent_state=objagentAdharRes.Poa_state;
            if (Agent_state.length > 0) {
                $("#loc_addr_state").val(Agent_state).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_state").val('');

            }

            var Agent_Pincode = objagentAdharRes.Poa_pc;
            //        var Agent_Pincode=objagentAdharRes.Poa_pc;
            if (Agent_Pincode.length > 0) {
                $("#loc_addr_pin").val(Agent_Pincode).attr('readonly', 'readonly');

            } else {
                $("#loc_addr_pin").val();

            }
        } else {//outstation customer
            var Agent_hno = objagentAdharRes.Poa_house;
            if (Agent_hno.length > 0) {
                $("#perm_addr_hno").val(Agent_hno);

            } else {
                $("#perm_addr_hno").val('');

            }

            var Agent_locality = objagentAdharRes.Poa_loc;
            if (Agent_locality.length > 0) {
                $("#perm_addr_locality").val(Agent_locality);
                $("#perm_addr_locality").attr('readonly', 'readonly');
            } else {

            }

            var Agent_landmark = objagentAdharRes.Poa_lm;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_landmark.length > 0) {
                $("#perm_addr_landmark").val(Agent_landmark);
                $("#perm_addr_landmark").attr('readonly', 'readonly');

            } else {
            }

            var Agent_subDistrict = objagentAdharRes.Poa_subdist;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_subDistrict.length > 0) {
                $("#perm_addr_sub_dist").val(Agent_subDistrict);
                $("#perm_addr_sub_dist").attr('readonly', 'readonly');

            } else {
            }

            var Agent_postOffice = objagentAdharRes.Poa_po;
            //        var Agent_landmark=objagentAdharRes.Poa_landmark;
            if (Agent_postOffice.length > 0) {
                $("#perm_addr_post_office").val(Agent_postOffice);
                $("#perm_addr_post_office").attr('readonly', 'readonly');

            } else {
            }
            var Agent_street = objagentAdharRes.Poa_street;
            //        var Agent_street=objagentAdharRes.Poa_street;
            if (Agent_street.length > 0) {
                $("#perm_addr_street").val(Agent_street).attr('readonly', 'readonly');

            } else {
                $("#perm_addr_street").val();

            }


            var Agent_city = objagentAdharRes.Poa_vtc;
            //        var Agent_city=objagentAdharRes.Poa_dist;
            if (Agent_city.length > 0) {
                $("#perm_addr_city").val(Agent_city).attr('readonly', 'readonly');

            } else {
                $("#perm_addr_city").val();

            }


            var Agent_dist = objagentAdharRes.Poa_dist;
            //        var Agent_city=objagentAdharRes.Poa_dist;
            if (Agent_dist.length > 0) {
                $("#perm_addr_district").val(Agent_dist).attr('readonly', 'readonly');

            } else {
                $("#perm_addr_district").val();

            }

            var Agent_state = objagentAdharRes.Poa_state;
            //        var Agent_state=objagentAdharRes.Poa_state;
            if (Agent_state.length > 0) {
                $("#perm_addr_state").val(Agent_state).attr('readonly', 'readonly');

            } else {
                $("#perm_addr_state").val('');

            }

            var Agent_Pincode = objagentAdharRes.Poa_pc;
            //        var Agent_Pincode=objagentAdharRes.Poa_pc;
            if (Agent_Pincode.length > 0) {
                $("#perm_addr_pin").val(Agent_Pincode).attr('readonly', 'readonly');

            } else {
                $("#perm_addr_pin").val();

            }

        }
        var agent_Unique_response_code = objagentAdharRes.KycRes_code;
        //        var agent_Unique_response_code=objagentAdharRes.e_Kyc_RRN;
        if (agent_Unique_response_code.length > 0) {
            $("#Agent_unique_Response_Code").text(agent_Unique_response_code);
            $("#Agent_Unique_Response_Code").val(agent_Unique_response_code);

            //            newFormMem.setProperty("Agent_Unique_Response_Code", agent_Unique_response_code);

        } else {
            $("#Agent_unique_Response_Code").text('');

        }
        if (objFieldsData.remarks_ecaf == 'Prepaid - Postpaid' || objFieldsData.remarks_ecaf == 'Postpaid - Prepaid') {
            var migrationRes = $("#Migration_AccDetails").val();
            var migrationJSOn = JSON.parse(migrationRes);
            $("#aadhar_name").text(objagentAdharRes.Poi_name);
            $("#billing_name").text(migrationJSOn.BILL_FNAME);
        }

        if (type == 'Subscriber') {

            $("#poi_number").val(agentAadharNo);
            $("#poa_number").val(agentAadharNo);
            $("#mobile_no_txt").text(objFieldsData.gsm_number);

            var subscriber_Date = $("#SubscriberAuthDate").val();
            var subscriber_Time = $("#SubscriberAuthTime").val();
            if (subscriber_Date.length > 0) {
                $("#Agent_Date").text(subscriber_Date);

            } else {
                $("#Agent_Date").text('');

            }
            if (subscriber_Time.length > 0) {
                $("#Agent_Time").text(subscriber_Time);

            } else {
                $("#Agent_Time").vtextal('');

            }
            var subFather = objagentAdharRes["Poa_co"];

            if (subFather == "" || subFather == null) {
                subFather = objagentAdharRes["Poa co"];
            }
            if (subFather.length > 0) {
                $("#f_h_name").val(subFather);
                $("#me_f_h_name").val(subFather);
                $("#me_f_h_name_asterik").hide();
            } else {
                $("#f_h_name").val();
                $("#me_f_h_name_asterik").show();



            }
            var othTeleNum = objagentAdharRes.Poi_phone;
            if (othTeleNum.length > 0) {
                $("#other_telno").val(othTeleNum);
                $("#other_telno").attr('readonly', 'readonly');
            }
            $('#alt_cont_no').on('change', function () {
                var alconno = $('#alt_cont_no').val();
                var gsmNumber = objFieldsData.gsm_number;
                if (!altRegExp.test(alconno)) {
                    $('#alt_cont_no').val('');
                    $('#alt_cont_no').focus();
                    alert("It should be a valid mobile number which should start with 6,7,8,9");
                    return false;
                }
                var username = loginResponse.UserName;
                var mobileno = loginResponse.MobileNumber;
                if (alconno.length == 10) {
                    if (alconno == username) {
                        $('#alt_cont_no').val('');
                        $('#alt_cont_no').focus();
                        alert("Alternate contact number and Username Should not be same");
                        return false;
                    }
                    if (alconno == mobileno) {
                        $('#alt_cont_no').val('');
                        $('#alt_cont_no').focus();
                        alert("Alternate contact number and Mobile Number Should not be same");
                        return false;
                    }
                    if (alconno == gsmNumber) {
                        $('#alt_cont_no').val('');
                        $('#alt_cont_no').focus();
                        alert("Alternate contact number and GSM Number Should not be same");
                        return false;
                    }

                } else {
                    $('#alt_cont_no').val('');
                    $('#alt_cont_no').focus();
                    alert("Alternate contact number should be 10");
                    return false;
                }
            });
            //            }
            //            var landmark=objagentAdharRes.Poa_landmark;
            //            if(landmark.length>0){
            //                $("#loc_addr_landmark").val(landmark);  
            //            }else{
            //                $("#loc_addr_landmark").val("--");
            //            }


        } else if (type == 'Agent') {
            var agent_number = objagentAdharRes.Poi_phone;
            if (agent_number.length > 0) {
                $("#mobile_no_txt").text(agent_number);
            } else {
                $("#mobile_no_txt").text("");
            }

            var agent_Date = $("#AgentAuthDate").val();
            //            var agent_Time=newFormMem.getProperty("AgentAuthTime");
            if (agent_Date.length > 0) {
                $("#Agent_Date").text(agent_Date);
                $("#AgentDate").val(agent_Date);

            } else {
                $("#Agent_Date").text('');

            }
            var agentFather = objagentAdharRes.Poa_co;
            if (agentFather.length > 0) {
                $("#f_h_name").val(agentFather);
                $("#f_h_name").attr('readonly', 'readonly');

            } else {
                $("#f_h_name").val();

            }
            //            if(agent_Time.length>0){
            //                $("#Agent_Time").text(agent_Time);  
            //            
            //            }else{
            //                $("#Agent_Time").vtextal('--'); 
            //           
            //            }

        }
    } catch (e1) {
        //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in setAadharValues  block 2' + e1);
    }

}

function aadharValidation(textdata) {
    var aadharReg = /^[2-9][0-9]{11,11}$|^[Nn][Aa]$/;
    if (!aadharReg.test(textdata)) {
        return false;
    } else {
        return true;
    }
}
function aadharNoList() {
    var strloginResponse = document.getElementById("loginResponse").value;
    loginResponse = JSON.parse(strloginResponse);
    var AadharNumbers = loginResponse.AadharNumbers;
    var list = [];
    for (var i = 0; i < AadharNumbers.length; i++) {

        list[i] = AadharNumbers[i].AadharNumber;
    }
    return list;
}
function displayAadharNo() {
    var AgentAadharJOBJ = loginResponse.AadharNumbers;
    if (AgentAadharJOBJ.length > 0) {
        $(AgentAadharJOBJ).each(function (index) {
            $('#AadharAgent').append(new Option(AgentAadharJOBJ[index].ReferenceName, AgentAadharJOBJ[index].AadharNumber));
        });
        //        if (aadharValidation(AgentAadhar)) {
        //        newFormMem.setProperty("AgentAadhar_No", "Set");
        //            $('#AadharAgent').val(AgentAadhar);
        //
        //            $('#AadharAgent').attr('readonly', 'readonly');
        //        } else {
        //            newFormMem.setProperty("AgentAadhar_No", "Enter");
        //            $('#AadharAgent').val('');
        //            //            $('#AadharAgent').focus();
        //            return false
        //        }


    } else {
        alert("Please add the Aadhar number");
    }
}

//Declaration Agent
function loadDeclrationAadharNo() {
    setTimeout(function () {
        loadSummeryDeviceName();
        displayAadharNo1();
        displayAgentAadharNo();
        //        checkedBox();
        //        fingprintsLoad();
        //        declarationValidation();
        var eKYCDataEntry = $("#ekycCaf1Formvalues").val();
        objFieldsData = $.parseJSON(eKYCDataEntry);
        var customerType = objFieldsData.customer_type;
        if (customerType === '0005') {
            modelShow();
        }

    }, 1000);
}
function displayAadharNo1() {
    var AgentAadhar = $("#SubscriberAadhar").val();
    AgentAadhar = AgentAadhar.replace(/.(?=.{4})/g, 'X');
    $('#AadharAgent').text(AgentAadhar);

}
function displayAgentAadharNo() {
    var AgentAadhar = $("#AgentAadharNumber").val();
    //    var AgentAadhar = $("#agentdecAadharNo").val();//last four digits with mask
    //    AgentAadhar = AgentAadhar.replace(/.(?=.{4})/g, 'X');
    $('#agent_dec_Aadhar').val(AgentAadhar);

}
function checkedBox() {
    var checkStatus = newFormMem.getProperty("ChekBOXStatus");
    if (checkStatus == "true") {
        $('#check1').prop('checked', true);
        $('#check2').prop('checked', true);
        $('#check3').prop('checked', true);
    }
}




function fingprintsLoad() {
//    var SubsAadhar = $("#AgentAadhar").val();
//    $("#AadharSubscriber").val(SubsAadhar);
//    $("#AadharSubscriber").css("color", "#AEF805");

}
function inActiveBtn() {
    setTimeout(function () {
        document.getElementById('autback').style.display = 'none';
    }, 50);
}
function authencancelClick() {
    window.location.href = "home.html";
}


function convretDate(usDate) {
    //var dateParts = usDate.split(/(\d{1,2})-(\d{1,2})-(\d{4})/);
    var dateParts = usDate.split("/");
    return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}


function getDataFormat(dataValue) {
    //    newFormMem.alert(dataValue);
    var pieces = dataValue.split('-');
    var birth_date = pieces[0];
    var birth_month = pieces[1];
    var birth_year = pieces[2];
    var formatedDate = birth_date + '/' + birth_month + '/' + birth_year;
    return formatedDate;

}
function convertPrevFormat(usDate) {

    var dateParts = usDate.split("-");
    //    newFormMem.alert('Date to be Chanaged to::::::::::::::::Ravi'+dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2]);
    return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
}

function subsNxtBtn() {

    var fieldValue = '';
    var billing_address = '';
    billing_address_per = '';
    var strCafDataId = JSON.stringify(ekycCAfFields);
    $("#strCafDataId").val(strCafDataId);
    var eKYCDataEntry = $("#ekycCaf1Formvalues").val();

    //utilsObj.writeLog('JS Log(newForm.js)::::::::::::::::::eKYCDataEntry object in subsNxtBtn   method\t' + eKYCDataEntry);
    var objFieldsData1 = $.parseJSON(eKYCDataEntry);
    //    console.log(objFieldsData1);
    //    alert(objFieldsData1);

    var connType = objFieldsData1.connection_type;
    var customerType = objFieldsData1.customer_type;
    var objFieldsData = {};
    var eKYCDataEntry = $("#ekycCaf1Formvalues").val();
    objFieldsData = $.parseJSON(eKYCDataEntry);
    var patanjaliplan = objFieldsData.patanjaliplan;
    if (patanjaliplan === '1') {
        var bp_plan_idVal = $("#bp_plan_id").val();
        if (bp_plan_idVal === '' || bp_plan_idVal === 'Select from list') {
            alert("Please select the  bundle plan")
            return false;
        }
    }
    if (customerType === '0005') {
        ekycCAfFields.push('loc_ref_name');
        ekycCAfFields.push('loc_ref_contact');
        ekycCAfFields.push('loc_ref_details');
    }
    try {

        for (var idx = 0; idx < ekycCAfFields.length; idx++)
        {
            var currentId = ekycCAfFields[idx];
            //                        newFormMem.alert("currentId::::::::::"+currentId);
            var IdvlFieldMetaDataObj = ekycMetaData[currentId];
            var fieldType = IdvlFieldMetaDataObj.TYPE

            if (currentId == 'deposit_amt') {
                ekycfinalFormdata[currentId + "_ecaf"] = $('#deposit_amt').val();
            }


            if ($("#" + currentId).is(':hidden') && currentId.indexOf("addr") < 0) {
                //                newFormMem.alert(":hiden::::::::::::::"+$("#"+currentId).is(':hidden'));
                //                newFormMem.alert(":hiden::::::::::::::"+currentId.indexOf("addr"));
                continue;
            } else if (currentId == 'perm_addr_hno' || currentId == 'perm_addr_street' || currentId == 'perm_addr_locality' || currentId == 'perm_addr_landmark' || currentId == 'perm_addr_district' || currentId == 'perm_addr_state' || currentId == 'perm_addr_pin' || currentId == 'perm_addr_city' || currentId == 'perm_addr_sub_dist' || currentId == 'perm_addr_post_office') {
                if (customerType === '0001') {
                    fieldValue = $('#perm_addr_hno').val($('#loc_addr_hno').val());
                    fieldValue = $('#perm_addr_street').val($('#loc_addr_street').val());
                    fieldValue = $('#perm_addr_locality').val($('#loc_addr_locality').val());
                    fieldValue = $('#perm_addr_state').val($('#loc_addr_state').val())
                    fieldValue = $('#perm_addr_district').val($('#loc_addr_district').val());
                    fieldValue = $('#perm_addr_landmark').val($('#loc_addr_landmark').val());
                    fieldValue = $('#perm_addr_pin').val($('#loc_addr_pin').val());
                    fieldValue = $('#perm_addr_city').val($('#loc_addr_city').val());
                    fieldValue = $('#perm_addr_sub_dist').val($('#loc_addr_sub_dist').val());
                    fieldValue = $('#perm_addr_post_office').val($('#loc_addr_post_office').val());
                    //utilsObj.writeLog('JS Log(newForm.js)::::::::::::::::::set ' + currentId);
                }
            }
            if (fieldType === 'TF' || fieldType === 'ETF')
            {

                try {
                    if (currentId == 'pan_gir_uid') {
                        var panVal = $('#pan_gir_uid').val();
                        if (panVal != '') {
                            //                            var panData = alphanumericsVal(panVal);
                            //                            if (panData == true) {
                            if (panVal.length == 10) {
                                var isnum = /^\d+$/.test(panVal);
                                if (isnum || (/^[a-zA-Z]+$/.test(panVal))) {
                                    alert("Enter valid PAN/UIS Number");
                                    $('#pan_gir_uid').val('');
                                    $('#pan_gir_uid').focus();
                                    return;
                                } else {

                                    if ((/^[A-Z0-9]+$/).test(panVal)) {

                                    } else {
                                        alert("Enter valid PAN/UIS Number");
                                        $('#pan_gir_uid').val('');
                                        $('#pan_gir_uid').focus();
                                        return;
                                    }
                                }
                            } else {
                                alert("PAN/UIS number length should be 10");
                                $('#' + currentId).val('');
                                $('#' + currentId).focus();
                                return;
                            }
                            //                            } else {
                            //                                newFormMem.alert("Enter valid PAN/UIS");
                            //                                $('#' + currentId).val('');
                            //                                $('#' + currentId).focus();
                            //                                return;
                            //                            }
                        }
                    }
                } catch (e) {
                    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in pan number  block ' + e);

                }

                try {
                    if (currentId == 'deposit_amt' || currentId == 'deposit') {

                        if (connType == 2) {
                            if ($("#deposit").val() === '')
                            {
                                alert('Please select deposit');
                                $('#deposit').focus();
                                return false;
                            }

                            if ($("#deposit_amt").val() === '')
                            {
                                var deposit = $("#deposit").val();
                                if (deposit == '1') {
                                    alert('Please enter deposit amount');
                                } else {
                                    alert('Please enter reason');
                                }
                                $('#deposit_amt').focus();
                                return false;
                            }

                            //                        var deposit_amount = $('#deposit_amt').val();
                            ////                        if (deposit_amount == '' || deposit_amount == undefined) {
                            ////                            newFormMem.alert("Deposit amount should not be empty.");
                            ////                                return false;
                            ////                        } else {
                            //
                            //                        if (deposit_amount == '' || deposit_amount == '0' || deposit_amount == null) {
                            //                            var bsnlnumber = $('#bsnl_telno').val();
                            //                            if (bsnlnumber == '' || bsnlnumber == null) {
                            //                                //                                newFormMem.alert(fieldname + " " +"is not ::::::::::::::Empty");
                            //                                newFormMem.alert("BSNL Number is Mandatory");
                            //                                $('#bsnl_telno').focus();
                            //                                $('#bsnl_telno').val('');
                            //                                return false;
                            //                            } else {
                            //                                idvlValue = $('#bsnl_telno').val();
                            ////                                ekycfinalFormdata[currentId + "_ecaf"] = $('#bsnl_telno').val();
                            //                            }
                            //                        } else {
                            //                            idvlValue = $('#deposit_amt').val();
                            ////                            ekycfinalFormdata[currentId + "_ecaf"] = $('#deposit_amt').val();
                            //
                            //                        }
                            ////                        }
                            //
                        }
                    }
                } catch (e) {
                    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in deposit amount  block ' + e);
                }
                try {
                    if (currentId == 'existing_number_count') {
                        var DD_DATA = $("#DD_DATA").val();
                        var DD_DATA_obj = JSON.parse(DD_DATA);
                        var OpearatorList = DD_DATA_obj.OPERATORS_LIST;
                        //                        alert("existing_num");
                        var existing_number_count = $('#existing_number_count').val();
                        var other_conn_details = "";
                        var oprator = '';
                        var oprator_count = 0;
                        var count = 0;
                        for (var i = 1; i <= OpearatorList.length; i++) {
                            oprator = $('#oprator_' + i).val();
                            oprator_count = $('#opratorCount_' + i).val();
                            if ((oprator != '') && (oprator_count > 0 && oprator.length > 0)) {
                                if ((oprator_count != 0)) {
                                    count = count + parseInt(oprator_count);
                                    if (oprator.length == 0) {
                                    } else {
                                        other_conn_details = other_conn_details + oprator + "#" + oprator_count;

                                        if ($('#oprator_' + i).val().length > 0 && $('#opratorCount_' + i).val().length > 0) {
                                            other_conn_details = other_conn_details + ",";
                                        }

                                    }
                                } else {
                                    alert("Zero will not be allowed in oprator-wise connections count");
                                    return;
                                }
                            }
                        }
                        try {
                            var result = other_conn_details.substring(other_conn_details.length - 1);
                        } catch (e) {

                        }
                        if (result === ',') {
                            other_conn_details = other_conn_details.substring(0, (other_conn_details.length - 1));
                        }

                        if (existing_number_count > count || existing_number_count < count) {
                            alert("Totall number of connections count is not matching with oprator-wise connections count");
                            return;
                        }
                        ekycfinalFormdata['other_conn_details'] = other_conn_details;
                        //utilsObj.writeLog('JS Log(newForm.js)::::::::::::::::::set other_conn_details' + other_conn_details);
                    }
                } catch (e) {
                    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in exisiting number count  block ' + e);
                }
                //                ekycfinalFormdata['other_conn_details'] = "";//other_conn_details are not showing on 13_02_2018
                try {
                    if (currentId == 'other_telno') {
                        var other_telno = $('#other_telno').val();
                        if (other_telno != '') {
                            var num = numeric(other_telno);
                            if (!num) {
                                alert(IdvlFieldMetaDataObj.DISPLAY_NAME + ' accept only numbers');
                                $('#' + currentId).val('');
                                $('#' + currentId).focus();
                                return;
                            }
                        }


                    }

                } catch (e) {
                    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception in othere telephone number  block ' + e);

                }


                try {
                    fieldValue = $('#' + currentId).val();
                    if (1 == checkMandatory(fieldValue, IdvlFieldMetaDataObj.MANDATORY))
                    {
                        alert(IdvlFieldMetaDataObj.DISPLAY_NAME + '  should not be empty.');
                        $('#' + currentId).focus();
                        return false;
                    }
                    ekycfinalFormdata[currentId] = fieldValue;
                } catch (e) {
                    //utilsObj.writeLog('JS Log(newForm.js):::::::::::::::::::Exception occured while we set  ' + currentId + ' value' + e);

                }
                //                newFormMem.alert(":::::::::::::"+ekycfinalFormdata[currentId+"_ecaf"]);
            } else if (fieldType === 'DD') {
                fieldValue = $('#' + currentId).val();

                if (1 == checkMandatory(fieldValue, IdvlFieldMetaDataObj.MANDATORY))
                {
                    alert(IdvlFieldMetaDataObj.DISPLAY_NAME + '  should not be empty.');
                    $('#' + currentId).focus();
                    return false;
                }
                ekycfinalFormdata[currentId] = fieldValue;
                var fieldValueText = $('#' + currentId + ' option:selected').text();
                if (fieldValueText == "Select from list" || fieldValueText == "Select") {
                    ekycfinalFormdata[currentId + "_ecaf"] = "";
                } else {
                    ekycfinalFormdata[currentId + "_ecaf"] = fieldValueText;
                }

            } else if (fieldType === 'DT')
            {
                var val = $('#' + currentId).val();
                if (1 == checkMandatory(val, IdvlFieldMetaDataObj.MANDATORY))
                {
                    alert(IdvlFieldMetaDataObj.DISPLAY_NAME + '  should not be empty.');
                    $('#' + currentId).focus();
                    return false;
                }
                fieldValue = convretDate(val);
                ekycfinalFormdata[currentId] = fieldValue;
            } else if (fieldType === 'RB' || fieldType === 'CB')
            {
                var fieldValue = '';
                var flag = false;
                $('[name="' + currentId + '"]').each(function () {
                    if ($(this).prop('checked') == true) {
                        if (!flag) {
                            fieldValue = $(this).val();
                            flag = true;
                        } else {
                            fieldValue = fieldValue + "," + $(this).val();
                        }
                    }
                });
                if (1 == checkMandatory(fieldValue, IdvlFieldMetaDataObj.MANDATORY))
                {
                    alert(IdvlFieldMetaDataObj.DISPLAY_NAME + '  should not be empty.');
                    $('#' + currentId).focus();
                    return false;
                }
                if (currentId == 'mig_decl_chk') {
                    if (objFieldsData.remarks_ecaf == 'Prepaid - Postpaid' || objFieldsData.remarks_ecaf == 'Postpaid - Prepaid') {
                        var migr_checkBoxstatus = document.getElementById(currentId).checked;
                        if (migr_checkBoxstatus === true) {
                            fieldValue = '1';
                        } else {
                            alert("Please select verified subscriber names from Aadhar & Billing system");

                            fieldValue = '0';
                            return false;
                        }
                    }
                }
                if (currentId == 'ischeckDECPOS') {
                    if (customerType === '0005') {
                        var decr_POSStatus = document.getElementById(currentId).checked;
                        if (decr_POSStatus === true) {
                            fieldValue = '1';
                        } else {
                            alert("Please select Declaration By POS");
                            fieldValue = '0';
                            return false;
                        }
                    }
                }

                ekycfinalFormdata[currentId] = fieldValue;

            } else if (fieldType == "LB") {
                fieldValue = $('#' + currentId).text();
                if (currentId == 'aadhar_no_txt') {
                    ekycfinalFormdata['aadhar_no'] = $('#SubscriberAadhar').val();
                }
            } else {
                fieldValue = $('#' + currentId).val();
            }

        }
        var bp_plan_idVal = $("#bp_plan_id").val()
        if (bp_plan_idVal > 0) {
            ekycfinalFormdata['bp_plan_id'] = bp_plan_idVal;
            ekycfinalFormdata['bp_plan_name'] = $('#bp_plan_id option:selected').text();
            if (userFlag === '3') {
                var chckBxval = document.getElementById("emp_id_check_done").checked;
                if (chckBxval === false) {
                    alert("Please select I have been checked the employe id.")
                    return false;
                } else {
                    ekycfinalFormdata['emp_id_check_done'] = '1';
                }

            } else {
                var res = "";
                var reqData = {};
                reqData.reqSessionId = parent.$("#reqSessionId").val();
                $.ajax({
                    url: "imageUpload.do", //parameters go here in object literal form
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        "reqData": encrypt(JSON.stringify(reqData))
                    },
                    success: function (data) {
                        sessionCheck(data);
                        res = JSON.parse(JSON.stringify(data))
                    },
                    error: function (data) {
                        alert("error imageUpload, data :" + JSON.stringify(data));
                    }

                });

                var result = res.response.responseData;
                if (result.Status === "1" || result.Status === 1) {
                    alert(result.msgErr);
                    return false;
                }
                var chckBxval = document.getElementById("img_clear_check_done").checked;
                if (chckBxval === false) {
                    alert("Please select I am able to see the photo clearly.")
                    return false;
                } else {
                    ekycfinalFormdata['img_clear_check_done'] = '1';
                }
            }



        }
        //        alert("::::billing_address_type::::::::::" + ekycfinalFormdata.billing_address_type);
        //asking mandatory for local address feilds in outstation'
        if (customerType === '0005') {

            if ($('#loc_addr_hno').val() == '')
            {
                alert('Present/Local Address - House No/ Flat No must not be empty');
                $('#loc_addr_hno').focus();
                return false;
            }
            if ($('#loc_addr_street').val() == '') {
                alert('Present Address - Street Address/Village must not be empty');
                $('#loc_addr_street').focus();
                return false;
            }
            if ($('#loc_addr_locality').val() == '') {
                alert('Present/Local Address - Locality/Tehsil must not be empty');
                $('#loc_addr_locality').focus();
                return false;
            }
            if ($('#loc_addr_landmark').val() == '') {
                alert('Present Address - Landmark must not be empty');
                $('#loc_addr_hno').focus();
                return false;
            }
            if ($('#loc_addr_city').val() == '') {
                alert('Present Address - City  must not be empty');
                $('#loc_addr_city').focus();
                return false;
            }
            if ($('#loc_addr_state').val() == '') {
                alert('Present/Local Address - State/UT  must not be empty');
                $('#loc_addr_state').focus();
                return false;
            }
            if ($('#loc_addr_district').val() == '') {
                alert('Present Address -  District  must not be empty');
                $('#loc_addr_district').focus();
                return false;
            }
            if ($('#loc_addr_sub_dist').val() == '') {
                alert('Present Address - sub district  must not be empty');
                $('#loc_addr_sub_dist').focus();
                return false;
            }
            if ($('#loc_addr_pin').val() == '') {
                alert('Present Address/Local -  PIN  must not be empty');
                $('#loc_addr_pin').focus();
                return false;
            }
            if ($('#loc_addr_post_office').val() == '') {
                alert('Present Address - Post office  must not be empty');
                $('#loc_addr_post_office').focus();
                return false;
            }
        }
        var gender_ecaf = $('#genderVal').val();
        if (gender_ecaf === 'M') {
            ekycfinalFormdata['gender_ecaf'] = gender_ecaf;
            ekycfinalFormdata['gender'] = '2';
        } else if (gender_ecaf === 'F') {
            ekycfinalFormdata['gender_ecaf'] = gender_ecaf;
            ekycfinalFormdata['gender'] = '1';
        } else if ((gender_ecaf === '0')) {
            ekycfinalFormdata['gender_ecaf'] = gender_ecaf;
            ekycfinalFormdata['gender'] = '3';
        }


        if (ekycfinalFormdata.hasOwnProperty("loc_addr_hno")) {
            if (ekycfinalFormdata.loc_addr_hno.length > 0) {
                billing_address = ekycfinalFormdata.loc_addr_hno + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_hno value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_hno  is not available in response");
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_street")) {
            if (ekycfinalFormdata.loc_addr_street.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_street + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_street  is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_locality")) {
            if (ekycfinalFormdata.loc_addr_locality.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_locality + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_locality value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_locality is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_landmark")) {
            if (ekycfinalFormdata.loc_addr_landmark.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_landmark + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_landmark value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_landmark is not available in response")
        }

        if (ekycfinalFormdata.hasOwnProperty("loc_addr_state")) {

            if (ekycfinalFormdata.loc_addr_state.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_state + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_state value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_state is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_district")) {

            if (ekycfinalFormdata.loc_addr_district.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_district + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_district value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_district is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_sub_dist")) {

            if (ekycfinalFormdata.loc_addr_sub_dist.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_sub_dist + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_sub_dist value is empty in response");
            }

        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_sub_dist is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_city")) {

            if (ekycfinalFormdata.loc_addr_city.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_city + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_city value is empty in response");
            }


        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_city is not available in response")
        }
        if (ekycfinalFormdata.hasOwnProperty("loc_addr_post_office")) {

            if (ekycfinalFormdata.loc_addr_post_office.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_post_office + ',';
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_post_office value is empty in response");
            }


        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_post_office is not available in response")
        }

        if (ekycfinalFormdata.hasOwnProperty("loc_addr_pin")) {

            if (ekycfinalFormdata.loc_addr_pin.length > 0) {
                billing_address += ekycfinalFormdata.loc_addr_pin;
            } else {
                //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_pin value is empty in response");
            }


        } else {
            //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::loc_addr_pin is not available in response")
        }




        if (connType == '2') {
            if (ekycfinalFormdata.billing_address_type == '2') {
                //            ekycfinalFormdata.billing_address_type_ecaf = ekycfinalFormdata.loc_addr_hno + ',' + ekycfinalFormdata.loc_addr_street + "," + ekycfinalFormdata.loc_addr_locality + "," + ekycfinalFormdata.loc_addr_state + "," + ekycfinalFormdata.loc_addr_district + "," + ekycfinalFormdata.loc_addr_pin;

                ekycfinalFormdata.billing_address_type_ecaf = billing_address;

            } else if (ekycfinalFormdata.billing_address_type == '1') {

                if (ekycfinalFormdata.hasOwnProperty("perm_addr_hno")) {
                    if (ekycfinalFormdata.perm_addr_hno.length > 0) {
                        billing_address_per = ekycfinalFormdata.perm_addr_hno + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_hno value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_hno  is not available in response");
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_street")) {
                    if (ekycfinalFormdata.perm_addr_street.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_street + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_locality value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_locality  is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_locality")) {
                    if (ekycfinalFormdata.perm_addr_locality.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_locality + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_locality value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_locality is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_landmark")) {
                    if (ekycfinalFormdata.perm_addr_landmark.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_landmark + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_landmark value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_landmark is not available in response")
                }

                if (ekycfinalFormdata.hasOwnProperty("perm_addr_state")) {

                    if (ekycfinalFormdata.perm_addr_state.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_state + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_state value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_state is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_district")) {

                    if (ekycfinalFormdata.perm_addr_district.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_district + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_district value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_district is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_sub_dist")) {

                    if (ekycfinalFormdata.perm_addr_sub_dist.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_sub_dist + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_sub_dist value is empty in response");
                    }

                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_sub_dist is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_city")) {

                    if (ekycfinalFormdata.perm_addr_city.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_city + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_city value is empty in response");
                    }


                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_city is not available in response")
                }
                if (ekycfinalFormdata.hasOwnProperty("perm_addr_post_office")) {

                    if (ekycfinalFormdata.perm_addr_post_office.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_post_office + ',';
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_post_office value is empty in response");
                    }


                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_post_office is not available in response")
                }

                if (ekycfinalFormdata.hasOwnProperty("perm_addr_pin")) {

                    if (ekycfinalFormdata.perm_addr_pin.length > 0) {
                        billing_address_per += ekycfinalFormdata.perm_addr_pin;
                    } else {
                        //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_pin value is empty in response");
                    }


                } else {
                    //utilsObj.writeLog("JS Log(newForm.js)::::::::::::::::::perm_addr_pin is not available in response")
                }
                ekycfinalFormdata.billing_address_type_ecaf = billing_address_per;
            } else {
                ekycfinalFormdata.billing_address_type_ecaf = ekycfinalFormdata.otherAddr;
                ekycfinalFormdata.billing_address = ekycfinalFormdata.otherAddr;
            }
        } else {
            ekycfinalFormdata.billing_address_type_ecaf = billing_address;
        }

        //aadhar 2nd father
        if (ekycfinalFormdata.f_h_name.length > 0) {
            if (ekycfinalFormdata.me_f_h_name === "") {
                alert("Father name must not be empty");
                $("#me_f_h_name").focus();
                return false;
            }
        } else if (ekycfinalFormdata.f_h_name === "" && ekycfinalFormdata.me_f_h_name === "") {
            alert("Father name must not be empty");
            $("#me_f_h_name").focus();
            return false;
        }


        ekycfinalFormdata['services_ecaf'] = ekycfinalFormdata.services;
        ekycfinalFormdata['nationality_ecaf'] = ekycfinalFormdata.nationality;
        //Removing POI and POA details and sending static 
        ekycfinalFormdata['poi_type'] = "23";
        ekycfinalFormdata['poi_type_ecaf'] = 'Unique Identification Authority of India';
        ekycfinalFormdata['poi_number'] = $("#SubscriberAadhar").val();
        ekycfinalFormdata['poi_issue_place'] = '';
        ekycfinalFormdata['poi_issuing_auth'] = '23';
        ekycfinalFormdata['poi_issuing_auth_ecaf'] = 'UIDAI Government of India(GOI)';
        ekycfinalFormdata['poi_issue_date'] = '1900-01-01';
        ekycfinalFormdata['poa_type'] = "23";
        ekycfinalFormdata['poa_type_ecaf'] = 'Unique Identification Authority of India';
        ekycfinalFormdata['poa_number'] = $("#SubscriberAadhar").val();
        ekycfinalFormdata['poa_issue_place'] = '';
        ekycfinalFormdata['poa_issuing_auth'] = '23';
        ekycfinalFormdata['poa_issuing_auth_ecaf'] = 'UIDAI Government of India(GOI)';
        ekycfinalFormdata['poa_issue_date'] = '1900-01-01';


        //            newFormMem.alert("currentId::::::::::"+fieldType);
        //            var fieldValue = $('#' + currentId).val();

        var advr_Rent_chck = document.getElementById('ADVRNT_ACTFEE_BILL').checked;
        if (advr_Rent_chck == true) {
            ekycfinalFormdata.ADVRNT_ACTFEE_BILL = '1';
        } else {
            ekycfinalFormdata.ADVRNT_ACTFEE_BILL = '0';
        }
        ekycfinalFormdata.totalamount = calculateAmount();



        //        newFormMem.alert("ekycfinalFormdata:::::::::::::"+ekycfinalFormdata);
    } catch (e) {
        alert(e);
        //utilsObj.writeLog('JS Log(newForm.js)::::::::::::::::::::::::::Exception in subsNxtBtn ' + e);
        //        return false;
    }
    try {
        ekycfinalFormdata['SIM_Cost'] = $("#SIM_COSTVal").val();
        ekycfinalFormdata['SIM_ServiceTax'] = $("#Service_Tax").val();
        ekycfinalFormdata['Plan_AmountVal'] = $("#Plan_AmountVal").val();
        ekycfinalFormdata['SIM_Total'] = $("#amount").val();
        var NUMBER_COST = $("#NUMBER_COST").val();
        if (NUMBER_COST !== null && NUMBER_COST !== '') {
            ekycfinalFormdata['Number_Cost'] = NUMBER_COST;
        }
        if (objFieldsData.connection_type == 2) {
            ekycfinalFormdata['activation_charges'] = $("#ACTIVATION_CHARGES").val();
        }

        var ekycfinalDaTa = JSON.stringify(ekycfinalFormdata);
        var ekycFullData = ekycfinalDaTa;
        $("#subs_details").val(ekycFullData);
    } catch (e) {
        //utilsObj.writeLog('JS Log(newForm.js):::::::::::Exception in SIM_Cost,SIM_ServiceTax,Plan_AmountVal setting to finalformdata ' + e);
    }
    try {
        parent.$('#AgentDec').modal('show');
    } catch (e) {
        //utilsObj.writeLog('JS Log(newForm.js):::::::::::Exception in declaration show block ' + e);
    }
}
function alphabetic1(keyE) {
    var charV = keyE.key;

    if (charV == undefined) {
        //alert('undefined');
        charV = String.fromCharCode(keyE.charCode)
    }
    if (charV == 'Backspace' || charV == 'Tab') {
        return true;
    }
    if (!alphabeticReg1.test(charV)) {
        return false;
    } else {
        return true;
    }


}
function numeric(numeric) {
    if (!numberReg.test(numeric)) {
        return false;
    } else {
        return true;
    }


}
function goBack() {
    //    newFormMem.alert("back button");
    var page_status = newFormMem.getProperty('ekycpageStatus');

    //    newFormMem.alert("page_status:::::::::"+page_status)
    try {
        if (page_status == 1) {
            var ekycDataValues = newFormMem.getProperty('subs_details');
            //utilsObj.writeLog(':::::::::::::::ekyc  goBack method data' + ekycDataValues);
            var objEkycDataValues = $.parseJSON(ekycDataValues);

            var pay_type = objEkycDataValues.payment_type
            if (pay_type == 2) {
                $('#bankDetails').show();

            } else {
                $('#bankDetails').hide();

            }

            for (var key in ekycMetaData) {

                var IdvlFieldMetaDataObj = ekycMetaData[key];
                var fieldType = IdvlFieldMetaDataObj.TYPE;
                var dataValuestobeSet = '';
                if (objEkycDataValues[key] != undefined) {
                    dataValuestobeSet = objEkycDataValues[key];
                }
                if (fieldType == 'CB') {
                    var strAry = dataValuestobeSet.split(',');
                    $.each(strAry, function (index, idvlVal) {
                        if (idvlVal === '') {
                            idvlVal = 'vcfgrt';
                        }
                        $("input[name='" + key + "'][value='" + idvlVal + "']").prop('checked', true).trigger("change");
                    })

                } else if (fieldType == 'RB') {

                    $("input[name=" + key + "][value=" + dataValuestobeSet + "]").prop('checked', true).trigger("change");
                } else if (fieldType == "LB") {
                    $('#' + key).text(dataValuestobeSet);
                } else if (fieldType == "DD") {
                    $('#' + key).val(dataValuestobeSet).trigger("change");
                } else if (key == 'dob' || key == 'poi_issue_date' || key == 'poa_issue_date') {
                    var convertedDate = convertPrevFormat(dataValuestobeSet);
                    $('#' + key).val(convertedDate);
                } else if (fieldType == "TF" || fieldType == "ETF") {
                    $('#' + key).val(dataValuestobeSet);
                }

            }

            try {
                var existing_number_count = objEkycDataValues['existing_number_count'];
                if (existing_number_count > 0) {
                    var content = '<td style="width:350px";padding:6px 2px><span class="bold">';
                    var content1 = '</span><input type="text" maxlength="15" value="" id="';
                    var content2 = '" onkeypress="return alphabetic1(event);"/> <input type="text" value="" id="';
                    //                    var content3 = '" class="num" maxlength="1"   onchange="formFieldValidation(this);" style="width:100px"/></td>'
                    var content3 = '" class="num" maxlength="1"  onkeypress="return isNumber(event)";" style="width:110px"/></td>';
                    var finalContent = '<tr class="opratorTR">';
                    var repeat = 0;

                    for (var i = 1; i <= existing_number_count; i++) {

                        if (i % 3 == 0) {
                            finalContent = finalContent + content + i + ")&nbsp;" + content1 + "oprator_" + i + content2 + "opratorCount_" + i + content3 + "</tr><tr class='opratorTR'>";

                        } else {
                            finalContent = finalContent + content + i + ")&nbsp;" + content1 + "oprator_" + i + content2 + "opratorCount_" + i + content3;

                        }
                    }
                    finalContent = finalContent + "</tr>";
                    $(finalContent).insertAfter("#existing_number_count");

                    var other_conn_details = objEkycDataValues['other_conn_details'];
                    var connObjs = other_conn_details.split(',');

                    for (var i = 0; i < connObjs.length; i++) {
                        var obj = connObjs[i].split('#');
                        $('#oprator_' + (i + 1)).val(obj[0]);
                        $('#opratorCount_' + (i + 1)).val(obj[1]);
                    }


                }
            } catch (e) {

                //                alert(e);
            }

        }
    } catch (e) {
        //        newFormMem.alert(e);
    }

}
function checkMandatory(currentValue, isMandatory)
{
    if (isMandatory === 'Y' && (currentValue === "" || currentValue === undefined))
    {
        return '1';
    }
    return '2';
}
function isNumber(keyE) {
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
        //        if($("#digits").val().length == 4){
        //            searchForSims(contextpath,$("#digits").val()+charV);
        //        }
        return true;
    }
    return false;
}
function DateDiff(date1, symbol) {

    var dateParts = date1.split(symbol);
    var finaldate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2];

    var serverDate = newFormMem.getProperty('Date');

    var diffDates = newFormMem.diffenceDate(serverDate, finaldate);

    return diffDates;
}


function totalAmountToPay() {
    var simCost = '0';
    var sim_cost = '0';
    var servicetax = '0';
    var totalamount = '0';
    var numberCost = '0';
    var grandTotal = '0';
    var amount = '0';

    if (newFormMem.isContainsKey("SIM_COSTVal")) {
        sim_cost = newFormMem.getProperty("SIM_COSTVal");
        if (sim_cost != null && sim_cost != '') {
            simCost = parseInt(sim_cost);
        }
    }
    if (newFormMem.isContainsKey("Service_Tax")) {
        servicetax = newFormMem.getProperty("Service_Tax");
        if (servicetax != null && servicetax != '') {
            //                        $('#SIMTaxId').text(servicetax);
        }
    }
    if (newFormMem.isContainsKey("amount")) {
        amount = newFormMem.getProperty("amount");
    }
    if (newFormMem.isContainsKey("Plan_AmountVal")) {
        var planamount = newFormMem.getProperty("Plan_AmountVal");
        if (planamount != null && planamount != '') {
            simCost = parseInt(amount) + parseInt(planamount);
        }
    }

    //    if (newFormMem.isContainsKey("AMOUNT")) {
    //        var amount = newFormMem.getProperty("AMOUNT");
    //        if (amount != null && amount != '') {
    //            numberCost = parseInt(newFormMem.getProperty("AMOUNT"));
    //        }
    //    }
    //    if (newFormMem.isContainsKey("TAX")) {
    //        var tax = newFormMem.getProperty("TAX");
    //        if (tax != null && tax != '') {
    //            numberCost = parseInt(numberCost) + parseInt(tax);
    //        }
    //    }
    //    if (newFormMem.isContainsKey("DISCOUNT")) {
    //        var discount = newFormMem.getProperty("DISCOUNT");
    //        if (discount != null && discount != '') {
    //            numberCost = parseInt(numberCost) - parseInt(discount);
    //        }
    //    }
    if (newFormMem.isContainsKey("TOTAL_AMT")) {
        totalamount = newFormMem.getProperty("TOTAL_AMT");
    }

    grandTotal = parseInt(simCost) + parseInt(totalamount);

    if (newFormMem.getProperty("Connection") == 2) {
        var depositamount = parseInt($('#deposit_amt').val());
        grandTotal = grandTotal + depositamount;

    }
    return grandTotal;
}

function emailValid(key) {
    var mail = $("#email").val();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return true;
    } else {
        $("#email").val('');
        newFormMem.alert("Please enter proper E-mail ID")
        return false;

    }
}
function validLocRefContactNo() {
    try {
        var locrefcon = $('#loc_ref_contact').val();
        var alconno = $('#alt_cont_no').val();
        var mobileno = objFieldsData.gsm_number;
        var agentTeleNum = $('#agent_tele_number').val();
        var loc_ref_contact = altContact(locrefcon);
        if (loc_ref_contact == true) {
            if (locrefcon.length == 10) {
                if (locrefcon == alconno) {
                    $('#loc_ref_contact').val('');
                    $('#loc_ref_contact').focus();
                    alert("Local reference contact number and Alternate contact number must not be same");
                    return false;
                } else if (locrefcon == mobileno) {
                    $('#loc_ref_contact').val('');
                    $('#loc_ref_contact').focus();
                    alert("Local reference contact number and Mobile Number must not be same");
                    return false;
                }
                var loginRes = {};
                loginRes = $("#loginResponse").val();
                var loginResponse = JSON.parse(loginRes);
                var username = loginResponse.UserName;
                if (locrefcon == username) {
                    $('#loc_ref_contact').val('');
                    $('#loc_ref_contact').focus();
                    alert("Local reference contact number must not be same as franchise/retailer's number");
                    return false;
                }
                if (agentTeleNum == locrefcon) {
                    $('#loc_ref_contact').val('');
                    $('#loc_ref_contact').focus();
                    alert("Local reference contact number and Agent tele-verification number must not be same");
                    return false;
                }

            } else {
                $('#loc_ref_contact').val('');
                $('#loc_ref_contact').focus();
                alert("Local reference contact number Minimum length is 10 charaters");
                return false;
            }

        } else {
            alert("It should be a valid mobile number which should start with 6,7,8,9");
            $('#loc_ref_contact').val('');
            $('#loc_ref_contact').focus();
            return false;
        }

    } catch (e) {
        //        alert("Exception in locRefContact number on change:" + e)
    }
}

function validAgentTeleNo() {
    try {
        var agentTeleNum = $('#agent_tele_number').val();
        var locrefcon = $('#loc_ref_contact').val();
        var alconno = $('#alt_cont_no').val();
        var mobileno = objFieldsData.gsm_number;
        var Agent_Tele_no = altContact(agentTeleNum);
        if (Agent_Tele_no == true) {
            if (agentTeleNum.length == 10) {
                if (agentTeleNum == alconno) {
                    $('#agent_tele_number').val('');
                    $('#agent_tele_number').focus();
                    alert("Agent tele-verification number and Alternate mobile number must not be same");
                    return false;
                }
                if (agentTeleNum == mobileno) {
                    $('#agent_tele_number').val('');
                    $('#agent_tele_number').focus();
                    alert("Agent tele-verification number and Mobile Number must not be same");
                    return true;
                }
                var loginResponse = parent.$('#loginResponse').val();
                var username = loginResponse.LoginID;
                if (agentTeleNum == username) {
                    $('#agent_tele_number').val('');
                    $('#agent_tele_number').focus();
                    alert("Agent tele-verification number must not be same as franchise/retailer's number");
                    return false;
                }
                if (agentTeleNum == locrefcon) {
                    $('#agent_tele_number').val('');
                    $('#agent_tele_number').focus();
                    alert("Agent tele-verification number and Local reference contact number must not be same");
                    return false;
                }

            } else {
                $('#agent_tele_number').val('');
                $('#agent_tele_number').focus();
                alert("Agent tele-verification number minimum length is 10 charaters");
                return false;
            }
        } else {
            alert("It should be a valid mobile number which should start with 6,7,8,9");
            $('#agent_tele_number').val('');
            $('#agent_tele_number').focus();
            return false;
        }
    } catch (e) {
        //        alert("Exception in agent Tele number on change :::" + e)
    }
}
function funAgree() {

    var customerType = objFieldsData.customer_type;
    var dec_type = "";
    if (customerType == '0005') {
        dec_type = "agent";
    } else {
        dec_type = "customer";
        //        window.location.href = 'eKYC_step6.jsp';
    }
    var cust_details = $("#subs_details").val();
    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.subs_details = cust_details;
    reqData.declaration_page = dec_type;
    reqData.amount = $("#amount").val();
    reqData.TALKVALUE = $("#TALKVALUE").val();
    reqData.VALIDITY = $("#VALIDITY").val();
    reqData.GRACEPERIOD = $("#GRACEPERIOD").val();
    reqData.RETAIN = $("#RETAIN").val();
    reqData.FOOTNOTEREMARKS = $("#FOOTNOTEREMARKS").val();
    reqData.ACTIVATION_CHARGES = $("#ACTIVATION_CHARGES").val();
    reqData.SIM_COSTVal = $("#SIM_COSTVal").val();
    reqData.Service_Tax = $("#Service_Tax").val();

    parent.$('#CusDec').modal('hide');
    parent.$('#AgentDec').modal('hide');

    document.eKYC_Step5Form.method = "post";
    document.eKYC_Step5Form.action = "custDetails.do";
    document.eKYC_Step5Form.reqData.value = encrypt(JSON.stringify(reqData));
    document.eKYC_Step5Form.submit();
}
function modelShow() {
    var ekycFullData = $('#subs_details').val();
    var agent_decl_status = $('#agent_decl_status').val();
    var ekycFullDataObj = JSON.parse(ekycFullData);
    if (agent_decl_status !== null || agent_decl_status === '') {

        if (agent_decl_status == 'true') {
            $('#AuthenVal').modal('show');
        }
    }
    $('#cust_Name').text(ekycFullDataObj.first_name);
    $('#cust_loc_ref_num').text(ekycFullDataObj.loc_ref_contact);
    $('#agent_tele_num').text(ekycFullDataObj.agent_tele_number);
    var uniqueCode = $('#Agent_Unique_Response_Code').val();
    $('#unique_response_code').text(uniqueCode);
    var AgentAuthDate = $('#AgentAuthDate').val();

    $('#agent_date').text(AgentAuthDate);

//utilsObj.writeLog("JS Log(Authuntication.js)::: modelShow ");
}
function AuthenValHide() {
    $('#AuthenVal').modal('hide');
}
function validAlternateNo() {
    var alconno = $('#alt_cont_no').val();
    var gsmNumber = objFieldsData.gsm_number;
    if (!altRegExp.test(alconno)) {
        $('#alt_cont_no').val('');
        $('#alt_cont_no').focus();
        alert("It should be a valid mobile number which should start with 6,7,8,9");
        return false;
    }
    var username = loginResponse.UserName;
    var mobileno = loginResponse.MobileNumber;
    if (alconno.length == 10) {
        if (alconno == username) {
            $('#alt_cont_no').val('');
            $('#alt_cont_no').focus();
            alert("Alternate contact number and Username Should not be same");
            return false;
        }
        if (alconno == mobileno) {
            $('#alt_cont_no').val('');
            $('#alt_cont_no').focus();
            alert("Alternate contact number and Mobile Number Should not be same");
            return false;
        }
        if (alconno == gsmNumber) {
            $('#alt_cont_no').val('');
            $('#alt_cont_no').focus();
            alert("Alternate contact number and GSM Number Should not be same");
            return false;
        }

    } else {
        $('#alt_cont_no').val('');
        $('#alt_cont_no').focus();
        alert("Alternate contact number should be 10");
        return false;
    }

}
function bundlePlan() {
    var strloginResponse = parent.$('#loginResponse').val();
    var loginResponse = JSON.parse(strloginResponse);
    userFlag = loginResponse.UserFlag;
    var val = $("#bp_plan_id").val();
    var idType = $("#DD_DATA").val();
    var patanjaliPlanMesg = $("#patanjaliPlanMesg").val();
    var idTypeJSon = JSON.parse(idType);
    var idTypeObj = idTypeJSon.bp_emp_id_type;
    var FRCMandateStatue = $("#IS_FRC_MANDATE").val();
    var frc_required = "";
    var frc_mandate = "";
    var frc_msg = "";
    if (val > '0' || val > 0)
    {

        var BpPlans = $("#BP_PLANS_DATA").val();
        var BP_PLANS_obj = JSON.parse(BpPlans);

        $(BP_PLANS_obj).each(function (index) {
            if (val.toString() === (BP_PLANS_obj[index].DD_CODE).toString()) {
                frc_required = BP_PLANS_obj[index].FRC_REQ;
            }
        });
        if (FRCMandateStatue === "TRUE" || FRCMandateStatue === "true" || frc_required === "1") {//1 for required 0 for optional
            alert(patanjaliPlanMesg);
        }

        if (userFlag === '3') {
            $("#patanjaliChkBoxDiv").show();
            $("#patanjaliUpload").hide();
        } else {
            $("#patanjaliUpload").show();
            $("#patanjaliChkBoxDiv").hide();
            $("#imgNote").show();
            $('#bp_emp_id_type').children().remove();
            $('#bp_emp_id_type').append('<option value="">Select from list</option>');
            //        $('#bp_emp_id_type').append('<option value="1">Patanjali ID card</option>');
            //        $('#bp_emp_id_type').append('<option value="2">Patanjali Authorization letter with photo</option>');
            for (var i = 0; i < idTypeObj.length; i++) {//DD_VALUE
                $('#bp_emp_id_type').append(new Option(idTypeObj[i].DD_VALUE, idTypeObj[i].DD_CODE));
            }
        }
    } else {
        $("#patanjaliUpload").hide();
        $("#patanjaliChkBoxDiv").hide();
        $("#imgNote").hide();
    }

}