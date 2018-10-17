import TaskStatus from '../../../../comm/task-status';

export {
    filter
};

function filter(task) {
    return task.status !== TaskStatus.deleted;
}
