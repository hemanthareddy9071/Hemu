/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//var mainMenuObj='<div id="nav-col"><section id="col-left" class="col-left-nano"><div id="col-left-inner" class="col-left-nano-content"><div class="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav"><ul class="nav nav-pills nav-stacked"><li><a href="index.html"><span id="dashboardId"></span></a></li><li><a href="eKYC_receipt.html"><span id="eKYCId"></span></a></li><li><a href="receipt.html"><span id="KYCId"></span></a></li><li><a href="evisa_summary.html"><span id="eVisaId"></span></a></li><li><a href="uploadstatus.html"><span id="uploadStatusId"></span></a></li><li><a href="storedjobs.html"><span id="storedJobsId"></span></a></li><li><a href="physical_cafs.html"><span id="physicalCAFsId"></span></a></li><li><a href="changepassword.html"><span id="settingsId"></span></a></li></ul></div></div></section><div id="nav-col-submenu"></div></div>';
//var mainMenuObj='<div id="nav-col"><section id="col-left" class="col-left-nano"><div id="col-left-inner" class="col-left-nano-content"><div class="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav"><ul class="nav nav-pills nav-stacked"><li><a href="index.html"><span id="dashboardId"></span></a></li><li id="eKYCID"><a href="eKYC.jsp"><span id="eKYCId"></span></a></li><li id="eKYC"><a href="dataentry.html"><span id="KYCId"></span></a></li><li id="eVISAID"><a href="#" onclick="KYCTypes(\'eVisa\');"><span id="eVisaId"></span></a></li><li><a href="uploadstatus.html"><span id="uploadStatusId"></span></a></li><li><a href="storedjobs.html"><span id="storedJobsId"></span></a></li><li><a href="physical_cafs.html"><span id="physicalCAFsId"></span></a></li><li><a href="changepassword.html"><span id="settingsId"></span></a></li></ul></div></div></section><div id="nav-col-submenu"></div></div>';
//var mainMenuObj='<div id="nav-col"><section id="col-left" class="col-left-nano"><div id="col-left-inner" class="col-left-nano-content"><div class="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav"><ul class="nav nav-pills nav-stacked"><li><a href="index.html"><span id="dashboardId"></span></a></li><li id="eKYCID"><a href="#" onclick="KYCTypes(\'eKYC\');"><span></span></a></li><li id="eKYC"><a href="#" onclick="KYCTypes(\'KYC\');"><span></span></a></li><li id="eVISAID"><a href="#" onclick="KYCTypes(\'eVisa\');"><span></span></a></li><li><a href="uploadstatus.html"><span id="uploadStatusId"></span></a></li><li><a href="storedjobs.html"><span id="storedJobsId"></span></a></li><li><a href="physical_cafs.html"><span id="physicalCAFsId"></span></a></li><li><a href="changepassword.html"><span id="settingsId"></span></a></li></ul></div></div></section><div id="nav-col-submenu"></div></div>';

// multiplication table d
var d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
// permutation table p
var p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
// inverse table inv
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
// converts string or number to an array and inverts it
function invArray(array) {
    if (Object.prototype.toString.call(array) == "[object Number]") {
        array = String(array);
    }
    if (Object.prototype.toString.call(array) == "[object String]") {
        array = array.split("").map(Number);
    }
    return array.reverse();
}
// generates checksum
function generate(array) {
    var c = 0;
    var invertedArray = invArray(array);
    for (var i = 0; i < invertedArray.length; i++) {
        c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
    }
    return inv[c];
}

// validates checksum
function validate(array) {
    var c = 0;
    var invertedArray = invArray(array);
    for (var i = 0; i < invertedArray.length; i++) {
        c = d[c][p[(i % 8)][invertedArray[i]]];
    }
    return (c === 0);
}

function loadUserName() {

    loadMenuContent();

    /*
     setTimeout(function () {
     fetchLoginUserName();
     utilsObj.writeLog("JS Logs(common.js)::::::::fetchLoginUserName() Completed");
     loadUserwiseMenu();
     utilsObj.writeLog("JS Logs(common.js)::::::::loadUserwiseMenu() Completed");
     //        imageSize();
     //        var boolValue = newFormMem.getReceiptSeqNumberRes();
     //        displayLoginTimeStamp();
     }, 100);
     */
}

function loadUserwiseMenu() {
    try {
        document.getElementById("menuId").innerHTML = newFormMem.getProperty("menuId");
        var aadharLogFlag = newFormMem.getProperty("AadharLoginFlag");
        if (aadharLogFlag === '1') {
            $("#changePasswdILI").hide();
            $("#menuSettingsId").hide();
        } else {
            $("#changePasswdILI").show();
            $("#menuSettingsId").show();
        }
    } catch (e) {
        alert("JS Logs(common.js)::::::::loadUserwiseMenu():::::: " + e);
    }
}



