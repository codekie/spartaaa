import * as Tasks from './tasks';
import * as Session from './session';
import { combineEpics } from 'redux-observable';

const EPICS = {
    Session,
    Tasks
};

export default combineEpics(
    Tasks.fetchTasks,
    Tasks.activateTask,
    Tasks.deactivateTask,
    Session.sendSession,
    Session.setTaskListViewAndUpdateList
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
