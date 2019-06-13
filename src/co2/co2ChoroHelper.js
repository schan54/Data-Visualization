function displayMaxIso(max5, min5) {

  d3.select("#topHeader").remove();
  d3.select("#top1").remove();
  d3.select("#top2").remove();
  d3.select("#top3").remove();
  d3.select("#top4").remove();
  d3.select("#top5").remove();

  d3.select("#botHeader").remove();
  d3.select("#bot1").remove();
  d3.select("#bot2").remove();
  d3.select("#bot3").remove();
  d3.select("#bot4").remove();
  d3.select("#bot5").remove();

  choroSvg.append("text").html("Highest Producers").attr("id", "topHeader").attr("x", 825).attr("y", 50);

  choroSvg.append("text").html("1. " + max5[4][2].substring(0, 18) + ": " + Math.floor(max5[4][1]))
    .attr("id", "top1")
    .attr("x", 850).attr("y", 80);
  choroSvg.append("text").html("2. " + max5[3][2].substring(0, 18) + ": " + Math.floor(max5[3][1]))
    .attr("id", "top2")
    .attr("x", 850).attr("y", 100);
  choroSvg.append("text").html("3. " + max5[2][2].substring(0, 18) + ": " + Math.floor(max5[2][1]))
    .attr("id", "top3")
    .attr("x", 850).attr("y", 120);
  choroSvg.append("text").html("4. " + max5[1][2].substring(0, 18) + ": " + Math.floor(max5[1][1]))
    .attr("id", "top4")
    .attr("x", 850).attr("y", 140);
  choroSvg.append("text").html("5. " + max5[0][2].substring(0, 18) + ": " + Math.floor(max5[0][1]))
    .attr("id", "top5")
    .attr("x", 850).attr("y", 160);

    choroSvg.append("text").html("Lowest Producers").attr("id", "botHeader").attr("x", 1025).attr("y", 50);

    choroSvg.append("text").html("1. " + min5[0][2].substring(0, 18) + ": " + format(min5[0][1])).attr("id", "bot1").attr("x", 1050).attr("y", 80);
    choroSvg.append("text").html("2. " + min5[1][2].substring(0, 18) + ": " + format(min5[1][1])).attr("id", "bot2").attr("x", 1050).attr("y", 100);
    choroSvg.append("text").html("3. " + min5[2][2].substring(0, 18) + ": " + format(min5[2][1])).attr("id", "bot3").attr("x", 1050).attr("y", 120);
    choroSvg.append("text").html("4. " + min5[3][2].substring(0, 18) + ": " + format(min5[3][1])).attr("id", "bot4").attr("x", 1050).attr("y", 140);
    choroSvg.append("text").html("5. " + min5[4][2].substring(0, 18) + ": " + format(min5[4][1])).attr("id", "bot5").attr("x", 1050).attr("y", 160);
}

function displaySumIso(a) {
  d3.select("#choroSum").remove();
  d3.select("#choroSumText").remove();
  d3.select("#choroSumText2").remove();

  var totalSum = 0;
  for (index in a) {
    totalSum = totalSum + Number(a[index][1]);
  }

  choroSvg.append("text").html("World's Emission by Year").attr("id", "choroSumText").attr("x", 600).attr("y", 70);
  choroSvg.append("text").html(Math.floor(totalSum) + " MtCO2").attr("id", "choroSum").attr("x", 620).attr("y", 120);

}

function displayMaxCompare(hash1, hash2) {

  d3.select("#topHeader").remove();
  d3.select("#botHeader").remove();

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

  var compareArray = [];

loop1:
  for (var index in hash1) {
loop2:
    for (var nestedIndex in hash2) {
      if (hash1[index][2] == hash2[nestedIndex][2]) {
        var tempArray = [];
        tempArray.push(hash1[index][0]);

        var value = Number(hash1[index][1]) - Number(hash2[nestedIndex][1]);

        tempArray.push(value);


        tempArray.push(hash1[index][2]);
        compareArray.push(tempArray);
        break loop2;
      }
    }
  }
  sortedCompare = bubbleSort(compareArray);

  max5 = sortedCompare.slice((sortedCompare.length - 5), sortedCompare.length);
  min5 = sortedCompare.slice(0, 5);

  choroSvg.append("text").html("Largest Growth").attr("id", "topHeader").attr("x", 825).attr("y", 50);

  choroSvg.append("text").html("1. " + max5[4][2].substring(0, 18) + ": " + Math.floor(max5[4][1])).attr("id", "top1").attr("x", 850).attr("y", 80);
  choroSvg.append("text").html("2. " + max5[3][2].substring(0, 18) + ": " + Math.floor(max5[3][1])).attr("id", "top2").attr("x", 850).attr("y", 100);
  choroSvg.append("text").html("3. " + max5[2][2].substring(0, 18) + ": " + Math.floor(max5[2][1])).attr("id", "top3").attr("x", 850).attr("y", 120);
  choroSvg.append("text").html("4. " + max5[1][2].substring(0, 18) + ": " + Math.floor(max5[1][1])).attr("id", "top4").attr("x", 850).attr("y", 140);
  choroSvg.append("text").html("5. " + max5[0][2].substring(0, 18) + ": " + Math.floor(max5[0][1])).attr("id", "top5").attr("x", 850).attr("y", 160);


  choroSvg.append("text").html("Largest Reduction").attr("id", "botHeader").attr("x", 1025).attr("y", 50);

  choroSvg.append("text").html("1. " + min5[0][2].substring(0, 18) + ": " + Math.floor(min5[0][1])).attr("id", "bot1").attr("x", 1050).attr("y", 80);
  choroSvg.append("text").html("2. " + min5[1][2].substring(0, 18) + ": " + Math.floor(min5[1][1])).attr("id", "bot2").attr("x", 1050).attr("y", 100);
  choroSvg.append("text").html("3. " + min5[2][2].substring(0, 18) + ": " + Math.floor(min5[2][1])).attr("id", "bot3").attr("x", 1050).attr("y", 120);
  choroSvg.append("text").html("4. " + min5[3][2].substring(0, 18) + ": " + Math.floor(min5[3][1])).attr("id", "bot4").attr("x", 1050).attr("y", 140);
  choroSvg.append("text").html("5. " + min5[4][2].substring(0, 18) + ": " + Math.floor(min5[4][1])).attr("id", "bot5").attr("x", 1050).attr("y", 160);

}

