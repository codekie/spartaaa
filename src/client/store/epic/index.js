import * as Tasks from './tasks';
import { combineEpics } from 'redux-observable';

const EPICS = {
    Tasks
};

export default combineEpics(
    Tasks.fetchTasks
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
