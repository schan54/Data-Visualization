function buildLegend() {

	legendWidth = (width-200);
	barWidth = legendWidth/11;
	var tempArray = [];
	for (i = 1; i < 12; i++) {
		tempArray.push({bar: (width-100) - (barWidth * i), color: d3.interpolateRdYlBu(i/11), text: colorDomain[12-i]});
	}
	var g = svg.selectAll(".rect")
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

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")");


var handle2 = slider.insert("circle", ".track-overlay")
        .attr("class", "handle2")
        .attr("r", 10)
        .style("fill", "grey");

var label2 = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(userYear2)
        .attr("transform", "translate(0," + (-25) + ")");

function getTextInput() {
  userYear2 = 1970;
  return userYear2;
}

function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDateIntoYear(h));

  if (userYear != (formatDateIntoYear(h))) {
    userYear = formatDateIntoYear(h);

    //Update Choropleth
    queue()
        .defer(d3.json, "../core/world_countries.json")
        .defer(d3.tsv, "worldData.tsv")
        .await(ready);
  }
  // filter data set and redraw plot


}
