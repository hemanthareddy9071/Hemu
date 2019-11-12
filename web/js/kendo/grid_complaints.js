var sampleData = [
{
    Name: "<a href='view_complaint.do'>114071512261078</a>", 
    Severity: "Urgent", 
    ReportingTime: "4/14/2016 12:24:19 PM",  
    Status: "<span class='btn btn-warning btn-sm'>Pending</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512261129</a>", 
    Severity: "High", 
    ReportingTime: "4/14/2016 01:05:22 PM",  
    Status: "<span class='btn btn-warning btn-sm'>Pending</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512264002</a>", 
    Severity: "Normal", 
    ReportingTime: "4/14/2016 01:24:32 PM", 
    Status: "<span class='btn btn-warning btn-sm'>Pending</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512261655</a>", 
    Severity: "Low", 
    ReportingTime: "4/14/2016 01:45:41 PM", 
    Status: "<span class='btn btn-success btn-sm'>Completed</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512266904</a>", 
    Severity: "Low", 
    ReportingTime: "4/14/2016 02:04:23 PM", 
    Status: "<span class='btn btn-success btn-sm'>Completed</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512263156</a>", 
    Severity: "Urgent", 
    ReportingTime: "4/14/2016 02:15:21 PM", 
    Status: "<span class='btn btn-success btn-sm'>Completed</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512267894</a>", 
    Severity: "High", 
    ReportingTime: "4/14/2016 02:18:45 PM", 
    Status: "<span class='btn btn-success btn-sm'>Completed</span>"
},
{
    Name: "<a href='view_complaint.do'>114071512264578</a>", 
    Severity: "High", 
    ReportingTime: "4/14/2016 02:32:43 PM", 
    Status: "<span class='btn btn-success btn-sm'>Completed</span>"
}
];

var gridNextID = gridData.length + 1;

function getIndexById(id) {

    var idx,
    l = gridData.length;

    for (var j; j < l; j++) {
        if (gridData[j].ProductID == id) {
            return j;
        }
    }
    return null;
}
var gridData=[];
function loadComplaints(rqData){
    var resp={};
    resp= loadComplaintList(rqData);
    if(resp.STATUS=='SUCCESS'){
        gridData= resp.Data;
        console.log(JSON.stringify(gridData));
    }else{
        alert(resp.MESSAGE);
        return false;
    }
    
    $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: function (e) {
                    e.success(gridData);
                },
                create: function (e) {
                    e.data.ProductID = gridNextID++;
                    gridData.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    gridData[getIndexById(e.data.ProductID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    gridData.splice(getIndexById(e.data.ProductID), 1);
                    e.success();
                }
            },
            error: function (e) {
                // handle data operation error
                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
            },
            pageSize: 10,
            batch: false,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        TICKET_ID: {
                            type: "celleHtml"
                        },
                        SEVERITY_LEVEL: {
                            type: "string"
                        },
                        REPORTING_TIME: {
                            type: "string"
                        },
                        Status: { 
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
            field: "TICKET_ID",
            title: "Ticket ID",								
            width: 170,
            encoded: false,
            template:"<a href='javascript:void(0);' onclick='viewTicket(this)'>#=TICKET_ID#</a>"
           
        }, {
            field: "SEVERITY_LEVEL",
            title: "Severity Level",
            width: 150
        }, {
            field: "REPORTING_TIME",
            title: "Reporting Time",
            width: 180
        },  {
            field: "Status",
            title: "Status",
            encoded: false,
            width: 130,
            template:'<span class="#= (STATUS === "2") ? "btn btn-success btn-sm" : (STATUS === "Completed") ? "btn btn-success btn-sm" : (STATUS === "Pending") ? "btn btn-warning btn-sm" : "btn btn-warning btn-sm" #">#: STATUS#</span>'
        }
        ]
    });
               		
			
}


function viewTicket(obj){
    try{
        var row = $(obj).closest("tr");
        var gridRowDate = $("#grid").data("kendoGrid");
        var rowdata = gridRowDate.dataItem(row);
        var TICKET_ID = rowdata.TICKET_ID;
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();                                                      
        reqData.TICKET_ID = TICKET_ID;  
//        alert(reqData.TICKET_ID);
        
        //        
        var reqData = {};
        reqData.reqSessionId = parent.$("#reqSessionId").val();
        reqData.TICKET_ID = TICKET_ID;  

        document.complaint.method = "post";
        document.complaint.action = "view_complaint.do";
        document.complaint.reqData.value = encrypt(JSON.stringify(reqData));
        document.complaint.submit();
    }catch(e){
        alert(e)
    }  
}