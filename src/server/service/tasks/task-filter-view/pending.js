import TaskFilter from '../../../../comm/session/task-filter';
import TaskStatus from '../../../../comm/task-status';

const { FILTER_CRITERION } = TaskFilter;

export default {
    [FILTER_CRITERION.status]: TaskStatus.pending
};
