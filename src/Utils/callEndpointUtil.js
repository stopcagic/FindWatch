import axios from "axios";
import dotenv from "dotenv";
import genres from "../Models/genre_ids"

dotenv.config();
const APikey = process.env.APikey
const imdbBaseUrl = process.env.IMDBAPIURL
const jwBaseUrl = process.env.JWAPIURL
const jwPosterUrl = process.env.JWPOSTERURL
const jwUserCode = process.env.JWUSERPROFILECODE


const generatePosterUrl = (url) => jwPosterUrl + url.replace('{profile}', jwUserCode)


const Utils = {

  async imdbAPIfetchData(params) {
    let request = await axios.get(`${imdbBaseUrl}${params}`);
    return request.data
  },

  async justWatchAPIfetchData(params, body) {

    let request = await axios.post(`${jwBaseUrl}${params}`, JSON.stringify(body));
    request.data.items.forEach(el => el.poster = generatePosterUrl(el.poster));
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
    request.data.poster = generatePosterUrl(request.data.poster)
    let genreList = []
    request.data.genre_ids.map(x => genreList.push({
      short_name: genres[x].short_name,
      full_name: genres[x].translation
    }))
    request.data.genres = genreList

    for (const x of request.data.seasons) {
      let eps = await Utils.fetchJWSeasonInfo(x.id.toString())
      x.episodes = eps
    }
    return request.data;
  },

  async fetchJWSeasonInfo(show_id) {
    console.log("hi");
    let request = await axios.get(`${jwBaseUrl}/show_season/${show_id}/locale/en_US`);
    request.data.poster = generatePosterUrl(request.data.poster)
    return request.data;
  }
}

export default Utils;