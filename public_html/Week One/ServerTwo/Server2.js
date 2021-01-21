var http = require("http"); // built in http support

// const hostname = '127.0.0.1' 
// const port = 3000

// creating server instance
const server = http.createServer((req, res) => { // arrow function (lambda)
    
    var url = req.url // gives the complete url with parameters

    // Everything inside of here belongs to the Node Server created
    //res.statusCode = 200
    //res.setHeader('Content-Type', 'text/plain');
    
    // writing to http header 
    res.writeHead(200, {"Content-Type":"text/plain"});

    // send response to body 
    res.end("Server 2: URL Requested \n" + url);

}).listen(3000); // server.listen(port, hostname) 


console.log('Server running at http://localhost:3000');
