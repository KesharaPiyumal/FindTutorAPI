const User = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.uploadImage = (req, res) => {
  try {
    db.transaction(async t => {
      const selector = {
        where: { id: +req.header('userId') },
        transaction: t
      };
      let dbStorePicUrl;
      let extension;
      if (req.file.mimetype === 'image/jpg') {
        extension = 'jpg';
      } else if (req.file.mimetype === 'image/jpeg') {
        extension = 'jpeg';
      } else if (req.file.mimetype === 'image/png') {
        extension = 'png';
      }
      dbStorePicUrl = `pro${req.header('userId')}.${extension}`;
      const values = {
        picUrl: dbStorePicUrl,
        mimeType: extension
      };
      await User.update(values, selector);
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Profile Picture Updated!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        return res.status(200).json({
          data: null,
          message: 'Profile Picture Update Error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    return res.status(200).json({
      data: null,
      message: 'Profile Picture Update Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
