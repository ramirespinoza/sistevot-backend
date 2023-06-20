const AWS = require("aws-sdk");
const fs = require("fs");

// Configure AWS SDK with your access credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Uploads a file to Amazon S3.
 * @param {string} fileName - The name of the file.
 * @param {string} filePath - The local path of the file.
 * @param {string} bucketName - The name of the S3 bucket.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
const uploadFileToS3 = (fileData, fileName, bucketName) => {
  return new Promise((resolve, reject) => {
    // Read the file data

    // Set the S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileData,
      ACL: "public-read", // Set the file ACL to public-read for public access
    };

    // Upload the file to S3
    s3.upload(params, (error, data) => {
      if (error) {
        console.error("Error uploading file to S3", error);
        reject(error);
      } else {
        // Resolve with the URL of the uploaded file
        resolve(data.Location);
      }
    });
  });
};

module.exports = { uploadFileToS3 };
