var net = require('net');
var fs = require('fs');


const log = fs.createWriteStream('chat-log.txt');

var clients = [];
var onlineUsers = []; //used to display other users online

const server = net.createServer((socket) => {
  //assigns random number to socket.name
  socket.name = 'jedi-' + Math.floor(Math.random() * 10000);

  var userName = socket.name;

  //adds socket.name to array of online clients
  clients.push(socket);

  broadcast(socket.name, 'has joined.');

  //write to client upon connecting
  socket.write(`May the force be with you, ${socket.name}!\n` );

  if(onlineUsers.length > 0){
    socket.write(onlineUsers.join(', ') + ' are also online.\n');
  } else {
    socket.write('you are the only user online\n');
  }

  //adds current user to those online
  onlineUsers.push(socket.name);


  socket.on('data', (chunk) =>{

    broadcast(`${userName}: `, chunk);

    //output to log file
    log.write(`${socket.name}: ${chunk.toString()}\n`);
  });

  //on disconnect, notes disconnect and user name on server, removes departing client from client array
  socket.on('close', () =>{
    var index = clients.indexOf(socket.name);
    //removes departing clients
    clients.splice(index, 1);

    broadcast(socket.name, 'has disconnected.');
  });
});

var broadcast = function(currentUser, message){
  clients.forEach((user) =>{
    if(currentUser !== `${user.name}: `){
      user.write(`${currentUser} ${message.toString()}\n`);
    }
  });
  console.log(`${currentUser} ${message.toString()}\n`);
};

//TODO refactor to manage clients separately from server creation logic

//DONE create broadcast functionality
//DONE remove a user from clients array on disconnect

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
