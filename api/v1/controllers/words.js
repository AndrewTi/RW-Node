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
     *     property : value
     * }
     * 
     * 
     */
    async translate(req, res, next) {

    },

    async add(req, res, next) {},

    async update(req, res, next) {},

    async remove(req, res, next) {}
}