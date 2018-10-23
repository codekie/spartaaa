import { combineReducers } from 'redux-immutable';
import error from './error';
import loader from './loader';
import tasks from './tasks';
import connection from './connection';
import session from './session';

export default combineReducers({
    connection,
    error,
    loader,
    session,
    tasks
});
