import { ObjectId } from "mongodb";
import connect from "../index";

export default async data => {
  if (data == null || data.commentId == null) return null

  try {

    let db = await connect();

    let cursor = await db.collection("comment_likes").find({ comment_id: ObjectId(data.commentId), $or: [{ like: true }, { dislike: true }] })
    let response = await cursor.toArray()

    if (response == null) return [];


    return response
  } catch (error) {

    throw "Something went wrong" + error
  }
}
