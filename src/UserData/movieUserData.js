import express from 'express';

import GetMovieUserData from "../db/db_data/GetMovieUserData"
import PostMovieUserData from "../db/db_data/PostMovieUserData"
import PatchMovieUserData from "../db/db_data/PatchMovieUserData"

const router = express.Router();

router.get("/userData", async (req, res) => {

  const data = req.query;

  try {
    const response = await GetMovieUserData(data);

    if (response == null) return res.status(422).send("Data cannot be empty.")
    if (response == {}) return res.status(200);

    res.json(response)

  } catch (error) {
    res.status(500).send(error)
  }

})

router.post("/userData", async (req, res) => {

  const data = req.body;
  try {
    const response = await PostMovieUserData(data)

    res.json({ "insertedId": response.ops[0]._id })

  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/userData/:userid/:jwid", async (req, res) => {

  const jwid = req.params.jwid
  const userId = req.params.userid
  const data = req.body;

  try {
    await PatchMovieUserData(jwid, userId, data)

    res.json({ "success": true })
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router