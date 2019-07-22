const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }]
});

module.exports = mongoose.model('list', listSchema);