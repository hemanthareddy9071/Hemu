function createChartb() {
            $("#barchartb").kendoChart({
                
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar"
                },
                series: [{
                    name: "Total Visits",
                    data: [56000, 63000, 74000, 91000, 117000, 138000],
					color:"#ff2828"
                }, {
                    name: "Unique visitors",
                    data: [52000, 34000, 23000, 48000, 67000, 83000],
					color:"#4386c2"
                }],
                valueAxis: {
                    max: 140000,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: ["BC-01", "BC-02", "BC-03", "BC-04", "BC-05", "BC-06"],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }

        $(document).ready(createChartb);
        $(document).bind("kendo:skinChange", createChartb);