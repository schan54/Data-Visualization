var margin1 = {top: 150, right: 40, bottom: 40, left: 300},
    width = 1250 - margin1.left - margin1.right,
    height = 650 - margin1.top - margin1.bottom,
    barWidth1 = Math.floor(width / 19) - 1;

var glob=0;//GLOBAL VARIABLE for years
var glob2=0; //global variable for years
var value2=[];//stores temperature values
var value3=[]; //stores temperature values
var track = 0;//tracks alternating years for short compare


//rename to prevent issues with other code/svgs
var height1 = height;
var width1 = width;
    var tGraphx = d3v3.scale.linear()
    .range([barWidth1 / 2, width1 - barWidth1 / 2]);

var tGraphy = d3v3.scale.linear()
    .range([height1, 0]);

var yAxis = d3v3.svg.axis()
    .scale(tGraphy)
    .orient("right")
    .tickSize(-width1)
    .tickFormat(function(d) { return Math.round((d / 1)) ; });
 var divs = d3v3.select("body").append("divs")
    .attr("class", "tooltip")
    .style("opacity", 0);
// An SVG element with a bottom-right origin.
//var svg = d3v3.select("body").append("svg")

var tsavg = d3v3.select("#pSVG") //svg 
.style("top", "-40px")
.style("left", "0px")

.style("width", "auto")
.style("height", "auto")
.style("font", "14px sans-serif")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)    
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

    var birthyears1 = tsavg.append("g") //bar chart for compare 
        .attr("class", "birthyears1");
// A sliding container to hold the bars by birthyear.
var birthyears = tsavg.append("g") //main bar chart
    .attr("class", "birthyears");


 
// A label for the current year.
var title = tsavg.append("text") //default title
    .attr("class", "title")
    .attr("dy", "-1em")
    .text(2014);

//Text explanations below
    var comp1 = tsavg.append("text")
    .attr("class", "compStyle")
    .attr("dx","-16em")
    .attr("dy", "5em")
    .text("Compare two years");   

    var comp2 = tsavg.append("text")
    .attr("class", "compStyle")
    .attr("dx","-16em")
    .attr("dy", "7em")
    .text("Early year")   
    .style("fill",'#44475a  ');
    var comp4 = tsavg.append("text")
    .attr("class", "compStyle")
    .attr("dx","-10.4em")
    .attr("dy", "7em")
    .text(" █")   
    .style("fill",'#44475a  ');

    var comp3 = tsavg.append("text")
    .attr("class", "compStyle")
    .attr("dx","-16em")
    .attr("dy", "12.3em")
    .text("Recent year "+" █ ") 
    .style("fill",'#e75480');



var insn1 = tsavg.append("text") //instructions
    .attr("class", "instructions2")
    .attr("dx","-17.2em")
    .attr("dy", "20em")
    .text(" How to use:");
var insn2 = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")

    .attr("dy", "21.5em")
    .text("        Use the right and left arrow keys");
var insn2b = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "22.5em")
    .text("to navigate bewteen years.    ");    
var insn3 = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "24em")
    .text(" Select your country using the");  
var insn3b = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "25em")
    .text(" dropdown menu.");             
var insn4 = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "26.5em")
    .text("             Use the mouse to hover over to ");
var insn4 = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "27.5em")
    .text("view the temperature.    ");    
    var insn5 = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "29em")
    .text("Use search bars to compare"); 
    var insn5b = tsavg.append("text")
    .attr("class", "instructions")
    .attr("dx","-17.2em")
    .attr("dy", "30em")
    .text(" temperatures");    
var globTit = tsavg.append("text")
    .attr("class", "globTit")
    .attr("dy", "-1.5em");
var globTit2 = tsavg.append("text")
    .attr("class", "globTit2")
    .attr("dy", "2em");    
var title2 = tsavg.append("text")
    .attr("class", "title2")
    .attr("dx","7.2em")
    .attr("dy", "-1.5em")
    .text("Afghanistan");
var dataInfo = tsavg.append("text")
    .attr("class", "dataInfo")
    .attr("dx","30em")
    .attr("dy", "-2em")
var dataInfo2 = tsavg.append("text")
    .attr("class", "dataInfo")
    .attr("dx","30em")
    .attr("dy", "-1em")
