		var sampleData = [
				{Jobtitle: "0907201516264311727", Mobilenum: "<a href='ob_dedupe_details.html'>9899656681</a>", SIMnumber: "87325550845875645", OrderID: "56742", Dedupecount: "1", Executive: "", Failure: "0", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a> "},
				{Jobtitle: "0907201516264311726", Mobilenum: "<a href='ob_dedupe_details.html'>9899656680</a>", SIMnumber: "87325550845375644", OrderID: "74876", Dedupecount: "1", Executive: "", Failure: "0", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Jobtitle: "0907201516264311485", Mobilenum: "<a href='ob_dedupe_details.html'>9899656458</a>", SIMnumber: "87325550845867543", OrderID: "67858", Dedupecount: "2", Executive: "", Failure: "0", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Jobtitle: "0907201516264311727", Mobilenum: "<a href='ob_dedupe_details.html'>9899656487</a>", SIMnumber: "873255508458223253", OrderID: "86757", Dedupecount: "1", Executive: "", Failure: "1", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Jobtitle: "0907201516264311458", Mobilenum: "<a href='ob_dedupe_details.html'>9899656478</a>", SIMnumber: "873255508458265789", OrderID: "57464", Dedupecount: "1", Executive: "", Failure: "0", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"},
				{Jobtitle: "0907201516264311256", Mobilenum: "<a href='ob_dedupe_details.html'>9899656364</a>", SIMnumber: "873255508458242354", OrderID: "26390", Dedupecount: "1", Executive: "", Failure: "0", Action: "<a href='#'><i class='messsage_ic'  title='Comments'></i></a>  <a href='#'><i class='assignuser_ic'  title='Assign user'></i></a> <a href='#'><i class='removejob_ic' title='Remove priority'></i></a>"}
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
                                        Jobtitle: { type: "string" },
                                        Mobilenum: { type: "string" },
                                        SIMnumber: { type: "string" },
                                        Mobilenum: { 
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
                        columns: [
								    {
                                field: "Mobilenum",
                                title: "Mobile number",
								encoded: false,
                                width: 180
                            },
								  {
                                field: "Jobtitle",
                                title: "Job title",								
                                width: 200
                            }, {
                                field: "SIMnumber",
                                title: "SIM number",
                                width: 160
                            },{
                                field: "OrderID",
                                title: "Order ID",
                                width: 150
                            }, {
                                field: "Dedupecount",
                                title: "Dedupe count",
                                width: 150
                            }, {
                                field: "Executive",
                                title: "Executive",
                                width: 160
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