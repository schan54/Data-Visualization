


var width = 1360,
	height = 550,
	radius = 10;	

var svg = d3.select('body').append('svg')
			.attr('width', width)
			.attr('height', height)


svg.append("line", 'svg')
	.classed('main_line', true)
	.attr("x1", 0)
	.attr("y1", height/2)
	.attr("x2", width)
	.attr("y2", height/2)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");


var x = d3.scaleLinear()
			.range([0, width])	
			.domain([-150, 150]);


var data_set = '1979';




d3.json('beeswarmg.json', function(data){


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

	var buttons = d3.select('body').append('div');
	buttons.append('button').text('1979').attr('value', '1979').classed('d_sel', true)
	buttons.append('button').text('1980').attr('value', '1980').classed('d_sel', true)
	buttons.append('button').text('1981').attr('value', '1981').classed('d_sel', true)
	buttons.append('button').text('1982').attr('value', '1982').classed('d_sel', true)
	buttons.append('button').text('1983').attr('value', '1983').classed('d_sel', true)
	buttons.append('button').text('1984').attr('value', '1984').classed('d_sel', true)
	buttons.append('button').text('1985').attr('value', '1985').classed('d_sel', true)
	buttons.append('button').text('1986').attr('value', '1986').classed('d_sel', true)
	buttons.append('button').text('1987').attr('value', '1987').classed('d_sel', true)
	buttons.append('button').text('1988').attr('value', '1988').classed('d_sel', true)
	buttons.append('button').text('1989').attr('value', '1989').classed('d_sel', true)
	buttons.append('button').text('1990').attr('value', '1990').classed('d_sel', true)
	buttons.append('button').text('1991').attr('value', '1991').classed('d_sel', true)
	buttons.append('button').text('1992').attr('value', '1992').classed('d_sel', true)
	buttons.append('button').text('1993').attr('value', '1993').classed('d_sel', true)
	buttons.append('button').text('1994').attr('value', '1994').classed('d_sel', true)
	buttons.append('button').text('1995').attr('value', '1995').classed('d_sel', true)
	buttons.append('button').text('1996').attr('value', '1996').classed('d_sel', true)
	buttons.append('button').text('1997').attr('value', '1997').classed('d_sel', true)
	buttons.append('button').text('1998').attr('value', '1998').classed('d_sel', true)
	buttons.append('button').text('1999').attr('value', '1999').classed('d_sel', true)
	buttons.append('button').text('2000').attr('value', '2000').classed('d_sel', true)
	buttons.append('button').text('2001').attr('value', '2001').classed('d_sel', true)
	buttons.append('button').text('2002').attr('value', '2002').classed('d_sel', true)
	buttons.append('button').text('2003').attr('value', '2003').classed('d_sel', true)
	buttons.append('button').text('2004').attr('value', '2004').classed('d_sel', true)
	buttons.append('button').text('2005').attr('value', '2005').classed('d_sel', true)
	buttons.append('button').text('2006').attr('value', '2006').classed('d_sel', true)
	buttons.append('button').text('2007').attr('value', '2007').classed('d_sel', true)
	buttons.append('button').text('2008').attr('value', '2008').classed('d_sel', true)
	buttons.append('button').text('2009').attr('value', '2009').classed('d_sel', true)
	buttons.append('button').text('2010').attr('value', '2010').classed('d_sel', true)
	buttons.append('button').text('2011').attr('value', '2011').classed('d_sel', true)
	buttons.append('button').text('2012').attr('value', '2012').classed('d_sel', true)
	buttons.append('button').text('2013').attr('value', '2013').classed('d_sel', true)
	buttons.append('button').text('2014').attr('value', '2014').classed('d_sel', true)
	buttons.append('button').text('2015').attr('value', '2015').classed('d_sel', true)
	buttons.append('button').text('2016').attr('value', '2016').classed('d_sel', true)
	buttons.append('button').text('2017').attr('value', '2017').classed('d_sel', true)

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
