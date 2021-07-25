import { ObjectId } from "mongodb"
import { userDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let error = userDataValidation(data)
    if (error) throw error;

    const db = await connect();
    const userDataExists = await db.collection("movie_user_data").findOne({ user_id: ObjectId(data.userId), imdb_id: data.imdbId })

    if (userDataExists) throw "Data for this user and movie already exists.";

    const movieUserData = createSchemas.MovieUserSchema(data, true)

    const result = await db.collection("movie_user_data").insertOne(movieUserData);

    return result;

  } catch (err) {
    console.log(err);
    throw "Something went wrong"
  }
}