var chat = {};

const net = require('net');
const random = require('./random');

chat.portNum = 6500;
chat.sockets = [];

chat.server = net.createServer(socket => {

  socket.username = random();
  var username = socket.username;

  chat.sockets.push(socket);

  socket.write(`welcome ${username}\n`);

  chat.broadcast(username, `${username} joined this chat.\n`);

  socket.on('data', data => {
    var message = `${username}: ${data.toString()}`;
    chat.broadcast(username, message);
    process.stdout.write(message);
  });

  socket.on('end', () => {
    var message = `${username} left this chat \n`;
    chat.remove(username);
    process.stdout.write(message);
    chat.broadcast(username, message);
  });

  socket.on('error', error => {
    console.log(`Error: ${error.message}`);
  });
});

chat.remove = function(socket) {
  chat.sockets.splice(chat.sockets.indexOf(socket.username), 1);
};

chat.broadcast = function (from, message) {
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
