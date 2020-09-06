const Tutor = require('../../models/tutor');
const Exam = require('../../models/exam');
const SubjectTutor = require('../../models/subjectTutor');
const StudentTutorRate = require('../../models/studentTutorRate');
const Subject = require('../../models/subject');
const Medium = require('../../models/medium');
const StatusCodes = require('../../../common/statusCodes');

exports.getOneTutor = (req, res) => {
  Tutor.findOne({
    include: [{ model: Exam }, { model: Medium }, { model: SubjectTutor, include: [{ model: Subject }] }, { model: StudentTutorRate }],
    where: { id: req.body.tutorId }
  })
    .then(tutor => {
      if (tutor) {
        res.status(200).json({
          data: tutor,
          message: 'Get tutor successfully!',
          statusCode: StatusCodes.Success
        });
      } else {
        res.status(200).json({
          data: [],
          message: 'No Entries Found',
          statusCode: StatusCodes.Success
        });
      }
    })
    .catch(e => {
      return res.status(200).json({
        data: null,
        message: 'Get tutor DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
