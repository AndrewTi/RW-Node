const route = require('express').Router();

const {
    _find,
    create,
    getByid
} = require('../controllers/users');

route
    .param('id', _find)
    .post('/', create)
    .get('/:id', getByid)

module.exports = route;