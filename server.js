const net = require('net');
const nameGen = require('./nameGen');
const port = 8000;
const guests = [];

var server = net.createServer((socket) => {
  
  var name = nameGen();  // randomly generates name (NOT UNIQUE yet)
  var body = '';
  
  guests.push(socket); // Adds this client to global array GUESTS
  
  // Server logs
  console.log(`${name} connected at ${socket.remoteAddress}:${socket.port}`);
  console.log('guests:', guests);
  socket.on('close', () => {
    console.log(`${name} disconnected...`);
  });
  
  socket.write(`${name}:`);

  socket.on('data', chunk => {
    body += chunk; // accumulate buffer input to body- auto converts to string
    if (chunk.toString('hex') == '0d0a') { // If return comes through...
      writeAll(socket, `\r\n${name}: ${body}\r\n`); // write to everyone ELSE- return, body, return
      socket.write(`\r\n${name}:`); // write to this sender- return, name: 
      body = ''; // clear body variable
    }
    
  });
  
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
server.on('error', err => {
  throw err;
});
server.listen(port, () => {
  var address = server.address();
  console.log('opened server on %j', address);
});


function writeAll(sender, message) {
  guests.forEach(guest => {
    if (guest === sender) {
      return;
    } else {
      guest.write(message);
    }
  });
}
