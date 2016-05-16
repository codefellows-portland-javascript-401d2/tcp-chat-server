const net = require( 'net' );

//an array to push the clients into
var clients = [];

const server = net.createServer( socket => {

  //identifying each client
  socket.name = socket.remoteAddress + ':' + socket.remotePort;

  //pushing client into the array
  clients.push(socket);

  //function tellAll that broadcasts messages everybody
  function tellAll(message, sender) {
    clients.forEach(function(client) {
      client.write(message);
    });
  }

  //Welcome new client and announce arrival to everybody
  socket.write('Welcome' + socket.name + '\n');
  tellAll(socket.name + ' has joined the chat. Say hello!\n', socket);

  //broadcast client message to everybody
  socket.on('data', function (data) {
    tellAll(socket.name + ': ' + data, socket);
  });

  //remove client from the array when they leave the chat
  socket.on('end', function (data) {
    clients.splice(clients.indexOf(socket), 1);
    tellAll(socket.name + ' has left the chat. Awwwwww :( \n');
  });
});

server.listen( 65000, () => {
  console.log('Server has been opened on Port 65000');
});
