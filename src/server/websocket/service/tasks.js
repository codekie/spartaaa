import { WebSocketServer } from '..';
import { WebSocketEvents } from '../../../comm';
import * as TaskService from '../../service/tasks';

const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const WS_EVENT_REQ__GET_TASKS = getRequestEventName(Event.tasks.get),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(Event.tasks.get),
    WS_EVENT_REQ__ACTIVATE_TASK = getRequestEventName(Event.tasks.activateTask),
    WS_EVENT_RES__ACTIVATE_TASK = getResponseEventName(Event.tasks.activateTask),
    WS_EVENT_REQ__DEACTIVATE_TASK = getRequestEventName(Event.tasks.deactivateTask),
    WS_EVENT_RES__DEACTIVATE_TASK = getResponseEventName(Event.tasks.deactivateTask);

export {
    init
};

function init() {
    WebSocketServer.register(WS_EVENT_REQ__GET_TASKS, _getTasks);
    WebSocketServer.register(WS_EVENT_REQ__ACTIVATE_TASK, _activateTask);
    WebSocketServer.register(WS_EVENT_REQ__DEACTIVATE_TASK, _deactivateTask);
}

async function _getTasks(data, ws, { session, event }) {
    const tasks = await TaskService.methods.fetchTasks(),
        filteredTasks = await TaskService.methods.filterTasks(session, tasks);
    WebSocketServer.send(ws, WS_EVENT_RES__GET_TASKS, filteredTasks, event);
}

async function _activateTask(taskId, ws, { event }) {
    const tasks = await TaskService.methods.activateTask(taskId);
    WebSocketServer.send(ws, WS_EVENT_RES__ACTIVATE_TASK, tasks, event);
}

async function _deactivateTask(taskId, ws, { event }) {
    const tasks = await TaskService.methods.deactivateTask(taskId);
    WebSocketServer.send(ws, WS_EVENT_RES__DEACTIVATE_TASK, tasks, event);
}
