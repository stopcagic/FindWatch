import { ObjectId } from "mongodb";
import connect from "../index"; import createSchemas from '../../Utils/createSchemas';

export default async data => {
  if (data == null || data.userId == null || data.movieUserDataId == null) return null

  try {
    let db = await connect();

    const cursor = await db.collection("season_data").find({ user_id: ObjectId(data.userId), movie_user_data_id: ObjectId(data.movieUserDataId) })
    const response = await cursor.toArray()

    if (response.length == 0)
      return {}

    // const schemas = response.map(x => {
    //   let id = x._id
    //   let schema = createSchemas.SeasonDataSchema(x);
    //   schema._id = id

    //   return schema
    // })

    return response

  } catch (error) {

    console.log(error);
    throw "Something went wrong"
  }
}

