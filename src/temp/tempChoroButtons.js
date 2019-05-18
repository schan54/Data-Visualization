//text that the radio button will toggle
var number= choroSvg.append("text")
                .attr("id","numberToggle")
                .attr("x",50)
                .attr("y",30)
                .attr("fill","green")
                .attr("font-size",24)
                .text("Filter Method: Isolated")

//container for all buttons
var allButtons= choroSvg.append("g")
                    .attr("id","Filter Method: Isolated")

//fontawesome button labels
var labels= ['\uf017','\uf200'];

//colors for different button states
var defaultColor= "#7777BB"
var hoverColor= "#0000ff"
var pressedColor= "#000077"

var compareActive = false;

//groups for each button (which will hold a rect and text)
var buttonGroups= allButtons.selectAll("g.button")
  .data(labels)
  .enter()
  .append("g")
  .attr("class","button")
  .style("cursor","pointer")
  .on("click",function(d,i) {
      updateChoroButtonColors(d3.select(this), d3.select(this.parentNode));
      // If first button clicked: Filter = Comparative
      if (i == 0) {
        d3.select("#numberToggle").text("Filter Method: Comparative");
        compareActive = true;

        //Reload Choro Data
        queue()
          .defer(d3.json, "../core/world_countries.json")
          .defer(d3.tsv, "worldData.tsv")
          .await(ready);
      }

      //Filter = Isolated
      if (i == 1) {
        d3.select("#numberToggle").text("Filter Method: Isolated");
        compareActive = false;

        //Reload Choro Data
        queue()
          .defer(d3.json, "../core/world_countries.json")
          .defer(d3.tsv, "worldData.tsv")
          .await(ready);
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
var bHeight= 25; //button height
var bSpace= 10; //space between buttons
var x0= 50; //x offset
var y0= 20; //y offset

//adding a rect to each toggle button group
//rx and ry give the rect rounded corner
buttonGroups.append("rect")
            .attr("class","buttonRect")
            .attr("width",bWidth)
            .attr("height",bHeight)
            .attr("y", function(d,i) {return x0+(bWidth+bSpace)*i;})
            .attr("x",y0)
            .attr("rx",5) //rx and ry give the buttons rounded corners
            .attr("ry",5)
            .attr("fill",defaultColor)

/*
//adding text to each toggle button group, centered
//within the toggle button rect
co2buttonGroups.append("text")
            .attr("class","buttonText")
            .attr("font-family","FontAwesome")
            .attr("x",function(d,i) {
                return x0 + (bWidth+bSpace)*i + bWidth/2;
            })
            .attr("y",y0+bHeight/2)
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("fill","white")
            .text(function(d) {return d;})*/

function updateChoroButtonColors(button, parent) {
    parent.selectAll("rect")
            .attr("fill",defaultColor)

    button.select("rect")
            .attr("fill",pressedColor)
}
