// SET ENV
require('./env.config').run();

// CONNECT TO MONGODB
const MongoConnect = require('./db');
MongoConnect();

const express  = require('express');
const body     = require('body-parser');
const cors     = require('cors');

const app = express();

app
    // midllewares
    .use(cors())
    .use(body.json())


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


app.listen(process.env.PORT);