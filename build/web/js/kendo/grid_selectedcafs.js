var sampleData1 = [];

function submitPhyCAFs() {
    var userType = '';
    var submitPhyCAFData = {};
//        alert(selected_grid_data.length);
    if (selected_grid_data.length > 0) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.selected_grid_data = selected_grid_data;
        reqData.userType = '';
//        alert()
        $.ajax({
            url: "submitPhyCAFsData.do", //parameters go here in object literal form
            type: 'POST',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            async: false,
            success: function (data) {
                sessionCheck(data);
                var objCYMN1 = JSON.parse(JSON.stringify(data));
//                alert("1234 ::::::::::"+JSON.stringify(data));
                var objCYMN = objCYMN1.response.responseData;
//                alert(JSON.stringify(objCYMN));
                if (objCYMN1.response.success === "true" || objCYMN1.response.success === true) {
//                    alert(objCYMN.STATUS);
                    if (objCYMN.STATUS === '0') {
                        alert(objCYMN.MESSAGE);
                        $("#grid1").data("kendoGrid").dataSource.data([]);
                        selected_grid_data = [];
                        document.getElementById("checkAll1").checked = false;
                        loadPhyCAFPendingJobs1()
                    } else {
                        alert(objCYMN.MESSAGE);
                    }
                } else {
//                    document.getElementById("checkAll1").checked = false;
//                    $("#grid1").data("kendoGrid").dataSource.data([]);
//                    selected_grid_data = [];
//                    loadPhyCAFPendingJobs1()
                    alert(objCYMN1.response.message);
                }

            }, error: function (data) {
                alert("errored occured while loading data");
////            newFormMem.alert(cafDataObj.MESSAGE);

            }

        });
    } else {
        alert("Please Select CAF data");
    }

//    }, 15);

}

var sampleData1NextID = sampleData1.length + 1;

function getIndexById(id) {

    var l = sampleData1.length;

    for (var j = 0; j < l; j++) {
        if (sampleData1[j].ProductID == id) {
            return j;
        }
    }
    return null;
}
$(document).ready(function () {
    $("#grid1").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(sampleData1);
                },
                create: function (e) {
                    e.data.ProductID = sampleData1NextID++;
                    sampleData1.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    sampleData1[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    sampleData1.splice(getIndexById(e.data.ProductID), 1);
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
                        CAFno: {
                            type: "string"
                        },
                        MobileNo: {
                            type: "string"
                        },
                        Starttime: {
                            type: "string"
                        },
                        Action: {
                            type: "celleHtml"

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
                template: "<input type='checkbox' onclick='selectRow1(this)' id='#:CAF_NO#'/> <label>&nbsp;</label>",
                width: 80,
                title: "<span class='k-checkbox headCb' role='presentation' style='margin-left:15px'><input type='checkbox' id='checkAll1' onclick='selectAll1(this)'><label>&nbsp;</label></span>"
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