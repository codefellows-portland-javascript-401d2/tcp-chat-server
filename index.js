var net = require('net');
var fs = require('fs');

const log = fs.createWriteStream('chat-log.txt');

var clients = [];
var userNames = []; //used to display other users online


const server = net.createServer((socket) => {
  //assigns random number to socket.name
  socket.name = 'jedi-' + Math.floor(Math.random() * 10000);

  var userName = socket.name;
  //adds socket.name to array of online clients
  clients.push(socket);


  //outputs to server
  console.log(`${socket.name} connected`);

  //write to client upon connecting
  socket.write(`May the force be with you, ${socket.name}!\n` );

  if(userNames.length > 0){
    socket.write(userNames.join(', ') + ' are also online.\n');
  } else {
    socket.write('you are the only user online');
  }

  userNames.push(socket.name);

  //on client message
  socket.on('data', (chunk) =>{
    clients.forEach((user) =>{
      if(userName === user.name){
        user.write(`me: ${chunk.toString()}\n`);
      } else {
        user.write(`${userName}: ${chunk.toString()}\n`);
      }
    });

    //output to log file
    log.write(`${socket.name}: ${chunk.toString()}\n`);
  });

  //on disconnect, notes disconnect and user name on server, removes departing client from client array
  socket.on('close', () =>{
    console.log(`${socket.name} disconnected`);
    var index = clients.indexOf(socket.name);
    //removes departing clients
    clients.splice(index, 1);
  });


  //pipes socket output to console
  socket.pipe(process.stdout);
});


//TODO managing clients should be separate from server creation logic

//DONE create broadcast functionality
//DONE remove a user from clients array on disconnect

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
