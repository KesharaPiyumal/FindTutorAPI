const express = require('express');
const router = express.Router();
const userLoginC = require('../../controllers/common/userLoginC');
const userVerifyC = require('../../controllers/common/userVerifyC');

router.post(
  '/login',
  (req, res, next) => {
    next();
  },
  userLoginC.login
);

router.post(
  '/verify',
  (req, res, next) => {
    next();
  },
  userVerifyC.verify
);

module.exports = router;
