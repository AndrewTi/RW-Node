const route = require('express').Router();

const {
    userPermission
} = require('../middlewares/checkAuth');

const {
    _find,
    create,
    getMe,
    getByid
} = require('../controllers/users');

route
    .param('id', _find)
    .post('/', create)
    .get('/me', userPermission, getMe)
    .get('/:id', getByid)

module.exports = route;