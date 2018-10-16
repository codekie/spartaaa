// # IMPORTS

const { logger } = require('../../util'),
    fetchTasks = require('./fetch-tasks.js'),
    { applyView } = require('./task-filter-view');

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
        tasks = await fetchTasks(),
        result = _filter(viewName, taskFilter, tasks);
    result.sort(_orderUrgencyDesc);
    logger.verbose('Finished processing tasks');
    return result;
}

// ## Private

function _filter(viewName, taskFilter, tasks) {
    const filtersWithView = applyView(taskFilter, viewName);
    return tasks
        .filter((task) => _filterByTags(filtersWithView, task))
        .filter((task) => _filterByStatus(filtersWithView, task));
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
