import express from 'express';
import { ObjectId } from 'mongodb';
import connect from "../db/index";
import createSchemas from '../Utils/createSchemas';

const router = express.Router();

router.get("/userData", async (req, res) => {

  const data = req.query;

  if (data == null || (data.userId == null && data.imdbId == null)) res.status(422).send("Data cannot be empty.");
  try {

    let db = await connect();

    let response = await db.collection("movie_user_data").findOne({ user_id: data.userId, imdb_id: data.imdbId })
    console.log("response: ", response.rating)
    if (response == null) res.status(200).send();

    const movie_data_schema = createSchemas.MovieUserSchema(response)

    res.send(movie_data_schema);
  } catch (error) {

    console.log(error);
    res.status(500).json(error)
  }


})



export default router