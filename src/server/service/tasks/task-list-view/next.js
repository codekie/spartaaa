import TaskStatus from '../../../../comm/task-status';

const TAG__NEXT = 'next';

export {
    filter
};

function filter(task) {
    return task.tags && task.tags.includes(TAG__NEXT)
        && task.status === TaskStatus.pending;
}
