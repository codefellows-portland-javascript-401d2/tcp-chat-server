const net = require('net');
const superheroes = require('superheroes');

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

server.listen(() => {
  let address = server.address();

  console.log(`Superheroes at port ${address.port} on localhost (http://localhost:${address.port}).`);
});
