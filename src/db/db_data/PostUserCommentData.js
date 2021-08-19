import { ObjectId } from "mongodb"

import { commentDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let error = commentDataValidation(data)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ _id: ObjectId(data.userId) })

    if (!userExists) throw "User does not exist.";

    const userComment = createSchemas.CommentSchema(null, data, true)

    await db.collection("comments").insertOne(userComment);

    const cursor = await db.collection("comments").find({ jw_id: data.jwId, user_id: ObjectId(data.userId) })

    const commentExists = await cursor.toArray()
    if (commentExists.length == 0) throw "Comment does not exist.";

    return { comment_id: commentExists[commentExists.length - 1]._id };

  } catch (err) {
    console.log(err);
    throw err
  }
}