import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';


export default async data => {
  if (data == null || data.seasonDataId == null) return null

  try {
    let db = await connect();

    let response = await db.collection("episode_data").findOne({ season_data_id: ObjectId(data.seasonDataId) })

    if (response == null) return {}

    return createSchemas.EpisodeDataSchema(response);

  } catch (error) {
    console.log(error);
    throw "Something went wrong"
  }

}
