// CONSTANTS

const REQUEST = 'Request',
    RESPONSE = 'Response',
    SESSION = 'session',
    SESSION__UPDATE = `${ SESSION }.update`,
    TASKS = 'tasks',
    TASKS__ACTIVATE = `${ TASKS }.activate`,
    TASKS__DEACTIVATE = `${ TASKS }.deactivate`,
    TASKS__FINISH = `${ TASKS }.finish`,
    TASKS__GET = `${ TASKS }.get`,
    TASKS__REFRESH = `${ TASKS }.refresh`,
    TASKS__TOGGLE_NEXT = `${ TASKS }.toggleNext`,
    TASKS__UNFINISH = `${ TASKS }.unfinish`;

// PUBLIC API

export {
    getRequestEventName,
    getResponseEventName
};
export const Event = {
    session: {
        update: SESSION__UPDATE
    },
    tasks: {
        activateTask: TASKS__ACTIVATE,
        deactivateTask: TASKS__DEACTIVATE,
        default: TASKS,
        finishTask: TASKS__FINISH,
        get: TASKS__GET,
        refresh: TASKS__REFRESH,
        toggleNext: TASKS__TOGGLE_NEXT,
        unfinishTask: TASKS__UNFINISH
    }
};

// IMPLEMENTATION DETAILS

// Public

function getRequestEventName(eventNode) {
    return `${ REQUEST }.${ _getEventName(eventNode) }`;
}

function getResponseEventName(eventNode) {
    return `${ RESPONSE }.${ _getEventName(eventNode) }`;
}

// Private

function _getEventName(eventNode) {
    return typeof eventNode === 'string' ? eventNode : eventNode.default;
}
