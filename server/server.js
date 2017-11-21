var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var config = { // this object tells PG what to do
    database: 'shoe_store', // the name of our database
    host: 'localhost', // where is your database (which computer)?
    port: 5432, // the port number for your database, 5432 is default
    max: 10, // how many connections at one time
    idleTimeoutMillies: 30000 // 30 seconds to try to connect to our DB
};

var pool = new pg.Pool(config); // pool of connections to DB

// var shoes = [{name: 'nike', cost: '75'}];

// for localhost:5000/shoes should return an array of shoe objects
app.get( '/shoes', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){ //  this is a callback function
        // attempt to connect to database
        if(errorConnectingToDatabase) {
            // there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500); // internal server error
        } else {
            // we connected to the database!
            // we're going to GET things from the DB
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){ // callback function after our query runs
                done();
                if(errorMakingQuery){
                    // query failed. did you test it in Postico?
                    // log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    }) 
});

app.listen( port, function(){
    console.log('server is listening on port', port);
});