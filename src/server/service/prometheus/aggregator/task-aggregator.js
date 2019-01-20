const SYM__KEY = Symbol('key'),
    SEPARATOR = '␞';

module.exports = {
    aggregate
};

function aggregate(ClassMetric, tasks) {
    const metrics = {};
    tasks.forEach((task) => {
        const metricsOfTask = ClassMetric.createMetricOf(task);
        (Array.isArray(metricsOfTask)
            ? metricsOfTask
            : [metricsOfTask]
        ).forEach((metric) => {
            const key = _createKey(metric),
                matchtingMetric = metrics[key];
            if (matchtingMetric) {
                matchtingMetric[ClassMetric.PROP_VALUE]++;
                return;
            }
            metric[SYM__KEY] = key;
            metrics[key] = metric;
        });
    });
    return Object.values(metrics)
        .sort((metric1, metric2) => (
            -1 * (metric1[SYM__KEY] <= metric2[SYM__KEY]) + (metric1[SYM__KEY] >= metric2[SYM__KEY])
        ));
}

function _createKey(metric) {
    return Object.keys(metric)
        .map(prop => `${ prop }${ SEPARATOR }${ metric[prop] }`)
        .join(`${ SEPARATOR }${ SEPARATOR }`);
}
