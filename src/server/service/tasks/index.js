// # IMPORTS

const { from, of } = require('rxjs'),
    { filter, toArray, catchError, tap } = require('rxjs/operators'),
    { logger } = require('../../util'),
    DB = require('../../db'),
    View = require('./task-list-view').default;

// # CONSTANTS

const SERVICE_NAME = 'tasks';

// # PUBLIC API

module.exports = {
    name: SERVICE_NAME,
    methods: {
        activateTask,
        deactivateTask,
        fetchTasks,
        filterTasks,
        finishTask,
        unfinishTask
    }
};

// # IMPLEMENTATION DETAILS

// ## Public

async function fetchTasks() {
    return await DB.fetchTasks();
}

async function filterTasks(session, tasks) {
    const { viewName, taskFilter } = session,
        orderBy = View[viewName].sort || _orderUrgencyDesc;
    return await new Promise((resolve, reject) => {
        try {
            from(tasks)
                .pipe(
                    filter(View.Base.filter),
                    filter(View[viewName].filter),
                    filter((task) => _filter(task, taskFilter, viewName)),
                    toArray(),
                    tap((result) => result.sort(orderBy)),
                    catchError((e) => {
                        logger.error(e);
                        return of(e);
                    })
                )
                .subscribe((result) => {
                    logger.verbose('Finished processing tasks for session');
                    resolve(result);
                });
        } catch (e) {
            reject(e);
        }
    });
}

async function activateTask(taskId) {
    return await DB.activateTask(taskId);
}

async function deactivateTask(taskId) {
    return await DB.deactivateTask(taskId);
}

async function finishTask(taskId) {
    return await DB.finishTask(taskId);
}

async function unfinishTask(uuid) {
    return await DB.unfinishTask(uuid);
}

// ## Private

function _filter(task, taskFilter) {
    return [
        _filterByTags(taskFilter, task),
        _filterByStatus(taskFilter, task),
        _filterByProject(taskFilter, task),
        _filterByPriority(taskFilter, task),
        _filterBySearchTerm(taskFilter, task)
    ].every(res => res);
}

function _filterByTags(taskFilter, task) {
    //noinspection JSMismatchedCollectionQueryUpdate
    const { tags = [] } = taskFilter;
    if (!tags.length) { return true; }
    return tags.every((tag) => task.tags && task.tags.includes(tag));
}

function _filterByStatus(taskFilter, task) {
    if (taskFilter.status == null) { return true; }
    return task.status === taskFilter.status;
}

function _filterByProject(taskFilter, task) {
    if (taskFilter.project == null) { return true; }
    return task.project === taskFilter.project;
}

function _filterByPriority(taskFilter, task) {
    if (taskFilter.priority == null) { return true; }
    return task.priority === taskFilter.priority;
}

function _filterBySearchTerm(taskFilter, task) {
    if (taskFilter.searchTerm == null) { return true; }
    return task.description.toLowerCase().includes(taskFilter.searchTerm.toLowerCase());
}

function _orderUrgencyDesc(task1, task2) {
    return task2.urgency - task1.urgency;
}
