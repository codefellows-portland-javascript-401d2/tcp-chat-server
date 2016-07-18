const net = require('net');
const assert = require('chai').assert;
const server = require('../server');
const guestList = require('../guestList');

describe('Communicating with TCP Server', () => {
  
  var clientA, clientB, clientC;
  const port = 4444;
  
  before(done => {
    server.listen(port, done);
  });
  
  it('says Welcome when socket connects', (done) => {
    clientA = net.connect({port: port}, () => {
      clientA.once('data', message => {
        var actual = message.toString().split(' ');
        assert.equal(actual[0], '\r\nWelcome');
        done();
      });
    });
  });
  
  it('registers two guests when two sockets are both connected', done => {
    clientB = net.connect({port: port}, () => {
      clientB.once('data', data => {
        assert.equal(guestList.guests.length, 2); 
        done();  
      });  
    });
  });

  it('verifies client-B receives message from client-A', done => {
    guestList.writeAll(clientA, 'hey');
    clientB.once('data', data => {
      var message = data.toString();
      assert.equal(message, '\r\nhey'); 
      done();
    });
  });
  
  it('verifies client-A sees message that client-C has entered', done => {
    var messageC;
    clientC = net.connect({port: port}, () => {
      (function test(callback) {
        clientC.once('data', data => {
          messageC = data.toString();
          callback(messageC); // messageC becomes result in the callback function below in IIFE
          done();
        });
      })(function(result) {
        clientA.once('data', data => {
          assert.equal(data.toString(), result);
        }); 
      });
    });
  });
  
  after(done => {
    clientA.end();
    clientB.end();
    clientC.end();
    server.close(done);
  });
  
});
