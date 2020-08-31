const Student = require('../../models/student');
const Tutor = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const UserType = require('../../../common/userType');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../jwtKey');
const Otp = require('../../../common/otp');
const fs = require('fs');

exports.login = (req, res, next) => {
  Student.findAll({
    where: { email: req.body.email }
  })
    .then(userItem1 => {
      if (userItem1.length < 1) {
        Tutor.findAll({
          where: { email: req.body.email }
        })
          .then(userItem2 => {
            if (userItem2.length < 1) {
              return res.status(200).json({
                statusCode: StatusCodes.NotFound,
                message: 'Login Failed! Email Does Not Exist!',
                data: null
              });
            } else {
              if (+userItem2[0].isActive === 1) {
                bCrypt.compare(req.body.password, userItem2[0].password, (err, result) => {
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
                        email: userItem2[0].email,
                        userId: userItem2[0].id,
                        latitude: userItem2[0].latitude,
                        longitude: userItem2[0].longitude,
                        displayName: userItem2[0].firstName + ' ' + userItem2[0].lastName
                      },
                      JWT_KEY,
                      {
                        expiresIn: '7d'
                      }
                    );
                    return res.status(200).json({
                      statusCode: StatusCodes.Success,
                      message: 'Login Successful',
                      data: { token: token, type: UserType.Tutor }
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
          .catch(e => {
            res.status(200).json({
              statusCode: StatusCodes.DBError,
              message: 'Login Failed',
              data: null
            });
          });
      } else {
        if (+userItem1[0].isActive === 1) {
          bCrypt.compare(req.body.password, userItem1[0].password, (err, result) => {
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
                  email: userItem1[0].email,
                  userId: userItem1[0].id,
                  latitude: userItem1[0].latitude,
                  longitude: userItem1[0].longitude,
                  displayName: userItem1[0].firstName + ' ' + userItem1[0].lastName
                },
                JWT_KEY,
                {
                  expiresIn: '7d'
                }
              );
              return res.status(200).json({
                statusCode: StatusCodes.Success,
                message: 'Login Successful',
                data: { token: token, type: UserType.Student }
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
