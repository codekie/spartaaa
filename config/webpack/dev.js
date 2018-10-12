const appConfig = require('../app'),
    sharedConfig = require('./shared');

const config = Object.assign(
    {},
    sharedConfig,
    {
        devtool: 'cheap-module-eval-source-map',
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
