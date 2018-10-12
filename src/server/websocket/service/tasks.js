import { WebSocketServer } from '..';
import { WebSocketEvents } from '../../../comm';
import * as TaskService from '../../service/tasks';

const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__SET_RESPONSE = Event.tasks.get,
    WS_EVENT_REQ__SET_RESPONSE = getRequestEventName(EVENT__SET_RESPONSE),
    WS_EVENT_RES__SET_RESPONSE = getResponseEventName(EVENT__SET_RESPONSE);

export {
    init
};

function init() {
    WebSocketServer.register(WS_EVENT_REQ__SET_RESPONSE, _setResponse);
}

async function _setResponse(response, ws, event) {
    const tasks = await TaskService.methods.exportTasks();
    WebSocketServer.send(ws, WS_EVENT_RES__SET_RESPONSE, {
        tasks
    }, event);
}
