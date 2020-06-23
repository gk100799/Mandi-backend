import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    typeofpost: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
    // upvotes: {
    //     type: Number,
    // },
    // downvotes: {
    //     type: Number,
    // },
    // comments: {
    //     type: [String],
    // }
});

module.exports = mongoose.model('Post', postSchema);