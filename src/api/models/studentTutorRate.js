const Sequelize = require('sequelize');
const db = require('../../config/database');
const Student = require('./student');
const Tutor = require('./tutor');
const Rate = require('./rate');

const StudentTutorRate = db.define(
  'studenttutorrate',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      AllowNull: false,
      autoIncrement: true
    },
    studentId: {
      type: Sequelize.BIGINT,
      AllowNull: false
    },
    tutorId: {
      type: Sequelize.BIGINT,
      AllowNull: false
    },
    rateId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    review: {
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
    tableName: 'studenttutorrate'
  }
);

StudentTutorRate.belongsTo(Student);
Student.hasMany(StudentTutorRate);

StudentTutorRate.belongsTo(Tutor);
Tutor.hasMany(StudentTutorRate);

StudentTutorRate.belongsTo(Rate);
Rate.hasMany(StudentTutorRate);

module.exports = StudentTutorRate;
