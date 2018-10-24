import * as Tasks from './tasks';

const Watcher = {
    Tasks
};

export {
    Watcher,

    init
};

function init() {
    Object.keys(Watcher)
        .forEach(name => Watcher[name].init());
}
