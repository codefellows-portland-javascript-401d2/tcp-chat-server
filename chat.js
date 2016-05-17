const net = require('net');
const superheroes = require('superheroes');

let chat = {};

chat.allSockets = [];

chat.broadcastSockets = function (socket, content) {
  chat.allSockets.forEach((currentSocket) => {
    if (currentSocket.superhero !== socket.superhero) {
      currentSocket.write(content);
    }
  });
};

chat.createServer = function (portNumber = 65000) {
  net.createServer((socket) => {
    socket.superhero = superheroes.random();

    chat.allSockets.push(socket);

    chat.broadcastSockets(socket, `\n${socket.superhero} joined our team.\n\nWelcome to Superheroes, ${socket.superhero}!\n`);

    socket.on('data', chunkData => {
      let chunkStr = chunkData.toString().trim();

      chat.broadcastSockets(socket, `${socket.superhero}: ${chunkStr}\n`);

      socket.write(`${socket.superhero}: `);
    });

    socket.on('close', () => {
      chat.broadcastSockets(socket, `${socket.superhero} left our team.`);
    });
  }).on('error', (err) => {
    throw err;
  }).listen(portNumber, () => {
    process.stdout.write(`Superheroes at port ${portNumber} on localhost `
      + `(http://localhost:${portNumber}).`);
  });
};

module.exports = chat;
