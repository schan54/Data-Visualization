//Define the region of the slider
var x = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, width-50])
  .clamp(true);

//Create the container
var slider = choroSvg.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 25 + "," + 205 + ")");

//Append a line for the ball to be on
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])

	//Parent-Child node calls
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")

		//Update slider based on drag events
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { update(x.invert(d3.event.x)); }));

//Insert the ticks of the slider
slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")

	//Apply the text to each tick
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

//Insert the first black main ball
var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 10)
    .style("fill", "black");

//Create the label for the abll
var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")");

//Same thing but for userYear 2 ball (comparitive)
var handle2 = slider.insert("circle", ".track-overlay")
        .attr("class", "handle2")
        .attr("r", 10)
        .style("fill", "grey");

var label2 = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(userYear2)
        .attr("transform", "translate(0," + (-25) + ")")
				.on("click",function(d) {
					getTextInput()
				});

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
        .defer(d3.tsv, "worldTemp.tsv")
        .await(ready);
  }
}
