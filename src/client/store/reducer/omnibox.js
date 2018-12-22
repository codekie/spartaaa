// # IMPORTS

import { Map, Set } from 'immutable';
import ActionType from '../action-type';

//  # CONSTANTS

const PROP__RAW_VALUE = 'rawValue',
    PROP__PARSED = 'parsed',
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
        [PROP__PARSED]: Map({
            [PROP__TAGS]: Set(),
            [PROP__PRIORITY]: null,
            [PROP__PROJECT]: null,
            [PROP__STATUS]: null
        })
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
    let stateClearedParsed = _clearParsedValues(state);
    return state.get(PROP__RAW_VALUE)
        .split(' ')
        .reduce((resState, segment) => {
            const tag = _getTag(segment),
                priority = _getPriority(segment),
                project = _getProject(segment),
                status = _getStatus(segment);
            let parsed = resState.get(PROP__PARSED);
            parsed = tag ? parsed.set(PROP__TAGS, parsed.get(PROP__TAGS).add(tag)) : parsed;
            parsed = priority ? parsed.set(PROP__PRIORITY, priority) : parsed;
            parsed = project ? parsed.set(PROP__PROJECT, project) : parsed;
            parsed = status ? parsed.set(PROP__STATUS, status) : parsed;
            return resState.set(PROP__PARSED, parsed);
        }, stateClearedParsed);
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

function _clearParsedValues(state) {
    return state.set(PROP__PARSED, INITIAL_STATE.get(PROP__PARSED));
}
