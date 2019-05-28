var textBox = d3.select("body").append("svg")
      .attr('width', 1100)
      .attr('height', 2180)
      .attr('id', "textSVG");

	textBox.append("text").html("VISUALIZING CLIMATE CHANGE")
      .attr('x', 50)
      .attr('y', 50)
      .style('font-family', "Montserrat, sans-serif")
      .style('font-size', 55)
      .style('letter-spacing', 2);
	  
	textBox.append("text").html("Mission Statement: Our goal is to provide users with unique and meaningful visualizations for understanding climate")
      .attr('x', 100)
      .attr('y', 150)
      .attr('class', 'mission');

    textBox.append("text").html("change. We believe that while one visual may provide great insight into CO2 emissions, the same visual might not be")
      .attr('x', 100)
      .attr('y', 180)
      .attr('class', 'mission');

    textBox.append("text").html("applicable or relevant for another dataset such as temperature.")
      .attr('x', 100)
      .attr('y', 210)
      .attr('class', 'mission');
	  
/*var textBox = d3.select("body").append("svg")
      .attr('width', 1100)
      .attr('height', 2180)
      .attr('id', "textSVG");

    textBox.append("text").html("VISUALIZING CLIMATE CHANGE")
      .attr('x', 50)
      .attr('y', 50)
      .style('font-family', "Montserrat, sans-serif")
      .style('font-size', 55)
      .style('letter-spacing', 2);

    textBox.append("text").html("Mission Statement: Our goal is to provide users with unique and meaningful visualizations for understanding climate")
      .attr('x', 100)
      .attr('y', 150)
      .attr('class', 'mission');

    textBox.append("text").html("change. We believe that while one visual may provide great insight into CO2 emissions, the same visual might not be")
      .attr('x', 100)
      .attr('y', 180)
      .attr('class', 'mission');

    textBox.append("text").html("applicable or relevant for another dataset such as temperature.")
      .attr('x', 100)
      .attr('y', 210)
      .attr('class', 'mission');

    textBox.append("text").html("The Earth's climate has changed throughout history. Just in the last 650,000 years there have been seven cycles of glacial")
      .attr('x', 100)
      .attr('y', 260);

    textBox.append("text").html("advance and retreat, with the abrupt end of the last ice age about 7,000 years ago marking the beginning of the modern climate")
      .attr('x', 100)
      .attr('y', 290);

    textBox.append("text").html("era — and of human civilization. Most of these climate changes are attributed to very small variations in Earth’s orbit that change")
      .attr('x', 100)
      .attr('y', 320);

    textBox.append("text").html("the amount of solar energy our planet receives.")
      .attr('x', 100)
      .attr('y', 350);

    textBox.append("image")
      .attr('xlink:href', 'https://climate.nasa.gov/system/content_pages/main_images/203_co2-graph-021116.jpeg')
      .attr('width', 900)
      .attr('height', 600)
      .attr('x', 100)
      .attr('y', 380);

    textBox.append("text").html("The current warming trend is of particular significance because most of it is extremely likely (greater than 95 percent probability)")
      .attr('x', 100)
      .attr('y', 1020);

    textBox.append("text").html("to be the result of human activity since the mid-20th century and proceeding at a rate that is unprecedented over decades to millennia.")
      .attr('x', 100)
      .attr('y', 1050);

    textBox.append("text").html("Earth-orbiting satellites and other technological advances have enabled scientists to see the big picture, collecting many different")
      .attr('x', 100)
      .attr('y', 1100);

    textBox.append("text").html("types of information about our planet and its climate on a global scale. This body of data, collected over many years, reveals the")
      .attr('x', 100)
      .attr('y', 1130);  

    textBox.append("text").html("signals of a changing climate.")
      .attr('x', 100)
      .attr('y', 1160);

    textBox.append("text").html("The heat-trapping nature of carbon dioxide and other gases was demonstrated in the mid-19th century. Their ability to affect the transfer")
      .attr('x', 100)
      .attr('y', 1210);

    textBox.append("text").html("of infrared energy through the atmosphere is the scientific basis of many instruments flown by NASA. There is no question that increased")
      .attr('x', 100)
      .attr('y', 1240);

    textBox.append("text").html("levels of greenhouse gases must cause the Earth to warm in response.")
      .attr('x', 100)
      .attr('y', 1270);

    textBox.append("text").html("The planet's average surface temperature has risen about 1.62 degrees Fahrenheit (0.9 degrees Celsius) since the late 19th century,")
      .attr('x', 100)
      .attr('y', 1320);

    textBox.append("text").html(" a change driven largely by increased carbon dioxide and other human-made emissions into the atmosphere. Most of the warming")
      .attr('x', 100)
      .attr('y', 1350);

    textBox.append("text").html("occurred in the past 35 years, with the five warmest years on record taking place since 2010. Not only was 2016 the warmest year")
      .attr('x', 100)
      .attr('y', 1380);

    textBox.append("text").html(" on record, but eight of the 12 months that make up the year — from January through September, with the exception of June — were the")
      .attr('x', 100)
      .attr('y', 1410);

    textBox.append("text").html("warmest on record for those respective months. ")
      .attr('x', 100)
      .attr('y', 1440);

    textBox.append("text").html("Taken as a whole, the range of published evidence indicates that the net damage")
      .attr('x', 150)
      .attr('y', 1490)
      .attr('class', 'quote');

    textBox.append("text").html("costs of climate change are likely to be significant and to increase over time.")
      .attr('x', 150)
      .attr('y', 1520)
      .attr('class', 'quote');

    textBox.append("text").html("Is it too late to prevent climate change?")
      .attr('x', 100)
      .attr('y', 1570);

    textBox.append("text").html("Humans have caused major climate changes to happen already, and we have set in motion more changes still. Even if we stopped")
      .attr('x', 100)
      .attr('y', 1620);

    textBox.append("text").html("emitting greenhouse gases today, global warming would continue to happen for at least several more decades, if not centuries.")
      .attr('x', 100)
      .attr('y', 1650);

    textBox.append("text").html("That’s because it takes a while for the planet (for example, the oceans) to respond, and because carbon dioxide – the predominant")
      .attr('x', 100)
      .attr('y', 1680);

    textBox.append("text").html("heat-trapping gas – lingers in the atmosphere for hundreds of years. There is a time lag between what we do and when we feel it.")
      .attr('x', 100)
      .attr('y', 1710);

    textBox.append("text").html("In the absence of major action to reduce emissions, global temperature is on track to rise by an average of 6 °C (10.8 °F),")
      .attr('x', 100)
      .attr('y', 1760);

    textBox.append("text").html("according to the latest estimates. Some scientists argue a “global disaster” is already unfolding at the poles of the planet;")
      .attr('x', 100)
      .attr('y', 1790);

    textBox.append("text").html("the Arctic, for example, may be ice-free at the end of the summer melt season within just a few years. Yet other experts are")
      .attr('x', 100)
      .attr('y', 1820);

    textBox.append("text").html("concerned about Earth passing one or more “tipping points” – abrupt, perhaps irreversible changes that tip our climate into")
      .attr('x', 100)
      .attr('y', 1850);

    textBox.append("text").html("a new state.")
      .attr('x', 100)
      .attr('y', 1880);

    textBox.append("text").html("But it may not be too late to avoid or limit some of the worst effects of climate change. Responding to climate change will involve")
      .attr('x', 100)
      .attr('y', 1930);

    textBox.append("text").html("a two-tier approach: 1) “mitigation” – reducing the flow of greenhouse gases into the atmosphere; and 2) “adaptation” – learning to")
      .attr('x', 100)
      .attr('y', 1960);

    textBox.append("text").html("live with, and adapt to, the climate change that has already been set in motion. The key question is: what will our emissions of")
      .attr('x', 100)
      .attr('y', 1990);

    textBox.append("text").html("carbon dioxide and other pollutants be in the years to come? Recycling and driving more fuel-efficient cars are examples of important")
      .attr('x', 100)
      .attr('y', 2020);

    textBox.append("text").html("behavioral change that will help, but they will not be enough. Because climate change is a truly global, complex problem with economic,")
      .attr('x', 100)
      .attr('y', 2050);

    textBox.append("text").html("social, political and moral ramifications, the solution will require both a globally-coordinated response (such as international")
      .attr('x', 100)
      .attr('y', 2080);

    textBox.append("text").html("policies and agreements between countries, a push to cleaner forms of energy) and local efforts on the city- and regional-level (for")
      .attr('x', 100)
      .attr('y', 2110);

    textBox.append("text").html("example, public transport upgrades, energy efficiency improvements, sustainable city planning, etc.). It’s up to us what happens next.")
      .attr('x', 100)
      .attr('y', 2140);*/