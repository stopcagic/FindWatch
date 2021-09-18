import { ObjectId } from "mongodb";
import connect from "../index";

export default async data => {
  if (data == null || data.userId == null || data.seasonJwId == null) return null

  try {
    let db = await connect();

    const response = await db.collection("season_data").findOne({ user_id: ObjectId(data.userId), season_jw_id: parseInt(data.seasonJwId) })
    if (response == null)
      return {}

    return response

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}
