import ActionType from './action-type';

export default {
    // Epics
    [ActionType.activateTask]: activateTask,
    [ActionType.deactivateTask]: deactivateTask,
    [ActionType.fetchTasks]: fetchTasks,
    [ActionType.finishTask]: finishTask,
    [ActionType.unfinishTask]: unfinishTask,
    [ActionType.sendSession]: sendSession,
    [ActionType.setTaskListViewAndUpdateList]: setTaskListViewAndUpdateList,
    // Connection
    [ActionType.connect]: connect,
    [ActionType.disconnect]: disconnect,
    [ActionType.handleConnected]: handleConnected,
    // Error
    [ActionType.setError]: setError,
    // Loader
    [ActionType.setLoading]: setLoading,
    // Omnibox
    [ActionType.parseOmniboxRawValue]: parseOmniboxRawValue,
    [ActionType.setOmniboxRawValue]: setOmniboxRawValue,
    // Session
    [ActionType.updateSession]: updateSession,
    [ActionType.clearTaskFilter]: clearTaskFilter,
    [ActionType.filterTasksBy]: filterTasksBy,
    [ActionType.setTaskListView]: setTaskListView,
    // Tasks
    [ActionType.setTasks]: setTasks
};

// Epics

function activateTask(taskId) {
    return {
        type: ActionType.activateTask,
        payload: taskId
    };
}

function deactivateTask(taskId) {
    return {
        type: ActionType.deactivateTask,
        payload: taskId
    };
}

function fetchTasks() {
    return { type: ActionType.fetchTasks };
}

function finishTask(taskId) {
    return {
        type: ActionType.finishTask,
        payload: taskId
    };
}

function unfinishTask(uuid) {
    return {
        type: ActionType.unfinishTask,
        payload: uuid
    };
}

function sendSession() {
    return {
        type: ActionType.sendSession
    };
}

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

// Error

function setError(e) {
    return {
        type: ActionType.setError,
        payload: e
    };
}

// Loader

function setLoading(loading) {
    return {
        type: ActionType.setLoading,
        payload: !!loading
    };
}

// Omnibox

function setOmniboxRawValue(rawValue) {
    return {
        type: ActionType.setOmniboxRawValue,
        payload: rawValue
    };
}

function parseOmniboxRawValue() {
    return {
        type: ActionType.parseOmniboxRawValue
    };
}

// Session

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

function setTasks(tasks) {
    return {
        type: ActionType.setTasks,
        payload: { tasks }
    };
}
