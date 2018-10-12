import * as StateManager from './state/manager/state-manager';
import { isLoading } from './state/accessor/loader';
import { getTasks } from './state/accessor/tasks';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import epics from './epic';

export {
    init,
    // Mutators
    isLoading,
    getTasks
};

function init() {
    StateManager.init();
    const epicMiddleware = createEpicMiddleware(),
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
        store = createStore(
            reducer,
            composeEnhancers(
                applyMiddleware(epicMiddleware)
            )
        );
    epicMiddleware.run(epics);
    return store;
}
