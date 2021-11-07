const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imagelink: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caption: {
        type: String,
        required: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: {
                type: String,
                required: true
            }
        }
    ],
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;