import { WebSocketServer } from '..';
import { WebSocketEvents } from '../../../comm';
import * as TaskService from '../../service/tasks';

const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const WS_EVENT_REQ__GET_TASKS = getRequestEventName(Event.tasks.get),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(Event.tasks.get),
    WS_EVENT_REQ__ACTIVATE_TASK = getRequestEventName(Event.tasks.activateTask),
    WS_EVENT_RES__ACTIVATE_TASK = getResponseEventName(Event.tasks.activateTask),
    WS_EVENT_REQ__DEACTIVATE_TASK = getRequestEventName(Event.tasks.deactivateTask),
    WS_EVENT_RES__DEACTIVATE_TASK = getResponseEventName(Event.tasks.deactivateTask),
    WS_EVENT_REQ__FINISH_TASK = getRequestEventName(Event.tasks.finishTask),
    WS_EVENT_RES__FINISH_TASK = getResponseEventName(Event.tasks.finishTask),
    WS_EVENT_REQ__REFRESH = getRequestEventName(Event.tasks.refresh),
    WS_EVENT_RES__REFRESH = getResponseEventName(Event.tasks.refresh),
    WS_EVENT_REQ__TOGGLE_NEXT = getRequestEventName(Event.tasks.toggleNext),
    WS_EVENT_RES__TOGGLE_NEXT = getResponseEventName(Event.tasks.toggleNext),
    WS_EVENT_REQ__UNFINISH_TASK = getRequestEventName(Event.tasks.unfinishTask),
    WS_EVENT_RES__UNFINISH_TASK = getResponseEventName(Event.tasks.unfinishTask);

export {
    init
};

function init() {
    WebSocketServer.register(WS_EVENT_REQ__GET_TASKS, _getTasks);
    WebSocketServer.register(WS_EVENT_REQ__ACTIVATE_TASK, _activateTask);
    WebSocketServer.register(WS_EVENT_REQ__DEACTIVATE_TASK, _deactivateTask);
    WebSocketServer.register(WS_EVENT_REQ__FINISH_TASK, _finishTask);
    WebSocketServer.register(WS_EVENT_REQ__REFRESH, _refresh);
    WebSocketServer.register(WS_EVENT_REQ__TOGGLE_NEXT, _toggleNext);
    WebSocketServer.register(WS_EVENT_REQ__UNFINISH_TASK, _unfinishTask);
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

async function _finishTask(taskId, ws, { event }) {
    const tasks = await TaskService.methods.finishTask(taskId);
    WebSocketServer.send(ws, WS_EVENT_RES__FINISH_TASK, tasks, event);
}

async function _refresh(data, ws, { session, event }) {
    const tasks = await TaskService.methods.refreshTasks(),
        filteredTasks = await TaskService.methods.filterTasks(session, tasks);
    WebSocketServer.send(ws, WS_EVENT_RES__REFRESH, filteredTasks, event);
}

async function _toggleNext(taskId, ws, { event }) {
    const tasks = await TaskService.methods.toggleNext(taskId);
    WebSocketServer.send(ws, WS_EVENT_RES__TOGGLE_NEXT, tasks, event);
}

async function _unfinishTask(uuid, ws, { event }) {
    const tasks = await TaskService.methods.unfinishTask(uuid);
    WebSocketServer.send(ws, WS_EVENT_RES__UNFINISH_TASK, tasks, event);
}
