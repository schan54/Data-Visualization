var format = d3.format(",");

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%Y");

var startDate = new Date("1961"),
    endDate = new Date("2017");

var userYear = formatDateIntoYear(startDate);
var userYear2 = formatDateIntoYear(startDate);

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

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width-50])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + 25 + "," + 205 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])

  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")

    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { update(x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")

  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 10)
    .style("fill", "black");

var handle2 = slider.insert("circle", ".track-overlay")
    .attr("class", "handle2")
    .attr("r", 10)
    .style("fill", "grey");

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")");

var label2 = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")");

function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDateIntoYear(h));

  if (userYear != (formatDateIntoYear(h))) {
    userYear = formatDateIntoYear(h);

    //Update bubble.js
    currentValue = userYear;
    select(userYear);

    //Update Choropleth
    queue()
        .defer(d3.json, "../core/world_countries.json")
        .defer(d3.tsv, "worldData.tsv")
        .await(ready);
  }
  // filter data set and redraw plot


}
