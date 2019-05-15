
var moving = false;
var currentValue = 1960;
var targetValue = 2016;
var twoYears = false;
var comparedValue = 1961;
var UIFlag = false;

// Increase year by one and render
function step() {
  currentValue++;
  select(currentValue);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 1960;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
  }
}

// Render default state
select(currentValue);



function select(yearValue) {
  // Load data
  // Better structure to not load data each time you call select
  d3.csv('MtCO2Emissions.csv', function(error, data) {
  if (error) {
    console.error('Error getting or parsing the data.');
    throw error;
  }
  // selection.datum() returns the bound datum for the first element in the selection and
  //  doesn't join the specified array of data with the selected elements
  var chart = bubbleChart().width(1200).height(700);
  d3.select('#chart').datum(data).call(chart);
  });

  function bubbleChart() {
    var width = 400;
        height = 400;
        columnForColors = "continent";
        columnForRadius = "value";
        yearTemp = yearValue;
        max1 = 0;
        max2 = 0;
        max3 = 0;
        max4 = 0;
        max5 = 0;
        xPosition = [100, 250, 450, 650, 850, 1100];
        colorOne = d3.interpolateYlOrBr(0.4);
        colorTwo = d3.interpolateYlOrBr(0.5);
        colorThree = d3.interpolateYlOrBr(0.6);
        colorFour = d3.interpolateYlOrBr(0.7);
        colorFive = d3.interpolateYlOrBr(0.8);
        colorSix = d3.interpolateYlOrBr(0.9);
        colorGreen = d3.interpolateRdYlGn(1); 
        colorRed = d3.interpolateRdYlGn(0);
        colorGray = d3.interpolateRdYlGn(0.5);
        yearOne = [];
        yearTwo = [];
        yearDiff = [];
        indexesNegative = [];

    function chart(selection) {
      var data = selection.datum();
      var div = selection,
          svg = div.select('svg');
      svg.attr('width', width).attr('height', height);

      // Tooltip for Bubble Chart
      var tooltip = selection
        .append("div")
        .attr("id", "toolChart");

      // Set up color scheme
      var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
      // Set up radius scale
      var scaleRadius = d3.scalePow().exponent(0.5).domain([d3.min(data, function(d) {
        return +d[columnForRadius];
      }), d3.max(data, function(d) {
        return +d[columnForRadius];
      })]).range([2, 90])



      // Compute difference between two years
      yearOne = data.filter(function(d) { 
          if (UIFlag) {
              return d.year == currentValue;
          } else {
              return d.year == yearTemp
          }}); // selected year
      yearTwo = data.filter(function(d) { 
          if (UIFlag) {
            return d.year == comparedValue;
          } else {
              return d.year == yearTemp + 1;
          }}); // selected year plus
      yearDiff = yearTwo;

      for (i = 0; i < yearTwo.length; i++) {
        yearDiff[i].value = yearTwo[i].value - yearOne[i].value;
        if (yearDiff[i].value < 0) {
          indexesNegative[i] = 1;
          yearDiff[i].value = Math.abs(yearDiff[i].value);
        }
      }

      if (twoYears) {
        // Simulate forces acting on each node
        var simulation = d3.forceSimulation(yearDiff)
          .force("charge", d3.forceManyBody().strength(5))
          .force('x', d3.forceX().x(function(d) {
            if (!d.continent.localeCompare("Africa")) {
              return xPosition[5];
            } else if (!d.continent.localeCompare("Asia")) {
              return xPosition[4];
            } else if (!d.continent.localeCompare("Oceania")) {
              return xPosition[3];
            } else if (!d.continent.localeCompare("Europe")) {
              return xPosition[2];
            } else if (!d.continent.localeCompare("South America")) {
              return xPosition[1];
            } else if (!d.continent.localeCompare("North America")) {
              return xPosition[0];
            }
          }))
          .force('y', d3.forceY().y(340))
          .force("collision", d3.forceCollide().radius(function(d) {
            return scaleRadius(d.value)
          }))
          .on('tick', ticked);
      } else {
        // Simulate forces acting on each node
        var simulation = d3.forceSimulation(data.filter(function(d) { return d.year == yearTemp})       )
          .force("charge", d3.forceManyBody().strength(5))
          .force('x', d3.forceX().x(function(d) {
            if (!d.continent.localeCompare("Africa")) {
              return xPosition[5];
            } else if (!d.continent.localeCompare("Asia")) {
              return xPosition[4];
            } else if (!d.continent.localeCompare("Oceania")) {
              return xPosition[3];
            } else if (!d.continent.localeCompare("Europe")) {
              return xPosition[2];
            } else if (!d.continent.localeCompare("South America")) {
              return xPosition[1];
            } else if (!d.continent.localeCompare("North America")) {
              return xPosition[0];
            }
          }))
          .force('y', d3.forceY().y(340))
          .force("collision", d3.forceCollide().radius(function(d) {
            return scaleRadius(d.value)
          }))
          .on('tick', ticked);
      }

      function ticked() {

        if (twoYears) {
          var u = d3.select('svg')
          .selectAll('circle')
          .data(yearDiff);
        } else {
          var u = d3.select('svg')
          .selectAll('circle')
          .data(data.filter(function(d) { return d.year == yearTemp }));
        }

        if (twoYears) {
          u.enter()
          .append('circle')
          .attr('r', function(d) {
            //console.log("here");
            if (isNaN(d.value)) {
              return 2;
            } else {
              return scaleRadius(d.value)
            }
          })
          .merge(u)
          .style("fill", function(d) {
            if (indexesNegative[d.index] == 1) {
              return colorGreen;
            } else if (d.value > 0) {
              return colorRed;
            } else {
              return colorGray;
            }
          })
          .attr("cx", function(d) {
            if (isNaN(d.x)) {
              return 1;
            } else {
              return d.x
            }
          })
          .attr("cy", function(d) {
            if (isNaN(d.y)) {
              return 2;
            } else {
              return d.y
            }
          })
          .on("mouseover", function(d, i) {
            if (moving == false && indexesNegative[i] == 1) {
              tooltip.html("<strong>Country: </strong>" + "<span class=\"details\">"
                  + d.country + "</span><br>"
                  + "<strong>" 
                  + currentValue + " to " + comparedValue
                  + ": </strong>" + "<span class=\"details\">"
                  + "-" + Math.round(d[columnForRadius] * 100) / 100 + " MtCO2</span>");
              return tooltip.style("visibility", "visible");
            } else {
              tooltip.html("<strong>Country: </strong>" + "<span class=\"details\">"
                  + d.country + "</span><br>"
                  + "<strong>" 
                  + currentValue + " to " + comparedValue
                  + ": </strong>" + "<span class=\"details\">"
                  + Math.round(d[columnForRadius] * 100) / 100 + " MtCO2</span>");
              return tooltip.style("visibility", "visible");
            }
          })
          .on("mousemove", function() {
            if (moving == false) {
              return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }
          })
          .on("mouseout", function() {
            if (moving == false) {
              return tooltip.style("visibility", "hidden");
            }
          });


         u.transition()
          .duration(50)
          .attr('r', function(d) {
            //console.log("here");
            if (isNaN(d.value)) {
              return 2;
            } else {
              return scaleRadius(d.value)
            }
          });

        u.exit().remove();

        } else { // If Isolated
          u.enter()
          .append('circle')
          .attr('r', function(d) {
            //console.log("here");
            if (isNaN(d.value)) {
              return 2;
            } else {
              return scaleRadius(d.value)
            }
          })
          .merge(u)
          .style("fill", function(d) {
            if (!d.continent.localeCompare("Africa")) {
              return colorOne;
            } else if (!d.continent.localeCompare("Asia")) {
              return colorTwo;
            } else if (!d.continent.localeCompare("Oceania")) {
              return colorThree;
            } else if (!d.continent.localeCompare("Europe")) {
              return colorFour;
            } else if (!d.continent.localeCompare("South America")) {
              return colorFive;
            } else if (!d.continent.localeCompare("North America")) {
              return colorSix;
            }
          })
          .attr("cx", function(d) {
            if (isNaN(d.x)) {
              return 1;
            } else {
              return d.x
            }
          })
          .attr("cy", function(d) {
            if (isNaN(d.y)) {
              return 2;
            } else {
              return d.y
            }
          })
          .on("mouseover", function(d) {
            if (moving == false) {
              tooltip.html("<strong>Country: </strong>" + "<span class=\"details\">"
                  + d.country + "</span><br>"
                  + "<strong>" 
                  + currentValue 
                  + ": </strong>" + "<span class=\"details\">"
                  + d[columnForRadius] + " MtCO2</span>");
              return tooltip.style("visibility", "visible");
            }
          })
          .on("mousemove", function() {
            if (moving == false) {
              return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }
          })
          .on("mouseout", function() {
            if (moving == false) {
              return tooltip.style("visibility", "hidden");
            }
          });


         u.transition()
          .duration(50)
          .attr('r', function(d) {
            //console.log("here");
            if (isNaN(d.value)) {
              return 2;
            } else {
              return scaleRadius(d.value)
            }
          });

          u.exit().remove();
        }
        
      }

      var tempArray = [];
      var tempStringArray = [];
      var NAArray = [];
      var EUArray = [];
      var AfricaArray = [];
      var OceaniaArray = [];
      var SAArray = [];
      var AsiaArray = [];
      var index = 0;
      var stringIndex = 0;
      var sumValues = 0;
      var sumOceania = 0;
      var sumEU = 0;
      var sumAfrica = 0;
      var sumNA = 0;
      var sumAsia = 0;
      var sumSA = 0;

      // Parse CO2 values from string to int
      data.filter(function(d) {return d.year == yearTemp; }).forEach(function(d) {
        d.value = parseInt(d.value);
        tempArray[index] = d.value;
        tempStringArray[index] = d.country;
        if (!d.continent.localeCompare("Oceania")) {
          OceaniaArray[index] = d.value;
        } else if (!d.continent.localeCompare("North America")) {
          NAArray[index] = d.value;
        } else if (!d.continent.localeCompare("South America")) {
          SAArray[index] = d.value;
        } else if (!d.continent.localeCompare("Asia")) {
          AsiaArray[index] = d.value;
        } else if (!d.continent.localeCompare("Europe")) {
          EUArray[index] = d.value;
        } else if (!d.continent.localeCompare("Africa")) {
          AfricaArray[index] = d.value;
        }
        index++;
      })

      d3.select("#mainChart").selectAll("text").remove();

      sumValues = d3.sum(tempArray);
      sumOceania = d3.sum(OceaniaArray);
      sumSA = d3.sum(SAArray);
      sumNA = d3.sum(NAArray);
      sumEU = d3.sum(EUArray);
      sumAsia = d3.sum(AsiaArray);
      sumAfrica = d3.sum(AfricaArray);

      var topEmissions = d3.select("#mainChart");


      if (twoYears) {
          topEmissions.append("text").html(currentValue).attr("x", 390).attr("y", 80).attr("id", "yearText");
          topEmissions.append("text").html("to").attr("x", 470).attr("y", 110).attr("id", "toText");
          topEmissions.append("text").html(comparedValue).attr("x", 390).attr("y", 180).attr("id", "yearText");
      } else {
          topEmissions.append("text").html(currentValue).attr("x", 390).attr("y", 120).attr("id", "yearText");
      }

      // Find the max value in this year
      max1 = d3.max(data.filter(function(d) {return d.year == yearTemp; }), function(d) {return d.value; });

      stringIndex = tempArray.indexOf(max1);
      topEmissions.append("text").html("1. " + tempStringArray[stringIndex] + ": " + max1 + " MtCO2").attr("x", 850).attr("y", 80);
      tempStringArray.splice(tempArray.indexOf(max1), 1);
      tempArray.splice(tempArray.indexOf(max1), 1); // Remove max from temporary arra

      max2 = d3.max(tempArray); // Find the second max
      stringIndex = tempArray.indexOf(max2); // Get the index
      topEmissions.append("text").html("2. " + tempStringArray[stringIndex] + ": " + max2 + " MtCO2").attr("x", 850).attr("y", 100);
      tempStringArray.splice(tempArray.indexOf(max2), 1);
      tempArray.splice(tempArray.indexOf(max2), 1); // Remove second max from temporary array

      max3 = d3.max(tempArray); // Find the third max
      stringIndex = tempArray.indexOf(max3); // Get the index
      topEmissions.append("text").html("3. " + tempStringArray[stringIndex] + ": " + max3 + " MtCO2").attr("x", 850).attr("y", 120);
      tempStringArray.splice(tempArray.indexOf(max3), 1);
      tempArray.splice(tempArray.indexOf(max3), 1);

      max4 = d3.max(tempArray); // Find the fourth max
      stringIndex = tempArray.indexOf(max4); // Get the index
      topEmissions.append("text").html("4. " + tempStringArray[stringIndex] + ": " + max4 + " MtCO2").attr("x", 850).attr("y", 140);
      tempStringArray.splice(tempArray.indexOf(max4), 1);
      tempArray.splice(tempArray.indexOf(max4), 1);

      max5 = d3.max(tempArray); // Find the fifth max
      stringIndex = tempArray.indexOf(max5);
      topEmissions.append("text").html("5. " + tempStringArray[stringIndex] + ": " + max5 + " MtCO2").attr("x", 850).attr("y", 160);

      topEmissions.append("text").html("Countries With the Most Emissions:").attr("id", "sumText").attr("x", 850).attr("y", 50);

      topEmissions.append("text").html("World's Total Emissions:").attr("id", "sumText").attr("x", 600).attr("y", 70);
      topEmissions.append("text").html(+ sumValues + " MtCO2").attr("id", "sum").attr("x", 620).attr("y", 120);

      topEmissions.append("line").attr("x1", 610).attr("y1", 480).attr("x2", 730).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 610).attr("y1", 480).attr("x2", 610).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 800).attr("y1", 480).attr("x2", 920).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 800).attr("y1", 480).attr("x2", 800).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 1040).attr("y1", 480).attr("x2", 1160).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 1040).attr("y1", 480).attr("x2", 1040).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 410).attr("y1", 480).attr("x2", 530).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 410).attr("y1", 480).attr("x2", 410).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 210).attr("y1", 480).attr("x2", 330).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 210).attr("y1", 480).attr("x2", 210).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 70).attr("y1", 480).attr("x2", 190).attr("y2", 480).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 70).attr("y1", 480).attr("x2", 70).attr("y2", 580).attr("stroke-width", 0.5).attr("stroke", "black");

      topEmissions.append("line").attr("x1", 0).attr("y1", 200).attr("x2", 1500).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 370).attr("y1", 0).attr("x2", 370).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 580).attr("y1", 0).attr("x2", 580).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 820).attr("y1", 0).attr("x2", 820).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");

      topEmissions.append("text").html(sumOceania + " MtCO2").attr("x", 620).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(sumAsia + " MtCO2").attr("x", 810).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(sumNA + " MtCO2").attr("x", 80).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(sumSA + " MtCO2").attr("x", 220).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(sumEU + " MtCO2").attr("x", 420).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(sumAfrica + " MtCO2").attr("x", 1050).attr("y", 570).attr("font-weight", "bold");

      topEmissions.append("text").html("Oceania").attr("x", 620).attr("y", 510);
      topEmissions.append("text").html("Asia").attr("x", 810).attr("y", 510);
      topEmissions.append("text").html("North America").attr("x", 80).attr("y", 510);
      topEmissions.append("text").html("South America").attr("x", 220).attr("y", 510);
      topEmissions.append("text").html("Europe").attr("x", 420).attr("y", 510);
      topEmissions.append("text").html("Africa").attr("x", 1050).attr("y", 510);

      topEmissions.append("text").html("Total Emissions:").attr("x", 620).attr("y", 540);
      topEmissions.append("text").html("Total Emissions:").attr("x", 810).attr("y", 540);
      topEmissions.append("text").html("Total Emissions:").attr("x", 80).attr("y", 540);
      topEmissions.append("text").html("Total Emissions:").attr("x", 220).attr("y", 540);
      topEmissions.append("text").html("Total Emissions:").attr("x", 420).attr("y", 540);
      topEmissions.append("text").html("Total Emissions:").attr("x", 1050).attr("y", 540);

      //adding text to each toggle button group, centered
      //within the toggle button rect
      co2buttonGroups.append("text")
            .attr("class","buttonText")
            .attr("font-family","FontAwesome")
            .attr("x",function(d,i) {
              if (i < 6) {
                return x0 + (bWidth+bSpace)*(i%6) + bWidth/2;
              } else {
                return x0 + (b2Width+bSpace)*(i%6) + b2Width/2;
              }
            })
            .attr("y",function(d, i) {
                if (i < 6) {
                  return y0+bHeight/2;
                } else if (i >= 6) {
                  return y1+bHeight/2;
                }
            })
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("fill","white")
            .text(function(d) {return d;})

      var text = d3.select("#mainChart").append("g")
          .attr("transform", "translate(350, 15)")
          .append("text")
          .style("alignment-baseline", "hanging")
          .style("user-select", "none")
          .style("font-size", "120%")
          .style("fill", "grey")

      // Callback function for user input box
      var callback = function(content) {
          var yearUserText = content;
          var userArray = yearUserText.split(',');
          if ((parseInt(userArray[0]) < parseInt(userArray[1])) 
                && (1960 <= parseInt(userArray[0]) <= 2016) 
                && (1961 <= parseInt(userArray[1]) <= 2017)
                && (twoYears)) {
              UIFlag = true;
              currentValue = parseInt(userArray[0]);
              comparedValue = parseInt(userArray[1]);
              select(currentValue);
          } else if ((parseInt(userArray[0]) > 1959)
                && (parseInt(userArray[0]) < 2017)
                && (!twoYears)
                && (parseInt(userArray[0]) != currentValue)) {
            currentValue = parseInt(userArray[0]);
            select(currentValue);
          }
      }

      if (twoYears) {
        var tf = textfield()
          .x(20) // X Position
          .y(90) // Y Position 
          .width(160) // Width 
          .height(30) // Height 
          .callback(callback) // Callback returning the current text 
          .text(currentValue + "," + comparedValue) // Default text 
          .fill("steelblue") // Default fill 
          .stroke("blue") // Default border 
          .fillSelected("blue") // Fill when activated 
          .strokeSelected("black") // Border when activated 
          .color("white") // Text color 
          .colorSelected("grey") // Text color when activated 
          .returnLowercase(false) // Auto-lowercase input text before calling back 
          .returnEmpty(false) // Shall textfield call back if input text is empty
        d3.select("#mainChart").call(tf)
      } else {
        var tf = textfield()
          .x(20) // X Position
          .y(90) // Y Position 
          .width(160) // Width 
          .height(30) // Height 
          .callback(callback) // Callback returning the current text 
          .text(currentValue) // Default text 
          .fill("steelblue") // Default fill 
          .stroke("blue") // Default border 
          .fillSelected("blue") // Fill when activated 
          .strokeSelected("black") // Border when activated 
          .color("white") // Text color 
          .colorSelected("grey") // Text color when activated 
          .returnLowercase(false) // Auto-lowercase input text before calling back 
          .returnEmpty(false) // Shall textfield call back if input text is empty
        d3.select("#mainChart").call(tf)
      }
    }

    // Getters and setters
    chart.width = function(value) {
      if (!arguments.length) {
        return width;
      }
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) {
        return height;
      }
      height = value;
      return chart;
    };

    chart.columnForColors = function(value) {
      if (!arguments.columnForColors) {
        return columnForColors;
      }
      columnForColors = value;
      return chart;
    };

    chart.columnForRadius = function(value) {
      if (!arguments.columnForRadius) {
        return columnForRadius;
      }
      columnForRadius = value;
      return chart;
    };

    return chart;
  }
}
