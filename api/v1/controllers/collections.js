const Collection = require('../models/collections');
const Wrods = require('../models/words');
const AppError = require('../../../libs/app-error');

module.exports = {
    async _find(req, res, next, id) {
        const collection = await Collection.findById(id);

        if(!collection)
            return next( new AppError(404));

        req._collection = collection;
    },

    async _findWord(req, res, next, word) {
        const word = await Wrods.findById(word);

        if(!word)
            return next( new AppError(404));

        req._word;
        next();
    },

    async create(req, res, next) {
        const user = req._authUser;
        const { name } = req.body;

        if(!name)
            return next( new AppError(400));

        const collection = await Collection.create({
            user_id: user._id,
            name
        });

        if(!collection)
            return next( new AppError(500));

        res.json({ collection });
    },

    async update(req, res, next) {
        const collection = req._collection;
        const { name } = req.body;

        if(!name)
            return next( new AppError(400));

        const result = await collection.update({ name });

        if(!result)
            return next( new AppError(500));

        res.json({ ok: true });
    },

    async remove(req, res, next) {
        const collection = req._collection;

        const result = await collection.destroy();

        if(!result)
            return next( new AppError(500));

        res.json({ ok:true });
    },

    async removeWrod(req, res, next) {
        const collection = req._collection;
        const word = req._word;

        const result = await collection.update({ $pull: { words: { word_id: word._id }}});

        console.log(result);
        if(!result)
            return next( new AppError(500));

        res.json({ ok: true });
    },

    // words into files
    // get all words source --- target
    async getPDF(req, res, next) {},

    // get all words source --- ___
    async getPDFSource(req, res, next) {},

    // get all words target --- ___
    async getPDFTarget(req, res, next) {},
}