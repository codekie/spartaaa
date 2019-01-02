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
    PROP__SEARCH_TERM = 'searchTerm',
    PREFIX__TAG = '+',
    PREFIX__PRIORITY = 'priority:',
    PREFIX__PROJECT = 'project:',
    PREFIX__STATUS = 'status:',
    REGEX__TAG = new RegExp(`^${ '\\' + PREFIX__TAG }(.+)`),
    REGEX__PRIORITY = new RegExp(`^${ PREFIX__PRIORITY }(.+)`),
    REGEX__PROJECT = new RegExp(`^${ PREFIX__PROJECT }(.+)`),
    REGEX__STATUS = new RegExp(`^${ PREFIX__STATUS }(.*)`);

// Reducer constants
const INITIAL_STATE = Map({
        [PROP__RAW_VALUE]: '',
        [PROP__PARSED]: Map({
            [PROP__TAGS]: Set(),
            [PROP__PRIORITY]: null,
            [PROP__PROJECT]: null,
            [PROP__STATUS]: null,
            [PROP__SEARCH_TERM]: ''
        })
    }),
    Reducer = {
        [ActionType.buildRawFromParsed]: _buildRawFromParsed,
        [ActionType.parseOmniboxRawValue]: _parseOmniboxRawValue,
        [ActionType.setOmniboxRawValue]: _setOmniboxRawValue,
        [ActionType.toggleOmniboxProject]: _toggleOmniboxProject,
        [ActionType.toggleOmniboxTag]: _toggleOmniboxTag
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

function _buildRawFromParsed(state) {
    const stateParsed = state.get(PROP__PARSED),
        searchTerm = stateParsed.get(PROP__SEARCH_TERM) || '';
    let fragments = [];
    searchTerm.length && fragments.push(searchTerm);
    return state.set(PROP__RAW_VALUE, fragments.join(' '));
}

function _parseOmniboxRawValue(state) {
    let textSegments = [],
        resultState = state.get(PROP__RAW_VALUE)
            .split(' ')
            .reduce((resState, segment) => {
                const tag = _getTag(segment),
                    priority = _getPriority(segment),
                    project = _getProject(segment),
                    status = _getStatus(segment);
                let parsed = resState.get(PROP__PARSED);
                if (tag) {
                    parsed = parsed.set(PROP__TAGS, parsed.get(PROP__TAGS).add(tag));
                } else if (priority) {
                    parsed = parsed.set(PROP__PRIORITY, priority);
                } else if (project) {
                    parsed = parsed.set(PROP__PROJECT, project);
                } else if (status) {
                    parsed = parsed.set(PROP__STATUS, status);
                } else if (segment.length) {
                    textSegments.push(segment);
                }
                return resState.set(PROP__PARSED, parsed);
            }, state);
    const searchTerm = textSegments.join(' ');
    return resultState
        .set(PROP__PARSED, resultState.get(PROP__PARSED).set(PROP__SEARCH_TERM, searchTerm))
        .set(PROP__RAW_VALUE, searchTerm);
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

function _toggleOmniboxProject(state, action) {
    const project = action.payload;
    let selectedProject = project;
    if (state.get(PROP__PARSED).get(PROP__PROJECT) === project) {
        selectedProject = null;
    }
    return state.set(PROP__PARSED, state.get(PROP__PARSED).set(PROP__PROJECT, selectedProject));
}

function _toggleOmniboxTag(state, action) {
    const tag = action.payload;
    let selectedTags = state.get(PROP__PARSED).get(PROP__TAGS);
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.delete(tag);
    } else {
        selectedTags = selectedTags.add(tag);
    }
    return state.set(PROP__PARSED, state.get(PROP__PARSED).set(PROP__TAGS, selectedTags));
}
