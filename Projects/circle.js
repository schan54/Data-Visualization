var h = 200
var w = 5000
var xspa = 800


var svg = d3.select('body').append('svg').attr('width', w).attr('height', h).attr('class','radSol');
//mazatls
var circs = [25,25.1,25.4,27.2,29.1,31.3,32.2,32.4,32.1,31.5,28.9,26.3,28.9]

var rscale = d3.scale.linear()

svg.selectAll('.circles').data(circs)
    .enter()
    .append('circle')

    .attr('r', function(d){
        return d
    })
    .attr('class','circles')
    .attr('cy', h/2)
    .attr('cx',function(d,i){
        return 40+ 80 *i
})
    .transition()
    .style('fill-opacity', '.3')
    .attr('cx', '0')
    .duration(2000)
    .transition()
    .attr('cx', function(d,i){
        return  40+80 * i
})
    .style('fill', 'green')
    .ease('elastic')

    .duration(3000)


svg.selectAll('text')
    .data(circs).enter().append('text')
    .text(function(d){
        console.log(this)
        return d;

    })
    .attr('font-size', 10)
    .attr('fill', 'black')
    .attr('x', function(d,i){
        return 40 +80*i
    })

    .attr('y', h/5)
    .attr('text-anchor', 'middle')



var svg2 = d3.select('body').append('svg').attr('width', w).attr('height', h).attr('class','radSol');
//mazatls
var circs2 = [19.8,20.8,20.8,22.4,23.3,25.7,28.9,29.2,28.2,26.1,22.4,19.9,24,24]

var rscale2 = d3.scale.linear()

svg2.selectAll('.circles').data(circs2)
    .enter()
    .append('circle')

    .attr('r', function(d){
        return d
    })
    .attr('class','circles2')
    .attr('cy', h/2)
    .attr('cx',function(d,i){
        return 40+ 80 *i
})
    .transition()
    .style('fill', 'red')
    .attr('cy', '40')
    .duration(3000)
    .transition()
    .attr('cy', '80')
    .style('fill', 'blue')
    .ease('elastic')

    .duration(5000)



svg2.selectAll('text')
    .data(circs2).enter().append('text')
    .text(function(d){
        console.log(this)
        return d;

    })
    .attr('font-size', 10)
    .attr('fill', 'black')
    .attr('x', function(d,i){
        return 40 +80*i
    })

    .attr('y', h/5)
    .attr('text-anchor', 'middle')
