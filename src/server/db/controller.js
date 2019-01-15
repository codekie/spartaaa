import { initDB, fetchTasks, activateTask, deactivateTask, finishTask, unfinishTask, toggleNext } from './taskwarrior';

const _inst = {

};

export {
    activateTask,
    deactivateTask,
    fetchTasks,
    finishTask,
    init,
    toggleNext,
    unfinishTask
};

function init() {
    return initDB({ delegate: _inst });
}
