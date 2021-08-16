import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import GetUserSeasonData from "./GetUserSeasonData"

export default async (userId, movieUserDataId, data) => {
  try {
    const oldDoc = await GetUserSeasonData({ userId, movieUserDataId })
    if (oldDoc == {}) throw "Invalid userId or movieUserDataId"

    data.user_id = userId
    data.movie_user_data_id = movieUserDataId

    const seasonData = createSchemas.SeasonDataSchema(oldDoc, data)

    const changes = diff(oldDoc, seasonData)._doc
    if (changes == undefined) return

    let db = await connect();

    let result = await db.collection("season_data").updateOne(
      { user_id: ObjectId(userId), movie_user_data_id: ObjectId(movieUserDataId) }, { $set: changes });

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