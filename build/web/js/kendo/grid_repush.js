		var sampleData = [
				{ OrderStatus: "CRM", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673215", MISDN: "9876543210", AlternativeNumber: "9638527410", CAFNumber: "6543219871", CustomerStatus: "Individual", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673216", MISDN: "9876543211", AlternativeNumber: "8963214750", CAFNumber: "6543219872", CustomerStatus: "Outstation", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "CRM", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673217", MISDN: "9876543212", AlternativeNumber: "7896321450", CAFNumber: "6543219873", CustomerStatus: "Individual", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673218", MISDN: "9876543213", AlternativeNumber: "7410258963", CAFNumber: "6543219874", CustomerStatus: "Foreigner", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673219", MISDN: "9876543214", AlternativeNumber: "7536984120", CAFNumber: "6543219875", CustomerStatus: "Individual", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673220", MISDN: "9876543215", AlternativeNumber: "8741023659", CAFNumber: "6543219876", CustomerStatus: "Foreigner", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "CRM", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673221", MISDN: "9876543216", AlternativeNumber: "8520147963", CAFNumber: "6543219877", CustomerStatus: "Foreigner", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "CRM", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673222", MISDN: "9876543217", AlternativeNumber: "9654781230", CAFNumber: "6543219878", CustomerStatus: "Outstation", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673223", MISDN: "9876543218", AlternativeNumber: "9510236478", CAFNumber: "6543219879", CustomerStatus: "Individual", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "Dedupe", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673224", MISDN: "9876543219", AlternativeNumber: "7541203689", CAFNumber: "6543219880", CustomerStatus: "Foreigner", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				{ OrderStatus: "CRM", FailedDate: "03/04/2016 12:24:19 PM", ORN: "1254673225", MISDN: "9876543220", AlternativeNumber: "9856471203", CAFNumber: "6543219881", CustomerStatus: "Outstation", ReasonCode: "Reason 1",  Action: "<a href='#' class='confirmation btn btn-sm btn-success' title='Reprocess '><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></a> "},
				
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
                                alert("Category: " + e.Category + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        OrderStatus: { type: "string" },
                                        FailedDate: { type: "string" },                                        
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
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 70 },{
                                field: "OrderStatus",
                                title: "Order stage",								
                                width: 160
                            }, {
                                field: "FailedDate",
                                title: "Order failed date",
                                width: 200
                            },{
                                field: "ORN",
                                title: "ORN",
                                width: 150
                            },{
                                field: "MISDN",
                                title: "MISDN",
                                width: 150
                            },{
                                field: "AlternativeNumber",
                                title: "Alternative number",
                                width: 200
                            },{
                                field: "CAFNumber",
                                title: "CAF number",
                                width: 160
                            },{
                                field: "CustomerStatus",
                                title: "Customer status",
                                width: 200
                            },{
                                field: "ReasonCode",
                                title: "Reason for failure",
                                width: 200
                            },{
                                field: "Action",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 120
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