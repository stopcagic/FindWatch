import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const APikey = process.env.APikey


const Utils = {
  async searchEpisodes(IMDbId, season) {
    let request = await axios.get(`https://imdb-api.com/en/API/SeasonEpisodes/${APikey}/${IMDbId}/${season}`);

    return request.data;
  },
  async fetchInfo(IMDbId, queryFilters) {
    let request = await axios.get(`https://imdb-api.com/en/API/Title/${APikey}/${IMDbId}/${queryFilters}`);

    return request.data;
  }
}

export default Utils;