const express = require('express');
const router = express.Router();
const mediumsC = require('../controllers/medium/mediumC');

router.post(
  '/getAll',
  (req, res, next) => {
    next();
  },
  mediumsC.getAllMediums
);

module.exports = router;
