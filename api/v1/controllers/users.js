const passwordHash = require('password-hash');
const validator    = require('validator');

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
     * 
     * @apiSuccess {Object} user
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

        const { isEmail, isByteLength } = validator;

        if(
            !email && !isEmail(email.toString())
            || 
            !password && !isByteLength(password.toString(), { min: 6, max: 128 })
        )
            return next( new AppError(400) );

        const query = (!phone) ? { where: { email }} : { where: { email, phone }};
        const theSameUser = await User.find(query);

        if(theSameUser)
            return next( new AppError(409) );

        data.password = passwordHash.generate(password);

        const user = await User.create(data).catch(err => console.log(err) );

        if(!user)
            return next( new AppError(500) );

        
    },



    async get(req, res, next) {
        const user = req._user;

        res.json({ user });
    },
    async update(req, res, next) {},
    async remove(req, res, next) {},
}