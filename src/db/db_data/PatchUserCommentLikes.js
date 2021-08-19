import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"

export default async (commentId, userId, data) => {
  try {
    let db = await connect();

    let oldDoc = await db.collection("comment_likes").findOne({ comment_id: ObjectId(commentId), user_id: ObjectId(userId) });
    oldDoc = createSchemas.CommentLikesSchema(oldDoc, null)
    if (oldDoc == {}) throw "Invalid commentId or userId"

    const commentLikesData = createSchemas.CommentLikesSchema(oldDoc, data)


    const changes = diff(oldDoc, commentLikesData)._doc
    if (changes == undefined) return

    let result = await db.collection("comment_likes").updateOne(
      { comment_id: ObjectId(commentId), user_id: ObjectId(userId) }, { $set: changes });

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