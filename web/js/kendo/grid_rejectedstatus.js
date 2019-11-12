//var sampleData = [
//{Name: "<a href='kycRejectedCaf.html'>114071512261078</a>", Bulkqty: "9999999999", Starttime: "Reason1", Endtime: "4/14/2016 12:25:11 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='kycRejectedCaf.html'><i class='edit' title='Edit'></i></a>"},
//{Name: "114071512261129", Bulkqty: "9999999999", Starttime: "Reason2", Endtime: "4/14/2016 01:06:12 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a data-toggle='modal' href='#divResubmit'><i class='resubmit' title='Resubmit'></i></a>"},
//{Name: "114071512264002", Bulkqty: "9999999999", Starttime: "Reason3", Endtime: "4/14/2016 01:25:14 PM", Status: "Completed", Successcount: "2", Failure: "0", Action: "<a data-toggle='modal' href='#divResubmit'><i class='resubmit' title='Resubmit'></i></a>"},
//{Name: "<a href='caf1.html'>114071512261655</a>", Bulkqty: "9999999999", Starttime: "Reason4", Endtime: "4/14/2016 01:46:18 PM", Status: "Completed", Successcount: "0", Failure: "1", Action: "<a href='caf1.html'><i class='edit' title='Edit'></i></a>"},
//{Name: "114071512266904", Bulkqty: "9999999999", Starttime: "Reason5", Endtime: "4/14/2016 02:0521 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='upload_print_status.html'><i class='resubmit' title='Resubmit'></i></a>"},
//{Name: "<a href='caf1.html'>114071512263156</a>", Bulkqty: "9999999999", Starttime: "Reason6", Endtime: "4/14/2016 02:16:45 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='caf1.html'><i class='edit'></i></a>"},
//{Name: "114071512267894", Bulkqty: "9999999999", Starttime: "Reason7", Endtime: "4/14/2016 02:19:35 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a data-toggle='modal' href='#divResubmit'><i class='resubmit' title='Resubmit'></i></a>"},
//{Name: "<a href='caf1.html'>114071512264578</a>", Bulkqty: "9999999999", Starttime: "Reason8", Endtime: "4/14/2016 02:33:25 PM", Status: "Completed", Successcount: "0", Failure: "1", Action: "<a href='caf1.html'><i class='edit' title='Edit'></i></a>"},
//{Name: "<a href='caf1.html'>114071512266542</a>", Bulkqty: "9999999999", Starttime: "Reason9", Endtime: "4/14/2016 02:45:19 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='caf1.html'><i class='edit' title='Edit'></i></a>"}
//];

var rejectedJobArray = [];
var workOrderObj = {};
var workOrderArr = [];
var rejectedWorkOrderArr = [];

var workorderId = 0;
var eventId = 0;
var userFlag = 0;

function timeoutRejectedjobs() {

//    setTimeout(function () {
//        loadUserName();
    var loginResp = JSON.parse($("#loginResponse").val());
    userFlag = loginResp.UserFlag;

    //get value for rejpageStatus, 1 is dummy value
    var rejpageStatus = "1";// newFormMem.getValue("rejPageStatus");
    if (userFlag == 5) {
        $('#frwo_grid').show();
        try {
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            $.ajax({
                url: "loadRejectedWorkOrder.do",
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},

                success: function (data) {
                    sessionCheck(data);
                    rejectedWorkOrderArr = data.response.responseData
                }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
                }
            });
            $("#row_Num").text(rejectedWorkOrderArr.length + " Rows");
            if (rejectedWorkOrderArr.length == 0) {
                alert("No Jobs Available in Rejected jobs");
            }
            for (var i = 0; i < rejectedWorkOrderArr.length; i++) {
                workOrderObj = {};
                workOrderObj.name = rejectedWorkOrderArr[i];
                workOrderArr.push(workOrderObj);
            }

                var dataSource = new kendo.data.DataSource({
//        data: [{name:"1009182"}, {name:"1009186"}, {name:"1009187"}, {name:"1009188"}, {name:"1009190"}, {name:"1009191"}, {name:"1009192"}]
                data: workOrderArr
            });
            var searchDivContent = '';
            var i = 0;
            $(workOrderArr).each(function () {
                i = i + 1;
                searchDivContent += '<a onclick=changeName(this.innerHTML,this.id) id="listbg' + i + '" class="list-group-item">' + this.name + '</a>'
//                    searchDivContent += '<a href="#" class="list-group-item" onClick=setPinAndMobile(this.innerHTML)>' + this.SIM_NO + '</a>'

            });
            $("#listView").html(searchDivContent);
            document.getElementById('listView').style.display = 'block';

            if (rejpageStatus == "1") {
                setTimeout(function () {
                    console.log("rejpageStatus 1 setTimeout");

//                    var workorderId = newFormMem.getProperty("workorderId");
                    console.log("workorderId  " + workorderId + "   eventId  " + eventId)
                    var name = workorderId;
                    var flowname = parseInt(name);
                    var clickevent = eventId;//newFormMem.getProperty("eventId");
                    changeName(flowname, clickevent);
                }, 100);
            }

            dataSource.read();
            $("#listView").css({"cursor": "pointer"});
            rejectedJobs();
        } catch (e) {
            alert(e);
        }
    } else if (userFlag == 6) {
        $('#retailer_Grid').show();
        rejectedJobs();
    } else {
        console.log("wthoutfr_Grid")
        $('#wthoutfr_Grid').show();
        rejectedJobs();
    }