d3v3.tsv("data/crucy.v3.23.1901.2014.Afghanistan.tmp.tsv", function(error, data) {

  // Convert strings to numbers. for tsv
  data.forEach(function(d) {
    d.temp = +d.temp;

    d.year = +d.year;
    d.month = +d.month;
    
  });

  // Compute the extent of the data set in age and years.
  var month1 = d3v3.max(data, function(d) { return d.month; }),
      year0 = d3v3.min(data, function(d) { return d.year; }),
      year1 = d3v3.max(data, function(d) { return d.year; }),
      year = year1,
      tests = d3v3.max(data,function(d){ return d.temp})
      tests2 = d3v3.min(data,function(d){ return d.temp})

      dataInfo.text("Max Temp: "  + tests+"°C"); 
      dataInfo2.text("Min Temp: "  + tests2+"°C");


var selects = document.getElementsByTagName('select'); //deselects dropdown so left right arrows dont change countries
for (var i = 0; i < selects.length; i++){
    selects[i].addEventListener('keydown',function(e){
        var key = e.which || e.keyCode;
        if(key == 37){
            var previousSibling = this.previousSibling;
            while(previousSibling && previousSibling.nodeType != 1) {
                previousSibling = previousSibling.previousSibling
            }
            previousSibling.focus();
            e.preventDefault();
        }else if(key === 39){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
        else if(key === 38){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
        else if(key === 40){
            var nextSibling = this.nextSibling;
            while(nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling
            }
            nextSibling.focus();
            e.preventDefault();
        }
    })
}
  // Update the scale domains.
    tGraphx.domain([ year1,year1 - month1]);

    tGraphy.domain([ -40,40]);


  // Produce a map from year/months to temperature.
  data = d3v3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.year - d.month; })
      .rollup(function(v) { return v.map(function(d) { return d.temp; }); })
      .map(data);

  // Add an axis to show the temperature values.
  tsavg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width1 + ",0)")
      .call(yAxis)
    .selectAll("g")
    .filter(function(value) { return !value; })
      .classed("zero", true);
  // Add labeled rects for each birthyear (so that no enter or exit is required).
  var value1 = [];//array of temps for this year 
  var i=0;
  var tyear=0;
  //styling lines
  tsavg.append("line").attr("x1", 200).attr("y1", -150).attr("x2", 200).attr("y2", -70).attr("stroke-width", 1).attr("stroke", "black");
  tsavg.append("line").attr("x1", 400).attr("y1", -150).attr("x2", 400).attr("y2", -70).attr("stroke-width", 1).attr("stroke", "black");
  tsavg.append("line").attr("x1", -25).attr("y1", -150).attr("x2", -25).attr("y2", 500).attr("stroke-width", 1).attr("stroke", "black");

  tsavg.append("line").attr("x1", 950).attr("y1", -70).attr("x2", -25).attr("y2", -70).attr("stroke-width", 1).attr("stroke", "black");
  tsavg.append("line").attr("x1", 950).attr("y1", -15).attr("x2", -25).attr("y2", -15).attr("stroke-width", 1).attr("stroke", "black");
  tsavg.append("line").attr("x1", 630).attr("y1", -70).attr("x2", 630).attr("y2", -15).attr("stroke-width", 1).attr("stroke", "black");


  //birthyear=temperature bars
  var birthyear = birthyears.selectAll(".birthyear")
      .data(d3v3.range(year0 - month1, year1 + 1, 1))
    .enter().append("g")
      .attr("class", "birthyear")
      .attr("transform", function(birthyear) { return "translate(" + tGraphx(birthyear) + ",0)"; });

  birthyear.selectAll("rect")
      .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
    .enter().append("rect")
      .attr("fill-opacity",".6")
      .attr("fill","#44475a")

      .attr("x", -barWidth1 / 2)
      .attr("width", barWidth1)
      .attr("y", tGraphy)
      .attr("sum", function(value) {value1.push(value);})
      .attr("year",function(d){return tyear=year})
      .attr("height", function(value) {return (height1 - tGraphy(value))})
       .on("mouseover", function(d) {
            divs.transition()
                .duration(200)
                .style("opacity", .9);
              //  divs.html(d)
              divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
              + d+ "</span><br>" )
                .style("left", (d3v3.event.pageX) + "px")
                .style("top", (d3v3.event.pageY) + "px");                
            })
        .on("mouseout", function(d) {
            divs.transition()
                .duration(500)
                .style("opacity", 0);
        });


