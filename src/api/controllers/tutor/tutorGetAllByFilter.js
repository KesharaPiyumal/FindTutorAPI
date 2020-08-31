const Tutor = require('../../models/tutor');
const Exam = require('../../models/exam');
const SubjectTutor = require('../../models/subjectTutor');
const Subject = require('../../models/subject');
const Medium = require('../../models/medium');
const StatusCodes = require('../../../common/statusCodes');
const GeoDist = require('geodist');
const log = require('log4js').getLogger('tutorFilter');

exports.getAllFilteredTutors = (req, res) => {
  try {
    Tutor.findAll({
      include: [{ model: Exam }, { model: Medium }, { model: SubjectTutor, include: [{ model: Subject }] }],
      order: [['id', 'DESC']]
    })
      .then(usersList => {
        const latMy = req.body.lat;
        const lngMy = req.body.lng;
        if (usersList.length > 0) {
          const tutorList = [];
          usersList.forEach(user => {
            const distance = GeoDist({ lat: latMy, lon: lngMy }, { lat: user.latitude, lon: user.longitude }, { exact: true, unit: 'km' });
            if (distance <= req.body['distanceRange']) {
              tutorList.push(user);
            }
          });
          res.status(200).json({
            data: tutorList,
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
          message: 'Get all user list server error!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (e) {
    log.error(e);
    return res.status(200).json({
      data: null,
      message: 'Get all user list DB error!',
      statusCode: StatusCodes.DBError
    });
  }
};