//    newFormMem.setProperty("rejPageStatus", "0");
    rejpageStatus = "";
//    }, 1000);
}

function editCAF(obj) {


    console.log("editCAF ");
    var row = $(obj).closest("tr");
    var gridRowDate = $("#grid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    var rejectionType = rowdata.REJECTED_TYPE;
    instanceid = rowdata.INSTANCE_ID;
    mobileNo = rowdata.GSM_NUMBER;
    instanceid = rowdata.INSTANCE_ID;
    cafno = rowdata.CAF_NO;


    if (rejectionType === 'PENDING') {
        $("#divResubmit").modal('hide');

//        newFormMem.setProperty("INSTANCE_ID", instanceid);
//        newFormMem.setProperty("GSM_NUMBER", mobileNo);
//        newFormMem.setProperty("CAF_NO", cafno);

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.INSTANCE_ID = instanceid;
        reqData.GSM_NUMBER = mobileNo;
        reqData.CAF_NO = cafno;
        var status = "";//newFormMem.editJobs(instanceid, cafno);

        $.ajax({
            url: "editJobs.do",
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},

            success: function (data) {
                sessionCheck(data);
//                rejectedWorkOrderArr = data.response.responseData
                status = data.response.responseData.flag;
            }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
            }
        });
        if (status == true) {
            window.location.href = "kycRejectedCaf.html"
        }
    } else {
        $("#divResubmit").modal('show');
    }
}

var instanceid = '';
var cafno = '';
var mobileNo = '';
function editCAFGrid(obj) {

    console.log("editCAFGrid  ")

    var row = $(obj).closest("tr");
    var gridRowDate = $("#workOrderGrid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    var rejectionType = rowdata.REJECTED_TYPE;
    instanceid = rowdata.INSTANCE_ID;
    mobileNo = rowdata.GSM_NUMBER;
    instanceid = rowdata.INSTANCE_ID;
    cafno = rowdata.CAF_NO;


//    console.log(rejectionType)


    if (rejectionType === 'PENDING') {
        $("#divResubmit").modal('hide');


//        newFormMem.setProperty("INSTANCE_ID", instanceid);
//        newFormMem.setProperty("GSM_NUMBER", mobileNo);
//        newFormMem.setProperty("CAF_NO", cafno);
        var reqData = {};


        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.INSTANCE_ID = instanceid;
        reqData.GSM_NUMBER = mobileNo;
        reqData.CAF_NO = cafno;
        reqData.KYCType = "KYC";
        reqData.KYCJob = "RESUBMITJOB";


        var status = "";
        $.ajax({
            url: "editJobs.do",
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                sessionCheck(data);
                var d = JSON.parse(JSON.stringify(data));
                status = d.response.responseData.flag;
            }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
            }
        });
        if (status == true) {
            window.location.href = "kycRejectedCaf.do"
        }
    } else {
        $("#divResubmit").modal('show');
    }
}

$("#search-button").click(function () { //search the work order in listview

    var searchTerm = $("#searchTerm").val();
    var listView = $("#listView").data("kendoListView");
    listView.dataSource.filter({field: "name", operator: "contains", value: searchTerm});
    listView.dataSource.read();
});
//   
function changeName(name, event) {
  

    try {
        workorderId = name;
        eventId = event;
//        newFormMem.setProperty("workorderId", name);
//        newFormMem.setProperty("eventId", event);

        var i = 0;
        $(workOrderArr).each(function () {
            i = i + 1;
            document.getElementById('listbg' + i).className = "list-group-item";
        });


        $('#' + event).addClass("blueClass");
        var workOrder = parseInt(name);

        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.workOrder = workOrder;
        $.ajax({
            url: "loadRejectedWO.do",
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                sessionCheck(data);
                var d = JSON.parse(JSON.stringify(data));
                rejectedJobArray = d.response.responseData;
            }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
            }
        });
