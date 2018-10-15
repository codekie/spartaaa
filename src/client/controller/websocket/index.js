// # IMPORTS

import { Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { EMPTY } from 'rxjs/internal/observable/empty';
import appConfig from '../../../../config/app';
import * as Store from '../../store';
import Action from '../../store/actions';
import CommandType from '../../store/command-type';

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
    const webSocket$ = new WebSocketSubject(_createWebSocketSubjectConfig());
    Object.assign(_inst, { webSocket$ });
}

function send(eventName, data) {
    _inst.webSocket$.next({
        type: eventName,
        timestamp: Date.now(),
        data
    });
    return EMPTY;
}

function subscribe(eventName, handler) {
    Store.dispatch(Action[CommandType.connect]());
    return _inst.webSocket$.subscribe(eventData => {
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
    return new Subject().subscribe(() => Store.dispatch(Action[CommandType.handleConnected]()));
}

function _createCloseObserver() {
    return new Subject().subscribe(() => Store.dispatch(Action[CommandType.disconnect]()));
}

function _createClosingObserver() {
    return new Subject().subscribe(() => Store.dispatch(Action[CommandType.disconnect]()));
}
