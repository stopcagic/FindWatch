import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import Utils from "../../Utils/callEndpointUtil"
import CreateUserData from "./CreateData/CreateUserData";
import { updateUserSimilarityScores } from "../../Utils/similarityUtils"


export default async (userId, seasonJwId, data) => {
  try {
    let db = await connect();

    let oldDoc = await db.collection("season_data").findOne({ user_id: ObjectId(userId), season_jw_id: parseInt(seasonJwId) })
    oldDoc = createSchemas.SeasonDataSchema(oldDoc, null)

    if (Object.keys(oldDoc).length === 0 && oldDoc.constructor === Object) {
      try {
        const { show_id } = await Utils.fetchJWSeasonInfo(parseInt(seasonJwId))
        await CreateUserData({ jwId: show_id.toString(), userId: userId, type: "show" })

        oldDoc = await db.collection("season_data").findOne({ user_id: ObjectId(userId), season_jw_id: parseInt(seasonJwId) })
        oldDoc = createSchemas.SeasonDataSchema(oldDoc, null)

      } catch (error) {
        throw "Error: Failed To create user data"
      }
    }

    const seasonData = createSchemas.SeasonDataSchema(oldDoc, data)

    const changes = diff(oldDoc, seasonData)._doc
    if (changes == undefined) return

    let result = await db.collection("season_data").updateOne(
      { user_id: ObjectId(userId), season_jw_id: parseInt(seasonJwId) }, { $set: changes });

    if (result.modifiedCount == 1) {
      await updateUserSimilarityScores(userId)
      return result
    }
    else {
      throw "Failed to update document"
    }

  } catch (err) {
    throw err
  }
}