//        rejectedJobArray = JSON.parse(eval(uploadedFormObj.loadRejectedWO(workOrder)));
        if (rejectedJobArray.length == 0) {
            alert("No Jobs in the Grid");
        }
        rejectedJobs();
    } catch (e) {
//        alert(e);
    }

}

function refresh() {     // refreshes the list view
    var listView = $("#listView").data("kendoListView");
    listView.refresh();

}
function rejectedJobs() {
    try {

        console.log("rejectedJobs userFlag  " + userFlag)

//         userFlag = newFormMem.getValue("UserFlag");
        if (userFlag != 5) {
            var reqData = {};
            reqData.reqSessionId = parent.$("#reqSessionId").val();
            $.ajax({
                url: "rejectedJobs.do",
                type: 'POST',
                async: false,
                data: {"reqData": encrypt(JSON.stringify(reqData))},
                success: function (data) {
                    sessionCheck(data);
                    var d = JSON.parse(JSON.stringify(data));
                    rejectedJobArray = d.response.responseData;
                }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
                }
            });






//            rejectedJobArray = JSON.parse(eval(uploadedFormObj.rejectedJobs()));

        }

//    var jsonArray = JSON.stringify(uploadedFormObj.rejectedJobs());
        var sampleDataNextID = rejectedJobArray.length + 1;
        var rejected_type = rejectedJobArray[0].REJECTED_TYPE;



        function getIndexById(id) {

            var rejectedJobArray_len = rejectedJobArray.length;
            for (var rejected_data = 0; rejected_data < rejectedJobArray_len; rejected_data++) {
                if (rejectedJobArray[rejected_data].ProductID == id) {
                    return rejected_data;
                }
            }
            return null;
        }
    } catch (e) {
//        alert(e);
    }

    $(document).ready(function () {

        $("#retailerGrid").kendoGrid({

            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(rejectedJobArray);
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

                        fields: {

                            INSTANCE_ID: {
                                type: "string"
                            },
                            CAF_NO: {
                                type: "String"
                            },
                            GSM_NUMBER: {
                                type: "String"
                            },
                            REJECT_REASONS: {
                                type: "String"
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
                    field: "REJECT_REASONS",
                    title: "Reject Reasons",
                    width: 190
                },
                {
                    field: "REJECTED_TYPE",
                    title: "REJECTED_TYPE",
                    width: 190,
                    hidden: true
                }
            ]
        });



        $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(rejectedJobArray);
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

                        fields: {

                            INSTANCE_ID: {
                                type: "string"
                            },
                            CAF_NO: {
                                type: "String"
                            },
                            GSM_NUMBER: {
                                type: "String"
                            },
                            REJECT_REASONS: {
                                type: "String"
                            },
                            Actions: {
                                type: "celleHtml"
//
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
                    field: "REJECT_REASONS",
                    title: "Reject Reasons",
                    width: 190
                },
                {
                    field: "REJECTED_TYPE",
                    title: "REJECTED_TYPE",
                    width: 190,
                    hidden: true
                },
                {
                    headerAttributes: {
                        style: "padding: 10px 30px;"
//                        style: "padding: 10px 30px;"
                    },
                    command: [
                        {
                            template: "<div class='action'><a href='javascript:void(0);' title='Resubmit' onclick='editCAF(this)'><i class='resubmit' id='resubmitId'></i></a></div>"
                        },
                        {
                            template: "<div class='action'><a href='javascript:void(0);' title='Edit' onclick='editCAF(this)'><i class='edit' id='editId'></i ></a></div>"
                        }
                    ]
                    ,

                    title: "<font color='black'> Actions</font>",
                    width: 250

                }


            ],
            dataBound: function () {
                var grid = this;
                grid.tbody.find("tr").each(function (e) {
                    var model = grid.dataItem(this);
                    if (model.REJECTED_TYPE == 'PENDING') {
                        $(this).find("#resubmitId").hide();
                        $(this).find("#editId").show();
                    } else if (model.REJECTED_TYPE == 'HOLD') {
                        $(this).find("#editId").hide();
                        $(this).find("#resubmitId").show();
                    }
                });
            }
        });

        $("#workOrderGrid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(rejectedJobArray);
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

                        fields: {

                            INSTANCE_ID: {
                                type: "string"
                            },
                            CAF_NO: {
                                type: "String"
                            },
                            GSM_NUMBER: {
                                type: "String"
                            },
                            REJECT_REASONS: {
                                type: "String"
                            },
                            Actions: {
                                type: "celleHtml"
//
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
                    field: "REJECT_REASONS",
                    title: "Reject Reasons",
                    width: 190
                },
                {
                    field: "REJECTED_TYPE",
                    title: "REJECTED_TYPE",
                    width: 190,
                    hidden: true
                },
                {
                    headerAttributes: {
                        style: "padding: 10px 30px;"
//                        style: "padding: 10px 30px;"
                    },
                    command: [
                        {
                            template: "<div class='action'><a href='javascript:void(0);' title='Resubmit' onclick='editCAFGrid(this)'><i class='resubmit' id='resubmitId'></i></a>&nbsp;&nbsp;<a href='javascript:void(0);' title='Delete' onclick='delCaf(this)'><i class='deleteic' id='resubmitdeleteId'></i></a></div>"
                        },
                        {
                            template: "<div class='action'><a href='javascript:void(0);' title='Edit' onclick='editCAFGrid(this)'><i class='edit' id='editId'></i ></a>&nbsp;&nbsp;<a href='javascript:void(0);' title='Delete' onclick='delCaf(this)'><i class='deleteic1' id='deleteId'></i></a></div>"
//                            template: "<div class='action'><a href='javascript:void(0);' title='Edit' class='btn btn-sm btn-danger' onclick='editCAFGrid(this)'><i class='fa fa-times' id='editId'></i></a></div>"
                        }
                    ]
                    ,
                    title: "<font color='black'> Actions</font>",
                    width: 250

                }


            ],
            dataBound: function () {
                var grid = this;
                grid.tbody.find("tr").each(function (e) {
                    var model = grid.dataItem(this);
                    if (model.REJECTED_TYPE == 'PENDING') {
                        $(this).find("#resubmitId").hide();
                        $(this).find("#editId").show();
                        $(this).find("#resubmitdeleteId").hide();
                        $(this).find("#deleteId").show();
                    } else if (model.REJECTED_TYPE == 'HOLD') {//HOLD
                        $(this).find("#editId").hide();
                        $(this).find("#deleteId").hide();
                        $(this).find("#resubmitId").show();
                        $(this).find("#resubmitdeleteId").show();
                    }
                });
            }
        });

    });
}


