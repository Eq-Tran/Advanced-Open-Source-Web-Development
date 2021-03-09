var express = require("express");
var mongoose = require("mongoose");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");

// Sets up Middleware for app use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// Connection to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to Database!")
}).catch((err) => {
    console.log(err);
});

// Load in the DB templates or schemas we created in Food.js
require('./models/Food');
var Food = mongoose.model('food'); // reference to foodSchema

/*
// Basic Data Entry using Mongoose
var Food = mongoose.model('Food', {name:String});

var food = new Food({name:"Pho"});
food.save().then(() => {
    console.log("ENtry saved:");
})
*/

// POST request
app.post('/saveFoodEntry', (req,res) => {
    console.log("post request made");
    console.log(req.body);

    new Food(req.body).save().then(() => {
        console.log("data saved");
        res.redirect('foodlist.html');
    })
});

// GET request
app.get('/getData', (req,res) => {
    Food.find({}).then((food) => {
        res.json({food});
    })
})

// POST request uses post method to delete from db
app.post('/deleteFood', (req,res) => {
    console.log('Food Deleted: ', req.body._id);
    Food.findByIdAndDelete(req.body._id).exec();
    res.redirect('foodlist.html');
})

// DELETE request uses delete method to remove from db
app.delete('/delFood', (req,res) =>{
    console.log('food del: ', req.body._id);
    Food.findByIdAndDelete(req.body._id).exec();
    res.redirect('foodlist.html')
})

// Sets up static directory path to views
app.use(express.static(__dirname + '/views'));
app.listen(3000, () => {
    console.log("Connected on port 3000");
})