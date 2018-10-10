// IMPORTS

const winston = require('winston'),
    { combine, timestamp, printf } = winston.format;

// CONSTANTS

const LOG_LEVEL_CONFIG = winston.config.npm;

// PRIVATE STATICS

const _logger = _createLogger();
let _transactionIdStack = [];

// EXPORT API

const API = {
    LOG_LEVEL: Object.keys(LOG_LEVEL_CONFIG.levels)
        .reduce((res, name) => Object.assign(res, { [name]: name }), {}),   // Create enum for supported log-levels
    startTransaction,
    stopTransaction
    // There will be a log-method per serverity bound to this API
    // eg. error(..), info(..), ...
};
_bindLoggers(API, _logger);
module.exports = API;

// IMPLEMENTATION DETAILS

// Public

function log() {
    return _logger.log.apply(_logger, arguments);
}

// Private

function _createLogger() {
    winston.addColors(LOG_LEVEL_CONFIG.colors);
    // Create logger-instance
    return winston.createLogger({
        level: _getLogLevel({ process }),
        levels: LOG_LEVEL_CONFIG.levels,
        format: combine(
            winston.format.colorize(),
            timestamp(),
            printf((info) => `${ info.timestamp } [${ info.level }] ${info.message}`)
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
}

function _getLogLevel({ process }) {
    return process.env.LOG_LEVEL || 'info';
}

function startTransaction(transactionId) {
    _transactionIdStack.push(transactionId);
}

function stopTransaction() {
    _transactionIdStack.pop();
}

function _bindLoggers(api, logger) {
    Object.keys(LOG_LEVEL_CONFIG.levels).forEach(severity => {
        // No arrow-function here. We need the arguments from anon function
        api[severity] = function() { _log(logger, severity, ...arguments); }
    });
}

function _getCurrentTransactionId() {
    return _transactionIdStack[_transactionIdStack.length - 1];
}

function _log(logger, severity, message) {
    const transactionId = _getCurrentTransactionId();
    logger.log(severity, `[${ transactionId }]: ${ message }`);
    // Print stacktrace, if available
    message instanceof Error && message.stack && logger.log(severity, `[${ transactionId }]: ${ message.stack }`);
}
