/*
    Code by
    Adam Janes
    Demo: Building an updating scatter plot

    https://github.com/adamjanes/scatter-demo/blob/master/index.html
*/
// Temp data
var data0 = [
        { gpa: 3.42, height: 138 },
        { gpa: 3.54, height: 153 },
        { gpa: 3.14, height: 148 },
        { gpa: 2.76, height: 164 },
        { gpa: 2.95, height: 162 },
        { gpa: 3.36, height: 143 }
]

var data1 = [
    { gpa: 3.15, height: 157 },
    { gpa: 3.12, height: 175 },
    { gpa: 3.67, height: 167 },
    { gpa: 3.85, height: 149 },
    { gpa: 2.32, height: 165 },
    { gpa: 3.01, height: 171 },
    { gpa: 3.54, height: 168 },
    { gpa: 2.89, height: 180 },
    { gpa: 3.75, height: 153 }
]

var svg = d3.select("#canvas");

// Margin setup
var margin = {top: 10, right: 10, bottom: 50, left: 50};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Scales
var x = d3.scaleLinear()
    .range([0, width]);
var y = d3.scaleLinear()
    .range([height, 0]);

// Axes
var xAxisCall = d3.axisBottom(x)
var xAxis = g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + 0 + "," + height + ")");
var yAxisCall = d3.axisLeft(y)
var yAxis = g.append("g")
    .attr("class", "y-axis");
// Labels
g.append("text")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + width + ", 0)")
    .attr("y", height - 6)
    .attr("x", -width / 5)
    .text("Grade Point Average");
g.append("text")
    .attr("class", "y-axis")
    .attr("transform", "rotate(-90)")
    .attr("y", 16)
    .attr("x", -width / 5)
    .text("Height / Centimeters");

var flag = true;

// Run this code every second...
d3.interval(function(){
    // Flick between our two data arrays
    data = flag ? data0 : data1;
    
    // Update our chart with new data
    update(data);
    
    // Update our flag variable
    flag = !flag;
}, 1000)

// Run for the first time
update(data0);

function update(data){
    // Standard transition for our visualization
    var t = d3.transition().duration(750);
    // Update our scales
    x.domain([d3.min(data, function(d){ return d.gpa; }) / 1.05, 
        d3.max(data, function(d){ return d.gpa; }) * 1.05])
    y.domain([d3.min(data, function(d){ return d.height; }) / 1.05,
        d3.max(data, function(d){ return d.height; }) * 1.05])
    // Update our axes
    xAxis.transition(t).call(xAxisCall);
    yAxis.transition(t).call(yAxisCall);
    // Update our circles
    var circles = g.selectAll("circle")
        .data(data);
    circles.exit().transition(t)
        .attr("fill-opacity", 0.1)
        .attr("cy", y(0))
        .remove()
    circles.transition(t)
        .attr("cx", function(d){ return x(d.gpa) })
        .attr("cy", function(d){ return y(d.height) })
    circles.enter().append("circle")
    .attr("cx", function(d){ return x(d.gpa) })
    .attr("cy", y(0))
    .attr("r", 5)
    .attr("fill", "grey")
    .attr("fill-opacity", 0.1)
    .transition(t)
    .attr("fill-opacity", 1)
    .attr("cy", function(d){ return y(d.height) });
}
