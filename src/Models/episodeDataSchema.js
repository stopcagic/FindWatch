import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const episodeData = new mongoose.Schema({
  season_number: {
    type: Int16Array,
    required: true,
    default: -1
  },
  episode_number: {
    type: Int16Array,
    required: true,
    default: -1
  },
  imdb_id: {
    type: String,
    required: true,
    default: ""
  },
  watched: {
    type: Boolean,
    default: false
  },
  comment_id: {
    type: Array,
    default: null
  },
  series_data_Id: {
    type: ObjectId,
    required: true,
    default: 0
  }
})


export default mongoose.model('EpisodeDataSchema', episodeData);