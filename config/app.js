const path = require('path');

const DEFAULT__PORT__DEV_SERVER = 8080,
    DEFAULT__PORT__SERVER = 3000,
    DEFAULT__PROTOCOL__SERVER = 'http',
    DEFAULT__HOSTNAME__SERVER = 'localhost',
    ENV__PORT__SERVER = 'port',
    ENV__PORT__DEV__SERVER = 'port-dev',
    BASE_PATH__SERVICES = '/api',
    PATH__PROJECT_BASE = path.join(__dirname, '..'),
    PATH__BUILD_OUTPUT = path.join(PATH__PROJECT_BASE, 'dist'),
    PATH__SERVER__STATIC_FILES = path.join(PATH__PROJECT_BASE, 'src/server/static'),
    FILEPATH__DEV__ENTRY__CLIENT = path.join(PATH__PROJECT_BASE, 'src/client/index.js'),
    FILEPATH__BUILD__CLIENT__TEMPLATE = path.join(PATH__PROJECT_BASE, 'src/client/index.html'),
    FILEPATH__OUTPUT__CLIENT__TEMPLATE = path.join(PATH__BUILD_OUTPUT, 'index.html'),
    FILENAME__ENTRY__CLIENT = 'app.js',
    FILENAME__ENTRY__SERVER = 'server.js';

const config = _createConfig();

// TODO log config to console, in DEV-mode

module.exports = config;

function _createConfig() {
    return {
        entry: _createEntryConfig(),
        server: _createServerConfig(),
        dev: _createDevConfig(),
        build: _createBuildConfig()
    };
}

function _createEntryConfig() {
    return {
        server: path.join(PATH__BUILD_OUTPUT, FILENAME__ENTRY__SERVER),
        client: path.join(PATH__BUILD_OUTPUT, FILENAME__ENTRY__CLIENT)
    };
}

function _createServerConfig() {
    const port = process.env[ENV__PORT__SERVER] || DEFAULT__PORT__SERVER;
    return {
        port,
        host: `${ DEFAULT__PROTOCOL__SERVER }://${ DEFAULT__HOSTNAME__SERVER }:${ port }`,
        basePathServices: BASE_PATH__SERVICES,
        pathStaticFiles: PATH__SERVER__STATIC_FILES
    };
}

function _createDevConfig() {
    return {
        client: {
            filepathEntry: FILEPATH__DEV__ENTRY__CLIENT,
            devServer: {
                port: process.env[ENV__PORT__DEV__SERVER] || DEFAULT__PORT__DEV_SERVER
            }
        }
    };
}

function _createBuildConfig() {
    return {
        outputPath: PATH__BUILD_OUTPUT,
        client: {
            input: {
                filepathTemplate: FILEPATH__BUILD__CLIENT__TEMPLATE
            },
            output: {
                filenameScript: FILENAME__ENTRY__CLIENT,
                filepathTemplate: FILEPATH__OUTPUT__CLIENT__TEMPLATE,
                path: PATH__BUILD_OUTPUT
            }
        },
        server: {
            outputFilename: FILENAME__ENTRY__SERVER
        }
    };
}
