import TaskStatus from '../../../comm/task-status';

const PRIORITY_HIGH = 'H',
    TAG__BUG = 'bug',
    TAG__NEXT = 'next',
    CLASS_NAME__STATUS__ACTIVE = 'status-active',
    CLASS_NAME__STATUS__COMPLETED = 'status-completed',
    CLASS_NAME__PRIORITY__H = 'prio-high',
    CLASS_NAME__TAG__BUG = 'tag-bug',
    CLASS_NAME__TAG__NEXT = 'tag-next';

export default determineClassNames;

function determineClassNames(task) {
    const classNames = [],
        { tags = [], start, status, priority } = task;
    tags.includes(TAG__BUG) && classNames.push(CLASS_NAME__TAG__BUG);
    tags.includes(TAG__NEXT) && classNames.push(CLASS_NAME__TAG__NEXT);
    start && classNames.push(CLASS_NAME__STATUS__ACTIVE);
    status === TaskStatus.completed && classNames.push(CLASS_NAME__STATUS__COMPLETED);
    priority === PRIORITY_HIGH && classNames.push(CLASS_NAME__PRIORITY__H);
    return classNames.join(' ');
}
