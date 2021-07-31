import dotenv from 'dotenv';
import Utils from "../Utils/callEndpointUtil"

dotenv.config();

const APikey = process.env.APikey

export default {
  Top250Shows: async () => await Utils.imdbAPIfetchData(`/Top250TVs/${APikey}`),

  MostPopularShows: async () => await Utils.imdbAPIfetchData(`/MostPopularTVs/${APikey}`),

  SearchShows: async name => await Utils.imdbAPIfetchData(`/SearchSeries/${APikey}/${name}`),

  SearchEpiodeByName: async name => await Utils.imdbAPIfetchData(`/SearchEpisode/${APikey}/${name}`),

  GetEpisodesFromSeason: async (IMDbId, name, season) => {
    let imdbId;

    if (name && season != undefined) {
      imdbId = await Utils.fetchID(name);
    }
    if (IMDbId && season != undefined) {
      imdbId = IMDbId
    }
    else {
      throw "Title does not exist or incorrect IMDB ID."
    }

    return await Utils.imdbAPIfetchData(`/SeasonEpisodes/${APikey}/${imdbId}/${season}`);
  }
}