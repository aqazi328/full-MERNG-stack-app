import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import User from '../models/usermodel.js';
import Issue from '../models/issuemodel.js';
import Comment from '../models/commentmodel.js';
import checkAuth from './check-auth.js'
const SECRET_KEY = '7u32897u23wrfhsudby8o43htgo7berbo8@^*#($#@';

function generateToken(user){
    return jwt.sign({
        _id: user._id,
        username: user.username,
        password: user.password
    }, SECRET_KEY)
}

const resolvers = {
    Query: {
        async getUser(_, { _id }){
            return User.findById(_id);
        },
        async getUserbyIssue(_,{user_id}){
            return User.findById(user_id);
        },
        async getUserbyComment(_,{user_id}){
            return User.findById(user_id);
        },
        async getIssue(_, { issue_id }){
            return Issue.findById({_id: issue_id});
        },
        async getIssuesbyUser(_, { user_id }){
            return Issue.find({user_id: user_id});
        },
        async getIssues(){
            return Issue.find().sort( { upvoteCount: -1 } )
        },
        async getCommentsbyIssue(_, { issue_id }){
            return Comment.find({issue_id: issue_id});
        }
    },
    Mutation:{
        async loginUser(_, {username, password}){
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
        },
        async registerUser(_, {username, password}){
            const user = new User({
                username: username,
                password: await bcrypt.hash(password, 10)
            });
            const res = await user.save();
            const token = generateToken(res);
            return{
                ...res._doc,
                _id: res._id,
                token
            };
        },
        async addIssue(_, args, context){
            const user = checkAuth(context);
            let issue = new Issue({
                title: args.title,
                description: args.description,
                user_id: user._id,
                upvoteCount: 0,
                downvoteCount: 0
            });
            issue.save()
                .then(()=> console.log('Issue added!'))
                .catch(err=> console.log('Error: ' + err));
 
            // context.pubsub.publish('NEW_ISSUE', {
            //     newIssue: issue
            //     });

            return issue;
        },
        async deleteIssue(_, {issue_id}, context){

            const user = checkAuth(context);
            console.log(user._id);
            try {
                const issue = await Issue.findById(issue_id);
                console.log(issue.user_id);
                if (user._id == issue.user_id) {
                await issue.delete();
                await await Comment.remove( { issue_id: issue_id } )
                return 'Post (and any comments) deleted successfully';
                } else {
                throw 'Action not allowed';
                }
            } catch (err) {
                throw "Not found";
            }
        },
        async upvoteIssue(_, {issue_id}, context){
            const { username } = checkAuth(context);
            const issue = await Issue.findById(issue_id);
            if (issue) {
              if (issue.upvotes.find((upvote) => upvote.username === username)) {       // issue already likes, unlike it
                issue.upvotes = issue.upvotes.filter((upvote) => upvote.username !== username);
                issue.upvoteCount = issue.upvoteCount - 1;
              } else {              // Not liked, like issue
                issue.upvotes.push({
                  username,
                });
                issue.upvoteCount = issue.upvoteCount + 1;
              }
              await issue.save();
              return issue;
            } else throw 'issue not found';
        },
        async downvoteIssue(_, {issue_id}, context){
            const { username } = checkAuth(context);
            const issue = await Issue.findById(issue_id);
            if (issue) {
              if (issue.downvotes.find((downvote) => downvote.username === username)) {             // issue already likes, unlike it
                issue.downvotes = issue.downvotes.filter((downvote) => downvote.username !== username);
                issue.downvoteCount = issue.downvoteCount - 1;
              } else {                      // Not liked, like issue
                issue.downvotes.push({
                  username,
                });
                issue.downvoteCount = issue.downvoteCount + 1;
              }
              await issue.save();
              return issue;
            } else throw 'issue not found';
        },
        async addComment(_, args, context){
            const { _id } = checkAuth(context);
            let comment = new Comment({
                text: args.text,
                user_id: _id,
                issue_id: args.issue_id
            });
            comment.save()
                .then(()=> console.log('Comment added!'))
                .catch(err=> console.log('Error: ' + err));
            return comment;
        }
    }
};

export default resolvers;
