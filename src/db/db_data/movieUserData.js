import express from 'express';
import { ObjectId } from "mongodb";
import connect from "../index";
import createSchemas from '../../Utils/createSchemas';

const router = express.Router();

router.get("/userData", async (req, res) => {

  const data = req.query;

  if (data == null || data.userId == null || data.imdbId == null) return res.status(422).send("Data cannot be empty.");
  try {

    let db = await connect();

    let response = await db.collection("movie_user_data").findOne({ user_id: ObjectId(data.userId), imdb_id: data.imdbId })

    if (response == null) return res.status(200);

    const movie_data_schema = createSchemas.MovieUserSchema(response)

    res.send(movie_data_schema);
  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }
})



export default router