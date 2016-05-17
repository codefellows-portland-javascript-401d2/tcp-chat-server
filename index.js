const chat = require('./chat');
const portNumber = process.argv[2];

chat.createServer(portNumber);
