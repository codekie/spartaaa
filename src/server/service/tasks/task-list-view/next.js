import TaskFilter from '../../../../comm/session/task-filter';
import TaskStatus from '../../../../comm/task-status';

const { FILTER_CRITERION } = TaskFilter,
    TAG__NEXT = 'next';

export default {
    [FILTER_CRITERION.status]: TaskStatus.pending,
    [FILTER_CRITERION.tags]: [TAG__NEXT]
};
