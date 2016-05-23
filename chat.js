const net = require('net');
const superheroes = require('superheroes');

let chat = {};

chat.allSockets = [];

chat.broadcastSockets = (socket, content) => {
  chat.allSockets.forEach((currentSocket) => {
    currentSocket.write(content);
  });
};

chat.newServer = () => {
  return net.createServer((socket) => {
    socket.superhero = superheroes.random();

    chat.allSockets.push(socket);

    chat.broadcastSockets(socket, `\n${socket.superhero} joined our team.\n\nWelcome to Superheroes, ${socket.superhero}!\n`);

    socket.on('data', chunkData => {
      let chunkStr = chunkData.toString().trim();

      chat.broadcastSockets(socket, `${socket.superhero}: ${chunkStr}\n`);
    });

    socket.on('close', () => {
      chat.broadcastSockets(socket, `${socket.superhero} left our team.`);
    });
  }).on('error', (err) => {
    throw err;
  });
};

module.exports = chat;
