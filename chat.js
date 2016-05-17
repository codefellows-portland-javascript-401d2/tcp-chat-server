var fs = require('fs');

exports.newHandle = function(){
  return 'jedi-' + Math.floor(Math.random() * 10000);
};

exports.broadcast = function(allClients, client, message){
  const log = fs.createWriteStream('chat-log.txt');

  allClients.forEach((user) =>{
    if(client !== `${user.name}: `){
      user.write(`${client} ${message.toString()}\n`);
    }
  });
  console.log(`${client} ${message.toString()}\n`);
  log.write(`${client} ${message.toString()}\n`);
};

exports.newClientWelcome = function(otherClients, client){
  client.write(`May the force be with you, ${client.name}!\n` );

  if(otherClients.length > 0){
    client.write(otherClients.join(', ') + ' are also online.\n');
  } else {
    client.write('you are the only user online\n');
  }
};

exports.onClientDisconnect = function(allClients, client){
  client.on('close', () =>{
    var index = allClients.indexOf(client.name);
    //removes departing clients
    allClients.splice(index, 1);
  });
};
