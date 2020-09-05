const Tutor = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.update = (req, res) => {
  try {
    db.transaction(async t => {
      const tutor = await Tutor.findOne(
        {
          where: { id: req.body.tutorId }
        },
        { transaction: t }
      );
      if (tutor) {
        await Tutor.update({ about: req.body.about }, { where: { id: req.body.tutorId }, transaction: t });
      }
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Rated successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(error => {
        console.log(error);
        res.status(200).json({
          data: null,
          message: 'Rating failed!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Tutor update Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
