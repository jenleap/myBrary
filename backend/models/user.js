const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    password: String,
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'project'
    }]
});

module.exports = mongoose.model('user', userSchema);