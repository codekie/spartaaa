import TaskFilter from '../../../../../comm/session/task-filter';
import { deepFreeze } from '../../../../util';

const INITIAL_STATE = deepFreeze(new TaskFilter());

let _getState = null,
    _mutateState = null;

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
    return taskFilter[criterion];
}

function clearTaskFilter(action = {}) {
    const criterion = action.payload,
        taskFilter = Object.assign(
            {},
            _getState(),
            criterion == null
                ? INITIAL_STATE
                : { [criterion]: INITIAL_STATE[criterion] }
        );
    return _mutateState({ taskFilter });
}

function filterTasksBy(action = {}) {
    const { criterion = null, value } = action,
        criteria = Object.assign(
            {},
            _getState(),
            criterion == null
                ? INITIAL_STATE
                : { [criterion]: value }
        );
    return _mutateState(criteria);
}

