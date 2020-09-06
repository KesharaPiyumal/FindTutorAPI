const Tutor = require('../../models/tutor');
const SubjectTutor = require('../../models/subjectTutor');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');
const bCrypt = require('bcryptjs');
const randomString = require('randomstring');
const elasticMailer = require('../../../misc/mailer');
const Axios = require('axios');
const config = require('../../../auth/gMapAPIKey');

exports.register = (req, res) => {
  try {
    Axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.body.lat + ',' + req.body.lon + '&key=' + config.key)
      .then(response => {
        if (response) {
          const gAddress = response['data']['results'][0]['formatted_address'];
          Tutor.findAll({
            where: { email: req.body.email }
          })
            .then(userItem => {
              if (userItem.length > 0) {
                return res.status(200).json({
                  data: null,
                  message: 'Email already exists!',
                  statusCode: StatusCodes.ValidationError
                });
              } else {
                bCrypt.hash(req.body.password, 10, (err, hash) => {
                  if (err) {
                    return res.status(200).json({
                      data: null,
                      message: 'Tutor Create Server Error!',
                      statusCode: StatusCodes.ServerError
                    });
                  } else {
                    const secretToken = randomString.generate();
                    db.transaction(async t => {
                      await Tutor.create(
                        {
                          firstName: req.body.firstName,
                          lastName: req.body.lastName,
                          mediumId: req.body.mediumId,
                          examId: req.body.examId,
                          mobileNumber: req.body.mobileNumber,
                          address: req.body.address,
                          latitude: req.body.lat,
                          longitude: req.body.lon,
                          email: req.body.email,
                          password: hash,
                          secretToken: secretToken,
                          isActive: 0,
                          age: req.body.age,
                          gender: req.body.gender,
                          geoAddress: gAddress
                        },
                        { transaction: t }
                      )
                        .then(async result => {
                          if (result) {
                            const promises = [];
                            req.body.tutorId = result.getDataValue('id');
                            if (req.body['subjectIds'].length > 0) {
                              for (let i = 0; i < req.body['subjectIds'].length; i++) {
                                const promise1 = await SubjectTutor.create(
                                  {
                                    tutorId: req.body.tutorId,
                                    subjectId: req.body['subjectIds'][i]
                                  },
                                  { transaction: t }
                                ).catch(e => {
                                  return res.status(200).json({
                                    data: null,
                                    message: 'Subjects Add Server Error',
                                    statusCode: StatusCodes.ServerError
                                  });
                                });
                                promises.push(promise1);
                              }
                            }
                            if (promises.length > 0) {
                              await Promise.all(promises);
                            }
                          }
                        })
                        .catch(e => {
                          return res.status(200).json({
                            data: null,
                            message: 'Tutor Create Server Error',
                            statusCode: StatusCodes.ServerError
                          });
                        });
                    })
                      .then(async () => {
                        let redirectUrl = 'http://localhost:4227';
                        const html = `Hi there,
                                <br/>
                                Thank you for registering!
                                <br/><br/>
                                Please verify your email by typing the following token:
                                <br/>
                                Token: <b>${secretToken}</b>
                                <br/>
                                Go to login from the FindTutor App
                                <br/>
                                Have a pleasant day!`;
                        const msg = {
                          from: 'kesharapiyumal2016@gmail.com',
                          from_name: 'FindTutor',
                          to: req.body.email,
                          subject: 'Welcome to FindTutor!',
                          body_html: html
                          // attachment: attachment
                        };
                        await elasticMailer.mailer.send(msg, function(err, result) {
                          if (err) {
                            return console.error(err);
                          }
                          console.log(result);
                        });
                        return res.status(200).json({
                          data: null,
                          message: 'Tutor created successfully!',
                          statusCode: StatusCodes.Success
                        });
                      })
                      .catch(e => {
                        res.status(200).json({
                          data: null,
                          message: 'Tutor Create DB Error!',
                          statusCode: StatusCodes.DBError
                        });
                      });
                  }
                });
              }
            })
            .catch(error => {
              res.status(200).json({
                data: null,
                message: 'Tutor Register Server Error!',
                statusCode: StatusCodes.ServerError
              });
            });
        } else {
          res.status(200).json({
            data: null,
            message: 'Tutor Register Server Error!',
            statusCode: StatusCodes.ServerError
          });
        }
      })
      .catch(error => {
        res.status(200).json({
          data: null,
          message: 'Tutor Register Server Error!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Tutor Register Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
