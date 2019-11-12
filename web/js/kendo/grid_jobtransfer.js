		var sampleData = [
				{Name: "Circle 01", Count: "1000000", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
				{Name: "Circle 02", Count: "2654200", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
				{Name: "Circle 03", Count: "3654220", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
				{Name: "Circle 04", Count: "9854600", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
				{Name: "Circle 05", Count: "6754820", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
				{Name: "Circle 06", Count: "9457226", Action: "<a href='#' class='primarybt1' data-toggle='modal' data-target='#jobTransfer'>Transfer</a> "},
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
                                        Name: { type: "string" },
                                        Count: { type: "string" },                                        
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
                                field: "Name",
                                title: "R4G State",								
                                width: 180
                            }, {
                                field: "Count",
                                title: "Available jobs",
                                width: 170
                            },{
                                field: "Action",
								encoded: false,
								attributes: {
      										"class": "action"
											},
                                width: 140
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