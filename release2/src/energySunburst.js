var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;
var formatNumber = d3v3.format(",d");
var x = d3v3.scale.linear()
    .range([0, 2 * Math.PI]);
var y = d3v3.scale.sqrt()
    .range([0, radius]);
var color = d3v3.scale.category20c();
var partition = d3v3.layout.partition()
    .value(function(d) { return d.size; });
var arc = d3v3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var svg = d3v3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
var tooltip = d3v3.select("body").append("div")
    .attr("id", "toolTip")
    .style("opacity", 0);
parseFile("consumption");

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
function inputData(file){
  d3v3.select("#yeartxt").text("Year: " + 1990);
  document.getElementById("yearslider").value = "1990";
  d3v3.json(file, function(error, root) {

    if (error) throw error;
    var year = 0;
    var path = svg.selectAll("path");
    svg.select("g").selectAll("path").data(data).exit().remove();
    var data = path.data(partition.nodes(root[year]));

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
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.name); })
      .on("click", click)
    // .append("title")
    //   .text(function(d) { return d.name + "\n" + formatNumber(d.size); })

    .on("mouseover", function(d){
        tooltip.html(d.name + "\n" + formatNumber(d.size))
        .style("opacity", .9)
                .style("left", (d3v3.event.pageX) + "px")
                .style("top", (d3v3.event.pageY) + "px");
      })
    .on("mouseout", function(d){
      tooltip.style("opacity", 0);
    });

// Clicking on Sunburst transitions and zooms in
}
function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3v3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3v3.interpolate(y.domain(), [d.y, 1]),
            yr = d3v3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}
d3v3.select(self.frameElement).style("height", height + "px");
