import express from 'express';
import GetMovieUserData from "../db/db_data/movieUserData"

const router = express.Router();

router.get("/userData", async (req, res) => {

  const data = req.query;

  try {
    const response = await GetMovieUserData(data);
    console.log(response);
    if (response == null) return res.status(422).send("Data cannot be empty.")
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }

})



export default router