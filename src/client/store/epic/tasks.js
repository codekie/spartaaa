import 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import ActionType from '../action-type';
import ActionCreator from '../action-creators';
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

function init() {
    subscribe(WS_EVENT_RES__GET_TASKS, tasks => dispatch(ActionCreator[ActionType.fetchTasksSuccess](tasks)));
}

function fetchTasks(actions$) {
    return actions$
        .ofType(ActionType.fetchTasks)
        .pipe(
            switchMap((/*action*/) => {
                send(WS_EVENT_REQ__GET_TASKS);
                return EMPTY;
            }),
            catchError((e) => console.error(e))
        );
}
