import { ObjectId } from "mongodb"
import { seasonDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let error = seasonDataValidation(data)
    if (error) throw error;

    const db = await connect();

    const userExists = await db.collection("users").findOne({ _id: ObjectId(data.userId) })

    if (!userExists) throw "User does not exist.";

    const userDataExists = await db.collection("movie_user_data").findOne({ _id: ObjectId(data.movieUserDataId) })

    if (!userDataExists) throw "Data for this user does not exist.";

    const seasonExists = await db.collection("season_data").findOne({ user_id: ObjectId(data.userId), movie_user_data_id: ObjectId(data.movieUserDataId), season_number: data.seasonNumber })

    if (seasonExists) throw "This user already has data for this season.";

    const userSeasonData = createSchemas.SeasonDataSchema(data, true)

    const result = await db.collection("season_data").insertOne(userSeasonData);

    return result;

  } catch (err) {
    console.log(err);
    throw err
  }
}