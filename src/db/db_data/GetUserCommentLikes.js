import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';

export default async data => {
  if (data == null || data.userId == null || data.commentId == null) return null

  try {

    let db = await connect();

    let response = await db.collection("comment_likes").findOne({ user_id: ObjectId(data.userId), comment_id: ObjectId(data.commentId) })

    if (response == null) return {};

    return createSchemas.CommentLikesSchema(response)

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}
