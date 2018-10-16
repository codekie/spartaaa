import reduceTasks from './tasks';
import reduceConnection from './connection';
import reduceSession from './session';
import { combineReducers } from 'redux';

export default combineReducers({
    reduceConnection,
    reduceSession,
    reduceTasks
});
