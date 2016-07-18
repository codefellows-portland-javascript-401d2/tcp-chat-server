const assert = require('chai').assert;
const net = require('net');
const server = require('../server');
// const Clients = require('../clients');

const portNumber  = 65000;

describe('chat session', () => {

  before( done => {
    server.listen(portNumber, done);
  });

  var clientSocket1;
  var clientSocket2;

  describe('(with an active server)', () => {

    it('new user gets greeting message', done => {
      // Create user 1
      clientSocket1 = net.connect( { port: portNumber}, () => {
        clientSocket1.once('data', chunk =>{
          assert.isOk(/^Welcome/.test(chunk.toString()));
          done();
        });
      });
    });

    it('existing users get new user message', done => {
      // Create user 2
      clientSocket2 = net.connect( { port: portNumber}, () => {
      });
      // User 1 will receive a message
      clientSocket1.once('data', chunk =>{
        assert.isOk((/has joined the chat!\n$/.test(chunk.toString())));
        done();
      });
    });

    it('users receieve chat message', done => {
      // User 1 will receive a message
      clientSocket1.once('data', chunk =>{
        assert.isOk((/hello$/.test(chunk.toString())));
        done();
      });
      // User 2 sends test message
      clientSocket2.write('hello');
    });

    it('user gets a new nickname', done => {
       // User 2 changes nick name
      clientSocket2.write('/nick new-name');
       // User 2 will receive a message
      clientSocket2.once('data', chunk =>{
        var chunkText = chunk.toString();
        // TODO: This removes spaces and dashes to compare numbers. Could be more elegant
        var lastTwoChars = chunkText.slice(-4, -2).split(' ').join('').split('-').join('');
        var initialNumber = chunkText.slice(7,9).split(' ').join('');
        assert.notEqual(initialNumber, lastTwoChars);
        done();
      });
    });

    it('existing users get message about new nickname', done => {
      // User 2 changes nick name
      clientSocket2.write('/nick new-name');
      // User 1 will receive a message
      clientSocket1.once('data', chunk =>{
        assert.isOk((/I have changed my nickname/.test(chunk.toString())));
        done();
      });
    });

    it('existing users get user left message', done => {
      // User 1 ends session
      clientSocket1.destroy();
      // User 2 will receive a message
      clientSocket2.once('data', chunk =>{
        assert.isOk((/has ended their chat session.\n$/.test(chunk.toString())));
        done();
      });
    });

  });

  after(done => {
    clientSocket2.destroy();
    done();
  });

  after( done => {
    server.close(done);
  });

});
