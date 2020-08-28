const jwt = require('jsonwebtoken');
const StatusCodes = require('../common/statusCodes');
const JWT_KEY = require('../api/jwtKey');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verifiedToken = jwt.verify(token, JWT_KEY);
    req.headers.userId = +verifiedToken.userId;
    next();
  } catch (error) {
    return res.status(200).json({
      message: 'Token Authentication Failed!',
      statusCode: StatusCodes.InvalidToken
    });
  }
};
