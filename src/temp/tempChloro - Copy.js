function tempChloro () {
  var format = d3.format(",");

  var dataset;

  var formatDateIntoYear = d3.timeFormat("%Y");
  var formatDate = d3.timeFormat("%Y");

  var startDate = new Date("1902"),
      endDate = new Date("2015");

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
      .range([0, width])
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
      .domain([-.2,-.1,0,.1,.2,.4,.6,.8,1, 1.2])
      .range([d3.interpolateRdBu(0.9), d3.interpolateRdBu(0.8), d3.interpolateRdBu(0.7), d3.interpolateRdBu(0.6), d3.interpolateRdBu(0.5),
            d3.interpolateRdBu(0.4), d3.interpolateRdBu(0.3), d3.interpolateRdBu(0.2), d3.interpolateRdBu(0.1)]);

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

  var userYear = "1901";
  var initialYearAsList = [];

  queue()
      .defer(d3.json, "../core/world_countries.json")
      .defer(d3.tsv, "worldTemp.tsv")
      .await(ready);

  function newMap() {
    svg.remove();
    svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');
    svg.call(tip);
    console.log("Generating newMap");
  }

  function ready(error, data, population) {
    var populationById = {};


    /*
    if (userYear == 1901) {
      population.forEach(function(d) { populationById[d.id] = +d[userYear]; });
      data.features.forEach(function(d) { d.value = populationById[d.id] });
      console.log(population);
      console.log(data);

      //console.log(population[Object.keys(population)[1]]);

      for (var index in population) {
        //console.log(Object.keys(population[index]))
        value = Object.values(population[index])

        if (isNaN(value[0])) {
          //console.log("Found not values");
          //console.log(Object.keys(population[index]));
        }
        else {
          initialYearAsList.push(value[0]);
          //console.log(value);
        }
      }
    }
    else {
      population.forEach(function(d) { populationById[d.id] = +d[userYear] - +d[1901]; });
      data.features.forEach(function(d) { d.value = populationById[d.id] });
    }*/
    //newMap();

    population.forEach(function(d) { populationById[d.id] = +d[userYear] - +d[1901]; });
    data.features.forEach(function(d) { d.value = populationById[d.id] });

    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)

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
  }

  function update(h) {
    // update position and text of label according to slider scale
    handle.attr("cx", x(h));
    label
      .attr("x", x(h))
      .text(formatDateIntoYear(h));

    if (userYear != (formatDateIntoYear(h))) {
      userYear = formatDateIntoYear(h)
      queue()
          .defer(d3.json, "../core/world_countries.json")
          .defer(d3.tsv, "worldTemp.tsv")
          .await(ready);
    }
  }
}

tempChloro();
