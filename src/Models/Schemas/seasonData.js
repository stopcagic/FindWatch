import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const seasonData = new mongoose.Schema({
  season_number: {
    type: Number,
    required: true
  },
  season_jw_id: {
    type: Number,
    required: true
  },
  is_completed: {
    type: Boolean,
    required: true,
    default: false
  },
  movie_user_data_id: {
    type: ObjectId,
    required: true
  },
  user_id: {
    type: ObjectId,
    required: true
  },
}, { _id: false })


export default mongoose.model('SeasonData', seasonData);