function Clients(){
  this.sockets = Object.create(null);
}

Clients.prototype.broadcastMessage = function (user, data){
  for (var property in this.sockets){
    this.sockets[property].write(user + ' says: ' + data);
  }
};

Clients.prototype.endSession = function (user){
  delete this.sockets[user];
  for (var property in this.sockets){
    this.sockets[property].write(user + ' has ended their chat session. \n');
  }
};

Clients.prototype.newClient = function (user, socket){
  // Anouncement to everyone else that new client is on
  for (var property in this.sockets){
    if (socket.writable){
      this.sockets[property].write(user + ' has joined the chat! \n');
    }
  }
  // Greeting to the new user
  if (socket.writable){
    socket.write('Welcome, you are: ' + user + '\n');
  }
  // Add to client list
  this.sockets[user] = socket;
};

Clients.prototype.getUniqueNickname = function(){
  // Ensures that no one is given a duplicate name
  var tempName = 'friend-' + Math.floor(Math.random()*100);
  while (this.sockets[tempName]){
    tempName = 'friend-' + Math.floor(Math.random()*100);
  }
  return tempName;
};

module.exports = Clients;
