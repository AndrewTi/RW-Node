const User = require('../models/users');
const AppError = require('../../../libs/app-error');

/**
 * @apiDefine UserData
 * 
 * @apiParam {String} [name] name of user
 * @apiParam {String} [last_name] lastname of user
 * @apiParam {String} email 
 * @apiParam {Number} [phone]
 * @apiParam {String} password
  */


module.exports = {

    // middleare 
    async _find(req, res, next, id) {
        if(!id) 
            return next( new AppError(400) );

        const user = await User.findById(id);

        if(!user)
            return next( new AppError(404) );

        req._user = user;
        next();
    },

    /**
     * @api {POST} / method to create new users in the app
     * @apiVersion 0.0.1
     * @apiName Create
     * @apiGroup Users
     * 
     * @apiUse UserData
     */
    async create(req, res, next) {
        const data = {
            // required
            email,
            password,
            
            // not required
            name,
            last_name,
            phone
        } = req.body;

        if(!email || !password)
            return next( new AppError(400) );

        const user = await User.create(data);
    },

    async get(req, res, next) {},
    async update(req, res, next) {},
    async remove(req, res, next) {},
}