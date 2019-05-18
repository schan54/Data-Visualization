var format = d3.format(".3n");

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%Y");

var startDate = new Date("1902"),
    endDate = new Date("2015");

var userYear = formatDateIntoYear(startDate);
var userYear2 = formatDateIntoYear(startDate);

var colorIsolatedDomain = [-.2,-.1,0,.1,.2,.4,.6,.8,1, 1.2, 1.4]
var colorCompareDomain = [-.2,-.1,0,.1,.2,.4,.6,.8,1, 1.2, 1.4]
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
		tempArray.push({bar: (width-100) - (barWidth * i), color: d3.interpolateRdYlBu(i/11), text: colorDomain[12-i]});
	}

	var g = choroSvg.selectAll(".rect")
	  .data(tempArray)
	  .enter()
	  .append("g")
	  .classed('rect', true)

	g.append("rect")
	  .attr("width", barWidth)
	  .attr("height", 20)
	  .attr("y", 260)
		.attr("x", function(d) {return d.bar})
	  .attr("fill",  function(d) {return d.color});

	g.append("text")
		.text(function(d) {return d.text})
		.attr("y", 300)
		.attr("x",  function(d) {return d.bar + barWidth/3});
}
