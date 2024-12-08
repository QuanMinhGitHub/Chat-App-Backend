// const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// Multer configuration to handle file uploads to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read', // Set the ACL to public-read for direct file access
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type based on the file
    key: (request, file, cb) => {
        // Create a unique file name based on the current timestamp
        cb(null, `profilePictures/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

// Middleware to upload a single file (profile picture)
const uploadSingle = upload.single('profilePicture');

module.exports = uploadSingle;
