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

    const commentLikesExists = await db.collection("comment_likes").findOne({ comment_id: ObjectId(data.commentId), user_id: ObjectId(data.userId) })
    if (commentLikesExists) throw "Comment likes already exits for this user id.";

    const userCommentLikes = createSchemas.CommentLikesSchema(null, data, true)

    const result = await db.collection("comment_likes").insertOne(userCommentLikes);

    return result;

  } catch (err) {
    throw err
  }
}