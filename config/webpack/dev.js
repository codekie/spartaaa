const appConfig = require('../app'),
    sharedConfig = require('./shared');

const config = Object.assign(
    {},
    sharedConfig,
    {
        devServer: {
            port: appConfig.dev.client.devServer.port,
            proxy: {
                [appConfig.server.basePathServices]: appConfig.server.host,
                changeOrigin: true
            }
        }
    }
);

module.exports = config;
