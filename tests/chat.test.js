const net = require('net');
const chai = require('chai');
const expect = chai.expect;
const chat = require('../chat');

describe('Chat module', function () {
  it('chat.allSockets array is empty', function () {
    expect(chat.allSockets).to.be.empty;
  });
});
