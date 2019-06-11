//text that the radio button will toggle
var buttonHeader= choroSvg.append("text")
                .attr("id","numberToggle")
                .attr("x",90)
                .attr("y",30)
                .attr("fill","green")
                .attr("font-size",24)
                .text("Filter Method: Isolated")

//container for all buttons
var choroButtonContainer= choroSvg.append("g")
                    .attr("id","Filter Method: Isolated")

//fontawesome button labels
var labels= ["Isolated",'Comparative', 'InputYear'];

//colors for different button states
var defaultColorChoro= "#687864"
var hoverColorChoro= "#5085A5"
var pressedColorChoro= "#31708E"

var compareActive = false;

//groups for each button (which will hold a rect and text)
var buttonGroups= choroButtonContainer.selectAll("g.button")
  .data(labels)
  .enter()
  .append("g")
  .attr("class","button")
  .style("cursor","pointer")
  .on("click",function(d,i) {
      updateChoroButtonColors(d3.select(this), d3.select(this.parentNode));

			//First Button = Isolated
			if (i == 0) {
				d3.select("#numberToggle").text("Filter Method: Isolated");
				compareActive = false;
				colorDomain = colorIsolatedDomain;
				buildLegend();        //Reload Choro Data
				queue()
					.defer(d3.json, "../core/world_countries.json")
					.defer(d3.tsv, "worldTemp.tsv")
					.await(ready);
			}

      // Second BUttone = Comparative
      if (i == 1) {
        d3.select("#numberToggle").text("Filter Method: Comparative");
        compareActive = true;
				colorDomain = colorCompareDomain;
				buildLegend();
        //Reload Choro Data
        queue()
          .defer(d3.json, "../core/world_countries.json")
          .defer(d3.tsv, "worldTemp.tsv")
          .await(ready);
      }

			// Third Button  = Year Input
      if (i == 2) {
				buildLegend();
        //Reload Choro Data
        queue()
          .defer(d3.json, "../core/world_countries.json")
          .defer(d3.tsv, "worldTemp.tsv")
          .await(ready);
      }
  })
  .on("mouseover", function() {
      if (d3.select(this).select("rect").attr("fill") != pressedColorChoro) {
          d3.select(this)
              .select("rect")
              .attr("fill",hoverColorChoro);
      }
  })
  .on("mouseout", function() {
      if (d3.select(this).select("rect").attr("fill") != pressedColorChoro) {
          d3.select(this)
              .select("rect")
              .attr("fill",defaultColorChoro);
      }
  })

var bWidthChoro= 100; //button width
var bHeightChoro= 25; //button height
var bSpaceChoro= 10; //space between buttons
var x0Choro= 80; //x offset
var y0Choro= 50; //y offset

//adding a rect to each toggle button group
//rx and ry give the rect rounded corner
buttonGroups.append("rect")
		.attr("class","buttonRect")
		.attr("width",function(d, i) {return bWidthChoro;})
		.attr("height",bHeightChoro)
		.attr("x",function(d,i) {return x0Choro+(bWidthChoro+bSpaceChoro)*(i%2);})
		.attr("y", function(d, i) {return y0Choro;})
		.attr("rx",5) //rx and ry give the buttons rounded corners
		.attr("ry",5)
		.attr("fill",defaultColorChoro)

buttonGroups.append("text")
		.attr("class","choroButtonText")
		.attr("x",function(d,i) {return x0Choro+(bWidthChoro+bSpaceChoro)*(i%2)  + bWidthChoro/2;})
		.attr("y", function(d, i) {return y0Choro + bHeightChoro/2; })
		.attr("text-anchor","middle")
		.attr("dominant-baseline","central")
		.attr("fill","white")
		.text(function(d) {return d;})


var foreign1 = choroSvg.append("svg:foreignObject")
	.attr("width", bWidthChoro* 2 + bSpaceChoro)
	.attr("height", bHeightChoro)
	.attr("x", (x0Choro))
	.attr("y", y0Choro + bHeightChoro*2)
	.attr("rx", 5)
	.attr("ry", 5)
	.attr("fill",defaultColorChoro)
	.style("resize", 'none')
	.append("xhtml:body")
	.html("<input oninput='return inputRecv()' id='inputbox' class='foo' rows='13' cols='40' type='text'> </input>")



//	.html("<input oninput='return inputRecv()' style='font: Times; resize: none; font-size: 15pt; border 1px solid lightgray; outline: none; border-radius: 10px;' id='inputbox' class='foo' rows='13' cols='40' type='text'> </input>")

function inputRecv() {
	console.log(document.getElementById("inputbox").value)
	var inputString = document.getElementById("inputbox").value
	var splitString = inputString.split(',')
	if (compareActive) {
		if (isNaN(parseInt(splitString[0]))
		|| isNaN(parseInt(splitString[1]))) {}
		else if ((1901 <= parseInt(splitString[0]) <= 2014)
		&& (1901 <= parseInt(splitString[1]) <= 2014)) {
			console.log(parseInt(splitString[0]))
			console.log(parseInt(splitString[1]))
			if (parseInt(splitString[0]) < parseInt(splitString[1])) {
				userYear = splitString[1]
				userYear2 = splitString[0]
			}
			else {
				userYear = splitString[0]
				userYear2 = splitString[1]
			}

			handle.attr("cx", x(new Date(userYear)));
			label
				.attr("x", x(new Date(userYear)))
				.text(userYear);

			handle2.attr("cx", x(new Date(userYear2)));
			label2
				.attr("x", x(new Date(userYear2)))
				.text(userYear2);
			queue()
				.defer(d3.json, "../core/world_countries.json")
				.defer(d3.tsv, "worldTemp.tsv")
				.await(ready);
			console.log("Compare Success")
		}
	}
	else {
		if ((parseInt(splitString[0]) >= 1901)
		&& (parseInt(splitString[0]) <= 2014)
		&& (parseInt(splitString[0]) != userYear)) {
			userYear = parseInt(splitString[0]);
			handle.attr("cx", x(new Date(userYear)));
			label
				.attr("x", x(new Date(userYear)))
				.text(userYear);

			queue()
				.defer(d3.json, "../core/world_countries.json")
				.defer(d3.tsv, "worldTemp.tsv")
				.await(ready);
			console.log("Isolated Success")
		}
	}
}

function updateChoroButtonColors(button, parent) {
    parent.selectAll("rect")
            .attr("fill",defaultColorChoro)

    button.select("rect")
            .attr("fill",pressedColorChoro)
}
