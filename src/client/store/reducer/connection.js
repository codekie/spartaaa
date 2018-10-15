// # IMPORTS

import CommandType from '../command-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { setConnected, setConnecting, setDisconnected } from '../state/accessor/connection';

//  # CONSTANTS

const Reducer = {
    [CommandType.connect]: _connect,
    [CommandType.handleConnected]: _handleConnected,
    [CommandType.disconnect]: _disconnect
};

// # PUBLIC API

export default function reduceTasks(state = getRootState(), command) {
    const reducer = Reducer[command.type];
    if (!reducer) { return state; }
    return reducer(command);
}
export {
    Reducer
};

// # IMPLEMENTATION DETAILS

// ## Reducer

function _connect(command) {
    return applyMutation(command, [
        setConnecting
    ]);
}

function _handleConnected(command) {
    return applyMutation(command, [
        setConnected
    ]);
}

function _disconnect(command) {
    return applyMutation(command, [
        setDisconnected
    ]);
}
