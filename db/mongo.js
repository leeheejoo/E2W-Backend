'use strict';

const mongoose = require('mongoose');

let db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

db.once('open', function(){
    console.log("Connected to MongoDB");
});

db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    
    try {
        mongoose.connect(config.mongoUrl, {auto_reconnect:true, reconnectTries: Number.MAX_VALUE });
    }
    catch(e){
        console.log(e);
    }
    
});

try {
    mongoose.connect(config.mongoUrl, {auto_reconnect:true, reconnectTries: Number.MAX_VALUE });
}
catch(e){
    console.log(e);
}



module.exports = mongoose;