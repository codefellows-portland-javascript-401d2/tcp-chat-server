const net = require( 'net' );


const server = net.createServer( socket => {

});

server.listen( 65000, () => {
  console.log('Server has been opened on Port 65000');
});
