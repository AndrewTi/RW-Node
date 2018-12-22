const Users = require('../models/users');
const AppError = require('../../../libs/app-error');
const { decode } = require('../../../libs/token');

module.exports = {
    checkAuth(req, res, next) {
        const token = req.headers['x-accesstoken'] || req.body.token;

        console.log(token, req.headers);

        if(!token)
            return next( new AppError(401));

        decode(token, async (err, data) => {
            if(err)
                return next(new AppError(401, 'Access token has expired'));

            const { iss: id } = data;

            const user = await Users.findOne({ _id: id, tokens: { $elemMatch: { token }}});

            if(!user)
                return next( new AppError(401));
                
            res.json(user);
        })
    }
};