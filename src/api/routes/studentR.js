const express = require('express');
const router = express.Router();
const StatusCodes = require('../../common/statusCodes');
const studentRegisterC = require('../controllers/student/studentRegisterC');

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

module.exports = router;
