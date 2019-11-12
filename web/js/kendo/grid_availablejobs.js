		var sampleData = [
				{Mobilenum: "9899656681", Cafnum: "T104723569", Name: "Mohan", Category: "Individual"},
				{Mobilenum: "9899656680", Cafnum: "H104756238", Name: "Intense", Category: "Outstation"},
				{Mobilenum: "9899656458", Cafnum: "G745178945", Name: "Jim", Category: "Foreign national"},
				{Mobilenum: "9899656487", Cafnum: "A741578944", Name: "Nag", Category: "Individual"},
				{Mobilenum: "9899656478", Cafnum: "G104756238", Name: "InfoTech", Category: "Outstation"},
				{Mobilenum: "9899656364", Cafnum: "A784562146", Name: "MediCore", Category: "Outstation"},
				{Mobilenum: "9899656425", Cafnum: "J876637799", Name: "Rosey", Category: "Foreign national"},
				{Mobilenum: "9899656659", Cafnum: "J876637699", Name: "Mandy", Category: "Foreign national"},
				{Mobilenum: "9899656325", Cafnum: "J876637499", Name: "Raja", Category: "Individual"},
				{Mobilenum: "9899656635", Cafnum: "J876637600", Name: "MySoft", Category: "Outstation"},
				{Mobilenum: "9899656315", Cafnum: "J876637415", Name: "Santosh", Category: "Individual"}
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
                                        Mobilenum: { type: "string" },
                                        Cafnum: { type: "string" }									
										
                                    }
                                }
                            }
                        },
   
                        height: 495,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [{
                                field: "Mobilenum",
                                title: "Mobile number",
                                width: 170
                            },{
                                field: "Cafnum",
                                title: "CAF number",
                                width: 150
                            },{
                                field: "Name",
                                title: "Customer name",
                                width: 150
                            },{
                                field: "Category",
                                title: "Customer category",
                                width: 150
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