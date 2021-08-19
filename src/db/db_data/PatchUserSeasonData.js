import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"

export default async (userId, movieUserDataId, seasonNumber, data) => {
  try {
    let db = await connect();
    let oldDoc = await db.collection("season_data").findOne({ user_id: ObjectId(userId), movie_user_data_id: ObjectId(movieUserDataId), season_number: parseInt(seasonNumber) })
    oldDoc = createSchemas.SeasonDataSchema(oldDoc, null)
    if (oldDoc == null) throw "Invalid userId or movieUserDataId"

    data.user_id = userId
    data.movie_user_data_id = movieUserDataId

    const seasonData = createSchemas.SeasonDataSchema(oldDoc, data)
    console.log(typeof oldDoc, typeof seasonData);
    const changes = diff(oldDoc, seasonData)._doc
    if (changes == undefined) return

    let result = await db.collection("season_data").updateOne(
      { user_id: ObjectId(userId), movie_user_data_id: ObjectId(movieUserDataId), season_number: parseInt(seasonNumber) }, { $set: changes });

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