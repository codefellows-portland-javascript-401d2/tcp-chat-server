# ![CF](http://i.imgur.com/7v5ASc8.png) TCP Chat Server

A chat server that manages connecting clients and enables broadcasting of messages.

## Getting Started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `git clone https://github.com/jluangphasy/tcp-chat-server.git`
3. Run `git checkout jluangphasy`
4. Run `npm install`

Default port number is `65000`. If you want to use a different port, replace `[port]` with whatever port you want.

To run server: `node index.js` or `node index.js [port]`.

In a new terminal window, run `telnet localhost [port]` to connect a new client/user to the chat server.

To run test: `npm run test`.
