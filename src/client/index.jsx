import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from './controller/websocket';
import App from './component/app';
import { Provider } from 'react-redux';
import * as Store from './store';
import ActionType from './store/action-type';
import ActionCreator from './store/action-creators';

_init();

function _init() {
    const store = Store.init();
    connect();
    _render({ document }, store);
    Store.dispatch(ActionCreator[ActionType.fetchTasks]());
}

function _render({ document }, store) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('App'));
}
