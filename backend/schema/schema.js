import { graphql, GraphQLSchema, graphqlSync } from 'graphql';
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull,
    GraphQLInt, GraphQLList} from 'graphql';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import Issue from '../models/issuemodel.js';
import Comment from '../models/commentmodel.js';
//  const SECRET_KEY = '7u32897u23wrfhsudby8o43htgo7berbo8@^*#($#@';

function generateToken(user){
    return jwt.sign({
        _id: user._id,
        username: user.username,
        password: user.password
    }, SECRET_KEY)
}

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:()=>({
        _id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        token: {type: GraphQLString},
        issues:{
            type: new GraphQLList(IssueType),
            resolve(parent, args){
                // return _.filter(issues, {user_id: parent._id})
                return Issue.find({user_id: parent._id});
            }
        }
    })
});
const IssueType = new GraphQLObjectType({
    name: 'Issue',
    fields:()=>({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        upvotes: {type: GraphQLInt},
        downvotes: {type: GraphQLInt},
        user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(users, {_id: parent.user_id});
                return User.findById(parent.user_id);
            }
        },
        comments:{
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                // return _.filter(comments, {issue_id: parent._id})
                return Comment.find({issue_id: parent._id});
            }
        }
    })
});
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields:()=>({
        _id: {type: GraphQLID},
        text: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                // return _.find(users, {_id: parent.user_id});
                return User.findById(parent.user_id);
            }
        },
        issue: {
            type: IssueType,
            resolve(parent, args){
                // return _.find(issues, {_id: parent.issue_id});
                return Issue.findById(parent.issue_id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(users, {_id: args._id});
                return User.findById(args._id);
            }
        },
        issue: {
            type: IssueType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(issues, {_id: args._id});
                return Issue.findById(args._id);
            }
        },
        comment: {
            type: CommentType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(comments, {_id: args._id});
                return Comment.findById(args._id);
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // return users
                return User.find({});
            }
        },
        issues:{
            type: new GraphQLList(IssueType),
            resolve(parent, args){
                // return issues
                return Issue.find({});
            }
        },
        comments:{
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                // return comments
                return Comment.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser:{
            type: UserType,
            args:{
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                let user = new User({
                    username: args.username,
                    password: await bcrypt.hash(args.password, 10)
                });
            
                const res = await user.save();
                const token = generateToken(res);

                return{
                    ...res._doc,
                    _id: res._id,
                    token
                };
            }
        },
        loginUser:{
            type:UserType,
            args:{
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, {username, password}){
                const user = await User.findOne({username});
                if(user){
                    const match = await bcrypt.compare(password, user.password);
                    if(match){
                        const token = generateToken(user);
                        return{
                            ...user._doc,
                            _id: user._id,
                            token
                        };
                    } else throw "User not found!";
                } else throw "User not found!";
            }
        },
        addIssue:{
            type: IssueType,
            args:{
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                upvotes: {type: new GraphQLNonNull(GraphQLInt)},
                downvotes: {type: new GraphQLNonNull(GraphQLInt)},
                user_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args, context){
                console.log(args);
                // const user = checkAuth()
                console.log(context);
                let issue = new Issue({
                    title: args.title,
                    description: args.description,
                    upvotes: args.upvotes,
                    downvotes: args.downvotes,
                    user_id: args.user_id
                });
                issue.save()
                    .then(()=> console.log('Issue added!'))
                    .catch(err=> console.log('Error: ' + err));
                return issue;
            }
        },
        addComment:{
            type: CommentType,
            args:{
                text: {type: new GraphQLNonNull(GraphQLString)},
                user_id: {type: new GraphQLNonNull(GraphQLID)},
                issue_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                let comment = new Comment({
                    text: args.text,
                    user_id: args.user_id,
                    issue_id: args.issue_id
                });
                comment.save()
                    .then(()=> console.log('Comment added!'))
                    .catch(err=> console.log('Error: ' + err));
                return comment;
            }
        },
        deleteIssue:{
            type: IssueType,
            args:{
                _id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, {_id}){
                Issue.findByIdAndRemove(_id)
                    .then(()=> console.log('Issue deleted'))
                    .catch(err=> console.log('Error: ' + err));
                Comment.remove( { issue_id: _id } )
                    .then(()=> console.log('Comments for that Issue deleted'))
                    .catch(err=> console.log('Error: ' + err));
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;