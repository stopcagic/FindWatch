import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  jw_id: {
    type: String,
    required: true
  },
  season_jw_id: {
    type: Number,
    default: null
  },
  episode_number: {
    type: Number,
    default: null
  },
  content: {
    type: String,
    required: true,
    max: 255,
    min: 1
  },
  date_time: {
    type: Date,
    required: true
  },
  edited: {
    type: Boolean,
    default: false
  },
  edited_date_time: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  reactions: {
    type: Array,
    default: null
  }
})


export default mongoose.model('CommentSchema', CommentSchema);