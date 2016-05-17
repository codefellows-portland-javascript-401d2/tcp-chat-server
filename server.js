const net = require('net');
const nameGen = require('./nameGen');
const guestList = require('./guestList');

var server = net.createServer((socket) => {
  
  var name = nameGen();  
  var body = '';
  
  guestList.guests.push(socket);
  
  // Guest handlers
  guestList.writeAll(null, `Welcome to the chat room ${name}\r\n`);
  console.log(`${name} connected at ${socket.remoteAddress}`);
  console.log('guests:', guestList.guests.length);
  
  socket.on('close', () => {
    console.log(`${name} disconnected...`);
    guestList.guests.splice(guestList.guests.indexOf(socket), 1); // removes this client from guests[]
    console.log('guests:', guestList.guests.length);
    guestList.writeAll(null, `${name} has left the chat room`);
  });
  
  socket.on('data', (chunk) => {
    body += chunk;
    if (chunk.toString('hex') == '0d0a') { // If return comes through...
      guestList.writeAll(socket, `${name}: ${body}`); // write to everyone     
      body = ''; 
    }
  });
});

server.on('error', err => {
  throw err;
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = server;

