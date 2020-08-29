const Student = require('../../models/student');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');
const bCrypt = require('bcryptjs');
const randomString = require('randomstring');
const elasticMailer = require('../../../misc/mailer');

exports.register = (req, res) => {
  try {
    Student.findAll({
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
              console.log(err);
              return res.status(200).json({
                data: null,
                message: 'Tutor Create Server Error!',
                statusCode: StatusCodes.ServerError
              });
            } else {
              const secretToken = randomString.generate();
              db.transaction(async t => {
                await Student.create(
                  {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNumber: req.body.mobileNumber,
                    address: req.body.address,
                    latitude: req.body.lat,
                    longitude: req.body.lon,
                    email: req.body.email,
                    password: hash,
                    secretToken: secretToken,
                    isActive: 0
                  },
                  { transaction: t }
                );
              })
                .then(async () => {
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
                  };
                  await elasticMailer.mailer.send(msg, function(err, result) {
                    if (err) {
                      return console.error(err);
                    }
                  });
                  return res.status(200).json({
                    data: null,
                    message: 'Tutor created successfully!',
                    statusCode: StatusCodes.Success
                  });
                })
                .catch(e => {
                  console.log(e);
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
        console.log(error);
        res.status(200).json({
          data: null,
          message: 'Tutor Register Server Error!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      message: 'Tutor Register Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
