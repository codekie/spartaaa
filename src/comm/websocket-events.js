// CONSTANTS

const REQUEST = 'Request',
    RESPONSE = 'Response',
    SESSION = 'session',
    SESSION__UPDATE = `${ SESSION }.update`,
    TASKS = 'tasks',
    TASKS__GET = `${ TASKS }.get`,
    TASKS__ACTIVATE = `${ TASKS }.activate`,
    TASKS__DEACTIVATE = `${ TASKS }.deactivate`;

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
        default: TASKS,
        get: TASKS__GET,
        activateTask: TASKS__ACTIVATE,
        deactivateTask: TASKS__DEACTIVATE
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
