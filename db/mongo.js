'use strict';

const mongoose = require('mongoose');

let db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

db.once('open', function(){
    console.log("Connected to mongod server");
});

module.exports = function() {
    mongoose.connect(config.mongoUrl);
    return mongoose;
}