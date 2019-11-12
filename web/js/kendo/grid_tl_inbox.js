		var sampleData = [
				{Name: "0907201516264311727", Mobilenum: "9899656681", Cafnum: "T1047223569", Nationality: "Indian", State:"AP", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{Name: "0907201516264311726", Mobilenum: "9899656680", Cafnum: "H104756238", Nationality: "Indian", State:"TN", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311485", Mobilenum: "9899656458", Cafnum: "G745178945", Nationality: "Indian", State:"MP", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311727", Mobilenum: "9899656487", Cafnum: "A741578944", Nationality: "Indian", State:"UP", Category: "", Executive: "", Failure: "1", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311458", Mobilenum: "9899656478", Cafnum: "G104756238", Nationality: "Indian", State:"WB", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311256", Mobilenum: "9899656364", Cafnum: "A784562146", Nationality: "Indian", State:"DH", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311785", Mobilenum: "9899656425", Cafnum: "J876637799", Nationality: "Indian", State:"RJ", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "0907201516264311658", Mobilenum: "9899656659", Cafnum: "J876637699", Nationality: "Indian", State:"JK", Category: "", Executive: "", Failure: "1", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Name: "090720151626431569", Mobilenum: "9899656325", Cafnum: "J876637499", Nationality: "Indian", State:"TG", Category: "", Executive: "", Failure: "0", Action: "<a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"}
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
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 70 }, {
                                field: "Name",
                                title: "Job title",								
                                width: 180
                            }, {
                                field: "Mobilenum",
                                title: "Mobile number",
                                width: 170
                            }, {
                                field: "Cafnum",
                                title: "CAF number",
                                width: 150
                            }, {
                                field: "Nationality",
                                title: "Nationality",
                                width: 150
                            }, {
                                field: "State",
                                title: "State",
                                width: 125
                            }, {
                                field: "Category",
                                title: "Category",
                                width: 135
                            }, {
                                field: "Executive",
                                title: "Executive",
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