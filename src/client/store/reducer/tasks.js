// # IMPORTS

import { List, Map } from 'immutable';
import createTask from '../../../comm/task';
import ActionType from '../action-type';

//  # CONSTANTS

const INITIAL_STATE = Map({
        filteredTaskUuids: List(),
        tasks: Map()
    }),
    Reducer = {
        [ActionType.setTasks]: _setTasks
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

function _setTasks(state, action) {
    const { tasks } = action.payload;
    let newState = state.set('filteredTaskUuids', List(tasks.map(task => task.uuid))),
        newTasks = state.get('tasks');
    tasks.forEach(task => {
        newTasks = newTasks.set(
            task.uuid,
            createTask(task)
        );
    });
    return newState.merge({ tasks: newTasks });
}