var delCafObj = {};
function delCaf(obj) {
    delCafObj = obj;
    $('#DelCafConfirmation_div').modal('show');
}

function deleteCaf() {

    var row = $(delCafObj).closest("tr");
    var gridRowDate = $("#grid").data("kendoGrid");
    var rowdata = gridRowDate.dataItem(row);
    instanceid = rowdata.INSTANCE_ID;
    mobileNo = rowdata.GSM_NUMBER;
    instanceid = rowdata.INSTANCE_ID;
    cafno = rowdata.CAF_NO;




//    newFormMem.setProperty("INSTANCE_ID", instanceid);
//    newFormMem.setProperty("GSM_NUMBER", mobileNo);
//    newFormMem.setProperty("CAF_NO", cafno);

    var reqData = {};
    reqData.reqSessionId = parent.$("#reqSessionId").val();

    reqData.instanceid = instanceid;
    reqData.GSM_NUMBER = mobileNo;
    reqData.cafno = cafno;
    reqData.workorderId = workorderId;

    var status = "";
    $.ajax({
        url: "deleteCAF.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            sessionCheck(data);
            var d = JSON.parse(JSON.stringify(data));
            status = d.response.responseData.status;
            alert(d.response.responseData.message);
        }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
        }
    });

    if (status == "Success") {
        rejPageStatus = "1";
        window.location.href = "rejectedJobspage.do";
    } else {
        rejPageStatus = "1";
        window.location.href = "rejectedJobspage.do";
    }
    delCafObj = {};
}

function cancelDelCaf() {
    $('#DelCafConfirmation_div').modal('hide');
}

function reSubmitJob() {
    console.log('reSubmitJob  ')
    var resubmitStatus = "";//newFormMem.resubmitJob(instanceid, cafno);
    var reqData = {};
    console.log("instanceid  " + instanceid + "  cafno  " + cafno);

    reqData.reqSessionId = parent.$("#reqSessionId").val();
    reqData.instanceid = instanceid;
    reqData.cafno = cafno;

    $.ajax({
        url: "resubmitJob.do",
        type: 'POST',
        async: false,
        data: {"reqData": encrypt(JSON.stringify(reqData))},
        success: function (data) {
            sessionCheck(data);
            var d = JSON.parse(JSON.stringify(data));
            resubmitStatus = d.response.responseData.RESUBMIT_STATUS;
        }, error: function (data) {
//                    alert("error : change password "+JSON.stringify(data));
        }
    });


    if (resubmitStatus === "Success") {
        rejectedJobs();
    }
    instanceid = '';
    cafno = '';
}
function reSubCancel() {
    instanceid = '';
    cafno = '';
}