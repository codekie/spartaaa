// # IMPORTS

import { EMPTY } from 'rxjs/internal/observable/empty';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import appConfig from '../../../../config/app';

// # INITIALIZATION

const _inst = _init();

// # PUBLIC API

export {
    connect,
    send,
    subscribe,
    unsubscribe
};

// # IMPLEMENTATION DETAILS

// ## Public

function connect() {
    const { messages, connectionStatus } = websocketConnect(appConfig.server.websocket.host, _inst.input);
    Object.assign(_inst, { messages, connectionStatus });
}

function send(eventName, data) {
    _inst.input.next(JSON.stringify({
        type: eventName,
        timestamp: Date.now(),
        data
    }));
    return EMPTY;
}

function subscribe(eventName, handler) {
    return _inst.messages.subscribe((strEvent) => {
        const eventData = JSON.parse(strEvent),
            { type, data, timestamp } = eventData;
        handler(data, { type, timestamp });
    });
}

function unsubscribe(subscription) {
    subscription.unsubscribe();
}

// ## Private

function _init() {
    return {
        input: new QueueingSubject(),
        messages: null,
        connectionStatus: null
    };
}
