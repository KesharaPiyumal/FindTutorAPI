const Sequelize = require('sequelize');

module.exports = new Sequelize('findtutor_db', 'ft_admin@findtutor', 'KPkln@se96', {
  host: 'findtutor.mysql.database.azure.com',
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
