 function createChart() {
            $("#Piechart").kendoChart({
               
                legend: {  
                   position: "bottom"
                },
               /* seriesDefaults: {
                    labels: {
                        template: "#= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: false,
                        background: "transparent"
                    }
                },*/
                series: [{
                    type: "pie",
                    data: [{
                        category: "BC-01",
                        value: 45,
						color:"#ff2828"
                    }, {
                        category: "BC-02",
                        value: 30,
						color:"#4386c2"
                    }, {
                        category: "BC-03",
                        value: 25,
						color:"#f6d63d"
                    }]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # : #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function() {
            createChart();
            $(document).bind("kendo:skinChange", createChart);
            $(".box").bind("change", refresh);
        });

        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                pieSeries = chart.options.series[0],
                labels = $("#labels").prop("checked"),
                alignInputs = $("input[name='alignType']"),
                alignLabels = alignInputs.filter(":checked").val();

            chart.options.transitions = false;
            pieSeries.labels.visible = labels;
            pieSeries.labels.align = alignLabels;

            alignInputs.attr("disabled", !labels);

            chart.refresh();
        }