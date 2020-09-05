// const Tutor = require('../../models/tutor');
// const Student = require('../../models/student');
// const Rate = require('../../models/rate');
const StudentTutorRate = require('../../models/studentTutorRate');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.rateTutor = (req, res) => {
  try {
    db.transaction(async t => {
      const studentTutorRateRecord = await StudentTutorRate.findOne(
        {
          where: { studentId: req.body.studentId, tutorId: req.body.tutorId }
        },
        { transaction: t }
      );
      if (studentTutorRateRecord) {
        await StudentTutorRate.update(
          { rateId: req.body.rateId },
          { where: { studentId: req.body.studentId, tutorId: req.body.tutorId }, transaction: t }
        );
      } else {
        await StudentTutorRate.create(
          {
            studentId: req.body.studentId,
            tutorId: req.body.tutorId,
            rateId: req.body.rateId
          },
          { transaction: t }
        );
      }
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Rated successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(error => {
        console.log(error);
        res.status(200).json({
          data: null,
          message: 'Rating failed!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Rating Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
