import { List } from 'immutable';

const FILTER_CRITERION = {
    dueUntil: 'dueUntil',
    priority: 'priority',
    project: 'project',
    searchTerm: 'searchTerm',
    status: 'status',
    tags: 'tags'
};

const DEFAULT__VALS = {
    [FILTER_CRITERION.dueUntil]: null,
    [FILTER_CRITERION.priority]: null,
    [FILTER_CRITERION.project]: null,
    [FILTER_CRITERION.searchTerm]: null,
    [FILTER_CRITERION.status]: null,
    [FILTER_CRITERION.tags]: List()
};

export default class TaskFilter {
    constructor() {
        Object.assign(this, DEFAULT__VALS);
    }
}
TaskFilter.FILTER_CRITERION = FILTER_CRITERION;
