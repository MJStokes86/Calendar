// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var holidayAPI = require('node-holidayapi');
var hapi = new holidayAPI('4e9e1513-0b2a-4662-a23a-6ef4299378d6').v1;

var parameters = {
    country: 'US',
    year: 2017,

};

hapi.holidays(parameters, function(err, body){
    // var parsedBody = JSON.parse(body);

});


// Express
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'));







app.get('/', function(req, res){
    res.send(fs.readFileSync('./views/index.html', 'utf8'));
});




// Start Server
app.listen(3000);
console.log('LISTENING!')