const net = require('net');
const dogNames = require('dog-names');

const server = net.createServer(socket => {
  const name = dogNames.allRandom();

  console.log(`${name} has joined the building.`);

  socket.on('close', () => {
    console.log(`${name} has left the building.`);
  });
});

server.listen(() => {
  let address = server.address();

  console.log(`Opened server on http:localhost:${address.port}`);
});
