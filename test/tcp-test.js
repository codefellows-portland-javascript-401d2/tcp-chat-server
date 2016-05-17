const net = require('net');
const assert = require('chai').assert;
const server = require('../server.js');

const port = 8000;

describe('tcp chat server', () =>{
  before( done => {
    server.listen( port, done);
  });

  describe('client chatting', () =>{
    var client;
    before( done => {
      client = net.connect( {port}, done);
    });

    it('says clientName has joined', done =>{
      client.once('data', message => {
        console.log(message);
        assert.equal(message, `${client.name} has joined.`);
      });
      done();
    });

    it('', done =>{
      done();
    });

  });

});
