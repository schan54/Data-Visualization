function displayMaxIso(a) {

  d3.select("#topHeader").remove();
  d3.select("#top1").remove();
  d3.select("#top2").remove();
  d3.select("#top3").remove();
  d3.select("#top4").remove();
  d3.select("#top5").remove();

  svg.append("text").html("Top5 CO2 Growth").attr("id", "topHeader").attr("x", 850).attr("y", 60);
  svg.append("text").html("1. " + a[4][2] + ": " + Math.floor(a[4][1]) + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
  svg.append("text").html("2. " + a[3][2] + ": " + Math.floor(a[3][1]) + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
  svg.append("text").html("3. " + a[2][2] + ": " + Math.floor(a[2][1]) + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
  svg.append("text").html("4. " + a[1][2] + ": " + Math.floor(a[1][1]) + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
  svg.append("text").html("5. " + a[0][2] + ": " + Math.floor(a[0][1]) + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);

}

function displayMinIso(a) {

  d3.select("#top1").remove();
  d3.select("#top2").remove();
  d3.select("#top3").remove();
  d3.select("#top4").remove();
  d3.select("#top5").remove();

  svg.append("text").html("1. " + a[0][2] + ": " + Math.floor(a[0][1]) + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
  svg.append("text").html("2. " + a[1][2] + ": " + Math.floor(a[1][1]) + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
  svg.append("text").html("3. " + a[2][2] + ": " + Math.floor(a[2][1]) + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
  svg.append("text").html("4. " + a[3][2] + ": " + Math.floor(a[3][1]) + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
  svg.append("text").html("5. " + a[4][2] + ": " + Math.floor(a[4][1]) + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);
}

function displayMaxCompare(max5, min5, hash) {

  d3.select("#top1").remove();
  d3.select("#top2").remove();
  d3.select("#top3").remove();
  d3.select("#top4").remove();
  d3.select("#top5").remove();

  d3.select("#bot1").remove();
  d3.select("#bot2").remove();
  d3.select("#bot3").remove();
  d3.select("#bot4").remove();
  d3.select("#bot5").remove();

  var top1,top2,top3,top4,top5;
  var bot1,bot2,bot3,bot4,bot5;

  tea = Object.values(hash);

  var hashString = "";
  var hashNum = 0;
  for (var index in hash) {
    //console.log(Object.keys(tea[index]));
    //Comparing for Max
    hashNum = Object.values(tea[index][1]).join();
    hashNum= hashNum.replace(/,/g, '');

    hashString = Object.values(tea[index][2]).join();
    hashString = hashString.replace(/,/g, '');

    if(hashString == max5[4][2]) {
      top1 = max5[4][1] - Number(hashNum);
    }
    else if (hashString == max5[3][2]) {
      top2 = max5[3][1] - Number(hashNum);
    }
    else if (hashString == max5[2][2]) {
      top3 = max5[2][1] - Number(hashNum);
    }
    else if (hashString == max5[1][2]) {
      top4 = max5[1][1] - Number(hashNum);
    }
    else if (hashString == max5[0][2]) {
      top5 = max5[0][1] - Number(hashNum);
    }

    //Comparing for mins
    else if(hashString == min5[0][2]) {
      bot1 = min5[0][1] - Number(hashNum);
    }
    else if (hashString == min5[1][2]) {
      bot2 = min5[1][1] - Number(hashNum);
    }
    else if (hashString == min5[2][2]) {
      bot3 = min5[2][1] - Number(hashNum);
    }
    else if (hashString == min5[3][2]) {
      bot4 = min5[3][1] - Number(hashNum);
    }
    else if (hashString == min5[4][2]) {
      bot5 = min5[4][1] - Number(hashNum);
    }

  }

  svg.append("text").html("Top5 CO2 Growth").attr("id", "top1").attr("x", 850).attr("y", 60);

  svg.append("text").html("1. " + max5[4][2] + ": " + Math.floor(top1) + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
  svg.append("text").html("2. " + max5[3][2] + ": " + Math.floor(top2) + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
  svg.append("text").html("3. " + max5[2][2] + ": " + Math.floor(top3) + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
  svg.append("text").html("4. " + max5[1][2] + ": " + Math.floor(top4) + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
  svg.append("text").html("5. " + max5[0][2] + ": " + Math.floor(top5) + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);


  svg.append("text").html("Top5 CO2 Reduction").attr("id", "top1").attr("x", 1100).attr("y", 60);

  svg.append("text").html("1. " + min5[0][2] + ": " + Math.floor(bot1) + " MtCO2").attr("id", "bot1").attr("x", 1100).attr("y", 80);
  svg.append("text").html("2. " + min5[1][2] + ": " + Math.floor(bot2) + " MtCO2").attr("id", "bot2").attr("x", 1100).attr("y", 100);
  svg.append("text").html("3. " + min5[2][2] + ": " + Math.floor(bot3) + " MtCO2").attr("id", "bot3").attr("x", 1100).attr("y", 120);
  svg.append("text").html("4. " + min5[3][2] + ": " + Math.floor(bot4) + " MtCO2").attr("id", "bot4").attr("x", 1100).attr("y", 140);
  svg.append("text").html("5. " + min5[4][2] + ": " + Math.floor(bot5) + " MtCO2").attr("id", "bot5").attr("x", 1100).attr("y", 160);

}

function displayMinCompare(a,b) {

  d3.select("#top1").remove();
  d3.select("#top2").remove();
  d3.select("#top3").remove();
  d3.select("#top4").remove();
  d3.select("#top5").remove();

  svg.append("text").html("1. " + a[0][2] + ": " + Math.floor(a[0][1]) + " MtCO2").attr("id", "top1").attr("x", 850).attr("y", 80);
  svg.append("text").html("2. " + a[1][2] + ": " + Math.floor(a[1][1]) + " MtCO2").attr("id", "top2").attr("x", 850).attr("y", 100);
  svg.append("text").html("3. " + a[2][2] + ": " + Math.floor(a[2][1]) + " MtCO2").attr("id", "top3").attr("x", 850).attr("y", 120);
  svg.append("text").html("4. " + a[3][2] + ": " + Math.floor(a[3][1]) + " MtCO2").attr("id", "top4").attr("x", 850).attr("y", 140);
  svg.append("text").html("5. " + a[4][2] + ": " + Math.floor(a[4][1]) + " MtCO2").attr("id", "top5").attr("x", 850).attr("y", 160);
}

function displayTotalIso(a) {
  d3.select("#totalSum").remove();
  var totalSum = 0;
  for (index in a) {
    totalSum = totalSum + Number(a[index][1]);
  }
  svg.append("text").html("World's Total Emissions: " + Math.floor(totalSum)).attr("id", "totalSum").attr("x", 600).attr("y", 70);
}

function bubbleSort(a){
  var swapp;
  var n = a.length-1;

  var x=a;
  do {
      swapp = false;
      for (var i=0; i < n; i++)
      {

          if (Number(x[i][1]) > Number(x[i+1][1])) {
             var temp = x[i];
             x[i] = x[i+1];
             x[i+1] = temp;
             swapp = true;
          }
      }
      n--;
  } while (swapp);
return allCountries;
}

function sortHash(hashmap) {

  allCountries = [];
  tea = Object.values(hashmap);

  //console.log(Object.values(tea[1]))

  var yearIndex = userYear - 1960
  for (var index in tea) {
    //console.log(Object.keys(tea[index]));
    var countryKeys = (Object.keys(tea[index]));
    var countryValues = (Object.values(tea[index]));
    var countryArray = [];

    countryArray.push(countryKeys[yearIndex]);
    countryArray.push(countryValues[yearIndex]);
    countryArray.push(countryValues[countryKeys.length-1]);
    if (isNaN(countryArray[1]) || countryArray[1] == "" || !(isNaN(countryArray[2]))) {
    }
    else {
      allCountries.push(countryArray);
    }
  }
  //console.log(allCountries);
  return(bubbleSort(allCountries));
}
