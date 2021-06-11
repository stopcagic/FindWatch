import mongoose from "mongoose";

const seriesDataSchema = new mongoose.Schema({
  season_number: {
    type: Int16Array,
    required: true,
    default: -1
  },
  watched_eps: {
    type: Array,
    required: true,
    default: null
  },
  user_data_id: {
    type: ObjectID,
    required: true,
    default: 0
  },
  imdb_id: {
    type: String,
    required: true,
    default: ""
  }
})


export default mongoose.model('SeriesDataSchema', seriesDataSchema);