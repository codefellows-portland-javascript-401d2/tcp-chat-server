const server = require( '../server');
const assert = require( 'chai' ).assert;
const net = require( 'net' );

const port = 65000;

describe( 'testing all the things', () => {

  before( done => {
    server.listen( port, done );
  });

  var client1;
  var client2;

  before( done => {
    client1 = net.connect( { port }, done );
  });

  it ( 'says hello to new client on connection', done => {
    client1.once( 'data', message => {
      assert.equal( message.toString(), 'Welcome to the chat');
      done();
    });
  });

  it( 'echos client', done => {
    client1.once( 'data', message => {
      assert.equal( message.toString(), 'Hi there!' );
      done();
    });

    client1.write( 'Hi there!' );
  });

  before(done => {
    client2 = net.connect({port},done);
  });

  var testMessage = 'Hello from one client to another';
  it( 'message from one client shows up for another', done => {
    client1.once('data', message => {
      var incomingMessage = message;
      assert.equal(testMessage, incomingMessage);
      done();
    });
    client2.write(testMessage);
  });

});
