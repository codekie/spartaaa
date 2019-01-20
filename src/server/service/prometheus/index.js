const _ = require('lodash'),
    { logger } = require('../../util'),
    DB = require('../../db/taskwarrior'),
    TaskMetric = require('./metric/task-metric'),
    TaskMetricTagged = require('./metric/task-metric-tagged'),
    TaskAggregator = require('./aggregator/task-aggregator');

const SERVICE_NAME = 'metrics',
    PREFIX__SPARTAAA = 'spartaaa_';

module.exports = {
    name: SERVICE_NAME,
    basePathService: '',
    methods: {
        getMetrics
    },
    restMethods: {
        get: handleRequest
    }
};

async function handleRequest(req, res, next) {
    logger.info('Metrics have been requested');
    res.send(await getMetrics());
    next();
}

async function getMetrics() {
    const tasks = await DB.fetchTasks(),
        classesMetric = [TaskMetric, TaskMetricTagged],
        aggregations = classesMetric.reduce((res, ClassMetric) => {
            res.push({
                metricName: ClassMetric.NAME,
                propValue: ClassMetric.PROP_VALUE,
                metrics: TaskAggregator.aggregate(ClassMetric, tasks)
            });
            return res;
        }, []);
    return serializeMetrics(aggregations);
}

function serializeMetrics(aggregations) {
    return aggregations
        .reduce((res, aggregation) => {
            res.splice(res.length, 0,
                ...aggregation.metrics.map(
                    (metric) => serializeSingleMetric(aggregation.metricName, aggregation.propValue, metric)
                )
            );
            return res;
        }, [])
        .join('\n');
}

function serializeSingleMetric(metricName, propValue, metric) {
    const value = metric[propValue],
        labels = Object
            .keys(metric)
            .reduce((res, prop) => {
                if (propValue === prop) { return res; }
                res.push(`${ _.snakeCase(prop) }="${ _.snakeCase(metric[prop]) }"`);
                return res;
            }, []);
    return `${ PREFIX__SPARTAAA }${ metricName }{${ labels.join(', ') }} ${ value }`;
}
