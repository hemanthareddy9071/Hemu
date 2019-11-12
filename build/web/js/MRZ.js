/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function dataFromPassport(){
//    newFormMem.alert('woking');
    var reponse=MRZ.connectToDevice();
    if(reponse=='Fail'){
          utilsObj.writeLog("JS Log(login.js)::: " + newFormMem.getI18Message("evisa.mrz.failmsg"));
       newFormMem.alert(newFormMem.getI18Message("evisa.mrz.failmsg"));
    }else if(reponse=='NotConnected'){
         utilsObj.writeLog("JS Log(login.js)::: " + newFormMem.getI18Message("evisa.mrz.notconnect"));
        newFormMem.alert(newFormMem.getI18Message("evisa.mrz.notconnect"));
    }else if(reponse=='Connected'){
        utilsObj.writeLog("JS Log(login.js)::: Devcie Connected");
//        newFormMem.alert('data is geeting');
    }
}
