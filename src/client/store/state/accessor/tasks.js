// # IMPORTS

import { Map, List } from 'immutable';
import { getState, mutateState } from '../manager/state-manager';

// # CONSTANTS

const ID = 'Tasks',
    INITIAL_STATE = Map({
        tasks: List()
    });

// # PUBLIC API

export {
    ID,
    // Initializer
    init,
    // Getter
    getTasks,
    // Mutators
    setTasks
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    return mutateState(ID, INITIAL_STATE);
}

function getTasks() {
    return getState(ID).get('tasks');
}

function setTasks(action) {
    return mutateState(ID, { tasks: action.payload.tasks });
}
