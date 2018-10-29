import { spawn } from 'child_process';
import { logger } from '../../util';
import { mapTasks } from './map-tasks';

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
    MSG__SUCCESS_MODIFICATION = 'Modified 1 task.';

//let _delegate = null;

export {
    initDB,
    activateTask,
    deactivateTask,
    fetchTasks,
    finishTask,
    unfinishTask
};

function initDB({ /*delegate*/ }) {
//    _delegate = delegate;
    return Promise.resolve();
}

// TODO refactor these (extract common parts to factory-function)

function fetchTasks() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('Triggering task export');
            // TODO make this testable (injectable `spawn`-mock)
            const proc = spawn(COMMAND__TASKWARRIOR, [ARG__EXPORT, ARG__EXPORT_TYPE__JSON]);
            let rawData = '';
            proc.stdout.on(EVT__DATA, (data) => rawData += data);
            proc.stdout.on(EVT__CLOSE, () => {
                try {
                    logger.verbose('Received results of the task export');
                    const tasks = JSON.parse(rawData);
                    logger.isDebug() && logger.debug(JSON.stringify(tasks, null, '  '));
                    resolve(mapTasks(tasks));
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
