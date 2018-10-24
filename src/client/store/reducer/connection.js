// # IMPORTS

import { Map } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const STATE = {
        disconnected: 'disconnected',
        connecting: 'connecting',
        connected: 'connected'
    },
    INITIAL_STATE = Map({
        state: STATE.disconnected
    }),
    Reducer = {
        [ActionType.connect]: _connect,
        [ActionType.handleConnected]: _handleConnected,
        [ActionType.disconnect]: _disconnect
    };

// # PUBLIC API

export default function reduce(state = INITIAL_STATE, action) {
    const reducer = Reducer[action.type];
    if (!reducer) { return state; }
    return reducer(state, action);
}
export {
    STATE,

    Reducer
};

// # IMPLEMENTATION DETAILS

// ## Reducer

function _connect(state/*, action*/) {
    return state.merge({ state: STATE.connecting });
}

function _handleConnected(state/*, action*/) {
    return state.merge({ state: STATE.connected });
}

function _disconnect(state/*, action*/) {
    return state.merge({ state: STATE.disconnected });
}
