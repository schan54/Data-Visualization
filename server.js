var express = require('express')
var app = express();

const host = '0.0.0.0';

//set port
var port = process.env.PORT || '8080'

app.use(express.static(__dirname));

//routes

app.get("/", function(req, res){
    res.send("/co2/index");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });