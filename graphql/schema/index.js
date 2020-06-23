import { buildSchema } from 'graphql';

module.exports = buildSchema(`
    type Post {
        _id: ID!
        username: String!
        typeofpost: String!
        description: String!
    }

    type User {
        _id: ID!
        username: String!
        password: String!
        firstname: String!
        lastname: String!
        email: String!
    }

    input PostInput {
        username: String!
        typeofpost: String!
        description: String!
    }

    input UserInput {
        username: String!
        password: String!
        firstname: String!
        lastname: String!
        email: String!
    }

    type Query {
        posts: [Post!]!
    }

    type Mutation {
        createPost(postInput: PostInput): Post
        createUser(userInput: UserInput): User
    }
`);