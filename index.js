var net = require('net');

const server = net.createServer((socket) => {

  socket.write('oh hai');

  socket.on('close', () =>{
    console.log('later bro');
  });

});

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
