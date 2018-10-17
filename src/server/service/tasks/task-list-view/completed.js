import TaskStatus from '../../../../comm/task-status';

export default function filter(task) {
    return task.status === TaskStatus.completed;
}
