const Sequelize = require('sequelize');
const db = require('../../config/database');

const Student = db.define(
  'student',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      require: true
    },
    lastName: {
      type: Sequelize.STRING,
      require: true
    },
    email: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    password: {
      type: Sequelize.STRING,
      AllowNull: false,
      validate: {
        min: 6
      }
    },
    mobileNumber: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    latitude: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    longitude: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    address: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    isActive: {
      type: Sequelize.INTEGER
    },
    secretToken: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'student'
  }
);

module.exports = Student;
