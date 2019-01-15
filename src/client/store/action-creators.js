import ActionType from './action-type';

export default {
    // EPICS

    // Omnibox
    [ActionType.applyOmniboxFilter]: applyOmniboxFilter,
    [ActionType.togglePriorityFilter]: togglePriorityFilter,
    [ActionType.toggleProjectFilter]: toggleProjectFilter,
    [ActionType.toggleTagFilter]: toggleTagFilter,
    // Session
    [ActionType.sendSession]: sendSession,
    [ActionType.setTaskListViewAndUpdateList]: setTaskListViewAndUpdateList,
    // Tasks
    [ActionType.activateTask]: activateTask,
    [ActionType.deactivateTask]: deactivateTask,
    [ActionType.fetchTasks]: fetchTasks,
    [ActionType.finishTask]: finishTask,
    [ActionType.toggleNext]: toggleNext,
    [ActionType.unfinishTask]: unfinishTask,

    // REDUCER

    // Connection
    [ActionType.connect]: connect,
    [ActionType.disconnect]: disconnect,
    [ActionType.handleConnected]: handleConnected,
    // Error
    [ActionType.setError]: setError,
    // Loader
    [ActionType.setLoading]: setLoading,
    // Omnibox
    [ActionType.buildRawFromParsed]: buildRawFromParsed,
    [ActionType.parseOmniboxRawValue]: parseOmniboxRawValue,
    [ActionType.setOmniboxRawValue]: setOmniboxRawValue,
    [ActionType.toggleOmniboxProject]: toggleOmniboxProject,
    [ActionType.toggleOmniboxPriority]: toggleOmniboxPriority,
    [ActionType.toggleOmniboxTag]: toggleOmniboxTag,
    // Session
    [ActionType.updateSession]: updateSession,
    [ActionType.clearTaskFilter]: clearTaskFilter,
    [ActionType.filterTasksBy]: filterTasksBy,
    [ActionType.setTaskListView]: setTaskListView,
    [ActionType.updateSession]: updateSession,
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

function applyOmniboxFilter(criteria) {
    return {
        type: ActionType.applyOmniboxFilter,
        payload: criteria
    };
}

function togglePriorityFilter(priority) {
    return {
        type: ActionType.togglePriorityFilter,
        payload: priority
    };
}

function toggleProjectFilter(project) {
    return {
        type: ActionType.toggleProjectFilter,
        payload: project
    };
}

function toggleTagFilter(tag) {
    return {
        type: ActionType.toggleTagFilter,
        payload: tag
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

function toggleNext(taskId) {
    return {
        type: ActionType.toggleNext,
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

function buildRawFromParsed() {
    return {
        type: ActionType.buildRawFromParsed
    };
}

function setOmniboxRawValue(rawValue) {
    return {
        type: ActionType.setOmniboxRawValue,
        payload: rawValue
    };
}

function toggleOmniboxPriority(priority) {
    return {
        type: ActionType.toggleOmniboxPriority,
        payload: priority
    };
}

function toggleOmniboxProject(project) {
    return {
        type: ActionType.toggleOmniboxProject,
        payload: project
    };
}

function toggleOmniboxTag(tag) {
    return {
        type: ActionType.toggleOmniboxTag,
        payload: tag
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

function filterTasksBy(criteria) {
    return {
        type: ActionType.filterTasksBy,
        payload: criteria
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
