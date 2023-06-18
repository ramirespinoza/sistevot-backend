const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: 'AKIAVFT3HWX4RQDEISH3',
  secretAccessKey: '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',
  region:'us-east-1'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 's3votaciones',
    acl: 'public-read', // Cambia esto según tus necesidades de acceso
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  })
});

module.exports = {
  upload: upload,
};