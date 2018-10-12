import * as StateManager from './state/manager/state-manager';
import { isLoading } from './state/accessor/loader';
import { getTasks } from './state/accessor/tasks';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import epics, * as Epics from './epic';

let _store = null;

export {
    init,
    dispatch,
    // Mutators
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
    _store = store;
    return store;
}

function dispatch(command) {
    return _store.dispatch(command);
}
