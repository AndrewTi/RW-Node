const route = require('express').Router();

const v1 = require('./v1');
const { checkAuth } = require('./v1/middlewares/checkAuth');

route.use('/v1', v1);
route.use('/check', checkAuth);

module.exports = route;