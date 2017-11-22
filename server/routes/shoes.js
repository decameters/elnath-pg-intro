var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var bodyParser = require('body-parser');

var pool = require('../modules/pool');

router.get( '/', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){ //  this is a callback function
        // attempt to connect to database
        if(errorConnectingToDatabase) {
            // there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500); // internal server error
        } else {
            // we connected to the database!
            // we're going to GET things from the DB
            client.query('SELECT * FROM shoes ORDER BY id;', function(errorMakingQuery, result){ // callback function after our query runs
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

router.post('/', function(req, res){
    // attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done){ //  this is a callback function
        // attempt to connect to database
        if(errorConnectingToDatabase) {
            // there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500); // internal server error
        } else {
            // we connected to the database!
            // we're going to GET things from the DB
            client.query(`INSERT INTO shoes (name)
            VALUES ($1);`, [req.body.name], function(errorMakingQuery, result){ // callback function after our query runs
                done();
                if(errorMakingQuery){
                    // query failed. did you test it in Postico?
                    // log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

router.delete('/:id', function(req, res){
    var shoeIdToRemove = req.params.id;
    // attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done){ //  this is a callback function
        // attempt to connect to database
        if(errorConnectingToDatabase) {
            // there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500); // internal server error
        } else {
            // we connected to the database!
            // we're going to GET things from the DB
            client.query(`DELETE FROM shoes WHERE id=$1;`, [shoeIdToRemove], function(errorMakingQuery, result){ // callback function after our query runs
                done();
                if(errorMakingQuery){
                    // query failed. did you test it in Postico?
                    // log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
})

router.put('/:id', function(req, res){
    var shoeIdToSave = req.params.id;
    // attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done){ //  this is a callback function
        // attempt to connect to database
        if(errorConnectingToDatabase) {
            // there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500); // internal server error
        } else {
            // we connected to the database!
            // we're going to GET things from the DB
            client.query(`UPDATE shoes SET name = $1
            WHERE id = $2;`, [req.body.name, shoeIdToSave], function(errorMakingQuery, result){ // callback function after our query runs
                done();
                if(errorMakingQuery){
                    // query failed. did you test it in Postico?
                    // log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

module.exports = router;