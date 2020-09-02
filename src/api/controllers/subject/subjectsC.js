const Subject = require('../../models/subject');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllSubjectsForExamAndMedium = (req, res) => {
  Subject.findAll({
    where: { examId: req.body['examId'], mediumId: req.body['mediumId'] }
  })
    .then(subjectList => {
      if (subjectList.length > 0) {
        res.status(200).json({
          data: subjectList,
          message: 'Get all subjects successfully!',
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
        message: 'Get all subject list DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
