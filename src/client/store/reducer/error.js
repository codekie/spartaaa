// # IMPORTS

import { Map, List } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const INITIAL_STATE = Map({
        errors: List()
    }),
    Reducer = {
        [ActionType.setError]: _setError
    };

// # PUBLIC API

export default function reduce(state = INITIAL_STATE, action) {
    const reducer = Reducer[action.type];
    if (!reducer) { return state; }
    return reducer(state, action);
}
export {
    Reducer
};

// # IMPLEMENTATION DETAILS

// ## Reducer

function _setError(state, action) {
    return state.set('error', List([action.error]));
}
