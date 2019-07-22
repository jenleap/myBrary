const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    password: String,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }],
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'list'
    }]
});

module.exports = mongoose.model('user', userSchema);