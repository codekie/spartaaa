const { logger } = require('../../../util'),
    fetchTasks = require('./fetch-tasks.js');

const SERVICE_NAME = 'tasks';

const STATUS__PENDING = 'pending';

module.exports = {
    name: SERVICE_NAME,
    methods: {
        get: exportTaskwarrior
    }
};

async function exportTaskwarrior(req, res) {
    try {
        const tasks = await fetchTasks(),
            result = tasks.filter(_filterPending);
        result.sort(_orderUrgencyDesc);
        res.send(result);
    } catch (e) {
        logger.error(e);
        // TODO send proper error
        res.send('error');
    }
}

function _filterPending(task) {
    return task.status === STATUS__PENDING;
}

function _orderUrgencyDesc(task1, task2) {
    return task2.urgency - task1.urgency;
}
