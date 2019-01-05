const route = require('express').Router();

const v1 = require('./v1');
const { checkAuth } = require('./v1/middlewares/checkAuth');

route.use('/v1', checkAuth, v1);

module.exports = route;