import { ObjectId } from "mongodb"
import { diff } from 'deep-object-diff';

import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"

export default async (commentid, data) => {
  try {
    let db = await connect();

    let oldDoc = await db.collection("comments").findOne({ _id: ObjectId(commentid) });
    oldDoc = createSchemas.CommentSchema(oldDoc, null)

    if (Object.keys(oldDoc).length === 0 && oldDoc.constructor === Object) {
      try {
        await CreateUserData({ jwId: jwId, userId: userId, type: type })
        oldDoc = await db.collection("comments").findOne({ _id: ObjectId(commentid) });
        oldDoc = createSchemas.CommentSchema(oldDoc, null)

      } catch (error) {
        throw "Error: Failed To create user data"
      }
    }

    const commentData = createSchemas.CommentSchema(oldDoc, data)

    const changes = diff(oldDoc, commentData)._doc
    delete changes._id
    delete changes.reactions
    if (changes == undefined) return

    let result = await db.collection("comments").updateOne(
      { _id: ObjectId(commentid) }, { $set: changes });

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