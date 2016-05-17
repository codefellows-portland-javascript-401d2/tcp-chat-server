var net = require('net');
var fs = require('fs');
//var chat = require('./chat');

var clients = [];
var onlineUsers = []; //used to display other users online

const log = fs.createWriteStream('chat-log.txt');

const server = net.createServer((socket) => {
  //assigns random number to socket.name
  socket.name = newHandle();

  var userName = socket.name;

  broadcast(socket.name, 'has joined.\n');
  clients.push(socket);

  //welcome message to new client
  socket.write(`May the force be with you, ${socket.name}!\n` );
  if(onlineUsers.length > 0){
    socket.write(onlineUsers.join(', ') + ' are also online.\n');
  } else {
    socket.write('you are the only user online\n');
  }

  //adds new client to those online
  onlineUsers.push(socket.name);

  //event emitter for new socket data
  socket.on('data', (chunk) =>{
    broadcast(`${userName}: `, chunk);
  });

  //on disconnect, notes disconnect and user name on server, removes departing client from client array
  socket.on('close', () =>{
    var index = clients.indexOf(socket.name);
    //removes departing clients
    clients.splice(index, 1);

    broadcast(socket.name, 'has disconnected.');
  });
});

var newHandle = function(){
  return 'jedi-' + Math.floor(Math.random() * 10000);
};

var broadcast = function(currentUser, message){
  clients.forEach((user) =>{
    if(currentUser !== `${user.name}: `){
      user.write(`${currentUser} ${message.toString()}`);
    }
  });
  console.log(`${currentUser} ${message.toString()}`);
  log.write(`${currentUser} ${message.toString()}`);
};

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});

module.exports = server;
