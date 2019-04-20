var margin = {top: 20, right: 40, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = Math.floor(width / 19) - 1;
var x = d3v3.scale.linear()
    .range([barWidth / 2, width - barWidth / 2]);

var y = d3v3.scale.linear()
    .range([height, 0]);

var yAxis = d3v3.svg.axis()
    .scale(y)
    .orient("right")
    .tickSize(-width)
    .tickFormat(function(d) { return Math.round((d / 1)) ; });
 var divs = d3v3.select("body").append("divs")
    .attr("class", "tooltip")
    .style("opacity", 0);
// An SVG element with a bottom-right origin.
var svg = d3v3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// A sliding container to hold the bars by birthyear.
var birthyears = svg.append("g")
    .attr("class", "birthyears");

// A label for the current year.
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .text(2014);
var title2 = svg.append("text")
    .attr("class", "title2")
    .attr("dx","5em")
    .attr("dy", ".75em")
    .text("Afghanistan");

d3v3.tsv("data/crucy.v3.23.1901.2014.Afghanistan.tmp.tsv", function(error, data) {

  // Convert strings to numbers.
  data.forEach(function(d) {
    d.temp = +d.temp;

    d.year = +d.year;
    d.month = +d.month;
  });

  // Compute the extent of the data set in age and years.
  var month1 = d3v3.max(data, function(d) { return d.month; }),
      year0 = d3v3.min(data, function(d) { return d.year; }),
      year1 = d3v3.max(data, function(d) { return d.year; }),
      year = year1;
var selects = document.getElementsByTagName('select');
for (var i = 0; i < selects.length; i++){
    selects[i].addEventListener('keydown',function(e){
        var key = e.which || e.keyCode;
        if(key == 37){
            var previousSibling = this.previousSibling;
            while(previousSibling && previousSibling.nodeType != 1) {
                previousSibling = previousSibling.previousSibling
            }
            previousSibling.focus();
            e.preventDefault();
        }else if(key === 39){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
        else if(key === 38){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
        else if(key === 40){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
    })
}
  // Update the scale domains.
  x.domain([year1 - month1, year1]);
  y.domain([ -50,50]);


  // Produce a map from year and birthyear to [male, female].
  data = d3v3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.year - d.month; })
      .rollup(function(v) { return v.map(function(d) { return d.temp; }); })
      .map(data);

  // Add an axis to show the population values.
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis)
    .selectAll("g")
    .filter(function(value) { return !value; })
      .classed("zero", true);

  // Add labeled rects for each birthyear (so that no enter or exit is required).
  var birthyear = birthyears.selectAll(".birthyear")
      .data(d3v3.range(year0 - month1, year1 + 1, 1))
    .enter().append("g")
      .attr("class", "birthyear")
      .attr("transform", function(birthyear) { return "translate(" + x(birthyear) + ",0)"; });

  birthyear.selectAll("rect")
      .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
    .enter().append("rect")
      .attr("x", -barWidth / 2)
      .attr("width", barWidth)
      .attr("y", y)
      .attr("height", function(value) { return (height - y(value)); })
       .on("mouseover", function(d) {
            divs.transition()
                .duration(200)
                .style("opacity", .9);
              //  divs.html(d)
              divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
              + d+ "</span><br>" )
                .style("left", (d3v3.event.pageX) + "px")
                .style("top", (d3v3.event.pageY) + "px");
            })
        .on("mouseout", function(d) {
            divs.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.bottom ) + ")")
      .style("text-anchor", "middle")
      .text("Month");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperature °C");


  // Add labels to show age (separate; not animated).
  svg.selectAll(".month")
      .data(d3v3.range(0, month1 + 2, 1))
    .enter().append("text")
      .attr("class", "month")
      .attr("x", function(month) { return x(year - month+1); })
      .attr("y", height + 4)
      .attr("dy", ".71em")

      .text(function(month) { return month; });
var leftButt = d3v3.select("#leftButt");
var rightButt = d3v3.select("#rightButt");

leftButt.on("click", function() {
  var button = d3v3.select(this);
  year = Math.max(year0, year - 1);
  update();
})

rightButt.on("click", function() {
  var button = d3v3.select(this);
  year = Math.max(year0, year + 1);
  update();
})
  // Allow the arrow keys to change the displayed year.
  window.focus();
  d3v3.select(window).on("keydown", function() {
    switch (d3v3.event.keyCode) {
      case 37: year = Math.max(year0, year - 1); break;
      case 39: year = Math.min(year1, year + 1); break;
    }
    update();
  });

  function update() {
    if (!(year in data)) return;
    title.text(year);

    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
      .transition()
        .duration(750)
        .attr("y", y)
        .attr("height", function(value) { return height - y(value); });
  }
});


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Data Update for different countries

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

d3v3.select('#inds')
            .on("change", function () {
                var sect = document.getElementById("inds");
                var section = sect.options[sect.selectedIndex].value;
                updateTest(section);

            });

