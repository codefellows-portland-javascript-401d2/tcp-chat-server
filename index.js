const net = require('net');
const Clients = require('./clients');

const clients = new Clients();

const server = net.createServer( socket => {

  var thisUser = clients.getUniqueNickname();

  console.log('random user name' + thisUser);
  clients.newClient(thisUser, socket);

  socket.on('data', chunk => {
    clients.broadcastMessage(thisUser, chunk);
  });

  socket.on('end', () => {
    clients.endSession(thisUser);
  });
});

server.listen(65000);

// function mainMethod(){
//   return nickName();
// }

// module.exports = mainMethod;
