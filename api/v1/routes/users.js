const route = require('express').Router();

const {
    _find,
    create,
    get
} = require('../controllers/users');

route
    .param('id', _find)
    .post('/', create)
    .get('/:id', get)

module.exports = route;