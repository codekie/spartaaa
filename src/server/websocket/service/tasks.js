import { WebSocketServer } from '..';
import { WebSocketEvents } from '../../../comm';
import * as TaskService from '../../service/tasks';

const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__GET_TASKS = Event.tasks.get,
    WS_EVENT_REQ__GET_TASKS = getRequestEventName(EVENT__GET_TASKS),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(EVENT__GET_TASKS);

export {
    init
};

function init() {
    WebSocketServer.register(WS_EVENT_REQ__GET_TASKS, _setResponse);
}

async function _setResponse(response, ws, event) {
    const tasks = await TaskService.methods.exportTasks();
    WebSocketServer.send(ws, WS_EVENT_RES__GET_TASKS, tasks, event);
}
