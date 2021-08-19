import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"

export default async (seasonDataId, episodeNumber, data) => {
  try {
    let db = await connect();

    let oldDoc = await db.collection("episode_data").findOne({ season_data_id: ObjectId(seasonDataId), episode_number: parseInt(episodeNumber) })
    oldDoc = createSchemas.EpisodeDataSchema(oldDoc, null)
    if (oldDoc == null) throw "Invalid seasonDataId"

    data.season_data_id = seasonDataId
    data.episode_number = episodeNumber
    const episodeData = createSchemas.EpisodeDataSchema(oldDoc, data)

    const changes = diff(oldDoc, episodeData)._doc
    if (changes == undefined) return

    let result = await db.collection("episode_data").updateOne(
      { season_data_id: ObjectId(seasonDataId), episode_number: parseInt(episodeNumber) }, { $set: changes });

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