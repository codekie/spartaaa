const express = require('express'),
    appConfig = require('../../config/app'),
    services = require('./service');

_init();

function _init() {
    const app = express();
    _mountStaticFolders({ app });
    _mountServices({ app });
    _startApp(app);
}

function _mountStaticFolders({ app }) {
    app.use(express.static(appConfig.build.outputPath));
}

function _mountServices({ app }) {
    Object.keys(services)
        .forEach(name => {
            const serviceConfig = services[name];
            Object.keys(serviceConfig.methods)
                .forEach(httpMethod => {
                    const handler = serviceConfig.methods[httpMethod];
                    app[httpMethod](`${ appConfig.server.basePathServices }/${ serviceConfig.name }`, handler);
                });
        });
}

function _startApp(app) {
    const port = appConfig.server.port;
    // TODO use winston-logger
    app.listen(port, () => console.log(`Listening on port ${ port }`));
}
