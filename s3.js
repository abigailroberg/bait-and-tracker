require ('dotenv').config
const AWS = require('aws-sdk');
const crypto = require('crypto');
const util = require('util');
const randomBytes = util.promisify(crypto.randomBytes);

const region = 'us-east-2';
const bucketName = 'fish-bucket-bait-and-tracker';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        //URL expiration time
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}

module.exports = generateUploadURL;

