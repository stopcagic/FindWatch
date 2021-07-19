import express from "express";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/userEpisodeData", async (req, res) => {
  const data = req.query;

  if (data == null || data.seasonDataId == null) return res.status(422).send("Data cannot be empty.")

  try {
    let db = await connect();

    let response = await db.collection("episode_data").findOne({ season_data_id: ObjectId(data.seasonDataId) })

    if (response == null)
      return res.status(200).send()

    const season_data_schema = createSchemas.EpisodeDataSchema(response);

    res.send(season_data_schema);

  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }

})


export default router