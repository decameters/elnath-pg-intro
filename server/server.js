var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var shoes = [{name: 'nike', cost: '75'}];

// for localhost:5000/shoes should return an array of shoe objects
app.get( '/shoes', function (req, res){
    res.send(shoes);
});

app.listen( port, function(){
    console.log('server is listening on port', port);
});