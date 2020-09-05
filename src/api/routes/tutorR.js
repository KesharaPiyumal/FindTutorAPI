const express = require('express');
const router = express.Router();
const StatusCodes = require('../../common/statusCodes');
const tutorRegisterC = require('../controllers/tutor/tutorRegisterC');
const updateTutorC = require('../controllers/tutor/updateTutorC');
const getAllTutorC = require('../controllers/tutor/tutorGetAllC');
const getAllTutorFilteredC = require('../controllers/tutor/tutorGetAllByFilter');

const uploadProfileImageC = require('../controllers/tutor/uploadProfileImageC');
const getProfileImageC = require('../controllers/tutor/getProfileImageC');
const upload = require('../helpers/imageUploader');
// const checkToken = require('../../auth/checkToken');

router.post(
  '/register',
  (req, res, next) => {
    next();
  },
  tutorRegisterC.register
);

router.post(
  '/all',
  (req, res, next) => {
    next();
  },
  getAllTutorC.getAllTutors
);

router.post(
  '/filteredAll',
  (req, res, next) => {
    next();
  },
  getAllTutorFilteredC.getAllFilteredTutors
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  updateTutorC.update
);

// router.post(
//   '/uploadProfileImage',
//     upload.single('file'),
//   (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//       return res.status(200).json({
//         data: null,
//         message: 'Image Not Uploaded!',
//         statusCode: StatusCodes.ServerError
//       });
//     } else {
//       next();
//     }
//   },
//   uploadProfileImageC.uploadImage
// );
//
// router.get(
//   '/getProfileImage',
//   (req, res, next) => {
//     next();
//   },
//   getProfileImageC.getImage
// );
//
// router.get(
//   '/',
//   (req, res, next) => {
//     next();
//   },
//   getAllUsersC.getAllUsers
// );
//

module.exports = router;
