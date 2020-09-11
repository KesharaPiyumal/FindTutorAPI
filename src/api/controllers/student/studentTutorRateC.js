const Student = require('../../models/student');
const StudentTutorRate = require('../../models/studentTutorRate');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.getAllStudentTutorRate = (req, res) => {
  StudentTutorRate.findAll({
    include: [{ model: Student }],
    where: { tutorId: req.body.tutorId },
    order: [['id', 'DESC']]
  })
    .then(list => {
      if (list.length > 0) {
        const fList = [];
        list.forEach(item => {
          if (item.review) {
            fList.push(item);
          }
        });
        res.status(200).json({
          data: fList,
          message: 'Get all successfully!',
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
        message: 'Get all list DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};

exports.addReview = (req, res) => {
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
          { review: req.body.review },
          { where: { studentId: req.body.studentId, tutorId: req.body.tutorId }, transaction: t }
        );
      } else {
        await StudentTutorRate.create(
          {
            studentId: req.body.studentId,
            tutorId: req.body.tutorId,
            review: req.body.review
          },
          { transaction: t }
        );
      }
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Review added successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(error => {
        console.log(error);
        res.status(200).json({
          data: null,
          message: 'Review adding failed!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      message: 'Review adding Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
