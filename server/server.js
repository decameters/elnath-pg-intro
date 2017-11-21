var express = require('express');
var bodyParser = require('body-parser');
var shoes = require('./routes/shoes');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use( '/shoes', shoes);

app.listen( port, function(){
    console.log('server is listening on port', port);
});