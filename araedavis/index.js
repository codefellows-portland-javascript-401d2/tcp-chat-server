var server = require('./server.js');

server.listen(8000, () =>{
  console.log('server listening at %j', server.address());
});
