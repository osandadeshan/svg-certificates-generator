const serverless = require('serverless-http');
const express = require('express')
const app = express();
const AWS = require('aws-sdk');
const {parse, stringify} = require('svgson');
require('dotenv').config()

app.post('/certificate', async (req, res) => {
    let s3 = new AWS.S3();
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

    let params = {Bucket: process.env.AWS_S3_BUCKET, Key: 'svg.svg'};
    try {
        let data = await s3.getObject(params).promise();
        parse(Buffer.from(data.Body).toString()).then(data => {
            data["children"][0]["children"][2]["children"][0]["value"] = userParams.Certificate.studentName
            if (!userParams.Certificate.logo) {
                data["children"][0]["children"][3]["attributes"]["visibility"] = "hidden";
            }
            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: 'svg12.svg', // File name you want to save as in S3
                Body: stringify(data)
            };
            s3.putObject(uploadParams).promise()
                return res.status(200).json({
                    message: stringify(data)
            })
        }).catch(err => {
            return res.status(400).json({
                message: "Read fails"
            });
        })
    } catch (err) {
        return res.status(403).json({
            message: err
        });
    }
    // let message;
    // const uploadFile = () => {
    //     return new Promise(function (resolve, reject) {
    //         readSvgFile().then(data => {
    //             data = data.replace("Name", userParams.Certificate.studentName)
    //             data = data.replace("Signature", userParams.Certificate.signature)
    //             const params = {
    //                 Bucket: process.env.AWS_S3_BUCKET,
    //                 Key: 'svg12.svg', // File name you want to save as in S3
    //                 Body: data
    //             };
    //             s3.upload(params, function(err, data) {
    //                 if (err) {
    //                     reject(err.message)
    //                 } else {
    //                     message = `File uploaded successfully. ${data.Location}`
    //                     resolve(message);
    //                 }
    //             });
    //         })
    //     })
    // };

    // uploadFile().then(data => console.log(data)).catch(err => console.log(err))
});

module.exports.handler = serverless(app);
