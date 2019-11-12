
var jsonArray = [];
var sampleDataObj = {};
var sampleData = {};

//function loadCSCUsers() {
//    setTimeout(function () {
//        loadUsers();
//    }, 50);
//}
//
//function loadUsers() {
//    var value = newFormMem.getProperty('UserFlag');
//    if (value == '5' || value == '6') {
//        var cscUserArrayList = JSON.parse(newFormMem.getProperty('CSCUSers'));
//        $(cscUserArrayList).each(function (index) {
//            $('#csc_user').append(new Option(cscUserArrayList[index].DD_VALUE, cscUserArrayList[index].DD_CODE));
//        }
//        );
//    }
//}

function loadPhyCAFPendingJobs1() {
    // CSC selection is not there Physical CAF submition for all users(3,4,5,6) as on 16_02_2017
//    var userType = "";

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.userType = '';
//    reqData.accountnumber = accountnumber;
//    reqData.simNumber = simNumber;
    $.ajax({
        url: "PendingPhyCAFData.do", //parameters go here in object literal form
        type: 'POST',
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        async: false,
        success: function (data) {
            sessionCheck(data);
            var objCYMN1 = JSON.parse(JSON.stringify(data));
//               alert(JSON.stringify(data));
            var objCYMN = objCYMN1.response.responseData;
//            alert(objCYMN.response.success);
            if (objCYMN1.response.success === "true" || objCYMN1.response.success === true) {
//                alert(objCYMN.STATUS);
                if (objCYMN.STATUS === '0') {
                    sampleData = objCYMN.PCAF_PJOBS;
//                    alert(sampleData.length);
                    jQuery.extend(true, pending_grid_data, sampleData);
                    $("#grid").data("kendoGrid").dataSource.data(sampleData);
                    $("#grid1").data("kendoGrid").dataSource.data([]);
                } else {
                    alert(objCYMN.MESSAGE);
                }
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid1").data("kendoGrid").dataSource.data([]);
//                 alert("success2");
                alert(objCYMN1.response.message);
            }
        }, error: function (data) {
            alert("errored occured while loadong data");
        }

    });

}

var sampleDataNextID = sampleData.length + 1;

function getIndexById(id) {

    var l = sampleData.length;

    for (var j = 0; j < l; j++) {
        if (sampleData[j].ProductID == id) {
            return j;
        }
    }
    return null;
}
$(document).ready(function () {
    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(sampleData);
                },
                create: function (e) {
                    e.data.ProductID = sampleDataNextID++;
                    sampleData.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    sampleData[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    sampleData.splice(getIndexById(e.data.ProductID), 1);
                    e.success();
                }
            },
            error: function (e) {
                // handle data operation error
                //                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
            },
            pageSize: 10,
            batch: false,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        CAF_NO: {
                            type: "string"
                        },
                        MobileNo: {
                            type: "string"
                        }

                    }
                }
            }
        },
        height: 365,
        sortable: true,
        reorderable: true,
        //groupable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        pageable: true,
        columns: [{
                template: "<input type='checkbox' onclick='selectRow(this)' id='#:CAF_NO#'/> <label>&nbsp;</label>",
                width: 80,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:15px'><input type='checkbox' id='checkAll' onclick='selectAll(this)'><label>&nbsp;</label></span>"
            }, {
                field: "CAF_NO",
                title: "CAF no.",
                width: 160
            }, {
                field: "MOBILE_NO",
                title: "Mobile no.",
                width: 160
            }
        ]
    });
});