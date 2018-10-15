import { deepFreeze } from '../../../util';
import * as Accessors from '../accessor';

const _inst = {
    rootState: null
};

export {
    init,
    getRootState,
    getState,
    mutateState
};

function init() {
    // All these references to `_inst.rootState` are required and intentional. Don't mess with them... you'll regret it.
    _inst.rootState = {};
    _inst.rootState = deepFreeze(Object.keys(Accessors)
        .reduce((rootState, name) => {
            const accessor = Accessors[name];
            accessor.init();
            return _inst.rootState;
        }, _inst.rootState));
}

function getRootState() {
    return _inst.rootState;
}

function getState(id) {
    return _inst.rootState[id];
}

function mutateState(id, state) {
    const childState = Object.assign({}, getState(id), state);
    _inst.rootState = deepFreeze(Object.assign({}, _inst.rootState, { [id]: childState }));
    return getState(id);
}
