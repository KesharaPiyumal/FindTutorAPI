const uploadingHelper = require('multer');
const StatusCodes = require('../../common/statusCodes');

const filter = (res, file, callBack) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    callBack(null, true);
  } else {
    callBack(null, false);
    return res.status(200).json({
      data: null,
      message: 'Unsupported File Format',
      statusCode: StatusCodes.ServerError
    });
  }
};

const storage = uploadingHelper.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'assets/profile-images');
  },
  filename: (req, file, callBack) => {
    let extension;
    if (file.mimetype === 'image/jpg') {
      extension = '.jpg';
    } else if (file.mimetype === 'image/jpeg') {
      extension = '.jpeg';
    } else if (file.mimetype === 'image/png') {
      extension = '.png';
    }
    callBack(null, 'pro' + req.header('userId') + extension);
  }
});

const upload = uploadingHelper({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filter
});

module.exports = upload;
