import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import ActionType from '../action-type';
import ActionCreator from '../action-creators';

let _delegate = null;

export {
    init,
    filterByOmnibox
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
