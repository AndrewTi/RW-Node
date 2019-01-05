const passwordHash = require('password-hash');
const { 
    isEmail, 
    isMobilePhone, 
    isByteLength 
} = require('validator');

const Collections = require('../models/collections');
const AppError    = require('../../../libs/app-error');
const User        = require('../models/users');
const token       = require('../../../libs/token');

/**
 * @apiDefine UserData
 * 
 * @apiParam {String} [name] name of user
 * @apiParam {String} [last_name] lastname of user
 * @apiParam {String} [email]
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
     * @apiSuccess {String} token
     */
    async create(req, res, next) {
        const device = (req._device) ? req._device.type : 'undefined';
        const data = {
            // required
            password,

            // one of them can't be empty
            email,
            phone,
            
            // not required
            name,
            last_name,
        } = req.body;

        if(!email || !phone && !password)
            return next( new AppError(400))

        let checkPhone = '';

        if(phone)
            checkPhone = (phone[0] == '+') ? phone : '+' + phone;

        if(!(
            isEmail(email.toString()) || isMobilePhone(checkPhone)
            &&
            isByteLength(password.toString(), { min: 6, max: 128 })
        ))
            return next( new AppError(400) );

        let query = null;
        
        if(checkPhone && email) {
            query = { email, phone };
        }else if(email) {
            query = { email };
        } else {
            query = { phone };
        }

        const theSameUser = await User.findOne(query);

        if(theSameUser)
            return next( new AppError(409) );

        data.password = passwordHash.generate(password);

        const user = await User.create(data).catch(err => console.log(err) );

        if(!user)
            return next( new AppError(500) );

        const { token: generatedToken, expDate } = token.create(user._id);

        const collection = await Collections.create({
            user_id: user._id,
            name: 'All',
            words: []
        }).catch(err => {
            console.log(err);
        })

        if(!collection)
            return next( new AppError(500) );
        
        await user.updateOne({ $push: {
            tokens: {
                token: generatedToken,
                exp: expDate,
                device: device,
                last_use: new Date()
            },
            collections: collection._id
        }}).catch(err => console.log(err));

        res.json({ token: generatedToken });
    },

    async login(req, res, next) {
        const { 
            email,
            phone,
            password 
        } = req.body;

        if(!email || !phone && !password)
            return next( new AppError(400))

        let checkPhone = '';

        if(phone)
            checkPhone = (phone[0] == '+') ? phone : '+' + phone;

        if(!(
            isEmail(email.toString()) || isMobilePhone(checkPhone)
            &&
            isByteLength(password.toString(), { min: 6, max: 128 })
        ))
            return next( new AppError(400) );

        let query = null;

        if(email)
            query = { email, password }
        else 
            query = { phone, password }
    }

    /**
     * 
     * @api {GET} /users/:id id
     * @apiName GetUserById
     * @apiGroup Users
     * @apiVersion  0.0.1
     * 
     * 
     * @apiParam  {String} id 
     * 
     * @apiSuccess (200) {Object} user 
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
     *     user : {...}
     * }
     * 
     */
    async getByid(req, res, next) {
        const user = req._user;

        res.json({ user });
    },

    async getMe(req, res, next) {
        const user = req._userAuth;

        res.json({ user });
    },

    async updateMe(req, res, next) {
        const user = req._userAuth;
        const data = {
            name,
            last_name,
            phone,
            email
        } = req.body;

        if(Object.keys(data)[0])
            return next( new AppError(400));

        const result = await user.update(data);

        if(!result)
            return next( new AppError(500));

        res.json({ ok: true });
    },

    async remove(req, res, next) {
        const user = req._user;

        const result = await user.destroy();

        if(!result)
            return next( new AppError(500));

        res.json({ ok: true });
    },
}