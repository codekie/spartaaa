import { from, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import ActionType from '../action-type';
import ActionCreator from '../action-creators';
import { WebSocketEvents } from '../../../comm';
import { subscribe, send } from '../../controller/websocket';
import { dispatch } from '..';
const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__SESSION_UPDATE = Event.session.update,
    WS_EVENT_REQ__SESSION_UPDATE = getRequestEventName(EVENT__SESSION_UPDATE),
    WS_EVENT_RES__SESSION_UPDATE = getResponseEventName(EVENT__SESSION_UPDATE);

let _delegate = null;

export {
    init,
    sendSession,
    setTaskListViewAndUpdateList
};

function init({ delegate }) {
    _delegate = delegate;
    subscribe(WS_EVENT_RES__SESSION_UPDATE, session => {
        return dispatch(ActionCreator[ActionType.updateSession](session));
    });
}

function sendSession(actions$) {
    return actions$
        .ofType(ActionType.sendSession)
        .pipe(
            switchMap((/*action*/) => {
                send(WS_EVENT_REQ__SESSION_UPDATE, _delegate.getSession());
                return EMPTY;
            }),
            catchError((e) => {
                console.error(e);
                return from([
                    ActionCreator[ActionType.setError](e)
                ]);
            })
        );
}

function setTaskListViewAndUpdateList(actions$) {
    return actions$
        .ofType(ActionType.setTaskListViewAndUpdateList)
        .pipe(
            switchMap((action) => {
                return from([
                    ActionCreator[ActionType.setTaskListView](action.payload),
                    ActionCreator[ActionType.sendSession](),
                    ActionCreator[ActionType.fetchTasks]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}
