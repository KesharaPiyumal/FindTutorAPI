const elasticEmail = require('elasticemail');
const client = elasticEmail.createClient({
    username: 'kesharapiyumal2016@gmail.com',
    apiKey: '4A5D9C8CF47241147293F412146450A0CF2098013179754BF3E8F5BF6841B9B0A33786F21C73B9CF5B2899C9AB194E2E'
});

module.exports = client;
