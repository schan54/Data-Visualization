

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, 
    svgHeight = 400, 
    barPadding = 5,
    barWidth = (svgWidth / dataset.length);

// size of the svg chart
var svg = d3.select('body').append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// scale the data    
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight]);  

// scaling the axes according to data
var xAxis = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, svgWidth]); 
var yAxis = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight, 0]);  

// creates axes and shifts the axes on the chart so we can see it
var xAxes = d3.axisBottom().scale(xAxis);
var yAxes = d3.axisLeft().scale(yAxis);
svg.append("g")
    .attr("transform", "translate(25, 0)")
    .call(yAxes);
var xAxisTranslate = svgHeight - 20;
svg.append("g")
    .attr("transform", "translate(25, " + xAxisTranslate + ")")
    .call(xAxes);

     
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", d => svgHeight - yScale(d)) // y position start for placing bar
    .attr("height", d => yScale(d) ) //height = length of bar
    .attr("width", barWidth - barPadding) // width of bar
    .attr("class", "bar")
    .attr("transform", (d, i) => {
        var translate = [barWidth * i + 25, -20]; // x position start for placing bar
        return "translate("+ translate +")";
    });

// displays text, but doesnt work if theres axes for some reason
var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(d => d)
    .attr("y", (d, i) => svgHeight - d - 2)
    .attr("x", (d, i) => barWidth * i )
    .attr("fill", "#A64C38");
