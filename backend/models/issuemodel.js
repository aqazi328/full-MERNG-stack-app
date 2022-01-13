import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const issueSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description:{ 
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    upvotes:[ { username: String } ],
    upvoteCount: {type: Number, required: true},
    downvotes:[ { username: String } ],
    downvoteCount: {type: Number, required: true},

    user_id: { type: Schema.Types.ObjectId, ref: 'User' },  //identifies which user posted the issue
}, )

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;