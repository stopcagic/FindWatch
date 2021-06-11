import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const movieUserSchema = new mongoose.Schema({
  imdb_id: {
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
  },
  rating: {
    type: Float32Array,
    default: 0
  },
  favourite: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  watch_later: {
    type: Boolean,
    default: false
  },
  comment_id: {
    type: Array,
    default: false
  },
  user_id: {
    type: ObjectID,
    required: true,
    default: 0
  },
  watching_data_id: {
    type: ObjectID,
    required: true,
    default: 0
  }
})


export default mongoose.model('MovieUserSchema', movieUserSchema);