//Define many global variables to use throughout the choropleth

//format number to display 1 float, used alot during choroHelper functions
var format = d3.format(".1f");

//Time format vars
var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%Y");

//Create Dates
var startDate = new Date("1902"),
    endDate = new Date("2015");

//Define the two years
var userYear = formatDateIntoYear(startDate);
var userYear2 = formatDateIntoYear(startDate);

//Create an array of 11 numbers to map to the color scale found in tempChoro
var colorIsolatedDomain = [-5, 0, 5, 10, 15, 20, 22.5, 25, 27.5, 30, 35]
var colorCompareDomain = [-4, -2, -1, -.5, -.25, 0, .25 ,.5, 1, 2, 4]
var colorDomainPercent = [-50, -25, -10, -5, 0, 5, 10, 25, 50, 75, 100]

var colorDomain = colorIsolatedDomain;

////////// slider //////////
var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 1300 - margin.left - margin.right,
            height = 1200 - margin.top - margin.bottom;

var choroSvg = d3.select("body")
  .append("svg")
  .attr("width", 1300)
  .attr("height", 1200)
  .append('g')
  .attr('class', 'map');

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + ": </strong><span class='details'>" + format(d.value) +"</span>";
  })

buildLegend();

function buildLegend() {

	legendWidth = (width-200);
	barWidth = legendWidth/11;
	var tempArray = [];
	for (i = 1; i < 12; i++) {
		tempArray.push({bars: (width-100) - (barWidth * i), colors: d3.interpolateRdYlBu(i/11), texting: colorDomain[11-i]});
	}

	var g = choroSvg.selectAll(".rect")
	g.remove();
	g = choroSvg.selectAll(".rect")
	  .data(tempArray)
	  .enter()
	  .append("g")
	  .classed('rect', true)

	g.append("rect")
	  .attr("width", barWidth)
	  .attr("height", 20)
	  .attr("y", 260)
		.attr("x", function(d) {return d.bars})
	  .style("fill",  function(d) {return d.colors});

	g.append("text")
		.text(function(d) {return d.texting})
		.attr("y", 300)
		.attr("x",  function(d) {return d.bars + barWidth/3});
}
