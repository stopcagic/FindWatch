import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import Utils from "../../Utils/callEndpointUtil"
import CreateUserData from "./CreateData/CreateUserData";


export default async (userId, seasonJwId, episodeNumber, data) => {
  try {
    let db = await connect();

    let oldDoc = await db.collection("episode_data").findOne({ season_jw_id: parseInt(seasonJwId), episode_number: parseInt(episodeNumber) })
    oldDoc = createSchemas.EpisodeDataSchema(oldDoc, null)

    if (Object.keys(oldDoc).length === 0 && oldDoc.constructor === Object) {
      try {
        const { show_id } = await Utils.fetchJWSeasonInfo(parseInt(seasonJwId))
        await CreateUserData({ jwId: show_id.toString(), userId: userId, type: "show" })

        oldDoc = await db.collection("episode_data").findOne({ season_jw_id: parseInt(seasonJwId), episode_number: parseInt(episodeNumber) })
        oldDoc = createSchemas.EpisodeDataSchema(oldDoc, null)

      } catch (error) {
        throw "Error: Failed To create user data"
      }
    }

    const episodeData = createSchemas.EpisodeDataSchema(oldDoc, data)
    const changes = diff(oldDoc, episodeData)._doc
    if (changes == undefined) return

    let result = await db.collection("episode_data").updateOne(
      { season_jw_id: parseInt(seasonJwId), episode_number: parseInt(episodeNumber) }, { $set: changes });

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