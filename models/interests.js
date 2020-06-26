const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const interestSchema = new Schema({
    interest: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Interests', interestSchema);