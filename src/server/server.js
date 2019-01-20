const express = require('express'),
    addRequestId = require('express-request-id'),
    appConfig = require('../../config/app'),
    { logger } = require('./util'),
    services = require('./service');

const _inst = _init();

module.exports = {
    app: _inst.app,
    start,
    stop
};

function start({ port } = {}) {
    return _startApp(_inst, port);
}

function stop() {
    return _inst.server.close();
}

function _init() {
    const app = express();
    _useMiddlewares({ app });
    _mountStaticFolders({ app });
    _mountServices({ app });
    return { app };
}

function _useMiddlewares({ app }) {
    app.use(addRequestId());
}

function _mountStaticFolders({ app }) {
    app.use(express.static(appConfig.build.outputPath));
}

function _mountServices({ app }) {
    Object.keys(services)
        .forEach(name => {
            const serviceConfig = services[name];
            Object.keys(serviceConfig.restMethods)
                .forEach(httpMethod => {
                    const handler = serviceConfig.restMethods[httpMethod],
                        basePathService = serviceConfig.basePathService != null
                            ? serviceConfig.basePathService
                            : appConfig.server.basePathServices;
                    app[httpMethod](`${ basePathService }/${ serviceConfig.name }`, handler);
                });
        });
}

function _startApp(inst, port = appConfig.server.port) {
    const { app } = inst;
    return new Promise(resolve => {
        inst.server = app.listen(port, () => {
            logger.info(`Listening on port ${ port }`);
            resolve();
        });
    });
}
