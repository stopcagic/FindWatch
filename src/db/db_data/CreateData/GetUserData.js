import GetMovieUserData from "../GetMovieUserData"
import GetUserSeasonData from "../GetUserSeasonData"
import GetUserEpisodeData from "../GetUserEpisodeData"


export default async data => {
  try {
    const movieResponse = await GetMovieUserData(data);
    if (movieResponse == null) throw "Missing user data"
    if (movieResponse == {}) return {}
    let response = { baseData: movieResponse }

    if (data.type == "show") {
      const seasonData = await GetUserSeasonData({ userId: data.userId, movieUserDataId: movieResponse._id })
      if (seasonData == null) throw "Missing user data"
      if (seasonData == {}) return {}

      response.seasonData = seasonData
      let counter = 0

      for (const x of seasonData) {
        const episodeData = await GetUserEpisodeData({ seasonDataId: x._id })
        if (episodeData == null) throw "Missing user data"
        if (episodeData == {}) return {}
        response.seasonData[counter].episodes = episodeData
        delete response.seasonData[counter]._id
        counter++
      }

    }
    return response

  } catch (error) {
    throw error
  }

}