// # IMPORTS

import { getState, mutateState } from '../manager/state-manager';

// # CONSTANTS

const ID = 'Tasks',
    INITIAL_STATE = {
        tasks: []
    };

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
    return getState(ID).tasks;
}

function setTasks(command) {
    return mutateState(ID, { tasks: command.payload.tasks });
}
