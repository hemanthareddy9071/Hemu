
        function createChart1() {
            $("#chart_donut").kendoChart({
               /* title: {
                    text: "Total ticket raised - 16"
                },*/
                legend: {
                   position: "bottom"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "insideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    type: "donut",
                    data: [{
                        category: "Duplicate",
                        value: 35,
						color:'#f3c900'
                    }, {
                        category: "SOA",
                        value: 65,
						color: '#2372b8'
                    }, ]
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
            });
        }

        $(document).ready(function() {
            createChart1();
            $(document).bind("kendo:skinChange", createChart1);
            $(".box").bind("change", refresh);
        });

        function refresh() {
            var chart = $("#dchart").data("kendoChart"),
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
