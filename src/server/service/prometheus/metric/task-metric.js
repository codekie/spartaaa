const PROP__TOTAL = 'total',
    PROP__TAGS = 'tags',
    PROP__ACTIVE = 'active';

module.exports = class TaskMetric {
    static NAME = 'tasks_total';
    static PROP_VALUE = PROP__TOTAL;

    static createMetricOf(task) {
        const metric = new TaskMetric();
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
        return metric;
    }

    static clone(orig) {
        const clone = new TaskMetric();
        Object.keys(clone)
            .forEach(prop => clone[prop] = orig[prop]);
        return clone;
    }

    active = false;
    status = null;
    priority = null;
    project = null;

    [PROP__TOTAL] = 1;

    constructor() {
    }
};
