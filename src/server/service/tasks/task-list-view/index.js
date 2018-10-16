import * as VIEW_NAME from '../../../../comm/task-list-views';
import base from './base';
import pending from './pending';
import next from './next';
import all from './all';

export default {
    base,
    [VIEW_NAME.pending]: pending,
    [VIEW_NAME.next]: next,
    [VIEW_NAME.all]: all
};
