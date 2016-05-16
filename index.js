const net = require('net');

function nickName(){
  return 'friend-' + Math.floor(Math.random()*100);
}

var mySockets = Object.create(null);

function broadcastMessage(user, data){
  for (var property in mySockets){
    mySockets[property].write(user + ' says: ' + data);
  }
}

function endSession(user){
  delete mySockets[user];
  for (var property in mySockets){
    mySockets[property].write(user + ' has ended their chat session. \n');
  }
}

const server = net.createServer( socket => {

  var thisUser;
  thisUser = nickName();

  var nameObject = {};
  nameObject.nickname = thisUser;
  nameObject.socket = socket;

  mySockets[thisUser] = socket;
  // mySockets.push(nameObject);
  console.log(Object.keys(mySockets));

  socket.on('data', chunk => {
    broadcastMessage(thisUser, chunk);
  });

  socket.on('end', () => {
    endSession(thisUser);
  });

  // Initial greeting to a new user
  socket.write('Welcome, you are: ' + thisUser + '\n');

});
server.listen(65000, () => {
});

function mainMethod(){
  return nickName();
}

module.exports = mainMethod;
