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
        connectionState: (state) => state.get('connection').get('state'),
        loading: (state) => state.get('loader').get('loading')
    },
    MAP__DISPATCH_TO_PROPS = {
        [ActionType.refreshTasks]: ActionCreator[ActionType.refreshTasks]
    };

// # EXPORT PUBLIC API

export default connect(
    createStateMapper(MAP__STATE_TO_PROPS, Header),
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(Header));
