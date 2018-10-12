// # IMPORTS

import CommandType from '../command-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { startLoading, stopLoading } from '../state/accessor/loader';
import { setTasks } from '../state/accessor/tasks';

//  # CONSTANTS

const Reducer = {
    [CommandType.fetchTasks]: _fetchTasks,
    [CommandType.fetchTasksSuccess]: _fetchTasksSuccess,
    [CommandType.fetchTasksFailed]: _fetchTasksFailed
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

function _fetchTasks(command) {
    return applyMutation(command, [
        startLoading
    ]);
}

function _fetchTasksSuccess(command) {
    return applyMutation(command, [
        stopLoading,
        setTasks
    ]);
}

function _fetchTasksFailed(command) {
    return applyMutation(command, [
        stopLoading
    ]);
}
