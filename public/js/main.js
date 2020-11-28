$(function() {
    function formatRound(num) {
        return Math.round(num * 100) / 100;
    }

    var graph = new rrdFlotAsync("graph", null, null,
    {
        legend: {
            noColumns:3,
            sorted: "descending",
            position: "sw",
        },
        selection: {
            mode: "x"
        },
        lines: { 
            show: true,
            lineWidth: 1,
            fill: true
        },
        shadowSize: 0,
        grid: {
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#AAAAAA"
        },
        xaxis: {
            mode: "time",
            timezone: "GMT",
            minTickSize: [1, "minute"],
            timeBase: "milliseconds"
        }, 
        yaxis: { 
            autoscaleMargin: 0.20,
            tickFormatter: function(v) {
            return formatRound(v * 3600) + " /h";
            }
        },  
    },
    {
        deliver: {
            title: "Deliver",
            checked: true,
            color: "#44DD33",
            lines: { show: true, fill: 1 },
            stack: "positive"
        },
        reject: {
            title: "Rejected",
            checked: true,
            color: "#CC0000",
            lines: { show: true, fill: 1 },
            stack: "positive"
        },
        block: {
            title: "Blocked",
            checked: true,
            color: "#660000",
            lines: { show: true, fill: 1 },
            stack: "positive"
        },
        delivered: {
            title: "Delivered",
            checked: true,
            color: "#4499ff",
            lines: { show: true, fill: 1 },
            stack: "negative"
        },
        failed: {
            title: "Failed",
            checked: true,
            color: "#000000",
            lines: { show: true, fill: 1 },
            stack: "negative"
        }
    },
    {
        legend: "Bottom",
        graph_width: ($(window).width() - 20) + "px",
        graph_height: ($(window).height() - 25) + "px",
        graph_only: true,
        use_rra: false
    });

    var timeout;
    function update() {
        graph.rrdflot_defaults.graph_width = ($(window).width() - 20) + "px";
        graph.rrdflot_defaults.graph_height = ($(window).height() - 25) + "px";
        graph.reload("http://127.0.0.1:3000/rrd");
        timeout = setTimeout(update, 30000);
    }
    
    update();
    function resize() {
        clearTimeout(timeout);
        update();
    }

    $(window).on('resize', _.debounce(resize, 300));
  });