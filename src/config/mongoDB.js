const mongoose = require('mongoose');
const mongoCredentials = require('../auth/mongoCredentials');
const URI = 'mongodb+srv://'+mongoCredentials.USER+':'+mongoCredentials.PASSWORD+'@ysadmincluster-c94ym.mongodb.net/test?retryWrites=true&w=majority';
const connectMongoDB = async () => {
  await mongoose
    .connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, poolSize: 100 })
    .then(() => {
      console.log('Mongo DB Connected..!');
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = connectMongoDB;
