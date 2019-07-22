const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    authors: String,
    cover: String,
    snippet: String,
    description: String,
    readings: [{
        started: Date,
        finished: Date,
        DNF: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = mongoose.model('book', bookSchema);