// # IMPORTS

import { Map } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const INITIAL_STATE = Map({
        loading: false
    }),
    Reducer = {
        [ActionType.setLoading]: _setLoading
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

function _setLoading(state, action) {
    return state.merge({ loading: action.payload });
}