function updateTitle(source){
    var ret = source.replace(/crucy.v3.23.1901.2014./g,'');
    var ret2 = ret.replace(/.tmp.tsv/g,'');
    var ret3 = ret2.replace(/_/g,'');
//      title2.text(ret3);
var ret4 = ret3.replace(/data/g,' ');
var ret5 = ret4.replace(/\//g,' ');

title2.text(ret5)
    }
        // update function:
function updateTest(source) {
        d3v3.tsv(source, function(error,data) {
var ret = source.replace(/crucy.v3.23.1901.2014./g,'');
var ret2 = ret.replace(/.tmp.tsv/g,'');
var ret3 = ret2.replace(/_/g,' ');
var ret4 = ret3.replace(/data/g,' ');
var ret5 = ret4.replace(/\//g,' ');


title.text(2014)
var titSource = updateTitle(source);

title2.text(ret5)


var x = d3v3.scale.linear()
    .range([barWidth / 2, width - barWidth / 2]);

var y = d3v3.scale.linear()
    .range([height,0]);

var yAxis = d3v3.svg.axis()
    .scale(y)
    .orient("right")
    .tickSize(-width)
    .tickFormat(function(d) { return Math.round(d / 1) ; });

// A sliding container to hold the bars by birthyear.
var birthyears = svg.append("g")
    .attr("class", "birthyears");

// Convert strings to numbers.
data.forEach(function(d) {
  d.temp = +d.temp;

  d.year = +d.year;
  d.month = +d.month;
});
var dot = svg.select('.birthyear').data(data)
dot.exit().remove()

// Compute the extent of the data set in age and years.
var month1 = d3v3.max(data, function(d) { return d.month; }),
    year0 = d3v3.min(data, function(d) { return d.year; }),
    year1 = d3v3.max(data, function(d) { return d.year; }),
    year = year1;

// Update the scale domains.
x.domain([year1 - month1, year1]);
y.domain([ -50,50]);
//y.domain([d3v3.min(data, function(d) { return d.temp}) , d3v3.max(data, function(d) { return d.temp; })]);


// Produce a map from year and birthyear to [male, female].
data = d3v3.nest()
    .key(function(d) { return d.year; })
    .key(function(d) { return d.year - d.month; })
    .rollup(function(v) { return v.map(function(d) { return d.temp; }); })
    .map(data);
var dot3 = svg.select('g').data(data)
dot3.exit().remove()
// Add an axis to show the population values.
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis)
  .selectAll("g")
  .filter(function(value) { return !value; })
    .classed("zero", true);

    var dot3 = svg.select('g').data(data)
dot3.exit().remove()
// Add labeled rects for each birthyear (so that no enter or exit is required).
var birthyear = birthyears.selectAll(".birthyear")
    .data(d3v3.range(year0 - month1, year1 + 1, 1))

  .enter().append("g")
    .attr("class", "birthyear")
    .attr("transform", function(birthyear) { return "translate(" + x(birthyear) + ",0)"; });

birthyear.selectAll("rect")

    .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
  .enter().append("rect")
    .attr("x", -barWidth / 2)
    .attr("width", barWidth)
    .attr("y", y)

    .attr("height", function(value) { return height - y(value)  ; })
     .on("mouseover", function(d) {
          divs.transition()
              .duration(200)
              .style("opacity", .9);
            // divs.html(d)
            divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
              + d+ "</span><br>" )
              .style("left", (d3v3.event.pageX) + "px")
              .style("top", (d3v3.event.pageY) + "px");
          })
      .on("mouseout", function(d) {
          divs.transition()
              .duration(500)
              .style("opacity", 0);
      });

// Add labels to show age (separate; not animated).
svg.selectAll(".month")
    .data(d3v3.range(0, month1 + 1, 1))
  .enter().append("text")
    .attr("class", "month")
    .attr("x", function(month) { return x(year - month); })
    .attr("y", height + 4)
    .attr("dy", ".71em")

    .text(function(month) { return month; });

    var leftButt = d3v3.select("#leftButt");
var rightButt = d3v3.select("#rightButt");

leftButt.on("click", function() {
  var button = d3v3.select(this);
  year = Math.max(year0, year - 1);
  update();
})

rightButt.on("click", function() {
  var button = d3v3.select(this);
  year = Math.max(year0, year + 1);
  update();
})
// Allow the arrow keys to change the displayed year.
window.focus();
d3v3.select(window).on("keydown", function() {
  switch (d3v3.event.keyCode) {
    case 37: year = Math.max(year0, year - 1); break;
    case 39: year = Math.min(year1, year + 1); break;
  }
  update();
});

function update() {
  if (!(year in data)) return;
  title.text(year);

  birthyears.transition()
      .duration(750)
      .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

  birthyear.selectAll("rect")
      .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
    .transition()
      .duration(750)
      .attr("y", y)
      .attr("height", function(value) { return (height - y(value)) ; });
}
});


        }