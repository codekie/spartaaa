// # IMPORTS

import CommandType from '../command-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { updateSession, clearTaskFilter, filterTasksBy } from '../state/accessor/session';

//  # CONSTANTS

const Reducer = {
    [CommandType.updateSession]: _updateSession,
    [CommandType.clearTaskFilter]: _clearTaskFilter,
    [CommandType.filterTasksBy]: _filterTasksBy
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

function _updateSession(command) {
    return applyMutation(command, [
        updateSession
    ]);
}

function _clearTaskFilter(command) {
    return applyMutation(command, [
        clearTaskFilter
    ]);
}

function _filterTasksBy(command) {
    return applyMutation(command, [
        filterTasksBy
    ]);
}
