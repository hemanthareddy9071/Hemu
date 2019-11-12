		var sampleData = [
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" },
				{ Barcode: "1523664572", AccountID: "369852", Mobile: "9876543210", InvoiceNo: "123456", InvoiceDate: "01-03-2016",  BillCycle : "Cycle 01", BillType: "SOA",  Name: "Abhishek", City: "Secunderabad",  Address: "A1, Vikrampuri, Secunderabad-500009" }
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
                        columns: [ { template: "<input type='checkbox'/> <label>&nbsp;</label>", width: 80 }, {
                                field: "Barcode",
                                title: "Barcode",
                                width: 150
                            }, {
                                field: "AccountID",
                                title: "Account ID",
                                width: 150
                            },{
                                field: "Mobile",
                                title: "Mobile No.",
                                width: 150
                            },{
                                field: "InvoiceNo",
                                title: "Invoice No.",
                                width: 150
                            },{
                                field: "InvoiceDate",
                                title: "Invoice date",
                                width: 170
                            },{
                                field: "BillCycle",
                                title: "Bill cycle",
                                width: 150
                            },{
                                field: "BillType",
                                title: "Bill type",
                                width: 150
                            },{
                                field: "Name",
                                title: "Name",
                                width: 150
                            },  {
                                field: "City",
                                title: "City",
                                width: 150
                            }, {
                                field: "Address",
                                title: "Address",
                                width: 270
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