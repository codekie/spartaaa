import * as Tags from '../tags';

export {
    filter
};

function filter(task) {
    return task.tags && task.tags.includes(Tags.postponed);
}
