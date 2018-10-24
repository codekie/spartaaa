import { bindActionCreators } from 'redux';

export {
    createStateMapper,
    createDispatchMapper
};

function createStateMapper(stateMap, TargetComponent) {
    // If no propTypes have been declared, there will be no filter on the props that will be mapped
    const propTypes = TargetComponent && TargetComponent.propTypes,
        propNames = propTypes && Object.keys(propTypes);
    return (state, ownProps = {}) => {
        return Object.entries(stateMap)
            // Only map props that have been declared in the target-component, to prevent false-positives on
            // `shouldComponentUpdate`-calls, due to changes on props that aren't even relevant
            .filter((entry) => !propNames || propNames.includes(entry[0]))
            .reduce((res, entry) => {
                res[entry[0]] = entry[1](state, ownProps);
                return res;
            }, {});
    };
}

function createDispatchMapper(dispatcherMap) {
    return (dispatch) => {
        return bindActionCreators({ ...dispatcherMap }, dispatch);
    };
}
