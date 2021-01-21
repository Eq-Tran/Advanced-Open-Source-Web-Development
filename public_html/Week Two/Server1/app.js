var express = require("express"); // express module for initializing express templates
var app = express();
var path = require("path");

// route to index.html
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

// route to about.html
app.get('/about.html', (req,res) =>{
    res.sendFile(path.join(__dirname + '/views/about.html'))
})

app.use(express.static(__dirname + "/views"))

app.listen(3000, () =>{
    console.log("Connected to port 3000")

})