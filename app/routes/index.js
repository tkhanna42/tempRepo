'use strict';

// import ClickHandler class from controllers
var ClickHandler = require(process.cwd() + "/app/controllers/clickHandler.server.js");

// export the function as a module
module.exports = function (app, db) {
    // instantiate ClickHandler
    var clickHandler = new ClickHandler(db);
    
    // route / to index.html
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
      
    // route various requests to  /api/clicks  
    app.route('/api/clicks')
        // GET request calls getClicks
        .get(clickHandler.getClicks)
        // POST request calls addClick
        .post(clickHandler.addClick)
        // DELETE request calls resetClicks
        .delete(clickHandler.resetClicks);
};