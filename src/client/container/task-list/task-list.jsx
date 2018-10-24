// # IMPORTS

// 3rd-party
import { connect } from 'react-redux';
// App
import TaskList from '../../component/task-list';
import { extractImmutable } from '../../util';
import { createStateMapper, createDispatchMapper } from '../../util/prop-mapper';

// # CONSTANTS

const MAP__STATE_TO_PROPS = {
        filteredTaskUuids: (state) => state.get('tasks').get('filteredTaskUuids'),
        tasks: (state) => state.get('tasks').get('tasks')
    },
    MAP__DISPATCH_TO_PROPS = {};

// # EXPORT PUBLIC API

export default connect(
    createStateMapper(MAP__STATE_TO_PROPS, TaskList),
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(TaskList));
