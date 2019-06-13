//Create color scale based on compare or isolated
var colorCompare = d3.scaleThreshold()
    .domain(colorCompareDomain)
    .range([d3.interpolateRdYlBu(1), d3.interpolateRdYlBu(0.9), d3.interpolateRdYlBu(0.8), d3.interpolateRdYlBu(0.7),
          d3.interpolateRdYlBu(0.6), d3.interpolateRdYlBu(0.5), d3.interpolateRdYlBu(0.4), d3.interpolateRdYlBu(0.3),
					d3.interpolateRdYlBu(0.2), d3.interpolateRdYlBu(0.1), d3.interpolateRdYlBu(0.0)]);

var colorIsolated = d3.scaleThreshold()
    .domain(colorIsolatedDomain)
    .range([d3.interpolateRdYlBu(1), d3.interpolateRdYlBu(0.9), d3.interpolateRdYlBu(0.8), d3.interpolateRdYlBu(0.7),
          d3.interpolateRdYlBu(0.6), d3.interpolateRdYlBu(0.5), d3.interpolateRdYlBu(0.4), d3.interpolateRdYlBu(0.3),
					d3.interpolateRdYlBu(0.2), d3.interpolateRdYlBu(0.1), d3.interpolateRdYlBu(0.0)]);

//Draws the world map
var projection = d3.geoMercator()
                   .scale(200)
                  .translate( [width / 2, height / 1.5 + 150]);

var path = d3.geoPath().projection(projection);

//Apply tooltips to the map
choroSvg.call(tip);

//First render of the choropleth with proper data
queue()
    .defer(d3.json, "../core/world_countries.json")
    .defer(d3.tsv, "worldTemp.tsv")
    .await(ready);

//Draw the header boxes
choroSvg.append("line").attr("x1", 370).attr("y1", 0).attr("x2", 370).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
choroSvg.append("line").attr("x1", 580).attr("y1", 0).attr("x2", 580).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
choroSvg.append("line").attr("x1", 820).attr("y1", 0).attr("x2", 820).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");


//Main function for choropleth
function ready(error, data, population) {

	//Undraw the Year box
  d3.select("#choroYear1").remove()
  d3.select("#choroYear2").remove()
  d3.select("#vs").remove()

	//Definte some vars
  var populationById = {};
  var max5, min5;

	//If compare selected do this
  if(compareActive == true) {

		//Load the data
    population.forEach(function(d) { populationById[d.id] = +d[userYear] - +d[userYear2]; });

		//Draw the Year section of header
		choroSvg.append("text").html(userYear2).attr("x", 410).attr("y", 65).attr("id", "choroYear2");
    choroSvg.append("text").html("vs").attr("x", 455).attr("y", 100).attr("id", "vs");
    choroSvg.append("text").html(userYear).attr("x", 410).attr("y", 160).attr("id", "choroYear1");

		//Sort the hash of each user yaer based on size
    var sortedHash1 = sortHash(population, userYear);
    var sortedHash2 = sortHash(population, userYear2);

		//Functions to create the sum box and top5 box
    displaySumCompare(sortedHash1, sortedHash2);
    displayMaxCompare(sortedHash1, sortedHash2);

    //displayPercentCompare(sortedHash1, sortedHash2);

		//apply tooltip to html interaction
    tip.html(function(d) {
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + " vs " + userYear2 +": </strong><span class='details'>" + format(d.value) +"</span>";
    })
  }

	//Isolate filter selected
  else {

		//Load data
    population.forEach(function(d) { populationById[d.id] = +d[userYear]; });

		//Draw the Year box
		choroSvg.append("text").html(userYear).attr("x", 415).attr("y", 120).attr("id", "choroYear1");

		//Sort the data
    var sortedHash = sortHash(population, userYear);

		//Grab the top and bottom 5 of the isolated year
    max5 = sortedHash.slice((sortedHash.length - 5), sortedHash.length);
    min5 = sortedHash.slice(0, 5);

    displaySumIso(sortedHash);
    displayMaxIso(max5, min5);

		//Apply tooltip to HTML
    tip.html(function(d) {
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + ": </strong><span class='details'>" + format(d.value) +"</span>";
    })
  }

	//Map the data loaded to the country tags on the map
  data.features.forEach(function(d) { d.value = populationById[d.id] });

	d3.selectAll("path").remove();

	//Time to draw the colors!
  choroSvg.append("g")
    .attr("class", "countries")

		.selectAll("path")
			.remove()
      .data(data.features)
    .enter().append("path")
      .attr("d", path)

			//Fill based on data which changes for compare/isolated
      .style("fill", function (d)  {
				if (compareActive == true) {
					return colorCompare(populationById[d.id]);
					colorDomain = colorCompareDomain;
					buildLegend();
				}
				else {
					return colorIsolated(populationById[d.id]);
					colorDomain = colorIsolatedDomain;
					buildLegend();
				}
			})

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
