import TaskStatus from '../../../../../comm/task-status';

export {
    filter,
    sort
};

function filter(task) {
    return task.status === TaskStatus.completed;
}

function sort(task1, task2) {
    return task2.modified - task1.modified;
}
