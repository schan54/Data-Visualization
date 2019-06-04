
const formatNum = d3.format(",d");
const widthBurst = 1300;
const radiusBurst = widthBurst / 9;

/* Create arcs */
const arcBurst = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radiusBurst * 1.5)
        .innerRadius(d => d.y0 * radiusBurst)
        .outerRadius(d => Math.max(d.y0 * radiusBurst, d.y1 * radiusBurst - 1));

/* Partition Data */
const partition = data => {
    const root = d3.hierarchy(data)
            .sum(d => d.size)
            .sort((a, b) => b.value - a.value);
    return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
}


/* SVG Container */
const svgBurst = d3.select('#partitionSVG')
        .style("top", "-150px")
        .style("width", "auto")
        .style("height", "auto")
        .style("font", "10px sans-serif");

/* Lines */
svgBurst.append("line").attr("x1", 205).attr("y1", 0).attr("x2", 205).attr("y2", 1400).attr("stroke-width", 1).attr("stroke", "black");
svgBurst.append("line").attr("x1", 1100).attr("y1", 200).attr("x2", 1100).attr("y2", 1400).attr("stroke-width", 1).attr("stroke", "black");
svgBurst.append("line").attr("x1", 0).attr("y1", 200).attr("x2", 1400).attr("y2", 200).attr("stroke-width", 1).attr("stroke", "black");

/* Append base for visualization */
const g = svgBurst.append("g")
        .attr("transform", `translate(${widthBurst / 2},${widthBurst / 2})`);

// Change year as you slide
d3.select("#yearslider").on("input", function(){
    d3.select("#yeartxt").text("Year: " + this.value);
  });

