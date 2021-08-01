import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const APikey = process.env.APikey
const imdbBaseUrl = process.env.IMDBAPIURL
const jwBaseUrl = process.env.JWAPIURL
// const jwPosterUrl = process.env.JWPOSTERURL
// const jwUserCode = process.env.JWUSERPROFILECODE

const Utils = {

  async imdbAPIfetchData(params) {
    let request = await axios.get(`${imdbBaseUrl}${params}`);
    return request.data
  },

  async justWatchAPIfetchData(params, body) {

    let request = await axios.post(`${jwBaseUrl}${params}`, JSON.stringify(body));
    //map svaki od data.items => item.poster = (pozovi image url)
    return request.data
  },

  async fetchID(name) {
    let SeriesTitle = await axios.get(`${imdbBaseUrl}/Search/${APikey}/${name}`);

    return SeriesTitle.data.results[0].id;
  },

  async fetchInfo(IMDbId, queryFilters) {
    let request = await axios.get(`${imdbBaseUrl}/Title/${APikey}/${IMDbId}/${queryFilters}`);

    return request.data;
  },

  async fetchJWInfo(type, jw_id) {
    let request = await axios.get(`${jwBaseUrl}/${type}/${jw_id}/locale/en_US`);
    //map svaki od properties => poster = (pozovi image url)
    return request.data;
  }
}

export default Utils;