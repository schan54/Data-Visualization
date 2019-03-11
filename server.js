var express = require('express');
var app = express();

const host = '0.0.0.0';
var path = require('path');
//set port
var port = process.env.PORT || '443'

app.use(express.static(__dirname,"public"));

//routes
app.engine('html', require('ejs').renderFile);

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/co2/index.html'));
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });