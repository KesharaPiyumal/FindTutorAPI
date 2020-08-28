const Sequelize = require('sequelize');
const db = require('../../config/database');
const Subject = require('./subject');
const Tutor = require('./tutor');

const SubjectTutor = db.define(
  'subjectTutor',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    tutorId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    subjectId: {
      type: Sequelize.BIGINT,
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
    tableName: 'subjectTutor'
  }
);
SubjectTutor.belongsTo(Subject);
Subject.hasMany(SubjectTutor);

SubjectTutor.belongsTo(Tutor);
Tutor.hasMany(SubjectTutor);

module.exports = SubjectTutor;
