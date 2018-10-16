import { WebSocketServer } from '..';
import { WebSocketEvents } from '../../../comm';
import * as TaskService from '../../service/tasks';

const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__GET_TASKS = Event.tasks.get,
    WS_EVENT_REQ__GET_TASKS = getRequestEventName(EVENT__GET_TASKS),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(EVENT__GET_TASKS);

let _getSession = null;

export {
    init
};

function init({ getSession }) {
    _getSession = getSession;
    WebSocketServer.register(WS_EVENT_REQ__GET_TASKS, _setResponse);
}

async function _setResponse(responseData, ws, event) {
    const tasks = await TaskService.methods.exportTasks(_getSession(ws), event);
    WebSocketServer.send(ws, WS_EVENT_RES__GET_TASKS, tasks, event);
}
