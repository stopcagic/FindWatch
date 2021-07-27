import { ObjectId } from "mongodb"
import { commentLikesDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {

    let error = commentLikesDataValidation(data)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ _id: ObjectId(data.userId) })

    if (!userExists) throw "User does not exist.";

    const commentExists = await db.collection("comments").findOne({ _id: ObjectId(data.commentId) })

    if (!commentExists) throw "Comment does not exist.";

    const userCommentLikes = createSchemas.CommentLikesSchema(data, true)

    const result = await db.collection("comment_likes").insertOne(userCommentLikes);

    return result;

  } catch (err) {
    console.log(err);
    throw err
  }
}