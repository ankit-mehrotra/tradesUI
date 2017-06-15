// var fs = require('fs');
// var http = require('http');
// var obj;
// var server = http.createServer(function(req,res){
//
// });
// server.listen(4000);
// console.log("Server is listening on port 4000");


var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var obj;
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.get('/getdata', function(req, res) {
  fs.readFile('trades.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    console.log(data);
    res.send(data);
  });
});

app.listen(8081, function() {
  console.log('Server running at http://127.0.0.1:8081/');
});
