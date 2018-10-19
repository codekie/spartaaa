// # IMPORTS

import { Map } from 'immutable';
import { getState, mutateState } from '../manager/state-manager';

// # CONSTANTS

const ID = 'Connection',
    STATE = {
        disconnected: 'disconnected',
        connecting: 'connecting',
        connected: 'connected'
    },
    INITIAL_STATE = Map({
        state: STATE.disconnected
    });

// # PUBLIC API

export {
    ID,
    STATE,
    // Initializer
    init,
    // Getter
    getConnectionState,
    // Mutator
    setDisconnected,
    setConnecting,
    setConnected
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    return mutateState(ID, INITIAL_STATE);
}

function getConnectionState() {
    return getState(ID).get('state');
}

function setDisconnected() {
    return mutateState(ID, { state: STATE.disconnected });
}

function setConnecting() {
    return mutateState(ID, { state: STATE.connecting });
}

function setConnected() {
    return mutateState(ID, { state: STATE.connected });
}
