const route = require('express').Router();

const {
    _find,
    create
} = require('../controllers/users');

route
    .param('id', _find)
    .post('/', create);

module.exports = route;