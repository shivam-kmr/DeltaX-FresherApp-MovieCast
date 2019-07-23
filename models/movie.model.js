const mongoose = require('mongoose');

var imdbSchema = new mongoose.Schema({
    poster:{
        type:String,
        required:"Required!"
    },
    movieName:{
        type: String,
        required:"Required!"
    },
    yearOfRelease:{
        type: Number,
        required:"Required!",
        min: [1888, 'Enter Valid Year as First Motion Picture was madein 1888 - Roundhay Garden Scene (1888)'],
        max: [2023,'[1888-2023] is a valid Year of Release']
    },
    plot:{
        type: String,
        required:"Required"
    },
    cast:{
        type: [String],
        required:"Required"
    }
   
});



mongoose.model('imdb',imdbSchema);
