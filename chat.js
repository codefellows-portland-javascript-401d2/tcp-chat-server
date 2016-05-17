var fs = require('fs');

var newHandle = function(){
  return 'jedi-' + Math.floor(Math.random() * 10000);
};

var broadcast = function(clients, currentUser, message){
  const log = fs.createWriteStream('chat-log.txt');

  clients.forEach((user) =>{
    if(currentUser !== `${user.name}: `){
      user.write(`${currentUser} ${message.toString()}\n`);
    }
  });
  console.log(`${currentUser} ${message.toString()}\n`);
  log.write(`${currentUser} ${message.toString()}\n`);
};

// var requestNewHandle = function(currentUser){
//
// };

module.exports = newHandle;
module.exports = broadcast;
