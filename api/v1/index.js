const route = require('express').Router();

const collections = require('./routes/collections');
const users = require('./routes/users');
const words = require('./routes/words');

route
    .use('/collections', collections)
    .use('/users', users)
    .use('/words', words);

module.exports = route;