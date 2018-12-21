// # IMPORTS

import { Map, Set } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const PROP__RAW_VALUE = 'rawValue',
    PROP__TAGS = 'tags',
    PROP__PRIORITY = 'priority',
    PROP__PROJECT = 'project',
    PROP__STATUS = 'status',
    REGEX__TAG = /^\+(.+)/,
    REGEX__PRIORITY = /^priority:(.+)/,
    REGEX__PROJECT = /^project:(.+)/,
    REGEX__STATUS = /^status:(.*)/;

// Reducer constants
const INITIAL_STATE = Map({
        [PROP__RAW_VALUE]: '',
        [PROP__TAGS]: Set(),
        [PROP__PRIORITY]: null,
        [PROP__PROJECT]: null,
        [REGEX__STATUS]: null
    }),
    Reducer = {
        [ActionType.parseOmniboxRawValue]: _parseOmniboxRawValue,
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

function _parseOmniboxRawValue(state) {
    state.get(PROP__RAW_VALUE).split(' ')
        .forEach(segment => {
            const tag = _getTag(segment),
                priority = _getPriority(segment),
                project = _getProject(segment),
                status = _getStatus(segment);
            state = tag ? state.set(PROP__TAGS, state.get(PROP__TAGS).add(tag)) : state;
            state = priority ? state.set(PROP__PRIORITY, priority) : state;
            state = project ? state.set(PROP__PROJECT, project) : state;
            state = status ? state.set(PROP__STATUS, status) : state;
        });
    return state;
}

function _getTag(expr) {
    return _getRegExVal(REGEX__TAG, expr);
}

function _getPriority(expr) {
    return _getRegExVal(REGEX__PRIORITY, expr);
}

function _getProject(expr) {
    return _getRegExVal(REGEX__PROJECT, expr);
}

function _getStatus(expr) {
    return _getRegExVal(REGEX__STATUS, expr);
}

function _getRegExVal(regex, expr) {
    const res = regex.exec(expr);
    return res && res[1];
}
