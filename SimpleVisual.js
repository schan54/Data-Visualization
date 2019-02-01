// Data from http://www.globalcarbonatlas.org/en/CO2-emissions
const data = [
	{ name: 'Albania', emissions: 6.3792, xy: 1, color: 'black'},
	{ name: 'Australia', emissions: 413.09, xy: 2, color: 'yellow'},
	{ name: 'Brazil', emissions: 476.0668, xy: 3, color: 'green'},
	{ name: 'Czech Republic', emissions: 107.8958, xy: 4, color: 'red'},
	{ name: 'Denmark', emissions: 34.55, xy: 5, color: 'pink'},
];

// Create svg container to hold visualization
const svg = d3.select('#example').append('svg') // select by id and append svg element
		.attr('width', 1000)
		.attr('height', 1000)
		.style('background-color', '#888888');

// Create SVG elements from data
svg.selectAll('circle')					// Create visual circle template
	.data(data)							// bind data
.enter()								// for each row
	.append('circle')					// make a circle where...
		.attr('id', function(d) { return d.name; })
		.attr('cx', function(d) { return d.xy * 200 - 100; })
		.attr('cy', function(d) { return d.xy * 200 - 100; })
		.attr('r', function(d) { return d.emissions / 4; })
		.attr('fill', function(d) { return d.color; })
	.append('svg:title')
		.text(function(d) { return 'Country: ' + d.name + ', ' + d.emissions + ' MtCO2'; });