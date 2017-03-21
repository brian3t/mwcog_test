function initialize() {
    console.info("Commute log begins");
}

function init_copy_from_web() {

    // google.charts.load("current", {packages:["corechart"]});
    // load version 43: frozen
    google.charts.load('43', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Commute Mode', '% Used'],
            ['Transit: 0%', 0], ['Carpool: 0%', 0], ['Vanpool: 0%', 0],
            ['Bike: 0%', 0], ['Walk: 0%', 0], ['Telework: 0%', 0]
        ]);

        var options = {
            chartArea: {left: 0, top: 0, width: '100%', height: '80%'},
            title: '',
            pieSliceText: 'none',
            legend: 'bottom',
            pieHole: 0.6,
            slices: {
                1: {color: '#99cc99'},
                2: {color: '#bcbecf'},
                3: {color: '#dddddd'},
                4: {color: '#8588a6'},
                5: {color: '#e1e1ea'},

            },
            pieSliceTextStyle: {
                color: '#000000',
                fontName: 'Open Sans, Roboto, Arial',
                fontSize: 12,
                bold: true
            },
            tooltip: {
                text: 'value',
                showColorCode: true
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('travelmode_chart'));
        chart.draw(data, options);
    }

    $(window).resize(function () {
        drawChart();
    });
}
function goto_search() {
    jQuery.mobile.navigate('/search.html');
    setTimeout(function () {
        window.location.href = "search.html";
    }, 500);
}
