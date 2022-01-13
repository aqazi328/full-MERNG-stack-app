import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User{
        _id: ID!
        username: String!
        password: String!
        token: String!
        issues: [Issue]!
    }
    type Issue{
        _id: ID!
        title: String!
        description: String!
        upvotes: [Upvote]!
        downvotes: [Downvote]!
        upvoteCount: Int!
        downvoteCount: Int!
        user_id: ID!
        user: [User]!
        comments: [Comment]
    }
    type Comment{
        _id: ID!
        text: String!
        user_id: ID!
        issue_id: ID!
    }
    type Upvote{
        id: ID!
        username: String!
    }
    type Downvote{
        id: ID!
        username: String!
    }
    type Query{
        getUser(_id: ID!): User
        getUserbyIssue(user_id: ID!): User
        getUserbyComment(user_id: ID!): User
        getIssue(issue_id: ID!): Issue
        getIssuesbyUser(user_id: ID!): [Issue]
        getIssues: [Issue]
        getCommentsbyIssue(issue_id: ID!): [Comment]
    }
    type Mutation{
        registerUser(username: String!, password: String!): User
        loginUser(username: String!, password: String!): User
        addIssue(title: String!, description: String!): Issue
        addComment(text: String!, issue_id: ID!): Comment
        deleteIssue(issue_id: ID!): String!
        upvoteIssue(issue_id: ID!): Issue
        downvoteIssue(issue_id: ID!): Issue
    }
`;

export default typeDefs;