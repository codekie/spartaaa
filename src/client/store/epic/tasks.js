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
    WS_EVENT_REQ__DEACTIVATE_TASK = getRequestEventName(Event.tasks.deactivateTask),
    WS_EVENT_REQ__FINISH_TASK = getRequestEventName(Event.tasks.finishTask),
    WS_EVENT_REQ__REFRESH_TASKS = getRequestEventName(Event.tasks.refresh),
    WS_EVENT_RES__REFRESH_TASKS = getResponseEventName(Event.tasks.refresh),
    WS_EVENT_REQ__TOGGLE_NEXT = getRequestEventName(Event.tasks.toggleNext),
    WS_EVENT_REQ__UNFINISH_TASK = getRequestEventName(Event.tasks.unfinishTask);

export {
    init,
    activateTask,
    deactivateTask,
    fetchTasks,
    finishTask,
    refreshTasks,
    toggleNext,
    unfinishTask
};

function init() {
    subscribe(WS_EVENT_RES__GET_TASKS, tasks => {
        dispatch(ActionCreator[ActionType.setLoading](false));
        dispatch(ActionCreator[ActionType.setTasks](tasks));
    });
    subscribe(WS_EVENT_RES__REFRESH_TASKS, tasks => {
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

function refreshTasks(actions$) {
    return actions$
        .ofType(ActionType.refreshTasks)
        .pipe(
            switchMap((/*action*/) => {
                send(WS_EVENT_REQ__REFRESH_TASKS);
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

function finishTask(actions$) {
    return actions$
        .ofType(ActionType.finishTask)
        .pipe(
            switchMap((action) => {
                send(WS_EVENT_REQ__FINISH_TASK, action.payload);
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

function toggleNext(actions$) {
    return actions$
        .ofType(ActionType.toggleNext)
        .pipe(
            switchMap((action) => {
                send(WS_EVENT_REQ__TOGGLE_NEXT, action.payload);
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

function unfinishTask(actions$) {
    return actions$
        .ofType(ActionType.unfinishTask)
        .pipe(
            switchMap((action) => {
                send(WS_EVENT_REQ__UNFINISH_TASK, action.payload);
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
