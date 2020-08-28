const express = require('express');
const router = express.Router();
const subjectsC = require('../controllers/subject/subjectsC');

router.post(
  '/getAll',
  (req, res, next) => {
    next();
  },
  subjectsC.getAllSubjectsForExamAndMedium
);

module.exports = router;
