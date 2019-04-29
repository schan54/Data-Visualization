const formatNum = d3.format(",d");
const widthBurst = 932;
const radiusBurst = widthBurst / 6;

const arcBurst = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radiusBurst * 1.5)
        .innerRadius(d => d.y0 * radiusBurst)
        .outerRadius(d => Math.max(d.y0 * radiusBurst, d.y1 * radiusBurst - 1));

const partition = data => {
    const root = d3.hierarchy(data)
            .sum(d => d.size)
            .sort((a, b) => b.value - a.value);
    return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
}

//const {require} = new observablehq.Library;
d3.select("#yearslider").on("input", function(){
    d3.select("#yeartxt").text("Year: " + this.value);
  });


const svgBurst = d3.select('#partitionSVG')
        .style("width", widthBurst)
        .style("height", "auto")
        .style("font", "10px sans-serif");

const g = svgBurst.append("g")
        .attr("transform", `translate(${widthBurst / 2},${widthBurst / 2})`);

d3.json('./energyusage.json').then(data => {
    
    const root = partition(data[0]);
    const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data[0].children.length + 1));

    root.each(d => d.current = d);

    const g = svgBurst.append("g")
            .attr("transform", `translate(${widthBurst / 2},${widthBurst / 2})`);

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

    /* hover over path to see values in the middle */
    path.on("mouseover", function(d){
        g.append("text")
            .attr("id", "midText")
            .text(formatNum(d.value))
            .style("font-size", "50")
    })
        .on("mouseout", function(d){
        g.select("#midText").remove();
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
    d3.select("#yearslider").on("change", function(){
        year = this.value - 1990;
        g.remove()
        updateSunBurst("./energyusage.json", year);
        
    });
    /* Zoom in Sunburst on click */
    function clicked(p) {
        parent.datum(p.parent || root);

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
function parseFile(file) {
    switch(file){
      case "consumption":
        d3.select("h1").text("Global Energy Consumption(Mtoe)");
        g.remove();
        updateSunBurst("./energyusage.json", 0);
        break;
      case "production":
        d3.select("h1").text("Energy Production");
        g.remove();
        updateSunBurst("../dataSets/energy/individualCreate/Total energy production.json", 0);
        break;
      case "crudeoil":
        d3.select("h1").text("Crude Oil Consumption");
        g.remove();
        updateSunBurst("../dataSets/energy/individualCreate/Crude oil input to refineries.json", 0);
        break;
      case "oilproducts":
        d3.select("h1").text("Oil Products Consumption");
        g.remove();
        updateSunBurst("../dataSets/energy/individualCreate/Oil products domestic consumpt.json", 0);
        break;
      case "production":
        d3.select("h1").text("Natural Gas Production");
        g.remove();
        updateSunBurst("../dataSets/energy/individualCreate/Natural gas production.json", 0);
        break;
      default:
        d3.select("h1").text("Global Energy Consumption(Mtoe)");
        g.remove();
        updateSunBurst("./energyusage.json", 0);
        break;
    }
  }
    function updateSunBurst(file, year){
        d3.json(file).then(data => {
    
            const root = partition(data[year]);
            const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data[year].children.length + 1));
        
            root.each(d => d.current = d);
            const g = svgBurst.append("g")
            .attr("transform", `translate(${widthBurst / 2},${widthBurst / 2})`);

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
        
            /* hover over path to see values in the middle */
            path.on("mouseover", function(d){
                g.append("text")
                    .attr("id", "midText")
                    .text(formatNum(d.value))
                    .style("font-size", "50")
            })
                .on("mouseout", function(d){
                g.select("#midText").remove();
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
            d3.select("#yearslider").on("change", function(){
                year = this.value - 1990;
                g.remove()
                updateSunBurst(file, year);
                    
            });
            /* Zoom in Sunburst on click */
            function clicked(p) {
                parent.datum(p.parent || root);
        
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
