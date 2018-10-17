// # IMPORTS

import ActionType from '../action-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { startLoading, stopLoading } from '../state/accessor/loader';
import { setTasks } from '../state/accessor/tasks';

//  # CONSTANTS

const Reducer = {
    [ActionType.fetchTasks]: _fetchTasks,
    [ActionType.fetchTasksSuccess]: _fetchTasksSuccess,
    [ActionType.fetchTasksFailed]: _fetchTasksFailed
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

function _fetchTasks(action) {
    return applyMutation(action, [
        startLoading
    ]);
}

function _fetchTasksSuccess(action) {
    return applyMutation(action, [
        stopLoading,
        setTasks
    ]);
}

function _fetchTasksFailed(action) {
    return applyMutation(action, [
        stopLoading
    ]);
}
