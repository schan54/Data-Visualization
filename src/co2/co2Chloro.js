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
    .domain([-25,0,25,50,100,200,500,800,1000])
    .range([d3.interpolateRdYlBu(1), d3.interpolateRdYlBu(0.85), d3.interpolateRdYlBu(0.7), d3.interpolateRdYlBu(0.55),
          d3.interpolateRdYlBu(0.4), d3.interpolateRdYlBu(0.25), d3.interpolateRdYlBu(0.1), d3.interpolateRdYlBu(0)]);



var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(200)
                  .translate( [width / 2, height / 1.5 + 150]);




var path = d3.geoPath().projection(projection);

svg.call(tip);

queue()
    .defer(d3.json, "../core/world_countries.json")
    .defer(d3.tsv, "worldData.tsv")
    .await(ready);

var userYear = formatDateIntoYear(startDate);

svg.append("line").attr("x1", 0).attr("y1", 200).attr("x2", 1500).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
svg.append("line").attr("x1", 370).attr("y1", 0).attr("x2", 370).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
svg.append("line").attr("x1", 580).attr("y1", 0).attr("x2", 580).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
svg.append("line").attr("x1", 820).attr("y1", 0).attr("x2", 820).attr("y2", 200).attr("stroke-width", 0.5).attr("stroke", "black");
var compareString = "1960 vs 1960";
svg.append("text").html(compareString).attr("x", 390).attr("y", 120).attr("id", "choroYear");

function ready(error, data, population) {
  d3.select("#choroYear").remove()
  var populationById = {};

  if(document.getElementById('Compare').checked) {
    population.forEach(function(d) { populationById[d.id] = +d[userYear] - +d[1960]; });
    compareString = userYear + " vs " + 1960;
    svg.append("text").html(compareString).attr("x", 390).attr("y", 120).attr("id", "choroYear");
  }

  else if(document.getElementById('Isolated').checked) {
    population.forEach(function(d) { populationById[d.id] = +d[userYear]; });
    svg.append("text").html(userYear).attr("x", 390).attr("y", 120).attr("id", "choroYear");
  }

  var allCountries = [];

  function bubbleSort(a){
    var swapp;
    var n = a.length-1;

    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {

            if (Number(x[i][1]) > Number(x[i+1][1])) {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
  allCountries = x;
  return;
  }



  function biggest5(hashmap) {

    tea = Object.values(hashmap)

    //console.log(Object.values(tea[1]))

    var yearIndex = userYear - 1960
    for (var index in tea) {
      //console.log(Object.keys(tea[index]));
      var countryKeys = (Object.keys(tea[index]));
      var countryValues = (Object.values(tea[index]));
      var countryArray = [];

      countryArray.push(countryKeys[yearIndex]);
      countryArray.push(countryValues[yearIndex]);
      countryArray.push(countryValues[countryKeys.length-1]);
      if (isNaN(countryArray[1]) || countryArray[1] == "" || !(isNaN(countryArray[2]))) {
      }
      else {
        allCountries.push(countryArray);
      }
    }
    //console.log(allCountries);
    bubbleSort(allCountries);
    return;
  }
  biggest5(population);

  max5 = allCountries.slice((allCountries.length - 5), allCountries.length);
  min5 = allCountries.slice(0, 5);

  function displayMin(a) {
    d3.select("#top1").remove();
    d3.select("#top2").remove();
    d3.select("#top3").remove();
    d3.select("#top4").remove();
    d3.select("#top5").remove();

    svg.append("text").html("1. " + a[4][2] + ": " + a[4][1] + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
    svg.append("text").html("2. " + a[3][2] + ": " + a[3][1] + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
    svg.append("text").html("3. " + a[2][2] + ": " + a[2][1] + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
    svg.append("text").html("4. " + a[1][2] + ": " + a[1][1] + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
    svg.append("text").html("5. " + a[0][2] + ": " + a[0][1] + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);
  }

  function displayMax(a) {
    d3.select("#top1").remove();
    d3.select("#top2").remove();
    d3.select("#top3").remove();
    d3.select("#top4").remove();
    d3.select("#top5").remove();

    svg.append("text").html("1. " + a[0][2] + ": " + a[0][1] + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
    svg.append("text").html("2. " + a[1][2] + ": " + a[1][1] + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
    svg.append("text").html("3. " + a[2][2] + ": " + a[2][1] + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
    svg.append("text").html("4. " + a[3][2] + ": " + a[3][1] + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
    svg.append("text").html("5. " + a[4][2] + ": " + a[4][1] + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);
  }

  function displayTotal() {
    d3.select("#totalSum").remove();
    var totalSum = 0;
    for (index in allCountries) {
      totalSum = totalSum + Number(allCountries[index][1]);
    }
    svg.append("text").html("World's Total Emissions: " + Math.floor(totalSum)).attr("id", "totalSum").attr("x", 600).attr("y", 70);
  }

  displayTotal();
  displayMax(max5);



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
