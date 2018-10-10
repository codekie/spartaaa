const request = require('supertest'),
    { app, start, stop } = require('./server'),
    appConfig = require('../../config/app');

const URL__PING = '/api/ping';

describe('Server >', () => {
    test('It should respond to the ping-request', async () => {
        await start({ port: appConfig.test.server.port });
        const response = await request(app).get(URL__PING);
        expect(response.statusCode).toBe(200);
        await stop();
    });
});
