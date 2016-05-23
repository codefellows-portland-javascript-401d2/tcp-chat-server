const chat = require('./chat');
const chatServer = chat.newServer();

chatServer.listen(65000, () => {
  console.log('Opened chat server for Superheroes on %j', chatServer.address());
});
