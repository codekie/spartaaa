// # IMPORTS

const { from } = require('rxjs'),
    { filter, toArray } = require('rxjs/operators'),
    { logger } = require('../../util'),
    fetchTasks = require('./fetch-tasks.js'),
    View = require('./task-list-view').default;

// # CONSTANTS

const SERVICE_NAME = 'tasks';

// # PUBLIC API

module.exports = {
    name: SERVICE_NAME,
    methods: {
        exportTasks
    },
    restMethods: {
        get: handleExportTasksRequest
    }
};

// # IMPLEMENTATION DETAILS

// ## Public

// TODO remove this function
/** @deprecated Don't use this anymore. It probably won't work */
async function handleExportTasksRequest(req, res) {
    try {
        const result = await exportTasks();
        res.send(result);
    } catch (e) {
        logger.error(e);
        // TODO send proper error
        res.send('error');
    }
}

async function exportTasks(session) {
    const { viewName, taskFilter } = session,
        tasks = await fetchTasks();
    return await new Promise((resolve, reject) => {
        try {
            from(tasks)
                .pipe(
                    filter(View.base),
                    filter(View[viewName]),
                    filter((task) => _filter(task, taskFilter, viewName)),
                    toArray()
                )
                .subscribe((result) => {
                    result.sort(_orderUrgencyDesc);
                    logger.verbose('Finished processing tasks');
                    resolve(result);
                });
        } catch (e) {
            reject(e);
        }
    });
}

// ## Private

function _filter(task, taskFilter) {
    return [
        _filterByTags(taskFilter, task),
        _filterByStatus(taskFilter, task)
    ].every(res => res);
}

function _filterByTags(taskFilter, task) {
    const { tags = [] } = taskFilter;
    if (!tags.length) { return true; }
    return tags.some((tag) => task.tags && task.tags.includes(tag));
}

function _filterByStatus(taskFilter, task) {
    if (taskFilter.status == null) { return true; }
    return task.status === taskFilter.status;
}

function _orderUrgencyDesc(task1, task2) {
    return task2.urgency - task1.urgency;
}
