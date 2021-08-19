import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';


export default async data => {
  if (data == null || data.seasonDataId == null) return null

  try {
    let db = await connect();

    const cursor = await db.collection("episode_data").find({ season_data_id: ObjectId(data.seasonDataId) })

    const response = await cursor.toArray()

    const schemas = response.map(x => createSchemas.EpisodeDataSchema(x))
    if (response.length == 0)
      return {}

    return schemas

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }

}
