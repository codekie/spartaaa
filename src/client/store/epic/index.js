import * as Omnibox from './omnibox';
import * as Session from './session';
import * as Tasks from './tasks';
import { combineEpics } from 'redux-observable';

const EPICS = {
    Omnibox,
    Session,
    Tasks
};

export default combineEpics(
    Omnibox.filterByOmnibox,
    Omnibox.togglePriorityFilter,
    Omnibox.toggleProjectFilter,
    Omnibox.toggleTagFilter,
    Session.sendSession,
    Session.setTaskListViewAndUpdateList,
    Tasks.activateTask,
    Tasks.deactivateTask,
    Tasks.fetchTasks,
    Tasks.finishTask,
    Tasks.unfinishTask,
);
export {
    init
};

function init({ delegate }) {
    Object.keys(EPICS)
        .forEach(name => {
            const init = EPICS[name].init;
            init && init({ delegate });
        });
}
