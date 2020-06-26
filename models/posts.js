const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post_type: {
        type: String,
        enum: ['audio', 'image', 'video', 'links', 'text'],
        required: true
    },
    interest: {
        type: String,
        ref: 'Interests'
    },
    title: {
        type: String,
    },
    title: {
        type: String,
    },
    votes: {
        type: Number,
    },
    comments: {
        type: [String],
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);