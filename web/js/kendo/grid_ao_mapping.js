		var sampleData = [
				{AO: "AO 001", Distributor: "Distributor 001", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 001", Distributor: "Distributor 002", MapedDate: "21-10-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 001", Distributor: "Distributor 003", MapedDate: "07-02-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 001", Distributor: "Distributor 004", MapedDate: "17-05-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 001", Distributor: "Distributor 005", MapedDate: "15-10-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 002", Distributor: "Distributor 006", MapedDate: "09-06-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 002", Distributor: "Distributor 007", MapedDate: "24-08-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 003", Distributor: "Distributor 008", MapedDate: "14-10-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 003", Distributor: "Distributor 009", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 003", Distributor: "Distributor 010", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 003", Distributor: "Distributor 011", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 004", Distributor: "Distributor 012", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{AO: "AO 004", Distributor: "Distributor 013", MapedDate: "12-11-2015",  Action: "<a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
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
                                newFormMem.alert("Category: " + e.Category + "; Error message: " + e.errorThrown);
                            },
                            pageSize: 10,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        Name: { type: "string" },
                                        Mobilenum: { type: "string" },
                                        Cafnum: { type: "string" },
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
                                field: "AO",
                                title: "AO name",								
                                width: 180
                            }, {
                                field: "Distributor",
                                title: "Distributor name",
                                width: 170
                            }, {
                                field: "MapedDate",
                                title: "Maped date",
                                width: 150
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