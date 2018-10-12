// # IMPORTS

import colors from 'colors';
import ws from 'ws';
import appConfig from '../../../config/app';
import * as Services from './service';
import { logger } from '../../util';
const WebSocketServer = ws.Server;

// # CONSTANTS

const EVT__CONNECTION = 'connection',
    EVT__MESSAGE = 'message',
    EVT__PONG = 'pong',
    INTERVAL__CHECK_ALIVE = 300000, // 5 mins
    SYM__ALIVE = Symbol('isAlive');

// ## Private static

const _inst = {
    handlers: {}
};

// # PUBLIC API

export {
    init,
    getPort,
    register,
    send
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    const server = _initServer();
    _bindHandlers(_inst, server);
    _initCheckAlive(server);
    _registerServices();
}

function register(eventName, handler) {
    _register(_inst, eventName, handler);
}

function send(ws, eventName, data, sourceEvent) {
    let response = {
        type: eventName,
        timestamp: Date.now(),
        data
    };
    // If this event is sent to the client as a response to a client-request, then the transactionId will be passed back
    if (sourceEvent) { response.transactionId = sourceEvent.transactionId; }
    logger.verbose(`Sending: ${ JSON.stringify(response) }`);
    ws.send(
        JSON.stringify(response),
        (err) => _handleError(err)
    );
}

function getPort() {
    return process.env.PORT_MOCK_WEBSOCKET || appConfig.server.websocket.port;
}

// ## Private

function _initServer() {
    const port = getPort();
    return new WebSocketServer(
        { port },
        () => logger.info(colors.green.underline(`WebSocketServer is listening to port ${ port }`))
    );
}

function _bindHandlers(inst, server) {
    server.on(EVT__CONNECTION, webSocket => {
        logger.verbose('New connection');
        _initConnection(webSocket);
        webSocket.on(EVT__MESSAGE, message => {
            logger.verbose(`Received: ${ message }`);
            try {
                const event = JSON.parse(message),
                    eventName = event.type,
                    data = event.data,
                    handlers = inst.handlers[eventName];
                handlers && handlers.forEach(handler => handler(data, webSocket, event));
            } catch (e) {
                logger.error(`An error has occured while processing the message: ${ message }. Error: ${ e }`);
            }
        });
        webSocket.on(EVT__PONG, () => webSocket[SYM__ALIVE] = true);
    });
}

function _initConnection(webSocket) {
    webSocket[SYM__ALIVE] = true;
}

function _initCheckAlive(server) {
    // Check for broken connections and terminate them
    setInterval(() => {
        server.clients.forEach(webSocket => {
            if (!webSocket[SYM__ALIVE]) {
                webSocket.terminate();
                logger.verbose('Connection terminated, due to ping-timeout.');
                return;
            }
            webSocket[SYM__ALIVE] = false;
            webSocket.ping(null, false, true);
        });
    }, INTERVAL__CHECK_ALIVE);
}

function _register(inst, eventName, handler) {
    const handlers = inst.handlers[eventName] = inst.handlers[eventName] || [];
    handlers.push(handler);
}

function _handleError(err, { requestId } = {}) {
    if (!err) { return; }
    logger.error(colors.bgRed.white(err), { requestId });
}

function _registerServices() {
    Object.keys(Services).forEach(serviceName => Services[serviceName].init());
}
