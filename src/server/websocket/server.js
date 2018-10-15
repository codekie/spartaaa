// # IMPORTS

import colors from 'colors';
import ws from 'ws';
import appConfig from '../../../config/app';
import * as Services from './service';
import { logger } from '../util';
const WebSocketServer = ws.Server;

// # CONSTANTS

const EVT__CONNECTION = 'connection',
    EVT__MESSAGE = 'message',
    EVT__PONG = 'pong',
    INTERVAL__CHECK_ALIVE = 30000, // 30 sec
    SYM__ALIVE = Symbol('isAlive');

// ## Private static

const _inst = {
    server: null,
    handlers: {}
};

// # PUBLIC API

export {
    init,
    getPort,
    register,
    broadcast,
    send
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    const server = _initServer(_inst);
    _bindHandlers(_inst, server);
    _initCheckAlive(server);
    _registerServices();
}

function register(eventName, handler) {
    _register(_inst, eventName, handler);
}

function send(ws, eventName, data, sourceEvent) {
    let response = _createEvent(eventName, data, { sourceEvent });
    logger.isDebug() && logger.debug(`Sending: ${ JSON.stringify(response) }`);
    ws.send(
        JSON.stringify(response),
        (err) => _handleError(err)
    );
}

function getPort() {
    return process.env.PORT_MOCK_WEBSOCKET || appConfig.server.websocket.port;
}

function broadcast(eventName, data) {
    _inst.server.clients.forEach(function each(client) {
        if (client.readyState !== ws.OPEN) { return; }
        client.send(
            JSON.stringify(_createEvent(eventName, data)),
            (err) => _handleError(err)
        );
    });
}

// ## Private

function _initServer(inst) {
    const port = getPort();
    inst.server = new WebSocketServer(
        { port },
        () => logger.info(colors.green.underline(`WebSocketServer is listening to port ${ port }`))
    );
    return inst.server;
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
        webSocket.on(EVT__PONG, () => {
            webSocket[SYM__ALIVE] = true;
            logger.debug('Received a pong');
        });
    });
}

function _initConnection(webSocket) {
    webSocket[SYM__ALIVE] = true;
}

function _initCheckAlive(server) {
    // Check for broken connections and terminate them
    setInterval(() => {
        server.clients.forEach(client => {
            if (!client[SYM__ALIVE]) {
                client.terminate();
                logger.verbose('Connection terminated, due to ping-timeout.');
                return;
            }
            client[SYM__ALIVE] = false;
            client.ping(null, false, true);
            logger.debug('Sent a ping');
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

function _createEvent(eventName, data, { sourceEvent } = {}) {
    const event = {
        type: eventName,
        timestamp: Date.now(),
        data
    };
    // If this event is sent to the client as a response to a client-request, then the transactionId will be passed back
    if (sourceEvent) { event.transactionId = sourceEvent.transactionId; }
    return event;
}
