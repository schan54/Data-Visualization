// Set tooltips

var color = d3.scaleThreshold()
    .domain([-25,0,25,50,100,200,500,800,1000])
    .range([d3.interpolateRdYlBu(1), d3.interpolateRdYlBu(0.85), d3.interpolateRdYlBu(0.7), d3.interpolateRdYlBu(0.55),
          d3.interpolateRdYlBu(0.4), d3.interpolateRdYlBu(0.25), d3.interpolateRdYlBu(0.1), d3.interpolateRdYlBu(0)]);


var projection = d3.geoMercator()
                   .scale(200)
                  .translate( [width / 2, height / 1.5 + 150]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

queue()
    .defer(d3.json, "../core/world_countries.json")
    .defer(d3.tsv, "worldData.tsv")
    .await(ready);

svg.append("line").attr("x1", 370).attr("y1", 0).attr("x2", 370).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
svg.append("line").attr("x1", 580).attr("y1", 0).attr("x2", 580).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
svg.append("line").attr("x1", 820).attr("y1", 0).attr("x2", 820).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");

var compareString = "1960 vs 1960";
svg.append("text").html(compareString).attr("x", 390).attr("y", 120).attr("id", "choroYear");

function ready(error, data, population) {

  d3.select("#choroYear").remove()
  var populationById = {};
  var max5, min5;

  if(compareActive == true) {
    population.forEach(function(d) { populationById[d.id] = +d[userYear] - +d[userYear2]; });
    compareString = userYear + " vs " + 1960;
    svg.append("text").html(compareString).attr("x", 390).attr("y", 120).attr("id", "choroYear");

    var sortedHash1 = sortHash(population, userYear);
    var sortedHash2 = sortHash(population, userYear2);

    console.log(sortedHash1);
    console.log(sortedHash2);

    displayTotalCompare(sortedHash1, sortedHash2);
    displayMaxCompare(sortedHash1, sortedHash2);

  }

  else {
    population.forEach(function(d) { populationById[d.id] = +d[userYear]; });
    svg.append("text").html(userYear).attr("x", 390).attr("y", 120).attr("id", "choroYear");

    var sortedHash = sortHash(population, userYear);

    max5 = sortedHash.slice((sortedHash.length - 5), sortedHash.length);
    min5 = sortedHash.slice(0, 5);

    displayTotalIso(sortedHash);
    displayMaxIso(max5);
  }



  data.features.forEach(function(d) { d.value = populationById[d.id] });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .remove()
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