var yeart=2014;   //temporary year storage
//new birthyear/ temperature bars for 2nd compare. pink
        var birthyear1 = birthyears1.selectAll(".birthyear1")
        .data(d3v3.range(year0 - month1, year1 + 1, 1))
        .enter().append("g")
        .attr("class", "birthyear1")
        .attr("transform", function(birthyear1) { return "translate(" + tGraphx(birthyear1+(2014-yeart)) + ",0)"; });

    tsavg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 280 - margin1.left)
      .attr("x",0 - (height1 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperature °C");
var monthz = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; //labels for months

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",15 )
.attr("x",-497)
.attr("dy", ".71em")
.text(monthz[0]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",95 )
.attr("x",-497)
.attr("dy", ".71em")
.text(monthz[1]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",175 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[2]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",255 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[3]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",335 )
.attr("x",-493)
.attr("dy", ".71em")
.text(monthz[4]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",410 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[5]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",485 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[6]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",565 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[7]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",645 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[8]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",725 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[9]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",805 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[10]);

tsavg.append("text")
.attr("transform", "rotate(-90)")
.attr("y",885 )
.attr("x",-495)
.attr("dy", ".71em")
.text(monthz[11]);


  // Add labels to show months (separate; not animated).
  tsavg.selectAll(".month")
      .data(d3v3.range(1, month1 + 2, 1))
    .enter().append("text")
      .attr("class", "month")
  //    .attr("x", function(month) { return tGraphx(year - month+1); })
      .attr("y", height1 + 4)
      .attr("dy", ".71em")
    //  .text(function(month) { return month; }); 

        globTit.text("Avg difference between years "+"2014"+" and "+"2014"+": "+"0.00°C"); 
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//compare function for searchbox 1
function compare() {
if(this.value>=1901 && this.value<=2014){
    birthyear.select("text").remove();

    year =this.value;
    title.text(year);
    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
      .transition()
        .duration(750)
        .attr("y", tGraphy)

        .attr("height", function(value) { return height1 - tGraphy(value); });
update();
        birthyear.append("text")
        .attr("class", "texted")
        .attr("y", height1 + margin1.bottom -65 )
        .text(function(birthyear) { return data[year][birthyear]; });
        const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
        function add(accumulator, a) {
            return accumulator + a;
        }
    
    
        const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
        function add1(accumulator1, a1) {
            return accumulator1 + a1;
        }
        var sumt = sum/12;
        var sumt2=sum2/12;
        console.log(sumt);
        console.log(sumt2);

        var difference=0;
        difference = (sumt2-sumt)/2;
    console.log(difference);
    globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C"); }
    else{ globTit.text("Enter a valid year from 1901 to 2014");}
}



//compare for searchbox 2. pink
function compare2() {
    if(this.value>=1901 && this.value<=2014){

    yeart =this.value;
    title.text(yeart);

    var dotzz = tsavg.select('.birthyears1').data(data);
    dotzz.exit().remove();     
    var dotzz = tsavg.select('.birthyears1').data(data);
    dotzz.exit().remove();
var birthyears1 = tsavg.append("g")
.attr("class", "birthyears1");
var birthyear1 = birthyears1.selectAll(".birthyear1")
.data(d3v3.range(year0 - month1, year1 + 1, 1))
.enter().append("g")
.attr("class", "birthyear1")
.attr("transform", function(birthyear1) { return "translate(" + tGraphx(birthyear1+(2014-yeart)) + ",0)"; });

birthyear1.selectAll("rect")
.data(function(birthyear1) { return data[yeart][birthyear1] || [-800, -800]; })
.enter().append("rect")
.attr('class', 'rect1')
.attr("x", -barWidth1 / 2)
.attr("width", barWidth1)
.attr("y", tGraphy)
.attr("z",-1)
.attr("sum", function(value) {value1.push(value);})
.attr("year",function(d){return tyear=yeart})
.attr("year",function(d){return glob2=yeart;})//NEW

.attr("sum", function(value) {value3.push(value);})//new
.attr("height", function(value) {return (height1 - tGraphy(value))})
.attr("fill-opacity",".6")
.attr("fill","#e75480 ")
  .on("mouseover", function(d) {
      divs.transition()
          .duration(200)
          .style("opacity", .9);
        //  divs.html(d)
        divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
        + d+ "</span><br>" )
          .style("left", (d3v3.event.pageX) + "px")
          .style("top", (d3v3.event.pageY) + "px");                
      })
  .on("mouseout", function(d) {
      divs.transition()
          .duration(500)
          .style("opacity", 0);
  });
  birthyear1.append("text")
  .attr("class", "texted2")

  .attr("y", height1 + margin1.bottom -45 )
  .text(function(birthyear) { return data[yeart][birthyear]; });

update();
//manipulates array to get temperature for that year
  var tem= 2014-glob2;
  var tempor=value3.length;
  var newtem= 2014-glob2;
  if(tem >12){newtem=tem*2-tem;}
  
  if(tem<=12){

  while(value3.length!=12)
      {

          while(value3.length>=tempor-newtem*2+1)
          {
              value3.pop();

          }
          value3.shift();

      }
  }

  if(tem>12){
      while(value3.length!=12)
          {
              while(value3.length>tempor-newtem*2)
              {
                  value3.pop();
  
              }
              value3.shift();
  
          }
      }
//math to find difference between years
  const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
  function add(accumulator, a) {
      return accumulator + a;
  }


  const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
  function add1(accumulator1, a1) {
      return accumulator1 + a1;
  }
  var sumt = sum/12;
  var sumt2=sum2/12;
console.log(sumt);
console.log(sumt2);
  var difference=0;
  difference = (sumt2-sumt)/2;
  console.log(difference);
globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C"); 
    }
    else{ globTit.text("Enter a valid year from 1901 to 2014");}

}



d3.select("#searchText").on("input", compare )


d3.select("#searchText2").on("input", compare2 )

 //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


 //buttons for decrement increment years
    d3.select("#leftButt").on("click", function() {
       // var button = d3v3.select(this);
        year = Math.max(year0, year - 1);
        track++;    
        console.log(year);

        if(track%2 == 1)
        {
            //removes text when changing year
            var dotzz = tsavg.select('.birthyears1').data(data);
            dotzz.exit().remove();

            birthyear.select("text").remove();
            birthyear.select("text").remove();
            birthyear.select("text").remove();

        update();
        }
        else if (track%2 == 0)
        {
            var dotzz = tsavg.select('.birthyears1').data(data);
            dotzz.exit().remove();
        
            birthyear.select("text").remove();
            birthyear.select("text").remove();
            birthyear.select("text").remove();

            update2();
        }
        if (track ==1){update2();}
    
        const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
        function add(accumulator, a) {
            return accumulator + a;
        }
    
    
        const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
        function add1(accumulator1, a1) {
            return accumulator1 + a1;
        }
        var sumt = sum/12;
        var sumt2=sum2/12;
      console.log(sumt);
      console.log(sumt2);
        var difference=0;
        difference = (sumt2-sumt)/2;
        console.log(difference);
    globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C");          });
    d3.select("#rightButt").on("click", function() {
   //     var button = d3v3.select(this);
        if(year!=2014){
        year = Math.max(year0, year);
        year++;
        }
        track++;    
        if(track%2 == 1)
        {
            //removes text when changing years
            var dotzz = tsavg.select('.birthyears1').data(data);
            dotzz.exit().remove();
        
            birthyear.select("text").remove();
            birthyear.select("text").remove();
            birthyear.select("text").remove();
        
        update();
        }
        else if (track%2 == 0)
        {

            var dotzz = tsavg.select('.birthyears1').data(data);
            dotzz.exit().remove();
        
            birthyear.select("text").remove();
            birthyear.select("text").remove();
            birthyear.select("text").remove();

            update2();
        }

        if (track ==1){update2();}

        const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
        function add(accumulator, a) {
            return accumulator + a;
        }


        const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
        function add1(accumulator1, a1) {
            return accumulator1 + a1;
        }
        var sumt = sum/12;
        var sumt2=sum2/12;
      console.log(sumt);
      console.log(sumt2);
        var difference=0;
        difference = (sumt2-sumt)/2;
        console.log(difference);
    globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C");          });

  // Allow the arrow keys to change the displayed year.
  window.focus();
//listens to left and right arrow keys
  d3v3.select(window).on("keydown", function() {
    switch (d3v3.event.keyCode) {
      case 37:  year = Math.max(year0, year - 1);//decrement/left arrow
                track++;

                var dotzz = tsavg.select('.birthyears1').data(data);
                dotzz.exit().remove();

                birthyear.select("text").remove();
                birthyear.select("text").remove();

                birthyear.select("text").remove();

                break;
                
      case 39:  year = Math.min(year1, year + 1);//increment/right arrow
                track++;

                var dotzz = tsavg.select('.birthyears1').data(data);
                dotzz.exit().remove();
                birthyear.select("text").remove();
                birthyear.select("text").remove();
                birthyear.select("text").remove();


                break;
    }
    if(track%2 == 1)//alternates to compare years briefly
    {
    update();
    }
    else if (track%2 == 0)
    {
        update2();
    }
    if (track ==1){update2();}

    const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
    function add(accumulator, a) {
        return accumulator + a;
    }


    const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
    function add1(accumulator1, a1) {
        return accumulator1 + a1;
    }
    var sumt = sum/12;
    var sumt2=sum2/12;
  console.log(sumt);
  console.log(sumt2);
    var difference=0;
    difference = (sumt2-sumt)/2;
    console.log(difference);

globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C");    

//console.log(sum); // 6

//console.log(sum2); // 6
  //  console.log(value2);
  //  console.log(value3);
//console.log(glob2);
//console.log(glob);
  });
  function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}


//update function changing years
  function update() {
    if (!(year in data)) return;
    title.text(year);

    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })

    .transition()
        .duration(750)
        .attr("y", tGraphy)
    
        .attr("year",function(d){return glob=year;})

        .attr("sum", function(value) {value2.push(value);})//new

        .attr("height", function(value) { return height1 - tGraphy(value); })
//manipulating array for temps
        var tem= 2014-glob;
        var tempor=value2.length;
        var newtem= 2014-glob;

        if(tem >12){newtem=tem*2-tem;}

        if(tem<12){
        while(value2.length!=12)
            {
                while(value2.length>tempor-newtem)
                {
                    value2.pop();
    
                }
                value2.shift();
    
            }
        }
        if(tem==113){
            while (value2.length!=12){
                value2.pop();
            }                             
        }
        if(tem>12){
            while(value2.length!=12)
                {
                    while(value2.length>tempor-newtem+(12-tem))
                    {
                        value2.pop();
        
                    }
                    value2.shift();
        
                }
            }
        
 }
//same thing as update(). needed to compare alternatingn years
 function update2() {
    if (!(year in data)) return;
    title.text(year);
//    var value3=[];
    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
      .transition()
        .duration(750)
        .attr("y", tGraphy)
    
        .attr("year",function(d){return glob2=year;})

        .attr("sum", function(value) {value3.push(value);})//new

        .attr("height", function(value) { return height1 - tGraphy(value); });
    var tem= 2014-glob2;
    var tempor=value3.length;
    var newtem= 2014-glob2;
    if(tem >12){newtem=tem*2-tem;}
    
    if(tem<=12){
    while(value3.length!=12)
        {
            while(value3.length>tempor-newtem)
            {
                value3.pop();

            }
            value3.shift();

        }
    }

    if(tem>12){
        while(value3.length!=12)
            {
                while(value3.length>tempor-newtem+(12-tem))
                {
                    value3.pop();
    
                }
                value3.shift();
    
            }
        }
    
    

 }
 
});


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Data Update for different countries

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

d3v3.select('#inds')//drop down menu
            .on("change", function () {
                var sect = document.getElementById("inds");
                var section = sect.options[sect.selectedIndex].value;

                updateTest(section);

            });

            
//gets rid of parts of file names to get country name
function updateTitle(source){
    var ret = source.replace(/crucy.v3.23.1901.2014./g,'');
    var ret2 = ret.replace(/.tmp.tsv/g,'');
    var ret3 = ret2.replace(/_/g,'');
//      title2.text(ret3);
var ret4 = ret3.replace(/data/g,' ');
var ret5 = ret4.replace(/\//g,' ');

title2.text(ret5)
    }
        // update function:
function updateTest(source) {
        d3v3.tsv(source, function(error,data) {
var ret = source.replace(/crucy.v3.23.1901.2014./g,'');
var ret2 = ret.replace(/.tmp.tsv/g,'');
var ret3 = ret2.replace(/_/g,' ');
var ret4 = ret3.replace(/data/g,' ');
var ret5 = ret4.replace(/\//g,' ');

globTit.text("Avg difference between years "+"2014"+" and "+"2014"+": "+"0.00°C"); 

title.text(2014)
var titSource = updateTitle(source);

title2.text(ret5)


var tGraphx = d3v3.scale.linear()
    .range([barWidth1 / 2, width1 - barWidth1 / 2]);

var y = d3v3.scale.linear()
    .range([height,0]);

var yAxis = d3v3.svg.axis()
    .scale(tGraphy)
    .orient("right")
    .tickSize(-width1)
    .tickFormat(function(d) { return Math.round(d / 1) ; });

    var birthyears1 = tsavg.append("g")
    .attr("class", "birthyears1");
// A sliding container to hold the bars by birthyear.
var birthyears = tsavg.append("g")
    .attr("class", "birthyears");

// Convert strings to numbers.
data.forEach(function(d) {
  d.temp = +d.temp;

  d.year = +d.year;
  d.month = +d.month;
});
var dot = tsavg.select('.birthyear').data(data);
dot.exit().remove();
var tempz=[];
// Compute the extent of the data set in age and years.
var month1 = d3v3.max(data, function(d) { return d.month; }),
    year0 = d3v3.min(data, function(d) { return d.year; }),
    year1 = d3v3.max(data, function(d) { return d.year; }),
    year = year1,
    tests = d3v3.max(data,function(d){ return d.temp;}),
    tests2 = d3v3.min(data,function(d){ return d.temp;})

   // tempz = (data,function(d){ return d.temp;})

    dataInfo.text("Max Temp: "  + tests+"°C");
    dataInfo2.text("Min Temp: "  + tests2+"°C");
console.log(tempz);
// Update the scale domains.
tGraphx.domain([ year1,year1 - month1]);
tGraphy.domain([ -40,40]);
//y.domain([d3v3.min(data, function(d) { return d.temp}) , d3v3.max(data, function(d) { return d.temp; })]);


// Produce a map from year and birthyear to [male, female].
data = d3v3.nest()
    .key(function(d) { return d.year; })
    .key(function(d) { return d.year - d.month; })
    .rollup(function(v) { return v.map(function(d) { return d.temp; }); })
    .map(data);

var dot3 = tsavg.select('g').data(data)
dot3.exit().remove()
// Add an axis to show the population values.
tsavg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width1 + ",0)")
    .call(yAxis)
  .selectAll("g")
  .filter(function(value) { return !value; })
    .classed("zero", true);

    var dot3 = tsavg.select('g').data(data)
dot3.exit().remove()
var dot3 = tsavg.select('g').data(data)
dot3.exit().remove()
var dotzz = tsavg.select('.birthyears1').data(data)
dotzz.exit().remove()
var dotzz = tsavg.select('.birthyears1').data(data)
dotzz.exit().remove()
var dotzz = tsavg.select('.birthyears1').data(data)
dotzz.exit().remove()
var dotzz = tsavg.select('.birthyears1').data(data)
dotzz.exit().remove()
// Add labeled rects for each birthyear (so that no enter or exit is required).
var birthyear = birthyears.selectAll(".birthyear")
    .data(d3v3.range(year0 - month1, year1 + 1, 1))

  .enter().append("g")
    .attr("class", "birthyear")
    .attr("transform", function(birthyear) { return "translate(" + tGraphx(birthyear) + ",0)"; });

birthyear.selectAll("rect")

    .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
  .enter().append("rect")
  .attr("fill-opacity",".6")
  .attr("fill","#44475a")
    .attr("x", -barWidth1 / 2)
    .attr("width", barWidth1)
    .attr("z", 1)
    .attr("y", tGraphy)

    .attr("height", function(value) { return height1 - tGraphy(value)  ; })
     .on("mouseover", function(d) {
          divs.transition()
              .duration(200)
              .style("opacity", .9);
            // divs.html(d)
            divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
              + d+ "</span><br>" )
              .style("left", (d3v3.event.pageX) + "px")
              .style("top", (d3v3.event.pageY) + "px");
          })
      .on("mouseout", function(d) {
          divs.transition()
              .duration(500)
              .style("opacity", 0);
      });
      var yeart=2014;   

      var birthyear1 = birthyears1.selectAll(".birthyear1")
      .data(d3v3.range(year0 - month1, year1 + 1, 1))
      .enter().append("g")
      .attr("class", "birthyear1")
      .attr("transform", function(birthyear1) { return "translate(" + tGraphx(birthyear1+(2014-yeart)) + ",0)"; });
// Add labels to show age (separate; not animated).
tsavg.selectAll(".month")
    .data(d3v3.range(1, month1 + 1, 1))
  .enter().append("text")
    .attr("class", "month")
    .attr("x", function(month) { return tGraphx(year - month); })
    .attr("y", height1 + 4)
    .attr("dy", ".71em")

    .text(function(month) { return month; });


    function compare() {
        if(this.value<=2014 && this.value>=1901 ){

        birthyear.select("text").remove();

        year =this.value;
        title.text(year);
    //    var value2=[];
        birthyears.transition()
            .duration(750)
            .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");
    update();
        birthyear.selectAll("rect")
            .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
          .transition()
            .duration(750)
            .attr("y", tGraphy)
    
            .attr("height", function(value) { return height1 - tGraphy(value); });
            birthyear.append("text")
        .attr("class", "texted")
        .attr("y", height1 + margin1.bottom -65 )
        .text(function(birthyear) { return data[year][birthyear]; });
        const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
        function add(accumulator, a) {
            return accumulator + a;
        }
    
    
        const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
        function add1(accumulator1, a1) {
            return accumulator1 + a1;
        }
        var sumt = sum/12;
        var sumt2=sum2/12;
      console.log(sumt);
      console.log(sumt2);
        var difference=0;
        difference = (sumt2-sumt)/2;
        console.log(difference);
    globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C"); }

    else{ globTit.text("Enter a valid year from 1901 to 2014");}

    }
    function compare2() {
        if(this.value>=1901 && this.value<=2014){

        yeart =this.value;
        title.text(yeart);

        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();     
        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();
    var birthyears1 = tsavg.append("g")
    .attr("class", "birthyears1");
    var birthyear1 = birthyears1.selectAll(".birthyear1")
    .data(d3v3.range(year0 - month1, year1 + 1, 1))
    .enter().append("g")
    .attr("class", "birthyear1")
    .attr("transform", function(birthyear1) { return "translate(" + tGraphx(birthyear1+(2014-yeart)) + ",0)"; });
    
    birthyear1.selectAll(".rect1")
    .data(function(birthyear1) { return data[yeart][birthyear1] || [-800, -800]; })
    .enter().append("rect")
    .attr('class', 'rect1')
    .attr("x", -barWidth1 / 2)
    .attr("width", barWidth1)
    .attr("y", tGraphy)
    .attr("z",-1)
    .attr("year",function(d){return tyear=yeart})
    .attr("year",function(d){return glob2=yeart;})//NEW

.attr("sum", function(value) {value3.push(value);})//new
    .attr("height", function(value) {return (height1 - tGraphy(value))})
    .attr("fill-opacity",".6")
    .attr("fill","#e75480 ")
      .on("mouseover", function(d) {
          divs.transition()
              .duration(200)
              .style("opacity", .9);
            //  divs.html(d)
            divs.html("<strong>Temperature: </strong>" + "<span class=\"details\">"
            + d+ "</span><br>" )
              .style("left", (d3v3.event.pageX) + "px")
              .style("top", (d3v3.event.pageY) + "px");                
          })
      .on("mouseout", function(d) {
          divs.transition()
              .duration(500)
              .style("opacity", 0);
      });
      birthyear1.append("text")
      .attr("class", "texted2")
    
      .attr("y", height1 + margin1.bottom -44 )
      .text(function(birthyear) { return data[yeart][birthyear]; });

      
update();
var tem= 2014-glob2;
var tempor=value3.length;
var newtem= 2014-glob2;
if(tem >12){newtem=tem*2-tem;}

if(tem<=12){

while(value3.length!=12)
    {

        while(value3.length>=tempor-newtem*2+1)
        {
            value3.pop();

        }
        value3.shift();

    }
}

if(tem>12){
    while(value3.length!=12)
        {
            while(value3.length>tempor-newtem*2)
            {
                value3.pop();

            }
            value3.shift();

        }
    }

const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
function add(accumulator, a) {
    return accumulator + a;
}


const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
function add1(accumulator1, a1) {
    return accumulator1 + a1;
}
var sumt = sum/12;
var sumt2=sum2/12;
console.log(sumt);
console.log(sumt2);
var difference=0;
difference = (sumt2-sumt)/2;
console.log(difference);
globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C"); }
else{ globTit.text("Enter a valid year from 1901 to 2014");}

    }
    
    d3.select("#searchText").on("input", compare )
    
    d3.select("#searchText2").on("input", compare2 )

    var glob=0;//GLOBAL VARIABLE
    var glob2=0;
    var value2=[];
    var value3=[];
    var track = 0;
    
    d3.select("#leftButt").on("click", function() {
   //   var button = d3v3.select(this);
      year = Math.max(year0, year - 1);
      track++;    
      if(track%2 == 1)
      {
        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();

    
        birthyear.select("text").remove();
        birthyear.select("text").remove();
        birthyear.select("text").remove();
   
      update();
      }
      else if (track%2 == 0)
      {
        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();

        birthyear.select("text").remove();
        birthyear.select("text").remove();
        birthyear.select("text").remove();
    
          update2();
      }
      if (track ==1){update2();}
  
      const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
      function add(accumulator, a) {
          return accumulator + a;
      }
  
  
      const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
      function add1(accumulator1, a1) {
          return accumulator1 + a1;
      }
      var sumt = sum/12;
      var sumt2=sum2/12;
    console.log(sumt);
    console.log(sumt2);
      var difference=0;
      difference = (sumt2-sumt)/2;
      console.log(difference);
  
  globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C");       })
    d3.select("#rightButt").on("click", function() {
    //  var button = d3v3.select(this);
      if( year !=2014)
      {
      year = Math.max(year0, year);
      year++;

      }
      track++;    
      if(track%2 == 1)
      {
        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();

        birthyear.select("text").remove();
        birthyear.select("text").remove();    
        birthyear.select("text").remove();
    
      update();
      }
      else if (track%2 == 0)
      {
        var dotzz = tsavg.select('.birthyears1').data(data);
        dotzz.exit().remove();

        birthyear.select("text").remove();
        birthyear.select("text").remove();
        birthyear.select("text").remove();
    
          update2();
      }
      if (track ==1){update2();}
  
      const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
      function add(accumulator, a) {
          return accumulator + a;
      }
  
  
      const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
      function add1(accumulator1, a1) {
          return accumulator1 + a1;
      }
      var sumt = sum/12;
      var sumt2=sum2/12;
    console.log(sumt);
    console.log(sumt2);
      var difference=0;
      difference = (sumt2-sumt)/2;
      console.log(difference);
  globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C");       })
// Allow the arrow keys to change the displayed year.
window.focus();
d3v3.select(window).on("keydown", function() {
  switch (d3v3.event.keyCode) {
    case 37:  year = Math.max(year0, year - 1);//decrement
    track++;
    var dotzz = tsavg.select('.birthyears1').data(data);
    dotzz.exit().remove();

    birthyear.select("text").remove();
    birthyear.select("text").remove();

    birthyear.select("text").remove();


    break;
case 39:  year = Math.min(year1, year + 1);
    track++;
    var dotzz = tsavg.select('.birthyears1').data(data);
    dotzz.exit().remove();

    birthyear.select("text").remove();
    birthyear.select("text").remove();

    birthyear.select("text").remove();

    break;
}
if(track%2 == 1)
{
update();
}
else if (track%2 == 0)
{
update2();
}
if (track ==1){update2();}

const sum =value2.reduce(add,0); // with initial value to avoid when the array is empty
function add(accumulator, a) {
return accumulator + a;
}


const sum2 =value3.reduce(add1,0); // with initial value to avoid when the array is empty
function add1(accumulator1, a1) {
return accumulator1 + a1;
}
if (track ==1){update2();}
var sumt = sum/12;
var sumt2=sum2/12;
console.log(sumt);
console.log(sumt2);
var difference=0;
difference = (sumt2-sumt)/2;
console.log(difference);

globTit.text("Avg difference between years "+glob+" and "+glob2+": "+roundTo(difference,2)+"°C"); 
});
function roundTo(n, digits) {
  var negative = false;
  if (digits === undefined) {
      digits = 0;
  }
      if( n < 0) {
      negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(2);
  if( negative ) {    
      n = (n * -1).toFixed(2);
  }
  return n;
}
function update() {
    if (!(year in data)) return;
    title.text(year);
//    var value2=[];
    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
      .transition()
        .duration(750)
        .attr("y", tGraphy)
    
        .attr("year",function(d){return glob=year;})

        .attr("sum", function(value) {value2.push(value);})//new

        .attr("height", function(value) { return height1 - tGraphy(value); });
        var tem= 2014-glob;
        var tempor=value2.length;
        var newtem= 2014-glob;
        if(tem >12){newtem=tem*2-tem;}
        
        if(tem<=12){
        while(value2.length!=12)
            {
                while(value2.length>tempor-newtem)
                {
                    value2.pop();
    
                }
                value2.shift();
    
            }
        }
        if(tem==113){
            while (value2.length!=12){
                value2.pop();
            }
        
        }
        if(tem>12){
            while(value2.length!=12)
                {
                    while(value2.length>tempor-newtem+(12-tem))
                    {
                        value2.pop();
        
                    }
                    value2.shift();
        
                }
            }
            
 }

 function update2() {
    if (!(year in data)) return;
    title.text(year);
//    var value3=[];
    birthyears.transition()
        .duration(750)
        .attr("transform", "translate(" + (tGraphx(year1) - tGraphx(year)) + ",0)");

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [-800, -800]; })
      .transition()
        .duration(750)
        .attr("y", tGraphy)
    
        .attr("year",function(d){return glob2=year;})

        .attr("sum", function(value) {value3.push(value);})//new

        .attr("height", function(value) { return height1 - tGraphy(value); });
    var tem= 2014-glob2;
    var tempor=value3.length;
    var newtem= 2014-glob2;
    if(tem >12){newtem=tem*2-tem;}
    
    if(tem<=12){
    while(value3.length!=12)
        {
            while(value3.length>tempor-newtem)
            {
                value3.pop();

            }
            value3.shift();

        }
    }

    if(tem>12){
        while(value3.length!=12)
            {
                while(value3.length>tempor-newtem+(12-tem))
                {
                    value3.pop();
    
                }
                value3.shift();
    
            }
        }
    
    

 }
 
});



        }
