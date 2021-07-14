import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: ""
  },
  imdb_id: {
    type: String,
    required: true,
    default: ""
  },
  content: {
    type: String,
    required: true,
    max: 255,
    min: 1,
    default: ""
  },
  date_time: {
    type: Date,
    required: true,
    default: new Date()
  },
  edited: {
    type: Boolean,
    default: false
  },
  edited_date_time: {
    type: Date,
    required: true,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
})


export default mongoose.model('CommentSchema', CommentSchema);