// # IMPORTS

import { Map } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const INITIAL_STATE = Map({
        rawValue: ''
    }),
    Reducer = {
        [ActionType.setOmniboxRawValue]: _setOmniboxRawValue
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

function _setOmniboxRawValue(state, action) {
    return state.merge({ rawValue: action.payload });
}
