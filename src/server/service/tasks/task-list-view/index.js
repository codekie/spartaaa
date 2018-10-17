import * as VIEW_NAME from '../../../../comm/task-list-views';
import * as Base from './base';
import * as Pending from './pending';
import * as Completed from './completed';
import * as Next from './next';
import * as All from './all';

export default {
    Base,
    [VIEW_NAME.pending]: Pending,
    [VIEW_NAME.completed]: Completed,
    [VIEW_NAME.next]: Next,
    [VIEW_NAME.all]: All
};
