const server = require( '../server');
const assert = require( 'chai' ).assert;
const net = require( 'net' );

const port = 65000;

describe( 'testing all the things', () => {

  before( done => {
    server.listen( port, done );
  });

  var client;

  before( done => {
    client = net.connect( { port }, done );
  });

  it ( 'says hello to new client on connection', done => {
    client.on( 'data', message => {
      assert.equal( message.toString(), 'Welcome to the chat');
      done();
    });
  });

});
