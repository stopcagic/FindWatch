import dotenv from 'dotenv';
import Utils from "../Utils/callEndpointUtil"

dotenv.config();

const APikey = process.env.APikey

export default {
  UpcommingMovies: async () => await Utils.imdbAPIfetchData(`/ComingSoon/${APikey}`),

  MoviesInTheaters: async () => await Utils.imdbAPIfetchData(`/InTheaters/${APikey}`),

  Top250Movies: async () => await Utils.imdbAPIfetchData(`/Top250Movies/${APikey}`),

  MostPopularMovies: async () => await Utils.imdbAPIfetchData(`/MostPopularMovies/${APikey}`),

  SearchMovies: async name => await Utils.imdbAPIfetchData(`/SearchMovie/${APikey}/${name}`),

  BoxOffice: async time => {
    if (time == 'allTime') {
      return await Utils.imdbAPIfetchData(`/BoxOfficeAllTime/${APikey}`);
    }
    else if (time == 'week') {
      return await Utils.imdbAPIfetchData(`/BoxOffice/${APikey}`);
    }
    else throw "Supported times are allTime and week.";
  }
}
