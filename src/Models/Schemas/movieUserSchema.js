import { ObjectId } from "mongodb";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const movieUserSchema = new mongoose.Schema({
  imdb_id: {
    type: String,
    required: true
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
    type: Decimal128,
    default: 0
  },
  favorite: {
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
  user_id: {
    type: ObjectId,
    required: true
  }
})


export default mongoose.model('MovieUserSchema', movieUserSchema);