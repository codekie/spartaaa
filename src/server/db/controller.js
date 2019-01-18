import {
    initDB,
    fetchTasks,
    activateTask,
    deactivateTask,
    finishTask,
    unfinishTask,
    refreshTasks,
    toggleNext
} from './taskwarrior';

const _inst = {

};

export {
    activateTask,
    deactivateTask,
    fetchTasks,
    finishTask,
    init,
    refreshTasks,
    toggleNext,
    unfinishTask
};

function init() {
    return initDB({ delegate: _inst });
}
