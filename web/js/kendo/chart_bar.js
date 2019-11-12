
         function createChart() {
            $("#dchart").kendoChart({
                title: {
                    //text: "Gross domestic product growth /GDP annual %/"
                },
				 height:'400px',
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [{
                    name: "Printer 1",
                    data: [3000, 7943, 5848],
					color:"#FF0000",
                }, {
                    name: "Printer 2",
                    data: [4743, 7295, 7175],
					color:"#2372b8",
                }],
                valueAxis: {
                    labels: {
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                categoryAxis: {
                    categories: ['Completed', 'Pending', 'Dispatched'],
                    line: {
                        visible: false
                    },
                    labels: {
						format: " "
                        //padding: {top: 135}
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}",
                    template: "#= series.name #: #= value #"
                }
            });
        }

$(document).ready(createChart);
        //$(document).bind("kendo:skinChange", createChart);