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
let connectCounter=0
io.on('connection', (socket) => {
  connectCounter++
  console.log('a user connected');
  console.log({socket})
  socket.emit('chat message',`user connected, currently online${
    connectCounter}`)
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', function() { connectCounter--; });
  });


server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
