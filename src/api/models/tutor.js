const Sequelize = require('sequelize');
const db = require('../../config/database');
const Exam = require('./exam');
const Medium = require('./medium');

const Tutor = db.define(
  'tutor',
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
    examId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    mediumId: {
      type: Sequelize.INTEGER,
      AllowNull: false
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
    age: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      AllowNull: false
    },
    isActive: {
      type: Sequelize.INTEGER
    },
    secretToken: {
      type: Sequelize.STRING
    },
    distanceRange: {
      type: Sequelize.NUMBER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'tutor'
  }
);

Tutor.belongsTo(Exam);
Exam.hasMany(Tutor);

Tutor.belongsTo(Medium);
Medium.hasMany(Tutor);

module.exports = Tutor;
