import { Record, List } from 'immutable';

export default Record({
    uuid: null,
    id: null,
    description: null,
    start: null,
    priority: null,
    modified: null,
    urgency: null,
    recur: null,
    entry: null,
    status: null,
    due: null,
    project: null,
    tags: List()
});
