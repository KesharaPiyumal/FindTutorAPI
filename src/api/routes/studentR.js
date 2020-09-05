const express = require('express');
const router = express.Router();
const studentRegisterC = require('../controllers/student/studentRegisterC');
const rateTutorC = require('../controllers/student/rateTutorC');
const StatusCodes = require('../../common/statusCodes');

const getAllUsersC = require('../controllers/tutor/tutorGetAllC');
const uploadProfileImageC = require('../controllers/tutor/uploadProfileImageC');
const getProfileImageC = require('../controllers/tutor/getProfileImageC');
const upload = require('../helpers/imageUploader');
// const checkToken = require('../../auth/checkToken');

router.post(
  '/register',
  (req, res, next) => {
    next();
  },
  studentRegisterC.register
);

router.post(
  '/rateTutor',
  (req, res, next) => {
    next();
  },
  rateTutorC.rateTutor
);

module.exports = router;
