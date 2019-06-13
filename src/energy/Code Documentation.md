The code has is structured like this:
Story Text
Sunburst
Maps

The sunburst graph is define in the svg element called partitionSVG
energySunburst.js is the code for it.
    the size of the sunburst is defined with WidthBurst and RadiusBurst
    The arcs of the sunburst are defined next
    After that, the partition function partitions the data into a heirarchy like structure to feed into the visual
    I appended the g element into the svg to create the base of the visual.
    Using d3.json, the data is parsed and partitioned. With the data partitioned, I drew the sunburst by appending paths, data, and the arcs
    To see the values in the middle, I append text into the middle and calculate the percentage whenover someone hovers over a path.
    To see labels on each arc, there is a function (labelVisible)to check if the label can fit on the arc. It appends if it fits.
    Next are the ways to interact with the different input elements inside the svg.
    Because we are updating the Sunburst at each user input, we have to make to remove the g element before we append new ones
    Next, we have the click function, which is called whenever the user clicks the an arc. It's purpose is to zoom in.
    Lastly, we have the updateSunBurst function , which updates the graph on user inputs. It is the exact same the describe above.
    The parameters of the function are the files and the year. If you input a year as a list [y1,y1] then the graph shows comparison
    