const Tutor = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../jwtKey');
const Otp = require('../../../common/otp');
const fs = require('fs');

exports.login = (req, res, next) => {
  Tutor.findAll({
    where: { email: req.body.email }
  })
    .then(userItem => {
      if (userItem.length < 1) {
        return res.status(200).json({
          statusCode: StatusCodes.NotFound,
          message: 'Login Failed! Email Does Not Exist!',
          data: null
        });
      } else {
        if (+userItem[0].isActive === 1) {
          bCrypt.compare(req.body.password, userItem[0].password, (err, result) => {
            if (err) {
              return res.status(200).json({
                statusCode: StatusCodes.NotFound,
                message: 'Login Failed! Password Does Not Match!',
                data: null
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: userItem[0].email,
                  userId: userItem[0].id,
                  displayName: userItem[0].firstName + ' ' + userItem[0].lastName
                },
                JWT_KEY,
                {
                  expiresIn: '7d'
                }
              );
              return res.status(200).json({
                statusCode: StatusCodes.Success,
                message: 'Login Successful',
                data: { token: token }
              });
              // });
            } else {
              return res.status(200).json({
                statusCode: StatusCodes.NotFound,
                message: 'Login Failed! Password Does Not Match!',
                data: null
              });
            }
          });
        } else {
          return res.status(200).json({
            statusCode: StatusCodes.Unauthorized,
            message: 'User is not activated.. Verify Email!',
            data: { active: 'false' }
          });
        }
      }
    })
    .catch(err => {
      res.status(200).json({
        statusCode: StatusCodes.DBError,
        message: 'Login Failed',
        data: null
      });
    });
};
