const Tutor = require('../../models/tutor');
const Exam = require('../../models/exam');
const Medium = require('../../models/medium');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllTutors = (req, res) => {
  Tutor.findAll({
    include: [
      { model: Exam },
      {
        model: Medium
      }
    ],
    order: [['id', 'DESC']]
  })
    .then(usersList => {
      if (usersList.length > 0) {
        res.status(200).json({
          data: usersList,
          message: 'Get all tutor successfully!',
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
      log.error(e);
      return res.status(200).json({
        data: null,
        message: 'Get all user list DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
