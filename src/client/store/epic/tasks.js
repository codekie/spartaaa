import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import CommandType from '../command-type';
import Action from '../actions';
import { WebSocketEvents } from '../../../comm';
import { subscribe, send } from '../../controller/websocket';
import { dispatch } from '..';
const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__GET_TASKS = Event.tasks.get,
    WS_EVENT_REQ__GET_TASKS = getRequestEventName(EVENT__GET_TASKS),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(EVENT__GET_TASKS);

export {
    init,
    fetchTasks
};

function fetchTasks(commands$) {
    return commands$
        .ofType(CommandType.fetchTasks)
        .switchMap((/*command*/) => send(WS_EVENT_REQ__GET_TASKS));
}

function init() {
    subscribe(WS_EVENT_RES__GET_TASKS, tasks => dispatch(Action[CommandType.fetchTasksSuccess](tasks)));
}