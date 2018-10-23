// # IMPORTS

// 3rd-party
import { connect } from 'react-redux';
// App
import Header from '../../component/header';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';
import { extractImmutable } from '../../util';
import { createStateMapper, createDispatchMapper } from '../../util/prop-mapper';

// # CONSTANTS

const MAP__STATE_TO_PROPS = {
        loading: (state) => state.get('loader').get('loading')
    },
    MAP__DISPATCH_TO_PROPS = {
        [ActionType.fetchTasks]: ActionCreator[ActionType.fetchTasks]
    };

// # EXPORT PUBLIC API

export default connect(
    createStateMapper(MAP__STATE_TO_PROPS),
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(Header));
