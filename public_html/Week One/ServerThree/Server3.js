var http = require("http"); // built in http support
var url = require("url");
var fileSystem = require("fs")

// creating server instance
const server = http.createServer((req, res) => { // arrow function (lambda)
    
    var pathName = url.parse(req.url).pathname

    // Everything inside of here belongs to the Node Server created
    //res.statusCode = 200
    //res.setHeader('Content-Type', 'text/plain');
    console.log(pathName);
    // writing to http header 
    res.writeHead(200, {"Content-Type":"text/html", "encoding": "UTF-8"});
    res.write("<!DOCTYPE HTML><html><body><div><p>Request for: " + pathName + " recieved.</p></div></body></html>")

    // send response to body 
    res.end();
   
}).listen(3000) // server.listen(port, hostname) 


console.log('Server running on port 3000')
