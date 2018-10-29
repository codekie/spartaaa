import { initDB, fetchTasks } from './taskwarrior';

const _inst = {

};

export {
    init,
    fetchTasks
};

function init() {
    return initDB({ delegate: _inst });
}
