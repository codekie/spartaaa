const moment = require('moment');

const PATTERN__PARSE_DATE = 'YYYYMMDDHHmmss';

const MAP__TRANSFORMER = {
    description: _noop,
    due: _toDate,
    entry: _toDate,
    id: _noop,
    mask: _noop,
    modified: _toDate,
    project: _noop,
    recur: _noop,
    status: _noop,
    tags: _noop,
    urgency: _noop,
    uuid: _noop,
    wait: _toDate
};

module.exports = {
    mapTask,
    mapTasks
};

function mapTasks(rawTasks) {
    return rawTasks.map(mapTask);
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
            if (!transformer) { return res; }
            res[key] = transformer(rawTask[key]);
            return res;
        }, {});
}

function _noop(val) { return val; }

function _toDate(strVal) {
    return moment(strVal.replace('T', '').replace('Z', ''), PATTERN__PARSE_DATE).toDate().getTime();
}
