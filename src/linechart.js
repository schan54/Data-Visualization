var data = [
    {date: new Date('2018-1-1'),
        value: +500},
    {date: new Date('2017-1-1'),
        value: +1000},
    {date: new Date('2016-1-1'),
        value: +700}
];
var svgWidth = 600,
    svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50};
var width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// starting point of graph
var g = svg.append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
// scales graph according to data
var x = d3.scaleTime()
    .rangeRound([0, width]);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

//define the point of line and the domains of x, y 
var line = d3.line()
    .x( d => x(d.date))
    .y( d => y(d.value))
    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.value));
// append x axis and remove the horizontal line
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();
//append the y axis and append "Price (S)"
g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");
// creates the line graph of specified output
g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin","round")
    .attr("stroke-lincecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

