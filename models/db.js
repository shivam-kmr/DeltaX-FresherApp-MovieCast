const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/imdb',{useNewUrlParser:true},(err)=>{
    if(!err){console.log("Mongo db Connection Success!=> Movie Name")}
    else{console.log("Opps! Error in DB Connection :>Mo"+err)}
});

require('./movie.model');
require('./actor.model');

