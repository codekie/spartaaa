import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import ActionType from '../action-type';
import ActionCreator from '../action-creators';
import { WebSocketEvents } from '../../../comm';
import { subscribe, send } from '../../controller/websocket';
import { dispatch } from '..';
const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const WS_EVENT_REQ__GET_TASKS = getRequestEventName(Event.tasks.get),
    WS_EVENT_RES__GET_TASKS = getResponseEventName(Event.tasks.get),
    WS_EVENT_REQ__ACTIVATE_TASK = getRequestEventName(Event.tasks.activateTask),
    WS_EVENT_REQ__DEACTIVATE_TASK = getRequestEventName(Event.tasks.deactivateTask);

export {
    init,
    fetchTasks,
    activateTask,
    deactivateTask
};

function init() {
    subscribe(WS_EVENT_RES__GET_TASKS, tasks => {
        dispatch(ActionCreator[ActionType.setLoading](false));
        dispatch(ActionCreator[ActionType.setTasks](tasks));
    });
}

function fetchTasks(actions$) {
    return actions$
        .ofType(ActionType.fetchTasks)
        .pipe(
            switchMap((/*action*/) => {
                send(WS_EVENT_REQ__GET_TASKS);
                return from([
                    ActionCreator[ActionType.setLoading](true)
                ]);
            }),
            catchError((e) => {
                console.error(e);
                return from([
                    ActionCreator[ActionType.setError](e)
                ]);
            })
        );
}

function activateTask(actions$) {
    return actions$
        .ofType(ActionType.activateTask)
        .pipe(
            switchMap((action) => {
                send(WS_EVENT_REQ__ACTIVATE_TASK, action.payload);
                return from([
                    ActionCreator[ActionType.setLoading](true)
                ]);
            }),
            catchError((e) => {
                console.error(e);
                return from([
                    ActionCreator[ActionType.setError](e)
                ]);
            })
        );
}

function deactivateTask(actions$) {
    return actions$
        .ofType(ActionType.deactivateTask)
        .pipe(
            switchMap((action) => {
                send(WS_EVENT_REQ__DEACTIVATE_TASK, action.payload);
                return from([
                    ActionCreator[ActionType.setLoading](true)
                ]);
            }),
            catchError((e) => {
                console.error(e);
                return from([
                    ActionCreator[ActionType.setError](e)
                ]);
            })
        );
}
