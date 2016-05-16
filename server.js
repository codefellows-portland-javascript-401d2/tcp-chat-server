const net = require( 'net' );

//an array to push the clients into
var clients = [];

const server = net.createServer( socket => {

  //identifying each client
  socket.name = randomName();

  //pushing client into the array
  clients.push(socket);

  //function tellAll that broadcasts messages to everybody
  function tellAll(message, sender) {
    clients.forEach(function(client) {
      client.write(message);
    });
  }

  //Welcome new client and announce arrival to everybody
  socket.write('Welcome to the chat, ' + socket.name + '\n');
  tellAll(socket.name + ' has joined the chat. Say hello!\n', socket);

  //broadcast client message to everybody
  socket.on('data', function (data) {
    tellAll(socket.name + ': ' + data, socket);
  });

  //remove client from the array when they leave the chat
  socket.on('end', function (data) {
    clients.splice(clients.indexOf(socket), 1);
    tellAll(socket.name + ' has left the chat. Awwwwww :( \n');
  });

  //creating random user name

  function randomName() {

    var animals = ['pigeon', 'seagull', 'bat', 'owl', 'sparrow', 'hawk', 'fish', 'frog', 'whale', 'shark', 'octopus', 'rabbit', 'chipmunk', 'dog', 'cat', 'lynx', 'mouse', 'lion', 'moose', 'horse', 'deer', 'raccoon', 'zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope', 'buffalo', 'camel', 'donkey', 'elk', 'fox', 'monkey', 'gazelle', 'jaguar', 'leopard', 'lemur', 'yak', 'elephant', 'giraffe', 'hippopotamus', 'rhinoceros', 'grizzlybear'];
    var colors = ['silver', 'gray', 'black', 'red', 'maroon', 'olive', 'lime', 'green', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)] + '_' + animals[Math.floor(Math.random() * animals.length)];
  };

});

server.listen( 65000, () => {
  console.log('Server has been opened on Port 65000');
});
