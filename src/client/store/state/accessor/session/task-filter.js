import { Map } from 'immutable';
import TaskFilter from '../../../../../comm/session/task-filter';

const INITIAL_STATE = Map(new TaskFilter());

let _getState = null,
    _mutateState = null;

// eslint-disable-next-line new-cap
export {
    INITIAL_STATE,
    // Initializer
    init,
    // Getter
    getTaskFilter,
    // Mutator
    clearTaskFilter,
    filterTasksBy
};

function init(getState, mutateState) {
    _getState = getState;
    _mutateState = mutateState;
}

function getTaskFilter(action = {}) {
    const criterion = action.payload;
    const taskFilter = _getState();
    if (criterion == null) { return taskFilter; }
    return taskFilter.get(criterion);
}

function clearTaskFilter(action = {}) {
    const criterion = action.payload,
        taskFilter = _getState()
            .mergeDeep(criterion == null
                ? INITIAL_STATE
                : { [criterion]: INITIAL_STATE.get(criterion) });
    return _mutateState({ taskFilter });
}

function filterTasksBy(action = {}) {
    const { criterion = null, value } = action,
        criteria = _getState().mergeDeep(
            criterion == null
                ? INITIAL_STATE
                : { [criterion]: value });
    return _mutateState(criteria);
}

