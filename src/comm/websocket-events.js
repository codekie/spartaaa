// CONSTANTS

const REQUEST = 'Request',
    RESPONSE = 'Response',
    TASKS = 'tasks',
    TASKS__GET = `${ TASKS }.get`;

// PUBLIC API

export {
    getRequestEventName,
    getResponseEventName
};
export const Event = {
    tasks: {
        default: TASKS,
        get: TASKS__GET
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
