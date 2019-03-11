// Global variables
var playButton = d3.select("#play-button");
var enterButton = d3.select("#Submit");

var moving = false;

var currentValue = 1960;
var targetValue = 2016;

// Event Handler for clicking play button
playButton.on("click", function() {
  var button = d3.select(this);
  if (button.text() == "Pause") {
    moving = false;
    clearInterval(timer);
    // timer = 0;
    button.text("Play");
  } else {
    moving = true;
    timer = setInterval(step, 1000);
    button.text("Pause");
  }
})

// Event handler for clicking enter button
enterButton.on("click", function() {
  currentValue = document.getElementById("myVal").value;
  if (currentValue < 1960 || currentValue > 2017) {
    d3.select('#instructions').text("Not a valid year");
  } else {
    d3.select('#instructions').text("Enter a year between 1960 and 2017");
    select(currentValue);
    d3.select("#displayYear").text(currentValue);
  }
})

// Increase year by one and render
function step() {
  currentValue++;
  select(currentValue);
  d3.select("#displayYear").text(currentValue);
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
    var width = 1200;
        height = 700;
        columnForColors = "continent";
        columnForRadius = "value";
        yearTemp = yearValue;
        max1 = 0;
        max2 = 0;
        max3 = 0;
        max4 = 0;
        max5 = 0;

    function chart(selection) {
      var data = selection.datum();
      var div = selection,
          svg = div.selectAll('svg');
      svg.attr('width', width).attr('height', height);

      // Tooltip for Bubble Chart
      var tooltip = selection
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "#626D71")
        .style("border-radius", "6px")
        .style("text-align", "center")
        .style("font-family", "monospace")
        .style("width", "400px")
        .text("");

      // Simulate forces acting on each node
      var simulation = d3.forceSimulation(data.filter(function(d) { return d.year == yearTemp}))
        .force("charge", d3.forceManyBody().strength([-35]))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

      function ticked(e) {
        node.attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
      }

      // Set up color scheme
      var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
      // Set up radius scale
      var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
        return +d[columnForRadius];
      }), d3.max(data, function(d) {
        return +d[columnForRadius];
      })]).range([2, 80])

      // Remove all elements in chart area before entering
      d3.selectAll("svg > *").remove();

      // Enter() data
      var node = svg.selectAll("circle")
        .data(data.filter(function(d) { return d.year == yearTemp}))
        .enter()
        .append("circle")
        .attr('r', function(d) {
            return scaleRadius(d[columnForRadius])
        })
        .style("fill", function(d) {
            return colorCircles(d[columnForColors])
        })
        .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
        .on("mouseover", function(d) {
          if (moving == false) {
            tooltip.html(d.country + "<br>" + d[columnForRadius] + " MtCO2");
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
      
      //max1 = d3.max(d3.values(data.filter(function(d) { return d.year == yearTemp})), function(d) { return d.value});

      //max1 = Math.max()
      //console.log(Math.max(d3.values(data.filter(function(d) { return d.year == yearTemp}))));

      var tempArray = [];
      var tempStringArray = [];
      var index = 0;
      var stringIndex = 0;
      var sumValues = 0;

      // Parse CO2 values from string to int
      data.filter(function(d) {return d.year == yearTemp; }).forEach(function(d) {
        d.value = parseInt(d.value);
        tempArray[index] = d.value;
        tempStringArray[index] = d.country;
        index++;
      })

      d3.select("#topThree").selectAll("p").remove();

      sumValues = d3.sum(tempArray);

      var topEmissions = d3.select("#topThree").append("p");

      // Find the max value in this year
      max1 = d3.max(data.filter(function(d) {return d.year == yearTemp; }), function(d) {return d.value; });
      stringIndex = tempArray.indexOf(max1);
      topEmissions.append("text").html("1. " + tempStringArray[stringIndex] + ": " + max1 + " MtCO2" + "</br>");
      tempStringArray.splice(tempArray.indexOf(max1), 1);
      tempArray.splice(tempArray.indexOf(max1), 1); // Remove max from temporary array
      
      max2 = d3.max(tempArray); // Find the second max
      stringIndex = tempArray.indexOf(max2); // Get the index
      topEmissions.append("text").html("2. " + tempStringArray[stringIndex] + ": " + max2 + " MtCO2" + "</br>");
      tempStringArray.splice(tempArray.indexOf(max2), 1);
      tempArray.splice(tempArray.indexOf(max2), 1); // Remove second max from temporary array
      
      max3 = d3.max(tempArray); // Find the third max
      stringIndex = tempArray.indexOf(max3); // Get the index
      topEmissions.append("text").html("3. " + tempStringArray[stringIndex] + ": " + max3 + " MtCO2" + "</br>");
      tempStringArray.splice(tempArray.indexOf(max3), 1);
      tempArray.splice(tempArray.indexOf(max3), 1);

      max4 = d3.max(tempArray); // Find the fourth max
      stringIndex = tempArray.indexOf(max4); // Get the index
      topEmissions.append("text").html("4. " + tempStringArray[stringIndex] + ": " + max4 + " MtCO2" + "</br>");
      tempStringArray.splice(tempArray.indexOf(max4), 1);
      tempArray.splice(tempArray.indexOf(max4), 1);

      max5 = d3.max(tempArray); // Find the fifth max
      stringIndex = tempArray.indexOf(max5);
      topEmissions.append("text").html("5. " + tempStringArray[stringIndex] + ": " + max5 + " MtCO2" + "</br>");
      

      topEmissions.append("text").html("</br>" + "Total Emissions: " + "</br>" + sumValues + " MtCO2");
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