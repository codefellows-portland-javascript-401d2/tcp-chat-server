const net = require('net');
const nameGen = require('./nameGen');
const port = 8000;
const guests = [];

var server = net.createServer((socket) => {
  
  var name = nameGen();  // randomly generates name
  var body = '';
  
  guests.push(socket); // Adds this client to global array GUESTS
  
  // Guest handlers
  writeAll(null, `Welcome to the chat room ${name}\r\n`);
  console.log(`${name} connected at ${socket.remoteAddress}`);
  console.log('guests:', guests.length);
  
  socket.on('close', () => {
    console.log(`${name} disconnected...`);
    guests.splice(guests.indexOf(socket), 1); // removes this client from guests[]
    console.log('guests:', guests.length);
    writeAll(null, `${name} has left the chat room`);
  });
  
  socket.on('data', (chunk) => {
    body += chunk;
    if (chunk.toString('hex') == '0d0a') { // If return comes through...
      writeAll(socket, `${name}: ${body}`); // write to everyone     
      body = ''; 
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
      guest.write(`\r\n(You)${message}`); // prints (You) with message for sender
    } else {
      guest.write(`\r\n${message}`);
    }
  });
}
