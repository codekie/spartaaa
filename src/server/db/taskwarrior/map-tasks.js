const moment = require('moment'),
    { logger } = require('../../util');

const PATTERN__PARSE_DATE = 'YYYYMMDDHHmmssZZ',
    TIMEZONE__GMT = '+00:00';

const MAP__TRANSFORMER = {
    description: _noop,
    due: _toDate,
    entry: _toDate,
    id: _noop,
    mask: _noop,
    modified: _toDate,
    priority: _noop,
    project: _noop,
    recur: _noop,
    start: _toDate,
    status: _noop,
    tags: _noop,
    urgency: _noop,
    uuid: _noop,
    wait: _toDate
};

const _droppedKeys = new Set();

module.exports = {
    mapTask,
    mapTasks
};

function mapTasks(rawTasks) {
    const mappedTasks = rawTasks.map(mapTask);
    logger.isDebug() && logger.debug(`Dropped properties: ${ Array.from(_droppedKeys).join('\', \'') }`);
    return mappedTasks;
}

function mapTask(rawTask) {
    return Object.assign(
        {},
        _filterProperties(rawTask)
    );
}

function _filterProperties(rawTask) {
    return Object.keys(rawTask)
        .reduce((res, key) => {
            const transformer = MAP__TRANSFORMER[key];
            if (!transformer) {
                _droppedKeys.add(key);
                return res;
            }
            res[key] = transformer(rawTask[key]);
            return res;
        }, {});
}

function _noop(val) { return val; }

function _toDate(strVal) {
    return moment(
        `${ strVal.replace('T', '').replace('Z', '') }${ TIMEZONE__GMT }`,
        PATTERN__PARSE_DATE
    ).toDate().getTime();
}
