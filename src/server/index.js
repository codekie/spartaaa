const WebServer = require('./server');
const { WebSocketServer } = require('./websocket');

WebServer.start();
WebSocketServer.init();
