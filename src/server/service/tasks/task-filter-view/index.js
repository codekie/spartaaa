import _ from 'lodash';
import * as VIEW_NAME from '../../../../comm/task-filter-views';
import PendingView from './pending';
import TaskFilter from '../../../../comm/session/task-filter';

const { FILTER_CRITERION } = TaskFilter,
    MAP__CRITERION_HANDLER = {
        [FILTER_CRITERION.tags]: _applySet
    };
const VIEW = {
    [VIEW_NAME.pending]: PendingView
};

export {
    VIEW,
    applyView
};

function applyView(taskFilter, viewName) {
    const view = VIEW[viewName];
    return Object.keys(view)
        .reduce((result, criterion) => {
            const handler = MAP__CRITERION_HANDLER[criterion] || _applyValue;
            return handler(result, criterion, view[criterion]);
        }, taskFilter);
}

function _applySet(taskFilter, criterion, set) {
    return Object.assign(
        {},
        taskFilter,
        { [criterion]: _.uniq(_.concat(taskFilter[criterion], set)) }
    );
}

function _applyValue(taskFilter, criterion, value) {
    return Object.assign({}, taskFilter, { [criterion]: value });
}
