import { ObjectId } from "mongodb";
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const movieUserSchema = new mongoose.Schema({
  jw_id: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  type: {
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
  release_year: {
    type: Date,
    required: true
  },
  user_id: {
    type: ObjectId,
    required: true
  }
}
)


export default mongoose.model('MovieUserSchema', movieUserSchema);