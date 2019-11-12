function timeoutfmsUploadForms() {
    parent.$("#wait").show();
    FMSUploadJobsGrid();
}

var FMSuploadJobArray = [];
var FMSuploadJobobj = {};
function FMSUploadJobsGrid() {

    try {
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        $.ajax({
            url: "fmsuploadedJobs.do", //parameters go here in object literal form
            type: 'POST',
            async: false,
            data: {"reqData": encrypt(JSON.stringify(reqData))},
            success: function (data) {
                sessionCheck(data);
                var resJson = JSON.parse(JSON.stringify(data));
//                alert(JSON.stringify(data));
                if (resJson.response.success === "true" || resJson.response.success === true) {
                    FMSuploadJobobj = resJson.response.responseData;
                    FMSuploadJobArray = FMSuploadJobobj.UPLOADED_JOBS;
//                    alert(FMSuploadJobArray);
                    parent.$("#wait").hide();

                    $('#grid').show();
//                    FMSuploadJobArray = FMSuploadJobobj.UPLOADED_JOBS;
                    var FMSuploadDataNextID = FMSuploadJobArray.length + 1;
                    function getIndexById(id) {
                        var length = FMSuploadJobArray.length;
                        for (var j; j < length; j++) {
                            if (FMSuploadJobArray[j].ProductID === id) {
                                return j;
                            }
                        }
                        return null;
                    }
                    var columnDataLoading = FMSuploadJobobj.gridColumnArray;
                    var fieldModel = FMSuploadJobobj.gridFieldObj;
                    $(document).ready(function () {
                        $("#grid").kendoGrid({
                            dataSource: {
                                transport: {
                                    read: function (e) {
                                        e.success(FMSuploadJobArray);
                                    },
                                    create: function (e) {
                                        e.data.ProductID = FMSuploadDataNextID++;
                                        FMSuploadJobArray.push(e.data);
                                        e.success(e.data);
                                    },
                                    update: function (e) {
                                        FMSuploadJobArray[getIndexById(e.data.ProductID)] = e.data;
                                        e.success();
                                    },
                                    destroy: function (e) {
                                        FMSuploadJobArray.splice(getIndexById(e.data.ProductID), 1);
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
                                        fields: fieldModel
                                    }
                                }
                            },
                            height: 440,
                            sortable: false,
                            reorderable: true,
                            //groupable: true,
                            resizable: true,
                            filterable: false,
                            columnMenu: false,
                            pageable: true,
                            columns: columnDataLoading
                        });
                    });



                } else {
                    alert(resJson.response.message);
                    parent.$("#wait").hide();
                    $("#cust_Name_id").val("");
                    FMSuploadJobArray = [];
                    $('#grid').hide();

                }
            }, error: function (data) {
                parent.$("#wait").hide();
                alert("error : uploadForms" + JSON.stringify(data));
            }

        });


    } catch (e) {
        alert("(grid_landline_uploaded_jobs.js)Exception in FMSUploadJobsGrid " + e);
    }
}
function custNameSearch() {
    var customer_Name = $("#cust_Name_id").val();
    if (customer_Name.toString().trim().length != 0) {
        var selecteditem = $('#cust_Name_id').val();
        var kgrid = $("#grid").data("kendoGrid");
        selecteditem = selecteditem.toUpperCase();
        var selectedArray = selecteditem.split(" ");
        if (selecteditem) {
//            alert("true");
            var orfilter = {
                logic: "or",
                filters: []
            };
            var andfilter = {
                logic: "and",
                filters: []
            };
            $.each(selectedArray, function (i, v) {
                if (v.trim() == "") {
                } else {
                    $.each(selectedArray, function (i, v1) {
                        if (v1.trim() == "") {
                        } else {
                            orfilter.filters.push({
                                field: "Customer_Name",
                                operator: "contains",
                                value: v1
                            },
                                    {
                                        field: "Customer_Name",
                                        operator: "eq",
                                        value: v1
                                    }
                            );
                            andfilter.filters.push(orfilter);
                            orfilter = {
                                logic: "or",
                                filters: []
                            };
                        }

                    });
                }
            });
//            alert(JSON.stringify(andfilter));
            kgrid.dataSource.filter(andfilter);
            if(kgrid.dataSource.total()===0 || kgrid.dataSource.total()==='0'){
                alert("Customer details are not available");
                $('#grid').hide();
                $("#cust_Name_id").val('');
            }
            
        } else {
            kgrid.dataSource.filter({});
        }
    } else {
        FMSUploadJobsGrid();
//        $('#grid').hide();
    }
}
