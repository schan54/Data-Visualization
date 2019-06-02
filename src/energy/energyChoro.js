// Set tooltips
var colorCompare = d3.scaleThreshold()
    .domain(colorCompareDomain)
		.range([d3.interpolateRdYlGn(1), d3.interpolateRdYlGn(0.9), d3.interpolateRdYlGn(0.8), d3.interpolateRdYlGn(0.7),
          d3.interpolateRdYlGn(0.6), d3.interpolateRdYlGn(0.5), d3.interpolateRdYlGn(0.4), d3.interpolateRdYlGn(0.3),
					d3.interpolateRdYlGn(0.2), d3.interpolateRdYlGn(0.1), d3.interpolateRdYlGn(0.0)]);

var colorIsolated = d3.scaleThreshold()
    .domain(colorIsolatedDomain)
    .range([d3.interpolateRdYlGn(1), d3.interpolateRdYlGn(0.9), d3.interpolateRdYlGn(0.8), d3.interpolateRdYlGn(0.7),
          d3.interpolateRdYlGn(0.6), d3.interpolateRdYlGn(0.5), d3.interpolateRdYlGn(0.4), d3.interpolateRdYlGn(0.3),
					d3.interpolateRdYlGn(0.2), d3.interpolateRdYlGn(0.1), d3.interpolateRdYlGn(0.0)]);

var projection = d3.geoMercator()
                   .scale(200)
                  .translate( [width / 2, height / 1.5 + 150]);

var path = d3.geoPath().projection(projection);

choroSvg.call(tip);

var promises = [];
promises.push(d3.json("../core/world_countries.json"));
promises.push(d3.tsv("energyChloro.tsv"));
Promise.all(promises).then(function(data){ready(data);});

choroSvg.append("line").attr("x1", 370).attr("y1", 0).attr("x2", 370).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
choroSvg.append("line").attr("x1", 580).attr("y1", 0).attr("x2", 580).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
choroSvg.append("line").attr("x1", 820).attr("y1", 0).attr("x2", 820).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");

function ready(data) {
	var populationById = {};
  //data[0] = map feature
  // data[1] = data

  d3.select("#choroYear1").remove()
  d3.select("#choroYear2").remove()
  d3.select("#vs").remove()
  var populationById = {};
  var max5, min5;

  if(compareActive == true) {
		data[1].forEach(function(d) { populationById[d.id] = +d[userYear] - +d[userYear2]});
		choroSvg.append("text").html(userYear).attr("x", 410).attr("y", 65).attr("id", "choroYear1");
    choroSvg.append("text").html("vs").attr("x", 455).attr("y", 100).attr("id", "vs");
    choroSvg.append("text").html(userYear2).attr("x", 410).attr("y", 160).attr("id", "choroYear2");
    var sortedHash1 = sortHash(data[1], userYear);
    var sortedHash2 = sortHash(data[1], userYear2);
    displaySumCompare(sortedHash1, sortedHash2);
    displayMaxCompare(sortedHash1, sortedHash2);

    //displayPercentCompare(sortedHash1, sortedHash2);

    tip.html(function(d) {
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + " vs " + userYear2 +": </strong><span class='details'>" + format(d.value) +"</span>";
    })
  }

  else {
		data[1].forEach(function(d) { populationById[d.id] = +d[userYear]; });
    choroSvg.append("text").html(userYear).attr("x", 415).attr("y", 120).attr("id", "choroYear1");
    var sortedHash = sortHash(data[1], userYear);

    max5 = sortedHash.slice((sortedHash.length - 5), sortedHash.length);
    min5 = sortedHash.slice(0, 5);

    displaySumIso(sortedHash);
    displayMaxIso(max5, min5);


    tip.html(function(d) {
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>" + userYear + ": </strong><span class='details'>" + format(d.value) +"</span>";
    })
  }

	data[0].features.forEach(function(d) { d.value = populationById[d.id] });

	choroSvg.append("g")
			.attr("class", "countries")
	 .selectAll("path")
			.data(data[0].features)
		.enter().append("path")
			.attr("d", path)
			.style("fill", function (d)  {
				if (compareActive == true) {
					return colorCompare(populationById[d.id]);
				}
				else {
					return colorIsolated(populationById[d.id]);
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

	choroSvg.append("path")
			.datum(topojson.mesh(data[0].features, function(a, b) { return a.id !== b.id; }))
			 // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
			.attr("class", "names")
			.attr("d", path);
}
