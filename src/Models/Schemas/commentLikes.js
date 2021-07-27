import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const commentLikesSchema = new mongoose.Schema({
  comment_id: {
    type: ObjectId,
    required: true
  },
  user_id: {
    type: ObjectId,
    required: true
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