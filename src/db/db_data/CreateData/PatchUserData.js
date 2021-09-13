import { ObjectId } from "mongodb"

import GetAllMovieUserData from "../GetAllMovieUserData"
import PostUserSeasonData from "../PostUserSeasonData"
import PostUserEpisodeData from "../PostUserEpisodeData"
import Utils from "../../../Utils/callEndpointUtil"
import GetUserSeasonData from "../GetUserSeasonData"
import GetUserEpisodeData from "../GetUserEpisodeData"

export default async userId => {
  try {

    const userData = await GetAllMovieUserData({ user_id: ObjectId(userId) })
    let notifications = {
      user_id: userId,
      notifications: []
    }

    if (userData == null) throw "Invalid user Id"

    for (const item of userData) {

      if (item.type == "show") {
        const show = await Utils.fetchJWInfo(item.type, item.jw_id);

        const db_show = await GetUserSeasonData({ userId: userId, movieUserDataId: item._id })

        const newSeasonIds = show.seasons.filter(x => !db_show.some(y => x.id.toString() === y.season_jw_id.toString())).map(x => x.id)

        for (const season of show.seasons) {
          const seasonData = await Utils.fetchJWSeasonInfo(season.id)
          let seasonResponse = null

          if (newSeasonIds.includes(season.id)) {
            notifications.notifications.push({
              jw_id: seasonData.show_id,
              name: seasonData.show_title,
              season_number: seasonData.season_number,
              poster: seasonData.poster
            })

            seasonResponse = await PostUserSeasonData({
              userId: userId,
              movieUserDataId: item._id.toString(),
              seasonJwId: seasonData.show_id, seasonNumber: seasonData.season_number
            });
          }

          const seasonUserDataId = db_show.filter(x => x.season_jw_id == season.id)

          const db_eps = await GetUserEpisodeData({ seasonDataId: seasonUserDataId[0]._id })

          const newEpisodes = seasonData.episodes.filter(x => !db_eps.some(y => x.episode_number === y.episode_number))

          for (const eps of newEpisodes) {
            notifications.notifications.push({
              jw_id: seasonData.show_id,
              name: seasonData.show_title,
              season_number: seasonData.season_number,
              poster: seasonData.poster,
              episode_number: eps
            })

            await PostUserEpisodeData({
              seasonDataId: seasonResponse != null ? seasonResponse.season_id : seasonUserDataId._id,
              episodeNumber: eps,
              seasonJwId: season.id
            });
          }
        }
      }
    }

    return notifications;

  } catch (err) {
    throw err
  }
}