import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const commentSchema = new Schema({
    text:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },  //identifies which user posted it
    issue_id: { type: Schema.Types.ObjectId, ref: 'Issue' }, //identifies which issue it belongs to
}, )

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;