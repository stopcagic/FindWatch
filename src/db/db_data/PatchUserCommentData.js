import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"
import GetUserCommentData from "./GetUserCommentData"

export default async (jwId, userId, data) => {
  try {

    const oldDoc = await GetUserCommentData({ jwId, userId })

    if (oldDoc == {}) throw "Invalid jwId or userId"

    data.jw_id = jwId
    data.user_id = userId

    const commentData = createSchemas.CommentSchema(oldDoc, data)

    const changes = diff(oldDoc, commentData)._doc
    if (changes == undefined) return

    let db = await connect();

    let result = await db.collection("comments").updateOne(
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