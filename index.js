const serverless = require('serverless-http');
const express = require('express')
const app = express();

const linkedinProfileUrl = 'https://run.mocky.io/v3/66de2cca-4f16-45ee-b3d5-efd28da73b49';

app.get('/', function (req, res) {
    res.status(200).json({
        message: "Hello Serverless!"
    });
});

module.exports.handler = serverless(app);
