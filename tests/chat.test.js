const net = require('net');
const chai = require('chai');
const expect = chai.expect;
const chat = require('../chat');

describe('Chat module', () => {
  it('chat.allSockets array is empty', () => {
    expect(chat.allSockets).to.be.empty;
  });
});
