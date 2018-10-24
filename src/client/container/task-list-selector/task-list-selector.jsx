// # IMPORTS

// 3rd-party
import { connect } from 'react-redux';
// App
import TaskListSelector from '../../component/task-list-selector';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';
import { extractImmutable } from '../../util';
import { createStateMapper, createDispatchMapper } from '../../util/prop-mapper';

// # CONSTANTS

const MAP__STATE_TO_PROPS = {
        viewName: (state) => state.get('session').get('viewName')
    },
    MAP__DISPATCH_TO_PROPS = {
        [ActionType.setTaskListViewAndUpdateList]: ActionCreator[ActionType.setTaskListViewAndUpdateList]
    };

// # EXPORT PUBLIC API

export default connect(
    createStateMapper(MAP__STATE_TO_PROPS, TaskListSelector),
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(TaskListSelector));
