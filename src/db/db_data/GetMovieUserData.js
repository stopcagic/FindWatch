import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';

export default async data => {

  if (data == null || data.userId == null || data.imdbId == null) return null
  try {

    let db = await connect();

    let response = await db.collection("movie_user_data").findOne({ user_id: ObjectId(data.userId), imdb_id: data.imdbId })

    if (response == null) return {};

    return createSchemas.MovieUserSchema(response, false)

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }
}
