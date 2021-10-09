require ('dotenv').config
const AWS = require('aws-sdk');
const crypto = require('crypto');
const { promisfy } = require('util');
const randomBytes = promisfy(crypto.randomBytes);

const region = '';
const bucketName = '';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

module.exports =  async function generateUploadURL() {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedURLPromise('putObject', params);
}

