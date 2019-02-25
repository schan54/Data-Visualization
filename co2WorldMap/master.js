/* Toggle between adding and removing the "responsive" class to menubar when the user clicks on the icon */
function hamFunction() {
  var x = document.getElementById("mymenu");
  if (x.className === "menubar") {
    x.className += " responsive";
  } else {
    x.className = "menubar";
  }
}