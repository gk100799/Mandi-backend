import bcrypt from 'bcryptjs'

import Post from '../../models/posts'
import User from '../../models/user'

module.exports = {
    posts: () => {
      return Post.find()
        .then(posts => {
          return posts.map(post => {
            return { ...post._doc, _id: post.id };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
  
    createPost: args => {
      const post = new Post({
        username: args.postInput.username,
        typeofpost: args.postInput.typeofpost,
        description: args.postInput.description
      });
      return post.save()
       .then(result => {
        return { ...result._doc,}
       })
       .catch(err => {
        console.log(err);
        throw err;
       })
    },
  
    createUser: args => {
      return User.findOne({username:args.userInput.username})
        .then(user => {
          if(user) {
            throw new Error('User exists already.')
          }
          return bcrypt.hash(args.userInput.password, 12)
        })
        .then(hashedPassword => {
          const user = new User({
            username: args.userInput.username,
            password: hashedPassword,
            firstname: args.userInput.firstname,
            lastname: args.userInput.lastname,
            email: args.userInput.email,
          });
          return user.save()
        })
        .then(result => {
          return { ...result._doc, password:null, _id: result.id}
        })
        .catch(err => { 
          throw err
        })
    },
  };