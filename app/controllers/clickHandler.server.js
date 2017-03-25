'use strict';

// define the clickHandler class
function clickHandler (db) {
    // set clicks to the collection 'clicks' in the dbs clementinejs on mongo
    var clicks = db.collection('clicks');
    
    //get number of clicks
    this.getClicks = function (req, res) {
        // set projection option in findOne to hide the '_id' values in response
        var clickProjection = {'_id' : false};
        
        // findOne, since clicks only has one item, returns the only value in clicks
        clicks.findOne({}, clickProjection, function (err, result) {
            // throw error message
            if (err) throw err;
            
            // check if clicks document exists in clicks collection
            if (result) {
                // if yes, return as json
                res.json(result);    
            } else {
                // otherwise insert a clicks document in clicks collection
                clicks.insert({'clicks' : 0}, function (err) {
                    if (err) throw err;
                    
                    // return number of clicks now that we have added a clicks document to the collection
                    clicks.findOne({}, clickProjection, function (err, doc) {
                        if (err) throw err;
                        
                        // returned as json
                        res.json(doc);
                    })
                });
            }
        });
    };
    
    // increment number of clicks
    this.addClick = function (req, res) {
        // findAndModify the existing clicks number by 1
        clicks.findAndModify({}, {'_id' : 1}, // sort query response in ascending order, doesn't matter here, -1 for desc
                            {$inc : {'clicks' : 1}}, // increment clicks value by 1
                            function (err, result) {
            if (err) throw err;
            
            // return as json
            res.json(result);
        });
    };
    
    // reset the clicks number to 0
    this.resetClicks = function (req, res) {
        // update the value
        clicks.update({}, {"clicks" : 0}, function (err, result) {
            if (err) throw err;
            
            // return as json
            res.json(result);
        });
    };
}

// export clickHandler class as a module
module.exports = clickHandler;