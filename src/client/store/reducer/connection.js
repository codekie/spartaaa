// # IMPORTS

import ActionType from '../action-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { setConnected, setConnecting, setDisconnected } from '../state/accessor/connection';

//  # CONSTANTS

const Reducer = {
    [ActionType.connect]: _connect,
    [ActionType.handleConnected]: _handleConnected,
    [ActionType.disconnect]: _disconnect
};

// # PUBLIC API

export default function reduce(state = getRootState(), action) {
    const reducer = Reducer[action.type];
    if (!reducer) { return state; }
    return reducer(action);
}
export {
    Reducer
};

// # IMPLEMENTATION DETAILS

// ## Reducer

function _connect(action) {
    return applyMutation(action, [
        setConnecting
    ]);
}

function _handleConnected(action) {
    return applyMutation(action, [
        setConnected
    ]);
}

function _disconnect(action) {
    return applyMutation(action, [
        setDisconnected
    ]);
}
