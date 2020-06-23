import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose'

import Post from './models/posts'

var app = express();

var schema = buildSchema(`
  type Post {
    _id: ID!
    username: String
    typeofpost: String
    description: String
  }

  type Query {
    posts: [Post!]!
  }
  
  input PostInput {
    username: String!
    typeofpost: String!
    description: String!
  }


  type Mutation {
    createPost(postInput: PostInput): Post
  }
`);

var root = {
  hello: () => 'Hello world!',
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
  }
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mandidb-sdbcm.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000, () => console.log("Server running at port 4000"));
  })
  .catch(err => {
    console.log(err);
  });

  