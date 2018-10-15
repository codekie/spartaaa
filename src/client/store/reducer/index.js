import reduceTasks from './tasks';
import reduceConnection from './connection';
import { combineReducers } from 'redux';

export default combineReducers({
    reduceConnection,
    reduceTasks
});
