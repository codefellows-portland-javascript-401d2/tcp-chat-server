var net = require('net');
var fs = require('fs');

const log = fs.createWriteStream('chat-log.txt');

// const chat = fs.createWriteStream();

var clients = [];


const server = net.createServer((socket) => {
  //assigns random number to socket.name
  socket.name = 'jedi-' + Math.floor(Math.random() * 10000);

  //adds socket.name to array of online clients
  clients.push(socket.name);

  //outputs to server
  console.log(`${socket.name} connected`);

  //outputs to client when they join
  socket.write(`May the force be with you, ${socket.name}!\n` );
  socket.write(clients.join(', ') + ' are currently online.\n');


  //on client message
  socket.on('data', (chunk) =>{

    //broadcast to all chat users
    // broadcast(chunk);

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

  function broadcast(message){
    clients.forEach(() => {
      chat.write(message);
    });
  }

  //pipes socket output to console
  socket.pipe(process.stdout);
});


//TODO managing clients should be separate from server creation logic

//TODO create broadcast function
//DONE remove a user from clients array on disconnect

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
