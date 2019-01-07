import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import ActionType from '../action-type';
import ActionCreator from '../action-creators';

let _delegate = null;

export {
    init,
    filterByOmnibox,
    togglePriorityFilter,
    toggleProjectFilter,
    toggleTagFilter
};

function init({ delegate }) {
    _delegate = delegate;
}

function filterByOmnibox(actions$) {
    return actions$
        .ofType(ActionType.applyOmniboxFilter)
        .pipe(
            switchMap((/*action*/) => {
                const parsedValues = _delegate.getOmniboxParsedValues();
                return from([
                    ActionCreator[ActionType.filterTasksBy](parsedValues),
                    ActionCreator[ActionType.sendSession](),
                    ActionCreator[ActionType.fetchTasks]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}

function togglePriorityFilter(actions$) {
    return actions$
        .ofType(ActionType.togglePriorityFilter)
        .pipe(
            switchMap((action) => {
                return from([
                    ActionCreator[ActionType.toggleOmniboxPriority](action.payload),
                    ActionCreator[ActionType.buildRawFromParsed](),
                    ActionCreator[ActionType.applyOmniboxFilter]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}

function toggleProjectFilter(actions$) {
    return actions$
        .ofType(ActionType.toggleProjectFilter)
        .pipe(
            switchMap((action) => {
                return from([
                    ActionCreator[ActionType.toggleOmniboxProject](action.payload),
                    ActionCreator[ActionType.buildRawFromParsed](),
                    ActionCreator[ActionType.applyOmniboxFilter]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}

function toggleTagFilter(actions$) {
    return actions$
        .ofType(ActionType.toggleTagFilter)
        .pipe(
            switchMap((action) => {
                return from([
                    ActionCreator[ActionType.toggleOmniboxTag](action.payload),
                    ActionCreator[ActionType.buildRawFromParsed](),
                    ActionCreator[ActionType.applyOmniboxFilter]()
                ]);
            }),
            catchError((e) => console.error(e))
        );
}
