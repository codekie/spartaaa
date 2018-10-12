// # IMPORTS

import { getState, mutateState } from '../manager/state-manager';

// # CONSTANTS

const ID = 'Loader',
    INITIAL_STATE = {
        loading: false
    };

// # PUBLIC API

export {
    ID,
    // Initializer
    init,
    // Getter
    isLoading,
    // Mutator
    startLoading,
    stopLoading
};

// # IMPLEMENTATION DETAILS

// ## Public

function init() {
    return mutateState(ID, INITIAL_STATE);
}

function isLoading() {
    return getState(ID).loading;
}

function startLoading() {
    return mutateState(ID, { loading: true });
}

function stopLoading() {
    return mutateState(ID, { loading: false });
}
