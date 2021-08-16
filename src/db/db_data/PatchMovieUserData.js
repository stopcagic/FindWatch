import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import GetMovieUserData from "./GetMovieUserData"

export default async (jwId, userId, data) => {
  try {

    const oldDoc = await GetMovieUserData({ jwId, userId })

    if (oldDoc == {}) throw "Invalid jwId or userId"

    data.jw_id = jwId
    data.user_id = userId

    const movieUserData = createSchemas.MovieUserSchema(oldDoc, data)

    const changes = diff(oldDoc, movieUserData)._doc
    if (changes == undefined) return

    let db = await connect();

    let result = await db.collection("movie_user_data").updateOne(
      { jw_id: jwId, user_id: ObjectId(userId) }, { $set: changes });

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