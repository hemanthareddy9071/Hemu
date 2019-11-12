var numberReg = /^([789])([0-9])+$/;

function timeoutFMSSavedForm() {

    setTimeout(function () {
        loadUserName();
        SavedFormsData();
        loadMenuContentFun();
    }, 100);

}
function SavedFormsData() {
    //    alert("SavedFormsData()");



    //        var SavedFiles= JSON.parse('[{"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}, {"MobileNo":"04535355665"}]');

    var storedJobArray = JSON.parse(eval(FMS_CRSUplaodedForms.FMS_savedForms()));
    //        alert("jsonarray in uplaodFromData::::::::"+SavedFiles);
    var storedDataNextID = storedJobArray.length + 1;

    $("#FMS_toal_Stored_jobs").text(" (" + storedJobArray.length + ")");

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
                            CustomerName: {
                                type: "string"
                            },
                            CapturedDate: {
                                type: "string"
                            },
                            LastAttemptedDate: {
                                type: "string"
                            },
                            ConnectionType: {
                                type: "string"
                            },
                            FranchaiseeCode: {
                                type: "string"
                            },
                            AttemptedCount: {
                                type: "int"
                            },
                            UniqueKey: {
                                type: "int"
                            },
                            UserID: {
                                type: "int"
                            },
                            TempFolderName: {
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
                    field: "CustomerName",
                    title: "Customer Name",
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
                    field: "ConnectionType",
                    title: "Connection Type",
                    width: 130
                }, {
                    field: "AttemptedCount",
                    title: "Attempted Count",
                    width: 130
                }, {
                    field: "FranchaiseeCode",
                    title: "Franchaisee Code",
                    width: 190
                }, {
                    field: "UniqueKey",
                    title: "Unique Key",
                    width: 180
                }, {
                    field: "UserID",
                    title: "User ID",
                    width: 180
                },{
                    field: "TempFolderName",
                    title: "TempFolder Name",
                    hidden:true,
                    width: 180
                },
                {command: {text: "Retry", click: FMSretryJob},
                    title: "Action ", width: 180}
            ]
        });
    });

}
//stored job
function FMSretryJob(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
//     var SavedFiles = JSON.parse(eval(uploadedFormObj.savedForms()));
    newFormMem.setProperty("editKycFlag", "false");
    utilsObj.writeLog("block the Progress bar");

    $('#wait').show();
    setTimeout(function () {
        var result = FMSnewFormMem.FMSretryJob(dataItem.UniqueKey,dataItem.TempFolderName);
    }, 400);
//    alert("result:::::::::::::" + result)
    if (result == "true") {

        AlertMsg(msg);


    } else {
        AlertMsg(msg);
    }

}
function AlertMsg(msg)
{
    SavedFormsData();
    newFormMem.alert(msg);
    setTimeout(function () {
        $('#wait').hide();
        loadMenuContentFun();
    }, 100);
}






