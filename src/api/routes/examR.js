const express = require('express');
const router = express.Router();
const examsC = require('../controllers/exam/examC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  examsC.getAllExams
);

module.exports = router;
