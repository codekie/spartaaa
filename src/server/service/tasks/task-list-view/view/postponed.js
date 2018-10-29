import * as Tags from '../tags';

export {
    filter
};

function filter(task) {
    const tags = task.tags || [];
    return tags.includes(Tags.postponed);
}
