import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    typeofpost: {
        type: String,
        enum: ['audio', 'image', 'video'],
        required: true
    },
    description: {
        type: String,
    },
    upvotes: {
        type: Number,
    },
    downvotes: {
        type: Number,
    },
    comments: {
        type: [String],
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);