import TaskStatus from '../../../../../comm/task-status';
import * as Tag from '../tags';

export {
    filter
};

function filter(task) {
    return task.tags
        && task.tags.includes(Tag.next)
        && !task.tags.includes(Tag.postponed)
        && task.status === TaskStatus.pending;
}