function displaySumCompare(a, b) {
  d3.select("#choroSum").remove();
  d3.select("#choroSumText").remove();
  d3.select("#choroSumText2").remove();

  var totalSum = 0;
  for (index in a) {
    totalSum = totalSum + Number(a[index][1]);
  }
  for (index in b) {
    totalSum = totalSum - Number(b[index][1]);
  }
  choroSvg.append("text").html("World's Compared").attr("id", "choroSumText").attr("x", 625).attr("y", 70);
  choroSvg.append("text").html("Emissions").attr("id", "choroSumText2").attr("x", 650).attr("y", 100);

  choroSvg.append("text").html(Math.floor(totalSum) + " MtCO2").attr("id", "choroSum").attr("x", 625).attr("y", 140);
}

function displayPercentCompare(hash1, hash2) {

  d3.select("#topHeader").remove();
  d3.select("#botHeader").remove();

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

  var compareArray = [];

loop1:
  for (var index in hash1) {
loop2:
    for (var nestedIndex in hash2) {
      if (hash1[index][2] == hash2[nestedIndex][2]) {
        var tempArray = [];
        tempArray.push(hash1[index][0]);

        var value = Number(hash1[index][1]) - Number(hash2[nestedIndex][1]);

        //value = value / Number(hash2[nestedIndex][1]) * 100;

        tempArray.push(value);

        tempArray.push(hash1[index][2]);
        compareArray.push(tempArray);
        break loop2;
      }
    }
  }
  sortedCompare = bubbleSort(compareArray);

  max5 = sortedCompare.slice((sortedCompare.length - 5), sortedCompare.length);
  min5 = sortedCompare.slice(0, 5);

  choroSvg.append("text").html("Largest Growth").attr("id", "topHeader").attr("x", 850).attr("y", 60);

  choroSvg.append("text").html("1. " + max5[4][2].substring(0, 18) + ": " + Math.floor(max5[4][1]) + "%").attr("id", "top1").attr("x", 850).attr("y", 80);
  choroSvg.append("text").html("2. " + max5[3][2].substring(0, 18) + ": " + Math.floor(max5[3][1]) + "%").attr("id", "top2").attr("x", 850).attr("y", 100);
  choroSvg.append("text").html("3. " + max5[2][2].substring(0, 18) + ": " + Math.floor(max5[2][1]) + "%").attr("id", "top3").attr("x", 850).attr("y", 120);
  choroSvg.append("text").html("4. " + max5[1][2].substring(0, 18) + ": " + Math.floor(max5[1][1]) + "%").attr("id", "top4").attr("x", 850).attr("y", 140);
  choroSvg.append("text").html("5. " + max5[0][2].substring(0, 18) + ": " + Math.floor(max5[0][1]) + "%").attr("id", "top5").attr("x", 850).attr("y", 160);


  choroSvg.append("text").html("Largest Reduction").attr("id", "botHeader").attr("x", 1050).attr("y", 60);

  choroSvg.append("text").html("1. " + min5[0][2].substring(0, 18) + ": " + Math.floor(min5[0][1]) + "%").attr("id", "bot1").attr("x", 1050).attr("y", 80);
  choroSvg.append("text").html("2. " + min5[1][2].substring(0, 18) + ": " + Math.floor(min5[1][1]) + "%").attr("id", "bot2").attr("x", 1050).attr("y", 100);
  choroSvg.append("text").html("3. " + min5[2][2].substring(0, 18) + ": " + Math.floor(min5[2][1]) + "%").attr("id", "bot3").attr("x", 1050).attr("y", 120);
  choroSvg.append("text").html("4. " + min5[3][2].substring(0, 18) + ": " + Math.floor(min5[3][1]) + "%").attr("id", "bot4").attr("x", 1050).attr("y", 140);
  choroSvg.append("text").html("5. " + min5[4][2].substring(0, 18) + ": " + Math.floor(min5[4][1]) + "%").attr("id", "bot5").attr("x", 1050).attr("y", 160);

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
  return x;
}

function sortHash(hashmap, year) {

  var allCountries = [];
  tea = Object.values(hashmap);

  //console.log(Object.values(tea[1]))

  var yearIndex = year - 1960
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
      //console.log(countryArray);
      allCountries.push(countryArray);
    }
  }
  //console.log(allCountries);
  return(bubbleSort(allCountries));
}
