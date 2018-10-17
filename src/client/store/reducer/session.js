// # IMPORTS

import ActionType from '../action-type';
import { applyMutation } from './utils';
import { getRootState } from '../state/manager/state-manager';
import { updateSession, clearTaskFilter, filterTasksBy, setTaskListView } from '../state/accessor/session';

//  # CONSTANTS

const Reducer = {
    [ActionType.updateSession]: _updateSession,
    [ActionType.clearTaskFilter]: _clearTaskFilter,
    [ActionType.filterTasksBy]: _filterTasksBy,
    [ActionType.setTaskListView]: _setTaskListView
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

function _updateSession(action) {
    return applyMutation(action, [
        updateSession
    ]);
}

function _clearTaskFilter(action) {
    return applyMutation(action, [
        clearTaskFilter
    ]);
}

function _filterTasksBy(action) {
    return applyMutation(action, [
        filterTasksBy
    ]);
}

function _setTaskListView(action) {
    return applyMutation(action, [
        setTaskListView
    ]);
}
