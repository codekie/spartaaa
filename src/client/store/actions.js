import CommandType from './command-type';
import { getSession } from './state/accessor/session';

export default {
    // Connection
    [CommandType.connect]: connect,
    [CommandType.disconnect]: disconnect,
    [CommandType.handleConnected]: handleConnected,
    // Session
    [CommandType.sendSession]: sendSession,
    [CommandType.updateSession]: updateSession,
    [CommandType.clearTaskFilter]: clearTaskFilter,
    [CommandType.filterTasksBy]: filterTasksBy,
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

// Session

function sendSession() {
    return {
        type: CommandType.sendSession,
        payload: getSession()
    };
}

function updateSession(session) {
    return {
        type: CommandType.updateSession,
        payload: session
    };
}

function clearTaskFilter(criterion) {
    return {
        type: CommandType.clearTaskFilter,
        payload: criterion
    };
}

function filterTasksBy(criterion, value) {
    return {
        type: CommandType.filterTasksBy,
        payload: {
            criterion,
            value
        }
    };
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
