const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
console.log('logged to console');
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
