var net = require('net');
var chat = require('./chat.js');

var clients = [];
var onlineUsers = []; //used to display other users online

const server = net.createServer((socket) => {

  socket.name = chat.newHandle();
  var userName = socket.name;

  //broadcasts that new socket has opened
  chat.broadcast(clients, socket.name, 'has joined.\n');

  clients.push(socket);

  //welcome message to new client
  chat.newClientWelcome(onlineUsers, socket);

  //push new client to onlineUsers arr
  onlineUsers.push(socket.name);

  //event emitter for new socket data
  socket.on('data', (chunk) =>{
    chat.broadcast(clients, `${userName}: `, chunk);
  });

  //on socket disconnect
  socket.on('close', () =>{
    chat.onClientDisconnect(clients, socket);
    chat.broadcast(clients, socket.name, 'has disconnected.');
  });
  // chat.onClientDisconnect(clients, socket);

});

module.exports = server;
