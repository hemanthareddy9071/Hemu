		var sampleData = [
				{Name: "Distributor 001"},
				{Name: "Distributor 002"},
				{Name: "Distributor 003"},
				{Name: "Distributor 004"},
				{Name: "Distributor 005"},
				{Name: "Distributor 006"},
				{Name: "Distributor 007"},
				{Name: "Distributor 008"},
				{Name: "Distributor 009"},
				{Name: "Distributor 010"},
				{Name: "Distributor 011"},
				{Name: "Distributor 012"},
				{Name: "Distributor 013"},
				{Name: "Distributor 014"},
				{Name: "Distributor 015"},
				
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
                            pageSize: 5,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" }
                                       
                                    }
                                }
                            }
                        },
   
                        height: 356,
                        sortable: true,
                        reorderable: true,
                        //groupable: true,
                        resizable: true,
                        filterable: true,
                        columnMenu: true,
                        pageable: true,
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 70 }, {
                                field: "Name",
                                title: "Distributor name",		
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