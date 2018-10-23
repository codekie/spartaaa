import { hot } from "react-hot-loader";
import connect from 'react-redux/es/connect/connect';
import { extractImmutable } from '../../util';
import { createStateMapper, createDispatchMapper } from '../../util/prop-mapper';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';
import App from '../../component/app';

const MAP__STATE_TO_PROPS = {
        filteredTaskUuids: (state) => state.get('tasks').get('filteredTaskUuids'),
        tasks: (state) => state.get('tasks').get('tasks'),
        viewName: (state) => state.get('session').get('viewName')
    },
    MAP__DISPATCH_TO_PROPS = {
        [ActionType.fetchTasks]: ActionCreator[ActionType.fetchTasks],
        [ActionType.setTaskListViewAndUpdateList]: ActionCreator[ActionType.setTaskListViewAndUpdateList]
    };

export default hot(module)(
    connect(
        createStateMapper(MAP__STATE_TO_PROPS),
        createDispatchMapper(MAP__DISPATCH_TO_PROPS)
    )(extractImmutable(App))
);
