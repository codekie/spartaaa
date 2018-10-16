import * as Tasks from './tasks';
import * as Session from './session';
import { combineEpics } from 'redux-observable';

const EPICS = {
    Tasks
};

export default combineEpics(
    Tasks.fetchTasks,
    Session.sendSession,
    Session.setTaskListViewAndUpdateList
);
export {
    init
};

function init() {
    Object.keys(EPICS)
        .forEach(name => {
            const init = EPICS[name].init;
            init && init();
        });
}
