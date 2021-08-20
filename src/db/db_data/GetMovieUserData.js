import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';

export default async data => {

  if (data == null || data.userId == null || data.jwId == null || data.type == null) return null
  try {
    let db = await connect();

    let response = await db.collection("movie_user_data").findOne({ user_id: ObjectId(data.userId), jw_id: data.jwId, type: data.type })

    if (response == null) return {};
    const schema = createSchemas.MovieUserSchema(response)
    schema._id = response._id

    return schema

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
