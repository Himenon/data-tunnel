import * as cors from "cors";

const app = require('express')()
const http = require('http').Server(app)
const sio = require('socket.io')(http)


app.use(cors({ origin: "*" }));

// @ts-ignore
app.get('/', function(req, res) {
    //   res.sendFile(__dirname + '/index.html');
    res.send('<h1>Hello world</h1>')
})

// @ts-ignore
sio.on('connection', function(socket) {
    console.log('a user connected')
})

http.listen(3000, function() {
    console.log('listening on *:3000')
})
