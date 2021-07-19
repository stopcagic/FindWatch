import express from "express";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/userSeasonData", async (req, res) => {
  const data = req.query;

  if (data == null || data.userId == null || data.movieUserDataId == null) return res.status(422).send("Data cannot be empty.")

  try {
    let db = await connect();

    let response = await db.collection("season_data").findOne({ user_id: ObjectId(data.userId), movie_user_data_id: ObjectId(data.movieUserDataId) })

    if (response == null)
      return res.status(200).send()

    const season_data_schema = createSchemas.SeasonDataSchema(response);

    res.send(season_data_schema);

  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }

})


export default router