function displayLoginTimeStamp() {
    try {
        var CurrentLogin = loginFunCallObj.displayLoginTimeStamp();
        $('.textthin').text(CurrentLogin);
    } catch (e) {
        utilsObj.writeLog("JS Logs(common.js)::::::::displayLoginTimeStamp():::::: " + e);
    }
}




function KYCTypes(type) {
    try {
//        var onbordStatus = login.onboardServerStatus();
//        if (onbordStatus == true) {
//            newFormMem.setProperty('kycpageStatus', '');
//            newFormMem.setProperty('eKYCpageStatus', '');
//            newFormMem.setProperty('eVISAForm1Status', '');
//            newFormMem.setKYCTypes(type);
        if (type == 'eKYC') {

            window.location.href = "eKYC.jsp";
//            var menuBox = document.getElementById('sub_menu');
//            if (menuBox.style.display == "block") { // if is menuBox displayed, hide it
//                menuBox.style.display = "none";
//            } else { // if is menuBox hidden, display it
//                menuBox.style.display = "block";
//            }
        } else if (type == 'eVisa') {
            window.location.href = "evisa.html";
        } else if (type == 'KYC') {
            window.location.href = "dataentry.html";
        } else {

            alert("Please select the KYC type");

        }
//        }
    } catch (e) {
        alert("JS Logs(common.js):::::Exception in:::KYCTypes::::::::::" + e);
        console.log("JS Logs(common.js):::::Exception in:::KYCTypes::::::::::" + e);
    }

}
function  imageSize() {
    var image_Size = newFormMem.getImageSize();
    $("#imageSize").text(image_Size);
}
function clearSessVals() {
    setTimeout(function () {
        clearSessValsFun()
    }, 1000);
}

function clearSessValsFun() {
    try {
        var kycPage = newFormMem.getProperty('kycpageStatus');
        var ekycPage = newFormMem.getProperty('eKYCpageStatus');
        var eVISAPage = newFormMem.getProperty('eVISAForm1Status');
        newFormMem.setProperty('kycpageStatus', '');
        newFormMem.setProperty('eKYCpageStatus', '');
        newFormMem.setProperty('eVISAForm1Status', '');
        if (kycPage == 1 || ekycPage == 1 || eVISAPage == 1) {
        } else {
            setTimeout(function () {
                utilsObj.removeImages();

            }, 100);
            newFormMem.removeAttribute('kycFlowName');
            newFormMem.removeAttribute('kycDataEntryValues');
            newFormMem.removeAttribute('presentandpermcheckBox');
            newFormMem.removeAttribute('kycFullData');
            newFormMem.removeAttribute('kycpageStatus');
            newFormMem.removeAttribute('subs_details');
            newFormMem.removeAttribute('SubscriberAadhar');
            newFormMem.removeAttribute('ekycpageStatus');
            newFormMem.removeAttribute('ekycCaf1Formvalues');
            newFormMem.removeAttribute('eKYCpageStatus');
            newFormMem.removeAttribute('streVISAForm1Data');
            newFormMem.removeAttribute('passportType');
            newFormMem.removeAttribute('evisaCAFPageStatus');
            newFormMem.removeAttribute('evisaFormData');
            newFormMem.removeAttribute('eViseData');
            newFormMem.removeAttribute('poi_same_chk');
            newFormMem.removeAttribute('AMOUNT');
            newFormMem.removeAttribute('DISCOUNT');
            newFormMem.removeAttribute('discount_plan_select');
            newFormMem.removeAttribute('TAX');
            newFormMem.removeAttribute('TOTAL_AMT');
            newFormMem.removeAttribute('GSM_INFO');
            newFormMem.removeAttribute('issueFilePath');
            newFormMem.removeAttribute('DeviceSerialNumber');
            newFormMem.removeAttribute('DEVICE_SR_FLG');
        }
    } catch (e) {
//        utilsObj.writeLog("JS Logs(common.js):::::Exception in:::clearSessValsFun:::::::" + e);
    }
}

function callUPLoginURL() {
//    var obURL = "http://cymn.bsnl.co.in/cymn3/index.aspx";
//    var generateUniqueKey = utilsObj.generateUniqueKeyUPService();
    $.ajax({
        url: "caseManagement.do", //parameters go here in object literal form
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            var res = JSON.parse(JSON.stringify(data));

        }, error: function (data) {
            alert("error caseManagement, data :" + JSON.stringify(data));
        }

    });


}

function valAADHAARFun(event) {
    var target = event.getAttribute('id');
    var aadhaarVAL = $('#' + target).val();
    if (aadhaarVAL.length === 12) {
        if (validate(aadhaarVAL)) {
        } else {
            alert("Please enter valid aadhaar number");
            $('#' + target).val('');
            $('#' + target).focus();
        }
    } else if (aadhaarVAL.length === 16) {
    }else {
        alert("UID / VID number should be 12 or 16 digits");
        $('#' + target).val('');
        $('#' + target).focus();
    }
}





