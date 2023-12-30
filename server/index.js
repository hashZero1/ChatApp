const express = require('express');
const app = express();
const PORT = 5001;
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());
let users = [];

//Add this before the app.get() block
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
 
  //send the message to all users on the server
    socket.on('message', (data) => {
      io.emit('messageResponse', data);
      console.log(data);
    });
  
    socket.on('typing', (data) => {
      socket.broadcast.emit('typingResponse', data)
    });
  //Listens when a new user joins the server
    socket.on('newUser', (data) => {
    users.push(data);
  //Sends the list of users to the client
    io.emit('newUserResponse', users);
  });

   //Updates the list of users when a user disconnects from the server
  socket.on('disconnect', () => { 
    users = users.filter((user) => user.socketID !== socket.id);
    //Sends the list of users to the client
    io.emit('newUserResponse', users);
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});


app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${5001}`);
});