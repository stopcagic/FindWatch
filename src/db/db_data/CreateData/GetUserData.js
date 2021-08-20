import GetMovieUserData from "../GetMovieUserData"
import GetUserSeasonData from "../GetUserSeasonData"
import GetUserEpisodeData from "../GetUserEpisodeData"


export default async data => {
  try {

    const movieResponse = await GetMovieUserData(data);

    if (Object.keys(movieResponse).length === 0 && movieResponse.constructor === Object) return {}
    if (movieResponse == null) throw "Missing user data"
    let response = { baseData: movieResponse }

    if (data.type == "show") {
      const seasonData = await GetUserSeasonData({ userId: data.userId, movieUserDataId: movieResponse._id })
      if (Object.keys(seasonData).length === 0 && seasonData.constructor === Object) return {}
      if (seasonData == null) throw "Missing user data"

      response.seasonData = seasonData
      let counter = 0

      for (const x of seasonData) {
        const episodeData = await GetUserEpisodeData({ seasonDataId: x._id })
        if (Object.keys(episodeData).length === 0 && episodeData.constructor === Object) return {}
        if (episodeData == null) throw "Missing user data"
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