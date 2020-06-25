import { buildSchema } from 'graphql';

module.exports = buildSchema(`
    type Post {
        _id: ID!
        userId: String!
        typeofpost: String!
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        username: String!
        password: String!
        firstname: String!
        lastname: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    input PostInput {
        userId: String!
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

    type AuthData  {
        userId:ID!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        posts: [Post!]!
        login(username: String!, password: String!): AuthData
    }

    type Mutation {
        createUser(userInput: UserInput): User
        createPost(postInput: PostInput): Post
        deletePost(postId: ID!): Post!
    }
`);