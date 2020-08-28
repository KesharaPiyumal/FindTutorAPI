const Sequelize = require('sequelize');
const DB = require('../auth/db_mysql');

module.exports = new Sequelize(DB.DB_SCHEMA, DB.USER_NAME, DB.PASSWORD, {
  host: DB.HOST,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      key: null,
      cert: null,
      ca: null
    }
  },
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1
  }
});
