

var x = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, width-50])
  .clamp(true);

var slider = choroSvg.append("g")
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
    .style("fill", "black")
		.attr("id", "handle1");

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")")
		.attr("id", "label1");


var handle2 = slider.insert("circle", ".track-overlay")
        .attr("class", "handle2")
        .attr("r", 10)
        .style("fill", "grey")
				.attr("id", "handle2");

var label2 = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(userYear2)
        .attr("transform", "translate(0," + (-25) + ")")
				.attr("id", "label2");


function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDateIntoYear(h));

	handle2.attr("cx", x(new Date(userYear2)));
	label2
		.attr("x", x(new Date(userYear2)))
		.text(userYear2);

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
