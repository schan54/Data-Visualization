function textInputBox() {

	console.log("clicked")

	var circles = choroSvg.append("rect")
		.attr("x", 30)
		.attr("cy", 30)
		.attr("r", 20);

/*
	function inputBoxEntry() {
		userYear2 = ("#textInput").val()
		console.log(userYear2)
	}
	var lineID = "";

  var userInput = choroInputBox.append(choroInputBox)
      .on("click", function () {
          $(".externalObject").remove();
          lineID = d3.select(this).attr("id");
          svg.append("foreignObject")
              .attr("class", "externalObject")
              .attr("x", (d3.event.pageX - 20) + "px")
              .attr("y", (d3.event.pageY - 40) + "px")
              .attr("width", 200)
              .attr("height", 100)
              .append("xhtml:div")
              .html("<input type='text' id=textInput placeholder='Input Year Here' onchange=inputBoxEntry()></input>");
      });
*/
}
