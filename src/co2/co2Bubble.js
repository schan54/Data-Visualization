
var moving = false;
var currentValue = 1960;
var targetValue = 2055;
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
  var chart = bubbleChart().width(1300).height(800);
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
        cumulatives = [9104.144, 18205.332, 27629.031, 37589.212, 48055.297, 59011.837,
                        70466.715, 82274.629, 94726.192, 108014.726, 122413.034, 137385.719,
                        153038.825, 169524.161, 185973.702, 202442.217, 219813.069, 237665.198,
                        256185.474, 275209.387, 294158.26, 312617.11, 330976.201, 349523.883,
                        368593.561, 388377.065, 408426.586, 429178.76, 450727.295, 472604.529,
                        494813.439, 517018.792, 538982.918, 561178.246, 583508.236, 606311.05,
                        629763.474, 653305.551, 676735.021, 700453.217, 724848.843, 749473.101,
                        774634.207, 801025.324, 828627.405, 857145.197, 886594.732, 916903.251,
                        947905.546, 978494.489, 1010631.756, 1043923.854, 1077725.696, 1111637.673,
                        1145849.545, 1180023.526, 1214314.957, 1249055.465, 1284142.902, 1319588.015,
                        1355390.804, 1391551.28, 1428069.449, 1464945.295, 1502178.818, 1539770.022,
                        1577718.913, 1616025.487, 1654689.751, 1693711.696, 1733097.306, 1772828.599,
                        1812923.579, 1853376.246, 1894186.594, 1935354.623, 1976880.338, 2018763.729,
                        2061004.795, 2103603.545, 2146559.976, 2189874.089, 2233545.883, 2277575.356,
                        2321962.513, 2366707.364, 2411809.881, 2457270.081, 2503087.969, 2549263.527,
                        2595796.774, 2642687.699, 2689936.312, 2737542.608, 2785506.583, 2833828.241]
        colorOne = '#8FC1E3';
        colorTwo = '#31708E';
        colorThree = '#567488';
        colorFour = '#1D4355';
        colorFive = '#0A161C';
        colorSix = '#1D272D';
        colorGreen = d3.interpolateRdYlGn(1); 
        colorRed = d3.interpolateRdYlGn(0);
        colorGray = '#3B444C';
        yearOne = [];
        yearTwo = [];
        yearDiff = [];
        indexesNegative = [];
        year2017 = [];
        year2007 = [];
        netDiff = [];
        netDiffNegative = [];
        yearFuture = [];

    function chart(selection) {
      var data = selection.datum();
      var div = selection,
          svg = div.select('svg');
      svg.attr('width', width).attr('height', height);

        d3.selectAll(".rectIso").remove();

        var rectangleAfrica = svg.append("rect")
                           .attr("x", 300)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorSix)
                           .style("visibility", "hidden");

        var rectangleAsia = svg.append("rect")
                           .attr("x", 460)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorFive)
                           .style("visibility", "visible");

        var rectangleEurope = svg.append("rect")
                           .attr("x", 620)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorFour)
                           .style("visibility", "visible");

        var rectangleOceania = svg.append("rect")
                           .attr("x", 780)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorThree)
                           .style("visibility", "visible");

        var rectangleSA = svg.append("rect")
                           .attr("x", 940)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorTwo)
                           .style("visibility", "visible");

        var rectangleNA = svg.append("rect")
                           .attr("x", 1100)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorOne)
                           .style("visibility", "visible");

        var rectangleGray = svg.append("rect")
           .attr("x", 300)
           .attr("y", 640 + 30)
           .attr("width", 40)
           .attr("height", 40)
           .attr("class", "rectIso")
           .style("fill", colorGray)
           .style("visibility", "hidden");

        var rectangleRed = svg.append("rect")
                           .attr("x", 620)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorRed)
                           .style("visibility", "hidden");

        var rectangleGreen = svg.append("rect")
                           .attr("x", 940)
                           .attr("y", 640 + 30)
                           .attr("width", 40)
                           .attr("height", 40)
                           .attr("class", "rectIso")
                           .style("fill", colorGreen)
                           .style("visibility", "hidden");

      // Legend
      if (!twoYears) {
        rectangleRed.style("visibility", "hidden");
        rectangleGreen.style("visibility", "hidden");
        rectangleNA.style("visibility", "visible");
        rectangleSA.style("visibility", "visible");
        rectangleEurope.style("visibility", "visible");
        rectangleOceania.style("visibility", "visible");
        rectangleAfrica.style("visibility", "visible");
        rectangleAsia.style("visibility", "visible");
      } else {
        rectangleRed.style("visibility", "visible");
        rectangleGreen.style("visibility", "visible");
        rectangleGray.style("visibility", "visible");
        rectangleSA.style("visibility", "hidden");
        rectangleNA.style("visibility", "hidden");
        rectangleEurope.style("visibility", "hidden");
        rectangleOceania.style("visibility", "hidden");
        rectangleAfrica.style("visibility", "hidden");
        rectangleAsia.style("visibility", "hidden");
      }

      // Tooltip for Bubble Chart
      var tooltip = selection
        .append("div")
        .attr("id", "toolChart");

      // Set up color scheme
      var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
      // Set up radius scale
      var scaleRadius = d3.scalePow().exponent(0.5).domain([0, d3.max(data, function(d) {
        return +d[columnForRadius];
      })]).range([2, 90])

      // Compute difference between two years
      yearOne = data.filter(function(d) { 
          if (UIFlag) {
              return d.year == currentValue;
          } else {
              return d.year == yearTemp;
          }}); // selected year
      yearTwo = data.filter(function(d) { 
          if (UIFlag) {
            return d.year == comparedValue;
          } else {
            return d.year == yearTemp + 1;
          }}); // selected year plus

      for (i = 0; i < yearTwo.length; i++) {
        yearDiff[i] = {};
        for (var prop in yearTwo[i]) {
          yearDiff[i][prop] = yearTwo[i][prop];
        }
      }

      //yearDiff = yearTwo;

      // Compute difference and find negatives
      for (i = 0; i < yearTwo.length; i++) {
        for (j = 0; j < yearOne.length; j++) {
          if (yearTwo[i].country == yearOne[j].country) {
            yearDiff[i].value = yearTwo[i].value - yearOne[j].value;
          }
        }
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

        console.log(0 + ": " + scaleRadius(0));
        console.log(10 + ": " + scaleRadius(10));
        console.log(100 + ": " + scaleRadius(100));
        console.log(500 + ": " + scaleRadius(500));
        console.log(1000 + ": " + scaleRadius(1000));
        console.log(5000 + ": " + scaleRadius(5000));
        console.log(10000 + ": " + scaleRadius(10000));

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
          .attr('r', function(d, i) {
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
      var minToBeSpliced = [];
      var index = 0;
      var stringIndex = 0;
      var sumValues = 0;
      var sumOceania = 0;
      var sumEU = 0;
      var sumAfrica = 0;
      var sumNA = 0;
      var sumAsia = 0;
      var sumSA = 0;

      if (!twoYears) {
        // Parse CO2 values from string to double with 3 decimal places
        data.filter(function(d) {return d.year == yearTemp; }).forEach(function(d) {
          d.value = Math.round(parseFloat(d.value) * 1000) / 1000;
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
      } else {
        yearDiff.forEach(function(d) {
          d.value = Math.round(parseFloat(d.value) * 1000) / 1000;
          if (indexesNegative[index] == 1) {
            d.value = -d.value;
          }
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
          if (indexesNegative[index] == 1) {
            d.value = -d.value;
          }
          index++;
        })
      }

      d3.select("#mainChart").selectAll("text").remove();
      d3.select("#mainChart").selectAll("line").remove();

      console.log(AsiaArray);
      sumValues = d3.sum(tempArray);
      sumOceania = d3.sum(OceaniaArray);
      sumSA = d3.sum(SAArray);
      sumNA = d3.sum(NAArray);
      sumEU = d3.sum(EUArray);
      sumAsia = d3.sum(AsiaArray);
      sumAfrica = d3.sum(AfricaArray);

      var topEmissions = d3.select("#mainChart");

      if (twoYears) {
          topEmissions.append("text").html(currentValue).attr("x", 240).attr("y", 80).attr("id", "yearText");
          topEmissions.append("text").html("to").attr("x", 310).attr("y", 110).attr("id", "toText");
          topEmissions.append("text").html(comparedValue).attr("x", 240).attr("y", 180).attr("id", "yearText");
          topEmissions.append("text").html("Net Difference in Emissions:").attr("id", "sumText").attr("x", 450).attr("y", 50);
      } else {
          topEmissions.append("text").html(currentValue).attr("x", 240).attr("y", 120).attr("id", "yearText");
          topEmissions.append("text").html("World's Total Emissions:").attr("id", "sumText").attr("x", 470).attr("y", 50);
      }

      topEmissions.append("text").html("% Toward 1 Trillion Ton Threshold:").attr("id", "sumText").attr("x", 450).attr("y", 120);
      // 3329367 is 1 Trillion tons of carbon in Metric tonnes of CO2
      topEmissions.append("text").html(Math.round(cumulatives[currentValue - 1960] / 3329367 * 10000) / 100 + "%").attr("id", "cumulativeSum").attr("x", 490).attr("y", 160);

      // Find the max value in this year
      max1 = d3.max(tempArray);

      stringIndex = tempArray.indexOf(max1);
      topEmissions.append("text").html("1. " + tempStringArray[stringIndex] + ": " + max1 + " MtCO2").attr("x", 700).attr("y", 80).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(max1), 1);
      tempArray.splice(tempArray.indexOf(max1), 1); // Remove max from temporary array

      max2 = d3.max(tempArray); // Find the second max
      stringIndex = tempArray.indexOf(max2); // Get the index
      topEmissions.append("text").html("2. " + tempStringArray[stringIndex] + ": " + max2 + " MtCO2").attr("x", 700).attr("y", 100).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(max2), 1);
      tempArray.splice(tempArray.indexOf(max2), 1); // Remove second max from temporary array

      max3 = d3.max(tempArray); // Find the third max
      stringIndex = tempArray.indexOf(max3); // Get the index
      topEmissions.append("text").html("3. " + tempStringArray[stringIndex] + ": " + max3 + " MtCO2").attr("x", 700).attr("y", 120).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(max3), 1);
      tempArray.splice(tempArray.indexOf(max3), 1);

      max4 = d3.max(tempArray); // Find the fourth max
      stringIndex = tempArray.indexOf(max4); // Get the index
      topEmissions.append("text").html("4. " + tempStringArray[stringIndex] + ": " + max4 + " MtCO2").attr("x", 700).attr("y", 140).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(max4), 1);
      tempArray.splice(tempArray.indexOf(max4), 1);

      max5 = d3.max(tempArray); // Find the fifth max
      stringIndex = tempArray.indexOf(max5);
      topEmissions.append("text").html("5. " + tempStringArray[stringIndex] + ": " + max5 + " MtCO2").attr("x", 700).attr("y", 160).attr("class", "topText");

      for (i = 0; i < tempArray.length; i++) {
        if (Math.round(parseFloat(tempArray[i]) * 1000) / 1000 == 0 || isNaN(tempArray[i])) {
          minToBeSpliced[i] = 1;
        } else {
          minToBeSpliced[i] = 0;
        }
      }

      for (i = minToBeSpliced.length; i >= 0; i--) {
        if (minToBeSpliced[i] == 1) {
          tempArray.splice(i, 1);
          tempStringArray.splice(i, 1);
        }
      }

      min1 = d3.min(tempArray); // Find the min
      stringIndex = tempArray.indexOf(min1); // Get the index
      topEmissions.append("text").html("1. " + tempStringArray[stringIndex] + ": " + min1 + " MtCO2").attr("x", 995).attr("y", 80).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(min1), 1);
      tempArray.splice(tempArray.indexOf(min1), 1);

      min2 = d3.min(tempArray); // Find the min
      stringIndex = tempArray.indexOf(min2); // Get the index
      topEmissions.append("text").html("2. " + tempStringArray[stringIndex] + ": " + min2 + " MtCO2").attr("x", 995).attr("y", 100).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(min2), 1);
      tempArray.splice(tempArray.indexOf(min2), 1);

      min3 = d3.min(tempArray); // Find the min
      stringIndex = tempArray.indexOf(min3); // Get the index
      topEmissions.append("text").html("3. " + tempStringArray[stringIndex] + ": " + min3 + " MtCO2").attr("x", 995).attr("y", 120).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(min3), 1);
      tempArray.splice(tempArray.indexOf(min3), 1);

      min4 = d3.min(tempArray); // Find the min
      stringIndex = tempArray.indexOf(min4); // Get the index
      topEmissions.append("text").html("4. " + tempStringArray[stringIndex] + ": " + min4 + " MtCO2").attr("x", 995).attr("y", 140).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(min4), 1);
      tempArray.splice(tempArray.indexOf(min4), 1);

      min5 = d3.min(tempArray); // Find the min
      stringIndex = tempArray.indexOf(min5); // Get the index
      topEmissions.append("text").html("5. " + tempStringArray[stringIndex] + ": " + min5 + " MtCO2").attr("x", 995).attr("y", 160).attr("class", "topText");
      tempStringArray.splice(tempArray.indexOf(min5), 1);
      tempArray.splice(tempArray.indexOf(min5), 1);

      if (!twoYears) {
        topEmissions.append("text").html("Countries With the Most Emissions:").attr("id", "sumText").attr("x", 700).attr("y", 50);
        topEmissions.append("text").html("Countries With the Least Emissions:").attr("id", "sumText").attr("x", 995).attr("y", 50);
      } else {
        topEmissions.append("text").html("Countries With the Greatest Increase:").attr("id", "sumText").attr("x", 700).attr("y", 50);
        topEmissions.append("text").html("Countries With the Greatest Decrease:").attr("id", "sumText").attr("x", 995).attr("y", 50);
      }

      topEmissions.append("text").html(+ Math.round(parseFloat(sumValues) * 1000) / 1000 + " MtCO2").attr("id", "sum").attr("x", 460).attr("y", 85);

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
      topEmissions.append("line").attr("x1", 220).attr("y1", 0).attr("x2", 220).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 430).attr("y1", 0).attr("x2", 430).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 670).attr("y1", 0).attr("x2", 670).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 965).attr("y1", 0).attr("x2", 965).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");

      // Lines for legend
      topEmissions.append("line").attr("x1", 0).attr("y1", 590).attr("x2", 1300).attr("y2", 590).attr("stroke-width", 0.5).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 605 + 30).attr("x2", 102).attr("y2", 605 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 620 + 30).attr("x2", 104.16).attr("y2", 620 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 635 + 30).attr("x2", 108.82).attr("y2", 635 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 650 + 30).attr("x2", 117.26).attr("y2", 650 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 665 + 30).attr("x2", 123.57).attr("y2", 665 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 680 + 30).attr("x2", 150.25).attr("y2", 680 + 30).attr("stroke-width", 1).attr("stroke", "black");
      topEmissions.append("line").attr("x1", 100).attr("y1", 695 + 30).attr("x2", 170.24).attr("y2", 695 + 30).attr("stroke-width", 1).attr("stroke", "black");
      // Legend Text
      topEmissions.append("text").html("Emissions").attr("x", 40).attr("y", 585 + 30).style("font-size", 12);
      topEmissions.append("text").html("Circle Radius").attr("x", 100).attr("y", 585 + 30).style("font-size", 12);

      topEmissions.append("text").html("0 or NaN").attr("x", 40).attr("y", 610 + 30).style("font-size", 12);
      topEmissions.append("text").html("10").attr("x", 40).attr("y", 625 + 30).style("font-size", 12);
      topEmissions.append("text").html("100").attr("x", 40).attr("y", 640 + 30).style("font-size", 12);
      topEmissions.append("text").html("500").attr("x", 40).attr("y", 655 + 30).style("font-size", 12);
      topEmissions.append("text").html("1000").attr("x", 40).attr("y", 670 + 30).style("font-size", 12);
      topEmissions.append("text").html("5000").attr("x", 40).attr("y", 685 + 30).style("font-size", 12);
      topEmissions.append("text").html("10000").attr("x", 40).attr("y", 700 + 30).style("font-size", 12);

      if (!twoYears) {
        topEmissions.append("text").html("= Africa").attr("x", 1150).attr("y", 665 + 30);
        topEmissions.append("text").html("= Asia").attr("x", 990).attr("y", 665 + 30);
        topEmissions.append("text").html("= Oceania").attr("x", 830).attr("y", 665 + 30);
        topEmissions.append("text").html("= Europe").attr("x", 670).attr("y", 665 + 30);
        topEmissions.append("text").html("= South America").attr("x", 510).attr("y", 665 + 30);
        topEmissions.append("text").html("= North America").attr("x", 350).attr("y", 665 + 30);
      } else {
        topEmissions.append("text").html("= Decrease in Emissions").attr("x", 990).attr("y", 665 + 30);
        topEmissions.append("text").html("= Increase in Emissions").attr("x", 670).attr("y", 665 + 30);
        topEmissions.append("text").html("= No Change in Emissions").attr("x", 350).attr("y", 665 + 30);
      }

      topEmissions.append("text").html(Math.round(parseFloat(sumOceania) * 1000) / 1000 + " MtCO2").attr("x", 620).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(Math.round(parseFloat(sumAsia) * 1000) / 1000 + " MtCO2").attr("x", 810).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(Math.round(parseFloat(sumNA) * 1000) / 1000 + " MtCO2").attr("x", 80).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(Math.round(parseFloat(sumSA) * 1000) / 1000 + " MtCO2").attr("x", 220).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(Math.round(parseFloat(sumEU) * 1000) / 1000 + " MtCO2").attr("x", 420).attr("y", 570).attr("font-weight", "bold");
      topEmissions.append("text").html(Math.round(parseFloat(sumAfrica) * 1000) / 1000 + " MtCO2").attr("x", 1050).attr("y", 570).attr("font-weight", "bold");

      topEmissions.append("text").html("Oceania").attr("x", 620).attr("y", 510);
      topEmissions.append("text").html("Asia").attr("x", 810).attr("y", 510);
      topEmissions.append("text").html("North America").attr("x", 80).attr("y", 510);
      topEmissions.append("text").html("South America").attr("x", 220).attr("y", 510);
      topEmissions.append("text").html("Europe").attr("x", 420).attr("y", 510);
      topEmissions.append("text").html("Africa").attr("x", 1050).attr("y", 510);

      if (!twoYears) {
        topEmissions.append("text").html("Total Emissions:").attr("x", 620).attr("y", 540);
        topEmissions.append("text").html("Total Emissions:").attr("x", 810).attr("y", 540);
        topEmissions.append("text").html("Total Emissions:").attr("x", 80).attr("y", 540);
        topEmissions.append("text").html("Total Emissions:").attr("x", 220).attr("y", 540);
        topEmissions.append("text").html("Total Emissions:").attr("x", 420).attr("y", 540);
        topEmissions.append("text").html("Total Emissions:").attr("x", 1050).attr("y", 540);
      } else {
        topEmissions.append("text").html("Net Difference:").attr("x", 620).attr("y", 540);
        topEmissions.append("text").html("Net Difference:").attr("x", 810).attr("y", 540);
        topEmissions.append("text").html("Net Difference:").attr("x", 80).attr("y", 540);
        topEmissions.append("text").html("Net Difference:").attr("x", 220).attr("y", 540);
        topEmissions.append("text").html("Net Difference:").attr("x", 420).attr("y", 540);
        topEmissions.append("text").html("Net Difference:").attr("x", 1050).attr("y", 540);
      }

      d3.selectAll("text").style('fill', '#3B444C').style('font-family', 'Oswald');

      //adding text to each toggle button group, centered
      //within the toggle button rect
      co2buttonGroups.append("text")
            .attr("class","buttonText")
            .attr("x",function(d,i) {
              if (i < 6) {
                return x0 + (bWidth+bSpace)*(i%3) + bWidth/2;
              } else {
                return x0 + (b2Width+bSpace)*(i%2) + b2Width/2;
              }
            })
            .attr("y",function(d, i) {
                if (i < 3) {
                  return y0+bHeight/2 + 5;
                } else if (i >= 3 && i < 6) {
                  return y1+bHeight/2 + 10;
                } else {
                  return y0+y1+bHeight + 32;
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
                && (parseInt(userArray[0]) <= 2055)
                && (!twoYears)
                && (parseInt(userArray[0]) != currentValue)) {
            currentValue = parseInt(userArray[0]);
            comparedValue = currentValue + 1;
            select(currentValue);
          }
      }

      if (twoYears) {
        var tf = textfield()
          .x(20) // X Position
          .y(150) // Y Position 
          .width(160) // Width 
          .height(30) // Height 
          .callback(callback) // Callback returning the current text 
          .text(currentValue + "," + comparedValue) // Default text 
          .fill("#3B444C") // Default fill 
          .stroke("none") // Default border 
          .fillSelected("#31708E") // Fill when activated 
          .strokeSelected("none") // Border when activated 
          .color("white") // Text color 
          .colorSelected("grey") // Text color when activated 
          .returnLowercase(false) // Auto-lowercase input text before calling back 
          .returnEmpty(false) // Shall textfield call back if input text is empty
        d3.select("#mainChart").call(tf)
      } else {
        var tf = textfield()
          .x(20) // X Position
          .y(150) // Y Position 
          .width(160) // Width 
          .height(30) // Height 
          .callback(callback) // Callback returning the current text 
          .text(currentValue) // Default text 
          .fill("#3B444C") // Default fill 
          .stroke("none") // Default border 
          .fillSelected("#31708E") // Fill when activated 
          .strokeSelected("none") // Border when activated 
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
