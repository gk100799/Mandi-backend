const { transformResponse } = require('./resolverHelper')
const Post = require('../../models/posts')

module.exports = {
    posts: () => {
        return Post.find()
            .then(posts => {
                return posts.map(post => {
                    return transformResponse(post);
                });
            })
            .catch(err => {
                console.log(err);
            });
    },

    createPost: (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorizised access')
        }
        const post = new Post({
            userId: args.postInput.userId,
            typeofpost: args.postInput.typeofpost,
            description: args.postInput.description
        });
        return post.save()
            .then(result => {
                return transformResponse(result);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    deletePost: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorizised access')
        }
        try {
            const post = await Post.findById(args.postId)
            await Post.deleteOne({ _id: args.postId })
            return transformResponse(post);
        } catch (err) {
            throw err;
        }
    },

};