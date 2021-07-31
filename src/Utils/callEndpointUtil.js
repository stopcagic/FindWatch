import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const APikey = process.env.APikey
const imdbBaseUrl = process.env.imdbApiUrl

const Utils = {

  async imdbAPIfetchData(params) {
    let request = await axios.get(`${imdbBaseUrl}${params}`);
    return request.data
  },
  async fetchID(name) {
    let SeriesTitle = await axios.get(`${imdbBaseUrl}/Search/${APikey}/${name}`);

    return SeriesTitle.data.results[0].id;
  },
  async fetchInfo(IMDbId, queryFilters) {
    let request = await axios.get(`${imdbBaseUrl}/Title/${APikey}/${IMDbId}/${queryFilters}`);

    return request.data;
  }
}

export default Utils;