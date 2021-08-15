import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';


export default async data => {
  if (data == null || data.userId == null || data.jwId == null) return null;
  try {

    let db = await connect();

    let response = await db.collection("comments").findOne({ user_id: ObjectId(data.userId), jw_id: data.jwId })

    if (response == null) return {};

    return createSchemas.CommentSchema(response)

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}


