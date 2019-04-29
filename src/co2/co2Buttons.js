function ShowHideDiv() {

        dvTextA.style.display = Compare.checked ? "block" : "none";
        dvTextB.style.display = Compare.checked ? "block" : "none";

        dvTextIso.style.display = Isolated.checked ? "block" : "none";

        //@Morgan
        //Add your method(s) of textbox selection and error checking
}

window.onload = ShowHideDiv();

document.getElementById('Compare').onclick = function() {

  ShowHideDiv();
  select(userYear);

  //Update Choropleth
  queue()
      .defer(d3.json, "../core/world_countries.json")
      .defer(d3.tsv, "worldData.tsv")
      .await(ready);
 };

 document.getElementById('Isolated').onclick = function() {

   ShowHideDiv();
   select(userYear);

   //Update Choropleth
   queue()
       .defer(d3.json, "../core/world_countries.json")
       .defer(d3.tsv, "worldData.tsv")
       .await(ready);
  };