d3.json('./energyusage.json').then(data => {

    const root = partition(data[0]);
    const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data[0].children.length + 1));

    root.each(d => d.current = d);
    /*  Draw Sun Burst */
    const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => {
                while (d.depth > 1)
                    d = d.parent;
                return color(d.data.name);
            })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("d", d => arcBurst(d.current));

    /* add all values in data */
    var total = 0;
    path.each(d => {total = total + Number(d.data.size); })
    
    /* hover over path to see values in the middle */
    path.on("mouseover", function(d){
        var percentage = (Number(d.value) / total) * 100
        g.append("text")
            .attr("class", "midText")
            .attr("dy", "0.5em")
            .text(d.name)
            .style("font-size", "50");
        g.append("text")
            .attr("class", "midText")
            .text(formatNum(d.value))
            .style("font-size", "50");
        g.append("text")
            .attr("class", "midText")
            .attr("dy", "1.5em")
            .text(percentage.toFixed(2)+"%")
            .style("font-size", "35px");
    })
        .on("mouseout", function(d){
        g.selectAll(".midText").remove();
    })

    /* clicking on each path zooms in */
    path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

    /* hover over path for more info */
    path.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${formatNum(d.value)}`);

    /* decide labels on path */
    const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .text(d => d.data.name);

    /* white circle in middle */
    const parent = g.append("circle")
            .datum(root)
            .attr("r", radiusBurst)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

    /* change sunburst based on years */
    d3.select("#yearslider").on("change", function(){
        year = this.value - 1990;
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyusage.json", year);
        
    });
        /* Compare years*/
    d3.select("#compare").on("click", function(){
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyusage.json", "compare"); 
    });
    d3.select("#isolate").on("click", function(){
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyusage.json", 0); 
    });

    /* Search By Country Name */
    d3.select("#searchSubmit").on("click", function(){
        var name = d3.select("#searchText").node().value;
        var hide = false;
        path.each(d => {
            if (d.data.name == name){
                hide = true;
                d3.select("#searchErr")
                  .style("visibility", "hidden");
                return clicked(d);
            }
        });        
        if (hide == false){
        d3.select("#searchErr")
            .style("visibility", "visible");
        }
    });
    document.getElementById("searchText").addEventListener("keydown", function(event){
        if (event.keyCode == 13){
            event.preventDefault();
            var name = d3.select("#searchText").node().value;
            var hide = false;
            path.each(d => {
                if (d.data.name == name){
                    hide = true;
                    d3.select("#searchErr")
                      .style("visibility", "hidden");
                    return clicked(d);
                }
            });        
            if (hide == false){
            d3.select("#searchErr")
                .style("visibility", "visible");
            }
        }
    });
    /* Display data on a table */
    var tableIndex = 0;
    path.each(function(d){
        if(d.depth == 1){
            tableIndex++;
            var row = d3.select("#burstTable").select("tbody").append("tr");
            row.append("td")
                    .text(tableIndex + ". " + d.data.name);
            row.append("td")
                    .text(Number(d.value).toFixed(2));
        }
    });
    /* Zoom in Sunburst on click */
    function clicked(p) {
        parent.datum(p.parent || root);
        /* Displays where you are when you clicked and transition */
        g.select('#clickText').remove();
        if (p.data.name != root.data.name){
            g.append("text")
                .attr("id", "clickText")
                .attr("x", "-250px")
                .attr("y", "-350px")
                    .text(p.data.name)
                    .style("font-size", "50");
        }
        root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });
        const t = g.transition().duration(750);
            
        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
                .tween("data", d => {
                
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function (d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attrTween("d", d => () => arcBurst(d.current));

        label.filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
    }

});

/* Swtich between files to look at different datasets */
function parseFile(file) {
    switch(file){
      case "consumption":
        d3.select("h1").text("Global Energy Consumption(Mtoe)");
        g.selectAll("g").transition().remove();
        d3.select("#yearslider").attr("value", 1990);
        updateSunBurst("./energyusage.json", 0);
        break;
      case "production":
        d3.select("h1").text("Energy Production");
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyData/individualCreate/Total energy production.json", 0);
        break;
      case "crudeoil":
        d3.select("h1").text("Crude Oil Consumption");
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyData/individualCreate/Crude oil input to refineries.json", 0);
        break;
      case "oilproducts":
        d3.select("h1").text("Oil Products Consumption");
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyData/individualCreate/Oil products domestic consumpt.json", 0);
        break;
      case "naturalgas":
        d3.select("h1").text("Natural Gas Production");
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyData/individualCreate/Natural gas production.json", 0);
        break;
      default:
        d3.select("h1").text("Global Energy Consumption(Mtoe)");
        g.selectAll("g").transition().remove();
        updateSunBurst("./energyusage.json", 0);
        break;
    }
}
/* Same function but its for updating , takes in file and year */
function updateSunBurst(file, year){
    d3.json(file).then(data => {
        var datas = data[year];
        if ( year == "compare")
        {
            datas = {name:"compare", children: data};
        }
        const root = partition(datas);
        const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, datas.children.length + 1));
    
        root.each(d => d.current = d);
        /* draw Sunburst */
        const path = g.append("g")
                .selectAll("path")
                .data(root.descendants().slice(1))
                .join("path")
                .attr("fill", d => {
                    while (d.depth > 1)
                        d = d.parent;
                    return color(d.data.name);
                })
                .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("d", d => arcBurst(d.current));
    
        /* add all values */
        var total = 0;
        path.each(d => { total = total + Number(d.data.size); })
        
        /* hover over path to see values in the middle */
        path.on("mouseover", function(d){
            var percentage = (Number(d.value) / total) * 100
            g.append("text")
                .attr("class", "midText")
                .attr("dy", "0.5em")
                .text(d.name)
                .style("font-size", "50");
            g.append("text")
                .attr("class", "midText")
                .text(formatNum(d.value))
                .style("font-size", "50");
            g.append("text")
                .attr("class", "midText")
                .attr("dy", "1.5em")
                .text(percentage.toFixed(2)+"%")
                .style("font-size", "35px");
        })
            .on("mouseout", function(d){
            g.selectAll(".midText").remove();
        })
        /* clicking on each path zooms in */
        path.filter(d => d.children)
                .style("cursor", "pointer")
                .on("click", clicked);
    
        /* hover over path for more info */
        path.append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${formatNum(d.value)}`);
    
        /* decide labels on path */
        const label = g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1))
                .join("text")
                .attr("dy", "0.35em")
                .attr("fill-opacity", d => +labelVisible(d.current))
                .attr("transform", d => labelTransform(d.current))
                .text(d => d.data.name);
        /* white circle in middle */
        const parent = g.append("circle")
                .datum(root)
                .attr("r", radiusBurst)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("click", clicked);
    
        /* change sunburst based on years */
        d3.select("#yearslider").on("change", function(){
            year = this.value - 1990;
            g.selectAll("g").transition().remove();
            updateSunBurst(file, year);
            
        });
                /* Compare years*/
        d3.select("#compare").on("click", function(){
            g.remove();
            updateSunBurst(file, "compare"); 
        });git
        d3.select("#isolate").on("click", function(){
            g.remove();
            updateSunBurst(file, 0); 
        });
        /* Search By Country Name */
        d3.select("#searchSubmit").on("click", function(){
            var name = d3.select("#searchText").node().value;
            var hide = false;
            path.each(d => {
                if (d.data.name == name){
                    hide = true;
                    d3.select("#searchErr")
                        .style("visibility", "hidden");
                    return clicked(d);
                }
            });        
            if (hide == false){
            d3.select("#searchErr")
                .style("visibility", "visible");
            }
        });
        document.getElementById("searchText").addEventListener("keydown", function(event){
            if (event.keyCode == 13){
                event.preventDefault();
                var name = d3.select("#searchText").node().value;
                var hide = false;
                path.each(d => {
                    if (d.data.name == name){
                        hide = true;
                        d3.select("#searchErr")
                            .style("visibility", "hidden");
                        return clicked(d);
                    }
                });        
                if (hide == false){
                d3.select("#searchErr")
                    .style("visibility", "visible");
                }
            }
        });
        /* Display data on a table */
        d3.select("#burstTable").select("tbody").selectAll("tr").remove();
        var tableIndex = 0;
        path.each(function(d){
            if(d.depth == 1){
                tableIndex++;
                var row = d3.select("#burstTable").select("tbody").append("tr");
                row.append("td")
                        .text(tableIndex + ". " + d.data.name);
                row.append("td")
                        .text(Number(d.value).toFixed(2));
            }
        });
        /* Zoom in Sunburst on click */
        function clicked(p) {
            parent.datum(p.parent || root);
            /* Displays where you are when you clicked and transition */
            g.select('#clickText').remove();
            if (p.data.name != root.data.name){
                g.append("text")
                    .attr("id", "clickText")
                    .attr("x", "-250px")
                    .attr("y", "-350px")
                        .text(p.data.name)
                        .style("font-size", "50")
                        .style("text-align", "left");
            }
            root.each(d => d.target = {
                    x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    y0: Math.max(0, d.y0 - p.depth),
                    y1: Math.max(0, d.y1 - p.depth)
                });
    
            const t = g.transition().duration(750);
    
            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                    .tween("data", d => {
                        const i = d3.interpolate(d.current, d.target);
                        return t => d.current = i(t);
                    })
                    .filter(function (d) {
                        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                    })
                    .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                    .attrTween("d", d => () => arcBurst(d.current));
    
            label.filter(function (d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                    .attr("fill-opacity", d => +labelVisible(d.target))
                    .attrTween("transform", d => () => labelTransform(d.current));
        }
    
    });
}

/* Decide whether arc fits on sunburst */
function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
}
/* Decides wheter label fits in path */
function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
}
/* position of label */
function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radiusBurst;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

