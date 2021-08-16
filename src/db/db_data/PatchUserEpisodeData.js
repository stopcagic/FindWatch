import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import GetUserEpisodeData from "./GetUserEpisodeData"

export default async (seasonDataId, data) => {
  try {
    const oldDoc = await GetUserEpisodeData({ seasonDataId })
    if (oldDoc == {}) throw "Invalid seasonDataId"

    data.season_data_id = seasonDataId

    const episodeData = createSchemas.EpisodeDataSchema(oldDoc, data)

    const changes = diff(oldDoc, episodeData)._doc
    if (changes == undefined) return

    let db = await connect();

    let result = await db.collection("episode_data").updateOne(
      { season_data_id: ObjectId(seasonDataId) }, { $set: changes });

    if (result.modifiedCount == 1) {
      return result
    }
    else {
      throw "Failed to update document"
    }

  } catch (err) {
    throw err
  }
}