const serverless = require('serverless-http');
const express = require('express')
const app = express();
const s3 = require('aws-sdk/clients/s3');
require('dotenv').config()

app.post('/certificate', function (req, res) {
    const data = JSON.parse(req.body);
    const userParams = {
        Certificate: {
            template: data.template,
            certificateName: data.certificateName,
            recognition: data.recognition,
            signature: data.signature,
            studentName: data.studentName,
            logo: data.logo,
            mascotLogo: data.mascotLogo,
            dateCreated: new Date().getTime()
        }
    };
    const readSvgFile = () => {
        return new Promise(function (resolve, reject) {
            let s3Bkt = new s3({ accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET });
            let params = { Bucket: process.env.AWS_S3_BUCKET, Key: 'svg.svg' };
            s3Bkt.getObject(params, function (err, data) {
                if (err) {
                    reject(err.message);
                } else {
                    const data = Buffer.from(data.Body).toString('utf8');
                    resolve(data);
                }
            });
        });
    }
    let message;
    const uploadFile = () => {
        return new Promise(function (resolve, reject) {
            readSvgFile().then(data => {
                data = data.replace("Name", userParams.Certificate.studentName)
                data = data.replace("Signature", userParams.Certificate.signature)
                const params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: 'svg12.svg', // File name you want to save as in S3
                    Body: data
                };
                let s3Bkt = new s3({ accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET });
                s3Bkt.upload(params, function(err, data) {
                    if (err) {
                        reject(err.message)
                    } else {
                        message = `File uploaded successfully. ${data.Location}`
                        resolve(message);
                    }
                });
            })
        })
    };

    uploadFile().then(data => console.log(data)).catch(err => console.log(err))

    res.status(200).json({
        message: message
    });
});

module.exports.handler = serverless(app);
