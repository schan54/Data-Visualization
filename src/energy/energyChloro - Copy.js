var format = d3.format(",");

var dataset;

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%Y");

var startDate = new Date("1991"),
    endDate = new Date("2018");

var margin = {top:0, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

////////// slider //////////

var svgSlider = d3.select("#slider")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height);

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width-100])
    .clamp(true);

var slider = svgSlider.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

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
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateIntoYear(startDate))
    .attr("transform", "translate(0," + (-25) + ")")


// Set tooltips
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + ": </strong><span class='details'>" + format(d.value) +"</span>";
            })

var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 1400 - margin.left - margin.right,
            height = 1000 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([-1000,-500,-100,-25,-5,5,25,100,500,1000])
    .range([d3.interpolateSpectral(0.9), d3.interpolateSpectral(0.8), d3.interpolateSpectral(0.7), d3.interpolateSpectral(0.6),
            d3.interpolateSpectral(0.5), d3.interpolateSpectral(0.4), d3.interpolateSpectral(0.3), d3.interpolateSpectral(0.2), d3.interpolateSpectral(0.1)]);

var path = d3.geoPath();

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(200)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

var promises = [];
promises.push(d3.json("../core/world_countries.json"));
promises.push(d3.tsv("energyChloro.tsv"));
Promise.all(promises).then(function(data){ready(data);});

var userYear = "1991"

function ready(data) {
  var populationById = {};
  //data[0] = map feature
  // data[1] = data
  data[1].forEach(function(d) { populationById[d.id] = +d[userYear]; });
  data[0].features.forEach(function(d) { d.value = populationById[d.id] });

  svg.append("g")
      .attr("class", "countries")
   .selectAll("path")
      .data(data[0].features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(populationById[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .datum(topojson.mesh(data[0].features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
}

/* Toggle between adding and removing the "responsive" class to menubar when the user clicks on the icon */
function hamFunction() {
  var x = document.getElementById("mymenu");
  if (x.className === "menubar") {
    x.className += " responsive";
  } else {
    x.className = "menubar";
  }
}

function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDateIntoYear(h));

  if (userYear != (formatDateIntoYear(h))) {
    userYear = formatDateIntoYear(h)
    var promises = [];
    promises.push(d3.json("../core/world_countries.json"));
    promises.push(d3.tsv("energyChloro.tsv"));
    Promise.all(promises).then(function(data){ready(data);});
  }
}
