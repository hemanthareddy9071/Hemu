		var sampleData = [
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "9899656681", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "9630125478", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "9874563254", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "8523697410", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "7410236589", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "7532014896", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "8569741023", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "87412369850", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "9874563210", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "9512364780", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"},
				{TransactionID: "0907201516264311727", SRCmobile: "9899656681", Msisdn: "7845632109", Name: "Amit", Fathername: "Ramanath", Address: "72/C, Madhuranagar", POINo: "SOX0396465", ReplyCnt: "5", Type: "Matches"}
				
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
                            pageSize: 9,
                            batch: false,
                            schema: {
                                model: {
                                    id: "ProductID",
                                    fields: {
                                        TransactionID: { type: "string" },
                                        SRCmobile: { type: "string" },
                                        Msisdn: { type: "string" },
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
                                field: "TransactionID",
                                title: "Transaction ID",								
                                width: 180
                            }, {
                                field: "SRCmobile",
                                title: "SRC mobile",
                                width: 160
                            }, {
                                field: "Msisdn",
                                title: "Msisdn",
                                width: 150
                            }, {
                                field: "Name",
                                title: "Name",
                                width: 150
                            }, {
                                field: "Fathername",
                                title: "Father name",
                                width: 160
                            }, {
                                field: "Address",
                                title: "Address",
                                width: 200
                            }, {
                                field: "POINo",
                                title: "POI No",
                                width: 150
                            }, {
                                field: "ReplyCnt",
                                title: "Reply Cnt",
                                width: 150
                            }, {
                                field: "Type",
                                title: "Type",
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