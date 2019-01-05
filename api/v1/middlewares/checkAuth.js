const Users = require('../models/users');
const AppError = require('../../../libs/app-error');
const { decode } = require('../../../libs/token');

module.exports = {
    checkAuth(req, res, next) {
        const token = req.headers['x-accesstoken'] || req.body.token;

        if(!token) {
            req._userAuth = null;
            return next();
        }

        decode(token, async (err, data) => {
            if(err)
                return next(new AppError(401, 'Access token has expired'));

            const { iss: id } = data;

            const user = await Users.findOne({ _id: id, tokens: { $elemMatch: { token }}}).populate('collections');

            if(!user)
                return next( new AppError(404));

            req._userAuth = user;
            next();
        })
    },

    userPermission(req, res, next) {
        const user = req._userAuth;

        if(!user)
            return next( new AppError(401));

        next();
    },

    adminPermission(req, res, next) {
        const user = req._userAuth;

        if(!user)
            return next( new AppError(401));

        if(user.role != 'admin')
            return next( new AppError(403));

        next();
    }
};