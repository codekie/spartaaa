import { combineReducers } from 'redux-immutable';
import connection from './connection';
import error from './error';
import loader from './loader';
import omnibox from './omnibox';
import session from './session';
import tasks from './tasks';

export default combineReducers({
    connection,
    error,
    loader,
    omnibox,
    session,
    tasks
});
