import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import GetUserCommentLikes from "./GetUserCommentLikes";

export default async data => {
  if (data == null || data.userId == null || data.jwId == null) return null;
  try {

    let db = await connect();

    let cursor = await db.collection("comments").find({ user_id: ObjectId(data.userId), jw_id: data.jwId })
    const comments = await cursor.toArray()

    if (comments == null) return {};

    let responseArray = []

    for (const x of comments) {
      const commentLikes = await GetUserCommentLikes({ userId: data.userId, commentId: x._id })
      x.reactions = commentLikes
      responseArray.push(createSchemas.CommentSchema(x))
    }

    return responseArray

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}


