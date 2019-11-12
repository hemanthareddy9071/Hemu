try {
    var sampleData2 = {};
    var jsonArray = [];
    var sampleDataObj = {};

    function getPhyCAFSubmittedJobs() {
//          setTimeout(function () {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.userType = '';
        $.ajax({
            url: "PhysicalSubmittedData.do", //parameters go here in object literal form
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
                        sampleData2 = objCYMN.PCAF_SJOBS;
                        $("#grid2").data("kendoGrid").dataSource.data(sampleData2);
                    } else {
                        alert(objCYMN.MESSAGE);
                        
                    }
                } else {
//                 alert("success2");
                    alert(objCYMN1.response.message);
                }
            }, error: function (data) {
                alert("errored occured while loadong data");
            }

        });

//    }, 15);



//        jsonArray = physicalCAFs.getPhyCAFSubmittedJobs(userType);
//        sampleDataObj = JSON.parse(eval(jsonArray));
//        sampleData2 = sampleDataObj["PCAF_SJOBS"];
//        $("#grid2").data("kendoGrid").dataSource.data(sampleData2);

//            var userType=document.getElementById("csc_user").value;
//            var userTypeProp=newFormMem.getI18Message("physical_cafs.selectId.message");
//            if(userType==userTypeProp){
//                sampleData2={};
//                $("#grid2").data("kendoGrid").dataSource.data([]);
//                alert(newFormMem.getI18Message("physical_cafs.selectCSCUser.message"));
//            }else{
//                jsonArray = physicalCAFs.getPhyCAFSubmittedJobs(userType);
//                sampleDataObj=JSON.parse(eval(jsonArray));
//                sampleData2=sampleDataObj["PCAF_SJOBS"];    
//                $("#grid2").data("kendoGrid").dataSource.data(sampleData2);
//            }
//        }, 100);
    }

    function removeSubmitedCAFs(instanceId) {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.instanceId = instanceId;
        $.ajax({
            url: "removeJobPhyCAFSubmittedData.do", //parameters go here in object literal form
            type: 'POST',
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            async: false,
            success: function (data) {
                sessionCheck(data);
                var objCYMN1 = JSON.parse(JSON.stringify(data));
//                alert(JSON.stringify(data));
                var objCYMN = objCYMN1.response.responseData;
//            alert(objCYMN.response.success);
                if (objCYMN1.response.success === "true" || objCYMN1.response.success === true) {
//                alert(objCYMN.STATUS);
                    if (objCYMN.STATUS === '0') {
//                        sampleData2 = objCYMN1.response.responseData.PCAF_PJOBS;
//                        sampleDataObj = JSON.parse(eval(jsonArray));
                        alert(objCYMN.MESSAGE);
                        $("#grid2").data("kendoGrid").dataSource.data([]);
                        getPhyCAFSubmittedJobs();
                    } else {
                        alert(objCYMN.MESSAGE);
                    }
                } else {
//                 alert("success2");
                    alert(objCYMN1.response.message);
                }
            }, error: function (data) {
                alert("errored occured while loadong data");
            }

        });
//        jsonArray = physicalCAFs.removeJobFromPhyCAFSubmitted(instanceId);
//        sampleDataObj = JSON.parse(eval(jsonArray));
//        $("#grid2").data("kendoGrid").dataSource.data([]);
//        getPhyCAFSubmittedJobs();
    }

    var sampleData2NextID = sampleData2.length + 1;

    function getIndexById(id) {

        var l = sampleData2.length;

        for (var j = 0; j < l; j++) {
            if (sampleData2[j].ProductID == id) {
                return j;
            }
        }
        return null;
    }
    $(document).ready(function () {
        try {
            $("#grid2").kendoGrid({
                dataSource: {
                    transport: {
                        read: function (e) {
                            e.success(sampleData2);
                        },
                        create: function (e) {
                            e.data.ProductID = sampleData2NextID++;
                            sampleData2.push(e.data);
                            e.success(e.data);
                        },
                        update: function (e) {
                            sampleData2[getIndexById(e.data.ProductID)] = e.data;
                            e.success();
                        },
                        destroy: function (e) {
                            sampleData2.splice(getIndexById(e.data.ProductID), 1);
                            e.success();
                        }
                    },
                    error: function (e) {
                        // handle data operation error
                        //                        alert("Status: " + e.status + "; Error message: " + e.errorThrown);
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
                        field: "CAF_NO",
                        title: "CAF no."
                                //width: 160
                    }, {
                        field: "MOBILE_NO",
                        title: "Mobile no."
                                //width: 160
                    }, {
                        //field: "Action",
                        template: "<div class='cancelbt'><a href='javascript:void(0);' title='Remove' onclick=\"removeSubmitedCAFs('#:INSTANCE_ID#');\"=><i class='remove'></i></a></div>",
                        title: "Actions",
                        encoded: false,
                        attributes: {
                            "class": "action"
                        },
                        width: 220
                    }
                ]
            });
        } catch (e) {
            //            alert("in submit"+e);
        }
    });

} catch (e) {
//alert("in submit"+e);
}