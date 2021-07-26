import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const episodeData = new mongoose.Schema({
  season_data_id: {
    type: ObjectId,
    required: true
  },
  episode_number: {
    type: Number,
    required: true
  },
  watched: {
    type: Boolean,
    default: false
  }
})


export default mongoose.model('EpisodeDataSchema', episodeData);