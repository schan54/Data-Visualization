var widthBurst = 960,
    heightBurst = 700,
    radiusBurst = (Math.min(widthBurst, heightBurst) / 2) - 10;
var formatNumberBurst = d3v3.format(",d");
var xBurst = d3v3.scale.linear()
    .range([0, 2 * Math.PI]);
var yBurst = d3v3.scale.sqrt()
    .range([0, radiusBurst]);
var colorBurst = d3v3.scale.category20c();
var partitionBurst = d3v3.layout.partition()
    .value(function(d) { return d.size; });
var arcBurst = d3v3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xBurst(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xBurst(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, yBurst(d.y)); })
    .outerRadius(function(d) { return Math.max(0, yBurst(d.y + d.dy)); });

var svgBurst = d3v3.select("body").append("svg")
    .attr("width", widthBurst)
    .attr("height", heightBurst)
  .append("g")
    .attr("transform", "translate(" + widthBurst / 2 + "," + (heightBurst / 2) + ")");
var tooltipBurst = d3v3.select("body").append("div")
    .attr("id", "toolTip")
    .style("opacity", 0);

// change File based on selection
function parseFile(file) {
  switch(file){
    case "consumption":
      d3v3.select("h1").text("Global Energy Consumption(Mtoe)");
      inputData("./energyusage.json");
      break;
    case "production":
      d3v3.select("h1").text("Energy Production");
      inputData("../dataSets/energy/individualCreate/Total energy production.json");
      break;
    case "crudeoil":
      d3v3.select("h1").text("Crude Oil Consumption");
      inputData("../dataSets/energy/individualCreate/Crude oil input to refineries.json");
      break;
    case "oilproducts":
      d3v3.select("h1").text("Oil Products Consumption");
      inputData("../dataSets/energy/individualCreate/Oil products domestic consumpt.json");
      break;
    case "production":
      d3v3.select("h1").text("Natural Gas Production");
      inputData("../dataSets/energy/individualCreate/Natural gas production.json");
      break;
    default:
      d3v3.select("h1").text("Global Energy Consumption(Mtoe)");
      inputData("./energyusage.json");
      break;
  }
}

parseFile("consumption");


function inputData(file){
  d3v3.select("#yeartxt").text("Year: " + 1990);
  document.getElementById("yearslider").value = "1990";
  d3v3.json(file, function(error, root) {

    if (error) throw error;
    var year = 0;
    var path = svgBurst.selectAll("path");
    svgBurst.select("g").selectAll("path").data(data).exit().remove();
    var data = path.data(partitionBurst.nodes(root[year]));

    drawSunburst(path,root[year]);
    // Change graph based on slider
    d3v3.select("#yearslider").on("input", function(){
      d3v3.select("#yeartxt").text("Year: " + this.value);
    });

    d3v3.select("#yearslider").on("change", function(){
      year = this.value - 1990;
      drawSunburst(path,root[year]);

    });
  });
  }
  // create the SunBurst and tooltips
function drawSunburst(path, root){

  path
      .data(partitionBurst.nodes(root))
    .enter().append("path")
      .attr("d", arcBurst)
      .style("fill", function(d) { return colorBurst(d.name); })
      .on("click", click)
    // .append("title")
    //   .text(function(d) { return d.name + "\n" + formatNumber(d.size); })

    .on("mouseover", function(d){
        tooltipBurst.html(d.name + "\n" + formatNumberBurst(d.size))
        .style("opacity", .9)
                .style("left", (d3v3.event.pageX) + "px")
                .style("top", (d3v3.event.pageY) + "px");
      })
    .on("mouseout", function(d){
      tooltipBurst.style("opacity", 0);
    });

// Clicking on Sunburst transitions and zooms in
}
function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3v3.interpolate(xBurst.domain(), [d.x, d.x + d.dx]),
            yd = d3v3.interpolate(yBurst.domain(), [d.y, 1]),
            yr = d3v3.interpolate(yBurst.range(), [d.y ? 20 : 0, radiusBurst]);
        return function(t) { xBurst.domain(xd(t)); yBurst.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arcBurst(d); }; });
}
d3v3.select(self.frameElement).style("height", heightBurst + "px");
