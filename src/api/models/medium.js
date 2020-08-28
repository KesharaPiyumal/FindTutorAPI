const Sequelize = require('sequelize');
const db = require('../../config/database');

const Medium = db.define(
  'medium',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      require: true,
      AllowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'medium'
  }
);

module.exports = Medium;
