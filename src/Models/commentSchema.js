import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user_data_id: {
    type: ObjectID,
    required: true,
    default: 0
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
  like: {
    type: Boolean,
    default: false
  },
  dislike: {
    type: Boolean,
    default: false
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