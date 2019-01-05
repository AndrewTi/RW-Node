const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Collection = new Schema({
    user_id: Schema.Types.ObjectId,
    name: String,
    words: [{
        word_id: { type: Schema.Types.ObjectId, ref: 'Words' },
        url: String,
        notes: String,
    }]
}, { timestamps: true, collection: 'collections' });

module.exports = mongoose.model('Collection', Collection);