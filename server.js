'use strict';

// import necessary modules
var express = require("express"),
    routes = require("./app/routes/index.js"), // non-core module
    mongo = require("mongodb").MongoClient;

// initialize express
var app = express();

// connect to mongo dbs clementinejs
mongo.connect('mongodb://tkhanna42:funnybunny@ds141450.mlab.com:41450/clementinejs', function (err, db) {
    if (err) {
        // throw an error if connection fails
        throw new Error("Database failed to connect!");
    } else {
        //success message
        console.log("Mongo successfully connected on port 27017.");
    }
    
    // add shortcuts to public and controllers directories
    app.use('/public' , express.static(process.cwd() + '/public'));
    app.use('/controllers' , express.static(process.cwd() + '/app/controllers'));
    
    // pass app and connected db to routes module
    routes(app, db);
    
    // start server on port 8080,  log a success message
    app.listen(8080, function () {
        console.log("listening on port 8080...");
    });
    
});

