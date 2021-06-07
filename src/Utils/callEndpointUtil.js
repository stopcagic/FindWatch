import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const APikey = process.env.APikey


const Utils = {

  async fetchID(name) {
    let SeriesTitle = await axios.get(`https://imdb-api.com/en/API/Search/${APikey}/${name}`);

    return SeriesTitle.data.results[0].id;
  },
  async searchEpisodes(IMDbId, season) {
    let request = await axios.get(`https://imdb-api.com/en/API/SeasonEpisodes/${APikey}/${IMDbId}/${season}`);

    return request.data;
  },
  async fetchInfo(IMDbId, queryFilters) {
    let request = await axios.get(`https://imdb-api.com/en/API/Title/${APikey}/${IMDbId}/${queryFilters}`);

    return request.data;
  },
  async fetchRatings(IMDbId) {
    let request = await axios.get(`https://imdb-api.com/en/API/Ratings/${APikey}/${IMDbId}`)

    return request.data;
  }
}

export default Utils;