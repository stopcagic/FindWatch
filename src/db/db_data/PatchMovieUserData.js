import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import GetMovieUserData from "./GetMovieUserData"
import CreateUserData from "./CreateData/CreateUserData";

export default async (jwId, userId, type, data) => {
  try {
    let oldDoc = await GetMovieUserData({ jwId, userId, type })

    if (Object.keys(oldDoc).length === 0 && oldDoc.constructor === Object) {
      try {
        await CreateUserData({ jwId: jwId, userId: userId, type: type })
        oldDoc = await GetMovieUserData({ jwId, userId, type })

      } catch (error) {
        throw "Error: Failed To create user data"
      }
    }

    const movieUserData = createSchemas.MovieUserSchema(oldDoc, data)

    const changes = diff(oldDoc, movieUserData)._doc
    delete changes._id
    delete changes.genres
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