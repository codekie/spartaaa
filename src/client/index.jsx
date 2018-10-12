import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from './controller/websocket';
import App from './app.jsx';
import { Provider } from 'react-redux';
import * as Store from './store';

_init();

function _init() {
    connect();
    _render({ document }, Store.init());
}

function _render({ document }, store) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('App'));
}
