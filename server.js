const net = require('net');
const Clients = require('./clients');

const clients = new Clients();

const server = net.createServer( socket => {

  var thisUser = clients.getUniqueNickname();

  clients.newClient(thisUser, socket);

  socket.on('data', chunk => {

    if (/^\/nick new-name/.test(chunk.toString())){
      thisUser = clients.changeNickname(thisUser);
    }else{
      clients.broadcastMessage(thisUser, chunk);
    }
  });

  socket.on('end', () => {
    clients.endSession(thisUser);
  });
});

module.exports = server;
