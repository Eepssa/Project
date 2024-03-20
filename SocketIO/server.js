
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

let nextUserId = 1; // Initialize a counter for assigning user IDs

io.on('connection', (socket) => {
  const userId = nextUserId++; // Assign a user ID to the newly connected user
  console.log(`User ${userId} connected`);

  socket.on('message', (message) => {
    console.log(`User ${userId} sent message: ${message}`);
    // Broadcast the received message along with the user ID to all connected clients except the sender
    socket.broadcast.emit('message', { userId, message });
  });

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
