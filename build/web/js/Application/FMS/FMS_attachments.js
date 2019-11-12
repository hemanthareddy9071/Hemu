/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function browse(filename, ID) {

    browsefile.selectFile(filename, ID);
}
function browse1(filename, ID, Data) {

    browsefile.selectFile(filename, ID, Data);
}
function scanImage(filename, ID) {

    scan.load(filename, ID);

}

//var globradio = "";
//function visaOptionCheck(radioval) {
//    globradio = radioval;
//}
//function isValidate(nextPage) {
//    var radioVal = newFormMem.getProperty("passportType");
//    if (radioVal == 'Visa') {
//
//        window.location.href = nextPage;
//    } else {
//
//        if (cam.checkCaptureData()) {
//            window.location.href = nextPage;
//        } else {
//
//            newFormMem.alert(newFormMem.getI18Message("evisa.scandocuments"));
//        }
//    }
//}

//function loadeVisaDoc() {
//
//    setTimeout(function () {
//        loadUserName();
//        loadeVisaDocfun();
//        imageSize();
//    }, 1000);
//}

//function loadeVisaDocfun() {
//    cam.loadImage('CaptureScanDoc', 'eVisa_Scandocuments');
//}

//function fileCheck(e) {
//    //3-CSC ,4-DSC
//    //    if(newFormMem.getProperty('UserFlag').equals('3')){
//    //         window.location.href ="evisa_summary.html";
//    //    }else{
//    var eVisaPassPort = cam.fileExist("POI");
//
//    if (eVisaPassPort == "true") {
//        var eVisa = cam.fileExist("POA");
//
//        if (eVisa == "true") {
//            var eVisaPhotograph = cam.fileExist("SUBSCRIBER_PHOTO");
//
//            if (eVisaPhotograph == "true") {
//                var eVisaCAF = cam.fileExist("CAF");
//
//                if (eVisaCAF == "true") {
//
//                    window.location.href = "evisa_summary.html";
//                } else {
//                    newFormMem.alert(newFormMem.getI18Message("commons.attachments.cafdetails"));
//
//                    e.preventDefault();
//                }
//            } else {
//                newFormMem.alert(newFormMem.getI18Message("commons.attachments.photographdetails"));
//
//                e.preventDefault();
//            }
//        } else {
//            newFormMem.alert(newFormMem.getI18Message("commons.attachments.capture.visadetails"));
//
//            e.preventDefault();
//        }
//
//    } else {
//
//        newFormMem.alert(newFormMem.getI18Message("commons.attachments.capture.passportdetails"));
//
//        e.preventDefault();
//    }
////    }
//
//}
//function signatureCheck(e) {
//    var eVisaAgentSignature = cam.fileExist("Receipt Generation");
//    if (eVisaAgentSignature == "true") {
//        JobUpload.upload();
//        window.location.href = "index.html";
//    } else {
//        newFormMem.alert(newFormMem.getI18Message("commons.attachments.capture.signature"));
//        e.preventDefault();
//    }
//}
function attachmentsFileCheck(e) {
    //3-CSC ,4-DSC
    //    if(newFormMem.getProperty('UserFlag').equals('3')){
    //         window.location.href ="kyc_summary.html";
    //    }else{
    var eVisaPassPort = cam.fileExist("POI");
    var attachOptl = newFormMem.getProperty("FMS_ATTACHMENTS_OPTNL");
    utilsObj.writeLog('JS Log(FMS_attachments.js):::::::::::::::::::attachOptl:: ' + attachOptl);
    if (attachOptl === "TRUE") {//TRUE for optional
        window.location.href = "FMS_kyc_step4.html";
    } else {//FALSE for Mandatory
        if (eVisaPassPort == "true") {
            var eVisa = cam.fileExist("POA");
            if (newFormMem.isContainsKey("poi_same_chk")) {
                var booleanForSameAs = newFormMem.getProperty("poi_same_chk");
                if (booleanForSameAs === 'true') {
                    var eVisaPhotograph = cam.fileExist("SUBSCRIBER_PHOTO");
                    if (eVisaPhotograph == "true") {
                        var eVisaCAF = cam.fileExist("CAF");
                        if (eVisaCAF == "true") {
                            window.location.href = "FMS_kyc_step4.html";
                        } else {
                            newFormMem.alert(newFormMem.getI18Message("commons.attachments.cafdetails"));
                            e.preventDefault();
                        }
                    } else {
                        newFormMem.alert(newFormMem.getI18Message("commons.attachments.photographdetails"));
                        e.preventDefault();
                    }
                } else {
                    if (eVisa == "true") {
                        var eVisaPhotograph = cam.fileExist("SUBSCRIBER_PHOTO");
                        if (eVisaPhotograph == "true") {
                            var eVisaCAF = cam.fileExist("CAF");
                            if (eVisaCAF == "true") {
                                window.location.href = "FMS_kyc_step4.html";
                            } else {
                                newFormMem.alert(newFormMem.getI18Message("commons.attachments.cafdetails"));
                                e.preventDefault();
                            }
                        } else {
                            newFormMem.alert(newFormMem.getI18Message("commons.attachments.photographdetails"));
                            e.preventDefault();
                        }
                    } else {
                        newFormMem.alert(newFormMem.getI18Message("commons.attachmenst.capture.poadetails"));
                        e.preventDefault();
                    }
                }

            }else{
                
                utilsObj.writeLog("(FMS_attachments.js):::::::::::::poi_same_chk key is not found")
            }
        } else {
            newFormMem.alert(newFormMem.getI18Message("commons.attachments.capture.poidetails"));
            e.preventDefault();
        }
    }


}