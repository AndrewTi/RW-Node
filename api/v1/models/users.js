const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = new Schema({
    name: String,
    last_name: String,
    email: { type: String, lowercase: true, index: { unique: true }},
    phone: { type: Number, default: null },
    password: { type: String, select: false, required: true },
    last_login: Date,
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
    tokens: { type: Array, select: false, default: [
        {
            token: String,
            exp: Date,
            device: String,
            last_use: Date
        }
    ]}
}, { timestamps: true, collection: 'users' });

module.exports = mongoose.model('User', User);