// visual js for bee swarm

var width = 1360,
	height = 550,
	radius = 10;
	

var svg = d3.select('body').append('svg')
			.attr('width', 1300)
			.attr('height', 600)
			.attr("id", "graph-2")

// middle line
svg.append("line", 'svg')
	.classed('main_line', true)
	.attr("x1", 0)
	.attr("y1", height/2)
	.attr("x2", 1300)
	.attr("y2", height/2)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 4.375 mm
	var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '325/2');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '2';
	svg.append('text')

// line for  145 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 650) //650 = 1300/2
	.attr("y1", 0)
	.attr("x2", 650) //650 =1300/2
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 145 mm
	var text7 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '650');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '145 mm';
	svg.append('text7')

// line for 51.25 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 325) //325 = 1300/4
	.attr("y1", 0)
	.attr("x2", 325) //325 = 1300/4
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 51.25 mm
	var text6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '325');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '51.25 mm';
	svg.append('text6')

// line for 238.75 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 975) // 325+650
	.attr("y1", 0)
	.attr("x2", 975)
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 238.75 mm
	var text5 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '975');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '238.75 mm';
	svg.append('text5')

// line for 4.375 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 325/2) //325 = 1300/4
	.attr("y1", 0)
	.attr("x2", 325/2) //325 = 1300/4
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 4.375 mm
	var text4 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '325/2');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '4.375 mm';
	svg.append('text4')


// line for 98.125 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 975/2) // 325+650
	.attr("y1", 0)
	.attr("x2", 975/2)
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 98.125 mm
	var text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '975/2');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '98.125 mm';
	svg.append('text3')

	// line for 191.875 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 812.5) // 162.5+650
	.attr("y1", 0)
	.attr("x2", 812.5)
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 191.875 mm
	var text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '812.5');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '191.875 mm';
	svg.append('text2')

	// line for 285.625 mm
	svg.append("line", 'svg')
	.classed('middle_line', true)
	.attr("x1", 1137.5) // 162.5+975
	.attr("y1", 0)
	.attr("x2", 1137.5)
	.attr("y2", height)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");

	//text for 285.625 mm
	var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', '1137.5');
	text.setAttribute('y', 'height/2');
	text.setAttribute('fill', '#000');
	text.textContent = '285.625 mm';
	svg.append('text1')


var x = d3.scaleLinear()
			.range([0, width])	
			.domain([0, 3]);


var data_set = '1979';




d3.json('sealevelbeeswarm2.json', function(data){


	console.log(data);


	function tick(){

		d3.selectAll('.circ')
			.attr('cx', function(d){return d.x})
			.attr('cy', function(d){return d.y})

	}


	svg.selectAll('.circ')
		.data(data)
		.enter().append('circle').classed('circ', true)
		.attr('r', radius)
		.attr('cx', function(d){return x(d[data_set]);})
		.attr('cy', function(){return height/2;})
		.on('click', function(){
			var circ = d3.select(this);

			circ.style('stroke', '#56C6D8')
				.style('stroke-width', 3)
		})



	var simulation = d3.forceSimulation(data)
		.force('x', d3.forceX(function(d){
				return x(d[data_set])
			}).strength(0.99)
		)
		.force('y', d3.forceY(height/2).strength(0.05))	
		.force('collide', d3.forceCollide(radius))
		.alphaDecay(0)
		.alpha(0.12)
		.on('tick', tick)	


	var init_decay; 
	init_decay = setTimeout(function(){
		console.log('init alpha decay')
		simulation.alphaDecay(0.1);
	}, 8000);

	
	
	

	d3.selectAll('.d_sel').on('click', function(){

		data_set = this.value;

		console.log(data_set)

		simulation.force('x', d3.forceX(function(d){
			return x(d[data_set])
		}))

		simulation
			.alphaDecay(0)
			.alpha(0.12)
			.restart()

		clearTimeout(init_decay);

		init_decay = setTimeout(function(){
			console.log('init alpha decay');
			simulation.alphaDecay(0.1);
		}, 8000);
	})





})