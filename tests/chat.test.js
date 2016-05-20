const net = require('net');
const chai = require('chai');
const expect = chai.expect;
const chat = require('../chat');

const chatServer = chat.newServer();
const port = 65000;

describe('superheroes tcp chat server', () => {
  before((done) => {
    chatServer.listen(port, done);
  });

  it('chat.allSockets array is empty on server start', () => {
    expect(chat.allSockets).to.be.empty;
  });

  let outputMessage;
  let client1;

  describe('client 1', () => {
    before((done) => {
      client1 = net.connect({port}, done);
    });

    it('chat.allSockets array has one socket', (done) => {
      expect(chat.allSockets).to.have.lengthOf(1);
      expect(chat.allSockets).to.not.have.length.below(1);
      expect(chat.allSockets).to.not.have.length.above(1);
      done();
    });

    it('greets client 1 when client 1 connects', (done) => {
      client1.once('data', (inputMessage) => {
        inputMessage = inputMessage.toString();
        outputMessage = `\n${chat.allSockets[0].superhero} joined our team.\n\n` +
          `Welcome to Superheroes, ${chat.allSockets[0].superhero}!\n`;
        expect(inputMessage).to.equal(outputMessage);
        done();
      });
    });

    it('echos client 1\'s input', (done) => {
      client1.once('data', (inputMessage) => {
        inputMessage = inputMessage.toString();
        outputMessage = `${chat.allSockets[0].superhero}: Hello\n`;
        expect(inputMessage).to.equal(outputMessage);
        done();
      });

      client1.write('Hello');
    });
  });

  describe('client 2', () => {
    before((done) => {
      client2 = net.connect({port}, done);
    });

    it('chat.allSockets array has two sockets', (done) => {
      expect(chat.allSockets).to.have.lengthOf(2);
      expect(chat.allSockets).to.not.have.length.below(2);
      expect(chat.allSockets).to.not.have.length.above(2);
      done();
    });

    it('greets client 2 and show\'s in client 1 screen when client 2 connects', (done) => {
      outputMessage = `\n${chat.allSockets[1].superhero} joined our team.\n\n` +
        `Welcome to Superheroes, ${chat.allSockets[1].superhero}!\n`;

      client1.on('data', (inputMessage) => {
        inputMessage = inputMessage.toString();
        expect(inputMessage).to.equal(outputMessage);
      });

      client2.once('data', (inputMessage) => {
        inputMessage += inputMessage.toString();
        expect(inputMessage).to.equal(outputMessage);
      });

      done();
    });

    it('echos client 2\'s input to client 1\'s and 2\'s screens', (done) => {
      outputMessage = `${chat.allSockets[1].superhero}: What\'s up?\n`;

      client1.once('data', (inputMessage) => {
        inputMessage = inputMessage.toString();
        expect(inputMessage).to.equal(outputMessage);
      });

      client2.once('data', (inputMessage) => {
        inputMessage = inputMessage.toString();
        expect(inputMessage).to.equal(outputMessage);
      });

      client2.write('What\'s up?');

      done();
    });

    after((done) => {
      client1.end();
      client2.end(done);
    });
  });

  after((done) => {
    chatServer.close(done);
  });
});
