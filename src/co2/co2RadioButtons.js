var co2ButtonContainer = d3.select("#mainChart").append("g")
                    .attr("id", "co2buttons");

//fontawesome button labels
var co2Labels = ['Play', 'Pause', '+5', '+10', '-5', '-10', 'Compare', 'Isolated']

//colors for different button states
var defaultColor= "#7777BB"
var hoverColor= "#0000ff"
var pressedColor= "#000077"

//groups for each button (which will hold a rect and text)
var co2buttonGroups= co2ButtonContainer.selectAll("g.button")
                        .data(co2Labels)
                        .enter()
                        .append("g")
                        .attr("class","button")
                        .style("cursor","pointer")
                        .on("click",function(d,i) {
                            updateButtonColors(d3.select(this), d3.select(this.parentNode));
                            if (i == 0) {
                                timer = setInterval(step, 6000);
                            } else if (i == 1) {
                                clearInterval(timer);
                            } else if (i == 2) {
                                if (currentValue > 2012) {
                                  currentValue = 1959;
                                  comparedValue = 1961;
                                  step();
                                } else {
                                  currentValue = currentValue + 4;
                                  comparedValue = comparedValue + 5;
                                  step();
                                }
                            } else if (i == 3) {
                                if (currentValue > 2007) {
                                  currentValue = 1959;
                                  comparedValue = 1961;
                                  step();
                                } else {
                                  currentValue = currentValue + 9;
                                  comparedValue = comparedValue + 10;
                                  step();
                                }
                            } else if (i == 4) {
                                if (currentValue < 1965) {
                                  currentValue = 1959;
                                  comparedValue = 1961;
                                  step();
                                } else {
                                  currentValue = currentValue - 6;
                                  comparedValue = comparedValue - 5;
                                  step();
                                }
                            } else if (i == 5) {
                                if (currentValue < 1970) {
                                  currentValue = 1959;
                                  comparedValue = 1961;
                                  step();
                                } else {
                                  currentValue = currentValue - 11;
                                  comparedValue = comparedValue - 10;
                                  step();
                                }
                            } else if (i == 6) {
                                twoYears = true;
                                select(currentValue);
                            } else if (i == 7) {
                                twoYears = false;
                                select(currentValue);
                            }
                        })
                        .on("mouseover", function() {
                            if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                d3.select(this)
                                    .select("rect")
                                    .attr("fill",hoverColor);
                            }
                        })
                        .on("mouseout", function() {
                            if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                d3.select(this)
                                    .select("rect")
                                    .attr("fill",defaultColor);
                            }
                        })

var bWidth= 40; //button width
var b2Width= 80;
var bHeight= 25; //button height
var bSpace= 10; //space between buttons
var x0= 20; //x offset
var y0= 10; //y offset
var y1= 50;

//adding a rect to each toggle button group
//rx and ry give the rect rounded corner
co2buttonGroups.append("rect")
            .attr("class","buttonRect")
            .attr("width",function(d, i) {
                if (i >= 6) {
                    return b2Width;
                } else {
                    return bWidth;
                }
            })
            .attr("height",bHeight)
            .attr("x",function(d,i) {
                if (i >= 6) {
                    return x0+(b2Width+bSpace)*(i%6);    
                } else {
                    return x0+(bWidth+bSpace)*(i%6);
                }
            })
            .attr("y", function(d, i) { 
                if (i < 6) {
                    return y0;
                } else {
                    return y1;
                }})
            .attr("rx",5) //rx and ry give the buttons rounded corners
            .attr("ry",5)
            .attr("fill",defaultColor)


function updateButtonColors(button, parent) {
    parent.selectAll("rect")
            .attr("fill",defaultColor)

    button.select("rect")
            .attr("fill",pressedColor)
}
