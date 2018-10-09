const SERVICE_NAME = 'ping',
    RESPONSE = 'pong';

module.exports = {
    name: SERVICE_NAME,
    methods: {
        get: ping
    }
};

function ping(req, res) {
    res.send(RESPONSE);
}
