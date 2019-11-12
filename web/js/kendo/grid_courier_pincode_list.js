		var sampleData = [
				{Name: "DHL South Mumbai", ID: "96654461", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DHL East Mumbai", ID: "96654462", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DHL North Mumbai", ID: "96654463", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DHL West Mumbai", ID: "96654464", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "Blue Dart Central Mumbai", ID: "96654465", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "First Flight Mumbai", ID: "96654466", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "FedEx Mumbai", ID: "96654467", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DTDC Mumbai", ID: "96654468", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "TNT Mumbai", ID: "96654469", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "Gati Mumbai", ID: "96654470", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "Overnite Mumbai", ID: "96654471", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "Professional Mumbai", ID: "96654472", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "Aramex Mumbai", ID: "96654473", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DHL Mumbai", ID: "96654474", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				{Name: "DHL Mumbai", ID: "96654475", City: "Mumbai", Action: "<a title='Upload Pincode' class='btn btn-sm blue' data-toggle='modal' data-target='#divUpload'><i class='fa fa-upload'></i></a>"},
				
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
                            pageSize: 8,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
										 Action: { 
										type: "celleHtml"
										
										}
                                       
                                    }
                                }
                            }
                        },
   
                        height: 456,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ /*{ template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 70 }, */
								  {field: "ID",
                                title: "Code",
                            }, {field: "Name",
                                title: "Name",
                            },{field: "City",
                                title: "City",
                            },{
                                field: "Action",
								title: "Upload Pincodes",
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