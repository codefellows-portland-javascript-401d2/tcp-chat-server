const server = require('./server');
const port = 8000;

server.listen(port, () => {
  console.log('opened server on %j', server.address());
});