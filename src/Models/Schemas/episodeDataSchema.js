import mongoose from "mongoose";

const episodeData = new mongoose.Schema({
  episode_number: {
    type: Number,
    required: true,
    default: -1
  },
  watched: {
    type: Boolean,
    default: false
  },
  series_data_Id: {
    type: String,
    required: true,
    default: ""
  }
})


export default mongoose.model('EpisodeDataSchema', episodeData);