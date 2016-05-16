var net = require('net');
var fs = require('fs');

const log = fs.createWriteStream('chat-log.txt');

var clients = [];


const server = net.createServer((socket) => {
  socket.name = 'jedi-' + Math.floor(Math.random() * 10000);

  //TODO socket names are not being pushed properly to client array - why??
  clients.push[socket.name];

  console.log(`${socket.name} connected`);

  socket.write(`May the force be with you, ${socket.name}!\n` );
  socket.write(clients.join('') + ' are currently online.\n');

  socket.on('data', (chunk) =>{
    log.write(`${socket.name}: ${chunk.toString()}\n`);
  });

  socket.on('close', () =>{
    console.log(`${socket.name} disconnected`);
    var index = clients.indexOf(socket.name);
    //removes departing clients
    clients.splice(index, 1);
  });

  socket.pipe(process.stdout);
});

//TODO managing clients should be separate from server creation logic
//TODO how to clear chat-log - currently clears when new users connect

//TODO create broadcast function
//TODO remove a user from clients array on disconnect

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
