import { List } from 'immutable';
import { spawn } from 'child_process';
import { logger } from '../../util';
import { mapTasks } from './map-tasks';
import TaskArguments from './task-arguments';

const COMMAND__TASKWARRIOR = 'task',
    ARG__DONE = 'done',
    ARG__END_EMPTY = 'end:',
    ARG__EXPORT = 'export',
    ARG__MODIFY = 'modify',
    ARG__START = 'start',
    ARG__STATUS_PENDING = 'status:pending',
    ARG__STOP = 'stop',
    ARG__EXPORT_TYPE__JSON = 'rc.json.array=on',
    EVT__DATA = 'data',
    EVT__CLOSE = 'close',
    EVT__EXIT = 'exit',
    EVT__ERROR = 'error',
    MSG__SUCCESS_ACTIVATION = 'Started 1 task.',
    MSG__SUCCESS_DEACTIVATION = 'Stopped 1 task.',
    MSG__SUCCESS_FINISHED = 'Completed 1 task.',
    MSG__SUCCESS_MODIFICATION = 'Modified 1 task.',
    TAG__NEXT = 'next';

//let _delegate = null;
let _cachedTasks = null;

export {
    initDB,
    activateTask,
    deactivateTask,
    toggleNext,
    fetchTasks,
    finishTask,
    refreshTasks,
    unfinishTask
};

async function initDB({ /*delegate*/ }) {
//    _delegate = delegate;
    return await refreshTasks();
}

// TODO refactor these (extract common parts to factory-function)

function refreshTasks() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('Refreshing tasks-cache');
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [ARG__EXPORT, ARG__EXPORT_TYPE__JSON]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.info('Received results of the task export');
                    const tasks = JSON.parse(rawData);
                    logger.isDebug() && logger.debug(JSON.stringify(tasks, null, '  '));
                    // eslint-disable-next-line new-cap
                    _cachedTasks = List(mapTasks(tasks));
                    resolve(_cachedTasks.toJS());
                    logger.info('Updated tasks-cache');
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function fetchTasks() {
    return new Promise(async (resolve, reject) => {
        _cachedTasks === null && await refreshTasks();
        try {
            logger.info('Fetching cached tasks');
            resolve(_cachedTasks.toJS());
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function activateTask(taskId) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Triggering activating task: ${ taskId }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [taskId, ARG__START]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(rawData);
                    resolve(rawData.includes(MSG__SUCCESS_ACTIVATION));
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function deactivateTask(taskId) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Triggering deactivating task: ${ taskId }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [taskId, ARG__STOP]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(rawData);
                    resolve(rawData.includes(MSG__SUCCESS_DEACTIVATION));
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

async function toggleNext(taskId) {
    const task = await _getTask(taskId);
    let tags = null;
    try {
        tags = task.tags;
    } catch (e) {
        throw new Error(`Task with id "${ taskId }" does not exist.`);
    }
    const hasNext = !!tags && tags.includes(TAG__NEXT),
        taskArguments = new TaskArguments();
    if (hasNext) {
        logger.info(`Remove "next"-tag from task: ${ taskId }`);
        taskArguments.removeTag(TAG__NEXT);
    } else {
        logger.info(`Add "next"-tag to task: ${ taskId }`);
        taskArguments.addTag(TAG__NEXT);
    }
    return (await _modifyTask(taskId, taskArguments)).includes(MSG__SUCCESS_MODIFICATION);
}

function finishTask(taskId) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Triggering finishing task: ${ taskId }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [taskId, ARG__DONE]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(rawData);
                    resolve(rawData.includes(MSG__SUCCESS_FINISHED));
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function unfinishTask(uuid) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Triggering unfinishing task: ${ uuid }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [uuid, ARG__MODIFY, ARG__STATUS_PENDING, ARG__END_EMPTY]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(rawData);
                    resolve(rawData.includes(MSG__SUCCESS_MODIFICATION));
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function _getTask(taskId) {
    return new Promise((resolve, reject) => {
        try {
            logger.verbose(`Fetch task: ${ taskId }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [taskId, ARG__EXPORT, ARG__EXPORT_TYPE__JSON]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(`Received data of task: ${ taskId }`);
                    const tasks = JSON.parse(rawData);
                    logger.isDebug() && logger.debug(JSON.stringify(tasks, null, '  '));
                    const mappedTasks = mapTasks(tasks);
                    resolve(mappedTasks.length ? mappedTasks[0] : null);
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}

function _modifyTask(taskId, taskArguments) {
    return new Promise((resolve, reject) => {
        try {
            const modifyArgs = taskArguments.build();
            logger.verbose(`Modify task: ${ taskId }`);
            logger.isDebug() && logger.debug(`Modifying: ${ modifyArgs.join(' ') }`);
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [taskId, ARG__MODIFY, ...modifyArgs]);
            let response = '';
            proc.stdout.on(EVT__DATA, (data) => response += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose(`Task modified: ${ response }`);
                    resolve(response);
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            });
            proc.on(EVT__EXIT, (code) => logger.debug(`Taskwarrior exited with status: ${ code }`));
            proc.on(EVT__ERROR, (code) => {
                logger.error(`Child process failed: ${ code }`);
                reject(code);
            });
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    });
}
