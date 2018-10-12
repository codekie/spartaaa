import CommandType from './command-type';

export default {
    [CommandType.fetchTasks]: fetchTasks,
    [CommandType.fetchTasksSuccess]: fetchTasksSuccess,
    [CommandType.fetchTasksFailed]: fetchTasksFailed
};

function fetchTasks() {
    return {
        type: CommandType.fetchTasks
    };
}

function fetchTasksSuccess(tasks) {
    return {
        type: CommandType.fetchTasksSuccess,
        payload: { tasks }
    };
}

function fetchTasksFailed() {
    return {
        type: CommandType.fetchTasksFailed
    };
}
