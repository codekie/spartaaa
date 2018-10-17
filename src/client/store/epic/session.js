import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import CommandType from '../command-type';
import Action from '../actions';
import { WebSocketEvents } from '../../../comm';
import { subscribe, send } from '../../controller/websocket';
import { dispatch } from '..';
import { getSession } from '../state/accessor/session';
const { Event, getRequestEventName, getResponseEventName } = WebSocketEvents;

const EVENT__SESSION_UPDATE = Event.session.update,
    WS_EVENT_REQ__SESSION_UPDATE = getRequestEventName(EVENT__SESSION_UPDATE),
    WS_EVENT_RES__SESSION_UPDATE = getResponseEventName(EVENT__SESSION_UPDATE);

export {
    init,
    sendSession,
    setTaskListViewAndUpdateList
};

function init() {
    subscribe(WS_EVENT_RES__SESSION_UPDATE, session => dispatch(Action[CommandType.updateSession](session)));
}

function sendSession(commands$) {
    return commands$
        .ofType(CommandType.sendSession)
        .pipe(
            switchMap((/*command*/) => {
                send(WS_EVENT_REQ__SESSION_UPDATE, getSession());
                return EMPTY;
            }),
            catchError((e) => console.error(e))
        );
}

function setTaskListViewAndUpdateList(commands$) {
    return commands$
        .ofType(CommandType.setTaskListViewAndUpdateList)
        .pipe(
            switchMap((command) => {
                return from([
                    Action[CommandType.setTaskListView](command.payload),
                    Action[CommandType.sendSession](),
                    Action[CommandType.fetchTasks]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}
