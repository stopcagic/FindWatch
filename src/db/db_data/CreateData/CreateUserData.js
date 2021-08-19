import PostMovieUserData from "../PostMovieUserData"
import PostUserSeasonData from "../PostUserSeasonData"
import PostUserEpisodeData from "../PostUserEpisodeData"
import Utils from "../../../Utils/callEndpointUtil"

export default async data => {
  try {

    const item = await Utils.fetchJWInfo(data.type, data.jwId);

    data.type = item.object_type;
    data.genres = item.genres;
    data.release_date = item.original_release_year;

    const movieResponse = await PostMovieUserData(data);
    const response = {
      userMovieDataId: movieResponse.movie_user_data_id
    };

    if (data.type == "show") {
      for (const x of item.seasons) {
        const seasonResponse = await PostUserSeasonData({
          userId: data.userId,
          movieUserDataId: movieResponse.movie_user_data_id.toString(),
          seasonJwId: x.id, seasonNumber: x.season_number
        });
        response.userSeasonDataId = seasonResponse.season_id;

        const { episodes } = await Utils.fetchJWSeasonInfo(x.id);

        for (const y of episodes) {
          const episodeResponse = await PostUserEpisodeData({
            seasonDataId: seasonResponse.season_id.toString(),
            episodeNumber: y.episode_number
          });

          response.userEpisodeDataId = episodeResponse.episode_id;
        }
      }
    }

    return response

  } catch (err) {
    throw err
  }
}