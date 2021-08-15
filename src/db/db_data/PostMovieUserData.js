import { ObjectId } from "mongodb"
import { movieUserDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let error = movieUserDataValidation(data)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ _id: ObjectId(data.userId) })

    if (!userExists) throw "User does not exist.";

    const userDataExists = await db.collection("movie_user_data").findOne({ user_id: ObjectId(data.userId), jw_id: data.jwId })

    if (userDataExists) throw "Data for this user and movie already exists.";

    const movieUserData = createSchemas.MovieUserSchema(data, true)

    const result = await db.collection("movie_user_data").insertOne(movieUserData);

    return result;

  } catch (err) {
    console.log(err);
    throw err
  }
}