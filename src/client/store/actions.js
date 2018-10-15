import CommandType from './command-type';

export default {
    // Connection
    [CommandType.connect]: connect,
    [CommandType.disconnect]: disconnect,
    [CommandType.handleConnected]: handleConnected,
    // Tasks
    [CommandType.fetchTasks]: fetchTasks,
    [CommandType.fetchTasksSuccess]: fetchTasksSuccess,
    [CommandType.fetchTasksFailed]: fetchTasksFailed
};

// Connection

function connect() {
    return { type: CommandType.connect };
}

function disconnect() {
    return { type: CommandType.disconnect };
}

function handleConnected() {
    return { type: CommandType.handleConnected };
}

// Tasks

function fetchTasks() {
    return { type: CommandType.fetchTasks };
}

function fetchTasksSuccess(tasks) {
    return {
        type: CommandType.fetchTasksSuccess,
        payload: { tasks }
    };
}

function fetchTasksFailed() {
    return { type: CommandType.fetchTasksFailed };
}
