const net = require('net');
const superheroes = require('superheroes');

let chat = {};
let allSockets = [];
let allNames = [];

function broadcastSockets(socket, content) {
  allSockets.forEach((currentSocket) => {
    if (currentSocket.superhero !== socket.superhero) {
      currentSocket.write(content);
    }
  });
}

function createServer(portNumber = 65000) {
  const server = net.createServer((socket) => {
    socket.superhero = superheroes.random();

    allSockets.push(socket);

    broadcastSockets(socket, `\n${socket.superhero} joined our team.\n\nWelcome to Superheroes, ${socket.superhero}!\n\n${socket.superhero}:\n`);

    socket.on('data', chunkData => {
      let chunkStr = chunkData.toString().trim();

      broadcastSockets(socket, `${socket.superhero}: ${chunkStr}\n`);

      socket.write(`${socket.superhero}: `);
    });

    socket.on('close', () => {
      broadcastSockets(socket, `${socket.superhero} left our team.`);
    });
  });

  server.on('error', (err) => {
    throw err;
  });

  server.listen(portNumber, () => {
    let address = server.address();

    process.stdout.write(`Superheroes at port ${address.port} on localhost (http://localhost:${address.port}).`);
  });
}

module.exports = {
  createServer
};
