import { Map } from 'immutable';
import * as Accessors from '../accessor';

const _inst = {
    rootState: Map()
};

export {
    init,
    getRootState,
    getState,
    mutateState
};

function init() {
    // All these references to `_inst.rootState` are required and intentional. Don't mess with them... you'll regret it.
    _inst.rootState = Map(Object.keys(Accessors)
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
    return _inst.rootState.get(id);
}

function mutateState(id, state) {
    _inst.rootState = _inst.rootState.mergeIn([id], state);
    return getState(id);
}
