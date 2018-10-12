import * as WebServer from './server';
import { WebSocketServer } from './websocket';
import * as Watcher from './watcher';

WebServer.start();
WebSocketServer.init();
Watcher.init();
