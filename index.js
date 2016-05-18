const chat = require('./chat');
const newServer = chat.newServer();

newServer.listen(65000, () => {
  console.log('Opened chat server for Superheroes on %j', newServer.address());
});
