import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const episodeData = new mongoose.Schema({
  season_data_Id: {
    type: ObjectId,
    required: true,
    default: ""
  },
  episode_number: {
    type: Number,
    required: true,
    default: -1
  },
  watched: {
    type: Boolean,
    default: false
  }
})


export default mongoose.model('EpisodeDataSchema', episodeData);