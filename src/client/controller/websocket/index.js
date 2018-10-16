// # IMPORTS

import { QueueingSubject } from 'queueing-subject';
import { Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import appConfig from '../../../../config/app';
import * as Store from '../../store';
import Action from '../../store/actions';
import CommandType from '../../store/command-type';

const DEFAULT__RECONNECT_INTERVAL = 5000;

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
    Store.dispatch(Action[CommandType.connect]());
    const webSocket$ = new WebSocketSubject(_createWebSocketSubjectConfig());
    webSocket$.subscribe(eventData => {
        _inst.messages$.next(eventData);
    });
    Object.assign(_inst, { webSocket$ });
}

function send(eventName, data) {
    _inst.webSocket$.next({
        type: eventName,
        timestamp: Date.now(),
        data
    });
}

function subscribe(eventName, handler) {
    return _inst.messages$.subscribe(eventData => {
        const { type, data, timestamp } = eventData;
        handler(data, { type, timestamp });
    });
}

function unsubscribe(subscription) {
    subscription.unsubscribe();
}

// ## Private

function _init() {
    return {
        messages$: new QueueingSubject(),
        webSocket$: null,
        messages: null,
        connectionStatus: null
    };
}

function _createWebSocketSubjectConfig() {
    const openObserver = _createOpenObserver(),
        closeObserver = _createCloseObserver(),
        closingObserver = _createClosingObserver();
    return {
        url: appConfig.server.websocket.host,
        serializer: (val) => JSON.stringify(val),
        openObserver,
        closeObserver,
        closingObserver
    };
}

function _createOpenObserver() {
    return new Subject().subscribe(() => {
        Store.dispatch(Action[CommandType.sendSession]());
        return Store.dispatch(Action[CommandType.handleConnected]());
    });
}

function _createCloseObserver() {
    return new Subject().subscribe(() => {
        Store.dispatch(Action[CommandType.disconnect]());
        setTimeout(() => {
            console.log('Got disconnected. Trying to reconnect');
            connect();
        }, DEFAULT__RECONNECT_INTERVAL);
    });
}

function _createClosingObserver() {
    return new Subject().subscribe(() => Store.dispatch(Action[CommandType.disconnect]()));
}
