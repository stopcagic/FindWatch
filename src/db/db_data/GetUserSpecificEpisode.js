import { ObjectId } from "mongodb";
import connect from "../index";

export default async data => {
  if (data == null || data.seasonJwId == null || data.epNumber == null) return null

  try {
    let db = await connect();

    const response = await db.collection("episode_data").findOne({ season_jw_id: parseInt(data.seasonJwId), episode_number: parseInt(data.epNumber) })
    if (response == null)
      return {}

    return response

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}