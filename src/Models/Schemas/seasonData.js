import { Int32, ObjectId } from "mongodb";
import mongoose from "mongoose";

const seasonData = new mongoose.Schema({
  season_number: {
    type: Number,
    required: true,
    default: -1
  },
  is_completed: {
    type: Boolean,
    required: true,
    default: false
  },
  movie_user_data_id: {
    type: ObjectId,
    required: true,
    default: ""
  },
  user_id: {
    type: ObjectId,
    required: true,
    default: ""
  },
})


export default mongoose.model('SeasonData', seasonData);