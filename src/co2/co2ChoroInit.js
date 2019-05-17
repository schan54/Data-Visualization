var format = d3.format(".3n");

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%Y");

var startDate = new Date("1961"),
    endDate = new Date("2017");

var userYear = formatDateIntoYear(startDate);
var userYear2 = formatDateIntoYear(startDate);

var colorIsolatedDomain = [-25,0,5,25,50,100,200,500,800,1000, 2500, 5000]
var colorCompareDomain = [-25,0,5,25,50,100,200,500,800,1000, 2500, 5000]
var colorDomainPercent = [-50, -25, -10, -5, 0, 5, 10, 25, 50, 75, 100]

var colorDomain = colorIsolatedDomain;

////////// slider //////////
var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 1300 - margin.left - margin.right,
            height = 1200 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append('g')
  .attr('class', 'map');

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + ": </strong><span class='details'>" + format(d.value) +"</span>";
  })

buildLegend();
