var express = require('express')
var app = express();

//set port
var port = '8080' || process.env.PORT

app.use(express.static(__dirname));

//routes

app.get("/", function(req, res){
    res.render("index");
})

app.listen(port, function(){
    console.log("app running")

})