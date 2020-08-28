const Tutor = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.verify = (req, res) => {
  try {
    Tutor.findAll({
      where: { secretToken: req.body.secretToken.trim(), isActive: 0 }
    })
      .then(user => {
        if (user.length < 1) {
          return res.status(200).json({
            statusCode: StatusCodes.NotFound,
            message: 'Verification Failed!',
            data: null
          });
        } else if (user.length > 0) {
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
