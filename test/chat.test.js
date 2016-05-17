// const net = require('net');
const chai = require('chai');
const expect = chai.expect;
const chat = require('../chat');

describe ('testing that -', () => {
  it ('chat.sockets is an array', () => {
    expect(chat.sockets).to.be.instanceof(Array);
  });
  it ('chat.sockets is empty', () => {
    expect(chat.sockets.length).to.equal(0);
  });
});
