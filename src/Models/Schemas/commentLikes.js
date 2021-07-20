import mongoose from "mongoose";

const commentLikesSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    required: true,
    default: 0
  },
  user_id: {
    type: String,
    required: true,
    default: ""
  },
  like: {
    type: Boolean,
    default: false
  },
  dislike: {
    type: Boolean,
    default: false
  }
})


export default mongoose.model('CommentLikesSchema', commentLikesSchema);