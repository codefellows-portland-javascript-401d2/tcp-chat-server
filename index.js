const net = require('net');
const Clients = require('./clients');

function nickName(){
  return 'friend-' + Math.floor(Math.random()*100);
}

const clients = new Clients();

const server = net.createServer( socket => {

  var thisUser = nickName();
  clients.newClient(thisUser, socket);

  socket.on('data', chunk => {
    clients.broadcastMessage(thisUser, chunk);
  });

  socket.on('end', () => {
    clients.endSession(thisUser);
  });
});

server.listen(65000);

function mainMethod(){
  return nickName();
}

module.exports = mainMethod;
