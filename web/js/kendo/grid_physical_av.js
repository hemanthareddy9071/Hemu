		var sampleData = [
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543210</a>", Name: "Abhishek", City: "Secunderabad", OrderID: "56742", Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543211</a>", Name: "RamaRaju", City: "Hyderabad", OrderID: "64750", Address: "85/C, VengalaRao Nagar, Hyderabad-500038" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543212</a>", Name: "Sri Vani", City: "Hyderabad", OrderID: "66351", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543213</a>", Name: "Raghu", City: "Hyderabad", OrderID: "75468", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543214</a>", Name: "Mohan", City: "Hyderabad", OrderID: "26541", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543215</a>", Name: "Ram", City: "Hyderabad", OrderID: "12365", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543216</a>", Name: "Vivek", City: "Hyderabad", OrderID: "67548", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543217</a>", Name: "Ramesh", City: "Hyderabad", OrderID: "24567", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543218</a>", Name: "Pratap", City: "Hyderabad", OrderID: "36547", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543219</a>", Name: "Naga", City: "Hyderabad", OrderID: "86424", Address: "H1, Ram Nagar, Hyderabad-500021" },
				{ Mobile: "<a href='#' data-toggle='modal' data-target='#divPAV'>9876543220</a>", Name: "Gopal", City: "Hyderabad", OrderID: "76542", Address: "H1, Ram Nagar, Hyderabad-500021" },
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
                                        Mobile: { type: "string" },
                                        Name: { type: "string" },                                        
                                       
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
                                field: "Mobile",
                                title: "Mobile No.",
								encoded: false,
                                width: 200
                            }, {
                                field: "Name",
                                title: "Customer Name",
                                width: 200
                            },  {
                                field: "City",
                                title: "City",
                                width: 180
                            }, {
                                field: "OrderID",
                                title: "Order ID",
                                width: 180
                            }, {
                                field: "Address",
                                title: "Address",
                                //width: 170
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