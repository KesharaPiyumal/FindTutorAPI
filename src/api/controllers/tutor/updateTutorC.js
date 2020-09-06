const Tutor = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');
const Axios = require('axios');
const config = require('../../../auth/gMapAPIKey');

exports.update = (req, res) => {
  try {
    Axios.post(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.body.latitude + ',' + req.body.longitude + '&key=' + config.key
    )
      .then(response => {
        if (response) {
          const gAddress = response['data']['results'][0]['formatted_address'];
          db.transaction(async t => {
            const tutor = await Tutor.findOne(
              {
                where: { id: req.body.tutorId }
              },
              { transaction: t }
            );
            if (tutor) {
              await Tutor.update({ about: req.body.about, geoAddress: gAddress }, { where: { id: req.body.tutorId }, transaction: t });
            }
          })
            .then(() => {
              res.status(200).json({
                data: null,
                message: 'Updated successfully!',
                statusCode: StatusCodes.Success
              });
            })
            .catch(error => {
              console.log(error);
              res.status(200).json({
                data: null,
                message: 'Update failed!',
                statusCode: StatusCodes.ServerError
              });
            });
        }
      })
      .catch(error => {
        res.status(200).json({
          data: null,
          message: 'Tutor update Server Error!',
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
