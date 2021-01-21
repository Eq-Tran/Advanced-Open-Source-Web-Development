var websocketserver = require("ws").Server,
wss = new websocketserver({port:3000}),
clients = [],
messages = []

wss.on('connection', (ws) =>{
    var index = clients.push(ws) - 1;
    var messageText = messages.join('<br/>');

    ws.send(messageText);
    
    ws.on('message', (message) => {

        messages.push(message);
        console.log('received from %s from %s', message, index);

        wss.clients.forEach((conn) =>{
            conn.send(message);
        })
    })
})