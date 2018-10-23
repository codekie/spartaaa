import { bindActionCreators } from 'redux';

export {
    createStateMapper,
    createDispatchMapper
};

function createStateMapper(stateMap) {
    return (state) => {
        return Object.entries(stateMap).reduce((res, entry) => {
            res[entry[0]] = entry[1](state);
            return res;
        }, {});
    };
}

function createDispatchMapper(dispatcherMap) {
    return (dispatch) => {
        return bindActionCreators({ ...dispatcherMap }, dispatch);
    };
}
