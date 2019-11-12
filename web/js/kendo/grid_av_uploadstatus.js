		var sampleData = [
				{Name: "114071512261078", Bulkqty: "1", Starttime: "7/14/2015 12:24:19 PM", Endtime: "7/14/2015 12:25:11 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512261129", Bulkqty: "1", Starttime: "7/14/2015 01:05:22 PM", Endtime: "7/14/2015 01:06:12 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512264002", Bulkqty: "1", Starttime: "7/14/2015 01:24:32 PM", Endtime: "7/14/2015 01:25:14 PM", Status: "Completed", Successcount: "2", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512261655", Bulkqty: "2", Starttime: "7/14/2015 01:45:41 PM", Endtime: "7/14/2015 01:46:18 PM", Status: "Completed", Successcount: "0", Failure: "1", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512266904", Bulkqty: "1", Starttime: "7/14/2015 02:04:23 PM", Endtime: "7/14/2015 02:0521 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512263156", Bulkqty: "1", Starttime: "7/14/2015 02:15:21 PM", Endtime: "7/14/2015 02:16:45 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512267894", Bulkqty: "1", Starttime: "7/14/2015 02:18:45 PM", Endtime: "7/14/2015 02:19:35 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512264578", Bulkqty: "2", Starttime: "7/14/2015 02:32:43 PM", Endtime: "7/14/2015 02:33:25 PM", Status: "Completed", Successcount: "0", Failure: "1", Action: "<a href='#'>Log details</a>"},
				{Name: "114071512266542", Bulkqty: "1", Starttime: "7/14/2015 02:44:22 PM", Endtime: "7/14/2015 02:45:19 PM", Status: "Completed", Successcount: "1", Failure: "0", Action: "<a href='#'>Log details</a>"}
				];

                var sampleDataNextID = sampleData.length + 1;

                function getIndexById(id) {

                    var idx,
                    l = sampleData.length;

                    for (var j; j < l; j++) {
                        if (sampleData[j].ProductID == id) {
                            return j;
                        }
                    }
                    return null;
                }
                $(document).ready(function() {
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
                                newFormMem.alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        Bulkqty: { type: "string" },
                                        Starttime: { type: "string" },
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
                        columns: [ {
                                field: "Name",
                                title: "File ID",								
                                width: 200
                            }, {
                                field: "Bulkqty",
                                title: "Job count",
                                width: 140
                            }, {
                                field: "Starttime",
                                title: "Start time",
                                width: 190
                            }, {
                                field: "Endtime",
                                title: "End time",
                                width: 190
                            }, {
                                field: "Status",
                                title: "Status",
                                width: 130
                            }, {
                                field: "Successcount",
                                title: "Success count",
                                width: 170
                            }, {
                                field: "Failure",
                                title: "Failure count",
                                width: 160
                            },{
                                field: "Action",
								title: "Upload Status Results",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 220
                            }
                        ]
                    });
                });
				
				
			/*	$(function(){
						   var celleHtml = "";
	celleHtml = "<div class='actions'>";	
celleHtml += " <a data-toggle='modal' href='#divView'><i class='viewicon' title='View'></i></a> <a href='edit_user.html'><i class='editicon' title='Edit'></i></a> <a href='#'><i class='deleteicon' title='Delete'></i> </a>";	

	celleHtml += "</div>";	
						   $(".action").html(celleHtml);
						   
						   }); */