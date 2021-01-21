var http = require("http"); // built in http support
var url = require("url");
var fileSystem = require("fs");
//const { response } = require("../../Week Two/ServerTwo/app");

// creating server instance
const server = http.createServer((req, res) => { // arrow function (lambda)
    
    // Everything inside of here belongs to the Node Server created
    var pathName = url.parse(req.url).pathname;
    var fileName = "index.html"
    console.log(req.url);
    
    // Load html page
    fileSystem.readFile(fileName, (err,data) =>{

        // writing error status to http response header
        if(err){
            
            console.log(err);
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.write("<!DOCTYPE HTML><html><body><div><p>400 Error: Page not found</p></div></body></html>");
        }else{
            // valid http header
            res.writeHead(200, {"Content-Type": "text/html"}); // {"Content-Type": "text/plain"}

            // send response to client
            res.write(data.toString());
        }
        //res.writeHead()
        res.end();
    });

    // setting response header types
    //res.statusCode = 200
    //res.setHeader('Content-Type', 'text/plain');
 
    // writing to http header 
    //res.writeHead(200, {"Content-Type":"text/html", "encoding": "UTF-8"});
    //res.write("<!DOCTYPE HTML><html><body><div><p>Request for: " + pathName + " recieved.</p></div></body></html>")

    // send response to body client
    //res.end();
}).listen(3000) // server.listen(port, hostname) 


console.log('Server running on port 3000')
