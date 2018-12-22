const transalte = require('../../../libs/translate');
const AppError  = require('../../../libs/app-error');
const Words     = require('../models/words');

module.exports = {
    async _find(req, res, next) {},

    /**
     * 
     * @api {POST} /translate Transalte
     * @apiName Translate
     * @apiGroup Words
     * @apiVersion  1.0.0
     * 
     * 
     * @apiParam  {String} [source] Transalte from
     * @apiParam  {String} target Translate to
     * @apiParam  {String} text 
     * 
     * @apiParamExample  {JSON} Request-Example:
     * {
     *     source : 'UA',
     *     target : 'US',
     *     text   : 'Hello'
     * }
     * 
     * 
     * @apiSuccessExample {JSON} Success-Response:
     * {
            "transalte": {
                "sentences": [{
                    "trans": "працюй зі мною",
                    "orig": "work with me",
                    "backend": 3
                }],
                "src": "en",
                "confidence": 1,
                "ld_result": {
                    "srclangs": ["en"],
                    "srclangs_confidences": [1],
                    "extended_srclangs": ["en"]
                }
            }
        }
     * 
     * 
     */
    async translate(req, res, next) {
        const { source = 'auto', target, text } = req.body;

        if(!target || !text)
            return next( new AppError(400));

        const transl = await transalte(source, target, text).catch(err => console.log(err));

        if(!transl)
            return next( new AppError(500))

        res.json({ transalte: transl });
    },

    async add(req, res, next) {
        const { source = 'auto', target, text, href, collection_id } = req.body;
        const user = req._userAuth;

        if(!target || !text || !collection_id)
            return next( new AppError(400));
        
        const transl = await transalte(source, target, text).catch(err => console.log(err));

        if(!transl)
            return next( new AppError(500))

            // need to create collection model

        // const collection = await Collection.findOne({ _id: collection_id, user_id: user._id });

        // if(!collection)
        //     return next( new AppError(404));

        // await collection.update({
        //     $push: {
        //         words: {
        //             //...
        //         }
        //     }
        // })

        


    },

    async update(req, res, next) {},

    async remove(req, res, next) {}
}