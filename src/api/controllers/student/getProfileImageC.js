const User = require('../../models/tutor');
const StatusCodes = require('../../../common/statusCodes');
const fs = require('fs');

exports.getImage = (req, res) => {
    try {
        User.findAll({
            where: {id: +req.header('userId')}
        })
            .then(user => {
                if (user.length < 1) {
                    return res.status(200).json({
                        statusCode: StatusCodes.NotFound,
                        message: 'Not Found!',
                        data: null
                    });
                } else if (user.length > 0) {
                    const picUrl = user[0].picUrl;
                    const mimeType = user[0].mimeType;
                    fs.readFile(`./assets/profile-images/${picUrl}`, function (err, data) {
                        if (err) throw err; // Fail if the file can't be read.
                        const imageData = `data:image/${mimeType};base64,` + Buffer.from(data).toString('base64');
                        return res.status(200).json({
                            data: imageData,
                            message: 'Done!',
                            statusCode: StatusCodes.Success
                        });
                    });
                }
            })
            .catch(err => {
                res.status(200).json({
                    statusCode: StatusCodes.DBError,
                    message: 'Profile Image Get DB Failed!',
                    data: null
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
