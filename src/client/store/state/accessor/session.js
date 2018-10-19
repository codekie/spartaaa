// # IMPORTS

import { Map } from 'immutable';
import Session from '../../../../comm/session';
import { getState, mutateState } from '../manager/state-manager';
import * as TaskFilter from './session/task-filter';
const {
    getTaskFilter,
    clearTaskFilter,
    filterTasksBy
} = TaskFilter;

// # CONSTANTS

const ID = 'Session',
    INITIAL_STATE = Map(new Session());

// # PUBLIC API

export {
    ID,
    // Initializer
    init,
    // Getter
    getSession,
    getTaskFilter,
    getTaskListView,
    // Mutator
    clearTaskFilter,
    filterTasksBy,
    updateSession,
    setTaskListView
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    TaskFilter.init(
        () => getState(ID).get('taskFilter'),
        (criteria) => mutateState(ID, Object.assign(
            {}, getState(ID), { taskFilter: criteria }
        ))
    );
    return mutateState(ID, INITIAL_STATE);
}

function getSession() {
    return getState(ID);
}

function updateSession(action) {
    // This will be called by the backed. We are going to enhance the session, rather than overwriting it (to not
    // overwrite changes that has been applied by the frontend, meanwhile)
    return mutateState(ID, Object.assign({}, getState(ID), action.payload));
}

function getTaskListView() {
    return getSession().get('viewName');
}

function setTaskListView(action) {
    return mutateState(ID, { viewName: action.payload });
}
