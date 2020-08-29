const Tutor = require('../../models/tutor');
const Student = require('../../models/student');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.verify = (req, res) => {
  try {
    Tutor.findAll({
      where: { secretToken: req.body.secretToken.trim(), isActive: 0 }
    })
      .then(tutor => {
        if (tutor.length < 1) {
          Student.findAll({
            where: { secretToken: req.body.secretToken.trim(), isActive: 0 }
          }).then(student => {
            if (student.length < 1) {
              return res.status(200).json({
                statusCode: StatusCodes.NotFound,
                message: 'Verification Failed!',
                data: null
              });
            } else if (student.length > 0) {
              db.transaction(async t => {
                await Student.update(
                  {
                    isActive: 1
                  },
                  {
                    where: { secretToken: req.body.secretToken.trim() },
                    transaction: t
                  }
                );
              })
                .then(() => {
                  res.status(200).json({
                    statusCode: StatusCodes.Success,
                    message: 'User Verification Successful!',
                    data: null
                  });
                })
                .catch(e => {
                  res.status(200).json({
                    data: null,
                    message: 'User Verification Failed!',
                    statusCode: StatusCodes.DBError
                  });
                });
            }
          });
        } else if (tutor.length > 0) {
          db.transaction(async t => {
            await Tutor.update(
              {
                isActive: 1
              },
              {
                where: { secretToken: req.body.secretToken.trim() },
                transaction: t
              }
            );
          })
            .then(() => {
              res.status(200).json({
                statusCode: StatusCodes.Success,
                message: 'User Verification Successful!',
                data: null
              });
            })
            .catch(e => {
              res.status(200).json({
                data: null,
                message: 'User Verification Failed!',
                statusCode: StatusCodes.DBError
              });
            });
        }
      })
      .catch(err => {
        res.status(200).json({
          statusCode: StatusCodes.DBError,
          message: 'Verification DB Failed!',
          data: null
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Verification Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
