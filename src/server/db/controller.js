import { initDB, fetchTasks, activateTask, deactivateTask } from './taskwarrior';

const _inst = {

};

export {
    init,
    activateTask,
    deactivateTask,
    fetchTasks
};

function init() {
    return initDB({ delegate: _inst });
}
