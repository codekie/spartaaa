import * as VIEW_NAME from '../../../../comm/task-list-views';
import * as Base from './base';
import * as Pending from './view/pending';
import * as Completed from './view/completed';
import * as Next from './view/next';
import * as Postponed from './view/postponed';
import * as All from './view/all';

export default {
    Base,
    [VIEW_NAME.pending]: Pending,
    [VIEW_NAME.completed]: Completed,
    [VIEW_NAME.next]: Next,
    [VIEW_NAME.postponed]: Postponed,
    [VIEW_NAME.all]: All
};
