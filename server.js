// SET ENV
require('./env.config').run();

// CONNECT TO MONGODB
const MongoConnect = require('./db');
MongoConnect();

const express  = require('express');
const Device   = require('node-device-detector');
const body     = require('body-parser');
const cors     = require('cors');

const api = require('./api');

const app = express();

app
    // midllewares
    .use(cors())
    .use(body.json())
    // device decetor middleware
    .use((req, res, next) => {
        const detector = new Device();
        const userAgent = req.headers["user-agent"];

        const info = detector.detect(userAgent);

        req._device = info.device;
        next();
    })

    .use('/api', api)

    // custom error handling
    .use((err, req, res, next) => {
        if(err.name == "CustomError") {
            return res.json({
                error: true,
                ok: false,
                code: err.statusCode || 500,
                message: err.message
            });
        }
    })


app.listen(process.env.PORT, () => {
    console.log('server started')
});