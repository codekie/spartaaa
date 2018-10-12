// # IMPORTS

const { logger } = require('../../util'),
    fetchTasks = require('./fetch-tasks.js');

// # CONSTANTS

const SERVICE_NAME = 'tasks',
    STATUS__PENDING = 'pending';

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

async function exportTasks() {
    const tasks = await fetchTasks(),
        result = tasks.filter(_filterPending);
    result.sort(_orderUrgencyDesc);
    return result;
}

// ## Private

function _filterPending(task) {
    return task.status === STATUS__PENDING;
}

function _orderUrgencyDesc(task1, task2) {
    return task2.urgency - task1.urgency;
}
