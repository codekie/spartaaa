import ActionType from './action-type';
import { getSession } from './state/accessor/session';

export default {
    // Epics
    [ActionType.setTaskListViewAndUpdateList]: setTaskListViewAndUpdateList,
    // Connection
    [ActionType.connect]: connect,
    [ActionType.disconnect]: disconnect,
    [ActionType.handleConnected]: handleConnected,
    // Session
    [ActionType.sendSession]: sendSession,
    [ActionType.updateSession]: updateSession,
    [ActionType.clearTaskFilter]: clearTaskFilter,
    [ActionType.filterTasksBy]: filterTasksBy,
    [ActionType.setTaskListView]: setTaskListView,
    // Tasks
    [ActionType.fetchTasks]: fetchTasks,
    [ActionType.fetchTasksSuccess]: fetchTasksSuccess,
    [ActionType.fetchTasksFailed]: fetchTasksFailed
};

function setTaskListViewAndUpdateList(viewName) {
    return {
        type: ActionType.setTaskListViewAndUpdateList,
        payload: viewName
    };
}

// Connection

function connect() {
    return { type: ActionType.connect };
}

function disconnect() {
    return { type: ActionType.disconnect };
}

function handleConnected() {
    return { type: ActionType.handleConnected };
}

// Session

function sendSession() {
    return {
        type: ActionType.sendSession,
        payload: getSession()
    };
}

function updateSession(session) {
    return {
        type: ActionType.updateSession,
        payload: session
    };
}

function clearTaskFilter(criterion) {
    return {
        type: ActionType.clearTaskFilter,
        payload: criterion
    };
}

function filterTasksBy(criterion, value) {
    return {
        type: ActionType.filterTasksBy,
        payload: {
            criterion,
            value
        }
    };
}

function setTaskListView(viewName) {
    return {
        type: ActionType.setTaskListView,
        payload: viewName
    };
}

// Tasks

function fetchTasks() {
    return { type: ActionType.fetchTasks };
}

function fetchTasksSuccess(tasks) {
    return {
        type: ActionType.fetchTasksSuccess,
        payload: { tasks }
    };
}

function fetchTasksFailed() {
    return { type: ActionType.fetchTasksFailed };
}
