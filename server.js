const net = require('net');
const port = 8000;

var i = 0;

var server = net.createServer((socket) => {
  var name = `user-${++i}`;
  console.log(`${name} connected!`);
  
  socket.write('hey I see you\'re connected, Sweet!');
  
  socket.on('close', () => {
    console.log(`${name} disconnected...`);
  });
});

server.on('error', err => {
  throw err;
});

server.listen(port, () => {
  var address = server.address();
  console.log('opened server on %j', address);
});