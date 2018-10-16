import * as WebServer from './server';
import { WebSocketServer } from './websocket';
import * as Watcher from './watcher';
import { logger } from './util';

process.on('unhandledRejection', e => logger.error(e));

WebServer.start();
WebSocketServer.init();
Watcher.init();
