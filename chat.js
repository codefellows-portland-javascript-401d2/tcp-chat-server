var chat = {};

const net = require('net');
const random = require('./random');

chat.portNum = 6500;
chat.sockets = [];
chat.users = [];
chat.id = 1;

chat.server = net.createServer(socket => {

  socket.username = random();
  var username = socket.username;

  chat.sockets.push(socket);
  chat.users.push(username);

  socket.write(`welcome ${username}\n`);

  broadcast(username, `${username} joined this chat.\n`);

  socket.on('data', data => {
    var message = `${username}: ${data.toString()}`;
    broadcast(username, message);
    process.stdout.write(message);
  });

  socket.on('end', () => {
    var message = `${username} left this chat \n`;
    process.stdout.write(message);
    remove(username);
    broadcast(username, message);
  });

  socket.on('error', error => {
    console.log(`Error: ${error.message}`);
  });
});

var remove = function(socket) {
  chat.sockets.splice(chat.sockets.indexOf(socket.username), 1);
};

var broadcast = function (from, message) {
  if (chat.sockets.length === 0) {
    process.stdout.write('everyone left the chat');
    return;
  }

  chat.sockets.forEach(function(socket) {
    if (socket.username === from) return;
    socket.write(message);
  });
};

chat.server.on('error', error => {
  console.log(`Error: ${error.message}`);
});

chat.server.listen(chat.portNum, () => {
  var address = chat.server.address();
  console.log('opened server on %j', address);
});

module.exports = chat;
