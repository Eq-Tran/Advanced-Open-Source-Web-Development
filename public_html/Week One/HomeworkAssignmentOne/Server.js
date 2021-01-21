const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req,res) => {

    var u = url.parse(req.url).pathname
    let fileName = "index.html"; // 
 
    console.log(fileName)
    fs.readFile(fileName, (err, fileData) => {

        if(err){
            res.writeHead(400,{"Content-Type": "text/html"});
            res.write("<h1>400 ERROR</h1>")
            console.log("bad request error")
        }else{

            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(fileData.toString() + u);
        }
        res.end();
    })


    /*
    res.statusCode = 200;
    res.writeHead(200, {"Content-Type" : "text/html"});
    res.write("hello world");
    res.end();
    */
})
server.listen(3000, () => {
    console.log("Server running on port 3000")
});

