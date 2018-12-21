const Words    = require('../models/words');
const AppError = require('../../../libs/app-error');

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
     * 
     * 
     */
    async translate(req, res, next) {
        const { source = 'auto', target, text } = req.body;

        if(!target || !text)
            return next( new AppError(400));

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=bd&dj=1&source=input&dt=t&q=` + encodeURI(text);
        const transl = await fetch(url).then(response => response.json()).catch(err => console.log(err));

        if(!transl)
            return next( new AppError(500))

        res.json(transl);
    },

    async add(req, res, next) {},

    async update(req, res, next) {},

    async remove(req, res, next) {}
}