const fetchTasks = require('./fetch-tasks.js');

const SERVICE_NAME = 'tasks';

module.exports = {
    name: SERVICE_NAME,
    methods: {
        get: exportTaskwarrior
    }
};

async function exportTaskwarrior(req, res) {
    try {
        const tasks = await fetchTasks();
        res.send(tasks);
    } catch (e) {
        // TODO send proper error
        res.send('error');
    }
}
