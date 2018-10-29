import TaskStatus from '../../../../../comm/task-status';
import * as Tag from '../tags';

export {
    filter
};

function filter(task) {
    const tags = task.tags || [];
    return tags.includes(Tag.next)
        && !tags.includes(Tag.postponed)
        && task.status === TaskStatus.pending;
}
