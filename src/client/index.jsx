import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from './controller/websocket';
import ConnectedApp from './container/app';
import { Provider } from 'react-redux';
import * as Store from './store';

_init();

function _init() {
    const store = Store.init();
    connect();
    _render({ document }, store);
}

function _render({ document }, store) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
        , document.getElementById('App'));
}
