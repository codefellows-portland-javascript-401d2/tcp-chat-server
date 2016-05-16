const net = require('net');

// Function returns a random nick name
// When receives data, broadcasts it to all clients (sockets)

function nickName(){
  return 'friend' + Math.floor(Math.random()*100);
}

var mySockets = [];

function broadcast(user, data){
  for (var i=0; i<mySockets.length; i++) {
    mySockets[i].socket.write(user + ' says: ' + data);
  }
}


const server = net.createServer( socket => {

  var thisUser;
  thisUser = nickName();

  var nameObject = {};
  nameObject.nickname = thisUser;
  nameObject.socket = socket;

  mySockets.push(nameObject);
  console.log(mySockets);

  socket.on('data', chunk => {
    console.log(`received chunk ${chunk}`);

    broadcast(thisUser, chunk);
  });

  // Initial greeting to a new user
  socket.write('Welcome, you are: ' + thisUser + '\n');

});
server.listen(65000, () => {
  console.log('tcp listening');
});

function mainMethod(){
  return nickName();
}

module.exports = mainMethod;
