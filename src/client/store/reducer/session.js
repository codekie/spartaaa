// # IMPORTS

import _ from 'lodash';
import { Map, Set } from 'immutable';
import ActionType from '../action-type';
import Session from '../../../comm/session';
import TaskFilter from '../../../comm/session/task-filter';

//  # CONSTANTS

const PROP__TAGS = 'tags',
    PROP__TASK_FILTER = 'taskFilter',
    PROP__VIEW_NAME = 'viewName';

// State
const INITIAL_STATE__TASK_FILTER = Map(new TaskFilter())
        .set(PROP__TAGS, Set()),
    INITIAL_STATE = Map(new Session())
        .set(PROP__TASK_FILTER, INITIAL_STATE__TASK_FILTER),
    Reducer = {
        [ActionType.updateSession]: _updateSession,
        [ActionType.clearTaskFilter]: _clearTaskFilter,
        [ActionType.filterTasksBy]: _filterTasksBy,
        [ActionType.setTaskListView]: _setTaskListView
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

function _updateSession(state, action) {
    const payload = action.payload;
    return state.merge({ ...payload, taskFilter: Map(payload.taskFilter) });
}

function _clearTaskFilter(state, action) {
    const criterion = action.payload;
    if (criterion == null) {
        return state.merge({ taskFilter: INITIAL_STATE__TASK_FILTER });
    }
    return state.set(PROP__TASK_FILTER,
        state.get(PROP__TASK_FILTER).set(criterion, INITIAL_STATE__TASK_FILTER.get(criterion))
    );
}

function _filterTasksBy(state, action) {
    const criteria = _.cloneDeep(action.payload);
    if (criteria == null) {
        return _clearTaskFilter(state, action);
    }
    criteria.tags = criteria.tags ? Set(criteria.tags) : criteria.tags;
    return state.merge(
        _clearTaskFilter(state, {})
            .set(PROP__TASK_FILTER, INITIAL_STATE__TASK_FILTER.merge(criteria))
    );
}

function _setTaskListView(state, action) {
    return state.set(PROP__VIEW_NAME, action.payload);
}
