const net = require('net');
const superheroes = require('superheroes');

function createServer(portNumber = 65000) {
  const server = net.createServer(socket => {
    const name = superheroes.random();

    console.log(`${name} joined our team.`);

    socket.on('data', chunkData => {
      console.log(`${name}: ${chunkData.toString()}`);
    });

    socket.on('close', () => {
      console.log(`${name} left our team.`);
    });

    // socket.pipe(process.stdout);
  });

  server.listen(portNumber, () => {
    let address = server.address();

    console.log(`Superheroes at port ${address.port} on localhost (http://localhost:${address.port}).`);
  });
}

module.exports = {
  createServer
};
