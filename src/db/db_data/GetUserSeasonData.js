import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';


export default async data => {
  if (data == null || data.userId == null || data.movieUserDataId == null) return null

  try {
    let db = await connect();

    let response = await db.collection("season_data").findOne({ user_id: ObjectId(data.userId), movie_user_data_id: ObjectId(data.movieUserDataId) })

    if (response == null)
      return {}

    return createSchemas.SeasonDataSchema(response);

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}

