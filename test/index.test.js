const assert = require('chai').assert;
const index = require('../index');
const Clients = require('../clients');
const net = require('net');


var testUser = 'friend-xxx';
var testSocket = new net.Socket();
testSocket.fd = 'testDescriptor';
testSocket.writable = true;
testSocket.readable = true;


describe('Index', () => {

  it('returns something', done => {
    assert.isOk(index(), 'index returns something');
    done();
  });

});

describe('Clients module', () =>{

  const clients = new Clients();

  it('contructor returns an object', () =>{
    assert.isOk(clients);
  });

  it('adds a new socket to the list of sockets', () => {
    clients.newClient(testUser, testSocket);
    assert.isOk(clients.sockets[testUser]);
  });

  it('removes a client from the client list', () =>{
    clients.endSession(testUser);
    assert.isNotOk(clients.sockets.testUser);
  });

});
