import { initDB, fetchTasks, activateTask, deactivateTask, finishTask, unfinishTask } from './taskwarrior';

const _inst = {

};

export {
    init,
    activateTask,
    deactivateTask,
    fetchTasks,
    finishTask,
    unfinishTask
};

function init() {
    return initDB({ delegate: _inst });
}
