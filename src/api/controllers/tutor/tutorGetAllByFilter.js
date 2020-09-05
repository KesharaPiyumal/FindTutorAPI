const Tutor = require('../../models/tutor');
const Exam = require('../../models/exam');
const SubjectTutor = require('../../models/subjectTutor');
const StudentTutorRate = require('../../models/studentTutorRate');
const Subject = require('../../models/subject');
const Medium = require('../../models/medium');
const StatusCodes = require('../../../common/statusCodes');
const GeoDist = require('geodist');

exports.getAllFilteredTutors = (req, res) => {
  try {
    Tutor.findAll({
      include: [{ model: Exam }, { model: Medium }, { model: SubjectTutor, include: [{ model: Subject }] }, { model: StudentTutorRate }],
      order: [['id', 'DESC']]
    })
      .then(usersList => {
        if (usersList.length > 0) {
          const latMy = req.body.lat;
          const lngMy = req.body.lng;
          if (req.body['distanceRange'] && req.body['subjectIds']['length']) {
            const filteredTutorList = getFilteredByDistance(req, usersList);
            const finalFilteredTutorList = getFilteredByMediumAndExamAndSubjects(req, filteredTutorList);
            res.status(200).json({
              data: finalFilteredTutorList,
              message: 'Get all tutor successfully!',
              statusCode: StatusCodes.Success
            });
          } else if (req.body['distanceRange'] === null && req.body['subjectIds']['length']) {
            const tempTutorList = getFilteredByMediumAndExamAndSubjects(req, usersList);
            tempTutorList.forEach(user => {
              user['distanceRange'] = GeoDist(
                { lat: latMy, lon: lngMy },
                { lat: user.latitude, lon: user.longitude },
                { exact: true, unit: 'km' }
              );
            });
            res.status(200).json({
              data: tempTutorList,
              message: 'Get all tutor successfully!',
              statusCode: StatusCodes.Success
            });
          } else if (req.body['distanceRange'] && req.body['subjectIds']['length'] === 0) {
            const tempTutorList = getFilteredByMediumAndExam(req, usersList);
            const finalFilteredTutorList = getFilteredByDistance(req, tempTutorList);
            res.status(200).json({
              data: finalFilteredTutorList,
              message: 'Get all tutor successfully!',
              statusCode: StatusCodes.Success
            });
          } else if (req.body['distanceRange'] === null && req.body['subjectIds']['length'] === 0) {
            const tempTutorList = getFilteredByMediumAndExam(req, usersList);
            tempTutorList.forEach(user => {
              user['distanceRange'] = GeoDist(
                { lat: latMy, lon: lngMy },
                { lat: user.latitude, lon: user.longitude },
                { exact: true, unit: 'km' }
              );
            });
            res.status(200).json({
              data: tempTutorList,
              message: 'Get all tutor successfully!',
              statusCode: StatusCodes.Success
            });
          } else {
            usersList.forEach(user => {
              user['distanceRange'] = GeoDist(
                { lat: latMy, lon: lngMy },
                { lat: user.latitude, lon: user.longitude },
                { exact: true, unit: 'km' }
              );
            });
            res.status(200).json({
              data: usersList,
              message: 'Get all tutor successfully!',
              statusCode: StatusCodes.Success
            });
          }
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
          message: 'Get all user list server error!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (e) {
    return res.status(200).json({
      data: null,
      message: 'Get all user list DB error!',
      statusCode: StatusCodes.DBError
    });
  }
};

function getFilteredByDistance(req, usersList) {
  const latMy = req.body.lat;
  const lngMy = req.body.lng;
  const tutorList = [];
  usersList.forEach(user => {
    user['distanceRange'] = GeoDist({ lat: latMy, lon: lngMy }, { lat: user.latitude, lon: user.longitude }, { exact: true, unit: 'km' });
    if (user['distanceRange'] <= req.body['distanceRange']) {
      tutorList.push(user);
    }
  });
  return tutorList;
}

function getFilteredByMediumAndExamAndSubjects(req, usersList) {
  const finalFilteredTutorList = [];
  usersList.forEach(tutor => {
    if (tutor['examId'] === req.body.examId && tutor['mediumId'] === req.body.mediumId) {
      for (let i = 0; i < tutor['subjectTutors']['length']; i++) {
        if (req.body['subjectIds'].includes(tutor['subjectTutors'][i]['subjectId'])) {
          finalFilteredTutorList.push(tutor);
          break;
        }
      }
    }
  });
  return finalFilteredTutorList;
}

function getFilteredByMediumAndExam(req, usersList) {
  const finalFilteredTutorList = [];
  usersList.forEach(tutor => {
    if (tutor['examId'] === req.body.examId && tutor['mediumId'] === req.body.mediumId) {
      finalFilteredTutorList.push(tutor);
    }
  });
  return finalFilteredTutorList;
}
