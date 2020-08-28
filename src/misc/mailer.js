const elasticEmail = require('elasticemail');
const elasticMailer = require('../auth/mailerCredentials');
const client = elasticEmail.createClient({
  username: elasticMailer.USER_NAME,
  apiKey: elasticMailer.KEY
});

module.exports = client;
