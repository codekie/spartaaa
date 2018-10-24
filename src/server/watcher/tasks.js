import chokidar from 'chokidar';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import appConfig from '../../../config/app';
import { WebSocketServer } from '../websocket';
import { methods } from '../service/tasks';
import * as WebSocketEvents from '../../comm/websocket-events';
import { logger } from '../util';
const { Event, getResponseEventName } = WebSocketEvents;

export {
    init
};

function init() {
    const fileChanges$ = Observable
        .create(_emitFileChanges)
        .pipe(debounceTime(appConfig.server.fileWatch.debounceDuration));
    fileChanges$.subscribe(
        _handleFileChange,
        _handleError
    );
}

function _emitFileChanges(observer) {
    chokidar.watch(appConfig.server.pathTaskwarriorData)
        .on('change', (path, stats) => {
            observer.next({ path, stats });
        });
}

async function _sendTasks() {
    WebSocketServer.broadcast(
        getResponseEventName(Event.tasks.get),
        async ({ session }) => await methods.exportTasks(session)
    );
}

function _handleError(e) {
    logger.error(e);
}

async function _handleFileChange({ path }) {
    try {
        logger.info(`${ path } has changed, broadcasting tasks to clients`);
        await _sendTasks();
    } catch (e) {
        logger.error(e);
    }
}
