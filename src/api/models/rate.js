const Sequelize = require('sequelize');
const db = require('../../config/database');

const Rate = db.define(
  'rate',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      require: true
    },
    value: {
      type: Sequelize.INTEGER,
      require: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'rate'
  }
);

module.exports = Rate;
