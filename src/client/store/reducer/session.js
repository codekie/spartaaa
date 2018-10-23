// # IMPORTS

import _ from 'lodash';
import { Map, List } from 'immutable';
import ActionType from '../action-type';
import Session from '../../../comm/session';
import TaskFilter from '../../../comm/session/task-filter';

//  # CONSTANTS

const INITIAL_STATE__TASK_FILTER = Map(new TaskFilter())
        .set('tags', List()),
    INITIAL_STATE = Map(new Session())
        .set('taskFilter', INITIAL_STATE__TASK_FILTER),
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
    return state.set(criterion, INITIAL_STATE__TASK_FILTER.get(criterion));
}

function _filterTasksBy(state, action) {
    const criteria = _.cloneDeep(action.payload);
    if (criteria == null) {
        return _clearTaskFilter(state, action);
    }
    criteria.tags = criteria.tags ? List(criteria.tags) : criteria.tags;
    return state.merge(
        _clearTaskFilter(state, {})
            .merge(criteria)
    );
}

function _setTaskListView(state, action) {
    return state.set('viewName', action.payload);
}
