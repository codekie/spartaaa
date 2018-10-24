import * as VIEW_NAME from './task-list-views';
import TaskFilter from './session/task-filter';

export default class Session {
    constructor() {
        this.taskFilter = new TaskFilter();
        this.viewName = VIEW_NAME.pending;
    }
}
