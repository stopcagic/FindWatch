import { ObjectId } from "mongodb"
import { episodeDataValidation } from "../../Utils/userDataValidation"
import connect from "../../db/index"
import createSchemas from "../../Utils/createSchemas"


export default async data => {
  try {
    let error = episodeDataValidation(data)
    if (error) throw error;

    const db = await connect();

    const seasonExists = await db.collection("season_data").findOne({ _id: ObjectId(data.seasonDataId) })

    if (!seasonExists) throw "Season data for this user does not exist.";

    const episodeExists = await db.collection("episode_data").findOne({ season_data_id: ObjectId(data.seasonDataId), episode_number: data.episodeNumber })

    if (episodeExists) throw "This user already has data for this episode.";

    const userEpisodeData = createSchemas.EpisodeDataSchema(data, true)

    const result = await db.collection("episode_data").insertOne(userEpisodeData);

    return result;

  } catch (err) {
    console.log(err);
    throw err
  }
}