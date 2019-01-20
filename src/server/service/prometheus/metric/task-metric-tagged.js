const PROP__TOTAL = 'total',
    PROP__TAGS = 'tags',
    PROP__ACTIVE = 'active';

/*
* Don't use this metric to calculate totals, since the tags may produce multiple entries per task
*/
module.exports = class TaskMetricTagged {
    static NAME = 'tasks_tagged';
    static PROP_VALUE = PROP__TOTAL;

    static createMetricOf(task) {
        const metric = new TaskMetricTagged();
        Object.keys(metric)
            .forEach((prop) => {
                switch (prop) {
                    case PROP__TOTAL:
                    case PROP__TAGS:
                        return;
                    case PROP__ACTIVE:
                        metric[PROP__ACTIVE] = !!task.start;
                        return;
                    default:
                        metric[prop] = task[prop];
                }
            });

        return task.tags && task.tags.length
            ? task.tags
                .map((tag) => {
                    const clonedMetric = TaskMetricTagged.clone(metric);
                    clonedMetric.tag = tag;
                    return clonedMetric;
                })
            : [metric];
    }

    static clone(orig) {
        const clone = new TaskMetricTagged();
        Object.keys(clone)
            .forEach(prop => clone[prop] = orig[prop]);
        return clone;
    }

    active = false;
    status = null;
    priority = null;
    project = null;
    tag = null;

    [PROP__TOTAL] = 1;

    constructor() {
    }
};
