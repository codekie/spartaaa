import { QueueingSubject } from 'queueing-subject';
import * as StateManager from './state/manager/state-manager';
import { isLoading } from './state/accessor/loader';
import { getTasks } from './state/accessor/tasks';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import epics, * as Epics from './epic';

const _inst = _init();

export {
    init,
    dispatch,
    // Accessors
    isLoading,
    getTasks
};

function init() {
    StateManager.init();
    Epics.init();
    const epicMiddleware = createEpicMiddleware(),
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
        store = createStore(
            reducer,
            composeEnhancers(
                applyMiddleware(epicMiddleware)
            )
        );
    epicMiddleware.run(epics);
    // Queue a `QueueSubject`, to queue commands, before the store has been initialized
    _inst.dispatchQueue$.subscribe((command) => {
        store.dispatch(command);
    });
    _inst.store = store;
    return store;
}

function dispatch(command) {
    _inst.dispatchQueue$.next(command);
}

function _init() {
    return {
        store: null,
        dispatchQueue$: new QueueingSubject()
    };
}
