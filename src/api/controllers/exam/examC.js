const Exam = require('../../models/exam');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllExams = (req, res) => {
  Exam.findAll({
    order: [['id', 'ASC']]
  })
    .then(examList => {
      if (examList.length > 0) {
        res.status(200).json({
          data: examList,
          message: 'Get all exams successfully!',
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
        message: 'Get all exam list DB error!',
        statusCode: StatusCodes.DBError
      });
    });
  // return res.status(200).json({
  //   data: null,
  //   message: 'Hey!',
  //   statusCode: StatusCodes.DBError
  // });
};
