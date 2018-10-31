const path = require('path'),
    os = require('os');

const DEFAULT__PORT__DEV_SERVER = 8080,
    DEFAULT__PORT__SERVER = 3010,
    DEFAULT__PORT__SERVER__WEBSOCKET = 40520,
    DEFAULT__PORT__TEST__SERVER = 3020,
    DEFAULT__PROTOCOL__SERVER = 'http',
    DEFAULT__PROTOCOL__SERVER__WEBSOCKET = 'ws',
    DEFAULT__HOSTNAME__SERVER = 'localhost',
    DEFAULT__PATH__TASKWARRIOR_DATA = `${ os.homedir() }/.task`,
    DEFAULT__FILE_WATCH__DEBOUNCE_DURATION = 20,
    ENV_PREFIX = 'SPARTAAA_',
    ENV__PORT__SERVER = `${ ENV_PREFIX }PORT`,
    ENV__PORT__SERVER__WEBSOCKET = `${ ENV_PREFIX }PORT_WEBSOCKET`,
    ENV__PORT__DEV__SERVER = `${ ENV_PREFIX }PORT_DEV`,
    ENV__PATH__TASKWARRIOR_DATA = `${ ENV_PREFIX }PATH_TASKWARRIOR_DATA`,
    BASE_PATH__SERVICES = '/api',
    PATH__PROJECT_BASE = path.join(__dirname, '..'),
    PATH__BUILD_OUTPUT = path.join(PATH__PROJECT_BASE, 'dist'),
    PATH__SERVER__STATIC_FILES = path.join(PATH__PROJECT_BASE, 'src/server/static'),
    FILEPATH__DEV__ENTRY__CLIENT = path.join(PATH__PROJECT_BASE, 'src/client/index.jsx'),
    FILEPATH__BUILD__CLIENT__TEMPLATE = path.join(PATH__PROJECT_BASE, 'src/client/index.html'),
    FILEPATH__OUTPUT__CLIENT__TEMPLATE = path.join(PATH__BUILD_OUTPUT, 'index.html'),
    FILENAME__ENTRY__SERVER = 'server.js';

const config = _createConfig();

// TODO log config to console, in DEV-mode

module.exports = config;

function _createConfig() {
    return {
        entry: _createEntryConfig(),
        server: _createServerConfig(),
        dev: _createDevConfig(),
        test: _createTestConfig(),
        build: _createBuildConfig()
    };
}

function _createEntryConfig() {
    return {
        server: path.join(PATH__BUILD_OUTPUT, FILENAME__ENTRY__SERVER)
    };
}

function _createServerConfig() {
    const port = process.env[ENV__PORT__SERVER] || DEFAULT__PORT__SERVER,
        portWebSocket = process.env[ENV__PORT__SERVER__WEBSOCKET] || DEFAULT__PORT__SERVER__WEBSOCKET;
    return {
        port,
        host: `${ DEFAULT__PROTOCOL__SERVER }://${ DEFAULT__HOSTNAME__SERVER }:${ port }`,
        basePathServices: BASE_PATH__SERVICES,
        pathStaticFiles: PATH__SERVER__STATIC_FILES,
        pathTaskwarriorData: process.env[ENV__PATH__TASKWARRIOR_DATA] || DEFAULT__PATH__TASKWARRIOR_DATA,
        fileWatch: {
            debounceDuration: DEFAULT__FILE_WATCH__DEBOUNCE_DURATION
        },
        websocket: {
            port: portWebSocket,
            host: `${ DEFAULT__PROTOCOL__SERVER__WEBSOCKET }://${ DEFAULT__HOSTNAME__SERVER }:${ portWebSocket }`
        }
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

function _createTestConfig() {
    return {
        server: {
            port: DEFAULT__PORT__TEST__SERVER
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
                filepathTemplate: FILEPATH__OUTPUT__CLIENT__TEMPLATE,
                path: PATH__BUILD_OUTPUT
            }
        },
        server: {
            outputFilename: FILENAME__ENTRY__SERVER
        }
    };
}
