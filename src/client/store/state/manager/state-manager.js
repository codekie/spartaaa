import { deepFreeze } from '../../../util';
import * as Accessors from '../accessor';

let _rootState = deepFreeze({});

export {
    init,
    getRootState,
    getState,
    mutateState
};

function init() {
    _rootState = Object.keys(Accessors)
        .reduce((state, name) => {
            const accessor = Accessors[name];
            state[accessor.ID] = {};
            accessor.init(state[accessor.ID]);
            return state;
        }, {});
}

function getRootState() {
    return _rootState;
}

function getState(id) {
    return _rootState[id];
}

function mutateState(id, state) {
    _rootState = deepFreeze(Object.assign({}, _rootState, { [id]: state }));
    return getState(id);
}
