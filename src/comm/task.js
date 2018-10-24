import { Record, List } from 'immutable';

const EMPTY_TASK = Record({
    description: null,
    due: null,
    entry: null,
    id: null,
    mask: null,
    modified: null,
    priority: null,
    project: null,
    recur: null,
    start: null,
    status: null,
    tags: List(),
    urgency: null,
    uuid: null,
    wait: null
})();

// Merging the data with a base-immutable, will automatically map `Array`s to `List`s, in contrary to the
// generated record-factory
export default (data = {}) => EMPTY_TASK.merge(data);
export {
    EMPTY_TASK
};
