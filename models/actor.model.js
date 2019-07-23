const mongoose = require('mongoose');

var actorSchema = new mongoose.Schema({
    poster:{
        type:String,
        required:"Required!"
    },
    actorName:{
        type: String,
        required:"Required!"
    },
    sex:{
        type: String,
        required:"Required!"
    },
    dateOfBirth:{
        type: Date,
        required:"Required!"
        
    },
    bio:{
        type: String,
        required:"Required!"
    }
   
});

mongoose.model('actor',actorSchema);
