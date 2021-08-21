import { ObjectId } from "mongodb";
import connect from "../index";

export default async data => {

  if (data == null || data.userId == null || data.property == null) return null
  try {
    let db = await connect();

    let query = {}

    query.user_id = ObjectId(data.userId)
    query[data.property] = true

    const cursor = await db.collection("movie_user_data").find(query)

    const response = await cursor.toArray()

    if (response == null) return {};

    const items = []
    response.map(x => items.push({ id: x.jw_id, type: x.type }))

    return items

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
