const assert = require('chai').assert;
const Clients = require('../clients');
const net = require('net');

var testUser = 'friend-xxx';
var testSocket = new net.Socket();

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

  it('generates a nickname', done =>{
    assert.isOk(clients.getUniqueNickname());
    done();
  });

});
