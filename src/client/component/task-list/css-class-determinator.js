const PRIORITY_HIGH = 'H',
    TAG__BUG = 'bug',
    TAG__NEXT = 'next',
    CLASS_NAME__ACTIVE = 'status-active',
    CLASS_NAME__PRIORITY__H = 'prio-high',
    CLASS_NAME__TAG__BUG = 'tag-bug',
    CLASS_NAME__TAG__NEXT = 'tag-next';

export default determineClassNames;

function determineClassNames(task) {
    const classNames = [],
        tags = task.tags || [];
    tags.includes(TAG__BUG) && classNames.push(CLASS_NAME__TAG__BUG);
    tags.includes(TAG__NEXT) && classNames.push(CLASS_NAME__TAG__NEXT);
    task.start && classNames.push(CLASS_NAME__ACTIVE);
    task.priority === PRIORITY_HIGH && classNames.push(CLASS_NAME__PRIORITY__H);
    return classNames.join(' ');
}
