const SERVICE_NAME = 'ping',
    RESPONSE = 'pong';

module.exports = {
    name: SERVICE_NAME,
    methods: {
        ping
    },
    restMethods: {
        get: handlePingRequest
    }
};

function handlePingRequest(req, res) {
    res.send(ping());
}

function ping() {
    return RESPONSE;
}
