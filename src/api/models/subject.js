const Sequelize = require('sequelize');
const db = require('../../config/database');
const Exam = require('./exam');
const Medium = require('./medium');

const Subject = db.define(
  'subject',
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
    examId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    mediumId: {
      type: Sequelize.INTEGER,
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
    tableName: 'subject'
  }
);

Subject.belongsTo(Exam);
Exam.hasMany(Subject);

Subject.belongsTo(Medium);
Medium.hasMany(Subject);

module.exports = Subject;
