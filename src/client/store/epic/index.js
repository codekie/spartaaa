import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { combineEpics } from 'redux-observable';
import CommandType from '../command-type';
import Action from '../actions';
import { ajax } from 'rxjs/observable/dom/ajax';

const URL__TASKS = '/api/tasks';

export default combineEpics(
    fetchTasks
);
export {
    fetchTasks
};

function fetchTasks(commands$) {
    return commands$
        .ofType(CommandType.fetchTasks)
        .switchMap(command => {
            return ajax.getJSON(URL__TASKS)
                .map(tasks => Action[CommandType.fetchTasksSuccess](tasks))
                .takeUntil(commands$.ofType(CommandType.fetchTasks))
                .catch(error => Observable.of(Action[CommandType.fetchTasksFailed]()));
        });
}
