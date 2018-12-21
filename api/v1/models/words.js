const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Words = new Schema({
    from_lange: String,
    to_lang   : String,
    trans : String,
    orig  : String,
    dist  : [{
        pos  : String,
        terms: Array,
        entry: [{
            word: String,
            reverse_translation: Array,
            gender: Number
        }],
        base_form: String,
        pos_enun : Number

    }],
    confidence: Number
});

module.exports = mongoose.model('Words', Words);