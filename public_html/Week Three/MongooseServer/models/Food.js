// Food Schema Model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// food model structure
var foodSchema = new Schema({
    food:{
        type:String,
        required:true
    }
});

mongoose.model('food', foodSchema)