const elasticEmail = require('elasticemail');
const client = elasticEmail.createClient({
    username: 'null',
    apiKey: 'null'
});

module.exports = client;
