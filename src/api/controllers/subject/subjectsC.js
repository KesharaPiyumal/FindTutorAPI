const Subject = require('../../models/subject');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllSubjectsForExamAndMedium = (req, res) => {
  Subject.findAll({
    where: { examId: req.body['examId'] }
  })
    .then(subjectList => {
      if (subjectList.length > 0) {
        const subjectsArray = [];
        subjectList.forEach(item => {
          if (item.mediumId === req.body['mediumId'] || item.mediumId === 3) {
            subjectsArray.push(item);
          }
        });
        res.status(200).json({
          data: subjectsArray,
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
      log.error(e);
      return res.status(200).json({
        data: null,
        message: 'Get all subject list DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
