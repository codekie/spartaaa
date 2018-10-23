import { QueueingSubject } from 'queueing-subject';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import epics, * as Epics from './epic';

const _inst = _init(),
    _storeController = {
        getSession
    };

export {
    init,
    dispatch
};

function init() {
    Epics.init({ delegate: _storeController });
    const epicMiddleware = createEpicMiddleware(),
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
        store = createStore(
            reducer,
            composeEnhancers(
                applyMiddleware(epicMiddleware)
            )
        );
    epicMiddleware.run(epics);
    // Queue a `QueueSubject`, to queue actions, before the store has been initialized
    _inst.dispatchQueue$.subscribe((action) => {
        store.dispatch(action);
    });
    _inst.store = store;
    return store;
}

function dispatch(action) {
    _inst.dispatchQueue$.next(action);
}

function getSession() {
    return _inst.store.getState().get('session').toJS();
}

function _init() {
    return {
        store: null,
        dispatchQueue$: new QueueingSubject()
    };
}
