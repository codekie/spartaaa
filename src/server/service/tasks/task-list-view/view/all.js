export {
    filter,
    sort
};

function filter(/*task*/) {
    return true;
}

function sort(task1, task2) {
    return task2.modified - task1.modified;
}
